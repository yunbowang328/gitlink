import React, { Component } from "react";
import { Modal, Button, Input, Form, } from "antd";
import axios from 'axios'
import ModalWrapper from "../../courses/common/ModalWrapper"
import { City } from 'educoder'
import '../account/common.css'

const { TextArea } = Input;

class ApplyForAddChildOrgModal extends Component{
  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentDidUpdate=(prevState)=>{
    if(prevState.departmentName != this.props.departmentName){
      this.setValue(this.props.departmentName)
    }
  }
  componentDidMount=()=>{
    if(this.props.departmentName){
      this.setValue(this.props.departmentName)
    }
  }

  setValue=(name)=>{
    this.props.form.setFieldsValue({
      depart:name
    })
  }

  setVisible = (visible) => {
    this.refs.modalWrapper.setVisible(visible)
  }

  onSendOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if(!err){
        let{schoolId,departmentName}=this.props
        let url=`/add_department_applies.json`;
        axios.post(url,{
          name: values.depart,
          school_id: schoolId,
          remarks: values.desc
        }).then((result)=>{
          if(result){
            this.props.showNotification("新增院系/部门成功！");
            this.props.addChildOrgSuccess(values.depart)

            this.setVisible(false);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    })
  }

  onOk = () => {
    const { course_lists, checkBoxValues } = this.state
    this.onSendOk()
  }

  render(){
    const { course_lists, checkBoxValues, searchValue, loading, hasMore } = this.state
    const { moduleName } = this.props
    const { getFieldDecorator } = this.props.form;
    return(
      <ModalWrapper
        ref="modalWrapper"
        title={`申请添加子单位名称`}
        {...this.props }
        onOk={this.onOk}
        okText="保存"
        className="applyForModal courseNormalForm styleForapply"
      >
        <style>{`
          .applyForModal .ant-form-item-label {
            width: 100px;
            padding-right: 10px;
          }
          .applyForModal .ant-form-item-label label {
            color: #979797
          }
          .styleForapply .formItemInline .ant-form-item-control-wrapper {
            width: 390px;
          }
        `}</style>
        <Form className="">
          <Form.Item
            label="单位名称："
            className="mt15 formItemInline hideRequireTag"
          >
            {this.props.schoolName}
          </Form.Item>
          
          <Form.Item
            label="部门名称："
            className="mt15 formItemInline"
          >
            {getFieldDecorator('depart', {
              rules: [{
                // initialValue: this.state.cityDefaultValue,
                required: true, 
                message: '请输入部门名称',
              }],
            })(
              <Input placeholder="请输入部门或者学院名称" ></Input>
            )}
          </Form.Item>

          <Form.Item
            label="说明："
            className="mt15 formItemInline hideRequireTag"
          >
            {getFieldDecorator('desc', {
            })(
              <TextArea placeholder="再次说明特别情况（选填）" className="validateInput"></TextArea>
            )}
          </Form.Item>

        </Form>
        

      </ModalWrapper>
    )
  }
}
const WrappedApplyForAddChildOrgModal = Form.create({ name: 'ApplyForAddChildOrgModal' })(ApplyForAddChildOrgModal);

export default WrappedApplyForAddChildOrgModal;


