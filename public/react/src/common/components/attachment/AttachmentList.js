import React,{ Component } from "react";
import { ConditionToolTip,getRandomNumber } from 'educoder'

class AttachmentsList extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let { attachments } = this.props;
    return(
      <React.Fragment>
        {
          attachments.map((item,key)=>{
            return(
              <p key={key} className="clearfix mb3">
                <a className="color-grey fl">
                  <i className="font-14 color-green iconfont icon-fujian mr8"></i>
                </a>
                <ConditionToolTip title={item.title} condition={item.title && item.title.length > 30 }>
                  <a href={item.url+getRandomNumber()} className="mr12 fl task-hide" length="58" target={ item.is_pdf && item.is_pdf == true ? "_blank" : "_self" } style={{"maxWidth":"432px"}}>{item.title}</a>
                </ConditionToolTip>
                <span className="color-grey mt2 color-grey-6 font-12">{item.filesize}</span>
              </p>
            )
          })
        }
      </React.Fragment>
    )
  }
}
export default AttachmentsList;