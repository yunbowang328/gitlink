/*
 * @Description: 重写图片
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-16 15:50:45
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-17 16:44:48
 */
import Quill from "quill";

const BlockEmbed = Quill.import('blots/block/embed');

export default class ImageBlot extends BlockEmbed {

  static create(value) {

    const node = super.create();

    node.setAttribute('alt', value.alt);
    node.setAttribute('src', value.url);
    
    if (value.width) {
      node.setAttribute('width', value.width);
    }
    if (value.height) {
      node.setAttribute('height', value.height);
    }
    // 宽度和高度都不存在时，
    if (!value.width && !value.height) {
      node.setAttribute('display', 'block');
      node.setAttribute('width', '100%');
    }
    // 给图片添加点击事件
    node.onclick = () => {
      value.onClick && value.onClick(value.url);
    }
    return node;
  }

  static value (node) {

    return {
      alt: node.getAttribute('alt'),
      url: node.getAttribute('src'),
      onclick: node.onclick,
      // width: node.width,
      // height: node.height,
      display: node.getAttribute('display')
    };
  }
}

ImageBlot.blotName = 'image';
ImageBlot.tagName = 'img';