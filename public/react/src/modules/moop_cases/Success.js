import React,{ Component } from "react";
import './css/moopCases.css'
import '../courses/css/Courses.css'
import { getImageUrl } from 'educoder';
import success from '../../images/moop_cases/success.png'

class Success extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="educontent edu-back-white mt20 successPage">
        <div>
          <img src={success} width="100" className="mb30" />
          <p className="lineh-30 ed-txt-center font-24 color-grey-3 font-bd">恭喜!</p>
          <p className="lineh-30 ed-txt-center font-24 color-grey-3 font-bd mb20">提交成功</p>
          <p className="lineh-30 ed-txt-center font-16 color-grey-9 font-bd mb20">平台正在审核您的申请，审核结果将以平台消息的形式通知您</p>
          <li className="inline">
            <a href={`/moop_cases/${this.props.match.params.caseID}`} className="white-btn edu-blueline-btn changebtn mr20 fl">查看已上传文档</a>
            <a href="/moop_cases/new" className="white-btn edu-blueback-btn changebtn fl">继续上传</a>
          </li>
        </div>
      </div>
    )
  }
}
export default Success;