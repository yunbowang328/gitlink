import React,{ Component } from "react";
import { Input , Spin , Pagination } from "antd";
import './css/moopCases.css'
import '../courses/css/Courses.css'

import {  ActionBtn , LinkAfterLogin ,getImageUrl} from 'educoder';

import axios from 'axios'

import NoneData from '../courses/coursesPublic/NoneData'

import mainImg from '../../images/moop_cases/teach_ex.jpg'
import CaseItem from './CaseItem'




const Search = Input.Search;
class CaseList extends Component{
  constructor(props){
    super(props);
    this.state={
      type:0,
      search:undefined,
      page:1,
      pageSize:20,
      libraries:undefined,
      totalCount:undefined,
      isSpin:true
    }
  }

  componentDidMount = () =>{
		window.document.title = '教学案例'
    let { type , search , page , pageSize } = this.state;
    this.InitList(type,search,page,pageSize);
  }

  // 列表
  InitList = (type,search,page,pageSize) =>{
    let url = `/libraries.json`;
    axios.get(url,{params:{
      type:type == 0 ? undefined : "mine",
      keyword:search,
      page,
      per_page:pageSize
    }}).then((result)=>{
      if(result){
        this.setState({
          libraries:result.data.libraries,
          totalCount:result.data.count,
          isSpin:false
        })
      }else{
				this.setState({
					isSpin:false
				})
			}
    }).catch((error)=>{
      console.log(error);
			this.setState({
				isSpin:false
			})
    })
  }

  // tab切换
  changeType = (type) =>{
    this.setState({
      type,
      page:1,
			isSpin:true
    })
    let { search , page , pageSize } = this.state;
    this.InitList(type,search,page,pageSize);
  }

  // 输入搜索内容
  inputStudent=(e)=>{
    this.setState({
      search:e.target.value
    })
  }

  // 搜索
  searchInfo = () =>{
    this.setState({
      isSpin:true
    })
    let { type , search , pageSize } = this.state;
    this.InitList( type , search , 1 , pageSize );
  }

  // 切换分页
  onChangePage =(pageNumber)=>{
    this.setState({
      page:pageNumber
    })
    let { type , search , pageSize } = this.state;
    this.InitList( type , search , pageNumber , pageSize );
  }

  render(){
    let { type , search ,libraries , totalCount ,pageSize ,page } = this.state;
    let { checkIfLogin } = this.props;

    return(
      <React.Fragment>
				<style>
					{
						`
						.imgmoop_cases{width: 100%;
						height: 300px;
						background-color: #000a4f;
						background-position: 50%;
						background-repeat: no-repeat;}
						`
					}
				</style>
        <img className={"imgmoop_cases"} src={this.props.mygetHelmetapi&&this.props.mygetHelmetapi.moop_cases_banner_url===null?mainImg:getImageUrl(this.props.mygetHelmetapi&&this.props.mygetHelmetapi.moop_cases_banner_url)}/>
				<div className="educontent">
          <div className="edu-back-white mb30 mt30">
            <p className="padding20-30 clearfix bor-bottom-greyE">
              <span className="font-18 fl color-grey-3">教学案例</span>
              <LinkAfterLogin {...this.props} to={'/moop_cases/new'} className="fr edu-default-btn edu-blueline-btn" checkProfileComplete = {true}
                
              >发布案例</LinkAfterLogin>
              {/* <ActionBtn style="colorBlue" className="fr" to="/moop_cases/new">发布案例</ActionBtn> */}
            </p>
            <div className="clearfix pl30 pr30">
              <ul className="fl library_nav mt25">
                <li className={type == 0 ? "active" :""} onClick={()=>this.changeType(0)}>
                  <a href="javascript:void(0)">全部</a>
                </li>
                {
                  checkIfLogin() && 
                  <li className={type == 1 ? "active" :""} onClick={()=>this.changeType(1)}>
                    <a href="javascript:void(0)">我的</a>
                  </li>
                }
              </ul>
              <div className="fr mt16 mb16 searchView"style={{width:"300px"}}>
                <Search
                  value={search}
                  placeholder="输入教学案例标题、作者、单位进行检索"
                  onInput={this.inputStudent}
                  onSearch={this.searchInfo}
                ></Search>
              </div>
            </div>
          </div>
          <Spin size="large" spinning={this.state.isSpin} tip="正在获取相关数据...">
            {
              libraries && libraries.length > 0 &&  <CaseItem {...this.props} {...this.state} libraries={libraries}></CaseItem>
            }
            {
              libraries && libraries.length == 0 && <div className="mb50"><NoneData></NoneData></div>
            }
            {
              totalCount && totalCount > pageSize &&
              <div className="mb50 edu-txt-center clearfix">
                <Pagination defaultCurrent={page} current={page} pageSize={pageSize} showQuickJumper onChange={this.onChangePage} total={totalCount}></Pagination>
              </div>
            }
          </Spin>
        </div>
      </React.Fragment>
    )
  }
}
export default CaseList