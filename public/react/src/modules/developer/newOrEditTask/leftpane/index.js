/*
 * @Description: 左侧编辑 / 评论 / 提交记录 
 * @Author: tangjiang 
 * @Date: 2019-11-19 11:35:30 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-19 19:07:02
 */

import './index.scss';
import React, { useState, useMemo } from 'react';
// import { Tabs } from 'antd';
import EditorTab from './editorTab';
import PrevTab from './prevTab';

// const { TabPane } = Tabs;

function LeftPane (props) {

  const navItem = [
    {
      title: '编辑',
      key: 'editor'
    }, {
      title: '预览',
      key: 'prev'
    }
  ];

  const Comp = {
    editor: (<EditorTab />),
    prev: (<PrevTab />)
  };

  const [defaultActiveKey, setDefaultActiveKey] = useState('editor');

  const renderComp = useMemo(() => {
    return Comp[defaultActiveKey];
  }, [defaultActiveKey]);

  const renderNavItem = navItem.map((item) => {
    const _classes = item.key === defaultActiveKey ? 'add_editor_item active' : 'add_editor_item';
    return (
      <li
        key={item.key}
        className={_classes}
        onClick={() => setDefaultActiveKey(item.key)}
      >
        <span className={'item-span'}>{item.title}</span>
      </li>
    )
  });

  return (
    // <Tabs activeKey={defaultActiveKey} onChange={handleTabChange}>
    //   { tabs }
    // </Tabs>
    <React.Fragment>
      <ul className={'add_editor_list_area'}>
        { renderNavItem }
      </ul>
      <div className="comp_ctx" style={{ height: 'calc(100vh - 177px)' }}>
        { renderComp }
      </div>
    </React.Fragment>
  )
};

export default LeftPane;
