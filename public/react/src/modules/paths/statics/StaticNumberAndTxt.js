/*
 * @Description: 数字及文字提示
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-10 10:26:57
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-10 11:15:28
 */
import './index.scss';
import React from 'react';
import { Tooltip } from 'antd';
const numberal = require('numeral');

const StaticNumberAndTxt = ({
  count = 0, // 总数
  txt, // 文字描述
  type = 'tishi1', // 字体类型
  desc // 描述信息
}) => {

  const formatNumber = (value, format = '0,0') => {
    return numberal(value).format(format);
  }

  const _classes = `iconfont icon-${type} icon`;
  return (
    <div className="static-flex-item">
      <span className="item-count">{formatNumber(count)}</span>
      <span className="item-txt">
        {txt}
        <Tooltip
          placement='bottom' 
          title={desc}
          overlayClassName='tool-clazz'
        >
          <span className={_classes}></span>
        </Tooltip>
      </span>
    </div>
  );
}

export default StaticNumberAndTxt;
