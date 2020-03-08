<!--
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-25 09:46:10
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-11-25 10:10:11
 -->
## Quill配置
  
  ### 容器

  - css 或者 DOM元素
  
  ```
  const editor = new Quill(container)
  ```

  ### 配置项


  var options = {
    debug: 'info',
    modules: {
      toolbar: '#toolbar' // toolbar为一个代码块，在页面中指定所需要的工具
    },
    placeholder: '', // 
    readOnly: false,
    theme: 'snow'
  }

  const editor = new Quill('#editor', options);

  - 对应的接口模型

  ```
  export interface QuillOptionsStatic {

    debug?: string | boolean;
    modules: StringMap;
    placeholder?: string;
    readOnly?: boolean;
    theme?: string;
    formats?: string[];
    bounds?: HTMLElement | string;
    scrollingContainer?: HTMLElement | string;
    strict?: boolean;
  }

  ```

  ### 格式化

  <br> Inline </br>

  - background 背景色
  - bold  粗体
  - color 颜色
  - font  字体
  - code  内联代码
  - italic  斜体
  - link  链接
  - size  大小
  - strike  删除线
  - script  上标/下标
  - underline  下划线

  <br> Block </br>

  - blockquote  引用
  - header   标题
  - indent   缩进
  - list     列表
  - align    对齐方式
  - direction   文字方向
  - code-block  代码块


  <br> Embeds </br>

  - formula 公式 (需要 Katex)
  - image   图片
  - video   视频



  ### Quill 常用模块
  
  - 工具栏
  - 键盘
  - 历史记录
  - 剪贴板
  - 语法高量

  <b> 用法 </b>

  > 工具栏模块  [toolbar](src="https://quilljs.com/docs/modules/toolbar/")
  
  modules: {
    toolbar: {
      container: '#toolbar',
      xx: {}
    }
  }

  > 键盘模块 [keyboard](src="https://quilljs.com/docs/modules/keyboard/")

  modules: {

    keyboard: {
      bindings: {
        tab: {
          key: 9,
          handler: function () {}
        }
      }
    }
  }

  > 历史模块

  负责记录模块负责处理Quill的撤销和重做

  modules: {
    history: {
      delay: 2000, // 在2000毫秒内的更改将被合并为单次更改
      maxStack: 500, // 历史记录撤销/重做堆栈的大小
      userOnly: true // 仅撤销或重做用户的更改
    }
  }

  > 剪贴板模块
   
  处理 Quill 和外部应用程序之间的复制

  modules: {

    clipboard: {
      matchers: [
        ['B', xx]
      ]
    }
  }

  > 语法高亮模块

  语法高亮模块通过自动检测和应用语法突出显示来增强代码块格式。该模块依赖 [highlight.js](url="https://highlightjs.org/") 库用作解析和格式化代码块。


    hljs.configure({   // optionally configure hljs
      languages: ['javascript', 'ruby', 'python']
    });

    var quill = new Quill('#editor', {
      modules: {
        syntax: true,              // Include syntax module
        toolbar: [['code-block']]  // Include button in toolbar
      },
      theme: 'snow'
    });

  > 模块扩展

  Quill 中的模块可以被扩展和重新注册，从而替换原始模块

    var Clipboard = Quill.import('modules/clipboard');
    var Delta = Quill.import('delta');

    class PlainClipboard extends Clipboard {
      convert(html = null) {
        if (typeof html === 'string') {
          this.container.innerHTML = html;
        }
        let text = this.container.innerText;
        this.container.innerHTML = '';
        return new Delta().insert(text);
      }
    }

    Quill.register('modules/clipboard', PlainClipboard, true);

    // Will be created with instance of PlainClipboard
    var quill = new Quill('#editor');