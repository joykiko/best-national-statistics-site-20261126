// DataNusa — Indonesia in Numbers: hand-in program for the make.fun
// "best national statistics site" entry (Node 22, standard library only).
//
// What this program does, in order:
//   1. prepares the output directory (MAKEFUN_OUTPUT_DIR locally, /output
//      inside the grader's container),
//   2. copies the finished static site from app/ and the QA screenshots
//      from screenshots/ into it, untouched,
//   3. asks the vendored make.fun library to summarise that output into
//      dossier.json — the document the judge reads — using the scorer's
//      own caps, and
//   4. reads the dossier back and verifies it carries the expected schema
//      and at least one screenshot before declaring the hand-in complete.
//
// The site itself needs no build: app/ is plain HTML, CSS and ES modules
// that a browser opens directly at app/index.html, and nothing it shows
// is loaded over the network. To view it locally, run `node serve.ts`
// and open http://localhost:8080.
//
// vendor/makefun-frontend.ts is the kit's library and stays exactly as
// handed out: the scorer requires dossier.json to be byte for byte what
// its own copy of that library writes.

import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier, DOSSIER_SCHEMA } from './vendor/makefun-frontend.ts';

// The scorer's caps, named once so the hand-in below reads plainly.
// text_max_bytes is the only one that shapes the dossier's bytes; the
// rest make this program refuse, up front, an entry the scorer would
// refuse anyway (too many screenshots, one screenshot over 256 KiB,
// an app/ tree past 993 entries or 16 MiB).
const CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Steps 1 and 2: a clean output directory holding the site and the shots.
mkdirSync(out, { recursive: true });
cpSync(join(here, 'app'), join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// Step 3: the dossier, written with the vendored library and the caps above.
const dossierPath = join(out, 'dossier.json');
writeFileSync(dossierPath, buildDossier(out, CAPS));

// Step 4: verify what was written before calling the hand-in done. The
// dossier is JSON whose schema field names its format; a hand-in whose
// summary cannot be read back, names another schema, or holds no
// screenshot is a failed hand-in, and this program says so out loud.
const written = JSON.parse(readFileSync(dossierPath, 'utf8'));
if (written.schema !== DOSSIER_SCHEMA) {
  throw new Error(`dossier schema mismatch: got ${written.schema}, want ${DOSSIER_SCHEMA}`);
}
const images = Array.isArray(written.images) ? written.images.length : 0;
if (images < 1) {
  throw new Error('dossier holds no screenshots: screenshots/ must carry 3 or 4 JPG or PNG views');
}
console.log(`DataNusa hand-in complete: dossier.json (${images} screenshots, schema ${written.schema})`);
