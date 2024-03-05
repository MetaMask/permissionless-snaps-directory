"use strict";(self.webpackChunk_metamask_snaps_directory=self.webpackChunk_metamask_snaps_directory||[]).push([[607],{31037:function(e,s,t){t.r(s),t.d(s,{Head:function(){return z},default:function(){return T}});var n=t(57747),a=t(22338),i=t(93717),o=t(49289),r=t(29653),c=t(73586),d=t(85893),l=e=>(0,d.jsx)(c.m.div,{className:"chakra-stack__divider",...e,__css:{...e.__css,borderWidth:0,alignSelf:"stretch",borderColor:"inherit",width:"auto",height:"auto"}});l.displayName="StackDivider";var p=t(36286),m=t(67997),g=t(83706),u=t(77009),x=t(89555),h=t(67294),j=(t(17727),t(4361)),f=t(27239),v=t(48783),_=t(71293),C=t(32883);const S=e=>{let{snapName:s,options:t,onSign:n,onClose:a,isOpen:i}=e;const{0:o,1:r}=(0,h.useState)(!1),{0:c,1:l}=(0,h.useState)([]);return(0,d.jsx)(m.J6,{isOpen:i,isLoading:o,mode:"positive",headerIcon:(0,d.jsx)(m.R,{fill:"info.default"}),buttonText:x.ag._({id:"1q/k4Z"}),onClose:a,onSignButtonClick:()=>{r(!0),n(c).finally((()=>{r(!1)}))},children:(0,d.jsx)(f.M,{children:(0,d.jsxs)(v.g,{textAlign:"center",fontSize:"md",children:[(0,d.jsx)(_.x,{fontWeight:"medium",children:(0,d.jsx)(j.cC,{id:"FfnJo0"})}),(0,d.jsxs)(_.x,{noOfLines:2,fontWeight:"regular",as:"span",children:[(0,d.jsx)(j.cC,{id:"RxWuBX",values:{snapName:s},components:{0:(0,d.jsx)(_.x,{variant:"blue",as:"span"})}})," ",(0,d.jsx)(C.r,{href:"https://support.metamask.io/hc/en-us/articles/23263846792475",target:"_blank",children:(0,d.jsx)(j.cC,{id:"zwWKhA"})})]}),(0,d.jsx)(m.vL,{options:t,onChange:e=>{l(t.filter(((s,t)=>!0===e[t])))}})]})})})};var k=t(16673),w=t(10274),y=t(86007),b=t(72861),N=t(864);const M=e=>{let{address:s,snapChecksum:t,snapName:n}=e;const{signMessage:a,signError:i,snapVCBuilder:o}=(0,k.MS)(),r=o.getIssuerDid(s),c=(0,k.v9)((0,N.kR)(t,r)),l=(0,k.v9)((0,N.S)(t,r)),{0:p,1:g}=(0,h.useState)(!1),{0:u,1:j}=(0,h.useState)(l);(0,h.useEffect)((()=>{j(l)}),[l]);const f=(0,k.I0)(),{showSuccessMsg:v,showErrorMsg:_}=(0,y.Z)();(0,w.C)(i);const C=[x.ag._({id:"3Ypq0g"}),x.ag._({id:"outFNZ"}),x.ag._({id:"OYyc/x"})];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m.zv,{onClick:()=>g(!0),endorsed:u,isDisabled:u||null!==c}),p&&(0,d.jsx)(S,{snapName:n,options:C,isOpen:p,onClose:()=>g(!1),onSign:async e=>{const i=o.buildEndorsedPayload(s,t,e),r=await a(i);if(r){const e=o.getSignedAssertion(i,r);f((0,b.Q)(e)).then((e=>{e.type.endsWith("fulfilled")?(f((0,b.l)(t)).catch((e=>console.log(e))),j(!0),v({title:x.ag._({id:"zzDlyQ"}),description:x.ag._({id:"kD8F0f",values:{snapName:n}})})):_({title:x.ag._({id:"SlfejT"}),description:x.ag._({id:"+gPAqQ",values:{snapName:n}})})})).catch((()=>{_({title:x.ag._({id:"SlfejT"}),description:x.ag._({id:"+gPAqQ",values:{snapName:n}})})}))}g(!1)}})]})},D=e=>{let{snapName:s,options:t,onSign:n,onClose:a,isOpen:i}=e;const{0:o,1:r}=(0,h.useState)(!1),{0:c,1:l}=(0,h.useState)([]);return(0,d.jsx)(m.J6,{isOpen:i,isLoading:o,mode:"negative",headerIcon:(0,d.jsx)(m.wb,{fill:"error.default"}),buttonText:x.ag._({id:"XXFn/n"}),onClose:a,onSignButtonClick:()=>{r(!0),n(c).finally((()=>{r(!1)}))},children:(0,d.jsx)(f.M,{children:(0,d.jsxs)(v.g,{textAlign:"center",fontSize:"md",children:[(0,d.jsx)(_.x,{fontWeight:"medium",children:(0,d.jsx)(j.cC,{id:"jPrBv0"})}),(0,d.jsxs)(_.x,{noOfLines:2,as:"span",children:[(0,d.jsx)(j.cC,{id:"/TQrOB",values:{snapName:s},components:{0:(0,d.jsx)(_.x,{variant:"blue",as:"span"})}})," ",(0,d.jsx)(C.r,{href:"https://support.metamask.io/hc/en-us/articles/23263846792475",target:"_blank",children:(0,d.jsx)(j.cC,{id:"zwWKhA"})})]}),(0,d.jsx)(m.vL,{options:t,onChange:e=>{l(t.filter(((s,t)=>!0===e[t])))}})]})})})};var I=t(23078);const W=e=>{let{address:s,snapChecksum:t,snapName:n}=e;const{signMessage:a,signError:i,snapVCBuilder:o}=(0,k.MS)(),r=o.getIssuerDid(s),c=(0,k.v9)((0,N.kR)(t,r)),l=(0,k.v9)((0,N.U)(t,r)),{0:p,1:g}=(0,h.useState)(!1),{0:u,1:j}=(0,h.useState)(l);(0,h.useEffect)((()=>{j(l)}),[l]);const f=(0,k.I0)(),{showSuccessMsg:v,showErrorMsg:_}=(0,y.Z)();(0,w.C)(i);const C=[x.ag._({id:"hx872x"}),x.ag._({id:"2VFrSq"})];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m.f4,{onClick:()=>g(!0),reported:u,isDisabled:u||c===I.m.Disputed}),p&&(0,d.jsx)(D,{snapName:n,options:C,isOpen:p,onClose:()=>g(!1),onSign:async e=>{const i=o.buildDisputedPayload(s,t,e),r=await a(i);if(r){const e=o.getSignedAssertion(i,r);f((0,b.Q)(e)).then((async e=>{e.type.endsWith("fulfilled")?(f((0,b.l)(t)).catch((e=>console.log(e))),j(!0),v({title:x.ag._({id:"zzDlyQ"}),description:x.ag._({id:"4qs+Lf",values:{snapName:n}})})):_({title:x.ag._({id:"SlfejT"}),description:x.ag._({id:"idKc0V",values:{snapName:n}})})})).catch((()=>{_({title:x.ag._({id:"SlfejT"}),description:x.ag._({id:"idKc0V",values:{snapName:n}})})}))}g(!1)}})]})},z=e=>{let{data:s}=e;const t=s.snap.name+" on the MetaMask Snaps Directory",n="Customize your web3 experience with "+s.snap.name+".",a=""+s.site.siteMetadata.siteUrl+s.snap.banner.publicURL;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("html",{lang:"en"}),(0,d.jsx)("title",{children:t}),(0,d.jsx)("meta",{name:"description",content:n}),(0,d.jsx)("meta",{property:"og:title",content:s.snap.name}),(0,d.jsx)("meta",{property:"og:site_name",content:s.site.siteMetadata.title}),(0,d.jsx)("meta",{property:"og:description",content:n}),(0,d.jsx)("meta",{property:"og:type",content:"website"}),(0,d.jsx)("meta",{name:"og:image",content:a}),(0,d.jsx)("meta",{name:"og:image:width",content:"1200"}),(0,d.jsx)("meta",{name:"og:image:height",content:"630"}),(0,d.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,d.jsx)("meta",{name:"twitter:creator",content:s.site.siteMetadata.author}),(0,d.jsx)("meta",{name:"twitter:title",content:s.snap.name}),(0,d.jsx)("meta",{name:"twitter:description",content:n}),(0,d.jsx)("meta",{name:"twitter:image",content:a})]})};var T=e=>{let{data:s}=e;const{name:t,snapId:c,icon:x,website:h,onboard:j,description:f,latestVersion:v,latestChecksum:_,category:C,permissions:S}=s.snap,{data:k}=(0,u.xP)(),w=Boolean(null==k?void 0:k[c]),{address:y,isConnected:b}=(0,p.mA)();return(0,d.jsxs)(n.xu,{position:"relative",children:[(0,d.jsx)(n.xu,{pointerEvents:"none",position:"absolute",top:"-50%",width:"100%",height:"75%",sx:{background:'url("'+x+'") no-repeat center center',backgroundSize:"cover",filter:"blur(96px) saturate(1.2)",opacity:"0.25"}}),(0,d.jsxs)(a.W,{maxWidth:"container.xl",paddingTop:"0",marginTop:"20",children:[(0,d.jsx)(u.vW,{snapId:c,version:v}),(0,d.jsxs)(i.k,{flexDirection:["column",null,"row"],justifyContent:"space-between",alignItems:"center",gap:"6",children:[(0,d.jsx)(u.yl,{name:t,icon:x,snapId:c}),(0,d.jsxs)(i.k,{alignItems:"center",gap:"4",width:["100%",null,"auto"],children:[b&&y&&(0,d.jsx)(W,{snapName:t,snapChecksum:_,address:y}),b&&y&&(0,d.jsx)(M,{snapName:t,snapChecksum:_,address:y}),!j&&(0,d.jsx)(m.vU,{snapId:c,name:t,icon:x,website:h,version:v}),(w||j)&&h&&(0,d.jsx)(m.gD,{snapId:c,website:h})]})]}),(0,d.jsx)(o.i,{marginY:"8"}),(0,d.jsx)(u.SF,{snap:s.snap}),(0,d.jsx)(o.i,{marginTop:"8",marginBottom:"12"}),(0,d.jsxs)(r.K,{direction:["column",null,null,"row"],divider:(0,d.jsx)(l,{}),marginTop:"2",marginBottom:"12",spacing:"8",children:[(0,d.jsx)(u.dk,{name:t,description:f}),(0,d.jsx)(u.Pl,{snap:s.snap,permissions:S})]}),C&&C!==g.pN.AccountManagement&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.i,{my:"12"}),(0,d.jsx)(u.Dt,{snapId:c,category:C})]})]})]})}}}]);
//# sourceMappingURL=component---src-pages-snap-snap-location-snap-slug-tsx-8177e79dee8fdaf430e3.js.map