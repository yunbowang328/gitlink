/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-01 10:18:35
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-27 19:33:50
 */
import './index.scss';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MyMonacoEditor from '../../components/myMonacoEditor';
// import ControlSetting from '../../components/controlSetting';
import actions from '../../../../redux/actions';

function RightPane (props, ref) {

  const {
    // identifier,
    code,
    showCode,
    language,
    // onSubmitForm,
    saveOjFormCode
  } = props;
  
  // let timer = null;
  // 代码改变时，保存
  const handleCodeChange = (updateCode) => {
    // if (props.identifier) {
    //   // 保存用户输入的代码
    //   if (!timer) {
    //     timer = setInterval(() => {
    //       clearInterval(timer);
    //       timer = null;
          
    //     }, 3000);
    //   }
    // }
    saveOjFormCode(updateCode);
  }
  // 启动调试代码
  // const handleDebuggerCode = (value) => {
  //   console.log('调用的代码调试====', value);
  // }
  return (
    <div className={'right_pane_code_wrap'}>
      <MyMonacoEditor 
        language={language} 
        code={showCode}
        onCodeChange={handleCodeChange}/>
        
      {/* <ControlSetting
        // identifier={identifier}
        inputValue={props.input} 
        onSubmitForm={onSubmitForm}
        // onDebuggerCode={handleDebuggerCode}
      /> */}
    </div>
  )
}

const mapStateToProps = (state) => {
  const { ojForm, testCases, code, identifier, showCode } = state.ojFormReducer;
  return {
    code,
    showCode,
    identifier,
    language: ojForm.language,
    input: (testCases[0] && testCases[0].input) || '',
  }
};
const mapDispatchToProps = (dispatch) => ({
  // 保存提交的代码值
  saveOjFormCode: (value) => dispatch(actions.saveOjFormCode(value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RightPane);
