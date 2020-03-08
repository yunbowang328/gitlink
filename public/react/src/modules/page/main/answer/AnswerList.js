import React, { Component } from 'react';

import { Table } from 'antd'
import 'antd/lib/table/style/index.css'

/* 
使用这个table组件 
https://ant.design/components/table-cn/

*/

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Jim Red',
  age: 32,
  address: 'London No. 2 Lake Park',
}];

class AnswerList extends Component {
	constructor(props) {
		super(props)
	}
	handleChange = (pagination, filters, sorter) => {
	    console.log('Various parameters', pagination, filters, sorter);
	    // TODO sorter变化后重新拉数据，服务端做排序
	    this.setState({
	      	sortedInfo: sorter,
	    });
  	}
	render() {
		const columns = [{
	      	title: 'Name',
	      	dataIndex: 'name',
	      	key: 'name'
    	}, {
	      	title: '点赞数',
	      	dataIndex: 'age',
	      	key: 'age',
	      	sorter: (a, b) => a.age - b.age,
	      	
	    	// sortOrder:sortedInfo .columnKey === 'age' && sortedInfo.order,
	    }, {
	      	title: 'Address',
	      	dataIndex: 'address',
	      	key: 'address',
    	}];
		return (
			<div>
				<Table columns={columns} dataSource={data} onChange={this.handleChange} />
      		</div>
      	)
	}
}

export default AnswerList;
