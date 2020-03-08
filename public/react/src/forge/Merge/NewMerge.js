import React , {Component} from 'react';
import { Link } from 'react-router-dom';
import {Radio, Form,Menu,Dropdown,Input,Select,Table} from 'antd';
import NoneData from '../../modules/courses/coursesPublic/NoneData';
import reactCSS from 'reactcss'
import axios from 'axios';
import moment from 'moment'
import UploadComponent from '../Upload/Index';
import { getImageUrl } from 'educoder';

const { Group, Button } = Radio;
const Option = Select.Option;
const TextArea = Input.TextArea;

class NewMerge extends Component{
  constructor(props){
    super(props);
    this.state={
      data:undefined,
      //合并 拉取
      merge:undefined,
      pull:undefined,
      //判断 是否显示创建合并请求的页面
      iscreatemerge:'none',
      issue_tag_ids:"",
      fixed_version_id:"",
      assigned_to_id:"",
      titledata:undefined,
      dataCount:undefined,
      limit:50,
      page:1,
      isSpin:false,
      mergedata:undefined,
    }
  }

  componentDidMount=()=>{
   this.getmergelist();
   this.InitData();
  }
  InitData=()=>{
    this.props.form.setFieldsValue({
      ...this.state
    });
  }


  onPanelChange=(time, mode)=>{
    this.setState({
       value:time
       });
  }

  onSelect=(time)=>{
    this.setState({
      value:time,
      selectedValue: time,
    });
  }

  getOption=(name,id)=>{

    if(id==='branches'){
      this.ischeckmerge(name,this.state.pull)
      this.setState({
        merge:name
      })
    }else{
      if(this.state.iscreatemerge==='block'){
        if(this.state.merge===name){ 
        }else{ 
          const { page , limit } = this.state;
          this.getCommitList( name , page , limit );
        }
      }else{

      }
      this.ischeckmerge(this.state.merge,name)
      this.setState({
        pull:name
      })
    }
  }

  ismerge=()=>{
    this.setState({
      iscreatemerge:'block'
    })
    const { page , limit } = this.state;
    this.getCommitList( this.state.pull , page , limit );
  }


  //获取新建分枝数据
  getmergelist=()=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/pull_requests/new.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          data:result.data,
          merge:result.data.branches[0],
          pull:result.data.branches[0],
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  renderMenu =(array,id)=>{
    return(
      <Menu>
        {
          array && array.length > 0 && array.map((item,key)=>{
            return(
              <Menu.Item key={item} onClick={()=>this.getOption(item,id)}>{item}</Menu.Item>
            )
          })
        }
      </Menu>
    )
  }

  renderSelect=(list)=>{
    if(list && list.length >0){
      return(
        list.map((item,key)=>{
          return(
            <Option key={key+1} value={item.id+''}>{item.name}</Option>
          )
        })
      )
    }
  }

  //创建合并请求
  
  submit=()=>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        const { projectsId } = this.props.match.params;
        const url = `/projects/${projectsId}/pull_requests.json`;

        if(values.issue_tag_ids.length > 0){
          values.issue_tag_ids = [parseInt(values.issue_tag_ids)]
        }else{
          values.issue_tag_ids = []
        }

        axios.post(url,{
          ...values,
          project_id:projectsId,
          head:this.state.merge,
          base:this.state.pull,

        }).then(result=>{
          if(result){
          this.props.history.push(`/projects/${projectsId}/merge`);
          }
          
        }).catch(error=>{
          console.log(error);
        })
      }
    })
  }

  //获取提交列表
  getCommitList=(branch , page , limit)=>{
    const { current_user } = this.props;
    const { projectsId } = this.props.match.params;
    const url = `/${current_user&&current_user.login}/${projectsId}/commits.json`;
    axios.get(url,{
      params:{
        sha:branch,
        page,
        limit
      }
    }).then((result)=>{
      if(result){
        const array = [];
        result.data && result.data.commits.length > 0 && result.data.commits.map((item,key)=>{
          array.push({
            name:item.author && item.author.name,
            image_url:item.author && item.author.image_url,
            sha:item.sha,
            time_from_now:item.time_from_now,
            message:item.message
          })
        })
        this.setState({
          titledata:array,
          dataCount:result.data.total_count,
          isSpin:false
        })
      }
    }).catch((error)=>{console.log(error)})
  }

  //判断2分支是否可以合并

  ischeckmerge=(head,base)=>{
    const { projectsId } = this.props.match.params;
    const url = `/projects/${projectsId}/pull_requests/check_can_merge`;
    axios.post(url,{
      project_id:projectsId,
      head:head,
      base:base,

    }).then(result=>{
      if(result){
          this.setState({
            mergedata:result.data
          })
      }
      
    }).catch(error=>{
      console.log(error);
    })

  }


  render(){
    const { getFieldDecorator } = this.props.form;
    const { projectsId } = this.props.match.params;
    const { current_user } = this.props;
    const { issue_tag_ids , fixed_version_id ,assigned_to_id ,issue_chosen,data,titledata} = this.state;


    const columns=[{
      title:"作者",
      dataIndex: 'name',
      width:"10%",
      render: (text,item) => (
        <span className="f-wrap-alignCenter">
          <img src={getImageUrl(`images/${item.image_url}`)} alt="" width="28px" height="28px" className="mr3 radius"/>
          <label className="hide-1" style={{maxWidth:"75px"}}>{text}</label>
        </span>
      ),
    },{
      title:"SHA",
      dataIndex: 'sha',
      render: (text) => (
        <span className="commitKey">{text}</span>
      )
    },{
      title:"备注",
      dataIndex: 'message',
      render: (text) => (
        <span>{text}</span>
      )
    },{
      title:"提交时间",
      className:"edu-txt-right",
      dataIndex: 'time_from_now',
      render: (text) => (
        <span>{text}</span>
      )
    }]

    const title =()=>{
      return(
        <div className="f-wrap-between" style={{alignItems:"center"}}>
          <span className="font-16">提交列表</span>
          {/* <div className="f-wrap-alignCenter">
            <Input placeholder="搜索提交历史" style={{width:"300px"}}/>
            <Checkbox className="ml15">所有分支</Checkbox>
            <a className="btn_32 ml15">搜索</a>
          </div> */}
        </div>
      )
    }

    const pull =()=>{
      if(this.state.mergedata&&this.state.mergedata.status===-2){
        return(
          <div>
           在这些分支直接合并请求已经存在：<Link to={`/projects/${projectsId}/merge/${this.state.mergedata&&this.state.mergedata.pull_request_id}/Messagecount`} style={{color:'blue'}}>{this.state.mergedata&&this.state.mergedata.pull_request_name}</Link> 
          </div>
        )
      }else{
        return(
         <div>
            {this.state.mergedata&&this.state.mergedata.status===0?<Button className="topWrapper_btn" onClick={()=>this.ismerge()}>创建合并请求</Button>: "分支内容相同，无需创建合并请求"}
         </div>
        )
      }
    }

    
      
  return(
        <div className="main">
  
          <h1 style={{marginLeft:15}}>创建合并请求</h1>
          <h5 style={{marginLeft:15}}>选择合并的目标分支和源分支</h5>
           <div  style={{display:'flex'}}>
             <div className="mergediv">
            <div>
            <Dropdown className="topWrapperSelect" overlay={this.renderMenu(this.state.data &&this.state.data.branches,'branches')} trigger={['click']} placement="bottomCenter">
            <Button>合并到：{this.state.merge}</Button>
            </Dropdown>
            ...   
          <Dropdown overlay={this.renderMenu(this.state.data &&this.state.data.branches,'pull')} trigger={['click']} placement="bottomCenter">
          <Button>拉取从：{this.state.pull}</Button>
          </Dropdown>
        </div>
          </div>
        </div>
        <div style={{display:this.state.iscreatemerge==='none'?'block':'none'}}>
        <div className="mergediv" style={{marginTop:15}} >
         {pull()}
        </div>
        </div>
        <div style={{display:this.state.iscreatemerge==='none'?'none':'block'}}>
        <Form>
          <div className="f-wrap-between mt20" style={{alignItems:"flex-start"}}>
            <div className="list-right df">
              <Link to={``}><img class="user_img" src={getImageUrl(`images/${current_user && current_user.image_url}`)} alt=""/></Link>
              <div className="new_context">
                <Form.Item>
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true, message: '请填写请求标题'
                    }],
                  })(
                      <Input placeholder="标题"/>
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator('body', {
                    rules: [],
                  })(
                      <TextArea placeholder="合并请求的描述。。。" style={{height:"300px"}}/>
                  )}
                </Form.Item>
                <UploadComponent load={this.UploadFunc} isComplete={true} ></UploadComponent>
                <p className="clearfix mt15">
                  <a className="topWrapper_btn fr" type="submit" onClick={this.submit}>创建合并请求</a>
                </p>
              </div>
            </div>
            <div className="list-left" style={{paddingRight:"0px",paddingLeft:"15px",paddingTop:"10px"}}>
              <div className="list-l-panel">
                <Form.Item
                  label="标签"
                >
                  {getFieldDecorator('issue_tag_ids', {
                
                    rules: [],
                  })(
                    <Select value={issue_tag_ids}>
                      <Option value="">未选择标签</Option>
                      { this.renderSelect(data && data.issue_tags) }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="里程碑"
                >
                  {getFieldDecorator('fixed_version_id', {
                   
                    rules: [],
                  })(
                    <Select value={fixed_version_id}>
                      <Option value="">未选择里程碑</Option>
                      { this.renderSelect(data && data.issue_versions) }
                    </Select>
                  )}
                </Form.Item>
                <Form.Item
                  label="指派成员"
                >
                  {getFieldDecorator('assigned_to_id', {
                  })(
                    <Select value={assigned_to_id}>
                      <Option value="">未指派成员</Option>
                      { this.renderSelect(data && data.members) }
                    </Select>
                  )}
                </Form.Item>
              </div>
            </div>
          </div>
        </Form>
        </div>
        <div style={{display:this.state.iscreatemerge==='none'?'none':'block'}}>
        <Table
            className="mt20 wrap-commit-table"
            columns={columns}
            dataSource={titledata}
            showHeader={false}
            size="small"
            pagination={false}
            title={() => title()}
          />
        </div>
  </div>
    )
  }
}
const WrappedNewMerge = Form.create({ name: 'NewMergeFrom' })(NewMerge);
export default WrappedNewMerge;