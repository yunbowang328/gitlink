/*
 * @Description: 模拟数据
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-11 10:55:33
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-14 09:11:36
 */
import { random } from 'lodash';

const getGuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    /* eslint-disable */
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

const fetchData = (startIndex = 0) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve(
        startIndex >= 500 // 总共只有500条数据
          ? []
          : Array.from({ length: 50 }).map((_, i) => {
              // 每次返回100条
              const index = startIndex + i;
              return {
                key: getGuid(),
                index: `${index}`,
                name: '湖南长沙中南大学湖南长沙中南大学湖南长沙中南大学湖南长沙中南大学湖南长沙中南大学',
                age: i+1,
                address: 'New York No. ',
                address2: 'address2',
                bbb: 'address3'
              };
            }),
      );
    }, random(0, 1.0) * 1000);
  });

const columns = [
  {
    title: '序号',
    dataIndex: 'index',
    render: text => text + 1,
    width: 80,
    align: 'center'
  },
  {
    title: '使用单位',
    dataIndex: 'name',
    width: 300,
    className: 'overflow_hidden',
    align: 'center'
  },
  {
    title: '使用课堂/个',
    width: 200,
    dataIndex: 'age',
    align: 'center',
    // sorter: (a, b) => a.age - b.age
  },
  {
    title: '课堂学生/个',
    width: 200,
    dataIndex: 'address',
    align: 'center',
    // sorter: (a, b) => a.age - b.age
  },
  {
    title: '选用实训/个',
    width: 200,
    dataIndex: 'address2',
    align: 'center',
    // sorter: (a, b) => a.age - b.age
  },
  {
    title: '选用实训/个',
    width: 200,
    dataIndex: 'bbb',
    align: 'center',
    // sorter: (a, b) => a.bbb - b.bbb
  }
];

const sumData = [
  {
    index: '合计',
    key: 6,
    name: 'Disabled User',
    age: 99,
    address: 'Sidney No.',
    address2: 'address2',
    bbb: 'address3',
  }
];

export { columns, fetchData, sumData };
