import {readFileSync,writeFileSync} from 'node:fs';
const asset=file=>new URL('assets/'+file,import.meta.url);
const meta=JSON.parse(readFileSync(asset('mascot-master.json'),'utf8').replace(/^\uFEFF/,''));
const mascotUrl='data:image/png;base64,'+readFileSync(asset('mascot-master.png')).toString('base64');
const mascotImage=`<image href="${mascotUrl}" width="${meta.width}" height="${meta.height}"/>`;
const viewBox=meta.viewBox.join(' ');
export const markHtml='<svg class="brand-mark" viewBox="0 0 100 115" aria-hidden="true"><use href="#facelive-mascot-shared" width="100" height="115"/></svg>';
export const brandDefsHtml=`<svg class="brand-defs" xmlns="http://www.w3.org/2000/svg" width="0" height="0" aria-hidden="true" style="position:absolute;overflow:hidden;pointer-events:none"><defs><symbol id="facelive-mascot-shared" viewBox="${viewBox}">${mascotImage}</symbol></defs></svg>`;
export const standaloneMascot=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="100" height="115">${mascotImage}</svg>`;
export const uiBrand=(x,y,scale=1)=>`<g transform="translate(${x} ${y}) scale(${scale})"><svg x="0" y="0" width="37" height="43" viewBox="${viewBox}">${mascotImage}</svg><text x="37" y="31" font-family="Segoe UI, sans-serif" font-size="28" font-weight="700" letter-spacing="-1" fill="#232635">ace<tspan fill="#5B38DB">live</tspan></text></g>`;
// Standalone horizontal logo lockup (mascot + wordmark) in brand violet #5B38DB.
export const logoSvg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 372 122" width="372" height="122" role="img" aria-label="Facelive"><title>Facelive</title><svg x="2" y="7" width="96" height="110" viewBox="${viewBox}">${mascotImage}</svg><text x="92" y="80" font-family="'Be Vietnam Pro','Segoe UI',sans-serif" font-size="76" font-weight="800" letter-spacing="-3.5" fill="#0b123e">ace<tspan fill="#5B38DB">live</tspan></text></svg>`;
function rebrandRaster(source,output,w,h,cover,placement){
 const png='data:image/png;base64,'+readFileSync(asset(source)).toString('base64');
 const [x,y,cw,ch,fill]=cover;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}"><image href="${png}" width="${w}" height="${h}"/><rect x="${x}" y="${y}" width="${cw}" height="${ch}" rx="5" fill="${fill}"/>${uiBrand(...placement)}</svg>`;
 writeFileSync(asset(output),svg);
}
export function writeBrandedAssets(){
 writeFileSync(asset('mascot.svg'),standaloneMascot);
 writeFileSync(asset('favicon.svg'),standaloneMascot);
 writeFileSync(asset('logo.svg'),logoSvg);
 rebrandRaster('hero-reference-cutout.png','hero-reference-branded.svg',1536,1024,[157,132,225,76,'#fbfcff'],[170,140,1.12]);
 rebrandRaster('interface-accounts.png','interface-accounts-branded.svg',1536,1024,[81,161,240,76,'#fbfcff'],[96,170,1.2]);
 rebrandRaster('interface-config.png','interface-config-branded.svg',1536,1024,[201,73,279,88,'#fafcff'],[222,88,1.35]);
}
