/*
 * @Description: quill 编辑器
 * @Author: tangjiang
 * @Github:
 * @Date: 2019-12-18 08:49:30
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-02-05 11:23:03
 */
import './index.scss';
import 'quill/dist/quill.core.css'; // 核心样式
import 'quill/dist/quill.snow.css'; // 有工具栏
import 'quill/dist/quill.bubble.css'; // 无工具栏
import 'katex/dist/katex.min.css'; // katex 表达式样式
import React, { useState, useRef, useEffect } from 'react';
import Quill from 'quill';
import katex from 'katex';
import deepEqual from './deepEqual.js'
import { fetchUploadImage } from '../../services/ojService.js';
import { getImageUrl } from 'educoder'
import ImageBlot from './ImageBlot';
import FillBlot from './FillBlot';
const Size = Quill.import('attributors/style/size');
const Font = Quill.import('formats/font');
// const Color = Quill.import('attributes/style/color');
Size.whitelist = ['12px', '14px', '16px', '18px', '20px', false];
Font.whitelist = ['SimSun', 'SimHei','Microsoft-YaHei','KaiTi','FangSong','Arial','Times-New-Roman','sans-serif'];

window.Quill = Quill;
window.katex = katex;
Quill.register(ImageBlot);
Quill.register(Size);
Quill.register(Font, true);
// Quill.register({'modules/toolbar': Toolbar});
Quill.register({
  'formats/fill': FillBlot
});
// Quill.register(Color);


function QuillForEditor ({
  placeholder,
  readOnly,
  autoFocus = false,
  options,
  value,
  imgAttrs = {}, // 指定图片的宽高
  style = {},
  wrapStyle = {},
  showUploadImage,
  onContentChange,
  addFill, // 点击填空成功的回调
  deleteFill // 删除填空，返回删除的下标
  // getQuillContent
}) {
  // toolbar 默认值
  const defaultConfig = [
    'bold', 'italic', 'underline',
    {size: ['12px', '14px', '16px', '18px', '20px']},
    {align: []}, {list: 'ordered'}, {list: 'bullet'}, // 列表
    {script: 'sub'}, {script: 'super'},
    { 'color': [] }, { 'background': [] },
    {header: [1,2,3,4,5,false]},
    'blockquote', 'code-block',
    'link', 'image', 'video',
    'formula',
    'clean'
  ];

  const editorRef = useRef(null);
  // quill 实例
  const [quill, setQuill] = useState(null);
  const [selection, setSelection] = useState(null);
  const [fillCount, setFillCount] = useState(0);
  const [quillCtx, setQuillCtx] = useState({});

  // 文本内容变化时
  const handleOnChange = content => {
    // getQuillContent && getQuillContent(quill);
    onContentChange && onContentChange(content, quill);
  };

  const renderOptions = options || defaultConfig;

  const bindings = {
    tab: {
      key: 9,
      handler: function () {
        console.log('调用了tab=====>>>>');
      }
    },
    backspace: {
      key: 'Backspace',
      /**
       * @param {*} range
       *  { index, // 删除元素的位置
       *    length // 删除元素的个数, 当删除一个时， length=0， 其它等于删除的元素的个数
       *  }
       * @param {*} context 上下文
       */
      handler: function (range, context) {
        /**
         * index: 删除元素的位置 
         * length: 删除元素的个数
         */
        const {index, length} = range;
        const _start = length === 0 ? index - 1 : index;
        const _length = length || 1;
        let delCtx = this.quill.getText(_start, _length); // 删除的元素
        // aa
        const reg = /▁/g;
        const delArrs = delCtx.match(reg);
        if (delArrs) {
          const r = window.confirm('确定要删除吗?');
          if (r) {
            let leaveCtx; // 获取删除元素之前的内容
            if (length === 0) {
              leaveCtx = this.quill.getText(0, index - 1);
            } else {
              leaveCtx = this.quill.getText(0, index);
            }
            const leaveArrs = leaveCtx.match(reg);
            const leaveLen = (leaveArrs || []).length;
            let delIndexs = [];
            // 获取删除元素的下标
            delArrs.forEach((item, i) => {
              leaveLen === 0 ? delIndexs.push(i) : delIndexs.push(leaveLen + i); 
            });
            deleteFill && deleteFill(delIndexs); // 调用删除回调, 返回删除的元素下标[]
            return true
          } else {
            return false;
          }
        }
        return true;
      }
    }
  };
  // quill 配置信息
  const quillOption = {
    modules: {
      toolbar: renderOptions,
      keyboard: {
        bindings: bindings
      }
      // toolbar: {
      //   container: renderOptions
      // }
    },
    readOnly,
    placeholder,
    theme: readOnly ? 'bubble' : 'snow',
  };


  useEffect(() => {

    const quillNode = document.createElement('div');
    editorRef.current.appendChild(quillNode);
    const _quill = new Quill(editorRef.current, quillOption);

    setQuill(_quill);
    // 处理图片上传功能
    _quill.getModule('toolbar').addHandler('image', (e) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async (e) => {
        const file = input.files[0]; // 获取文件信息
        const formData = new FormData();
        formData.append('file', file);

        const range = _quill.getSelection(true);
        let fileUrl = ''; // 保存上传成功后图片的url
        // 上传文件
        const result = await fetchUploadImage(formData);
        // 获取上传图片的url
        if (result.data && result.data.id) {
          fileUrl = getImageUrl(`api/attachments/${result.data.id}`);
        }
        // 根据id获取文件路径
        const { width, height } = imgAttrs;
        // console.log('上传图片的url:', fileUrl);
        if (fileUrl) {
          _quill.insertEmbed(range.index, 'image', {
            url: fileUrl,
            alt: '图片信息',
            onClick: showUploadImage,
            width,
            height
          });
        }
      }
    });
    // 处理填空
    _quill.getModule('toolbar').addHandler('fill', (e) => {
      // alert(1111);
      setFillCount(fillCount + 1);
      const range = _quill.getSelection(true);
      _quill.insertText(range.index, '▁');
      addFill && addFill(); // 调用添加回调
    });
  }, []);

  // 设置值
  useEffect(() => {
    if (!quill) return

    const previous = quill.getContents()

    if (value && value.hasOwnProperty('ops')) {
      // console.log(value.ops);
      const ops = value.ops || [];
      ops.forEach((item, i) => {
        if (item.insert['image']) {
          item.insert['image'] = Object.assign({}, item.insert['image'], {style: { cursor: 'pointer' }, onclick: (url) => showUploadImage(url)});
        }
      });
    }

    const current = value
    if (!deepEqual(previous, current)) {
      setSelection(quill.getSelection())
      if (typeof value === 'string' && value) {
      	// debugger
        quill.clipboard.dangerouslyPasteHTML(value, 'api');
        if (autoFocus) {
          quill.focus();
        } else {
          quill.blur();
        }
      } else {
        quill.setContents(value)
        if (autoFocus) quill.focus();
      }
    }
  }, [quill, value, setQuill, autoFocus]);

  // 清除选择区域
  useEffect(() => {
    if (quill && selection) {
      quill.setSelection(selection)
      setSelection(null)
    }
  }, [quill, selection, setSelection]);

  // 设置placeholder值
  useEffect(() => {
    if (!quill || !quill.root) return;
    quill.root.dataset.placeholder = placeholder;
  }, [quill, placeholder]);

  // 处理内容变化
  useEffect(() => {
    if (!quill) return;
    if (typeof handleOnChange !== 'function') return;
    let handler;
    quill.on(
      'text-change',
      (handler = (delta, oldDelta, source) => {
        const _ctx = quill.getContents();
        setQuillCtx(_ctx);
        handleOnChange(quill.getContents()); // getContents: 检索编辑器内容
      })
    );
    return () => {
      quill.off('text-change', handler);
    }
  }, [quill, handleOnChange]);

  // 返回结果
  return (
      <div className='quill_editor_for_react_area' style={wrapStyle}>
        <div ref={editorRef} style={style}></div>
      </div>
  );
}

export default QuillForEditor;
