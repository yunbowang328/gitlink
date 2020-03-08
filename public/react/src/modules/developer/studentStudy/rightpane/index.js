/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 14:59:51
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-02 14:23:43
 */
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import MyMonacoEditor from '../../components/myMonacoEditor';
import ControlSetting from '../../components/controlSetting';
import actions from '../../../../redux/actions';
// import QuillForEditor from '../../../../common/quillForEditor';
// import TextArea from 'antd/lib/input/TextArea';
import { Input, Form, Button } from 'antd';
// import FormItem from 'antd/lib/form/FormItem';
const { TextArea } = Input;
const FormItem = Form.Item;
const RightPane = (props) => {
  
  const {
    identifier, 
    submitInput, 
    submitUserCode,
    input,
    hack,
    loading,
    notice,
    updateCode,
    hadCodeUpdate,
    editor_code,
    updateNotice,
    saveUserInputCode,
    restoreInitialCode,
    // saveOpacityType,
    saveUserCodeForInterval,
    addNotes,
    changeLoadingState
  } = props;

  // const [editorCode, setEditorCode] = useState(editor_code || hack.code);
  const [noteClazz, setNoteClazz] = useState('editor_nodte_area');
  const [noteCount] = useState(5000);
  // const [code, setCode] = useState(editor_code || hack.code);
  // let initFlag = true;

  // useEffect(() => {
  //   if (editor_code) {
  //     setEditorCode(editor_code);
  //   } else {
  //     setEditorCode(hack.code);
  //   }
  // }, [hack, editor_code]);

  
  const handleSubmitForm = () => {
    // 提交时， 先调用提交接口，提交成功后，循环调用测评接口
    // saveOpacityType('submit');
    submitUserCode(identifier, submitInput, 'submit');
    // // 提交时，先调用评测接口， 评测通过后才调用保存接口
    // updateCode(identifier, submitInput, 'submit');
  }

  let timer = null; // 定时器
  // 代码块内容变化时
  const handleCodeChange = (value) => {
    // console.log('编辑器代码 ======》》》》》》》》》++++++++++', value);
    saveUserInputCode(value);
    // setEditorCode(value);
    if (!timer) {
      timer = setInterval(function () {
        clearInterval(timer);
        timer = null;
        saveUserCodeForInterval(identifier);
      }, 3000);
    }
  }

  // 代码调试
  const handleDebuggerCode = (value) => {
    // 调用保存代码块接口，成功后，调用调试接口
    // saveOpacityType('debug');
    updateCode(identifier, value, 'debug');
  }
  // 恢复初始代码
  const handleRestoreInitialCode = () => {
    restoreInitialCode(identifier, '恢复初始代码成功');
  }

  // 更新代码
  const handleUpdateNotice = () => {
    updateNotice && updateNotice();
  };

  const handleClickNote = () => {
    setNoteClazz('editor_nodte_area active');
  }

  const handleCancelNote = () => {
    props.form.resetFields();
    setNoteClazz('editor_nodte_area');
  }
 
  const handleSubmitNote = () => {
    props.form.validateFields((err, values) => {
      if (!err) {
        changeLoadingState(true);
        addNotes(identifier, values, function () {
          setNoteClazz('editor_nodte_area');
          props.form.resetFields();
        });
      }
    });
  }

  const { getFieldDecorator } = props.form;
  return (
    <div className={'right_pane_code_wrap'}>

      <MyMonacoEditor
        notice={notice}
        identifier={identifier}
        language={hack.language} 
        code={editor_code || hack.code}
        hadCodeUpdate={hadCodeUpdate}
        onCodeChange={handleCodeChange}
        onUpdateNotice={handleUpdateNotice}
        onRestoreInitialCode={handleRestoreInitialCode}
      />

      <span 
        className="iconfont icon-biji student_notes"
        onClick={handleClickNote}
      ></span>
      
      {/* <div className="student_notes">
        <TextArea rows={5} />
      </div> */}
      <div className={noteClazz}>
        <Form>
          <FormItem>
            {
              getFieldDecorator('notes',{
                rules: [
                  { required: true, message: '笔记不能为空' },
                  { max: noteCount, message: `笔记最大字数为${noteCount}` }
                ],
                initialValue: (hack && hack.notes) || ''
              })(<TextArea
                max={noteCount}
                placeholder="请输入笔记内容"
                rows="5"
              />)
            }
            
          </FormItem>
          <FormItem style={{ textAlign: 'right' }}>
            <Button loading={loading} style={{ marginRight: '10px' }} onClick={handleCancelNote}>取消</Button>
            <Button type="primary" onClick={handleSubmitNote}>提交</Button>
          </FormItem>
        </Form>
      </div>
      
      <ControlSetting 
        identifier={identifier}
        inputValue={input}
        onDebuggerCode={handleDebuggerCode}
        onSubmitForm={handleSubmitForm}/>
    </div>
  );
}

const mapStateToProps = (state) => {

  const {
    user_program_identifier, 
    hack, 
    userTestInput, 
    editor_code, 
    notice,
    hadCodeUpdate
  } = state.ojForUserReducer;
  const {
    loading
  } = state.commonReducer;
  // const { language, code } = hack;
  return {
    hack,
    notice,
    loading,
    hadCodeUpdate,
    editor_code,
    input: userTestInput,
    submitInput: hack.input, 
    identifier: user_program_identifier
  };
}

const mapDispatchToProps = (dispatch) => ({
  // type: 提交类型  debug | submit
  submitUserCode: (identifier, inputValue, type) => dispatch(actions.submitUserCode(identifier, inputValue, type)),
  // 更新代码块内容
  updateCode: (identifier, inputValue, type) => dispatch(actions.updateCode(identifier, inputValue, type)),
  // 保存用户代码块至Reducer中
  saveUserInputCode: (code) => dispatch(actions.saveUserInputCode(code)),
  // 保存用户代码至后台
  saveUserCodeForInterval: (identifier, code) => dispatch(actions.saveUserCodeForInterval(identifier, code)),
  // 恢复初始代码
  restoreInitialCode: (identifier, msg) => dispatch(actions.restoreInitialCode(identifier, msg)),
  // saveOpacityType: (type) => dispatch(actions.saveOpacityType(type))
  // 添加笔记
  addNotes: (identifier, params, cb) => dispatch(actions.addNotes(identifier, params, cb)),
  changeLoadingState: (flag) => dispatch(actions.changeLoadingState(flag))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(RightPane));