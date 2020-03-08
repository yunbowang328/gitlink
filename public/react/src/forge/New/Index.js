import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input , Form , Select , Checkbox , Button , Divider ,Spin } from 'antd';

import '../css/index.css';
import './new.css'

import axios from 'axios' ;
const Option = Select.Option
class Index extends Component{
  constructor(props){
    super(props);
    this.state={
      // authorValue:"0",
      preType:"0",
      // subType:"0",
      languageValue:"0",
      gitignoreType:"0",
      LicensesType:"0",

      CategoryList:undefined,
      LanguageList:undefined,
      GitignoreList:undefined,
      LicensesList:undefined,
      isSpin:false
    }
  }
  componentDidMount=()=>{
    // 获取项目类别
    this.getCategory();
    // 获取项目语言
    this.getLanguage();
    // 获取Gitignore
    this.getGitignore();
    // 获取开源许可证
    this.getLicenses();
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

  getGitignore=()=>{
    const url =  `/ignores.json`
    axios.get(url).then((result)=>{
      if(result){
        let GitignoreList = this.setOptionsList(result.data.ignores)
        this.setState({
          GitignoreList
        })
      }
    }).catch((error)=>{})
  }

  getLicenses=()=>{
    const url =  `/licenses.json`
    axios.get(url).then((result)=>{
      if(result){
        let LicensesList = this.setOptionsList(result.data.licenses)
        this.setState({
          LicensesList
        })
      }
    }).catch((error)=>{})
  }

  setOptionsList = (data) =>{
    let list = undefined;
    if(data && data.length > 0){
      list = data.map((item,key)=>{
        return(
          <Option key={item.id}>{item.name}</Option>
        )
      })
    }
    return list;
  }

  subMitFrom = () =>{
    this.setState({
      isSpin:true
    })
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { current_user } = this.props;
        const { projectsType } =this.props.match.params;
        const url =  projectsType === "deposit" ? "/projects.json" :"/projects/migrate.json";
        axios.post(url,{
          ...values,
          user_id:current_user.user_id
        }).then((result)=>{
          if(result){
            if(result.data.id){
              this.setState({
                isSpin:false
              })
              this.props.showNotification(`${projectsType === "deposit" ? "托管" :"镜像"}项目创建成功!`);
              this.props.history.push(`/projects/${result.data.identifier}/coder`);
            }
          }
        }).catch((error)=>{
          this.setState({
            isSpin:false
          })
          console.log(error);
        })
      }else{
        this.setState({
          isSpin:false
        })
      }
    })
  }

  render(){
    const { getFieldDecorator } = this.props.form;
    console.log(this.props);
    // 项目类型：deposit-托管项目，mirror-镜像项目
    const { projectsType } =this.props.match.params;
    const {
      // authorValue,
      preType,
      // subType,
      languageValue,
      gitignoreType,
      LicensesType,

      CategoryList,
      LanguageList,
      GitignoreList,
      LicensesList,
      isSpin
    }=this.state;
    return(
      <div className="main back-white">
        <div className="newPanel">
          <div className="newPanel_title">创建{projectsType === "deposit" ? "托管":"镜像"}项目</div>
          <Spin spinning={isSpin}>
            <Form>
              <div className="newPanel_content">
              {/* <Form.Item
                label="拥有者"
              > 
              {getFieldDecorator('user_id', {
                  rules: [{
                    required: true, message: '请选择拥有者'
                  }],
                })(
                  <Select value={authorValue}>
                    <Option key="0">kosasa</Option>
                  </Select>
                )}
              </Form.Item> */}
              {
                projectsType != "deposit" &&
                <React.Fragment>
                  <Form.Item
                    label="镜像版本库地址"
                    style={{marginBottom:"0px"}}
                  > 
                  {getFieldDecorator('clone_addr', {
                      rules: [{
                        required: true, message: '请填写镜像版本库地址'
                      }],
                    })(
                      <Input placeholder="输入需要同步到本项目的镜像版本库地址"/>
                    )}
                  </Form.Item>
                  <p className="formTip">示例：https://github.com/facebook/reack.git</p>
                </React.Fragment>
              }
              <Form.Item
                label="项目名称"
              > 
              {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: '请填写项目名称'
                  }],
                })(
                  <Input placeholder="例如：团队协作方法与研究"/>
                )}
              </Form.Item>
              
              <Form.Item
                label="项目简介"
              > 
              {getFieldDecorator('description', {
                  rules: [{
                    required: true, message: '请填写项目简介'
                  }],
                })(
                  <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }}/>
                )}
              </Form.Item>
              <Form.Item
                label="仓库名称"
                style={{marginBottom:"0px"}}
              > 
              {getFieldDecorator('repository_name', {
                  rules: [{
                    required: true, message: '请填写仓库名称'
                  }],
                })(
                    <Input placeholder="请输入仓库名称"/>
                )}
              </Form.Item>
              <p className="formTip">好的存储库名称使用简单、深刻和独特的关键字</p>
              {/* <div className="newContent_inline"> */}
                <Form.Item
                  label="项目类别"
                > 
                {getFieldDecorator('project_category_id', {
                    rules: [{
                      required: true, message: '请选择大类别'
                    }],
                  })(
                    <Select value={preType}>
                      {CategoryList}
                    </Select>
                  )}
                </Form.Item>
                {/* <Form.Item> 
                {getFieldDecorator('project_language_id', {
                    rules: [{
                      required: true, message: '请选择子类别'
                    }],
                  })(
                    <Select value={subType} className="inline_Tag">
                      <Option key="0">HTMl</Option>
                      <Option key="1">HTMl111</Option>
                    </Select>
                  )}
                </Form.Item> */}
              {/* </div> */}
              <Form.Item
                label="项目语言"
              > 
              {getFieldDecorator('project_language_id', {
                  rules: [{
                    required: true, message: '请选择项目语言'
                  }],
                })(
                  <Select value={languageValue}>
                    {LanguageList}
                  </Select>
                )}
              </Form.Item>
              </div>
              <Divider />
              <div className="newPanel_content">
              {
                projectsType === "deposit" && 
                <React.Fragment>
                  <Form.Item
                    label=".gitignore"
                  > 
                    {getFieldDecorator('ignore_id')(
                      <Select value={gitignoreType} className="inline_Tag">
                        {GitignoreList}
                      </Select>
                    )}
                  </Form.Item>
                  <Form.Item
                    label="开源许可证"
                  > 
                    {getFieldDecorator('license_id')(
                      <Select value={LicensesType} className="inline_Tag">
                        {LicensesList}
                      </Select>
                    )}
                  </Form.Item>
                </React.Fragment>
              }
                <Form.Item
                  label="可见性"
                  style={{marginBottom:"0px"}}
                > 
                {getFieldDecorator('private')(
                  <Checkbox value="limit">将项目设为私有</Checkbox>
                )}
                </Form.Item >
                <p className="formTip">只有企业所有人或拥有权限的企业成员才能看到</p>
                <Form.Item className="formTip">
                    <Button type="primary" onClick={this.subMitFrom} className="mr20">创建项目</Button>
                    <Link to={'/projects'} className="btn_32">取消</Link>
                </Form.Item>
              </div>
            </Form>
          </Spin>
        </div>
      </div>
    )
  }
}
const WrappedIndexForm = Form.create({ name: 'NewWorkForm' })(Index);
export default WrappedIndexForm;