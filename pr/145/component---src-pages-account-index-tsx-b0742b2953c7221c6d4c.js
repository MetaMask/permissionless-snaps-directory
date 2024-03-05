"use strict";(self.webpackChunk_metamask_snaps_directory=self.webpackChunk_metamask_snaps_directory||[]).push([[956,218],{32513:function(e,t,s){s.r(t),s.d(t,{Head:function(){return g}});var i=s(4361),n=s(22338),a=s(22757),r=s(54769),o=s(11883),d=s(59605),c=s(67997),l=s(85893);const g=e=>{let{data:t}=e;const s="Page not found - "+t.site.siteMetadata.title,i=""+t.site.siteMetadata.siteUrl+(0,o.withPrefix)(d.Z);return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("html",{lang:"en"}),(0,l.jsx)("title",{children:s}),(0,l.jsx)("meta",{name:"description",content:t.site.siteMetadata.description}),(0,l.jsx)("meta",{property:"og:title",content:"Page not found"}),(0,l.jsx)("meta",{property:"og:site_name",content:t.site.siteMetadata.title}),(0,l.jsx)("meta",{property:"og:description",content:t.site.siteMetadata.description}),(0,l.jsx)("meta",{property:"og:type",content:"website"}),(0,l.jsx)("meta",{name:"og:image",content:i}),(0,l.jsx)("meta",{name:"og:image:width",content:"1200"}),(0,l.jsx)("meta",{name:"og:image:height",content:"630"}),(0,l.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,l.jsx)("meta",{name:"twitter:creator",content:t.site.siteMetadata.author}),(0,l.jsx)("meta",{name:"twitter:title",content:s}),(0,l.jsx)("meta",{name:"twitter:description",content:t.site.siteMetadata.description}),(0,l.jsx)("meta",{name:"twitter:image",content:i})]})};t.default=()=>(0,l.jsxs)(n.W,{display:"flex",flexDirection:"column",marginY:"12",alignItems:"center",textAlign:"center",maxWidth:"container.md",children:[(0,l.jsx)(c.iQ,{}),(0,l.jsx)(a.X,{as:"h1",fontSize:["2xl","4xl","5xl"],marginY:"6",lineHeight:"116%",children:(0,l.jsx)(i.cC,{id:"t+RSJR"})}),(0,l.jsx)(o.Link,{to:"/",children:(0,l.jsx)(r.z,{variant:"primary",children:(0,l.jsx)(i.cC,{id:"iWpEwy"})})})]})},90632:function(e,t,s){s.r(t),s.d(t,{Head:function(){return X},default:function(){return H}});var i=s(89555),n=s(57747),a=s(22338),r=s(48783),o=s(34292),d=s(11883),c=s(67294),l=s(36286),g=s(59605),u=s(85893);s(51037);var m=s(22757),x=s(73586),h=e=>(0,u.jsx)(x.m.circle,{cx:50,cy:50,r:42,fill:"transparent",...e});h.displayName="Circle";var p=s(70917);var j=(0,p.F4)({"0%":{strokeDasharray:"1, 400",strokeDashoffset:"0"},"50%":{strokeDasharray:"400, 400",strokeDashoffset:"-100"},"100%":{strokeDasharray:"400, 400",strokeDashoffset:"-260"}}),v=(0,p.F4)({"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}});(0,p.F4)({"0%":{left:"-40%"},"100%":{left:"100%"}}),(0,p.F4)({from:{backgroundPosition:"1rem 0"},to:{backgroundPosition:"0 0"}});var f=e=>{const{size:t,isIndeterminate:s,...i}=e;return(0,u.jsx)(x.m.svg,{viewBox:"0 0 100 100",__css:{width:t,height:t,animation:s?`${v} 2s linear infinite`:void 0},...i})};f.displayName="Shape";var y=(0,s(16554).G)(((e,t)=>{var s;const{size:i="48px",max:n=100,min:a=0,valueText:r,getValueText:o,value:d,capIsRound:c,children:l,thickness:g="10px",color:m="#0078d4",trackColor:p="#edebe9",isIndeterminate:v,...y}=e,k=function(e){const{value:t=0,min:s,max:i,valueText:n,getValueText:a,isIndeterminate:r,role:o="progressbar"}=e,d=function(e,t,s){return 100*(e-t)/(s-t)}(t,s,i);return{bind:{"data-indeterminate":r?"":void 0,"aria-valuemax":i,"aria-valuemin":s,"aria-valuenow":r?void 0:t,"aria-valuetext":(()=>{if(null!=t)return"function"==typeof a?a(t,d):n})(),role:o},percent:d,value:t}}({min:a,max:n,value:d,valueText:r,getValueText:o,isIndeterminate:v}),_=v?void 0:2.64*(null!=(s=k.percent)?s:0),S=v?{css:{animation:`${j} 1.5s linear infinite`}}:{strokeDashoffset:66,strokeDasharray:null==_?void 0:`${_} ${264-_}`,transitionProperty:"stroke-dasharray, stroke",transitionDuration:"0.6s",transitionTimingFunction:"ease"},b={display:"inline-block",position:"relative",verticalAlign:"middle",fontSize:i};return(0,u.jsxs)(x.m.div,{ref:t,className:"chakra-progress",...k.bind,...y,__css:b,children:[(0,u.jsxs)(f,{size:i,isIndeterminate:v,children:[(0,u.jsx)(h,{stroke:p,strokeWidth:g,className:"chakra-progress__track"}),(0,u.jsx)(h,{stroke:m,strokeWidth:g,className:"chakra-progress__indicator",strokeLinecap:c?"round":void 0,opacity:0!==k.value||v?void 0:0,...S})]}),l]})}));y.displayName="CircularProgress";var k=s(66403),_=s(79049),S=s(67997),b=s(16673),w=s(55076),C=s(39282);const A=e=>{let{address:t}=e;const{data:s,isLoading:i}=(0,l.F6)({address:t,chainId:k.R.id}),{isConnected:n}=(0,l.mA)(),{accountVCBuilder:a}=(0,b.MS)(),d=a.getSubjectDid(t),c=(0,b.v9)((0,C.Yk)(d));return(0,u.jsxs)(r.g,{spacing:"8","data-testid":"account-info",children:[(0,u.jsx)(S.IP,{address:t,size:130}),c.length>0&&(0,u.jsx)(_.H,{trustScores:c}),(0,u.jsxs)(o.U,{children:[(0,u.jsx)(m.X,{as:"h3",fontSize:"3xl",color:"text.alternative",textAlign:"center",children:i?(0,u.jsx)(y,{value:80,"data-testid":"account-info-loading"}):null!=s?s:(0,w.nQ)(t)}),n&&(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(B,{subjectAddress:t})})]})]})};s(17727);var M=s(10274);s(46688);var I=s(4361),z=s(27239),D=s(71293),E=s(32883);const T=e=>{let{reportEntity:t,options:s,onSign:n,onClose:a,visibility:o}=e;const{0:d,1:l}=(0,c.useState)(!1),{0:g,1:m}=(0,c.useState)([]);return(0,u.jsx)(S.J6,{isOpen:o,isLoading:d,mode:"negative",headerIcon:(0,u.jsx)(S.wb,{}),buttonText:i.ag._({id:"XXFn/n"}),onClose:a,onSignButtonClick:()=>{l(!0),n(g).finally((()=>{l(!1)}))},children:(0,u.jsx)(z.M,{children:(0,u.jsxs)(r.g,{textAlign:"center",fontSize:"md",children:[(0,u.jsx)(D.x,{fontWeight:"medium",children:(0,u.jsx)(I.cC,{id:"yeUrSM"})}),(0,u.jsxs)(D.x,{noOfLines:2,as:"span",children:[(0,u.jsx)(I.cC,{id:"S5cpjz",values:{reportEntity:t},components:{0:(0,u.jsx)(D.x,{variant:"blue",as:"span"})}})," ",(0,u.jsx)(E.r,{href:"https://support.metamask.io/hc/en-us/articles/23263846792475",target:"_blank",children:(0,u.jsx)(I.cC,{id:"zwWKhA"})})]}),(0,u.jsx)(S.vL,{options:s,onChange:e=>{m(s.filter(((t,s)=>!0===e[s])))}})]})})})};var F=s(15785),P=s(73552);const W=e=>{let{trustEntity:t,options:s,onSign:a,onClose:o,visibility:d}=e;const{0:l,1:g}=(0,c.useState)(!1),{0:m,1:x}=(0,c.useState)(s.map((()=>!1)));return(0,u.jsx)(S.J6,{isOpen:d,isLoading:l,mode:"positive",headerIcon:(0,u.jsx)(S.gF,{}),buttonText:i.ag._({id:"c+Fnce"}),onClose:o,onSignButtonClick:()=>{g(!0);const e=[];m.forEach(((t,i)=>{var n;t&&e.push(null===(n=s[i])||void 0===n?void 0:n.value)})),a(e).finally((()=>{g(!1)}))},children:(0,u.jsx)(z.M,{children:(0,u.jsxs)(r.g,{fontSize:"md",children:[(0,u.jsx)(D.x,{fontWeight:"medium",textAlign:"center",children:(0,u.jsx)(I.cC,{id:"gbyXVL"})}),(0,u.jsxs)(D.x,{textAlign:"center",children:[(0,u.jsx)(I.cC,{id:"gMCAw+",values:{trustEntity:t},components:{0:(0,u.jsx)(D.x,{variant:"blue",as:"span"})}})," ",(0,u.jsx)(E.r,{href:"https://support.metamask.io/hc/en-us/articles/23263846792475",target:"_blank",children:(0,u.jsx)(I.cC,{id:"zwWKhA"})})]}),s.map(((e,t)=>(0,u.jsx)(n.xu,{background:"background.default",padding:"1rem",borderRadius:"1rem",width:"100%",mt:"1rem",children:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(P.X,{size:"md",borderRadius:"0.25rem",padding:"0.012rem",marginInline:"1",value:e.value,onChange:e=>((e,t)=>{m[t]=e,x((0,F.Z)(m))})(e.target.checked,t),children:(0,u.jsx)(D.x,{children:e.label})}),e.description&&(0,u.jsx)(D.x,{fontSize:"xs",children:e.description})]})},t)))]})})})};var L=s(78985),Q=s(25120),V=s(86007);const Z=e=>{let{address:t,connectedAddress:s}=e;const{data:n}=(0,l.F6)({address:t,chainId:k.R.id}),{signMessage:a,signError:r,accountVCBuilder:o}=(0,b.MS)(),d=(0,c.useMemo)((()=>(0,w.nQ)(t)),[t]),g=o.getSubjectDid(t),m=o.getSubjectDid(s),x=(0,b.v9)((0,Q.QQ)(g,m)),h=(0,b.v9)((0,Q.k$)(g,m)),p=null!=n?n:d,{0:j,1:v}=(0,c.useState)(!1),{0:f,1:y}=(0,c.useState)(h);(0,c.useEffect)((()=>{y(h)}),[h]);const _=(0,b.I0)(),{showSuccessMsg:C,showErrorMsg:A}=(0,V.Z)();(0,M.C)(r);const I=[i.ag._({id:"SKscGZ"}),i.ag._({id:"iznBqK"}),i.ag._({id:"EyQMHI"}),i.ag._({id:"Dc4FWe"}),i.ag._({id:"/IX/7x"})];return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(S.f4,{onClick:()=>v(!0),reported:f,isDisabled:f||void 0!==x&&x<0}),j&&(0,u.jsx)(T,{reportEntity:p,visibility:j,onClose:()=>v(!1),options:I,onSign:async e=>{const n=o.buildReportAccountTrust(s,t,e),r=await a(n);if(r){const e=o.getSignedAssertion(n,r);_((0,L.o)(e)).then((e=>{e.type.endsWith("fulfilled")?(_((0,L.Z)(g)).catch((e=>console.log(e))),y(!0),C({title:i.ag._({id:"zzDlyQ"}),description:i.ag._({id:"F0uWtP",values:{pkhAddress:g}})})):A({title:i.ag._({id:"SlfejT"}),description:i.ag._({id:"oVL5zv",values:{pkhAddress:g}})})})).catch((()=>{A({title:i.ag._({id:"SlfejT"}),description:i.ag._({id:"oVL5zv",values:{pkhAddress:g}})})}))}v(!1)}})]})};var N=s(8573);const R=e=>{let{address:t,connectedAddress:s}=e;const{data:n}=(0,l.F6)({address:t,chainId:k.R.id}),{signMessage:a,signError:r,accountVCBuilder:o}=(0,N.M)(),d=(0,c.useMemo)((()=>(0,w.nQ)(t)),[t]),g=o.getSubjectDid(t),m=o.getSubjectDid(s),x=(0,b.v9)((0,Q.QQ)(g,m)),h=(0,b.v9)((0,Q.L$)(g,m)),p=null!=n?n:d,{0:j,1:v}=(0,c.useState)(!1),{0:f,1:y}=(0,c.useState)(h);(0,c.useEffect)((()=>{y(h)}),[h]);const _=(0,b.I0)(),{showSuccessMsg:C,showErrorMsg:A}=(0,V.Z)();(0,M.C)(r);const I=[{label:i.ag._({id:"wIb7Ng"}),description:i.ag._({id:"71KIfp"}),value:w.Sy.SoftwareDevelopment},{label:i.ag._({id:"Zjm4eo"}),description:i.ag._({id:"z1Ji0P"}),value:w.Sy.SoftwareSecurity}];return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(S.zv,{onClick:()=>v(!0),endorsed:f,isDisabled:f||void 0!==x}),j&&(0,u.jsx)(W,{trustEntity:p,visibility:j,onClose:()=>v(!1),options:I,onSign:async e=>{const n=o.buildTechnicalExpertiseTrust(s,t,(e=>{const t=new Set(e);return I.map((e=>({scope:e.value,level:t.has(e.value)?1:0})))})(e)),r=await a(n);if(r){const e=o.getSignedAssertion(n,r);_((0,L.o)(e)).then((e=>{e.type.endsWith("fulfilled")?(_((0,L.Z)(g)).catch((e=>console.log(e))),y(!0),C({title:i.ag._({id:"zzDlyQ"}),description:i.ag._({id:"jmmtNJ",values:{pkhAddress:g}})})):A({title:i.ag._({id:"SlfejT"}),description:i.ag._({id:"cle6Nm",values:{pkhAddress:g}})})})).catch((()=>{A({title:i.ag._({id:"SlfejT"}),description:i.ag._({id:"cle6Nm",values:{pkhAddress:g}})})}))}v(!1)}})]})},B=e=>{let{subjectAddress:t}=e;const{chain:s}=(0,l.LN)(),{address:n}=(0,l.mA)(),{showSuccessMsg:a,showErrorMsg:r}=(0,V.Z)(),o=(0,c.useCallback)((()=>{navigator.clipboard.writeText(window.location.origin+"/account/?address="+t).then((()=>{a({title:i.ag._({id:"6V3Ea3"}),description:i.ag._({id:"T4qWIH"})})})).catch((()=>{r({title:i.ag._({id:"SlfejT"}),description:i.ag._({id:"JJPmxk"})})}))}),[t,r,a]),d=(0,c.useCallback)((()=>{var e,t;window.open((null==s||null===(e=s.blockExplorers)||void 0===e||null===(t=e.etherscan)||void 0===t?void 0:t.url)+"/address/"+n)}),[s,n]);return(0,u.jsxs)(S.dc,{icon:(0,u.jsx)(S.jA,{}),children:[(0,u.jsx)(S.Pw,{icon:(0,u.jsx)(S.aA,{}),label:i.ag._({id:"odV8U+"}),testId:"copy-profile-link",onClick:()=>{o()}}),(0,u.jsx)(S.Pw,{icon:(0,u.jsx)(S.ty,{}),label:i.ag._({id:"nS3bjC"}),testId:"etherscan",onClick:()=>d()})]})};var J=s(96005),U=s(32513);const X=e=>{let{data:t}=e;const s=i.ag._({id:"Ay/P5p"}),n=i.ag._({id:"5fPx0e"}),a=i.ag._({id:"M0QmOE"}),r=""+t.site.siteMetadata.siteUrl+(0,d.withPrefix)(g.Z);return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("html",{lang:"en"}),(0,u.jsx)("title",{children:n}),(0,u.jsx)("meta",{name:"description",content:a}),(0,u.jsx)("meta",{property:"og:title",content:s}),(0,u.jsx)("meta",{property:"og:site_name",content:t.site.siteMetadata.title}),(0,u.jsx)("meta",{property:"og:description",content:a}),(0,u.jsx)("meta",{property:"og:type",content:"website"}),(0,u.jsx)("meta",{name:"og:image",content:r}),(0,u.jsx)("meta",{name:"og:image:width",content:"1200"}),(0,u.jsx)("meta",{name:"og:image:height",content:"630"}),(0,u.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,u.jsx)("meta",{name:"twitter:creator",content:t.site.siteMetadata.author}),(0,u.jsx)("meta",{name:"twitter:title",content:s}),(0,u.jsx)("meta",{name:"twitter:description",content:a}),(0,u.jsx)("meta",{name:"twitter:image",content:r})]})};var H=e=>{let{location:t}=e;const{address:s,isConnected:i}=(0,l.mA)(),d=new URLSearchParams(t.search),g=(0,w.Cy)(d.get("address")),{accountVCBuilder:m}=(0,b.MS)(),x=(0,b.I0)();(0,c.useEffect)((()=>{if(g){const e=m.getIssuerDid(g);x((0,L.Z)(e)).catch((e=>console.log(e))),x((0,J.T)(e)).catch((e=>console.log(e)))}}),[x,m,g]);const h=g===s;return g?(0,u.jsx)(n.xu,{position:"relative","data-testid":"account-info",mt:"4rem",children:(0,u.jsx)(a.W,{maxWidth:"container.xl",paddingTop:"0",position:"relative",children:(0,u.jsxs)(r.g,{spacing:"8",children:[(0,u.jsx)(A,{address:g}),(0,u.jsx)(o.U,{children:i&&!h&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(Z,{address:g,connectedAddress:s}),(0,u.jsx)(R,{address:g,connectedAddress:s})]})})]})})}):(0,u.jsx)(U.default,{})}},59605:function(e,t,s){t.Z=s.p+"static/home-3da7273f125d0f7c0add3b849d33e152.png"}}]);
//# sourceMappingURL=component---src-pages-account-index-tsx-b0742b2953c7221c6d4c.js.map