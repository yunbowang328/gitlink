/*
 * @Description: 添加测试用例
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-21 09:19:38
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-27 10:37:41
 */
import './index.scss';
import React from 'react';
import { Collapse, Icon, Input, Form } from 'antd';
import { connect } from 'react-redux';
import actions from '../../../../../redux/actions';
import { CNotificationHOC} from 'educoder';
const { Panel } = Collapse;
const { TextArea } = Input;
const FormItem = Form.Item;
const AddTestDemo = (props) => {
  const {
    // key,
    // onSubmitTest,
    onDeleteTest, 
    testCase,
    testCaseValidate,
    isOpen
  } = props;

  // const [isEditor, setIsEditor] = useState(false); // 是否是编辑
  
  // 删除操作
  const handleDeletePanel = (e) => {
    // console.log('点击的删除按钮')
    e.preventDefault();
    e.stopPropagation();
    props.confirm({
      title: '提示',
      content: '确定要删除当前测试用例吗?',
      onOk() {
        onDeleteTest(testCase);
      }
    });
    // Modal.confirm({
    //   title: '删除',
    //   content: '确定要删除当前测试用例吗?',
    //   okText: '确定',
    //   cancelText: '取消',
    //   onOk() {
    //     onDeleteTest(testCase);
    //   }
    // })
  }

  // 输入框值改变时
  const handleInputChange = (e) => {
    const { index, testCaseInputChange } = props;
    const value = e.target.value;
    testCaseInputChange(value, index);
  }

  // 输出值改变时
  const handleOutputChange = (e) => {
    const { index, testCaseOutputChange } = props;
    const value = e.target.value;
    testCaseOutputChange(value, index);
  }
  
  // 右侧删除图标
  const genExtra = () => (
    <Icon
      type="close"
      className="collapse_close_icon"
      onClick={handleDeletePanel}
    />
  )

  // 取消操作
  // const handleReset = (e) => {
  //   e.preventDefault();
  //   props.form.resetFields();
  // }

  // 保存
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   props.form.validateFields((err, values) => {
  //     if (err) {
  //       return;
  //     }
  //     console.log('提交表单: ', values);
  //     onSubmitTest(values);
  //   });
  // }
  // 编辑后保存
  // const handleEditorOrSave = (e) => {
  //   if (!isEditor) {
  //     setIsEditor(true);
  //   } else {
  //     // TODO 调用修改测试用例接口
  //     setIsEditor(false); // 保存后 设置 false
  //   }
  // }

  // 渲染提交按钮
  // const renderSubmitBtn = () => {
  //   const { identifier, testCase, loading } = props;
  //   // console.log('========', identifier);
  //   // 1. 新增时，不显示按钮
  //   if (identifier) {
  //     if (testCase.isAdd) {
  //       return (
  //         <FormItem style={{ textAlign: 'right' }}>
  //           <Button style={{ marginRight: '20px' }} onClick={handleReset}>取消</Button>
  //           <Button type="primary" onClick={handleSubmit}>保存</Button>
  //         </FormItem>
  //       );
  //     } else {
  //       return (
  //         <FormItem style={{ textAlign: 'right' }}>
  //           <Button onClick={handleEditorOrSave} loading={loading}>{isEditor ? '保存' : (loading ? '保存' : '编辑')}</Button>
  //         </FormItem>
  //       );
  //     }
  //   }
  // }

  /**
   * 文本输入框可编辑的情况
   *  1. 新增时
   *  2. isAdd 为 false 且 isEditor 为true 时
   * @param {*} testCase 
   */
  // const isDisabled = (testCase) => {
  //   return !testCase.isAdd && !isEditor;
  // };

  // const {input = {}, output = {}} = (testCasesValidate[index] = {});
  // const activePane = {
  //   defaultActiveKey: [isOpen ? '1' : '']
  // };
  // console.log(activePane);
  
  // 切换手风琴
  const handleChangeCollapse = () => {
    const {index, updateOpenTestCaseIndex} = props;
    updateOpenTestCaseIndex(index);
  }
  
  return (
    <Collapse className={'collapse_area'} activeKey={isOpen?'1':''} onChange={() => handleChangeCollapse()}>
      <Panel header={`测试用例${props.index + 1}`} extra={genExtra()} key="1">
        <Form>
          <FormItem
            label={<span className={'label_text'}>输入</span>}
            validateStatus={testCaseValidate.input.validateStatus}
            help={testCaseValidate.input.errMsg}
            colon={ false }
          >
            <TextArea
              rows={5}
              value={testCase.input}
              onChange={handleInputChange}
              // disabled={isDisabled(testCase)}
            />
          </FormItem>
          <FormItem
            label={<span className={'label_text'}>输出</span>}
            validateStatus={testCaseValidate.output.validateStatus}
            help={testCaseValidate.output.errMsg}
            colon={ false }
          >
            <TextArea
              rows={5}
              value={testCase.output}
              onChange={handleOutputChange}
              // disabled={isDisabled(testCase)}
            />
          </FormItem>
          {/* {renderSubmitBtn()} */}
        </Form>
      </Panel>
    </Collapse>
  );
}

const mapStateToProps = (state) => {
  const {identifier, loading} = state.ojFormReducer;
  // console.log(state.ojFormReducer);
  return {
    identifier,
    loading,
  }
};

const mapDispatchToProps = (dispatch) => ({
  testCaseOutputChange: (value, index) => dispatch(actions.testCaseOutputChange(value, index)),
  testCaseInputChange: (value, index) => dispatch(actions.testCaseInputChange(value, index)),
  updateOpenTestCaseIndex: (index) => dispatch(actions.updateOpenTestCaseIndex(index)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(CNotificationHOC()(AddTestDemo)));
