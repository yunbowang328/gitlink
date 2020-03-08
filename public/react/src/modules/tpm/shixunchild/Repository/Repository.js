import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import axios from 'axios';

import { trace, trace_collapse ,getImageUrl, toPath} from "educoder";

import RepositoryDirectories from './RepositoryDirectories'

import { ActionBtn , NoneData } from 'educoder'
import RepositoryCombinePath from './RepositoryCombinePath'
const $ = window.$;

// 点击按钮复制功能
function jsCopy(){
  var e = document.getElementById("copy_rep_content");
  e.select();
  document.execCommand("Copy");
}
/**
 提交记录
 使用指南
 */
class Repository extends Component {
  constructor(props) {
    super(props);
    this.state={

		}
  }
  componentDidMount() {
  }
  onRepoFileClick = (item) => {

    this.props.fetchRepo(item)

  }
  render() {
    let { match, author, git_url, lastest_commit,repositoryLoading, commits,trees,pathArray , TPMRightSectionData } = this.props;

    if (!author) {
      author = {}
    }
    let userauthority=false;
    if(this.props.author!=undefined){
      userauthority=this.props.author.login===""||this.props.author.user_id===""||this.props.author.login===null||this.props.author.user_id===null;
    }
    return (
      <React.Fragment>
        {/* jfinalshop/WebRoot */}
        {/* <div className="pt30 pl20 pr20 pb30 mb10 clearfix" style={{background: '#fff'}}>
          <span className="fl color-grey-6 font-16 cdefault mt1">
            <i className="iconfont icon-fenzhi fl mr5"></i>
            <span className="fl mt2">分支&nbsp;1</span>
          </span>
          <a href="https://www.educoder.net/forums/2784" target="_blank" 
            className="fr edu-default-btn edu-greenback-btn">Git使用指南</a>
        </div> */}

        { repositoryLoading ? <div style={{ minHeight: '500px'}}></div> :

          <div  className="" id="collaborators_list_info">
            <div className="clearfix edu-back-white">
              <div className="padding30-20 clearfix">
                <div className="fl1 clearfix1 mr201">
                  <div className="repositorytitle">
                    {/* <form acceptCharset="UTF-8" action="/shixuns/uznmbg54/repository/uznmbg54"
                    id="revision_selector" method="get">

                    <div style={{margin:0, padding:0, display:'inline'}}>
                      <input name="utf8" type="hidden" value="✓"></input>
                    </div>
                    <label className="font-16 fl mr5">分支:</label>
                    <select className="winput-120-35 fl" id="branch" name="branch" defaultValue="master">
                      <option value="master">master</option>
                    </select> 
                    <input id="rev" name="rev" size="8" type="hidden" value=""></input>
                  </form> */}

                    <a href="/forums/2784" target="_blank"
                       className=" guideBtn" >Git使用指南</a>
                    {
                      this.props.current_user && (this.props.current_user.admin ==true || (TPMRightSectionData && TPMRightSectionData.creator && TPMRightSectionData.creator.login == this.props.current_user.login)) ?
                      !this.props.secret_repository_tab && 
                        <ActionBtn style="orangeLine" className="ml20" to={`/shixuns/${match.params.shixunId}/repository/add_file`}>+添加文件</ActionBtn>
                      :""
                    }
                    
                    
                    
                    <div className="fr font-12 color-grey-9 pr">
                      <label className="fl mt2">网址克隆：</label>
                      <input type="text" id="copy_rep_content" className="fl url-input mt2"
                             defaultValue={ git_url } style={{width: 313}}/>
                      <a onClick={() => {
                        jsCopy()
                      }} data-tip-down="点击复制版本库地址"
                         className="fl ml5">
                        <i className="iconfont icon-wangzhikelong color-orange-tip" style={{lineHeight: '18px'}}></i>
                      </a>

                      <style>
                        {`
                      .top-black-trangle {
                        right: 68px;

                      }
                      a.guideBtn {
                        color: #4CACFF !important;
                        margin-left: 4px;
                      }
                      a.guideBtn:hover {
                        text-decoration: underline;
                      }

                      #repository_url_tip {
											top: 30px !important;
										  left:132px !important;
											width: 292px !important;
                      }
                      `}
                      </style>
                      {/* <a href="https://www.educoder.net/forums/2784" target="_blank"
                      className="fr edu-default-btn edu-greenback-btn">Git使用指南</a> */}


                      <a
                        onClick={() => { $('#repository_url_tip').css('display') === 'none'
                          ? $('#repository_url_tip').show()
                          : $('#repository_url_tip').hide() }}
                        className="fl ml6 mt1">
                        <img src={getImageUrl("images/educoder/problem.png")}/>
												<div className="invite-tip clearfix none" id="repository_url_tip"
														 style={{top: '33px', right: '-10px', width: '300px', display: 'none'}}>
													<span className="top-black-trangle" style={{"right":"9px"}}></span>
													<div className="padding20 invitecontent clearfix">
														<p className="font-12 edu-txt-left">请上传当前实训中各个关卡涉及的所有文件<br/>
															包括任务文件、执行文件，以及其他的必须文件<br/><br/>
															提交代码的方法：<br/>
															1、在电脑上安装Git tortoise客户端，<br/>
															&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;或者其它熟悉的Git客户端<br/>
															2、在Git客户端上向左侧的地址提交代码<br/><br/>
															注意：<br/>
															请在Git客户端要求填写时，按照如下说明填写：<br/>
															* 用户名：使用您在本平台绑定的邮箱<br/>
															* 口令：使用您在本平台的登录口令
														</p>
													</div>
													<p className="inviteTipbtn with100"><a
														onClick={() => { $('#repository_url_tip').css('display') === 'none'}}>知道了</a></p>
												</div>
                      </a>

                    </div>
                  </div>

                  {this.props.secret_repository_tab && <RepositoryCombinePath {...this.props}>

                  </RepositoryCombinePath>}

                </div>
              </div>

              <style>
                {`
              .va_sub {
                vertical-align: sub;
              }
            `}
              </style>
              {/* 用户、最近提交时间 */}
              {
                trees === undefined || trees === null ||trees.length===0? <NoneData></NoneData>:
                  <div>
										{commits===undefined?"":commits===null||commits.length===0?"":<div className="edu-back-skyblue padding10-20 clearfix">
                      <img alt={author.name} className="radius fl mr10"
                           height="30"
                           src={getImageUrl(`images/`+commits[0].author.image_url)}
                           style={{display:userauthority===true?"none":"block"}}
                           width="30"/>
                      <a href={author.user_url} className="mr5 va_sub" target="_blank">{commits[0].author.name}</a>
                      <span className="color-grey-6 va_sub">提交于
                                <acronym title={commits[0].time}>
                                  {commits===undefined?"":commits[0].time}
                                </acronym> ：{commits===undefined?"":commits[0].title}
                              </span>
                      <a href={`/shixuns/${match.params.shixunId}/${this.props.secret_repository_tab ? 'secret_repository' : 'repository'}/${match.params.shixunId}/commits`}
                         className="color-grey-6 fr font-16 ">
                        <i className="iconfont icon-tijiaojilu font-18 fl mr5"></i>
                        <span className="fl mt2">提交记录</span>
                      </a>
                    </div>}

                    <div className="padding20" style={{minHeight: '372px'}}>
                      <div className="bor-grey-e">
                        {/* 当前目录位置 */}
                        <RepositoryDirectories {...this.props}></RepositoryDirectories>

                        <div className="versionFileList">
                          { trees === undefined ?"": trees === null || trees.length===0?"":trees.map((item, index) => {
                            return (
                              <li id={`file${index}`} key={index} className=" file padding5-10">
                                                <span style={{marginLeft: '0px'}} className="task-hide">
                                                  <i className={`${item.type === 'tree' ? 'icon-wenjianjia' : 'icon-zuoye'}
                                                    iconfont color-blue`}></i>
                                                  <a
                                                    onClick={() => this.onRepoFileClick(item)}>
                                                    &nbsp;{item.name}
                                                  </a>
                                                </span>
                              </li>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
              }

              {/* 当前分支的文件 */}

            </div>
          </div>
        }
      </React.Fragment>

    );
  }
}
/*
 提交记录
 <div  className="pl20" id="collaborators_list_info">
    { RepositoryList===undefined?"":RepositoryList.commits.map((item,key)=>{
      // {"email":"李暾","title":"2\n","id":"80cb6fc55a14bdd64a9c99913f416966238ed3de","time":"49年前"}
      return(
        <div>
            <div>{item.email}</div>
            <div>{item.title}</div>
            <div>{item.id}</div>
            <div>{item.time}</div>
        </div>
      )
    }) }
  </div>



                  <li id="dd422c22b14b69b3452f4953ff33bb67" className=" file padding5-10">
                    <span style={{marginLeft: '0px'}} className="task-hide">
                    <i className="iconfont icon-zuoye color-blue"></i>
                    <a href="/shixuns/uznmbg54/repository/uznmbg54/master/shixun_entry/1-1.py">1-1.py</a>
                    </span>
                  </li>



*/

export default Repository;
