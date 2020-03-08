/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-09 09:09:42
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-18 08:46:20
 */
import 'quill/dist/quill.core.css'; // 核心样式
import 'quill/dist/quill.snow.css'; // 有工具栏
import 'quill/dist/quill.bubble.css'; // 无工具栏
import 'katex/dist/katex.min.css'; // katex 表达式样式
import React, { useState, useReducer, useEffect } from 'react';
import useQuill from './useQuill';

function ReactQuill ({
  disallowColors,  // 不可见时颜色
  placeholder, // 提示信息
  uploadImage, // 图片上传
  onChange, // 内容变化时
  options, // 配置信息 
  value, // 显示的内容
  style,
  showUploadImage // 显示上传图片
}) {

  const [element, setElement] = useState(); // quill 渲染节点

  useQuill({
    disallowColors,
    placeholder,
    uploadImage,
    onChange,
    options,
    value,
    showUploadImage,
    element
  });

  return (
    <div className='react_quill_area' ref={setElement} style={style}/>
  );
}

export default ReactQuill;
