import React, { Component } from 'react';

import classNames from 'classnames'
import {getRandomNumber} from 'educoder'
import axios from 'axios';

import { Table, Divider, Tag, Checkbox, InputNumber, Spin, Icon } from 'antd';
import SelectTable from '../RequirementVsObjective/SelectTable'
import update from 'immutability-helper'

class RequirementVsObjective extends Component {
    constructor(props) {
      super(props)
      this.state={

      }
    }

    componentDidMount(){
        // this.init()
        // return;

        const yearId = this.props.match.params.yearId
        const url = `/ec_years/${yearId}/subitem_support_standards.json`
        axios.get(url).then((response) => {
            if (response.data.graduation_subitems) {
                this.setState( {...response.data} , () => {
                    this.init()
                })
            }
        }).catch((e) => {

        })
    }
    init = () => {
        this.graduationRequirementsIdIndexMap = {}
        this.trainingSubitemsIdIndexMap = {}
        this.state.graduation_subitems.forEach((item, index) => {
            this.graduationRequirementsIdIndexMap[item.id] = index
        })
        this.state.graduation_standards.forEach((item, index) => {
            // 对应table的列数
            this.trainingSubitemsIdIndexMap[item.id] = index + 1
        })
        const tableData = []
        const firstColIndexArray = []
        this.state.graduation_subitems.forEach((item, index) => {
            tableData.push([item.content, ...Array(this.state.graduation_standards.length)])
            firstColIndexArray.push(`${item.position}-${item.graduation_requirement_position}`)
        })
        this.state.subitem_support_standards.forEach(item => {
            tableData[this.graduationRequirementsIdIndexMap[item.graduation_subitem_id]][this.trainingSubitemsIdIndexMap[item.graduation_standard_id]]
                = true
        })
        this.setState({ tableData, firstColIndexArray })
    }
    onCellClick = (rowIndex, colIndex, select) => {
        console.log( rowIndex, colIndex, select )
        const ec_graduation_subitem_id = this.state.graduation_subitems[rowIndex].id
        const ec_graduation_standard_id = this.state.graduation_standards[colIndex - 1].id
        const yearId = this.props.match.params.yearId
        const url = `/ec_years/${yearId}/subitem_support_standards.json`
        const method = select ? axios.delete : axios.post
        method(url,
            select ? {
                params: {
                    ec_graduation_subitem_id,
                    ec_graduation_standard_id
                }
            } : {
                ec_graduation_subitem_id,
                ec_graduation_standard_id
            }
        ).then((response) => {
            if (response.data.status == 0) {
                this.setState(
                    (prevState) => ({
                        tableData : update(prevState.tableData, {[rowIndex]: {[colIndex]: {$set: select ? false : true}}})
                    })
                )
                this.props.showNotification(`${select ? '取消' : '选择'}成功`)
            }
        }).catch((e) => {

        })
        if (select) { // 取消

        } else { // 选择

        }
    }
  	render() {
		const { match, history, current_user } = this.props
        const { tableData, graduation_standards, graduation_subitems, is_manager, firstColIndexArray } = this.state

        const columns = graduation_standards && [['毕业要求', '通用标准'], ...graduation_standards.map(item => item.content)]
        const columnIdIndexMap = {}
        console.log(columns, tableData)
	    return (

            <div className="educontent requirementVsObjective" style={{ background: '#fff' }}>
                <ul className="clearfix padding20-30 bor-bottom-greyE backgroundFFF"
                style={{ 'marginBottom': '0px' }} >
                    <li className="fl">
                    <p className="font-18 courseSystem"> 毕业要求对通用标准的支撑 </p>
                    <p>
                        <span className="color-grey-9 mr10">用矩阵图的形式说明本专业毕业要求对12项通用标准的覆盖关系，鼠标左键单击单元格即可</span>
                        <a target="_blank" href={'/forums/3532'}  className="color-blue">查看详情</a>
                    </p>

                    </li>
                    <a href={`/api/ec_years/${this.props.yearId}/subitem_support_standards.xlsx${getRandomNumber()}`} target="_blank"
                            className="ant-btn ant-btn-primary color-white fr mt20">导出矩阵</a>
                </ul>
                <div className="padding20-30" style={{ background: '#fff' }}>
                    <p className="clearfix mb20">
                        <span className="fl mr30"><i className="iconfont icon-gouxuan color-green font-16 mr5"></i>表示支撑</span>
                        <span className="fl"><i className="iconfont icon-gouxuan color-grey-eb font-16 mr5"></i>表示不支撑</span>
                    </p>
                    <SelectTable
                        columns={columns}
                        tableData={tableData}
                        columnName="标准"
                        onCellClick={this.onCellClick}
                        firstColIndexArray={firstColIndexArray}
                    ></SelectTable>
                </div>
            </div>

	    );
  	}
}

export default (RequirementVsObjective) ;
