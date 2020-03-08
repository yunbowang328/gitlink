/*
 * @Description: 编辑器侧边栏设置信息
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-25 17:50:33
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-11-27 14:40:25
 */
import React from 'react';
import { Select } from 'antd';

const { Option } = Select;
const SettingDrawer = (props) => {
  /**
   * title: '', // 一级标题
   * type: '', // 类型: 目录 select 和  文本
   * content: [] // 显示的内容 { text: '' , value: string | [{ key: 1, value: '', text: '' }] }
   */
  const {title, type = 'label', content = [] } = props;

  const handleFontSize = (value) => {
    const {onChangeFontSize} = props;
    // console.log('fong size change: ', value);
    onChangeFontSize && onChangeFontSize(value);
  }

  const renderCtx = (title, content = [], type = 'label') => {
    const result = content.map((ctx, index) => {
      const subText = ctx.text;
      const value = ctx.value;
      let renderResult = '';
      if (typeof value === 'string') {
        renderResult = (
          <div className={'setting_desc'} key={`lab_${index}`}>
            <span className={'flex_item'}>{subText}</span>
            <span className={'flex_item'}>{ctx.value}</span>
          </div>
        );
      } else if (Array.isArray(value)) {
        if (type === 'select') {
          const child = ctx.value.map((opt, i) => (
            <Option key={opt.key || `${opt.value}`} value={opt.value}>
              {opt.text}
            </Option>
          ));
          renderResult = (
            <div className={'setting_desc'}  key={`sel_${index}`}>
              <span className={'flex_item'}>{ctx.text}</span>
              <Select className={'flex_item'} style={{ width: '100px'}} onChange={handleFontSize}>
                {child}
              </Select>
           </div>
          );
        }
      }
      return renderResult;
    });
    return (
      <React.Fragment>
        <h2 className={'setting_h2'}>{title}</h2>
        { result }
      </React.Fragment>
    );
  }
  return (
    <div className={'setting_area'}>
      {renderCtx(title, content, type)}
    </div>
  )
}

export default SettingDrawer;