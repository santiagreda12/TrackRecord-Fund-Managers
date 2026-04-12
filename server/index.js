import express from 'express';
import cors from 'cors';
import fs from 'fs';
import cron from 'node-cron';
import rateLimit from 'express-rate-limit';
import { runScraper } from './scraper.js';

const SUGGESTIONS_PATH = './server/suggestions.json';

// Sanitizar texto: eliminar HTML, scripts y caracteres peligrosos
const sanitize = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')         // Elimina tags HTML
    .replace(/[<>"'`;]/g, '')        // Elimina caracteres peligrosos
    .trim()
    .substring(0, 300);              // Límite de 300 caracteres
};

// Rate limiter: máx 5 sugerencias por IP cada 15 minutos
const suggestLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Demasiadas solicitudes. Por favor espera 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const app = express();
const PORT = 3001;
const DB_PATH = './server/db.json';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json({ limit: '10kb' })); 

// Servir la aplicación React estática generada por Vite
app.use(express.static(path.join(__dirname, '../dist')));

// Endpoint para obtener los gestores y fondos
app.get('/api/managers', (req, res) => {
  try {
    const rawData = fs.readFileSync(DB_PATH);
    const data = JSON.parse(rawData);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error interno leyendo la base de datos' });
  }
});

// Endpoint para forzar un scrapeo
app.post('/api/scrape', async (req, res) => {
  try {
    const newData = await runScraper();
    res.json({ success: true, updated: true });
  } catch (error) {
    res.status(500).json({ error: 'Fallo durante el webhook' });
  }
});

// Endpoint para obtener sugerencias (Admin)
app.get('/api/suggestions', (req, res) => {
  try {
    if (fs.existsSync(SUGGESTIONS_PATH)) {
      const suggestions = JSON.parse(fs.readFileSync(SUGGESTIONS_PATH));
      res.json(suggestions);
    } else {
      res.json([]);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error leyendo sugerencias' });
  }
});

// Endpoint de sugerencias con rate limiting y sanitización completa
app.post('/api/suggest', suggestLimiter, (req, res) => {
  try {
    const { nombre, fondo, motivo } = req.body;

    // Validar campos obligatorios
    if (!nombre || !fondo) {
      return res.status(400).json({ error: 'El nombre del gestor y el fondo son obligatorios.' });
    }

    // Sanitizar todos los campos
    const entry = {
      fecha: new Date().toISOString(),
      nombre: sanitize(nombre),
      fondo: sanitize(fondo),
      motivo: sanitize(motivo || ''),
      ip: req.ip,
    };

    // Leer archivo existente y añadir nueva sugerencia
    let suggestions = [];
    if (fs.existsSync(SUGGESTIONS_PATH)) {
      suggestions = JSON.parse(fs.readFileSync(SUGGESTIONS_PATH));
    }
    suggestions.push(entry);

    // Limitar a las últimas 500 sugerencias para evitar crecimiento infinito
    if (suggestions.length > 500) suggestions.shift();

    fs.writeFileSync(SUGGESTIONS_PATH, JSON.stringify(suggestions, null, 2));
    console.log(`[Sugerencia recibida] ${entry.nombre} - ${entry.fondo}`);
    res.json({ success: true, message: '¡Sugerencia recibida! Gracias por tu aportación.' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno procesando la sugerencia.' });
  }
});

// Arrancar cron job que se ejecuta diariamente a las 23:30 (Cierre de mercados consolidado)
cron.schedule('30 23 * * *', () => {
  console.log('Ejecutando cron diario para recolección de NAV...');
  runScraper();
});

// Enviar peticiones que no sean de API al frontend de React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// En producción (Render/Heroku/Railway) usará process.env.PORT, en local será 3001
const ACTIVE_PORT = process.env.PORT || PORT;

app.listen(ACTIVE_PORT, () => {
  console.log(`Backend API/Server ejecutándose en puerto ${ACTIVE_PORT}`);
  console.log(`Web scraper programado a las 23:30 diariamente.`);
});
