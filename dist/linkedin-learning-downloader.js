"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var a=(e,t,o)=>new Promise((r,i)=>{var s=m=>{try{d(o.next(m))}catch(c){i(c)}},l=m=>{try{d(o.throw(m))}catch(c){i(c)}},d=m=>m.done?r(m.value):Promise.resolve(m.value).then(s,l);d((o=o.apply(e,t)).next())}),$=`
Welcome to the Linkedin learning videos downloade v1!`;var _readline = require('readline'); var _readline2 = _interopRequireDefault(_readline);var _chalk = require('chalk'); var _chalk2 = _interopRequireDefault(_chalk);var U=class{out(t){let o=this.messageToColoredString(t);console.log(o)}promptUserInput(t){return new Promise(o=>{let r=this.messageToColoredString(t),i=this.readlineInterface;i.question(r,s=>{o(s.trim()),i.close()})})}promtUserUntilValidInput(t,o,r){return a(this,null,function*(){let i;do i=yield this.promptUserInput(t),r&&this.out(r);while(!o(i));return i})}get readlineInterface(){return _readline2.default.createInterface({input:process.stdin,output:process.stdout})}messageToColoredString({text:t,type:o}){switch(o){case"success":return _chalk2.default.green.bold(t);case"info":return _chalk2.default.whiteBright(t);case"error":return _chalk2.default.red.bold(t);case"prompt":return _chalk2.default.cyan.bold(t);default:return t}}},n=new U;var _axios = require('axios'); var _axios2 = _interopRequireDefault(_axios);var A=class{constructor(){this.httpClient=_axios2.default}get(t,o,r){return this.httpClient.get(t,{params:o,headers:r})}downloadVideoFile(t){return this.httpClient.get(t,{responseType:"stream"})}},f=new A;function I(e,t,o){return a(this,null,function*(){var r;try{let{data:i}=yield f.get("https://www.linkedin.com/learning-api/videos",t,o),s={title:e.title,progressiveStreams:i.elements.map(l=>l.presentation.videoPlay.videoPlayMetadata.progressiveStreams).reduce((l,d)=>[...l,...d],[])};return s}catch(i){throw n.out({text:`Could not locate downloadable video with 
https://www.linkedin.com/learning-api/videos?parentSlug=${t.parentSlug}&q=slugs&slug=${t.slug}
Make sure the video is not behind a premium lock. Response status: ${(r=i.response)==null?void 0:r.status}`,type:"error"}),i}})}var D=class{getAuthHeaders(){return a(this,null,function*(){return this.authHeaders||(this.authHeaders=yield this.promptUserForTokens()),this.authHeaders})}promptUserForTokens(){return a(this,null,function*(){let t=yield n.promtUserUntilValidInput({text:"Please enter CSRF token:",type:"prompt"},Boolean),o=yield n.promtUserUntilValidInput({text:"Please enter the cookie:",type:"prompt"},Boolean);return{"csrf-token":t,cookie:o}})}},h=new D;function C(e){return a(this,null,function*(){let{parentSlug:t}=e,o="slugs",r=yield h.getAuthHeaders(),i=4e4,s=59,l=0,d,m=[];do{d=e.videos.slice(l,l+s),l+=s;let c=yield Promise.all(d.map(p=>a(this,null,function*(){return I(p,{parentSlug:t,q:o,slug:p.slug},r)})));d.length===s&&(yield new Promise(p=>{n.out({text:`
Sleeping for ${i/1e3} seconds to prevent 429 server error
`,type:"info"}),setTimeout(()=>p(!0),i)})),m.push(...c)}while(d.length);return m})}var _jsdom = require('jsdom');function k(e){return a(this,null,function*(){var l;let t;t=(l=e.match(/\/([^/]+)$/))==null?void 0:l[1];let{data:o}=yield f.get(e),{window:{document:r}}=new (0, _jsdom.JSDOM)(o),i=r.title,s=Array.from(r.querySelectorAll(".video__link")).map(d=>{var m,c,p,u;return{title:(c=(m=d.querySelector(".video__title"))==null?void 0:m.textContent)==null?void 0:c.trim(),slug:(u=(p=d.getAttribute("href"))==null?void 0:p.match(/\/([^/]+)\?/))==null?void 0:u[1].trim()}});return{listName:i,parentSlug:t,videos:s}})}var E=`
Please enter url to a linkedin course you would like to download?
i.e. https://www.linkedin.com/learning/critical-thinking-for-better-judgment-and-decision-making
`,L="Invalid course url entered, enter a valid one.";function T(e){return/^https?:\/\/(www\.)?linkedin\.com\/learning\/[a-z\-_\d]+$/.test(e)}function x(){return a(this,null,function*(){return n.promtUserUntilValidInput({text:E,type:"prompt"},e=>T(e),{text:L,type:"error"})})}var _fs = require('fs');function M(e){return a(this,null,function*(){let t="";do{let o=yield n.promptUserInput({text:`
Please enter the path to the download folder:
`,type:"prompt"});if(/^\..+$/.test(o)&&(o=`${e}/${/[\\/]/.test(o[1])?o.slice(2):o}`),!_fs.existsSync.call(void 0, o)){n.out({text:`
Error: folder does not exist!`,type:"error"});continue}t=o}while(!t);return t})}function y(e){return a(this,null,function*(){let t=e.reduce((r,i)=>[...r,i.progressiveStreams.map(({width:s})=>s)],[]),o=e[0].progressiveStreams.map(({width:r})=>r).filter(r=>t.every(i=>i.includes(r)));return Number.parseInt(yield n.promtUserUntilValidInput({text:`
Please, select desired video width: ${o.join(", ")}: `,type:"prompt"},r=>o.map(String).includes(r)))})}function R(e){return e.reduce((t,o,r)=>{let i=F(o.transcriptStartAt),s=r===e.length-1;if(s)i+=`
`;else{let d=F(e[r+1].transcriptStartAt);i+=` --> ${d}
`}let l=`${++r}
${i}${o.caption}

`;return t+l},"")}function F(e){let t=(e%1e3).toLocaleString("en-US",{minimumIntegerDigits:3,useGrouping:!1}),o=Math.trunc(e/1e3).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1}),r=Math.trunc(e/1e3/60).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1}),i=Math.trunc(e/1e3/60/60).toLocaleString("en-US",{minimumIntegerDigits:2,useGrouping:!1});return`${i}:${r}:${o},${t}`}function _(e){let{window:{document:t}}=new (0, _jsdom.JSDOM)(e),o=Array.from(t.querySelectorAll('code[style="display: none"]')).find(s=>{var l;return(l=s.textContent)==null?void 0:l.includes("transcriptStartAt")}),r=JSON.parse(o.textContent.replace(/&quot/g,'"')),{lines:i}=r.included.find(({lines:s})=>Boolean(s));return i||[]}function b(e){return a(this,null,function*(){let t=yield h.getAuthHeaders();return f.get(e,void 0,t).then(({data:o})=>_(o)).then(R)})}function w(e,t){return`${++e} ${K(t)}`}function K(e){return e.replace(/[/:*?"<>|~#%&+{}\-\\]/g,"")}function v(e,t){return/\/$/.test(e)?`${e}${t}`:`${e}/${t}`}function O(e,t,o){return a(this,null,function*(){let r=yield n.promtUserUntilValidInput({text:"Download subtitles? (y/n) ",type:"prompt"},i=>/^[yn]$/i.test(i));if(/^y$/i.test(r)){let i=0,s=e.videos.length;yield Promise.all(e.videos.map((c,p)=>a(this,[c,p],function*({title:l,slug:d},m){let u=`${w(m,l)}.srt`;try{let g=yield b(`${t}/${d}`);if(!g)throw"Could not find/parse subtitles";let q=v(o,u);yield _fs.promises.writeFile(q,g),++i,n.out({text:`File successfully downloaded: ${u}`,type:"success"}),n.out({text:`Subtitles downloaded: ${i} / ${s}`,type:"success"})}catch(g){n.out({text:`Could not get subtitles for ${u}: ${g.toString()}`,type:"error"})}}))),n.out({text:`
Finished downloading subtitles: ${i} / ${e.videos.length}.`,type:"success"})}})}function H(e,t,o){return a(this,null,function*(){let r=_fs.createWriteStream.call(void 0, t);n.out({text:`Downloading ${o} from 
${e}`,type:"info"});let{data:i}=yield f.downloadVideoFile(e);return new Promise((s,l)=>{i.pipe(r);let d=null;r.on("error",m=>{d=m,r.close(),l(m)}),r.on("close",()=>{d||s()})})})}function N(e,t,o){return a(this,null,function*(){let r=0,i=e.length,s=[];yield Promise.all(e.map((l,d)=>a(this,null,function*(){let m=l.progressiveStreams.find(({width:g})=>g===t),c=`${w(d,l.title)}.${m.mediaType.split("/")[1]}`,p=m==null?void 0:m.streamingLocations[0].url,u=v(o,c);try{yield H(p,u,c),++r,n.out({text:`File successfully downloaded: ${c}`,type:"success"}),n.out({text:`Downloads progress: ${r} / ${i}`,type:"info"})}catch(g){n.out({text:`Error saving video ${c}: ${g.toString()}`,type:"error"}),s.push(`${c}
${p}`)}}))),n.out({text:`
Finished downloading videos: ${r} / ${e.length}`,type:"success"}),s.length&&n.out({text:`
Unfortunately, ${s.length} videos could not be downloaded: ${s.join(`
`)}`,type:"error"})})}function P(e){return a(this,null,function*(){let t=yield x(),o=yield k(t);n.out({text:X(o.videos),type:"success"});let r=yield C(o),i=yield y(r);n.out({text:`Selected video width: ${i}`,type:"success"});let s=yield M(e);n.out({text:`Download path: ${s}`,type:"success"}),yield N(r,i,s),yield O(o,t,s)})}function X(e){return`
Found ${e.length} videos:

${e.map(({title:t},o)=>`${++o}. ${t}.`).join(`
`)}`}function V(){return a(this,null,function*(){n.out({text:$,type:"info"});let e=!1;do{yield P(__dirname);let t=yield n.promtUserUntilValidInput({text:"Download another course? (y/n) ",type:"prompt"},o=>/^[yn]$/i.test(o));e=/^n$/i.test(t)}while(!e);n.out({text:"Bye bye!",type:"info"}),process.exit()})}V();
