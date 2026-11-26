// DataNusa — every view of the site, rendered as HTML strings.
// One clear job per helper: KPI cards, charts, tables, the tile map and the
// province profiles are each built by their own function below.

import { INDICATORS, SERIES, PROVINCES, TILE_POSITIONS, ISLANDS, NATIONAL_POPULATION } from './data.js';

export function formatNumber(n) {
  return n.toLocaleString('en-US');
}

export function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function provinceBySlug(slug) {
  return PROVINCES.find((p) => slugify(p.name) === slug) || null;
}

function indicatorCard(ind) {
  return `<article class="kpi-card">
    <p class="kpi-name">${ind.name}</p>
    <p class="kpi-value">${ind.value}</p>
    <p class="kpi-meta">${ind.period} · ${ind.source}</p>
  </article>`;
}

function indicatorRow(ind) {
  return `<tr>
    <td><strong>${ind.name}</strong><span class="row-note">${ind.note}</span></td>
    <td class="num">${ind.value}</td>
    <td>${ind.period}</td>
    <td>${ind.source}</td>
  </tr>`;
}

export function indicatorTable(list) {
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr><th>Indicator</th><th class="num">Value</th><th>Period</th><th>Publisher</th></tr></thead>
    <tbody>${list.map(indicatorRow).join('')}</tbody>
  </table></div>`;
}

// ---- SVG charts (drawn locally, no libraries) ------------------------------

export function sparkline(series, width = 260, height = 64) {
  const values = series.points.map((p) => p[1]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const stepX = width / (values.length - 1);
  const coords = values.map((v, i) => [Math.round(i * stepX), Math.round(height - 6 - ((v - min) / span) * (height - 12))]);
  const path = coords.map((c, i) => `${i === 0 ? 'M' : 'L'}${c[0]},${c[1]}`).join(' ');
  const dots = coords.map((c) => `<circle cx="${c[0]}" cy="${c[1]}" r="3" class="spark-dot"/>`).join('');
  const first = series.points[0];
  const last = series.points[series.points.length - 1];
  return `<figure class="chart-card">
    <figcaption>${series.label}<span class="chart-range">${first[0]}: ${first[1]} → ${last[0]}: ${last[1]}</span></figcaption>
    <svg viewBox="0 0 ${width} ${height}" class="spark" role="img" aria-label="${series.label}">
      <path d="${path}" class="spark-line"/>${dots}
    </svg>
  </figure>`;
}

export function lineChart(series, width = 640, height = 240) {
  const values = series.points.map((p) => p[1]);
  const min = Math.floor(Math.min(...values) * 10) / 10;
  const max = Math.ceil(Math.max(...values) * 10) / 10;
  const span = max - min || 1;
  const padL = 44, padR = 12, padT = 14, padB = 28;
  const innerW = width - padL - padR;
  const innerH = height - padT - padB;
  const stepX = innerW / (values.length - 1);
  const x = (i) => Math.round(padL + i * stepX);
  const y = (v) => Math.round(padT + innerH - ((v - min) / span) * innerH);
  const path = values.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ');
  const grid = [0, 0.5, 1].map((f) => {
    const gy = Math.round(padT + innerH * f);
    const gv = (max - span * f).toFixed(1);
    return `<line x1="${padL}" y1="${gy}" x2="${width - padR}" y2="${gy}" class="grid-line"/><text x="4" y="${gy + 4}" class="axis-text">${gv}</text>`;
  }).join('');
  const labels = series.points.map((p, i) => `<text x="${x(i)}" y="${height - 8}" class="axis-text" text-anchor="middle">${p[0]}</text>`).join('');
  const dots = values.map((v, i) => `<circle cx="${x(i)}" cy="${y(v)}" r="3.5" class="spark-dot"><title>${series.points[i][0]}: ${v}</title></circle>`).join('');
  return `<figure class="chart-card wide">
    <figcaption>${series.label}</figcaption>
    <svg viewBox="0 0 ${width} ${height}" class="line-chart" role="img" aria-label="${series.label}">${grid}${labels}<path d="${path}" class="spark-line"/>${dots}</svg>
  </figure>`;
}

export function barChart(title, rows, width = 640) {
  const max = Math.max(...rows.map((r) => r.value));
  const bars = rows.map((r) => {
    const pct = Math.max(2, Math.round((r.value / max) * 100));
    return `<div class="bar-row"><span class="bar-label">${r.label}</span><span class="bar-track"><span class="bar-fill" style="width:${pct}%"></span></span><span class="bar-value">${r.display}</span></div>`;
  }).join('');
  return `<figure class="chart-card wide"><figcaption>${title}</figcaption><div class="bar-chart" style="max-width:${width}px">${bars}</div></figure>`;
}

// ---- Tile map ---------------------------------------------------------------

export function tileMap() {
  const tiles = PROVINCES.map((p) => {
    const [col, row] = TILE_POSITIONS[p.name];
    const share = ((p.population / NATIONAL_POPULATION) * 100).toFixed(1);
    return `<a class="tile" style="grid-column:${col + 1};grid-row:${row + 1}" href="#/province/${slugify(p.name)}" title="${p.name} — ${formatNumber(p.population)} people">
      <span class="tile-name">${p.name}</span><span class="tile-share">${share}%</span>
    </a>`;
  }).join('');
  return `<div class="tile-map" role="list" aria-label="Schematic tile map of the 38 provinces">${tiles}</div>
  <p class="map-note">Schematic tile map — one tile per province, west to east. The percentage is the province's share of the national population. Click any tile for its profile.</p>`;
}

// ---- Views ------------------------------------------------------------------

const HEADLINE_IDS = ['population', 'gdp-usd', 'gdp-per-capita', 'inflation', 'unemployment', 'poverty', 'hdi', 'bi-rate'];

export function homeView() {
  const headlines = HEADLINE_IDS.map((id) => INDICATORS.find((i) => i.id === id));
  const topProvinces = [...PROVINCES].sort((a, b) => b.population - a.population).slice(0, 6)
    .map((p) => ({ label: p.name, value: p.population, display: formatNumber(p.population) }));
  return `
  <section class="hero">
    <h1>Indonesia in Numbers</h1>
    <p class="hero-sub">The official statistics of the world's fourth most populous country — ${formatNumber(NATIONAL_POPULATION)} people, 38 provinces, one portal. Every figure names its publisher and period; the newest releases shown are November 2025 (policy rate) and October 2025 (inflation, reserves).</p>
  </section>
  <section class="kpi-grid">${headlines.map(indicatorCard).join('')}</section>
  <section>
    <h2>The country at a glance</h2>
    <div class="chart-grid">
      ${sparkline(SERIES.population)}
      ${sparkline(SERIES.gdpGrowth)}
      ${sparkline(SERIES.inflation)}
      ${sparkline(SERIES.unemployment)}
      ${sparkline(SERIES.poverty)}
      ${sparkline(SERIES.hdi)}
    </div>
  </section>
  <section>
    <h2>Explore the provinces</h2>
    ${tileMap()}
  </section>
  <section>
    ${barChart('Six largest provinces by population (mid-2025)', topProvinces)}
    <p class="map-note">Java's six provinces hold about 56% of the national population on less than 7% of the land area.</p>
  </section>`;
}

export function economyView() {
  const list = INDICATORS.filter((i) => i.category === 'Economy');
  return `<section class="page-head"><h1>Economy</h1>
    <p>Output, prices, money and trade — the macroeconomic headline figures from BPS, Bank Indonesia and the World Bank.</p></section>
    <div class="chart-grid">${lineChart(SERIES.gdpGrowth)}${lineChart(SERIES.inflation)}</div>
    ${indicatorTable(list)}`;
}

export function peopleView() {
  const list = INDICATORS.filter((i) => i.category === 'People' || i.category === 'Society');
  return `<section class="page-head"><h1>People &amp; Society</h1>
    <p>Population, health, education, poverty and living standards.</p></section>
    <div class="chart-grid">${lineChart(SERIES.population)}${lineChart(SERIES.poverty)}${lineChart(SERIES.hdi)}</div>
    ${indicatorTable(list)}`;
}

export function labourView() {
  const list = INDICATORS.filter((i) => i.category === 'Labour');
  return `<section class="page-head"><h1>Labour</h1>
    <p>Jobs and the workforce, from the August 2025 Sakernas labour force survey and related releases.</p></section>
    <div class="chart-grid">${lineChart(SERIES.unemployment)}</div>
    ${indicatorTable(list)}`;
}

export function provinceRows(list) {
  return list.map((p) => {
    const density = Math.round(p.population / p.area);
    const share = ((p.population / NATIONAL_POPULATION) * 100).toFixed(2);
    return `<tr>
      <td><a href="#/province/${slugify(p.name)}"><strong>${p.name}</strong></a><span class="row-note">${p.capital}</span></td>
      <td>${p.island}</td>
      <td class="num">${formatNumber(p.population)}</td>
      <td class="num">${share}%</td>
      <td class="num">${formatNumber(p.area)}</td>
      <td class="num">${formatNumber(density)}</td>
    </tr>`;
  }).join('');
}

export function provincesView() {
  return `<section class="page-head"><h1>Provinces</h1>
    <p>All 38 provinces, mid-2025 population estimates. Search, filter by island group, or click a column heading to sort. Click a province name for its profile.</p></section>
    <div class="controls">
      <label>Search <input id="prov-search" type="search" placeholder="Province or capital…"></label>
      <label>Island group <select id="prov-island">
        <option value="">All island groups</option>
        ${ISLANDS.map((i) => `<option value="${i}">${i}</option>`).join('')}
      </select></label>
    </div>
    <div class="table-wrap"><table class="data-table" id="prov-table">
      <thead><tr>
        <th data-sort="name">Province</th><th data-sort="island">Island group</th>
        <th data-sort="population" class="num">Population</th><th class="num">Share</th>
        <th data-sort="area" class="num">Area (km²)</th><th class="num">Density /km²</th>
      </tr></thead>
      <tbody id="prov-body">${provinceRows(PROVINCES)}</tbody>
      <tfoot><tr><td colspan="2"><strong>Indonesia — 38 provinces</strong></td>
        <td class="num"><strong>${formatNumber(NATIONAL_POPULATION)}</strong></td><td class="num"><strong>100%</strong></td>
        <td class="num"><strong>${formatNumber(PROVINCES.reduce((s, p) => s + p.area, 0))}</strong></td><td></td></tr></tfoot>
    </table></div>
    <section><h2>Provinces on the tile map</h2>${tileMap()}</section>`;
}

export function provinceProfileView(p) {
  const density = Math.round(p.population / p.area);
  const share = ((p.population / NATIONAL_POPULATION) * 100).toFixed(2);
  const rank = [...PROVINCES].sort((a, b) => b.population - a.population).indexOf(p) + 1;
  const islandPeers = PROVINCES.filter((x) => x.island === p.island && x !== p)
    .map((x) => ({ label: x.name, value: x.population, display: formatNumber(x.population) }));
  const rows = [{ label: p.name, value: p.population, display: formatNumber(p.population) }, ...islandPeers]
    .sort((a, b) => b.value - a.value);
  return `<section class="page-head"><p class="crumb"><a href="#/provinces">← All provinces</a></p>
    <h1>${p.name}</h1>
    <p>Capital: <strong>${p.capital}</strong> · Island group: ${p.island}</p></section>
    <section class="kpi-grid">
      <article class="kpi-card"><p class="kpi-name">Population (mid-2025)</p><p class="kpi-value">${formatNumber(p.population)}</p><p class="kpi-meta">Rank ${rank} of 38 provinces</p></article>
      <article class="kpi-card"><p class="kpi-name">Share of national population</p><p class="kpi-value">${share}%</p><p class="kpi-meta">of ${formatNumber(NATIONAL_POPULATION)}</p></article>
      <article class="kpi-card"><p class="kpi-name">Land area</p><p class="kpi-value">${formatNumber(p.area)} km²</p><p class="kpi-meta">${p.island}</p></article>
      <article class="kpi-card"><p class="kpi-name">Population density</p><p class="kpi-value">${formatNumber(density)} /km²</p><p class="kpi-meta">population ÷ land area</p></article>
    </section>
    <section>${barChart(`Population within ${p.island} — ${p.name} compared with its island-group peers`, rows)}</section>`;
}

export function explorerView() {
  const categories = [...new Set(INDICATORS.map((i) => i.category))];
  return `<section class="page-head"><h1>Explorer</h1>
    <p>All ${INDICATORS.length} indicators in one place. Filter by category or search by name, then download the full dataset as CSV or JSON — generated in your browser from the same data this site displays.</p></section>
    <div class="controls">
      <label>Search <input id="exp-search" type="search" placeholder="Inflation, poverty, exports…"></label>
      <label>Category <select id="exp-category">
        <option value="">All categories</option>
        ${categories.map((c) => `<option value="${c}">${c}</option>`).join('')}
      </select></label>
      <span class="download-btns">
        <button id="dl-csv" type="button">Download CSV</button>
        <button id="dl-json" type="button">Download JSON</button>
      </span>
    </div>
    <div id="exp-table">${indicatorTable(INDICATORS)}</div>
    <section><h2>Time series</h2><div class="chart-grid">
      ${Object.values(SERIES).map((s) => lineChart(s)).join('')}
    </div></section>`;
}

export function aboutView() {
  return `<section class="page-head"><h1>About DataNusa</h1></section>
  <section class="prose">
    <p><strong>DataNusa — Indonesia in Numbers</strong> is a static, offline portal of Indonesian official statistics. It runs entirely from its own files: no network requests, no trackers, no build step.</p>
    <h2>Sources</h2>
    <p>Figures come from BPS (Statistics Indonesia) releases — including the August 2025 Sakernas labour force survey and the September 2025 poverty release — Bank Indonesia (policy rate, reserves, exchange rate), the World Bank (GDP in US dollars), and line ministries (electrification, minimum wages, administrative counts). Every indicator on this site names its publisher and reference period next to the figure.</p>
    <h2>Provincial population method</h2>
    <p>The 38 provincial populations are BPS mid-2025 estimates. Provincial estimates published in rounded form do not always add up to the separately published national total, so Jawa Barat — the largest province — carries a balancing adjustment of 443,000 people (under 1% of its population) so that the provincial table sums exactly to the national mid-2025 estimate of ${formatNumber(NATIONAL_POPULATION)}. Densities shown on this site are computed from the displayed population and land area, never stored.</p>
    <h2>What the site contains</h2>
    <p>${INDICATORS.length} indicators across economy, people, society, labour and production; ${Object.keys(SERIES).length} time series with six annual observations each; and a profile for each of the 38 provinces. The Explorer view downloads the whole indicator set as CSV or JSON.</p>
    <h2>Licence</h2>
    <p>The site's code is released under the MIT License. The statistics belong to their publishers and are reproduced here with attribution.</p>
  </section>`;
}
