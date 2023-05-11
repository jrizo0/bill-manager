(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{6380:function(e,i,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(3173)}])},4580:function(e,i,n){"use strict";function l(e){let i=e.toString();e instanceof Error||!e.message||(i=e.message),console.error("ONERROR: -->",e),alert(i)}n.d(i,{q:function(){return l}})},3173:function(e,i,n){"use strict";n.r(i),n.d(i,{default:function(){return N}});var l=n(7458),t=n(880),r=n(890),s=n(3856),a=n(8167),o=n(1606),c=n(9343),d=n(99),x=n(2933),h=n(1612),u=n(4759),b=n(2053),f=n(670),p=n(4020),j=n(3753),m=n(522),g=n(2983);function y(e){let{onConfirm:i}=e,[n,t]=g.useState(!1),r=()=>{t(!0)},a=()=>{t(!1)},o=()=>{t(!1),i()};return(0,l.jsxs)("div",{children:[(0,l.jsx)(m.Z,{color:"error","aria-label":"upload picture",component:"label",onClick:r,children:(0,l.jsx)(h.Z,{})}),(0,l.jsxs)(u.Z,{open:n,onClose:a,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description",children:[(0,l.jsx)(j.Z,{id:"alert-dialog-title",children:"Confirmation"}),(0,l.jsx)(f.Z,{children:(0,l.jsx)(p.Z,{id:"alert-dialog-description",children:"Are you sure you wnat to delete the bill?"})}),(0,l.jsxs)(b.Z,{children:[(0,l.jsx)(s.Z,{onClick:a,children:"Cancel"}),(0,l.jsx)(s.Z,{onClick:o,children:"Confirm"})]})]})]})}let Z=e=>{let{bill:i,onPayBill:n,onDeleteBill:h,isLoading:u}=e;return(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(c.ZP,{sx:{py:1,display:"flex",justifyContent:"space-between",alignItems:"center"},divider:!0,secondaryAction:u?(0,l.jsx)(a.Z,{size:20}):(0,l.jsx)(y,{onConfirm:()=>{h(i.billID)}}),children:[(0,l.jsxs)(r.Z,{sx:{display:"flex",flexDirection:"column"},children:[(0,l.jsxs)(r.Z,{sx:{display:"flex",flexDirection:"row",flexWrap:"nowrap",alignItems:"baseline"},children:[(0,l.jsxs)(x.Z,{variant:"body1",sx:{fontWeight:"bold",ml:2},children:[i.tag.trim().split("\n").slice(0,3),":"]}),(0,l.jsx)(d.Z,{title:"Copy",children:(0,l.jsx)(s.Z,{variant:"text",onClick:()=>{navigator.clipboard.writeText(i.reference)},size:"large",sx:{color:"#000000",textTransform:"none"},children:i.reference})}),(()=>{let e=i.expirationDay-new Date().getDate();return!i.paid&&(e>0?(0,l.jsxs)(x.Z,{variant:"body1",sx:{fontWeight:"regular",mx:2},children:["Expires in ",e," days"]}):(0,l.jsxs)(x.Z,{variant:"body1",sx:{fontWeight:"bold",mx:2,color:"#FF0000"},children:["Expired ",-e," days ago"]}))})()]}),(0,l.jsx)(o.Z,{href:i.paymentWeb,target:"_blank",rel:"noopener noreferrer",sx:{mx:2,pb:1,fontWeight:"regular"},children:new URL(i.paymentWeb).host})]}),(0,l.jsx)(r.Z,{sx:{mx:2},children:i.paid?(0,l.jsx)("span",{className:"billPaid",children:"Pagada"}):(0,l.jsx)(t.Z,{loading:u,variant:"contained",disabled:u,onClick:()=>n(i.billID),children:"Pay bill"})})]})})};var w=n(7959),v=n(4865),C=n(7265),_=n(4445),k=n(4580),D=n(1227);let E=()=>{let[e,i]=(0,g.useState)(),[n,t]=(0,g.useState)(!1),{session:s,setSession:a}=(0,g.useContext)(D.B);async function o(n){t(!0);try{await C.b.post("bills","/payments/".concat(n),{});let l=e.map(e=>(e.billID==n&&(e.paid=!0),e));i(l)}catch(e){(0,k.q)(e)}t(!1)}async function c(e){t(!0);try{await C.b.del("bills","/bills/1/".concat(e),{}),i(i=>[...i.filter(i=>i.billID!=e)])}catch(e){(0,k.q)(e)}t(!1)}return(0,g.useEffect)(()=>{let e=window.location.search,i=new URLSearchParams(e),n=i.get("token");n&&(localStorage.setItem("session",n),window.location.replace(window.location.origin))},[]),(0,g.useEffect)(()=>{(async function(){try{let e=await C.b.get("bills","/bills/1",{});i(e)}catch(e){(0,k.q)(e)}t(!1)})()},[]),(0,l.jsx)(l.Fragment,{children:(0,l.jsx)("div",{className:"Home",children:s?(0,l.jsxs)("div",{className:"bills",children:[(0,l.jsx)(x.Z,{variant:"h5",component:"div",sx:{mt:4,mx:2},children:"Your bills"}),(0,l.jsx)(w.Z,{children:(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(w.Z,{children:[(0,l.jsxs)(v.Z,{divider:!0,href:"/bills/new",sx:{py:3,borderRadius:"10px"},children:[(0,l.jsx)(_.HlX,{size:17}),(0,l.jsx)(r.Z,{mx:{marginInlineStart:4,fontWeight:"bold"},children:"Create a new bill"})]}),e&&e.map(e=>(0,l.jsx)(Z,{bill:e,isLoading:n,onPayBill:o,onDeleteBill:c},e.billID))]})})})]}):(0,l.jsxs)("div",{className:"lander",children:[(0,l.jsx)("h1",{children:"Scratch"}),(0,l.jsx)("p",{className:"text-muted",children:"A simple bill manager app"})]})})})};var N=E}},function(e){e.O(0,[648,638,23,774,888,179],function(){return e(e.s=6380)}),_N_E=e.O()}]);