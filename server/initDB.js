import fs from 'fs';
import { managersData } from '../src/data/mockManagers.js';

const initDB = () => {
  const dbPath = './server/db.json';
  if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, JSON.stringify(managersData, null, 2));
    console.log('Base de datos inicializada en server/db.json');
  } else {
    console.log('La base de datos ya existe.');
  }
};

initDB();
