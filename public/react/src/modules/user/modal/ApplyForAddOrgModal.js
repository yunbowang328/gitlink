import React, { Component } from "react";
import { Modal, Button, Input, Form, } from "antd";
import axios from 'axios'
import ModalWrapper from "../../courses/common/ModalWrapper"
import { City } from 'educoder'
import '../account/common.css'

const { TextArea } = Input;
const Search = Input.Search
class ApplyForAddOrgModal extends Component{
  constructor(props){
    super(props);
    this.state={
      
    }
  }

  componentDidUpdate=(prevState)=>{
    if(this.props.schoolName && prevState.schoolName != this.props.schoolName){
      this.props.form.setFieldsValue({
        schoolName:this.props.schoolName
      })
    }
  }
  componentDidMount=()=>{
    if(this.props.schoolName){
      this.props.form.setFieldsValue({
        schoolName:this.props.schoolName
      })
    }
  }

  setVisible = (visible) => {
    this.refs.modalWrapper.setVisible(visible)
  }

  onSendOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      if(!err){
        let url=`/add_school_applies.json`;
        axios.post(url,{
          name:values.schoolName,
          province:values.city && values.city[0],
          city:values.city && values.city[1],
          address:values.address,
          remarks:values.remarks
        }).then((result)=>{
          if(result){
            this.props.showNotification("新增学校/单位成功！");
            this.setVisible(false);
            this.props.addOrgSuccess(values.schoolName)

          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    })
  }

  onOk = () => {
    this.onSendOk()
  }

  render(){
    const { course_lists, checkBoxValues, searchValue, loading, hasMore } = this.state
    const { moduleName } = this.props
    const { getFieldDecorator } = this.props.form;
    return(
      <ModalWrapper
        ref="modalWrapper"
        title={`申请添加单位名称`}
        {...this.props }
        onOk={this.onOk}
        okText="保存"
        className="applyForModal courseNormalForm"
      >
        <style>{`
          .applyForModal .ant-form-item-label {
            width: 100px;
            padding-right: 10px;
          }
          .applyForModal .ant-form-item-label label {
            color: #979797
          }
          .applyForModal .formItemInline .ant-form-item-control-wrapper{
            width: 390px;
          }
          .applyForModal .formItemInline .ant-form-item-control .ant-cascader-picker,.applyForModal .formItemInline .ant-cascader-picker-large .ant-input{
            width: 100%;
            height:40px!important;
          }
          .applyForModal .formItemInline .ant-input-lg{
            font-size:14px!important;
          }
          .explain .ant-form-explain{
            top:36px;
          }

          .addOrg ul.ant-cascader-menu {
              width: 196px;
          }
        `}</style>
        <Form onSubmit={this.onOk} className="">
          <Form.Item
            label="单位全称："
            className="mt15 formItemInline explain"
          >
            {getFieldDecorator('schoolName', {
              rules: [{
                // initialValue: this.state.cityDefaultValue,
                required: true, 
                message: '请输入学校或工作单位',
              }],
            })(
              <Input placeholder="学校或工作单位" className="validateInput"></Input>
            )}
            <div className="df mt18">
              <li style={{lineHeight:"22px"}}>示例：</li>
              <ul style={{lineHeight:"22px"}}>
                <li>
                  <i className="iconfont icon-chenggong color-green-light font-14 ml2 mr5 fl"></i>
                  <span> 国防科学技术大学</span>
                </li>
                <li>
                  <i className="iconfont icon-htmal5icon19 font-18 fl mr4" style={{color:"#FF9348"}}></i>
                  <span> 国防科学技术大学开福校区</span>
                </li>
              </ul>
            </div>
          </Form.Item>
          
          <Form.Item
            label="地区："
            className="mt15 formItemInline hideRequireTag"
          >
            {getFieldDecorator('city', {
              rules: [],
            })(
              <City matchInputWidth={true} popupClassName={"addOrg"}></City>
            )}
          </Form.Item>

          <Form.Item
            label="详细地址："
            className="mt15 formItemInline hideRequireTag"
          >
            {getFieldDecorator('address', {
              rules: [],
            })(
              <Input placeholder="请填写完整的地址信息" className="validateInput"></Input>
            )}
          </Form.Item>

          <Form.Item
            label="说明："
            className="mt15 formItemInline hideRequireTag"
          >
            {getFieldDecorator('remarks', {
            })(
              <TextArea placeholder="再次说明特别情况（选填）" className="validateInput"></TextArea>
            )}
          </Form.Item>

        </Form>
        

      </ModalWrapper>
    )
  }
}
const WrappedApplyForAddOrgModal = Form.create({ name: 'ApplyForAddOrgModal' })(ApplyForAddOrgModal);

export default WrappedApplyForAddOrgModal;


