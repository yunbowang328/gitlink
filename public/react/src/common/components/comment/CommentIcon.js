/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-18 10:49:46
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-25 10:03:21
 */
import './index.scss';
import React from 'react';
// import { Icon } from 'antd';
// import MyIcon from '../MyIcon';
function CommentIcon ({
  type, // 图标类型
  count, // 评论数
  iconClick,
  iconColor,
  theme,
  ...props
}) {

  // 点击图标
  const handleSpanClick = () => {
    iconClick && iconClick();
  }

  const _className = [undefined, null, ''].includes(count) ? 'comment_count_none' : 'comment_count';
  const _classIcon = `iconfont icon-${type} icon_font_size_14 comment_icon `;
  return (
    <span 
      style={props.style}
      className={`comment_icon_count ${props.className}`} 
      onClick={ handleSpanClick }
    >
      {/* <Icon className="comment_icon" type={type} style={{ color: iconColor }} theme={theme}/> */}
      <span className={_classIcon} style={{ color: iconColor }}></span>
      <span className={_className}>{ count }</span>
    </span>
  )
}

export default CommentIcon;
