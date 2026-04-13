import fs from 'fs';

const DB_PATH = './server/db.json';

const rawData = fs.readFileSync(DB_PATH);
const managersData = JSON.parse(rawData);

// Función para generar una fecha de compra simulada (hace 6 meses a 3 años)
const generateRandomBuyDate = () => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate.getTime() - (Math.random() * 2.5 * 365 + 180) * 24 * 60 * 60 * 1000);
  return pastDate.toISOString().split('T')[0];
};

// Función para generar una rentabilidad simulada basada en el sector
const generateRandomReturn = (sector) => {
  let min = -15;
  let max = 40;
  
  if (sector === 'Tecnología' || sector === 'Software' || sector === 'Semiconductores') {
    min = -5; max = 150;
  } else if (sector === 'Energía') {
    min = -20; max = 60;
  }
  
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
};

let count = 0;

for (let manager of managersData) {
  if (manager.funds) {
    for (let fund of manager.funds) {
      if (fund.topPositions) {
        for (let pos of fund.topPositions) {
          // Solo añadimos si no tiene
          if (!pos.buyDate || !pos.returnPct) {
            pos.buyDate = generateRandomBuyDate();
            pos.returnPct = generateRandomReturn(pos.sector);
            // Buy Price simulado (base arbitraria para el ejemplo visual)
            pos.buyPrice = parseFloat((Math.random() * 200 + 20).toFixed(2));
            pos.currentPrice = parseFloat((pos.buyPrice * (1 + pos.returnPct / 100)).toFixed(2));
            count++;
          }
        }
      }
    }
  }
}

fs.writeFileSync(DB_PATH, JSON.stringify(managersData, null, 2));
console.log(`Se han añadido datos simulados de compra y rentabilidad a ${count} posiciones.`);
