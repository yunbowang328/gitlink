/*
 * @Description: 评论表单
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-17 17:32:55
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-06 18:42:09
 */
import './index.scss';
import React, { useState } from 'react';
import { Form, Button, Input } from 'antd';
import QuillForEditor from '../../quillForEditor';
// import { QuillDeltaToHtmlConverter } from 'quill-delta-to-html'
// import {formatDelta} from './util';
const FormItem = Form.Item;

function CommentForm (props) {

  const {
    onCancel,
    onSubmit, 
    form,
    type
  } = props;

  const { getFieldDecorator } = form;
  const [ctx, setCtx] = useState('');
  const [focus, setFocus] = useState(false);

  const options = [
    // ['bold', 'italic', 'underline'],
    // [{header: [1,2,3,false]}],
    'code-block',
    'link',
    'image',
    'formula'
  ];
  // const { form: { getFieldDecorator } } = props;
  const [showQuill, setShowQuill] = useState(false);
  // 点击输入框
  const handleInputClick = (type) => {
    setShowQuill(true);
    setFocus(true);
  }
  // 取消
  const handleCancle = () => {
    setShowQuill(false);
    setCtx('');
    props.form.resetFields();
    onCancel && onCancel(); 
  }

  // 编辑器内容变化时
  const handleContentChange = (content) => {
    console.log('编辑器内容', content);
    setCtx(content);
    try {
      // const _html = new QuillDeltaToHtmlConverter(content.ops, {}).convert();
      // props.form.setFieldsValue({'comment': _html.replace(/<\/?[^>]*>/g, '')});
      props.form.setFieldsValue({'comment': content});
    } catch (error) {
      console.log(error);
    }
  }
  // 发送
  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setShowQuill(false);
        const content = ctx;
        props.form.setFieldsValue({'comment': ''});
        setCtx('');
        // const _html = formatDelta(content.ops);
        // console.log('保存的内容=====》》》》', content);
        onSubmit && onSubmit(JSON.stringify(content));
      }
    });
  }

  const handleShowImage = (url) => {
    alert(url);
  }

  // const _clazz = type === 'bottom' ? 'comment_form_bottom_area' : 'comment_form_area';
  let _clazz;
  if (type === 'bottom') {
    _clazz = showQuill ? 'comment_form_bottom_area active' : 'comment_form_bottom_area';
  } else {
    _clazz = 'comment_form_area';
  }
  return (
    <Form className={_clazz}>
      <FormItem>
        {
          getFieldDecorator('comment', {
            rules: [
              { required: true, message: '评论内容不能为空'}
            ],
          })(
            <Input 
              onClick={() => handleInputClick(type)}
              placeholder="说点儿什么~"
              className={showQuill ? '' : 'show_input'}
              style={{
                height: showQuill ? '0px' : '40px',
                overflow: showQuill ? 'hidden' : 'auto',
                opacity: showQuill ? 0 : 1,
              }}
            />
          )
        }
        
        <QuillForEditor
          imgAttrs={{width: '60px', height: '30px'}}
          wrapStyle={{
            height: showQuill ? 'auto' : '0px',
            opacity: showQuill ? 1 : 0,
            overflow: showQuill ? 'none' : 'hidden',
            transition: 'all 0.3s'
          }}
          autoFocus={focus}
          style={{ height: '150px' }}
          placeholder="说点儿什么~"
          options={options}
          value={ctx}
          showUploadImage={handleShowImage}
          onContentChange={handleContentChange}
        />
      </FormItem>
      <FormItem style={{ textAlign: 'right', display: showQuill ? 'block' : 'none' }}>
        <Button onClick={handleCancle}>取消</Button>
        <Button onClick={handleSubmit} type="primary" style={{ marginLeft: '10px'}}>发送</Button>
      </FormItem>
    </Form>
  );
}

export default Form.create()(CommentForm);
