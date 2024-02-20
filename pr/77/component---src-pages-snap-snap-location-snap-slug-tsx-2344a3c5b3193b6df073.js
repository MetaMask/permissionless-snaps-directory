"use strict";(self.webpackChunk_metamask_snaps_directory=self.webpackChunk_metamask_snaps_directory||[]).push([[607],{17583:function(e,t,n){n.r(t),n.d(t,{Head:function(){return S},default:function(){return k}});var s=n(4361),a=n(57747),i=n(22338),o=n(93717),r=n(49289),d=n(71293),c=n(36286),l=n(79487),p=n(73419),m=n(39877),x=n(89555),g=n(67294),u=(n(17727),n(27239)),j=n(48783),h=n(32883),f=n(85893);const v=e=>{let{snapName:t,options:n,onSign:a,onClose:i,isOpen:o}=e;const{0:r,1:c}=(0,g.useState)(!1),{0:p,1:m}=(0,g.useState)([]);return(0,f.jsx)(l.J6,{isOpen:o,isLoading:r,mode:"negative",headerIcon:(0,f.jsx)(l.wb,{}),buttonText:x.ag._({id:"XXFn/n"}),onClose:i,onSignButtonClick:()=>{c(!0),a(p).finally((()=>{c(!1)}))},children:(0,f.jsx)(u.M,{children:(0,f.jsxs)(j.g,{textAlign:"center",children:[(0,f.jsx)(d.x,{fontSize:"md",fontWeight:"bold",children:(0,f.jsx)(s.cC,{id:"XgT4d5",values:{snapName:t},components:{0:(0,f.jsx)(d.x,{variant:"blue",as:"span"})}})}),(0,f.jsxs)(d.x,{fontSize:"sm",noOfLines:2,as:"span",children:[(0,f.jsx)(s.cC,{id:"f2Neja"}),(0,f.jsx)(h.r,{children:(0,f.jsx)(s.cC,{id:"zwWKhA"})})]}),(0,f.jsx)(l.vL,{options:n,onChange:e=>{m(n.filter(((t,n)=>!0===e[n])))}})]})})})};var w=n(16673),y=n(86007),b=n(8573);const _=e=>{let{address:t,snapId:n,snapName:s}=e;const{0:a,1:i}=(0,g.useState)(!1),{showSuccessMsg:o}=(0,y.Z)(),{signMessage:r,signError:d,snapVCBuilder:c}=(0,w.MS)();!function(e,t){const{showErrorMsg:n}=(0,y.Z)();(0,g.useEffect)((()=>{if(e){var s,a,i,o;const l=x.ag._({id:"LobdAW"}),p=x.ag._({id:"LobdAW"}),m=null!=t?t:{};for(const t in b.k){var r;if(!m[t])if(t===b.k.SignError)m[t]={title:x.ag._({id:"raYR0T"}),description:null!==(r=null==e?void 0:e.message)&&void 0!==r?r:x.ag._({id:"raYR0T"})};else if(t===b.k.VerifyError){var d;m[t]={title:x.ag._({id:"7caB2M"}),description:null!==(d=null==e?void 0:e.message)&&void 0!==d?d:x.ag._({id:"7caB2M"})}}else{var c;m[t]={title:x.ag._({id:"DZ950Y"}),description:null!==(c=null==e?void 0:e.message)&&void 0!==c?c:x.ag._({id:"DZ950Y"})}}}n({title:null!==(s=null===(a=m[e.type])||void 0===a?void 0:a.title)&&void 0!==s?s:l,description:null!==(i=null===(o=m[e.type])||void 0===o?void 0:o.description)&&void 0!==i?i:p})}}),[e,t,n])}(d);const p=[x.ag._({id:"hx872x"}),x.ag._({id:"2VFrSq"})];return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(l.f4,{onClick:()=>i(!0),reported:!1,size:"lg"}),a&&(0,f.jsx)(v,{snapName:s,options:p,isOpen:a,onClose:()=>i(!1),onSign:async e=>{const a=c.buildDisputedPayload(t,n,e),d=await r(a);if(d){const e=c.getSignedAssertion(a,d);console.log("Snap Report assertion",e),o({title:x.ag._({id:"zzDlyQ"}),description:x.ag._({id:"4qs+Lf",values:{snapName:s}})})}i(!1)}})]})},S=e=>{let{data:t}=e;const n=t.snap.name+" on the MetaMask Snaps Directory",s="Customize your web3 experience with "+t.snap.name+".",a=""+t.site.siteMetadata.siteUrl+t.snap.banner.publicURL;return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)("html",{lang:"en"}),(0,f.jsx)("title",{children:n}),(0,f.jsx)("meta",{name:"description",content:s}),(0,f.jsx)("meta",{property:"og:title",content:t.snap.name}),(0,f.jsx)("meta",{property:"og:site_name",content:t.site.siteMetadata.title}),(0,f.jsx)("meta",{property:"og:description",content:s}),(0,f.jsx)("meta",{property:"og:type",content:"website"}),(0,f.jsx)("meta",{name:"og:image",content:a}),(0,f.jsx)("meta",{name:"og:image:width",content:"1200"}),(0,f.jsx)("meta",{name:"og:image:height",content:"630"}),(0,f.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,f.jsx)("meta",{name:"twitter:creator",content:t.site.siteMetadata.author}),(0,f.jsx)("meta",{name:"twitter:title",content:t.snap.name}),(0,f.jsx)("meta",{name:"twitter:description",content:s}),(0,f.jsx)("meta",{name:"twitter:image",content:a})]})};var k=e=>{let{data:t}=e;const{name:n,snapId:x,icon:g,website:u,onboard:j,description:h,latestVersion:v,category:w}=t.snap,{data:y}=(0,p.xP)(),b=Boolean(null==y?void 0:y[x]),{address:S,isConnected:k}=(0,c.mA)();return(0,f.jsxs)(a.xu,{position:"relative",children:[(0,f.jsx)(a.xu,{pointerEvents:"none",position:"absolute",top:"-50%",width:"100%",height:"75%",sx:{background:'url("'+g+'") no-repeat center center',backgroundSize:"cover",filter:"blur(96px) saturate(1.2)",opacity:"0.25"}}),(0,f.jsxs)(i.W,{maxWidth:"container.xl",paddingTop:"0",marginTop:"20",children:[(0,f.jsx)(m.vW,{snapId:x,version:v}),(0,f.jsxs)(o.k,{flexDirection:["column",null,"row"],justifyContent:"space-between",alignItems:"center",gap:"6",children:[(0,f.jsx)(p.yl,{name:n,icon:g,snapId:x}),(0,f.jsxs)(o.k,{alignItems:"center",gap:"4",width:["100%",null,"auto"],children:[k&&S&&(0,f.jsx)(_,{snapName:n,snapId:x,address:S}),!j&&(0,f.jsx)(l.vU,{snapId:x,name:n,icon:g,website:u,version:v}),(b||j)&&u&&(0,f.jsx)(l.gD,{snapId:x,website:u})]})]}),(0,f.jsx)(r.i,{marginY:"6"}),(0,f.jsx)(p.SF,{snap:t.snap}),(0,f.jsx)(d.x,{color:"text.alternative",textTransform:"uppercase",fontWeight:"medium",fontSize:"sm",children:(0,f.jsx)(s.cC,{id:"68m/mh",values:{name:n},components:{0:(0,f.jsx)(d.x,{as:"span",color:"text.default",textTransform:"uppercase",fontWeight:"medium",fontSize:"sm"})}})}),(0,f.jsx)(p.dk,{description:h,marginTop:"2",whiteSpace:"pre-wrap"}),w&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(r.i,{my:"12"}),(0,f.jsx)(p.Dt,{snapId:x,category:w})]})]})]})}}}]);
//# sourceMappingURL=component---src-pages-snap-snap-location-snap-slug-tsx-2344a3c5b3193b6df073.js.map