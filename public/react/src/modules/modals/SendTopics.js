import React,{ Component } from "react";
import { Modal,Radio,Input,Tooltip,Checkbox,Select, Row,Col ,Spin} from "antd";
import axios from 'axios';
const { Search } = Input;
class SendTopics extends Component{
  constructor(props){
    super(props);
    this.state={
			courses:[],
			search:null,
			Radiolist:undefined,
			showcheck:false,
			smallisSpin:false,
			yslbanksMenu:undefined
    }
  }




  componentDidMount(){
		// console.log("SendTopicssssssssssss");
		// console.log(this.props);
		let{search}=this.state;
    this.onupdatalist(search)
		this.setState({
			yslbanksMenu:this.props.banksMenu,
		})
  }

  onupdatalist=(search)=>{
		let url="/question_banks/my_courses.json";
		axios.get(url,{params:{
				search
			}
		}).then((result)=>{
			this.setState({
				courses:result.data.courses
			})
		}).catch((error)=>{
			console.log(error);
		})
	}

	onSearchChange=(e)=>{
  	this.setState({
			search:e.target.value
		})
		// this.onupdatalist(e.target.value)
	}

	onSearch=(search)=>{
		this.onupdatalist(search)
	}


	onChange=(e)=>{
  	console.log("SendTopics");
  	console.log(e);
  	 this.setState({
			 Radiolist:e.target.value
		 })
	}

	submitInfo=()=>{
  	this.setState({
			smallisSpin:true
		})
		let{Radiolist}=this.state;
		let url=`/question_banks/send_to_course.json`;
		let object_id=this.props.checkBoxValues;
		let object_type=this.props.category;
		if(Radiolist===undefined){
      this.setState({
				showcheck:true,
				smallisSpin:false
			})
		}else{
			axios.post(url,{
					object_id: object_id,
					object_type:object_type,
					course_id:Radiolist
				}
			).then((result)=>{
				this.setState({
					smallisSpin:false
				})
				if(result.data.status===0){
					this.props.showNotification(result.data.message);
					this.props.topicscancelmodel();
					// result.data.task_ids;

					try {
						this.props.updataslist()
					}catch (e) {

					}
debugger
					if(this.props.mysendall===true){
						//详情页面跳过来的
					try {
						var rurls="";
						 if(this.state.yslbanksMenu.category==="normal"){
						 	//普通作业
							  rurls=`/courses/${this.state.Radiolist}/common_homeworks/${result.data.task_ids}/setting`;
						 }else if(this.state.yslbanksMenu.category==="group"){
						 	//分组作业
							  rurls=`/courses/${this.state.Radiolist}/group_homeworks/${result.data.task_ids}/setting`;
						 }else if(this.state.yslbanksMenu.category==="exercise"){
						 	// 试卷
						 	  rurls=`/courses/${this.state.Radiolist}/exercises/${result.data.task_ids}/student_exercise_list?tab=3`;
						 }else if(this.state.yslbanksMenu.category==="poll") {
						 	 //问卷
							 rurls=`/courses/${this.state.Radiolist}/polls/${result.data.task_ids}/detail?tab=3`
						 }
						window.open(rurls,'_blank');
					}catch (e) {

					}
					}else{
						//外部多个列表页跳过来的
						debugger
						try {
							var rurls="";
							if(this.props.category==="normal"){
								//普通作业
								rurls=`/courses/${this.state.Radiolist}/common_homeworks/${result.data.category_id}`;
							}else if(this.props.category==="group"){
								//分组作业
								rurls=`/courses/${this.state.Radiolist}/group_homeworks/${result.data.category_id}`;
							}else if(this.props.category==="exercise"){
								// 试卷
								rurls=`/courses/${this.state.Radiolist}/exercises/${result.data.category_id}`;
							}else if(this.props.category==="poll") {
								//问卷
								rurls=`/courses/${this.state.Radiolist}/polls/${result.data.category_id}`
							}
							window.open(rurls,'_blank');
						}catch (e) {
                 console.log(e);
						}
					}
				}else{
					this.props.showNotification(result.data.message)
				}
			}).catch((error)=>{
				console.log(error)
				this.setState({
					smallisSpin:false
				})
			})
		}

	}
  render(){
    let{courses,Radiolist,showcheck,smallisSpin}= this.state;

		const radioStyle = {
			display: 'block',
			height: '30px',
			lineHeight: '30px',
		};

    return(
      <div>


	      <style>
					{
						`
						.ant-modal-body{
						 padding:20px 40px;
						}
						.onSearchtopics input{
						  height:40px;
						}
						.over221{
						  height:221px;
						  overflow-y: auto;
						}

						`
					}
				</style>
        <Modal
          keyboard={false}
          title="发送至课堂"
          visible={this.props.visible}
          closable={false}
          footer={null}
          destroyOnClose={true}
					width={600}
        >
          <div className="newupload_conbox">
						<div className="mb15 font-14 edu-txt-center color-orange-tip">
							温馨提示：选择的题将会发送到指定课堂
						</div>
            <div className="mb5"
								 // onMouseLeave={this.closeList}
						>
							<Search
								className="mb14 onSearchtopics"
								placeholder="请输入课堂名称进行搜索"
								onChange={this.onSearchChange}
								onSearch={this.onSearch}
							></Search>
            </div>
            <div className="edu-back-skyblue pl15 pr15 clearfix over221 pt5">
							<Radio.Group onChange={this.onChange} value={Radiolist}>
								{
									courses && courses.map((item,key)=>{
										return(
													<div className="mt5" key={key}>
															<Radio style={radioStyle} value={item.course_id} key={item.course_id}>
																	{item.course_name}
															</Radio>
													</div>
										)
									})
								}
							</Radio.Group>

            </div>
						{showcheck===true?<div className={"color-red mt10"}>请先选择课堂</div>:""}
            <div className="mt20 clearfix edu-txt-center" >
              <a onClick={()=>this.props.topicscancelmodel()} className="pop_close task-btn mr30 ">取消</a>
				    	<a className="task-btn task-btn-orange" onClick={()=>this.submitInfo()}>确定</a>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
  
}
export default SendTopics;