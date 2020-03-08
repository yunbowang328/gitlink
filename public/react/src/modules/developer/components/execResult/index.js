/*
 * @Description: 执行结果
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-28 08:44:54
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-26 08:51:21
 */
import './index.scss';
import React, { useState, useEffect } from 'react';
import { Icon } from 'antd';
import CONST from '../../../../constants';

const {reviewResult} = CONST;
function ExecResult (props) {

  const { excuteState, excuteDetail } = props;
  // console.log('执行状态: ======', excuteState);
  // 指定渲染初始, 加载中, 加载完成页面内容
  const renderInit = () => (
    <div className={'excute_result_area excute_flex_center'}>
      <span className={'init_ctx'}>请填写测试用例的输入值，点击“调试代码”</span>
    </div>
  );
  const renderLoading = () => (
    <div className={'excute_result_area excute_flex_center'}>
      <span className={'loading_ctx'}>
        <Icon className={'ctx_icon'} type="loading"/>
        <span>加载中...</span>
      </span>
    </div>
  );
  const readerLoaded = () => (
    <div className={'excute_result_area excute_flex_center'}>
      <span className={'loaded_ctx'}>
        <Icon className={'ctx_icon'} type="loading"/>
        <span>加载完成</span>
      </span>
    </div>
  );

  const renderError = () => (
    <div className={'excute_result_area excute_flex_center'}>
      <span className={'loaded_ctx'}>
        <span>未知异常</span>
      </span>
    </div>
  )

  const renderFinish = () => {
    const {
      error_line,
      error_msg,
      execute_memory,
      execute_time,
      input,
      output,
      status,
      expected_output
    } = codeResult;

    const excuteHeader = (state) => {
      const review_class = state === 0 ? `excute_suc` : `excute_err`;
      return (
        <p className={'excute_head_area'}>
          <span className={'excute_head_txt'}>执行结果: </span>
          <span className={review_class}>{reviewResult[`${state}`]}</span>
        </p>
      )
    }

    // console.log('执行结果====》》》》', status);
    const excuteCtx = (state) => {
      if (state === 0) {
        return (
          <React.Fragment>
            <p className={'result_info_style'}>输入: {input}</p>
            <p className={'result_info_style'}>输出: {output}</p>
            <p className={'result_info_style'}>执行用时: {`${execute_time}s`}</p>
          </React.Fragment>
        );
      } else if (state === 4){
        return (
          <p className={'result_info_style'}>
            {/* 系统繁忙，请稍后重试 */}
            {error_msg}
          </p>
        )
      } else if (state === 3) {
        return (
          <p className={'result_info_style'}>
            系统繁忙，请稍后重试
          </p>
        )
      } else if (state === -1) {
        return (
          <React.Fragment>
            <p className={'result_info_style'}>输入: {input}</p>
            <p className={'result_info_style'}>输出: {output}</p>
            <p className={'result_info_style'}>预期输出: {expected_output}</p>
          </React.Fragment>
        )
      } else if (state === 5) {
        return (
          <React.Fragment>
            <p className={'result_info_style'}> 执行出错信息: {error_msg}</p>
            <p className={'result_info_style'}>最后执行的输入: {input}</p>
          </React.Fragment>
        )
      }
    }
    return (
      <div className={'excute_result_info'}>
        {excuteHeader(status)}
        {excuteCtx(status)}
      </div>
    );
  };

  // 渲染状态
  const [renderCtx, setRenderCtx] = useState(() => {
    return function () {
      return renderInit();
    }
  });
  // 提交记录详情
  const [codeResult, setCodeResult] = useState({})

  // 渲染状态变化时渲染相应的内容
  useEffect(() => {
    // console.log('执行状态====》》》》', excuteState);
    if ('loading' === excuteState) {
      setRenderCtx(() => (renderLoading));
    } else if ('loaded' === excuteState) {
      setRenderCtx(() => (readerLoaded));
    } else if ('finish' === excuteState) {
      setRenderCtx(() => (renderFinish));
    } else if ('error' === excuteState) {
      setRenderCtx(() => (renderError))
    }
  }, [excuteState]);

  // 提交详情变化时
  useEffect(() => {
    // console.log('提交记录详情=====>>>>>', excuteDetail);
    setCodeResult(excuteDetail);
  }, [excuteDetail]);
  
  return (
    <React.Fragment>
      {renderCtx()}
    </React.Fragment>
  )
}

export default ExecResult;
