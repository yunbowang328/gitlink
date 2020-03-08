/*
 * @Description: 右侧代码块控制台
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 16:02:36
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-20 17:42:06
 */
import './index.scss';
import React, { useState, useRef, useEffect } from 'react';
import { Tabs, Button, Icon, notification  } from 'antd';
import { connect } from 'react-redux';
import InitTabCtx from '../initTabCtx';
import ExecResult from '../execResult';
import actions from '../../../../redux/actions';

const { TabPane } = Tabs;
const ControlSetting = (props) => {

  const { 
    hack,
    userCode,
    inputValue,
    loading,
    submitLoading,
    identifier,
    excuteState,
    // showOrHideControl,
    commitTestRecordDetail,
    changeLoadingState,
    changeSubmitLoadingStatus,
    changeShowOrHideControl,
    // debuggerCode,
    // startDebuggerCode, // 外部存入
    onDebuggerCode,
    // updateCode,
    onSubmitForm
  } = props;
  const [defaultActiveKey, setDefaultActiveKey] = useState('1'); // 当前选中的tab
  const [showTextResult, setShowTextResult] = useState(false); // 是否点击控制台按钮
  const formRef = useRef(null);

  const classNames = `control_tab ${showTextResult ? 'move_up move_up_final' : 'move_down_final'}`;

  // 切换tab
  const handleTabChange = (key) => {
    setDefaultActiveKey(key);
  }

  useEffect(() => {
    setShowTextResult(props.showOrHideControl);
  }, [props]);

  // 显示/隐藏tab
  const handleShowControl = () => {
    setShowTextResult(!showTextResult);
    changeShowOrHideControl(!showTextResult);
  }

  // 调试代码
  const handleTestCode = (e) => {
    if (!userCode) {
      notification.warning({
        message: '提示',
        description: '代码块内容不能为空'
      });
      return;
    }
    // console.log(formRef.current.handleTestCodeFormSubmit);
    // 调出控制台界面
    setShowTextResult(true);
    changeShowOrHideControl(true);
    formRef.current.handleTestCodeFormSubmit(() => {
      setDefaultActiveKey('2');
    });
  }
  
  // 提交
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userCode) {
      notification.warning({
        message: '提示',
        description: '代码块内容不能为空'
      });
      return;
    }
    changeSubmitLoadingStatus(true);
    onSubmitForm && onSubmitForm();
  }

  // 处理调度代码
  const handleDebuggerCode = (values) => {
    // 改变状态值
    changeLoadingState(true);
    // 调用代码保存接口, 成功后再调用调试接口
    // updateCode(identifier, values, 'debug');
    // 调用调试接口
    // debuggerCode(identifier, values);
    onDebuggerCode(values);
  }
  // icon-shangjiantou
  return (
    <div className="pane_control_area">
      <div
        className="pane_control_collapse" 
        onClick={handleShowControl}
        style={{ top: showTextResult ? '-267px' : 0 }}
      >
        {/* <i className="iconfont icon-xiajiantou icon"></i> */}
        <Icon type={ showTextResult ? "down" : "up" } />
      </div>
      <Tabs
        className={classNames}
        activeKey={defaultActiveKey} 
        tabBarStyle={{ backgroundColor: 'rgba(18,28,36,1)', color: '#fff' }}
        onChange={handleTabChange}
      >
        <TabPane tab={'自定义测试用例'} key={'1'} style={{ height: '280px', overflowY: 'auto' }}>
          <InitTabCtx 
            inputValue={inputValue} 
            wrappedComponentRef={(form) => formRef.current = form}
            onDebuggerCode={handleDebuggerCode}
          />
        </TabPane>
        <TabPane tab={'代码执行结果'} key={'2'} style={{ height: '280px', overflowY: 'auto' }}>
          <ExecResult 
            excuteState={excuteState}
            excuteDetail={commitTestRecordDetail}
          />
        </TabPane>
      </Tabs>
      <div className="pane_control_opts">
        <Button 
          type="link" 
          style={{ color: '#fff' }} 
          // onClick={handleShowControl}
        >
            控制台
             {/* <Icon type={ showTextResult ? "down" : "up" } /> */}
          </Button>
        <p>
          <Button ghost 
            loading={loading}
            style={{ marginRight: '10px', color: '#28BD8B', borderColor: '#28BD8B' }} 
            onClick={handleTestCode}
            disabled={!identifier}
          >调试代码</Button>
          <Button 
            loading={submitLoading}
            type="primary"
            onClick={handleSubmit}
        >
          {/* {props.identifier ? '更新' : '提交'} */}
          提交
        </Button>
        </p>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {commonReducer, ojForUserReducer} = state;
  const {loading, excuteState, submitLoading, showOrHideControl } = commonReducer;
  const { commitTestRecordDetail, hack, userCode } = ojForUserReducer; 
  return {
    hack,
    userCode,
    loading,
    submitLoading,
    excuteState,
    showOrHideControl,
    // identifier: user_program_identifier,
    commitTestRecordDetail // 提交详情
  };
};
// changeSubmitLoadingStatus
const mapDispatchToProps = (dispatch) => ({
  changeShowOrHideControl: (flag) => dispatch(actions.changeShowOrHideControl(flag)),
  changeLoadingState: (flag) => dispatch(actions.changeLoadingState(flag)),
  changeSubmitLoadingStatus: (flag) => dispatch(actions.changeSubmitLoadingStatus(flag)),
  debuggerCode: (identifier, values) => dispatch(actions.debuggerCode(identifier, values)),
  // inputValue 输入值
  updateCode: (identifier, inputValue, type) => dispatch(actions.updateCode(identifier, inputValue, type))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlSetting);
