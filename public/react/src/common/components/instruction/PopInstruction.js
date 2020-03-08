import React,{ Component } from "react";
import { getImageUrl } from 'educoder'
class PopInstruction extends Component{
  constructor(props){
    super(props);
    this.state={
      visible: false,
    }
  }
  setVisible = (visible) => {
    this.setState({ visible })
  }
  render(){
    const { visible } = this.state
    const { width, id } = this.props
    let _width = width || 92
    return(
      <div style={{position: 'relative', display: 'inline' }}>
      {/* 
            width: ${width || 292}px!important; 
            */}
        <style>{`
          #repository_url_tip {
            top: 32px!important;
            left: 10px!important;
            z-index: 999;
          }
          .repository_url_tippostion {
            position: absolute;
          }
          #repository_url_tip.popInstruction${id} {
            width: ${_width}px !important;            
          }

          .top-black-trangleft {
            display: block;
            border-width: 8px;
            position: absolute;
            top: -16px;
            border-style: dashed solid dashed dashed;
            border-color: transparent transparent rgba(5,16,26,.6);
            font-size: 0;
            line-height: 0;
          }
        `}</style>
        <a className="ml10" onClick={()=>this.setVisible(!visible)}>
          <img src={getImageUrl("images/educoder/problem.png")}
              style={{marginBottom: '2px'}}
          />
        </a>
        <div className={`invite-tip popInstruction${id} clearfix repository_url_tippostion`} style={{display: visible===true?"block":"none"}} 
          id="repository_url_tip"
        >
          <span className="top-black-trangleft"></span>
          <div className="padding20 invitecontent clearfix">
            {this.props.children}
          </div>
          <p className="inviteTipbtn with100">
            <a onClick={()=>this.setVisible(false)} >
              知道了
            </a>
          </p>
        </div>
      </div>
    )
  }
}
export default PopInstruction;