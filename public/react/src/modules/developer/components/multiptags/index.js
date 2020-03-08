/*
 * @Description: 显示 文字 + number 标签类型
 * @Author: tangjiang 
 * @Date: 2019-11-15 10:41:06 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-15 17:15:27
 */
import './index.scss';

import React, { PureComponent } from 'react';
const numberal = require('numeral');

export default class MultipTags extends PureComponent {

  render () {
    const { type = 'primary', text, numb, ...props} = this.props;

    if (typeof numb !== 'number' && typeof numb !== 'string') {
      throw new Error('输入的numb必须为数字或数字类型字符串.');
    }
    let result = Number(numb) >= 1000 
      ? numberal(Number(numb)).format('0.0a')
      : Number(numb);

    return (
      <div className={'mul-tag-wrap'} {...props}>
        <span className={`tag-txt ${type}`}>
          { text }
        </span>
        <span className={`tag-numb ${type}`}>
          { result }
        </span>
      </div>
    )
  }
}
