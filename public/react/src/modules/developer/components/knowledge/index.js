/*
 * @Description: 知识点
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-30 13:51:19
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-07 15:46:24
 */
import './index.scss';
import React, { useState, useEffect } from 'react';
import { Select, notification, Modal, Form, Input, Button } from 'antd';

const { Option } = Select;

function KnowLedge (props) {

  const {
    options = [], // 下拉选项
    values = [], // 已选择的下拉项
    onChange, // 获取选择的值
    form,
    showAdd, // 显示新增图标
    addKnowledge // 调用新增知识点接口
  } = props;

  useEffect(() => {
    const _options = [];
    const _selects = [];
    options.forEach(opt => {
      if (!values.includes(opt.id)) {
        _options.push(opt);
      } else {
        _selects.push(opt);
      }
    });
    setSelectOptions(_options || []);
    setSelectValue(_selects || []);
  }, [props]);

  // 显示的下拉项
  const [selectOptions, setSelectOptions] = useState(options);
  // 已选择的下拉项
  const [selectValue, setSelectValue] = useState([]);
  const [visible, setVisible] = useState(false);
  //
  const [value] = useState([]);

  const { getFieldDecorator } = form;
  const FormItem = Form.Item;
  // 渲染下拉选项
  const renderOptions = (options = []) => {
    return options.map((opt, i) => (
      <Option key={`opt_${i}`} value={`${opt.id}`}>{opt.name}</Option>
    ));
  }
  // 过滤下拉列表项
  const handleSelectChange = (value) => {
    // value = +value.join('');
    value = +value;
    const tempArr = [...selectValue];
    const _result = selectOptions.filter(item => {
      if (item.id === value && tempArr.findIndex(t => t.id === value) === -1) {
        tempArr.push(item);
      }
      return item.id !== value;
    });
    if (tempArr.length > 5) {
      notification.warning({
        message: '提示',
        description: '知识点不能超过5个'
      });
      return;
    }
    setSelectValue(tempArr);
    setSelectOptions(_result);
    // 将选择值返回
    onChange && onChange(tempArr);
  }

  // 删除
  const handleRemoveResult = (item) => {
    // console.log('点击了删除按钮===>>>>', item);
    // 将删除的值重新加入到列表中
    const tempOptions = [...selectOptions];
    const tempValue = selectValue.filter(t => t.id !== item.id);
    // console.log(selectValue);
    tempOptions.push(item);
    setSelectOptions(tempOptions);
    setSelectValue(tempValue);
    // 将选择值返回
    onChange && onChange(tempValue);
  }

  // 渲染下拉结果
  const renderResult = (arrs) => {
    return arrs.map((item) => (
      <span className="knowledge-item" key={`item_${item.name}`}>
        {item.name}
        <span
          onClick={() => handleRemoveResult(item)}
          className="iconfont icon-roundclose knowledge-close"
        ></span>
      </span>
    ));
  }
  // 渲染下拉列表
  const renderSelect = (options = []) => {
    // console.log('+++++', options);
    // setSelectValue(_selects);
    return (
      <Select
        value={value}
        // mode="tags"
        placeholder="请选择"
        style={{ width: '100%' }}
        onChange={handleSelectChange}
      >
        {renderOptions(options)}
      </Select>
    )
  }
  
  // 添加知识点
  const handleAddKnowledge = () => {
    setVisible(true);
  };

  const handleResetForm = () => {
    form.resetFields();
    setVisible(false);
  }

  const handleSubmitForm = (e) => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        return;
      }
      setVisible(false);
      form.resetFields();
      // console.log(values);
      addKnowledge && addKnowledge(values);
    })
  }  

  const _styles = {
    display: showAdd ? 'inline-block' : 'none'
  };

  return (
    <React.Fragment>
      <div className="knowledge-select-area">
        { renderSelect(selectOptions) }
        {/* 渲染下拉选择项 */}
        <div className="knowledge-result">
          <i
            style={_styles}
            className="iconfont icon-roundaddfill icon-add-knowledge"
            onClick={handleAddKnowledge}
          ></i>
          { renderResult(selectValue) }        
        </div>
      </div>

      <Modal
        closable={false}
        title="新增知识点"
        visible={visible}
        footer={null}
      >
        <Form className="knowledge-form">
          <FormItem>
            {
              getFieldDecorator('name', {
                rules: [{
                  required: true, message: '知识点名称不能为空'
                }]
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem style={{ textAlign: 'center' }}>
            <Button style={{ marginRight: '20px' }} onClick={handleResetForm}>取消</Button>
            <Button type="primary" onClick={handleSubmitForm}>确定</Button>
          </FormItem>
        </Form>
      </Modal>
    </React.Fragment>
    
  );
}

export default Form.create()(KnowLedge);
