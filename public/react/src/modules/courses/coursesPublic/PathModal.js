import React,{ Component } from "react";
import { Modal,Checkbox,Select,Input,Tooltip,Spin,Icon } from "antd";
import axios from'axios';
import Modals from '../../modals/Modals';
const Search = Input.Search;
class PathModal extends Component{
  constructor(props){
    super(props);
    this.state={
      StudentList_value:"",
      Searchvalue:undefined,
      type:'all',
      page:1,
      patheditarry:undefined,
			newshixunmodallist:undefined,
			hometypepvisible: false,
			shixunmodallist:undefined,
    }
  }

  hidecouseShixunModal=()=>{
    this.props.hidecouseShixunModal()
  }

	componentDidMount(){
		this.setState({
			hometypepvisible: true,
			patheditarry: [],
			checkBoxValues: [],

		})

		let coursesId = this.props.match.params.coursesId;
		let url = "/courses/" + coursesId + "/homework_commons/subjects.json";

		axios.get(url).then((result) => {
			if (result.status === 200) {
				this.setState({
					shixunpath: true,
					shixunmodallist: result.data,
					hometypepvisible: false,
					newshixunmodallist: result.data.subject_list,
				})
			}
		}).catch((error) => {
			console.log(error);
		})
	}
	funshixunpathlist=(search,type,loading,page)=>{
		let{newshixunmodallist}=this.state;
		let newshixunmodallists=[]
		if(page>1){
			newshixunmodallists=newshixunmodallist;
		}
		this.setState({
			hometypepvisible:loading
		})
		let coursesId=this.props.match.params.coursesId;
		let url ="/courses/"+coursesId+"/homework_commons/subjects.json";

		axios.get(url, {
			params: {
				search: search,
				type:type,
				page:page
			}
		}).then((result)=>{
			if(result.status===200){

				let  shixun_list=result.data.subject_list;

				for(var i=0; i<shixun_list.length;i++){
					newshixunmodallists.push(shixun_list[i])
				}
				this.setState({
					shixunpath:true,
					shixunmodallist:result.data,
					newshixunmodallist:newshixunmodallists,
					hometypepvisible:false,
					page:page
				})

			}
		}).catch((error)=>{
			console.log(error);
		})
	}

  //tag
  changeTag=(types)=>{
    let {Searchvalue}=this.state;
    this.setState({
      type:types,
      page:1,
			newshixunmodallist:undefined
    })
    this.funshixunpathlist(Searchvalue,types,true,1)
  }

  //搜索
  SenttotheValue=(e)=>{
    this.setState({
      Searchvalue:e.target.value
    })
  }
  SenttotheSearch=(value)=>{
		this.setState({
			page:1,
			newshixunmodallist:undefined
		})
    let{type}=this.state;
    this.funshixunpathlist(value,type,true,1)
  }


  //勾选实训
  shixunhomeworkedit=(list)=>{
    this.setState({
      patheditarry:list
    })
    // this.props.funpatheditarry(newpatheditarry)
  }

  contentViewScrolledit=(e)=>{
    //滑动到底判断
		const {shixunmodallist} = this.state;
		let newscrollTop=parseInt(e.currentTarget.scrollTop);
		let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

    if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){

    	if(shixunmodallist.subject_list.length===0){
					return;
			}else{
				let {Searchvalue,type,page,shixunpathlist}=this.state;
				let newpage=page+1
				this.funshixunpathlist(Searchvalue,type,true,newpage)

			}
    }

  }
  //提交
  savecouseShixunModal=()=>{
  	this.setState({
			hometypepvisible:true
		})
    let {patheditarry}=this.state;
    let {coursesId}=this.props;
    let url="/courses/"+coursesId+"/homework_commons/create_subject_homework.json";
    if(patheditarry===undefined){
      this.setState({
        patheditarrytype:true,
        patheditarryvalue:"请先选择实践课程",
				hometypepvisible:false
      })
      return
    }else if(patheditarry.length===0){
      this.setState({
        patheditarrytype:true,
        patheditarryvalue:"请先选择实践课程",
				hometypepvisible:false
      })
      return
    }
    axios.post(url, {
      // category_id: datas&&datas.category_name===undefined||datas&&datas.category_name===null?undefined:category_id,
      subject_ids:patheditarry,
      }
    ).then((response) => {
      if(response.data.status===-1){
        // this.setState({
        //   Modalstype:true,
        //   Modalstopval:response.data.message,
        //   ModalsBottomval:"",
        //   ModalSave:this.cancelmodel,
        //   Loadtype:true
        // })
        this.props.showNotification(response.data.message)

      }else{
        // this.homeworkstart
        //调用立即发布弹窗
				// this.props.showNotification(response.data.message)
        this.props.hidecouseShixunModal();
				this.props.updataleftNavfun()
        // this.props.courseshomeworkstart(response.data.category_id,response.data.homework_ids)
        // this.props.showNotification("选用成功")
        // this.props.showNotification(response.data.message)
         this.props.homeworkupdatalists(this.props.Coursename,this.props.page,this.props.order);
      }

      // if(response.status===200) {
      //   this.props.courseshomeworkstart(response.data.category_id,response.data.homework_ids)
      // }

     this.setState({
			 hometypepvisible:false
		 })
    }).catch((error) => {
      console.log(error)
    })
  }
  render(){
    let {Searchvalue,type,Modalstype,newshixunmodallist,hometypepvisible,shixunmodallist}=this.state;
    let {visible}=this.props;
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return(
      <div>
        {/*提示*/}
        {Modalstype&&Modalstype===true?<Modals
          modalsType={this.state.Modalstype}
          modalsTopval={this.state.Modalstopval}
          modalCancel={this.state.ModalCancel}
          modalSave={this.state.ModalSave}
          modalsBottomval={this.state.ModalsBottomval}
          loadtype={this.state.Loadtype}
        />:""}
        <Modal
          keyboard={false}
          title="选择实践课程"
          visible={visible}
          closable={false}
          footer={null}
          width="840px"
          destroyOnClose={true}
        >
						<Spin indicator={antIcon}  spinning={hometypepvisible}  size="large" style={{marginTop:'15%'}}>
            <div className="newupload_conbox">
              { shixunmodallist && shixunmodallist.tags.length===0?"":<div className="clearfix mb20 shixun_work_div newshixun_tab_div cdefault" style={{"marginRight":"4px"}} id="shixun_tab_div">

                <li className="fl mr5 mt5"> <a onClick={()=>this.changeTag("all")} className={ type==="all" ? "active edu-filter-cir-grey font-12":"edu-filter-cir-grey font-12"}>全部</a></li>
                {
                  shixunmodallist && shixunmodallist.tags.map((item,key)=>{
                    return(
                      <li className="fl mr5 mt5" key={key}>
                        <a onClick={()=>this.changeTag(item.tag_id)} className={ parseInt(type) === parseInt(item.tag_id) ? "active edu-filter-cir-grey font-12":"edu-filter-cir-grey font-12"}>{item.tag_name}</a>
                      </li>
                    )
                  })
                }

              </div>}
              <div className="clearfix mb20" id="shixun_search_form_div" style={{height:"30px"}}>
                      <span className="fl color-grey-9 font-16 mt3">
                        <span>共</span>
                        <span className="color-orange-tip">{shixunmodallist === undefined ? "":shixunmodallist.subjects_count}</span>
                        <span>个实践课程</span>
                      </span>
                <div className="fr search-new">
                  <Search
                    placeholder="请输入创建者或者实训名称进行搜索"
                    value={Searchvalue}
                    onInput={this.SenttotheValue}
                    onSearch={(value) => this.SenttotheSearch(value)}
                    style={{width: '115%'}}
                  />
                </div>
              </div>
              <ul className="clearfix greybackHead edu-txt-center">
                <li className="fl with40 paddingleft22">实训路径名称</li>
                <li className="fl with30 edu-txt-left">已发布实训数</li>
                <li className="fl with10">使用人数</li>
                <li className="fl with10"></li>
              </ul>

              <style>
                {`
                .pl40{
                   padding-left:40px
                 }
                .newtaskhide{
                     margin-top:0px !important;
                         height: 40px;
                  }

                `}
              </style>



							{ newshixunmodallist === undefined ? <div className="over210 pl20 pr20" style={{height:"204px"}}></div>:newshixunmodallist&&newshixunmodallist.length===0?<div className="alltask edu-back-white">
								<div className="edu-tab-con-box clearfix edu-txt-center">
									<img className="edu-nodata-img mb20" src="/images/educoder/nodata.png" />
									<p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p></div>
							</div>:<div className="over210 pl20 pr20"
                   onScroll={this.contentViewScrolledit}
                   style={{height:"204px"}}>
                  <Checkbox.Group style={{ width: '100%' }}  onChange={this.shixunhomeworkedit}>
                    {

                      newshixunmodallist&&newshixunmodallist.map((item,key)=>{
                        return(
                          <div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE" key={key}>
                            <li className="fl with40 newtaskhide">
                              <Checkbox
                                id={"shixun_input_"+item.subject_id}
																value={item.subject_id}
																key={item.subject_id}
                                className="task-hide edu-txt-left newtaskhide"
                                style={{"width":"280px"}}
                                name="shixun_homework[]"
                              >
                                <label style={{"textAlign":"left","color":"#05101A"}} className="task-hide color-grey-name" title={item.subject_name}>{item.subject_name}</label>
                              </Checkbox>
                            </li>
                            <li className="fl with30 edu-txt-left task-hide pl40">{item.shixun_count}</li>
                            <li className="fl with10 paddingl10">{item.myshixun_count}</li>
                            <Tooltip title="新窗口查看详情">
                            <li className="fr with10"><a className="color-blue" href={"/paths/"+item.subject_id} target="_blank">详情</a></li>
                            </Tooltip>
                          </div>
                        )
                      })
                    }
                  </Checkbox.Group>
              </div>}
              { this.state.patheditarrytype===true?<span className={"color-red"}>{this.state.patheditarryvalue}</span>:""}
              <div className="mt20 marginauto clearfix edu-txt-center">
                <a className="pop_close task-btn mr30 margin-tp26" onClick={this.hidecouseShixunModal}>取消</a>
                <a className="task-btn task-btn-orange margin-tp26" id="submit_send_shixun" onClick={this.savecouseShixunModal}>确定</a>
              </div>
            </div>
						</Spin>
        </Modal>
      </div>
    )
  }
}
export default PathModal;
