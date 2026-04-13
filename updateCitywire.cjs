const fs = require('fs');
const DB_PATH = './server/db.json';
const data = JSON.parse(fs.readFileSync(DB_PATH));

// Data scraped from Citywire Spain - April 2026
// Each entry has isin AND nameContains for flexible matching
const citywireData = [
  {
    isin: 'ES0124037005', // Cobas Internacional / Cobas Seleccion
    positions: [
      { ticker: 'ATYM.L', name: 'Atalaya Mining Copper SA', sector: 'Materiales', percentage: 4.2 },
      { ticker: 'GLNG', name: 'Golar LNG Ltd', sector: 'Energía', percentage: 4.0 },
      { ticker: '0001.HK', name: 'CK Hutchison Holdings Ltd', sector: 'Industrial', percentage: 3.6 },
      { ticker: 'DAN.MI', name: 'Danieli Officine Meccaniche Saving', sector: 'Industrial', percentage: 3.1 },
      { ticker: 'BWO.OL', name: 'BW Offshore Ltd', sector: 'Energía', percentage: 2.9 },
      { ticker: 'BWE.OL', name: 'BW Energy Ltd', sector: 'Energía', percentage: 2.8 },
      { ticker: 'WIZZ.L', name: 'Wizz Air Holdings PLC', sector: 'Transporte Aéreo', percentage: 2.5 },
      { ticker: 'BRAV3.SA', name: 'Brava Energia SA', sector: 'Energía', percentage: 2.4 },
      { ticker: 'TGS.OL', name: 'TGS ASA', sector: 'Energía', percentage: 2.4 },
      { ticker: 'DBG.PA', name: 'Derichebourg SA', sector: 'Industrial', percentage: 2.1 }
    ]
  },
  {
    isin: 'ES0144516004', // Horos Value Internacional
    positions: [
      { ticker: 'PLX.AS', name: 'Pluxee NV', sector: 'Servicios Empresariales', percentage: 5.9 },
      { ticker: 'TGS.OL', name: 'TGS ASA', sector: 'Energía', percentage: 4.7 },
      { ticker: 'NPSNY', name: 'Naspers Ltd ADR', sector: 'Tecnología', percentage: 4.0 },
      { ticker: 'ALD.PA', name: 'Ayvens', sector: 'Finanzas', percentage: 3.7 },
      { ticker: '86.HK', name: 'Sun Hung Kai and Co Ltd', sector: 'Finanzas', percentage: 3.7 },
      { ticker: 'ZEG.L', name: 'Zegona Communications PLC', sector: 'Telecomunicaciones', percentage: 3.4 },
      { ticker: 'PYPL', name: 'PayPal Holdings Inc', sector: 'Finanzas', percentage: 3.2 },
      { ticker: 'GEST.MC', name: 'Gestamp Automocion', sector: 'Automóvil', percentage: 3.1 },
      { ticker: 'ACX.MC', name: 'Acerinox SA', sector: 'Materiales', percentage: 3.0 },
      { ticker: 'ONEX.TO', name: 'Onex Corp', sector: 'Finanzas', percentage: 2.7 }
    ]
  },
  {
    isin: 'LU1623762843', // Carmignac Portfolio Credit
    positions: [
      { ticker: 'EMEIS.PA', name: 'Emeis', sector: 'Salud', percentage: 1.5 },
      { ticker: 'BFCM-3.75', name: 'Banque Federative Credit Mutuel 3.75%', sector: 'Renta Fija', percentage: 1.0 },
      { ticker: 'SBB-1.12', name: 'Samhallsbyggnadsbolaget 1.12%', sector: 'Renta Fija', percentage: 0.9 },
      { ticker: 'ENI-3.38', name: 'Eni SpA 3.38%', sector: 'Renta Fija', percentage: 0.9 },
      { ticker: 'TTE-3.25', name: 'TotalEnergies SE 3.25%', sector: 'Renta Fija', percentage: 0.8 },
      { ticker: 'SBB-2.88', name: 'Samhallsbyggnadsbolaget 2.88%', sector: 'Renta Fija', percentage: 0.8 },
      { ticker: 'BCP-4.75', name: 'Banco Comercial Portugues 4.75%', sector: 'Renta Fija', percentage: 0.8 },
      { ticker: 'ENI-4.88', name: 'Eni SpA 4.88%', sector: 'Renta Fija', percentage: 0.8 },
      { ticker: 'EMEIS-6.91', name: 'Emeis SA 6.91%', sector: 'Renta Fija', percentage: 0.7 },
      { ticker: 'BP-3.62', name: 'BP Capital Markets 3.62%', sector: 'Renta Fija', percentage: 0.7 }
    ]
  },
  {
    isin: 'LU0690375182', // Fundsmith Equity
    positions: [
      { ticker: 'WAT', name: 'Waters Corp', sector: 'Salud', percentage: 5.9 },
      { ticker: 'SYK', name: 'Stryker Corp', sector: 'Salud', percentage: 5.7 },
      { ticker: 'IDXX', name: 'IDEXX Laboratories Inc', sector: 'Salud', percentage: 5.6 },
      { ticker: 'V', name: 'Visa Inc Class A', sector: 'Finanzas', percentage: 5.4 },
      { ticker: 'MAR', name: 'Marriott International Inc', sector: 'Consumo Discrecional', percentage: 5.4 },
      { ticker: 'OR.PA', name: "L'Oreal SA", sector: 'Consumo Defensivo', percentage: 5.4 },
      { ticker: 'MC.PA', name: 'LVMH Moet Hennessy Louis Vuitton', sector: 'Consumo Discrecional', percentage: 5.0 },
      { ticker: 'ULVR.L', name: 'Unilever PLC', sector: 'Consumo Defensivo', percentage: 4.8 },
      { ticker: 'GOOGL', name: 'Alphabet Inc Class A', sector: 'Tecnología', percentage: 4.7 },
      { ticker: 'ADP', name: 'Automatic Data Processing Inc', sector: 'Tecnología', percentage: 4.7 }
    ]
  },
  {
    isin: 'ES0159259018', // Magallanes European Equity
    positions: [
      { ticker: 'SKFB.ST', name: 'SKF AB Class B', sector: 'Industrial', percentage: 4.6 },
      { ticker: 'KGX.DE', name: 'KION GROUP AG', sector: 'Industrial', percentage: 4.5 },
      { ticker: 'TITR.MI', name: 'Telecom Italia Az. Risp.', sector: 'Telecomunicaciones', percentage: 4.5 },
      { ticker: 'RXL.PA', name: 'Rexel SA', sector: 'Industrial', percentage: 4.4 },
      { ticker: 'MT', name: 'ArcelorMittal SA', sector: 'Materiales', percentage: 4.0 },
      { ticker: 'AVOL.SW', name: 'Avolta AG', sector: 'Consumo Discrecional', percentage: 3.9 },
      { ticker: 'AAL.L', name: 'Anglo American PLC', sector: 'Materiales', percentage: 3.6 },
      { ticker: 'SYNO.BR', name: 'Syensqo SA', sector: 'Materiales', percentage: 3.4 },
      { ticker: 'EN.PA', name: 'Bouygues', sector: 'Industrial', percentage: 3.3 },
      { ticker: 'AKRBP.OL', name: 'Aker BP ASA', sector: 'Energía', percentage: 3.3 }
    ]
  },
  {
    isin: 'LU0552385295', // Morgan Stanley Global Opportunity
    positions: [
      { ticker: 'META', name: 'Meta Platforms Inc Class A', sector: 'Tecnología', percentage: 7.7 },
      { ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing', sector: 'Tecnología', percentage: 7.2 },
      { ticker: 'UBER', name: 'Uber Technologies Inc', sector: 'Tecnología', percentage: 5.7 },
      { ticker: 'ASML', name: 'ASML Holding NV', sector: 'Tecnología', percentage: 5.6 },
      { ticker: 'MELI', name: 'MercadoLibre Inc', sector: 'Consumo Discrecional', percentage: 4.9 },
      { ticker: 'DASH', name: 'DoorDash Inc Class A', sector: 'Tecnología', percentage: 4.6 },
      { ticker: 'DSV.CO', name: 'DSV AS', sector: 'Industrial', percentage: 4.0 },
      { ticker: 'SPOT', name: 'Spotify Technology SA', sector: 'Tecnología', percentage: 4.0 },
      { ticker: '000660.KS', name: 'SK Hynix Inc', sector: 'Tecnología', percentage: 3.2 },
      { ticker: 'SU.PA', name: 'Schneider Electric SE', sector: 'Industrial', percentage: 3.1 }
    ]
  },
  {
    isin: 'IE00BYX2JD69', // Baillie Gifford LTGG
    positions: [
      { ticker: 'AMZN', name: 'Amazon.com Inc', sector: 'Consumo Discrecional', percentage: 6.9 },
      { ticker: 'NVDA', name: 'NVIDIA Corp', sector: 'Tecnología', percentage: 6.6 },
      { ticker: 'ASML', name: 'ASML Holding NV', sector: 'Tecnología', percentage: 5.9 },
      { ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing', sector: 'Tecnología', percentage: 4.2 },
      { ticker: 'TCEHY', name: 'Tencent Holdings Ltd', sector: 'Tecnología', percentage: 4.1 },
      { ticker: 'APP', name: 'AppLovin Corp Class A', sector: 'Tecnología', percentage: 3.9 },
      { ticker: 'NU', name: 'Nu Holdings Ltd Class A', sector: 'Finanzas', percentage: 3.7 },
      { ticker: 'NET', name: 'Cloudflare Inc', sector: 'Tecnología', percentage: 3.7 },
      { ticker: 'MELI', name: 'MercadoLibre Inc', sector: 'Consumo Discrecional', percentage: 3.3 },
      { ticker: 'NFLX', name: 'Netflix Inc', sector: 'Entretenimiento', percentage: 3.2 }
    ]
  },
  {
    isin: 'ES0116563001', // Cartesio X
    positions: [
      { ticker: 'ENEL-0.066', name: 'Enel SpA 0.0663%', sector: 'Renta Fija', percentage: 1.8 },
      { ticker: 'ABE-0.049', name: 'Abertis Infraestructuras Finance 0.0487%', sector: 'Renta Fija', percentage: 1.8 },
      { ticker: 'STLA-0.039', name: 'Stellantis NV 0.0388%', sector: 'Renta Fija', percentage: 1.7 },
      { ticker: 'REP-0.045', name: 'Repsol Europe Finance 0.045%', sector: 'Renta Fija', percentage: 1.6 },
      { ticker: 'SAN-0.06', name: 'Banco Santander SA 0.06%', sector: 'Renta Fija', percentage: 1.6 },
      { ticker: 'BBVA-0.056', name: 'Banco Bilbao Vizcaya Argentaria 0.0563%', sector: 'Renta Fija', percentage: 1.6 },
      { ticker: 'URW-0.048', name: 'Unibail-Rodamco-Westfield 0.0475%', sector: 'Renta Fija', percentage: 1.6 },
      { ticker: 'LDG-0.048', name: 'Lagardere SA 0.0475%', sector: 'Renta Fija', percentage: 1.5 },
      { ticker: 'EDF-0.044', name: 'Electricite de France 0.0438%', sector: 'Renta Fija', percentage: 1.5 },
      { ticker: 'PRY-0.053', name: 'Prysmian SpA 0.0525%', sector: 'Renta Fija', percentage: 1.5 }
    ]
  },
  {
    isin: 'IE00B2NXKW18', // Seilern World Growth
    positions: [
      { ticker: 'MA', name: 'Mastercard Inc Class A', sector: 'Finanzas', percentage: 6.9 },
      { ticker: 'UNH', name: 'UnitedHealth Group Inc', sector: 'Salud', percentage: 6.8 },
      { ticker: 'MSFT', name: 'Microsoft Corp', sector: 'Tecnología', percentage: 6.6 },
      { ticker: 'GOOGL', name: 'Alphabet Inc Class A', sector: 'Tecnología', percentage: 6.5 },
      { ticker: 'LONN.SW', name: 'Lonza Group Ltd', sector: 'Salud', percentage: 4.5 },
      { ticker: 'EW', name: 'Edwards Lifesciences Corp', sector: 'Salud', percentage: 4.5 },
      { ticker: 'MTD', name: 'Mettler-Toledo International Inc', sector: 'Salud', percentage: 4.4 },
      { ticker: 'ISRG', name: 'Intuitive Surgical Inc', sector: 'Salud', percentage: 4.4 },
      { ticker: 'WST', name: 'West Pharmaceutical Services Inc', sector: 'Salud', percentage: 4.3 },
      { ticker: 'SAP.DE', name: 'SAP SE', sector: 'Tecnología', percentage: 4.3 }
    ]
  },
  {
    isin: 'LU0210536861', // JPM US Technology
    positions: [
      { ticker: 'GOOGL', name: 'Alphabet Inc Class C', sector: 'Tecnología', percentage: 4.7 },
      { ticker: 'NVDA', name: 'NVIDIA Corp', sector: 'Tecnología', percentage: 4.6 },
      { ticker: 'LRCX', name: 'Lam Research Corp', sector: 'Tecnología', percentage: 4.5 },
      { ticker: 'TSLA', name: 'Tesla Inc', sector: 'Consumo Discrecional', percentage: 3.9 },
      { ticker: 'META', name: 'Meta Platforms Inc Class A', sector: 'Tecnología', percentage: 3.8 },
      { ticker: 'TSM', name: 'Taiwan Semiconductor ADR', sector: 'Tecnología', percentage: 3.8 },
      { ticker: 'TTWO', name: 'Take-Two Interactive Software', sector: 'Tecnología', percentage: 3.7 },
      { ticker: 'SNOW', name: 'Snowflake Inc', sector: 'Tecnología', percentage: 3.5 },
      { ticker: 'AVGO', name: 'Broadcom Inc', sector: 'Tecnología', percentage: 3.3 },
      { ticker: 'CIEN', name: 'Ciena Corp', sector: 'Tecnología', percentage: 3.3 }
    ]
  },
  {
    isin: 'IE00BD5HXG78', // Comgest Growth World - data from Citywire
    positions: [
      { ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing Co Ltd ADR', sector: 'Tecnologia', percentage: 8.8 },
      { ticker: 'JNJ', name: 'Johnson and Johnson', sector: 'Salud', percentage: 5.9 },
      { ticker: 'GOOGL', name: 'Alphabet Inc Class A', sector: 'Tecnologia', percentage: 5.1 },
      { ticker: 'MSFT', name: 'Microsoft Corp', sector: 'Tecnologia', percentage: 5.0 },
      { ticker: 'V', name: 'Visa Inc Class A', sector: 'Finanzas', percentage: 4.9 },
      { ticker: 'LIN', name: 'Linde PLC', sector: 'Materiales', percentage: 4.4 },
      { ticker: 'SPGI', name: 'SP Global Inc', sector: 'Finanzas', percentage: 3.9 },
      { ticker: 'AI.PA', name: 'Air Liquide SA', sector: 'Materiales', percentage: 3.8 },
      { ticker: 'EXPN.L', name: 'Experian PLC', sector: 'Industrial', percentage: 3.7 },
      { ticker: 'AMZN', name: 'Amazon.com Inc', sector: 'Consumo Discrecional', percentage: 3.7 }
    ]
  },
  {
    isin: 'LU0171310443', // BGF World Technology (BlackRock)
    positions: [
      { ticker: 'NVDA', name: 'NVIDIA Corp', sector: 'Tecnología', percentage: 9.9 },
      { ticker: 'AVGO', name: 'Broadcom Inc', sector: 'Tecnología', percentage: 8.3 },
      { ticker: 'MSFT', name: 'Microsoft Corp', sector: 'Tecnología', percentage: 6.3 },
      { ticker: 'AAPL', name: 'Apple Inc', sector: 'Tecnología', percentage: 5.8 },
      { ticker: 'GOOGL', name: 'Alphabet Inc Class A', sector: 'Tecnología', percentage: 4.7 },
      { ticker: 'LRCX', name: 'Lam Research Corp', sector: 'Tecnología', percentage: 4.2 },
      { ticker: 'TSM', name: 'Taiwan Semiconductor ADR', sector: 'Tecnología', percentage: 4.2 },
      { ticker: '000660.KS', name: 'SK Hynix Inc', sector: 'Tecnología', percentage: 4.0 },
      { ticker: '6857.T', name: 'Advantest Corp', sector: 'Tecnología', percentage: 3.5 },
      { ticker: '005930.KS', name: 'Samsung Electronics Co Ltd', sector: 'Tecnología', percentage: 3.1 }
    ]
  },

  {
    isin: 'LU0099574567', // Fidelity Global Technology
    positions: [
      { ticker: 'TSM', name: 'Taiwan Semiconductor Manufacturing', sector: 'Tecnología', percentage: 8.7 },
      { ticker: 'MSFT', name: 'Microsoft Corp', sector: 'Tecnología', percentage: 5.4 },
      { ticker: 'GOOGL', name: 'Alphabet Inc Class A', sector: 'Tecnología', percentage: 4.7 },
      { ticker: 'AAPL', name: 'Apple Inc', sector: 'Tecnología', percentage: 4.7 },
      { ticker: 'AMZN', name: 'Amazon.com Inc', sector: 'Tecnología', percentage: 3.7 },
      { ticker: 'ERIC', name: 'Telefonaktiebolaget LM Ericsson Class B', sector: 'Telecomunicaciones', percentage: 2.9 },
      { ticker: 'TXN', name: 'Texas Instruments Inc', sector: 'Tecnología', percentage: 2.7 },
      { ticker: 'ACN', name: 'Accenture PLC Class A', sector: 'Tecnología', percentage: 2.2 },
      { ticker: 'ORCL', name: 'Oracle Corp', sector: 'Tecnología', percentage: 2.1 },
      { ticker: '005930.KS', name: 'Samsung Electronics Co Ltd', sector: 'Tecnología', percentage: 2.0 }
    ]
  },
  {
    isin: 'IE00B18B9X76', // Lindsell Train Global Equity
    positions: [
      { ticker: 'GOOGL', name: 'Alphabet Inc Class A', sector: 'Tecnología', percentage: 9.9 },
      { ticker: 'TKO', name: 'TKO Group Holdings Inc', sector: 'Entretenimiento', percentage: 7.9 },
      { ticker: 'LSEG.L', name: 'London Stock Exchange Group PLC', sector: 'Finanzas', percentage: 7.4 },
      { ticker: '7974.T', name: 'Nintendo Co Ltd', sector: 'Consumo Discrecional', percentage: 7.2 },
      { ticker: 'REL.L', name: 'RELX PLC', sector: 'Industrial', percentage: 7.1 },
      { ticker: 'DIS', name: 'The Walt Disney Co', sector: 'Entretenimiento', percentage: 5.0 },
      { ticker: 'TMO', name: 'Thermo Fisher Scientific Inc', sector: 'Salud', percentage: 4.7 },
      { ticker: 'UMG.AS', name: 'Universal Music Group NV', sector: 'Entretenimiento', percentage: 4.7 },
      { ticker: 'FICO', name: 'Fair Isaac Corp', sector: 'Tecnología', percentage: 4.5 },
      { ticker: 'DGE.L', name: 'Diageo PLC', sector: 'Consumo Defensivo', percentage: 4.0 }
    ]
  },
  {
    isin: 'ES0124034010', // Cobas Iberia FI
    positions: [
      { ticker: 'HOT.MC', name: 'Melia Hotels International SA', sector: 'Consumo Discrecional', percentage: 9.0 },
      { ticker: 'SCYR.MC', name: 'Sacyr SA', sector: 'Construccion', percentage: 7.6 },
      { ticker: 'TRE.MC', name: 'Tecnicas Reunidas SA', sector: 'Industrial', percentage: 7.5 },
      { ticker: 'GRF.MC', name: 'Grifols SA Participating Preferred', sector: 'Salud', percentage: 7.0 },
      { ticker: 'ALM.MC', name: 'Almirall SA', sector: 'Salud', percentage: 6.9 },
      { ticker: 'GEST.MC', name: 'Gestamp Automocion', sector: 'Automovil', percentage: 4.7 },
      { ticker: 'DOM.MC', name: 'Global Dominion Access SA', sector: 'Tecnologia', percentage: 4.5 },
      { ticker: 'ATYM.L', name: 'Atalaya Mining Copper SA', sector: 'Materiales', percentage: 4.4 },
      { ticker: 'MCM.MC', name: 'Miquel y Costas Miquel SA', sector: 'Materiales', percentage: 4.3 },
      { ticker: 'TUB.MC', name: 'Tubacex SA', sector: 'Industrial', percentage: 3.8 }
    ]
  },
  {
    isin: 'LU1322010569', // Isatis Investment Technology A (HWK)
    positions: [
      { ticker: 'GOOG', name: 'Alphabet Inc Class C', sector: 'Tecnologia', percentage: 9.4 },
      { ticker: 'NBA.LS', name: 'Novabase SGPS', sector: 'Tecnologia', percentage: 7.7 },
      { ticker: 'DDOG', name: 'Datadog Inc Class A', sector: 'Tecnologia', percentage: 7.6 },
      { ticker: 'NVDA', name: 'NVIDIA Corp', sector: 'Tecnologia', percentage: 6.7 },
      { ticker: 'SNOW', name: 'Snowflake Inc', sector: 'Tecnologia', percentage: 6.3 },
      { ticker: 'AMZN', name: 'Amazon.com Inc', sector: 'Consumo Discrecional', percentage: 4.7 },
      { ticker: 'MSFT', name: 'Microsoft Corp', sector: 'Tecnologia', percentage: 4.6 },
      { ticker: 'INTU', name: 'Intuit Inc', sector: 'Tecnologia', percentage: 4.4 },
      { ticker: 'CRWD', name: 'CrowdStrike Holdings Inc Class A', sector: 'Tecnologia', percentage: 4.4 },
      { ticker: 'NOW', name: 'ServiceNow Inc', sector: 'Tecnologia', percentage: 4.4 }
    ]
  },
  {
    isin: 'LU1953238877', // EC SICAV EverCapital
    positions: [
      { ticker: 'UKT-0.5', name: 'United Kingdom 0.5% (Gilt)', sector: 'Renta Fija Publica', percentage: 9.4 },
      { ticker: 'NXT.MC', name: 'Nueva Expresion Textil SA', sector: 'Consumo Discrecional', percentage: 7.5 },
      { ticker: 'AMP.MC', name: 'Amper SA', sector: 'Telecomunicaciones', percentage: 6.9 },
      { ticker: 'RAGB-0.85', name: 'Austria (Republic of) 0.85%', sector: 'Renta Fija Publica', percentage: 4.8 },
      { ticker: 'OHL.MC', name: 'OHL Operaciones SA', sector: 'Construccion', percentage: 4.5 },
      { ticker: 'GTE-9.5', name: 'Gran Tierra Energy Inc 9.5%', sector: 'Renta Fija Corporativa', percentage: 4.3 },
      { ticker: 'CGNT', name: 'Cognyte Software Ltd', sector: 'Tecnologia', percentage: 3.7 },
      { ticker: 'BRK-2.625', name: 'Berkshire Hathaway Finance 2.625%', sector: 'Renta Fija Corporativa', percentage: 3.5 },
      { ticker: 'OXF-2.544', name: 'Oxford University 2.544%', sector: 'Renta Fija Corporativa', percentage: 3.0 },
      { ticker: 'FDR.MC', name: 'Fluidra SA', sector: 'Industrial', percentage: 3.0 }
    ]
  },
  {
    isin: 'ES0156674006', // Kaizen Global Income FI
    positions: [
      { ticker: 'EVLI-NCB', name: 'Evli Nordic Corporate Bond IB', sector: 'Renta Fija', percentage: 5.2 },
      { ticker: 'EVLI-SCB', name: 'Evli Short Corporate Bond IB', sector: 'Renta Fija', percentage: 5.2 },
      { ticker: 'TIK-SD', name: 'Tikehau Short Duration SF EUR Acc', sector: 'Renta Fija', percentage: 5.2 },
      { ticker: 'DWS-FRN', name: 'DWS Floating Rate Notes FC', sector: 'Renta Fija', percentage: 5.2 },
      { ticker: 'GRP-TRES', name: 'Groupama Tresorerie IC', sector: 'Renta Fija', percentage: 5.2 },
      { ticker: 'NXT.MC', name: 'Nueva Expresion Textil SA 0%', sector: 'Consumo Discrecional', percentage: 3.9 },
      { ticker: 'ATYM.L', name: 'Atalaya Mining Copper SA', sector: 'Materiales', percentage: 3.8 },
      { ticker: 'WIZZ.L', name: 'Wizz Air Holdings PLC', sector: 'Transporte Aereo', percentage: 3.7 },
      { ticker: 'DNCA-AB', name: 'DNCA Invest Alpha Bonds N EUR', sector: 'Renta Fija', percentage: 3.6 },
      { ticker: 'ALTN.L', name: 'AltynGold PLC', sector: 'Mineria', percentage: 3.3 }
    ]
  },
  {
    isin: 'ES0165243009', // MyInvestor Value FI
    positions: [
      { ticker: 'VBK.DE', name: 'Verbio SE', sector: 'Energia Renovable', percentage: 7.2 },
      { ticker: 'DCC.L', name: 'DCC PLC', sector: 'Industrial', percentage: 5.7 },
      { ticker: 'ATE.PA', name: 'Alten', sector: 'Tecnologia', percentage: 5.4 },
      { ticker: 'REY.MI', name: 'Reply SpA', sector: 'Tecnologia', percentage: 4.9 },
      { ticker: 'FPE3.DE', name: 'Fuchs SE Participating Preferred', sector: 'Materiales', percentage: 4.7 },
      { ticker: 'HUSQB.ST', name: 'Husqvarna AB Class B', sector: 'Industrial', percentage: 4.4 },
      { ticker: 'JET2.L', name: 'Jet2 PLC Ordinary Shares', sector: 'Transporte Aereo', percentage: 4.2 },
      { ticker: 'AKE.PA', name: 'Arkema SA', sector: 'Materiales', percentage: 4.2 },
      { ticker: 'SK.PA', name: 'SEB SA', sector: 'Consumo Discrecional', percentage: 4.1 },
      { ticker: 'EZJ.L', name: 'easyJet PLC', sector: 'Transporte Aereo', percentage: 4.0 }
    ]
  },
  {
    isin: 'ES0147622031', // Bestinver Bolsa FI - Ricardo Seixas
    positions: [
      { ticker: 'IDR.MC', name: 'Indra Sistemas SA', sector: 'Tecnologia', percentage: 9.1 },
      { ticker: 'GRF.MC', name: 'Grifols SA', sector: 'Salud', percentage: 8.5 },
      { ticker: 'SAN.MC', name: 'Banco Santander SA', sector: 'Finanzas', percentage: 7.7 },
      { ticker: 'ZEG.L', name: 'Zegona Communications PLC', sector: 'Telecomunicaciones', percentage: 6.7 },
      { ticker: 'DIAA.MC', name: 'Distribuidora Internacional de Alimentacion DIA', sector: 'Consumo Defensivo', percentage: 4.8 },
      { ticker: 'FER.MC', name: 'Ferrovial SE', sector: 'Industrial', percentage: 4.6 },
      { ticker: 'IBE.MC', name: 'Iberdrola SA', sector: 'Utilities', percentage: 4.5 },
      { ticker: 'ITX.MC', name: 'Inditex SA', sector: 'Consumo Discrecional', percentage: 4.5 },
      { ticker: 'AMS.MC', name: 'Amadeus IT Group SA', sector: 'Tecnologia', percentage: 4.4 },
      { ticker: 'ELE.MC', name: 'Endesa SA', sector: 'Utilities', percentage: 4.24 }
    ]
  },
  {
    isin: 'IE00BH4GY777', // Heptagon - Kopernik Global All-Cap Equity Fund
    positions: [
      { ticker: 'VTR.JO', name: 'Valterra Platinum Ltd', sector: 'Mineria', percentage: 4.2 },
      { ticker: 'SA.TO', name: 'Seabridge Gold Inc', sector: 'Mineria', percentage: 3.7 },
      { ticker: '032640.KS', name: 'LG Uplus Corp', sector: 'Telecomunicaciones', percentage: 2.8 },
      { ticker: 'SDX.DE', name: 'K+S AG', sector: 'Materiales', percentage: 2.5 },
      { ticker: 'RRC', name: 'Range Resources Corp', sector: 'Energia', percentage: 2.4 },
      { ticker: 'IMP.JO', name: 'Impala Platinum Holdings Ltd', sector: 'Mineria', percentage: 2.4 },
      { ticker: '003550.KS', name: 'LG Corp', sector: 'Industrial', percentage: 1.9 },
      { ticker: 'KT', name: 'KT Corp ADR', sector: 'Telecomunicaciones', percentage: 1.7 },
      { ticker: 'PDN.AX', name: 'Paladin Energy Ltd', sector: 'Energia', percentage: 1.7 },
      { ticker: 'GGR.SI', name: 'Golden Agri-Resources Ltd', sector: 'Consumo Defensivo', percentage: 1.6 }
    ]
  }
];



// Map ISIN to manager+fund and update - match by isin field OR tvSymbol field
let updatedFunds = 0;
citywireData.forEach(item => {
  data.forEach(manager => {
    manager.funds?.forEach(fund => {
      const fundIsin = fund.isin || fund.tvSymbol || '';
      if (fundIsin === item.isin) {
        fund.topPositions = item.positions;
        updatedFunds++;
        console.log('Updated:', manager.name, '-', fund.name);
      }
    });
  });
});

fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
console.log('\nTotal funds updated from Citywire:', updatedFunds);
