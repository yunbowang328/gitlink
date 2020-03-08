import React, { Component } from 'react';
import axios from 'axios'

import GraduateTopicNewFrom from '../../../courses/graduation/topics/GraduateTopicNewFrom'

class GtopicBanksEdit extends Component{
  constructor(props){
    super(props);
    this.state = {
      isPublic:undefined
    }
  }
  componentDidMount = () =>{
    let bankId = this.props.match.params.bankId;
    this.initData(bankId);
  }

  initData = (bankId) =>{
    let url = `/gtopic_banks/${bankId}/edit.json`;
    axios.get(url).then((result)=>{
      if(result){
        const crumbData={
          title:'编辑',
          is_public:result && result.data.selected_data && result.data.selected_data.is_public,
          crumbArray:[
            {to:`/banks/gtopic/${bankId}/${this.props.match.params.type}?tab=0`,content:'详情'},
            {content:'编辑'}
          ]
        }
        this.props.initPublic(crumbData,result.data);

        this.GraduateTopicNewFromRef.initValue(result);
      }
    }).catch((error)=>{
      console.log(error)
    })
  }

  // 编辑保存
  editSave = (param,attachments,bankId) =>{
    const url = `/gtopic_banks/${bankId}.json`;
    let params = {
      gtopic_bank:param,
      attachment_ids:attachments
    }
    axios.put(url,params).then((result)=>{
      if(result){
        this.props.showNotification('保存成功！');
        this.props.history.push(`/banks/gtopic/${bankId}/${this.props.match.params.type}?tab=0`);
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  // 取消
  editCancel = () =>{
    this.props.history.push(`/banks/gtopic/${this.props.match.params.bankId}/${this.props.match.params.type}?tab=0`);
		this.props.initPublic(undefined);
  }

  render(){
    let { bankId } = this.props.match.params
    const common = {
      editSave:this.editSave,
      editCancel:this.editCancel
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
        <GraduateTopicNewFrom 
          {...this.props} 
          {...this.state} 
          {...common} 
          wrappedComponentRef={(ref) => this.GraduateTopicNewFromRef = ref}
          topicId={bankId}
        ></GraduateTopicNewFrom>
      </div>
    )
  }
}
export default GtopicBanksEdit;