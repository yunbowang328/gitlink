import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route} from "react-router-dom";

import { Switch ,Input,Tooltip,Icon} from 'antd';

import PropTypes from 'prop-types';

import classNames from 'classnames'

import 'antd/lib/switch/style/index.css'

import './shixunCss/ShixunCardList.css';
import GotoQQgroup from '../../../modal/GotoQQgroup'

import { on, off } from 'educoder'

const $ = window.$;

const Search = Input.Search;

class ShixunCardList extends Component {

	constructor(props) {
		super(props);
		this.state={
			allevent:"desc",
			mine:0,
			InputValue: props.keyword || "",
			typemy:0,
			hots:0,
			news:0,
			shixunid:"",
			upcircle:false,
      typekeyid:undefined,
			goshowqqgtounp:false,
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
	  if (this.props.keyword != prevProps.keyword) {
		  this.setState({
			  InputValue: this.props.keyword
		  })
	  }
	}
	componentDidMount = () => {
	  on('searchKeywordChange', (event, data) => {
		  // console.log(data)
		  this.Input_search(data)
	  })
	}
	componentWillUnmount = () => {
	  off('searchKeywordChange')
	}


	latestHot=(e,key)=>{

    let{upcircle,typekeyid}=this.state;

		let id = e.target.id;
		$("#"+id).siblings().removeClass("active");
		$("#"+id).addClass("active");

		let type;

		// if(id==="all"){
	  //   	type="publish_time";
		// }
		if(id==="hot"){
			type="hot";
		}else if(id==="new"){
			type="new";

		}

		if(typekeyid===key){
      if(upcircle===true){
        this.setState({
          upcircle:false,
        })
        // this.props.Shixunsupcircles("desc")
      }else if(upcircle===false){
        this.setState({
          upcircle:true,
        })
		  // this.props.Shixunsupcircles("desc")
      }
    }else{
		  this.setState({
        typekeyid:key
      })
    }


		this.props.ShixunsState(false,type,"desc");
	}


	onSwitchChange=(e,key)=>{
		let id=e.target.id
		$("#"+id).siblings().removeClass("active");
		$("#"+id).addClass("active");
		let {typemy,upcircle,typekeyid}=this.state;

		if(typekeyid===key){
      if(upcircle===true){
        this.setState({
          upcircle:false,
        })
        this.props.Shixunsupcircles("desc")
      }else if(upcircle===false){
        this.setState({
          upcircle:true
        })
        this.props.Shixunsupcircles("asc")
      }
    }else{
      this.setState({
        typekeyid:key
      })
    }


		if(typemy===0){
			this.setState({
				typemy:1
			})
		}else{
			this.setState({
				typemy:0
			})
		}
		// allevent
		this.props.ShixunsSwitch();
	}
	//输入框搜索
	Input_search = (value) => {
		this.setState({
			InputValue: value
		})
		this.props.OnSearchInput(value,true);
	}

	Input_searchs = (e) => {
		this.setState({
			InputValue: e.target.value
		})
    this.props.OnSearchInput(e.target.value,false);
	}
	upcircles=(val)=>{
  		if(val==="asc"){
  			this.setState({
				upcircle:false,
			})
			this.props.Shixunsupcircles("desc")
		}else if(val==="desc"){
			this.setState({
				upcircle:true
			})
			this.props.Shixunsupcircles("asc")
		}
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
		if(this.props&&this.props.current_user&&this.props.current_user.is_shixun_marker===false){
			this.setgoshowqqgtounp(true);
			return;
		}

		if(url !== undefined || url!==""){
			window.location.href = url;
		}


	}

	// 处理弹框
	setgoshowqqgtounp=(bool)=>{
		this.setState({
			goshowqqgtounp:bool
		})
	}
	render(){
		let {mine,InputValue,upcircle,goshowqqgtounp}=this.state;

		// console.log("NewHeadermygetHelmetapi123123123123");
		let shixuntype=false;
		if(this.props&&this.props.mygetHelmetapi!=null){
			let shixun="/shixuns";
			let paths="/paths";
			let courses="/courses";
			this.props.mygetHelmetapi.navbar.map((item,key)=>{
				var reg = RegExp(item.link);
				if(shixun.match(reg)){
					if(item.hidden===true){
						shixuntype=true
					}
				}
			})
		}

    console.log(this.props.middleshixundata.search_tags)
		return (
			<div className="educontent mt20">
				<div className="clearfix">

					{
						goshowqqgtounp===true?
							<GotoQQgroup {...this.state} {...this.props} setgoshowqqgtounp={(bool)=>this.setgoshowqqgtounp(bool)}></GotoQQgroup>
							:
							""
					}

					{/*<div className="fl mr20 font-16 bestChoose shixun_repertoire active"*/}
						 {/*id={"all"}*/}
						 {/*onClick={(e)=>this.latestHot(e,1)}>全部*/}
					{/*</div>*/}
					{/*<div className="fl mr20 font-16 bestChoose shixun_repertoire"*/}
						 {/*id={mine}*/}
						 {/*onClick={(e)=>this.onSwitchChange(e,2)}>我的*/}
					{/*</div>*/}

					<div className="fl mr20 font-16 bestChoose shixun_repertoire active"
							 id="new"
							 onClick={(e)=>this.latestHot(e,4)}>最新
					</div>

					<div className="fl font-16 bestChoose shixun_repertoire"
						 id="hot"
						 onClick={(e)=>this.latestHot(e,3)}>最热
					</div>

					{shixuntype===true?"":<span className={  "fr font-16 bestChoose color-blue"  }  onClick={(url)=>this.getUser("/shixuns/new")}>+新建实训项目</span>}

					<div className="fr mr20 mt3">
						{
							this.props.middleshixundata&&this.props.middleshixundata.search_tags
						}
					</div>
					{/*<div className="fl font-16 bestChoose shixun_repertoire ml20 mt1"*/}
					    {/*style={{display:upcircle===true?"block":"none"}}*/}
						 {/*// onClick={()=>this.upcircles("asc")}*/}
					{/*>*/}
						{/*<Tooltip placement="bottom" title={"升序"}>*/}
							{/*<Icon type="up-circle" theme="twoTone" />*/}
              {/*/!*<Icon type="sort-descending" />*!/*/}
						{/*</Tooltip>*/}
					{/*</div>*/}
					{/*<div className="fl font-16 bestChoose shixun_repertoire ml20 mt1"*/}
						 {/*// onClick={()=>this.upcircles("desc")}*/}
						 {/*style={{display:upcircle===true?"none":"block"}}*/}
					{/*>*/}
						{/*<Tooltip placement="bottom" title={"降序"}>*/}
							{/*<Icon type="down-circle" theme="twoTone"  />*/}
              {/*/!*<Icon type="sort-ascending" />*!/*/}
						{/*</Tooltip>*/}
					{/*</div>*/}

					{/*<div className="fr mt3">*/}
						{/*<Search*/}
							{/*style={{ width: 300 }}*/}
							{/*className="search-new-input fl"*/}
							{/*placeholder="请输入创建者/实训/关卡名称进行搜索"*/}
							{/*value={InputValue}*/}
							{/*onInput={this.Input_searchs}*/}
							{/*onSearch={value => this.Input_search(value)}*/}
							{/*enterButton*/}
						{/*/>*/}

            {/* <Search
              style={{ width: 300 }}
              className="fl"
              placeholder="请输入创建者/实训/关卡名称进行搜索"
              value={InputValue}
              onInput={this.Input_searchs}
              onSearch={value => this.Input_search(value)}
              autoComplete="off"
            ></Search> */}
					{/*</div>*/}
					{/*<div className="fr">*/}
						{/*<span className="fl color-grey-6 mr30 font-16 mt5" id="search_name">{*/}
							{/*this.props.search_tags === null ? "" : this.props.search_tags*/}
						{/*}</span>*/}
						{/*<div className="fl mr5" style={{marginTop:'1px'}}>*/}
						{/*/!* <div className="controlblue"></div>*/}
						{/*<span className="controlring"></span> *!/*/}
						{/*<Switch*/}
						{/*className="controlbtn mr10 mt10 pr"*/}
						{/*size="small"*/}
						{/*style={{marginTop:'1px'}}*/}
						{/*onChange={this.onSwitchChange}*/}
						{/*/>*/}
						{/*</div>*/}
						{/*<span className="fl font-16 cdefault" data-tip-down="隐藏我学习的实训">隐藏我的</span>*/}

					{/*</div>*/}
					{/*<span className="fr color-grey-6 mr30 font-16" id="search_name"></span>*/}
				</div>
			</div>
		);
	}
}

export default ShixunCardList;
