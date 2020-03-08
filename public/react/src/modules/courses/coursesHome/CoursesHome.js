import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import CoursesHomeCard from "./CoursesHomeCard.js"
import axios from 'axios';
import {Input,Tooltip} from 'antd';
import LoadingSpin from '../../../common/LoadingSpin';
import UpgradeModals from '../../modals/UpgradeModals';
import './css/CoursesHome.css';
import Pagination from '@icedesign/base/lib/pagination';
import '@icedesign/base/lib/pagination/style.js';


const Search = Input.Search;
class CoursesHome extends Component{
  constructor(props) {
    super(props)
    this.state = {
      limit:16,
      page:1,
      order:"created_at",
      coursesHomelist:undefined,
      search:"",
    }
  }
  //切换列表状态
  changeStatus=(value)=>{
    this.setState({
      order:value,
      page:1,
			coursesHomelist:undefined
    })

    this.searchcourses(16,1,value,"")
  }
  //搜索输入
  inputSearchValue=(e)=>{

    this.setState({
      search:e.target.value,
      page:1
    })

  }
  //搜索
  searchValue=(e)=>{
    let { search ,order}=this.state;

    this.setState({
      order:order,
      page:1
    })

    this.searchcourses(16,1,order,search)

  }

  componentDidMount(){
		document.title="翻转课堂";
		const upsystem=`/users/system_update.json`;
		axios.get(upsystem).then((response)=>{
			let updata=response.data;
			this.setState({
				updata:updata
			})
		}).catch((error)=>{
			console.log(error);
		})

		this.searchcourses(16,1,"all","")
  }

  onChange=(pageNumber)=> {
    this.setState({
      page:pageNumber
    })
    let {limit,order,search}=this.state;

    this.searchcourses(limit,pageNumber,order,search)

  }

  searchcourses=(limit,page,order,search)=>{
    let url="/courses.json";
    axios.get(url,{
      params: {
        limit:limit,
        page:page,
        order:order,
        search:search
      }
    }).then((result)=>{
      if(result.data.status===401){

      }else{
        this.setState({
          coursesHomelist:result.data
        })
      }

      }).catch((error)=>{
        console.log(error);
      })
  }

  getUser=(url,type)=>{
    if(this.props.checkIfLogin()===false){
      this.props.showLoginDialog()
      return
    }
    if(this.props.checkIfProfileCompleted()===false){
      this.props.showProfileCompleteDialog()
      return
    }

    if(url !== undefined || url!==""){
      this.props.history.push(url);
    }


  }
  render() {

    let { order,search,page,coursesHomelist }=this.state;
    //console.log(this.props)
    return (
    <div>
			{this.state.updata===undefined?"":<UpgradeModals
				{...this.state}
			/>}
        <div className="newMain clearfix">
					<style>
						{
							`
										.courses-head{
												width: 100%;
												height: 300px;
												background-image: url(${getImageUrl(this.props.mygetHelmetapi && this.props.mygetHelmetapi.course_banner_url === null ?`images/educoder/courses/courses.jpg`:this.props.mygetHelmetapi&&this.props.mygetHelmetapi.course_banner_url)});
											  background-color: #081C4B;
												background-position: center;
												background-repeat: no-repeat;
										}

									`
						}
					</style>
            <div className="courses-head pr" >
                <div className="edu-txt-center pathNavLine">
                    <div className="inline path-nav">
                    </div>
                </div>
            </div>

            <div className="mt20 educontent mb20 clearfix">
              {/*<a className={ order == "all" ? "fl mr20 font-16 bestChoose active" : "fl mr20 font-16 bestChoose"}*/}
                   {/*onClick={ () => this.changeStatus("all")}>全部</a>*/}
                {/*<a className={ order == "mine" ? "fl mr20 font-16 bestChoose active" : "fl mr20 font-16 bestChoose"}*/}
                   {/*onClick={ () => this.changeStatus("mine")}>我的</a>*/}
                <a className={ order == "created_at" ? "fl mr20 font-16 bestChoose active" : "fl mr20 font-16 bestChoose"}
                   onClick={ () => this.changeStatus("created_at")}>最新</a>
                <a className={ order == "visits" ? "fl mr20 font-16 bestChoose active" : "fl mr20 font-16 bestChoose"}
                   onClick={ () => this.changeStatus("visits")}>最热</a>
              {this.props.user&&this.props.user.user_identity==="学生"?"":<span className={  "fr font-16 bestChoose color-blue"  }  onClick={(url)=>this.getUser("/courses/new")}>+新建翻转课堂</span>}

                {/*<div className="fr mr5 search-new">*/}
                    {/*/!* <Search*/}
                    {/*placeholder="课堂名称/教师姓名/学校名称"*/}
                    {/*id="subject_search_input"*/}
                    {/*value={search}*/}
                    {/*onInput={this.inputSearchValue}*/}
                    {/*onSearch={this.searchValue}*/}
                    {/*autoComplete="off"*/}
                    {/*></Search> *!/*/}
                {/*</div>*/}

            </div>

					{coursesHomelist===undefined?<LoadingSpin/>:<CoursesHomeCard {...this.props} {...this.state}
                             coursesHomelist={coursesHomelist}></CoursesHomeCard>}

					{coursesHomelist===undefined?"":coursesHomelist.courses.length===0?<div className="edu-tab-con-box clearfix edu-txt-center mb50">
						<img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/>
						<p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p>
					</div>:""}

            {
              coursesHomelist===undefined?"":coursesHomelist.courses_count > 16?
            <div className="educontent mb80 edu-txt-center mt10">
							<Pagination  current={page} total={ coursesHomelist.courses_count || 1299 } type="mini" pageSize={16}  onChange={this.onChange} />
            </div>:""
            }
        </div>

    </div>
    )
  }
}
export default CoursesHome;


//                {/*<Pagination showQuickJumper current={page} pageSize={16} total={coursesHomelist.courses_count} onChange={this.onChange} />*/}