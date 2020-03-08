
项目里有许多其他地方也有marked.js，除了js_min_all.js里的，其他地方的marked.js都没被使用到。

// 说明：左边 --> 右边  左边被替换成了右边的内容
// 这里的替换是直接在marked.min.js中完成的。
1、 // b(i[1].replace(/^ *| *\| *$/g,"")) --> i[1].replace(/^ *| *\| *$/g, "").split(/ *\| */)    table没识别的问题
2、 // header.length===a.align.length --> header.length  table没识别的问题    
3、 // 2个table： b(a.cells[p],a.header.length) --> a.cells[p].replace(/^ *\| *| *\| *$/g, "").split(/ *\| */)
4、 // .replace(/(?: *\| *)?\n$/,"")   -->  .replace(/\n$/, "")
5、 // /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/  --> /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/

如果要继续升级marked.min.js，还是要注意上面所列的问题
issue列表中搜索md，可以查看到部分的相关问题，下面列举若干关键问题：

table相关   1、2、3、4、5
https://www.trustie.net/issues/24398
https://www.trustie.net/issues/24448
https://www.trustie.net/issues/24336


/educoder/public/react/public/js/editormd/editormd.min.js
md编辑器公式相关修改，修改上述文件，并压缩，然后替换到js_min_all.js的这个位置的： 
/*
 * Editor.md
 *
 * @file        editormd.js 
 * @version     v1.5.0 
 * @description Open source online markdown editor.
 * @license     MIT License
 * @author      Pandao
 * {@link       https://github.com/pandao/editor.md}
 * @updateTime  2015-06-09
 */
公式相关    修改在 /public/js/editormd/editormd.min.js
https://www.trustie.net/issues/23895
https://www.trustie.net/issues/23695