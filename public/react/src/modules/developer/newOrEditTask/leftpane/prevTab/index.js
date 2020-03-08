/*
 * @Description: 代码预览页面
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-24 10:09:55
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-18 10:02:24
 */
import './index.scss';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import {Empty} from 'antd';
// import Wrapper from '../../../../../common/reactQuill';
import QuillForEditor from '../../../../../common/quillForEditor';

const PrevTab = (props) => {

  const prevRef = useRef(null);
  // const [desc, setDesc] = useState('');
  const [renderCtx, setRenderCtx] = useState(() => '');
  
  // 渲染内容
  useEffect(() => {
    if (props.description) {
      setRenderCtx(() => (
        <div 
          id="quill_editor"
          style = {{ height: '100%', width: '100%'}}
          ref={prevRef}>
            <QuillForEditor 
              readOnly={true}
              value={props.description}
            />
        </div>
      ));
    } else {
      setRenderCtx(() => (
        <div className='no_result'>
          <Empty />
        </div>
      ));
    }
  }, [props]);

  return (
    <div className={`prev_area`}>
      {renderCtx}      
    </div>
  )

}
const mapStateToProps = (state) => {
  const { ojForm } = state.ojFormReducer;
  return {
    description: ojForm.description
  }
}

export default connect(
  mapStateToProps
)(PrevTab);