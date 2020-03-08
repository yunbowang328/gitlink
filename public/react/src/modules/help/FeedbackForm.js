import React from 'react';
import { Form, Input, Radio, Button } from "antd";
import axios from 'axios';

const { TextArea } = Input;

class FeedbackForm extends React.Component {
  constructor (props) {
    super(props);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if(err){ return }

      axios.post("/helps/feedback.json", fieldsValue)
        .then((result) => {
          if (result.status === 200 && result.data.status === 0) {
            this.props.history.push(`/messages/${this.props.current_user.login}/message_detail?target_ids=1`);
          }
        }).catch((error) => {
          console.log(error)
        })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="feedback-form">
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="问题分类">
            {getFieldDecorator('question_kind', {
              initialValue: "登录注册",
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(
              <Radio.Group>
                <Radio value="登录注册">登录注册</Radio>
                <Radio value="信息认证">信息认证</Radio>
                <Radio value="实训编程">实训编程</Radio>
                <Radio value="实训课程">实训课程</Radio>
                <Radio value="课堂">课堂</Radio>
                <Radio value="其它">其它</Radio>
              </Radio.Group>
            )}
          </Form.Item>

          <Form.Item label="问题页面网址">
            {getFieldDecorator('url', {
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<Input placeholder="反馈平台问题，请同时填写对应的问题页面链接，以便平台能够及时跟踪解决，谢谢" />)}
          </Form.Item>

          <Form.Item label="问题描述">
            {getFieldDecorator('description', {
              rules: [
                {
                  required: true,
                  message: '不能为空',
                },
              ],
            })(<TextArea rows={4} placeholder="反馈平台问题，请同时填写对应的问题页面链接，以便平台能够及时跟踪解决，谢谢" />)}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default FeedbackForm;