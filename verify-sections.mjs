import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('script.js',import.meta.url),'utf8');
const start=source.indexOf('  const stepsSection=');
const end=source.indexOf("  if ('IntersectionObserver' in window)",start);
assert(start>=0&&end>start);
for(const reduce of [false,true]){
 const classes=new Set();
 const section={classList:{add(...names){names.forEach(n=>classes.add(n));},toggle(name,value){value?classes.add(name):classes.delete(name);}}};
 let callback,observed;
 class Observer{constructor(fn,options){callback=fn;assert.equal(options.threshold,.18);}observe(node){observed=node;}}
 runInNewContext(source.slice(start,end),{document:{querySelector:()=>section},window:{IntersectionObserver:Observer},IntersectionObserver:Observer,matchMedia:()=>({matches:reduce})});
 if(reduce){assert.equal(classes.size,0);assert.equal(callback,undefined);continue;}
 assert(classes.has('has-step-motion'));assert.equal(observed,section);
 callback([{isIntersecting:true}]);assert(classes.has('steps-revealed'));assert(classes.has('steps-in-view'));
 callback([{isIntersecting:false}]);assert(classes.has('steps-revealed'));assert(!classes.has('steps-in-view'));
}
const html=readFileSync(new URL('index.html',import.meta.url),'utf8');
assert.equal((html.match(/class="audience-image/g)||[]).length,4);
assert(html.includes('assets/tqa-staff-cutout.png'));
assert(html.includes('assets/hero-reference-branded.svg'));
assert(html.includes('assets/interface-accounts-branded.svg'));
assert(html.includes('assets/interface-config-branded.svg'));
assert.equal((html.match(/id="facelive-mascot-shared"/g)||[]).length,1);
assert(!html.includes('data-art-preview'));
assert(!html.includes('Xem giao diện chi tiết'));
assert.equal((html.match(/class="audience-title"/g)||[]).length,4);
assert(html.includes('class="audience-heading"'));
assert.equal((html.match(/class="experience-layer layer-/g)||[]).length,3);
assert(html.includes('<span>ace<span>live</span></span>'));
assert(!html.includes('<span>Face<span>live</span></span>'));
console.log('PASS: step motion states, reduced-motion fallback, four audience images and inline icon titles, separate cutouts, three independent interface layers, corrected wordmark and removed zoom control.');
