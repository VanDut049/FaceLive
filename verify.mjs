import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import vm from 'node:vm';
const root=new URL('.',import.meta.url);
const html=readFileSync(new URL('index.html',root),'utf8');
const css=readFileSync(new URL('styles.css',root),'utf8')+readFileSync(new URL('refinements.css',root),'utf8')+readFileSync(new URL('cinematic.css',root),'utf8')+readFileSync(new URL('sections.css',root),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
assert.equal(ids.length,new Set(ids).size,'HTML IDs must be unique');
for(const [,id] of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(id),`Missing anchor ${id}`);
for(const [,id] of html.matchAll(/url\(#([^\)]+)\)/g))assert(ids.includes(id),`Missing SVG definition ${id}`);
for(const [,file] of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  if(file.startsWith('https:')||file.startsWith('data:'))continue;
  assert(existsSync(new URL(file,root)),`Missing resource ${file}`);
}
for(const [,file] of css.matchAll(/url\('([^']+)'\)/g)){
  if(file.startsWith('https:'))continue;
  assert(existsSync(new URL(file,root)),`Missing CSS asset ${file}`);
}
for(const file of ['script.js','config.js'])new vm.Script(readFileSync(new URL(file,root),'utf8'),{filename:file});
assert.equal((html.match(/<h1>/g)||[]).length,1);
assert.equal((html.match(/<details>/g)||[]).length,6);
assert(css.includes('prefers-reduced-motion'));
assert(html.includes('lang="vi"'));
assert.equal((html.match(/class="audience-image/g)||[]).length,4,'Audience section must have four actual images');
assert(html.includes('hero-person'),'Hero cutout must be separate from interface');
const standalone=readFileSync(new URL('facelive-single-file.html',root),'utf8');
assert(!standalone.includes('src="script.js"'));
assert(!standalone.includes('href="styles.css"'));
assert(!standalone.includes("url('assets/"));
assert(!standalone.includes('src="assets/'));
for(const file of ['hero-scene.svg','v1-workspace.svg','v2-workspace.svg','experience-scene.svg']){
  const svg=readFileSync(new URL('assets/'+file,root),'utf8');
  assert(!/href="(?!data:|#)[^"]+\.png"/.test(svg),`SVG must embed its raster: ${file}`);
}
for(const file of ['','styles.css','script.js','config.js','assets/favicon.svg','assets/versions-reference.png','assets/audience-reference.png','assets/testimonials-reference.png','cinematic.css','assets/hero-scene.svg','assets/v1-workspace.svg','assets/v2-workspace.svg','assets/experience-scene.svg']){
  const res=await fetch('http://127.0.0.1:4173/'+file);
  assert.equal(res.status,200,`HTTP ${file}`);
}
console.log('PASS: unique IDs, SVG references, anchor links, local assets, JS syntax, Vietnamese metadata, FAQ structure, reduced-motion rules, self-contained SVGs, embedded standalone assets, 13 HTTP resources.');
console.log('Browser visual QA: not performed; no browser is available in the tool environment.');
