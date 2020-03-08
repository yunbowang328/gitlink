import React, { Component } from 'react';

import classNames from 'classnames'

import axios from 'axios';

import { Table, Divider, Tag, Checkbox, InputNumber, Spin, Icon, Tooltip } from 'antd';

class SelectTable extends Component {
    constructor(props) {
      super(props)
      this.state={
          
      }
    }
  
    componentDidMount(){
     
    }
  
  	render() {
		const { match, columns, tableData } = this.props
        if (!tableData || !tableData.length) return ''; 
	    return (
            
            <table className="edu-pop-table-all edu-txt-center color-grey-6 interval-td" cellspacing="0" cellpadding="0">
                <tbody>
                <tr>
                    
                    {columns.map((item, index) => {
                        if (index == 0) return <td className="gaugeOutfit"><span>{columns[0][0]}</span><span>{columns[0][1]}</span></td>;
                        return (
                            <Tooltip title={item}>
                                <td >{this.props.columnName || '目标'}{index}</td>
                            </Tooltip>
                        )
                    })}
                    {/* <td data-tip-down="掌握计算机科学与技术的基本理论、基本知识;">目标1</td>
                    <td data-tip-down="掌握计算机系统的分析和设计的基本方法;">目标2</td>
                    <td data-tip-down="具有研究开发计算机软、硬件的基本能力;">目标3</td>
                    <td data-tip-down="了解计算机科学与技术的发展动态;">目标4</td>
                    <td data-tip-down="掌握文献检索、资料查询的基本方法，具有获取信息的能力。">目标5</td> */}
                </tr>
                { tableData.map((item, rowIndex) => {
                    const cells = item.map((cell, colIndex) => {
                        // placement="bottom"
                        if(colIndex == 0) return <Tooltip title={cell}>
                            <td >指标点{this.props.firstColIndexArray ? this.props.firstColIndexArray[rowIndex] : rowIndex + 1}</td>
                        </Tooltip>
                        return (<Tooltip title={!!cell ? '取消支撑' : '选择支撑'} >
                            <td onClick={() => this.props.onCellClick(rowIndex, colIndex , !!cell)}>
                                <i className={`iconfont icon-gouxuan ${!!cell ? 'color-green' : 'color-grey-eb'} font-16 mr5`}></i>
                            </td>
                        </Tooltip>)
                    })
                    return (
                        <tr className="sustainLine editTd">
                            {cells}
                        </tr>
                    )
                })}
                    {/* <tr className="sustainLine editTd">
                        <td data-tip-down="工程知识：能够将数学、自然科学、工程基础和专业知识用于解决复杂工程问题。1212">指标点1</td>
                        <td data-tip-down="取消支撑" data-req-id="77" data-to-id="80">
                            <i className="iconfont icon-gouxuan color-green font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="77" data-to-id="81">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="77" data-to-id="82">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="取消支撑" data-req-id="77" data-to-id="83">
                            <i className="iconfont icon-gouxuan color-green font-16 mr5"></i>
                        </td>
                        <td data-tip-down="取消支撑" data-req-id="77" data-to-id="84">
                            <i className="iconfont icon-gouxuan color-green font-16 mr5"></i>
                        </td>
                    </tr> */}
                    {/* <tr className="sustainLine editTd">
                    <td data-tip-down="具有识别、表达、分析复杂工程问题并得出有效结论的能力。">指标点2</td>
                        <td data-tip-down="选择支撑" data-req-id="78" data-to-id="80">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="78" data-to-id="81">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="78" data-to-id="82">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="78" data-to-id="83">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="78" data-to-id="84">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                    </tr>
                    <tr className="sustainLine editTd">
                    <td data-tip-down="具备设计和开发针对复杂工程问题的解决方案的能力。">指标点3</td>
                        <td data-tip-down="选择支撑" data-req-id="79" data-to-id="80">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="79" data-to-id="81">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="取消支撑" data-req-id="79" data-to-id="82">
                            <i className="iconfont icon-gouxuan color-green font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="79" data-to-id="83">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                        <td data-tip-down="选择支撑" data-req-id="79" data-to-id="84">
                            <i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>
                        </td>
                    </tr> */}
                </tbody>
            </table>
              
            
	    );
  	}
}

export default (SelectTable) ;
