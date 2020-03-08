import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message,Input,Radio} from "antd";
import { WordNumberTextarea } from 'educoder';


class ApprausePublic extends Component{
  constructor(props){
    super(props);
    this.state={
      group_ids:[],
      fileList:[],
      Inputsval:undefined,
      textareavaltype:false,
      comment:undefined,
      hidden_comment:undefined
    }
  }

  componentDidMount() {


  }

  comment=(e)=>{
    this.setState({
      comment:e.target.value
    })
    this.hideentyps(e.target.value)
  }

  hideentyps=(value)=>{
    if(value===undefined||value===null||value===""){

    }else{
      this.setState({
        textareavaltype:false
      })
    }
  }
  hidden_comment=(e)=>{
    this.setState({
      hidden_comment:e.target.value
    })
    this.hideentyps(e.target.value)
  }

  Saves=()=>{
    let{comment,hidden_comment}=this.state;
    let commenttype=comment===undefined||comment===null||comment==="";
    let hidden_commenttype=hidden_comment===undefined||hidden_comment===null||hidden_comment==="";

    if(commenttype===true&&hidden_commenttype===true){
      this.setState({
        textareavaltype:true
      })
      return
    }
    this.props.SaveAppraiseModal(this.state.comment,this.state.hidden_comment);
  }
  render(){
    let {textareavaltype,comment,hidden_comment}=this.state;
    return(
      <div>

        <style>
          {
            `
								@media (max-width: 2000px) {
											.WordNumberTextarea{
											  height: 130px !important;
											}
									}

								 @media (max-width: 1350px) {
										.HomeworkModal{
 										  top:10px !important;
 										}
 											.WordNumberTextarea{
											  height: 80px !important;
											}
									}

	 								@media (max-width: 1250px) {
 										.HomeworkModal{
 										  top:0px !important;
 										}

 										.WordNumberTextarea{
											  height: 40px !important;
									  }
									}

									`
          }
        </style>
        <Modal
          keyboard={false}
          className={"HomeworkModal"}
          title={this.props.ApprausePublicName||"一键评阅"}
          visible={this.props.visible}
          closable={false}
          footer={null}
          destroyOnClose={true}
        >

          <div className={"pd015"}>
            <style>
              {
                `
							  .pd015 {
                    padding: 0px 15px 15px 7px;
                }
								.font{
									font-size: 14px;
									font-weight: 400;
									color: rgba(5,16,26,1);
								}
								.newfont{
								    height: 16px;
										font-size: 16px;
										font-weight: 400;
										color: rgba(5,16,26,1);
										line-height: 16px;
										margin-bottom: 5px;
								}
								`
              }
            </style>
            <div className="clearfix">
              <p className={"font mb10 ml10"}>
                可见(学生可查看老师的评阅内容）
              </p>
              {/*<Radio.Group onChange={this.onChanges} value={this.state.valuetype}>*/}
              {/*<Radio value={0} style={radioStyle} className={"newfont"}>可见  (学生查看老师的评阅内容）</Radio>*/}
              {/*<Radio value={1} style={radioStyle} className={"newfont"}>不可见  (仅对课堂老师可见）</Radio>*/}
              {/*</Radio.Group>*/}
              <WordNumberTextarea
                placeholder={"请填写评阅内容"}
                onInput={(e)=>this.comment(e)}
                value={comment}
                maxlength={500}
              />

              <p className={"font mt10 mb10 ml10"}>
                不可见(仅对课堂老师可见）
              </p>
              <WordNumberTextarea
                placeholder={"请填写评阅内容"}
                onInput={(e)=>this.hidden_comment(e)}
                value={hidden_comment}
                maxlength={500}
              />

              <li style={{height:"20px",lineHeight:"20px"}} className={textareavaltype===true?"color-red mt5 mb10 ml10":"none"}><span>评阅内容至少有一个不为空</span></li>
            </div>

            <div className={textareavaltype===false?"mt20 clearfix edu-txt-center":"clearfix edu-txt-center"}>
              <a  className="task-btn color-white mr30" onClick={()=>this.props.Cancel()}>{this.props.Cancelname || '取消'}</a>
              <a className="task-btn task-btn-orange" onClick={()=>this.Saves()}>{this.props.Savesname || '确定'}</a>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
export default ApprausePublic;