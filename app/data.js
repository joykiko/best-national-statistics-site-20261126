// DataNusa — Indonesia in Numbers. Data layer, rewritten in the rebuild
// session of 26 November 2026 with the figures unchanged from the proven
// entry: every figure below is a published official statistic. The source
// and the reference period are carried with each series and each
// indicator, and the About page lists the publications they were
// compiled from.
// Compiled November 2026 from BPS (Statistics Indonesia), the World Bank and
// Bank Indonesia releases. Provincial populations are the BPS mid-2025
// estimates; totals may not sum exactly because of rounding.

export const META = {
  site: "DataNusa",
  tagline: "Indonesia in Numbers",
  country: "Republic of Indonesia",
  capital: "Jakarta",
  provinces: 38,
  regenciesCities: 514,
  islands: 17001,
  landAreaKm2: 1890180,
  seaAreaKm2: 6240000,
  currency: "Rupiah (IDR)",
  languages: "700+ living languages",
  timeZones: "3 (WIB · WITA · WIT)",
};

export const HEADLINE = [
  { id: "pop", label: "Population", value: "284.4", unit: "million", note: "Mid-2025 estimate · 4th largest in the world", source: "BPS", topic: "people" },
  { id: "gdp", label: "Gross domestic product", value: "US$1.396", unit: "trillion", note: "2024, current prices · largest economy in Southeast Asia", source: "World Bank", topic: "economy" },
  { id: "growth", label: "Economic growth", value: "5.04", unit: "% a year", note: "Q3 2025, year on year · 5.03% in 2024", source: "BPS", topic: "economy" },
  { id: "inflation", label: "Inflation", value: "2.86", unit: "% a year", note: "October 2025, year on year · inside the 2.5±1% target band", source: "BPS", topic: "economy" },
  { id: "unemp", label: "Unemployment rate", value: "4.85", unit: "%", note: "August 2025 · 7.46 million people", source: "BPS · Sakernas", topic: "labour" },
  { id: "poverty", label: "Poverty rate", value: "8.25", unit: "%", note: "September 2025 · 23.36 million people, a two-decade low", source: "BPS · Susenas", topic: "people" },
];

export const SERIES = {
  population: {
    title: "Population, census and survey counts",
    unit: "million people",
    source: "BPS — Population Censuses 1971–2020, SUPAS 2015 & 2025",
    points: [
      [1971, 119.2], [1980, 147.5], [1990, 179.4], [2000, 206.3],
      [2010, 237.6], [2015, 255.2], [2020, 270.2], [2025, 284.7],
    ],
  },
  gdpGrowth: {
    title: "Real GDP growth",
    unit: "% a year",
    source: "BPS — National Accounts",
    points: [
      [2015, 4.88], [2016, 5.03], [2017, 5.07], [2018, 5.17], [2019, 5.02],
      [2020, -2.07], [2021, 3.70], [2022, 5.31], [2023, 5.05], [2024, 5.03],
    ],
  },
  inflation: {
    title: "Consumer price inflation, December on December",
    unit: "% a year",
    source: "BPS — Consumer Price Index",
    points: [
      [2015, 3.35], [2016, 3.02], [2017, 3.61], [2018, 3.13], [2019, 2.72],
      [2020, 1.68], [2021, 1.87], [2022, 5.51], [2023, 2.61], [2024, 1.57],
    ],
  },
  unemployment: {
    title: "Open unemployment rate, August rounds",
    unit: "% of the labour force",
    source: "BPS — National Labour Force Survey (Sakernas)",
    points: [
      [2019, 5.28], [2020, 7.07], [2021, 6.49], [2022, 5.86],
      [2023, 5.32], [2024, 4.91], [2025, 4.85],
    ],
  },
  poverty: {
    title: "Poverty rate, March rounds",
    unit: "% of the population",
    source: "BPS — National Socio-Economic Survey (Susenas)",
    points: [
      [2015, 11.22], [2016, 10.86], [2017, 10.64], [2018, 9.82], [2019, 9.41],
      [2020, 9.78], [2021, 10.14], [2022, 9.54], [2023, 9.36], [2024, 9.03], [2025, 8.47],
    ],
  },
  trade: {
    title: "Goods trade",
    unit: "US$ billion",
    source: "BPS — Foreign Trade Statistics",
    exports: [
      [2019, 167.7], [2020, 163.2], [2021, 231.5], [2022, 291.9], [2023, 258.8], [2024, 264.7],
    ],
    imports: [
      [2019, 170.7], [2020, 141.6], [2021, 196.2], [2022, 237.4], [2023, 221.9], [2024, 233.7],
    ],
  },
};

export const GDP_SECTORS = {
  title: "Share of GDP by industry, 2024",
  source: "BPS — National Accounts (rounded)",
  rows: [
    ["Manufacturing", 19.0], ["Wholesale & retail trade", 13.1], ["Agriculture & fisheries", 12.7],
    ["Construction", 10.4], ["Mining & quarrying", 8.7], ["All other industries", 36.1],
  ],
};

export const GENERATIONS = {
  title: "Population by generation, 2025",
  source: "BPS — SUPAS 2025 (shares of total population)",
  rows: [
    ["Generation Z (1997–2012)", 24.93], ["Millennials (1981–1996)", 24.34],
    ["Post-Gen Z (2013– )", 19.65], ["Generation X and older", 31.08],
  ],
};

export const REGIONS = {
  title: "Population by island region, mid-2025",
  source: "BPS mid-2025 estimates, grouped by geographical unit",
  rows: [
    ["Java", 158.08], ["Sumatra", 62.26], ["Sulawesi", 21.04], ["Kalimantan", 17.95],
    ["Bali & Nusa Tenggara", 15.94], ["Papua", 5.82], ["Maluku Islands", 3.34],
  ],
};

export const LABOUR_FACTS = [
  { label: "Working-age population", value: "218.17 million", period: "August 2025", source: "BPS · Sakernas" },
  { label: "Labour force", value: "154.00 million", period: "August 2025", source: "BPS · Sakernas" },
  { label: "People in work", value: "146.54 million", period: "August 2025", source: "BPS · Sakernas" },
  { label: "Labour force participation", value: "70.59%", period: "August 2025", source: "BPS · Sakernas" },
  { label: "Full-time workers", value: "67.32% of workers", period: "August 2025", source: "BPS · Sakernas" },
  { label: "Part-time workers", value: "24.77% of workers", period: "August 2025", source: "BPS · Sakernas" },
  { label: "Underemployed", value: "7.91% of workers", period: "August 2025", source: "BPS · Sakernas" },
  { label: "Average monthly wage", value: "Rp3.33 million", period: "August 2025", source: "BPS · Sakernas" },
  { label: "Highest provincial unemployment", value: "Papua · 6.96%", period: "August 2025", source: "BPS · Sakernas" },
];

export const PROVINCES = [
  // name, capital, region, population mid-2025, land area km2, density per km2
  ["Aceh", "Banda Aceh", "Sumatra", 5626000, 56835, 99],
  ["North Sumatra", "Medan", "Sumatra", 15785800, 72438, 218],
  ["West Sumatra", "Padang", "Sumatra", 5914300, 42108, 140],
  ["Riau", "Pekanbaru", "Sumatra", 6811200, 89901, 76],
  ["Jambi", "Jambi", "Sumatra", 3768500, 49023, 77],
  ["South Sumatra", "Palembang", "Sumatra", 8928500, 86772, 103],
  ["Bengkulu", "Bengkulu", "Sumatra", 2138000, 20122, 106],
  ["Lampung", "Bandar Lampung", "Sumatra", 9522900, 33571, 284],
  ["Bangka Belitung Islands", "Pangkal Pinang", "Sumatra", 1550800, 16690, 93],
  ["Riau Islands", "Tanjung Pinang", "Sumatra", 2213500, 8170, 268],
  ["Jakarta", "Jakarta", "Java", 10678000, 662, 16155],
  ["West Java", "Bandung", "Java", 50759000, 37053, 1370],
  ["Central Java", "Semarang", "Java", 38233900, 34347, 1113],
  ["Yogyakarta", "Yogyakarta", "Java", 3781500, 3170, 1193],
  ["East Java", "Surabaya", "Java", 42089300, 48056, 876],
  ["Banten", "Serang", "Java", 12537400, 9356, 1341],
  ["Bali", "Denpasar", "Bali & Nusa Tenggara", 4461300, 5583, 798],
  ["West Nusa Tenggara", "Mataram", "Bali & Nusa Tenggara", 5731100, 19632, 291],
  ["East Nusa Tenggara", "Kupang", "Bali & Nusa Tenggara", 5742600, 46378, 124],
  ["West Kalimantan", "Pontianak", "Kalimantan", 5766000, 147018, 39],
  ["Central Kalimantan", "Palangka Raya", "Kalimantan", 2845000, 153430, 19],
  ["South Kalimantan", "Banjarbaru", "Kalimantan", 4323300, 37125, 116],
  ["East Kalimantan", "Samarinda", "Kalimantan", 4267600, 126952, 34],
  ["North Kalimantan", "Tanjung Selor", "Kalimantan", 749400, 69901, 11],
  ["North Sulawesi", "Manado", "Sulawesi", 2721400, 14488, 188],
  ["Central Sulawesi", "Palu", "Sulawesi", 3156100, 61497, 51],
  ["South Sulawesi", "Makassar", "Sulawesi", 9563100, 45324, 211],
  ["Southeast Sulawesi", "Kendari", "Sulawesi", 2836700, 36139, 78],
  ["Gorontalo", "Gorontalo", "Sulawesi", 1242200, 12025, 103],
  ["West Sulawesi", "Mamuju", "Sulawesi", 1525300, 16591, 92],
  ["Maluku", "Ambon", "Maluku Islands", 1970600, 46134, 43],
  ["North Maluku", "Sofifi", "Maluku Islands", 1373800, 31466, 42],
  ["Papua", "Jayapura", "Papua", 1073600, 81383, 13],
  ["West Papua", "Manokwari", "Papua", 587600, 60309, 10],
  ["South Papua", "Merauke", "Papua", 549700, 117859, 5],
  ["Central Papua", "Nabire", "Papua", 1492300, 61080, 24],
  ["Highland Papua", "Jayawijaya", "Papua", 1484900, 52509, 29],
  ["Southwest Papua", "Sorong", "Papua", 636400, 39103, 16],
];

export const INDICATORS = [
  // topic, name, value, unit, period, source
  ["People", "Population", "284.4", "million", "Mid-2025", "BPS"],
  ["People", "Population growth", "1.08", "% a year", "2020–2025 average", "BPS · SUPAS 2025"],
  ["People", "Population density", "150", "people per km²", "Mid-2025", "BPS"],
  ["People", "Share living on Java", "55.65", "%", "2025", "BPS · SUPAS 2025"],
  ["People", "Working-age share (15–64)", "68.94", "%", "2025", "BPS · SUPAS 2025"],
  ["People", "Dependency ratio", "45.05", "dependants per 100 workers", "2025", "BPS · SUPAS 2025"],
  ["People", "Total fertility rate", "2.13", "children per woman", "2025", "BPS · SUPAS 2025"],
  ["People", "Life expectancy at birth", "72.4", "years", "2024", "BPS"],
  ["People", "Human Development Index", "74.20", "index (0–100)", "2024", "BPS"],
  ["People", "Poverty rate", "8.25", "%", "September 2025", "BPS · Susenas"],
  ["People", "People in poverty", "23.36", "million", "September 2025", "BPS · Susenas"],
  ["People", "Poverty line", "Rp609,160", "per person a month", "March 2025", "BPS"],
  ["People", "Gini ratio of expenditure", "0.375", "index (0–1)", "March 2025", "BPS"],
  ["People", "Adult literacy rate (15+)", "96.0", "%", "2023", "BPS"],
  ["People", "Internet users", "221.6", "million · 79.5% of population", "2024", "APJII survey"],
  ["Economy", "GDP, current prices", "US$1.396", "trillion", "2024", "World Bank"],
  ["Economy", "GDP in rupiah", "Rp22,139", "trillion", "2024", "BPS"],
  ["Economy", "GDP per capita", "US$4,981", "per person", "2024", "World Bank"],
  ["Economy", "GDP per capita in rupiah", "Rp78.6", "million per person", "2024", "BPS"],
  ["Economy", "Real GDP growth", "5.03", "% a year", "2024", "BPS"],
  ["Economy", "Real GDP growth, latest quarter", "5.04", "% a year", "Q3 2025", "BPS"],
  ["Economy", "Inflation", "2.86", "% a year", "October 2025", "BPS"],
  ["Economy", "Policy interest rate (BI-Rate)", "4.75", "%", "October 2025", "Bank Indonesia"],
  ["Economy", "Exports of goods", "US$264.7", "billion", "2024", "BPS"],
  ["Economy", "Imports of goods", "US$233.7", "billion", "2024", "BPS"],
  ["Economy", "Trade surplus", "US$31.0", "billion", "2024", "BPS"],
  ["Economy", "Foreign visitors", "13.90", "million arrivals", "2024", "BPS"],
  ["Economy", "Rice production (milled dry grain)", "60.21", "million tonnes", "2025", "BPS"],
  ["Labour", "Unemployment rate", "4.85", "%", "August 2025", "BPS · Sakernas"],
  ["Labour", "Unemployed people", "7.46", "million", "August 2025", "BPS · Sakernas"],
  ["Labour", "Labour force", "154.00", "million", "August 2025", "BPS · Sakernas"],
  ["Labour", "People in work", "146.54", "million", "August 2025", "BPS · Sakernas"],
  ["Labour", "Participation rate", "70.59", "%", "August 2025", "BPS · Sakernas"],
  ["Labour", "Average monthly wage", "Rp3.33", "million", "August 2025", "BPS · Sakernas"],
  ["Regions", "Provinces", "38", "provinces", "2025", "Ministry of Home Affairs"],
  ["Regions", "Regencies and cities", "514", "second-level regions", "2024", "Ministry of Home Affairs"],
  ["Regions", "Largest province — West Java", "50.76", "million people", "Mid-2025", "BPS"],
  ["Regions", "Smallest province — South Papua", "0.55", "million people", "Mid-2025", "BPS"],
  ["Regions", "Densest province — Jakarta", "16,155", "people per km²", "Mid-2025", "BPS"],
];

export const RELEASES = [
  { date: "5 Nov 2025", title: "Labour force, August 2025", detail: "Unemployment 4.85% · 146.54 million in work", topic: "Labour" },
  { date: "5 Nov 2025", title: "Economic growth, Q3 2025", detail: "GDP up 5.04% year on year", topic: "Economy" },
  { date: "3 Nov 2025", title: "Inflation, October 2025", detail: "Prices up 2.86% year on year", topic: "Economy" },
  { date: "15 Oct 2025", title: "Foreign trade, September 2025", detail: "Exports and imports by commodity and country", topic: "Economy" },
  { date: "25 Jul 2025", title: "Poverty profile, March 2025", detail: "Poverty 8.47% · line at Rp609,160 a month", topic: "People" },
  { date: "30 Jun 2025", title: "Population indicators, SUPAS 2025", detail: "Population 284.67 million · fertility 2.13", topic: "People" },
];

export const SOURCES = [
  { name: "BPS — Statistics Indonesia (bps.go.id)", what: "Population census and SUPAS 2025; Sakernas labour force survey, August 2025; Susenas poverty profile, March & September 2025; national accounts and CPI releases, 2025; foreign trade statistics, 2024; mid-2025 provincial population estimates." },
  { name: "World Bank — World Development Indicators", what: "GDP and GDP per capita in current US dollars, 2024." },
  { name: "Bank Indonesia (bi.go.id)", what: "BI-Rate policy decision, October 2025." },
  { name: "APJII — Indonesian Internet Service Providers Association", what: "Internet penetration survey, 2024." },
];
