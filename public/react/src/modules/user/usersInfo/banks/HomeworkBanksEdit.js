import React, { Component } from 'react';
import axios from 'axios'


import NewWorkForm from '../../../courses/busyWork/NewWorkForm'

class HomeworkBanksEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      isPublic: undefined,
    //   isGroup: false
    }
  }
  componentDidMount = () =>{
    let workId = this.props.match.params.workId;
    
    this.initData(workId);
  }

  initData = (workId) =>{
    let url = `/homework_banks/${workId}.json`;
    axios.get(url).then((result)=>{
      if(result){
        const crumbData={
          title:'编辑',
          is_public:result && result.data && result.data.is_public,
          crumbArray:[
            {to:`/banks/${this.getModuleName()}/${workId}/${this.props.match.params.type}?tab=0`,content:'详情'},
            {content:'编辑'}
          ]
        }
        this.props.initPublic(crumbData,result.data);
        result.data.isEdit = true;
        result.data.ref_attachments = result.data.reference_attachments
        // this.setState({ isGroup: result.data.min_num || result.data.max_num })
        this.newWorkFormRef.initValue(result.data);
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

 
  doNew = () => {
  }
  doEdit = (params) => {
    const workId = this.props.match.params.workId
    const newUrl = `/homework_banks/${workId}.json`

    // const isGroup = this.props.isGroup()
    axios.put(newUrl, params)
    .then((response) => {
      if (response.data.status == 0) {
        this.props.showNotification('保存成功')
        this.toWorkDetail()
      }
    })
    .catch(function (error) {
      console.log(error);
    });   
  }
  getModuleName = () => {
    return this.props.isGroup ? 'group' : 'normal'
  }
  toWorkDetail = () => {
    this.props.history.push(`/banks/${this.getModuleName()}/${this.props.match.params.workId}/${this.props.match.params.type}?tab=0`)
		this.props.initPublic(undefined);
  }
  onCancel = () => {
    this.toWorkDetail()
  }
  isGroup = () => {
    return this.props.isGroup;
  }
  render(){
    let { bankId } = this.props.match.params
    const common = {
      onCancel:this.onCancel,
      isGroup: this.isGroup,
      doNew: this.doNew,
      doEdit: this.doEdit,
    }
    return(
      <div className="courseForm">
        <style>
          {`
            .courseForm .ant-col-sm-24{
              text-align:left;
            }
          `}
        </style>
        <NewWorkForm 
          {...this.props} 
          {...this.state} 
          {...common} 
          wrappedComponentRef={(ref) => this.newWorkFormRef = ref}
        ></NewWorkForm>
      </div>
    )
  }
}
export default HomeworkBanksEdit;