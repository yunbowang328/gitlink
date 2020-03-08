import React, { Component } from 'react';
import axios from 'axios'

import PollDetailTabThirdInfo from '../../../courses/poll/PollDetailTabThirdInfo'

class PollBanksContent extends Component{
  constructor(props){
    super(props);
    this.state={
      pollDetail:undefined
    }
  }

  componentDidMount = () =>{
    console.log("PollBanksContent");
    console.log(this.props)
    let bankId=this.props.match.params.bankId;
    let url = `/exercise_banks/${bankId}.json`
    axios.get(url).then((result)=>{
      if(result){
				if (result.status == 200) {
					let pollDetail = {
          poll:{
            id: result.data.poll && result.data.poll.id ,
            polls_description: result.data.poll && result.data.poll.description,
            polls_name: result.data.poll && result.data.poll.name,
            is_public:result.data.poll && result.data.poll.is_public
          },
          question_types:result.data.question_types,
          questions:result.data.questions,
        }
        const crumbData={
          title:result.data.poll && result.data.poll.name,
          is_public:result.data.poll && result.data.poll.is_public,
          crumbArray:[
            {content:'详情'},
          ]
        }
        const menuData={
          tab:'0',//tab选中的index
          menuArray:[//tab以及tab路由
            {to:`/banks/poll/${bankId}/${this.props.match.params.type}`,content:'内容详情'}
          ],
          category:'poll',//毕设选题
          tos:`/banks/poll/${bankId}/edit/${this.props.match.params.type}`,
          id:bankId,
          is_public:result.data.poll && result.data.poll.is_public,
          type:this.props.match.params.type,
          authorize:result && result.data && result.data.authorize,
        }
        this.props.initPublic(crumbData,menuData,result.data);
					if (result.data.status === 401) {
						//未登入
						this.setState({
							pollDetail: undefined
						})
						return
					}
        this.setState({
          pollDetail
        })
				}
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  render(){
    let { pollDetail } = this.state
    return(
      <div>
        <PollDetailTabThirdInfo {...this.props} {...this.state} pollDetail = {pollDetail}></PollDetailTabThirdInfo>
      </div>
    )
  }
}
export default PollBanksContent
