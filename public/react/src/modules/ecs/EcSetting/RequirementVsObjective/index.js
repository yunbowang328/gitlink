import React, { Component } from 'react';

import classNames from 'classnames'
import {getRandomNumber} from 'educoder';
import axios from 'axios';

import { Table, Divider, Tag, Checkbox, InputNumber, Spin, Icon } from 'antd';
import SelectTable from './SelectTable'
import update from 'immutability-helper'
const testState = {
    "graduation_requirements": [
        {
            "id": 1,
            "position": 1,
            "content": "毕业要求一"
        },
        {
            "id": 2,
            "position": 2,
            "content": "毕业要求二"
        }
    ],
    "training_subitems": [
        {
            "id": 1,
            "content": "培养目标一"
        },
        {
            "id": 2,
            "content": "培养目标二"
        }
    ],
    "requirement_support_objectives": [
        {
            "graduation_requirement_id": 1,
            "training_subitem_id": 1
        },
        {
            "graduation_requirement_id": 2,
            "training_subitem_id": 2
        },
    ]
}
class RequirementVsObjective extends Component {
    constructor(props) {
      super(props)
      this.state={
        //   ...testState
      }
    }

    componentDidMount(){
        // this.init()
        // return;

        const yearId = this.props.match.params.yearId
        const url = `/ec_years/${yearId}/requirement_support_objectives.json`
        axios.get(url).then((response) => {
            if (response.data.graduation_requirements) {
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
        this.state.graduation_requirements.forEach((item, index) => {
            this.graduationRequirementsIdIndexMap[item.id] = index
        })
        this.state.training_subitems.forEach((item, index) => {
            // 对应table的列数
            this.trainingSubitemsIdIndexMap[item.id] = index + 1
        })
        const tableData = []
        this.state.graduation_requirements.forEach((item, index) => {
            tableData.push([item.content, ...Array(this.state.training_subitems.length)])
        })
        this.state.requirement_support_objectives.forEach(item => {
            tableData[this.graduationRequirementsIdIndexMap[item.graduation_requirement_id]][this.trainingSubitemsIdIndexMap[item.training_subitem_id]]
                = true
        })
        this.setState({ tableData })
    }
    onCellClick = (rowIndex, colIndex, select) => {
        console.log( rowIndex, colIndex, select )
        const ec_graduation_requirement_id = this.state.graduation_requirements[rowIndex].id
        const ec_training_subitem_id = this.state.training_subitems[colIndex - 1].id
        const yearId = this.props.match.params.yearId
        const url = `/ec_years/${yearId}/requirement_support_objectives.json`
        const method = select ? axios.delete : axios.post
        method(url,
            select ? {
                params: {
                    ec_graduation_requirement_id,
                    ec_training_subitem_id
                }
            } : {
                ec_graduation_requirement_id,
                ec_training_subitem_id
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
        const { tableData, training_subitems, graduation_requirements, is_manager } = this.state

        const columns = training_subitems && [['毕业要求', '培养目标'], ...training_subitems.map(item => item.content)]
        const columnIdIndexMap = {}
        console.log(columns, tableData)
	    return (

            <div className="educontent requirementVsObjective" style={{ background: '#fff' }}>
                <ul className="clearfix padding20-30 bor-bottom-greyE backgroundFFF"
                style={{ 'marginBottom': '0px' }} >
                    <li className="fl">
                    <p className="font-18 courseSystem"> 毕业要求对培养目标的支撑 </p>
                    <p>
                        <span className="color-grey-9 mr10">用矩阵图的形式说明本专业毕业要求对培养目标的支撑关系，鼠标左键单击单元格即可</span>
                        <a target="_blank" href={'/forums/3531'} className="color-blue">查看详情</a>
                    </p>

                    </li>
                    <a href={`/api/ec_years/${this.props.yearId}/requirement_support_objectives.xlsx${getRandomNumber()}`} target="_blank"
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
                        onCellClick={this.onCellClick}
                    ></SelectTable>
                </div>
            </div>

	    );
  	}
}

export default (RequirementVsObjective) ;
