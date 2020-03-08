import React, { Component } from 'react';
import axios from 'axios';
import {Input} from 'antd';
import {getImageUrl} from 'educoder';
import PathCard from "./ShixunPathCard";
import UpgradeModals from '../modals/UpgradeModals';
import Pagination from '@icedesign/base/lib/pagination';
import '@icedesign/base/lib/pagination/style.js';
import './ShixunPaths.css';

class ShixunPathSearch extends Component{
  constructor(props) {
      super(props)
      this.state = {
        order:"updated_at",
        select:undefined,
        search:"",
        page:1,
        pathList:null,
        sortList:'',
        total_count:0
      }
  }
  //切换列表状态
  changeStatus=(value)=>{
  	this.setState(
			{
				pathList:null
			}
		)
    let {select,search}=this.state;
    this.setState({
      order:value,
      page:1
    })
    this.getList(value,select,search,1);
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
    let {order,select,search}=this.state;
    this.setState({
      page:1
    })
    this.getList(order,select,search,1 );
  }
  //选择页数
  onChange=(pageNumber)=> {
    let {order,select,search}=this.state;
    this.setState({
      page:pageNumber
    })
    this.getList(order,select,search,pageNumber);
  }

  //顶部分类
  changeSelect=(tag_id)=>{
		this.setState(
			{
				pathList:null
			}
		)
    let { order,search }=this.state;
    this.setState({
      select:tag_id
    })
    this.getList( order,tag_id,search,1 );
  }


  componentDidMount(){
		document.title="实践课程";
		const upsystem=`/users/system_update.json`;
		axios.get(upsystem).then((response)=>{
			let updata=response.data;
			this.setState({
				updata:updata
			})
		}).catch((error)=>{
			console.log(error);
		})

		let { order,select,search,page }=this.state;
    this.getList(order,select,search,page );
  }


  getList=(order,select,search,page )=>{
    
    let url='/paths.json';
			// '?order='+order+'&page='+page;
    // if(select!=""){
    //   url+='&select='+select;
    // }
    // if(search!=""){
    //   url+='&search='+search;
    // }
    axios.get(url,{params:{
				order:order,
				page:page,
				select:select,
				// search:search
			}}).then((result)=>{
      if(result.status==200){
        this.setState({
          sortList:result.data.tags,
          pathList:result.data.subjects,
          total_count:result.data.total_count
        })
      }
    }).catch((error)=>{
      console.log(error);
    })
  }


	setHistoryFun=(url)=>{
		this.props.history.push(url)
	}

  //头部获取是否已经登录了
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
    let { order,sortList,search,page,total_count,select }=this.state;
    let pathstype=false;
    if(this.props&&this.props.mygetHelmetapi!=null){
      let paths="/paths";
      this.props.mygetHelmetapi.navbar.map((item,key)=>{
        var reg = RegExp(item.link);
        if(paths.match(reg)){
          if(item.hidden===true){
            pathstype=true
          }
        }

      })
    }
      // console.log(this.props)
      return (
        <div>
					{this.state.updata===undefined?"":<UpgradeModals
							{...this.state}
						/>}

					<style>
						{
							`
							.pathImg{
									width: 100%;
									height: 300px;
									background-image: url(${getImageUrl(this.props.mygetHelmetapi&&this.props.mygetHelmetapi.subject_banner_url===null?`images/path/path.png`:this.props.mygetHelmetapi&&this.props.mygetHelmetapi.subject_banner_url)});
									background-color: #000a4f;
									/* background-size: cover; */
									background-position: center;
									background-repeat: no-repeat;
								}
							`
						}
					</style>
          <div className="pr">
            <div className="pathImg"></div>
            <div className="edu-back-white padding20 pathIndexNav">
              <ul className="educontent clearfix">
                  <li className={select > 0 ? "" : "active"}><a onClick={()=>this.changeSelect(null)}>全部</a></li>
                  {
                    sortList && sortList.map((item,key)=>{
                      return(
                        <li className={select == `${item.tag_id}` ? "active" : ""}><a value={item.tag_id} onClick={()=>this.changeSelect(`${item.tag_id}`)}>{item.tag_name}</a></li>
                      )
                    })
                  }
              </ul>
            </div>
          </div>
          <div className="mt20 educontent mb20 clearfix mainPageArray">
            {/*<a href="javascript:void(0)" className={ order == "publish_time" ? "fl mr20 font-16 bestChoose active" : "fl mr20 font-16 bestChoose"} onClick={ () => this.changeStatus("publish_time")}>全部</a>*/}
            {/*<a href="javascript:void(0)" className={ order == "mine" ? "fl mr20 font-16 bestChoose active" : "fl mr20 font-16 bestChoose"} onClick={ () => this.changeStatus("mine")}>我的</a>*/}
            <span className={ order == "updated_at" ? "active" : ""} onClick={ () => this.changeStatus("updated_at")}>最新</span>
            <span className={ order == "myshixun_count" ? "active" : ""} onClick={ () => this.changeStatus("myshixun_count")}>最热</span>
            {this.props.user&&this.props.user.main_site===false?"":this.props.Headertop===undefined?"":<a className={  "fr font-16 bestChoose color-blue"  }  onClick={(url)=>this.getUser("/paths/new")}>+新建实践课程</a>}
            {this.props.user&&this.props.user.main_site===true?"":this.props.Headertop===undefined?"":
              pathstype===true?"":this.props.user&&this.props.user.admin===true||this.props.user&&this.props.user.is_teacher===true||this.props.user&&this.props.user.business===true?<a className={  "fr font-16 bestChoose color-blue"  }  onClick={(url)=>this.getUser("/paths/new")}>+新建实践课程</a>:""
            }
            {/*<div className="fr mr5 search-new">*/}
              {/*/!* <Search*/}
              {/*placeholder="请输入路径名称进行搜索"*/}
              {/*id="subject_search_input"*/} 
              {/*value={search}*/}
              {/*onInput={this.inputSearchValue}*/}
              {/*onSearch={this.searchValue}*/}
              {/*autoComplete="off"*/}
              {/*></Search> *!/*/}
            {/*</div>*/}
          </div>
          <PathCard {...this.props} {...this.state}></PathCard>
          {
						this.state.pathList===null?"":total_count > 16 &&
            <div className="educontent mb80 edu-txt-center mt10">
							<Pagination  current={page} total={ total_count || 1299 } type="mini" pageSize={16}  onChange={this.onChange} />
            </div>
          }

        </div>
      )
  }
}
export default ShixunPathSearch;


//         <Pagination showQuickJumper defaultCurrent={page} current={page} pageSize={16} total={total_count} onChange={this.onChange} />
