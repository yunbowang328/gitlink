import React, { Component } from 'react';

import { Select, Input,Menu, Dropdown } from 'antd';

import 'antd/lib/style/index.css';

import 'antd/lib/select/style/index.css';

import 'antd/lib/input/style/index.css';

import './shixunCss/ShixunSearchBar.css';

import axios from 'axios';

const $ = window.$;

const Option = Select.Option;

const Search = Input.Search;


class ShixunSearchBar extends Component {

 constructor(props) {
      super(props)
      this.state = {
            status: undefined,
            diff: 0,
            InputValue: undefined,
            shixunhoverData: [],
            shixunchildValues:'',
          shixunsearchAllvalue:"a",
          openStatus:false,
          openLevel:false
      }
}

      //状态筛选
    status_search = (value) => {
        let newvalue = value;
        if (newvalue === "0") {
            newvalue = " "
        } else if (newvalue === "1") {
            newvalue = 2
        } else if (newvalue === "2") {
            newvalue = 1
        } else if (newvalue === "3") {
            newvalue = 3
        }

      this.setState({
          status: newvalue,
          openStatus:false
      })
        let list = [{'type': 1}, {'value': newvalue}];
      this.props.StatusEnquiry(list);
}

      //难度筛选
diff_search = (value) => {
      this.setState({
        diff: value,
        openLevel:false
      })
      let list=[{'type':2},{'value':value}];
      this.props.StatusEnquiry(list);
}

      //输入框搜索
Input_search = (value) => {
      this.setState({
          InputValue: value
      })
      this.props.OnSearchInput(value);
}
      //查询
shixunsearchAll = (e) => {
     let{shixunsearchAllvalue}=this.state;
    let id = e.target.value;

    if(shixunsearchAllvalue===id){
        return
    }
    if(id===0){
        id=" "
        this.setState({
            InputValue: " "
        })
        this.props.OnSearchInput("");
    }
    let list=[{'tag_level':1},{'tag_id':id}];
    if(id!=undefined){
        this.setState({
            shixunsearchAllvalue:id,
            shixunchildValues:""
        })
        this.props.Updatasearchlist(list);
    }

}

    shixunsearchall=(e)=>{
        let{shixunsearchAllvalue}=this.state;
        let id = "a";

        if(shixunsearchAllvalue===id){
            return
        }
        this.setState({
            shixunsearchAllvalue:"a",
            shixunchildValues:""
        })
        this.props.allUpdatashixunlist();
    }

					//选择Tab页详情
		getshixunchildValue = (e) => {
					 let id = e.target.name;
					 let newid=e.target.id;
					 let list=[{'tag_level':2},{'tag_id':id}];
					 if(id!=undefined||newid!=undefined){
						this.setState({
								shixunsearchAllvalue:newid
						})
						this.props.Updatasearchlist(list);
				}
		}

getshixunchildValues = (e) => {
    let id = e.target.id;
    let newid=e.target.name;
    let list=[{'tag_level':3},{'tag_id':id}];
    if(id!=undefined||newid!=undefined){
        this.setState({
            shixunchildValues:id,
            shixunsearchAllvalue:newid
        })
        this.props.Updatasearchlist(list);
    }

}

componentDidMount() {
      let hoverUrlArr = [];
      let hoverUrl = `/shixuns/menus.json`;
      axios.get(hoverUrl
      ).then((response) => {
            hoverUrlArr = response.data;
            // hoverUrlArr.reverse();
            this.setState({
                  shixunhoverData: hoverUrlArr
            })
      }).catch((error) => {
            console.log(error)
      })
}

render() {
    let {shixunhoverData, shixunchildValues, shixunsearchAllvalue, InputValue,openStatus,openLevel} = this.state;
    let {typepvisible} = this.props;
     // //实训首页筛选的移入和点击事件
     // $(".shaiItem").hover(function(){
     //      var hei=parseInt($(".shaiAllItem").height())-2;
     //     $(this).find(".subshaicontent").css("top", '34px');
     //      $(this).find(".subshaicontent").show();
     //  },function(){
     //      $(this).find(".subshaicontent").hide();
     //  });
		 //
     //  $(".shaiItem").live("click",function(){
     //      $(".shaiItem").removeClass("active");
     //      $(this).addClass("active");
     //      $(".subshaicontent").hide();
     //  });
		 //
     //  $(".subshaicontent").live("click", function(event){
     //      $(".subshaicontent").hide();
     //      event.stopPropagation();
     //  });

		 let overlaymenu=(item,id)=>(
				 <Menu>
					{
						item.map((list,k)=>{
							return(
								<Menu.Item>
								<div className="mt5 subshaicontent-part" key={k}>
									<a style={{ height: '20px' }} className={ "mb15 shixun_repertoire color-dark"}  name={list.id} id={id} onClick={this.getshixunchildValue}>{list.name}</a>
									<div className="sub-Item clearfix">
										{
											list.tags.map((tag,e)=>{
												return(
													<a className={parseInt(shixunchildValues)===tag.id?"shixun_repertoire active":"shixun_repertoire"} key={e} id={tag.id} name={id} rel="subshaicontent" onClick={this.getshixunchildValues}>{tag.name}</a>
												)
											})
										}
									</div>
								</div>
								</Menu.Item>
							)
						})
					}
				 </Menu>
		)

    return (
        <div className="edu-back-white" >
            <div className="educontent">
                <div className="pt40 pb40">
                    <div className="clearfix mb30 shaiContent">
                        <span className="shaiTitle fl mt3">方向：</span>
                        <div className="fl pr shaiAllItem">
                        <li className={shixunsearchAllvalue==="a"?"shaiItem shixun_repertoire active":"shaiItem shixun_repertoire"} value= "a"    onClick={this.shixunsearchall}>全部</li>
													<style>
														{
															`
															.ant-dropdown{
														     width: 800px;
															}
															.shixun_repertoire{
																	cursor: pointer;
																	float: left;
																	margin-right: 20px;
																	color: #999;
																	cursor: pointer;
																	margin-bottom: 10px;
															}
															.ant-dropdown-menu-item, .ant-dropdown-menu-submenu-title{
    															padding: 0px 12px;
															}
															.ant-dropdown-menu-item:hover, .ant-dropdown-menu-submenu-title:hover{
													      background:transparent !important;
															}
															`
														}
													</style>
													{
														shixunhoverData.map((item,key)=>{
															return(
																	<Dropdown overlay={overlaymenu(item.sub_repertoires,item.id)} key={key} placement=	{item.id<4?"bottomRight":item.id>=8?"bottomLeft":"bottomCenter"}>
																		<li  key={key} className={parseInt(shixunsearchAllvalue)===item.id?"shaiItem shixun_repertoire active":"shaiItem shixun_repertoire"} value={item.id}  onClick={this.shixunsearchAll}>
																			{item.name}
																		</li>
																	</Dropdown>
															)
														})
													}


                        </div>
                        </div>
                        <div className="clearfix">
                        <span className="shaiTitle fl mt6">筛选：</span>
													{
														<style>
															{`
															  .shaiItems{
																		padding: 3px 15px;
																		float: left;
																		border-radius: 4px;
																		color: #4C4C4C;
																		cursor: pointer;
																		margin-right: 15px;
																		display: block;
																		float:left;
																	}
																	.shaiItems.active {
																			background-color: #4CACFF!important;
																			color: #fff!important;
																	}
															`}
														</style>
													}
													<div className="fl pr shaiAllItem mt1">
														<li className={this.state.diff===0?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(0)}>全部难度</li>
														<li className={this.state.diff===1?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(1)}>初级</li>
														<li className={this.state.diff===2?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(2)}>中级</li>
														<li className={this.state.diff===3?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(3)}>中高级</li>
														<li className={this.state.diff===4?"shaiItems shixun_repertoire active":"shaiItems shixun_repertoire"}  onClick={()=>this.diff_search(4)}>高级</li>
													</div>

                    </div>
                </div>
        </div>
    </div>
      );
}
}

export default ShixunSearchBar;
