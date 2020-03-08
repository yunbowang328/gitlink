import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import axios from 'axios';

import { TPMIndexHOC } from '../tpm/TPMIndexHOC';

import SiderBar from '../tpm/SiderBar';

import UpgradeModals from '../modals/UpgradeModals';

import { SnackbarHOC , getImageUrl, configShareForIndex} from 'educoder';

import { Slider ,Rating} from "@icedesign/base";

import './home.css';

import {Tooltip,Spin} from 'antd';

const $ = window.$;

class ShixunsHome extends Component {
    constructor(props) {
        super(props)
        this.state={
            homedatalist:undefined,
            hometypepvisible:true
        }
    }
    componentDidMount(){
      configShareForIndex()
			const upsystem=`/users/system_update.json`;
			axios.get(upsystem).then((response)=>{
			  if(response.data){
          let updata=response.data;
          this.setState({
            updata:updata
          })
        }
			}).catch((error)=>{
				console.log(error);
			})
        let url=`/home/index.json`;
        axios.get(url).then((response)=> {
            if(response.status===200){
               this.setState({
                   homedatalist:response.data,
                   hometypepvisible:false
               })
            }
        }).catch((error)=>{
            // console.log(error)
        });
    }

    bannaronmousemove=()=>{
       $("#bannerrightimg").show();
       $("#bannerleftimg").show();
    }

    bannaronmouseout=()=>{
       $("#bannerrightimg").hide();
       $("#bannerleftimg").hide();
    }
    render() {

        let {homedatalist,hometypepvisible} = this.state;

        const arrowStylel = {
            left: "-76px",
            width: "76px",
            textAlign: "left",
            height: "100%",
            cursor: "pointer"
        };

        const arrowStyler = {
            right: "-120px",
            width: "76px",
            textAlign: "left",
            height: "100%",
            cursor: "pointer"
        };
        const noneStyler={
            display: "none"
        }
        const CustomNextArrow = props => {
            return (
                <div {...props}  id="bannerright" style={arrowStyler}>
                    <img id="bannerrightimg" style={noneStyler} src={"/images/educoder/banner-right.png"} />
                </div>
            );
        };

        const CustomPrevArrow = props => {
            return (
                <div {...props}  id="bannerleft" style={arrowStylel}>
                    <img id="bannerleftimg" style={noneStyler} src={"/images/educoder/banner-left.png"} />
                </div>
            );
        };

         let homedatalistreps;

         if(homedatalist!=undefined){
             homedatalistreps=[];
					 homedatalist.reps.map((item,key)=>{
						 homedatalistreps.push(item)
					 })

         }
				const MyRate = ({ defaultValue, ...rest }) => {
					let myValue = defaultValue;
					return <Rating {...rest} value={myValue} />;
				};

				let shixuntype=false;
				let pathstype=false;
        if(this.props&&this.props.mygetHelmetapi!=null){
					let shixun="/shixuns";
        	let paths="/paths";
					this.props.mygetHelmetapi.navbar.map((item,key)=>{
						var reg = RegExp(item.link);
						if(shixun.match(reg)){
							if(item.hidden===true){
								shixuntype=true
							}
						}
						if(paths.match(reg)){
							if(item.hidden===true){
								pathstype=true
							}
						}
					})
				}


        return (
            <div className="newMain clearfix   backFAFAFA shixunsHome">
							{this.state.updata===undefined?"":<UpgradeModals
								{...this.state}
							/>}
									<Spin spinning={hometypepvisible}  size="large" style={{marginTop:'15%'}}>
                    {/*懒加载*/}

                        {/*<SiderBar/>*/}
                        <div className="clearfix">
													<style>
														{
															`
															.shixunsHome .educontent {
																	width: 1250px;
															}
															.banners{
															overflow: hidden;
															}
															`
														}
													</style>
                             <div className="clearfix edu-back-white pb40 pt30 mb20 banners" id="index-top" onMouseMove={this.bannaronmousemove} onMouseOut={this.bannaronmouseout}>
                                <div className="educontent pr educontentSlider" style={{"width":'1200px'}}>
                                    {homedatalist===undefined?"":
                                    <Slider
                                        nextArrow={<CustomNextArrow />}
                                        prevArrow={<CustomPrevArrow />}
                                        autoplay
																				autoplaySpeed={5000}
																				animation={false}
																				pauseOnHover={true}
                                        style={{width:"100%"}}
                                        arrowPos="outer">
                                            {homedatalist.images_url.map((item, index) => (
                                                <div key={index} className="slider-img-wrapper">
                                                    <a href={item.path}>
                                                        <img src={item.image_url} />
                                                    </a>
                                                </div>
                                            ))}
                                     </Slider>
                                    }
																	{this.props.user&&this.props.user.main_site===true?<div className="user_navlist">
                                        <div className="user_navlist_black">
                                            <ul className="black_nav_list">
                                                {homedatalist === undefined ? "" :homedatalistreps.map((item,key)=>{
                                                        return(
                                                            <li className="welcome_shixun_index" data-id="1" data-type="rep" key={key}>
                                                                <span className="black_nav_span clearfix font-12">
                                                                    <Link  to={"/shixuns?id="+item.id+"&type=rep"}>
                                                                          {item.name}
                                                                    </Link>
                                                                    <img
                                                                    src={getImageUrl("images/educoder/icon/downarrowsmall-right.svg")}
                                                                    className="fr mt15 transform-90"/>
                                                                </span>
                                                                <ul className="user_navlist_white" >
                                                                {
                                                                    item.sub_repertoires.map((i,k)=>{
                                                                       return(
                                                                               <div className="clearfix mt20 mb5 pb10 navlistpanel-line" key={k}>
                                                                                   <div className="little-title clearfix welcome_shixun_index little-titles"
                                                                                      data-id="1" data-rep-id="1" data-type="sub"
                                                                                   >
                                                                                       <Link  to={"/shixuns?id="+i.id+"&type=sub&palce="+item.id}>
                                                                                           {i.name}
                                                                                       </Link>
                                                                                   </div>
                                                                                   {
                                                                                       i.tags.map((t,e)=>{
                                                                                           return(
                                                                                               <Link className="welcome_shixun_index"
                                                                                                  data-id="1" data-rep-id="1" data-sub-id="1"
                                                                                                  to={"/shixuns?id="+t.id+"&type=tag&palce="+item.id}
                                                                                                  data-type="tag" key={e}>{t.name}</Link>
                                                                                               )
                                                                                       })
                                                                                   }

                                                                               </div>

                                                                           )
                                                                    })
                                                                }
                                                                </ul>
                                                            </li>
                                                        )
                                                    })

                                                }
                                            </ul>
                                        </div>
                                    </div>:""}
                                </div>

                             </div>

                            {/*实训路径*/}
													{pathstype===true||homedatalist===undefined?"":homedatalist.subjects.length===0?"":<div className="clearfix pt20 educontent pr pb20">
                                <div className="edu-txt-center">
                                    <p className="color-dark edu-txt-center font-24" style={{lineHeight: '30px'}}>实践课程</p>
                                    <p className="color-grey-cd font-12">TRAINING COURSE</p>
                                </div>
                                <Link to={"/paths"} className="moreitem mr18">更多<i className="fa fa-angle-right ml5"></i></Link>

                                <div className="square-list clearfix" style={{'width':'100%','padding-left':'25px'}}>


                                    {homedatalist===undefined?"":homedatalist.subjects.map((item,key)=>{
                                        if(key<8)
                                        return(
                                            <div className="square-Item" key={key} id={item.id} style={{'width':'286px','margin-right': '20px'}}>

																							{item.excellent === false ? "" :
																									<div className="tag-orange">
																										<span className="tag-name">开放课程</span>
																									</div>}

                                                <div className="tag-green">
                                                    <span className="tag-name"> {item.tag_name}</span>
                                                    {/*<img style={{display:item.tag_name===null?"none":'block'}} src={require(`./tag2.png`)}/>*/}
                                                </div>

                                                <div className={item.power === false ? "closeSquare" : "none"}>
                                                    <img src={getImageUrl("images/educoder/icon/lockclose.svg")}
                                                         className="mt80 mb25"/>
                                                    <p className="font-14 color-white">非试用内容，需要授权</p>
                                                </div>

                                                <Link to={"/paths/" + item.id}
                                                   target="_blank"
                                                   className="square-img">
                                                    <img src={item.image_url}/>
                                                </Link>

                                                    <div className="square-main">
                                                        <p className="task-hide">
                                                            <Link to={"/paths/" + item.id}
                                                               target="_blank"
                                                               title={item.name}
                                                               className="justify color-grey-name">
                                                                {item.name}
                                                            </Link>
                                                        </p>

                                                    <p className="clearfix mt8 font-12 color-grey-B4">
                                                      <Tooltip placement="bottom" title={"章节"}>
                                                          <span className="mr10 fl squareIconSpan">
                                                            <i className="iconfont icon-zhangjie1 fl mr3 iconfontzhangjie"></i>{item.stages_count}
                                                          </span>
                                                      </Tooltip>

                                                      {/*<Tooltip placement="bottom" title={"实训"}>*/}
                                                        {/*<span className="mr10 fl squareIconSpan">*/}
                                                             {/*<i className="iconfont icon-daima fl mr3 iconfontshixundaibeijing"></i>{item.shixuns_count}*/}
                                                         {/*</span>*/}
                                                      {/*</Tooltip>*/}

                                                      <Tooltip placement="bottom" title={"学习人数"}>
                                                        <span className="mr10 fl squareIconSpan" style={{display:item.stu_num===0?"none":"block"}}>
                                                             <i className="iconfont icon-chengyuan fl mr3" ></i>{item.members_count}
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
                            </div>}

                            {/*精选实训 改为 开发社区*/}
													{shixuntype===true||homedatalist===undefined?"":homedatalist.shixuns.length===0?"":<div className="clearfix pt20 educontent pr pb20 mb20">
                                <div className="edu-txt-center">
                                    <p className="color-dark edu-txt-center font-24" style={{lineHeight: '30px'}}>实训项目</p>
                                    <p className="color-grey-cd font-12">DEVELOPMENT COMMUNITY</p>
                                </div>
                                <Link to={"/shixuns"} className="moreitem mr18">更多<i className="fa fa-angle-right ml5"></i></Link>

                                <div className="square-list clearfix" style={{'width':'100%','padding-left':'25px'}}>
																	<style>
																		{
																			`
																			.taglistleft{
																				position: absolute;
																				left: 10px;
																				bottom: 118px;
																			}

																			.square-Item:nth-child(4n+0) {
																					margin-right: 25px;
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
                                    {homedatalist===undefined?"":homedatalist.shixuns.map((item,key)=>{
                                        return(
                                            <div className="square-Item" key={key} id={item.id} style={{'width':'286px','margin-right': '20px'}}>

                                                <div className="tag-green taglistleft">
                                                    <span className="tag-name"> {item.tag_name}</span>
                                                    {/*<img style={{display:item.tag_name===null?"none":'block'}} src={require(`./tag2.png`)}/>*/}
                                                </div>
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

                                                <Link to={"/shixuns/"+item.identifier+"/challenges"}
                                                      target="_blank"
                                                      className="square-img">
                                                    <img  src={item.pic}/>
                                                </Link>

                                                <div className="square-main">
                                                    <p className="task-hide">
                                                        <Link to={"/shixuns/"+item.identifier+"/challenges"}
                                                              target="_blank"
                                                              title={item.name}
                                                              className="justify color-grey-name">
                                                            {item.name}
                                                        </Link>
                                                    </p>

                                                    <p className="clearfix mt8 ml-3">
                                                            <span className="rateYoStar fl" style={{padding: '0px',height: '20px',lineHeight: '19px',cursor: 'default'}} title="">
																																	<MyRate key={key} allowHalf defaultValue={item.score_info===null?5:item.score_info} disabled/>
                                                            </span>
                                                        <span className="fl ml25 font-12 color-grey-9 lineh-12 mt4">{item.score_info===null?"5分":item.score_info+"分"}</span>
                                                    </p>

                                                    <p className="clearfix mt8 font-12 color-grey-B4">

                                                      <Tooltip placement="bottom" title={"关卡"}>
                                                          <span className="mr10 fl squareIconSpan">
                                                            <i className="iconfont icon-shixunguanqia fl mr3" ></i>{item.challenges_count}
                                                          </span>
                                                      </Tooltip>

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
                            </div>}



													{/*导师排行榜*/}
                          {/*  { homedatalist !== undefined && homedatalist.teachers !== undefined && (*/}
													{/*		this.props.user&&this.props.user.main_site===true?<div className="pt60 pb60 mb30 mentor-ranking">*/}
                          {/*      <div className="educontent">*/}
                          {/*          <div className="edu-txt-center">*/}
                          {/*              <p className="color-dark edu-txt-center font-24" style={{lineHeight: '30px'}}>导师排行榜</p>*/}
                          {/*              <p className="color-grey-cd font-12">MENTOR RANKING</p>*/}
                          {/*          </div>*/}

                          {/*          <div className="ranking clearfix">*/}
                          {/*              <ul className="grade color-dark">*/}
                          {/*              {*/}
                          {/*                  homedatalist===undefined?"":homedatalist.teachers.map((item,key)=>{*/}

                          {/*                      if(key===1){*/}
                          {/*                          return(*/}
                          {/*                              <li className="mt35 pr" key={key}>*/}
                          {/*                                  <img src={getImageUrl("images/educoder/huangguan-two.png")} className="huangguan" />*/}
                          {/*                                  <a href={"/users/"+item.login} className="color-dark">*/}
                          {/*                                      <img src={'/images/'+item.image_url} />*/}
                          {/*                                      <p className="task-hide rankName mt5">{item.username}</p>*/}
                          {/*                                  </a>*/}
                          {/*                              </li>*/}
                          {/*                          )*/}
                          {/*                      }*/}
                          {/*              })}*/}
                          {/*                  {*/}
                          {/*                      homedatalist===undefined?"":homedatalist.teachers.map((item,key)=>{*/}
                          {/*                          if(key===0){*/}
                          {/*                              return(*/}
                          {/*                                  <li className="pr" key={key}>*/}
                          {/*                                      <img src={getImageUrl("images/educoder/huangguan.png")}  className="huangguan" />*/}
                          {/*                                      <a href={"/users/"+item.login} className="color-dark">*/}
                          {/*                                          <img src={'/images/'+item.image_url} />*/}
                          {/*                                          <p className="task-hide rankName mt5">{item.username}</p>*/}
                          {/*                                      </a>*/}
                          {/*                                  </li>*/}
                          {/*                              )*/}
                          {/*                          }*/}
                          {/*                      })}*/}
                          {/*                  {*/}
                          {/*                      homedatalist===undefined?"":homedatalist.teachers.map((item,key)=>{*/}
                          {/*                          if(key===2){*/}
                          {/*                              return(*/}
                          {/*                                  <li className="mt35 pr" key={key}>*/}
                          {/*                                      <img src={getImageUrl("images/educoder/huangguan-three.png")}  className="huangguan" />*/}
                          {/*                                      <a href={"/users/"+item.login} className="color-dark">*/}
                          {/*                                          <img src={'/images/'+item.image_url} />*/}
                          {/*                                          <p className="task-hide rankName mt5">{item.username}</p>*/}
                          {/*                                      </a>*/}
                          {/*                                  </li>*/}
                          {/*                              )*/}
                          {/*                          }*/}
                          {/*                      })}*/}
                          {/*              </ul>*/}
                          {/*              <br />*/}
                          {/*                  <ul className="grade mt30">*/}
                          {/*                      {*/}
                          {/*                          homedatalist===undefined?"":homedatalist.teachers.map((item,key)=>{*/}
                          {/*                              if(key>2) {*/}
                          {/*                                  return (*/}
                          {/*                                      <li key={key}>*/}
                          {/*                                          <a href={"/users/"+item.login} className="color-dark">*/}
                          {/*                                              <img src={'/images/'+item.image_url}/>*/}
                          {/*                                              <p className="task-hide rankName mt5">{item.username}</p>*/}
                          {/*                                          </a>*/}
                          {/*                                      </li>*/}
                          {/*                                  )*/}
                          {/*                              }*/}
                          {/*                          })}*/}


                          {/*                  </ul>*/}
                          {/*          </div>*/}


                          {/*      </div>*/}
                          {/*  </div>:""*/}
                          {/*  )}*/}

                            {/*程序员排行榜*/}
                            {/*{ homedatalist !== undefined && homedatalist.students !== undefined && (*/}
														{/*	this.props.user&&this.props.user.main_site===true?<div className="pt60 pb60 mb30 pro-ranking">*/}
                            {/*    <div className="educontent">*/}
                            {/*        <div className="edu-txt-center">*/}
                            {/*            <p className="color-dark edu-txt-center font-24" style={{lineHeight: '30px'}}>程序员排行榜</p>*/}
                            {/*            <p className="color-grey-cd font-12">PROGRAMMER RANKING</p>*/}
                            {/*        </div>*/}
                            {/*        <div className="ranking clearfix">*/}
                            {/*        <ul className="grade color-dark">*/}
                            {/*            {*/}
                            {/*                homedatalist===undefined?"":homedatalist.students.map((item,key)=>{*/}
                            {/*                    if(key===1){*/}
                            {/*                        return(*/}
                            {/*                            <li className="mt35 pr" key={key}>*/}
                            {/*                                <img src={getImageUrl("images/educoder/huangguan-two.png")} className="huangguan" />*/}
                            {/*                                <a href={"/users/"+item.login} className="color-dark">*/}
                            {/*                                    <img src={'/images/'+item.image_url} />*/}
                            {/*                                    <p className="task-hide rankName mt5">{item.username}</p>*/}
                            {/*                                </a>*/}
                            {/*                            </li>*/}
                            {/*                        )*/}
                            {/*                    }*/}
                            {/*                })}*/}
                            {/*            {*/}
                            {/*                homedatalist===undefined?"":homedatalist.students.map((item,key)=>{*/}
                            {/*                    if(key===0){*/}
                            {/*                        return(*/}
                            {/*                            <li className="pr" key={key}>*/}
                            {/*                                <img src={getImageUrl("images/educoder/huangguan.png")}  className="huangguan" />*/}
                            {/*                                <a href={"/users/"+item.login} className="color-dark">*/}
                            {/*                                    <img src={'/images/'+item.image_url} />*/}
                            {/*                                    <p className="task-hide rankName mt5">{item.username}</p>*/}
                            {/*                                </a>*/}
                            {/*                            </li>*/}
                            {/*                        )*/}
                            {/*                    }*/}
                            {/*                })}*/}
                            {/*            {*/}
                            {/*                homedatalist===undefined?"":homedatalist.students.map((item,key)=>{*/}
                            {/*                    if(key===2){*/}
                            {/*                        return(*/}
                            {/*                            <li className="mt35 pr" key={key}>*/}
                            {/*                                <img src={getImageUrl("images/educoder/huangguan-three.png")}  className="huangguan" />*/}
                            {/*                                <a href={"/users/"+item.login} className="color-dark">*/}
                            {/*                                    <img src={'/images/'+item.image_url} />*/}
                            {/*                                    <p className="task-hide rankName mt5">{item.username}</p>*/}
                            {/*                                </a>*/}
                            {/*                            </li>*/}
                            {/*                        )*/}
                            {/*                    }*/}
                            {/*                })}*/}
                            {/*        </ul>*/}
                            {/*        <br />*/}
                            {/*        <ul className="grade mt30">*/}
                            {/*            {*/}
                            {/*                homedatalist===undefined?"":homedatalist.students.map((item,key)=>{*/}
                            {/*                    if(key>2) {*/}
                            {/*                        return (*/}
                            {/*                            <li key={key}>*/}
                            {/*                                <a href={"/users/"+item.login} className="color-dark">*/}
                            {/*                                    <img src={'/images/'+item.image_url}/>*/}
                            {/*                                    <p className="task-hide rankName mt5">{item.username}</p>*/}
                            {/*                                </a>*/}
                            {/*                            </li>*/}
                            {/*                        )*/}
                            {/*                    }*/}
                            {/*                })}*/}


                            {/*        </ul>*/}
                            {/*    </div>*/}
                            {/*    </div>*/}
                            {/*</div>:""*/}
                            {/*)}*/}
                        </div>
									</Spin>
            </div>
        );
    }
}

export default SnackbarHOC() (TPMIndexHOC  ( ShixunsHome ));
