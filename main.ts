// DataNusa — Indonesia in Numbers: the hand-in program (Node 22, standard
// library only). The site itself is the static app/ folder beside this file;
// this program copies app/ and screenshots/ into the output directory and
// writes dossier.json there with the vendored make.fun library, byte for
// byte as the scorer's own copy writes it. vendor/makefun-frontend.ts is
// copied from the competition kit unchanged — do not edit it.
//
// Local run:  mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
// In the grader's container /output is used when MAKEFUN_OUTPUT_DIR is unset.

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const rootDir = fileURLToPath(new URL('.', import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outputDir, { recursive: true });
cpSync(join(rootDir, 'app'), join(outputDir, 'app'), { recursive: true });

const shotsDir = join(outputDir, 'screenshots');
mkdirSync(shotsDir, { recursive: true });
const localShots = join(rootDir, 'screenshots');
if (existsSync(localShots)) {
  cpSync(localShots, shotsDir, { recursive: true });
}

// Caps mirror the gate: at most 4 screenshots of 256 KiB each, at most 993
// app files / 16 MiB, and the dossier text capped at 163,840 bytes.
const dossier = buildDossier(outputDir, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(outputDir, 'dossier.json'), dossier);
