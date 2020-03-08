/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-01 09:17:07
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-02 16:33:35
 */
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.snow.css';
import './index.scss';
import React, { useState, useImperativeHandle, useRef, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select } from 'antd';
import { connect } from 'react-redux';
import AddTestDemo from './AddTestDemo';
import QuillEditor from '../../../quillEditor';
import actions from '../../../../../redux/actions';
import CONST from '../../../../../constants';

const {jcLabel} = CONST;
const { Option } = Select;
const FormItem = Form.Item;

const maps = {
  language: [
    { title: 'C', key: 'C' },
    { title: 'C++', key: 'C++' },
    { title: 'Python', key: 'Python' },
    { title: 'Java', key: 'Java' }
  ],
  difficult: [
    { title: '简单', key: '1' },
    { title: '中等', key: '2'},
    { title: '困难', key: '3' }
  ],
  category: [
    { title: '程序设计', key: '1' },
    { title: '算法', key: '2'}
  ],
  openOrNot: [
    { title: '公开', key: '1' },
    { title: '私有', key: '0' }
  ]
}

function EditTab (props, ref) {

  const { 
    form,
    ojForm,
    position, 
    testCases,
    addTestCase,
    deleteTestCase,
    testCasesValidate,
    getFormData
  } = props;

  const { getFieldDecorator } = form;

  const formRef = useRef(null);
  const [description, setDescription] = useState('');

  // 获取表单label
  const myLabel = (name, subTitle) => {
    if (subTitle) {
      return (
        <span className={'label_text'}>
          {name}
          <span className={'label_sub_text'}>
            ({subTitle})
          </span>
        </span>
      )
    } else {
      return (
        <span className={'label_text'}>{name}</span>
      )
    }
  };
  // 获取下拉列表项
  const getOptions = (key) => {
    return maps[key].map((opt, i) => {
      return (
        <Option value={opt.key} key={`opt_${i}`}>{opt.title}</Option>
      );
    });
  };
  // 向外暴露的方法
  useImperativeHandle(ref, () => ({
    validateForm () {
      props.form.validateFields((err, values) => {
        if (!err) {
          getFormData(() => {
            return values; 
          });
        } else {
          return;
        }
      })
    }
  }));
  // 添加测试用例
  const handleAddTest = () => {
    const obj = { // 测试用例参数
      input: '',
      output: '',
      position: position,
      isAdd: true // 新增的测试用例
    }
    const validateObj = { // 测试用例验证参数
      input: {
        validateStatus: '',
        errMsg: ''
      },
      output: {
        validateStatus: '',
        errMsg: ''
      }
    }
    addTestCase({testCase: obj, tcValidate: validateObj});
    // TODO 点击新增时，需要滚到到最底部
    // this.editorRef.current.scrollTop
    // const oDiv = this.editorRef.current;
    // oDiv.scrollTo(oDiv.scrollLeft, 99999);
    // console.log(oDiv.scrollTop);
    // oDiv.scrollTop = 99999;
  }
  // 渲染测试用例
  const renderTestCase = () => {
    return testCases.map((item, i) => {
      return (
        <AddTestDemo
          key={`key_${i}`}
          onSubmitTest={handleSubmitTest} 
          onDeleteTest={handleDeleteTest} 
          testCase={item}
          testCaseValidate={testCasesValidate[i]}
          index={i}
        />
      )
    });
  };
  // 提交测试用例
  const handleSubmitTest = (obj) => {
    console.log('提交的测试用例: ', obj);
  };
  // 删除测试用例
  const handleDeleteTest = (obj) => {
    console.log('删除的测试用例: ', obj);
    deleteTestCase(obj);
  };
  // 描述信息改变时
  const handleChangeDescription = (value) => {
    console.log('描述信息改变: ', value);
    if (value) {
      setDescription(value);
    }
  }

  useEffect(() => {
    if (description) {
      props.form.setFieldsValue({
        description: description
      }, function () {
        console.log('设置成功。。。');
      });
    }
  }, [description]);

  return (
    <div className={'editor_area'}>
      <Form 
        hideRequiredMark={true}
        className={'editor_form'} 
        ref={formRef}>
        <FormItem
          className={`input_area flex_60`}
          label={<span>{myLabel(jcLabel['name'])}</span>}
        >
          {
            getFieldDecorator('name', {
              rules: [
                { required: true, message: '任务名称不能为空' }
              ],
              initialValue: ojForm.name
            })(<Input placeholder="请输入任务名称"/>)
          }
        </FormItem>
        
        <FormItem
          className={`input_area flex_40`}
          label={<span>{myLabel(jcLabel['language'])}</span>}
        >
          {
            getFieldDecorator('language', {
              rules: [
                { required: true, message: '语言不能为空' }
              ],
              initialValue: ojForm.language
            })(
              <Select>
                {getOptions('language')}
              </Select>)
          }
        </FormItem>

        <FormItem
          className={`input_area flex_100`}
          label={<span>{myLabel(jcLabel['description'])}</span>}
        >
          {
            getFieldDecorator('description', {
              rules: [
                { required: true, message: '描述信息不能为空' }
              ],
              initialValue: ojForm.description
            })(<QuillEditor
                style={{ height: '300px' }}
                placeholder="请输入描述信息"
                htmlCtx={ojForm.description}
                onEditorChange={handleChangeDescription}
              />)
          }
        </FormItem>

        <FormItem
          className={`input_area flex_50 flex_50_left`}
          label={<span>{myLabel(jcLabel['difficult'], '任务的难易程度')}</span>}
        >
          {
            getFieldDecorator('difficult', {
              rules: [
                { required: true, message: '难度不能为空' }
              ],
              initialValue: `${ojForm.difficult || ''}`
            })(
              <Select>
                {getOptions('difficult')}
              </Select>
            )
          }
        </FormItem>

        <FormItem
          className={`input_area flex_50 flex_50_right`}
          label={<span>{myLabel(jcLabel['timeLimit'], '程序允许时间限制时长，单位：秒')}</span>}
        >
          {
            getFieldDecorator('timeLimit', {
              rules: [
                { required: true, message: '时间限制不能为空' }
              ],
              initialValue: ojForm.timeLimit
            })(<InputNumber min={0} style={{ width: '100%' }} />)
          }
        </FormItem>

        <FormItem
          className={`input_area flex_50 flex_50_left`}
          label={<span>{myLabel(jcLabel['category'], '任务所属分类')}</span>}
        >
          {
            getFieldDecorator('category', {
              rules: [
                { required: true, message: '任务名称不能为空' }
              ],
              initialValue: `${ojForm.category || ''}`
            })(
              <Select>
                {getOptions('category')}
              </Select>
            )
          }
        </FormItem>

        <FormItem
          className={`input_area flex_50 flex_50_right`}
          label={<span>{myLabel(jcLabel['openOrNot'])}</span>}
        >
          {
            getFieldDecorator('openOrNot', {
              rules: [
                { required: true, message: '任务名称不能为空' }
              ],
              initialValue: `${ojForm.openOrNot}`
            })(
              <Select>
                {getOptions('openOrNot')}
              </Select>
            )
          }
        </FormItem>
      </Form>
      {/* 添加测试用例 */}
      <div className="test_demo_title">
          <h2>测试用例</h2>
          <Button type="primary" onClick={handleAddTest}>添加测试用例</Button>
        </div>
        <div className="test_demo_ctx">
          { renderTestCase() }
        </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const ojFormReducer = state.ojFormReducer;
  const {ojForm, position, testCases, testCasesValidate} = ojFormReducer;
  return {
    ojForm,
    testCases,
    testCasesValidate,
    position
  };
}

const mapDispatchToProps = (dispatch) => ({
  // 新增测试用例
  addTestCase: (value) => dispatch(actions.addTestCase(value)),
  // 删除测试用例
  deleteTestCase: (value) => dispatch(actions.deleteTestCase(value)),
})

// EditTab = React.formRef(EditTab);
// EditTab = React.forwardRef(EditTab);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(
  React.forwardRef(EditTab)
));
