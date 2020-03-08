import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { getImageUrl ,markdownToHTML, configShareForCustom} from 'educoder';

import { CircularProgress } from 'material-ui/Progress';

import { Modal, Spin, Tooltip ,message,Icon,Button,Divider} from 'antd';

import axios from 'axios';

import '../shixunchildCss/Challenges.css';

import AccountProfile from"../../../user/AccountProfile";

const $ = window.$;

class Challenges extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ChallengesDataList: undefined,
      operate: true,
      startbtns: false,
      sumid: "",
      sumidtype: false,
      startshixunCombattype:false,
      shixunsreplace:false,
      shixunsmessage:"",
      hidestartshixunsreplacevalue:"",
      operationstrue:false,
			isSpin:false,
      boxoffsetHeigh:0,
      opentitletype:true,
      isopentitletype:"Less",
    }
  }

  ChallengesList = () => {
    let id = this.props.match.params.shixunId;
    let ChallengesURL = `/shixuns/` + id + `/challenges.json`;

    axios.get(ChallengesURL).then((response) => {
      if (response.status === 200) {
        if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {

        }else{
          configShareForCustom(this.props.shixunsDetails.name, response.data.description)
          this.setState({
            ChallengesDataList: response.data,
            sumidtype: false,
          });

          if(response.data.description=== ""||response.data.description===null||response.data.description===undefined){
            this.setState({
              isopentitletype:"Less",
            })
          }
          this.getjianjiesize()
        }
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  getjianjiesize=()=>{
    let {ChallengesDataList}=this.state;
    let boxoffsetHeigh;
    let box=document.getElementById("shixunchallengesid");

    if(box){
      boxoffsetHeigh=box.offsetHeight
      if(ChallengesDataList === undefined || ChallengesDataList&&ChallengesDataList.description=== ""||ChallengesDataList&&ChallengesDataList.description===null||ChallengesDataList&&ChallengesDataList.description===undefined){

      }else{
        if(this.state.isopentitletype==="greater"){

        }else{
          if(boxoffsetHeigh>=300){
            this.setState({
              opentitletype:true,
              isopentitletype:"greater",
              boxoffsetHeigh:boxoffsetHeigh
            })
          }else{
            this.setState({
              isopentitletype:"Less",
              boxoffsetHeigh:boxoffsetHeigh
            })
          }
        }

      }

    }
  }

  componentDidMount() {
    if(this.state.isopentitletype==="greater"){

    }else {
      this.ChallengesList()
    }

  }
  componentDidUpdate = (prevProps,prevState) => {

      //防止陷入无限循环
    if(prevState.ChallengesDataList!=this.state.ChallengesDataList){
      if(this.state.isopentitletype==="greater"){

      }else{
        this.getjianjiesize()
      }
    }

  }
  updatamakedown = (id) => {
    setTimeout(() => {
      var shixunDescr = window.editormd.markdownToHTML(id, {
        htmlDecode: "style,script,iframe",
        taskList: true,
        tex: true,
        flowChart: true,
        sequenceDiagram: true
      });
      $("#" + id + " p:first").addClass("ReactMarkdown");
    }, 200)
  }

  // 关卡的上移下移操作
  operations = (sumid, type) => {
    this.setState({
      operationstrue:true
    })
    let { ChallengesDataList } = this.state;
    let operationUrl;
    if (type === "up") {
      operationUrl = "/shixuns/" + ChallengesDataList.shixun_identifier + "/challenges/" + sumid + "/index_up.json";
    } else if (type === "down") {
      operationUrl = "/shixuns/" + ChallengesDataList.shixun_identifier + "/challenges/" + sumid + "/index_down.json";
    }
    if (this.state.operate) {

      this.setState({
        operate: false
      });
      axios.get(operationUrl).then((response) => {
        if (response.status === 200) {
          this.setState({
            operate: true,
            operationstrue:false
          });
          this.ChallengesList();

        }
      }).catch((error) => {
        console.log(error);
        this.setState({
          operate: true,
          operationstrue:false
        });
        this.ChallengesList()
      })
    }
  }
  delOperations = (sumid) => {
    this.setState({
      sumid: sumid,
      sumidtype: true
    })
  }

  clonedelOperationss = () => {
    this.setState({
      sumidtype: false
    })
  }
  delOperationss = () => {
    let { ChallengesDataList, sumid } = this.state;
    let operationUrl = "/shixuns/" + ChallengesDataList.shixun_identifier + "/challenges/" + sumid+".json"

    if (this.state.operate) {
      this.setState({
        operate: false,
        sumidtype: false
      })
      axios.delete(operationUrl, {
        withCredentials: true
      }).then((response) => {
        if (response.status === 200) {
          this.setState({
            operate: true,
            sumidtype: false
          });
          this.ChallengesList();
        }
        this.ChallengesList()
      }).catch((error) => {
        console.log(error);
        this.setState({
          operate: true,
          sumidtype: false
        });
        this.ChallengesList()
      })
    }
  }

	startgameid=(id)=>{

		let url = "/shixuns/" + id + "/shixun_exec.json";
		axios.get(url).then((response) => {

			if (response.data.status === -2) {
				this.setState({
					shixunsreplace:true,
					hidestartshixunsreplacevalue:response.data.message+".json"
				})
			} else if (response.data.status === -1) {
				console.log(response)
			}else if(response.data.status===-3){
				this.setState({
					shixunsmessage:response.data.message,
					startshixunCombattype:true,
				})
			} else {
				window.location.href = "/tasks/" + response.data.game_identifier;
				// window.location.href = path
				// let path="/tasks/"+response.data.game_identifier;
				// this.props.history.push(path);
			}
		}).catch((error) => {

		});


	}

	hidestartshixunsreplace=(url)=>{
		this.setState({
			isSpin:true,
		})
		axios.get(url).then((response) => {
			if(response.status===200){
				// let path="/shixuns/"+response.data.shixun_identifier+"/challenges";
				// this.props.history.push(path);
				message.success('重置成功，正在进入实训！');
				this.startgameid(response.data.shixun_identifier);
				this.setState({
					shixunsreplace:false,
					isSpin:false,
				})

				// message.success('重置成功，正在进入实训！');
				// this.startshixunCombat();
			}}
		).catch((error) => {

		});

	}

  //编辑实训题目选择题
	EditTraining=(type, ids, path)=>{
		let { ChallengesDataList } = this.state;
		window.location.href = "/shixuns/" + ChallengesDataList.shixun_identifier + "/challenges/" + ids + path;
	}

  //开始实战按钮
  startshixunCombat = (type, ids, id) => {

		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}

		if(this.props.checkIfProfileCompleted()===false){
			this.setState({
				AccountProfiletype:true
			})
			return
		}

		// if(this.props.checkIfProfessionalCertification()===false){
		// 	this.setState({
		// 		AccountProfiletype:true
		// 	})
		// 	return
		// }


		let { ChallengesDataList } = this.state;
			// let id = this.props.match.params.shixunId;
				this.setState({
					startbtns: true
				})
				let url = "/shixuns/" + ChallengesDataList.shixun_identifier + "/shixun_exec.json?challenge_id="+id;
				axios.get(url).then((response) => {

					if (response.data.status === -2) {
						this.setState({
							startbtns:false,
							shixunsreplace:true,
							hidestartshixunsreplacevalue:response.data.message+".json"
						})
					} else if (response.data.status === -1) {
						this.setState({
							startbtns: false
						})
						console.log(response)
					}else if(response.data.status===-3){
						this.setState({
							shixunsmessage:response.data.message,
							startshixunCombattype:true,
							startbtns:false
						})
					} else {
						window.location.href = "/tasks/" + response.data.game_identifier;
						// window.location.href = path
						// let path="/tasks/"+response.data.game_identifier;
						// this.props.history.push(path);
					}
				}).catch((error) => {

				});


		// if(path===null){
		// }else{
		// 	if (type > 4 || type === false) {
		// 		window.location.href = path;
		// 	} else {
		//
		// 	}
		// }


  }
  hidestartshixunCombattype=()=>{
    this.setState({
      startshixunCombattype:false
    })
  }

	hideAccountProfile=()=>{
		this.setState({
			AccountProfiletype:false
		})
	}

  opentitle=()=>{
    this.setState({
      opentitletype:!this.state.opentitletype,
    })
  }

  render() {
    let { ChallengesDataList, startbtns, sumidtype ,startshixunCombattype,shixunsreplace,shixunsmessage,hidestartshixunsreplacevalue,operationstrue,AccountProfiletype} = this.state;
    let { loadingContent } = this.props;
    if (ChallengesDataList != undefined) {
      this.updatamakedown("ReactMarkdown")
    }
    let id = this.props.match.params.shixunId;
		const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

    return (
      <React.Fragment>
				{AccountProfiletype===true?<AccountProfile
					hideAccountProfile={()=>this.hideAccountProfile()}
					{...this.props}
					{...this.state}
				/>:""}

        {loadingContent ?
          <CircularProgress size={40} thickness={3} style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '200px',
            display: 'block'
          }} /> :

          <div>
						{/*<p className="clearfix mb20">*/}
						{/*	{this.props.identity < 5 && ChallengesDataList&&ChallengesDataList.shixun_status=== 0 ?*/}
						{/*		<Link to={"/shixuns/" + id + "/challenges/new"}*/}
						{/*					className="white-btn edu-greenline-btn fr addshixuns"*/}
						{/*			// data-tip-down="新增代码编辑类型任务"*/}
						{/*		>*/}
						{/*			<Tooltip placement="bottom" title={"新增代码编辑类型任务"}>*/}
						{/*				<img src={getImageUrl("images/educoder/icon/addsmallgreen.svg")}*/}
						{/*						 className="fl mr5 mt6" />*/}
						{/*				实践任务*/}
						{/*			</Tooltip>*/}

						{/*		</Link> : ""*/}
						{/*	}*/}
						{/*	{this.props.identity < 5 && ChallengesDataList&&ChallengesDataList.shixun_status=== 0 ?*/}
						{/*		<Link to={"/shixuns/" + id + "/challenges/newquestion"}*/}
						{/*					className="white-btn edu-greenline-btn fr mr20 addshixuns"*/}
						{/*			// data-tip-down="新增选择题类型任务"*/}
						{/*		>*/}
						{/*			<Tooltip placement="bottom" title={"新增选择题类型任务"}>*/}
						{/*				<img src={getImageUrl("images/educoder/icon/addsmallgreen.svg")}*/}
						{/*						 className="fl mr5 mt5" />*/}
						{/*				选择题任务*/}
						{/*			</Tooltip>*/}
						{/*		</Link> : ""*/}
						{/*	}*/}
						{/*</p>*/}

            <style>
              {
                `
                .task-item{
                    margin-bottom: 20px;
                    padding-bottom: 20px;
                    margin-top: 10px;
                }
                `
              }
            </style>
            <p className="clearfix mb20 edu-back-white">
              <div className={"shixunjianjie"}>
                <span className="font-16 fl">简介</span>

                {this.props.identity < 5 && ChallengesDataList&&ChallengesDataList.shixun_status < 3 ?
                  <a href={"/shixuns/" + id + "/settings?edit=1"} className="fr color-blue font-14">
                  {/*<img src={getImageUrl("images/educoder/icon/edit.svg")} className="fl mt3 ml2" />*/}
                  编辑
                </a>:""}
                {this.props.user && this.props.user.main_site === true ?
                  this.props.identity < 5?<a className="fr font-14 color-blue mr20" href="/forums/2943"
                     target="_blank">实训制作指南</a> : "":""}
              </div>

              <div>
                <div className={"pd20"} id={"shixunchallengesid"}>
                <style>
                  {
                    `
                    .editormd-html-preview, .editormd-preview-container {
                          width: 100% !important;
                      }
                    `
                  }
                </style>
                  <style>
                    {
                      `
                    .markdown-body img{
                      min-height: 200px;
                    }
                    `
                    }
                  </style>

                  {ChallengesDataList === undefined || ChallengesDataList&&ChallengesDataList.description=== ""||ChallengesDataList&&ChallengesDataList.description===null||ChallengesDataList&&ChallengesDataList.description===undefined?<style>
                    {
                      `
									#shixunchallengesid{
								    	max-height: 300px;
									    overflow: hidden;
									}
									`
                    }
                  </style>:""}


                  {ChallengesDataList === undefined || ChallengesDataList&&ChallengesDataList.description=== ""||ChallengesDataList&&ChallengesDataList.description===null||ChallengesDataList&&ChallengesDataList.description===undefined?"":this.state.isopentitletype==="greater"&&this.state.opentitletype===true?
                  <style>
                    {
                      `
                      #shixunchallengesid{
                          max-height:260px;
                          overflow: hidden;
                      }
                      `
                    }
                  </style>:""}


                <div className="justify break_full_word new_li "
                     id="challenge_editorMd_description">
                  {ChallengesDataList === undefined || ChallengesDataList&&ChallengesDataList.description=== ""||ChallengesDataList&&ChallengesDataList.description===null||ChallengesDataList&&ChallengesDataList.description===undefined?
                    <div className="edu-tab-con-box clearfix edu-txt-center">
                      {this.props.identity < 5?<img className="newedu-nodata-img mb20"
                                                    src={getImageUrl("images/educoder/shixunnodata.png")} />:<img className="edu-nodata-img mb20"
                                                                                                                  src={getImageUrl("images/educoder/nodata.png")} />}
                      <p className="edu-nodata-p mb80">暂时还没有相关数据哦！</p>
                    </div>
                    :<p id="ReactMarkdown" style={{overflow:'hidden'}}>
                    {ChallengesDataList === undefined ? "" :ChallengesDataList&&ChallengesDataList.description===null?"":
                      <div className={"markdown-body"} dangerouslySetInnerHTML={{__html: markdownToHTML(ChallengesDataList.description).replace(/▁/g,"▁▁▁")}}></div>
                    }
                  </p>}
                </div>
                </div>
                <style>
                  {
                    `
                    .ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::before{
                        border: none !important
                    }
                    .ant-divider-horizontal.ant-divider-with-text-center.ant-divider-dashed::after{
                       border: none !important
                    }
                    `
                  }
                </style>
                {this.state.isopentitletype==="Less"?"":this.state.opentitletype===true?<Divider dashed={true} onClick={()=>this.opentitle()} className={"pointer Breadcrumbfont color-grey-9 "}>
                  <a className={"font-14  color-grey-9"}>阅读全文 <i className={"iconfont icon-jiantou9 font-14"}></i></a>
                </Divider>:<Divider dashed={true} onClick={()=>this.opentitle()} className={"pointer Breadcrumbfont color-grey-9 "}>
                  <a className={"font-14  color-grey-9"}>收起全文 <i className={"iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu- font-14"}></i></a>
                </Divider>}

              </div>
            </p>

            <div className={"shixunjianjiecballenges edu-back-white boreee"}>
              <span className="font-16 fl">全部任务</span>
              <span className="fr mt2">
                {/*                      <img src={getImageUrl("images/educoder/icon/addsmallgreen.svg")}
                           className="fl mr5 mt6" />*/}
                {/*<Tooltip placement="bottom" title={"新增代码编辑类型任务"}>*/}
                {/*                </Tooltip>*/}
                {this.props.identity < 5 && ChallengesDataList&&ChallengesDataList.shixun_status=== 0 ?
                  <Link to={"/shixuns/" + id + "/challenges/new"}
                        className="fr"
                    // data-tip-down="新增代码编辑类型任务"
                  >
                    <Button type="primary"
                            className="edu-default-btn edu-greenback-btn"
                    >新增实践任务</Button>
                  </Link> : ""
                }
                {this.props.identity < 5 && ChallengesDataList&&ChallengesDataList.shixun_status=== 0 ?
                  <Link to={"/shixuns/" + id + "/challenges/newquestion"}
                        className="fr mr20"
                    // data-tip-down="新增选择题类型任务"
                  >
                      <Button type="primary"
                              className="edu-default-btn edu-greenback-btn"
                      >新增选择题任务</Button>
                  </Link> : ""
                }
                {/*<Tooltip placement="bottom" title={"新增选择题类型任务"}>*/}
                {/*  </Tooltip>*/}
              {/*         <img src={getImageUrl("images/educoder/icon/addsmallgreen.svg")}
                           className="fl mr5 mt5" />*/}
              </span>
            </div>

            <div className="alltask edu-back-white padding1020pxshixun">

              {ChallengesDataList === undefined ? <div className="alltask">
                <div className="edu-tab-con-box clearfix edu-txt-center">
                  {this.props.identity < 5?<img className="newedu-nodata-img mb20"
                       src={getImageUrl("images/educoder/shixunnodata.png")} />:<img className="edu-nodata-img mb20"
                                                                                     src={getImageUrl("images/educoder/nodata.png")} />}
                  <p className="edu-nodata-p mb80">暂时还没有相关数据哦！</p>
                </div>
              </div> : ChallengesDataList.challenge_list === undefined ?
                <div className="alltask">
                  <div className="edu-tab-con-box clearfix edu-txt-center">
                    {this.props.identity < 5?<img className="newedu-nodata-img mb20"
                         src={getImageUrl("images/educoder/shixunnodata.png")} />:<img className="edu-nodata-img mb20"
                                                                                       src={getImageUrl("images/educoder/nodata.png")} />}
                    <p className="edu-nodata-p mb80">暂时还没有相关数据哦！</p>
                  </div>
                </div>
                : ChallengesDataList.challenge_list.length === 0 ?
                  <div className="alltask">
                    <div className="edu-tab-con-box clearfix edu-txt-center">
                      {this.props.identity < 5?<img className="newedu-nodata-img mb20"
                           src={getImageUrl("images/educoder/shixunnodata.png")} />:<img className="edu-nodata-img mb20"
                                                                                         src={getImageUrl("images/educoder/nodata.png")} />}
                      <p className="edu-nodata-p mb80">暂时还没有相关数据哦！</p>
                    </div>
                  </div>
                  : ChallengesDataList.challenge_list.map((item, key) => {
                    return (
                      <div className="task-item" key={key} id={"shixun_index_" + item.position}>
                        <div className="clearfix mb5">
                          <div className="mr15 font-16 fl shixunstartbutton666666">第{key+1}关：{item.st === 0 ?"实践题":"选择题"}

                            {/*<a className={"edu-default-btn edu-blueline-btn fr Finish_button mtf3"}*/}
                            {/*   onClick={()=>this.startshixunCombat(false,undefined, item.challenge_id)}*/}
                            {/*  // onClick={() => this.startshixunCombat(false)}*/}
                            {/*   title={"查看挑战关卡"}*/}
                            {/*>已完成</a>*/}
                            {/*判断比较复杂 有排第一不能是灰色按钮*/}
                            {item.status === 2 ?
                              <Button  type="primary" shape="round" size={"small"} className={"ml30 shixunstartbutton33BD8C"}>已完成</Button>
                              : ""
                            }

                            {/*    <a className={"edu-default-btn edu-blueback-btn fr Finish_button"}
                                   title={"直接挑战"}
                                   style={{marginTop: '-2px'}}
                                   onClick={()=>this.startshixunCombat(false,undefined, item.challenge_id)}
                                  // onClick={() => this.startshixunCombat(false)}
                                >直接挑战</a> */}
                            {
                              ChallengesDataList.allow_skip === true && item.status === 1?
                                <Button  type="primary" shape="round" size={"small"} className={"ml30 shixunstartbuttonFF6601"}>未完成</Button>
                            : ""
                            }

                            {/*    <Tooltip placement="bottom" title={"直接挑战"}>
                                  <a className={"edu-default-btn edu-blueback-btn fr Finish_button"}
                                     onClick={()=>this.startshixunCombat(false,undefined, item.challenge_id)}
                                     style={{marginTop: '-2px'}}>直接挑战</a>
                                </Tooltip>
                            */}
                            {
                              ChallengesDataList.allow_skip === false ? item.status === 1?
                                <Button  type="primary" shape="round" size={"small"} className={"ml30 shixunstartbuttonFF6601"}>未完成</Button>
                            :"":""

                            }

                            {/*<Tooltip placement="bottom" title={"请先完成前序关卡"}>*/}
                            {/*  <a className={"edu-default-btn edu-greyback-btn fr Finish_button"}*/}
                            {/*    // onClick={this.props.identity<5&&item.open_game!=""?()=>this.startshixunCombat(false,undefined, item.challenge_id):""}*/}
                            {/*     style={{marginTop: '-2px'}}>直接挑战</a>*/}
                            {/*</Tooltip>*/}

                            {
                              item.status === 0 ?
                                <Button  type="primary" shape="round" size={"small"} className={"ml30 shixunstartbuttonFF6601"}>未完成</Button>
                          :""
                            }
                          </div>

                          <span className="fr">
                              {item.delete_url != undefined &&
                              <Tooltip placement="bottom" title={"删除"}>
                                <a onClick={() => this.delOperations(item.challenge_id)}
                                   style={{ display:this.props.user.admin===true?"block":this.props.identity < 5 && ChallengesDataList.shixun_status === 0 ? "block" : 'none' }}
                                   className="fl mr25">
                                  {/*<img src={getImageUrl("images/educoder/icon/close.svg")}*/}
                                  {/*     className="fl mt5 ml5" />*/}
                                  <i className={"iconfont icon-shanchu_Hover"}></i>
                                </a>
                              </Tooltip>
                              }


                            {item.up_url != undefined &&
                            <Tooltip placement="bottom" title={"向上移动"}>
                              <a onClick={operationstrue===true?"":() => this.operations(item.challenge_id, "up")}
                                 style={{ display:this.props.user.admin===true?"block":this.props.identity < 5 && ChallengesDataList.shixun_status === 0 ? "block" : 'none' }}
                                 className="fl mr25">
                                {/*<img src={getImageUrl("images/educoder/icon/moveup.svg")}*/}
                                {/*     className="fl mt2 ml4" />*/}
                                <i className={"iconfont icon-shangyi_Hover"}></i>
                              </a>
                            </Tooltip>
                            }
                            {item.down_url != undefined &&
                            <Tooltip placement="bottom" title={"向下移动"}>
                              <a onClick={operationstrue===true?"":() => this.operations(item.challenge_id, "down")}
                                 style={{ display: this.props.user.admin===true?"block":this.props.identity < 5 && ChallengesDataList.shixun_status=== 0 ? "block" : 'none' }}
                                 className="fl mr25">
                                {/*<img src={getImageUrl("images/educoder/icon/movedown.svg")} className="fl mt2 ml4" />*/}
                                <i className={"iconfont icon-xiayi_Hover"}></i>
                              </a>
                            </Tooltip>

                            }

                            {
                              item.st === 1 ?
                                <Tooltip placement="bottom" title={"编辑"}>
                                  <Link
                                    style={{ display:this.props.user.admin===true?"block":this.props.identity < 5 && ChallengesDataList.shixun_status< 3 ? "block" : 'none' }}
                                    to={"/shixuns/" + ChallengesDataList.shixun_identifier + "/challenges/" + item.challenge_id + "/editquestion"}
                                    className="fl">
                                    {/*<img src={getImageUrl("images/educoder/icon/edit.svg")}*/}
                                    {/*     className="fl mt3 ml2" />*/}
                                    <i className={"iconfont icon-bianji_Hover"}></i>
                                  </Link>
                                </Tooltip>
                                :
                                <Tooltip placement="bottom" title={"编辑"}>
                                  <Link
                                    style={{ display:this.props.user.admin===true?"block":this.props.identity < 5 && ChallengesDataList.shixun_status < 3 ? "block" : 'none' }}
                                    to={"/shixuns/" + ChallengesDataList.shixun_identifier + "/challenges/" + item.challenge_id + "/editcheckpoint"}
                                    className="fl">
                                    {/*<img src={getImageUrl("images/educoder/icon/edit.svg")}*/}
                                    {/*     className="fl mt3 ml2" />*/}
                                    <i className={"iconfont icon-bianji_Hover"}></i>
                                  </Link>
                                </Tooltip>
                            }

                            </span>
                        </div>


                        <div className="clearfix mb5">
                          {/*onClick={() => this.EditTraining(this.props.identity, item.challenge_id, "/editquestion")}*/}
                          {this.props.identity<5?
                            item.st === 1 ?
                              <div className="font-16 color05101a fonthiddens">{item.name}</div>
                              :
                              <div className="font-16 color05101a fonthiddens">{item.name}</div>:<div
                              // onClick={() => this.startshixunCombat(this.props.identity, item.challenge_id, "/editcheckpoint")}
                              className="font-16 color05101a fonthiddens">{item.name}</div>
                          }
                          {/* onClick={() => this.EditTraining(this.props.identity, item.challenge_id, "/editcheckpoint")}*/}

                          <Modal
                            keyboard={false}
                            visible={startbtns}
                            closable={false}
                            footer={null}
                            className="startbtnModal"
                          >
                            <Spin size="large" />
                          </Modal>

                        </div>
                        <div className="clearfix">
                          <style>
                            {
                              `
                              .task-colspan {
                                min-width: 18% !important;
                                }
                              `
                            }
                          </style>
                          <span className="task-colspan"><span className={"shixunbingbaocun12"}>正在挑战： </span><span className={"shixunbingbaocun33312"}>{item.playing_count}人</span></span>
													<span className="task-colspan"><span className={"shixunbingbaocun12"}>完成挑战： </span><span className={"shixunbingbaocun33312"}>{item.passed_count}人</span></span>
													<span className="task-colspan"><span className={"shixunbingbaocun12"}>可获经验： </span><span className={"shixunbingbaocun33312"}>{item.score}点</span></span>

                        </div>
                      </div>
                    )
                  })}
            </div>
            <Modal
              keyboard={false}
              title="提示"
              visible={sumidtype}
              closable={false}
              footer={null}
            >
              <div className="task-popup-content">
                <p className="task-popup-text-center font-16">
                  <span className="font-17 mt10">是否删除该关卡？</span>
                </p>
                <p className="task-popup-text-center font-16 mt30">
                  <a className="pop_close task-btn mr20"
                     onClick={() => this.clonedelOperationss()}
                  >取消</a>
                  <a onClick={() => this.delOperationss()}
                     className="task-btn task-btn-orange ">确定</a>

                </p>
              </div>

            </Modal>

            <Modal
              keyboard={false}
              title="提示"
              visible={startshixunCombattype}
              closable={false}
              footer={null}
            >
              <div className="task-popup-content">
                <p className="task-popup-text-center font-16 pb20">目前该实训项目尚在内测中，将于{shixunsmessage}之后开放，谢谢！ </p>
              </div>
              <div className="task-popup-submit clearfix">
                {/*<a onClick={this.hidestartshixunCombattype} className="task-btn fl">取消</a>*/}
                <a className="task-btn task-btn-orange fr mr51" onClick={this.hidestartshixunCombattype}>知道了啦</a>
              </div>
              {/*<p className="inviteTipbtn with100 fl">*/}
              {/*<a onClick={this.hidestartshixunCombattype}>知道了</a>*/}
              {/*</p>*/}
            </Modal>

            <Modal
              keyboard={false}
              title="提示"
              visible={shixunsreplace}
              closable={false}
              footer={null}
            >
							<Spin indicator={antIcon} spinning={this.state.isSpin}>
								<div className="task-popup-content">
									<p className="task-popup-text-center font-16 pb20">实训已经更新了，正在为您重置!</p>
								</div>
								<div className="task-popup-submit clearfix">
									<a className="task-btn task-btn-orange fr mr51"
										 onClick={() => this.hidestartshixunsreplace(hidestartshixunsreplacevalue)}>知道了</a>
								</div>
							</Spin>
            </Modal>
          </div>
        }
      </React.Fragment>

    )
  }
}

export default Challenges;
    // {
		// 				ChallengesDataList.allow_skip === false ? item.status === 1 && newstatus === 2 ?
		// 					<Tooltip placement="bottom" title={"直接挑战"}>
		// 						<a className={"edu-default-btn edu-blueback-btn fr Finish_button"}
		// 							 onClick={()=>this.startshixunCombat(false,undefined, item.challenge_id)}
		// 						style={{marginTop: '-2px'}}>直接挑战</a>
		// 					</Tooltip>
		//
		// 					: item.status === 1 && newstatus === 1 ?
		// 						<Tooltip placement="bottom" title={"直接挑战"}>
		// 							<a className={"edu-default-btn edu-blueback-btn fr Finish_button"}
		// 								 onClick={()=>this.startshixunCombat(false,undefined, item.challenge_id)}
		// 								 style={{marginTop: '-2px'}}>直接挑战</a>
		// 						</Tooltip> : "" : ""
		//
		// 			}