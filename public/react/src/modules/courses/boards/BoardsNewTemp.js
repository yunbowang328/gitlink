import React,{ Component } from "react";

import {
  Form, Input, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate, Checkbox,
  Row, Col, Select
} from 'antd';
const $ = window.$
const { Option } = Select;

// 红点在输入框前面的版本
// https://lanhuapp.com/web/#/item/project/board/detail?pid=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&project_id=a3bcd4b1-99ce-4e43-8ead-5b8b0a410807&image_id=71072679-b925-4824-aceb-4649535e3652
class BoardsNew extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      } else {
        $("html").animate({ scrollTop: $('html').scrollTop() - 100 })
      }
    });
  }
  render() {
    let { addGroup } = this.state;
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        // sm: { span: 8 },
        sm: { span: 24 },
      },
      wrapperCol: {
        xs: { span: 24 },
        // sm: { span: 16 },
        sm: { span: 24 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };


    return(
        <div className="newMain ">
          <style>{`
            .edu-class-container {
              width: 1200px;
              margin: 10px auto 20px;
            }
            
            /* form 样式 ---------------------------------------------  */
            /* 不知道被哪个样式影响，这里需要重置 */
            .ant-input:focus {
                border-color: #40a9ff;
            }
            @media (min-width: 576px) {
              .ant-col-sm-24 {
                text-align: left;
              }
            }
            .ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-24 {
              margin-left: 2px;
            }
            /*必填*/ 
            .ant-form-item-required::before {
              display: none;
            }
            .ant-form-item-control-wrapper.ant-col-xs-24.ant-col-sm-24::before {
              display: inline-block;
              margin-right: 8px;
              color: #f5222d;
              font-size: 14px;
              font-family: SimSun, sans-serif;
              line-height: 1;
              content: '*';
            }
            .ant-form-item-control {
              display: inline-block;
            }
            /* form 样式 ---------------------------------------------  */


            .topicTitle.ant-form-item {
              margin-bottom: 8px;
            }
            
            /* errorInline ----------- */
            /* 这里需要指定form组件的宽度 style={{ width: 270 }} */ 
            .errorInline .ant-form-item-children input {
              width: auto
            }
            .errorInline .ant-form-explain {
              display: inline;
              margin-left: 10px;
            }
            /* errorInline ----------- */
          `}</style>
          <div className="edu-class-container edu-position">
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
              <Form.Item
                label="E-mail"
                className="topicTitle errorInline"
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'The input is not valid E-mail!',
                  }, {
                    required: true, message: 'Please input your E-mail!',
                  }],
                })(
                  <Input style={{ width: 270 }} />
                )}
              </Form.Item>

              <Form.Item
                label=""
              >
                {getFieldDecorator('prefix', {
                  initialValue: '86',
                })(
                  <Select style={{ width: 270 }}>
                    <Option value="86">+86</Option>
                    <Option value="87">+87</Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item
                label="Password"
              >
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Please input your password!',
                  }, {
                    validator: this.validateToNextPassword,
                  }],
                })(
                  <Input type="password" />
                )}
              </Form.Item>
              <Form.Item
                label="Confirm Password"
              >
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Please confirm your password!',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input type="password" onBlur={this.handleConfirmBlur} />
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">Register</Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )
    }
}
const WrappedBoardsNew = Form.create({ name: 'boardsNew' })(BoardsNew);
export default WrappedBoardsNew;