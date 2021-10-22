(this.webpackJsonp=this.webpackJsonp||[]).push([[105],{cUtz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=r(a("2/Rp"));a("L/Qf");var n=r(a("q1tI")),u=a("spEH"),c=r(a("/k9T"));function r(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.visible,a=e.onCancel,r=e.onSuccess;return n.default.createElement(c.default,{visible:t,onCancel:a,title:"删除SSH密钥",btn:n.default.createElement("div",null,n.default.createElement(l.default,{size:"large",onClick:a},"取消"),n.default.createElement(l.default,{type:"danger",size:"large",onClick:r},"确认删除"))},n.default.createElement("div",{className:"desc"},n.default.createElement(u.AlignCenter,{className:"descMain"},n.default.createElement("i",{className:"iconfont icon-jinggao1 mr10 font-20 red"}),"您确定要删除此 SSH 密钥吗？"),n.default.createElement("p",null,"此操作将永久删除该SSH密钥，且不可恢复。如果您想再次使用该密钥，则需要您重新上传。")))}},kS2o:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=c(a("kLXV")),n=c(a("2/Rp"));a("k3Gp"),a("L/Qf");var u=c(a("q1tI"));function c(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=e.visible,a=e.onCancel,c=e.desc;return u.default.createElement(l.default,{visible:t,onCancel:a,title:"SSH密钥详情",width:"600px",footer:null,className:"descModal"},u.default.createElement("div",null,u.default.createElement("p",{className:"color-grey-3 font-16 keysTitle"},u.default.createElement("span",{style:{fontWeight:"600"}},"SSH Key："),u.default.createElement("span",null,c&&c.name)),u.default.createElement("p",{className:"mt5"},"添加时间：",c&&c.created_time),u.default.createElement("p",{className:"color-grey-3 mt30 keysTitle mb15"},u.default.createElement("span",{style:{fontWeight:"600"}},"公钥指纹："),u.default.createElement("span",null,c&&c.fingerprint)),u.default.createElement("div",{className:"keyContent"},c&&c.content),u.default.createElement("div",{className:"edu-txt-center mt30 mb20"},u.default.createElement(n.default,{type:"primary",size:"large",style:{width:"100px"},onClick:a},"关闭"))))}},u5sb:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=A(a("NUBc")),n=A(a("/ezw")),u=A(a("VXEj")),c=A(a("2/Rp")),r=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],l=!0,n=!1,u=void 0;try{for(var c,r=e[Symbol.iterator]();!(l=(c=r.next()).done)&&(a.push(c.value),!t||a.length!==t);l=!0);}catch(e){n=!0,u=e}finally{try{!l&&r.return&&r.return()}finally{if(n)throw u}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("YQTV"),a("chzn"),a("LXko"),a("L/Qf");var i=a("q1tI"),s=A(i),d=A(a("yYO3")),f=A(a("vDqi")),o=A(a("cUtz")),m=A(a("kS2o"));function A(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=(0,i.useState)(void 0),a=r(t,2),A=a[0],E=a[1],p=(0,i.useState)(1),g=r(p,2),h=g[0],v=g[1],S=(0,i.useState)(0),y=r(S,2),b=y[0],k=y[1],C=(0,i.useState)(void 0),N=r(C,2),z=N[0],w=N[1],I=(0,i.useState)(!1),U=r(I,2),Q=U[0],D=U[1],q=(0,i.useState)(!1),H=r(q,2),L=H[0],j=H[1],O=(0,i.useState)(void 0),B=r(O,2),V=B[0],M=B[1];function P(){f.default.get("/public_keys.json",{params:{page:h,limit:10}}).then((function(e){e&&e.data&&(E(e.data.public_keys),k(e.data.total_count))})).catch((function(e){}))}return(0,i.useEffect)((function(){P()}),[h]),s.default.createElement("div",null,s.default.createElement(o.default,{visible:Q,onCancel:function(){return D(!1)},onSuccess:function(){if(z){var t="/public_keys/"+z+".json";f.default.delete(t).then((function(t){t&&t.data&&(e.showNotification("密钥删除成功！"),D(!1),h>1&&A&&1===A.length?v(h-1):P())})).catch((function(e){}))}}}),s.default.createElement(m.default,{visible:L,onCancel:function(){return j(!1)},desc:V}),s.default.createElement("div",{className:"sshHead"},s.default.createElement("span",{className:"text-shadow07"},"SSH密钥"),s.default.createElement("button",{type:"primary",size:"large",onClick:function(){return e.history.push("/settings/SSH/new")},className:"but25"},"添加SSH密钥")),A&&A.length>0&&s.default.createElement(u.default,null,A.map((function(e,t){return s.default.createElement(u.default.Item,{key:e.id},s.default.createElement("img",{src:d.default,alt:""}),s.default.createElement("div",null,s.default.createElement("p",{className:"color-grey-3"},s.default.createElement("a",{className:"task-hide",style:{display:"block",fontWeight:"500"},onClick:function(){M(e),j(!0)}},e.name)),s.default.createElement("p",{className:"task-hide color-grey-6"},e.fingerprint),s.default.createElement("span",{className:"color-grey-6"},"添加时间：",e.created_time)),s.default.createElement(c.default,{type:"danger",onClick:function(){w(e.id),D(!0)}},"删除"))}))),!A&&s.default.createElement(n.default,null),b>10&&s.default.createElement("div",{className:"edu-txt-center mt15"},s.default.createElement(l.default,{simple:!0,current:h,onChange:function(e){v(e)},pageSize:10,total:b})),(!A||A&&0===A.length)&&s.default.createElement("p",{className:"mt30 pl20"},"您还没有添加任何SSH密钥"),s.default.createElement("p",{className:"questionLink"},s.default.createElement("a",{href:"https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent",target:"_blank"},"如何生成SSH密钥？")))}},yYO3:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAA75JREFUaEPtmUtoFEEQhqt6DyKIGPUkig8QDyoqCiIoRBAfCCJCRPGBwnZ3sh4MKiKIj5CLgqAeZGdqRrJEUTyLD/Bg8IUeRDzoQQVzEfUg3oKsmSnpsCubzc7uvHaNsA3LsEx11f91dQ81NQhNGFLKHUKIs8x8hIheNSHEX5eYpnMp5VIhxAlmPlT2y8y9juNcTTNOpa9UALq6uqZ2dHScAADzm14tFhFve5532nXdz2mDJAbQWitm7gaAVQ3EfUPEAd/3C47jfEgLJDaAEQ4ARvzqiGJGAGAgk8nczOfzLyPOnWAeGqC7u3uB53mdiLgaEdfFEF5Lq9lSz33ff1QsFu8NDg7+iAo0DiCbzXYaB0KIGQCwAADml64rS9eo/qPaf2Hmj4j4CQDGrsz8vlgsDhcKhV+1nI0DUEqdB4BzUaM22973/Y2u6w61AZq90kH+2xn4VytfjtvOQDsDCVeg1Vuoz/f9IfPcllJuA4A9iHgwCUOrAL4z8y7HcV5Ui5VSHkDEwbgQrQK4TETHgkQqpW4AwP44EK0C2EBEz4IEmjpLCPF40gIIIeZalvXlfwZYaFnWcBCAlNIc5tuTNgOIWLBt+3CdM/AAALZOWoCSsD4iMiX5uKGUugwAvXHEmzmtOsRj+qqDpfGO0QaIkvp2BmqsVnsL/U9b6DgAXIoiuNq2SWdgjeu6r2vpGtdW0VrvZeZbkw0AAOYQ0deGAEkKrrJzZj7sOE6h/F9rPVDZrY6zOEQU2EGccEMpZdp9pisXdwwz8xbTwFVKrQWApP3Pu0S0I0jMBACt9RVmPhpXfUUmhhBxrFWZcBwjIlOK1BwTAHp6epZ4nmfq+tkJA6cxfUQIsd6yrDehAYyhUuokAFxMQ0FCHzWLw0qfgYdDSvkQEbckFJBkuln19URkvicEjrrfB5RS5gXFtNhbPX77vr85qCMdKgNlI6WU6ctPaSVBvdqnWkfDLzS5XG6a53lvmXlRKyAQcalt2+/DxmoIYBzlcrl5o6Oj9wBgeVjHMezeIeLuKOJNjFAAxjCbzS7MZDL9zLwvhrhGU+4i4qmo4iMBlBVIKXOI2A8AMxupanQfEUeZ+QwRXWhkG3Q/dAYqHWitVzCzqVwPxA3MzPeFEBdt234S10esDFQGU0ptL3UbNoUVwcxPhRDXbNu+E3ZOPbtYGah2qJTKIuJRZl5WJ9gbRDTCr6chvOwjFYDSk8o8bk3vp5eZZ1WINN98r5kfEf1OU3ziLVRLjNZ6cQliJyLmzXbJ5/M/0xZe9vcHDbUzT1uov0sAAAAASUVORK5CYII="}}]);