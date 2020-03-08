/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-12 10:34:03
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-13 22:46:51
 */
import './index.scss';
import React, { useState, useEffect } from 'react';
import {Icon, Empty, Pagination, Tooltip } from 'antd';
import MyIcon from '../../../../common/components/MyIcon';

function LeftPane (props) {
  
  // 获取数据集
  const { 
    dataSets = [],
    total,
    pagination,
    onPageChange
  } = props;

  const emptyCtx = (
    <div className="jupyter_empty">
      <Empty />
    </div>
  );

  // const listCtx = ;
  const [renderCtx, setRenderCtx] = useState(() => (emptyCtx));

  useEffect(() => {
    if (dataSets.length > 0) {
      console.log('数据集的个数: ', dataSets.length);
      const oList = dataSets.map((item, i) => {
        return (
          <li className="jupyter_item" key={`key_${i}`}>
            <Tooltip 
              placement="right" 
              title={item.file_path}
              mouseLeaveDelay={0.3}
            >
              <Icon type="file-text" className="jupyter_icon"/>
              <span className="jupyter_name">{item.title}</span>
            </Tooltip>
          </li>
        );
      });

      const oUl = (
        <ul className="jupyter_data_list">
          { oList }
        </ul>
      );

      setRenderCtx(oUl);
    }
  }, [props]);
  
  // 分页处理
  const handleChangePage = (page) => {
    // console.log(page, pageSize);
    // setCurrent(page);
    onPageChange && onPageChange(page);
  }
  return (
    <div className="jupyter_data_sets_area">
      <h2 className="jupyter_h2_title">
        <MyIcon type="iconwenti" className="jupyter_data_icon"/> 数据集
        {/* <span className="iconfont icon-java jupyter_data_icon"></span>数据集 */}
      </h2>
      { renderCtx }
      <div className='jupyter_pagination'>
        <Pagination 
          simple 
          current={pagination.page}
          pageSize={pagination.limit} 
          total={total}
          onChange={handleChangePage}
        />
      </div>
      
    </div>
  )
}

export default LeftPane;