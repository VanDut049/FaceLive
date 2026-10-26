// Exercise actual initialization and event handlers without a browser dependency.
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
import assert from 'node:assert/strict';
const source=readFileSync(new URL('script.js',import.meta.url),'utf8');
const handlers=node=>{node.events={};node.addEventListener=(name,fn)=>node.events[name]=fn;return node;};
const document={activeElement:null};
const panels=['1','2'].map(side=>{
  const body={inert:false,attrs:{},setAttribute(k,v){this.attrs[k]=v;}};
  const rail=handlers({attrs:{},setAttribute(k,v){this.attrs[k]=v;},focus(){document.activeElement=this;}});
  return handlers({dataset:{side},body,rail,querySelector(s){return s==='.duel-body'?body:rail;}});
});
const duel=handlers({dataset:{},querySelectorAll:()=>panels,querySelector:s=>panels[s.includes('"1"')?0:1].rail,contains:e=>panels.some(p=>p.rail===e),matches:()=>false});
document.querySelector=()=>duel;
const touch=handlers({matches:false}),hover={matches:true};
runInNewContext(source.slice(source.indexOf('  const duel ='),source.indexOf('  let lastFocus;')),{
  document,matchMedia:q=>q.includes('max-width')?touch:hover,requestAnimationFrame:fn=>fn()
});
assert.equal(duel.dataset.active,'none');
panels[0].events.pointerenter();
assert.equal(duel.dataset.active,'1');assert.equal(panels[1].body.inert,true);assert.equal(panels[0].rail.attrs['aria-expanded'],'true');
panels[1].events.pointerenter();
assert.equal(duel.dataset.active,'2');assert.equal(panels[0].body.inert,true);assert.equal(panels[1].body.inert,false);
duel.events.pointerleave();assert.equal(duel.dataset.active,'none');assert(panels.every(p=>p.body.inert===false));
panels[1].rail.events.click();assert.equal(duel.dataset.active,'2');
duel.events.keydown({key:'ArrowLeft',preventDefault(){}});assert.equal(duel.dataset.active,'1');assert.equal(document.activeElement,panels[0].rail);
duel.events.keydown({key:'Escape'});assert.equal(duel.dataset.active,'none');
touch.matches=true;touch.events.change();assert.equal(duel.dataset.active,'1');
panels[1].events.pointerenter();assert.equal(duel.dataset.active,'1');
panels[1].rail.events.click();assert.equal(duel.dataset.active,'2');
duel.events.pointerleave();assert.equal(duel.dataset.active,'2');
console.log('PASS: desktop hover V1/V2, reset on leave, collapsed content inert, ARIA state, rail click, arrow keys, Escape, mobile default and tap switching.');
