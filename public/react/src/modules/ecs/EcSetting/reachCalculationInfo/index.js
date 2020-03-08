import React, { Component } from 'react';

import classNames from 'classnames';

import {getRandomNumber} from 'educoder';

import axios from 'axios';

import { Table, Divider, Tag, Checkbox, InputNumber, Spin, Icon } from 'antd';

// import EcTitleCourseEvaluations from '../ecTitle/ecTitle'
import { ECModalHOC } from '../../common/ECModalHOC'

import 'antd/lib/style/index.css';

import './index.scss'


const onCheckBoxClick = (that, rowData) =>{
  console.log(rowData)
}
const testData = {"calculation_data":[{"first_level":1,"first_leval_data":[{"second_level":"1.1","course_data":[{"course_name":"\u9ad8\u7b49\u6570\u5b66","target_value":null,"real_value":null,"status":null},{"course_name":"\u7ebf\u6027\u4ee3\u6570","target_value":null,"real_value":null,"status":null},{"course_name":"\u6982\u7387\u8bba\u4e0e\u6570\u7406\u7edf\u8ba1","target_value":null,"real_value":null,"status":null},{"course_name":"\u79bb\u6563\u6570\u5b66","target_value":null,"real_value":null,"status":null}]},{"second_level":"1.2","course_data":[{"course_name":"\u81ea\u7136\u79d1\u5b66\u54f2\u5b66","target_value":null,"real_value":null,"status":null},{"course_name":"\u5927\u5b66\u7269\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u5927\u5b66\u5316\u5b66","target_value":null,"real_value":null,"status":null},{"course_name":"\u751f\u7269\u5b66\u57fa\u7840","target_value":null,"real_value":null,"status":null}]},{"second_level":"1.3","course_data":[{"course_name":"\u5de5\u7a0b\u5236\u56fe\u57fa\u7840\u53ca\u5de5\u7a0b\u5236\u56fe\u57fa\u7840\u5b9e\u9a8c","target_value":null,"real_value":null,"status":null},{"course_name":"\u519b\u4e8b\u4fe1\u606f\u6280\u672f\u57fa\u7840","target_value":null,"real_value":null,"status":null},{"course_name":"\u5927\u5b66\u8ba1\u7b97\u673a\u57fa\u7840B","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u7a0b\u5e8f\u8bbe\u8ba1B","target_value":null,"real_value":null,"status":null}]},{"second_level":"1.4","course_data":[{"course_name":"\u64cd\u4f5c\u7cfb\u7edf","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u636e\u5e93\u539f\u7406","target_value":0,"real_value":0,"status":false},{"course_name":"\u8ba1\u7b97\u673a\u7f51\u7edc","target_value":null,"real_value":null,"status":null},{"course_name":"\u8f6f\u4ef6\u5de5\u7a0b","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u539f\u7406","target_value":null,"real_value":null,"status":null}]},{"second_level":"1.5","course_data":[{"course_name":"\u4fe1\u53f7\u5206\u6790\u4e0e\u5904\u7406\u5bfc\u8bba","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u5b57\u56fe\u50cf\u5904\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u5d4c\u5165\u5f0f\u7cfb\u7edf\u8bfe\u7a0b\u8bbe\u8ba1","target_value":null,"real_value":null,"status":null},{"course_name":"\u64cd\u4f5c\u7cfb\u7edf\u7efc\u5408\u5b9e\u8df5","target_value":null,"real_value":null,"status":null}]}]},{"first_level":2,"first_leval_data":[{"second_level":"2.1","course_data":[{"course_name":"\u79bb\u6563\u6570\u5b66","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u636e\u7ed3\u6784","target_value":null,"real_value":null,"status":null},{"course_name":"\u7b97\u6cd5\u8bbe\u8ba1\u4e0e\u5206\u6790","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u503c\u5206\u6790","target_value":null,"real_value":null,"status":null}]},{"second_level":"2.2","course_data":[{"course_name":"\u81ea\u7136\u79d1\u5b66\u54f2\u5b66","target_value":null,"real_value":null,"status":null},{"course_name":"\u5927\u5b66\u7269\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u5927\u5b66\u7269\u7406\u5b9e\u9a8c","target_value":null,"real_value":null,"status":null},{"course_name":"\u7535\u8def\u4e0e\u7535\u5b50\u5b66\u57fa\u7840","target_value":null,"real_value":null,"status":null}]},{"second_level":"2.3","course_data":[{"course_name":"\u8f6f\u4ef6\u5de5\u7a0b","target_value":null,"real_value":null,"status":null},{"course_name":"\u4eba\u5de5\u667a\u80fd\u5bfc\u8bba","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u5b57\u7535\u5b50\u6280\u672f\u57fa\u7840B","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u5b57\u7cfb\u7edf\u8bbe\u8ba1","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u56fe\u5f62\u5b66","target_value":null,"real_value":null,"status":null}]}]},{"first_level":3,"first_leval_data":[{"second_level":"3.1","course_data":[{"course_name":"\u5927\u5b66\u8ba1\u7b97\u673a\u57fa\u7840B","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u7a0b\u5e8f\u8bbe\u8ba1B","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u539f\u7406\u8bfe\u7a0b\u8bbe\u8ba1","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u636e\u5e93\u539f\u7406","target_value":0,"real_value":0,"status":false},{"course_name":"\u7a0b\u5e8f\u8bbe\u8ba1\u8bfe\u7a0b\u8bbe\u8ba1","target_value":null,"real_value":null,"status":null}]},{"second_level":"3.2","course_data":[{"course_name":"\u8f6f\u4ef6\u5de5\u7a0b","target_value":null,"real_value":null,"status":null},{"course_name":"\u5d4c\u5165\u5f0f\u7cfb\u7edf","target_value":null,"real_value":null,"status":null},{"course_name":"\u5d4c\u5165\u5f0f\u7cfb\u7edf\u8bfe\u7a0b\u8bbe\u8ba1","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4f53\u7cfb\u7ed3\u6784","target_value":null,"real_value":null,"status":null}]},{"second_level":"3.3","course_data":[{"course_name":"\u4fe1\u606f\u5b89\u5168\u5bfc\u8bba","target_value":null,"real_value":null,"status":null},{"course_name":"\u8f6f\u4ef6\u5de5\u7a0b","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4f53\u7cfb\u7ed3\u6784","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u7f51\u7edc","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4e0e\u793e\u4f1a","target_value":null,"real_value":null,"status":null}]},{"second_level":"3.4","course_data":[{"course_name":"\u7f16\u8bd1\u539f\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u79bb\u6563\u6570\u5b66","target_value":null,"real_value":null,"status":null},{"course_name":"\u5927\u5b66\u8ba1\u7b97\u673a\u57fa\u7840B","target_value":null,"real_value":null,"status":null}]}]},{"first_level":4,"first_leval_data":[{"second_level":"4.1","course_data":[{"course_name":"\u7b97\u6cd5\u8bbe\u8ba1\u4e0e\u5206\u6790","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u503c\u5206\u6790","target_value":null,"real_value":null,"status":null},{"course_name":"\u4fe1\u53f7\u5206\u6790\u4e0e\u5904\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u7f16\u8bd1\u539f\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4f53\u7cfb\u7ed3\u6784","target_value":null,"real_value":null,"status":null}]}]},{"first_level":5,"first_leval_data":[{"second_level":"5.1","course_data":[{"course_name":"\u8ba1\u7b97\u673a\u539f\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u539f\u7406\u8bfe\u7a0b\u8bbe\u8ba1","target_value":null,"real_value":null,"status":null},{"course_name":"\u64cd\u4f5c\u7cfb\u7edf","target_value":null,"real_value":null,"status":null},{"course_name":"\u64cd\u4f5c\u7cfb\u7edf\u7efc\u5408\u5b9e\u8df5","target_value":null,"real_value":null,"status":null},{"course_name":"\u6570\u636e\u5e93\u539f\u7406","target_value":0,"real_value":0,"status":false}]}]},{"first_level":6,"first_leval_data":[{"second_level":"6.1","course_data":[{"course_name":"\u4fe1\u606f\u5b89\u5168\u5bfc\u8bba","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4e0e\u793e\u4f1a","target_value":null,"real_value":null,"status":null},{"course_name":"\u793e\u4f1a\u5b9e\u8df5","target_value":null,"real_value":null,"status":null},{"course_name":"\u8f6f\u4ef6\u5b89\u5168","target_value":null,"real_value":null,"status":null},{"course_name":"\u4eba\u5de5\u667a\u80fd\u5bfc\u8bba","target_value":null,"real_value":null,"status":null}]}]},{"first_level":7,"first_leval_data":[{"second_level":"7.1","course_data":[{"course_name":"\u4fe1\u606f\u5b89\u5168\u5bfc\u8bba","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4e0e\u793e\u4f1a","target_value":null,"real_value":null,"status":null},{"course_name":"\u5d4c\u5165\u5f0f\u7cfb\u7edf\u8bfe\u7a0b\u8bbe\u8ba1","target_value":null,"real_value":null,"status":null}]}]},{"first_level":8,"first_leval_data":[{"second_level":"8.1","course_data":[{"course_name":"\u601d\u60f3\u9053\u5fb7\u4fee\u517b\u4e0e\u6cd5\u5f8b\u57fa\u7840","target_value":null,"real_value":null,"status":null},{"course_name":"\u5f53\u4ee3\u4e16\u754c\u7ecf\u6d4e\u4e0e\u653f\u6cbb","target_value":null,"real_value":null,"status":null},{"course_name":"\u96c6\u4e2d\u653f\u6cbb\u6559\u80b2","target_value":null,"real_value":null,"status":null},{"course_name":"\u515a\u56e2\u6d3b\u52a8","target_value":null,"real_value":null,"status":null}]},{"second_level":"8.2","course_data":[{"course_name":"\u81ea\u7136\u79d1\u5b66\u54f2\u5b66","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4e0e\u793e\u4f1a","target_value":null,"real_value":null,"status":null},{"course_name":"\u96c6\u4e2d\u653f\u6cbb\u6559\u80b2","target_value":null,"real_value":null,"status":null},{"course_name":"\u6a21\u62df\u5c97\u4f4d\u4efb\u804c","target_value":null,"real_value":null,"status":null}]}]},{"first_level":9,"first_leval_data":[{"second_level":"9.1","course_data":[{"course_name":"\u5d4c\u5165\u5f0f\u7cfb\u7edf\u8bfe\u7a0b\u8bbe\u8ba1","target_value":null,"real_value":null,"status":null},{"course_name":"\u4eba\u673a\u4ea4\u4e92","target_value":null,"real_value":null,"status":null},{"course_name":"\u519b\u4e8b\u4fe1\u606f\u6280\u672f\u57fa\u7840","target_value":null,"real_value":null,"status":null},{"course_name":"\u6a21\u62df\u5c97\u4f4d\u4efb\u804c","target_value":null,"real_value":null,"status":null},{"course_name":"\u519b\u653f\u57fa\u7840\u8bad\u7ec3","target_value":null,"real_value":null,"status":null}]}]},{"first_level":10,"first_leval_data":[{"second_level":"10.1","course_data":[{"course_name":"\u82f1\u8bed\u5e94\u7528\u5199\u4f5cA","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4e0e\u793e\u4f1a","target_value":null,"real_value":null,"status":null},{"course_name":"\u793e\u4f1a\u5b9e\u8df5","target_value":null,"real_value":null,"status":null},{"course_name":"\u6a21\u62df\u5c97\u4f4d\u4efb\u804c","target_value":null,"real_value":null,"status":null},{"course_name":"\u515a\u56e2\u6d3b\u52a8","target_value":null,"real_value":null,"status":null}]},{"second_level":"10.2","course_data":[{"course_name":"\u5f53\u4ee3\u4e16\u754c\u7ecf\u6d4e\u4e0e\u653f\u6cbb","target_value":null,"real_value":null,"status":null},{"course_name":"\u5927\u5b66\u82f1\u8bed","target_value":null,"real_value":null,"status":null},{"course_name":"\u82f1\u8bed\u5e94\u7528\u5199\u4f5cA","target_value":null,"real_value":null,"status":null},{"course_name":"\u7ecf\u5e38\u6027\u601d\u60f3\u653f\u6cbb\u6559\u80b2","target_value":null,"real_value":null,"status":null}]}]},{"first_level":11,"first_leval_data":[{"second_level":"11.1","course_data":[{"course_name":"\u5f53\u4ee3\u4e16\u754c\u7ecf\u6d4e\u4e0e\u653f\u6cbb","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4e0e\u793e\u4f1a","target_value":null,"real_value":null,"status":null},{"course_name":"\u9a6c\u514b\u601d\u4e3b\u4e49\u57fa\u672c\u539f\u7406","target_value":null,"real_value":null,"status":null}]},{"second_level":"11.2","course_data":[{"course_name":"\u4fe1\u606f\u68c0\u7d22","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u6545\u969c\u8bca\u65ad\u548c\u7ef4\u62a4","target_value":null,"real_value":null,"status":null},{"course_name":"\u7f51\u7ad9\u8bbe\u8ba1\u4e0e\u7ef4\u62a4","target_value":null,"real_value":null,"status":null},{"course_name":"\u96c6\u4e2d\u653f\u6cbb\u6559\u80b2","target_value":null,"real_value":null,"status":null},{"course_name":"\u7ecf\u5e38\u6027\u601d\u60f3\u653f\u6cbb\u6559\u80b2","target_value":null,"real_value":null,"status":null}]}]},{"first_level":12,"first_leval_data":[{"second_level":"12.1","course_data":[{"course_name":"\u4fe1\u606f\u68c0\u7d22","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u4e0e\u793e\u4f1a","target_value":null,"real_value":null,"status":null},{"course_name":"\u7f51\u7ad9\u8bbe\u8ba1\u4e0e\u7ef4\u62a4","target_value":null,"real_value":null,"status":null},{"course_name":"\u8ba1\u7b97\u673a\u6545\u969c\u8bca\u65ad\u548c\u7ef4\u62a4","target_value":null,"real_value":null,"status":null},{"course_name":"\u7ecf\u5e38\u6027\u601d\u60f3\u653f\u6cbb\u6559\u80b2","target_value":null,"real_value":null,"status":null}]}]},{"first_level":13,"first_leval_data":[{"second_level":"13.1","course_data":[{"course_name":"\u9a6c\u514b\u601d\u4e3b\u4e49\u57fa\u672c\u539f\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u6bdb\u6cfd\u4e1c\u601d\u60f3\u548c\u4e2d\u56fd\u7279\u8272\u793e\u4f1a\u4e3b\u4e49\u7406\u8bba\u4f53\u7cfb\u6982\u8bba","target_value":null,"real_value":null,"status":null},{"course_name":"\u4e2d\u56fd\u8fd1\u73b0\u4ee3\u53f2\u7eb2\u8981","target_value":null,"real_value":null,"status":null},{"course_name":"\u96c6\u4e2d\u653f\u6cbb\u6559\u80b2","target_value":null,"real_value":null,"status":null}]},{"second_level":"13.2","course_data":[{"course_name":"\u601d\u60f3\u9053\u5fb7\u4fee\u517b\u4e0e\u6cd5\u5f8b\u57fa\u7840","target_value":null,"real_value":null,"status":null},{"course_name":"\u9a6c\u514b\u601d\u4e3b\u4e49\u57fa\u672c\u539f\u7406","target_value":null,"real_value":null,"status":null},{"course_name":"\u6bdb\u6cfd\u4e1c\u601d\u60f3\u548c\u4e2d\u56fd\u7279\u8272\u793e\u4f1a\u4e3b\u4e49\u7406\u8bba\u4f53\u7cfb\u6982\u8bba","target_value":null,"real_value":null,"status":null},{"course_name":"\u96c6\u4e2d\u653f\u6cbb\u6559\u80b2","target_value":null,"real_value":null,"status":null}]},{"second_level":"13.3","course_data":[{"course_name":"\u519b\u653f\u57fa\u7840\u8bad\u7ec3","target_value":null,"real_value":null,"status":null},{"course_name":"\u519b\u4e8b\u4fe1\u606f\u6280\u672f\u57fa\u7840","target_value":null,"real_value":null,"status":null},{"course_name":"\u6a21\u62df\u5c97\u4f4d\u4efb\u804c","target_value":null,"real_value":null,"status":null}]}]}],"calculation_value":0.0};
/**
  TODO 根据data计算最大课程数量
  然后课程数量的列宽是900，然后平均分配给每个列
 */
function getNumArray(data_args) {
  let num_array = [];
  if (data_args) {
    data_args.forEach(item => {
      num_array.push(item.graduation_subitems.length)
    })
  }
  return num_array;
}
let num_array = []
// const num_array = [1, 3, 1, 1]


let current_num_index = 0;
// 获取位于当前分组之前的总行数
function getNum(index) {
  let sum = 0
  for(let i = 0; i <= current_num_index - 1; i++) {
    sum += num_array[i];
  }
  sum = sum * 3;
  if (index != 0 && index == sum + num_array[current_num_index] * 3
      && current_num_index < num_array.length - 1) {
    sum = sum + num_array[current_num_index] * 3
    current_num_index++;
  }
  return sum
}
const buildColumns = (that) => {
  const stdColumnNum = 8;
  let rowSum = 0;
  current_num_index = 0;
  const cols = [{
    title: '毕业要求',
    dataIndex: 'firstCol',
    key: 'firstCol',
    children: [{
      title: '一级',
      dataIndex: 'f_l',
      key: 'f_l',
      width: 65,
      render: (value, row, index) => {
        rowSum = getNum(index);

        const obj = {
          children: current_num_index + 1,
          props: {},
        };


        if (index - rowSum === 0) {
          obj.props.rowSpan = num_array[current_num_index] * 3;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj
      }
    }, {
      title: '二级',
      dataIndex: 's_l',
      key: 's_l',
      width: 65,
      render: (value, row, index) => {
        const _i_remain = index % 3;
        const _i = Math.floor( (index - rowSum) / 3) + 1
        const obj = {
          children: `${current_num_index + 1}-${_i}`,
          props: {},
        };
        if (_i_remain === 0) {
          obj.props.rowSpan = 3;
        } else {
          obj.props.rowSpan = 0;
        }
        return obj
      }
    }]
  }, {
    title: '课程名称',
    dataIndex: 'c_n',
    key: 'c_n',
    children: [{
      title: '课程1',
      dataIndex: 'c1',
      key: 'c1',
      width: 90,
    }, {
      title: '课程2',
      dataIndex: 'c2',
      key: 'c2',
      width: 90,
    }, {
      title: '课程3',
      dataIndex: 'c3',
      key: 'c3',
      width: 90,
    }, {
      title: '课程4',
      dataIndex: 'c4',
      key: 'c4',
      width: 90,
    }, {
      title: '课程5',
      dataIndex: 'c5',
      key: 'c5',
      width: 90,
    }]
  }, {
    title: <React.Fragment>
      <div>课程数量</div>
      <div>∑合格标准</div>
      <div>∑达成值</div>
    </React.Fragment>,
    dataIndex: 'g_r',
    key: 'g_r',
    width: 100,
    render: (val, row, index) => {
      // if row.c1 是数字  row.c1 + row.c2 + ...
      // 不是数字的话，统计一共有几列
      // if (row.c1 && isNaN(parseInt(row.c1))) {
      // 每个小组的第一行，统计一共有几列
      if (index % 3 === 0) {
        let _newRow = Object.assign({}, row)
        delete _newRow.status
        return <span style={{color: '#FF6800'}}>{Object.keys(_newRow).length}</span>;
      } else {
        let total = 0;
        for (var key in row) {
            if (row.hasOwnProperty(key) && row[key]) {
              total += parseFloat(row[key])
            }
        }
        return total.toFixed(3);
      }
    }
  }, {
    title: '评价结果',
    dataIndex: 'e_r',
    key: 'e_r',
    width: 40,
    render: (value, row, index) => {
      const _i_remain = index % 3;
      // 未达成
      const obj = {
        children: row.status ? <span style={{color: '#29BD88'}}>达成</span>
            : <span style={{color: '#FF6800'}}>未达成</span>,
        props: {},
      };
      if (_i_remain === 0) {
        obj.props.rowSpan = 3;
      } else {
        obj.props.rowSpan = 0;
      }
      return obj
    }
  }]
  const courseColWidth = 900 / maxCouseCount
  const courseColArray = []
  for (var courseIndex = 1; courseIndex <= maxCouseCount; courseIndex++) {
    courseColArray.push({
      title: `课程${courseIndex}`,
      dataIndex: `c${courseIndex}`,
      key: `c${courseIndex}`,
      width: courseColWidth,
    })
  }
  if( courseColArray.length) {
    cols[1].children = courseColArray;
  }
  // for (let i = 1; i <= stdColumnNum; i++) {
  //   cols.push({
  //     title: `标准${i}`,
  //     dataIndex: `std${i}`,
  //     key: `std${i}`,
  //     render: (data, row) => {
  //       return <Checkbox defaultChecked={data} onClick={()=>onCheckBoxClick(that, row)}></Checkbox>
  //     }
  //   })
  // }
  return cols;
}

/**
  innerItem
  0:
    course_data: Array(4)
    0: {course_name: "高等数学", target_value: null, real_value: null, status: null}
    1: {course_name: "线性代数", target_value: null, real_value: null, status: null}
    2: {course_name: "概率论与数理统计", target_value: null, real_value: null, status: null}
    3: {course_name: "离散数学", target_value: null, real_value: null, status: null}
    length: 4
    __proto__: Array(0)
    second_level: "1.1"
 */
let maxCouseCount = 0;

function getTableData(data_args) {
  let tableData = []
  // 最大课程数量，根据这个值动态渲染课程列数
  maxCouseCount = 0;
  if (data_args) {
    data_args.forEach((item, index) => {
      item.first_leval_data.forEach((innerItem, innerIndex) => {
        let nameRowData = {};
        let targetValueRowData = {};
        let realValueRowData = {};
        let target_value_total = 0;
        let real_value_total = 0;
        // 一个course数组的数据组合成三行table数据
        innerItem.course_data.forEach((course, courseIndex) => {
          nameRowData[`c${courseIndex + 1}`] = course.course_name;

          targetValueRowData[`c${courseIndex + 1}`] = course.target_value && course.target_value.toFixed
                ? course.target_value.toFixed(3) : course.target_value ;
          if (course.target_value) {
            target_value_total = target_value_total + course.target_value
          }

          realValueRowData[`c${courseIndex + 1}`] = course.real_value && course.real_value.toFixed
                ? course.real_value.toFixed(3) : course.real_value ;
          if (course.real_value) {
           real_value_total = real_value_total + course.real_value
          }
        })
        if (real_value_total >= target_value_total && real_value_total != 0) {
          nameRowData.status = true
        }
        maxCouseCount = Math.max(maxCouseCount, innerItem.course_data.length)
        tableData.push(nameRowData)
        tableData.push(targetValueRowData)
        tableData.push(realValueRowData)
      })
    })
  }
  return tableData;
}
// new
function getTableData(data_args) {
let tableData = []
  // 最大课程数量，根据这个值动态渲染课程列数
  maxCouseCount = 0;
  if (data_args) {
    data_args.forEach((item, index) => {
      item.graduation_subitems.forEach((innerItem, innerIndex) => {
        let nameRowData = {};
        let targetValueRowData = {};
        let realValueRowData = {};
        let target_value_total = 0;
        let real_value_total = 0;
        // 一个course数组的数据组合成三行table数据
        innerItem.course_supports.forEach((course, courseIndex) => {
          nameRowData[`c${courseIndex + 1}`] = course.course_name;

          targetValueRowData[`c${courseIndex + 1}`] = course.reach_criteria
          // course.target_value && course.target_value.toFixed
          //       ? course.target_value.toFixed(3) : course.target_value ;
          // if (course.target_value) {
          //   target_value_total = target_value_total + course.target_value
          // }

          realValueRowData[`c${courseIndex + 1}`] = course.actually_reach
          // course.real_value && course.real_value.toFixed
          //       ? course.real_value.toFixed(3) : course.real_value ;
          // if (course.real_value) {
          //  real_value_total = real_value_total + course.real_value
          // }
        })
        // if (real_value_total >= target_value_total && real_value_total != 0) {
          nameRowData.status = innerItem.status != "not_achieved" && parseFloat(innerItem.actually_reach) != 0
        // }
        maxCouseCount = Math.max(maxCouseCount, innerItem.course_supports.length)
        tableData.push(nameRowData)
        tableData.push(targetValueRowData)
        tableData.push(realValueRowData)
      })
    })
  }
  return tableData;
}

let tableData = []


const data = [
  {
  key: '1',

  c1: '数学分析 II1',
  c2: '数学分析 II2',
  c3: '大学物理 V',
  c4: '大学物理实验II',
  c5: '线性代数 I',
  c6: '结合论与数理逻辑',
  c7: '复变函数与积分变换I',
  c8: '毕业设计',
  g_r: '8',
  e_r: '未达成'
}, {
  key: '2',
  c1: '0.140',
  c2: '0.150',
  c3: '0.110',
  c4: '0.120',
  c5: '0.163',
  c6: '0.063',
  c7: '0.053',
  c8: '0.053',
  g_r: 0.650
}, {
  key: '3',
  c1: '',
  c2: '',
  c3: '',
  c4: '',
  c5: '',
  c6: '',
  c7: '',
  c8: '',
  g_r: '0.000'
},
{
  key: '4',

  c1: '计算概论',
  c2: '概率论与数理统计I',
  c3: '图论与组合数学',
  c4: '算法设计与分析',
  c5: '毕业设计',

  g_r: '5',
  e_r: '未达成'
}, {
  key: '5',
  c1: '0.070',
  c2: '0.210',
  c3: '0.175',
  c4: '0.070',
  c5: '0.175',
  g_r: '0.700',
}, {
  key: '6',
  c1: '',
  c2: '',
  c3: '',
  c4: '',
  c5: '',
  c6: '',
  c7: '',
  c8: '',
  g_r: '0.000',
},{
  key: '7',

  c1: 'C语言程序设计Ⅳ',
  c2: '数据结构Ⅰ',
  c3: '操作系统',
  c4: '计算机网络原理Ⅰ',
  c5: '人工智能',
  c6: '编译原理',
  c7: '数据库原理',
  c8: '软件工程Ⅰ',
  c9: '面向对象程序设计(C++)',
  e_r: '未达成'

}, {
  key: '8',
  c1: '0.070',
  c2: '0.070',
  c3: '0.070',
  c4: '0.070',
  c5: '0.070',
  c6: '0.070',
  c7: '0.070',
  c8: '0.070',
  c9: '0.070',
  g_r: '0.630',

}, {
  key: '9',
  c1: '',
  c2: '',
  c3: '',
  c4: '',
  c5: '',
  c6: '',
  c7: '0.134',
  c8: '',
  g_r: '0.134',
},{
  key: '10',
  c1: '计算机组成原理Ⅰ',
  c2: '数字逻辑与数字电路',
  c3: '计算机系统结构',
  c4: '汇编语言程序设计Ⅰ',
  c5: '接口技术Ⅰ',
  c6: '模拟电路应用',
  c7: '微机控制技术Ⅰ',
  c8: '计算机系统装配与集成',
  e_r: '未达成'

}, {
  key: '11',
  c1: '0.070',
  c2: '0.070',
  c3: '0.070',
  c4: '0.070',
  c5: '0.070',
  c6: '0.070',
  c7: '0.070',
  c8: '0.070',
  g_r: '0.560',

}, {
  key: '12',  c1: '',  c2: '',  c3: '',  c4: '',  c5: '',  c6: '',  c7: '',  c8: '',
  g_r: '0.000',

},{
  key: '13',
  c1: '数学分析Ⅱ1',
  c2: '数学分析Ⅱ2',
  c3: '大学物理Ⅴ',
  c4: '线性代数Ⅰ ',
  c5: '概率论与数理统计Ⅰ',
  c6: '集合论与数理逻辑',  c7: '图论与组合数学',  c8: '编译原理',  c9: '算法设计与分析',
  e_r: '未达成'
}, {
  key: '14',
  c1: '0.035',
  c2: '0.056',
  c3: '0.070',
  c4: '0.084',
  c5: '0.035',
  c6: '0.105',
  c7: '0.014',
  c8: '0.084',
  c: '0.049',
  g_r: '0.700',

}, {
  key: '15',  c1: '',  c2: '',  c3: '',  c4: '',  c5: '',  c6: '',  c7: '',  c8: '',
  g_r: '0.000',

},{
  key: '16',
  c1: '前沿技术讲座',
  c2: '毕业设计',
  // c3: '课程1',  c4: '课程1',  c5: '课程1',  c6: '课程1',  c7: '课程1',  c8: '课程1',  e_r: '未达成'
  e_r: '未达成'
}, {
  key: '17',  c1: '0.210',  c2: '0.490'
  //,  c3: '0.3',  c4: '0.3',  c5: '0.3',  c6: '0.3',  c7: '0.3',  c8: '0.3',
  ,g_r: '0.700',
}, {
  key: '18',  c1: '',  c2: '',  c3: '',  c4: '',  c5: '',  c6: '',  c7: '',  c8: '',
  g_r: '0.000'

}
];

class GraduatesRequirement extends Component {
    constructor(props) {
      super(props)
      this.state={
        schooldata:{},
        ec_year_id:0,

        daChengYuZhiEditableMode: false,
        daChengYuZhi: 0.1,
        daChengYuZhiSaved: 0.1,

        calculating: false, // 是否在计算中
      }
    }
    onDaChengYuZhiChange = (value) => {
      if ( (!window.event || window.event.type == 'blur')
          && this.state.daChengYuZhi > 1 && value == 1) {
        this.props.showSingleButtonModal('提示', '达成阈值必须小于等于1')
      }
      this.setState({ daChengYuZhi: value });
    }
    onDaChengYuZhiCancel = () => {
      this.setState({ daChengYuZhi: this.state.daChengYuZhiSaved })
      this.setDaChengYuZhiEditableMode(false)
    }
    setDaChengYuZhiEditableMode = (mode) => {
      this.setState({ daChengYuZhiEditableMode: mode })
    }
    saveDaChengYuZhi = () => {
      let major_school_id =this.props.match.params.major_school_id;
      let ec_year_id =this.props.match.params.ec_year_id;

      var url = `/ec_major_schools/${major_school_id}/academic_years/${ec_year_id}/set_calculation_value`;
      url = `/ec_years/${this.state.ec_year_id}/reach_criteria.json`

      if (this.state.daChengYuZhi == undefined) {
        this.props.showSingleButtonModal('提示', '达成阈值不能为空！')
        return;
      } else if (this.state.daChengYuZhi == 0) {
        this.props.showSingleButtonModal('提示', '达成阈值必须大于0，且小于等于1')
        return;
      }
			axios.post(url, {
				reach_criteria : this.state.daChengYuZhi
			}).then((response) => {

				if( response.data.status === 0 ) {
      		this.setState({ daChengYuZhiSaved: this.state.daChengYuZhi })
          this.setDaChengYuZhiEditableMode(false)
				}else {
          // 其他message
				}
			}).catch((error) => {
				console.log(error)
			})


    }
    componentDidMount(){
      window.document.title = '达成度评价结果';
      let ec_year_id =this.props.match.params.ec_year_id;
      this.setState({
        ec_year_id:ec_year_id
      })
      this.fetchData(ec_year_id)

      // const Url =`/ec_major_schools/get_navigation_data?ec_year_id=`+ec_year_id;
      // axios.get(Url, {
      //       // withCredentials: true,
      //     })
      //   .then((response) => {
      //       if(response.status===200){
      //       //   if(response.data.allow_visit===false){
      //       //     window.location.href="/403"
      //       //  }
      //         this.setState({
      //           schooldata:response.data
      //         })
      //       }
      //     })
      //   .catch(function (error) {
      //       console.log(error);
      //     });
    }
    fetchData(ec_year_id) {
      // const url = `ec_courses/7/get_calculation_data`
      // const url = `/ec_courses/get_calculation_data?ec_year_id=${ec_year_id}`
      const url = `/ec_years/${ec_year_id}/reach_evaluation.json`
      // num_array = getNumArray(testData.calculation_data);
      // tableData = getTableData(testData.calculation_data)
      // return

      axios.get(url, {
            // withCredentials: true,
          })
        .then((response) => {
          if (response.data.graduation_requirements) {
            num_array = getNumArray(response.data.graduation_requirements);
            tableData = getTableData(response.data.graduation_requirements)
            // 先计算，再触发render
            this.setState({
              calculationData: response.data.calculation_data,
              daChengYuZhi: response.data.reach_threshold,
              daChengYuZhiSaved: response.data.reach_threshold,
              course_ids: response.data.course_ids,
              is_manager: response.data.is_manager,
              calculating: false,
            })
          }


        })
        .catch(function (error) {
          console.log(error);
        });
    }
    onCalculate = () => {
      if (!this.state.course_ids || this.state.course_ids.length === 0) {
        // 没有课程数据
        this.props.showSingleButtonModal('提示', '请先配置基础数据')

        return;
      }

      this.setState({ calculating: true })
      var Url = '/ec_courses/sync_all_course_data';
      /**
        # POST: /ec_courses/sync_all_course_data
        # 参数:
        #     course_ids: [1,2,3,4]
       */
			axios.post(Url, {
        course_ids: this.state.course_ids
			}).then((response) => {
        // 计算需要一定的时间，让按钮转动

				if( response.data.status === 1 ) {
          let ec_year_id = this.props.match.params.ec_year_id;
          this.fetchData(ec_year_id);
          this.props.showSingleButtonModal('提示', '计算完毕')
				} else {

				}
			}).catch((error) => {
        this.setState({ calculating: false })

				console.log(error)
			})
    }
  	render() {
			const { match, history, current_user } = this.props
      const { daChengYuZhiEditableMode, daChengYuZhi, daChengYuZhiSaved, is_manager } = this.state
      let { schooldata } =this.state;
      // let { example_major, template_major } = schooldata;
      let showCalculateButton = is_manager;
      // let showCalculateButton = false;
      // if (example_major && current_user.admin || !example_major && template_major) {
      //   showCalculateButton = true;
      // }
	    return (

            <div className="educontent graduatesRequirement">

              <ul className="clearfix padding20-30 bor-bottom-greyE backgroundFFF"
                style={{ 'marginBottom': '0px' }} >
                <li className="fl">
                  <p className="font-18 courseSystem"> 毕业要求指标点达成计算 </p>
                  <p>
                    <span class="color-grey-9 mr10">系统根据课程体系与毕业要求的支持关系，以课程的考核与成绩判定方式，一键计算毕业要求的达成度情况</span>
                    <a target="_blank" href={'/forums/3535'} class="color-blue">查看详情</a>
                  </p>

                </li>
              </ul>

              <p class="clearfix padding20-30 bor-bottom-greyE backgroundFFF"
                style={{ 'paddingBottom': '12px' }}>
                <span class="fl font-14">达成阈值：</span>
                { daChengYuZhiEditableMode ?
                    <React.Fragment>
                      <InputNumber value={daChengYuZhi} onChange={this.onDaChengYuZhiChange}
                        size="small" min={0} max={1} step={0.01} ></InputNumber>
                      <span onClick={this.saveDaChengYuZhi}
                        style={{color: '#4CACFF', marginLeft: '4px', cursor: 'pointer', fontSize: '13px'}}>确定
                      </span>
                      <span onClick={ this.onDaChengYuZhiCancel }
                        style={{color: '#d1d1d1', marginLeft: '4px', cursor: 'pointer', fontSize: '13px'}} >取消
                      </span>
                    </React.Fragment>
                  :
                    <React.Fragment>
                      <span class="color-orange fl" id="ReachStandardNum">{daChengYuZhiSaved}</span>
                      {/* data-tip-down="编辑"  */}
                      <i
                        onClick={() => { this.setDaChengYuZhiEditableMode(true) }}
                        class="iconfont icon-bianjidaibeijing color-green" idkey="0"
                        style={{ float: 'left', marginTop: '-3px', marginLeft: '3px', cursor: 'pointer' }}></i>
                    </React.Fragment>
                }

                {/* <a class="mr20 editSubentry"  style={{display: 'block'}}>

                </a> */}

                <a href="javascript:void(0)"
                  class="white-btn edu-orangeback-btn fr mr10"
                  href={`/api/ec_years/${this.state.ec_year_id}/reach_evaluation.xlsx${getRandomNumber()}`}
                >导出</a>
                {/* /ec_major_schools/3/academic_years/5/export_reach_requirements_data.xls
                  let major_school_id =this.props.match.params.major_school_id;
                  let ec_year_id =this.props.match.params.ec_year_id;
                  */}

                { showCalculateButton && ( this.state.calculating === true ?
                  <a href="javascript:void(0)" class="white-btn edu-grayback-btn mr20 fr">
                    计算中...
                  </a> :
                  <a href="javascript:void(0)" class="white-btn edu-orangeline-btn mr20 fr" onClick={this.onCalculate}>
                    计算
                </a> )
                }

              </p>

              {/* { this.state.calculating == true ?
              <Spin delay={500} className="Spinlarge" indicator={<Icon type="loading" style={{ fontSize: 30 }} spin />}></Spin>
              :  }       　 */}
              <Table bordered loading={ this.state.calculating }
                columns={buildColumns(this)} dataSource={tableData} pagination={false}
                scroll={{ y: 530 }}
              ></Table>

            </div>

	    );
  	}
}

export default ECModalHOC() (GraduatesRequirement) ;
