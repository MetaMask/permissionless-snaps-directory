"use strict";(self.webpackChunk_metamask_snaps_directory=self.webpackChunk_metamask_snaps_directory||[]).push([[548],{19662:function(t,n,e){var r=e(60614),o=e(66330),i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not a function")}},39483:function(t,n,e){var r=e(4411),o=e(66330),i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not a constructor")}},19670:function(t,n,e){var r=e(70111),o=String,i=TypeError;t.exports=function(t){if(r(t))return t;throw i(o(t)+" is not an object")}},41318:function(t,n,e){var r=e(45656),o=e(51400),i=e(26244),a=function(t){return function(n,e,a){var u,s=r(n),c=i(s),f=o(a,c);if(t&&e!=e){for(;c>f;)if((u=s[f++])!=u)return!0}else for(;c>f;f++)if((t||f in s)&&s[f]===e)return t||f||0;return!t&&-1}};t.exports={includes:a(!0),indexOf:a(!1)}},84326:function(t,n,e){var r=e(93812),o=r({}.toString),i=r("".slice);t.exports=function(t){return i(o(t),8,-1)}},70648:function(t,n,e){var r=e(51694),o=e(60614),i=e(84326),a=e(5112)("toStringTag"),u=Object,s="Arguments"===i(function(){return arguments}());t.exports=r?i:function(t){var n,e,r;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(e=function(t,n){try{return t[n]}catch(e){}}(n=u(t),a))?e:s?i(n):"Object"===(r=i(n))&&o(n.callee)?"Arguments":r}},99920:function(t,n,e){var r=e(92597),o=e(53887),i=e(31236),a=e(3070);t.exports=function(t,n,e){for(var u=o(n),s=a.f,c=i.f,f=0;f<u.length;f++){var l=u[f];r(t,l)||e&&r(e,l)||s(t,l,c(n,l))}}},68880:function(t,n,e){var r=e(19781),o=e(3070),i=e(79114);t.exports=r?function(t,n,e){return o.f(t,n,i(1,e))}:function(t,n,e){return t[n]=e,t}},79114:function(t){t.exports=function(t,n){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:n}}},98052:function(t,n,e){var r=e(60614),o=e(3070),i=e(56339),a=e(13072);t.exports=function(t,n,e,u){u||(u={});var s=u.enumerable,c=void 0!==u.name?u.name:n;if(r(e)&&i(e,c,u),u.global)s?t[n]=e:a(n,e);else{try{u.unsafe?t[n]&&(s=!0):delete t[n]}catch(f){}s?t[n]=e:o.f(t,n,{value:e,enumerable:!1,configurable:!u.nonConfigurable,writable:!u.nonWritable})}return t}},13072:function(t,n,e){var r=e(17854),o=Object.defineProperty;t.exports=function(t,n){try{o(r,t,{value:n,configurable:!0,writable:!0})}catch(e){r[t]=n}return n}},19781:function(t,n,e){var r=e(47293);t.exports=!r((function(){return 7!==Object.defineProperty({},1,{get:function(){return 7}})[1]}))},4154:function(t){var n="object"==typeof document&&document.all,e=void 0===n&&void 0!==n;t.exports={all:n,IS_HTMLDDA:e}},80317:function(t,n,e){var r=e(17854),o=e(70111),i=r.document,a=o(i)&&o(i.createElement);t.exports=function(t){return a?i.createElement(t):{}}},88113:function(t){t.exports="undefined"!=typeof navigator&&String(navigator.userAgent)||""},7392:function(t,n,e){var r,o,i=e(17854),a=e(88113),u=i.process,s=i.Deno,c=u&&u.versions||s&&s.version,f=c&&c.v8;f&&(o=(r=f.split("."))[0]>0&&r[0]<4?1:+(r[0]+r[1])),!o&&a&&(!(r=a.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/))&&(o=+r[1]),t.exports=o},80748:function(t){t.exports=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"]},82109:function(t,n,e){var r=e(17854),o=e(31236).f,i=e(68880),a=e(98052),u=e(13072),s=e(99920),c=e(54705);t.exports=function(t,n){var e,f,l,d,h,p=t.target,m=t.global,v=t.stat;if(e=m?r:v?r[p]||u(p,{}):(r[p]||{}).prototype)for(f in n){if(d=n[f],l=t.dontCallGetSet?(h=o(e,f))&&h.value:e[f],!c(m?f:p+(v?".":"#")+f,t.forced)&&void 0!==l){if(typeof d==typeof l)continue;s(d,l)}(t.sham||l&&l.sham)&&i(d,"sham",!0),a(e,f,d,t)}}},47293:function(t){t.exports=function(t){try{return!!t()}catch(n){return!0}}},34374:function(t,n,e){var r=e(47293);t.exports=!r((function(){var t=function(){}.bind();return"function"!=typeof t||t.hasOwnProperty("prototype")}))},46916:function(t,n,e){var r=e(34374),o=Function.prototype.call;t.exports=r?o.bind(o):function(){return o.apply(o,arguments)}},76530:function(t,n,e){var r=e(19781),o=e(92597),i=Function.prototype,a=r&&Object.getOwnPropertyDescriptor,u=o(i,"name"),s=u&&"something"===function(){}.name,c=u&&(!r||r&&a(i,"name").configurable);t.exports={EXISTS:u,PROPER:s,CONFIGURABLE:c}},93812:function(t,n,e){var r=e(34374),o=Function.prototype,i=o.call,a=r&&o.bind.bind(i,i);t.exports=r?a:function(t){return function(){return i.apply(t,arguments)}}},35005:function(t,n,e){var r=e(17854),o=e(60614);t.exports=function(t,n){return arguments.length<2?(e=r[t],o(e)?e:void 0):r[t]&&r[t][n];var e}},58173:function(t,n,e){var r=e(19662),o=e(68554);t.exports=function(t,n){var e=t[n];return o(e)?void 0:r(e)}},17854:function(t,n,e){var r=function(t){return t&&t.Math===Math&&t};t.exports=r("object"==typeof globalThis&&globalThis)||r("object"==typeof window&&window)||r("object"==typeof self&&self)||r("object"==typeof e.g&&e.g)||function(){return this}()||this||Function("return this")()},92597:function(t,n,e){var r=e(93812),o=e(47908),i=r({}.hasOwnProperty);t.exports=Object.hasOwn||function(t,n){return i(o(t),n)}},3501:function(t){t.exports={}},64664:function(t,n,e){var r=e(19781),o=e(47293),i=e(80317);t.exports=!r&&!o((function(){return 7!==Object.defineProperty(i("div"),"a",{get:function(){return 7}}).a}))},68361:function(t,n,e){var r=e(93812),o=e(47293),i=e(84326),a=Object,u=r("".split);t.exports=o((function(){return!a("z").propertyIsEnumerable(0)}))?function(t){return"String"===i(t)?u(t,""):a(t)}:a},42788:function(t,n,e){var r=e(93812),o=e(60614),i=e(5465),a=r(Function.toString);o(i.inspectSource)||(i.inspectSource=function(t){return a(t)}),t.exports=i.inspectSource},29909:function(t,n,e){var r,o,i,a=e(94811),u=e(17854),s=e(70111),c=e(68880),f=e(92597),l=e(5465),d=e(6200),h=e(3501),p="Object already initialized",m=u.TypeError,v=u.WeakMap;if(a||l.state){var g=l.state||(l.state=new v);g.get=g.get,g.has=g.has,g.set=g.set,r=function(t,n){if(g.has(t))throw m(p);return n.facade=t,g.set(t,n),n},o=function(t){return g.get(t)||{}},i=function(t){return g.has(t)}}else{var y=d("state");h[y]=!0,r=function(t,n){if(f(t,y))throw m(p);return n.facade=t,c(t,y,n),n},o=function(t){return f(t,y)?t[y]:{}},i=function(t){return f(t,y)}}t.exports={set:r,get:o,has:i,enforce:function(t){return i(t)?o(t):r(t,{})},getterFor:function(t){return function(n){var e;if(!s(n)||(e=o(n)).type!==t)throw m("Incompatible receiver, "+t+" required");return e}}}},60614:function(t,n,e){var r=e(4154),o=r.all;t.exports=r.IS_HTMLDDA?function(t){return"function"==typeof t||t===o}:function(t){return"function"==typeof t}},4411:function(t,n,e){var r=e(93812),o=e(47293),i=e(60614),a=e(70648),u=e(35005),s=e(42788),c=function(){},f=[],l=u("Reflect","construct"),d=/^\s*(?:class|function)\b/,h=r(d.exec),p=!d.exec(c),m=function(t){if(!i(t))return!1;try{return l(c,f,t),!0}catch(n){return!1}},v=function(t){if(!i(t))return!1;switch(a(t)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return p||!!h(d,s(t))}catch(n){return!0}};v.sham=!0,t.exports=!l||o((function(){var t;return m(m.call)||!m(Object)||!m((function(){t=!0}))||t}))?v:m},54705:function(t,n,e){var r=e(47293),o=e(60614),i=/#|\.prototype\./,a=function(t,n){var e=s[u(t)];return e===f||e!==c&&(o(n)?r(n):!!n)},u=a.normalize=function(t){return String(t).replace(i,".").toLowerCase()},s=a.data={},c=a.NATIVE="N",f=a.POLYFILL="P";t.exports=a},68554:function(t){t.exports=function(t){return null==t}},70111:function(t,n,e){var r=e(60614),o=e(4154),i=o.all;t.exports=o.IS_HTMLDDA?function(t){return"object"==typeof t?null!==t:r(t)||t===i}:function(t){return"object"==typeof t?null!==t:r(t)}},31913:function(t){t.exports=!1},52190:function(t,n,e){var r=e(35005),o=e(60614),i=e(47976),a=e(43307),u=Object;t.exports=a?function(t){return"symbol"==typeof t}:function(t){var n=r("Symbol");return o(n)&&i(n.prototype,u(t))}},26244:function(t,n,e){var r=e(17466);t.exports=function(t){return r(t.length)}},56339:function(t,n,e){var r=e(93812),o=e(47293),i=e(60614),a=e(92597),u=e(19781),s=e(76530).CONFIGURABLE,c=e(42788),f=e(29909),l=f.enforce,d=f.get,h=String,p=Object.defineProperty,m=r("".slice),v=r("".replace),g=r([].join),y=u&&!o((function(){return 8!==p((function(){}),"length",{value:8}).length})),b=String(String).split("String"),w=t.exports=function(t,n,e){"Symbol("===m(h(n),0,7)&&(n="["+v(h(n),/^Symbol\(([^)]*)\)/,"$1")+"]"),e&&e.getter&&(n="get "+n),e&&e.setter&&(n="set "+n),(!a(t,"name")||s&&t.name!==n)&&(u?p(t,"name",{value:n,configurable:!0}):t.name=n),y&&e&&a(e,"arity")&&t.length!==e.arity&&p(t,"length",{value:e.arity});try{e&&a(e,"constructor")&&e.constructor?u&&p(t,"prototype",{writable:!1}):t.prototype&&(t.prototype=void 0)}catch(o){}var r=l(t);return a(r,"source")||(r.source=g(b,"string"==typeof n?n:"")),t};Function.prototype.toString=w((function(){return i(this)&&d(this).source||c(this)}),"toString")},74758:function(t){var n=Math.ceil,e=Math.floor;t.exports=Math.trunc||function(t){var r=+t;return(r>0?e:n)(r)}},78523:function(t,n,e){var r=e(19662),o=TypeError,i=function(t){var n,e;this.promise=new t((function(t,r){if(void 0!==n||void 0!==e)throw o("Bad Promise constructor");n=t,e=r})),this.resolve=r(n),this.reject=r(e)};t.exports.f=function(t){return new i(t)}},3070:function(t,n,e){var r=e(19781),o=e(64664),i=e(3353),a=e(19670),u=e(34948),s=TypeError,c=Object.defineProperty,f=Object.getOwnPropertyDescriptor,l="enumerable",d="configurable",h="writable";n.f=r?i?function(t,n,e){if(a(t),n=u(n),a(e),"function"==typeof t&&"prototype"===n&&"value"in e&&h in e&&!e[h]){var r=f(t,n);r&&r[h]&&(t[n]=e.value,e={configurable:d in e?e[d]:r[d],enumerable:l in e?e[l]:r[l],writable:!1})}return c(t,n,e)}:c:function(t,n,e){if(a(t),n=u(n),a(e),o)try{return c(t,n,e)}catch(r){}if("get"in e||"set"in e)throw s("Accessors not supported");return"value"in e&&(t[n]=e.value),t}},31236:function(t,n,e){var r=e(19781),o=e(46916),i=e(55296),a=e(79114),u=e(45656),s=e(34948),c=e(92597),f=e(64664),l=Object.getOwnPropertyDescriptor;n.f=r?l:function(t,n){if(t=u(t),n=s(n),f)try{return l(t,n)}catch(e){}if(c(t,n))return a(!o(i.f,t,n),t[n])}},8006:function(t,n,e){var r=e(16324),o=e(80748).concat("length","prototype");n.f=Object.getOwnPropertyNames||function(t){return r(t,o)}},25181:function(t,n){n.f=Object.getOwnPropertySymbols},47976:function(t,n,e){var r=e(93812);t.exports=r({}.isPrototypeOf)},16324:function(t,n,e){var r=e(93812),o=e(92597),i=e(45656),a=e(41318).indexOf,u=e(3501),s=r([].push);t.exports=function(t,n){var e,r=i(t),c=0,f=[];for(e in r)!o(u,e)&&o(r,e)&&s(f,e);for(;n.length>c;)o(r,e=n[c++])&&(~a(f,e)||s(f,e));return f}},55296:function(t,n){var e={}.propertyIsEnumerable,r=Object.getOwnPropertyDescriptor,o=r&&!e.call({1:2},1);n.f=o?function(t){var n=r(this,t);return!!n&&n.enumerable}:e},92140:function(t,n,e){var r=e(46916),o=e(60614),i=e(70111),a=TypeError;t.exports=function(t,n){var e,u;if("string"===n&&o(e=t.toString)&&!i(u=r(e,t)))return u;if(o(e=t.valueOf)&&!i(u=r(e,t)))return u;if("string"!==n&&o(e=t.toString)&&!i(u=r(e,t)))return u;throw a("Can't convert object to primitive value")}},53887:function(t,n,e){var r=e(35005),o=e(93812),i=e(8006),a=e(25181),u=e(19670),s=o([].concat);t.exports=r("Reflect","ownKeys")||function(t){var n=i.f(u(t)),e=a.f;return e?s(n,e(t)):n}},2492:function(t,n,e){var r=e(17854);t.exports=r.Promise},69478:function(t,n,e){var r=e(19670),o=e(70111),i=e(78523);t.exports=function(t,n){if(r(t),o(n)&&n.constructor===t)return n;var e=i.f(t);return(0,e.resolve)(n),e.promise}},84488:function(t,n,e){var r=e(68554),o=TypeError;t.exports=function(t){if(r(t))throw o("Can't call method on "+t);return t}},6200:function(t,n,e){var r=e(72309),o=e(69711),i=r("keys");t.exports=function(t){return i[t]||(i[t]=o(t))}},5465:function(t,n,e){var r=e(17854),o=e(13072),i="__core-js_shared__",a=r[i]||o(i,{});t.exports=a},72309:function(t,n,e){var r=e(31913),o=e(5465);(t.exports=function(t,n){return o[t]||(o[t]=void 0!==n?n:{})})("versions",[]).push({version:"3.32.1",mode:r?"pure":"global",copyright:"© 2014-2023 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.32.1/LICENSE",source:"https://github.com/zloirock/core-js"})},36707:function(t,n,e){var r=e(19670),o=e(39483),i=e(68554),a=e(5112)("species");t.exports=function(t,n){var e,u=r(t).constructor;return void 0===u||i(e=r(u)[a])?n:o(e)}},36293:function(t,n,e){var r=e(7392),o=e(47293),i=e(17854).String;t.exports=!!Object.getOwnPropertySymbols&&!o((function(){var t=Symbol("symbol detection");return!i(t)||!(Object(t)instanceof Symbol)||!Symbol.sham&&r&&r<41}))},51400:function(t,n,e){var r=e(82868),o=Math.max,i=Math.min;t.exports=function(t,n){var e=r(t);return e<0?o(e+n,0):i(e,n)}},45656:function(t,n,e){var r=e(68361),o=e(84488);t.exports=function(t){return r(o(t))}},82868:function(t,n,e){var r=e(74758);t.exports=function(t){var n=+t;return n!=n||0===n?0:r(n)}},17466:function(t,n,e){var r=e(82868),o=Math.min;t.exports=function(t){return t>0?o(r(t),9007199254740991):0}},47908:function(t,n,e){var r=e(84488),o=Object;t.exports=function(t){return o(r(t))}},57593:function(t,n,e){var r=e(46916),o=e(70111),i=e(52190),a=e(58173),u=e(92140),s=e(5112),c=TypeError,f=s("toPrimitive");t.exports=function(t,n){if(!o(t)||i(t))return t;var e,s=a(t,f);if(s){if(void 0===n&&(n="default"),e=r(s,t,n),!o(e)||i(e))return e;throw c("Can't convert object to primitive value")}return void 0===n&&(n="number"),u(t,n)}},34948:function(t,n,e){var r=e(57593),o=e(52190);t.exports=function(t){var n=r(t,"string");return o(n)?n:n+""}},51694:function(t,n,e){var r={};r[e(5112)("toStringTag")]="z",t.exports="[object z]"===String(r)},66330:function(t){var n=String;t.exports=function(t){try{return n(t)}catch(e){return"Object"}}},69711:function(t,n,e){var r=e(93812),o=0,i=Math.random(),a=r(1..toString);t.exports=function(t){return"Symbol("+(void 0===t?"":t)+")_"+a(++o+i,36)}},43307:function(t,n,e){var r=e(36293);t.exports=r&&!Symbol.sham&&"symbol"==typeof Symbol.iterator},3353:function(t,n,e){var r=e(19781),o=e(47293);t.exports=r&&o((function(){return 42!==Object.defineProperty((function(){}),"prototype",{value:42,writable:!1}).prototype}))},94811:function(t,n,e){var r=e(17854),o=e(60614),i=r.WeakMap;t.exports=o(i)&&/native code/.test(String(i))},5112:function(t,n,e){var r=e(17854),o=e(72309),i=e(92597),a=e(69711),u=e(36293),s=e(43307),c=r.Symbol,f=o("wks"),l=s?c.for||c:c&&c.withoutSetter||a;t.exports=function(t){return i(f,t)||(f[t]=u&&i(c,t)?c[t]:l("Symbol."+t)),f[t]}},17727:function(t,n,e){var r=e(82109),o=e(31913),i=e(2492),a=e(47293),u=e(35005),s=e(60614),c=e(36707),f=e(69478),l=e(98052),d=i&&i.prototype;if(r({target:"Promise",proto:!0,real:!0,forced:!!i&&a((function(){d.finally.call({then:function(){}},(function(){}))}))},{finally:function(t){var n=c(this,u("Promise")),e=s(t);return this.then(e?function(e){return f(n,t()).then((function(){return e}))}:t,e?function(e){return f(n,t()).then((function(){throw e}))}:t)}}),!o&&s(i)){var h=u("Promise").prototype.finally;d.finally!==h&&l(d,"finally",h,{unsafe:!0})}},10274:function(t,n,e){e.d(n,{C:function(){return u}});var r=e(89555),o=e(67294),i=e(86007),a=e(8573);function u(t,n){const{showErrorMsg:e}=(0,i.Z)();(0,o.useEffect)((()=>{if(t){var o,i,u,s;const d=r.ag._({id:"LobdAW"}),h=r.ag._({id:"LobdAW"}),p=null!=n?n:{};for(const n in a.k){var c;if(!p[n])if(n===a.k.SignError)p[n]={title:r.ag._({id:"raYR0T"}),description:null!==(c=null==t?void 0:t.message)&&void 0!==c?c:r.ag._({id:"raYR0T"})};else if(n===a.k.VerifyError){var f;p[n]={title:r.ag._({id:"7caB2M"}),description:null!==(f=null==t?void 0:t.message)&&void 0!==f?f:r.ag._({id:"7caB2M"})}}else{var l;p[n]={title:r.ag._({id:"DZ950Y"}),description:null!==(l=null==t?void 0:t.message)&&void 0!==l?l:r.ag._({id:"DZ950Y"})}}}e({title:null!==(o=null===(i=p[t.type])||void 0===i?void 0:i.title)&&void 0!==o?o:d,description:null!==(u=null===(s=p[t.type])||void 0===s?void 0:s.description)&&void 0!==u?u:h})}}),[t,n,e])}},86007:function(t,n,e){e.d(n,{Z:function(){return s}});var r=e(32360),o=e(29153),i=e(18925),a=e(67294);function u(t){const{theme:n}=(0,i.uP)(),e=(0,r.OX)();return(0,a.useMemo)((()=>(0,o.Cj)(n.direction,{...e,...t})),[t,n.direction,e])}var s=t=>{const n=u({position:"top",...t});return{showErrorMsg:t=>{let{title:e,description:r,duration:o=2e3,isClosable:i=!0}=t;return n({title:e,description:r,status:"error",duration:o,isClosable:i})},showInfoMsg:t=>{let{title:e,description:r,duration:o=2e3,isClosable:i=!0}=t;return n({title:e,description:r,status:"info",duration:o,isClosable:i})},showSuccessMsg:t=>{let{title:e,description:r,duration:o=2e3,isClosable:i=!0}=t;return n({title:e,description:r,status:"success",duration:o,isClosable:i})},showWarningMsg:t=>{let{title:e,description:r,duration:o=2e3,isClosable:i=!0}=t;return n({title:e,description:r,status:"warning",duration:o,isClosable:i})},showLoadingMsg:t=>{let{title:e,description:r,duration:o=2e3,isClosable:i=!0}=t;return n({title:e,description:r,status:"loading",duration:o,isClosable:i})}}}},37109:function(t,n,e){function r(t,n){return t instanceof Date?new t.constructor(n):new Date(n)}e.d(n,{Q:function(){return C}});function o(t){return r(t,Date.now())}function i(t){const n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new t.constructor(+t):"number"==typeof t||"[object Number]"===n||"string"==typeof t||"[object String]"===n?new Date(t):new Date(NaN)}function a(t,n){const e=i(t),r=i(n),o=e.getTime()-r.getTime();return o<0?-1:o>0?1:o}Math.pow(10,8);const u=43200,s=1440;function c(t,n){const e=i(t),r=i(n);return 12*(e.getFullYear()-r.getFullYear())+(e.getMonth()-r.getMonth())}function f(t){const n=i(t);return n.setHours(23,59,59,999),n}function l(t){const n=i(t),e=n.getMonth();return n.setFullYear(n.getFullYear(),e+1,0),n.setHours(23,59,59,999),n}function d(t){const n=i(t);return+f(n)==+l(n)}function h(t,n){const e=i(t),r=i(n),o=a(e,r),u=Math.abs(c(e,r));let s;if(u<1)s=0;else{1===e.getMonth()&&e.getDate()>27&&e.setDate(30),e.setMonth(e.getMonth()-o*u);let n=a(e,r)===-o;d(i(t))&&1===u&&1===a(t,r)&&(n=!1),s=o*(u-Number(n))}return 0===s?0:s}function p(t,n){return+i(t)-+i(n)}function m(t,n,e){const r=p(t,n)/1e3;return(o=e?.roundingMethod,t=>{const n=(o?Math[o]:Math.trunc)(t);return 0===n?0:n})(r);var o}const v={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function g(t){return(n={})=>{const e=n.width?String(n.width):t.defaultWidth;return t.formats[e]||t.formats[t.defaultWidth]}}const y={date:g({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:g({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:g({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},b={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function w(t){return(n,e)=>{let r;if("formatting"===(e?.context?String(e.context):"standalone")&&t.formattingValues){const n=t.defaultFormattingWidth||t.defaultWidth,o=e?.width?String(e.width):n;r=t.formattingValues[o]||t.formattingValues[n]}else{const n=t.defaultWidth,o=e?.width?String(e.width):t.defaultWidth;r=t.values[o]||t.values[n]}return r[t.argumentCallback?t.argumentCallback(n):n]}}function x(t){return(n,e={})=>{const r=e.width,o=r&&t.matchPatterns[r]||t.matchPatterns[t.defaultMatchWidth],i=n.match(o);if(!i)return null;const a=i[0],u=r&&t.parsePatterns[r]||t.parsePatterns[t.defaultParseWidth],s=Array.isArray(u)?function(t,n){for(let e=0;e<t.length;e++)if(n(t[e]))return e;return}(u,(t=>t.test(a))):function(t,n){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e)&&n(t[e]))return e;return}(u,(t=>t.test(a)));let c;c=t.valueCallback?t.valueCallback(s):s,c=e.valueCallback?e.valueCallback(c):c;return{value:c,rest:n.slice(a.length)}}}var M;const S={code:"en-US",formatDistance:(t,n,e)=>{let r;const o=v[t];return r="string"==typeof o?o:1===n?o.one:o.other.replace("{{count}}",n.toString()),e?.addSuffix?e.comparison&&e.comparison>0?"in "+r:r+" ago":r},formatLong:y,formatRelative:(t,n,e,r)=>b[t],localize:{ordinalNumber:(t,n)=>{const e=Number(t),r=e%100;if(r>20||r<10)switch(r%10){case 1:return e+"st";case 2:return e+"nd";case 3:return e+"rd"}return e+"th"},era:w({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:w({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:t=>t-1}),month:w({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:w({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:w({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(M={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:t=>parseInt(t,10)},(t,n={})=>{const e=t.match(M.matchPattern);if(!e)return null;const r=e[0],o=t.match(M.parsePattern);if(!o)return null;let i=M.valueCallback?M.valueCallback(o[0]):o[0];return i=n.valueCallback?n.valueCallback(i):i,{value:i,rest:t.slice(r.length)}}),era:x({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:x({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:t=>t+1}),month:x({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:x({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:x({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};let j={};function P(){return j}function D(t){const n=i(t),e=new Date(Date.UTC(n.getFullYear(),n.getMonth(),n.getDate(),n.getHours(),n.getMinutes(),n.getSeconds(),n.getMilliseconds()));return e.setUTCFullYear(n.getFullYear()),+t-+e}function O(t,n,e){const r=P(),o=e?.locale??r.locale??S,c=a(t,n);if(isNaN(c))throw new RangeError("Invalid time value");const f=Object.assign({},e,{addSuffix:e?.addSuffix,comparison:c});let l,d;c>0?(l=i(n),d=i(t)):(l=i(t),d=i(n));const p=m(d,l),v=(D(d)-D(l))/1e3,g=Math.round((p-v)/60);let y;if(g<2)return e?.includeSeconds?p<5?o.formatDistance("lessThanXSeconds",5,f):p<10?o.formatDistance("lessThanXSeconds",10,f):p<20?o.formatDistance("lessThanXSeconds",20,f):p<40?o.formatDistance("halfAMinute",0,f):p<60?o.formatDistance("lessThanXMinutes",1,f):o.formatDistance("xMinutes",1,f):0===g?o.formatDistance("lessThanXMinutes",1,f):o.formatDistance("xMinutes",g,f);if(g<45)return o.formatDistance("xMinutes",g,f);if(g<90)return o.formatDistance("aboutXHours",1,f);if(g<s){const t=Math.round(g/60);return o.formatDistance("aboutXHours",t,f)}if(g<2520)return o.formatDistance("xDays",1,f);if(g<u){const t=Math.round(g/s);return o.formatDistance("xDays",t,f)}if(g<2*u)return y=Math.round(g/u),o.formatDistance("aboutXMonths",y,f);if(y=h(d,l),y<12){const t=Math.round(g/u);return o.formatDistance("xMonths",t,f)}{const t=y%12,n=Math.trunc(y/12);return t<3?o.formatDistance("aboutXYears",n,f):t<9?o.formatDistance("overXYears",n,f):o.formatDistance("almostXYears",n+1,f)}}function C(t,n){return O(t,o(t),n)}}}]);
//# sourceMappingURL=66b2c33f95874a67352e1874a163c1527ccbe3f7-0cc9669dd900a924de65.js.map