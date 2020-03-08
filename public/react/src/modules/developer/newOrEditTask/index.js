/*
 * @Description: 新建或编辑任务
 * @Author: tangjiang 
 * @Date: 2019-11-15 16:38:34 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-19 23:23:41
 */
import './index.scss';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';// import { Form } from 'antd';
import { Button } from 'antd';
import LeftPane from './leftpane';
import RightPane from './rightpane';
import { withRouter } from 'react-router';
import { toStore, CNotificationHOC } from 'educoder';
import UserInfo from '../components/userInfo';
// import RightPane from './rightpane/index';
import actions from '../../../redux/actions';
// import {ModalConfirm} from '../../../common/components/ModalConfirm';

const NewOrEditTask = (props) => {
  const { 
    publishLoading,
    handlePublish,
    // testCases = [],
    // ojTestCaseValidate = [],
    identifier,
    isPublish,
    userInfo,
    submitLoading,
    changeSubmitLoadingStatus,
    changePublishLoadingStatus,
    startProgramQuestion,
    getUserInfoForNew,
    handleCancelPublish,
    validateOjForm,
    getQuestion
    // updateTestAndValidate,
  } = props;
  
  // 表单提交
  const handleSubmitForm = () => {
    // 改变loading状态
    changeSubmitLoadingStatus(true);
    // 调用输入表单验证功能
    if (props.identifier) {
      props.handleUpdateOjForm(props);
    } else {
      props.handleFormSubmit(props); // 提交表单
    }
  };
  
  useEffect(() => {
    // 获取用户信息
    getUserInfoForNew();
    // 获取课程列表
    getQuestion({
      source: 'question'
    });
    // console.log('获取路由参数： ====', props.match.params);
    const id = props.match.params.id;
    // 保存OJForm的id号，指明是编辑还是新增
    props.saveOJFormId(id);  
    if (id) { // id号即 identifier
      // TODO id 存在时, 编辑, 获取 store 中的记录数
      props.getOJFormById(id);
    } else {
      // 清空store中的测试用例集合
      // props.clearOJFormStore();
    }
    return () => {}
  }, []);

  // 模拟挑战
  const imitationChallenge = () => {
    // 先调用保存, 再调用 start 接口, 成功后跳转到模拟页面
    // identifier && startProgramQuestion(identifier, props);
    identifier && validateOjForm(props, 'challenge', () => {
      startProgramQuestion(identifier, props);
    });
  }
  // 开始挑战
  const startChallenge = () => {
    // 调用 start 接口, 成功后跳转到开启实战
    // TODO
    identifier && validateOjForm(props, 'challenge', () => {
      startProgramQuestion(identifier, props);
    });
    // identifier && startProgramQuestion(identifier, props);
  }

  // 取消
  const handleClickCancel = () => {
    // 清空当前输入值并跳转至列表页
    props.clearOJFormStore();
    // 清空描述信息
    toStore('oj_description', '');
    props.history.push('/problems');
  }

  // 发布
  const handleClickPublish = () => {
    // ModalConfirm('提示', (<p>发布后即可应用到自己管理的课堂<br /> 是否确认发布?</p>), () => {
    //   changePublishLoadingStatus(true);
    //   handlePublish(props, 'publish');
    // });
    props.confirm({
      title: '提示',
      content: (<p>发布后即可应用到自己管理的课堂<br /> 是否确认发布?</p>),
      onOk () {
        changePublishLoadingStatus(true);
        handlePublish(props, 'publish');
      }
    });
  }
  // 撤销发布
  const handleClickCancelPublish = () => {
    // ModalConfirm('提示', (<p>是否确认撤销发布?</p>), () => {
    //   changePublishLoadingStatus(true);
    //   handleCancelPublish(props, identifier);
    // });
    props.confirm({
      title: '提示',
      content: ((<p>是否确认撤销发布?</p>)),
      onOk () {
        changePublishLoadingStatus(true);
        handleCancelPublish(props, identifier);
      }
    });
  }

  // 取消保存/取消按钮
  const renderSaveOrCancel = () => {
    return (
      <React.Fragment>
        <Button
          onClick={handleClickCancel}
          style={{ background: '#666666', color: '#fff', border: 'none' }}
        >取消</Button>
        <Button 
          type="primary" 
          loading={submitLoading}
          onClick={handleSubmitForm}
        >保存</Button>
      </React.Fragment>
    );
  }
  // 发布/模拟挑战
  const renderPubOrFight = () => {
    const pubButton = isPublish
     ? (<Button 
          style={{ background: 'rgba(102,102,102,1)', border: 'none' }}
          type="primary" 
          loading={publishLoading}
          onClick={handleClickCancelPublish}
       >撤销发布</Button>)
     : (<Button 
          type="primary" 
          loading={publishLoading}
          onClick={handleClickPublish}
       >立即发布</Button>);
    // 未发布: 模拟挑战 已发布: 开始挑战
    const challengeBtn = isPublish ? (
      <Button type="primary" onClick={startChallenge}>开始挑战</Button>
    ) : (
      <Button type="primary" onClick={imitationChallenge}>模拟挑战</Button>
    );
  
    if (isPublish) {
      return (
        <React.Fragment>
          {pubButton}
          <Button 
              type="primary" 
              loading={submitLoading}
              onClick={handleSubmitForm}
            >保存</Button>
          {challengeBtn}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Button 
              type="primary" 
              loading={submitLoading}
              onClick={handleSubmitForm}
            >保存</Button>
          {pubButton}
          {challengeBtn}
        </React.Fragment>
      );
    }
    
  }

  // 渲染退出
  const renderQuit = () => {
    return identifier ? (
      <Button type="link"
        icon='poweroff'
        className='quite_btn'
        onClick={handleClickCancel}
      >退出</Button>
    ) : ''
  }
  return (
    <div className={'new_add_task_wrap'}>
      <div className={'task_header'}>
        <UserInfo userInfo={userInfo}/>
        <p className={'header_title'}>{props.name || ''}</p>
        { renderQuit() }
      </div>
      <div className="split-pane-area">
        <SplitPane className='outer-split-pane' split="vertical" minSize={350} maxSize={-350} defaultSize="40%">
          <div className={'split-pane-left'}>
            <LeftPane />
          </div>
          <SplitPane split="vertical" defaultSize="100%" allowResize={false}>
            <RightPane onSubmitForm={handleSubmitForm}/>
            <div />
          </SplitPane>
        </SplitPane>
      </div>
      {/* 控制台 */}
      <div className='new_add_task_ctl'>
        {
          /* 录入时: 取消 保存 */
          /* 保存未发布: 立即发布 模拟挑战  */
        }
        { !identifier ? renderSaveOrCancel() : renderPubOrFight() }
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { ojForm, identifier, testCases, isPublish } = state.ojFormReducer;
  const { publishLoading, submitLoading } = state.commonReducer;
  const { userInfo } = state.userReducer;
  return {
    name: ojForm.name,
    identifier,
    testCases,
    isPublish, // 是否已发布
    publishLoading,
    submitLoading,
    userInfo
  }
};

const mapDispatchToProps = (dispatch) => ({
  // 保存提交的代码值
  saveOjFormCode: (value) => dispatch(actions.saveOjFormCode(value)),
  // 表单提交时，调用表单验证功能
  handleFormSubmit: (props) => dispatch(actions.validateOjForm(props)),
  // 发布表单
  handlePublish: (props, type) => dispatch(actions.validateOjForm(props, type)),
  // 撤销发布
  handleCancelPublish: (props, identifier) => dispatch(actions.handleClickCancelPublish(props, identifier)),
  // 更新OJForm
  handleUpdateOjForm: (props) => dispatch(actions.validateOjForm(props)),
  // 根据id号获取表单信息
  getOJFormById: (id) => dispatch(actions.getOJFormById(id)),
  // 保存 OJ form id值
  saveOJFormId: (id) => dispatch(actions.saveOJFormId(id)),
  // 清空测试用例的集合
  clearOJFormStore: () => dispatch(actions.clearOJFormStore()),
  // 按钮状态
  changeSubmitLoadingStatus: (flag) => dispatch(actions.changeSubmitLoadingStatus(flag)),
  // 发布按钮状态 
  changePublishLoadingStatus: (flag) => dispatch(actions.changePublishLoadingStatus(flag)),
  // 测试用例及验证
  updateTestAndValidate: (obj) => dispatch(actions.updateTestAndValidate(obj)),
  // 开启模拟挑战
  startProgramQuestion: (id, props) => dispatch(actions.startProgramQuestion(id, props)),
  // 新建时获取信息
  getUserInfoForNew: () => dispatch(actions.getUserInfoForNew()),
  validateOjForm: (props, type, cb) => dispatch(actions.validateOjForm(props, type, cb)),
  getQuestion: (params) => dispatch(actions.getQuestion(params))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CNotificationHOC() (NewOrEditTask)));
