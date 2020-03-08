import React,{ Component } from "react";
import { Modal,Checkbox,Select,Input,Tooltip,Spin,Icon} from "antd";
import axios from'axios';
// import Loading from '@icedesign/base/lib/loading';
// import '@icedesign/base/lib/loading/style.js';

const Option = Select.Option;
const Search = Input.Search;

class ShixunModal extends Component{
  constructor(props){
    super(props);
    this.state={
      Searchvalue:undefined,
      type:'all',
      category_id:0,
      page:1,
			shixunmodallist:undefined,
			hometypepvisible:false,
			newshixunmodallist:undefined,
    }
  }
  componentDidMount() {
		this.setState({
			hometypepvisible:true,
		})
		let coursesId=this.props.match.params.coursesId;
		let url = this.props.shixunsUrl || "/courses/"+coursesId+"/homework_commons/shixuns.json";

		axios.get(url).then((result)=>{
			if(result.status===200){
				if(result.data.message===undefined){
					this.setState({
						shixunmodallist:result.data,
						hometypepvisible:false,
						newshixunmodallist:result.data.shixun_list,
					})
				}
			}
		}).catch((error)=>{
			console.log(error);
		})
  }
	setupdatalist=(search,type,loading,page)=>{
		let{newshixunmodallist}=this.state;
		let newshixunmodallists=[]
		if(page>1){
			newshixunmodallists=newshixunmodallist;
		}
		this.setState({
			hometypepvisible:loading
		})
		let coursesId=this.props.match.params.coursesId;
		let url = this.props.shixunsUrl || "/courses/"+coursesId+"/homework_commons/shixuns.json";

		axios.get(url, {
			params: {
				search: search,
				type:type,
				page:page
			}
		}).then((result)=>{
			if(result.status===200){
				if(result.data.message===undefined){
					let shixun_list = result.data.shixun_list;
					for (var i = 0; i < shixun_list.length; i++) {
						newshixunmodallists.push(shixun_list[i])
					}
					this.setState({
						shixunmodallist: result.data,
						newshixunmodallist: newshixunmodallists,
						hometypepvisible: false,
					  page: page
					})

				}
			}

		}).catch((error)=>{
			console.log(error);
		})
	}

  //勾选实训
  shixunhomeworkedit=(list)=>{
    let newpatheditarry=[];
    if (this.props.singleChoose == true) {
      if (list.length > 0) {
        newpatheditarry.push(list[list.length - 1])
      }
    } else {
      for(var i=0; i<list.length;i++){
        newpatheditarry.push(list[i])
      }
    }
    
    // this.setState({
    //   patheditarry:newpatheditarry
    // })
    this.props.funpatheditarry(newpatheditarry)
  }

  contentViewScrolledit=(e)=>{
  const {shixunmodallist}=this.state;
    //滑动到底判断
		let newscrollTop=parseInt(e.currentTarget.scrollTop);
		let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

		if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1) {

			if (shixunmodallist.shixun_list.length === 0) {
				return;
			} else {
				let {Searchvalue, type, page} = this.state;
				let newpage = page + 1
				this.setupdatalist(Searchvalue, type, true, newpage)
			}
		}
  }

  //搜索
  SenttotheValue=(e)=>{
    this.setState({
      Searchvalue:e.target.value
    })
  }
  SenttotheSearch=(value)=>{
    let{type}=this.state;
    this.setState({
      page:1,
    })
		this.props.funpatheditarry([])
    this.setupdatalist(value,type,true,1)

  }

  //tag
  changeTag=(types)=>{
    let {Searchvalue}=this.state;
    this.setState({
      type:types,
      page:1,
			newshixunmodallist:undefined
    })
		this.props.funpatheditarry([])
    this.setupdatalist(Searchvalue,types,true,1)

  }


  hidecouseShixunModal=()=>{
    this.props.hidecouseShixunModal()
  }

  savecouseShixunModal=()=>{

  	this.setState({
			hometypepvisible:true
		})
    let {coursesId,patheditarry,datas}=this.props;

		if(patheditarry.length===0){
			this.setState({
				shixunmodelchke:true,
				chekicmessage:"请先选择实训",
				hometypepvisible:false
			})

			return
		}

    if (this.props.chooseShixun) {
      this.props.chooseShixun(patheditarry)
			this.setState({
				hometypepvisible:false
			})
      return;
    }

    let url="/courses/"+coursesId+"/homework_commons/create_shixun_homework.json";
    axios.post(url, {
      category_id:this.props.category_id===null||this.props.category_id===undefined?undefined:parseInt(this.props.category_id),
      shixun_ids:patheditarry,
      }
    ).then((response) => {
      if(response.data.status===-1){
        // this.props.showNotification(response.data.message)

      }else{
        // this.props.courseshomeworkstart(response.data.category_id,response.data.homework_ids)
				this.props.homeworkupdatalists(this.props.Coursename,this.props.page,this.props.order);
        this.props.hidecouseShixunModal()
      }
      this.setState({
				hometypepvisible:false
			})
      // category_id: 3
      // homework_ids: (5) [9171, 9172, 9173, 9174, 9175]
    }).catch((error) => {
      console.log(error)
    })
  }

  selectCloseList=(value)=>{
    this.setState({
      category_id:value
    })
  }
  render(){
     let {Searchvalue,type,hometypepvisible,shixunmodallist,newshixunmodallist,}=this.state;
     let {visible,patheditarry}=this.props;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
     // console.log(patheditarry)
    return(
      <div>

          <Modal
            keyboard={false}
            title="选择实训"
            visible={visible}
            closable={false}
            footer={null}
            width="840px"
            destroyOnClose={true}
          >
            <style>
              {
                `
                .ant-spin-lg .ant-spin-dot {
                   font-size: 32px !important;
                  }
                `
              }
            </style>
            <Spin indicator={antIcon} spinning={hometypepvisible}  className="newnext-loading" color='#4AC7FF'  size="large">
            {/*<Spin shape="dot-circle" >*/}
              {/*{*/}
                {/*shixunmodallist === undefined ? "":shixunmodallist.homework_category.length>0?<div>*/}

                {/*<div className={"fl"}>选择目录名称：</div>*/}
                {/*<div className="fl mb20">*/}
              {/*<Select*/}
                    {/*placeholder="请选择您要发送的课堂"*/}
                    {/*value={isNaN(parseInt(category_id))?"":parseInt(category_id)}*/}
                    {/*style={{"width":"660px","marginTop": "-7px"}}*/}
                    {/*onSelect={this.selectCloseList}*/}
                    {/*// onMouseEnter={this.openList}*/}
                    {/*defaultOpen={false}*/}
                    {/*// open={openSearch}*/}
                    {/*optionLabelProp="name"*/}
                  {/*>*/}
                    {/*{ shixunmodallist.main_category.map((item,key)=>{*/}
                        {/*return(*/}
                          {/*<Option key={key} value={item.main_category_id} name={item.main_category_name}>{item.main_category_name}</Option>*/}
                        {/*)*/}
                      {/*})*/}
                    {/*}*/}

                    {/*{*/}
                        {/*shixunmodallist.homework_category.map((item,key)=>{*/}
                        {/*return(*/}
                          {/*<Option key={key} value={item.category_id} name={item.category_name}>{item.category_name}</Option>*/}
                        {/*)*/}
                      {/*})*/}
                    {/*}*/}

                  {/*</Select>*/}
                {/*</div>*/}

              {/*</div>:""}*/}

              <div className="newupload_conbox">
                <style>
                  {
                    `
                    #shixun_tab_div{
                       max-height: 65px;
                    }
                    `
                  }
                </style>
                <div className="clearfix mb10 shixun_work_div newshixun_tab_div cdefault" id="shixun_tab_div">

                  <li className="fl mr5 mt5">
                    <a onClick={()=>this.changeTag("all")} className={ type==="all" ? "active edu-filter-cir-grey font-12":"edu-filter-cir-grey font-12"}>全部</a>
                  </li>

                  {
                    shixunmodallist && shixunmodallist.tags.map((item,key)=>{
                      return(
                        <li className="fl mr5 mt5" key={key}>
                          <a onClick={()=>this.changeTag(item.tag_id)} className={ parseInt(type) === parseInt(item.tag_id) ? "active edu-filter-cir-grey font-12":"edu-filter-cir-grey font-12"}>{item.tag_name}</a>
                        </li>
                      )
                    })
                  }

                </div>
                <div className="clearfix mb10" id="shixun_search_form_div" style={{height:"30px"}}>
                      <span className="fl color-grey-9 font-16 mt3">
                        <span>共</span>
                        <span className="color-orange-tip">{shixunmodallist === undefined ? "":shixunmodallist.shixuns_count}</span>
                        <span>个实训</span>
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
                {
                  <style>
                    {
                      `.paddingleft22{
                         text-align: left;
                          padding-left: 23px;
                      }
                      `
                    }
                  </style>
                }
                <ul className="clearfix greybackHead edu-txt-center">
                  <li className="fl with40 paddingleft22" >实训名称</li>
                  <li className="fl with25 edu-txt-left">院校</li>
                  <li className="fl with11">学习人数</li>
                  <li className="fl with11">难度</li>
                  <li className="fl with11"></li>
                </ul>



                <div className="over210 pl20 pr20"
                     onScroll={this.contentViewScrolledit}
                    >
                  <style>
                    {
                      `
                      .next-loading{
													width: 100%;
													height: 230px;
                        }
                        .newtaskhide{
                          margin-top:0px !important;
                          height: 40px;
                        }
                        .with11{
													width: 11%;
													box-sizing: border-box;
                        }
                        .pl12{
                            padding-left: 12px;
                        }
                      `
                    }
                  </style>
                  {/*<Loading visible={hometypepvisible} shape="dot-circle" className="newnext-loading" color='#4AC7FF'>*/}
                    <Checkbox.Group style={{ width: '100%' }} value={patheditarry}  onChange={this.shixunhomeworkedit}>
                      {
                        newshixunmodallist === undefined ? "":newshixunmodallist.length===0?
													<div className="alltask edu-back-white">
														<div className="edu-tab-con-box clearfix edu-txt-center">
															<img className="edu-nodata-img mb20" src="/images/educoder/nodata.png" />
															<p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p></div>
													</div>:newshixunmodallist.map((item,key)=>{
                          return(
                            <div className="clearfix edu-txt-center lineh-40 bor-bottom-greyE" key={key}>
                              <li className="fl with40 edu-txt-left task-hide paddingl5 newtaskhide">
                                <Checkbox
                                  id={"shixun_input_"+item.shixun_id}
																	value={item.shixun_id}
																	key={item.shixun_id}
                                  className=" task-hide edu-txt-left newtaskhide"
                                  style={{"width":"280px"}}
                                  name="shixun_homework[]"
                                >
                                  <span style={{"textAlign":"left","color":"#05101A"}} className="task-hide color-grey-name">{item.shixun_name}</span>
                                </Checkbox>
                              </li>
                              <li className="fl with25 edu-txt-left task-hide paddingl5">{item.school}</li>
                              <li className="fl with11 paddingl10">{item.myshixuns_count}</li>
                              <li className="fl with11 color-orange-tip paddingl10 pl12">{item.level}</li>
                              <Tooltip title="新窗口查看详情">
                              <li className="fl with11"><a className="color-blue" href={"/shixuns/"+item.identifier+"/challenges"} target="_blank">详情</a></li>
                              </Tooltip>
                            </div>
                          )
                        })
                      }
                    </Checkbox.Group>
                  {/*</Loading>*/}
                </div>
              </div>
          </Spin>
            <span className={this.state.shixunmodelchke===true?"color-red":"none"}>{this.state.chekicmessage}</span>
            <div className="mt20 marginauto clearfix edu-txt-center">
              <a className="pop_close task-btn mr30 margin-tp26" onClick={this.hidecouseShixunModal}>取消</a>
              <a className="task-btn task-btn-orange margin-tp26" id="submit_send_shixun" onClick={this.savecouseShixunModal}>确定</a>
            </div>
          </Modal>
      </div>
    )
  }
}
export default ShixunModal;