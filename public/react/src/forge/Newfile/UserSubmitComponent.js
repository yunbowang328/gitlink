import React,{Component} from 'react';
import { getImageUrl } from 'educoder';
import { Form , Input , Button , Radio , Icon  } from 'antd';

import './index.css';

import axios from 'axios';
const TextArea = Input.TextArea;
class UserSubmitComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      submitType:"0"
    }
  }

  changeSubmittype=(e)=>{
    this.setState({
      submitType:e.target.value
    })
  }

  // 提交变更
  subMitFrom=()=>{
    const { current_user , filepath , content } = this.props;
    const { branch , projectsId } = this.props.match.params;
    const { submitType } = this.state;
    let path = filepath.substr(1);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const url = `/${current_user && current_user.login}/${projectsId}/contents.json`;
        axios.post(url,{
          filepath:path,
          branch:submitType==="0" ? branch : undefined,
          new_branch:submitType==="1" ? values.branchname:undefined,
          content,
          message:values.desc
        }).then((result)=>{
          if(result && result.data.name){
            this.props.history.push(`/projects/${projectsId}/coder`);
          }
        }).catch(error=>{
          console.log(error);
        })
      }
    })
  }
  render(){ 
    const { submitType } = this.state;
    const { getFieldDecorator } = this.props.form;

    const { branch } = this.props.match.params;

    const { current_user , filepath , projectDetail } = this.props;

    const changeSubmitBranch = ()=>{
      if(submitType==="1"){
        return(
          <Form.Item style={{paddingLeft:"24px"}}> 
            {getFieldDecorator('branchname', {
              rules: [{
                required: true, message: '请输入分支名称'
              }],
            })(
              <Input placeholder={`请输入分支名称`}/>
            )}
          </Form.Item>
        )
      }
    }
    return(
      <div className="userScrew">
        <img src={getImageUrl(`images/${current_user && current_user.image_url}`)} alt="" className="screwImg"/>
        <div className="screwPanel">
          <Form>
            <Form.Item> 
            {getFieldDecorator('path', {
                rules: [],
              })(
                <Input placeholder={`/${projectDetail && projectDetail.identifier}${filepath}`} readOnly/>
              )}
            </Form.Item>
            <Form.Item> 
            {getFieldDecorator('desc', {
                rules: [],
              })(
                <TextArea placeholder={`添加一个可扩展的描述`} authSize={{minRows:3,maxRows:5}}/>
              )}
            </Form.Item>
            <Radio.Group value={submitType} onChange={this.changeSubmittype}>
              <Radio value="0"><i className="iconfont icon-banbenku font-16 mr5"></i>直接提交至<span>{branch}</span>分支</Radio>
              <Radio value="1"><Icon type="pull-request" className="mr5" />为此提交创建一个<span className="font-bd">新的分支</span>并发起合并请求</Radio>
            </Radio.Group>
            {changeSubmitBranch()}

            <Form.Item className="mt10" style={{marginBottom:"0px"}}>
              <Button type="primary" onClick={this.subMitFrom} className="mr20">提交变更</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}
const WrappedUserSubmitForm = Form.create({ name: 'UserSubmitForm' })(UserSubmitComponent);
export default WrappedUserSubmitForm;