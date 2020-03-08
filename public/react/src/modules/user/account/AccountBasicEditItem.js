import React, { Component } from 'react';

import { SnackbarHOC, getImageUrl, City, ConditionToolTip } from 'educoder';
import { Form, Button, Input, Radio, Select, Tooltip, Icon, AutoComplete  } from 'antd'
const RadioGroup = Radio.Group;
const Option = Select.Option;
class AccountBasicEditItem extends Component {
  constructor(props){
    super(props);
  }
  
  render(){
    let { 
      professionalFlag , 
      getFieldDecorator ,
      identity ,
      filterSchoolList ,
      filterDepartments,
      departmentsName,
      school,
      departments,
      department_id
    } = this.props
    return(
      <div>
        <div className="clearfix mt10">
          <Form.Item
            label="职业"
            className="formItemInline fl"
          >
          <ConditionToolTip title={() => (<div><p>已提交职业认证</p><p>可在<a href="/account/certification" className="color-blue">认证信息</a>中通过“重新认证”进行修改</p></div>)} condition= { professionalFlag }>
            {getFieldDecorator('job', {
              rules: [{
                initialValue:"teacher",
                required: true, 
                message: '请先选择职业',
              }],
            })(
              <Select style={{width:"190px",marginRight:"20px"}} onChange={(e)=>this.props.changeJob(e)} disabled={professionalFlag}>
                <Option value="teacher">教师</Option>
                <Option value="student">学生</Option>
                <Option value="professional">专业人士</Option>
              </Select>
            )}
            </ConditionToolTip>
          </Form.Item>
          {
            identity && identity=="student" && 
            <Form.Item
            label=""
            className="formItemInline fl"
            style={{ 'margin-top': '3px'}}
            // style={{display:identity && identity=="student" ? "block":"none"}}
          >
          <ConditionToolTip title={() => (<div><p>已提交职业认证</p><p>可在<a href="/account/certification" className="color-blue">认证信息</a>中通过“重新认证”进行修改</p></div>)} condition= { professionalFlag }>
            {getFieldDecorator('student_No', {
              rules: [{
                required: true, 
                message: '请先输入学号',
              }],
            })(
              <Input type="text" placeholder="请输入学号" style={{width:"190px"}} disabled={professionalFlag}></Input>
            )}
            </ConditionToolTip>
          </Form.Item>
          }
          {
            identity && identity=="teacher" && 
            <Form.Item
              label=""
              className="formItemInline fl"
              // style={{display:identity && identity=="teacher" ? "block":"none"}}
            >
            <ConditionToolTip title={() => (<div><p>已提交职业认证</p><p>可在<a href="/account/certification" className="color-blue">认证信息</a>中通过“重新认证”进行修改</p></div>)} condition= { professionalFlag }>
              {getFieldDecorator('job1', {
                rules: [{
                  initialValue:"教授",
                  required: true, 
                  message: '请先选择职称',
                }],
              })(
                <Select style={{width:"190px"}} disabled={professionalFlag}>
                  <Option value="教授">教授</Option>
                  <Option value="副教授">副教授</Option>
                  <Option value="讲师">讲师</Option>
                  <Option value="助教">助教</Option>
                </Select>
              )}
              </ConditionToolTip>
            </Form.Item>
          }
          {
            identity && identity=="professional" && 
            <Form.Item
              label=""
              className="formItemInline fl mb0"
              // style={{display:identity && identity=="professional" ? "block":"none"}}
            >
              <ConditionToolTip title={() => (<div><p>已提交职业认证</p><p>可在<a href="/account/certification" className="color-blue">认证信息</a>中通过“重新认证”进行修改</p></div>)} condition= { professionalFlag }>
              {getFieldDecorator('job2', {
                rules: [{
                  initialValue:"企业管理者",
                  required: true, 
                  message: '请先选择职称',
                }],
              })(
                <Select style={{width:"190px"}} disabled={professionalFlag}>
                  <Option value="企业管理者">企业管理者</Option>
                  <Option value="部门管理者">部门管理者</Option>
                  <Option value="高级工程师">高级工程师</Option>
                  <Option value="工程师">工程师</Option>
                  <Option value="助理工程师">助理工程师</Option>
                </Select>
              )}
              </ConditionToolTip>
            </Form.Item>
          }
        </div>
        <Form.Item
          label="学校/单位"
          className="formItemInline mb0"
        >
          <ConditionToolTip title={() => (<div><p>已提交职业认证</p><p>可在<a href="/account/certification" className="color-blue">认证信息</a>中通过“重新认证”进行修改</p></div>)} condition= { professionalFlag }>
          {getFieldDecorator('org', {
            rules: [{
              // initialValue: this.state.cityDefaultValue,
              // type: 'array',
              required: true, 
              message: '请先选择学校/单位',

              // 做不了，输入时和submit时都会执行这里
              // validator: (rule, value, callback) => {
              //   if (this.this_school_id) {
              //     callback();
              //     return;
              //   }
              //   callback('请先选择学校/单位');
              // }
              
            }],
          })(
            <AutoComplete width={400} showSearch onSearch={this.props.filterList} onChange={this.props.changeList} disabled={professionalFlag}>
              {
                filterSchoolList && filterSchoolList.map((item,key)=>{
                  return(<Option value={item.name} key={item.id}>{item.name}</Option>)
                })
              }
            </AutoComplete>
          )}
          </ConditionToolTip>
        </Form.Item>
        
          {!filterSchoolList || (filterSchoolList && filterSchoolList.length==0 )&& school &&
            <div style={{marginLeft: '113px',height:"20px",lineHeight:"20px"}}>
              <span>
                <span style={{color: '#CDCDCD'}}>未找到包含“{school}”的高校，</span>
                <span style={{color: '#4CACFF', cursor: 'pointer'}} onClick={this.props.showApplyForAddOrgModal}>申请新增</span>
              </span>
            </div>
          }
        
          <Form.Item
            label="院系/部门"
            className="formItemInline mb0"
            style={{ 'margin-top': '10px'}}
          >
            <ConditionToolTip title={() => (<div><p>已提交职业认证</p><p>可在<a href="/account/certification" className="color-blue">认证信息</a>中通过“重新认证”进行修改</p></div>)} condition= { professionalFlag }>
              {getFieldDecorator('org2', {
                rules: [{
                  // initialValue: this.state.cityDefaultValue,
                  // type: 'array',
                  required: true, 
                  message: '请先选择院系/部门',
                  // validator: (rule, value, callback) => {
                  //   if (this.this_department_id) {
                  //     callback();
                  //     return;
                  //   }
                  //   callback('请先选择院系/部门');
                  // }
                }],
              })(
                <AutoComplete width={400} showSearch onSearch={this.props.searchDepartment} onChange={this.props.changeDepartment} disabled={professionalFlag}>
                  {
                    filterDepartments && filterDepartments.map((item,key)=>{
                      return(
                        <Option value={item.name} key={item.name}>{item.name}</Option>
                      )
                    })
                  }
                </AutoComplete> 
              )}
            </ConditionToolTip>
          </Form.Item>
          {
            filterDepartments != undefined && ( (filterDepartments && filterDepartments.length==0 ) 
                || (departmentsName == '' && ! department_id 
                    && (!departments || departments.length == 0) ))  && 
            <div style={{marginLeft: '113px',height:"20px",lineHeight:"20px"}}>
              <span>
                <span style={{color: '#CDCDCD'}}>{departmentsName ? `未找到包含“${departmentsName}”的院系/部门` : '未找到院系'}，</span>
                <span style={{color: '#4CACFF', cursor: 'pointer'}} onClick={this.props.showApplyForAddChildOrgModal}>申请新增</span>
              </span>
            </div>
          }
      </div>
    )
  }
}
export default AccountBasicEditItem;