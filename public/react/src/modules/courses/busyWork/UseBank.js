import React,{ Component } from "react";
import { Modal,Input, Checkbox,Icon,Spin} from "antd";

import '../css/members.css'
import '../css/busyWork.css'
import { WordsBtn, ConditionToolTip } from 'educoder'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';

import NoneData from '../coursesPublic/NoneData'

const Search=Input.Search;
const pageCount = 20
// "poll", #normal 普通作业题库； group 分组作业题库； poll问卷题库； exercise试卷题库; gtask 毕设选题题库；gtopic 毕设任务
const engNameMap = {
  poll: '问卷',
  normal: '普通作业',
  group: '分组作业',
  exercise: '试卷',
  gtask: '毕设任务',
  gtopic: '毕设选题',
}
class UseBank extends Component{
  constructor(props){
    super(props);
    this.state={
      flag:false,
      nav_my: 'myself',
      search: '',
      page: 1,
      checkBoxValues: [],
      isChecked:'',
      is_teacher:undefined,
      hometypepvisible:false
    }
  }
  componentDidMount() {
    // console.log("UseBank");
    // console.log(this.props);

  }
  onCheckBoxChange = (checkBoxValues) => {
    this.setState({
      checkBoxValues: checkBoxValues
    })
    if(checkBoxValues.length!=0){
      this.setState({
        isChecked:""
      })
    }
  }
  fetchAll = (arg_page) => {
    console.log('fetchAll')
		const courseId = this.props.match.params.coursesId
    const page = arg_page || this.state.page;
    const { nav_my, search } = this.state
		/**
     normal 普通作业题库； group 分组作业题库； poll问卷题库； exercise试卷题库; gtask 毕设选题题库；gtopic 毕设任务
     filter		string	public公共题库 2， myself我的题库 1
    */
    const object_type = this.props.object_type
    let url = `/question_banks/bank_list.json?page=${page}&limit=${pageCount}&object_type=${object_type || ''}&search=${search || ''}&filter=${nav_my}`
    this.setState({ loading: true })
    axios.get(url
    //   , {
    //   params: {

    //   }
    // }
    )
    .then((response) => {
      if(response.data){
        this.setState({
          is_teacher:response.data.is_teacher
        })
      }
      if (!response.data.object_list || response.data.object_list.length == 0) {
        this.setState({
          object_list: page == 1 ? [] : this.state.object_list,
          page,
          loading: false,
          hasMore: false,
        })
      } else {
        this.setState({
          object_list: page == 1 ? response.data.object_list : this.state.object_list.concat(response.data.object_list),
          page,
          loading: false,
          hasMore: response.data.object_list.length == pageCount
        })
      }

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  openSelectBank=()=>{
    this.setState({
      search: '',
      flag:true
    }, () => {
      this.fetchAll()
    })
  }
  closeSelectBank=()=>{
    this.setState({
      flag:false,
			nav_my: 'myself',
			search: '',
			page: 1,
			checkBoxValues: [],
			isChecked:'',
			is_teacher:undefined,
			hometypepvisible:false
    })
  }

  //切换tab
  changeNav=(index)=>{
    this.setState({
      nav_my:index
    }, () => {
      this.fetchAll(1)
    })
  }
  onSearchChange = (e) => {
    this.setState({
      search: e.target.value
    })
  }
  onSave = () => {
    debugger
    const { checkBoxValues } = this.state;
    const { object_type } = this.props
    if(checkBoxValues.length==0){
      this.setState({
        isChecked:"请先选择"+engNameMap[object_type]
      })
      return;
    }
    this.setState({
      hometypepvisible:true
    })
		const courseId = this.props.match.params.coursesId
    let url = `/question_banks/save_banks.json`
    this.setState({ loading: true })
    axios.post(url
			, {
        "object_type": object_type,
        "bank_id": checkBoxValues,
        "course_id": courseId
      }
    )
    .then((response) => {
      if (response.data.status == 0) {
				this.props.useBankSuccess && this.props.useBankSuccess(checkBoxValues,response.data.object_ids);
        this.props.showNotification('题库选用成功')
        this.closeSelectBank();
        this.props.updataleftNavfun()
				this.setState({
					hometypepvisible:false,
					checkBoxValues:[]
				})
      } else {
        this.setState({
          hometypepvisible:false,
					checkBoxValues:[]
        })
				this.props.showNotification(response.data.message)
      }
    })
    .catch( (error) =>{
      console.log(error);
      this.setState({
        hometypepvisible:false,
				checkBoxValues:[]
      })
    });

	};

	getotiku = (url) => {
		window.open(url, '_blank');
	}



  render(){
    let { flag, nav_my, loading, hasMore, object_list, search, checkBoxValues,isChecked,page,is_teacher }=this.state
    let { object_type }=this.props;
    const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
    // console.log("题库选用2222");
    // console.log("UseBank");
    // console.log(this.props);
    return(
      <a>
        <style>{`
        .bankModal .task-hide {
          max-width: 290px;
        }
        .d_middle{
          justify-content: center;
          align-items: center;
          display: -webkit-flex;
        }
        .setImgW .edu-nodata-img{
          width: 170px !important;
        }
        .bankwidth{
					width:32% !important;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap
        }
        .bankwidth76{
					width:76px !important;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap;
					text-align: center;
        }
        .bankwidth2{
					width:24% !important;
					overflow:hidden;
					text-overflow:ellipsis;
					white-space:nowrap
        }
        .with58{
        width:58% !important;
        Margin-left:15px
        }
        .with63{
        width: 60% !important;
        box-sizing: border-box;
        margin-left: 15px;
        }
        `}</style>


        {
          flag===true?<style>
            {
              `
              body {
							  overflow: hidden !important;
							}
              `
            }
          </style>:""
        }

				{this.props.user&&this.props.user.main_site===true?<WordsBtn style="blue" className="mr30 font-16" onClick={()=>this.openSelectBank()}>{engNameMap[object_type]=="问卷"?"问卷选用":engNameMap[object_type]=="试卷"?"试卷选用":"题库选用"}</WordsBtn>:""}
        {flag===true?<Modal
            title="题库选用"
            visible={flag}
            closable={false}
            width="800px"
            footer={null}
            keyboard={false}
            destroyOnClose={true}
            centered={true}
        >

          <div className="newupload_conbox clearfix bankModal">
            <Spin indicator={antIcon} spinning={this.state.hometypepvisible}  className="newnext-loading" color='#4AC7FF'  size="large">
              <div className="clearfix mb30">
                <ul className="fl mt2 bankNav">
                  <li className={nav_my==='myself'?"active":""} onClick={()=>this.changeNav('myself')}><a>我的题库</a></li>
                  <li className={nav_my==='myself'?"":"active"} onClick={()=>this.changeNav('public')}><a>公共题库</a></li>
                </ul>
                <Search placeholder="输入标题、适用课程进行搜索" className="searchView fr" style={{"width":"268px","height":"30px"}}
                  onSearch={() => this.fetchAll(1)} onChange={this.onSearchChange} value={search}
                ></Search>
              </div>
              {
								object_list && object_list.length == 0 && page == 1 ? "" : nav_my === 'myself' ?
                <p className="color-grey-6 mb25 edu-txt-center">选用对象：你在课堂{engNameMap[object_type]}列表中已<span className="color-orange-tip">“加入题库”</span>的{engNameMap[object_type]}</p>
                :
                <p className="color-grey-6 mb25 edu-txt-center">选用对象：题库中已设置成公共属性的所有{engNameMap[object_type]}</p>
              }

              {
								nav_my != 'myself' && is_teacher == false ?
                <div style={{"height":"230px"}} className="d_middle edu-txt-center">
                  <div>
                    <p className="font-16 mb20 color-grey-3">通过职业认证的教师才能访问公共题库</p>
                    <a className="white-btn edu-orangeback-btn" target="_blank" href="/account/certification">立即认证</a>
                  </div>
                </div>
                :
                  object_list && object_list.length == 0 && page == 1 ?
                    <div className="setImgW"><NoneData></NoneData></div>
                  :
                <div className="edu-back-skyblue padding20" style={{"height":"230px", "overflowY": 'auto'}}>
                  <InfiniteScroll
                    threshold={10}
                    initialLoad={false}
                    pageStart={0}
                    loadMore={() => this.fetchAll(this.state.page + 1)}
                    hasMore={!loading && hasMore}
                    useWindow={false}
                  >
                    <Checkbox.Group style={{ width: '100%' }} onChange={this.onCheckBoxChange} value={checkBoxValues}>
                    { object_list && object_list.map( item => {
											/**
                        course_list_name: "C++程序设计"
                        id: 3889
                        name: "作业3：第四章 控制结构 "
                        username: "Coder"
                      */
                      return (
                        <p className="clearfix mb7" key={item.id}>
                          <Checkbox className="fl" value={item.id} key={item.id}></Checkbox>
													<span className={nav_my === 'myself' ? "fl with58" : "fl with63"}>
                            <label className="task-hide fl" title={item.name && item.name.length > 30 ? item.name : ""}
																	 style={{"maxWidth": "100%"}}>
                              <a title={item.name}>{item.name}</a>
                            </label>
                          </span>
                          <span title={item.course_list_name && item.course_list_name.length > 10 && item.course_list_name}
																className={nav_my === 'myself' ? "fl with30 color-grey-6 task-hide pl5 bankwidth" : "fl with30 color-grey-6 task-hide pl5 bankwidth2"}

													><a title={item.course_list_name}>{item.course_list_name}</a></span>
                          {
														nav_my === 'public' &&
														<span className="fl with16 color-grey-6 task-hide pl10 bankwidth76"><a
															title={item.username} style={{
															width: "76px"
														}}>{item.username}</a></span>
                          }
													{nav_my === "myself" ?
														(this.props.object_type && this.props.object_type === "normal" ?
															<a style={{textAlign: "center"}} key={item.id} className="color-blue font-14 pl5"
																 onClick={() => this.getotiku(`/banks/normal/${item.id}/edit/personal?tab=0`)}
                              >编辑</a>
															: this.props.object_type && this.props.object_type === "group" ?
																<a style={{textAlign: "center"}} key={item.id} className="color-blue font-14 pl5"
																	 onClick={() => this.getotiku(`/banks/group/${item.id}/edit/publicly?tab=0`)}
																>编辑</a>
																: this.props.object_type && this.props.object_type === "exercise" ?
																	<a style={{textAlign: "center"}} key={item.id} className="color-blue font-14 pl5"
																		 onClick={() => this.getotiku(`/banks/exercise/${item.id}/edit/personal`)}
																	>编辑</a>
																	: this.props.object_type && this.props.object_type === "poll" ?
																		<a style={{textAlign: "center"}} key={item.id} className="color-blue font-14 pl5"
																			 onClick={() => this.getotiku(`/banks/poll/${item.id}/edit/personal`)}
																		>编辑</a>
																		: "")
														: ""
                          }
                        </p>
                      )
                    })}
                    </Checkbox.Group>
                    {/* <p className="clearfix mb7">
                      <Checkbox className="fl"></Checkbox>
                      <span className="fl with45"><label className="task-hide fl" style={{"maxWidth":"208px;"}}>毕业设计2018开题报告题报</label></span>
                      <span className={nav_my===1?"fl with50 color-grey-6 task-hide pl5":"fl with30 color-grey-6 task-hide pl5"}>数据库原理数据库原理</span>
                      {
                        nav_my===2 &&
                        <span className="fl with16 color-grey-6 task-hide pl10">胡莎莎胡莎莎</span>
                      }
                    </p> */}
                  </InfiniteScroll>
								</div>
              }

							<p style={{height: "20px", lineHeight: "20px;", marginTop: '4px'}}>
              {
                isChecked !="" ? <span className="color-red">{isChecked}</span>:""
              }
              </p>
              <div className="mt10 marginauto clearfix edu-txt-center">
                <a onClick={this.closeSelectBank} className="pop_close task-btn mr30">取消</a>

                {object_list && object_list.length == 0 && page == 1 ?
                nav_my !='myself' && is_teacher == false ?
                  <a onClick={this.closeSelectBank} className="task-btn task-btn-orange">确定</a>
                : <a onClick={this.closeSelectBank} className="task-btn task-btn-orange">确定</a>
                :<a className="task-btn task-btn-orange" id="submit_send_shixun" onClick={this.onSave}>确定</a>
                }
                {/*<a className="task-btn task-btn-orange" id="submit_send_shixun" onClick={this.onSave}>确定</a>*/}
              </div>
            </Spin>
          </div>
        </Modal>:""}
      </a>
    )
  }
}
export default UseBank;
