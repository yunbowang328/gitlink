/*
 * @Description: jupyter tpi
 * @Author: tangjiang
 * @Github:
 * @Date: 2019-12-11 08:35:23
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-13 15:25:50
 */
import './index.scss';
import React, { useEffect, useState } from 'react';
import SplitPane from 'react-split-pane';
import { Button, Modal,Drawer ,Pagination,Empty,Tooltip,Icon,message,Statistic,Spin} from 'antd';
import {
  connect
} from 'react-redux';
import FloatButton from '../../page/component/FloatButton';
import UserInfo from '../../developer/components/userInfo';
import actions from '../../../redux/actions';
import RightPane from './rightPane';

import MyIcon from "../../../common/components/MyIcon";
function clearSlct() {
  if("getSelection" in window){
    window.getSelection().removeAllRanges();
  }else{
    document.selection.empty();
  };
}
function jsCopy(s) {
  clearSlct();
  const copyEle = document.getElementById(s);
  copyEle.select();
  const copyStatus=document.execCommand("Copy");
  // 对成功与否定进行提示
  copyStatuss(copyStatus)
}

function copyStatuss(copyStatus){
  if (copyStatus) {
    message.success('复制成功');
  } else {
    message.error('复制失败');
  }
}
function JupyterTPI (props) {

  // 获取 identifier 值
  const {
    match: {
      params = {}
    },
    url,
    loading, // 保存按钮状态
    total,
    pagination,
    dataSets, // 数据集
    jupyter_info,
    getJupyterInfo,
    syncJupyterCode,
    jupyter_tpi_url_state,
    getJupyterTpiDataSet,
    getJupyterTpiUrl,
    saveJupyterTpi,
    changeLoadingState,
    changeGetJupyterUrlState,
    jupyter_identifier,
    changeCurrentPage,
    changeshowDrawer,
    drawervisible,
    reset_with_tpi,
    jupytertime,
    endjupytertime,
    active_with_tpi,
    spinning,
    updataspinning,
    jupyter_folder_name
  } = props;

  const emptyCtx = (
    <div className="jupyter_empty">
      <style>
        { `
          .ant-empty{
            margin-top:80px;
            color:#fff;
          }
           `
        }
      </style>
      <Empty />
    </div>
  );
  const { Countdown } = Statistic;
  const {identifier} = params;
  const [userInfo, setUserInfo] = useState({});
  const [jupyterInfo, setJupyterInfo] = useState({});
  const [updateTip, setUpdateTip] = useState(true);
  const [myIdentifier, setMyIdentifier] = useState('');
  const [renderCtx, setRenderCtx] = useState(() => (emptyCtx));

  let newHandletype=false
  const newHandle = function (event) {
    if(newHandletype===false){
      newHandletype=true
      saveJupyterTpi(event);
      setTimeout(()=>{newHandletype=false},500)
    }
  }

  // 保存代码
  const addEventListeners = () => {
    window.addEventListener('message', (e) => {
      // console.log("触发了jupytermessage");
      if(e){
        if(e.data){
          if(e.data==="jupytermessage"){
            newHandle()
          }
        }
      }
    })
  }

  const stopposttpip=(sum)=>{
    var _iframe = document.getElementById("rightPaneframe");
    if(_iframe == null || _iframe == undefined || _iframe == ""){
      return;
    }
    if(sum===1){
      _iframe.contentWindow.postMessage("stopParent", "*");
    }else{
      _iframe.contentWindow.postMessage("clonsParent", "*");
    }

  }


  useEffect(() => {
    addEventListeners()
  }, []);

  useEffect(() => {
    /* 先调用 jupyter的 TPI 接口，
     * 获取 用户信息,
     * 实训的 identifier, 状态， 名称， 是否被修改等信息
    */
   getJupyterInfo(identifier);
  }, [identifier]);

  useEffect(() => {

    // 设置jupyter信息
    setJupyterInfo(jupyter_info || {});
    const {user, tpm_modified, myshixun_identifier} = jupyter_info;
    if (user) {
      setUserInfo(user);
    }

    if (myshixun_identifier) {
      setMyIdentifier(myshixun_identifier);
    }

    // 同步代码
    if (tpm_modified && updateTip && myshixun_identifier) {

      setUpdateTip(false);
      updataspinning(true)
      Modal.confirm({
        title: '更新通知',
        content: (<div className="update_notice">
          {stopposttpip(1)}
          <p className="update_txt">该实训已更新，您选择更新后之前编写的实训代码将会丢失，如有需要请先使用【jupyter中-文件-下载】保存代码，再进行更新</p>
          {/*<p className="update_txt">还未完成评测的任务代码，请自行保存</p>*/}
        </div>),
        okText: '立即更新',
        cancelText: '稍后再说',
        onOk () {
          syncJupyterCode(myshixun_identifier, '同步成功');
        },onCancel() {
          updataspinning(false)
          stopposttpip(2)
        },
      })
    }
  }, [props]);


  // 重置实训
  const handleClickResetTpi = () => {
    stopposttpip(1)
    updataspinning(true)
    Modal.confirm({
      title: '重置实训',
      content: (
        <p style={{ lineHeight: '24px' }}>
          你在本文件中修改的内容将丢失,<br />
          是否确定重新加载初始代码？
        </p>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk () {
        console.log('调用重置代码....', myIdentifier);
        if (myIdentifier) {
          syncJupyterCode(myIdentifier, '重置成功');
        }
      },
      onCancel() {
        stopposttpip(2)
        updataspinning(false)
      },
    })
  }


  // 重置环境
  const handleEnvironmentTpi = () => {
    stopposttpip(1)
    updataspinning(true)
    Modal.confirm({
      title: '重置环境',
      content: (
        <p style={{ lineHeight: '24px' }}>
          是否确定重置环境？
        </p>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk () {
        console.log('调用重置代码....', myIdentifier);
        // if (myIdentifier) {
        //
        // }
        reset_with_tpi(myIdentifier, '重置成功');
      },
      onCancel() {
        updataspinning(false)
        stopposttpip(2)
      },
    })
  }

  // 退出实训
  const handleClickQuitTpi = () => {
    // console.log(jupyterInfo);
    const { identifier } = jupyterInfo;
    if (!identifier) return;
    props.history.push(`/shixuns/${identifier}/challenges`);
  }

  // 重新获取 jupyter url
  const handleOnReloadUrl = (id) => {
    // console.log('jupyter 信息: ', jupyterInfo);
    // 改变加载状态值
    changeGetJupyterUrlState(-1);
    getJupyterTpiUrl({identifier: myIdentifier});
  }

  // 保存代码
  const handleOnSave = () => {
    // 改变按钮状态
    changeLoadingState(true);
    saveJupyterTpi();
  }

  // 分页信息改变时
  const handlePageChange = (current) => {
    // 改变当前页
    changeCurrentPage(current);
    // 分页查找数据
    getJupyterTpiDataSet(jupyter_identifier);
  }

  const swtichFirstDrawer = () => {
    changeshowDrawer(!drawervisible)
  }

  const firstDrawerWidth = ()=>{
    return 260
  };
  let newPage=false
  // 分页处理
  const handleChangePage = (e,page) => {
    //滑动到底判断
    let newscrollTop=parseInt(e.currentTarget.scrollTop);
    let allclientHeight=e.currentTarget.clientHeight+newscrollTop;
    if(dataSets.length<total){
      if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
        handlePageChange(page+1);
      }
    }
  }
  // const listCtx = ;
  useEffect(() => {
    if (dataSets.length > 0) {
      // console.log('数据集的个数: ', dataSets.length);
      const oList = dataSets.map((item, i) => {
        return (
          <li className="jupyter_item" key={`key_${i}`}>
            <Tooltip
              placement="right"
              // title={item.file_path}
              mouseLeaveDelay={0.3}
            >
            <div className="sortinxdirection">
							<Icon type="file-text" className="jupyter_icon fl lineheighttaj filestyles" />
							<a className="jupyter_name ml10  maxnamewidth152 lineheighttaj colorlineheighttaj" title={item.title}>{item.title}</a>
							<a className={"fr color-blue lineheighttaj"}
								 onClick={() => {
									 jsCopy("file_path"+i)
								 }}>复制地址</a>
						</div>
							<input id={"file_path"+i}  className={"file_path_input"} value={item.file_path}/>
            </Tooltip>
          </li>
        );
      });

      const oUl = (
        <ul className="jupyter_data_list"  onScroll={(event)=>handleChangePage(event,pagination.page)} >
          { oList }
        </ul>
      );

      setRenderCtx(oUl);
    }
  }, [props]);

  const onFinish= () =>{
    Modal.destroyAll();
    Modal.confirm({
      title: '倒计时截止',
      content: (
        <p style={{ lineHeight: '24px' }}>
           服务已中断，是否确认重置实验环境？
        </p>
      ),
      okText: '确定',
      cancelText: '取消',
      onOk () {
        reset_with_tpi(myIdentifier, '重置成功');
      }
    })
  }
  const endonFinish= () =>{
    Modal.confirm({
      title: '服务中断提醒',
      content: (
        <p style={{ lineHeight: '24px' }}>
         jupyter将于<span className={"Countdownfonttpi"}><Countdown value={jupytertime} format="HH:mm:ss"/></span>时间后服务中断，是否需要延长使用时间？
        </p>
      ),
      okText: '立即延长',
      cancelText: '不需要',
      onOk () {
        active_with_tpi(myIdentifier, '延长成功');
      }
    })
  }
  return (
    <Spin tip="加载中..." spinning={spinning}>
    <div className="jupyter_area">
      <div className="jupyter_header">
        <UserInfo userInfo={userInfo} />
        <p className="jupyter_title">
          <span className="title_desc" style={{ marginTop: '10px' }}>{jupyterInfo.name}</span>
          <span className="title_time jupytertitle_time">
            <Countdown value={jupytertime} format="HH:mm:ss" onFinish={onFinish}/>
        	<span className={"Countdowntypes"}>
            {endjupytertime===false?"":<Countdown value={endjupytertime} format="HH:mm:ss" onFinish={endonFinish}/>}
					</span>
          </span>
        </p>
        <p className="jupyter_btn">
           {/*sync | poweroff */}
          <Button
            className="btn_common"
            type="link"
            icon="history"
            onClick={handleClickResetTpi}
          >重置实训</Button>

          <Button
            className="btn_common"
            type="link"
            icon="sync"
            onClick={handleEnvironmentTpi}
          >重置环境</Button>

          <Button
            className="btn_common"
            type="link"
            icon="poweroff"
            onClick={handleClickQuitTpi}
          >退出实训</Button>
        </p>
      </div>

      <div className="jupyter_ctx">
        <SplitPane split="vertical" minSize={350} maxSize={-350} defaultSize="100%">
          {/*<div className={'split-pane-left'}>*/}
          {/*  <LeftPane*/}
          {/*    dataSets={dataSets}*/}
          {/*    total={total}*/}
          {/*    pagination={pagination}*/}
          {/*    onPageChange={handlePageChange}*/}
          {/*  />*/}
          {/*</div>*/}
          <SplitPane split="vertical" defaultSize="100%" allowResize={false}>
            <RightPane
              identifier={myIdentifier}
              status={jupyter_tpi_url_state}
              url={url}
              loading={loading}
              onReloadUrl={handleOnReloadUrl}
              onSave={handleOnSave}
            />
            <FloatButton onClick={swtichFirstDrawer} className={drawervisible===false?"jupyter_float_button":"jupyter_float_button newjupyter_float_button"}>{"数据集"}</FloatButton>
          </SplitPane>

        </SplitPane>
        <Drawer
          placement={"right"}
          closable={false}
          mask={false}
          // onClose={this.onClose}
          visible={drawervisible}
          className={"RightPaneDrawer"}
        >
          {/*<p className={"RightPaneDrawertop"}></p>*/}
          <div className="jupyter_data_sets_area newjupyter_data_sets_area">
            <h2 className="jupyter_h2_title bortop17212F">
              {/*<MyIcon type="iconwenti" className="jupyter_data_icon"/>*/}
              <i className={"iconfont icon-base"}></i>数据集
              {/* <span className="iconfont icon-java jupyter_data_icon"></span>数据集 */}
            </h2>
            {dataSets&&dataSets.length===0?"":<h2 className="borbottom17212F jupyterfilepaths bortop17212F pt5">
              <span className={"ml50"}>文件路径</span>
              <div className="sortinxdirection">
                <a className="jupyter_name ml50  maxnamewidth186JUPYTER colorlineheightta height45lineheight45">{jupyter_folder_name}</a>
                <a className={"fr color-blue font-14 height45lineheight45"}
                   onClick={() => {
                     jsCopy("jupyter_folder_name")
                   }}>复制地址</a>
              </div>
              <input id="jupyter_folder_name" className={"file_path_input"} value={jupyter_folder_name}/>
            </h2>}
              { renderCtx }
            {/*<div className='jupyter_pagination'>*/}
            {/*  {total<20?"":<Pagination*/}
            {/*    simple*/}
            {/*    current={pagination.page}*/}
            {/*    pageSize={pagination.limit}*/}
            {/*    total={total}*/}
            {/*    onChange={handleChangePage}*/}
            {/*  />}*/}
            {/*</div>*/}
          </div>

        </Drawer>
      </div>
    </div>
   </Spin>
  );
}

const mapStateToProps = (state) => {
  const {
    jupyter_info,
    jupyter_tpi_url,
    jupyter_data_set,
    jupyter_tpi_url_state,
    jupyter_data_set_count,
    jupyter_folder_name,
    jupyter_pagination,
    jupyter_identifier
  } = state.jupyterReducer;
  const { loading ,drawervisible,jupytertime,spinning,endjupytertime} = state.commonReducer;
  return {
    loading,
    jupyter_info,
    url: jupyter_tpi_url,
    dataSets: jupyter_data_set,
    jupyter_tpi_url_state,
    total: jupyter_data_set_count,
    pagination: jupyter_pagination,
    jupyter_folder_name:jupyter_folder_name,
    jupyter_identifier,
    drawervisible,
    jupytertime,
    endjupytertime,
    spinning
  };
}

const mapDispatchToProps = (dispatch) => ({
  changeGetJupyterUrlState: (status) => dispatch(actions.changeGetJupyterUrlState(status)),
  getJupyterInfo: (identifier) => dispatch(actions.getJupyterInfo(identifier)),
  // 重置代码
  syncJupyterCode: (identifier, msg) => dispatch(actions.syncJupyterCode(identifier, msg)),
  // 重置代码
  reset_with_tpi: (identifier, msg) => dispatch(actions.reset_with_tpi(identifier, msg)),
  getJupyterTpiDataSet: (identifier, current) => dispatch(actions.getJupyterTpiDataSet(identifier, current)),
  getJupyterTpiUrl: (identifier) => dispatch(actions.getJupyterTpiUrl(identifier)),
  saveJupyterTpi: () => dispatch(actions.saveJupyterTpi()),
  changeLoadingState: (flag) => dispatch(actions.changeLoadingState(flag)),
  changeCurrentPage: (current) => dispatch(actions.changeCurrentPage(current)),
  //展开Drawer
  changeshowDrawer: (type) => dispatch(actions.changeshowDrawer(type)),
  //倒计时增加
  addjypertime: (type) => dispatch(actions.addjypertime(type)),
  //延时
  active_with_tpi:(identifier, msg) => dispatch(actions.active_with_tpi(identifier, msg)),
  updataspinning:(identifier, msg) => dispatch(actions.updataspinning(identifier, msg)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(JupyterTPI);
