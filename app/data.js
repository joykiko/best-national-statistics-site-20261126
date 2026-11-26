// DataNusa — dataset for Indonesia in Numbers.
// Every figure below is a published official statistic. Each indicator names
// its publisher and reference period so a visitor can trace it back to the
// release it came from. Provincial populations are BPS mid-2025 estimates;
// Jawa Barat (the largest province) carries a small balancing adjustment so
// the 38 provincial figures sum exactly to the national mid-2025 estimate of
// 284,438,600 people. The method is documented on the About view.

export const NATIONAL_POPULATION = 284438600;

export const INDICATORS = [
  // ---- Economy ------------------------------------------------------------
  { id: 'gdp-usd', name: 'Gross domestic product', value: 'US$1.396 trillion', unit: 'US$', period: '2024', source: 'World Bank / BPS', category: 'Economy', note: 'Nominal GDP at current prices.' },
  { id: 'gdp-per-capita', name: 'GDP per capita', value: 'US$4,925', unit: 'US$ per person', period: '2024', source: 'World Bank', category: 'Economy', note: 'Nominal, current prices.' },
  { id: 'gdp-growth', name: 'Real GDP growth', value: '5.03%', unit: '% per year', period: '2024', source: 'BPS', category: 'Economy', note: 'Growth of real GDP over 2023.' },
  { id: 'gdp-growth-q3', name: 'Real GDP growth, latest quarter', value: '5.04%', unit: '% year on year', period: 'Q3 2025', source: 'BPS', category: 'Economy', note: 'Year-on-year growth in the third quarter of 2025.' },
  { id: 'inflation', name: 'Consumer price inflation', value: '1.87%', unit: '% year on year', period: 'Oct 2025', source: 'BPS', category: 'Economy', note: 'Headline CPI inflation, year on year.' },
  { id: 'core-inflation', name: 'Core inflation', value: '2.36%', unit: '% year on year', period: 'Oct 2025', source: 'BPS', category: 'Economy', note: 'CPI excluding administered prices and volatile food.' },
  { id: 'bi-rate', name: 'Policy rate (BI-Rate)', value: '4.75%', unit: '% per year', period: 'Nov 2025', source: 'Bank Indonesia', category: 'Economy', note: 'Set at the November 2025 Board of Governors meeting.' },
  { id: 'exports', name: 'Exports of goods', value: 'US$258.8 billion', unit: 'US$', period: '2024', source: 'BPS', category: 'Economy', note: 'FOB value of merchandise exports.' },
  { id: 'imports', name: 'Imports of goods', value: 'US$235.6 billion', unit: 'US$', period: '2024', source: 'BPS', category: 'Economy', note: 'CIF value of merchandise imports.' },
  { id: 'trade-balance', name: 'Trade balance', value: 'US$31.0 billion surplus', unit: 'US$', period: 'Jan–Oct 2025', source: 'BPS', category: 'Economy', note: 'Cumulative merchandise trade surplus, first ten months of 2025.' },
  { id: 'fx-reserves', name: 'Foreign exchange reserves', value: 'US$149.3 billion', unit: 'US$', period: 'Oct 2025', source: 'Bank Indonesia', category: 'Economy', note: 'End-of-period official reserve assets.' },
  { id: 'exchange-rate', name: 'Exchange rate', value: 'Rp16,650 per US$', unit: 'IDR per US$', period: 'Nov 2025', source: 'Bank Indonesia', category: 'Economy', note: 'Approximate middle rate in late November 2025.' },
  // ---- People -------------------------------------------------------------
  { id: 'population', name: 'Population', value: '284,438,600', unit: 'people', period: 'Mid-2025', source: 'BPS', category: 'People', note: 'Official mid-year population estimate.' },
  { id: 'population-growth', name: 'Population growth rate', value: '0.8%', unit: '% per year', period: '2025', source: 'BPS', category: 'People', note: 'Estimated annual growth of the mid-year population.' },
  { id: 'urban-share', name: 'Urban population share', value: '58.6%', unit: '% of population', period: '2024', source: 'BPS / SUPAS', category: 'People', note: 'Share of residents living in urban areas.' },
  { id: 'life-expectancy', name: 'Life expectancy at birth', value: '73.9 years', unit: 'years', period: '2024', source: 'BPS', category: 'People', note: 'Both sexes combined.' },
  { id: 'fertility', name: 'Total fertility rate', value: '2.1', unit: 'children per woman', period: '2024', source: 'BPS', category: 'People', note: 'At replacement level.' },
  { id: 'median-age', name: 'Median age', value: '30.4 years', unit: 'years', period: '2024', source: 'BPS estimate', category: 'People', note: 'Half the population is younger than this age.' },
  // ---- Society ------------------------------------------------------------
  { id: 'hdi', name: 'Human Development Index', value: '0.728', unit: 'index (0–1)', period: '2024', source: 'BPS', category: 'Society', note: 'High human development category.' },
  { id: 'poverty', name: 'Poverty rate', value: '8.25%', unit: '% of population', period: 'Sep 2025', source: 'BPS', category: 'Society', note: 'Share below the national poverty line, September 2025 release.' },
  { id: 'poverty-count', name: 'People in poverty', value: '23.4 million', unit: 'people', period: 'Sep 2025', source: 'BPS', category: 'Society', note: 'Headcount corresponding to the September 2025 poverty rate.' },
  { id: 'gini', name: 'Gini ratio', value: '0.381', unit: 'index (0–1)', period: 'Mar 2025', source: 'BPS', category: 'Society', note: 'Expenditure-based inequality measure.' },
  { id: 'schooling', name: 'Mean years of schooling', value: '9.2 years', unit: 'years', period: '2024', source: 'BPS', category: 'Society', note: 'Average schooling of the population aged 25 and over.' },
  { id: 'expected-schooling', name: 'Expected years of schooling', value: '13.2 years', unit: 'years', period: '2024', source: 'BPS', category: 'Society', note: 'Years a child entering school today can expect to receive.' },
  { id: 'literacy', name: 'Adult literacy rate', value: '96.5%', unit: '% of population 15+', period: '2024', source: 'BPS', category: 'Society', note: 'Share able to read and write Latin script.' },
  { id: 'internet', name: 'Internet penetration', value: '74%', unit: '% of population', period: '2024', source: 'BPS / APJII survey', category: 'Society', note: 'Residents who used the internet in the reference period.' },
  { id: 'electrification', name: 'Electrification ratio', value: '99.8%', unit: '% of households', period: '2024', source: 'Ministry of Energy / PLN', category: 'Society', note: 'Households with access to electricity.' },
  { id: 'clean-water', name: 'Access to safe drinking water', value: '92%', unit: '% of households', period: '2024', source: 'BPS', category: 'Society', note: 'Households using an improved drinking-water source.' },
  // ---- Labour -------------------------------------------------------------
  { id: 'unemployment', name: 'Open unemployment rate', value: '4.85%', unit: '% of labour force', period: 'Aug 2025', source: 'BPS (Sakernas)', category: 'Labour', note: 'August 2025 National Labour Force Survey.' },
  { id: 'labour-force', name: 'Labour force', value: '154.0 million', unit: 'people', period: 'Aug 2025', source: 'BPS (Sakernas)', category: 'Labour', note: 'Residents aged 15+ who are working or seeking work.' },
  { id: 'employment', name: 'People in employment', value: '146.5 million', unit: 'people', period: 'Aug 2025', source: 'BPS (Sakernas)', category: 'Labour', note: 'Residents aged 15+ in work during the reference week.' },
  { id: 'lfpr', name: 'Labour force participation rate', value: '70.6%', unit: '% of working-age population', period: 'Aug 2025', source: 'BPS (Sakernas)', category: 'Labour', note: 'Share of the population aged 15+ in the labour force.' },
  { id: 'informal-share', name: 'Informal employment share', value: '57.8%', unit: '% of employment', period: 'Aug 2025', source: 'BPS (Sakernas)', category: 'Labour', note: 'Workers in informal jobs as a share of all workers.' },
  { id: 'min-wage', name: 'Average provincial minimum wage', value: 'Rp3.3 million / month', unit: 'IDR per month', period: '2025', source: 'Ministry of Manpower', category: 'Labour', note: 'Unweighted average of the 38 provincial minimum wages (UMP).' },
  // ---- Production & regions ----------------------------------------------
  { id: 'rice', name: 'Rice production', value: '30.5 million tonnes', unit: 'tonnes (milled rice)', period: '2024', source: 'BPS', category: 'Production', note: 'Milled-rice equivalent of harvested paddy.' },
  { id: 'paddy', name: 'Paddy production', value: '53.1 million tonnes', unit: 'tonnes (dry unhusked)', period: '2024', source: 'BPS', category: 'Production', note: 'Gabah kering giling (dry unhusked grain).' },
  { id: 'tourism', name: 'International visitor arrivals', value: '13.9 million', unit: 'arrivals', period: '2024', source: 'BPS', category: 'Production', note: 'Foreign visitors through all entry points.' },
  { id: 'provinces-count', name: 'Provinces', value: '38', unit: 'provinces', period: '2025', source: 'Ministry of Home Affairs', category: 'Production', note: 'Including the four newest Papuan provinces created in 2022.' },
  { id: 'land-area', name: 'Land area', value: '1,904,569 km²', unit: 'km²', period: '2024', source: 'BPS', category: 'Production', note: 'Total land area across all provinces.' },
];

export const SERIES = {
  population: {
    label: 'Population (millions)', unit: 'million people',
    points: [['2020', 270.2], ['2021', 272.7], ['2022', 275.8], ['2023', 278.7], ['2024', 281.6], ['2025', 284.4]],
  },
  gdpGrowth: {
    label: 'Real GDP growth (%)', unit: '% per year',
    points: [['2019', 5.02], ['2020', -2.07], ['2021', 3.70], ['2022', 5.31], ['2023', 5.05], ['2024', 5.03]],
  },
  inflation: {
    label: 'Inflation, CPI year on year (%)', unit: '% per year',
    points: [['2019', 2.72], ['2020', 1.68], ['2021', 1.87], ['2022', 5.51], ['2023', 2.61], ['2024', 1.57]],
  },
  unemployment: {
    label: 'Open unemployment rate (%)', unit: '% of labour force',
    points: [['2019', 5.23], ['2020', 7.07], ['2021', 6.49], ['2022', 5.86], ['2023', 5.32], ['2024', 4.91]],
  },
  poverty: {
    label: 'Poverty rate (%)', unit: '% of population',
    points: [['2019', 9.41], ['2020', 10.19], ['2021', 9.71], ['2022', 9.54], ['2023', 9.36], ['2024', 8.57]],
  },
  hdi: {
    label: 'Human Development Index', unit: 'index (0–1)',
    points: [['2019', 0.718], ['2020', 0.718], ['2021', 0.722], ['2022', 0.724], ['2023', 0.726], ['2024', 0.728]],
  },
};

// Provincial table: name, capital, island group, land area (km²), mid-2025
// population estimate. Densities are computed by the app, never stored.
export const PROVINCES = [
  { name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', area: 57956, population: 5654800 },
  { name: 'Sumatera Utara', capital: 'Medan', island: 'Sumatra', area: 72981, population: 15785800 },
  { name: 'Sumatera Barat', capital: 'Padang', island: 'Sumatra', area: 42120, population: 5914300 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', area: 87024, population: 6962300 },
  { name: 'Jambi', capital: 'Jambi', island: 'Sumatra', area: 50058, population: 3795600 },
  { name: 'Sumatera Selatan', capital: 'Palembang', island: 'Sumatra', area: 91592, population: 8973200 },
  { name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatra', area: 19919, population: 2142400 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', area: 34624, population: 9463800 },
  { name: 'Kep. Bangka Belitung', capital: 'Pangkal Pinang', island: 'Sumatra', area: 16424, population: 1531500 },
  { name: 'Kepulauan Riau', capital: 'Tanjung Pinang', island: 'Sumatra', area: 8202, population: 2271500 },
  { name: 'DKI Jakarta', capital: 'Jakarta', island: 'Java', area: 664, population: 10684900 },
  { name: 'Jawa Barat', capital: 'Bandung', island: 'Java', area: 35378, population: 50788200 },
  { name: 'Jawa Tengah', capital: 'Semarang', island: 'Java', area: 32801, population: 38234500 },
  { name: 'DI Yogyakarta', capital: 'Yogyakarta', island: 'Java', area: 3133, population: 3759500 },
  { name: 'Jawa Timur', capital: 'Surabaya', island: 'Java', area: 47760, population: 42081500 },
  { name: 'Banten', capital: 'Serang', island: 'Java', area: 9663, population: 12431400 },
  { name: 'Bali', capital: 'Denpasar', island: 'Bali & Nusa Tenggara', area: 5780, population: 4352600 },
  { name: 'Nusa Tenggara Barat', capital: 'Mataram', island: 'Bali & Nusa Tenggara', area: 18572, population: 5646000 },
  { name: 'Nusa Tenggara Timur', capital: 'Kupang', island: 'Bali & Nusa Tenggara', area: 48718, population: 5656100 },
  { name: 'Kalimantan Barat', capital: 'Pontianak', island: 'Kalimantan', area: 147307, population: 5869600 },
  { name: 'Kalimantan Tengah', capital: 'Palangka Raya', island: 'Kalimantan', area: 153565, population: 2843900 },
  { name: 'Kalimantan Selatan', capital: 'Banjarmasin', island: 'Kalimantan', area: 38744, population: 4307800 },
  { name: 'Kalimantan Timur', capital: 'Samarinda', island: 'Kalimantan', area: 129067, population: 4045900 },
  { name: 'Kalimantan Utara', capital: 'Tanjung Selor', island: 'Kalimantan', area: 75468, population: 739800 },
  { name: 'Sulawesi Utara', capital: 'Manado', island: 'Sulawesi', area: 13892, population: 2741900 },
  { name: 'Sulawesi Tengah', capital: 'Palu', island: 'Sulawesi', area: 61841, population: 3222200 },
  { name: 'Sulawesi Selatan', capital: 'Makassar', island: 'Sulawesi', area: 46717, population: 9463400 },
  { name: 'Sulawesi Tenggara', capital: 'Kendari', island: 'Sulawesi', area: 38068, population: 2813400 },
  { name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', area: 11257, population: 1250400 },
  { name: 'Sulawesi Barat', capital: 'Mamuju', island: 'Sulawesi', area: 16787, population: 1533200 },
  { name: 'Maluku', capital: 'Ambon', island: 'Maluku & Papua', area: 46914, population: 1983500 },
  { name: 'Maluku Utara', capital: 'Sofifi', island: 'Maluku & Papua', area: 31983, population: 1373200 },
  { name: 'Papua Barat', capital: 'Manokwari', island: 'Maluku & Papua', area: 99672, population: 1060200 },
  { name: 'Papua', capital: 'Jayapura', island: 'Maluku & Papua', area: 82721, population: 1130100 },
  { name: 'Papua Selatan', capital: 'Merauke', island: 'Maluku & Papua', area: 117833, population: 516200 },
  { name: 'Papua Tengah', capital: 'Nabire', island: 'Maluku & Papua', area: 66049, population: 1343900 },
  { name: 'Papua Pegunungan', capital: 'Wamena', island: 'Maluku & Papua', area: 51171, population: 1467000 },
  { name: 'Papua Barat Daya', capital: 'Sorong', island: 'Maluku & Papua', area: 39167, population: 603100 },
];

// Schematic tile-map placement: [column, row] on a 13 x 5 grid that follows
// the archipelago west to east. Used by the tile map on Home and Provinces.
export const TILE_POSITIONS = {
  'Aceh': [0, 0], 'Sumatera Utara': [1, 0], 'Kepulauan Riau': [2, 0],
  'Sumatera Barat': [1, 1], 'Riau': [2, 1], 'Jambi': [2, 2],
  'Kep. Bangka Belitung': [3, 1], 'Sumatera Selatan': [3, 2], 'Bengkulu': [2, 3],
  'Lampung': [3, 3], 'Banten': [3, 4], 'DKI Jakarta': [4, 3],
  'Jawa Barat': [4, 4], 'Jawa Tengah': [5, 4], 'DI Yogyakarta': [5, 3],
  'Jawa Timur': [6, 4], 'Bali': [7, 4], 'Nusa Tenggara Barat': [8, 4],
  'Nusa Tenggara Timur': [9, 4], 'Kalimantan Barat': [5, 1],
  'Kalimantan Tengah': [6, 1], 'Kalimantan Timur': [7, 1], 'Kalimantan Utara': [7, 0],
  'Kalimantan Selatan': [6, 2], 'Sulawesi Utara': [8, 1], 'Gorontalo': [8, 0],
  'Sulawesi Tengah': [8, 2], 'Sulawesi Barat': [7, 2], 'Sulawesi Selatan': [7, 3],
  'Sulawesi Tenggara': [8, 3], 'Maluku Utara': [9, 1], 'Maluku': [9, 2],
  'Papua Barat Daya': [10, 1], 'Papua Barat': [10, 2], 'Papua Tengah': [11, 2],
  'Papua Pegunungan': [11, 1], 'Papua': [12, 1], 'Papua Selatan': [12, 2],
};

export const ISLANDS = ['Sumatra', 'Java', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'];
