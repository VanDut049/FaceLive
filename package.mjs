import {readFileSync,writeFileSync} from 'node:fs';
const root = new URL('.',import.meta.url);
const read = file => readFileSync(new URL(file,root),'utf8');
let html=read('index.html');
let css=read('styles.css')+'\n'+read('refinements.css')+'\n'+read('cinematic.css')+'\n'+read('sections.css');
// These legacy photo classes no longer appear in the page; do not embed their unused raster payloads.
if(!/class="photo (?:portrait|seller|creator|business|agency|product)\b/.test(html)){
  css=css.replace(/url\('assets\/(?:versions-reference|audience-reference)\.png'\)/g,'none');
}
// Large base64 values in custom properties can exceed browser substitution limits.
// Keep image URLs direct; all newly added section photos use normal <img> elements.
css=css.replace(/url\('([^']+\.png)'\)/g,(_,file)=>`url('data:image/png;base64,${readFileSync(new URL(file,root)).toString('base64')}')`);
html=html.replace('<link rel="stylesheet" href="styles.css">',`<style>${css}</style>`)
  .replace('<link rel="stylesheet" href="refinements.css">','')
  .replace('<link rel="stylesheet" href="cinematic.css">','')
  .replace('<link rel="stylesheet" href="sections.css">','')
  .replace(/src="(assets\/[^"#]+\.(?:svg|png))"/g,(_,file)=>`src="data:${file.endsWith('.svg')?'image/svg+xml':'image/png'};base64,${readFileSync(new URL(file,root)).toString('base64')}"`)
  .replace('<script defer src="config.js"></script>',`<script>${read('config.js')}</script>`)
  .replace('<script defer src="script.js"></script>','')
  .replace('href="assets/favicon.svg"',`href="data:image/svg+xml,${encodeURIComponent(read('assets/favicon.svg'))}"`)
  .replace('</body>',`<script>${read('script.js')}</script></body>`);
writeFileSync(new URL('facelive-single-file.html',root),html);
console.log('Standalone HTML ready: includes CSS, JavaScript, SVG and supplied photo assets.');
