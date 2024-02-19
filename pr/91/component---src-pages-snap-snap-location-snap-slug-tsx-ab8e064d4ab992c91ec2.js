"use strict";(self.webpackChunk_metamask_snaps_directory=self.webpackChunk_metamask_snaps_directory||[]).push([[607],{31037:function(e,n,s){s.r(n),s.d(n,{Head:function(){return M},default:function(){return I}});var t=s(57747),a=s(22338),i=s(93717),o=s(49289),r=s(29653),c=s(73586),d=s(85893),l=e=>(0,d.jsx)(c.m.div,{className:"chakra-stack__divider",...e,__css:{...e.__css,borderWidth:0,alignSelf:"stretch",borderColor:"inherit",width:"auto",height:"auto"}});l.displayName="StackDivider";var p=s(36286),m=s(72378),x=s(83706),g=s(79690),j=s(89555),u=s(67294),h=(s(17727),s(4361)),C=s(27239),S=s(48783),f=s(71293),v=s(32883);const w=e=>{let{snapName:n,options:s,onSign:t,onClose:a,isOpen:i}=e;const{0:o,1:r}=(0,u.useState)(!1),{0:c,1:l}=(0,u.useState)([]);return(0,d.jsx)(m.J6,{isOpen:i,isLoading:o,mode:"positive",headerIcon:(0,d.jsx)(m.e0,{}),buttonText:j.ag._({id:"1q/k4Z"}),onClose:a,onSignButtonClick:()=>{r(!0),t(c).finally((()=>{r(!1)}))},children:(0,d.jsx)(C.M,{children:(0,d.jsxs)(S.g,{textAlign:"center",children:[(0,d.jsx)(f.x,{fontSize:"md",fontWeight:"bold",children:(0,d.jsx)(h.cC,{id:"aOR8+o",values:{snapName:n},components:{0:(0,d.jsx)(f.x,{variant:"blue",as:"span"})}})}),(0,d.jsxs)(f.x,{fontSize:"sm",noOfLines:2,as:"span",children:[(0,d.jsx)(h.cC,{id:"2UHCBK"}),(0,d.jsx)(v.r,{children:(0,d.jsx)(h.cC,{id:"zwWKhA"})})]}),(0,d.jsx)(m.vL,{options:s,onChange:e=>{l(s.filter(((n,s)=>!0===e[s])))}})]})})})};var b=s(16673),y=s(10274),_=s(86007);const k=e=>{let{address:n,snapId:s,snapName:t}=e;const{0:a,1:i}=(0,u.useState)(!1),{showSuccessMsg:o}=(0,_.Z)(),{signMessage:r,signError:c,snapVCBuilder:l}=(0,b.MS)();(0,y.C)(c);const p=[j.ag._({id:"3Ypq0g"}),j.ag._({id:"outFNZ"}),j.ag._({id:"OYyc/x"})];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m.zv,{onClick:()=>i(!0),endorsed:!1,size:"lg"}),a&&(0,d.jsx)(w,{snapName:t,options:p,isOpen:a,onClose:()=>i(!1),onSign:async e=>{const a=l.buildEndorsedPayload(n,s,e),c=await r(a);if(c){const e=l.getSignedAssertion(a,c);console.log("Snap Endorse assertion",e),o({title:j.ag._({id:"zzDlyQ"}),description:j.ag._({id:"kD8F0f",values:{snapName:t}})})}i(!1)}})]})},N=e=>{let{snapName:n,options:s,onSign:t,onClose:a,isOpen:i}=e;const{0:o,1:r}=(0,u.useState)(!1),{0:c,1:l}=(0,u.useState)([]);return(0,d.jsx)(m.J6,{isOpen:i,isLoading:o,mode:"negative",headerIcon:(0,d.jsx)(m.wb,{}),buttonText:j.ag._({id:"XXFn/n"}),onClose:a,onSignButtonClick:()=>{r(!0),t(c).finally((()=>{r(!1)}))},children:(0,d.jsx)(C.M,{children:(0,d.jsxs)(S.g,{textAlign:"center",children:[(0,d.jsx)(f.x,{fontSize:"md",fontWeight:"bold",children:(0,d.jsx)(h.cC,{id:"XgT4d5",values:{snapName:n},components:{0:(0,d.jsx)(f.x,{variant:"blue",as:"span"})}})}),(0,d.jsxs)(f.x,{fontSize:"sm",noOfLines:2,as:"span",children:[(0,d.jsx)(h.cC,{id:"f2Neja"}),(0,d.jsx)(v.r,{children:(0,d.jsx)(h.cC,{id:"zwWKhA"})})]}),(0,d.jsx)(m.vL,{options:s,onChange:e=>{l(s.filter(((n,s)=>!0===e[s])))}})]})})})},z=e=>{let{address:n,snapChecksum:s,snapName:t}=e;const{0:a,1:i}=(0,u.useState)(!1),{showSuccessMsg:o}=(0,_.Z)(),{signMessage:r,signError:c,snapVCBuilder:l}=(0,b.MS)();(0,y.C)(c);const p=[j.ag._({id:"hx872x"}),j.ag._({id:"2VFrSq"})];return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(m.f4,{onClick:()=>i(!0),reported:!1,size:"lg"}),a&&(0,d.jsx)(N,{snapName:t,options:p,isOpen:a,onClose:()=>i(!1),onSign:async e=>{const a=l.buildDisputedPayload(n,s,e),c=await r(a);if(c){const e=l.getSignedAssertion(a,c);console.log("Snap Report assertion",e),o({title:j.ag._({id:"zzDlyQ"}),description:j.ag._({id:"4qs+Lf",values:{snapName:t}})})}i(!1)}})]})},M=e=>{let{data:n}=e;const s=n.snap.name+" on the MetaMask Snaps Directory",t="Customize your web3 experience with "+n.snap.name+".",a=""+n.site.siteMetadata.siteUrl+n.snap.banner.publicURL;return(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("html",{lang:"en"}),(0,d.jsx)("title",{children:s}),(0,d.jsx)("meta",{name:"description",content:t}),(0,d.jsx)("meta",{property:"og:title",content:n.snap.name}),(0,d.jsx)("meta",{property:"og:site_name",content:n.site.siteMetadata.title}),(0,d.jsx)("meta",{property:"og:description",content:t}),(0,d.jsx)("meta",{property:"og:type",content:"website"}),(0,d.jsx)("meta",{name:"og:image",content:a}),(0,d.jsx)("meta",{name:"og:image:width",content:"1200"}),(0,d.jsx)("meta",{name:"og:image:height",content:"630"}),(0,d.jsx)("meta",{name:"twitter:card",content:"summary_large_image"}),(0,d.jsx)("meta",{name:"twitter:creator",content:n.site.siteMetadata.author}),(0,d.jsx)("meta",{name:"twitter:title",content:n.snap.name}),(0,d.jsx)("meta",{name:"twitter:description",content:t}),(0,d.jsx)("meta",{name:"twitter:image",content:a})]})};var I=e=>{let{data:n}=e;const{name:s,snapId:c,icon:j,website:u,onboard:h,description:C,latestVersion:S,latestChecksum:f,category:v,permissions:w}=n.snap,{data:b}=(0,g.xP)(),y=Boolean(null==b?void 0:b[c]),{address:_,isConnected:N}=(0,p.mA)();return(0,d.jsxs)(t.xu,{position:"relative",children:[(0,d.jsx)(t.xu,{pointerEvents:"none",position:"absolute",top:"-50%",width:"100%",height:"75%",sx:{background:'url("'+j+'") no-repeat center center',backgroundSize:"cover",filter:"blur(96px) saturate(1.2)",opacity:"0.25"}}),(0,d.jsxs)(a.W,{maxWidth:"container.xl",paddingTop:"0",marginTop:"20",children:[(0,d.jsx)(g.vW,{snapId:c,version:S}),(0,d.jsxs)(i.k,{flexDirection:["column",null,"row"],justifyContent:"space-between",alignItems:"center",gap:"6",children:[(0,d.jsx)(g.yl,{name:s,icon:j,snapId:c}),(0,d.jsxs)(i.k,{alignItems:"center",gap:"4",width:["100%",null,"auto"],children:[N&&_&&(0,d.jsx)(z,{snapName:s,snapChecksum:f,address:_}),N&&_&&(0,d.jsx)(k,{snapName:s,snapId:c,address:_}),!h&&(0,d.jsx)(m.vU,{snapId:c,name:s,icon:j,website:u,version:S}),(y||h)&&u&&(0,d.jsx)(m.gD,{snapId:c,website:u})]})]}),(0,d.jsx)(o.i,{marginY:"8"}),(0,d.jsx)(g.SF,{snap:n.snap}),(0,d.jsx)(o.i,{marginTop:"8",marginBottom:"12"}),(0,d.jsxs)(r.K,{direction:["column",null,null,"row"],divider:(0,d.jsx)(l,{}),marginTop:"2",marginBottom:"12",spacing:"8",children:[(0,d.jsx)(g.dk,{name:s,description:C}),(0,d.jsx)(g.Pl,{snap:n.snap,permissions:w})]}),v&&v!==x.pN.AccountManagement&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(o.i,{my:"12"}),(0,d.jsx)(g.Dt,{snapId:c,category:v})]})]})]})}}}]);
//# sourceMappingURL=component---src-pages-snap-snap-location-snap-slug-tsx-ab8e064d4ab992c91ec2.js.map