import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import {Tooltip,Modal,Icon,Spin,message} from 'antd';
import DetailCardsEditAndAdd from './DetailCardsEditAndAdd';
import DetailCardsEditAndEdit from './DetailCardsEditAndEdit';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from 'axios';
import { DragDropContext ,  Draggable, Droppable} from 'react-beautiful-dnd';
import Modals from '../../modals/Modals';
import '../../paths/ShixunPaths.css';
const $ = window.$
//
// //a little function to help us with reordering the result
// const reorder =  (list, startIndex, endIndex) => {
//   let newlist=list;
//   const result = Array.from(newlist.shixuns_list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   newlist.shixuns_list=result;
//   return newlist;
// };
//



class DetailCards extends Component{
  constructor(props){
    super(props)
    this.state={
      pathCardsList:undefined,
      dropid:undefined,
      dropidtype:false,
      idsum:undefined,
      pathCardsedittype:false,
      pathlistedit:undefined,
      pathid:undefined,
      Modalstype:false,
      Modalstopval:'',
      Modalsbottomval:'',
      cardsModalsave:this.cardsModalsave,
      cardsModalcancel:this.cardsModalcancel,
      delecttype:false,
      editdelectid:undefined,
      editbuttomtype:false,
      editbuttomtypeadd:false,
      showparagraph:false,
      showparagraphkey:"",
      showparagraphindex:"",
			isSpin:false
    }


    // this.onDragEnd = this.onDragEnd.bind(this);
  }

  getPathCardsList(){
    let pathid=this.props.match.params.pathId;
    let url=`/stages.json?subject_id=`+pathid;
    axios.get(url).then((result)=>{
      if(result.status===200){
        this.setState({
          pathCardsList:result.data.stages,
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }


  for_paragraph = (index) =>{
    $("#detail_for_paragraph_"+index).slideToggle(500);
  }

  componentDidMount(){
    let pathid=this.props.match.params.pathId;
    this.setState({
      pathid:pathid
    })
    this.getPathCardsList();

  }

  // onDragStart = () => {
  //   /*...*/
  // };
  // onDragUpdate = () => {
  //   /*...*/
  // }
  //
  // onDragEnd (result) {
  //
  //   let{pathCardsList}=this.state;
  //   // dropped outside the list
  //   let newpathCardsList=pathCardsList;
  //   if(!result.destination) {
  //     return;
  //   }
  //   var sum=result.source.droppableId.replace('ids','')
  //       sum=parseInt(sum)
  //
  //   const items = reorder(
  //     newpathCardsList[sum],
  //     result.source.index,
  //     result.destination.index
  //   );
  //   newpathCardsList[sum]=items
  //   this.setState({
  //     pathCardsList:newpathCardsList
  //   })
  // }

  pathCardsedit=(key,pathid)=>{

    let url=`/stages/`+pathid+`/edit.json`;
    axios.get(url).then((result)=>{
      if(result.status===200){
        this.setState({
          idsum:key,
          pathCardsedittype:true,
          pathlistedit:result.data,
          editbuttomtype:true,
          editbuttomtypeadd:true
        })
      }
    }).catch((error)=>{
      console.log(error);
    })

  }

  updatapathCardsedit=()=>{
    this.setState({
      idsum:undefined,
      pathCardsedittype:false,
      editbuttomtype:false,
      editbuttomtypeadd:false
    })
    this.getPathCardsList();
    this.props.updatadetailInfoLists();
  }

  delectpathCardsedit=(id)=>{

    this.setState({
      Modalstype:true,
      Modalstopval:'是否删除该章节？',
      Modalsbottomval:'',
      editdelectid:id,
      delecttype:true,
    })

  }

  delectpathCardseditfun=()=>{
    let {delecttype,editdelectid}=this.state;
    let id=editdelectid;
    if(delecttype===true){
      let url ='/stages/'+id+'.json'
      axios.delete(url).then((response) => {
        if(response.data.status===1){
          // window.location.href = "/paths/" + response.data.subject_id
          this.setState({
            idsum:undefined,
            pathCardsedittype:false,
            Modalstype:false,
            Modalstopval:'',
            Modalsbottomval:'',
            cardsModalsave:this.cardsModalsave,
            delecttype:false,
            editdelectid:undefined
          })
          // this.getPathCardsList();

          this.updatapathCardsedit()
        }
      }).catch((error) => {
        console.log(error)
      })
    }

  }

  // 关卡的上移下移操作
  operations = (url) => {
    let newurl = url+".json"
    axios.get(newurl).then((response) => {
      if(response.data.status===1){
        this.getPathCardsList();
      }
    }).catch((error) => {
      console.log(error);
    })

  }
  startgameid=(id)=>{

		if(this.props.checkIfLogin()===false){
		  this.props.showLoginDialog()
			return
		}

		if(this.props.checkIfProfileCompleted()===false){
		  this.props.showProfileCompleteDialog()
			return
		}


		// if(this.props.checkIfProfessionalCertification()===false){
		// 	this.props.showProfileCompleteDialog()
		// 	return
		// }


		let url = "/shixuns/" + id + "/shixun_exec.json";
		axios.get(url).then((response) => {

			if (response.data.status === -2) {
				this.setState({

					shixunsreplace:true,
					hidestartshixunsreplacevalue:response.data.message+".json"
				})
			} else if (response.data.status === -1) {
				console.log(response)
			}else if(response.data.status===-3){
				this.setState({
					shixunsmessage:response.data.message,
					startshixunCombattype:true,
				})
			} else {
				// window.location.href = "/tasks/" + response.data.game_identifier;
				// window.location.href = path
				// let path="/tasks/"+response.data.game_identifier;
				// this.props.history.push(path);
				window.open("/tasks/" + response.data.game_identifier);
			}
		}).catch((error) => {

		});


  }

	hidestartshixunsreplace=(url)=>{
		this.setState({
			isSpin:true,
		})
		axios.get(url).then((response) => {
			// debugger
			if(response.status===200){
				// let path="/shixuns/"+response.data.shixun_identifier+"/challenges";
				// this.props.history.push(path);
				message.success('重置成功，正在进入实训！');
				this.startgameid(response.data.shixun_identifier);
				this.setState({
					shixunsreplace:false,
					isSpin:false,
					startbtn:false,
				})

				// message.success('重置成功，正在进入实训！');
				// this.startshixunCombat();
			}}
		).catch((error) => {

		});

	}

  cardsModalcancel=()=>{
    this.setState({
      Modalstype:false,
      Modalstopval:'',
      Modalsbottomval:'',
      editdelectid:undefined
    })
  }
  cardsModalsave=()=>{
    this.setState({
      Modalstype:false,
      Modalstopval:'',
      Modalsbottomval:'',
      editdelectid:undefined
    })
  }

  editeditbuttomtypecanle=()=>{
    this.setState({
      editbuttomtype:true,
      editbuttomtypeadd:false
    })
  }

  showparagraph=(key,index)=>{
    this.setState({
      showparagraph:true,
      showparagraphkey:key,
      showparagraphindex:index
    })
  }

  hideparagraph=()=>{
    this.setState({
      showparagraph:false
    })
  }

	hidestartshixunCombattype=()=>{
		this.setState({
			startshixunCombattype:false
		})
	};

	Pathlisteditundefined=()=>{
  	this.setState({
			pathlistedit:undefined
		})
	};


	render(){
    let { pathCardsList,
      dropid,
      idsum,
      pathCardsedittype,
      pathlistedit,
      pathid,
      Modalstype,
      Modalstopval,
      Modalsbottomval,
      cardsModalsave,
      cardsModalcancel,
      delecttype,
			hidestartshixunsreplacevalue,
      editbuttomtype,
      editbuttomtypeadd,
      showparagraph,
      showparagraphkey,
      showparagraphindex
    }=this.state;
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
   // console.log("zzz"+this.props.MenuItemsindextype)
   //  console.log(this.props.detailInfoList&&this.props.detailInfoList.allow_visit)
    return(
      <div>


        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalsBottomval={Modalsbottomval}
          modalCancel={cardsModalcancel}
          modalSave={delecttype===true?this.delectpathCardseditfun:cardsModalsave}
        >
        </Modals>
				<Modal
					keyboard={false}
					title="提示"
					visible={this.state.startshixunCombattype}
					closable={false}
					footer={null}
				>
					<div className="task-popup-content">
						<p className="task-popup-text-center font-16 pb20">目前该实训项目尚在内测中，将于{this.state.shixunsmessage}之后开放，谢谢！</p>
					</div>
					<div className="task-popup-submit clearfix">
						{/*<a onClick={this.hidestartshixunCombattype} className="task-btn fl">取消</a>*/}
						<a className="task-btn task-btn-orange fr"
							 style={{marginRight:'51px'}}
							 onClick={this.hidestartshixunCombattype}>知道了</a>
					</div>
					{/*<p className="inviteTipbtn with100 fl">*/}
					{/*<a onClick={this.hidestartshixunCombattype}>知道了</a>*/}
					{/*</p>*/}
				</Modal>

				<Modal
					keyboard={false}
					title="提示"
					visible={this.state.shixunsreplace}
					closable={false}
					footer={null}
				>
					<Spin indicator={antIcon} spinning={this.state.isSpin}>
						<div className="task-popup-content">
							<p className="task-popup-text-center font-16 pb20">实训已经更新了，正在为您重置!</p>
						</div>
						<div className="task-popup-submit clearfix">
							<a className="task-btn task-btn-orange fr"
								 style={{marginRight:'51px'}}
								 onClick={() => this.hidestartshixunsreplace(hidestartshixunsreplacevalue)}>知道了</a>
						</div>
					</Spin>
				</Modal>
				<style>
					{
						`
						  .lessonvalue{
								max-width: 556px;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
								display: inline-block;
						  }
						`
					}
				</style>
        <div className="lesson-saved-list">
          {
            pathCardsList && pathCardsList.map((item,key)=>{

              return(
                <div className={"lesson-saved-list-item"} id={"stage_div_"+key} >
                  <p className="clearfix title-line">

                    <a className="fl ring-blue mr10 mt2">
                      <img src={getImageUrl("images/educoder/icon/charpter-white.svg")} className="fl ml3 mt3"/>
                    </a>
                    <span className="font-18 font-bd lessonvalue" title={item.stage_name}>{item.stage_name}</span>
                    {
                      idsum===key&&pathCardsedittype===true?'':

                        this.props.detailInfoList===undefined?"":
													this.props.current_user&&this.props.current_user.admin===true||this.props.current_user&&this.props.current_user.business===true?
														<a>
															<a className="fr mtf3">
																{ editbuttomtype===true?'':
																	<Tooltip placement="bottom" title="编辑"
																					 onClick={() => this.pathCardsedit(key, item.stage_id)}>
																		<i className="iconfont icon-bianjidaibeijing font-22 color-green"></i>
																	</Tooltip>
																}
															</a>
															{
																pathCardsList.length=== key+1?"":<a className="fr ring-op-green mr20" onClick={()=>this.operations(item.down_path)}>
																	<Tooltip placement="bottom" title="向下移动">
																		<img src={getImageUrl("images/educoder/icon/movedown.svg")} className="fl mt2 ml4"/>
																	</Tooltip>
																</a>
															}


															{key===0?"":
																<a className="fr ring-op-green mr20" onClick={()=>this.operations(item.up_path)}>
																	<Tooltip placement="bottom" title="向上移动">
																		<img src={getImageUrl("images/educoder/icon/moveup.svg")} className="fl mt2 ml4"/>
																	</Tooltip>
																</a>}

														</a>:
													this.props.detailInfoList.allow_statistics===true?
                          <a>
                            <a className="fr mtf3">
                              { editbuttomtype===true?'':
                                <Tooltip placement="bottom" title="编辑"
                                         onClick={() => this.pathCardsedit(key, item.stage_id)}>
                                  <i className="iconfont icon-bianjidaibeijing font-22 color-green"></i>
                                </Tooltip>
                              }
                            </a>
                            {
                              pathCardsList.length=== key+1?"":<a className="fr ring-op-green mr20" onClick={()=>this.operations(item.down_path)}>
                                <Tooltip placement="bottom" title="向下移动">
                                  <img src={getImageUrl("images/educoder/icon/movedown.svg")} className="fl mt2 ml4"/>
                                </Tooltip>
                              </a>
                            }


                            {key===0?"":
                            <a className="fr ring-op-green mr20" onClick={()=>this.operations(item.up_path)}>
                              <Tooltip placement="bottom" title="向上移动">
                                <img src={getImageUrl("images/educoder/icon/moveup.svg")} className="fl mt2 ml4"/>
                              </Tooltip>
                            </a>}

                          </a>:""


                    }

                    {
                      idsum === key && pathCardsedittype === true ?
                        this.props.detailInfoList===undefined?"":
													this.props.current_user&&this.props.current_user.admin===true||this.props.current_user&&this.props.current_user.business===true?
														<a className="fr" onClick={()=>this.delectpathCardsedit(item.stage_id)}>
															<Tooltip placement="bottom" title="删除">
																<i className="iconfont icon-shanchu color-grey-c font-14 font-n"></i>
															</Tooltip>
														</a>:
													this.props.detailInfoList.allow_statistics===true?
                        <a className="fr" onClick={()=>this.delectpathCardsedit(item.stage_id)}>
                          <Tooltip placement="bottom" title="删除">
                            <i className="iconfont icon-shanchu color-grey-c font-14 font-n"></i>
                          </Tooltip>
                        </a>:""
                        : ''
                    }
                  </p>


                  {
                    idsum===key&&pathCardsedittype===true?'':
                      <div className="detail_for_paragraph clearfix" id={"detail_for_paragraph_"+key}>
                        <p className="color-dark-grey mt20 mb25 ml20 mr20 pl28 justify font-15">{item.stage_description}</p>

                        <div>

													{this.props.current_user&&this.props.current_user.admin===true||this.props.current_user&&this.props.current_user.business===true?
														item.shixuns_list && item.shixuns_list.map((line,index)=>{
														return(
                              <div className="clearfix paragraph lineh-30" onMouseEnter={()=>this.showparagraph(key,index)} onMouseLeave={this.hideparagraph}>


                              <li className="fl li-width63">

                                      <span className="progressRing mr10">
                                      {
																				line.complete_status === 1 ?<i className="iconfont icon-wancheng progressRing-over font-18 mt10"></i>
																					:<i className="iconfont icon-bofang progressRing-part font-18 mt10"></i>
																			}
                                      </span>
																	<span className={"paragraph_name color-grey3"}>
                                        <span className="subject_stage_shixun_index">{key+1}</span>-{index+1}&nbsp;&nbsp;{line.shixun_name}
                                      </span>

																</li>


																<li className={showparagraph===false?"none":"fr status_li"}>
																	{
																		showparagraphkey===key&&showparagraphindex===index?<div>
																			<Link to={'/shixuns/'+line.identifier+'/challenges'} className="mr30 color-blue_4C shixun_detail pointer fl" target="_blank">查看详情</Link>
                                     {line.shixun_status==="暂未公开"?"":<a  onClick={()=>this.startgameid(line.identifier)} className="btn_auto user_bluebg_btn fl" id="shixun_operation" >开始实战</a>}
                                    </div>:""
																	}
																</li>

															</div>)
													}):item.shixuns_list && item.shixuns_list.map((line,index)=>{
                              return(
                                <div className="clearfix paragraph lineh-30" onMouseEnter={()=>this.showparagraph(key,index)} onMouseLeave={this.hideparagraph}>

                                  <li className="fl li-width63">

                                      <span className="progressRing mr10">
                                      {
                                        line.complete_status === 1 ?<i className="iconfont icon-wancheng progressRing-over font-18 mt10"></i>
                                          :<i className="iconfont icon-bofang progressRing-part font-18 mt10"></i>
                                      }
                                      </span>
                                    <span className={line.allow_visit===false&&line.shixun_status==="暂未公开"?"paragraph_name color204":"paragraph_name color-grey3"}>
                                        <span className="subject_stage_shixun_index">{key+1}</span>-{index+1}&nbsp;&nbsp;{line.shixun_name}
                                      </span>

                                  </li>
                                  {
                                    line.allow_visit===false&&line.shixun_status==="暂未公开"?
                                      <li className="fr status_li"><span className="fr color204">暂未公开</span></li>
                                      :
                                      <li className={showparagraph===false?"none":"fr status_li"}>
                                        {
                                          showparagraphkey===key&&showparagraphindex===index?this.props.detailInfoList&&this.props.detailInfoList.allow_statistics===false&&this.props.current_user&&this.props.current_user.user_identity==="学生"&&this.props.courses!=undefined?"":<div>
                                            <Link to={'/shixuns/'+line.identifier+'/challenges'} className="mr30 color-blue_4C shixun_detail pointer fl" target="_blank">查看详情</Link>
																						{line.shixun_status==="暂未公开"?"":<a  onClick={()=>this.startgameid(line.identifier)} className="btn_auto user_bluebg_btn fl" id="shixun_operation" >开始实战</a>}
                                          </div>:""
                                        }

                                      </li>
                                  }
                                </div>)
                            })
                          }
                        </div>
                      </div>
                  }
										<DetailCardsEditAndEdit
                      {...this.props}
											idsum={idsum}
											keys={key}
											pathCardsedittype={pathCardsedittype}
											updatapathCardsedits={this.updatapathCardsedit}
											pathlisteditlist={pathlistedit}
											stageid={item.stage_id}
											pathid={pathid}
											Pathlisteditundefined={this.Pathlisteditundefined}
										></DetailCardsEditAndEdit>
                </div>
              )
            })
          }
        </div>


        { editbuttomtypeadd===true?'':
          <DetailCardsEditAndAdd
						{...this.props}
            sum={ pathCardsList && pathCardsList.length+1}
            pathid={pathid}
            detailInfoList={this.props.detailInfoList}
            getPathCardsLists={this.updatapathCardsedit}
            editeditbuttomtypes={this.editeditbuttomtypecanle}
          ></DetailCardsEditAndAdd>
            }

      </div>
    )
  }
}
export default DetailCards;






//                  {
//                     idsum===key&&pathCardsedittype===true?'':
//                      <div className="detail_for_paragraph clearfix" id={"detail_for_paragraph_"+key}>
//                         <p className="color-dark-grey mt20 mb25 ml20 mr20 pl28 justify font-15">{item.stage_description}</p>
//
//
//                         <DragDropContext onDragEnd={this.onDragEnd}>
//                             <Droppable
//                               droppableId={'ids'+key}
//                             >
//                               {(provided, snapshot) => (
//
//                             <div
//                               ref={provided.innerRef}
//                               {...provided.droppableProps}
//                             >
//
//                             {
//                             item.shixuns_list && item.shixuns_list.map((line,index)=>{
//                             return(
//                               <Draggable
//                                 key={'id'+index}
//                                 draggableId={'id'+index}
//                                 index={index}
//                               >
//                                 {(provided, snapshot) => (
//                                 <div className="clearfix paragraph lineh-30"
//                                      ref={provided.innerRef}
//                                      {...provided.draggableProps}
//                                      {...provided.dragHandleProps}
//                                 >
//
//                                 <li className="fl li-width63">
//
//                                     <span className="progressRing mr10">
//                                     {
//                                       line.complete_status === 1 ?<i className="iconfont icon-wancheng progressRing-over font-18 mt10"></i>
//                                       :<i className="iconfont icon-bofang progressRing-part font-18 mt10"></i>
//                                     }
//
//                                     </span>
//
//                                     <span className={line.shixun_status==="暂未公开"?"paragraph_name color204":"paragraph_name color-grey3"}>
//                                       <span className="subject_stage_shixun_index">{key+1}</span>-{index+1}&nbsp;&nbsp;{line.shixun_name}
//                                     </span>
//
//                                     </li>
//                                       {
//                                       line.shixun_status==="暂未公开"?
//                                       <li className="fr status_li"><span className="fr color204">暂未公开</span></li>
//                                       :
//                                         <li className="fr status_li">
//                                         <a href={line.shixun_path} className="mr30 color-blue_4C shixun_detail pointer fl" target="_blank">查看详情</a>
//                                         <a href={line.tpi_path} class="btn_auto user_bluebg_btn fl" id="shixun_operation" target="_blank">开始实战</a>
//                                 </li>
//                                  }
//                                   {provided.placeholder}
//                                      </div>
//                                 )}
//                                 </Draggable>
//                                    )
//                                 })
//                               }
//                             </div>
//                           )}
//                         </Droppable>
//                       </DragDropContext>
//                     </div>
// }
