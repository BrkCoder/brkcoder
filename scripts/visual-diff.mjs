// Screenshots design/terminal-reference.html and the built page, then diffs them with pixelmatch.
// Usage: npm run build && npm run diff   (starts `astro preview` itself)
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const PORT = 4399;
const THRESHOLD = 0.5; // percent
const viewports = [
  { name: '1440', width: 1440, height: 900 },
  { name: '390', width: 390, height: 844 },
];
const font = (file) => readFileSync(`public/fonts/${file}`).toString('base64');
const fontCss = `
@font-face{font-family:'Inter';font-weight:100 900;src:url(data:font/woff2;base64,${font('inter-latin.woff2')}) format('woff2')}
@font-face{font-family:'JetBrains Mono';font-weight:100 800;src:url(data:font/woff2;base64,${font('jetbrains-mono-latin.woff2')}) format('woff2')}`;
const refHtml = readFileSync('design/terminal-reference.html', 'utf8');

mkdirSync('.visual', { recursive: true });
const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], { shell: true, stdio: 'ignore' });
const browser = await chromium.launch();
let failed = false;

try {
  for (let i = 0; i < 50; i++) {
    try { if ((await fetch(`http://localhost:${PORT}/`)).ok) break; } catch {}
    await new Promise((r) => setTimeout(r, 200));
  }
  for (const vp of viewports) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      reducedMotion: 'reduce',
    });
    const shot = async (setup) => {
      const page = await ctx.newPage();
      await setup(page);
      await page.evaluate(() => document.fonts.ready);
      // freeze the blinking cursor in its visible state
      await page.addStyleTag({ content: '*{animation:none!important}' });
      const buf = await page.screenshot({ fullPage: true });
      await page.close();
      return PNG.sync.read(buf);
    };
    const ref = await shot(async (page) => {
      await page.route('https://fonts.googleapis.com/**', (r) => r.fulfill({ contentType: 'text/css', body: fontCss }));
      await page.route('https://ref.test/', (r) => r.fulfill({ contentType: 'text/html', body: refHtml }));
      await page.goto('https://ref.test/');
    });
    const built = await shot((page) => page.goto(`http://localhost:${PORT}/`));
    await ctx.close();

    // Sticky nav is an intentional difference, but at scroll 0 it renders identically.
    const w = ref.width;
    const h = Math.max(ref.height, built.height);
    const pad = (img) => {
      const out = new PNG({ width: w, height: h });
      PNG.bitblt(img, out, 0, 0, Math.min(img.width, w), img.height, 0, 0);
      return out;
    };
    const a = pad(ref), b = pad(built), diff = new PNG({ width: w, height: h });
    const n = pixelmatch(a.data, b.data, diff.data, w, h, { threshold: 0.1 });
    const pct = (n / (w * h)) * 100;
    writeFileSync(`.visual/${vp.name}-ref.png`, PNG.sync.write(ref));
    writeFileSync(`.visual/${vp.name}-built.png`, PNG.sync.write(built));
    writeFileSync(`.visual/${vp.name}-diff.png`, PNG.sync.write(diff));
    const ok = pct < THRESHOLD;
    failed ||= !ok;
    console.log(`${vp.name}px  ref ${ref.width}x${ref.height}  built ${built.width}x${built.height}  diff ${pct.toFixed(3)}%  ${ok ? 'PASS' : 'FAIL'}`);
  }
} finally {
  await browser.close();
  server.kill();
  spawn('taskkill', ['/pid', String(server.pid), '/T', '/F'], { shell: true, stdio: 'ignore' });
}
process.exit(failed ? 1 : 0);
