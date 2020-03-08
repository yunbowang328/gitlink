/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-12 15:04:20
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-13 11:25:22
 */
import './index.scss';
import React, { useEffect, useState } from 'react';
import { Spin, Button } from 'antd';
function RightPane (props) {
  const { 
    status,
    url,
    onReloadUrl,
    onSave,
    loading
  } = props;

  const [renderCtx, setRenderCtx] = useState(() => loadInit);
  // 重新获取 url
  const handleClickReload = () => {
    onReloadUrl && onReloadUrl();
  }

  const loadInit = (
    <div className="jupyter_loading_init">
        {/*<Spin tip="加载中..."></Spin>*/}
      </div>
  );

  const loadError = (
    <div className="jupyter_load_url_error">
      <span className="iconfont icon-jiazaishibai1 icon-error"></span>
      <p className="jupyter_error_txt">
        实训加载失败，
        <span 
          className="jupyter_reload"
          onClick={handleClickReload}
        >重新加载</span>
      </p>
    </div>
  );

  // 保存
  const handleClickSubmit = () => {
    console.log('调用了保存接口....');
    onSave && onSave();
  }

  useEffect(() => {
    if (status === -1) {
      setRenderCtx(() => loadInit);
    } else if (status === 0 && url) {
      setRenderCtx(() => (

        <div className="jupyter_result">
          <div className="jupyter_iframe">
            <iframe
              id={"rightPaneframe"}
              title=" "
              width="100%"
              height="100%"
              src={url}
              className='jupyter_iframe_style'
            ></iframe>
          </div>
          {/*<div className="jupyter_submit">*/}
          {/*  <Button*/}
          {/*    loading={loading}*/}
          {/*    type="primary"*/}
          {/*    onClick={handleClickSubmit}*/}
          {/*  >保存</Button>*/}
          {/*</div>*/}
        </div>
        
      ));
    } else {
      setRenderCtx(() => loadError);
    }
  }, [status, url, loading]);
  
  return (
    <div className="jupyter_right_pane_area">
      { renderCtx }
    </div>
  )
}

export default RightPane;

