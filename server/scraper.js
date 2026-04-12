import fs from 'fs';
import * as cheerio from 'cheerio';
import YahooFinance from 'yahoo-finance2';

const yahooFinance = new YahooFinance();

const DB_PATH = './server/db.json';

// Extraer el NAV de QueFondos usando el ISIN
const fetchNavFromQf = async (isin) => {
  try {
    const url = `https://www.quefondos.com/es/fondos/ficha/index.html?isin=${isin}`;
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Buscar el valor en la tabla de datos
    let navText = null;
    $('span').each((i, el) => {
      if ($(el).text().includes('Valor liquidativo:')) {
        navText = $(el).next().text().trim();
      }
    });

    if (navText && navText.includes('EUR')) {
      const navStr = navText.split(' ')[0].replace(',', '.');
      return parseFloat(navStr);
    }
    
    // Usar regex como fallback si cheerio falla por estructura
    const navMatch = html.match(/Valor liquidativo:.*?float.*?>(.*?)</s);
    if (navMatch) {
      const parts = navMatch[1].trim().split(' ');
      const val = parts[0].replace(',', '.');
      return parseFloat(val);
    }
    return null;
  } catch (error) {
    console.error(`Error scraping ISIN ${isin}:`, error.message);
    return null;
  }
};

// Extraer el NAV desde Yahoo Finance usando el yfSymbol
const fetchNavFromYf = async (yfSymbol) => {
  try {
    const result = await yahooFinance.quote(yfSymbol);
    if (result && result.regularMarketPrice) {
      return result.regularMarketPrice;
    }
    return null;
  } catch (error) {
    console.error(`Error YF scraper para ${yfSymbol}:`, error.message);
    return null;
  }
};

export const runScraper = async () => {
  console.log(`Iniciando Web Scraping híbrido de fondos [${new Date().toISOString()}]...`);
  
  if (!fs.existsSync(DB_PATH)) {
    console.error("Base de datos no encontrada, abortando scraper.");
    return;
  }

  const rawData = fs.readFileSync(DB_PATH);
  const managersData = JSON.parse(rawData);
  let updatedCount = 0;

  for (let manager of managersData) {
    for (let fund of manager.funds) {
      console.log(`Buscando datos para ${fund.name}...`);
      let latestNav = null;
      
      // 1. Prioridad: Yahoo Finance (si hay yfSymbol)
      if (fund.yfSymbol) {
        latestNav = await fetchNavFromYf(fund.yfSymbol);
        if (latestNav) console.log(`-> Encontrado NAV en Yahoo Finance: ${latestNav}`);
      }
      
      // 2. Fallback: QueFondos (si hay tvSymbol/ISIN)
      if (!latestNav && fund.tvSymbol && (fund.tvSymbol.startsWith("ES") || fund.tvSymbol.startsWith("LU"))) {
        console.log(`-> Yahoo Finance falló o no configurado. Intentando QueFondos para ISIN ${fund.tvSymbol}...`);
        latestNav = await fetchNavFromQf(fund.tvSymbol);
        if (latestNav) console.log(`-> Encontrado NAV en QueFondos: ${latestNav}`);
      }

      if (latestNav) {
        fund.nav = latestNav;
        
        // Añadir al registro histórico si es un día nuevo o actualizar el último punto
        const today = new Date().toISOString().split('T')[0];
        const lastHistory = fund.history[fund.history.length - 1];
        
        if (lastHistory && lastHistory.date === today) {
          lastHistory.nav = latestNav;
        } else {
          fund.history.push({ date: today, nav: latestNav });
          // Mantener historial a 60 días en la demo (borrar más antiguo si aplica)
          if (fund.history.length > 250) fund.history.shift(); 
        }
        updatedCount++;
      } else {
        console.log(`-> ❌ No se encontraron datos para ${fund.name} en ninguna fuente.`);
      }
    }
  }

  fs.writeFileSync(DB_PATH, JSON.stringify(managersData, null, 2));
  console.log(`Scraping finalizado. ${updatedCount} fondos actualizados.`);
  return managersData;
};

// Si se llama directamente desde CLI
if (process.argv[1] && process.argv[1].includes('scraper.js')) {
  runScraper();
}
