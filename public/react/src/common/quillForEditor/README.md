<!--
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-06 16:20:03
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-09 09:45:29
 -->
## QuillForEditor 使用 [https://quilljs.com/]

  ### 导入
  
  - 目录  src/common/quillForEditor （默认加载当前文件夹下的 index.js 文件）

  ### 参数

  | 字段  | 描述 |
  | ----- | ----- |
  | placeholder | 提示信息 |
  | readOnly | 只读(只读取模式时，没有 工具栏且内容不可编辑，通常用于展示quill内容) | 
  | autoFocus | 自动获得焦点 |
  | options | 配置参数， 指定工具栏内容 |
  | value | 文本编辑器内容 |
  | imgAttrs | 指定上传图片的尺寸 { width: 'xxpx}, height: 'xxpx'|
  | style | 指定quill容器样式 |
  | wrapStyle | 指定包裹quill容器的样式|
  | onContentChange | 当编辑器内容变化时调用此回调函数(注: 此时返回的内容为对象，提交到后台时需要格式成 JSON 字符串: JSON.stringify(xx)) |
  | showUploadImage | 点击放大上传成功后的图片， 返回上传成功后的图片 url, （评论时点击图片这么大）|



  ### 添加工具栏

  - 默认所有的

  ```
    const options = [
      'bold', // 加粗
      'italic', // 斜体
      'underline', // 下划线
      {size: ['12px', '14px', '16px', '18px', '20px']}, // 字体大小
      {align: []},  // 对齐方式
      {list: 'ordered'},  // 有序列表
      {list: 'bullet'}, // 无序列表
      {script: 'sub'},  // 下标  x2
      {script: 'super'}, // 上标 平方 (x2)
      { 'color': [] },  // 字体颜色
      { 'background': [] },  // 背景色
      {header: [1,2,3,4,5,false]}, // H1,H2 ...
      'blockquote',  //  文件左边加一个边框样式
      'code-block', //  块内容
      'link',  // 链接
      'image',  // 图片
      'video', // 视频
      'formula', // 数学公式
      'clean' // 清除
    ]
  ```


  ### 使用

  ````
    编辑模式是放不大图片的
    import QuillForEditor from 'xxx';

    // 指定需要显示的工具栏信息, 不指定加载全部
    const options = [

    ];
    
    /**
    * @description 获取编辑器返回的内容
    * @params [Object] value 编辑器内容
    */
    const handleCtxChange = (value) => {
      // 编辑器内容非空判断
      const _text = quill.getText();
      const reg = /^[\s\S]*.*[^\s][\s\S]*$/;
      if (!reg.test(_text)) {
        // 处理编辑器内容为空
      } else {
        // 提交到后台的内容需要处理一下;
        value =  JSON.stringify(value)
      }
    }

    
    <QuillForEditor
      options={options}
      onContentChange={handleCtxChange}
    >
    </QuillForEditor>
  ````

