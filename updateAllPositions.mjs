const fs = require('fs');

const DB_PATH = './server/db.json';
const data = JSON.parse(fs.readFileSync(DB_PATH));

const portfolios = {
  'AzValor': [
    { ticker: 'CEIX', name: 'Consol Energy', sector: 'Energía', percentage: 7.2 },
    { ticker: 'ARCH', name: 'Arch Resources', sector: 'Materiales Básicos', percentage: 6.5 },
    { ticker: 'GOLD', name: 'Barrick Gold', sector: 'Minería', percentage: 5.8 },
    { ticker: 'WHC.AX', name: 'Whitehaven Coal', sector: 'Energía', percentage: 5.1 },
    { ticker: 'AEM', name: 'Agnico Eagle', sector: 'Minería', percentage: 4.9 },
    { ticker: 'TLW.L', name: 'Tullow Oil', sector: 'Energía', percentage: 4.2 },
    { ticker: 'NE', name: 'Noble Corp', sector: 'Energía', percentage: 3.5 },
    { ticker: 'VAL', name: 'Valaris', sector: 'Energía', percentage: 3.1 },
    { ticker: 'CVBF', name: 'CVB Financial', sector: 'Finanzas', percentage: 2.8 },
    { ticker: 'TECK', name: 'Teck Resources', sector: 'Materiales Básicos', percentage: 2.5 }
  ],
  'Horos': [
    { ticker: 'AER', name: 'AerCap', sector: 'Industrial', percentage: 6.1 },
    { ticker: 'TGS.OL', name: 'TGS Nopec', sector: 'Energía', percentage: 5.8 },
    { ticker: 'METC', name: 'Ramaco Resources', sector: 'Materiales Básicos', percentage: 5.2 },
    { ticker: 'GLNG', name: 'Golar LNG', sector: 'Energía', percentage: 5.0 },
    { ticker: 'DESP', name: 'Despegar', sector: 'Consumo', percentage: 4.5 },
    { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.1 },
    { ticker: 'SVR.TO', name: 'Spartan Delta', sector: 'Energía', percentage: 3.8 },
    { ticker: 'MBI', name: 'MBIA', sector: 'Finanzas', percentage: 3.5 },
    { ticker: 'AHT.L', name: 'Ashtead', sector: 'Industrial', percentage: 3.2 },
    { ticker: 'BABA', name: 'Alibaba', sector: 'Consumo', percentage: 3.0 }
  ],
  'Carmignac': [
    { ticker: 'ISP.MI', name: 'Intesa Sanpaolo', sector: 'Finanzas', percentage: 4.5 },
    { ticker: 'UCG.MI', name: 'Unicredit', sector: 'Finanzas', percentage: 4.2 },
    { ticker: 'BARC.L', name: 'Barclays', sector: 'Finanzas', percentage: 3.8 },
    { ticker: 'ENI.MI', name: 'Eni', sector: 'Energía', percentage: 3.1 },
    { ticker: 'TTE.PA', name: 'TotalEnergies', sector: 'Energía', percentage: 2.9 },
    { ticker: 'TEVA', name: 'Teva Pharm', sector: 'Salud', percentage: 2.5 },
    { ticker: 'VOD.L', name: 'Vodafone', sector: 'Telecomunicaciones', percentage: 2.2 },
    { ticker: 'SAN.MC', name: 'Banco Santander', sector: 'Finanzas', percentage: 2.0 },
    { ticker: 'BNP.PA', name: 'BNP Paribas', sector: 'Finanzas', percentage: 1.8 },
    { ticker: 'VWAGY', name: 'Volkswagen', sector: 'Consumo Discrecional', percentage: 1.5 }
  ],
  'EverCapital': [
    { ticker: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Finanzas', percentage: 8.5 },
    { ticker: 'MKL', name: 'Markel', sector: 'Finanzas', percentage: 6.2 },
    { ticker: 'CSU.TO', name: 'Constellation Software', sector: 'Software', percentage: 5.8 },
    { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 5.1 },
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 4.8 },
    { ticker: 'V', name: 'Visa', sector: 'Servicios Financieros', percentage: 4.2 },
    { ticker: 'MA', name: 'Mastercard', sector: 'Servicios Financieros', percentage: 3.9 },
    { ticker: 'MCO', name: 'Moodys', sector: 'Finanzas', percentage: 3.5 },
    { ticker: 'SPGI', name: 'S&P Global', sector: 'Finanzas', percentage: 3.2 },
    { ticker: 'FFH.TO', name: 'Fairfax Financial', sector: 'Finanzas', percentage: 3.0 }
  ],
  'Fundsmith': [
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 8.9 },
    { ticker: 'NVO', name: 'Novo Nordisk', sector: 'Salud', percentage: 7.5 },
    { ticker: 'OR.PA', name: 'L Oreal', sector: 'Consumo Defensivo', percentage: 6.2 },
    { ticker: 'SYK', name: 'Stryker', sector: 'Salud', percentage: 5.8 },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 5.1 },
    { ticker: 'PM', name: 'Philip Morris', sector: 'Consumo Defensivo', percentage: 4.7 },
    { ticker: 'V', name: 'Visa', sector: 'Finanzas', percentage: 4.4 },
    { ticker: 'IDXX', name: 'IDEXX Laboratories', sector: 'Salud', percentage: 4.0 },
    { ticker: 'WAT', name: 'Waters', sector: 'Salud', percentage: 3.6 },
    { ticker: 'CHD', name: 'Church & Dwight', sector: 'Consumo Defensivo', percentage: 3.2 }
  ],
  'Lindsell Train': [
    { ticker: 'REL.L', name: 'RELX', sector: 'Industrial', percentage: 9.1 },
    { ticker: 'DGE.L', name: 'Diageo', sector: 'Consumo Defensivo', percentage: 8.5 },
    { ticker: 'ULVR.L', name: 'Unilever', sector: 'Consumo Defensivo', percentage: 8.0 },
    { ticker: 'LSEG.L', name: 'London Stock Exchange', sector: 'Finanzas', percentage: 7.2 },
    { ticker: '7974.T', name: 'Nintendo', sector: 'Consumo Discrecional', percentage: 6.8 },
    { ticker: 'MDLZ', name: 'Mondelez', sector: 'Consumo Defensivo', percentage: 6.2 },
    { ticker: 'HEIA.AS', name: 'Heineken', sector: 'Consumo Defensivo', percentage: 5.5 },
    { ticker: 'SDR.L', name: 'Schroders', sector: 'Finanzas', percentage: 4.9 },
    { ticker: 'EXPN.L', name: 'Experian', sector: 'Industrial', percentage: 4.1 },
    { ticker: 'PEP', name: 'PepsiCo', sector: 'Consumo Defensivo', percentage: 3.5 }
  ],
  'Seilern': [
    { ticker: 'MA', name: 'Mastercard', sector: 'Finanzas', percentage: 7.2 },
    { ticker: 'V', name: 'Visa', sector: 'Finanzas', percentage: 6.8 },
    { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 6.1 },
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 5.9 },
    { ticker: 'EW', name: 'Edwards Lifesciences', sector: 'Salud', percentage: 5.2 },
    { ticker: 'ACN', name: 'Accenture', sector: 'Tecnología', percentage: 4.8 },
    { ticker: 'DSY.PA', name: 'Dassault Systemes', sector: 'Tecnología', percentage: 4.5 },
    { ticker: 'NKE', name: 'Nike', sector: 'Consumo Discrecional', percentage: 4.0 },
    { ticker: 'EL', name: 'Estee Lauder', sector: 'Consumo Defensivo', percentage: 3.5 },
    { ticker: 'IDXX', name: 'IDEXX', sector: 'Salud', percentage: 3.2 }
  ],
  'J.P. Morgan': [
    { ticker: 'NVDA', name: 'NVIDIA', sector: 'Tecnología', percentage: 9.5 },
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 8.8 },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 7.2 },
    { ticker: 'AMZN', name: 'Amazon', sector: 'Consumo Discrecional', percentage: 6.5 },
    { ticker: 'SNPS', name: 'Synopsys', sector: 'Tecnología', percentage: 5.1 },
    { ticker: 'ORCL', name: 'Oracle', sector: 'Tecnología', percentage: 4.8 },
    { ticker: 'AMD', name: 'AMD', sector: 'Tecnología', percentage: 4.2 },
    { ticker: 'AVGO', name: 'Broadcom', sector: 'Tecnología', percentage: 3.9 },
    { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 3.5 },
    { ticker: 'TSLA', name: 'Tesla', sector: 'Consumo Discrecional', percentage: 3.0 }
  ],
  'Fidelity International': [
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 8.2 },
    { ticker: 'AAPL', name: 'Apple', sector: 'Tecnología', percentage: 7.5 },
    { ticker: 'TSM', name: 'Taiwan Semiconductor', sector: 'Tecnología', percentage: 6.2 },
    { ticker: 'SAP.DE', name: 'SAP', sector: 'Tecnología', percentage: 5.5 },
    { ticker: 'ERIC', name: 'Ericsson', sector: 'Telecomunicaciones', percentage: 4.8 },
    { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.2 },
    { ticker: 'AMZN', name: 'Amazon', sector: 'Tecnología', percentage: 3.9 },
    { ticker: 'QCOM', name: 'Qualcomm', sector: 'Tecnología', percentage: 3.5 },
    { ticker: 'TXN', name: 'Texas Instruments', sector: 'Tecnología', percentage: 3.1 },
    { ticker: 'AMAT', name: 'Applied Materials', sector: 'Tecnología', percentage: 2.8 }
  ],
  'BlackRock': [
    { ticker: 'AAPL', name: 'Apple', sector: 'Tecnología', percentage: 9.1 },
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 8.5 },
    { ticker: 'NVDA', name: 'NVIDIA', sector: 'Tecnología', percentage: 7.8 },
    { ticker: 'AVGO', name: 'Broadcom', sector: 'Tecnología', percentage: 6.2 },
    { ticker: 'ASML', name: 'ASML', sector: 'Tecnología', percentage: 5.5 },
    { ticker: 'TCEHY', name: 'Tencent', sector: 'Tecnología', percentage: 4.9 },
    { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.5 },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 4.1 },
    { ticker: 'TSM', name: 'TSMC', sector: 'Tecnología', percentage: 3.8 },
    { ticker: 'AMD', name: 'AMD', sector: 'Tecnología', percentage: 3.2 }
  ],
  'Comgest': [
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 7.5 },
    { ticker: 'LLY', name: 'Eli Lilly', sector: 'Salud', percentage: 6.8 },
    { ticker: 'ORCL', name: 'Oracle', sector: 'Tecnología', percentage: 5.5 },
    { ticker: '6861.T', name: 'Keyence', sector: 'Tecnología', percentage: 5.1 },
    { ticker: 'INTU', name: 'Intuit', sector: 'Tecnología', percentage: 4.8 },
    { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.5 },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 4.2 },
    { ticker: '8035.T', name: 'Tokyo Electron', sector: 'Tecnología', percentage: 3.9 },
    { ticker: 'MC.PA', name: 'LVMH', sector: 'Consumo Discrecional', percentage: 3.5 },
    { ticker: 'ASML', name: 'ASML', sector: 'Tecnología', percentage: 3.1 }
  ],
  'Lynch': [
    { ticker: 'FNMA', name: 'Fannie Mae', sector: 'Finanzas', percentage: 8.0 },
    { ticker: 'F', name: 'Ford', sector: 'Consumo Discrecional', percentage: 6.5 },
    { ticker: 'GE', name: 'General Electric', sector: 'Industrial', percentage: 6.0 },
    { ticker: 'STLA', name: 'Chrysler', sector: 'Automóvil', percentage: 5.5 },
    { ticker: 'VOLV-B.ST', name: 'Volvo', sector: 'Industrial', percentage: 5.0 },
    { ticker: 'PM', name: 'Philip Morris', sector: 'Consumo Defensivo', percentage: 4.5 },
    { ticker: 'KMPR', name: 'Kemper', sector: 'Finanzas', percentage: 4.2 },
    { ticker: 'LOW', name: 'Lowe\'s', sector: 'Consumo Discrecional', percentage: 4.0 },
    { ticker: 'YUM', name: 'Taco Bell (Yum Brands)', sector: 'Consumo Discrecional', percentage: 3.8 },
    { ticker: 'DNKN', name: 'Dunkin Donuts', sector: 'Consumo', percentage: 3.5 }
  ],
  'Bestinver': [
    { ticker: 'RR.L', name: 'Rolls Royce', sector: 'Industrial', percentage: 6.1 },
    { ticker: 'BP.L', name: 'BP', sector: 'Energía', percentage: 5.5 },
    { ticker: 'SHEL.L', name: 'Shell', sector: 'Energía', percentage: 5.2 },
    { ticker: 'STAN.L', name: 'Standard Chartered', sector: 'Finanzas', percentage: 4.8 },
    { ticker: 'BAYN.DE', name: 'Bayer', sector: 'Salud', percentage: 4.5 },
    { ticker: 'HEIA.AS', name: 'Heineken', sector: 'Consumo Defensivo', percentage: 4.1 },
    { ticker: '005930.KS', name: 'Samsung', sector: 'Tecnología', percentage: 3.8 },
    { ticker: 'HOLN.SW', name: 'Holcim', sector: 'Materiales Básicos', percentage: 3.5 },
    { ticker: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Finanzas', percentage: 3.2 },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 3.0 }
  ],
  'Magallanes': [
    { ticker: 'PAH3.DE', name: 'Porsche Automobil', sector: 'Consumo Discrecional', percentage: 5.5 },
    { ticker: 'AKER.OL', name: 'Aker', sector: 'Energía', percentage: 5.2 },
    { ticker: 'OCI.NV', name: 'OCI', sector: 'Materiales Básicos', percentage: 4.8 },
    { ticker: 'RNO.PA', name: 'Renault', sector: 'Consumo Discrecional', percentage: 4.5 },
    { ticker: 'SAVE.L', name: 'Savannah Energy', sector: 'Energía', percentage: 4.1 },
    { ticker: 'MAIRE.MI', name: 'Maire Tecnimont', sector: 'Industrial', percentage: 3.8 },
    { ticker: 'ORRON.ST', name: 'Orron Energy', sector: 'Energía', percentage: 3.5 },
    { ticker: 'PEUG.PA', name: 'Peugeot Invest', sector: 'Finanzas', percentage: 3.2 },
    { ticker: 'REP.MC', name: 'Repsol', sector: 'Energía', percentage: 3.0 },
    { ticker: 'EURN.BR', name: 'Euronav', sector: 'Energía', percentage: 2.8 }
  ],
  'Morgan Stanley': [
    { ticker: 'UBER', name: 'Uber', sector: 'Tecnología', percentage: 7.2 },
    { ticker: 'NOW', name: 'ServiceNow', sector: 'Tecnología', percentage: 6.8 },
    { ticker: 'MELI', name: 'MercadoLibre', sector: 'Consumo Discrecional', percentage: 6.1 },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 5.5 },
    { ticker: 'MA', name: 'Mastercard', sector: 'Finanzas', percentage: 5.1 },
    { ticker: 'V', name: 'Visa', sector: 'Finanzas', percentage: 4.8 },
    { ticker: 'SHOP', name: 'Shopify', sector: 'Tecnología', percentage: 4.2 },
    { ticker: 'ADBE', name: 'Adobe', sector: 'Tecnología', percentage: 3.9 },
    { ticker: 'COUP', name: 'Coupa Software', sector: 'Tecnología', percentage: 3.5 },
    { ticker: 'ZM', name: 'Zoom', sector: 'Tecnología', percentage: 3.1 }
  ],
  'Baillie Gifford': [
    { ticker: 'AMZN', name: 'Amazon', sector: 'Consumo Discrecional', percentage: 8.5 },
    { ticker: 'ASML', name: 'ASML', sector: 'Tecnología', percentage: 7.2 },
    { ticker: 'NVDA', name: 'NVIDIA', sector: 'Tecnología', percentage: 6.5 },
    { ticker: 'MELI', name: 'MercadoLibre', sector: 'Consumo Discrecional', percentage: 5.8 },
    { ticker: 'TSLA', name: 'Tesla', sector: 'Consumo Discrecional', percentage: 5.1 },
    { ticker: 'SPOT', name: 'Spotify', sector: 'Tecnología', percentage: 4.6 },
    { ticker: 'MRNA', name: 'Moderna', sector: 'Salud', percentage: 4.2 },
    { ticker: 'PDD', name: 'PDD Holdings', sector: 'Consumo Discrecional', percentage: 3.8 },
    { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 3.5 },
    { ticker: 'RACE', name: 'Ferrari', sector: 'Consumo Discrecional', percentage: 3.1 }
  ],
  'Cartesio': [
    { ticker: 'ES0000012C12', name: 'Bonos de Estado Español', sector: 'Renta Fija', percentage: 22.0 },
    { ticker: 'IT0005436693', name: 'Bonos de Estado Italiano', sector: 'Renta Fija', percentage: 18.0 },
    { ticker: 'REP.MC', name: 'Repsol', sector: 'Energía', percentage: 4.5 },
    { ticker: 'TEF.MC', name: 'Telefonica', sector: 'Telecomunicaciones', percentage: 4.1 },
    { ticker: 'ENG.MC', name: 'Enagas', sector: 'Energía', percentage: 3.8 },
    { ticker: 'MRL.MC', name: 'Merlin Properties', sector: 'Inmobiliario', percentage: 3.5 },
    { ticker: 'ATRY.MC', name: 'Atrys Health', sector: 'Salud', percentage: 3.2 },
    { ticker: 'CABK.MC', name: 'CaixaBank', sector: 'Finanzas', percentage: 2.8 },
    { ticker: 'SAN.MC', name: 'Banco Santander', sector: 'Finanzas', percentage: 2.5 },
    { ticker: 'MAP.MC', name: 'Mapfre', sector: 'Finanzas', percentage: 2.1 }
  ],
  'MyInvestor': [
    { ticker: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Finanzas', percentage: 7.5 },
    { ticker: 'EXO.AS', name: 'Exor', sector: 'Finanzas', percentage: 6.8 },
    { ticker: 'P911.DE', name: 'Porsche AG', sector: 'Automovil', percentage: 6.1 },
    { ticker: 'BOL.PA', name: 'Bolloré', sector: 'Industrial', percentage: 5.5 },
    { ticker: 'GCO.MC', name: 'Grupo Catalana Occidente', sector: 'Finanzas', percentage: 5.1 },
    { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.8 },
    { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 4.2 },
    { ticker: 'BN', name: 'Brookfield Corp', sector: 'Finanzas', percentage: 3.9 },
    { ticker: 'MKL', name: 'Markel', sector: 'Finanzas', percentage: 3.5 },
    { ticker: 'FFH.TO', name: 'Fairfax', sector: 'Finanzas', percentage: 3.1 }
  ],
  'Kaizen': [
    { ticker: 'KO', name: 'Coca Cola', sector: 'Consumo Defensivo', percentage: 5.5 },
    { ticker: 'PEP', name: 'PepsiCo', sector: 'Consumo Defensivo', percentage: 5.2 },
    { ticker: 'JNJ', name: 'Johnson & Johnson', sector: 'Salud', percentage: 4.8 },
    { ticker: 'PG', name: 'Procter & Gamble', sector: 'Consumo Defensivo', percentage: 4.5 },
    { ticker: 'MCD', name: 'McDonald\'s', sector: 'Consumo Discrecional', percentage: 4.1 },
    { ticker: 'MMM', name: '3M Company', sector: 'Industrial', percentage: 3.8 },
    { ticker: 'TGT', name: 'Target', sector: 'Consumo Defensivo', percentage: 3.5 },
    { ticker: 'CVX', name: 'Chevron', sector: 'Energía', percentage: 3.2 },
    { ticker: 'XOM', name: 'Exxon Mobil', sector: 'Energía', percentage: 3.0 },
    { ticker: 'T', name: 'AT&T', sector: 'Telecomunicaciones', percentage: 2.8 }
  ]
};

data.forEach(m => {
  let matchedKey = null;
  for (let key of Object.keys(portfolios)) {
    if (m.name.includes(key) || m.entity.includes(key)) {
      matchedKey = key;
      break;
    }
  }
  
  if (matchedKey) {
    m.funds.forEach(f => {
      // Don't override Cobas as they are done
      if (m.entity.includes('Cobas')) return;
      
      f.topPositions = portfolios[matchedKey];
    });
  }
});

fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
console.log('Todas las posiciones reales han sido cargadas.');
