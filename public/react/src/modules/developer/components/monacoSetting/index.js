/*
 * @Description: 编辑器侧边栏设置信息
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-25 17:50:33
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-27 10:36:54
 */
import React, { useState } from 'react';
import { fromStore, toStore } from 'educoder'; 
// import { Icon } from 'antd';
// import { Select } from 'antd';
// const { Option } = Select;
const SettingDrawer = (props) => {
  /**
   * title: '', // 一级标题
   * type: '', // 类型: 目录 select 和  文本
   * content: [] // 显示的内容 { text: '' , value: string | [{ key: 1, value: '', text: '' }] }
   */
  
  const [fontSize, setFontSize] = useState(() => {
    return +fromStore('oj_fontSize') || 14;
  });
  const [theme, setTheme] = useState(() => {
    return fromStore('oj_theme') || 'dark';
  });

  const {title, type = 'label', content = [] } = props;

  // 字体改变时， 方法全名:  handleChangeXX, XX 为指定的类型;
  const {
    onChangeFontSize,
    onChangeTheme
  } = props;
  const handleChangeFont = (value) => {
    setFontSize(value);
    toStore('oj_fontSize', value);
    onChangeFontSize && onChangeFontSize(value);
  }
  // 风格改变时
  const handleChangeStyle = (value) => {
   setTheme(value);
   toStore('oj_theme', value);
   onChangeTheme && onChangeTheme(value);
  }

  const handleSelectChange = (e, type) => {
    const value = e.target.value;
    if (type === 'font') {
      handleChangeFont(value);
    }
    if (type === 'style') {
      handleChangeStyle(value);
    }
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
        const defaultValue = ctx.type === 'font' ? fontSize : theme;
        // console.log('++', defaultValue);
        if (type === 'select') {
          const child = ctx.value.map((opt, i) => {
            return (
              <option
                key={`key_${i}` || `${opt.value}`} 
                value={opt.value}
              >
                {opt.text}
              </option>
          )});
          renderResult = (
            <div className={'setting_desc'}  key={`sel_${index}`}>
              <span className={'flex_item'}>{ctx.text}</span>
              <select defaultValue={defaultValue} style={{ width: '100px'}} onChange={(e) => handleSelectChange(e, ctx.type)}>
                {child}
              </select>
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
