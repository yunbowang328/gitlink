import React,{ Component } from "react";
import { Spin } from 'antd';
import '../css/members.css'
import '../css/busyWork.css'
import './pollStyle.css'

import PollDetailTabThirdInfo from './PollDetailTabThirdInfo'

import axios from 'axios';

class PollDetailTabThird extends Component{
  constructor(props){
    super(props);
    this.state={
      pollDetail:undefined,
      isSpin:false
    }
  }
  getPollInfo=()=>{
    this.setState({
      isSpin:true
    })
    let pollId=this.props.match.params.pollId;
    let url=`/polls/${pollId}.json`;
    axios.get(url).then((result)=>{
      if(result.status==200){
				if (result.data.status === 401) {
					//未登入
					this.setState({
            pollDetail: undefined,
            isSpin:false
					})
					return
				}
        this.setState({
          pollDetail:result.data,
          isSpin:false
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  componentDidMount=()=>{
    this.getPollInfo();
  }
  render(){
    let {pollDetail , isSpin}=this.state;
    return(
      <div>
        <Spin size="large" spinning={isSpin}>
          <PollDetailTabThirdInfo {...this.props} {...this.state} pollDetail = {pollDetail}></PollDetailTabThirdInfo>
        </Spin>
      </div>
    )
  }
}
export default PollDetailTabThird