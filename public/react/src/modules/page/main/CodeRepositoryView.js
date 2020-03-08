
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Drawer from 'material-ui/Drawer';
import { CircularProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';
import WebSSHTimer from '../component/WebSSHTimer'
import Webssh from './Webssh'
import Tree, { TreeNode } from 'rc-tree';
import 'rc-tree/assets/index.css';

import classNames from 'classnames'
// import CodeMirror from 'react-codeMirror'

import axios from 'axios'
import _ from 'lodash'

import notEditablePathImg from '../../../images/tpi/notEditablePath.png'

import TPICodeMirror from '../component/TPICodeMirror'
import TPIMonaco from '../component/monaco/TPIMonaco'

import { loadSshScript, openTerminal } from './Webssh'
import { Modal } from 'antd';

const $ = window.$;

const STABLE_SSH_TAB_ID = 81
const addtionalSSHStartId = 82;
const totalAddtionalTabCount = 2;
let addtionalSSHIdMap = {
    82: false,
    83: false,
    // 84: false,
    // 85: false,
    // 86: false,
};

class CodeRepositoryView extends Component {

    constructor(props) {
        super(props);
        this.treeExpanded = false;
        this.state = {
            autoExpandParent: false,
            expandedKeys: [],

            addtionalSSHArray: [],
            sshIsClosed: false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const { game, challenge, hide_code, tabIndex,  } = this.props
        
        if (     // 初始化 或者 game切换
                !this.treeExpanded && challenge.path && challenge.path.length && this.state.expandedKeys.length === 0 || 
                game && (!prevProps.game 
                || prevProps.game.identifier !== this.props.game.identifier) ) {
            
            if (!this.treeExpanded) {
                this.treeExpanded = true
                const _path = challenge.multiPath ? challenge.path[0] : challenge.path;
                let _ar = [];
                const expandedKeys = [];
                if (_path) {
                    _ar = _path.split('/')
                    _ar.length = _ar.length - 1
                    _ar.forEach( (item, index) => {
                        expandedKeys.push( index === 0 ? item : expandedKeys[index - 1] + '/' + item)
                    })
                }
                expandedKeys.length = 1 // 没办法做到多级初始化，而且会引起点击其他子目录，加载当前文件目录的问题
                // 初始化时无法展开到根节点 https://github.com/fis-components/rc-tree/issues/3
                expandedKeys.length && this.setState({
                    expandedKeys,
                })
            }

            if (game && (!prevProps.game 
                || prevProps.game.identifier !== this.props.game.identifier)) {       
                // 切换关卡时切换到第一个tab
                // 如果隐藏code tab，就只有一个ssh tab了
                if (hide_code == true) {
                    this.props.tabIndexChange(81);
                } else if (hide_code == undefined || hide_code == false || tabIndex !== 0) {   // 不加if会有死循环
                    this.props.tabIndexChange(0);
                }
            }
        }
    }

    componentDidMount() {       
        // 隐藏code tab，则显示ssh tab（81）
		if (this.props.hide_code === true) {
			this.tabIndexChange(81)
        }
         
        //显示所有代码文件
        $(".code-file-tab").hover(function(){
            // var ulwidth=$("#blacktab_nav").width();
            // $(".code-flie-list").width(ulwidth);

            $(".code-flie-list").show();

            $(this).find("i")
                .addClass("codeRepoShow")
                // .removeClass("fa-caret-right").addClass("fa-caret-down");
        },function(){
            $(".code-flie-list").hide();
            $(".code-file-tab").find("i")
                .removeClass("codeRepoShow")
                // .removeClass("fa-caret-down").addClass("fa-caret-right");
        })
    }

    onTreeSelect = (selectedKeys, info) => {
        if (!info.node.isLeaf()) {
            const expandedKeys = this.state.expandedKeys.slice(0)
            const _index = expandedKeys.indexOf(selectedKeys[0]);
            if (_index == -1) {
                expandedKeys.push(selectedKeys[0])    
            } else {
                expandedKeys.splice( _index, 1)
            }
            this.setState({ expandedKeys })
        }
        
        this.props.onTreeSelect(selectedKeys, info)
    }   
    buildTree() {
        // TODO http://localhost:3007/tasks/xgffnuomytpj   这个实训没有文件树
        const { fileTreeData, onLoadData, fileTreeSelectedKeys } = this.props;
        if (!fileTreeData || fileTreeData.length === 0) {
            return ""
        }
        

        const loop = (data) => {
          return data.map((item) => {
            if (item.children) {
              return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return (
                <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} />
            );
          });
        };
        const treeNodes = loop(fileTreeData);
        
        
        // selectable={false}
        return (
            <Tree
                selectedKeys={fileTreeSelectedKeys}
                onSelect={this.onTreeSelect}
                onExpand={this.onExpand}
                expandedKeys={this.state ? this.state.expandedKeys : []}
                autoExpandParent={this.state.autoExpandParent}
                loadData={onLoadData}
            >
              {treeNodes}
            </Tree>
        )
    }
    onExpand = (expandedKeys) => {
        // console.log('onExpand', arguments);
        // if not set autoExpandParent to false, if children expanded, parent can not collapse.
        // or, you can remove all expanded children keys.
        this.setState({
          expandedKeys,
          autoExpandParent: false,
        });
    }


    onPathChange(index, isDropDown) {
        const { challenge, onPathChange, doFileUpdateRequestOnCodeMirrorBlur } = this.props;
        if (challenge.pathIndex !== index) {
            // 切换时保存文件
            // doFileUpdateRequestOnCodeMirrorBlur(true)

            onPathChange(index, isDropDown)
        }
    }

    renderChallengePath() {
        const { challenge } = this.props;
        let { pathIndex, path } = challenge;
        var domArray = [];
        const pathArray = path.forEach ? path : [path]
        pathArray.forEach( (item, index) => {
            domArray.push( 
                <p key={index} className={classNames({'blue-line': pathIndex == index})} onClick={ () => this.onPathChange(index, true) } >
                    {item}    
                </p> )
        })
        
        return (
                <div className="codefile-all pl10">
                    {domArray} 
                </div>
            )
    }
    initSsh = ($, tabIndex, isReInit) => {
        const { myshixun } = this.props;
        const url = `/myshixuns/${myshixun.identifier}/open_webssh.json`
        tabIndex && $(`#codetab_con_${tabIndex}`).html('正在连接命令行服务...')
        axios.get(url,
            {
                // withCredentials: true
            }       
        ).then((response) => {   
            tabIndex && $(`#codetab_con_${tabIndex}`).html('')    // 清空 ‘正在连接命令行服务...’

            if (response.data.game_id) { 
                // 重置ssh状态
                this.setSSHClosed(false);

                const { game_id, host, password, port, username, webssh_url} = response.data
                // js_min_all.js有同样的计算逻辑，用来拖拽时计算ssh高宽
                // TODO 结合new Terminal 时的fontSize参数来定高度
                const gameCtx = $("#games_repository_contents");
                gameCtx.css({'padding-bottom': '30px', 'background': '#000'});
                var h      = gameCtx.height() - 50;
                var w      = gameCtx.width();
                var line_h = (navigator.userAgent.indexOf('Chrome') >= 0 ? 18 : 19);
                var rows   = Math.round(h / line_h);
                var cols   = parseInt(w / 9.9);
               
                response.data.width = w;
                response.data.height = h;
                response.data.line_h = line_h;
                response.data.rows = rows;
                response.data.cols = cols;
                 // https://stackoverflow.com/questions/5645485/detect-mousemove-when-over-an-iframe
                // this.loadSshInIframe( response.data, tabIndex )

                this.loadSshNormal(response.data, tabIndex, isReInit)
                
            }
            // console.log(response)
        }).catch((error) => {
            console.log(error)
        })
    }
    loadSshNormal(data, tabIndex, isReInit) {
        if (isReInit) {
            const addtionalSSHArray = this.state.addtionalSSHArray.slice(0)
            addtionalSSHArray.unshift(STABLE_SSH_TAB_ID)
            addtionalSSHArray.forEach(item => {
                this.loadSshNormal(data, item)
            })
            return;
        }
        // 不用iframe直接渲染ssh
        // $(".game_webssh").css({"min-height":h, "max-height":h});
        const container = $(`#codetab_con_${tabIndex}`);
        // ReactDOM.unmountComponentAtNode(container)
        // ReactDOM.render(<Webssh {...data} 
        //     ></Webssh>, container);
        // this.setState({
        //     sshData: data
        // })

        loadSshScript(() => {
            container.html('<div id="term" class="term" align="center"></div>')
            openTerminal(data, `#codetab_con_${tabIndex}`)
        })
    }
    loadSshInIframe(data, tabIndex) {
        const { game_id, host, password, port, username, webssh_url
        , height, width, line_h, rows, cols, } = data

        let _domain = webssh_url || 'https://webssh.educoder.net';
        // window.location.host === "www.educoder.net" ? 
        //       'https://webssh.educoder.net'
        //     : 'https://testwebssh.educoder.net'
        const html = `<iframe src="${_domain}/?Host=${host}&amp;Port=${port}&amp;Username=${username}&amp;Password=${password}&amp;Gameid=${game_id}&amp;Rows=${rows}&amp;Tab=81&amp;Columns=${cols}&amp;Width=${width}&amp;Height=${height}" style="width: 100%; border: 0px; min-height: 454px; max-height: 454px; " scrolling="no" id="game_webssh" class="game_webssh"></iframe>`
        $(`#codetab_con_${tabIndex}`).html(html)
    }
    tabIndexChange(index) {
        // webssh TODO 需要接口，是否显示ssh
        const $ = window.$
        this.props.tabIndexChange(index);
        if ($(`#codetab_con_${index} .terminal.xterm`).length === 1) {  // 已经初始化过了
            return;
        }
        
        this.initSsh($, index);
       
    }
    /**  multi ssh */
    setSSHClosed = (isClose) => {
        this.setState({
            sshIsClosed: isClose
        })
    }
    getAddtionalSSHNewID() {
        // addtionalSSHIdMap
        for(let i = addtionalSSHStartId; i < addtionalSSHStartId + totalAddtionalTabCount; i++) {
            if (!addtionalSSHIdMap[i]) {
                return i
            }
        }
        return null;
    }
    addSSHTabs = () => {
        let addtionalSSHArray = this.state.addtionalSSHArray.slice(0)
        let newId = this.getAddtionalSSHNewID();
        if (newId) {
            addtionalSSHArray.push(newId)
            addtionalSSHIdMap[newId] = true;
            this.tabIndexChange(newId)
            this.setState({ addtionalSSHArray })
        }
    }
    close_ssh_cocket_iframe = (id) => {
        /*
            关闭连接，清空tab content
        */ 
        let _w = $(`.game_webssh_${id}`)[0].contentWindow
			_w && _w.postMessage({tp: 'close_ssh_cocket'}, "*");
        $(`#codetab_con_${id}`).html('')
    }
    close_ssh_cocket_normal = (id) => {
        /*
            关闭连接，清空tab content
        */ 
        // let _w = $(`.game_webssh_${id}`)[0].contentWindow
		// 	_w && _w.postMessage({tp: 'close_ssh_cocket'}, "*");
        // $(`#codetab_con_${id}`).html('')
    }
    onSSHTabClose = (id, e) => {
        let addtionalSSHArray = this.state.addtionalSSHArray.slice(0)
        _.remove(addtionalSSHArray, (item)=> item === id)
        addtionalSSHIdMap[id] = false;
        this.tabIndexChange(STABLE_SSH_TAB_ID)
        this.setState({ addtionalSSHArray })
        // game_webssh_${tabIndex} TODO
       
        this.close_ssh_cocket_normal(id)
        e.stopPropagation();
    }
    isSSHTabIndex = () => {
        const index = this.props.tabIndex
        if (index >= 81 && index < 90) {
            return true;
        }
        return false;
    }
    /**  multi ssh end */

  	render() {

        const { repositoryCode, onRepositoryCodeUpdate, showFilesDrawer, drawerOpen, loadingFirstRepoFiles
                , challenge, evaluateViewExpanded, onRepositoryViewExpand, codeStatus ,
                showResetCodeDialog, showResetPassedCodeDialog, tabIndex, tabIndexChange, game, shixun, isEditablePath, currentPath
                , showSettingDrawer, hide_code } = this.props;
        // onRequestChange={(drawerOpen) => showFilesDrawer(drawerOpen)}
        /*

            <p className="pl10 pr10 mt5 mb5 edu-txt-left" style={{height:'30px'}}>
                                请点击文件名称切换代码显示，<span className="blue-line">代表当前显示的代码文件</span>
                            </p>
        */
        const { tpm_cases_modified, tpm_modified, tpm_script_modified, myshixun, onShowUpdateDialog } = this.props;
        let needUpdateScript = (tpm_modified || tpm_script_modified) && challenge.st === 0;
        const showUpdateButton = (tpm_cases_modified || needUpdateScript) && myshixun.system_tip === true;

        const { addtionalSSHArray, sshIsClosed } = this.state;
        // shixun.multi_webssh = true;
	    return (
            <React.Fragment>
		      	<Drawer
                    anchor="right"

                    className="repoFilesDrawer"

                    width={300}
                    open={drawerOpen}
                    
                    onClose={() => showFilesDrawer( false )}
                >
                    { loadingFirstRepoFiles ? (
                        <div style={{width: '100%', height:'200px', textAlign: 'center', marginTop: '48px'}} >
                            <CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '40%', display: 'block' }}/>
                        </div>
                        ) : this.buildTree()}
                </Drawer>

                <ul id="blacktab_nav" className="">
					
                    { hide_code === false && <li id="codetab_nav_1" className={classNames('code-file-tab', 'eud-pointer', 'pr', 'blacktab_nomal', {'blacktab_hover':tabIndex===0 })} onClick={() => tabIndexChange(0)}>
                        <a href="javascript:void(0);" className={classNames('tab_type', 'tab_color', {'fl': challenge.pathIndex === -1 || challenge.multiPath === true } )}>代码文件</a>

                        { (challenge.pathIndex === -1 || challenge.multiPath === true) ?
                            <React.Fragment>
                                <i className="fr fa mt13 tab_color fa-caret-right"></i>
                                <div className="code-flie-list" style={{ display: 'none' }}>
                                    {this.renderChallengePath()}
                                </div>
                            </React.Fragment>
                        : "" }
                        
                    </li> }

                    {shixun.webssh !== 0 && 
                    <li id="codetab_nav_2" data-tab="2" className={classNames('add-webssh', 'blacktab_nomal', {'blacktab_hover':tabIndex===STABLE_SSH_TAB_ID })} 
                        onClick={() => this.tabIndexChange(STABLE_SSH_TAB_ID)}>
                        <a href="javascript:void(0);" className="tab_type tab_color">命令行</a>
                    </li> }
                    { 
                        addtionalSSHArray.map( (item, index) => {
                            return (<li id={`codetab_nav_${item}`} data-tab={item} 
                                    className={classNames('add-webssh', 'blacktab_nomal', {'blacktab_hover':tabIndex===item })} 
                                    onClick={() => this.tabIndexChange(item)}>
                                <a href="javascript:void(0);" className="tab_type tab_color">命令行{index + 1}</a>
                                <Tooltip title={ "关闭该命令行窗口"} disableFocusListener={true}>
                                <i class="anticon anticon-close ant-tabs-close-x" onClick={(e) => this.onSSHTabClose(item, e)}>
                                    <svg viewBox="64 64 896 896" class="" data-icon="close" width="1em" height="1em" 
                                        fill="currentColor" aria-hidden="true">
                                        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 0 0 203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path>
                                    </svg>
                                </i>
                                </Tooltip>
                            </li>)
                        })
                    }

                    {/* */}
                    { shixun.webssh !== 0 && shixun.multi_webssh == true && addtionalSSHArray.length < totalAddtionalTabCount 
                        && sshIsClosed === false && <li id="codetab_nav_add" className="c_white" style={{paddingLeft:'10px'}}>
                        <Tooltip title={ "新开命令行窗口"} disableFocusListener={true}>
                            <a href="javascript:void(0);" className="tab_type tab_color"
                                onClick={this.addSSHTabs}
                            >＋</a>
                        </Tooltip>
                    </li> }
 
                    { tabIndex === 0 && <h3 id="save_status" className="ml15 mt7 fl color-grey font-14" style={{fontWeight: 'normal'}}>
                        {codeStatus === 0 ? '已修改' : (codeStatus === 1 ? '保存中...' : '已保存' ) }
                    </h3> }
                    <div className="fr -horizontal">

                        { /**/ }
                        {   
                            <WebSSHTimer game={game} showTimerProp={this.isSSHTabIndex()} 
                                reInitSsh={this.initSsh} setSSHClosed={this.setSSHClosed}></WebSSHTimer>
                        }

                        { showUpdateButton &&
                        <React.Fragment>
                        
                            <a   className="iconButton" onClick={()=>{ onShowUpdateDialog() }}>
                                <Tooltip title={ "更新通知"} disableFocusListener={true}>
                                    <i className="iconfont icon-gonggao font-20 "></i>
                                </Tooltip>
                            </a>
                        
                        <span className="dot"></span>
                        </React.Fragment>
                        }

                        { !shixun.code_hidden && tabIndex === 0 && 
                            <a  className="iconButton" onClick={showFilesDrawer.bind(this, true)} >
                                <Tooltip title={ "文件目录"} disableFocusListener={true}>
                                    <i className="iconfont icon-wenjian font-18 "></i>
                                </Tooltip>
                            </a>
                         }

                        <span id="return_last_code">
                        </span> 

                        { challenge.pathIndex !== -1 && game.status === 2 && tabIndex === 0 && 
                                this.props.readRepoTimeout !== true && 
                            <a href="javascript:void(0);" className="iconButton" id="reset_success_game_code" onClick={showResetPassedCodeDialog}>
                                <Tooltip title={ "加载上次通过的代码"} disableFocusListener={true}>
                                    <i className="iconfont icon-fanhuishangcidaima font-20 "></i>
                                </Tooltip>
                            </a>
                        }

                        {
                            challenge.pathIndex !== -1 && tabIndex === 0 && this.props.readRepoTimeout !== true && 
                            <a href="javascript:void(0);" className="iconButton" id="reset_game_code" onClick={showResetCodeDialog}>
                                <Tooltip title={ "恢复初始代码"} disableFocusListener={true}>
                                    <i className="iconfont icon-zhongzhi font-20 "></i>
                                </Tooltip>
                            </a>
                         }

                        {
                            tabIndex === 0 && this.props.readRepoTimeout !== true && 
                            <a href="javascript:void(0);" className="iconButton" id="setting" onClick={() => showSettingDrawer(true)}>
                                <Tooltip title={ "设置"} disableFocusListener={true}>
                                    <i className="iconfont icon-shezhi " style={{fontSize: '19px'}}></i>
                                </Tooltip>
                            </a>
                        }
                        
                        <a href="javascript:void(0);" className="mr15 iconButton" onClick={onRepositoryViewExpand} id="extend_and_zoom">
                            <Tooltip id="tooltip-icon-expand" title={ evaluateViewExpanded ? "收起" : "展开"}>
                                {/*<i className="fa font-16 fa-expand"></i>*/}
                                <i className={ evaluateViewExpanded ? "font-18 iconfont icon-shousuo" : "iconfont icon-zhankai font-18" }></i>
                            </Tooltip>
                        </a>
                        
                    </div>
                    <div className="cl"></div>
                </ul>
                <div className="cl"></div>
                
                <div id="codetab_con_1" style={{display: 'block', flex: 'auto'}} style={ tabIndex === 0 ? {display: 'block'} : {display: 'none'}  }>
                    {/* 没必要显示这个，注释掉了 */}
                    {/* { !isEditablePath && 
                        <Tooltip title={ "当前文件路径(只读)"}>
                            <div className="codePath">
                                {currentPath}
                            </div> 
                        </Tooltip>
                    } */}
                    {this.props.readRepoTimeout === true ? <div className="readRepoFailed">
                        代码加载失败，<a className="retry" 
                            onClick={() => this.props.fetchRepositoryCode(this.props, null, null, true, true)}>重试</a>
                    </div> :
                    <React.Fragment>
                        <div className="codemirrorBackground" 
                            style={{ backgroundImage: `url('${notEditablePathImg}')`
                                , display: (isEditablePath || this.props.shixun && this.props.shixun.code_edit_permission ? 'none' : 'block') }}></div>
                        {/*<textarea className = "" id="extend-challenge-file-edit" name="content">{repositoryCode}</textarea>*/}
                        {/* cm monaco 切换 */}
                        {/* <TPICodeMirror {...this.props} ></TPICodeMirror> */}
                        <TPIMonaco {...this.props}></TPIMonaco>
                    </React.Fragment>
                    }
                </div>
                <div id="codetab_con_81" className="undis -relative" 
                    style={ { color: '#fff', display: tabIndex === STABLE_SSH_TAB_ID ? 'block' : 'none', 'marginLeft': '2px'} }>
                    {/* { tabIndex === STABLE_SSH_TAB_ID && this.state.sshData && <Webssh {...this.state.sshData} ></Webssh> } */}
                </div>
                <div id="codetab_con_82" className="undis -relative" 
                    style={ { color: '#fff', display: tabIndex === 82 ? 'block' : 'none', 'marginLeft': '2px', 'paddingBottom': '30px' } }>
                </div>
                <div id="codetab_con_83" className="undis -relative" 
                    style={ { color: '#fff', display: tabIndex === 83 ? 'block' : 'none', 'marginLeft': '2px', 'paddingBottom': '30px'} }>
                </div>
                <div id="codetab_con_84" className="undis -relative" 
                    style={ { color: '#fff', display: tabIndex === 84 ? 'block' : 'none', 'marginLeft': '2px', 'paddingBottom': '30px'} }>
                </div>
                <div id="codetab_con_3" className="undis -relative" style={{display: 'none'}}></div>
		    </React.Fragment>
	    );
  	}
}
/* 
    <%= Redmine::CodesetUtil.replace_invalid_utf8(@content) %>
    , overflow: 'scroll'  ref="editor" 
    <CodeMirror style={{height: '100%'}} value={repositoryCode} onChange={onRepositoryCodeUpdate} options={cmOptions} />

    <iframe src="https://testwebssh.educoder.net/?Host=10.9.81.28&amp;Port=44940&amp;Username=root&amp;Password=123123&amp;Gameid=2618&amp;Rows=24&amp;Tab=2" 
                        style={{width: '100%', border: '0px', minHeight: '440px', maxHeight: '440px'}} scrolling="no" id="game_webssh" className="game_webssh"></iframe>
*/

export default CodeRepositoryView;