import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Rating ,Pagination} from "@icedesign/base";

import {getImageUrl,setImagesUrl, toPath,getUrl} from 'educoder';

import { Spin,Icon,Tooltip ,Rate} from 'antd';
import LoadingSpin from '../../../common/LoadingSpin';
import './shixunCss/shixunCard.css';

// 引入业务组件样式

import axios from 'axios';

const $ = window.$;

class ShixunCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startValue:[],
      order_by:"",
      page:1,
      limit:16,
      keyword:"",
      status:0,
      diff:0,
      hideme:false,
      tag_level:3,
      tag_id:''
    }

  }

  PaginationonChange=(pageNumber)=> {
    this.props.shixunsPage(pageNumber);
  }

  render() {
    let {middleshixundata, pagination, typepvisible, pages, totalcount} = this.props;
		const MyRate = ({ defaultValue, ...rest }) => {
			let myValue = defaultValue;
			// console.log(myValue-Math.floor(myValue))
			// if (myValue < Math.ceil(myValue)) {
			// 	myValue = Math.floor(myValue) + 0.5;
			// }

			return <Rating {...rest} value={myValue} />;
		};
    return (
      <div className="educontent mb80">

				<Spin spinning={typepvisible} tip="正在获取相关数据..."  size="large" style={{marginTop:'15%'}}>

					{ middleshixundata === undefined?"":middleshixundata.length === 0 ?<div className="edu-tab-con-box clearfix edu-txt-center">
						<style>
							{`
            .edu-tab-con-box{
              padding:100px 0px;
            }
            .ant-modal-body .edu-tab-con-box{
              padding:0px!important;
            }
            img.edu-nodata-img{
              margin: 40px auto 20px;
            }
          `}
						</style>
						<img className="edu-nodata-img mb20" src={getUrl("/images/educoder/nodata.png")}/>
						<p className="edu-nodata-p mb20">暂时还没有相关数据哦！</p>
					</div>:""}


					<div className="mb20 clearfix"
             // style={{display: middleshixundata === undefined || middleshixundata.length === 0 ? "none" : "block"}}
				>
            <style>
              {
                `
                .square-list{
                  margin-top:5px;
                }
                `
              }
            </style>
          <div className="shixun_list_content">
            <div className="square-list clearfix">
              {middleshixundata === undefined || middleshixundata.length === 0?" ":middleshixundata.map((item,key)=>{
                return(
                  <div className="square-Item" key={key} id={item.id}>
										<style>
											{
												`
											.tag-green {
														position: absolute;
														left: 10px;
														bottom: 125px;
												}
												.tag-org{
													position: absolute;
														left: 0px;
														top: 20px;
												}
												.tag-org-name{
												width:66px;
												height:28px;
												background:#FF6802;
												width:66px;
												height:28px;
												border-radius:0px 20px 20px 0px;
												}
												.tag-org-name-test{
												width:45px;
												height:23px;
												font-size:14px;
												color:#FFFFFF;
												line-height:19px;
                        margin-right: 6px;
												}
												.intermediatecenter{
														display: flex;
														flex-direction: column;
														align-items: center;
														justify-content: center;
												}
												`
											}
										</style>
                    {
                      item.tag_name === null ? "":
                        <div className="tag-green">
                          <span className="tag-name"> {item.tag_name}</span>
                          {/*<img style={{display:'block',height: '28px'}} src={require(`./shixunCss/tag2.png`)}/>*/}
                        </div>
                    }
                    {
										item.is_jupyter===true?
										<div className="tag-org">
											<p className="tag-org-name intermediatecenter"> <span className="tag-org-name-test">Jupyter</span></p>
											{/*<img style={{display:'block',height: '28px'}} src={require(`./shixunCss/tag2.png`)}/>*/}
										</div>
											:""}

                    <div className={item.power === false ? "closeSquare" : "none"}>
                      <img src={getImageUrl("images/educoder/icon/lockclose.svg")}
                           className="mt80 mb25"/>
                      <p className="font-14 color-white">非试用内容，需要授权</p>
                    </div>

                    <a href={"/shixuns/"+item.identifier+"/challenges"}  className="square-img" target="_blank">
                      {/*<img  src={getImageUrl("images/"+item.pic+"?1540534846")}/>*/}
                      <img  src={setImagesUrl(`${item.pic}`)}/>
                    </a>
										{/*target="_blank"*/}

                    <div className="square-main">
                      <p className="task-hide">
                        <a href={"/shixuns/"+item.identifier+"/challenges"} className="justify color-grey-name" title={item.name} target="_blank">
                          {item.name}
                        </a>
                      </p>

											{/*target="_blank"*/}
											{/*<style>*/}
												{/*{*/}
													{/*`*/}
													{/*.anticon-star{*/}
														{/*font-size:16px;*/}
													{/*}*/}
													{/*.pathInfo{*/}
														{/*margin-right:-5px;*/}
													{/*}*/}
													{/*.ant-rate{*/}
														{/*color: #FFA800;*/}
													{/*}*/}
													{/*`*/}
												{/*}*/}
											{/*</style>*/}
                      <p className="clearfix mt8 ml-3">
                        <span className="rateYoStar fl" style={{padding: '0px',height: '20px',lineHeight: '19px',cursor: 'default'}} title="">
                              {/*<Rate allowHalf value={item.score_info===null?5:item.score_info} disabled key={key} />*/}
                                <MyRate key={key} allowHalf defaultValue={item.score_info===null?5:item.score_info} disabled/>
                        </span>
                        <span className="fl ml25 font-12 color-grey-9 lineh-12 mt5">{item.score_info===null?"5分":item.score_info+"分"}</span>
                      </p>

                      <p className="clearfix mt8 font-12 color-grey-B4">
                        {item.is_jupyter===false?<Tooltip placement="bottom" title={"关卡"}>
                            <span className="mr10 fl squareIconSpan">
                              <i className="iconfont icon-shixunguanqia fl mr3"></i>{item.challenges_count}
                            </span>
                        </Tooltip>:""}

                        {/*<Tooltip placement="bottom" title={"经验值"}>*/}
                            {/*<span className="mr10 fl squareIconSpan">*/}
                                {/*<i className="iconfont icon-jingyan fl mr3"></i>{item.exp}*/}
                            {/*</span>*/}
                        {/*</Tooltip>*/}

                        <Tooltip placement="bottom" title={"学习人数"}>
                            <span className="mr10 fl squareIconSpan" style={{display:item.stu_num===0?"none":"block"}}>
                               <i className="iconfont icon-chengyuan fl mr3"></i>{item.stu_num}
                            </span>
                        </Tooltip>

                        <span className="fr color-grey-B3 squareIconSpan">{item.level}</span>
                      </p>

                    </div>
                  </div>
                )
              })
              }

            </div>

            <div className="both"></div>
            {/*totalcount*/}
            <div className={"ml425"}
              //className={totalcount < 22 ? "ml425" : "ml425"}
                 style={{display: pagination ? "block" : "none"}}>
              {/*<Pagination showQuickJumper defaultCurrent={1} current={pages} total={totalcount} pageSize={12} onChange={this.PaginationonChange} />*/}
              {/* 不加参数请求的时候，没返回总数了。加了个比较大的数字，让他可以翻页 */}
              <Pagination defaultCurrent={1} current={pages} total={ totalcount || 1299 } type="mini" pageSize={16}  onChange={this.PaginationonChange} />
            </div>

          </div>

        </div>
        </Spin>
      </div>
    )
  }
}

export default ShixunCard;
