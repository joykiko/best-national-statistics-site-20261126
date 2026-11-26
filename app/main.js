// DataNusa router (rewritten in the 26 Nov 2026 rebuild session).
// Hash routes keep the whole portal in one static page: every view is a
// link, and the back button works, with no server and no network beyond
// the site's own files.
import { Home, Economy, People, Labour, Regions, RegionDetail, Data, About } from "./views.js";

const app = document.getElementById("app");
const nav = document.getElementById("nav");

const ROUTES = {
  "": Home,
  economy: Economy,
  people: People,
  labour: Labour,
  regions: Regions,
  data: Data,
  about: About,
};
const TITLES = {
  "": "DataNusa — Indonesia in Numbers",
  economy: "Economy · DataNusa",
  people: "People & society · DataNusa",
  labour: "Labour · DataNusa",
  regions: "Provinces · DataNusa",
  region: "Province profile · DataNusa",
  data: "Data explorer · DataNusa",
  about: "About & sources · DataNusa",
};

function render() {
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const head = parts[0] || "";
  let view, arg;
  if (head === "region" && parts[1]) {
    view = RegionDetail; arg = parts[1];
    document.title = TITLES.region;
    setNav("regions");
  } else {
    view = ROUTES[head] || Home;
    document.title = TITLES[head] || TITLES[""];
    setNav(head);
  }
  app.innerHTML = view(arg);
  if (view.mount) view.mount();
  window.scrollTo(0, 0);
}
function setNav(head) {
  nav.querySelectorAll("a").forEach((a) => a.classList.toggle("on", a.dataset.r === head));
}
window.addEventListener("hashchange", render);
render();
