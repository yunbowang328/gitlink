其他的文档位置：
/educoder/public/react/public/js/readme.txt					关于js_min_all
/educoder/educoder/public/react/scripts/readme-cdn.txt		关于CDN
/educoder/public/react/src/modules/page/readme.txt			关于TPI
/educoder/public/editormd/lib/readme-marked.txt				关于md编辑器 marked.js

1、 安装node v6.9.x；此安装包含了node和npm。

2、 安装cnpm（命令行）： npm install -g cnpm --registry=https://registry.npm.taobao.org

3、 安装依赖的js库（public/react目录下<即项目package.json所在目录>，开启命令行）： cnpm install

4、 如果你的ruby服务使用的是3000端口，则需要在package.json中修改"port"参数的值

5、 启动服务（命令行-目录同3）： npm start

6、 build初始化 npm run build

注意：
1、cnpm install 之前先需要修改下ruby mine的一个settings，防止ruby mine对node_modules目录里的内容建索引（详情见线上文档-react开发环境搭建）


线上文档-react开发环境搭建 地址： https://www.trustie.net/boards/6862/topics/46425

2、package.json中配置：
"proxy": "http://localhost:3000",
"port": "3007"

目前暂时必须写为和上面的一样，ruby服务端口为3000，node服务端口为3007；当当前端口为3007时，程序会将axios发出的请求转到localhost:3000上，进行跨域请求。

3、静态js加载问题：
	editormd源码改动，注释掉了564行 加载codemirror/codemirror.min的js代码。因为codemirror 已经加载了，codemirror对象会带有插件，重复加载会覆盖全局codemirror对象，使得之前加载的插件失效

----------------------------------------------------------------------------------------------

React开发相关知识点
	需要了解的ES6的知识 https://www.trustie.net/boards/6862/topics/46427

----------------------------------------------------------------------------------------------

新加入的lib有：	axios、material-ui、lodash、classnames、moment、immutability-helper
				rc-tree、rc-form 、rc-rate、rc-pagination、rc-select 、showdown
考虑替代删除确认弹出框的组件http://react-component.github.io/tooltip/examples/onVisibleChange.html


----------------------------------------------------------------------------------------------
TPI State整理 START
----------------------------------------------------------------------------------------------
TPIContextProvider  详情接口的所有state

	Index.js 
		taskListLoading
		challenges
		challengesDrawerOpen

	MainContentContainer.js
		repositoryCode: '',     
		currentPath: '', 		// 当前所选的path，可能是一个只读的path（只读path的话，challenge.athIndex为-1）
		isEditablePath			//  是否是可以编辑的path（）
          
        open: false,			// 繁忙等级等提示用Dialog， TODO 考虑重构封装到根组件
        gameBuilding: false, // 评测中标志
        codeStatus: 2, //  0 已修改  1 保存中  2 已保存   3 保存失败 

        codeLoading: false,		 			// code加载中
        resetCodeDialogOpen: false,			// TODO考虑重构封装到根组件
        resetPassedCodeDialogOpen: false,	// TODO考虑重构封装到根组件


        LeftViewContainer.js
        	tabIndex: 0,				页签index
			dialogOpen: false,
			gameAnswer: '',				答案
			snackbarOpen: false,
			comments: [],				评论
			comment_count_without_reply: 0,		评论数量  TODO 和详情接口字段重复
			// 默认pageSize为10
			currentPage: 1,				评论分页
			loadingComments: true,		评论加载中
			gotNewReply: false,			新的回复

        CodeRepositoryViewContainer.js
        	drawerOpen: false,					
			loadingFirstRepoFiles: false,			  	drawer里的loading状态
			fileTreeData: "",							文件树
			codeRepositoryViewExpanded: false,			展开状态


		CodeEvaluateView.js
			testSetsInitedArray:  testSetsExpandedArrayInitVal.slice(0),		测试集是否初始化标志	
			evaluateViewExpanded: false,
			tabIndex: 1,					页签index
----------------------------------------------------------------------------------------------
TPI State整理 END
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
重要：TPI实现时修改的js库的记录 START
----------------------------------------------------------------------------------------------

----------------------------------------------------------------------------------------------
重要：TPI实现时修改的js库的记录 END
----------------------------------------------------------------------------------------------
create_kindeditor.js  					__isR 表示是react环境，react环境下采用事件通知react组件来处理
	if (window['__isR'] === true) {
        $(document).trigger("onReply", { commentContent:tContents, id:id, editor:params.editor } );
    } else {
        params.form.submit();
    }

editormd.min.js  						直接注释掉了codemirror.min的加载，应该改成有codeMirror了则不加载
	// codemirror 已经加载了，codemirror会有插件，重复加载会使得之前加载的插件失效
    // editormd.loadScript(loadPath + "codemirror/codemirror.min", function() {
对应提交项 
Revision: 73d95ce266d5d7e55a3a88d08d1247b3a08c7caf
Date: 2018/4/2 16:12:21
Message: 切下一题时更新左侧editormd里的内容，更新右侧codemirror内容。

js_min_all.js     						最后面手动加入了若干js代码，还没做分离、再合并处理		date:180507
	is_cdn_link tpi_html_show方法




----------------------------------------------------------------------------------------------
TPM使用react实现的利弊 START
----------------------------------------------------------------------------------------------
1、全部使用react重写
	做法：第一屏使用新接口，之前的js脚本还是继续使用，有必要的话（需要局部刷新的），将部分jquery实现改为react实现
利：
	tpi中评论组件、文件树组件方便复用
	js、css库管理方便

	暂时不依赖于react的状态管理
		之前的ajax请求还是可以暂时复用


弊：
	接口评估？
	rails模板要改成jsx语法
	头部功能区域、底部静态链接区域会存在重复代码 ： react版和非react版
	codemirror等组件的使用会不会有问题？

	学习成本

	！！目前决定，新页面或者评论组件所在页面使用react实现
----------------------------------------------------------------------------------------------
TPM使用react实现的利弊 END
----------------------------------------------------------------------------------------------


其他方式：comments组件build到新入口后，将代码copy到rails页面
----------------------------------------------------------------------------------------------
不错的库 START
----------------------------------------------------------------------------------------------
https://livicons.com/icons-original			-- 收费  动画icon
https://github.com/maxwellito/vivus			-- 让SVG标签动起来
http://ianlunn.github.io/Hover/				-- hover 动画
https://github.com/legomushroom/mojs
https://github.com/juliangarnier/anime    --js动画
https://codepen.io/juliangarnier/pen/gmOwJX
https://github.com/daneden/animate.css


A responsive tour snippet, with a step-by-step guide(onboarding) to help users understand how to use your website.

https://github.com/sorich87/bootstrap-tour
https://github.com/linkedin/hopscotch
https://github.com/Robophil/Product-Tour

code editor
https://microsoft.github.io/monaco-editor/