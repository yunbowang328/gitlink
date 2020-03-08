import React , { Component } from 'react';
import { Table } from 'antd';
class RootTable extends Component{
  render(){
    const { columns , data , title }=this.props;
    return(
      <Table
        className="mt20 wrap-commit-table"
        columns={columns}
        dataSource={data}
        showHeader={false}
        size="small"
        pagination={false}
        title={() => title()}
      />
    )
  }
}
export default RootTable;