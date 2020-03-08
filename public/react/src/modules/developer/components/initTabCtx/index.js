/*
 * @Description: 自定义测试化用例
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 19:46:14
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-26 20:07:35
 */
import './index.scss';
import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Form, Input} from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

/**
 * @description 初始化测试用例: 当有inputValue值时, 显示表单输入框，否则显示文本提示信息
 * @param {*} props
 *  props: {
 *    inputValue: '' // 初始值
 *    onDebuggerCode: func // 点击调试代码执行函数
 * }
 */
function InitTabCtx (props, ref) {
  // useImperativeHandle // 让子组件只暴露一定的api给父组件
  const tabRef = useRef(null);

  const { inputValue, onDebuggerCode } = props;

  // console.log('default value', inputValue);
  useImperativeHandle(ref, () => ({
    handleTestCodeFormSubmit: (cb) => {
      // console.log('父组件调用我啦~~~~~~~~~');
      _handleTestCodeFormSubmit(cb);
    }
  }));

  // useEffect(() => {
  //   console.log('初始值: ========', props);
  // }, [props]);

  // 渲染文本提示信息
  const renderText = () => (<span className={'ctx_default'}>请在这里添加测试用例，点击“调试代码”时将从这里读取输入来测试你的代码...</span>);
  // 渲染表单信息
  const renderForm = () => {
    const {form: { getFieldDecorator } } = props;
    return (
      <Form className={'user_case_form'}>
        <FormItem
          className={'input_area flex_l'}
        >
          {
            getFieldDecorator('input', {
              rules: [
                { required: true, message: '输入值不能为空'}
              ],
              initialValue: inputValue
            })(<TextArea 
                className="input_textarea_style"
                rows={8}
                placeholder="请填写测试用例的输入值，点击“调试代码”"
              />)
          }
        </FormItem>
      </Form>
    )
  }
  // 初始渲染内容
  const [renderCtx, setRenderCtx] = useState(() => {
    return function () {
      return renderText();
    };
  });

  // 输入值变化时更新渲染内容
  useEffect(() => {
    setRenderCtx(() => {
      return renderForm;
    });
  }, [inputValue]);

  const _handleTestCodeFormSubmit = (cb) => {
    const {form} = props;
    form.validateFields((err, values) => {
      if (!err) { // 表单验证通过时，调用测试接口
        cb && cb(); // 调用回调函数，切换 tab
        onDebuggerCode && onDebuggerCode(values);
      }
    });
  }

  return(
    <div ref={tabRef}>
      {renderCtx()}
    </div>
  )
}

export default Form.create()(forwardRef(InitTabCtx));


