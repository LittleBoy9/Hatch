"use strict";(()=>{var Bt=Object.create;var N=Object.defineProperty;var $t=Object.getOwnPropertyDescriptor;var Ot=Object.getOwnPropertyNames;var zt=Object.getPrototypeOf,Dt=Object.prototype.hasOwnProperty;var Ut=(e,t)=>()=>(e&&(t=e(e=0)),t);var Gt=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),Ft=(e,t)=>{for(var a in t)N(e,a,{get:t[a],enumerable:!0})},jt=(e,t,a,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of Ot(t))!Dt.call(e,n)&&n!==a&&N(e,n,{get:()=>t[n],enumerable:!(o=$t(t,n))||o.enumerable});return e};var Kt=(e,t,a)=>(a=e!=null?Bt(zt(e)):{},jt(t||!e||!e.__esModule?N(a,"default",{value:e,enumerable:!0}):a,e));var j={};Ft(j,{getTabCommands:()=>B,sendMessage:()=>i,staticTabCommands:()=>$});function i(e){return new Promise(t=>{if(!chrome.runtime?.id){t(void 0);return}try{chrome.runtime.sendMessage(e,a=>{if(chrome.runtime.lastError){t(void 0);return}t(a)})}catch{t(void 0)}})}function Wt(e){if(e.favIconUrl&&e.favIconUrl.startsWith("http"))return e.favIconUrl;try{return`https://www.google.com/s2/favicons?domain=${new URL(e.url).hostname}&sz=32`}catch{return""}}function qt(e){try{let t=new URL(e),a=t.pathname==="/"?"":t.pathname,o=t.hostname+a;return o.length>60?o.slice(0,57)+"...":o}catch{return e.slice(0,60)}}async function B(){let e=await i({type:"GET_ALL_TABS"});return e?e.map(t=>({id:`switch-tab-${t.id}`,name:t.title||"Untitled",description:qt(t.url),keywords:[t.title,t.url].filter(Boolean),icon:Wt(t),category:"tab",prefix:"@",action:a=>{a.metaKey?i({type:"DUPLICATE_TAB",tabId:t.id}):i({type:"SWITCH_TAB",tabId:t.id,windowId:t.windowId}),a.close()}})):[]}var $,w=Ut(()=>{"use strict";$=[{id:"new-tab",name:"New Tab",description:"Open a new blank tab",keywords:["new","tab","create","open"],icon:"\u2795",category:"tab",action:e=>{i({type:"CREATE_TAB"}),e.close()}},{id:"close-tab",name:"Close Current Tab",description:"Close the active tab",keywords:["close","tab","remove","kill"],icon:"\u2715",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"CLOSE_TAB",tabId:t.id}),e.close()}},{id:"duplicate-tab",name:"Duplicate Tab",description:"Duplicate the current tab",keywords:["duplicate","clone","copy","tab"],icon:"\u29C9",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"DUPLICATE_TAB",tabId:t.id}),e.close()}},{id:"pin-tab",name:"Pin / Unpin Tab",description:"Toggle pin on the current tab",keywords:["pin","unpin","tab","lock"],icon:"\u{1F4CC}",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"PIN_TAB",tabId:t.id,pinned:!t.pinned}),e.close()}},{id:"mute-tab",name:"Mute / Unmute Tab",description:"Toggle mute on the current tab",keywords:["mute","unmute","sound","audio","silence","tab"],icon:"\u{1F507}",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});if(t?.id&&t.id!==-1){let a=t.mutedInfo?.muted??!1;i({type:"MUTE_TAB",tabId:t.id,muted:!a})}e.close()}},{id:"move-tab-start",name:"Move Tab to Start",description:"Move current tab to the beginning",keywords:["move","tab","start","first","beginning","left"],icon:"\u21E4",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"MOVE_TAB",tabId:t.id,index:0}),e.close()}},{id:"move-tab-end",name:"Move Tab to End",description:"Move current tab to the end",keywords:["move","tab","end","last","right"],icon:"\u21E5",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"MOVE_TAB",tabId:t.id,index:-1}),e.close()}},{id:"move-tab-new-window",name:"Move Tab to New Window",description:"Detach current tab into its own window",keywords:["move","tab","window","detach","separate"],icon:"\u2197",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"MOVE_TAB_TO_WINDOW",tabId:t.id}),e.close()}},{id:"close-other-tabs",name:"Close Other Tabs",description:"Close all tabs except the current one (keeps pinned)",keywords:["close","other","tabs","all","clean"],icon:"\u{1F9F9}",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"CLOSE_OTHER_TABS",tabId:t.id}),e.close()}},{id:"close-tabs-right",name:"Close Tabs to the Right",description:"Close all tabs after the current one (keeps pinned)",keywords:["close","tabs","right","after"],icon:"\u27F9",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"CLOSE_TABS_RIGHT",tabId:t.id,index:t.index}),e.close()}},{id:"close-duplicate-tabs",name:"Close Duplicate Tabs",description:"Close tabs with the same URL (keeps one of each)",keywords:["close","duplicate","tabs","dedupe","clean"],icon:"\u267B",category:"tab",action:e=>{i({type:"CLOSE_DUPLICATE_TABS"}),e.close()}}]});var It=Gt(G=>{"use strict";var S=Rt;(function(e,t){let a=Rt,o=e();for(;;)try{if(parseInt(a(238))/1*(-parseInt(a(230))/2)+parseInt(a(263))/3+-parseInt(a(242))/4*(-parseInt(a(241))/5)+parseInt(a(209))/6+parseInt(a(186))/7+parseInt(a(190))/8*(-parseInt(a(182))/9)+-parseInt(a(222))/10===t)break;o.push(o.shift())}catch{o.push(o.shift())}})(L,699015);Object[S(208)](G,S(200),{value:!0}),G[S(237)]=ce;function _t(e,t,a){let o=S,n={ULjMY:function(h,m){return h===m},tPFvU:"string",dpNEz:function(h,m){return h(m)},JAnPP:function(h,m,y,C){return h(m,y,C)},zQNqE:function(h,m){return h===m},glkMh:function(h,m){return h-m},vhxcg:function(h,m){return h/m},HoAJF:function(h,m){return h/m},tqfcr:function(h,m){return h+m},joWlF:function(h,m){return h+m},RyDcy:function(h,m){return h*m},jxOwK:function(h,m){return h*m},WaEek:function(h,m){return h<m},lLdXU:"pEztz",NBWRI:o(217),VKceq:function(h,m){return h===m},KdFWD:function(h,m){return h===m},fBqnS:o(231),BuIaj:function(h,m){return h/m},VzIBk:function(h,m){return h+m},LhfUv:function(h,m){return h*m},wXGvJ:function(h,m){return h/m},JxEGp:function(h,m){return h*m}},r=a?e:e[o(236)](),s=a?t:t.toLowerCase();if(n.ULjMY(r[o(192)],0)||n[o(264)](s[o(192)],0))return{score:0,matches:[]};if(n[o(177)](r,s))return{score:1,matches:Array[o(249)]({length:s[o(192)]},(h,m)=>m)};if(s[o(178)](r)){let h=s[o(255)](r),m=n.glkMh(1,n[o(232)](h,s.length)),y=n[o(223)](r[o(192)],s[o(192)]),C=n[o(233)](n.joWlF(.8,n[o(187)](.1,m)),n[o(256)](.1,y)),k=Array[o(249)]({length:r.length},(T,v)=>h+v);return{score:C,matches:k}}let l=0,u=0,g=0,b=-1,p=[];for(let h=0;n[o(203)](h,s[o(192)])&&n.WaEek(l,r.length);h++)if(n.ULjMY(s[h],r[l]))if(n[o(219)]===n[o(219)]){let m=n[o(240)][o(210)]("|"),y=0;for(;;){switch(m[y++]){case"0":n.VKceq(b,-1)&&(b=h);continue;case"1":g++;continue;case"2":u+=n[o(256)](g,g);continue;case"3":l++;continue;case"4":p[o(221)](h);continue}break}}else return{score:1,matches:_0x4c2ae4[o(249)]({length:_0x465fbf[o(192)]},(m,y)=>y)};else if(n[o(196)](o(260),n[o(254)])){let m=n[o(264)](typeof _0x36265d,n[o(248)])?_0x54584d:n[o(215)](_0x5f5315,_0x10eb5d),y=n[o(216)](_0x46a5c5,_0x16e2e0,m,_0x1322b4);_0x2adcc8=y.score,_0x916600=y.matches}else g=0;if(n.WaEek(l,r.length))return{score:0,matches:[]};let f=r.length*r[o(192)],x=u/f,d=n.glkMh(1,n[o(252)](b,s[o(192)]));x=n[o(180)](n[o(256)](x,.7),n[o(218)](d,.15));let c=n[o(224)](r.length,s[o(192)]);return x+=n[o(225)](c,.15),{score:Math[o(211)](x,.79),matches:p}}function se(e){let t=S,a={ewjgb:function(n,r){return n+r},eRwsm:function(n,r){return n*r},JNabM:function(n,r){return n-r},CcsMi:function(n,r){return n/r}},o=Math[t(228)](1,Math[t(211)](10,e));return a[t(246)](.05,a[t(247)](a[t(189)](o,1),a[t(199)](.69,9)))}function ce(e,t){let a=S,o={OCNGH:a(205),FAlFV:function(d,c,h,m){return d(c,h,m)},VnhzW:function(d,c){return d>c},GPNkv:function(d,c){return d-c},ygePP:function(d,c){return d/c},FwZgB:function(d,c){return d+c},dLLhV:function(d,c){return d+c},WfNHg:function(d,c){return d*c},FOhRW:function(d,c){return d===c},ngSkN:function(d,c){return d===c},OXIkU:a(191),KDZvF:a(261),ieDQu:"LicuP",WhMvg:a(258),lKQEM:a(212),WvaSz:function(d,c){return d>c},stkDt:a(245),aPDgo:"bcDpa",OVjHH:function(d,c){return d(c)},EpeDW:function(d,c){return d>c},samQR:a(193),MvRQj:a(214),wtmhE:function(d,c){return d===c},ijehV:function(d,c){return d!==c},ILhdN:function(d,c){return d===c},KsrfU:function(d,c){return d!==c},bIHXv:function(d,c){return d!==c},gKvwi:function(d,c){return d!==c},CPaMk:function(d,c){return d===c}};var n,r,s;let l=(n=o[a(227)](t,null)||o[a(197)](t,void 0)?void 0:t[a(253)])!==null&&n!==void 0?n:5,u=o.ijehV(r=o.ngSkN(t,null)||o.ILhdN(t,void 0)?void 0:t[a(239)],null)&&o.KsrfU(r,void 0)?r:!1,g=o[a(244)](s=o[a(227)](t,null)||t===void 0?void 0:t[a(188)],null)&&o[a(185)](s,void 0)?s:0,b=o.OVjHH(se,l),p=!(o[a(183)](t,null)||t===void 0)&&t[a(251)]?Array.isArray(t[a(251)])?t.key:[t[a(251)]]:null;function f(d){let c=a,h={PBhfx:function(m,y){return m===y},KozNo:"2|0|3|1|4",kbrKR:function(m,y){return o.FOhRW(m,y)},sCgvb:function(m,y){return m*y}};if(o.ngSkN(o.OXIkU,o[c(262)])){let m=_0x49bf17[_0x5a8313];if(typeof m===o.OCNGH){let y=o[c(213)](_0x44d0a2,_0x395a26,m,_0x44114f);o[c(179)](y[c(234)],_0x5bcc4b)&&(_0x31ed23=y[c(234)],_0x4978c7=y.matches)}}else{if(!d||o[c(197)](d.trim().length,0))return[];let m=[];for(let y of e)if(o.FOhRW(o.ieDQu,"pVbUC")){let C=_0x24e9b0[c(255)](_0x2ed60a),k=o[c(229)](1,o.ygePP(C,_0x5b4224[c(192)])),T=o[c(181)](_0x4a6fb8[c(192)],_0x59c99b[c(192)]),v=o.FwZgB(o[c(206)](.8,o.WfNHg(.1,k)),.1*T),_=_0x7a10a5[c(249)]({length:_0x5e1148.length},(F,P)=>C+P);return{score:v,matches:_}}else{let C=0,k=[];if(p)for(let T of p){let v=y[T];if(typeof v===o.OCNGH)if(o[c(197)](o[c(243)],o.lKQEM))_0x33c4cc=0;else{let _=o.FAlFV(_t,d,v,u);if(o.WvaSz(_[c(234)],C))if(o[c(257)]!==o.aPDgo)C=_[c(234)],k=_[c(198)];else if(h[c(201)](_0x4e284f[_0x1482bc],_0x2745bf[_0x986de5])){let F=h[c(194)].split("|"),P=0;for(;;){switch(F[P++]){case"0":_0x5b58bc++;continue;case"1":_0x4586ee[c(221)](_0x574df8);continue;case"2":h[c(259)](_0xfc7c32,-1)&&(_0x471884=_0x4e7633);continue;case"3":_0x584e6a+=h[c(184)](_0x181650,_0x35f24c);continue;case"4":_0x57719f++;continue}break}}else _0x1bcbc6=0}}else{let T=typeof y===o[c(250)]?y:o[c(202)](String,y),v=o[c(213)](_t,d,T,u);C=v[c(234)],k=v.matches}C>=b&&m[c(221)]({item:y,score:C,matches:k})}return m[c(207)]((y,C)=>C[c(234)]-y[c(234)]),o[c(226)](g,0)?o[c(220)]!==o.MvRQj?m.slice(0,g):_0x5e751e[c(195)](0,_0x488812):m}}let x=d=>{let c=a;return f(d).map(h=>h[c(204)])};return x[a(235)]=d=>o[a(202)](f,d),x}function Rt(e,t){return e=e-177,L()[e]}function L(){let e=["bIHXv","jOwfX","ewjgb","eRwsm","tPFvU","from","OCNGH","key","BuIaj","threshold","fBqnS","indexOf","jxOwK","stkDt","BBmpj","kbrKR","YAyVZ","cQLzV","KDZvF","3951930RWBuGR","ULjMY","zQNqE","includes","VnhzW","VzIBk","ygePP","6426999nBKXHv","CPaMk","sCgvb","gKvwi","4273801cXObMr","RyDcy","maxResults","JNabM","8pywgLO","jkpGT","length","fStBN","KozNo","slice","KdFWD","ngSkN","matches","CcsMi","__esModule","PBhfx","OVjHH","WaEek","item","string","dLLhV","sort","defineProperty","1051092GLggxZ","split","min","lhfIm","FAlFV","BmevM","dpNEz","JAnPP","0|1|2|4|3","LhfUv","lLdXU","samQR","push","7685350TXzNXU","HoAJF","wXGvJ","JxEGp","EpeDW","wtmhE","max","GPNkv","7946FrirtZ","OKIwH","vhxcg","tqfcr","score","search","toLowerCase","createFuzzySearch","54TPVJTI","caseSensitive","NBWRI","730ftRsGz","8032TdKSYJ","WhMvg"];return L=function(){return e},L()}});w();w();function K(e){return{id:"search-google",name:`Search Google for "${e}"`,description:"Press Enter to search",icon:"\u{1F50D}",category:"search",action:t=>{let a=`https://www.google.com/search?q=${encodeURIComponent(e)}`;t.metaKey?i({type:"CREATE_TAB",url:a}):window.location.href=a,t.close()}}}function W(e){let t=e;if(/^[\w-]+(\.[\w-]+)+/.test(e)&&!e.includes(" "))t=e.startsWith("http")?e:`https://${e}`;else if(e.startsWith("http://")||e.startsWith("https://"))t=e;else return null;try{new URL(t)}catch{return null}return{id:"go-to-url",name:`Go to ${e}`,description:t,icon:"\u{1F310}",category:"navigation",action:a=>{a.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,a.close()}}}function O(e){chrome.storage.local.get("settings",t=>{let a=t?.settings||{};chrome.storage.local.set({settings:{...a,theme:e}})})}var q=[{id:"theme-auto",name:"Theme: System Auto",description:"Follow system dark/light preference",keywords:["theme","auto","system","appearance"],icon:"\u{1F317}",category:"command",action:e=>{O("auto"),e.close()}},{id:"theme-dark",name:"Theme: Dark",description:"Always use dark theme",keywords:["theme","dark","night","appearance"],icon:"\u{1F319}",category:"command",action:e=>{O("dark"),e.close()}},{id:"theme-light",name:"Theme: Light",description:"Always use light theme",keywords:["theme","light","day","appearance"],icon:"\u2600",category:"command",action:e=>{O("light"),e.close()}}],V=[{id:"open-settings",name:"Open Hatch Settings",description:"Manage snippets, aliases, search engines, and preferences",keywords:["settings","options","preferences","config"],icon:"\u2699",category:"command",action:e=>{chrome.runtime.sendMessage({type:"OPEN_OPTIONS"}),e.close()}}],X=[{id:"reload-page",name:"Reload Page",description:"Reload the current page",keywords:["reload","refresh","page"],icon:"\u21BB",category:"navigation",action:e=>{location.reload(),e.close()}},{id:"go-back",name:"Go Back",description:"Navigate back in history",keywords:["back","previous","history"],icon:"\u2190",category:"navigation",action:e=>{history.back(),e.close()}},{id:"go-forward",name:"Go Forward",description:"Navigate forward in history",keywords:["forward","next","history"],icon:"\u2192",category:"navigation",action:e=>{history.forward(),e.close()}},{id:"scroll-top",name:"Scroll to Top",description:"Jump to the top of the page",keywords:["scroll","top","up","beginning"],icon:"\u2B06",category:"navigation",action:e=>{window.scrollTo({top:0,behavior:"smooth"}),e.close()}},{id:"scroll-bottom",name:"Scroll to Bottom",description:"Jump to the bottom of the page",keywords:["scroll","bottom","down","end"],icon:"\u2B07",category:"navigation",action:e=>{window.scrollTo({top:document.body.scrollHeight,behavior:"smooth"}),e.close()}},{id:"copy-url",name:"Copy Current URL",description:"Copy the page URL to clipboard",keywords:["copy","url","link","clipboard"],icon:"\u{1F4CB}",category:"navigation",action:async e=>{await navigator.clipboard.writeText(window.location.href),e.close()}}];w();function J(e){try{let t=new URL(e),a=t.pathname==="/"?"":t.pathname,o=t.hostname+a;return o.length>55?o.slice(0,52)+"...":o}catch{return e.slice(0,55)}}function Vt(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}async function Y(){let e=await i({type:"GET_ALL_BOOKMARKS"});return!e||!e.length?[]:e.map(t=>{let a=t.folderPath?`${t.folderPath} \xB7 ${J(t.url)}`:J(t.url);return{id:`bookmark-${t.id}`,name:t.title||"Untitled",description:a,keywords:[t.title,t.url,t.folderPath].filter(Boolean),icon:Vt(t.url),category:"bookmark",prefix:"#",action:o=>{o.metaKey?i({type:"CREATE_TAB",url:t.url}):window.location.href=t.url,o.close()}}})}w();function Xt(e){let t=Math.floor((Date.now()-e)/1e3);if(t<60)return"just now";let a=Math.floor(t/60);if(a<60)return`${a}m ago`;let o=Math.floor(a/60);if(o<24)return`${o}h ago`;let n=Math.floor(o/24);return n===1?"yesterday":n<7?`${n}d ago`:`${Math.floor(n/7)}w ago`}function Jt(e){try{let t=new URL(e),a=t.pathname==="/"?"":t.pathname,o=t.hostname+a;return o.length>50?o.slice(0,47)+"...":o}catch{return e.slice(0,50)}}function Yt(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}async function Q(){let e=await i({type:"SEARCH_HISTORY",query:"",maxResults:50});return!e||!e.length?[]:e.map(t=>{let a=Xt(t.lastVisitTime),o=t.visitCount>1?` \xB7 ${t.visitCount} visits`:"";return{id:`history-${t.id}`,name:t.title||"Untitled",description:`${a}${o} \xB7 ${Jt(t.url)}`,keywords:[t.title,t.url].filter(Boolean),icon:Yt(t.url),category:"history",prefix:"/",action:n=>{n.metaKey?i({type:"CREATE_TAB",url:t.url}):window.location.href=t.url,n.close()}}})}w();function Qt(e){let t=Math.floor((Date.now()-e)/1e3);if(t<60)return"just now";let a=Math.floor(t/60);if(a<60)return`${a}m ago`;let o=Math.floor(a/60);if(o<24)return`${o}h ago`;let n=Math.floor(o/24);return n===1?"yesterday":`${n}d ago`}function Zt(e){try{return`https://www.google.com/s2/favicons?domain=${new URL(e).hostname}&sz=32`}catch{return""}}async function Z(){let e=await i({type:"GET_RECENTLY_CLOSED",maxResults:25});return!e||!e.length?[]:e.map(t=>({id:`restore-${t.sessionId}`,name:t.title||"Untitled",description:`Closed ${Qt(t.closedAt)}`,keywords:[t.title,t.url].filter(Boolean),icon:t.favIconUrl||Zt(t.url),category:"session",action:a=>{i({type:"RESTORE_SESSION",sessionId:t.sessionId}),a.close()}}))}w();var te={grey:"\u26AA",blue:"\u{1F535}",red:"\u{1F534}",yellow:"\u{1F7E1}",green:"\u{1F7E2}",pink:"\u{1F7E3}",purple:"\u{1F7E3}",cyan:"\u{1F535}",orange:"\u{1F7E0}"},tt=["grey","blue","red","yellow","green","pink","purple","cyan","orange"];async function et(){let e=await i({type:"GET_TAB_GROUPS"});if(!e||!e.length)return[];let t=[];for(let a of e){let o=te[a.color]||"\u26AA",n=a.title||"Unnamed Group";t.push({id:`group-toggle-${a.id}`,name:`${a.collapsed?"Expand":"Collapse"} Group: ${n}`,description:`${o} ${a.color} group`,keywords:["group","tab","collapse","expand",n,a.color],icon:o,category:"tab",action:r=>{i({type:"TOGGLE_GROUP_COLLAPSE",groupId:a.id,collapsed:!a.collapsed}),r.close()}}),t.push({id:`group-add-${a.id}`,name:`Add Tab to Group: ${n}`,description:`${o} Move current tab into this group`,keywords:["add","tab","group",n],icon:"\u2795",category:"tab",action:async r=>{let s=await i({type:"GET_CURRENT_TAB"});s?.id&&s.id!==-1&&i({type:"ADD_TAB_TO_GROUP",tabId:s.id,groupId:a.id}),r.close()}}),t.push({id:`group-ungroup-${a.id}`,name:`Ungroup: ${n}`,description:`${o} Dissolve this tab group`,keywords:["ungroup","dissolve","remove","group",n],icon:"\u{1F513}",category:"tab",action:r=>{i({type:"UNGROUP",groupId:a.id}),r.close()}})}return t}var ot=[{id:"create-tab-group",name:"Create Tab Group",description:"Group the current tab into a new group",keywords:["create","new","tab","group"],icon:"\u{1F4C1}",category:"tab",action:e=>{let t=e.query.replace(/^>\s*create\s*tab\s*group\s*/i,"").trim()||"New Group",a=tt[Math.floor(Math.random()*tt.length)];i({type:"CREATE_TAB_GROUP",title:t,color:a}),e.close()}},{id:"remove-tab-from-group",name:"Remove Tab from Group",description:"Ungroup the current tab",keywords:["remove","ungroup","tab","detach"],icon:"\u21A9",category:"tab",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&i({type:"REMOVE_TAB_FROM_GROUP",tabId:t.id}),e.close()}}];w();var ee=[{keyword:"g",name:"Google",urlTemplate:"https://www.google.com/search?q=%s",icon:"\u{1F50D}"},{keyword:"yt",name:"YouTube",urlTemplate:"https://www.youtube.com/results?search_query=%s",icon:"\u25B6"},{keyword:"gh",name:"GitHub",urlTemplate:"https://github.com/search?q=%s",icon:"\u{1F419}"},{keyword:"npm",name:"NPM",urlTemplate:"https://www.npmjs.com/search?q=%s",icon:"\u{1F4E6}"},{keyword:"mdn",name:"MDN Web Docs",urlTemplate:"https://developer.mozilla.org/en-US/search?q=%s",icon:"\u{1F4D8}"},{keyword:"so",name:"Stack Overflow",urlTemplate:"https://stackoverflow.com/search?q=%s",icon:"\u{1F4DA}"},{keyword:"w",name:"Wikipedia",urlTemplate:"https://en.wikipedia.org/w/index.php?search=%s",icon:"\u{1F310}"},{keyword:"r",name:"Reddit",urlTemplate:"https://www.reddit.com/search/?q=%s",icon:"\u{1F4AC}"},{keyword:"tw",name:"X (Twitter)",urlTemplate:"https://x.com/search?q=%s",icon:"\u{1D54F}"},{keyword:"amz",name:"Amazon",urlTemplate:"https://www.amazon.com/s?k=%s",icon:"\u{1F6D2}"},{keyword:"maps",name:"Google Maps",urlTemplate:"https://www.google.com/maps/search/%s",icon:"\u{1F5FA}"},{keyword:"drive",name:"Google Drive",urlTemplate:"https://drive.google.com/drive/search?q=%s",icon:"\u{1F4BE}"},{keyword:"img",name:"Google Images",urlTemplate:"https://www.google.com/search?tbm=isch&q=%s",icon:"\u{1F5BC}"},{keyword:"news",name:"Google News",urlTemplate:"https://news.google.com/search?q=%s",icon:"\u{1F4F0}"},{keyword:"arxiv",name:"arXiv",urlTemplate:"https://arxiv.org/search/?query=%s",icon:"\u{1F4C4}"},{keyword:"pypi",name:"PyPI",urlTemplate:"https://pypi.org/search/?q=%s",icon:"\u{1F40D}"},{keyword:"crates",name:"crates.io",urlTemplate:"https://crates.io/search?q=%s",icon:"\u{1F980}"},{keyword:"imdb",name:"IMDb",urlTemplate:"https://www.imdb.com/find/?q=%s",icon:"\u{1F3AC}"}],R=null;async function at(){return R||new Promise(e=>{chrome.storage.local.get("customSearchEngines",t=>{let a=t?.customSearchEngines||[],o=new Set(a.map(r=>r.keyword)),n=[...a.map(r=>({...r,custom:!0})),...ee.filter(r=>!o.has(r.keyword))];R=n,setTimeout(()=>{R=null},5e3),e(n)})})}function nt(e){let t=e.match(/^\/engine\s+(\S+)\s+(\S+)\s+(\S+.*)$/i);if(!t)return null;let[,a,o,n]=t;return n.includes("%s")?{id:"create-engine",name:`Add search engine: ${a} \u2192 ${o}`,description:`URL: ${n}`,keywords:["engine","search","add","custom"],icon:"\u{1F527}",category:"command",action:r=>{chrome.storage.local.get("customSearchEngines",s=>{let u=(s?.customSearchEngines||[]).filter(g=>g.keyword!==a);u.push({keyword:a,name:o,urlTemplate:n,icon:"\u{1F50E}",custom:!0}),chrome.storage.local.set({customSearchEngines:u}),R=null}),r.close()}}:null}async function rt(e){let t=e.indexOf(" ");if(t===-1)return null;let a=e.slice(0,t).toLowerCase(),o=e.slice(t+1).trim();if(!o)return null;let r=(await at()).find(l=>l.keyword===a);if(!r)return null;let s=r.urlTemplate.replace("%s",encodeURIComponent(o));return{id:`site-search-${r.keyword}`,name:`Search ${r.name} for "${o}"`,description:`${r.keyword} \u2192 ${r.name}`,keywords:[r.keyword,r.name,o],icon:r.icon,category:"search",action:l=>{l.metaKey?i({type:"CREATE_TAB",url:s}):window.location.href=s,l.close()}}}async function it(e){if(!e||e.includes(" "))return[];let t=e.toLowerCase();return(await at()).filter(o=>o.keyword.startsWith(t)||o.name.toLowerCase().startsWith(t)).slice(0,3).map(o=>({id:`site-hint-${o.keyword}`,name:`${o.keyword}: Search ${o.name}`,description:`Type "${o.keyword} <query>" to search${o.custom?" (custom)":""}`,keywords:[o.keyword,o.name],icon:o.icon,category:"search",action:n=>{i({type:"CREATE_TAB",url:o.urlTemplate.replace("%s","")}),n.close()}}))}var st=[{id:"add-search-engine",name:"Add Search Engine",description:"Open the search engine editor",keywords:["add","create","search","engine","site"],icon:"\u2795",category:"command",action:e=>{e.showEditor("engine")}}];w();var ct=[{id:"copy-markdown-link",name:"Copy as Markdown Link",description:"Copy [Title](URL) to clipboard",keywords:["copy","markdown","link","md"],icon:"\u{1F4DD}",category:"command",action:async e=>{let t=document.title,a=window.location.href;await navigator.clipboard.writeText(`[${t}](${a})`),e.close()}},{id:"copy-title",name:"Copy Page Title",description:"Copy the page title to clipboard",keywords:["copy","title","name"],icon:"\u{1F4C4}",category:"command",action:async e=>{await navigator.clipboard.writeText(document.title),e.close()}},{id:"copy-all-tab-urls",name:"Copy All Tab URLs",description:"Copy URLs of all open tabs as a list",keywords:["copy","all","tabs","urls","links","list"],icon:"\u{1F4D1}",category:"command",action:async e=>{let t=await i({type:"GET_ALL_TABS"});if(t){let a=t.map(o=>o.url).join(`
`);await navigator.clipboard.writeText(a)}e.close()}},{id:"copy-all-tabs-markdown",name:"Copy All Tabs as Markdown",description:"Copy all tabs as markdown links",keywords:["copy","all","tabs","markdown","links"],icon:"\u{1F4CB}",category:"command",action:async e=>{let t=await i({type:"GET_ALL_TABS"});if(t){let a=t.map(o=>`- [${o.title}](${o.url})`).join(`
`);await navigator.clipboard.writeText(a)}e.close()}},{id:"copy-page-metadata",name:"Copy Page Metadata",description:"Copy title, description, OG tags, canonical URL",keywords:["metadata","meta","og","seo","tags","opengraph"],icon:"\u{1F3F7}",category:"command",action:async e=>{let t={};t.Title=document.title,t.URL=window.location.href;let a=document.querySelector('meta[name="description"]');a&&(t.Description=a.getAttribute("content")||"");let o=document.querySelector('link[rel="canonical"]');o&&(t.Canonical=o.getAttribute("href")||""),document.querySelectorAll('meta[property^="og:"]').forEach(r=>{let s=r.getAttribute("property")||"";t[s]=r.getAttribute("content")||""}),document.querySelectorAll('meta[name^="twitter:"]').forEach(r=>{let s=r.getAttribute("name")||"";t[s]=r.getAttribute("content")||""});let n=Object.entries(t).map(([r,s])=>`${r}: ${s}`).join(`
`);await navigator.clipboard.writeText(n),e.close()}},{id:"find-on-page",name:"Find on Page",description:"Open browser find (Ctrl+F)",keywords:["find","search","page","text","ctrl+f"],icon:"\u{1F50E}",category:"command",action:e=>{e.close(),setTimeout(()=>{document.execCommand("find")},100)}},{id:"print-page",name:"Print Page",description:"Open the print dialog",keywords:["print","pdf","save"],icon:"\u{1F5A8}",category:"command",action:e=>{e.close(),setTimeout(()=>window.print(),100)}},{id:"toggle-fullscreen",name:"Toggle Fullscreen",description:"Enter or exit fullscreen mode",keywords:["fullscreen","full","screen","maximize"],icon:"\u26F6",category:"command",action:e=>{e.close(),document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen()}},{id:"copy-selection-as-markdown",name:"Copy Selection as Markdown Quote",description:"Copy selected text as a markdown blockquote",keywords:["selection","quote","markdown","blockquote"],icon:"\u{1F4AC}",category:"command",action:async e=>{let t=window.getSelection()?.toString()||"";if(t){let a=t.split(`
`).map(n=>`> ${n}`).join(`
`),o=`

\u2014 [${document.title}](${window.location.href})`;await navigator.clipboard.writeText(a+o)}e.close()}}];w();var dt=[{id:"view-source",name:"View Page Source",description:"Open the page source in a new tab",keywords:["view","source","html","code","developer"],icon:"\u{1F9D1}\u200D\u{1F4BB}",category:"command",action:e=>{i({type:"CREATE_TAB",url:`view-source:${window.location.href}`}),e.close()}},{id:"copy-as-curl",name:"Copy Page URL as cURL",description:"Copy a cURL command for this page",keywords:["curl","copy","request","http","api","developer"],icon:"\u2318",category:"command",action:async e=>{let a=`curl -X GET '${window.location.href}' \\
  -H 'User-Agent: Mozilla/5.0'`;await navigator.clipboard.writeText(a),e.close()}},{id:"copy-page-performance",name:"Copy Page Performance Timing",description:"Copy load time breakdown to clipboard",keywords:["performance","timing","speed","load","developer"],icon:"\u23F1",category:"command",action:async e=>{let t=performance.getEntriesByType("navigation");if(t.length===0){await navigator.clipboard.writeText("Performance data not available"),e.close();return}let a=t[0],o=[`Page Performance: ${window.location.href}`,"\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",`DNS Lookup:      ${(a.domainLookupEnd-a.domainLookupStart).toFixed(0)}ms`,`TCP Connect:     ${(a.connectEnd-a.connectStart).toFixed(0)}ms`,`TLS Handshake:   ${(a.secureConnectionStart?a.connectEnd-a.secureConnectionStart:0).toFixed(0)}ms`,`Request:         ${(a.responseStart-a.requestStart).toFixed(0)}ms`,`Response:        ${(a.responseEnd-a.responseStart).toFixed(0)}ms`,`DOM Processing:  ${(a.domComplete-a.responseEnd).toFixed(0)}ms`,`DOM Interactive: ${(a.domInteractive-a.fetchStart).toFixed(0)}ms`,`DOM Complete:    ${(a.domComplete-a.fetchStart).toFixed(0)}ms`,`Load Event:      ${(a.loadEventEnd-a.fetchStart).toFixed(0)}ms`,`Transfer Size:   ${(a.transferSize/1024).toFixed(1)}KB`];await navigator.clipboard.writeText(o.join(`
`)),e.close()}},{id:"copy-css-custom-properties",name:"Copy CSS Custom Properties",description:"Copy all CSS variables defined on :root",keywords:["css","variables","custom","properties","design","tokens"],icon:"\u{1F3A8}",category:"command",action:async e=>{let t=getComputedStyle(document.documentElement),a=[];for(let n of document.styleSheets)try{for(let r of n.cssRules){let l=r.cssText.matchAll(/--([\w-]+)\s*:/g);for(let u of l){let g=`--${u[1]}`,b=t.getPropertyValue(g).trim();b&&a.push(`${g}: ${b};`)}}}catch{}let o=[...new Set(a)];await navigator.clipboard.writeText(o.length?o.join(`
`):"No CSS custom properties found"),e.close()}},{id:"toggle-javascript",name:"List Page Scripts",description:"Copy all script sources on this page",keywords:["javascript","scripts","js","developer"],icon:"\u{1F4DC}",category:"command",action:async e=>{let a=Array.from(document.querySelectorAll("script[src]")).map(n=>n.getAttribute("src")).filter(Boolean),o=a.length?`Scripts on ${window.location.host}:
${a.join(`
`)}`:"No external scripts found";await navigator.clipboard.writeText(o),e.close()}},{id:"count-dom-elements",name:"Count DOM Elements",description:"Show total elements, depth, and heaviest nodes",keywords:["dom","elements","count","nodes","developer","performance"],icon:"\u{1F333}",category:"command",action:async e=>{let t=document.querySelectorAll("*"),a=t.length,o=0,n=(u,g)=>{g>o&&(o=g);let b=g;for(let p of u.children){let f=n(p,g+1);f>b&&(b=f)}return b};n(document.documentElement,0);let r={};t.forEach(u=>{let g=u.tagName.toLowerCase();r[g]=(r[g]||0)+1});let s=Object.entries(r).sort((u,g)=>g[1]-u[1]).slice(0,10).map(([u,g])=>`  ${u}: ${g}`).join(`
`),l=[`DOM Analysis: ${window.location.href}`,"\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",`Total Elements: ${a}`,`Max Nesting:    ${o} levels`,"","Top Tags:",s].join(`
`);await navigator.clipboard.writeText(l),e.close()}},{id:"list-event-listeners",name:"Copy Page Links",description:"Copy all links (anchors) on this page",keywords:["links","anchors","hrefs","urls","developer"],icon:"\u{1F517}",category:"command",action:async e=>{let t=Array.from(document.querySelectorAll("a[href]")),a=[...new Set(t.map(n=>n.getAttribute("href")).filter(Boolean))],o=a.length?`Links on ${window.location.host} (${a.length}):
${a.join(`
`)}`:"No links found";await navigator.clipboard.writeText(o),e.close()}},{id:"copy-cookies-summary",name:"Copy Cookies Summary",description:"Copy cookie names and sizes for this domain",keywords:["cookies","cookie","storage","developer"],icon:"\u{1F36A}",category:"command",action:async e=>{let t=document.cookie.split(";").filter(n=>n.trim());if(t.length===0){await navigator.clipboard.writeText("No cookies set for this domain"),e.close();return}let a=t.map(n=>{let[r]=n.trim().split("=");return`${r.trim()} (${n.trim().length} chars)`}),o=`Cookies for ${window.location.host} (${t.length}):
${a.join(`
`)}`;await navigator.clipboard.writeText(o),e.close()}},{id:"copy-local-storage-keys",name:"Copy Local Storage Keys",description:"Copy all localStorage keys for this domain",keywords:["localstorage","storage","keys","developer"],icon:"\u{1F4BE}",category:"command",action:async e=>{let t=[];for(let o=0;o<localStorage.length;o++){let n=localStorage.key(o);n&&t.push(n)}let a=t.length?`localStorage keys for ${window.location.host} (${t.length}):
${t.join(`
`)}`:"No localStorage data for this domain";await navigator.clipboard.writeText(a),e.close()}}];w();var lt=[{id:"suspend-other-tabs",name:"Suspend Other Tabs",description:"Discard inactive tabs to free memory",keywords:["suspend","discard","memory","free","sleep","other"],icon:"\u{1F4A4}",category:"tab",action:async e=>{await i({type:"SUSPEND_OTHER_TABS"}),e.close()}},{id:"suspend-all-tabs",name:"Suspend All Background Tabs",description:"Discard all tabs except the active one",keywords:["suspend","discard","all","memory","free","sleep"],icon:"\u{1F634}",category:"tab",action:async e=>{await i({type:"SUSPEND_ALL_TABS"}),e.close()}}];w();function oe(e){let t=new Date;return e.replace(/\{\{date\}\}/g,t.toLocaleDateString()).replace(/\{\{time\}\}/g,t.toLocaleTimeString()).replace(/\{\{datetime\}\}/g,t.toLocaleString()).replace(/\{\{iso\}\}/g,t.toISOString()).replace(/\{\{url\}\}/g,window.location.href).replace(/\{\{title\}\}/g,document.title).replace(/\{\{domain\}\}/g,window.location.hostname).replace(/\{\{year\}\}/g,String(t.getFullYear())).replace(/\{\{month\}\}/g,String(t.getMonth()+1).padStart(2,"0")).replace(/\{\{day\}\}/g,String(t.getDate()).padStart(2,"0"))}function ae(e){let t=document.activeElement;if(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement){let a=t.selectionStart??t.value.length,o=t.selectionEnd??t.value.length;t.value=t.value.slice(0,a)+e+t.value.slice(o),t.selectionStart=t.selectionEnd=a+e.length,t.dispatchEvent(new Event("input",{bubbles:!0}))}else t instanceof HTMLElement&&t.isContentEditable?document.execCommand("insertText",!1,e):navigator.clipboard.writeText(e)}async function z(){let e=await i({type:"GET_SNIPPETS"});return!e||e.length===0?[]:e.map(t=>({id:`snippet-${t.id}`,name:t.name,description:`${t.trigger} \u2192 ${t.body.slice(0,50)}${t.body.length>50?"...":""}`,keywords:["snippet",t.trigger,t.name],icon:"\u2702",category:"snippet",action:a=>{let o=oe(t.body);a.close(),setTimeout(()=>ae(o),150)}}))}var mt=[{id:"create-snippet",name:"Create Snippet",description:"Open the snippet editor",keywords:["create","new","snippet","add"],icon:"\u2795",category:"snippet",action:e=>{e.showEditor("snippet")}}];w();function ne(e){let t=Date.now()-e,a=Math.floor(t/6e4);if(a<1)return"just now";if(a<60)return`${a}m ago`;let o=Math.floor(a/60);if(o<24)return`${o}h ago`;let n=Math.floor(o/24);return n<7?`${n}d ago`:new Date(e).toLocaleDateString()}async function D(){let e=await i({type:"GET_NOTES"});return!e||e.length===0?[]:e.slice(0,20).map(t=>({id:`note-${t.id}`,name:t.text.slice(0,80),description:`${ne(t.createdAt)} \xB7 ${t.title||t.url}`,keywords:["note",...t.text.split(" ").slice(0,5)],icon:"\u{1F4DD}",category:"note",action:async a=>{await navigator.clipboard.writeText(t.text),a.close()}}))}function ht(e){let t=e.match(/^\/note\s+(.+)/i);if(!t)return null;let a=t[1].trim();return a?{id:"save-note",name:`Save Note: "${a}"`,description:"Press Enter to save",keywords:["note","save"],icon:"\u{1F4DD}",category:"note",action:async o=>{let n={id:`note-${Date.now()}`,text:a,url:window.location.href,title:document.title,createdAt:Date.now()};await i({type:"SAVE_NOTE",note:n}),o.close()}}:null}function pt(e){return/^\/notes?\s*$/i.test(e)}var ut=[{id:"clear-all-notes",name:"Clear All Notes",description:"Delete all saved notes",keywords:["clear","delete","all","notes"],icon:"\u{1F5D1}",category:"note",action:async e=>{let t=await i({type:"GET_NOTES"});if(t)for(let a of t)await i({type:"DELETE_NOTE",id:a.id});e.close()}}];w();var gt="";function ft(){document.addEventListener("copy",async()=>{try{await new Promise(t=>setTimeout(t,50));let e=await navigator.clipboard.readText();if(e&&e!==gt&&e.trim().length>0){gt=e;let t={id:`clip-${Date.now()}`,text:e,timestamp:Date.now(),source:window.location.hostname};i({type:"SAVE_CLIPBOARD_ITEM",item:t})}}catch{}})}function re(e){let t=Date.now()-e,a=Math.floor(t/6e4);if(a<1)return"just now";if(a<60)return`${a}m ago`;let o=Math.floor(a/60);return o<24?`${o}h ago`:`${Math.floor(o/24)}d ago`}async function yt(){let e=await i({type:"GET_CLIPBOARD_HISTORY"});return!e||e.length===0?[]:e.slice(0,30).map(t=>({id:`clip-${t.id}`,name:t.text.slice(0,80).replace(/\n/g," "),description:`${t.pinned?"\u{1F4CC} ":""}${re(t.timestamp)} \xB7 ${t.source}`,keywords:["clipboard","paste","history",...t.text.split(" ").slice(0,3)],icon:t.pinned?"\u{1F4CC}":"\u{1F4CB}",category:"clipboard",action:async a=>{await navigator.clipboard.writeText(t.text),a.close()}}))}var bt=[{id:"clear-clipboard-history",name:"Clear Clipboard History",description:"Delete all clipboard history entries",keywords:["clear","clipboard","history","delete"],icon:"\u{1F5D1}",category:"clipboard",action:async e=>{await i({type:"CLEAR_CLIPBOARD_HISTORY"}),e.close()}}];w();async function xt(){let e=await i({type:"GET_ALIASES"});return!e||e.length===0?[]:e.map(t=>({id:`alias-${t.id}`,name:t.name,description:`${t.keyword} \u2192 ${t.url}`,keywords:["alias",t.keyword,t.name],icon:"\u26A1",category:"alias",action:a=>{let o=t.url;if(o.includes("%s")){let r=a.query.trim().split(/\s+/).slice(1).join(" ");r?o=o.replace("%s",encodeURIComponent(r)):o=o.replace("%s","")}a.metaKey?i({type:"CREATE_TAB",url:o}):window.location.href=o,a.close()}}))}async function wt(e){let t=await i({type:"GET_ALIASES"});if(!t||t.length===0)return null;let a=e.trim().split(/\s+/),o=a[0].toLowerCase(),n=a.slice(1).join(" "),r=t.find(u=>u.keyword.toLowerCase()===o);if(!r)return null;let s=r.url,l=s.includes("%s");if(l&&n)s=s.replace("%s",encodeURIComponent(n));else if(l&&!n)return{id:`alias-hint-${r.id}`,name:`${r.name}: type a query`,description:`${r.keyword} <query> \u2192 ${r.url}`,keywords:[r.keyword],icon:"\u26A1",category:"alias",action:()=>{}};return{id:`alias-exec-${r.id}`,name:l?`${r.name}: ${n}`:r.name,description:s,keywords:[r.keyword],icon:"\u26A1",category:"alias",action:u=>{u.metaKey?i({type:"CREATE_TAB",url:s}):window.location.href=s,u.close()}}}function Ct(e){let t=e.match(/^\/alias\s+(\S+)\s+(\S+)(?:\s+(.+))?$/i);if(!t)return null;let a=t[1],o=t[2].startsWith("http")?t[2]:`https://${t[2]}`,n=t[3]||a;return{id:"create-alias",name:`Create Alias: "${a}" \u2192 ${o}`,description:"Press Enter to save",keywords:["alias","create"],icon:"\u26A1",category:"alias",action:async r=>{let s={id:`alias-${Date.now()}`,keyword:a,name:n,url:o};await i({type:"SAVE_ALIAS",alias:s}),r.close()}}}var vt=[{id:"create-alias",name:"Create Alias",description:"Open the alias editor",keywords:["create","new","alias","add","quicklink"],icon:"\u2795",category:"alias",action:e=>{e.showEditor("alias")}},{id:"list-aliases",name:"Manage Aliases",description:"Open settings to manage aliases",keywords:["alias","aliases","manage","list","quicklinks"],icon:"\u26A1",category:"alias",action:e=>{chrome.runtime.sendMessage({type:"OPEN_OPTIONS"}),e.close()}}];w();var kt=[{id:"workflow-cleanup",name:"Workflow: Clean Up Tabs",description:"Close duplicates \u2192 suspend inactive \u2192 report",keywords:["workflow","clean","cleanup","organize","tabs"],icon:"\u{1F9F9}",category:"command",action:async e=>{await i({type:"CLOSE_DUPLICATE_TABS"}),await i({type:"SUSPEND_OTHER_TABS"}),e.close()}},{id:"workflow-focus",name:"Workflow: Focus Mode",description:"Pin current tab \u2192 close all others \u2192 clean slate",keywords:["workflow","focus","mode","distraction","clean"],icon:"\u{1F3AF}",category:"command",action:async e=>{let t=await i({type:"GET_CURRENT_TAB"});t?.id&&t.id!==-1&&(await i({type:"PIN_TAB",tabId:t.id,pinned:!0}),await i({type:"CLOSE_OTHER_TABS",tabId:t.id})),e.close()}},{id:"workflow-share-session",name:"Workflow: Share Session",description:"Copy all tab URLs as a markdown list",keywords:["workflow","share","session","export","tabs","markdown"],icon:"\u{1F4E4}",category:"command",action:async e=>{let t=await i({type:"GET_ALL_TABS"});if(t&&t.length>0){let a=t.map(n=>`- [${n.title}](${n.url})`).join(`
`),o=`## Browser Session (${t.length} tabs)

`;await navigator.clipboard.writeText(o+a)}e.close()}},{id:"workflow-research",name:"Workflow: Research Mode",description:"Create a tab group named after your query with blank tabs",keywords:["workflow","research","mode","group","tabs"],icon:"\u{1F52C}",category:"command",action:async e=>{let t=e.query.replace(/^>\s*workflow[:\s]*research\s*mode?\s*/i,"").trim()||"Research",a=await i({type:"CREATE_TAB_GROUP",title:t,color:"blue"});if(a?.groupId)for(let o=0;o<3;o++){let n=await i({type:"CREATE_TAB",url:"chrome://newtab"});n?.id&&await i({type:"ADD_TAB_TO_GROUP",tabId:n.id,groupId:a.groupId})}e.close()}},{id:"workflow-save-restore",name:"Workflow: Save All Tabs as Bookmarks",description:"Bookmark every open tab for later",keywords:["workflow","save","bookmark","all","tabs","backup"],icon:"\u{1F4BE}",category:"command",action:async e=>{let t=await i({type:"GET_ALL_TABS"});if(t&&t.length>0){let a=t.map(o=>`${o.title}
${o.url}`).join(`

`);await navigator.clipboard.writeText(a)}e.close()}},{id:"workflow-morning",name:"Workflow: Morning Routine",description:"Open your daily sites (Gmail, Calendar, GitHub)",keywords:["workflow","morning","routine","daily","startup"],icon:"\u2600",category:"command",action:async e=>{let t=["https://mail.google.com","https://calendar.google.com","https://github.com"];for(let a of t)await i({type:"CREATE_TAB",url:a});e.close()}}];w();var ie=[{pattern:/github\.com/,commands:[{id:"gh-my-prs",name:"GitHub: My Pull Requests",description:"Open your PRs on GitHub",keywords:["github","pull","requests","pr","my"],icon:"\u{1F419}",category:"command",action:e=>{let t="https://github.com/pulls";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"gh-my-issues",name:"GitHub: My Issues",description:"Open your issues on GitHub",keywords:["github","issues","my"],icon:"\u{1F419}",category:"command",action:e=>{let t="https://github.com/issues";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"gh-notifications",name:"GitHub: Notifications",description:"Open GitHub notifications",keywords:["github","notifications","inbox"],icon:"\u{1F514}",category:"command",action:e=>{let t="https://github.com/notifications";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"gh-new-repo",name:"GitHub: New Repository",description:"Create a new repository",keywords:["github","new","repository","create","repo"],icon:"\u2795",category:"command",action:e=>{let t="https://github.com/new";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}}]},{pattern:/youtube\.com/,commands:[{id:"yt-subscriptions",name:"YouTube: Subscriptions",description:"Go to your subscriptions feed",keywords:["youtube","subscriptions","feed"],icon:"\u25B6",category:"command",action:e=>{let t="https://www.youtube.com/feed/subscriptions";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"yt-watch-later",name:"YouTube: Watch Later",description:"Go to Watch Later playlist",keywords:["youtube","watch","later","playlist"],icon:"\u23F0",category:"command",action:e=>{let t="https://www.youtube.com/playlist?list=WL";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"yt-history",name:"YouTube: Watch History",description:"Go to your watch history",keywords:["youtube","history","watched"],icon:"\u{1F4FA}",category:"command",action:e=>{let t="https://www.youtube.com/feed/history";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}}]},{pattern:/google\.com/,commands:[{id:"g-gmail",name:"Google: Open Gmail",description:"Go to Gmail inbox",keywords:["google","gmail","email","mail","inbox"],icon:"\u{1F4E7}",category:"command",action:e=>{let t="https://mail.google.com";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"g-drive",name:"Google: Open Drive",description:"Go to Google Drive",keywords:["google","drive","files","documents"],icon:"\u{1F4BE}",category:"command",action:e=>{let t="https://drive.google.com";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}},{id:"g-calendar",name:"Google: Open Calendar",description:"Go to Google Calendar",keywords:["google","calendar","schedule","events"],icon:"\u{1F4C5}",category:"command",action:e=>{let t="https://calendar.google.com";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}}]},{pattern:/reddit\.com/,commands:[{id:"reddit-saved",name:"Reddit: Saved Posts",description:"Go to your saved posts",keywords:["reddit","saved","posts","bookmarks"],icon:"\u{1F4AC}",category:"command",action:e=>{let t="https://www.reddit.com/saved";e.metaKey?i({type:"CREATE_TAB",url:t}):window.location.href=t,e.close()}}]}];function Tt(){let e=window.location.hostname,t=[];for(let a of ie)a.pattern.test(e)&&t.push(...a.commands);return t}w();var Et=[{id:"export-data",name:"Export Hatch Data",description:"Copy aliases, snippets, and settings as JSON to clipboard",keywords:["export","backup","save","json","data"],icon:"\u{1F4E4}",category:"command",action:async e=>{let[t,a,o]=await Promise.all([i({type:"GET_ALIASES"}),i({type:"GET_SNIPPETS"}),i({type:"GET_NOTES"})]),n={version:1,exportedAt:new Date().toISOString(),aliases:t||[],snippets:a||[],notes:o||[]};await navigator.clipboard.writeText(JSON.stringify(n,null,2)),e.close()}},{id:"import-data",name:"Import Hatch Data",description:"Import aliases and snippets from clipboard JSON",keywords:["import","restore","load","json","data"],icon:"\u{1F4E5}",category:"command",action:async e=>{try{let t=await navigator.clipboard.readText(),a=JSON.parse(t);if(a.version!==1){console.warn("[Hatch] Unknown import format version"),e.close();return}if(Array.isArray(a.aliases))for(let o of a.aliases)o.id&&o.keyword&&o.url&&await i({type:"SAVE_ALIAS",alias:o});if(Array.isArray(a.snippets))for(let o of a.snippets)o.id&&o.trigger&&o.body&&await i({type:"SAVE_SNIPPET",snippet:o});if(Array.isArray(a.notes))for(let o of a.notes)o.id&&o.text&&await i({type:"SAVE_NOTE",note:o})}catch(t){console.error("[Hatch] Import failed:",t)}e.close()}}];function St(e){return new Promise(t=>{chrome.runtime.sendMessage(e,a=>t(a))})}function At(e){St({type:"TRACK_USAGE",commandId:e})}function E(e){let n=Date.now()-e.lastUsed,r;return n<36e5?r=1:n<864e5?r=.8:n<6048e5?r=.5:r=.2,e.count*r}async function U(){return St({type:"GET_FRECENCY"})}var Lt=Kt(It());function I(e,t,a=0){if(!t.trim())return(a>0?e.slice(0,a):e).map(u=>({item:u,score:1,matches:[]}));let o=e.map(l=>{let u=[l.name];return l.keywords&&u.push(...l.keywords),l.description&&u.push(l.description),u.join(" ")}),n={threshold:4};return a>0&&(n.maxResults=a),(0,Lt.createFuzzySearch)(o,n).search(t).map(l=>{let u=o.indexOf(l.item);return{item:e[u],score:l.score,matches:l.matches}})}var Mt={">":"command","@":"tab","#":"bookmark","/":"history",";":"snippet"},M=class{constructor(){this.staticCommands=[];this.dynamicProviders=[];this.staticCommands=[...$,...ot,...lt,...X,...q,...V,...st,...ct,...dt,...mt,...ut,...bt,...vt,...kt,...Et],this.dynamicProviders.push(B),this.dynamicProviders.push(et),this.dynamicProviders.push(Y),this.dynamicProviders.push(Q),this.dynamicProviders.push(Z),this.dynamicProviders.push(z),this.dynamicProviders.push(D),this.dynamicProviders.push(yt),this.dynamicProviders.push(xt)}async search(t,a=0){let o=t.trim(),n=null,r=ht(o);if(r)return[{item:r,score:2,matches:[]}];let s=nt(o);if(s)return[{item:s,score:2,matches:[]}];let l=Ct(o);if(l)return[{item:l,score:2,matches:[]}];if(pt(o))return(await D()).map(x=>({item:x,score:1,matches:[]}));if(o.length>0&&Mt[o[0]]&&(n=Mt[o[0]],o=o.slice(1).trim()),n==="snippet"){let f=await z();return o?I(f,o,a):f.map(x=>({item:x,score:1,matches:[]}))}let u=f=>a>0?f.slice(0,a):f;if(!n&&o.length>0){let f=await rt(o);if(f){let d=await this.getAllCommands(),c=I(d,o,a>0?a-1:0);return c=await this.applyFrecencyBoost(c),u([{item:f,score:2,matches:[]},...c])}let x=await wt(o);if(x){let d=await this.getAllCommands(),c=I(d,o,a>0?a-1:0);return c=await this.applyFrecencyBoost(c),u([{item:x,score:2,matches:[]},...c])}}let g=await this.getAllCommands(),b=n?g.filter(f=>f.category===n):g,p=I(b,o,a);if(p=await this.applyFrecencyBoost(p),!o&&!n&&(p=await this.prependRecentlyUsed(p)),o.length>0&&!n){let f=await it(o);if(f.length>0){let c=f.map(h=>({item:h,score:1.5,matches:[]}));p=u([...c,...p])}let x=W(o);x&&(p=u([{item:x,score:1,matches:[]},...p]));let d={item:K(t),score:0,matches:[]};a===0||p.length<a?p.push(d):p[p.length-1]=d}return p}trackExecution(t){At(t)}async prependRecentlyUsed(t){try{let a=await U();if(!a||Object.keys(a).length===0)return t;let o=t.filter(l=>a[l.item.id]&&E(a[l.item.id])>0).sort((l,u)=>{let g=E(a[l.item.id]);return E(a[u.item.id])-g}).slice(0,5);if(o.length===0)return t;let n=new Set(o.map(l=>l.item.id)),r=o.map(l=>({...l,item:{...l.item,category:"recent"}})),s=t.filter(l=>!n.has(l.item.id));return[...r,...s]}catch{return t}}async applyFrecencyBoost(t){try{let a=await U();return!a||Object.keys(a).length===0?t:[...t].sort((o,n)=>{let r=a[o.item.id]?E(a[o.item.id]):0,s=a[n.item.id]?E(a[n.item.id]):0,l=o.score+r*.1;return n.score+s*.1-l})}catch{return t}}async getAllCommands(){let t=await Promise.all(this.dynamicProviders.map(o=>o().catch(()=>[]))),a=Tt();return[...t.flat(),...a,...this.staticCommands]}};var Ht=`
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

/* \u2500\u2500\u2500 Light theme (auto via media query) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

@media (prefers-color-scheme: light) {
  :host(:not([data-theme="dark"])) {
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

/* \u2500\u2500\u2500 Forced light theme \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

:host([data-theme="light"]) {
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
  padding: 48px 20px 40px;
  color: var(--hatch-text-muted);
  font-size: 14px;
}

.hatch-empty-icon {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.4;
}

.hatch-empty-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--hatch-text-secondary);
  margin-bottom: 8px;
}

.hatch-empty-hints {
  font-size: 12px;
  color: var(--hatch-text-muted);
  line-height: 1.8;
}

.hatch-empty-hints kbd {
  font-family: var(--hatch-font);
  font-size: 11px;
  font-weight: 600;
  color: var(--hatch-text-secondary);
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: 4px;
  padding: 1px 5px;
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

.hatch-footer-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.hatch-result-count {
  font-size: 11px;
  color: var(--hatch-text-muted);
  font-variant-numeric: tabular-nums;
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

/* \u2500\u2500\u2500 Editor Sub-View \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

.hatch-editor {
  padding: 20px;
}

.hatch-editor-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.hatch-editor-icon {
  font-size: 20px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--hatch-accent-glow);
  border-radius: var(--hatch-radius-sm);
}

.hatch-editor-title {
  font-size: 16px;
  font-weight: 600;
  flex: 1;
}

.hatch-editor-back {
  background: transparent;
  color: var(--hatch-text-muted);
  border: 1px solid var(--hatch-border);
  border-radius: 6px;
  padding: 4px 12px;
  font-size: 12px;
  font-weight: 500;
  font-family: var(--hatch-font);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.hatch-editor-back:hover {
  color: var(--hatch-text);
  border-color: var(--hatch-text-muted);
}

.hatch-editor-field {
  margin-bottom: 14px;
}

.hatch-editor-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  color: var(--hatch-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: 6px;
}

.hatch-editor-hint {
  font-size: 11px;
  font-weight: 400;
  color: var(--hatch-text-muted);
  text-transform: none;
  letter-spacing: 0;
}

.hatch-editor-input,
.hatch-editor-textarea {
  width: 100%;
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: var(--hatch-radius-sm);
  color: var(--hatch-text);
  padding: 10px 14px;
  font-size: 14px;
  font-family: var(--hatch-font);
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
  box-sizing: border-box;
}

.hatch-editor-input:focus,
.hatch-editor-textarea:focus {
  border-color: var(--hatch-accent);
  box-shadow: 0 0 0 3px var(--hatch-accent-glow);
}

.hatch-editor-textarea {
  resize: vertical;
  min-height: 80px;
  font-family: monospace, var(--hatch-font);
  line-height: 1.5;
}

.hatch-editor-error {
  border-color: #ef4444 !important;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15) !important;
  animation: hatch-shake 0.3s ease;
}

@keyframes hatch-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
}

.hatch-editor-vars {
  font-size: 12px;
  color: var(--hatch-text-muted);
  margin-bottom: 16px;
  line-height: 1.8;
}

.hatch-editor-vars code {
  font-family: monospace;
  font-size: 11px;
  background: var(--hatch-bg-secondary);
  border: 1px solid var(--hatch-border);
  border-radius: 4px;
  padding: 1px 5px;
  color: var(--hatch-text-secondary);
}

.hatch-editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 8px;
}

.hatch-editor-save {
  background: var(--hatch-accent);
  color: #ffffff;
  border: none;
  border-radius: var(--hatch-radius-sm);
  padding: 8px 24px;
  font-size: 13px;
  font-weight: 600;
  font-family: var(--hatch-font);
  cursor: pointer;
  transition: background 0.15s;
}

.hatch-editor-save:hover {
  background: #818cf8;
}

.hatch-editor-cancel {
  background: transparent;
  color: var(--hatch-text-muted);
  border: 1px solid var(--hatch-border);
  border-radius: var(--hatch-radius-sm);
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  font-family: var(--hatch-font);
  cursor: pointer;
  transition: color 0.15s, border-color 0.15s;
}

.hatch-editor-cancel:hover {
  color: var(--hatch-text);
  border-color: var(--hatch-text-muted);
}
`;w();var H=class{constructor(){this.results=[];this.selectedIndex=0;this.isOpen=!1;this.searchDebounceTimer=null;this.selectedItems=new Set;this.batchBar=null;this.editorMode=null;this.registry=new M,this.host=document.createElement("div"),this.host.id="hatch-host",this.shadow=this.host.attachShadow({mode:"closed"}),this.buildDOM(),this.attachStyles(),this.bindEvents(),document.body.appendChild(this.host)}buildDOM(){this.backdrop=document.createElement("div"),this.backdrop.className="hatch-backdrop",this.backdrop.addEventListener("click",()=>this.close()),this.container=document.createElement("div"),this.container.className="hatch-palette",this.container.setAttribute("role","dialog"),this.container.setAttribute("aria-label","Hatch Command Palette"),this.inputWrapper=document.createElement("div");let t=this.inputWrapper;t.className="hatch-input-wrapper";let a=document.createElement("span");a.className="hatch-search-icon",a.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>',this.input=document.createElement("input"),this.input.className="hatch-input",this.input.type="text",this.input.placeholder="Search tabs, commands, or type a URL...",this.input.setAttribute("autocomplete","off"),this.input.setAttribute("autocorrect","off"),this.input.setAttribute("autocapitalize","off"),this.input.setAttribute("spellcheck","false");let o=document.createElement("span");o.className="hatch-shortcut-hint",o.textContent="esc",t.appendChild(a),t.appendChild(this.input),t.appendChild(o),this.resultsList=document.createElement("div"),this.resultsList.className="hatch-results",this.resultsList.setAttribute("role","listbox"),this.footer=document.createElement("div");let n=this.footer;n.className="hatch-footer";let r=document.createElement("div");r.className="hatch-footer-hints",r.innerHTML=`
      <span class="hatch-hint"><kbd>\u2191\u2193</kbd> navigate</span>
      <span class="hatch-hint"><kbd>\u21B5</kbd> open</span>
      <span class="hatch-hint"><kbd>\u2318\u21B5</kbd> new tab</span>
      <span class="hatch-hint"><kbd>esc</kbd> close</span>
    `;let s=document.createElement("div");s.className="hatch-footer-right",this.resultCount=document.createElement("span"),this.resultCount.className="hatch-result-count";let l=document.createElement("span");l.className="hatch-brand",l.textContent="Hatch",s.appendChild(this.resultCount),s.appendChild(l),n.appendChild(r),n.appendChild(s),this.batchBar=document.createElement("div"),this.batchBar.className="hatch-batch-bar",this.batchBar.style.display="none",this.container.appendChild(t),this.container.appendChild(this.resultsList),this.container.appendChild(this.batchBar),this.container.appendChild(n),this.shadow.appendChild(this.backdrop),this.shadow.appendChild(this.container)}attachStyles(){let t=document.createElement("style");t.textContent=Ht,this.shadow.appendChild(t)}bindEvents(){this.input.addEventListener("input",()=>this.onInput()),this.input.addEventListener("keydown",t=>this.onKeyDown(t))}toggle(){this.isOpen?this.close():this.open()}async open(){this.isOpen||(this.isOpen=!0,this.applyTheme(),this.host.style.display="block",this.input.value="",this.selectedIndex=0,this.selectedItems.clear(),this.batchBar&&(this.batchBar.style.display="none"),this.container.offsetHeight,this.backdrop.classList.add("visible"),this.container.classList.add("visible"),requestAnimationFrame(()=>{this.input.focus()}),await this.updateResults())}close(){this.isOpen&&(this.isOpen=!1,this.backdrop.classList.remove("visible"),this.container.classList.remove("visible"),setTimeout(()=>{this.isOpen||(this.host.style.display="none")},150))}applyTheme(){chrome.storage.local.get("settings",t=>{let o=t?.settings?.theme||"auto";o==="auto"?this.host.removeAttribute("data-theme"):this.host.setAttribute("data-theme",o)})}onInput(){this.searchDebounceTimer!==null&&clearTimeout(this.searchDebounceTimer),this.searchDebounceTimer=window.setTimeout(()=>{this.updateResults()},16)}async updateResults(){let t=this.input.value,a=t.trim()?15:0;this.results=await this.registry.search(t,a),this.selectedIndex=0,this.renderResults()}renderResults(){if(this.resultsList.innerHTML="",this.resultCount.textContent=this.results.length>0?`${this.results.length} result${this.results.length!==1?"s":""}`:"",this.results.length===0){let a=document.createElement("div");a.className="hatch-empty",a.innerHTML=`
        <div class="hatch-empty-icon">\u2318</div>
        <div class="hatch-empty-title">No results found</div>
        <div class="hatch-empty-hints">
          Try <kbd>@</kbd> tabs \xB7 <kbd>#</kbd> bookmarks \xB7 <kbd>/</kbd> history \xB7 <kbd>;</kbd> snippets \xB7 <kbd>></kbd> commands
        </div>
      `,this.resultsList.appendChild(a);return}let t="";this.results.forEach((a,o)=>{let n=a.item;if(n.category!==t){t=n.category;let p=document.createElement("div");p.className="hatch-section-header",p.textContent=this.getCategoryLabel(n.category),this.resultsList.appendChild(p)}let r=this.selectedItems.has(n.id),s=document.createElement("div");s.className=`hatch-result-item${o===this.selectedIndex?" selected":""}${r?" multi-selected":""}`,s.setAttribute("role","option"),s.setAttribute("aria-selected",o===this.selectedIndex?"true":"false");let l=document.createElement("span");if(l.className="hatch-result-icon",n.icon&&(n.icon.startsWith("http")||n.icon.startsWith("data:"))){let p=document.createElement("img");p.src=n.icon,p.width=20,p.height=20,p.loading="lazy",p.onerror=()=>{p.style.display="none",l.textContent=this.getCategoryIcon(n.category)},l.appendChild(p)}else l.textContent=n.icon||this.getCategoryIcon(n.category);let u=document.createElement("div");u.className="hatch-result-text";let g=document.createElement("span");if(g.className="hatch-result-name",a.matches.length>0&&this.input.value.trim()?this.renderHighlightedName(g,n.name,a.matches):g.textContent=n.name,u.appendChild(g),n.description){let p=document.createElement("span");p.className="hatch-result-desc",p.textContent=n.description,u.appendChild(p)}let b=document.createElement("span");if(b.className="hatch-result-badge",b.textContent=n.category,r){let p=document.createElement("span");p.className="hatch-check",p.textContent="\u2713",s.appendChild(p)}s.appendChild(l),s.appendChild(u),s.appendChild(b),s.addEventListener("mouseenter",()=>{this.selectedIndex=o,this.highlightSelected()}),s.addEventListener("click",p=>{this.selectedIndex=o,this.executeSelected(p.metaKey||p.ctrlKey)}),this.resultsList.appendChild(s)})}renderHighlightedName(t,a,o){let n=new Set(o);for(let r=0;r<a.length;r++)if(n.has(r)){let s=document.createElement("mark");s.className="hatch-highlight",s.textContent=a[r],t.appendChild(s)}else t.appendChild(document.createTextNode(a[r]))}getCategoryLabel(t){return{recent:"Recently Used",tab:"Tabs",navigation:"Navigation",bookmark:"Bookmarks",history:"History",session:"Recently Closed",snippet:"Snippets",command:"Commands",search:"Search",note:"Notes",alias:"Aliases",clipboard:"Clipboard"}[t]||t}getCategoryIcon(t){return{tab:"\u229E",navigation:"\u25CE",bookmark:"\u2605",history:"\u25F7",session:"\u21A9",snippet:"\u2702",command:"\u26A1",search:"\u{1F50D}"}[t]||"\u2022"}highlightSelected(){this.resultsList.querySelectorAll(".hatch-result-item").forEach((a,o)=>{let n=a;o===this.selectedIndex?(n.classList.add("selected"),n.setAttribute("aria-selected","true"),n.scrollIntoView({block:"nearest",behavior:"smooth"})):(n.classList.remove("selected"),n.setAttribute("aria-selected","false"))})}onKeyDown(t){switch(t.key){case"ArrowDown":t.preventDefault(),this.selectedIndex=Math.min(this.selectedIndex+1,this.results.length-1),this.highlightSelected();break;case"ArrowUp":t.preventDefault(),this.selectedIndex=Math.max(this.selectedIndex-1,0),this.highlightSelected();break;case"Enter":t.preventDefault(),this.executeSelected(t.metaKey||t.ctrlKey);break;case"Escape":t.preventDefault(),this.editorMode?this.exitEditor():this.close();break;case"Tab":t.preventDefault(),this.results[this.selectedIndex]&&(this.input.value=this.results[this.selectedIndex].item.name,this.updateResults());break;case" ":if(this.input.value===""||this.input.value.startsWith("@")){let a=this.results[this.selectedIndex];a&&a.item.category==="tab"&&(t.preventDefault(),this.toggleSelect(a.item.id))}break}}toggleSelect(t){this.selectedItems.has(t)?this.selectedItems.delete(t):this.selectedItems.add(t),this.renderResults(),this.updateBatchBar()}updateBatchBar(){if(!this.batchBar)return;let t=this.selectedItems.size;if(t===0){this.batchBar.style.display="none";return}this.batchBar.style.display="flex",this.batchBar.innerHTML=`
      <span class="hatch-batch-count">${t} tab${t>1?"s":""} selected</span>
      <div class="hatch-batch-actions">
        <button class="hatch-batch-btn" data-action="close">Close</button>
        <button class="hatch-batch-btn" data-action="group">Group</button>
        <button class="hatch-batch-btn" data-action="pin">Pin</button>
        <button class="hatch-batch-btn" data-action="suspend">Suspend</button>
      </div>
    `,this.batchBar.querySelectorAll(".hatch-batch-btn").forEach(a=>{a.addEventListener("click",()=>{let o=a.dataset.action;this.executeBatchAction(o||"")})})}async executeBatchAction(t){let a=[];for(let n of this.selectedItems){let r=n.match(/^switch-tab-(\d+)$/);r&&a.push(parseInt(r[1],10))}if(a.length===0)return;let{sendMessage:o}=await Promise.resolve().then(()=>(w(),j));switch(t){case"close":for(let n of a)o({type:"CLOSE_TAB",tabId:n});break;case"group":{let n=`Group (${a.length})`,r=await o({type:"CREATE_TAB_GROUP",title:n,color:"blue"});if(r?.groupId)for(let s of a)o({type:"ADD_TAB_TO_GROUP",tabId:s,groupId:r.groupId});break}case"pin":for(let n of a)o({type:"PIN_TAB",tabId:n,pinned:!0});break;case"suspend":for(let n of a)o({type:"SUSPEND_TAB",tabId:n});break}this.selectedItems.clear(),this.updateBatchBar(),this.close()}showEditor(t){this.editorMode=t,this.inputWrapper.style.display="none",this.resultsList.innerHTML="",this.resultCount.textContent="",this.batchBar&&(this.batchBar.style.display="none");let a=document.createElement("div");a.className="hatch-editor";let o=this.getEditorConfig(t),n=document.createElement("div");n.className="hatch-editor-header",n.innerHTML=`
      <span class="hatch-editor-icon">${o.icon}</span>
      <span class="hatch-editor-title">${o.title}</span>
    `;let r=document.createElement("button");r.className="hatch-editor-back",r.textContent="\u2190 Back",r.addEventListener("click",()=>this.exitEditor()),n.appendChild(r),a.appendChild(n);let s={};for(let p of o.fields){let f=document.createElement("div");f.className="hatch-editor-field";let x=document.createElement("label");if(x.className="hatch-editor-label",x.textContent=p.label,f.appendChild(x),p.hint){let d=document.createElement("span");d.className="hatch-editor-hint",d.textContent=p.hint,x.appendChild(d)}if(p.multiline){let d=document.createElement("textarea");d.className="hatch-editor-textarea",d.placeholder=p.placeholder,d.rows=4,f.appendChild(d),s[p.key]=d}else{let d=document.createElement("input");d.className="hatch-editor-input",d.type="text",d.placeholder=p.placeholder,f.appendChild(d),s[p.key]=d}a.appendChild(f)}if(t==="snippet"){let p=document.createElement("div");p.className="hatch-editor-vars",p.innerHTML="Variables: <code>{{date}}</code> <code>{{time}}</code> <code>{{url}}</code> <code>{{title}}</code> <code>{{domain}}</code> <code>{{year}}</code> <code>{{iso}}</code>",a.appendChild(p)}let l=document.createElement("div");l.className="hatch-editor-actions";let u=document.createElement("button");u.className="hatch-editor-save",u.textContent="Save",u.addEventListener("click",()=>{this.saveEditorData(t,s)});let g=document.createElement("button");g.className="hatch-editor-cancel",g.textContent="Cancel",g.addEventListener("click",()=>this.exitEditor()),l.appendChild(g),l.appendChild(u),a.appendChild(l),this.resultsList.appendChild(a);let b=o.fields[0];b&&requestAnimationFrame(()=>s[b.key]?.focus()),this.footer.querySelector(".hatch-footer-hints").innerHTML=`
      <span class="hatch-hint"><kbd>Esc</kbd> cancel</span>
      <span class="hatch-hint"><kbd>Tab</kbd> next field</span>
    `}exitEditor(){this.editorMode=null,this.inputWrapper.style.display="flex",this.input.value="",this.footer.querySelector(".hatch-footer-hints").innerHTML=`
      <span class="hatch-hint"><kbd>\u2191\u2193</kbd> navigate</span>
      <span class="hatch-hint"><kbd>\u21B5</kbd> open</span>
      <span class="hatch-hint"><kbd>\u2318\u21B5</kbd> new tab</span>
      <span class="hatch-hint"><kbd>esc</kbd> close</span>
    `,requestAnimationFrame(()=>this.input.focus()),this.updateResults()}getEditorConfig(t){switch(t){case"snippet":return{title:"Create Snippet",icon:"\u2702",fields:[{key:"trigger",label:"Trigger",placeholder:";sig",hint:"Start with ; recommended"},{key:"name",label:"Name",placeholder:"Email Signature"},{key:"body",label:"Body",placeholder:`Best regards,
Sounak Das`,multiline:!0}]};case"alias":return{title:"Create Alias",icon:"\u{1F517}",fields:[{key:"keyword",label:"Keyword",placeholder:"mail"},{key:"url",label:"URL",placeholder:"https://mail.google.com",hint:"Use %s for parameters"}]};case"engine":return{title:"Add Search Engine",icon:"\u{1F50E}",fields:[{key:"keyword",label:"Keyword",placeholder:"jira"},{key:"name",label:"Name",placeholder:"Jira"},{key:"urlTemplate",label:"URL Template",placeholder:"https://jira.com/search?q=%s",hint:"%s = search query"}]}}}async saveEditorData(t,a){let o={};for(let[n,r]of Object.entries(a))if(o[n]=r.value.trim(),!o[n]){r.focus(),r.classList.add("hatch-editor-error"),setTimeout(()=>r.classList.remove("hatch-editor-error"),1e3);return}switch(t){case"snippet":{let n={id:`snip-${Date.now()}`,trigger:o.trigger.startsWith(";")?o.trigger:`;${o.trigger}`,name:o.name,body:o.body};await i({type:"SAVE_SNIPPET",snippet:n});break}case"alias":{let r=(await new Promise(s=>{chrome.storage.local.get("aliases",l=>{s(l.aliases||[])})})).filter(s=>s.keyword!==o.keyword);r.push({keyword:o.keyword,url:o.url}),await new Promise(s=>{chrome.storage.local.set({aliases:r},s)});break}case"engine":{if(!o.urlTemplate.includes("%s")){let s=a.urlTemplate;s.focus(),s.classList.add("hatch-editor-error"),setTimeout(()=>s.classList.remove("hatch-editor-error"),1e3);return}let r=(await new Promise(s=>{chrome.storage.local.get("customSearchEngines",l=>{s(l.customSearchEngines||[])})})).filter(s=>s.keyword!==o.keyword);r.push({keyword:o.keyword,name:o.name,urlTemplate:o.urlTemplate,icon:"\u{1F50E}",custom:!0}),await new Promise(s=>{chrome.storage.local.set({customSearchEngines:r},s)});break}}this.exitEditor()}executeSelected(t=!1){let a=this.results[this.selectedIndex];if(!a)return;let o={query:this.input.value,metaKey:t,close:()=>this.close(),showEditor:n=>this.showEditor(n)};try{this.registry.trackExecution(a.item.id),a.item.action(o)}catch(n){console.error("[Hatch] Command execution error:",n)}}};var A=null;function Nt(){A||(A=new H)}var de=["slack.com","notion.so","github.com","linear.app","figma.com","discord.com","youtube.com","twitter.com","x.com","reddit.com","mail.google.com","docs.google.com"];function le(){return de.some(e=>window.location.hostname.includes(e))}document.addEventListener("keydown",e=>{(navigator.platform.toUpperCase().includes("MAC")?e.metaKey:e.ctrlKey)&&e.key==="k"&&(e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation(),A||Nt(),A.toggle(),le()&&me())},!0);var Pt=!1;function me(){Pt||chrome.runtime?.id&&chrome.storage.local.get("conflictHintDismissed",e=>{chrome.runtime.lastError||e.conflictHintDismissed||(Pt=!0,chrome.storage.local.set({conflictHintDismissed:!0}))})}chrome.runtime?.id&&chrome.runtime.onMessage.addListener(e=>{e.type==="OPEN_PALETTE"&&(A||Nt(),A.toggle())});function he(){chrome.runtime?.id&&chrome.storage.local.get("onboardingDone",e=>{if(e.onboardingDone)return;chrome.storage.local.set({onboardingDone:!0});let a=navigator.platform.toUpperCase().includes("MAC")?"\u2318+K":"Ctrl+K",o=document.createElement("div");o.id="hatch-onboarding";let n=o.attachShadow({mode:"closed"});n.innerHTML=`
      <style>
        .hatch-tip {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 2147483645;
          background: #1a1a2e;
          color: #e2e8f0;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 16px 20px;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          font-size: 14px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0;
          transform: translateY(12px);
          animation: hatch-tip-in 0.4s ease forwards 0.5s;
          max-width: 340px;
        }
        @keyframes hatch-tip-in {
          to { opacity: 1; transform: translateY(0); }
        }
        .hatch-tip-icon {
          font-size: 24px;
          flex-shrink: 0;
        }
        .hatch-tip-text {
          flex: 1;
          line-height: 1.4;
        }
        .hatch-tip-title {
          font-weight: 700;
          font-size: 15px;
          margin-bottom: 2px;
          color: #6366f1;
        }
        .hatch-tip-desc {
          font-size: 13px;
          color: #94a3b8;
        }
        .hatch-tip-kbd {
          display: inline-block;
          font-weight: 700;
          color: #e2e8f0;
          background: rgba(99,102,241,0.2);
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 5px;
          padding: 1px 7px;
          font-size: 12px;
        }
        .hatch-tip-close {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: none;
          color: #64748b;
          font-size: 16px;
          cursor: pointer;
          border-radius: 6px;
          transition: background 0.15s;
        }
        .hatch-tip-close:hover {
          background: rgba(255,255,255,0.1);
          color: #e2e8f0;
        }
        @media (prefers-color-scheme: light) {
          .hatch-tip {
            background: #ffffff;
            color: #0f172a;
            border-color: rgba(0,0,0,0.1);
            box-shadow: 0 20px 40px rgba(0,0,0,0.15);
          }
          .hatch-tip-desc { color: #64748b; }
          .hatch-tip-kbd {
            color: #0f172a;
            background: rgba(99,102,241,0.1);
          }
          .hatch-tip-close { color: #94a3b8; }
          .hatch-tip-close:hover {
            background: rgba(0,0,0,0.05);
            color: #0f172a;
          }
        }
      </style>
      <div class="hatch-tip">
        <span class="hatch-tip-icon">\u2318</span>
        <div class="hatch-tip-text">
          <div class="hatch-tip-title">Hatch Installed!</div>
          <div class="hatch-tip-desc">Press <span class="hatch-tip-kbd">${a}</span> anywhere to open the command palette</div>
        </div>
        <button class="hatch-tip-close" aria-label="Dismiss">\u2715</button>
      </div>
    `,document.body.appendChild(o),n.querySelector(".hatch-tip-close").addEventListener("click",()=>{o.style.transition="opacity 0.3s",o.style.opacity="0",setTimeout(()=>o.remove(),300)}),setTimeout(()=>{o.parentElement&&(o.style.transition="opacity 0.3s",o.style.opacity="0",setTimeout(()=>o.remove(),300))},8e3)})}setTimeout(he,1500);ft();})();
//# sourceMappingURL=index.js.map
