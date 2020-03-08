state说明
    顶层state--tasks详情接口
        allowed_unlock  为true时，才允许非管理员用户解锁隐藏测试集
        discusses_count 总评论数

        challenge       实训关卡信息
            exec_time       --
            modify_time     --
            path            关卡文件路径
            position        第几关
            praises_count   点赞数
            score           分数
            shixun_id
            st              0-编程题 1-选择题
            subject         关卡名称
            task_pass       过关任务
            web_route       --

        game            为每一个用户独立创建的实训关卡对应的信息
            accuracy        --
            answer_deduction--
            answer_open     --
            challenge_id    
            cost_time       通关耗时
            created_at      
            end_time        
            evaluate_count  
            final_score     
            id              
            identifier      
            modify_time     
            myshixun_id     
            open_time       
            picture_path    
            resubmit_identifier     
            retry_status    
            star            
            status          2-已通关
            test_sets_view  true-测试集已解锁
            updated_at      
            user_id      
        game_count      关卡数   
        git_url         仓库地址，vnc会用到
        has_answer
        is_teacher      是否是老师      初始化被赋值到 user.is_teacher
        last_compile_output
        mirror_name     镜像名称    TPIMonaco会用到这个属性来判断当前关卡使用的什么语言 见 mirror2LanguageMap
        myshixun
            commit_id: "80cb6fc55a14bdd64a9c99913f416966238ed3de"
            created_at: "2019-07-26T09:00:31.000+08:00"
            git_url: null
            gpid: null
            id: 542543
            identifier: "ns53g8vfeo"                                有些接口会用到
            is_public: true
            modify_time: "2017-11-02T18:12:23.000+08:00"
            onclick_time: "2019-07-26T09:00:31.000+08:00"
            repo_name: "p15478209/ns53g8vfeo20190726090031"
            reset_time: "2017-10-25T09:33:03.000+08:00"
            shixun_id: 61
            status: 0
            system_tip: true                (如果修改了测试集 || 修改了代码) && system_tip为true 也就是下面代码为true时，才显示更新通知弹框
                                            const showUpdateButton = (tpm_cases_modified || needUpdateScript) && myshixun.system_tip === true;
            updated_at: "2019-11-05T10:58:35.000+08:00"
            user_id: 24731
        myshixun_manager: true
        next_game: "so7ijzqe63a9"       下一关identifier
        praise_count: 120               点赞数
        prev_game: "bxg5w9uonhts"       上一关identifier
        record_onsume_time: 0.296       上一次评测耗时      初始化被赋值到newResData.record = newResData.record_onsume_time
        sets_error_count: 0             失败测试集数量
        shixun
            authentication: false
            averge_star: 4.9
            can_copy: false
            challenges_count: 4             关卡数
            closer_id: null
            code_edit_permission: false     是否允许修改代码
            code_hidden: false              是否隐藏文件目录按钮
            created_at: "2017-06-09T11:32:16.000+08:00"
            end_time: null
            excute_time: null
            exec_time: 25
            forbid_copy: false              forbid_copy ? "不允许学员复制和粘贴代码" : "允许学员复制和粘贴代码"
            fork_from: null
            git_url: "educoder/uznmbg54"
            gpid: 2448
            hidden: false
            hide_code: false                是否隐藏代码tab
            homepage_show: true
            id: 61
            identifier: "uznmbg54"
            image_text: null
            language: "Python3.6"           !!
            major_id: 635
            mirror_script_id: null
            modify_time: "2017-11-02T18:12:23.000+08:00"
            multi_webssh: false             多命令行tab
            myshixuns_count: 9655           学员数
            name: "Python表达式问题求解（一）※"
            opening_time: null
            pod_life: 0
            publish_time: "2017-09-01T10:37:49.000+08:00"
            repo_name: "educoder/uznmbg54"
            reset_time: "2017-10-25T09:33:03.000+08:00"
            sigle_training: false
            status: 2                       shixun.status >= 2 实训已发布       shixun.status <= 1 模拟实战
            task_pass:                      task_pass ? "允许学员跳关挑战" : "不允许学员跳关挑战"
            test_set_permission: true       test_set_permission ? "允许学员通过金币解锁查看测试集内容" : "不允许学员通过金币解锁查看测试集内容"
            trainee: 1
            updated_at: "2019-10-11T08:50:59.000+08:00"
            use_scope: 0
            user_id: 3039
            users_count: 4
            visits: 69699
            webssh: 1                       是否显示命令行tab
        st              0-编程题 1-选择题
        test_sets       测试集
        test_sets_count: 1
        time_limit: 25                      game_status.json轮训次数
        tomcat_url: "http://47.96.157.89"   web类型实训，可以打开展现一个测试服务，用来查看评测结果  const webDisplayUrl = `${tomcat_url}:${data.port}/${path}`
        tpm_cases_modified: false           参考system_tip属性
        tpm_modified: true                  参考system_tip属性
        user                当前关卡所属用户的信息
        user_praise         当前用户是否点赞

    /MainContentContainer 里的state
        repositoryCode: '',
        open: false,			// 繁忙等级等提示用Dialog，考虑重构封装到根组件
        gameBuilding: false, // 评测中标志
        codeStatus: SAVED, //  0 已修改  1 保存中  2 已保存   3 保存失败

        codeLoading: true,		 			// code加载中
        readRepoTimeout: false,	            // 加载代码轮训超时
        resetCodeDialogOpen: false,			// 重新加载初始代码弹框的bool控制
        resetPassedCodeDialogOpen: false,	// 重新加载上次通过的代码的bool控制

        isEditablePath: true                // 当前文件是否可编辑

    CodeRepositoryViewContainer 里的state
        drawerOpen: false,                  // 代码目录Drawer的bool控制 repoFilesDrawer
        loadingFirstRepoFiles: false,       // 代码目录树加载中的bool控制
        fileTreeData: "",                   // 目录树节点数据[]
        fileTreeSelectedKeys: [],           // 目录树被选择的节点的key
        codeRepositoryViewExpanded: false,  --
        tabIndex: 0,                        // tab值
        settingDrawerOpen: false            // 设置面板Drawer的bool控制
        
-------------- -------------- -------------- -------------- -------------- -------------- -------------- -------------- --------------         

TPIContextProvider
    tpi主要的state容器，主要接口：`/tasks/${stageId}.json`，一次性获取所有tpi首屏展示所需要的信息，除了代码内容。
    接口返回的内容包括
        当前用户信息、shixun、challenge、game、测试集、vnc等等

    其他接口：
    `/tasks/${game.identifier}/check_test_sets.json`
        解锁测试集
    `/tasks/${game.identifier}/plus_or_cancel_praise.json`
        给关卡点赞
    `/tasks/${game.identifier}/picture_display.json`
        如果评测通过，服务端返回了`data.picture`，会调用这个接口获取可视化的评测结果，类型包括
            qrcode  二维码  安卓实训
            image   图片    
            txt
            html
            mp3
            mp4

        代码内容通过以下接口获取：
        `/tasks/${game.identifier}/rep_content.json?path=${path}&status=${status}&retry=${isRetry ? 1 : 0}`

层次结构
TPIContextProvider
    page/Index
        Header
            TaskListContainer
                TaskList                                        左侧划出的任务列表
        MainContentContainer
            MainContent
                LeftViewContainer                               左侧区域
                    LeftView
                        ChooseAnswerView                        选择题答案   
                        CommentContainer 
                            Comments                            评论列表
                        CodeEvaluateMultiLevelAnswerUnlock      多级别解锁
                
                // 看设置，是vnc or 代码 or 选择题
                CodeRepositoryViewContainer for VNC 
                    VNCContainer
                        CodeEvaluateView                        代码评测结果
                        VNCDisplay                              vnc显示
                    ActionView                                  评测按钮区
                || CodeRepositoryViewContainer                  代码显示区
                    WebSSHTimer                                 ssh倒计时
                    TPIMonaco                                   monaco编辑器
                || ChooseRepositoryView                         选择题显示区

                // 看设置，是代码 or 选择题
                CodeEvaluateView 
                || ChooseEvaluateView

                ActionView                                      评测按钮区

没用的文件 
    LeftNav.js
    AnswerListContainer.js      left 他人解答





TPI SSH
    命令行的js资源都位于这个目录：/react/public/js/jsFromMiddleLayer/base64.js

    /page/main/CodeRepositoryView.js文件中，open_webssh.json接口返回后，会根据代码区试图大小计算ssh视图的大小（同样的逻辑在js_min_all中也有：
    var h = $("#games_repository_contents").height() - $("#top_repository").height() - repositoryTabHeight; ）
        这里有个对应的issue https://www.trustie.net/issues/25279
        这里是要判断特殊的屏幕(公司dell笔记本可重现)，针对这些情况处理，加高命令行的高度
    ps js_min_all中搜`$("#games_repository_contents").height()`可以找到相关代码


VNCDisplay
    使用的github上的代码 https://github.com/novnc/noVNC/


tpi拖拽改变视图大小代码：
js_min_all.js中搜索     doc.live('mousemove touchmove',function(e){