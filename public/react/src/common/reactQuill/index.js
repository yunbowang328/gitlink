/*
 * @Description: 入口文件
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-17 10:41:48
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-17 20:34:40
 */
import React, { useState, useCallback, useEffect } from 'react';
import ReactQuill from './lib';

function Wrapper (props) {
  // 默认工具栏配置项
  const toolbarConfig = [
    ['bold', 'italic', 'underline'],
    [{align: []}, {list: 'ordered'}, {list: 'bullet'}], // 列表
    [{script: 'sub'}, {script: 'super'}],
    [{header: [1,2,3,4,5,false]}],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video'],
    ['formula'],
    ['clean']
  ];
  
  const [placeholder] = useState(props.placeholder || 'placeholder');
  const [disableBold] = useState(false);
  const [value, setValue] = useState(props.value || '');
  const [toolbar, setToolbar] = useState(toolbarConfig);
  const [theme, setTheme] = useState(props.theme || 'snow');
  const [readOnly] = useState(props.readOnly || false);

  const {
    onContentChagne, // 当编辑器内容变化时调用该函数
    showUploadImage, // 显示上传图片, 返回url，主要用于点击图片放大
  } = props;

  // 配置信息
  const options = {
    modules: {
      toolbar: toolbar,
      clipboard: {
        matchVisual: false
      }
    },
    readOnly: readOnly,
    theme: theme
  }
  // 配置信息  
  useEffect (() => {
    if (props.options) {
      setToolbar(props.options);
    }
    setTheme(props.theme || 'snow');
    setValue(props.value);
  }, [props]);

  // 当内容变化时
  const handleOnChange = useCallback(
    contents => {
      if (disableBold) {
        setValue({
          ops: contents.ops.map(x => {
            x = {...x};
            if (x && x.attributes && x.attributes.bold) {
              x.attributes = { ...x.attributes };
              delete x.attributes.bold;
              if (!Object.keys(x.attributes).length) {
                delete x.attributes;
              }
            }
            return x;
          })
        });
      } else {
        setValue(contents);
      }
      onContentChagne && onContentChagne(contents);
    }, [disableBold]
  );

  // 图片上传
  const handleUploadImage = (files) => {
    console.log('选择的图片信息', files);
  }

  // 显示图片
  const handleShowUploadImage = (url) => {
    // console.log('上传的图片url:', url);
    showUploadImage && showUploadImage(url);
  }

  return (
    <React.Fragment>
      <ReactQuill 
        value={value}
        style={props.style}
        onChange={handleOnChange}
        placeholder={`${placeholder}`}
        options={options}
        uploadImage={handleUploadImage}
        showUploadImage={(url) => handleShowUploadImage(url)}
      />
    </React.Fragment>
  );
}

export default Wrapper;
// ReactDOM.render(<Wrapper />, document.querySelector('#root'));
