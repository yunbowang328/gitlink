import React,{ Component } from "react";
import { Modal,Radio,Input,Tooltip,Checkbox,Select, Row,Col } from "antd";
import axios from 'axios';
import { SnackbarHOC } from 'educoder';
import moment from 'moment';
import Modals from '../../modals/Modals';
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
class sendPanel extends Component{
  constructor(props){
    super(props);
    this.state={
      sentShixunPath:false,
      sendToCourseList:undefined,
      openSearch:false,
      sendToCourseId:undefined,
      sendToShixunArray:[],
      Modalstype:false,
      cardsModalcancel:this.cardsModalcancel,
      cardsModalsave:this.cardsModalsave,
      modalsTopval:'',
      Modalsbottomval:'',
      courseurl:''
    }
  }


  //发送至
  SentToLesson =() =>{
		let id=this.props.detailInfoList.id;
		let url="/paths/"+id+"/choose_course.json";
		axios.get(url).then((result)=>{
			if(result.status==200){

				if (result.data.status === 403||result.data.status === 402||result.data.status === 407||result.data.status === 408) {

				}else{
					this.setState({
						sendToCourseList:result.data,
						sentShixunPath:true
					})
				}

			}
		}).catch((error)=>{
			console.log(error);
		})
    // this.setState({
    //   sentShixunPath:true
    // })
  }
  //隐藏发送至弹框
  hideSenttothevalue =()=>{
    this.setState({
      sentShixunPath:false,
			sendToShixunArray:[],
			sendToCourseId:undefined,
    })
  }
  //打开课堂列表下拉框
  openList=()=>{
    this.setState({
      openSearch:true
    })
  }
  //关闭课堂列表下拉框
  closeList=()=>{
    this.setState({
      openSearch:false
    })
  }

  // 选择课堂获取选中的Id
  selectCloseList=(e)=>{
    this.setState({
      openSearch:false,
      sendToCourseId:e
    })
  }

  //选择checkbox
  changeCheckBoxs=(list)=>{
    this.setState({
      sendToShixunArray:list,
      // shixunNum:list.length
    })
  }

  //确认提交
  submitInfo=()=>{
    let {sendToCourseId,sendToShixunArray}=this.state;
    if(sendToCourseId===undefined){
      this.props.showSnackbar("您还未选择发送的课堂");
    }else if(parseInt(sendToShixunArray.length)==0){
      this.props.showSnackbar("您还未选择实训");
    }else{
      let id=this.props.detailInfoList.id;
      let url="/paths/"+id+"/send_to_course.json";
      axios.post(url,{
        shixun_ids:sendToShixunArray,
        course_id:sendToCourseId
      }).then((result)=>{
        if(result.data.status===1){
          this.setState({
            Modalstype:true,
            sentShixunPath:false,
            Modalstopval:result.data.message,
            courseurl:result.data.url,
						sendToShixunArray:[],
						sendToCourseId:undefined,
          })
        }
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

  componentDidMount(){
    // let id=this.props.detailInfoList.id;
    // let url="/paths/"+id+"/choose_course.json";
    // axios.get(url).then((result)=>{
    //   if(result.status==200){
    //     this.setState({
    //       sendToCourseList:result.data
    //     })
    //   }
    // }).catch((error)=>{
    //   console.log(error);
    // })
  }

 cardsModalcancel=()=>{
   this.setState({
     Modalstype:false,
   })
 }
  cardsModalsave=()=>{
    let {courseurl}=this.state;
    window.location.href =courseurl;
  }


	allChange = (e) => {

   if(e.target.checked===false){
		 this.setState({
			 sendToShixunArray: [],
		 })
	 }else{
		 let { sendToCourseList} = this.state;
		 let newlist = [];

		 sendToCourseList.stages.map((item,key)=>{
			 item.shixuns.map((items,keys)=>{
				 newlist.push(items.shixun_id)
			 })
		 })

		 this.setState({
			 sendToShixunArray: newlist,
		 })
	 }

	}

  render(){
    let{sentShixunPath,sendToCourseList,Modalstype,Modalstopval,Modalsbottomval,cardsModalcancel,cardsModalsave}= this.state;
    return(
      <div>

        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalsBottomval={Modalsbottomval}
          modalCancel={cardsModalcancel}
          modalSave={cardsModalsave}
        >
        </Modals>
        {
          this.props.detailInfoList===undefined?"":this.props.detailInfoList.allow_send===true?
            <Tooltip placement="bottom" title="以实训作业的形式发送到我的课堂">
              <a onClick = {this.SentToLesson} className="fr font-18 color-white kaike mr20 kkbths"
                style={{width:this.props&&this.props.widths}}
              >
                发送至
              </a>
            </Tooltip>:''
        }

        <Modal
          keyboard={false}
          title="发送至课堂"
          visible={sentShixunPath}
          closable={false}
          footer={null}
          destroyOnClose={true}
        >
          <div className="newupload_conbox">
            <style>{`
            body{
              overflow:hidden!important;
            }
          `}</style>
            <div className="mb20"
								 // onMouseLeave={this.closeList}
						>
              <Select
              placeholder="请选择您要发送的课堂"
              style={{"width":"100%"}}
              onSelect={this.selectCloseList}
              // onMouseEnter={this.openList}
              defaultOpen={false}
              // open={openSearch}
              optionLabelProp="name"
              >
              {
                sendToCourseList === undefined ? "": sendToCourseList.courses.map((item,key)=>{
                  return(
                      <Option key={item.course_id} id={key} name={item.course_name}>
                        <Row>
                          <Col className="fl with70 task-hide">{item.course_name}</Col>
                          <Col className="fl color-grey-9 with30 edu-txt-center">
														{moment( item.created_at ).format('YYYY-MM-DD HH:mm')}
                          </Col>
                        </Row>
                      </Option>
                  )
                })
              }
              </Select>
            </div>
            <div className="edu-back-skyblue pl15 pr15 clearfix over280 pt5">
              <CheckboxGroup onChange={this.changeCheckBoxs} value={this.state.sendToShixunArray}>

              {
                sendToCourseList && sendToCourseList.stages.map((item,key)=>{
                  return(
                    item.shixuns.map((items,keys)=>{
                      return(
                        <div className="mt5" key={keys}>
                          <Checkbox name={key} value={items.shixun_id} key={items.shixun_id}>{items.shixun_name}</Checkbox>
                        </div>
                      )
                    })

                  )
                })
              }

              </CheckboxGroup>
            </div>
						<div className="mt10 clearfix">

								<span className="fl ml15">
										<Checkbox className="fl"
								    onChange={(e)=>this.allChange(e)}
										>全选</Checkbox>
								</span>

						</div>
            <p className="color-grey-9 pl15 font-12 mt10">已选择 {this.state.sendToShixunArray.length} 个实训</p>
            <div className="mt20 clearfix edu-txt-center">
              <a onClick={this.hideSenttothevalue} className="pop_close task-btn mr30">取消</a>
              <a className="task-btn task-btn-orange" onClick={this.submitInfo}>确定</a>
            </div>
          </div>
        </Modal>
      </div>
    )
  }

}
export default SnackbarHOC()(sendPanel);