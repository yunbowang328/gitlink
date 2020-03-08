import React, { Component } from 'react';

import { SnackbarHOC, getImageUrl, City } from 'educoder';
import { Form, Button, Input, Radio, Select, Tooltip, Icon  } from 'antd'
import './common.css'
import { getHiddenName } from './AccountBasicEdit'

const RadioGroup = Radio.Group;
const Option = Select.Option
const radioOptions = [
  { label: '男', value: 'boy' },
  { label: '女', value: 'girl' },
];
export const identityMap={"teacher":"教师", "student":"学生", "professional":"专业人士"}
class AccountBasicEdit extends Component {
  constructor(props){
    super(props);

  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {basicInfo} =this.props
    const showRealName = false;
    return (
      <div>
        <div className="basicForm">
          <style>{`
            .formItemInline {    
              display: flex;
            }
            .formItemInline .ant-form-item-control-wrapper {
              display: inline-block;
            }
              .basicForm .title {
                font-size: 16px;
                padding-left: 30px;
                margin-bottom: 10px;
              }
            .basicForm .ant-form-item-label {
              width: 100px;
              padding-right: 10px;
            }
              .basicForm .ant-form-item-label label {
                color: #979797
              }
            .basicForm .display {
              margin: 0
            }
            .titleWrap {
              display: flex;
              justify-content: space-between;
            }
          `}</style>
          <div className="titleWrap">
            <div className="title">基本信息</div>
            <Button type="primary" style={{  marginRight: '16px'}}
              ghost onClick={() => this.props.history.push('/account/profile/edit')}>修改</Button>
          </div>

          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              label="昵称"
              className="display formItemInline"
            >
              {basicInfo && basicInfo.nickname}
            </Form.Item>

            <Form.Item
              label="姓名"
              className="display formItemInline"
            >
              {basicInfo && (basicInfo.show_realname == true ? basicInfo.name : getHiddenName(basicInfo.name))}
            </Form.Item>

            <Form.Item
              label="性别"
              className="display formItemInline"
            >
              {basicInfo && basicInfo.gender == 0?"男":"女"}
            </Form.Item>


            <Form.Item
              label="所在地"
              className="display formItemInline"
            >
              {basicInfo && basicInfo.location}　{basicInfo && basicInfo.location_city}
            </Form.Item>

            <Form.Item
              label="职业"
              className="display formItemInline"
            >
              { basicInfo && basicInfo.identity && identityMap[basicInfo.identity] }　{basicInfo && ( basicInfo.technical_title || basicInfo.student_id)}
            </Form.Item>

            <Form.Item
              label="学校/单位"
              className="display formItemInline mb0"
            >
              {basicInfo && basicInfo.school_name}
            </Form.Item>

            <Form.Item
              label="院系/部门"
              className="display formItemInline mb0"
            >
              {basicInfo && basicInfo.department_name}
            </Form.Item>
          </Form>
          </div>
          <div style={{color: '#989898', marginLeft: '20px'}}>* 我们确保你所提供的信息均处于严格保密状态，不会泄露</div>
      </div>
    );
  }
}
const WrappedAccountBasicEdit = Form.create({ name: 'AccountBasicEdit' })(AccountBasicEdit);

export default WrappedAccountBasicEdit;
