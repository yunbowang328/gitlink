import React , { Component } from 'react';
import { Form , Input , Checkbox , Select } from 'antd';

import axios from 'axios';
const { TextArea } = Input;
const { Option } = Select;
class Setting extends Component{
  constructor(props){
    super(props);
    this.state={
      CategoryList:undefined,
      LanguageList:undefined,
      private_check:undefined
    }
  }

  componentDidMount=()=>{
    this.getCategory();
    this.getLanguage();
    this.getInfo();
  }
  getLanguage=()=>{
    const url =  `/project_languages.json`
    axios.get(url).then((result)=>{
      if(result){
        let LanguageList = this.setOptionsList(result.data.project_languages)
        this.setState({
          LanguageList
        })
      }
    }).catch((error)=>{})
  }

  getInfo=()=>{
    const { current_user } = this.props;
    const { projectsId } = this.props.match.params;
    const url = `/${current_user.login}/${projectsId}/edit.json`;
    axios.get(url).then(result=>{
      if(result){
        this.props.form.setFieldsValue({
          ...result.data
        })
        this.setState({
          private_check:result.data.private
        })
      }
    }).catch(error=>{
      console.log(error);
    })
  }

  getCategory=()=>{
    const url =  `/project_categories.json`
    axios.get(url).then((result)=>{
      if(result){
        let CategoryList = this.setOptionsList(result.data.project_categories)
        this.setState({
          CategoryList
        })
      }
    }).catch((error)=>{})
  }

  setOptionsList = (data) =>{
    let list = undefined;
    if(data && data.length > 0){
      list = data.map((item,key)=>{
        return(
          <Option key={item.id} value={item.id}>{item.name}</Option>
        )
      })
    }
    return list;
  }

  // 更新仓库设置
  resetSetting=()=>{
    this.props.form.validateFields((err,values)=>{
      if(!err){
        const { project_id } = this.props;
        const { private_check } = this.state;
        const url = `/projects/${project_id}.json`;
        axios.put(url,{
            name:values.project_name,
            description:values.project_description,
            private:private_check,
            ...values
        }).then(result=>{
          if(result){
            this.props.showNotification(`仓库信息修改成功！`);
            const { getDetail } = this.props;
            getDetail && getDetail();
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    })
  }

  // 删除本仓库
  deleteProject=()=>{
    this.props.confirm({
      content:"删除后无法恢复，是否确认删除本仓库？",
      onOk:()=>{
        const { project_id } = this.props;
        const url = `/projects/${project_id}.json`;
        axios.delete(url).then(result=>{
          this.props.showNotification("仓库删除成功！");
          this.props.history.push("/projects");
        }).catch(error=>{
          console.log(error);
        })
      }
    })
  }
  changePrivate=(e)=>{
    console.log(e);
    this.setState({
      private_check:e.target.checked
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const { CategoryList , LanguageList , private_check } = this.state;
    return(
      <div>
        <div className="normalBox">
          <div className="normalBox-title font-16">
            基本设置
          </div>
          <Form className="baseForm">
            <Form.Item
              label="项目名称"
            > 
            {getFieldDecorator('project_name', {
              rules: [{
                required: true, message: '请输入项目名称'
              }],
            })(
              <Input placeholder="请输入项目名称"/>
            )}
            </Form.Item >
            <div className="df" style={{alignItems:"center"}}>
              <span className="mr20 mb15 font-16">可见性</span>
                <Form.Item
                  label=""
                > 
                {getFieldDecorator('private', {
                  rules: [],
                })(
                  <Checkbox checked={private_check} onChange={this.changePrivate}>将仓库设为私有</Checkbox>
                )}
                </Form.Item >
            </div>
            <Form.Item
              label="仓库描述"
            > 
            {getFieldDecorator('project_description', {
              rules: [],
            })(
              <TextArea placeholder="请输入仓库描述" style={{height:"80px"}}/>
            )}
            </Form.Item >
            <Form.Item
              label="项目类别"
            > 
            {getFieldDecorator('project_category_id', {
                rules: [{
                  required: true, message: '请选择大类别'
                }],
              })(
                <Select>
                  {CategoryList}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="项目语言"
            > 
            {getFieldDecorator('project_language_id', {
                rules: [{
                  required: true, message: '请选择项目语言'
                }],
              })(
                <Select>
                  {LanguageList}
                </Select>
              )}
            </Form.Item>
            <p className="clearfix">
              <a className="submitBtn" onClick={this.resetSetting}>更新仓库设置</a>
            </p>
          </Form>
        </div>
        <div className="dangerousBox">
          <div className="dangerousTitle">危险操作区</div>
          <div className="flex-a-center padding15-10">
            <div>
              <p className="font-bd font-16">删除本仓库</p>
              <p className="mt10">删除仓库是永久性的, 无法撤消</p>
            </div>
            <a onClick={this.deleteProject} className="red_deleteBtn">删除本仓库</a>
          </div>
        </div>
      </div>
    )
  }
}
const WrappedSettingIndexForm = Form.create({ name: 'settingForm' })(Setting);
export default WrappedSettingIndexForm;