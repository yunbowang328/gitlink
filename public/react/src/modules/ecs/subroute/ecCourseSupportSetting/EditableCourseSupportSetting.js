import React, { Component } from 'react';

import moment from 'moment'
import { getUrl } from 'educoder'
import { Form, Input, Icon, Button, Select, InputNumber } from 'antd';
const { TextArea } = Input;
const { Option } = Select;

let _url_origin = getUrl()
const $ = window.$
// https://www.educoder.net/stylesheets/css/common.css?1546618720
if (!window['EcLoaded']) {
    $('head').append( $('<link rel="stylesheet" type="text/css" />')
        .attr('href', `${_url_origin}/stylesheets/css/common.css?1525440977`) );
    window['EcLoaded'] = true
}

let id = 0;


/**
    target_id
    position    
    target_weight
    target_contents

    subitem_id
    index
    subitem_contents

*/
const data = 
[{"position":0,"target_weight":0.02,"target_contents":"12","standard_grade":2,"subitem_id":"65"},{"position":3,"target_id":"0","target_weight":0.1,"target_contents":"理解数据管理技术和数据库技术的发展，区分不同数据模型的作用和特点，描述数据库系统的类型、结构、数据独立性。","standard_grade":60,"subitem_id":"66"},{"position":4,"target_weight":1,"target_contents":"22","standard_grade":33,"subitem_id":"66"},{"position":11,"target_id":"1","target_weight":0.1,"target_contents":"理解数据管理技术和数据库技术的发展，区分不同数据模型的作用和特点，描述数据库系统的类型、结构、数据独立性。","standard_grade":61,"subitem_id":"65"}]
;
let _data = [
    {
        target_id: 0,
        position: 1,
        target_weight: 0.1,
        target_contents: '理解数据管理技术和数据库技术的发展，区分不同数据模型的作用和特点，描述数据库系统的类型、结构、数据独立性。',
        standard_grade: 60,
        // biyeYaoqiuZhibiaodian: '<label>1-2</label>：能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题',
        "subitem_id": 64,
        "index": "1-1",
        "subitem_contents": "能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题"
    },
    {
        target_id: 1,
        position: 2,
        target_weight: 0.1,
        target_contents: '理解数据管理技术和数据库技术的发展，区分不同数据模型的作用和特点，描述数据库系统的类型、结构、数据独立性。',
        standard_grade: 61,
        // biyeYaoqiuZhibiaodian: '<label>1-2</label>：能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题',
        "subitem_id": 65,
        "index": "1-2",
        "subitem_contents": "222能够运用相关的工程基础和专业知识辨别材料生产中出现的技术、工艺、质量等问题"
    }
]
const item = {}

class EditableCourseSupportSetting extends Component {
  constructor(props) {
    super(props)
    this.state = {
        addOrDeleting: false,
        errorMsg: ''
    }
  }
  onRemove = (k) => {
    let fValues = this.props.form.getFieldsValue();
    if (
        // fValues.standard_grade[k] && fValues.standard_grade[k] != 75
        // || fValues.subitem_id[k] 
        // || 
        fValues.target_contents[k] 
        // || fValues.target_weight[k] 
        ) {
        this.props.showModal('提示', '确定要删除吗？', () => {
            this.remove(k)
        })
    } else {
        this.remove(k)
    }
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    // if (keys.length === 1) {
    //   return;
    // }
    if (keys.length === 1) {
        this.setState({ errorMsg: '至少得保留一条数据' })
        return;
    }
    // 清除悬浮tip
    window.$('.data-tip-down').hide()

    console.log('remove :' , k , this.position2Target_idMap[k])
    delete this.position2Target_idMap[k]
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  _reverseMap = (map) => {
    let newMap = {}
    for (var k in map) {
        newMap[map[k]] = k;
    }
    return newMap
  }
  addIfNewKeyExist = (newKey, index_arg) => {
    this.setState({ addOrDeleting: true })
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    /**
        [0,1,2,3]
        ['11', '22', '33', '44']
        ->
        [0,1,2,3,4]
        ['11', '22', empty, '33', '44']

    */
    const target_weight = form.getFieldValue('target_weight');
    const target_contents = form.getFieldValue('target_contents');
    const standard_grade = form.getFieldValue('standard_grade');
    const subitem_id = form.getFieldValue('subitem_id');
    keys.splice(index_arg, 0, newKey);

    // position2Target_idMap 
    // {1:2, 2:3, 3:4, 4:6 } --> {1:2, 2:3, 3:7, 4:4, 5:6 }
    // 更新key/position 映射到target_id的map
    // 两次revers，用这个结构，达到给position加1的效果
    let reverseMap = this._reverseMap(this.position2Target_idMap);
    for (let i = index_arg ; i < keys.length; i++) {
        if(keys[i] === keys[i+1]) { // 找到开始+1的行
            continue;
        }
        let target_id = this.position2Target_idMap[keys[i]];
        reverseMap[target_id] = parseInt(reverseMap[target_id]) + 1;
        keys[i] = keys[i] + 1;
    }
    for (let i = 0 ; i < keys.length - 1; i++) { 
        if (keys[i] == keys[i + 1]) {
            debugger;
        }
    }
    this.position2Target_idMap = this._reverseMap(reverseMap);
    

    target_weight.splice(newKey, 0, undefined);
    target_contents.splice(newKey, 0, undefined);
    standard_grade.splice(newKey, 0, undefined);
    subitem_id.splice(newKey, 0, undefined);

    setTimeout(() => {
        form.setFieldsValue({
            target_weight,
            target_contents,
            standard_grade,
            subitem_id
        });
        window.$('.data-tip-down').hide()
        this.setState({ addOrDeleting: false })

    }, 300)
    form.setFieldsValue({
      keys: keys
    });

  }
  add = (k, index) => {
    this.setState({ errorMsg: '' })

    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    let nextKeys ;
    let newKey = k + 1;
    
    const newKeyIndex = keys.indexOf(newKey)
    if (newKeyIndex != -1) {
        // 新key存在，将新key位置及以后的row后移，直到找到一个之后的空位置
        this.addIfNewKeyExist(newKey, index)
    } else {    // 如果这个新key不存在
        // keys[newIndex] = newKey
        keys.splice(index === 0 && k === -1 ? 0 : index, 0, newKey);
    }
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: keys,
    });
  }

  handleSubmit = (e) => {
    if (!this.props.is_manager) {
        this.props.showModal('提示', '您没权限编辑，请联系管理员。')
        return;
    }
    this.setState({ errorMsg: '' })
    e.preventDefault && e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let keysLen = values.keys.length
        if (keysLen < 1) {
            this.setState({ errorMsg: '至少得保留一条数据' })
        }
        var data = []
        while( keysLen-- ) {
            data.push({})
        }
        for (var valKey in values) {
          
           let dataIndex = 0
           values[valKey].forEach( (item,index) => {
               let _val = values[valKey][index];
               if (_val || _val == 0) {
                 data[dataIndex][valKey === 'keys' ? 'position' : valKey] = _val
                 if (valKey === 'keys' && (this.position2Target_idMap[_val] || this.position2Target_idMap[_val] === 0) ) {
                     data[dataIndex].target_id = this.position2Target_idMap[_val]
                 }
                 dataIndex++;
               }
           })
        }

        console.log('Received values of form: ', values, data);
        
        let totalWeight = 0;
        values.target_weight.forEach(item => {
            if (item) {
                totalWeight += item
            }
        })
        // 精度问题  0.2 + 0.7 = 0.8999999999
        if (parseInt((totalWeight * 100).toFixed(1)) != 100) {
            this.setState({ errorMsg: '请先保证权重和等于1' })
            return;
        }

        this.props.updateCourseTargets(data)
      } else {

        const keyRowNumMap = {}
        let rowNum = 1;
        for (var key in values.target_contents) {
            keyRowNumMap[key] = rowNum;
            rowNum++;
        }

        // err.target_contents[1].errors[0]
        // {message: "请填入目标内容", field: "target_contents[1]"}
        for (var key in err) {
            for (var _k in err[key]) {
                let errorObj = err[key][_k].errors[0];

                let _key = errorObj.field.match(`[(0-9)]`)
                this.setState({ errorMsg: `第${keyRowNumMap[_key]}行，${errorObj.message}` })
                return;
                // console.log(`第${keyRowNumMap[_key]}行，${errorObj.message}`);
            }
        }
      }
      
      
    });
  }

  componentDidMount = () => {
    this.position2Target_idMap = {}
    const { form } = this.props;

    const data = this.props.course_targets

    let target_weight = []
    let target_contents = []
    let standard_grade = []
    // let biyeYaoqiuZhibiaodian = []
    let subitem_id = []
    let keys = []

    data.forEach(item => {
        keys.push(item.position);
        target_weight[item.position] = (item.target_weight)
        target_contents[item.position] = (item.target_contents);
        standard_grade[item.position] = (item.standard_grade);
        // biyeYaoqiuZhibiaodian[item.position] = (item.biyeYaoqiuZhibiaodian);

        subitem_id[item.position] = item.subitem_id ? (item.subitem_id).toString() : item.subitem_id;

        this.position2Target_idMap[item.position] = item.target_id
    })    
    form.setFieldsValue({
        keys
    });
    setTimeout(() => {
        form.setFieldsValue({
            // keys,
            target_weight,
            target_contents,
            standard_grade,
            // biyeYaoqiuZhibiaodian,
            subitem_id,
        });
        // this.forceUpdate()
    }, 3000)

       
  }
  

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const { requirements } = this.props;
    const { addOrDeleting } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 },
      },
    };
    getFieldDecorator('keys', { initialValue: [] });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <li className="clearfix" key={ k }>
      <Form.Item
        {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
        // label={index === 0 ? 'Passengers' : ''}
        required={false}
        key={k}
        style={{ 'display': 'flex' }}
      >
        <span className="column-1">{ index + 1 }</span>
        <span className="column-1">
            {getFieldDecorator(`target_weight[${k}]`, {
                    // validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                        whitespace: true,
                        type: 'number',
                        message: "请填入权重",
                    }],
                })(
                <InputNumber placeholder="权重" precision={2} step={0.01} min={0.01} max={1} style={{     width: '100%', marginRight: 8 }} />
            )}
        </span>
        <span className="column-3">
            {getFieldDecorator(`target_contents[${k}]`, {
                    // validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                    //     whitespace: true,
                        message: "请填入目标内容",
                    }],
                })(
                <TextArea autosize placeholder="" style={{  width: '100%', marginRight: 8 }} />
            )}
        </span>

        <span className="column-2 edu-txt-center">
         {getFieldDecorator(`standard_grade[${k}]`, {
                    initialValue: 75,
                    // validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                    //     whitespace: true,
                    //     type: 'integer',
                        message: "请先填写达成标准分",
                    }],
                })(
                <InputNumber placeholder="" step={1} min={0} max={100} style={{     width: '80%', marginRight: 8 }} />

            )}
        </span>
         {/*  <Input placeholder="" style={{ width: '80%', marginRight: 8 }} /> */}

        <span className="column-3">
            { getFieldDecorator(`subitem_id[${k}]`, {
                    // validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                        required: true,
                    //     whitespace: true,
                    //     type: 'array',
                        message: "请先选择毕业要求指标点",
                    }],
                })(
                <Select 
                    // mode="multiple"
                    // dropdownMatchSelectWidth={ false }
                    style={{ width: '100%', marginRight: 8 }}
                >
                    { requirements.map((item, index) => {
                        return ( <Option value={item.subitem_id.toString()} title={item.subitem_contents}>
                            {item.index} : {item.subitem_contents}
                            </Option> )
                    }) }
                    
                </Select>
            )}
        </span>

        <span className="column-1 edu-txt-right">
            { !addOrDeleting && <a href="javascript:void(0)" 
                onClick={() => { this.onRemove(k) }}
                className="color-grey-c mr15" data-tip-down="删除">
                <i className="iconfont icon-shanchu font-15"></i>
            </a> }
            { !addOrDeleting && <a href="javascript:void(0)" 
                onClick={() => { this.add(k, index + 1) }}
                className="color-green show-FillTable" 
                data-tip-down="添加">
                <i className="iconfont icon-tianjiafangda"
                ></i>
            </a> }
        </span>
            
        
      </Form.Item>
      </li>
    ));
    return (
        
        <Form onSubmit={this.handleSubmit}>
            <div className="ListTableLine" id="show-Target-table">
                <p className="clearfix">
                    <span className="column-1">项</span>
                    <span className="column-1">权重</span>
                    <span className="column-3">课程目标内容</span>
                    <span className="column-2 edu-txt-center">达成标准(分)</span>
                    <span className="column-3">对应毕业要求指标点</span>
                    { !addOrDeleting && <span className="column-1 edu-txt-right"
                         >
                        <a href="javascript:void(0)" className="color-green show-FillTable" 
                            onClick={ () => { this.add(-1, 0) }} data-tip-down="添加">
                        <i className="iconfont icon-tianjiafangda"></i></a>
                    </span> }
                </p>  
                {formItems}
            </div>
            {/* <Form.Item {...formItemLayoutWithOutLabel}>
            <Button type="dashed" onClick={ () => { this.add(keys.length === 0 ? -1 : keys[keys.length - 1], keys.length - 1) }} 
                    style={{ width: '60%' }}>
                <Icon type="plus" /> Add field
            </Button>
            </Form.Item>
            <Form.Item {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item> */}

            <p class="clearfix" style={{ marginTop: '10px'}}>
                { this.state.errorMsg && <span class="c_red none ml30" id="error_tip" style={{ display: 'inline'}}>
                    {this.state.errorMsg}
                </span> }

                <a href="javascript:void(0)" class="defalutSubmitbtn mr20 fr" onClick={this.handleSubmit}>保存</a>
                <a href="javascript:void(0)" class="defalutCancelbtn mr20 fr" onClick={() => { this.props.setEditableMode(false) } }>取消</a>
            </p>
        </Form>
    );
  }
}
const WrappedEditableCourseSupportSetting = Form.create({ name: 'dynamic_form_item' })(EditableCourseSupportSetting);
export default WrappedEditableCourseSupportSetting;
