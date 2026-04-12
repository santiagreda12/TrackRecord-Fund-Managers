import fs from 'fs';

const DB_PATH = './server/db.json';
const MS_SEARCH_URL = "https://www.morningstar.es/es/util/SecuritySearch.ashx?source=nav&q=";

// Buscar el SecId (código interno de Morningstar) a través del ISIN
const findMorningstarId = async (isin) => {
  try {
    const res = await fetch(MS_SEARCH_URL + isin);
    const data = await res.text();
    const match = data.match(/\{\"i\"\:\"(.*?)\"/);
    if (match && match[1]) {
      return match[1];
    }
    return null;
  } catch (err) {
    console.error(`Fallo buscando SecId para ${isin}`, err);
    return null;
  }
};

// Descargar el histórico masivo desde una fecha dada usando la API secreta
const fetchHistoricalNavs = async (secId, startDate = "2017-01-01") => {
  const url = `https://tools.morningstar.es/api/rest.svc/timeseries_price/t92wz0sj7c?id=${secId}%5D2%5D1%5D&currencyId=EUR&idtype=Morningstar&frequency=daily&startDate=${startDate}&outputType=COMPACTJSON`;
  
  try {
    const res = await fetch(url);
    const data = await res.json();
    
    // El formato de la API es: [[1610496000000, 10.45], [1610582400000, 10.46], ...]
    if (Array.isArray(data) && data.length > 0) {
      return data.map(point => {
        const timestamp = point[0]; // Milisegundos
        const val = point[1]; // NAV
        const dateStr = new Date(timestamp).toISOString().split('T')[0];
        
        return {
          date: dateStr,
          nav: parseFloat(val)
        };
      });
    }
    return [];
  } catch (err) {
    console.error(`Error bajando histórico para ${secId}:`, err);
    return [];
  }
};

export const runHistoricalMigration = async () => {
  console.log("Iniciando Migración Masiva de Historiales...");
  const rawData = fs.readFileSync(DB_PATH);
  const managersData = JSON.parse(rawData);
  
  for (let manager of managersData) {
    for (let fund of manager.funds) {
      const isin = fund.tvSymbol;
      if (!isin) continue;

      // Caso especial Peter Lynch (Simulación Histórica)
      if (isin === "US3161841003") {
        console.log(`[${fund.name}] Generando simulación histórica de Peter Lynch (29% CAGR)...`);
        const historicalData = [];
        let nav = 10;
        const startDate = new Date("1977-01-01");
        const endDate = new Date("1990-12-31");
        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
          if (d.getDay() !== 0 && d.getDay() !== 6) { // Solo días de semana
            nav *= (1 + (0.29 / 252) + (Math.random() * 0.02 - 0.01)); // CAGR 29% + volatilidad
            historicalData.push({ date: d.toISOString().split('T')[0], nav: parseFloat(nav.toFixed(2)) });
          }
        }
        fund.history = historicalData;
        fund.nav = nav;
        console.log(`[${fund.name}] Simulación completada: ${historicalData.length} puntos.`);
        continue;
      }

      if (!isin.startsWith("ES") && !isin.startsWith("LU") && !isin.startsWith("IE")) continue;
      
      console.log(`[${fund.name}] Buscando SecId de MS para ${isin}...`);
      const secId = await findMorningstarId(isin);
      
      if (secId) {
        console.log(`[${fund.name}] Encontrado Morningstar ID: ${secId}. Descargando datos desde 2017...`);
        const historicalData = await fetchHistoricalNavs(secId, "2017-01-01");
        
        if (historicalData.length > 0) {
          // Sustituimos la historia generada matemáticamente por la real
          fund.history = historicalData;
          // Actualizamos el NAV actual al último punto de cierre del historial
          fund.nav = historicalData[historicalData.length - 1].nav;
          console.log(`[${fund.name}] ¡Éxito! Inyectados ${historicalData.length} días de mercado.`);
        } else {
          console.log(`[${fund.name}] API no devolvió histórico.`);
        }
      } else {
        console.log(`[${fund.name}] No se localizó en Morningstar.`);
      }
    }
  }

  // Guardar disco
  fs.writeFileSync(DB_PATH, JSON.stringify(managersData, null, 2));
  console.log("Migración finalizada y db.json reescrito. Las gráficas ahora muestran la realidad financiera.");
};

// Si se ejecuta standalone desde consola
if (process.argv[1] && process.argv[1].includes('fetchHistory.js')) {
  runHistoricalMigration();
}
