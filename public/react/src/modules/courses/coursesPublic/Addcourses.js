import React,{ Component } from "react";
import { Modal,Checkbox,Input, Spin, Icon,notification } from "antd";
import axios from 'axios';
import Modals from '../../modals/Modals';
const CheckboxGroup = Checkbox.Group;

class Addcourses extends Component{
  constructor(props){
    super(props);
    this.state={
      invite_code:undefined,
      Addcoursestype:false,
      Checkboxteacherchecked:false,
      Checkboxteachingchecked:false,
      Checkboxstudentchecked:false,
      Checkboxteachertype:false,
      Checkboxteachingtype:false,
      professor:null,
      assistant_professor:null,
      student:null,
      course_id:undefined,
      loadtype:false,
      modalsType:false,
      modalsTopval:undefined,
      modalSave:undefined,
			isSpin:false
    }
  }

  componentDidMount() {
		axios.interceptors.response.use((response) => {
			if (response != undefined)
				if (response && response.data.status === 409) {
					this.setState({
						Addcoursestypes: true
					})
				}
			return response;
		}, (error) => {

		});


    let {Addcoursestype}=this.props;
    this.setState({
     Addcoursestype:Addcoursestype
    })

  }
	componentDidUpdate = (prevProps) => {
		// console.log(prevProps);
		// console.log(this.props);
		if(prevProps.occupation!==this.props.occupation){
			this.setState({
				Addcoursestype:false,
				Addcoursestypes:false,
			})
		}
	}
	openNotification = (messge) => {
		notification.open({
			message: "提示",
			description:
			messge,
			onClick: () => {
				console.log('Notification Clicked!');
			},
		});
	};

  inputjoinclassvalue=(e)=>{
		if(e.target.value.length>=7){
			this.openNotification("请输入5位课堂邀请码或6位分班邀请码!");
			return
		}
    this.setState({
      invite_code:e.target.value
    })

  }

  Checkboxteaching=(e)=>{

    if(e.target.checked===true){
      this.setState({
        assistant_professor:1,
				professor:null,
        Checkboxteachingchecked:e.target.checked,
        Checkboxteachertype:true
      })
    }else{
      this.setState({
        professor:null,
        Checkboxteachingchecked:e.target.checked,
        Checkboxteachertype:false
      })
    }

  }



  Checkboxteacher=(e)=>{

    if(e.target.checked===true){
      this.setState({
        professor:1,
				assistant_professor:null,
        Checkboxteacherchecked:e.target.checked,
        Checkboxteachingtype:true
      })
    }else{
      this.setState({
        professor:null,
        assistant_professor:null,
        Checkboxteacherchecked:e.target.checked,
        Checkboxteachingtype:false
      })
    }

  }

  Checkboxstudent=(e)=>{

    if(e.target.checked===true){
      this.setState({
        student:1,
        Checkboxstudentchecked:e.target.checked
      })
    }else{
      this.setState({
        student:null,
        Checkboxstudentchecked:e.target.checked
      })
    }

  }



  hidetojoinclass=()=>{
		let {Addcoursestype}=this.props;
    // console.log(this.props)
    this.setState({
      invite_code:undefined,
      Addcoursestype:false,
      Checkboxteacherchecked:false,
      Checkboxteachingchecked:false,
      Checkboxstudentchecked:false,
      Checkboxteachertype:false,
      Checkboxteachingtype:false,
      professor:null,
      assistant_professor:null,
      student:null,
			Addcoursestypes:false
    })

		if(Addcoursestype===true){
			this.props.hideAddcoursestype();
		}else{
			window.location.href = "/";
		}

  }

  submitasyn=(course_id)=>{
  	let{professor,Addcoursestype}=this.state;

  	if(professor===1){
			this.setState({
				loadtype:true,
				modalsType:true,
				modalsTopval:"申请已提交，请等待审核",
				modalSave:(course_id)=>this.submitasyns(course_id),
				Addcoursestype:false
			})
			if(Addcoursestype===true){
				this.props.hideAddcoursestype();
			}
		}else{
			// let{course_id}=this.state;
			this.setState({
				Addcoursestype:false
			})
			if(Addcoursestype===true){
				this.props.hideAddcoursestype();
			}
			window.location.href ="/courses/"+course_id+"/students";
		}

  }
	submitasyns=(course_id)=>{
			window.location.href ="/courses/"+course_id+"/students";
	}

  submittojoinclass=()=>{
  	let{Addcoursestype}=this.state;
  	this.setState({
			isSpin:true
		})
    let {invite_code,professor,assistant_professor,student}=this.state;
    if(invite_code===undefined||invite_code===""){
      this.setState({
        invite_codetype:true,
        invite_codevalue:"邀请码不能为空",
				isSpin:false
      })
      return
    }else{
      this.setState({
        invite_codetype:false,
        invite_codevalue:" ",
				isSpin:false
      })
    }

    let url="/courses/apply_to_join_course.json"
    axios.post(url, {
      invite_code:invite_code,
      professor:professor,
      assistant_professor:assistant_professor,
      student:student
      }
    ).then((response) => {
    	// console.log("submittojoinclass");
    	// console.log(response);
			if(response  === undefined){
				this.setState({
					// Addcoursestype:false,
					isSpin:false
				});
		    // try {
				// 	this.props.HideAddcoursestypess(3);
				// }catch (e) {
				//
				// }
				return
			}
			if(response.data.status===-2){
				this.setState({
					 Addcoursestype:false,
					isSpin:false
				});
				// try {
					if(response.data.message==="该课堂要求成员完成实名认证"){
						 this.props.HideAddcoursestypess(1);
						return;
					}
					if(response.data.message==="该课堂要求成员完成职业认证"){
						 this.props.HideAddcoursestypess(2);
						return;
					}
					if(response.data.message==="该课堂要求成员完成实名和职业认证"){
						 this.props.HideAddcoursestypess(3);
						return;
					}
				// }catch (e) {
					notification.open({
						message:"提示",
						description:response.data.message
					});
				// 	// this.props.showNotification(response.data.message);
				// }
				return;
			}
      if(response.data.status===0){
        // https://www.trustie.net/issues/22365
        if (response.data.course_id == 2704) {
          this.props.history.push('/courses/2704/boards/8367/messages/42072')
          return;
        }
				if(response.data.course_id!=undefined){
					this.submitasyn(response.data.course_id)
				}
				notification.open({
					message:"提示",
					description:response.data.message
				});
				if(Addcoursestype===true){
					this.props.hideAddcoursestype();
				}

				// this.props.showNotification(response.data.message);

      }else{

				response.data.message && notification.open({
					message:"提示",
					description:response.data.message
				});
				this.setState({
					Addcoursestype:false
				})
				if(Addcoursestype===true){
					this.props.hideAddcoursestype();
				}

      }

			this.setState({
				Addcoursestype:false,
				isSpin:false
			});
    }).catch((error) => {
      console.log(error);
			this.setState({
				Addcoursestype:false,
				isSpin:false
			});
    })

  }

  render(){
    let {invite_code,
         Addcoursestype,
        Checkboxteacherchecked,
        Checkboxteachertype,
        Checkboxteachingchecked,
        Checkboxteachingtype,
        Checkboxstudentchecked,
        loadtype,
        modalsType,
        modalsTopval,
        modalSave,
			  Addcoursestypes
    }=this.state;
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
		// console.log("Addcourses");
		// console.log(Addcoursestypes)
    return(
      <div>
          <Modals
            loadtype={loadtype}
            modalsType={modalsType}
            modalsTopval={modalsTopval}
            modalSave={modalSave}
          />

          <Modal
            keyboard={false}
            className={"HomeworkModal"}
            title="加入课堂"
            visible={Addcoursestype===undefined||Addcoursestype===false?Addcoursestypes:Addcoursestype}
            closable={false}
            footer={null}
            destroyOnClose={true}
          >
						<Spin indicator={antIcon} spinning={this.state.isSpin}>
            <div className="task_popup_con  ml30">
              <div className="mr15">
                <ul>
                  <li className="clearfix mb10">
                    <label className="panel-form-label fl">课堂邀请码：</label>
                    <Input type="text" className="input-60-40 fl mt5" name="invite_code"
                           placeholder="请输入5位课堂邀请码或6位分班邀请码"
                           style={{width:'275px'}}
                           value={invite_code} onInput={this.inputjoinclassvalue}/>
                  </li>

                  <p id="none_invite_code_notice"
                     className="color-orange none f12"
                     // style={{marginLeft: '90px',display:code_notice===true?'block':"none"}}
                  >请输入5位课堂邀请码或6位分班邀请码</p>

                  <li className="clearfix ">

                    <label className="panel-form-label fl">身份：</label>
                    <span className="fl mr20 mt10">
                        <Checkbox onChange={this.Checkboxteacher} checked={Checkboxteacherchecked} disabled={Checkboxteachertype}>教师</Checkbox>
                    </span>

                    <span className="fl mr20 mt10">
                        <Checkbox onChange={this.Checkboxteaching} checked={Checkboxteachingchecked} disabled={Checkboxteachingtype} >助教</Checkbox>
                     </span>

                    <span className="fl mr20 mt10">
                        <Checkbox onChange={this.Checkboxstudent} checked={Checkboxstudentchecked}>学生/参赛者</Checkbox>
                     </span>

                  </li>

                  {
                    this.state.invite_codetype===true?
                      <span className={"color-red"}>
                        {this.state.invite_codevalue}
                      </span>:""
                  }
                  <p id="none_checked_notice" className="color-orange none f12"
                     // style={{marginLeft: '90px',display:checked_notice===true?'block':"none"}}
                  >请至少选择一个身份</p>

                  <li className="clearfix mt10 edu-txt-center">
                    <a className="task-btn mr10 color-white"
                       onClick={()=>this.hidetojoinclass()}>取消</a>
                    <a
                      className="task-btn task-btn-orange ml20"
                      onClick={()=>this.submittojoinclass()}>确定</a>
                  </li>

                </ul>
              </div>
            </div>
						</Spin>
          </Modal>
      </div>
    )
  }
}
export default Addcourses;

