// DataNusa views. All charts are drawn here as inline SVG from the figures in
// data.js — no chart library, no network. Every chart card names its source.
import {
  META, HEADLINE, SERIES, GDP_SECTORS, GENERATIONS, REGIONS,
  LABOUR_FACTS, PROVINCES, INDICATORS, RELEASES, SOURCES,
} from "./data.js";

export const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const fmt = (n) => n.toLocaleString("en-US");
const TOTAL_POP = PROVINCES.reduce((a, p) => a + p[3], 0);

/* ---------------- chart helpers ---------------- */
function scale(points, w, h, pad) {
  const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  let y0 = Math.min(...ys), y1 = Math.max(...ys);
  const span = (y1 - y0) || 1;
  y0 -= span * 0.18; y1 += span * 0.12;
  if (y0 < 0 && Math.min(...ys) >= 0) y0 = 0;
  const X = (x) => pad.l + ((x - x0) / (x1 - x0)) * (w - pad.l - pad.r);
  const Y = (y) => h - pad.b - ((y - y0) / (y1 - y0)) * (h - pad.t - pad.b);
  return { X, Y, y0, y1 };
}
export function lineChart(points, unit) {
  const w = 640, h = 300, pad = { l: 48, r: 16, t: 16, b: 30 };
  const { X, Y, y0, y1 } = scale(points, w, h, pad);
  let g = "";
  for (let i = 0; i <= 4; i++) {
    const v = y0 + ((y1 - y0) * i) / 4, y = Y(v);
    g += `<line class="grid" x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}"/>` +
         `<text class="axis" x="${pad.l - 6}" y="${y + 4}" text-anchor="end">${v.toFixed(Math.abs(v) < 10 ? 1 : 0)}</text>`;
  }
  const path = points.map((p, i) => `${i ? "L" : "M"}${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
  const dots = points.map((p) => `<circle class="dot" cx="${X(p[0])}" cy="${Y(p[1])}" r="3.4"/>`).join("");
  const first = points[0], last = points[points.length - 1];
  const xlab = points.filter((_, i) => i === 0 || i === points.length - 1 || i % Math.ceil(points.length / 4) === 0)
    .map((p) => `<text class="axis" x="${X(p[0])}" y="${h - 8}" text-anchor="middle">${p[0]}</text>`).join("");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${unit}">${g}` +
    `<path class="line" d="${path}"/>${dots}${xlab}` +
    `<text class="val" x="${X(first[0]) + 6}" y="${Y(first[1]) - 10}">${first[1]}</text>` +
    `<text class="val" x="${X(last[0]) - 6}" y="${Y(last[1]) - 10}" text-anchor="end">${last[1]}</text></svg>`;
}
export function barChart(points, unit) {
  const w = 640, h = 300, pad = { l: 48, r: 16, t: 16, b: 30 };
  const ys = points.map((p) => p[1]);
  const y1 = Math.max(...ys, 0) * 1.15, y0 = Math.min(...ys, 0) * 1.3 || -1;
  const Y = (y) => h - pad.b - ((y - y0) / (y1 - y0)) * (h - pad.t - pad.b);
  const bw = ((w - pad.l - pad.r) / points.length) * 0.62;
  let g = "";
  for (let i = 0; i <= 4; i++) {
    const v = y0 + ((y1 - y0) * i) / 4, y = Y(v);
    g += `<line class="grid" x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}"/>` +
         `<text class="axis" x="${pad.l - 6}" y="${y + 4}" text-anchor="end">${v.toFixed(1)}</text>`;
  }
  const zero = Y(0);
  const bars = points.map((p, i) => {
    const cx = pad.l + ((i + 0.5) / points.length) * (w - pad.l - pad.r);
    const y = Y(p[1]);
    return `<rect class="bar${p[1] < 0 ? " neg" : ""}" x="${(cx - bw / 2).toFixed(1)}" y="${Math.min(y, zero)}" width="${bw}" height="${Math.abs(zero - y).toFixed(1)}" rx="2"/>` +
      `<text class="axis" x="${cx}" y="${h - 8}" text-anchor="middle">${String(p[0]).slice(2)}</text>` +
      (i === points.length - 1 || p[1] < 0 ? `<text class="val" x="${cx}" y="${(p[1] < 0 ? y + 14 : y - 5)}" text-anchor="middle">${p[1]}</text>` : "");
  }).join("");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="${unit}">${g}${bars}</svg>`;
}
export function groupedBars(exp, imp) {
  const w = 640, h = 300, pad = { l: 48, r: 16, t: 16, b: 30 };
  const max = Math.max(...exp.map((p) => p[1]), ...imp.map((p) => p[1])) * 1.12;
  const Y = (y) => h - pad.b - (y / max) * (h - pad.t - pad.b);
  let g = "";
  for (let i = 0; i <= 4; i++) {
    const v = (max * i) / 4, y = Y(v);
    g += `<line class="grid" x1="${pad.l}" y1="${y}" x2="${w - pad.r}" y2="${y}"/>` +
         `<text class="axis" x="${pad.l - 6}" y="${y + 4}" text-anchor="end">${Math.round(v)}</text>`;
  }
  const bw = ((w - pad.l - pad.r) / exp.length) * 0.34;
  const bars = exp.map((p, i) => {
    const cx = pad.l + ((i + 0.5) / exp.length) * (w - pad.l - pad.r);
    const q = imp[i];
    return `<rect class="bar" x="${(cx - bw - 1).toFixed(1)}" y="${Y(p[1])}" width="${bw}" height="${(Y(0) - Y(p[1])).toFixed(1)}" rx="2"/>` +
      `<rect class="bar b2" x="${(cx + 1).toFixed(1)}" y="${Y(q[1])}" width="${bw}" height="${(Y(0) - Y(q[1])).toFixed(1)}" rx="2"/>` +
      `<text class="axis" x="${cx}" y="${h - 8}" text-anchor="middle">${p[0]}</text>`;
  }).join("");
  return `<svg class="chart" viewBox="0 0 ${w} ${h}" role="img" aria-label="Exports and imports, US$ billion">${g}${bars}</svg>` +
    `<div class="legend"><span><i style="background:var(--navy-3)"></i>Exports</span><span><i style="background:var(--gold)"></i>Imports</span></div>`;
}
export function hbars(rows, unit, maxV) {
  const max = maxV || Math.max(...rows.map((r) => r[1]));
  return rows.map((r) =>
    `<div class="hbar"><span>${r[0]}</span><span class="track"><span class="fill" style="width:${(r[1] / max * 100).toFixed(1)}%"></span></span><span class="n">${r[1]}${unit}</span></div>`
  ).join("");
}
const card = (title, inner, source) =>
  `<div class="card"><h3>${title}</h3>${inner}${source ? `<div class="src">Source: ${source}</div>` : ""}</div>`;

/* Tiny trend line for KPI cards, drawn from the same published series. */
export function spark(points) {
  const ys = points.map((p) => p[1]);
  const lo = Math.min(...ys), hi = Math.max(...ys), span = (hi - lo) || 1;
  const X = (i) => 4 + (i / (points.length - 1)) * 104;
  const Y = (v) => 24 - ((v - lo) / span) * 19;
  const d = points.map((p, i) => `${i ? "L" : "M"}${X(i).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(" ");
  return `<svg class="spark" viewBox="0 0 112 28" aria-hidden="true"><path d="${d}"/>` +
    `<circle cx="${X(points.length - 1)}" cy="${Y(ys[ys.length - 1])}" r="2.6"/></svg>`;
}
const SPARKS = {
  pop: () => spark(SERIES.population.points),
  gdp: () => spark(SERIES.gdpGrowth.points),
  growth: () => spark(SERIES.gdpGrowth.points),
  inflation: () => spark(SERIES.inflation.points),
  unemp: () => spark(SERIES.unemployment.points),
  poverty: () => spark(SERIES.poverty.points),
};

/* Schematic tile map: one tile per province in its rough geographic place,
   shaded by population. Tiles link to the province profiles. */
const TILES = {
  "Aceh": [0, 1, "AC"], "North Sumatra": [1, 2, "SU"], "West Sumatra": [1, 3, "SB"], "Riau": [2, 3, "RI"],
  "Riau Islands": [3, 2, "KR"], "Jambi": [2, 4, "JA"], "South Sumatra": [3, 4, "SS"], "Bengkulu": [2, 5, "BE"],
  "Bangka Belitung Islands": [4, 4, "BB"], "Lampung": [3, 5, "LA"], "Banten": [4, 5, "BT"], "Jakarta": [5, 5, "JK"],
  "West Java": [6, 5, "JB"], "Central Java": [7, 5, "JT"], "Yogyakarta": [7, 6, "YO"], "East Java": [8, 5, "JI"],
  "Bali": [9, 5, "BA"], "West Nusa Tenggara": [10, 5, "NB"], "East Nusa Tenggara": [11, 6, "NT"],
  "West Kalimantan": [5, 2, "KB"], "Central Kalimantan": [6, 3, "KT"], "South Kalimantan": [7, 4, "KS"],
  "East Kalimantan": [7, 2, "KI"], "North Kalimantan": [7, 1, "KU"], "North Sulawesi": [10, 2, "SA"],
  "Gorontalo": [9, 2, "GO"], "Central Sulawesi": [9, 3, "ST"], "West Sulawesi": [9, 4, "SR"],
  "South Sulawesi": [10, 4, "SN"], "Southeast Sulawesi": [10, 3, "SG"], "Maluku": [12, 2, "MA"],
  "North Maluku": [12, 1, "MU"], "Southwest Papua": [12, 3, "PD"], "West Papua": [13, 2, "PB"],
  "Central Papua": [13, 3, "PT"], "Papua": [14, 2, "PA"], "Highland Papua": [14, 3, "PE"], "South Papua": [14, 4, "PS"],
};
function tileShade(pop) {
  if (pop >= 20000000) return "#0a2e52";
  if (pop >= 9000000) return "#12508c";
  if (pop >= 4000000) return "#2f74b5";
  if (pop >= 1500000) return "#7fa8cf";
  return "#c3d5e8";
}
export function tileMap() {
  const cells = PROVINCES.map((p) => {
    const t = TILES[p[0]];
    if (!t) return "";
    const dark = p[3] >= 4000000;
    return `<a class="tile" href="#/region/${slug(p[0])}" title="${p[0]} — ${fmt(p[3])} people" ` +
      `style="grid-column:${t[0] + 1};grid-row:${t[1] + 1};background:${tileShade(p[3])};color:${dark ? "#fff" : "#0a2e52"}">${t[2]}</a>`;
  }).join("");
  return `<div class="tilemap">${cells}</div>` +
    `<div class="legend"><span>Tiles are provinces in their approximate places, shaded by population:</span>` +
    `<span><i style="background:#c3d5e8"></i>under 1.5 m</span><span><i style="background:#7fa8cf"></i>1.5–4 m</span>` +
    `<span><i style="background:#2f74b5"></i>4–9 m</span><span><i style="background:#12508c"></i>9–20 m</span>` +
    `<span><i style="background:#0a2e52"></i>over 20 m</span><span>Select a tile for the province profile.</span></div>`;
}
function download(name, text, type) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type }));
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 2000);
}
const csvCell = (v) => `"${String(v).replace(/"/g, '""')}"`;

/* ---------------- home ---------------- */
export function Home() {
  const kpis = HEADLINE.map((k) => {
    const [v, u] = [k.value, k.unit];
    return `<a class="card kpi" href="#/${k.topic}"><div class="lab">${k.label}</div>` +
      `<div class="val">${v} <small>${u}</small></div>${SPARKS[k.id] ? SPARKS[k.id]() : ""}<div class="note">${k.note}</div>` +
      `<div class="src">${k.source}</div></a>`;
  }).join("");
  return `
  <div class="hero">
    <h1>${META.country}</h1>
    <p class="lede">The country's official figures — population, economy, work and regions — gathered in one open portal, every number with its source and period.</p>
    <div class="chips">
      <span class="chip"><b>${META.provinces}</b> provinces</span>
      <span class="chip"><b>${fmt(META.islands)}</b> islands</span>
      <span class="chip"><b>${fmt(META.landAreaKm2)}</b> km² of land</span>
      <span class="chip"><b>${META.regenciesCities}</b> regencies &amp; cities</span>
      <span class="chip"><b>3</b> time zones</span>
      <span class="chip">Capital: <b>${META.capital}</b></span>
    </div>
  </div>
  <div class="grid kpis">${kpis}</div>
  <div class="grid two">
    ${card(SERIES.population.title, lineChart(SERIES.population.points, SERIES.population.unit), SERIES.population.source)}
    ${card(SERIES.gdpGrowth.title, barChart(SERIES.gdpGrowth.points, SERIES.gdpGrowth.unit), SERIES.gdpGrowth.source)}
  </div>
  <section class="block"><h2>Explore by topic</h2>
  <div class="grid two">
    <a class="card topic" href="#/economy"><h3>Economy</h3><p>Output, prices, trade and the industries behind a US$1.396 trillion economy.</p><span class="go">Open the economy pages →</span></a>
    <a class="card topic" href="#/people"><h3>People &amp; society</h3><p>284.4 million people: growth, generations, health, poverty and human development.</p><span class="go">Open the people pages →</span></a>
    <a class="card topic" href="#/labour"><h3>Labour</h3><p>154 million in the labour force — who works, who is looking, and what they earn.</p><span class="go">Open the labour pages →</span></a>
    <a class="card topic" href="#/regions"><h3>Provinces</h3><p>All 38 provinces compared: population, land and density, from West Java to South Papua.</p><span class="go">Open the provinces table →</span></a>
  </div></section>
  <div class="grid two">
    ${card(REGIONS.title, hbars(REGIONS.rows, " m"), REGIONS.source)}
    <div class="card"><h3>Latest statistical releases</h3>
      ${RELEASES.map((r) => `<div class="rel"><div class="d">${r.date}</div><div class="t"><b>${r.title}<span class="tag">${r.topic}</span></b><span>${r.detail}</span></div></div>`).join("")}
      <div class="src">Release dates as published by BPS.</div>
    </div>
  </div>
  <div class="note-band">Every figure on this site is a published official statistic. Charts and tables name their source and reference period, and the <a href="#/data">data explorer</a> lists each indicator on its own row.</div>`;
}

/* ---------------- economy ---------------- */
const ECON_TABS = [
  { id: "growth", label: "GDP growth", make: () => barChart(SERIES.gdpGrowth.points, SERIES.gdpGrowth.unit), src: SERIES.gdpGrowth.source },
  { id: "inflation", label: "Inflation", make: () => lineChart(SERIES.inflation.points, SERIES.inflation.unit), src: SERIES.inflation.source },
  { id: "trade", label: "Foreign trade", make: () => groupedBars(SERIES.trade.exports, SERIES.trade.imports), src: SERIES.trade.source },
];
export function Economy() {
  const stats = [
    ["GDP (2024)", "US$1.396 trillion", "World Bank"],
    ["GDP per capita (2024)", "US$4,981", "World Bank"],
    ["Growth, Q3 2025", "5.04% a year", "BPS"],
    ["Inflation, Oct 2025", "2.86% a year", "BPS"],
    ["BI-Rate, Oct 2025", "4.75%", "Bank Indonesia"],
    ["Trade surplus (2024)", "US$31.0 billion", "BPS"],
  ].map((s) => `<div class="card kpi"><div class="lab">${s[0]}</div><div class="val" style="font-size:27px">${s[1]}</div><div class="src">${s[2]}</div></div>`).join("");
  const tradeRows = SERIES.trade.exports.map((e, i) => {
    const m = SERIES.trade.imports[i][1];
    return `<tr><td>${e[0]}</td><td class="num">${e[1].toFixed(1)}</td><td class="num">${m.toFixed(1)}</td><td class="num">${(e[1] - m).toFixed(1)}</td></tr>`;
  }).join("");
  return `
  <h1>Economy</h1>
  <p class="small" style="margin-bottom:16px">Output, prices and trade for Southeast Asia's largest economy.</p>
  <div class="grid kpis2">${stats}</div>
  <section class="block"><div class="card">
    <div class="tabs" id="econTabs">${ECON_TABS.map((t, i) => `<button data-tab="${t.id}" class="${i === 0 ? "on" : ""}">${t.label}</button>`).join("")}</div>
    <div id="econChart"></div><div class="src" id="econSrc"></div>
  </div></section>
  <div class="grid two">
    ${card(GDP_SECTORS.title, hbars(GDP_SECTORS.rows, "%"), GDP_SECTORS.source)}
    <div class="card"><h3>Goods trade by year</h3>
      <div class="twrap" style="border:0"><table><thead><tr><th>Year</th><th class="num">Exports</th><th class="num">Imports</th><th class="num">Balance</th></tr></thead>
      <tbody>${tradeRows}</tbody></table></div>
      <div class="src">US$ billion. Source: ${SERIES.trade.source}</div>
    </div>
  </div>
  <section class="block"><div class="card"><h3>Reading the economy</h3>
    <p>Indonesia's economy grew 5.03% in 2024 and 5.04% year on year in the third quarter of 2025 — a pace it has held, the pandemic aside, for a decade. Manufacturing is the largest single industry at about 19% of GDP, ahead of wholesale and retail trade (13.1%) and agriculture (12.7%).</p>
    <p>Prices rose 2.86% in the year to October 2025, inside Bank Indonesia's 2.5±1% target band; the central bank's policy rate stood at 4.75% after its October 2025 meeting. Goods exports of US$264.7 billion against imports of US$233.7 billion left a trade surplus of US$31.0 billion in 2024, the fifth straight annual surplus.</p>
  </div></section>`;
}
Economy.mount = () => {
  const box = document.getElementById("econChart"), src = document.getElementById("econSrc");
  const show = (id) => {
    const t = ECON_TABS.find((x) => x.id === id);
    box.innerHTML = t.make(); src.textContent = "Source: " + t.src;
    document.querySelectorAll("#econTabs button").forEach((b) => b.classList.toggle("on", b.dataset.tab === id));
  };
  document.querySelectorAll("#econTabs button").forEach((b) => b.addEventListener("click", () => show(b.dataset.tab)));
  show("growth");
};

/* ---------------- people ---------------- */
export function People() {
  const stats = [
    ["Population growth", "1.08% a year", "2020–2025 · BPS SUPAS 2025"],
    ["Fertility rate", "2.13 children", "2025 · near replacement level"],
    ["Life expectancy", "72.4 years", "2024 · BPS"],
    ["Human Development Index", "74.20", "2024 · high category"],
    ["Population density", "150 per km²", "Mid-2025 · Java holds 55.65%"],
    ["Dependency ratio", "45.05", "per 100 working-age · 2025"],
  ].map((s) => `<div class="card kpi"><div class="lab">${s[0]}</div><div class="val" style="font-size:27px">${s[1]}</div><div class="note">${s[2]}</div></div>`).join("");
  return `
  <h1>People &amp; society</h1>
  <p class="small" style="margin-bottom:16px">A young, slowing-growing population of 284.4 million — and a poverty rate at a two-decade low.</p>
  <div class="grid kpis2">${stats}</div>
  <div class="grid two">
    ${card(SERIES.population.title, lineChart(SERIES.population.points, SERIES.population.unit), SERIES.population.source)}
    ${card(SERIES.poverty.title, lineChart(SERIES.poverty.points, SERIES.poverty.unit), SERIES.poverty.source)}
  </div>
  <div class="grid two">
    ${card(GENERATIONS.title, hbars(GENERATIONS.rows, "%"), GENERATIONS.source)}
    <div class="card"><h3>Poverty and inequality, in figures</h3>
      <ul class="tight">
        <li><b>8.25%</b> of the population lived below the national poverty line in September 2025 — 23.36 million people, the lowest share in two decades.</li>
        <li>The March 2025 poverty line was <b>Rp609,160 per person a month</b>; 8.47% (23.85 million) were below it.</li>
        <li>The Gini ratio of expenditure was <b>0.375</b> in March 2025.</li>
        <li><b>68.94%</b> of the population is of working age (15–64); Generation Z is the largest generation at 24.93%.</li>
      </ul>
      <div class="src">Source: BPS — Susenas March &amp; September 2025; SUPAS 2025.</div>
    </div>
  </div>`;
}

/* ---------------- labour ---------------- */
export function Labour() {
  const facts = LABOUR_FACTS.map((f) =>
    `<div class="card kpi"><div class="lab">${f.label}</div><div class="val" style="font-size:25px">${f.value}</div><div class="note">${f.period}</div><div class="src">${f.source}</div></div>`).join("");
  return `
  <h1>Labour</h1>
  <p class="small" style="margin-bottom:16px">From the National Labour Force Survey (Sakernas), August 2025 round, released 5 November 2025.</p>
  <div class="grid two">
    ${card(SERIES.unemployment.title, lineChart(SERIES.unemployment.points, SERIES.unemployment.unit), SERIES.unemployment.source)}
    <div class="card"><h3>How the working population divides</h3>
      <div class="stack">
        <div style="background:var(--navy-3);width:67.32%">Full-time · 67.32%</div>
        <div style="background:var(--gold);width:24.77%">Part-time · 24.77%</div>
        <div style="background:var(--red);width:7.91%">7.91%</div>
      </div>
      <div class="legend"><span><i style="background:var(--navy-3)"></i>Full-time (35+ hours)</span><span><i style="background:var(--gold)"></i>Part-time</span><span><i style="background:var(--red)"></i>Underemployed</span></div>
      <p style="margin-top:12px">Of 146.54 million people in work, two in three work full-time. A person counts as working after at least one hour of work in the survey's reference week — the ILO standard Sakernas applies — which is why the survey also publishes part-time and underemployment shares alongside the headline rate.</p>
      <div class="src">Source: BPS — Sakernas, August 2025.</div>
    </div>
  </div>
  <div class="grid kpis">${facts}</div>`;
}

/* ---------------- regions ---------------- */
const R = { q: "", region: "All regions", key: 3, dir: -1 };
function provRows() {
  let rows = PROVINCES.filter((p) =>
    (R.region === "All regions" || p[2] === R.region) &&
    (p[0] + " " + p[1]).toLowerCase().includes(R.q.toLowerCase()));
  rows = rows.slice().sort((a, b) => {
    const x = a[R.key], y = b[R.key];
    return (typeof x === "string" ? x.localeCompare(y) : x - y) * R.dir;
  });
  return rows;
}
function provTable() {
  const rows = provRows();
  const body = rows.map((p) =>
    `<tr><td><a href="#/region/${slug(p[0])}">${p[0]}</a></td><td>${p[1]}</td><td>${p[2]}</td>` +
    `<td class="num">${fmt(p[3])}</td><td class="num">${(p[3] / TOTAL_POP * 100).toFixed(2)}%</td>` +
    `<td class="num">${fmt(p[4])}</td><td class="num">${fmt(p[5])}</td></tr>`).join("");
  return { body, n: rows.length };
}
export function Regions() {
  const regionNames = ["All regions", ...new Set(PROVINCES.map((p) => p[2]))];
  const top5 = PROVINCES.slice().sort((a, b) => b[3] - a[3]).slice(0, 5).map((p) => [p[0], +(p[3] / 1e6).toFixed(2)]);
  const heads = [["Province", 0], ["Capital", 1], ["Region", 2], ["Population", 3], ["Share", 3], ["Area (km²)", 4], ["Density", 5]];
  return `
  <h1>Provinces</h1>
  <p class="small" style="margin-bottom:16px">All 38 provinces, mid-2025 population estimates. Search, filter by island region, or sort by any column. Select a province for its profile.</p>
  <section class="block"><div class="card"><h3>Indonesia at a glance — population by province</h3>${tileMap()}<div class="src">Source: BPS mid-2025 estimates. Schematic tile map: one tile per province, not a geographic survey.</div></div></section>
  <div class="grid two">
    ${card("Five largest provinces, million people", hbars(top5, " m"), "BPS mid-2025 estimates")}
    <div class="card"><h3>The national picture</h3>
      <ul class="tight">
        <li>Total population of the 38 provinces: <b>${fmt(TOTAL_POP)}</b> (mid-2025).</li>
        <li>West Java alone holds <b>17.8%</b> of the nation — more than Kalimantan and Sulawesi combined.</li>
        <li>Jakarta is the densest province at <b>16,155 people per km²</b>; South Papua the sparsest at 5.</li>
        <li>Nine provinces have special or special-capital status, among them Aceh, Yogyakarta, Jakarta and the six Papuan provinces.</li>
      </ul>
      <div class="src">Source: BPS mid-2025 provincial estimates.</div>
    </div>
  </div>
  <div class="controls">
    <input type="search" id="provQ" placeholder="Search province or capital…" value="${R.q}">
    <select id="provRegion">${regionNames.map((r) => `<option ${r === R.region ? "selected" : ""}>${r}</option>`).join("")}</select>
    <button class="btn ghost" id="provCsv" type="button">Download CSV</button>
    <button class="btn ghost" id="provJson" type="button">Download JSON</button>
  </div>
  <div class="twrap"><table><thead><tr>${heads.map((h) => `<th class="sortable ${h[1] >= 3 ? "num" : ""}" data-k="${h[1]}">${h[0]}${R.key === h[1] ? (R.dir === 1 ? " ↑" : " ↓") : ""}</th>`).join("")}</tr></thead>
  <tbody id="provBody"></tbody>
  <tfoot><tr><td>Indonesia — 38 provinces</td><td></td><td></td><td class="num">${fmt(TOTAL_POP)}</td><td class="num">100%</td><td class="num">${fmt(PROVINCES.reduce((a, p) => a + p[4], 0))}</td><td class="num">150</td></tr></tfoot></table></div>
  <div class="count" id="provCount"></div>`;
}
Regions.mount = () => {
  const draw = () => {
    const { body, n } = provTable();
    document.getElementById("provBody").innerHTML = body;
    document.getElementById("provCount").textContent = `Showing ${n} of 38 provinces · Source: BPS mid-2025 estimates`;
  };
  document.getElementById("provCsv").addEventListener("click", () => {
    const head = "province,capital,region,population_mid_2025,share_pct,area_km2,density_per_km2\n";
    const lines = provRows().map((p) => [p[0], p[1], p[2], p[3], (p[3] / TOTAL_POP * 100).toFixed(2), p[4], p[5]].map(csvCell).join(","));
    download("datanusa-provinces.csv", head + lines.join("\n"), "text/csv");
  });
  document.getElementById("provJson").addEventListener("click", () => {
    const rows = provRows().map((p) => ({ province: p[0], capital: p[1], region: p[2], population_mid_2025: p[3], area_km2: p[4], density_per_km2: p[5], source: "BPS mid-2025 estimates" }));
    download("datanusa-provinces.json", JSON.stringify(rows, null, 2), "application/json");
  });
  document.getElementById("provQ").addEventListener("input", (e) => { R.q = e.target.value; draw(); });
  document.getElementById("provRegion").addEventListener("change", (e) => { R.region = e.target.value; draw(); });
  document.querySelectorAll("th.sortable").forEach((th) => th.addEventListener("click", () => {
    const k = +th.dataset.k;
    if (R.key === k) R.dir *= -1; else { R.key = k; R.dir = k === 0 ? 1 : -1; }
    document.getElementById("app").innerHTML = Regions(); Regions.mount();
  }));
  draw();
};

/* ---------------- region detail ---------------- */
export function RegionDetail(s) {
  const p = PROVINCES.find((x) => slug(x[0]) === s);
  if (!p) return `<h1>Province not found</h1><p><a href="#/regions">Back to the provinces table</a></p>`;
  const byPop = PROVINCES.slice().sort((a, b) => b[3] - a[3]);
  const byDen = PROVINCES.slice().sort((a, b) => b[5] - a[5]);
  const rankPop = byPop.indexOf(p) + 1, rankDen = byDen.indexOf(p) + 1;
  const share = (p[3] / TOTAL_POP * 100).toFixed(2);
  const avg = TOTAL_POP / 38;
  const idx = byPop.indexOf(p);
  const prev = byPop[(idx + 37) % 38], next = byPop[(idx + 1) % 38];
  const stats = [
    ["Population (mid-2025)", fmt(p[3])], ["Share of Indonesia", share + "%"],
    ["Rank by population", `${rankPop} of 38`], ["Land area", fmt(p[4]) + " km²"],
    ["Density", fmt(p[5]) + " per km²"], ["Rank by density", `${rankDen} of 38`],
  ].map((x) => `<div class="card kpi"><div class="lab">${x[0]}</div><div class="val" style="font-size:26px">${x[1]}</div></div>`).join("");
  return `
  <div class="crumb"><a href="#/regions">Provinces</a> · ${p[2]}</div>
  <h1>${p[0]}</h1>
  <p class="small" style="margin-bottom:16px">Capital: ${p[1]} · Island region: ${p[2]}</p>
  <div class="grid kpis">${stats}</div>
  <div class="grid two">
    ${card("Population against the provincial average", hbars([[p[0], +(p[3] / 1e6).toFixed(2)], ["Average province", +(avg / 1e6).toFixed(2)], ["West Java (largest)", 50.76]], " m"), "BPS mid-2025 estimates")}
    <div class="card"><h3>${p[0]} against Indonesia</h3>
      <div class="twrap" style="border:0"><table><tbody>
      <tr><td>Population density</td><td class="num"><b>${fmt(p[5])}</b> vs 150 per km² nationally</td></tr>
      <tr><td>Share of national population</td><td class="num"><b>${share}%</b></td></tr>
      <tr><td>Share of national land area</td><td class="num"><b>${(p[4] / META.landAreaKm2 * 100).toFixed(2)}%</b></td></tr>
      <tr><td>Population of the capital</td><td class="num">${p[1]} (city proper, see province release)</td></tr>
      </tbody></table></div>
      <div class="src">Source: BPS mid-2025 provincial estimates.</div>
    </div>
  </div>
  <div class="pager">
    <a class="btn ghost" href="#/region/${slug(prev[0])}">← ${prev[0]}</a>
    <a class="btn" href="#/regions">All provinces</a>
    <a class="btn ghost" href="#/region/${slug(next[0])}">${next[0]} →</a>
  </div>`;
}

/* ---------------- data explorer ---------------- */
const D = { q: "", topic: "All topics", key: 1, dir: 1 };
export function Data() {
  const topics = ["All topics", ...new Set(INDICATORS.map((i) => i[0]))];
  return `
  <h1>Data explorer</h1>
  <p class="small" style="margin-bottom:16px">Every headline indicator on the site, one row each, with its period and source. Search or filter by topic; select a column heading to sort.</p>
  <div class="controls">
    <input type="search" id="dataQ" placeholder="Search indicators…" value="${D.q}">
    <select id="dataTopic">${topics.map((t) => `<option ${t === D.topic ? "selected" : ""}>${t}</option>`).join("")}</select>
    <button class="btn ghost" id="dataCsv" type="button">Download CSV</button>
  </div>
  <div class="twrap"><table><thead><tr>
    ${["Topic", "Indicator", "Value", "Unit", "Period", "Source"].map((h, i) => `<th class="sortable" data-k="${i}">${h}</th>`).join("")}
  </tr></thead><tbody id="dataBody"></tbody></table></div>
  <div class="count" id="dataCount"></div>`;
}
Data.mount = () => {
  const draw = () => {
    let rows = INDICATORS.filter((r) =>
      (D.topic === "All topics" || r[0] === D.topic) &&
      r.join(" ").toLowerCase().includes(D.q.toLowerCase()));
    rows = rows.slice().sort((a, b) => String(a[D.key]).localeCompare(String(b[D.key])) * D.dir);
    document.getElementById("dataBody").innerHTML = rows.map((r) =>
      `<tr><td><span class="tag" style="margin:0">${r[0]}</span></td><td>${r[1]}</td><td class="num"><b>${r[2]}</b></td><td>${r[3]}</td><td>${r[4]}</td><td>${r[5]}</td></tr>`).join("");
    document.getElementById("dataCount").textContent = `${rows.length} indicators`;
  };
  document.getElementById("dataCsv").addEventListener("click", () => {
    const rows = INDICATORS.filter((r) =>
      (D.topic === "All topics" || r[0] === D.topic) &&
      r.join(" ").toLowerCase().includes(D.q.toLowerCase()));
    const head = "topic,indicator,value,unit,period,source\n";
    download("datanusa-indicators.csv", head + rows.map((r) => r.map(csvCell).join(",")).join("\n"), "text/csv");
  });
  document.getElementById("dataQ").addEventListener("input", (e) => { D.q = e.target.value; draw(); });
  document.getElementById("dataTopic").addEventListener("change", (e) => { D.topic = e.target.value; draw(); });
  document.querySelectorAll("th.sortable").forEach((th) => th.addEventListener("click", () => {
    const k = +th.dataset.k;
    if (D.key === k) D.dir *= -1; else { D.key = k; D.dir = 1; }
    draw();
  }));
  draw();
};

/* ---------------- about ---------------- */
export function About() {
  return `
  <h1>About &amp; sources</h1>
  <p>DataNusa is an independent, static presentation of Indonesia's official statistics. It runs entirely from its own files — no server, no tracking, no network calls — and every figure it shows was published by the institution named beside it.</p>
  <section class="block"><div class="card"><h3>How to read the figures</h3>
    <ul class="tight">
      <li><b>Periods are part of the number.</b> Inflation of 2.86% is the year to October 2025; unemployment of 4.85% is the August 2025 Sakernas round. The same indicator in a different month is a different statistic.</li>
      <li><b>Surveys, not guesses.</b> Labour figures come from Sakernas, poverty from Susenas, population from the census and the 2025 intercensal survey (SUPAS). Each is a designed national sample or a full count, run by BPS.</li>
      <li><b>Rounding.</b> Provincial populations are BPS mid-2025 estimates; the 38 provinces sum to 284.44 million against the SUPAS 2025 count of 284.67 million — the difference is estimation and rounding, and both figures are shown where they are used.</li>
      <li><b>Definitions matter.</b> A person is "working" in Sakernas after one hour of work in the reference week; the poverty line is a rupiah amount per person per month, not a share chosen for the headline.</li>
    </ul>
  </div></section>
  <section class="block"><div class="card"><h3>Publications compiled</h3>
    ${SOURCES.map((s) => `<div class="rel"><div class="t"><b>${s.name}</b><span>${s.what}</span></div></div>`).join("")}
    <div class="src">DataNusa is an independent presentation and is not affiliated with BPS, the World Bank or Bank Indonesia. Figures are reproduced from their published releases; consult the original release before citing a number in a formal document.</div>
  </div></section>`;
}
