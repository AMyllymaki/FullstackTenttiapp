(this.webpackJsonpadmin=this.webpackJsonpadmin||[]).push([[0],{62:function(e,t,n){},87:function(e,t,n){"use strict";n.r(t);var r=n(6),a=n(0),c=n.n(a),i=n(9),s=n.n(i),o=(n(62),n(50)),u=n(12),l=n.n(u),j=n(15),h=n(38),p=n(135),d={baseURL:"https://tentti-app.herokuapp.com"},b=n(30),x=n.n(b),f=function(){var e=Object(j.a)(l.a.mark((function e(t){var n,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:t}},e.prev=1,e.next=4,x.a.get(d.baseURL+"/kayttaja",n);case 4:if("OK"!==(r=e.sent).statusText){e.next=10;break}return console.log("K\xe4ytt\xe4j\xe4t haettu haettu"),e.abrupt("return",r);case 10:throw"K\xe4ytt\xe4j\xe4haussa ongelmia";case 11:e.next=16;break;case 13:throw e.prev=13,e.t0=e.catch(1),e.t0;case 16:case"end":return e.stop()}}),e,null,[[1,13]])})));return function(t){return e.apply(this,arguments)}}(),v=function(){var e=Object(j.a)(l.a.mark((function e(t,n){var r,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r={headers:{Authorization:n}},e.prev=1,e.next=4,x.a.delete(d.baseURL+"/kayttaja/"+t,r);case 4:if("OK"!==(a=e.sent).statusText){e.next=9;break}return e.abrupt("return",a);case 9:throw"k\xe4ytt\xe4j\xe4n poistossa ongelmia";case 10:e.next=15;break;case 12:throw e.prev=12,e.t0=e.catch(1),e.t0;case 15:case"end":return e.stop()}}),e,null,[[1,12]])})));return function(t,n){return e.apply(this,arguments)}}(),O=function(){var e=Object(j.a)(l.a.mark((function e(t,n,r){var a,c,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={headers:{Authorization:r}},c={rooli:n},e.prev=2,e.next=5,x.a.put(d.baseURL+"/kayttaja/"+t,c,a);case 5:if("OK"!==(i=e.sent).statusText){e.next=10;break}return e.abrupt("return",i);case 10:throw"roolin muutoksessa ongelmia";case 11:e.next=16;break;case 13:throw e.prev=13,e.t0=e.catch(2),e.t0;case 16:case"end":return e.stop()}}),e,null,[[2,13]])})));return function(t,n,r){return e.apply(this,arguments)}}(),m=n(134),g=n(123),y=n(129),k=n(133),w=n(132),C=n(128),R=n(130),K=n(131),U=n(127),z=Object(g.a)({table:{minWidth:650}});var A=function(){var e=Object(a.useState)([]),t=Object(h.a)(e,2),n=t[0],c=t[1],i=Object(a.useState)(""),s=Object(h.a)(i,2),u=s[0],d=s[1],b=function(){var e=Object(j.a)(l.a.mark((function e(){var t;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,f(u);case 3:t=e.sent,c(t.data),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),x=function(){var e=Object(j.a)(l.a.mark((function e(t){var r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,v(t,u);case 3:r=n.filter((function(e){return e.id!==t})),c(r),e.next=9;break;case 7:e.prev=7,e.t0=e.catch(0);case 9:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),g=function(){var e=Object(j.a)(l.a.mark((function e(t,r){var a,i;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="admin"===r?"normal":"admin",e.prev=1,e.next=4,O(t,a,u);case 4:i=Object(o.a)(n),i.find((function(e){return e.id===t})).rooli=a,c(i),e.next=12;break;case 10:e.prev=10,e.t0=e.catch(1);case 12:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,n){return e.apply(this,arguments)}}(),A=z();return Object(r.jsxs)("div",{className:"App",children:[Object(r.jsxs)("div",{style:{display:"flex",height:100,flexDirection:"row,",justifyContent:"center",alignItems:"center"},children:[Object(r.jsx)(p.a,{style:{height:50,marginRight:20},onClick:b,color:"primary",variant:"outlined",children:"Hae K\xe4ytt\xe4j\xe4t"}),Object(r.jsx)(m.a,{text:u,variant:"outlined",type:"password",label:"Secret",onChange:function(e){return d(e.target.value)}})]}),Object(r.jsx)("div",{style:{display:"flex",flexDirection:"row"},children:Object(r.jsx)(C.a,{component:U.a,children:Object(r.jsxs)(y.a,{className:A.table,size:"small","aria-label":"simple table",children:[Object(r.jsx)(R.a,{children:Object(r.jsxs)(K.a,{children:[Object(r.jsx)(w.a,{children:"ID"}),Object(r.jsx)(w.a,{children:"K\xe4ytt\xe4j\xe4tunnus"}),Object(r.jsx)(w.a,{children:"Rooli"}),Object(r.jsx)(w.a,{align:"center",children:"Muuta Rooli"}),Object(r.jsx)(w.a,{align:"center",children:"Poisto"})]})}),Object(r.jsx)(k.a,{children:n.map((function(e){return Object(r.jsxs)(K.a,{children:[Object(r.jsx)(w.a,{align:"left",children:e.id}),Object(r.jsx)(w.a,{align:"left",children:e.k\u00e4ytt\u00e4j\u00e4tunnus}),Object(r.jsx)(w.a,{align:"left",children:e.rooli}),Object(r.jsxs)(w.a,{align:"center",children:[Object(r.jsx)(p.a,{onClick:function(){return g(e.id,e.rooli)},children:"Muuta Rooli"})," "]}),Object(r.jsxs)(w.a,{align:"center",children:[Object(r.jsx)(p.a,{onClick:function(){return x(e.id)},children:"Poista"})," "]})]},e.id)}))})]})})}),Object(r.jsxs)("div",{style:{display:"flex",marginTop:100,height:100,flexDirection:"row,",justifyContent:"center",alignItems:"center"},children:[Object(r.jsx)(p.a,{style:{height:50,marginRight:20},onClick:function(){},color:"primary",variant:"outlined",children:"Create User"}),Object(r.jsx)(m.a,{style:{marginRight:20},text:u,variant:"outlined",label:"Username",onChange:function(e){return d(e.target.value)}}),Object(r.jsx)(m.a,{text:u,variant:"outlined",type:"password",label:"Password",onChange:function(e){return d(e.target.value)}})]})]})};s.a.render(Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(A,{})}),document.getElementById("root"))}},[[87,1,2]]]);
//# sourceMappingURL=main.e441d50b.chunk.js.map