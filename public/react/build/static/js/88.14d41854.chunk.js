(this.webpackJsonp=this.webpackJsonp||[]).push([[88],{"0Rql":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAQCAYAAABtPJ3XAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAALKADAAQAAAABAAAAEAAAAACYv7IkAAABuElEQVRIDdVWr0/DQBT+ujQowgSZwAAKQkhAoAiGTBT2B+ARM/wIAQx2dgYICdRU4PkDBhM4goYEgwODWBBDIjje17VJV9rudkdIeMmt69137333+n6cg1+StR01L6rqMjwFTFKtA7zKoy0juDl3njhnK6LTTjYaauSjg2PRsqUUSlnaHAdfMu+PVXB41XA+szC6c1aESbbbQQsKVSGF2gqwvgxMTfTMv7wB1/dA6w6Qw9Dlt+UKajakXd2TZeFCzwrZ8TJwtAkszvSjZqcBjtUloHkJvHdRjb7Gbj9S/83Yw1HMPoqpUnPvJ9k0hYdnOdRZOMvwWDCN6cyYSxvLea8zZhkGac9m4YkhNopzJqeR2BD2aJExqysJbLhXd18SZ0w4Ll1xgiWV5v2PsfHePFzRvOtth/lbhMleY9abisKoqV1jD8dcWbp0ZRhsnk63fcEKOrxIlTiRb7PPOsvSpSPEUsTiqVSJg97bcL82Hg7YwdgUWLIGCTHEco9gg0H4vHVjwlEd9ZkBbApFpLlGTJQtvmkN5iGsOh3vBtKa59jB2BR0WjP30LCpGMVv0ti/uvwkif/V9fIbUzmWMlmEs/gAAAAASUVORK5CYII="},FRFo:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=c(a("3S7+")),r=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(a.push(u.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&c.return&&c.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("TfFZ");var l=a("q1tI"),u=c(l);function c(e){return e&&e.__esModule?e:{default:e}}function o(e){var t=e.beforeText,a=e.afterText,c=e.className,o=e.inputId,i=e.timeOut,m=(0,l.useState)((function(){return t})),s=r(m,2),d=s[0],f=s[1],A=(0,l.useCallback)((function(){var e=document.querySelector("#"+o);e?(e.select(),document.execCommand("copy")&&document.execCommand("copy"),document.getSelection().removeAllRanges(),f(a),i&&setTimeout((function(){f(t)}),1500)):console.error("您的CopyTool未设置正确的inputId")}),[]);return u.default.createElement(n.default,{placement:"top",title:d,onVisibleChange:function(){f(t)}},u.default.createElement("i",{className:"iconfont icon-fuzhiicon "+c,style:{color:"#466aff"},onClick:A}))}o.defaultProps={beforeText:"复制链接",afterText:"复制成功",className:"",inputId:"copyText",timeOut:!0},t.default=(0,l.memo)(o)},GU58:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=g(a("W9HT")),r=g(a("jsC+")),l=g(a("BvKs")),u=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],n=!0,r=!1,l=void 0;try{for(var u,c=e[Symbol.iterator]();!(n=(u=c.next()).done)&&(a.push(u.value),!t||a.length!==t);n=!0);}catch(e){r=!0,l=e}finally{try{!n&&c.return&&c.return()}finally{if(r)throw l}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};a("04bd"),a("aIZi"),a("2WkQ");var c=a("q1tI"),o=g(c),i=g(a("FRFo")),m=a("PhNK"),s=a("eO8H"),d=a("sYIF");a("r+Iv");var f=g(a("0Rql")),A=g(a("vDqi"));function g(e){return e&&e.__esModule?e:{default:e}}t.default=function(e){var t=(0,c.useState)([]),a=u(t,2),g=a[0],p=a[1],v=(0,c.useState)(!0),h=u(v,2),E=h[0],y=h[1],b=e.match.params,I=b.projectsId,w=b.owner,T=e.isManager,j=e.isDeveloper,k=e.projectDetail;return(0,c.useEffect)((function(){var e;e="/"+w+"/"+I+"/branches_slice.json",A.default.get(e).then((function(e){e&&p(e.data),y(!1)})).catch((function(e){y(!1)}))}),[]),o.default.createElement(n.default,{spinning:E},o.default.createElement("div",{style:{paddingTop:"10px",minHeight:"400px"}},g&&g.length>0&&g.map((function(e,t){return o.default.createElement(o.default.Fragment,null,o.default.createElement("p",{className:"branchSort"},"default"===e.branch_type?"默认分支":"protected"===e.branch_type?"保护分支":"其它分支"),e.list&&e.list.length>0&&o.default.createElement("ul",{className:"treeUl"},e.list.map((function(e,a){var n,u,c,A=e.last_commit;return o.default.createElement("li",null,o.default.createElement("div",{className:"treeinfo"},o.default.createElement(s.Link,{to:"/"+w+"/"+I+"/tree/"+(c=e.name,c&&c.length>0&&c.indexOf("/")>-1?c.replaceAll("/","%2F"):c),className:"task-hide"},e.name),o.default.createElement("div",null,A&&A.committer&&A.committer.id?o.default.createElement(s.Link,{to:"/"+A.committer.login},o.default.createElement("img",{style:{borderRadius:"50%"},src:(0,d.getImageUrl)("/"+A.committer.image_url),alt:""}),o.default.createElement("span",{className:"mr3 color-grey-3",style:{fontWeight:"500"}},A&&A.committer&&A.committer.name)):o.default.createElement(o.default.Fragment,null,o.default.createElement("img",{style:{borderRadius:"50%"},src:(0,d.getImageUrl)("/"+A.committer.image_url),alt:""}),o.default.createElement("span",{className:"mr3 color-grey-3",style:{fontWeight:"500"}},A&&A.committer&&A.committer.name)),o.default.createElement("span",{className:"color-grey-3"},"更新于",A&&A.time_from_now))),o.default.createElement("div",{className:"treecopy"},o.default.createElement("div",null,o.default.createElement("span",null,o.default.createElement("img",{src:f.default,alt:"sha",width:"16px"}),o.default.createElement(s.Link,{to:"/"+w+"/"+I+"/commits/"+(0,m.truncateCommitId)(A&&A.sha)},(0,m.truncateCommitId)(A&&A.sha)),o.default.createElement("input",{type:"text",id:"value"+t+a,value:""+(0,m.truncateCommitId)(A&&A.sha)})),o.default.createElement(i.default,{beforeText:"复制commit id",afterText:"复制成功",inputId:"value"+t+a}))),o.default.createElement("div",{className:"treeabout"},(T||j)&&k&&2!==k.type&&o.default.createElement(s.Link,{to:"/"+w+"/"+I+"/compare/master..."+e.name,className:"btn-83"},"+ 合并请求"),o.default.createElement(r.default,{overlay:(n=e.zip_url,u=e.tar_url,o.default.createElement(l.default,null,o.default.createElement(l.default.Item,{key:"0"},o.default.createElement("a",{href:n},"ZIP")),o.default.createElement(l.default.Item,{key:"1"},o.default.createElement("a",{href:u},"TAR.GZ")))),trigger:["click"],placement:"bottomRight"},o.default.createElement("a",{className:"btn-83 ml15"},"下载",o.default.createElement("i",{className:"iconfont icon-sanjiaoxing-down font-14"})))))}))))}))))}},PhNK:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.truncateCommitId=function(e){return e&&e.length>11?e.substring(0,10):e},t.timeFormat=function(e){var t=new Date(1e3*e),a=t.getHours()<10?"0".concat(t.getHours()):t.getHours(),n=t.getMinutes()<10?"0".concat(t.getMinutes()):t.getMinutes();return t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate()+"  "+a+":"+n}},"r+Iv":function(e,t,a){}}]);