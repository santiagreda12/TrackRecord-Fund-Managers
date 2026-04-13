const fs = require('fs');

const DB_PATH = './server/db.json';
const data = JSON.parse(fs.readFileSync(DB_PATH));

const realPortfolios = [
  {
    match: (m) => m.entity.includes('AzValor'),
    positions: [
      { ticker: 'GOLD', name: 'Barrick Gold', sector: 'Minería', percentage: 7.5 },
      { ticker: 'NE', name: 'Noble Corporation', sector: 'Energía', percentage: 7.0 },
      { ticker: 'SLB', name: 'Schlumberger', sector: 'Energía', percentage: 6.8 },
      { ticker: 'WHC.AX', name: 'Whitehaven Coal', sector: 'Energía', percentage: 6.1 },
      { ticker: 'ARCH', name: 'Arch Resources', sector: 'Materiales', percentage: 5.5 },
      { ticker: 'AEM', name: 'Agnico Eagle', sector: 'Minería', percentage: 5.0 },
      { ticker: 'CEIX', name: 'CONSOL Energy', sector: 'Energía', percentage: 4.8 },
      { ticker: 'TLW.L', name: 'Tullow Oil', sector: 'Energía', percentage: 4.2 },
      { ticker: 'VAL', name: 'Valaris', sector: 'Energía', percentage: 3.9 },
      { ticker: 'TECK', name: 'Teck Resources', sector: 'Materiales', percentage: 3.5 }
    ]
  },
  {
    match: (m) => m.entity.includes('Horos'),
    positions: [
      { ticker: 'AER', name: 'AerCap', sector: 'Industrial', percentage: 6.1 },
      { ticker: 'TGS.OL', name: 'TGS Nopec', sector: 'Energía', percentage: 5.8 },
      { ticker: 'METC', name: 'Ramaco Resources', sector: 'Materiales', percentage: 5.2 },
      { ticker: 'GLNG', name: 'Golar LNG', sector: 'Energía', percentage: 5.0 },
      { ticker: 'DESP', name: 'Despegar.com', sector: 'Consumo Discrecional', percentage: 4.5 },
      { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.1 },
      { ticker: 'MBI', name: 'MBIA Inc.', sector: 'Finanzas', percentage: 3.5 },
      { ticker: 'BABA', name: 'Alibaba', sector: 'Consumo Discrecional', percentage: 3.0 },
      { ticker: 'SDY.L', name: 'Speedy Hire', sector: 'Industrial', percentage: 2.8 },
      { ticker: 'DEN', name: 'Denbury Resources', sector: 'Energía', percentage: 2.5 }
    ]
  },
  {
    match: (m) => m.entity.includes('Carmignac'),
    positions: [
      { ticker: 'ISP.MI', name: 'Intesa Sanpaolo', sector: 'Finanzas', percentage: 4.5 },
      { ticker: 'UCG.MI', name: 'UniCredit', sector: 'Finanzas', percentage: 4.2 },
      { ticker: 'BARC.L', name: 'Barclays', sector: 'Finanzas', percentage: 3.8 },
      { ticker: 'TTE.PA', name: 'TotalEnergies', sector: 'Energía', percentage: 3.5 },
      { ticker: 'ENI.MI', name: 'Eni', sector: 'Energía', percentage: 3.1 },
      { ticker: 'TEVA', name: 'Teva Pharmaceutical', sector: 'Salud', percentage: 2.5 },
      { ticker: 'VOD.L', name: 'Vodafone', sector: 'Telecomunicaciones', percentage: 2.2 },
      { ticker: 'SAN.MC', name: 'Banco Santander', sector: 'Finanzas', percentage: 2.0 },
      { ticker: 'BNP.PA', name: 'BNP Paribas', sector: 'Finanzas', percentage: 1.8 },
      { ticker: 'VWAGY', name: 'Volkswagen', sector: 'Consumo Discrecional', percentage: 1.5 }
    ]
  },
  {
    match: (m) => m.entity.includes('Fundsmith'),
    positions: [
      { ticker: 'MAR', name: 'Marriott International', sector: 'Consumo Discrecional', percentage: 7.2 },
      { ticker: 'OR.PA', name: "L'Oreal", sector: 'Consumo Defensivo', percentage: 6.5 },
      { ticker: 'SYK', name: 'Stryker', sector: 'Salud', percentage: 6.1 },
      { ticker: 'WAT', name: 'Waters Corp', sector: 'Salud', percentage: 5.8 },
      { ticker: 'V', name: 'Visa', sector: 'Finanzas', percentage: 5.5 },
      { ticker: 'PM', name: 'Philip Morris', sector: 'Consumo Defensivo', percentage: 5.2 },
      { ticker: 'IDXX', name: 'IDEXX Laboratories', sector: 'Salud', percentage: 5.0 },
      { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.8 },
      { ticker: 'AMS.SW', name: 'Amadeus IT', sector: 'Tecnología', percentage: 4.5 },
      { ticker: 'MC.PA', name: 'LVMH', sector: 'Consumo Discrecional', percentage: 4.2 }
    ]
  },
  {
    match: (m) => m.entity.includes('Lindsell') || m.entity.includes('Train'),
    positions: [
      { ticker: '7974.T', name: 'Nintendo', sector: 'Consumo Discrecional', percentage: 9.2 },
      { ticker: 'REL.L', name: 'RELX', sector: 'Industrial', percentage: 8.5 },
      { ticker: 'LSEG.L', name: 'London Stock Exchange Group', sector: 'Finanzas', percentage: 8.0 },
      { ticker: 'TKO', name: 'TKO Group Holdings', sector: 'Entretenimiento', percentage: 6.8 },
      { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 6.3 },
      { ticker: 'TMO', name: 'Thermo Fisher Scientific', sector: 'Salud', percentage: 4.9 },
      { ticker: 'DIS', name: 'The Walt Disney Company', sector: 'Entretenimiento', percentage: 4.9 },
      { ticker: 'DGE.L', name: 'Diageo', sector: 'Consumo Defensivo', percentage: 4.7 },
      { ticker: 'UMG.AS', name: 'Universal Music Group', sector: 'Entretenimiento', percentage: 4.4 },
      { ticker: 'INTU', name: 'Intuit', sector: 'Tecnología', percentage: 4.2 }
    ]
  },
  {
    match: (m) => m.entity.includes('Seilern'),
    positions: [
      { ticker: 'MA', name: 'Mastercard', sector: 'Finanzas', percentage: 7.2 },
      { ticker: 'V', name: 'Visa', sector: 'Finanzas', percentage: 6.8 },
      { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 6.1 },
      { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 5.9 },
      { ticker: 'EW', name: 'Edwards Lifesciences', sector: 'Salud', percentage: 5.2 },
      { ticker: 'ACN', name: 'Accenture', sector: 'Tecnología', percentage: 4.8 },
      { ticker: 'DSY.PA', name: 'Dassault Systemes', sector: 'Tecnología', percentage: 4.5 },
      { ticker: 'NKE', name: 'Nike', sector: 'Consumo Discrecional', percentage: 4.0 },
      { ticker: 'EL', name: 'Estee Lauder', sector: 'Consumo Defensivo', percentage: 3.5 },
      { ticker: 'IDXX', name: 'IDEXX Laboratories', sector: 'Salud', percentage: 3.2 }
    ]
  },
  {
    match: (m) => m.entity.includes('J.P. Morgan') || m.entity.includes('JP Morgan'),
    positions: [
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
    ]
  },
  {
    match: (m) => m.entity.includes('Fidelity International'),
    positions: [
      { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 8.2 },
      { ticker: 'AAPL', name: 'Apple', sector: 'Tecnología', percentage: 7.5 },
      { ticker: 'TSM', name: 'Taiwan Semiconductor', sector: 'Tecnología', percentage: 6.2 },
      { ticker: 'SAP.DE', name: 'SAP', sector: 'Tecnología', percentage: 5.5 },
      { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.2 },
      { ticker: 'AMZN', name: 'Amazon', sector: 'Tecnología', percentage: 3.9 },
      { ticker: 'QCOM', name: 'Qualcomm', sector: 'Tecnología', percentage: 3.5 },
      { ticker: 'ASML', name: 'ASML Holding', sector: 'Tecnología', percentage: 3.2 },
      { ticker: 'TXN', name: 'Texas Instruments', sector: 'Tecnología', percentage: 3.1 },
      { ticker: 'AMAT', name: 'Applied Materials', sector: 'Tecnología', percentage: 2.8 }
    ]
  },
  {
    match: (m) => m.entity.includes('BlackRock'),
    positions: [
      { ticker: 'AAPL', name: 'Apple', sector: 'Tecnología', percentage: 9.1 },
      { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 8.5 },
      { ticker: 'NVDA', name: 'NVIDIA', sector: 'Tecnología', percentage: 7.8 },
      { ticker: 'AVGO', name: 'Broadcom', sector: 'Tecnología', percentage: 6.2 },
      { ticker: 'ASML', name: 'ASML Holding', sector: 'Tecnología', percentage: 5.5 },
      { ticker: 'TCEHY', name: 'Tencent Holdings', sector: 'Tecnología', percentage: 4.9 },
      { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.5 },
      { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 4.1 },
      { ticker: 'TSM', name: 'TSMC', sector: 'Tecnología', percentage: 3.8 },
      { ticker: 'AMD', name: 'AMD', sector: 'Tecnología', percentage: 3.2 }
    ]
  },
  {
    match: (m) => m.entity.includes('Comgest'),
    positions: [
      { ticker: 'TSM', name: 'Taiwan Semiconductor', sector: 'Tecnología', percentage: 7.5 },
      { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 6.8 },
      { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 6.2 },
      { ticker: 'JNJ', name: 'Johnson and Johnson', sector: 'Salud', percentage: 5.5 },
      { ticker: 'V', name: 'Visa', sector: 'Finanzas', percentage: 5.1 },
      { ticker: 'AMZN', name: 'Amazon', sector: 'Tecnología', percentage: 4.8 },
      { ticker: 'INTU', name: 'Intuit', sector: 'Tecnología', percentage: 4.5 },
      { ticker: 'LIN', name: 'Linde', sector: 'Materiales', percentage: 4.1 },
      { ticker: 'ESLO.AS', name: 'EssilorLuxottica', sector: 'Salud', percentage: 3.8 },
      { ticker: 'SPGI', name: 'SP Global', sector: 'Finanzas', percentage: 3.5 }
    ]
  },
  {
    match: (m) => m.entity.includes('Morgan Stanley'),
    positions: [
      { ticker: 'TSM', name: 'Taiwan Semiconductor', sector: 'Tecnología', percentage: 8.3 },
      { ticker: 'META', name: 'Meta Platforms', sector: 'Tecnología', percentage: 7.1 },
      { ticker: 'ASML', name: 'ASML Holding', sector: 'Tecnología', percentage: 5.7 },
      { ticker: 'SPOT', name: 'Spotify Technology', sector: 'Tecnología', percentage: 5.5 },
      { ticker: 'UBER', name: 'Uber Technologies', sector: 'Tecnología', percentage: 5.4 },
      { ticker: 'MELI', name: 'MercadoLibre', sector: 'Consumo Discrecional', percentage: 4.0 },
      { ticker: '000660.KS', name: 'SK Hynix', sector: 'Tecnología', percentage: 4.0 },
      { ticker: 'ADYEN.AS', name: 'Adyen', sector: 'Finanzas', percentage: 3.5 },
      { ticker: 'SHOP', name: 'Shopify', sector: 'Tecnología', percentage: 3.2 },
      { ticker: 'NVO', name: 'Novo Nordisk', sector: 'Salud', percentage: 2.9 }
    ]
  },
  {
    match: (m) => m.entity.includes('Baillie Gifford'),
    positions: [
      { ticker: 'NVDA', name: 'NVIDIA', sector: 'Tecnología', percentage: 7.8 },
      { ticker: 'AMZN', name: 'Amazon', sector: 'Consumo Discrecional', percentage: 7.2 },
      { ticker: 'ASML', name: 'ASML Holding', sector: 'Tecnología', percentage: 6.5 },
      { ticker: 'TSM', name: 'TSMC', sector: 'Tecnología', percentage: 5.8 },
      { ticker: 'APP', name: 'AppLovin Corp', sector: 'Tecnología', percentage: 5.2 },
      { ticker: 'NET', name: 'Cloudflare', sector: 'Tecnología', percentage: 4.8 },
      { ticker: 'TCEHY', name: 'Tencent Holdings', sector: 'Tecnología', percentage: 4.5 },
      { ticker: 'NU', name: 'Nu Holdings', sector: 'Finanzas', percentage: 4.1 },
      { ticker: 'SPOT', name: 'Spotify Technology', sector: 'Tecnología', percentage: 3.9 },
      { ticker: 'PDD', name: 'PDD Holdings', sector: 'Consumo Discrecional', percentage: 3.6 }
    ]
  },
  {
    match: (m) => m.entity.includes('Bestinver'),
    positions: [
      { ticker: 'RR.L', name: 'Rolls-Royce', sector: 'Industrial', percentage: 5.8 },
      { ticker: 'MT', name: 'ArcelorMittal', sector: 'Materiales', percentage: 5.2 },
      { ticker: 'SGO.PA', name: 'Saint-Gobain', sector: 'Industrial', percentage: 4.8 },
      { ticker: 'BARC.L', name: 'Barclays', sector: 'Finanzas', percentage: 4.5 },
      { ticker: 'NDA-FI.HE', name: 'Nordea', sector: 'Finanzas', percentage: 4.1 },
      { ticker: 'LLOY.L', name: 'Lloyds Banking Group', sector: 'Finanzas', percentage: 3.8 },
      { ticker: 'QCOM', name: 'Qualcomm', sector: 'Tecnología', percentage: 3.5 },
      { ticker: 'TSM', name: 'TSMC', sector: 'Tecnología', percentage: 3.2 },
      { ticker: 'PHIA.AS', name: 'Philips', sector: 'Salud', percentage: 2.9 },
      { ticker: 'HEIA.AS', name: 'Heineken', sector: 'Consumo Defensivo', percentage: 2.6 }
    ]
  },
  {
    match: (m) => m.entity.includes('Magallanes'),
    positions: [
      { ticker: 'PAH3.DE', name: 'Porsche Automobil Holding', sector: 'Consumo Discrecional', percentage: 5.5 },
      { ticker: 'AKER.OL', name: 'Aker BP', sector: 'Energía', percentage: 5.2 },
      { ticker: 'OCI.NV', name: 'OCI N.V.', sector: 'Materiales', percentage: 4.8 },
      { ticker: 'RNO.PA', name: 'Renault', sector: 'Consumo Discrecional', percentage: 4.5 },
      { ticker: 'MAIRE.MI', name: 'Maire Tecnimont', sector: 'Industrial', percentage: 4.1 },
      { ticker: 'PEUG.PA', name: 'Peugeot Invest', sector: 'Finanzas', percentage: 3.8 },
      { ticker: 'REP.MC', name: 'Repsol', sector: 'Energía', percentage: 3.5 },
      { ticker: 'CBK.DE', name: 'Commerzbank', sector: 'Finanzas', percentage: 3.2 },
      { ticker: 'EURN.BR', name: 'Euronav', sector: 'Energía', percentage: 2.9 },
      { ticker: 'ENO.MC', name: 'Elecnor', sector: 'Industrial', percentage: 2.6 }
    ]
  },
  {
    match: (m) => m.entity.includes('Cartesio'),
    positions: [
      { ticker: 'SPGB', name: 'Bonos Estado Espanol 2 anos', sector: 'Renta Fija Publica', percentage: 22.0 },
      { ticker: 'BTPS', name: 'Bonos Estado Italiano 2 anos', sector: 'Renta Fija Publica', percentage: 18.0 },
      { ticker: 'REP.MC', name: 'Repsol', sector: 'Energía', percentage: 4.5 },
      { ticker: 'TEF.MC', name: 'Telefonica', sector: 'Telecomunicaciones', percentage: 4.1 },
      { ticker: 'ENG.MC', name: 'Enagas', sector: 'Energía', percentage: 3.8 },
      { ticker: 'MRL.MC', name: 'Merlin Properties', sector: 'Inmobiliario', percentage: 3.5 },
      { ticker: 'CABK.MC', name: 'CaixaBank', sector: 'Finanzas', percentage: 2.8 },
      { ticker: 'SAN.MC', name: 'Banco Santander', sector: 'Finanzas', percentage: 2.5 },
      { ticker: 'MAP.MC', name: 'Mapfre', sector: 'Finanzas', percentage: 2.1 },
      { ticker: 'IBE.MC', name: 'Iberdrola', sector: 'Utilities', percentage: 1.8 }
    ]
  },
  {
    match: (m) => m.entity.includes('MyInvestor'),
    positions: [
      { ticker: 'BRK.B', name: 'Berkshire Hathaway B', sector: 'Finanzas', percentage: 7.5 },
      { ticker: 'EXO.MI', name: 'Exor N.V.', sector: 'Finanzas', percentage: 6.8 },
      { ticker: 'P911.DE', name: 'Porsche AG', sector: 'Automóvil', percentage: 6.1 },
      { ticker: 'BOL.PA', name: 'Bollore', sector: 'Industrial', percentage: 5.5 },
      { ticker: 'GCO.MC', name: 'Grupo Catalana Occidente', sector: 'Finanzas', percentage: 5.1 },
      { ticker: 'GOOGL', name: 'Alphabet', sector: 'Tecnología', percentage: 4.8 },
      { ticker: 'MSFT', name: 'Microsoft', sector: 'Tecnología', percentage: 4.2 },
      { ticker: 'BN', name: 'Brookfield Corp', sector: 'Finanzas', percentage: 3.9 },
      { ticker: 'MKL', name: 'Markel Group', sector: 'Finanzas', percentage: 3.5 },
      { ticker: 'FFH.TO', name: 'Fairfax Financial', sector: 'Finanzas', percentage: 3.1 }
    ]
  },
  {
    match: (m) => m.entity.includes('Kaizen'),
    positions: [
      { ticker: 'KO', name: 'Coca-Cola', sector: 'Consumo Defensivo', percentage: 5.5 },
      { ticker: 'PEP', name: 'PepsiCo', sector: 'Consumo Defensivo', percentage: 5.2 },
      { ticker: 'JNJ', name: 'Johnson and Johnson', sector: 'Salud', percentage: 4.8 },
      { ticker: 'PG', name: 'Procter and Gamble', sector: 'Consumo Defensivo', percentage: 4.5 },
      { ticker: 'MCD', name: "McDonald's", sector: 'Consumo Discrecional', percentage: 4.1 },
      { ticker: 'MMM', name: '3M Company', sector: 'Industrial', percentage: 3.8 },
      { ticker: 'TGT', name: 'Target Corporation', sector: 'Consumo Defensivo', percentage: 3.5 },
      { ticker: 'CVX', name: 'Chevron', sector: 'Energía', percentage: 3.2 },
      { ticker: 'XOM', name: 'Exxon Mobil', sector: 'Energía', percentage: 3.0 },
      { ticker: 'T', name: 'AT&T', sector: 'Telecomunicaciones', percentage: 2.8 }
    ]
  }
];

let updatedCount = 0;
data.forEach(m => {
  if (m.entity.includes('Cobas')) return; // Cobas ya está actualizado

  const portfolio = realPortfolios.find(p => p.match(m));
  if (portfolio) {
    m.funds.forEach(f => {
      f.topPositions = portfolio.positions;
      updatedCount++;
    });
    console.log('Updated:', m.name, '(' + m.entity + ')');
  } else {
    console.log('SKIPPED (no match):', m.name, '(' + m.entity + ')');
  }
});

fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
console.log('\nDone. Funds updated:', updatedCount);
