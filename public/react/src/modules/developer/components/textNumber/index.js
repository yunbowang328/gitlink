/*
 * @Description: 文字 | 图标  +  数字样式
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 10:58:37
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-25 10:02:03
 */
import './index.scss';
import React from 'react';
// import { Icon } from 'antd';
const numberal = require('numeral');

const TextNumber = (props) => {
  /**
   * text: 显示的文本信息
   * number: 显示的数字
   * position: 位置 vertical | horizontal (默认)
   * type: 内容  文字或图标
   * onIconClick: 点击图标时的回调函数
   */
  const { 
    text,
    number,
    position = 'horizontal',
    type = 'label',
    onIconClick,
    className,
    theme = 'outlined'
  } = props;

  // console.log('style=====>>>>>>', style);
  const handleIconClick = () => {
    onIconClick && onIconClick();
  }

  const renderNumb = () => {
    let tempNumb = number;
    if ((tempNumb || tempNumb === 0) && (typeof Number(tempNumb) === 'number')) {
      tempNumb = numberal(tempNumb).format('0,0');
      return (
        <span className={'numb_value'}>{tempNumb}</span>
      )
    }
    return '';
  }
  const renderCtx = (className, theme) => {
    if (type === 'icon') { // 图标加文字时
      const _className = `text_number_area text_icon_numb flex_${position} ${className}`;
      const _classIcon = `iconfont icon-${text} numb_icon`;
      return (
        <div className={_className}>
          {/* <Icon 
            theme={theme}
            type={text} 
            className={'numb_icon'}
          ></Icon> */}
          <span 
            className={_classIcon} 
            onClick={handleIconClick}>  
          </span>
          {renderNumb()}
        </div>
      )
    } else {
      return (
        <div className={`text_number_area text_label_numb flex_${position}`}>
          <span className={'text_label'}>{text}</span>
          {renderNumb()}
        </div>
      )
    }
  }
  return (
    <React.Fragment>
      {renderCtx(className, theme)}
    </React.Fragment>
  );
}

export default TextNumber;
