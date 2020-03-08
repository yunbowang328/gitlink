import React, { Component } from 'react';

import moment from 'moment'

import EditableCourseSupportSetting from './EditableCourseSupportSetting'
import { Form, Input, Icon, Button, Select } from 'antd';

const { Option } = Select;


const data = [
    {
        id: 0,
        ecPosition: 1,
        target_weight: 0.1,
        target_contents: '理解数据管理技术和数据库技术的发展，区分不同数据模型的作用和特点，描述数据库系统的类型、结构、数据独立性。',
        standard_grade: 60,
        subitem_contents: '<label>1-2</label>：能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题'
    },
    {
        id: 1,
        ecPosition: 2,
        target_weight: 0.1,
        target_contents: '理解数据管理技术和数据库技术的发展，区分不同数据模型的作用和特点，描述数据库系统的类型、结构、数据独立性。',
        standard_grade: 60,
        subitem_contents: '<label>1-2</label>：能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题'
    }
]
class ShowTableCourseSupportSetting extends Component {
  componentDidMount = () => {
    const course_targets = this.props.course_targets;
  }
  
  render() {
    const course_targets = this.props.course_targets;
    const is_manager = this.props.year && this.props.year.can_manager;
    return (
        <div className="ListTableLine" id="show-Target-table">
            <p className="clearfix">
                <span className="column-1">项</span>
                <span className="column-1">权重</span>
                <span className="column-3">课程目标内容</span>
                <span className="column-2 edu-txt-center">达成标准(分)</span>
                <span className="column-3">对应毕业要求指标点</span>
                <span className="column-1 edu-txt-right">
                    {/* <a href="javascript:void(0)" className="color-green show-FillTable" data-tip-down="添加">
                        <i className="iconfont icon-tianjiafangda"></i>
                    </a> */}

                    { is_manager && <a href="javascript:void(0)" 
                        onClick={() => { this.props.setEditableMode(true)} }
                        class="color-green EditCourse" data-id="5" data-tip-down="编辑">
                        <i class="iconfont icon-bianjidaibeijing"></i>
                    </a> }
                </span>
            </p>
            <div id="course_targets_list">
                { course_targets.map((item, index) => {
                    return ( <li className="clearfix" key={index}>
                        <span className="column-1">{ index + 1 }</span>
                        <span className="column-1">{ item.target_weight}</span>
                        <span className="column-3">{ item.target_contents}</span>
                        <span className="column-2 edu-txt-center">{ item.standard_grade }</span>
                        <span className="column-3">
                            <input type="hidden" value="70"></input>
                            {/* { item.subitem_id } */}
                            {item.index} : {item.subitem_contents}
                        </span>
                        {/* <span className="column-1 edu-txt-right">
                            <a href="javascript:void(0)" onclick="delete_confirm_box_2('/ec_course_targets/26', '确定要删除该课程目标吗')" className="color-grey-c mr15" data-tip-down="删除"><i className="iconfont icon-shanchu font-15"></i></a>
                            <a href="javascript:void(0)" className="color-green EditCourse" data-id="26" data-tip-down="编辑"><i className="iconfont icon-bianjidaibeijing"></i></a>
                        </span> */}
                    </li> )
                })}
                {/* <li className="clearfix">
                    <span className="column-1">1</span>
                    <span className="column-1">0.1</span>
                    <span className="column-3">理解数据管理技术和数据库技术的发展，区分不同数据模型的作用和特点，描述数据库系统的类型、结构、数据独立性。</span>
                    <span className="column-2 edu-txt-center">75</span>
                    <span className="column-3">
                        <input type="hidden" value="70"></input>
                        <label>1-2</label>：能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题
                    </span>
                    <span className="column-1 edu-txt-right">
                    <a href="javascript:void(0)" onclick="delete_confirm_box_2('/ec_course_targets/26', '确定要删除该课程目标吗')" className="color-grey-c mr15" data-tip-down="删除"><i className="iconfont icon-shanchu font-15"></i></a>
                    <a href="javascript:void(0)" className="color-green EditCourse" data-id="26" data-tip-down="编辑"><i className="iconfont icon-bianjidaibeijing"></i></a>
                    </span>
                </li>
                <li className="clearfix">
                    <span className="column-1">2</span>
                    <span className="column-1">0.1</span>
                    <span className="column-3">理解数据库系统管理和保护的基本概念和技术、应用系统提供的数据库管理方法和保护功能。</span>
                    <span className="column-2 edu-txt-center">75</span>
                    <span className="column-3">
                        <input type="hidden" value="70"></input>
                        <label>1-2</label>：能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题
                    </span>
                    <span className="column-1 edu-txt-right">
                    <a href="javascript:void(0)" onclick="delete_confirm_box_2('/ec_course_targets/27', '确定要删除该课程目标吗')" className="color-grey-c mr15" data-tip-down="删除"><i className="iconfont icon-shanchu font-15"></i></a>
                    <a href="javascript:void(0)" className="color-green EditCourse" data-id="27" data-tip-down="编辑"><i className="iconfont icon-bianjidaibeijing"></i></a>
                    </span>
                </li>
                <li className="clearfix">
                    <span className="column-1">3</span>
                    <span className="column-1">0.1</span>
                    <span className="column-3">理解关系模型的概念和特点，应用关系代数表达式描述数据的查询操作。</span>
                    <span className="column-2 edu-txt-center">75</span>
                    <span className="column-3">
                        <input type="hidden" value="70"></input>
                        <label>1-2</label>：能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题
                    </span>
                    <span className="column-1 edu-txt-right">
                    <a href="javascript:void(0)" onclick="delete_confirm_box_2('/ec_course_targets/28', '确定要删除该课程目标吗')" className="color-grey-c mr15" data-tip-down="删除"><i className="iconfont icon-shanchu font-15"></i></a>
                    <a href="javascript:void(0)" className="color-green EditCourse" data-id="28" data-tip-down="编辑"><i className="iconfont icon-bianjidaibeijing"></i></a>
                    </span>
                </li>
                <li className="clearfix">
                    <span className="column-1">4</span>
                    <span className="column-1">0.35</span>
                    <span className="column-3">安装、配置和选择主流的数据库管理系统，运用SQL语言实施数据库解决方案，包括数据定义、数据更新和数据查询等。</span>
                    <span className="column-2 edu-txt-center">75</span>
                    <span className="column-3">
                        <input type="hidden" value="84"></input>
                        <label>5-1</label>：能够选择、使用或开发恰当的技术、资源和工具
                    </span>
                    <span className="column-1 edu-txt-right">
                    <a href="javascript:void(0)" onclick="delete_confirm_box_2('/ec_course_targets/29', '确定要删除该课程目标吗')" className="color-grey-c mr15" data-tip-down="删除"><i className="iconfont icon-shanchu font-15"></i></a>
                    <a href="javascript:void(0)" className="color-green EditCourse" data-id="29" data-tip-down="编辑"><i className="iconfont icon-bianjidaibeijing"></i></a>
                    </span>
                </li>
                <li className="clearfix">
                    <span className="column-1">5</span>
                    <span className="column-1">0.35</span>
                    <span className="column-3">针对计算机工程问题，综合运用数据库设计知识，设计规范的数据库解决方案。</span>
                    <span className="column-2 edu-txt-center">75</span>
                    <span className="column-3">
                        <input type="hidden" value="76"></input>
                        <label>3-1</label>：能够分析材料应用的特定需求确定具体的研发目标
                    </span>
                    <span className="column-1 edu-txt-right">
                    <a href="javascript:void(0)" onclick="delete_confirm_box_2('/ec_course_targets/30', '确定要删除该课程目标吗')" className="color-grey-c mr15" data-tip-down="删除"><i className="iconfont icon-shanchu font-15"></i></a>
                    <a href="javascript:void(0)" className="color-green EditCourse" data-id="30" data-tip-down="编辑"><i className="iconfont icon-bianjidaibeijing"></i></a>
                    </span>
                </li> */}
            </div>
        </div>
    );
  }
}
export default ShowTableCourseSupportSetting;
