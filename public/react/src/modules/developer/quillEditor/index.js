/*
 * @Description: Quill 编辑器
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-25 09:46:03
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-10 16:10:23
 */
// import 'quill/dist/quill.core.css';
// import 'quill/dist/quill.bubble.css';
// import 'quill/dist/quill.snow.css';
// import 'katex/dist/katex.css';
import './index.scss';
import 'katex/dist/katex.min.css';
import React from 'react';
import katex from 'katex';
const Quill = require('quill');
// 将katex挂载到window上
window.katex = katex;
window.Quill = Quill;
// const Quill = window.Quill;
// 指定 Quill 默认配置项
const defaultOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 自定义标题大小
  ['bold', 'italic', 'underline', 'strike'],        // 切换按钮
  ['blockquote', 'code-block'], // 代码块
  [{ 'list': 'ordered' }, { 'list': 'bullet' }], // 列表
  [{ 'script': 'sub'}, { 'script': 'super' }],      // 上标/下标
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // 减少缩进/缩进
  [{ 'direction': 'rtl' }],
  [{ 'size': ['small', 'large', 'huge', false] }],  // 用户自定义下拉
  [{ 'color': [] }, { 'background': [] }],  // 字体颜色与背景色
  [{ 'font': [] }, { 'align': [] }], // 字体与对齐方式
  ['formula', 'image', 'video'], // 数学公式、图片、视频
  ['clean'], // 清除格式
];

/**
 * @description 抽取一个React编辑器组件，基于Quill 
 * @class QuillEditor类
 * @param [object] props 接收的属性
 *   props: {
 *     options: {} // 编辑器配置信息, 不传使用 defaultOptions, 传了的话 使用用户自定义的,
 *     placeholder: '' // 编辑器提示信息
 *     innerHtml: '', // 编辑器内容
 *     onEditorChange: '', // 编辑器内容改变时调用此方法, 返回更改的内容
 *   }
 * @return [stirng] content 返回编辑器内容
 */
class QuillEditor extends React.Component {

  state = {
    quillEditor: null,
    // quillOptions: defaultOptions
  }

  constructor (props) {
    super(props);
    this.editorRef = React.createRef(null);
  }

  componentDidMount () {
    const { options, placeholder = '', readOnly = false } = this.props;
    let { quillEditor } = this.state;
    // console.log(placeholder);
    const renderOptions = options || defaultOptions;
    
    const editorOption = {
      placeholder: placeholder,
      modules: {
        toolbar: renderOptions
      },
      readOnly,
      theme: readOnly ? 'bubble' : 'snow',
    }
    // 实例化 Quill 编辑器
    quillEditor = new Quill(this.editorRef.current, editorOption);
    this.setState({
      quillEditor: quillEditor
    });

    // 开启一个定时器读取 html初始时, 如果没有最多执行10次后自动清
    let count = 0;
    this.timer = setInterval(() => {
      count++;
      if (count >= 10 || this.props.htmlCtx) {
        quillEditor.container.firstChild.innerHTML = this.props.htmlCtx || '';
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 50);
    
    // quillEditor.setText('<p>aaa</p>');
    quillEditor.on('editor-change', this.handleQuillChange);
    // console.log('====>>>', quillEditor);
  }

  // 处理quill事件： editor-change
  /**
   * @param [string] eventName 事件名
   * @param [object] args 参数
   */
  handleQuillChange = (eventName, ...args) => {
    const { onEditorChange } = this.props;
    // 获取编辑器内容
    const innerHTML = this.state.quillEditor.container.firstChild.innerHTML;
    onEditorChange && onEditorChange(innerHTML);
    // if ('text-change' === eventName) {
    //   const {delta, oldDelta, source} = args;
    //   console.log('textChange', delta, oldDelta, source);
    // } else if ('selection-change' === eventName) {
    //   const {range, oldRange, source} = args;
    //   console.log('selectionChange', range, oldRange, source);
    // }
  }

  componentWillUnmount () {
    // 删除事件监听
    this.state.quillEditor.off(this.handleQuillChange);
  }
  render () {
    const styles = this.props.style || {}
    return (
      <div
        id="quill_editor"
        style={styles}
        className={'quill_editor_area'}
        ref={this.editorRef}>
      </div>     
    );
  }
}

export default QuillEditor;
