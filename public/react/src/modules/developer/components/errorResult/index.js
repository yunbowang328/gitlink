/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-03 15:20:55
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-27 22:35:14
 */
import './index.scss';
import React from 'react';
import MonacoEditor from '@monaco-editor/react';

function ErrorResult (props) {

  const { detail, language } = props;
  const renderError = (detail = {}) => {
    const {
      status,
      // error_line,
      error_msg,
      expected_output,
      input,
      output,
      execute_time,
      // execute_memory
    } = detail;
    // 根据状态渲染不同的错误信息
    let result = null;
    switch (status) {
      case -1:
        result = (
          <div className={'error_result_wrap error_result_txt'}>
            <p>输入: [{input}]</p>
            <p>输出: [{output}]</p>
            <p>预期: [{expected_output}]</p>
          </div>
        );
        break;
      case 2: // 评测超时
        result = (
          <div className={'error_result_wrap error_result_txt'}>
            <p>执行超时，限制时限: {`${execute_time}s`}</p>
          </div>
        );
        break;
      case 3: // 创建pod失败
        result = (
          <div className={'error_result_wrap'}>
            <p>系统繁忙，请稍后重试</p>
          </div>
        );
      break;
      case 4: // 编译失败
        result = (
          <div className={'error_result_wrap error_result_code'}>
            {/* <p>{error_msg}</p> */}
            <MonacoEditor
              height="100%"
              width="100%"
              language={(language && language.toLowerCase()) || 'c'}
              value={error_msg}
              theme="dark"
            />
          </div>
        );
      break;
      case 5: // 执行失败
        result = (
          <div className={'error_result_wrap'}>
            <p>执行出错信息: </p>
            <p>最后执行的输入: {input}</p>
          </div>
        );
      break;
      default:
        return result;
    }
    return result;
  }

  return (
    <React.Fragment>
      {renderError(detail)}
    </React.Fragment>
  );
}

export default ErrorResult;
