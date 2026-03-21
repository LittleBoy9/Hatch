"use strict";(()=>{var It=Object.create;var B=Object.defineProperty;var Rt=Object.getOwnPropertyDescriptor;var Lt=Object.getOwnPropertyNames;var Mt=Object.getPrototypeOf,Bt=Object.prototype.hasOwnProperty;var $t=(e,t)=>()=>(e&&(t=e(e=0)),t);var Pt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ht=(e,t)=>{for(var o in t)B(e,o,{get:t[o],enumerable:!0})},Nt=(e,t,o,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of Lt(t))!Bt.call(e,a)&&a!==o&&B(e,a,{get:()=>t[a],enumerable:!(n=Rt(t,a))||n.enumerable});return e};var Ot=(e,t,o)=>(o=e!=null?It(Mt(e)):{},Nt(t||!e||!e.__esModule?B(o,"default",{value:e,enumerable:!0}):o,e));var D={};Ht(D,{getTabCommands:()=>$,sendMessage:()=>r,staticTabCommands:()=>P});function r(e){return new Promise(t=>{chrome.runtime.sendMessage(e,o=>t(o))})}function Gt(e){if(e.favIconUrl&&e.favIconUrl.startsWith("http"))return e.favIconUrl;try{return`https://www.google.com/s2/favicons?domain=${new URL(e.url).hostname}&sz=32`}catch{return""}}function Ut(e){try{let t=new URL(e),o=t.pathname==="/"?"":t.pathname,n=t.hostname+o;return n.length>60?n.slice(0,57)+"...":n}catch{return e.slice(0,60)}}async function $(){let e=await r({type:"GET_ALL_TABS"});return e?e.map(t=>({id:`switch-tab-${t.id}`,name:t.title||"Untitled",description:Ut(t.url),keywords:[t.title,t.url].filter(Boolean),icon:Gt(t),category:"tab",prefix:"@",action:o=>{o.metaKey?r({type:"DUPLICATE_TAB",tabId:t.id}):r({type:"SWITCH_TAB",tabId:t.id,windowId:t.windowId}),o.close()}})):[]}var P,x=$t(()=>{"use strict";P=[{id:"new-tab",name:"New Tab",description:"Open a new blank tab",keywords:["new","tab","create","open"],icon:"\u2795",category:"tab",action:e=>{r({type:"CREATE_TAB"}),e.close()}},{id:"close-tab",name:"Close Current Tab",description:"Close the active tab",keywords:["close","tab","remove","kill"],icon:"\u2715",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"CLOSE_TAB",tabId:t.id}),e.close()}},{id:"duplicate-tab",name:"Duplicate Tab",description:"Duplicate the current tab",keywords:["duplicate","clone","copy","tab"],icon:"\u29C9",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"DUPLICATE_TAB",tabId:t.id}),e.close()}},{id:"pin-tab",name:"Pin / Unpin Tab",description:"Toggle pin on the current tab",keywords:["pin","unpin","tab","lock"],icon:"\u{1F4CC}",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"PIN_TAB",tabId:t.id,pinned:!t.pinned}),e.close()}},{id:"mute-tab",name:"Mute / Unmute Tab",description:"Toggle mute on the current tab",keywords:["mute","unmute","sound","audio","silence","tab"],icon:"\u{1F507}",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});if(t?.id&&t.id!==-1){let o=t.mutedInfo?.muted??!1;r({type:"MUTE_TAB",tabId:t.id,muted:!o})}e.close()}},{id:"move-tab-start",name:"Move Tab to Start",description:"Move current tab to the beginning",keywords:["move","tab","start","first","beginning","left"],icon:"\u21E4",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"MOVE_TAB",tabId:t.id,index:0}),e.close()}},{id:"move-tab-end",name:"Move Tab to End",description:"Move current tab to the end",keywords:["move","tab","end","last","right"],icon:"\u21E5",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"MOVE_TAB",tabId:t.id,index:-1}),e.close()}},{id:"move-tab-new-window",name:"Move Tab to New Window",description:"Detach current tab into its own window",keywords:["move","tab","window","detach","separate"],icon:"\u2197",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"MOVE_TAB_TO_WINDOW",tabId:t.id}),e.close()}},{id:"close-other-tabs",name:"Close Other Tabs",description:"Close all tabs except the current one (keeps pinned)",keywords:["close","other","tabs","all","clean"],icon:"\u{1F9F9}",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"CLOSE_OTHER_TABS",tabId:t.id}),e.close()}},{id:"close-tabs-right",name:"Close Tabs to the Right",description:"Close all tabs after the current one (keeps pinned)",keywords:["close","tabs","right","after"],icon:"\u27F9",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"CLOSE_TABS_RIGHT",tabId:t.id,index:t.index}),e.close()}},{id:"close-duplicate-tabs",name:"Close Duplicate Tabs",description:"Close tabs with the same URL (keeps one of each)",keywords:["close","duplicate","tabs","dedupe","clean"],icon:"\u267B",category:"tab",action:e=>{r({type:"CLOSE_DUPLICATE_TABS"}),e.close()}}]});var Tt=Pt(G=>{"use strict";var E=kt;(function(e,t){let o=kt,n=e();for(;;)try{if(parseInt(o(238))/1*(-parseInt(o(230))/2)+parseInt(o(263))/3+-parseInt(o(242))/4*(-parseInt(o(241))/5)+parseInt(o(209))/6+parseInt(o(186))/7+parseInt(o(190))/8*(-parseInt(o(182))/9)+-parseInt(o(222))/10===t)break;n.push(n.shift())}catch{n.push(n.shift())}})(I,699015);Object[E(208)](G,E(200),{value:!0}),G[E(237)]=te;function vt(e,t,o){let n=E,a={ULjMY:function(m,d){return m===d},tPFvU:"string",dpNEz:function(m,d){return m(d)},JAnPP:function(m,d,y,C){return m(d,y,C)},zQNqE:function(m,d){return m===d},glkMh:function(m,d){return m-d},vhxcg:function(m,d){return m/d},HoAJF:function(m,d){return m/d},tqfcr:function(m,d){return m+d},joWlF:function(m,d){return m+d},RyDcy:function(m,d){return m*d},jxOwK:function(m,d){return m*d},WaEek:function(m,d){return m<d},lLdXU:"pEztz",NBWRI:n(217),VKceq:function(m,d){return m===d},KdFWD:function(m,d){return m===d},fBqnS:n(231),BuIaj:function(m,d){return m/d},VzIBk:function(m,d){return m+d},LhfUv:function(m,d){return m*d},wXGvJ:function(m,d){return m/d},JxEGp:function(m,d){return m*d}},s=o?e:e[n(236)](),c=o?t:t.toLowerCase();if(a.ULjMY(s[n(192)],0)||a[n(264)](c[n(192)],0))return{score:0,matches:[]};if(a[n(177)](s,c))return{score:1,matches:Array[n(249)]({length:c[n(192)]},(m,d)=>d)};if(c[n(178)](s)){let m=c[n(255)](s),d=a.glkMh(1,a[n(232)](m,c.length)),y=a[n(223)](s[n(192)],c[n(192)]),C=a[n(233)](a.joWlF(.8,a[n(187)](.1,d)),a[n(256)](.1,y)),k=Array[n(249)]({length:s.length},(T,v)=>m+v);return{score:C,matches:k}}let h=0,u=0,f=0,g=-1,p=[];for(let m=0;a[n(203)](m,c[n(192)])&&a.WaEek(h,s.length);m++)if(a.ULjMY(c[m],s[h]))if(a[n(219)]===a[n(219)]){let d=a[n(240)][n(210)]("|"),y=0;for(;;){switch(d[y++]){case"0":a.VKceq(g,-1)&&(g=m);continue;case"1":f++;continue;case"2":u+=a[n(256)](f,f);continue;case"3":h++;continue;case"4":p[n(221)](m);continue}break}}else return{score:1,matches:_0x4c2ae4[n(249)]({length:_0x465fbf[n(192)]},(d,y)=>y)};else if(a[n(196)](n(260),a[n(254)])){let d=a[n(264)](typeof _0x36265d,a[n(248)])?_0x54584d:a[n(215)](_0x5f5315,_0x10eb5d),y=a[n(216)](_0x46a5c5,_0x16e2e0,d,_0x1322b4);_0x2adcc8=y.score,_0x916600=y.matches}else f=0;if(a.WaEek(h,s.length))return{score:0,matches:[]};let b=s.length*s[n(192)],w=u/b,l=a.glkMh(1,a[n(252)](g,c[n(192)]));w=a[n(180)](a[n(256)](w,.7),a[n(218)](l,.15));let i=a[n(224)](s.length,c[n(192)]);return w+=a[n(225)](i,.15),{score:Math[n(211)](w,.79),matches:p}}function Zt(e){let t=E,o={ewjgb:function(a,s){return a+s},eRwsm:function(a,s){return a*s},JNabM:function(a,s){return a-s},CcsMi:function(a,s){return a/s}},n=Math[t(228)](1,Math[t(211)](10,e));return o[t(246)](.05,o[t(247)](o[t(189)](n,1),o[t(199)](.69,9)))}function te(e,t){let o=E,n={OCNGH:o(205),FAlFV:function(l,i,m,d){return l(i,m,d)},VnhzW:function(l,i){return l>i},GPNkv:function(l,i){return l-i},ygePP:function(l,i){return l/i},FwZgB:function(l,i){return l+i},dLLhV:function(l,i){return l+i},WfNHg:function(l,i){return l*i},FOhRW:function(l,i){return l===i},ngSkN:function(l,i){return l===i},OXIkU:o(191),KDZvF:o(261),ieDQu:"LicuP",WhMvg:o(258),lKQEM:o(212),WvaSz:function(l,i){return l>i},stkDt:o(245),aPDgo:"bcDpa",OVjHH:function(l,i){return l(i)},EpeDW:function(l,i){return l>i},samQR:o(193),MvRQj:o(214),wtmhE:function(l,i){return l===i},ijehV:function(l,i){return l!==i},ILhdN:function(l,i){return l===i},KsrfU:function(l,i){return l!==i},bIHXv:function(l,i){return l!==i},gKvwi:function(l,i){return l!==i},CPaMk:function(l,i){return l===i}};var a,s,c;let h=(a=n[o(227)](t,null)||n[o(197)](t,void 0)?void 0:t[o(253)])!==null&&a!==void 0?a:5,u=n.ijehV(s=n.ngSkN(t,null)||n.ILhdN(t,void 0)?void 0:t[o(239)],null)&&n.KsrfU(s,void 0)?s:!1,f=n[o(244)](c=n[o(227)](t,null)||t===void 0?void 0:t[o(188)],null)&&n[o(185)](c,void 0)?c:0,g=n.OVjHH(Zt,h),p=!(n[o(183)](t,null)||t===void 0)&&t[o(251)]?Array.isArray(t[o(251)])?t.key:[t[o(251)]]:null;function b(l){let i=o,m={PBhfx:function(d,y){return d===y},KozNo:"2|0|3|1|4",kbrKR:function(d,y){return n.FOhRW(d,y)},sCgvb:function(d,y){return d*y}};if(n.ngSkN(n.OXIkU,n[i(262)])){let d=_0x49bf17[_0x5a8313];if(typeof d===n.OCNGH){let y=n[i(213)](_0x44d0a2,_0x395a26,d,_0x44114f);n[i(179)](y[i(234)],_0x5bcc4b)&&(_0x31ed23=y[i(234)],_0x4978c7=y.matches)}}else{if(!l||n[i(197)](l.trim().length,0))return[];let d=[];for(let y of e)if(n.FOhRW(n.ieDQu,"pVbUC")){let C=_0x24e9b0[i(255)](_0x2ed60a),k=n[i(229)](1,n.ygePP(C,_0x5b4224[i(192)])),T=n[i(181)](_0x4a6fb8[i(192)],_0x59c99b[i(192)]),v=n.FwZgB(n[i(206)](.8,n.WfNHg(.1,k)),.1*T),S=_0x7a10a5[i(249)]({length:_0x5e1148.length},(U,M)=>C+M);return{score:v,matches:S}}else{let C=0,k=[];if(p)for(let T of p){let v=y[T];if(typeof v===n.OCNGH)if(n[i(197)](n[i(243)],n.lKQEM))_0x33c4cc=0;else{let S=n.FAlFV(vt,l,v,u);if(n.WvaSz(S[i(234)],C))if(n[i(257)]!==n.aPDgo)C=S[i(234)],k=S[i(198)];else if(m[i(201)](_0x4e284f[_0x1482bc],_0x2745bf[_0x986de5])){let U=m[i(194)].split("|"),M=0;for(;;){switch(U[M++]){case"0":_0x5b58bc++;continue;case"1":_0x4586ee[i(221)](_0x574df8);continue;case"2":m[i(259)](_0xfc7c32,-1)&&(_0x471884=_0x4e7633);continue;case"3":_0x584e6a+=m[i(184)](_0x181650,_0x35f24c);continue;case"4":_0x57719f++;continue}break}}else _0x1bcbc6=0}}else{let T=typeof y===n[i(250)]?y:n[i(202)](String,y),v=n[i(213)](vt,l,T,u);C=v[i(234)],k=v.matches}C>=g&&d[i(221)]({item:y,score:C,matches:k})}return d[i(207)]((y,C)=>C[i(234)]-y[i(234)]),n[i(226)](f,0)?n[i(220)]!==n.MvRQj?d.slice(0,f):_0x5e751e[i(195)](0,_0x488812):d}}let w=l=>{let i=o;return b(l).map(m=>m[i(204)])};return w[o(235)]=l=>n[o(202)](b,l),w}function kt(e,t){return e=e-177,I()[e]}function I(){let e=["bIHXv","jOwfX","ewjgb","eRwsm","tPFvU","from","OCNGH","key","BuIaj","threshold","fBqnS","indexOf","jxOwK","stkDt","BBmpj","kbrKR","YAyVZ","cQLzV","KDZvF","3951930RWBuGR","ULjMY","zQNqE","includes","VnhzW","VzIBk","ygePP","6426999nBKXHv","CPaMk","sCgvb","gKvwi","4273801cXObMr","RyDcy","maxResults","JNabM","8pywgLO","jkpGT","length","fStBN","KozNo","slice","KdFWD","ngSkN","matches","CcsMi","__esModule","PBhfx","OVjHH","WaEek","item","string","dLLhV","sort","defineProperty","1051092GLggxZ","split","min","lhfIm","FAlFV","BmevM","dpNEz","JAnPP","0|1|2|4|3","LhfUv","lLdXU","samQR","push","7685350TXzNXU","HoAJF","wXGvJ","JxEGp","EpeDW","wtmhE","max","GPNkv","7946FrirtZ","OKIwH","vhxcg","tqfcr","score","search","toLowerCase","createFuzzySearch","54TPVJTI","caseSensitive","NBWRI","730ftRsGz","8032TdKSYJ","WhMvg"];return I=function(){return e},I()}});x();x();function z(e){return{id:"search-google",name:`Search Google for "${e}"`,description:"Press Enter to search",icon:"\u{1F50D}",category:"search",action:t=>{let o=`https://www.google.com/search?q=${encodeURIComponent(e)}`;t.metaKey?r({type:"CREATE_TAB",url:o}):window.location.href=o,t.close()}}}function F(e){let t=e;if(/^[\w-]+(\.[\w-]+)+/.test(e)&&!e.includes(" "))t=e.startsWith("http")?e:`https://${e}`;else if(e.startsWith("http://")||e.startsWith("https://"))t=e;else return null;try{new URL(t)}catch{return null}return{id:"go-to-url",name:`Go to ${e}`,description:t,icon:"\u{1F310}",category:"navigation",action:o=>{o.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,o.close()}}}var j=[{id:"reload-page",name:"Reload Page",description:"Reload the current page",keywords:["reload","refresh","page"],icon:"\u21BB",category:"navigation",action:e=>{location.reload(),e.close()}},{id:"go-back",name:"Go Back",description:"Navigate back in history",keywords:["back","previous","history"],icon:"\u2190",category:"navigation",action:e=>{history.back(),e.close()}},{id:"go-forward",name:"Go Forward",description:"Navigate forward in history",keywords:["forward","next","history"],icon:"\u2192",category:"navigation",action:e=>{history.forward(),e.close()}},{id:"scroll-top",name:"Scroll to Top",description:"Jump to the top of the page",keywords:["scroll","top","up","beginning"],icon:"\u2B06",category:"navigation",action:e=>{window.scrollTo({top:0,behavior:"smooth"}),e.close()}},{id:"scroll-bottom",name:"Scroll to Bottom",description:"Jump to the bottom of the page",keywords:["scroll","bottom","down","end"],icon:"\u2B07",category:"navigation",action:e=>{window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),e.close()}},{id:"copy-url",name:"Copy Current URL",description:"Copy the page URL to clipboard",keywords:["copy","url","link","clipboard"],icon:"\u{1F4CB}",category:"navigation",action:async e=>{await navigator.clipboard.writeText(window.location.href),e.close()}}];x();function K(e){try{let t=new URL(e),o=t.pathname==="/"?"":t.pathname,n=t.hostname+o;return n.length>55?n.slice(0,52)+"...":n}catch{return e.slice(0,55)}}function Dt(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}async function W(){let e=await r({type:"GET_ALL_BOOKMARKS"});return!e||!e.length?[]:e.map(t=>{let o=t.folderPath?`${t.folderPath} \xB7 ${K(t.url)}`:K(t.url);return{id:`bookmark-${t.id}`,name:t.title||"Untitled",description:o,keywords:[t.title,t.url,t.folderPath].filter(Boolean),icon:Dt(t.url),category:"bookmark",prefix:"#",action:n=>{n.metaKey?r({type:"CREATE_TAB",url:t.url}):window.location.href=t.url,n.close()}}})}x();function zt(e){let t=Math.floor((Date.now()-e)/1e3);if(t<60)return"just now";let o=Math.floor(t/60);if(o<60)return`${o}m ago`;let n=Math.floor(o/60);if(n<24)return`${n}h ago`;let a=Math.floor(n/24);return a===1?"yesterday":a<7?`${a}d ago`:`${Math.floor(a/7)}w ago`}function Ft(e){try{let t=new URL(e),o=t.pathname==="/"?"":t.pathname,n=t.hostname+o;return n.length>50?n.slice(0,47)+"...":n}catch{return e.slice(0,50)}}function jt(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}async function q(){let e=await r({type:"SEARCH_HISTORY",query:"",maxResults:50});return!e||!e.length?[]:e.map(t=>{let o=zt(t.lastVisitTime),n=t.visitCount>1?` \xB7 ${t.visitCount} visits`:"";return{id:`history-${t.id}`,name:t.title||"Untitled",description:`${o}${n} \xB7 ${Ft(t.url)}`,keywords:[t.title,t.url].filter(Boolean),icon:jt(t.url),category:"history",prefix:"/",action:a=>{a.metaKey?r({type:"CREATE_TAB",url:t.url}):window.location.href=t.url,a.close()}}})}x();function Kt(e){let t=Math.floor((Date.now()-e)/1e3);if(t<60)return"just now";let o=Math.floor(t/60);if(o<60)return`${o}m ago`;let n=Math.floor(o/60);if(n<24)return`${n}h ago`;let a=Math.floor(n/24);return a===1?"yesterday":`${a}d ago`}function Wt(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}async function V(){let e=await r({type:"GET_RECENTLY_CLOSED",maxResults:25});return!e||!e.length?[]:e.map(t=>({id:`restore-${t.sessionId}`,name:t.title||"Untitled",description:`Closed ${Kt(t.closedAt)}`,keywords:[t.title,t.url].filter(Boolean),icon:t.favIconUrl||Wt(t.url),category:"session",action:o=>{r({type:"RESTORE_SESSION",sessionId:t.sessionId}),o.close()}}))}x();var qt={grey:"\u26AA",blue:"\u{1F535}",red:"\u{1F534}",yellow:"\u{1F7E1}",green:"\u{1F7E2}",pink:"\u{1F7E3}",purple:"\u{1F7E3}",cyan:"\u{1F535}",orange:"\u{1F7E0}"},X=["grey","blue","red","yellow","green","pink","purple","cyan","orange"];async function J(){let e=await r({type:"GET_TAB_GROUPS"});if(!e||!e.length)return[];let t=[];for(let o of e){let n=qt[o.color]||"\u26AA",a=o.title||"Unnamed Group";t.push({id:`group-toggle-${o.id}`,name:`${o.collapsed?"Expand":"Collapse"} Group: ${a}`,description:`${n} ${o.color} group`,keywords:["group","tab","collapse","expand",a,o.color],icon:n,category:"tab",action:s=>{r({type:"TOGGLE_GROUP_COLLAPSE",groupId:o.id,collapsed:!o.collapsed}),s.close()}}),t.push({id:`group-add-${o.id}`,name:`Add Tab to Group: ${a}`,description:`${n} Move current tab into this group`,keywords:["add","tab","group",a],icon:"\u2795",category:"tab",action:async s=>{let c=await r({type:"GET_CURRENT_TAB"});c?.id&&c.id!==-1&&r({type:"ADD_TAB_TO_GROUP",tabId:c.id,groupId:o.id}),s.close()}}),t.push({id:`group-ungroup-${o.id}`,name:`Ungroup: ${a}`,description:`${n} Dissolve this tab group`,keywords:["ungroup","dissolve","remove","group",a],icon:"\u{1F513}",category:"tab",action:s=>{r({type:"UNGROUP",groupId:o.id}),s.close()}})}return t}var Y=[{id:"create-tab-group",name:"Create Tab Group",description:"Group the current tab into a new group",keywords:["create","new","tab","group"],icon:"\u{1F4C1}",category:"tab",action:e=>{let t=e.query.replace(/^>\s*create\s*tab\s*group\s*/i,"").trim()||"New Group",o=X[Math.floor(Math.random()*X.length)];r({type:"CREATE_TAB_GROUP",title:t,color:o}),e.close()}},{id:"remove-tab-from-group",name:"Remove Tab from Group",description:"Ungroup the current tab",keywords:["remove","ungroup","tab","detach"],icon:"\u21A9",category:"tab",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&r({type:"REMOVE_TAB_FROM_GROUP",tabId:t.id}),e.close()}}];x();var Q=[{keyword:"g",name:"Google",urlTemplate:"https://www.google.com/search?q=%s",icon:"\u{1F50D}"},{keyword:"yt",name:"YouTube",urlTemplate:"https://www.youtube.com/results?search_query=%s",icon:"\u25B6"},{keyword:"gh",name:"GitHub",urlTemplate:"https://github.com/search?q=%s",icon:"\u{1F419}"},{keyword:"npm",name:"NPM",urlTemplate:"https://www.npmjs.com/search?q=%s",icon:"\u{1F4E6}"},{keyword:"mdn",name:"MDN Web Docs",urlTemplate:"https://developer.mozilla.org/en-US/search?q=%s",icon:"\u{1F4D8}"},{keyword:"so",name:"Stack Overflow",urlTemplate:"https://stackoverflow.com/search?q=%s",icon:"\u{1F4DA}"},{keyword:"w",name:"Wikipedia",urlTemplate:"https://en.wikipedia.org/w/index.php?search=%s",icon:"\u{1F310}"},{keyword:"r",name:"Reddit",urlTemplate:"https://www.reddit.com/search/?q=%s",icon:"\u{1F4AC}"},{keyword:"tw",name:"X (Twitter)",urlTemplate:"https://x.com/search?q=%s",icon:"\u{1D54F}"},{keyword:"amz",name:"Amazon",urlTemplate:"https://www.amazon.com/s?k=%s",icon:"\u{1F6D2}"},{keyword:"maps",name:"Google Maps",urlTemplate:"https://www.google.com/maps/search/%s",icon:"\u{1F5FA}"},{keyword:"drive",name:"Google Drive",urlTemplate:"https://drive.google.com/drive/search?q=%s",icon:"\u{1F4BE}"},{keyword:"img",name:"Google Images",urlTemplate:"https://www.google.com/search?tbm=isch&q=%s",icon:"\u{1F5BC}"},{keyword:"news",name:"Google News",urlTemplate:"https://news.google.com/search?q=%s",icon:"\u{1F4F0}"},{keyword:"arxiv",name:"arXiv",urlTemplate:"https://arxiv.org/search/?query=%s",icon:"\u{1F4C4}"},{keyword:"pypi",name:"PyPI",urlTemplate:"https://pypi.org/search/?q=%s",icon:"\u{1F40D}"},{keyword:"crates",name:"crates.io",urlTemplate:"https://crates.io/search?q=%s",icon:"\u{1F980}"},{keyword:"imdb",name:"IMDb",urlTemplate:"https://www.imdb.com/find/?q=%s",icon:"\u{1F3AC}"}];function Z(e){let t=e.indexOf(" ");if(t===-1)return null;let o=e.slice(0,t).toLowerCase(),n=e.slice(t+1).trim();if(!n)return null;let a=Q.find(c=>c.keyword===o);if(!a)return null;let s=a.urlTemplate.replace("%s",encodeURIComponent(n));return{id:`site-search-${a.keyword}`,name:`Search ${a.name} for "${n}"`,description:`${a.keyword} \u2192 ${a.name}`,keywords:[a.keyword,a.name,n],icon:a.icon,category:"search",action:c=>{c.metaKey?r({type:"CREATE_TAB",url:s}):window.location.href=s,c.close()}}}function tt(e){if(!e||e.includes(" "))return[];let t=e.toLowerCase();return Q.filter(o=>o.keyword.startsWith(t)||o.name.toLowerCase().startsWith(t)).slice(0,3).map(o=>({id:`site-hint-${o.keyword}`,name:`${o.keyword}: Search ${o.name}`,description:`Type "${o.keyword} <query>" to search`,keywords:[o.keyword,o.name],icon:o.icon,category:"search",action:n=>{r({type:"CREATE_TAB",url:o.urlTemplate.replace("%s","")}),n.close()}}))}x();var et=[{id:"copy-markdown-link",name:"Copy as Markdown Link",description:"Copy [Title](URL) to clipboard",keywords:["copy","markdown","link","md"],icon:"\u{1F4DD}",category:"command",action:async e=>{let t=document.title,o=window.location.href;await navigator.clipboard.writeText(`[${t}](${o})`),e.close()}},{id:"copy-title",name:"Copy Page Title",description:"Copy the page title to clipboard",keywords:["copy","title","name"],icon:"\u{1F4C4}",category:"command",action:async e=>{await navigator.clipboard.writeText(document.title),e.close()}},{id:"copy-all-tab-urls",name:"Copy All Tab URLs",description:"Copy URLs of all open tabs as a list",keywords:["copy","all","tabs","urls","links","list"],icon:"\u{1F4D1}",category:"command",action:async e=>{let t=await r({type:"GET_ALL_TABS"});if(t){let o=t.map(n=>n.url).join(`
`);await navigator.clipboard.writeText(o)}e.close()}},{id:"copy-all-tabs-markdown",name:"Copy All Tabs as Markdown",description:"Copy all tabs as markdown links",keywords:["copy","all","tabs","markdown","links"],icon:"\u{1F4CB}",category:"command",action:async e=>{let t=await r({type:"GET_ALL_TABS"});if(t){let o=t.map(n=>`- [${n.title}](${n.url})`).join(`
`);await navigator.clipboard.writeText(o)}e.close()}},{id:"copy-page-metadata",name:"Copy Page Metadata",description:"Copy title, description, OG tags, canonical URL",keywords:["metadata","meta","og","seo","tags","opengraph"],icon:"\u{1F3F7}",category:"command",action:async e=>{let t={};t.Title=document.title,t.URL=window.location.href;let o=document.querySelector('meta[name="description"]');o&&(t.Description=o.getAttribute("content")||"");let n=document.querySelector('link[rel="canonical"]');n&&(t.Canonical=n.getAttribute("href")||""),document.querySelectorAll('meta[property^="og:"]').forEach(s=>{let c=s.getAttribute("property")||"";t[c]=s.getAttribute("content")||""}),document.querySelectorAll('meta[name^="twitter:"]').forEach(s=>{let c=s.getAttribute("name")||"";t[c]=s.getAttribute("content")||""});let a=Object.entries(t).map(([s,c])=>`${s}: ${c}`).join(`
`);await navigator.clipboard.writeText(a),e.close()}},{id:"find-on-page",name:"Find on Page",description:"Open browser find (Ctrl+F)",keywords:["find","search","page","text","ctrl+f"],icon:"\u{1F50E}",category:"command",action:e=>{e.close(),setTimeout(()=>{document.execCommand("find")},100)}},{id:"print-page",name:"Print Page",description:"Open the print dialog",keywords:["print","pdf","save"],icon:"\u{1F5A8}",category:"command",action:e=>{e.close(),setTimeout(()=>window.print(),100)}},{id:"toggle-fullscreen",name:"Toggle Fullscreen",description:"Enter or exit fullscreen mode",keywords:["fullscreen","full","screen","maximize"],icon:"\u26F6",category:"command",action:e=>{e.close(),document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}},{id:"copy-selection-as-markdown",name:"Copy Selection as Markdown Quote",description:"Copy selected text as a markdown blockquote",keywords:["selection","quote","markdown","blockquote"],icon:"\u{1F4AC}",category:"command",action:async e=>{let t=window.getSelection()?.toString()||"";if(t){let o=t.split(`
`).map(a=>`> ${a}`).join(`
`),n=`

\u2014 [${document.title}](${window.location.href})`;await navigator.clipboard.writeText(o+n)}e.close()}}];x();var ot=[{id:"view-source",name:"View Page Source",description:"Open the page source in a new tab",keywords:["view","source","html","code","developer"],icon:"\u{1F9D1}\u200D\u{1F4BB}",category:"command",action:e=>{r({type:"CREATE_TAB",url:`view-source:${window.location.href}`}),e.close()}},{id:"copy-as-curl",name:"Copy Page URL as cURL",description:"Copy a cURL command for this page",keywords:["curl","copy","request","http","api","developer"],icon:"\u2318",category:"command",action:async e=>{let o=`curl -X GET '${window.location.href}' \\
  -H 'User-Agent: Mozilla/5.0'`;await navigator.clipboard.writeText(o),e.close()}},{id:"copy-page-performance",name:"Copy Page Performance Timing",description:"Copy load time breakdown to clipboard",keywords:["performance","timing","speed","load","developer"],icon:"\u23F1",category:"command",action:async e=>{let t=performance.getEntriesByType("navigation");if(t.length===0){await navigator.clipboard.writeText("Performance data not available"),e.close();return}let o=t[0],n=[`Page Performance: ${window.location.href}`,"\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",`DNS Lookup:      ${(o.domainLookupEnd-o.domainLookupStart).toFixed(0)}ms`,`TCP Connect:     ${(o.connectEnd-o.connectStart).toFixed(0)}ms`,`TLS Handshake:   ${(o.secureConnectionStart?o.connectEnd-o.secureConnectionStart:0).toFixed(0)}ms`,`Request:         ${(o.responseStart-o.requestStart).toFixed(0)}ms`,`Response:        ${(o.responseEnd-o.responseStart).toFixed(0)}ms`,`DOM Processing:  ${(o.domComplete-o.responseEnd).toFixed(0)}ms`,`DOM Interactive: ${(o.domInteractive-o.fetchStart).toFixed(0)}ms`,`DOM Complete:    ${(o.domComplete-o.fetchStart).toFixed(0)}ms`,`Load Event:      ${(o.loadEventEnd-o.fetchStart).toFixed(0)}ms`,`Transfer Size:   ${(o.transferSize/1024).toFixed(1)}KB`];await navigator.clipboard.writeText(n.join(`
`)),e.close()}},{id:"copy-css-custom-properties",name:"Copy CSS Custom Properties",description:"Copy all CSS variables defined on :root",keywords:["css","variables","custom","properties","design","tokens"],icon:"\u{1F3A8}",category:"command",action:async e=>{let t=getComputedStyle(document.documentElement),o=[];for(let a of document.styleSheets)try{for(let s of a.cssRules){let h=s.cssText.matchAll(/--([\w-]+)\s*:/g);for(let u of h){let f=`--${u[1]}`,g=t.getPropertyValue(f).trim();g&&o.push(`${f}: ${g};`)}}}catch{}let n=[...new Set(o)];await navigator.clipboard.writeText(n.length?n.join(`
`):"No CSS custom properties found"),e.close()}},{id:"toggle-javascript",name:"List Page Scripts",description:"Copy all script sources on this page",keywords:["javascript","scripts","js","developer"],icon:"\u{1F4DC}",category:"command",action:async e=>{let o=Array.from(document.querySelectorAll("script[src]")).map(a=>a.getAttribute("src")).filter(Boolean),n=o.length?`Scripts on ${window.location.host}:
${o.join(`
`)}`:"No external scripts found";await navigator.clipboard.writeText(n),e.close()}},{id:"count-dom-elements",name:"Count DOM Elements",description:"Show total elements, depth, and heaviest nodes",keywords:["dom","elements","count","nodes","developer","performance"],icon:"\u{1F333}",category:"command",action:async e=>{let t=document.querySelectorAll("*"),o=t.length,n=0,a=(u,f)=>{f>n&&(n=f);let g=f;for(let p of u.children){let b=a(p,f+1);b>g&&(g=b)}return g};a(document.documentElement,0);let s={};t.forEach(u=>{let f=u.tagName.toLowerCase();s[f]=(s[f]||0)+1});let c=Object.entries(s).sort((u,f)=>f[1]-u[1]).slice(0,10).map(([u,f])=>`  ${u}: ${f}`).join(`
`),h=[`DOM Analysis: ${window.location.href}`,"\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",`Total Elements: ${o}`,`Max Nesting:    ${n} levels`,"","Top Tags:",c].join(`
`);await navigator.clipboard.writeText(h),e.close()}},{id:"list-event-listeners",name:"Copy Page Links",description:"Copy all links (anchors) on this page",keywords:["links","anchors","hrefs","urls","developer"],icon:"\u{1F517}",category:"command",action:async e=>{let t=Array.from(document.querySelectorAll("a[href]")),o=[...new Set(t.map(a=>a.getAttribute("href")).filter(Boolean))],n=o.length?`Links on ${window.location.host} (${o.length}):
${o.join(`
`)}`:"No links found";await navigator.clipboard.writeText(n),e.close()}},{id:"copy-cookies-summary",name:"Copy Cookies Summary",description:"Copy cookie names and sizes for this domain",keywords:["cookies","cookie","storage","developer"],icon:"\u{1F36A}",category:"command",action:async e=>{let t=document.cookie.split(";").filter(a=>a.trim());if(t.length===0){await navigator.clipboard.writeText("No cookies set for this domain"),e.close();return}let o=t.map(a=>{let[s]=a.trim().split("=");return`${s.trim()} (${a.trim().length} chars)`}),n=`Cookies for ${window.location.host} (${t.length}):
${o.join(`
`)}`;await navigator.clipboard.writeText(n),e.close()}},{id:"copy-local-storage-keys",name:"Copy Local Storage Keys",description:"Copy all localStorage keys for this domain",keywords:["localstorage","storage","keys","developer"],icon:"\u{1F4BE}",category:"command",action:async e=>{let t=[];for(let n=0;n<localStorage.length;n++){let a=localStorage.key(n);a&&t.push(a)}let o=t.length?`localStorage keys for ${window.location.host} (${t.length}):
${t.join(`
`)}`:"No localStorage data for this domain";await navigator.clipboard.writeText(o),e.close()}}];x();var nt=[{id:"suspend-other-tabs",name:"Suspend Other Tabs",description:"Discard inactive tabs to free memory",keywords:["suspend","discard","memory","free","sleep","other"],icon:"\u{1F4A4}",category:"tab",action:async e=>{await r({type:"SUSPEND_OTHER_TABS"}),e.close()}},{id:"suspend-all-tabs",name:"Suspend All Background Tabs",description:"Discard all tabs except the active one",keywords:["suspend","discard","all","memory","free","sleep"],icon:"\u{1F634}",category:"tab",action:async e=>{await r({type:"SUSPEND_ALL_TABS"}),e.close()}}];x();function Vt(e){let t=new Date;return e.replace(/\{\{date\}\}/g,t.toLocaleDateString()).replace(/\{\{time\}\}/g,t.toLocaleTimeString()).replace(/\{\{datetime\}\}/g,t.toLocaleString()).replace(/\{\{iso\}\}/g,t.toISOString()).replace(/\{\{url\}\}/g,window.location.href).replace(/\{\{title\}\}/g,document.title).replace(/\{\{domain\}\}/g,window.location.hostname).replace(/\{\{year\}\}/g,String(t.getFullYear())).replace(/\{\{month\}\}/g,String(t.getMonth()+1).padStart(2,"0")).replace(/\{\{day\}\}/g,String(t.getDate()).padStart(2,"0"))}function Xt(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let o=t.selectionStart??t.value.length,n=t.selectionEnd??t.value.length;t.value=t.value.slice(0,o)+e+t.value.slice(n),t.selectionStart=t.selectionEnd=o+e.length,t.dispatchEvent(new Event("input",{bubbles:!0}))}else t instanceof HTMLElement&&t.isContentEditable?document.execCommand("insertText",!1,e):navigator.clipboard.writeText(e)}async function H(){let e=await r({type:"GET_SNIPPETS"});return!e||e.length===0?[]:e.map(t=>({id:`snippet-${t.id}`,name:t.name,description:`${t.trigger} \u2192 ${t.body.slice(0,50)}${t.body.length>50?"...":""}`,keywords:["snippet",t.trigger,t.name],icon:"\u2702",category:"snippet",action:o=>{let n=Vt(t.body);o.close(),setTimeout(()=>Xt(n),150)}}))}var at=[{id:"create-snippet",name:"Create Snippet",description:"Save a text snippet with a trigger keyword",keywords:["create","new","snippet","add"],icon:"\u2795",category:"snippet",action:async e=>{let t=e.query.replace(/^[>;]\s*create\s*snippet\s*/i,"").split("|").map(o=>o.trim());if(t.length>=3){let o={id:`snip-${Date.now()}`,trigger:t[0].startsWith(";")?t[0]:`;${t[0]}`,name:t[1],body:t[2]};await r({type:"SAVE_SNIPPET",snippet:o})}e.close()}}];x();function Jt(e){let t=Date.now()-e,o=Math.floor(t/6e4);if(o<1)return"just now";if(o<60)return`${o}m ago`;let n=Math.floor(o/60);if(n<24)return`${n}h ago`;let a=Math.floor(n/24);return a<7?`${a}d ago`:new Date(e).toLocaleDateString()}async function N(){let e=await r({type:"GET_NOTES"});return!e||e.length===0?[]:e.slice(0,20).map(t=>({id:`note-${t.id}`,name:t.text.slice(0,80),description:`${Jt(t.createdAt)} \xB7 ${t.title||t.url}`,keywords:["note",...t.text.split(" ").slice(0,5)],icon:"\u{1F4DD}",category:"note",action:async o=>{await navigator.clipboard.writeText(t.text),o.close()}}))}function rt(e){let t=e.match(/^\/note\s+(.+)/i);if(!t)return null;let o=t[1].trim();return o?{id:"save-note",name:`Save Note: "${o}"`,description:"Press Enter to save",keywords:["note","save"],icon:"\u{1F4DD}",category:"note",action:async n=>{let a={id:`note-${Date.now()}`,text:o,url:window.location.href,title:document.title,createdAt:Date.now()};await r({type:"SAVE_NOTE",note:a}),n.close()}}:null}function st(e){return/^\/notes?\s*$/i.test(e)}var it=[{id:"clear-all-notes",name:"Clear All Notes",description:"Delete all saved notes",keywords:["clear","delete","all","notes"],icon:"\u{1F5D1}",category:"note",action:async e=>{let t=await r({type:"GET_NOTES"});if(t)for(let o of t)await r({type:"DELETE_NOTE",id:o.id});e.close()}}];x();var ct="";function dt(){document.addEventListener("copy",async()=>{try{await new Promise(t=>setTimeout(t,50));let e=await navigator.clipboard.readText();if(e&&e!==ct&&e.trim().length>0){ct=e;let t={id:`clip-${Date.now()}`,text:e,timestamp:Date.now(),source:window.location.hostname};r({type:"SAVE_CLIPBOARD_ITEM",item:t})}}catch{}})}function Yt(e){let t=Date.now()-e,o=Math.floor(t/6e4);if(o<1)return"just now";if(o<60)return`${o}m ago`;let n=Math.floor(o/60);return n<24?`${n}h ago`:`${Math.floor(n/24)}d ago`}async function lt(){let e=await r({type:"GET_CLIPBOARD_HISTORY"});return!e||e.length===0?[]:e.slice(0,30).map(t=>({id:`clip-${t.id}`,name:t.text.slice(0,80).replace(/\n/g," "),description:`${t.pinned?"\u{1F4CC} ":""}${Yt(t.timestamp)} \xB7 ${t.source}`,keywords:["clipboard","paste","history",...t.text.split(" ").slice(0,3)],icon:t.pinned?"\u{1F4CC}":"\u{1F4CB}",category:"clipboard",action:async o=>{await navigator.clipboard.writeText(t.text),o.close()}}))}var mt=[{id:"clear-clipboard-history",name:"Clear Clipboard History",description:"Delete all clipboard history entries",keywords:["clear","clipboard","history","delete"],icon:"\u{1F5D1}",category:"clipboard",action:async e=>{await r({type:"CLEAR_CLIPBOARD_HISTORY"}),e.close()}}];x();async function pt(){let e=await r({type:"GET_ALIASES"});return!e||e.length===0?[]:e.map(t=>({id:`alias-${t.id}`,name:t.name,description:`${t.keyword} \u2192 ${t.url}`,keywords:["alias",t.keyword,t.name],icon:"\u26A1",category:"alias",action:o=>{let n=t.url;if(n.includes("%s")){let s=o.query.trim().split(/\s+/).slice(1).join(" ");s?n=n.replace("%s",encodeURIComponent(s)):n=n.replace("%s","")}o.metaKey?r({type:"CREATE_TAB",url:n}):window.location.href=n,o.close()}}))}async function ht(e){let t=await r({type:"GET_ALIASES"});if(!t||t.length===0)return null;let o=e.trim().split(/\s+/),n=o[0].toLowerCase(),a=o.slice(1).join(" "),s=t.find(u=>u.keyword.toLowerCase()===n);if(!s)return null;let c=s.url,h=c.includes("%s");if(h&&a)c=c.replace("%s",encodeURIComponent(a));else if(h&&!a)return{id:`alias-hint-${s.id}`,name:`${s.name}: type a query`,description:`${s.keyword} <query> \u2192 ${s.url}`,keywords:[s.keyword],icon:"\u26A1",category:"alias",action:()=>{}};return{id:`alias-exec-${s.id}`,name:h?`${s.name}: ${a}`:s.name,description:c,keywords:[s.keyword],icon:"\u26A1",category:"alias",action:u=>{u.metaKey?r({type:"CREATE_TAB",url:c}):window.location.href=c,u.close()}}}function ut(e){let t=e.match(/^\/alias\s+(\S+)\s+(\S+)(?:\s+(.+))?$/i);if(!t)return null;let o=t[1],n=t[2].startsWith("http")?t[2]:`https://${t[2]}`,a=t[3]||o;return{id:"create-alias",name:`Create Alias: "${o}" \u2192 ${n}`,description:"Press Enter to save",keywords:["alias","create"],icon:"\u26A1",category:"alias",action:async s=>{let c={id:`alias-${Date.now()}`,keyword:o,name:a,url:n};await r({type:"SAVE_ALIAS",alias:c}),s.close()}}}var ft=[{id:"list-aliases",name:"Manage Aliases",description:"View and manage your custom aliases",keywords:["alias","aliases","manage","list","quicklinks"],icon:"\u26A1",category:"alias",action:async e=>{let t=await r({type:"GET_ALIASES"});if(t&&t.length>0){let o=t.map(n=>`${n.keyword} \u2192 ${n.url} (${n.name})`).join(`
`);await navigator.clipboard.writeText(o)}e.close()}}];x();var gt=[{id:"workflow-cleanup",name:"Workflow: Clean Up Tabs",description:"Close duplicates \u2192 suspend inactive \u2192 report",keywords:["workflow","clean","cleanup","organize","tabs"],icon:"\u{1F9F9}",category:"command",action:async e=>{await r({type:"CLOSE_DUPLICATE_TABS"}),await r({type:"SUSPEND_OTHER_TABS"}),e.close()}},{id:"workflow-focus",name:"Workflow: Focus Mode",description:"Pin current tab \u2192 close all others \u2192 clean slate",keywords:["workflow","focus","mode","distraction","clean"],icon:"\u{1F3AF}",category:"command",action:async e=>{let t=await r({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&(await r({type:"PIN_TAB",tabId:t.id,pinned:!0}),await r({type:"CLOSE_OTHER_TABS",tabId:t.id})),e.close()}},{id:"workflow-share-session",name:"Workflow: Share Session",description:"Copy all tab URLs as a markdown list",keywords:["workflow","share","session","export","tabs","markdown"],icon:"\u{1F4E4}",category:"command",action:async e=>{let t=await r({type:"GET_ALL_TABS"});if(t&&t.length>0){let o=t.map(a=>`- [${a.title}](${a.url})`).join(`
`),n=`## Browser Session (${t.length} tabs)

`;await navigator.clipboard.writeText(n+o)}e.close()}},{id:"workflow-research",name:"Workflow: Research Mode",description:"Create a tab group named after your query with blank tabs",keywords:["workflow","research","mode","group","tabs"],icon:"\u{1F52C}",category:"command",action:async e=>{let t=e.query.replace(/^>\s*workflow[:\s]*research\s*mode?\s*/i,"").trim()||"Research",o=await r({type:"CREATE_TAB_GROUP",title:t,color:"blue"});if(o?.groupId)for(let n=0;n<3;n++){let a=await r({type:"CREATE_TAB",url:"chrome://newtab"});a?.id&&await r({type:"ADD_TAB_TO_GROUP",tabId:a.id,groupId:o.groupId})}e.close()}},{id:"workflow-save-restore",name:"Workflow: Save All Tabs as Bookmarks",description:"Bookmark every open tab for later",keywords:["workflow","save","bookmark","all","tabs","backup"],icon:"\u{1F4BE}",category:"command",action:async e=>{let t=await r({type:"GET_ALL_TABS"});if(t&&t.length>0){let o=t.map(n=>`${n.title}
${n.url}`).join(`

`);await navigator.clipboard.writeText(o)}e.close()}},{id:"workflow-morning",name:"Workflow: Morning Routine",description:"Open your daily sites (Gmail, Calendar, GitHub)",keywords:["workflow","morning","routine","daily","startup"],icon:"\u2600",category:"command",action:async e=>{let t=["https://mail.google.com","https://calendar.google.com","https://github.com"];for(let o of t)await r({type:"CREATE_TAB",url:o});e.close()}}];x();var Qt=[{pattern:/github\.com/,commands:[{id:"gh-my-prs",name:"GitHub: My Pull Requests",description:"Open your PRs on GitHub",keywords:["github","pull","requests","pr","my"],icon:"\u{1F419}",category:"command",action:e=>{let t="https://github.com/pulls";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"gh-my-issues",name:"GitHub: My Issues",description:"Open your issues on GitHub",keywords:["github","issues","my"],icon:"\u{1F419}",category:"command",action:e=>{let t="https://github.com/issues";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"gh-notifications",name:"GitHub: Notifications",description:"Open GitHub notifications",keywords:["github","notifications","inbox"],icon:"\u{1F514}",category:"command",action:e=>{let t="https://github.com/notifications";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"gh-new-repo",name:"GitHub: New Repository",description:"Create a new repository",keywords:["github","new","repository","create","repo"],icon:"\u2795",category:"command",action:e=>{let t="https://github.com/new";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}}]},{pattern:/youtube\.com/,commands:[{id:"yt-subscriptions",name:"YouTube: Subscriptions",description:"Go to your subscriptions feed",keywords:["youtube","subscriptions","feed"],icon:"\u25B6",category:"command",action:e=>{let t="https://www.youtube.com/feed/subscriptions";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"yt-watch-later",name:"YouTube: Watch Later",description:"Go to Watch Later playlist",keywords:["youtube","watch","later","playlist"],icon:"\u23F0",category:"command",action:e=>{let t="https://www.youtube.com/playlist?list=WL";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"yt-history",name:"YouTube: Watch History",description:"Go to your watch history",keywords:["youtube","history","watched"],icon:"\u{1F4FA}",category:"command",action:e=>{let t="https://www.youtube.com/feed/history";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}}]},{pattern:/google\.com/,commands:[{id:"g-gmail",name:"Google: Open Gmail",description:"Go to Gmail inbox",keywords:["google","gmail","email","mail","inbox"],icon:"\u{1F4E7}",category:"command",action:e=>{let t="https://mail.google.com";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"g-drive",name:"Google: Open Drive",description:"Go to Google Drive",keywords:["google","drive","files","documents"],icon:"\u{1F4BE}",category:"command",action:e=>{let t="https://drive.google.com";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"g-calendar",name:"Google: Open Calendar",description:"Go to Google Calendar",keywords:["google","calendar","schedule","events"],icon:"\u{1F4C5}",category:"command",action:e=>{let t="https://calendar.google.com";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}}]},{pattern:/reddit\.com/,commands:[{id:"reddit-saved",name:"Reddit: Saved Posts",description:"Go to your saved posts",keywords:["reddit","saved","posts","bookmarks"],icon:"\u{1F4AC}",category:"command",action:e=>{let t="https://www.reddit.com/saved";e.metaKey?r({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}}]}];function yt(){let e=window.location.hostname,t=[];for(let o of Qt)o.pattern.test(e)&&t.push(...o.commands);return t}x();var xt=[{id:"export-data",name:"Export Hatch Data",description:"Copy aliases, snippets, and settings as JSON to clipboard",keywords:["export","backup","save","json","data"],icon:"\u{1F4E4}",category:"command",action:async e=>{let[t,o,n]=await Promise.all([r({type:"GET_ALIASES"}),r({type:"GET_SNIPPETS"}),r({type:"GET_NOTES"})]),a={version:1,exportedAt:new Date().toISOString(),aliases:t||[],snippets:o||[],notes:n||[]};await navigator.clipboard.writeText(JSON.stringify(a,null,2)),e.close()}},{id:"import-data",name:"Import Hatch Data",description:"Import aliases and snippets from clipboard JSON",keywords:["import","restore","load","json","data"],icon:"\u{1F4E5}",category:"command",action:async e=>{try{let t=await navigator.clipboard.readText(),o=JSON.parse(t);if(o.version!==1){console.warn("[Hatch] Unknown import format version"),e.close();return}if(Array.isArray(o.aliases))for(let n of o.aliases)n.id&&n.keyword&&n.url&&await r({type:"SAVE_ALIAS",alias:n});if(Array.isArray(o.snippets))for(let n of o.snippets)n.id&&n.trigger&&n.body&&await r({type:"SAVE_SNIPPET",snippet:n});if(Array.isArray(o.notes))for(let n of o.notes)n.id&&n.text&&await r({type:"SAVE_NOTE",note:n})}catch(t){console.error("[Hatch] Import failed:",t)}e.close()}}];function bt(e){return new Promise(t=>{chrome.runtime.sendMessage(e,o=>t(o))})}function wt(e){bt({type:"TRACK_USAGE",commandId:e})}function O(e){let a=Date.now()-e.lastUsed,s;return a<36e5?s=1:a<864e5?s=.8:a<6048e5?s=.5:s=.2,e.count*s}async function Ct(){return bt({type:"GET_FRECENCY"})}var Et=Ot(Tt());function A(e,t,o=0){if(!t.trim())return(o>0?e.slice(0,o):e).map(u=>({item:u,score:1,matches:[]}));let n=e.map(h=>{let u=[h.name];return h.keywords&&u.push(...h.keywords),h.description&&u.push(h.description),u.join(" ")}),a={threshold:4};return o>0&&(a.maxResults=o),(0,Et.createFuzzySearch)(n,a).search(t).map(h=>{let u=n.indexOf(h.item);return{item:e[u],score:h.score,matches:h.matches}})}var _t={">":"command","@":"tab","#":"bookmark","/":"history",";":"snippet"},R=class{constructor(){this.staticCommands=[];this.dynamicProviders=[];this.staticCommands=[...P,...Y,...nt,...j,...et,...ot,...at,...it,...mt,...ft,...gt,...xt],this.dynamicProviders.push($),this.dynamicProviders.push(J),this.dynamicProviders.push(W),this.dynamicProviders.push(q),this.dynamicProviders.push(V),this.dynamicProviders.push(H),this.dynamicProviders.push(N),this.dynamicProviders.push(lt),this.dynamicProviders.push(pt)}async search(t,o=0){let n=t.trim(),a=null,s=rt(n);if(s)return[{item:s,score:2,matches:[]}];let c=ut(n);if(c)return[{item:c,score:2,matches:[]}];if(st(n))return(await N()).map(b=>({item:b,score:1,matches:[]}));if(n.length>0&&_t[n[0]]&&(a=_t[n[0]],n=n.slice(1).trim()),a==="snippet"){let p=await H();return n?A(p,n,o):p.map(b=>({item:b,score:1,matches:[]}))}let h=p=>o>0?p.slice(0,o):p;if(!a&&n.length>0){let p=Z(n);if(p){let w=await this.getAllCommands(),l=A(w,n,o>0?o-1:0);return l=await this.applyFrecencyBoost(l),h([{item:p,score:2,matches:[]},...l])}let b=await ht(n);if(b){let w=await this.getAllCommands(),l=A(w,n,o>0?o-1:0);return l=await this.applyFrecencyBoost(l),h([{item:b,score:2,matches:[]},...l])}}let u=await this.getAllCommands(),f=a?u.filter(p=>p.category===a):u,g=A(f,n,o);if(g=await this.applyFrecencyBoost(g),n.length>0&&!a){let p=tt(n);if(p.length>0){let l=p.map(i=>({item:i,score:1.5,matches:[]}));g=h([...l,...g])}let b=F(n);b&&(g=h([{item:b,score:1,matches:[]},...g]));let w={item:z(t),score:0,matches:[]};o===0||g.length<o?g.push(w):g[g.length-1]=w}return g}trackExecution(t){wt(t)}async applyFrecencyBoost(t){try{let o=await Ct();return!o||Object.keys(o).length===0?t:[...t].sort((n,a)=>{let s=o[n.item.id]?O(o[n.item.id]):0,c=o[a.item.id]?O(o[a.item.id]):0,h=n.score+s*.1;return a.score+c*.1-h})}catch{return t}}async getAllCommands(){let t=await Promise.all(this.dynamicProviders.map(n=>n().catch(()=>[]))),o=yt();return[...t.flat(),...o,...this.staticCommands]}};var St=`
/* \u2500\u2500\u2500 Reset \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* \u2500\u2500\u2500 CSS Variables \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

:host {
  --hatch-bg: #1a1a2e;
  --hatch-bg-secondary: #16213e;
  --hatch-bg-hover: #1e2a4a;
  --hatch-bg-selected: #2541b2;
  --hatch-border: rgba(255, 255, 255, 0.08);
  --hatch-border-focus: rgba(99, 102, 241, 0.5);
  --hatch-text: #e2e8f0;
  --hatch-text-secondary: #94a3b8;
  --hatch-text-muted: #64748b;
  --hatch-accent: #6366f1;
  --hatch-accent-glow: rgba(99, 102, 241, 0.15);
  --hatch-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(255, 255, 255, 0.05),
                  0 0 80px -20px rgba(99, 102, 241, 0.15);
  --hatch-radius: 16px;
  --hatch-radius-sm: 8px;
  --hatch-font: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Inter', Roboto, sans-serif;
  --hatch-transition: 150ms cubic-bezier(0.16, 1, 0.3, 1);

  font-family: var(--hatch-font);
  font-size: 14px;
  line-height: 1.5;
  color: var(--hatch-text);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* \u2500\u2500\u2500 Light theme \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

@media (prefers-color-scheme: light) {
  :host {
    --hatch-bg: #ffffff;
    --hatch-bg-secondary: #f8fafc;
    --hatch-bg-hover: #f1f5f9;
    --hatch-bg-selected: #6366f1;
    --hatch-border: rgba(0, 0, 0, 0.08);
    --hatch-border-focus: rgba(99, 102, 241, 0.5);
    --hatch-text: #0f172a;
    --hatch-text-secondary: #475569;
    --hatch-text-muted: #94a3b8;
    --hatch-accent: #6366f1;
    --hatch-accent-glow: rgba(99, 102, 241, 0.1);
    --hatch-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15),
                    0 0 0 1px rgba(0, 0, 0, 0.05),
                    0 0 80px -20px rgba(99, 102, 241, 0.1);
  }
}

/* \u2500\u2500\u2500 Backdrop \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-backdrop {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity var(--hatch-transition);
  pointer-events: none;
}

.hatch-backdrop.visible {
  opacity: 1;
  pointer-events: auto;
}

/* \u2500\u2500\u2500 Palette Container \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-palette {
  position: fixed;
  top: 18vh;
  left: 50%;
  transform: translateX(-50%) scale(0.96);
  z-index: 2147483647;
  width: 640px;
  max-width: calc(100vw - 32px);
  max-height: 70vh;
  background: var(--hatch-bg);
  border: 1px solid var(--hatch-border);
  border-radius: var(--hatch-radius);
  box-shadow: var(--hatch-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  opacity: 0;
  transition: opacity var(--hatch-transition), transform var(--hatch-transition);
  pointer-events: none;
}

.hatch-palette.visible {
  opacity: 1;
  transform: translateX(-50%) scale(1);
  pointer-events: auto;
}

/* \u2500\u2500\u2500 Input Area \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-input-wrapper {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--hatch-border);
}

.hatch-search-icon {
  flex-shrink: 0;
  color: var(--hatch-text-muted);
  display: flex;
  align-items: center;
}

.hatch-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--hatch-text);
  font-size: 16px;
  font-family: var(--hatch-font);
  font-weight: 400;
  caret-color: var(--hatch-accent);
  letter-spacing: -0.01em;
}

.hatch-input::placeholder {
  color: var(--hatch-text-muted);
  font-weight: 400;
}

.hatch-shortcut-hint {
  flex-shrink: 0;
  font-size: 11px;
  font-weight: 500;
  color: var(--hatch-text-muted);
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: 6px;
  padding: 2px 8px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}

/* \u2500\u2500\u2500 Results List \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-results {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 8px;
  scrollbar-width: thin;
  scrollbar-color: var(--hatch-border) transparent;
}

.hatch-results::-webkit-scrollbar {
  width: 6px;
}

.hatch-results::-webkit-scrollbar-track {
  background: transparent;
}

.hatch-results::-webkit-scrollbar-thumb {
  background: var(--hatch-border);
  border-radius: 3px;
}

/* \u2500\u2500\u2500 Section Header \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-section-header {
  font-size: 11px;
  font-weight: 600;
  color: var(--hatch-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 10px 12px 4px;
  user-select: none;
}

.hatch-section-header:first-child {
  padding-top: 4px;
}

/* \u2500\u2500\u2500 Result Item \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: var(--hatch-radius-sm);
  cursor: pointer;
  transition: background var(--hatch-transition);
  user-select: none;
}

.hatch-result-item:hover {
  background: var(--hatch-bg-hover);
}

.hatch-result-item.selected {
  background: var(--hatch-accent);
  color: #ffffff;
}

.hatch-result-item.selected .hatch-result-desc,
.hatch-result-item.selected .hatch-result-badge {
  color: rgba(255, 255, 255, 0.7);
}

.hatch-result-item.selected .hatch-result-icon {
  color: rgba(255, 255, 255, 0.9);
}

/* \u2500\u2500\u2500 Result Icon \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-result-icon {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: var(--hatch-radius-sm);
  font-size: 16px;
  color: var(--hatch-text-secondary);
  overflow: hidden;
}

.hatch-result-item.selected .hatch-result-icon {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

.hatch-result-icon img {
  width: 20px;
  height: 20px;
  object-fit: contain;
  border-radius: 2px;
}

/* \u2500\u2500\u2500 Result Text \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-result-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.hatch-result-name {
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: -0.01em;
}

.hatch-result-desc {
  font-size: 12px;
  color: var(--hatch-text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* \u2500\u2500\u2500 Category Badge \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-result-badge {
  flex-shrink: 0;
  font-size: 10px;
  font-weight: 600;
  color: var(--hatch-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 2px 8px;
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: 100px;
}

.hatch-result-item.selected .hatch-result-badge {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

/* \u2500\u2500\u2500 Empty State \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-empty {
  text-align: center;
  padding: 40px 20px;
  color: var(--hatch-text-muted);
  font-size: 14px;
}

/* \u2500\u2500\u2500 Footer \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-top: 1px solid var(--hatch-border);
  background: var(--hatch-bg-secondary);
}

.hatch-footer-hints {
  display: flex;
  gap: 16px;
}

.hatch-hint {
  font-size: 11px;
  color: var(--hatch-text-muted);
  display: flex;
  align-items: center;
  gap: 4px;
}

.hatch-hint kbd {
  font-family: var(--hatch-font);
  font-size: 11px;
  font-weight: 600;
  color: var(--hatch-text-secondary);
  background: var(--hatch-bg);
  border: 1px solid var(--hatch-border);
  border-radius: 4px;
  padding: 1px 5px;
  min-width: 20px;
  text-align: center;
}

.hatch-brand {
  font-size: 11px;
  font-weight: 700;
  color: var(--hatch-accent);
  letter-spacing: 0.05em;
  text-transform: uppercase;
}

/* \u2500\u2500\u2500 Match Highlighting \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-highlight {
  background: var(--hatch-accent-glow);
  color: var(--hatch-accent);
  border-radius: 2px;
  padding: 0 1px;
  font-weight: 600;
}

.hatch-result-item.selected .hatch-highlight {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
}

/* \u2500\u2500\u2500 Multi-Select \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-check {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  color: var(--hatch-accent);
  background: var(--hatch-accent-glow);
  border-radius: 4px;
  margin-right: 4px;
}

.hatch-result-item.multi-selected {
  background: rgba(99, 102, 241, 0.08);
  border-left: 2px solid var(--hatch-accent);
  padding-left: 14px;
}

.hatch-result-item.multi-selected.selected {
  background: var(--hatch-bg-selected);
}

/* \u2500\u2500\u2500 Batch Action Bar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-batch-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  background: var(--hatch-accent);
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
}

.hatch-batch-count {
  font-weight: 600;
}

.hatch-batch-actions {
  display: flex;
  gap: 6px;
}

.hatch-batch-btn {
  background: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 600;
  font-family: var(--hatch-font);
  cursor: pointer;
  transition: background 0.1s;
}

.hatch-batch-btn:hover {
  background: rgba(255, 255, 255, 0.35);
}
`;var L=class{constructor(){this.results=[];this.selectedIndex=0;this.isOpen=!1;this.searchDebounceTimer=null;this.selectedItems=new Set;this.batchBar=null;this.registry=new R,this.host=document.createElement("div"),this.host.id="hatch-host",this.shadow=this.host.attachShadow({mode:"closed"}),this.buildDOM(),this.attachStyles(),this.bindEvents(),document.body.appendChild(this.host)}buildDOM(){this.backdrop=document.createElement("div"),this.backdrop.className="hatch-backdrop",this.backdrop.addEventListener("click",()=>this.close()),this.container=document.createElement("div"),this.container.className="hatch-palette",this.container.setAttribute("role","dialog"),this.container.setAttribute("aria-label","Hatch Command Palette");let t=document.createElement("div");t.className="hatch-input-wrapper";let o=document.createElement("span");o.className="hatch-search-icon",o.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',this.input=document.createElement("input"),this.input.className="hatch-input",this.input.type="text",this.input.placeholder="Search tabs, commands, or type a URL...",this.input.setAttribute("autocomplete","off"),this.input.setAttribute("autocorrect","off"),this.input.setAttribute("autocapitalize","off"),this.input.setAttribute("spellcheck","false");let n=document.createElement("span");n.className="hatch-shortcut-hint",n.textContent="esc",t.appendChild(o),t.appendChild(this.input),t.appendChild(n),this.resultsList=document.createElement("div"),this.resultsList.className="hatch-results",this.resultsList.setAttribute("role","listbox");let a=document.createElement("div");a.className="hatch-footer",a.innerHTML=`
      <div class="hatch-footer-hints">
        <span class="hatch-hint"><kbd>\u2191\u2193</kbd> navigate</span>
        <span class="hatch-hint"><kbd>\u21B5</kbd> open</span>
        <span class="hatch-hint"><kbd>\u2318\u21B5</kbd> new tab</span>
        <span class="hatch-hint"><kbd>esc</kbd> close</span>
      </div>
      <span class="hatch-brand">Hatch</span>
    `,this.batchBar=document.createElement("div"),this.batchBar.className="hatch-batch-bar",this.batchBar.style.display="none",this.container.appendChild(t),this.container.appendChild(this.resultsList),this.container.appendChild(this.batchBar),this.container.appendChild(a),this.shadow.appendChild(this.backdrop),this.shadow.appendChild(this.container)}attachStyles(){let t=document.createElement("style");t.textContent=St,this.shadow.appendChild(t)}bindEvents(){this.input.addEventListener("input",()=>this.onInput()),this.input.addEventListener("keydown",t=>this.onKeyDown(t))}toggle(){this.isOpen?this.close():this.open()}async open(){this.isOpen||(this.isOpen=!0,this.host.style.display="block",this.input.value="",this.selectedIndex=0,this.selectedItems.clear(),this.batchBar&&(this.batchBar.style.display="none"),this.container.offsetHeight,this.backdrop.classList.add("visible"),this.container.classList.add("visible"),requestAnimationFrame(()=>{this.input.focus()}),await this.updateResults())}close(){this.isOpen&&(this.isOpen=!1,this.backdrop.classList.remove("visible"),this.container.classList.remove("visible"),setTimeout(()=>{this.isOpen||(this.host.style.display="none")},150))}onInput(){this.searchDebounceTimer!==null&&clearTimeout(this.searchDebounceTimer),this.searchDebounceTimer=window.setTimeout(()=>{this.updateResults()},16)}async updateResults(){let t=this.input.value,o=t.trim()?15:0;this.results=await this.registry.search(t,o),this.selectedIndex=0,this.renderResults()}renderResults(){if(this.resultsList.innerHTML="",this.results.length===0){let o=document.createElement("div");o.className="hatch-empty",o.textContent="No results found",this.resultsList.appendChild(o);return}let t="";this.results.forEach((o,n)=>{let a=o.item;if(a.category!==t){t=a.category;let p=document.createElement("div");p.className="hatch-section-header",p.textContent=this.getCategoryLabel(a.category),this.resultsList.appendChild(p)}let s=this.selectedItems.has(a.id),c=document.createElement("div");c.className=`hatch-result-item${n===this.selectedIndex?" selected":""}${s?" multi-selected":""}`,c.setAttribute("role","option"),c.setAttribute("aria-selected",n===this.selectedIndex?"true":"false");let h=document.createElement("span");if(h.className="hatch-result-icon",a.icon&&(a.icon.startsWith("http")||a.icon.startsWith("data:"))){let p=document.createElement("img");p.src=a.icon,p.width=20,p.height=20,p.loading="lazy",p.onerror=()=>{p.style.display="none",h.textContent=this.getCategoryIcon(a.category)},h.appendChild(p)}else h.textContent=a.icon||this.getCategoryIcon(a.category);let u=document.createElement("div");u.className="hatch-result-text";let f=document.createElement("span");if(f.className="hatch-result-name",o.matches.length>0&&this.input.value.trim()?this.renderHighlightedName(f,a.name,o.matches):f.textContent=a.name,u.appendChild(f),a.description){let p=document.createElement("span");p.className="hatch-result-desc",p.textContent=a.description,u.appendChild(p)}let g=document.createElement("span");if(g.className="hatch-result-badge",g.textContent=a.category,s){let p=document.createElement("span");p.className="hatch-check",p.textContent="\u2713",c.appendChild(p)}c.appendChild(h),c.appendChild(u),c.appendChild(g),c.addEventListener("mouseenter",()=>{this.selectedIndex=n,this.highlightSelected()}),c.addEventListener("click",p=>{this.selectedIndex=n,this.executeSelected(p.metaKey||p.ctrlKey)}),this.resultsList.appendChild(c)})}renderHighlightedName(t,o,n){let a=new Set(n);for(let s=0;s<o.length;s++)if(a.has(s)){let c=document.createElement("mark");c.className="hatch-highlight",c.textContent=o[s],t.appendChild(c)}else t.appendChild(document.createTextNode(o[s]))}getCategoryLabel(t){return{tab:"Tabs",navigation:"Navigation",bookmark:"Bookmarks",history:"History",session:"Recently Closed",snippet:"Snippets",command:"Commands",search:"Search",note:"Notes",alias:"Aliases",clipboard:"Clipboard"}[t]||t}getCategoryIcon(t){return{tab:"\u229E",navigation:"\u25CE",bookmark:"\u2605",history:"\u25F7",session:"\u21A9",snippet:"\u2702",command:"\u26A1",search:"\u{1F50D}"}[t]||"\u2022"}highlightSelected(){this.resultsList.querySelectorAll(".hatch-result-item").forEach((o,n)=>{let a=o;n===this.selectedIndex?(a.classList.add("selected"),a.setAttribute("aria-selected","true"),a.scrollIntoView({block:"nearest"})):(a.classList.remove("selected"),a.setAttribute("aria-selected","false"))})}onKeyDown(t){switch(t.key){case"ArrowDown":t.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.results.length-1),this.highlightSelected();break;case"ArrowUp":t.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.highlightSelected();break;case"Enter":t.preventDefault(),this.executeSelected(t.metaKey||t.ctrlKey);break;case"Escape":t.preventDefault(),this.close();break;case"Tab":t.preventDefault(),this.results[this.selectedIndex]&&(this.input.value=this.results[this.selectedIndex].item.name,this.updateResults());break;case" ":if(this.input.value===""||this.input.value.startsWith("@")){let o=this.results[this.selectedIndex];o&&o.item.category==="tab"&&(t.preventDefault(),this.toggleSelect(o.item.id))}break}}toggleSelect(t){this.selectedItems.has(t)?this.selectedItems.delete(t):this.selectedItems.add(t),this.renderResults(),this.updateBatchBar()}updateBatchBar(){if(!this.batchBar)return;let t=this.selectedItems.size;if(t===0){this.batchBar.style.display="none";return}this.batchBar.style.display="flex",this.batchBar.innerHTML=`
      <span class="hatch-batch-count">${t} tab${t>1?"s":""} selected</span>
      <div class="hatch-batch-actions">
        <button class="hatch-batch-btn" data-action="close">Close</button>
        <button class="hatch-batch-btn" data-action="group">Group</button>
        <button class="hatch-batch-btn" data-action="pin">Pin</button>
        <button class="hatch-batch-btn" data-action="suspend">Suspend</button>
      </div>
    `,this.batchBar.querySelectorAll(".hatch-batch-btn").forEach(o=>{o.addEventListener("click",()=>{let n=o.dataset.action;this.executeBatchAction(n||"")})})}async executeBatchAction(t){let o=[];for(let a of this.selectedItems){let s=a.match(/^switch-tab-(\d+)$/);s&&o.push(parseInt(s[1],10))}if(o.length===0)return;let{sendMessage:n}=await Promise.resolve().then(()=>(x(),D));switch(t){case"close":for(let a of o)n({type:"CLOSE_TAB",tabId:a});break;case"group":{let a=`Group (${o.length})`,s=await n({type:"CREATE_TAB_GROUP",title:a,color:"blue"});if(s?.groupId)for(let c of o)n({type:"ADD_TAB_TO_GROUP",tabId:c,groupId:s.groupId});break}case"pin":for(let a of o)n({type:"PIN_TAB",tabId:a,pinned:!0});break;case"suspend":for(let a of o)n({type:"SUSPEND_TAB",tabId:a});break}this.selectedItems.clear(),this.updateBatchBar(),this.close()}executeSelected(t=!1){let o=this.results[this.selectedIndex];if(!o)return;let n={query:this.input.value,metaKey:t,close:()=>this.close()};try{this.registry.trackExecution(o.item.id),o.item.action(n)}catch(a){console.error("[Hatch] Command execution error:",a)}}};var _=null;function At(){_||(_=new L)}document.addEventListener("keydown",e=>{(navigator.platform.toUpperCase().includes("MAC")?e.metaKey:e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),e.stopPropagation(),_||At(),_.toggle())},!0);chrome.runtime.onMessage.addListener(e=>{e.type==="OPEN_PALETTE"&&(_||At(),_.toggle())});dt();})();
//# sourceMappingURL=index.js.map
