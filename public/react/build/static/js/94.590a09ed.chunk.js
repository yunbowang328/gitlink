(this.webpackJsonp=this.webpackJsonp||[]).push([[94],{"Ie+W":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=f(a("2/Rp")),r=f(a("CtXQ")),l=f(a("lrIw")),u=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var u,o=e[Symbol.iterator]();!(n=(u=o.next()).done)&&(a.push(u.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&o.return&&o.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("L/Qf"),a("2oDE"),a("bipt");var o=a("q1tI"),i=f(o),c=f(a("vDqi")),d=a("sYIF");function f(e){return e&&e.__esModule?e:{default:e}}var s=l.default.Option;t.default=function(e){var t=e.getID,a=e.login,f=e.showNotification,m=(0,o.useState)(void 0),p=u(m,2),v=p[0],h=p[1],E=(0,o.useState)(void 0),y=u(E,2),g=y[0],b=y[1],w=(0,o.useState)(void 0),I=u(w,2),S=I[0],_=I[1];return(0,o.useEffect)((function(){c.default.get("/users/list.json",{params:{search:S}}).then((function(e){var t,a;e&&(t=e.data.users,a=t&&t.map((function(e,t){return i.default.createElement(s,{key:t,value:""+e.user_id,login:""+e.login,name:e.username},i.default.createElement("img",{className:"user_img radius",width:"28",height:"28",src:(0,d.getImageUrl)("/"+(e&&e.image_url)),alt:""}),i.default.createElement("span",{className:"ml10",style:{verticalAlign:"middle"}},e.username,i.default.createElement("span",{className:"color-grey ml10"},"(",e.login,")")))})),b(a))})).catch((function(e){console.log(e)}))}),[S]),i.default.createElement("div",{className:"addPanel"},i.default.createElement(l.default,{dataSource:g,value:S,style:{width:300},onChange:function(e){_(e)},onSelect:function(e,t){h(a?e:t.props.login),_(t.props.name)},placeholder:"搜索需要添加的用户...",allowClear:!0}),i.default.createElement(n.default,{type:"primary",ghost:!0,onClick:function(){g&&g.length>0?(t&&t(v),_(void 0)):f("请选择存在的用户!")},className:"ml15"},i.default.createElement(r.default,{type:"plus",size:"16"}),"添加成员"))}},"XyF/":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var u,o=e[Symbol.iterator]();!(n=(u=o.next()).done)&&(a.push(u.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&o.return&&o.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")},r=a("q1tI"),l=f(r),u=a("spEH"),o=f(a("Ie+W")),i=f(a("fF4P")),c=f(a("YtIU")),d=f(a("xj5X"));function f(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=(0,r.useState)("1"),a=n(t,2),f=a[0],s=a[1],m=(0,r.useState)(void 0),p=n(m,2),v=p[0],h=p[1],E=(0,r.useState)(!0),y=n(E,2),g=y[0],b=y[1],w=(0,r.useState)(void 0),I=n(w,2),S=I[0],_=I[1],N=e.match.params,j=N.projectsId,x=N.owner,k=e&&e.projectDetail&&e.projectDetail.author;return l.default.createElement(u.WhiteBack,null,l.default.createElement("div",{className:"flex-a-center baseForm bbr"},k&&"Organization"===k.type?l.default.createElement("span",null,l.default.createElement("span",{style:{cursor:"pointer"},className:"1"===f?"font-18 text-black color-blue":"font-18 text-black",onClick:function(){s("1"),h(void 0)}},"协作者管理"),l.default.createElement("span",{style:{cursor:"pointer"},className:"2"===f?"font-18 text-black ml30 color-blue":"font-18 text-black ml30",onClick:function(){s("2"),h(void 0),_(void 0)}},"团队管理")):l.default.createElement("span",{className:"font-18 text-black"},"协作者管理"),"1"===f&&l.default.createElement(o.default,{getID:function(e){h(e)},login:!0,showNotification:e.showNotification}),"1"!==f&&g&&l.default.createElement(i.default,{getGroupID:function(e){_(e)},organizeId:x})),l.default.createElement("div",null,"1"===f?l.default.createElement(c.default,{newId:v,projectsId:j,owner:x,project_id:e.project_id,author:e.projectDetail&&e.projectDetail.author,showNotification:e.showNotification}):l.default.createElement(d.default,{setAddOperation:b,owner:x,projectsId:j,newGroupId:S})))}},YtIU:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=g(a("NUBc")),r=g(a("W9HT")),l=g(a("wCAj")),u=g(a("NJEC")),o=g(a("jsC+")),i=g(a("3S7+")),c=g(a("CtXQ")),d=g(a("BvKs")),f=g(a("5rEg")),s=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var u,o=e[Symbol.iterator]();!(n=(u=o.next()).done)&&(a.push(u.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&o.return&&o.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("YQTV"),a("04bd"),a("mbEz"),a("k994"),a("aIZi"),a("TfFZ"),a("2oDE"),a("2WkQ"),a("1vPl");var m=a("q1tI"),p=g(m),v=g(a("vDqi")),h=g(a("2CTR")),E=a("eO8H"),y=a("sYIF");function g(e){return e&&e.__esModule?e:{default:e}}var b=f.default.Search,w=[{id:"Manager",name:"管理员"},{id:"Developer",name:"开发者"},{id:"Reporter",name:"报告者"}];t.default=function(e){var t=e.projectsId,a=e.owner,f=e.project_id,g=e.author,I=e.showNotification,S=e.newId,_=(0,m.useState)(void 0),N=s(_,2),j=N[0],x=N[1],k=(0,m.useState)(void 0),C=s(k,2),D=C[0],O=C[1],A=(0,m.useState)(1),T=s(A,2),z=T[0],M=T[1],q=(0,m.useState)(!0),F=s(q,2),P=F[0],Q=F[1],L=(0,m.useState)(void 0),U=s(L,2),X=U[0],Y=U[1],B=(0,m.useState)(void 0),H=s(B,2),R=H[0],W=H[1],G=(0,m.useState)(0),J=s(G,2),K=J[0],V=J[1];function Z(){Q(!0);var e="/"+a+"/"+t+"/collaborators.json";v.default.get(e,{params:{page:z,search:D,role:X,limit:15}}).then((function(e){e&&(z>1&&R&&1===R.length?M(z-1):(W(e.data.members),V(e.data.total_count)),Q(!1))})).catch((function(e){Q(!1)}))}function $(e,t){Y(e),x(t)}(0,m.useEffect)((function(){S&&function(e){if(e){var n="/"+a+"/"+t+"/collaborators.json";v.default.post(n,{user_id:e}).then((function(e){e&&Z()})).catch((function(e){}))}}(S)}),[S]),(0,m.useEffect)((function(){f&&t&&a&&Z()}),[f,D,z,X]);var ee=p.default.createElement("div",null,p.default.createElement("span",{className:"mr3"},"角色"),p.default.createElement(i.default,{placement:"bottom",title:p.default.createElement("div",null,p.default.createElement("div",{className:"mb3"},"管理员：拥有仓库设置功能、代码库读、写操作"),p.default.createElement("div",{className:"mb3"},"开发人员：只拥有代码库读、写操作"),p.default.createElement("div",{className:"mb3"},"报告者：只拥有代码库读操作"))},p.default.createElement(c.default,{type:"question-circle"}))),te=function(e){return"Manager"===e?"text-green":"Developer"===e?"text-primary":"text-yellow"},ae=function(e){return p.default.createElement(d.default,null,w.map((function(n,r){return p.default.createElement(d.default.Item,{key:n.id,value:n.id,onClick:function(n){return function(e,n){var r="/"+a+"/"+t+"/collaborators/change_role.json";v.default.put(r,{user_id:n,role:e.key}).then((function(e){e&&(I("权限修改成功!"),Z())})).catch((function(e){}))}(n,e)}},n.name)})))},ne=[{title:"头像",dataIndex:"image_url",render:function(e,t){return p.default.createElement("span",{className:"f-wrap-alignCenter"},p.default.createElement(E.Link,{to:"/"+t.login,className:"show-user-link"},p.default.createElement("img",{src:(0,y.getImageUrl)("/"+e),alt:"",width:"32px",height:"32px",className:"mr3 radius"})))}},{title:"用户名",dataIndex:"name",render:function(e,t){return p.default.createElement(E.Link,{to:"/"+t.login,className:"show-user-link"},e)}},{title:"邮箱",dataIndex:"email",render:function(e){return p.default.createElement("span",null,e)}},{title:ee,dataIndex:"role_name",render:function(e,t){return function(e){var t=w.filter((function(t){return t.id===e.role}));return p.default.createElement("span",null,g&&g.login===e.login?p.default.createElement("label",{className:te(e.role)},t&&t[0].name):p.default.createElement(o.default,{overlay:ae(""+e.id),placement:"bottomCenter"},p.default.createElement("span",{className:te(e.role)},t&&t[0].name,p.default.createElement(c.default,{type:"caret-down",className:"ml2",size:"13"}))))}(t)}},{title:"操作",dataIndex:"action",render:function(e,n){return p.default.createElement("span",{style:{justifyContent:"center"}},g&&g.login!==n.login&&p.default.createElement(u.default,{title:"确认将此成员从项目中移除？",okText:"是",cancelText:"否",onConfirm:function(){return e=n.id,r="/"+a+"/"+t+"/collaborators/remove.json",void v.default.delete(r,{data:{user_id:e}}).then((function(e){e&&(I("成员删除成功！"),Z())})).catch((function(e){}));var e,r}},p.default.createElement("a",{className:"text-delete"},"删除")))}}];return p.default.createElement(p.default.Fragment,null,p.default.createElement("div",{className:"baseForm",style:{display:"flex",justifyContent:"space-between",alignItems:"center"}},p.default.createElement(o.default,{overlay:function(e){return p.default.createElement(d.default,null,p.default.createElement(d.default.Item,{key:0,value:void 0,onClick:function(e){return $(void 0,"角色筛选")}},"全部"),w.map((function(e,t){return p.default.createElement(d.default.Item,{key:e.id,value:e.id,onClick:function(t){return $(e.id,e.name)}},e.name)})))},placement:"bottomCenter"},p.default.createElement("a",{className:"text-primary"},j||"角色筛选",p.default.createElement(c.default,{type:"caret-down",size:"16"}))),p.default.createElement(b,{placeholder:"搜索项目成员...",enterButton:"搜索",onSearch:O,style:{width:300}})),p.default.createElement(r.default,{spinning:P},p.default.createElement("div",{className:"collaboratorList baseForm"},R&&R.length>0&&p.default.createElement(l.default,{pagination:!1,columns:ne,dataSource:R,rowKey:function(e){return e.id}}),R&&0===R.length&&p.default.createElement(h.default,{_html:"暂时还没有相关数据!"}))),K>15?p.default.createElement("div",{className:"edu-txt-center mt20 pb20"},p.default.createElement(n.default,{simple:!0,pageSize:15,current:z,total:K,onChange:function(e){return M(e)}})):"")}},fF4P:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=d(a("2/Rp")),r=d(a("CtXQ")),l=d(a("lrIw")),u=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var u,o=e[Symbol.iterator]();!(n=(u=o.next()).done)&&(a.push(u.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&o.return&&o.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("L/Qf"),a("2oDE"),a("bipt");var o=a("q1tI"),i=d(o),c=d(a("vDqi"));function d(e){return e&&e.__esModule?e:{default:e}}var f=l.default.Option;t.default=function(e){var t=e.organizeId,a=e.getGroupID,d=(0,o.useState)(void 0),s=u(d,2),m=s[0],p=s[1],v=(0,o.useState)(void 0),h=u(v,2),E=h[0],y=h[1],g=(0,o.useState)(""),b=u(g,2),w=b[0],I=b[1];return(0,o.useEffect)((function(){var e;e="/organizations/"+t+"/teams/search.json",c.default.get(e,{params:{search:w}}).then((function(e){var t,a;e&&(t=e.data.teams,a=t&&t.map((function(e,t){return i.default.createElement(f,{key:t,value:""+e.id,name:e.name},e.name)})),y(a))})).catch((function(e){console.log(e)}))}),[w]),i.default.createElement("div",{className:"addPanel"},i.default.createElement(l.default,{dataSource:E,value:w,style:{width:300},onChange:function(e){I(e||"")},onSelect:function(e,t){p(e),I(t.props.name)},placeholder:"搜索需要添加的团队...",allowClear:!0}),i.default.createElement(n.default,{type:"primary",ghost:!0,onClick:function(){a&&a(m),p(void 0)},className:"ml15"},i.default.createElement(r.default,{type:"plus",size:"16"}),"添加团队"))}},xj5X:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=s(a("NUBc")),r=s(a("wCAj")),l=s(a("NJEC")),u=s(a("2/Rp")),o=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var u,o=e[Symbol.iterator]();!(n=(u=o.next()).done)&&(a.push(u.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&o.return&&o.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("YQTV"),a("mbEz"),a("k994"),a("L/Qf");var i=a("q1tI"),c=s(i),d=a("eO8H"),f=s(a("vDqi"));function s(e){return e&&e.__esModule?e:{default:e}}var m={owner:"所有者",admin:"管理者",write:"开发者",read:"报告者"};t.default=function(e){var t=e.newGroupId,a=e.owner,s=e.projectsId,p=e.setAddOperation,v=(0,i.useState)(void 0),h=o(v,2),E=h[0],y=h[1],g=(0,i.useState)(!0),b=o(g,2),w=b[0],I=b[1],S=(0,i.useState)(1),_=o(S,2),N=_[0],j=_[1],x=(0,i.useState)(0),k=o(x,2),C=k[0],D=k[1];function O(){var e="/"+a+"/"+s+"/teams.json";f.default.get(e,{params:{page:N,limit:15}}).then((function(e){e&&e.data&&(y(e.data.teams),D(e.data.total_count),I(!1),p(e.data.can_add))})).catch((function(e){}))}(0,i.useEffect)((function(){O()}),[]),(0,i.useEffect)((function(){var e,n;t&&(e=t,n="/"+a+"/"+s+"/teams.json",f.default.post(n,{team_id:e}).then((function(e){e&&e.data&&O()})).catch((function(e){})))}),[t]);var A=[{title:"团队名",dataIndex:"name",render:function(e,t){return t.is_admin||t.is_member?c.default.createElement(d.Link,{to:"/"+a+"/teams/"+t.id},e):c.default.createElement("span",null,e)}},{title:"权限",dataIndex:"authorize",width:"20%",render:function(e,t){return m[e]}},{title:"操作",dataIndex:"operation",width:"25%",render:function(e,t){return t.can_remove&&c.default.createElement(l.default,{title:"确定要删除‘"+t.name+"’团队？",okText:"是",cancelText:"否",onConfirm:function(){var e,n;e=t.id,n="/"+a+"/"+s+"/teams/"+e+".json",f.default.delete(n).then((function(e){e&&e.data&&O()})).catch((function(e){}))}},c.default.createElement(u.default,{type:"danger"},"删除"))}}];return c.default.createElement("div",{className:"padding20-30",style:{minHeight:"400px"}},c.default.createElement(r.default,{dataSource:E,columns:A,pagination:!1,loading:w}),C>15?c.default.createElement("div",{className:"pb20 mt20 edu-txt-center"},c.default.createElement(n.default,{simple:!0,current:N,total:C,pageSize:15,onChange:function(e){j(e)}})):"")}}}]);