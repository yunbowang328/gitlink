import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import {Modal,Input,Checkbox,Tooltip,Spin,notification} from "antd";
import { DragDropContext ,  Draggable, Droppable} from 'react-beautiful-dnd';
import Modals from '../../modals/Modals';
import Addshixuns from './Addshixuns';
import '../ShixunPaths.css';
import axios from 'axios';
import NewShixunModel from '../../courses/coursesPublic/NewShixunModel';
import GotoQQgroup from "../../../modal/GotoQQgroup";

const $ = window.$;
const Search = Input.Search;

//a little function to help us with reordering the result
const reorder =  (list, startIndex, endIndex) => {
  // console.log(list)
  // console.log(startIndex)
  // console.log(endIndex)

  let newlist=list;
  const result = Array.from(newlist);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  // change background colour if dragging
  background: isDragging ? '#dceeff' : '',
  // styles we need to apply on draggables
  ...draggableStyle,
});

class DetailCardsEditAndAdd extends Component{
  constructor(props){
    super(props);
    this.state={
      selectShixun:false,
      editPanel:false,
      search:"",
      type:0,
      page:1,
      ChooseShixunList:undefined,
      hometypepvisible:true,
      shixuns_listedit:[],
      shixuns_listeditlist:[],
      patheditarry:[],
      stage_descriptions:undefined,
      stage_names:undefined,
      delectfunvalue:undefined,
      Modalstype:false,
      Modalstopval:"",
      Modalsbottomval:"",
      ChooseShixunListshixun_list:undefined,
      stage_nametype:false,
      descriptiontype:false,
			Addshixunstype:false,
			goshowqqgtounp:false,

		}
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  //选择实训弹框
  AddShixunBox = () =>{
    this.setState({
      selectShixun:true,
      patheditarry:[],
    })
    // this.changeTag(0,"");
  }

  //关闭选择实训弹框
  cloasShixunBox =()=>{
    this.setState({
      selectShixun:false,
      patheditarry:[]
    })
  }
	showNotification = (description, message = "提示", icon) => {
		const data = {
			message,
			description
		}
		if (icon) {
			data.icon = icon;
		}
		notification.open(data);
	}
  clickShixunchoose=(patheditarry)=>{

    let{shixuns_listeditlist,shixuns_listedit}=this.state

    let newshixuns_listedit=shixuns_listedit;
    let list=shixuns_listeditlist

    let url='/paths/append_to_stage.json'
    axios.post(url,{
      shixun_id:patheditarry
    }).then((response) => {
      if(response){
        if(response.data){
          let newshixun_lists=response.data.shixun_lists;

					for(var j=0; j<newshixuns_listedit.length; j++){
						for(var a=0; a<newshixun_lists.length; a++){
							if(newshixuns_listedit[j].shixun_id===newshixun_lists[a].shixun_id){
								// this.setState({
								//   Modalstype:true,
								//   Modalstopval:'请勿重复选择'+newshixun_lists[a].shixun_name+'实训',
								// })
								this.showNotification('请勿重复选择：'+newshixun_lists[a].shixun_name+'实训')
								return
							}
						}
					}

          for(var z=0; z<newshixun_lists.length; z++){
            newshixuns_listedit.push(newshixun_lists[z]);
          }


          for(var i=0; i<newshixun_lists.length; i++){
            list.push(newshixun_lists[i].shixun_id);
          }

          this.setState({
            shixuns_listedit:newshixuns_listedit,
            shixuns_listeditlist:list,
            patheditarry:[],
            selectShixun:false,
            page:1,
          })
        }

      }

    }).catch((error) => {
      console.log(error)
    });

  }

  //点击新建阶段
  addStage=()=>{
    this.setState({
      editPanel:true
    })
    this.props.editeditbuttomtypes();


  }
  //取消新建阶段
  cancelAddState = () =>{
    this.setState({
      editPanel:false,
      stage_names:undefined,
      stage_descriptions:undefined,
      shixuns_listeditlist:[],
      shixuns_listedit:[]
    })
    this.props.getPathCardsLists();
  }

  searchNameInput=(e)=>{
    this.setState({
      search:e.target.value
    })
  }



  //勾选实训
  shixunhomeworkedit=(list)=>{

    let newpatheditarry=[];
    for(var i=0; i<list.length;i++){
      newpatheditarry.push(list[i])
    }
    this.setState({
      patheditarry:newpatheditarry
    })

  }
  //双向绑定
  updatastage_names=(e)=>{

    this.setState({
      stage_names:e.target.value
    })

  }

  updatastage_descriptions=(e)=>{

    this.setState({
      stage_descriptions:e.target.value
    })

  }

  //删除实训
  shixunslisteditdelect=(e)=>{
    this.setState({
      Modalstype:true,
      Modalstopval:'是否删除该实训？',
      Modalsbottomval:'',
      delectfunvalue:e.target.id
    })
  }
  shixunslisteditdelectfun=()=>{
    let {delectfunvalue}=this.state;
    let sum = parseInt(delectfunvalue);
    let {shixuns_listedit,shixuns_listeditlist} =this.state;
    let newshixuns_listedit=shixuns_listedit
    let newshixuns_listeditlist=shixuns_listeditlist
    newshixuns_listedit.splice(sum, 1);
    newshixuns_listeditlist.splice(sum, 1);
    this.setState({
      shixuns_listedit:newshixuns_listedit,
      shixuns_listeditlist:newshixuns_listeditlist
    })
    this.setState({
      Modalstype:false,
      Modalstopval:'',
      Modalsbottomval:'',
      delectfunvalue:undefined
    })
  }
  cardsModalcancel=()=>{
    this.setState({
      Modalstype:false,
      Modalstopval:'',
      Modalsbottomval:'',
      delectfunvalue:undefined,
			Addshixunstype:false
    })
  }

  //保存
  clickShixunsaves=()=>{

    let{stage_names,stage_descriptions,shixuns_listeditlist}=this.state;
    let newstage_descriptions=stage_descriptions;

    if(stage_names===""||stage_names===undefined){

      this.setState({
        stage_nametype:true
      })

      return
    }else{
      this.setState({
        stage_nametype:false
      })
    }

    if(newstage_descriptions!=undefined){

      if(newstage_descriptions.length>300){

        this.setState({
          descriptiontype:true
        })

        return
      }
    }else{
      newstage_descriptions=""
    }



    let pathId=this.props.pathid;
    let url;
    if(this.props.ysldetailcards===undefined){
      url='/stages.json?subject_id='+pathId;
    }else{
      url=`/courses/${this.props.coursesId}/course_stages.json`;
    }
    axios.post(url, {
      name:stage_names,
      description:newstage_descriptions,
      shixun_id:shixuns_listeditlist
    }).then((response) => {
      // window.location.href = "/paths/" + response.data.subject_id
      this.cancelAddState();
      this.setState({
        stage_nametype:false,
        descriptiontype:false
      })
      this.props.getPathCardsLists();
    }).catch((error) => {
      console.log(error)
    });
  }



  onDragEnd (result) {

    let {shixuns_listedit,shixuns_listeditlist} =this.state;
    const listedit = reorder(
      shixuns_listedit,
      result.source.index,
      result.destination.index
    );
    const listeditlist = reorder(
      shixuns_listeditlist,
      result.source.index,
      result.destination.index
    );
    this.setState({
      shixuns_listedit:listedit,
      shixuns_listeditlist:listeditlist
    })
  }

	Addshixuns=()=>{
		// debugger
		// console.log("点击了新建实训Addshixuns");
		if(this.props&&this.props.current_user&&this.props.current_user.is_shixun_marker===false){
			this.setgoshowqqgtounp(true);
			return;
		}
		this.setState({
			Addshixunstype:true,
		})
	}

	Getaddshixuns=(value,is_jupyter)=>{
		let {
			shixuns_listeditlist,
			shixuns_listedit,
			} = this.state
		let newshixuns_listedit=shixuns_listedit;
		let list=shixuns_listeditlist
		let url='/paths/add_shixun_to_stage.json';
		axios.post(url,{
			name:value,
      is_jupyter:is_jupyter
		}).then((response) => {
			if(response){
				if(response.data){
					newshixuns_listedit.push(response.data);
					list.push(response.data.shixun_id);
					this.setState({
						shixuns_listedit:newshixuns_listedit,
						shixuns_listeditlist:list,
						patheditarry:[],
						selectShixun:false,
						page:1,
					})
				}
			}
		}).catch((error) => {
			console.log(error)
		});
	}
	// 处理弹框
	setgoshowqqgtounp=(bool)=>{
		this.setState({
			goshowqqgtounp:bool
		})
	}

  render(){
    let {selectShixun,
      editPanel,
      ChooseShixunList,
      type,
      page,
      search,
      hometypepvisible,
      stage_descriptions,
      stage_names,
      shixuns_listedit,
      delectfunvalue,
      Modalstype,
      Modalstopval,
      Modalsbottomval,
      ChooseShixunListshixun_list,
      stage_nametype,
      descriptiontype,
			goshowqqgtounp
		} = this.state


    return(
      <div>
				{
					goshowqqgtounp===true?
						<GotoQQgroup {...this.state} {...this.props} setgoshowqqgtounp={(bool)=>this.setgoshowqqgtounp(bool)}></GotoQQgroup>
						:
						""
				}
        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalsBottomval={Modalsbottomval}
          modalCancel={this.cardsModalcancel}
          modalSave={this.shixunslisteditdelectfun}
        >
        </Modals>

				{this.state.Addshixunstype===true?<Addshixuns
					modalCancel={this.cardsModalcancel}
					Setaddshixuns={(value,is_jupyter)=>this.Getaddshixuns(value,is_jupyter)}
					{...this.props}
					{...this.state}
				/>:""}

				<style>
					{
						`
						.mb10 {
								margin-bottom: 10px !important;
						}
						`
					}
				</style>
        { editPanel &&
        <div className="lesson-edit-content mb10">
          <div className="clearfix edu-back-white pt30 pb30">
            <p className="clearfix mb30 font-18 font-bd pl25 pr25">
              <a className="fl ring-blue mr10 mt2">
                <img src={getImageUrl("images/educoder/icon/charpter-white.svg")} className="fl ml3 mt3"/>
              </a>
              <span className="fl">第{this.props.sum}部分</span>
              {/*<a className="fr"><i className="iconfont icon-shanchu color-grey-c font-14 font-n"></i></a>*/}
            </p>
            <div className="pl50 pr20 clearfix">
              <p className="color-grey-6 font-16 mb20">章节名称</p>
              <div className="df mb30">
                <span className="mr30 color-orange pt10">*</span>
                <div className="flex1 mr20">
                  <input maxLength="60"  type="text" style={{width:'670px'}} className={stage_nametype===false?"input-100-45 greyInput":"input-100-45 greyInput bor-red"} name="stage_name" value={stage_names} onInput={this.updatastage_names} placeholder={"请输入第"+this.props.sum+"阶段名称,最大限制60个字符"}/>
                  <div className={stage_nametype===true?"red":'none'}>名称不能为空</div>
                </div>
                <div style={{"width":"60px"}}><span className="color-orange fl mt8 none" id="stage_name_notice"><i className="iconfont icon-tishi font-14 mr3"></i>必填项</span></div>
              </div>
              <p className="color-grey-6 font-16 mb20">描述</p>
              <div className="width89 mb30 pl38">
                <textarea className={descriptiontype===false?"winput-100-130":"winput-100-130 bor-red"}
                          style={{width:'670px'}}
                          name="stage_des"
                          value={stage_descriptions}
                          onInput={this.updatastage_descriptions}
                          placeholder={"请输入第"+this.props.sum+"阶段描述"}></textarea>
                <div className={descriptiontype===true?"red":"none"}>描述不能超多最大限制300个字符</div>
              </div>

              <p className="clearfix mb10">
                <a  onClick={()=>this.Addshixuns()}  className="fl defalutGreyBorder color-grey-6 ml37">
                  <i className="iconfont icon-tianjiafangda fl mr5"></i>
								新建实训项目</a>
              </p>

							<p className="clearfix mb10">
								<a onClick={()=>this.AddShixunBox()} className="fl defalutGreyBorder color-grey-6 ml37">
									<i className="iconfont icon-tianjiafangda fl mr5"></i>
									选用实训项目</a>

							</p>
							<p className="mb30">
								<span id="sx_notice" className="ml37 color-grey-9 mt5 ">下面实训可以通过拖拽进行排序调整</span>
							</p>
              {selectShixun===true?<style>
                {
                  `
              body {
							  overflow: hidden !important;
							}
              `
                }
              </style>:""}
							{selectShixun===true?<NewShixunModel
							NewShixunModelType={selectShixun}
							type={'shixuns'}
							hideNewShixunModelType={this.cloasShixunBox}
							pathShixun={this.clickShixunchoose}
							{...this.props}
						></NewShixunModel>:""}

            </div>

            {/* 可拖拽选择实训列表*/}
            {shixuns_listedit===undefined?'':

              <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable
                  droppableId={'ids2'}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {shixuns_listedit.map((item,key)=>{
                        return(
                          <Draggable
                            key={'id'+key}
                            draggableId={'id'+key}
                            index={key}
                          >
                            {(provided, snapshot) => (
                              <div className="clearfix paragraph lineh-30"
                                   key={key}
                                   ref={provided.innerRef}
                                   {...provided.draggableProps}
                                   style={getItemStyle(
                                     snapshot.isDragging,
                                     provided.draggableProps.style
                                   )}
                                   {...provided.dragHandleProps}
                              >

                                <li className="fl li-width63">

                                <span className="progressRing mr10">
                                    <i className="iconfont icon-bofang progressRing-part font-18 mt10"></i>
                                </span>

                                  <a className={ "paragraph_name paragraph_nameid"}
                                     href={/shixuns/+item.shixun_identifier}
                                     target="_blank"
                                  >

                                 <span className="subject_stage_shixun_index">

                                   <span className="subject_stage_shixun_index">{this.props.sum}</span>-{key+1}&nbsp;&nbsp;{item.shixun_name}

                                 </span>

                                  </a>

                                </li>

                                <li className="fr status_li">
                                  <Tooltip placement="bottom" title="删除">
                                    <i className="iconfont icon-shanchu color-grey-c font-14 font-n cursor" id={key} onClick={this.shixunslisteditdelect}></i>
                                  </Tooltip>
                                </li>
                                {provided.placeholder}
                              </div>
                            )}
                          </Draggable>
                        )})}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            }

            {/*老版本实训新建卡片*/}
            {/*<div className="adding-stage-item clearfix" id="sortable">*/}
            {/*<div className="square-Item smallSquare">*/}
            {/*<a className="ring-grey font-16 color-white colseThispart">×</a>*/}
            {/*<img alt="Shixun0" className="partimg" src={getImageUrl("/images/educoder/index/shixun/shixun0.jpg?1546937140")}/>*/}
            {/*<div className="square-main">*/}
            {/*<p className="task-hide"><a href="/shixuns/9374npmg" className="justify color-grey-name" target="_blank">frerere</a></p>*/}
            {/*</div>*/}
            {/*</div>*/}
            {/*</div>*/}

            <p className="fr clearfix mt30">
              <div className="clearfix">
                <a className="defalutCancelbtn fl mr30" onClick={this.cancelAddState}>取消</a>
                <a className="defalutSubmitbtn fl mr20" onClick={this.clickShixunsaves}>保存</a>
              </div>
            </p>

          </div>
        </div>
        }

        {this.props.detailInfoList===undefined?"":this.props.detailInfoList.allow_statistics===true?editPanel===false?<div className="click_add color-grey-9" onClick={this.addStage}>
          <span className="color-blue_4C" >+点击新建阶段</span>（选择1至多个实训项目，组成一个阶段）
        </div>:'':''}
        {this.props.detailInfoList===undefined&&this.props.isAdmin()&&editPanel===false?<div className="click_add color-grey-9" onClick={this.addStage}>
          <span className="color-blue_4C" >+点击新建阶段</span>（选择1至多个实训项目，组成一个阶段）
        </div>:''}
      </div>
    )
  }
}
export default DetailCardsEditAndAdd;




//
// <Modal
// 	keyboard={false}
// 	title="选择实训"
// 	visible={selectShixun}
// 	closable={false}
// 	footer={null}
// 	width="840px"
// 	destroyOnClose={true}
// >
// 	<Spin spinning={hometypepvisible}  size="large" style={{marginTop:'15%'}}>
// 		<div className="newupload_conbox">
// 			<div className="clearfix mb20 shixun_work_div newshixun_tab_div cdefault" style={{"marginRight":"4px"}} id="shixun_tab_div">
// 				<li className="fl mr5 mt5"> <a onClick={()=>this.changeTag(0,`${search}`)} className={ parseInt(type)===0 ? "active edu-filter-cir-grey font-12":"edu-filter-cir-grey font-12"}>全部</a></li>
// 				{
// 					ChooseShixunList && ChooseShixunList.tags.map((item,key)=>{
// 						return(
// 							<li className="fl mr5 mt5" key={key}>
// 								<a onClick={()=>this.changeTag(`${item.tag_id}`,`${search}`)} className={ parseInt(type) === parseInt(item.tag_id) ? "active edu-filter-cir-grey font-12":"edu-filter-cir-grey font-12"}>{item.tag_name}</a>
// 							</li>
// 						)
// 					})
// 				}
//
//
// 			</div>
// 			<div className="clearfix mb20" id="shixun_search_form_div">
//                     <span className="fl color-grey-9 font-16 mt3">
//                       <span>共</span>
//                       <span className="color-orange-tip">{ChooseShixunList && ChooseShixunList.shixuns_count}</span>
//                       <span>个实训</span>
//                     </span>
// 				<div className="fr search-new mb0">
// 					<Search
// 						placeholder="请输入创建者或者实训名称进行搜索"
// 						onInput={this.searchNameInput}
// 						onSearch={()=>this.changeTag(`${type}`,`${search}`)}
// 						style={{width: '115%'}}
// 					></Search>
// 				</div>
// 			</div>
// 			<ul className="clearfix greybackHead edu-txt-center" style={{marginBottom: '0px'}}>
// 				<li className="fl with40 paddingleft22">实训名称</li>
// 				<li className="fl with30 edu-txt-left">使用院校</li>
// 				<li className="fl with10">使用人数</li>
// 				<li className="fl with10">评价等级</li>
// 				<li className="fl with10"></li>
// 			</ul>
//
// 			<style>
// 				{
// 					`
//                       .over180{min-height: 180px;max-height: 180px;overflow-y: auto}
//                       `
// 				}
// 			</style>
// 			{ChooseShixunListshixun_list && ChooseShixunListshixun_list.length===0?"": <div className="over180 pl20 pr20"
// 																																											onScroll={this.contentViewScrolladd}
// 			>
// 				<Checkbox.Group style={{ width: '100%' }}   onChange={this.shixunhomeworkedit}>
// 					{
// 						ChooseShixunListshixun_list && ChooseShixunListshixun_list.map((item,key)=>{
// 							return(
// 								<div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE" key={key}>
// 									<li className="fl with40">
// 										<Checkbox
// 											id={"shixun_input_"+item.shixun_id}
// 											value={item.shixun_id}
// 											key={item.shixun_id}
// 											className="fl task-hide edu-txt-left"
// 											style={{"width":"298px"}}
// 											name="shixun_homework[]"
// 										>
// 											<label style={{"textAlign":"left","color":"#05101A"}} className="task-hide color-grey-name" title={item.shixun_name}>{item.shixun_name}</label>
// 										</Checkbox>
// 									</li>
// 									<li className="fl with30 edu-txt-left task-hide paddingl5">{item.school_users}</li>
// 									<li className="fl with10 paddingl10">{item.myshixuns_count}</li>
// 									<li className="fl with10 color-orange-tip paddingl10">{item.preference}</li>
// 									<li className="fl with10"><a className="color-blue" href={"/shixuns/"+item.identifier+"/challenges"} target="_blank">详情</a></li>
// 								</div>
// 							)
// 						})
// 					}
// 				</Checkbox.Group>
// 			</div>}
// 			<div className="mt20 marginauto clearfix edu-txt-center">
// 				<a className="pop_close task-btn mr30 margin-tp26" onClick={this.cloasShixunBox}>取消</a>
// 				<a className="task-btn task-btn-orange margin-tp26" id="submit_send_shixun"  onClick={this.clickShixunchoose}>确定</a>
// 			</div>
// 		</div>
// 	</Spin>
// </Modal>
// contentViewScrolladd=(e)=>{
// 	const {ChooseShixunList}=this.state;
// 	//滑动到底判断
// 	let newscrollTop=parseInt(e.currentTarget.scrollTop);
// 	let allclientHeight=e.currentTarget.clientHeight+newscrollTop;
//
// 	if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
//
// 		if(ChooseShixunList.shixun_list.length===0){
// 			return
// 		}else{
// 			// console.log("到达底部");
// 			this.setState({
// 				hometypepvisible:true
// 			})
// 			let pathId=this.props.pathid;
// 			let {search,page,type,ChooseShixunListshixun_list}=this.state;
// 			let newpage=page+1;
// 			let newChooseShixunListshixun_list=ChooseShixunListshixun_list;
// 			let url='/paths/'+pathId+'/choose_subject_shixun.json?page='+newpage
// 			if(search!="" && search!=undefined){
// 				url+="&search="+search;
// 			}
// 			if(type!=0){
// 				url+="&type="+type;
// 			}
// 			axios.get(encodeURI(url)).then((result)=>{
// 				if(result.status===200){
// 					let list =result.data.shixun_list;
//
// 					for(var i=0; i<list.length; i++){
// 						newChooseShixunListshixun_list.push(list[i])
// 					}
// 					this.setState({
// 						ChooseShixunList:result.data,
// 						hometypepvisible:false,
// 						type:type,
// 						search:search,
// 						page:newpage,
// 						ChooseShixunListshixun_list:newChooseShixunListshixun_list
// 					})
// 				}
// 			}).catch((error)=>{
// 				console.log(error);
// 			})
//
// 		}
//
// 	}
//
// }
//
// //打开选择实训弹框初始化tag标签和列表
// changeTag=(id,search)=>{
//
// 	this.setState({
// 		ChooseShixunListshixun_list:[],
// 		page:1,
// 		hometypepvisible:true,
// 	})
//
// 	let pathId=this.props.pathid;
//
// 	let url='/paths/'+pathId+'/choose_subject_shixun.json?page='+1
// 	if(search!="" && search!=undefined){
// 		url+="&search="+search;
// 	}
// 	if(id!=0){
// 		url+="&type="+id;
// 	}
//
// 	axios.get(encodeURI(url)).then((result)=>{
// 		if(result.status===200){
// 			this.setState({
// 				ChooseShixunList:result.data,
// 				hometypepvisible:false,
// 				type:id,
// 				ChooseShixunListshixun_list:result.data.shixun_list
// 			})
// 		}
// 	}).catch((error)=>{
// 		console.log(error);
// 	})
// }
