// DataNusa — application entry point: hash router, navigation, and the
// interactive controls (province search/filter/sort, explorer filter and
// CSV/JSON downloads). No network, no dependencies.

import { INDICATORS, PROVINCES } from './data.js';
import {
  homeView, economyView, peopleView, labourView,
  provincesView, provinceProfileView, provinceRows,
  explorerView, aboutView, provinceBySlug,
} from './views.js';

const app = document.getElementById('app');

const ROUTES = [
  { path: '/', view: homeView, label: 'Home' },
  { path: '/economy', view: economyView, label: 'Economy' },
  { path: '/people', view: peopleView, label: 'People & Society' },
  { path: '/labour', view: labourView, label: 'Labour' },
  { path: '/provinces', view: provincesView, label: 'Provinces' },
  { path: '/explorer', view: explorerView, label: 'Explorer' },
  { path: '/about', view: aboutView, label: 'About' },
];

function currentPath() {
  const hash = window.location.hash.replace(/^#/, '');
  return hash === '' ? '/' : hash;
}

function markActiveNav(path) {
  document.querySelectorAll('nav a[data-route]').forEach((a) => {
    const route = a.getAttribute('data-route');
    const active = route === path || (route === '/provinces' && path.startsWith('/province/'));
    a.classList.toggle('active', Boolean(active));
  });
}

function download(filename, text, type) {
  const blob = new Blob([text], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function indicatorsAsCsv(list) {
  const esc = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const header = 'indicator,value,unit,period,publisher,note';
  const lines = list.map((i) => [i.name, i.value, i.unit, i.period, i.source, i.note].map(esc).join(','));
  return [header, ...lines].join('\n');
}

function wireProvinceControls() {
  const search = document.getElementById('prov-search');
  const island = document.getElementById('prov-island');
  const body = document.getElementById('prov-body');
  if (!search || !island || !body) return;
  let sortKey = null;
  let sortDir = 1;
  const render = () => {
    const q = search.value.trim().toLowerCase();
    let list = PROVINCES.filter((p) =>
      (island.value === '' || p.island === island.value) &&
      (q === '' || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)));
    if (sortKey) {
      list = [...list].sort((a, b) => {
        const av = a[sortKey], bv = b[sortKey];
        return (typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv))) * sortDir;
      });
    }
    body.innerHTML = list.length
      ? provinceRows(list)
      : '<tr><td colspan="6">No province matches that search.</td></tr>';
  };
  search.addEventListener('input', render);
  island.addEventListener('change', render);
  document.querySelectorAll('#prov-table th[data-sort]').forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.getAttribute('data-sort');
      if (sortKey === key) sortDir = -sortDir; else { sortKey = key; sortDir = 1; }
      render();
    });
  });
}

function wireExplorerControls() {
  const search = document.getElementById('exp-search');
  const category = document.getElementById('exp-category');
  const holder = document.getElementById('exp-table');
  if (!search || !category || !holder) return;
  const render = async () => {
    const { indicatorTable } = await import('./views.js');
    const q = search.value.trim().toLowerCase();
    const list = INDICATORS.filter((i) =>
      (category.value === '' || i.category === category.value) &&
      (q === '' || i.name.toLowerCase().includes(q) || i.note.toLowerCase().includes(q)));
    holder.innerHTML = list.length
      ? indicatorTable(list)
      : '<p>No indicator matches that search.</p>';
  };
  search.addEventListener('input', render);
  category.addEventListener('change', render);
  const csvBtn = document.getElementById('dl-csv');
  const jsonBtn = document.getElementById('dl-json');
  if (csvBtn) csvBtn.addEventListener('click', () => download('datanusa-indicators.csv', indicatorsAsCsv(INDICATORS), 'text/csv'));
  if (jsonBtn) jsonBtn.addEventListener('click', () => download('datanusa-indicators.json', JSON.stringify(INDICATORS, null, 2), 'application/json'));
}

function render() {
  const path = currentPath();
  let html;
  if (path.startsWith('/province/')) {
    const province = provinceBySlug(path.slice('/province/'.length));
    html = province ? provinceProfileView(province) : provincesView();
  } else {
    const route = ROUTES.find((r) => r.path === path) || ROUTES[0];
    html = route.view();
  }
  app.innerHTML = html;
  markActiveNav(path);
  if (path === '/provinces') wireProvinceControls();
  if (path === '/explorer') wireExplorerControls();
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', render);
render();
