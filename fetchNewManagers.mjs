import fs from 'fs';

const DB_PATH = './server/db.json';
const MS_SEARCH_URL = 'https://www.morningstar.es/es/util/SecuritySearch.ashx?source=nav&q=';

const findMorningstarId = async (isin) => {
  try {
    const res = await fetch(MS_SEARCH_URL + isin);
    const data = await res.text();
    const match = data.match(/\{"i":"(.*?)"/);
    if (match && match[1]) return match[1];
    return null;
  } catch (err) {
    console.error('Error buscando SecId:', err.message);
    return null;
  }
};

const fetchHistoricalNavs = async (secId) => {
  const url = `https://tools.morningstar.es/api/rest.svc/timeseries_price/t92wz0sj7c?id=${secId}%5D2%5D1%5D&currencyId=EUR&idtype=Morningstar&frequency=daily&startDate=2017-01-01&outputType=COMPACTJSON`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map(p => ({
        date: new Date(p[0]).toISOString().split('T')[0],
        nav: parseFloat(p[1])
      }));
    }
    return [];
  } catch (err) {
    console.error('Error bajando historial:', err.message);
    return [];
  }
};

const managersData = JSON.parse(fs.readFileSync(DB_PATH));
const targets = ['ES0147622031', 'IE00BH4GY777'];

for (const manager of managersData) {
  for (const fund of manager.funds) {
    const isin = fund.isin || fund.tvSymbol;
    if (!targets.includes(isin)) continue;

    console.log(`\n[${fund.name}] Buscando en Morningstar (${isin})...`);
    const secId = await findMorningstarId(isin);

    if (secId) {
      console.log(`  -> SecId encontrado: ${secId}. Descargando historial...`);
      const history = await fetchHistoricalNavs(secId);
      if (history.length > 0) {
        fund.history = history;
        fund.nav = history[history.length - 1].nav;
        console.log(`  -> OK: ${history.length} puntos históricos. NAV actual: ${fund.nav}`);
      } else {
        console.log(`  -> Sin datos de historial disponibles.`);
      }
    } else {
      console.log(`  -> No encontrado en Morningstar.`);
    }
  }
}

fs.writeFileSync(DB_PATH, JSON.stringify(managersData, null, 2));
console.log('\nListo. db.json actualizado.');
