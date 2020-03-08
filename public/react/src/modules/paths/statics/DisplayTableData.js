/*
 * @Description:
 * @Author: tangjiang
 * @Github:
 * @Date: 2020-01-14 13:39:12
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-14 16:30:05
 */
import './index.scss';
import React, { useRef, useState, useEffect } from 'react';
import { Table } from 'antd';
import ReactDom from 'react-dom';

const DisplayTableData = (props) => {
  const {columns, datas, fetchData, total} = props;
  let tableEl = useRef(null);
  const [loading, setLoading] = useState(false);

  const renderFooter = (obj = {}) => {
    const {course_count, student_count, choice_shixun_num, choice_shixun_frequency, total} = obj;
    if (!obj) return ''
    else {
      return (
        <ul className="footer_list">
          <li className="footer_item footer-total">总计</li>
          <li className="footer_name">{total || '-'}</li>
          <li className="footer_item">{course_count || '-'}</li>
          <li className="footer_item">{student_count || '-'}</li>
          <li className="footer_item">{choice_shixun_num || '-'}</li>
          <li className="footer_item">{choice_shixun_frequency || '-'}</li>
        </ul>
      )
    }
  }

  useEffect(() => {
    const table = ReactDom.findDOMNode(tableEl);
    // console.log(table);
    const tableBody = table.querySelector('.ant-table-body');
    let _scrollTop = 0;//保存上次滚动距离
    let isRun = false;//是否执行查询
    tableBody.addEventListener('scroll', () => {
      if(tableBody.scrollTop === 0 ){
        _scrollTop = 0;
      }
      // 上一次滚动高度与当前滚动高度不同则是纵向滚动
      if (_scrollTop !== tableBody.scrollTop) {
        //是否滑动到距离底部40px的位置
        const scorll = _scrollTop >= tableBody.scrollHeight-tableBody.clientHeight-40;
        //isRun为true时 代表已经执行查询
        if(isRun && scorll){
          return;
        }
        //_scrollTop < tableBody.scrollTop 判断是否向下滑动
        isRun = _scrollTop < tableBody.scrollTop && scorll;
        //保存当前滚动位置
        _scrollTop = tableBody.scrollTop;
        if (isRun) {
          fetchData && fetchData();
        }
      }
    })
  }, []);

  return (
    <Table
      className='static_table'
      rowKey={record => record.id}
      columns={columns}
      dataSource={datas}
      pagination={false}
      loading={loading}
      // scroll={{y: 500}}
      ref={(ref)=>tableEl=ref}
      footer={total ? () => renderFooter(total) : ''}
    />
  );
}

export default DisplayTableData;