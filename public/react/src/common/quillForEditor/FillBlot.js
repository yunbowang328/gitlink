/*
 * @Description: 填空
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-06 09:02:29
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-02-05 10:44:01
 */
import Quill from 'quill';
let Inline = Quill.import('blots/inline');
// const BlockEmbed = Quill.import('blots/embed');
class FillBlot extends Inline {
  static create (value) {
    const node = super.cerate(value);
    // node.classList.add('icon icon-bianji2');
    // node.setAttribute('data-fill', 'fill');
    console.log('编辑器值===》》》》》', value);
    node.setAttribute('data_index', value.data_index);
    node.nodeValue = value.text; 
    return node;
  }
  
  static value (node) {
    return {
      // dataSet: node.getAttribute('data-fill'),
      data_index: node.getAttribute('data_index')
    }
  }
}


FillBlot.blotName = "fill";
FillBlot.tagName = "span";

export default FillBlot;
