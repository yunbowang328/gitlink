import React,{ Component } from "react";
import { Modal,Checkbox,notification} from "antd";
import axios from 'axios';

class Ecerciseallbackagain extends Component{
    constructor(props){
        super(props);
        this.state={
            data:undefined,
            limit:10,
            page:1,
            datalist:undefined,
            group_ids:undefined
        }
    }
    componentDidMount() {

        let url="/exercises/"+this.props.match.params.Id+"/redo_modal.json";

        axios.get(url,{params:{
                limit:10,
                page:1,
            }
        }).then((response) => {

            this.setState({
                data:response.data,
                datalist:response.data.exercise_users
            })
        }).catch((error) => {
            this.props.callback()
            console.log(error)
        });


    }

    //勾选实训
    shixunhomeworkedit=(checkedValues)=>{
        let{datalist}=this.state;
        if(checkedValues.length===datalist.length){
            this.setState({
                onChangetype:true,
                group_ids:checkedValues
            })
        }else{
            this.setState({
                group_ids:checkedValues,
                onChangetype:false
            })
        }
    }

    contentViewScroll=(e)=>{
        //滑动到底判断
			let newscrollTop=parseInt(e.currentTarget.scrollTop);
			let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

        if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
            let {page,limit,datalist}=this.state;
            let newpage=page+1;
            let newdata=datalist;

            let url="/exercises/"+this.props.match.params.Id+"/redo_modal.json";

            axios.get(url,{params:{
                    limit:limit,
                    page:newpage,
                }
            }).then((response) => {

                response.data.exercise_users.map((item,key)=>{
                    newdata.push(item)
                })
                this.setState({
                    datalist:newdata,
                    page:newpage
                })
            }).catch((error) => {
                console.log(error)
            });

        }
    }

    onChange=(e)=>{
        let{datalist}=this.state;
        if(e.target.checked===true){
            let id=[]
            datalist.map((item,key)=>{
                id.push(item.user_id)
            })

            this.setState({
                group_ids:id,
                onChangetype:e.target.checked
            })
        }else{
            this.setState({
                group_ids:[],
                onChangetype:e.target.checked
            })
        }
    }

    isSave=()=>{
        let{group_ids}=this.state;
        if(group_ids===undefined||group_ids.length===0){
            notification.open({
                message:"提示",
                description:"请先选择学生"
            });
            return
        }
        let url="/exercises/"+this.props.match.params.Id+"/redo_exercise.json";
        axios.post(url, {
            user_ids: group_ids,
        })
            .then((response) => {
                if (response.data.status === 0) {
                    this.props.callback(1)
                    notification.open({
                        message:"提示",
                        description:response.data.message
                    });
                }
                // else if(response.data.status === -1){
                //     notification.open({
                //         message: '参数错误',
                //     });
                // }else if(response.data.status === -2){
                //     notification.open({
                //         message: '当前作业不支持查重',
                //     });
                // }else if(response.data.status === -3){
                //     notification.open({
                //         message: '正在查重中',
                //     });
                // }else if(response.data.status === -4){
                //     notification.open({
                //         message: '查重异常',
                //     });
                // }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    issCancel=()=>{
        this.props.callback()
    }

    render(){
        let {datalist,group_ids,onChangetype}=this.state;

        console.log()
        return(
            <div>
							<style>
								{
									`
								@media (max-width: 2000px) {
											.newupload_select_box{
											  height: 265px !important;
											}
									}

								 @media (max-width: 1350px) {
										.HomeworkModal{
 										  top:10px !important;
 										}
 											.newupload_select_box{
											  height: 220px !important;
											}
									}

	 								@media (max-width: 1250px) {
 										.HomeworkModal{
 										  top:0px !important;
 										}

 										.newupload_select_box{
											  height: 150px !important;
									  }
									}
									.eerxisbox:hover {
											background: #e4eaf6;
									}
									.upload_select_box li:hover {
										background:transparent;
									}
									`
								}
							</style>
                <Modal
                    className={"HomeworkModal"}
                    title={this.props.modalname}
                    visible={this.props.visible}
                    closable={false}
                    footer={null}
                    keyboard={false}
                    destroyOnClose={true}
                >
                    <div className="task-popup-content">

                        <style>{`
												.greybackHead{
													padding:0px 30px;
												}
												.fontlefts{text-align: left;}
											`}</style>

                        <div className="clearfix edu-txt-center mb10" style={{color:"#333333",fontSize: '15px'}}>学生将得到一次重新答题的机会，现有的答题情况将被清空</div>
                        <ul className="clearfix edu-txt-center ml35">
                            <li className="fl paddingleft22 fontlefts" style={{width:'160px'}}>姓名</li>
                            <li className="fl edu-txt-left" style={{width:'124px'}}>学号</li>
                            <li className="fr" style={{width:'170px'}}>成绩</li>
                        </ul>

                        {datalist===undefined?"":
                            <ul className="upload_select_box fl clearfix mt10 mb10 newupload_select_box" style={{"overflow-y":"auto"}}
                                id="search_not_members_list"
                                onScroll={this.contentViewScroll}
                            >
                                <Checkbox.Group style={{ width: '100%' }}  onChange={this.shixunhomeworkedit} value={group_ids}>

                                    { datalist.map((item,key)=>{
                                                return(
                                                    <div className="clearfix edu-txt-center lineh-40 eerxisbox" key={key}>
                                                        <li className="fl" style={{width: '158px'}}>
                                                            <Checkbox
                                                                className="fl task-hide edu-txt-left"
                                                                name="shixun_homework[]"
                                                                value={item.user_id}
																																key={item.user_id}
                                                            >
                                                                <a style={{"textAlign": "left"}}
                                                                   className="task-hide color-grey-name"
																																	 href={`/users/${item.user_id}/courses`}
																																	 target={'_blank'}
																																	 title={item.user_name}
																																>{item.user_name}</a>
                                                            </Checkbox>
                                                        </li>
                                                        <li className="fl" style={{width: '150px'}}>
                                                            {item.student_id}
                                                        </li>
                                                        <li className="fr" style={{width: '170px',color:'#FF6800'}}>
                                                            {item.user_score}
                                                        </li>
                                                    </div>
                                                )
                                            })}

                                </Checkbox.Group>
                            </ul>
                        }

                        <div className={"clearfix mt5 ml10"}>
                            <Checkbox checked={onChangetype} onChange={this.onChange}>{onChangetype===true?"清除":"全选"}</Checkbox>
                        </div>

                        <div className="clearfix edu-txt-center">
                            <a  className="task-btn color-white mr30" onClick={this.issCancel}>取消</a>
                            <a className="task-btn task-btn-orange" onClick={this.isSave}>确认</a>
                        </div>

                    </div>
                </Modal>
            </div>
        )
    }
}
export default Ecerciseallbackagain;