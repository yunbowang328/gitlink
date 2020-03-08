import React, { Component } from 'react';

import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames';

import { getImageUrl, toPath } from 'educoder'

import axios from 'axios';

const $ = window.$;

class ShixunDiscuss extends Component {
  constructor(props) {
    super(props)
    this.state = {
      TPMRightSectionData: undefined
    }
  }
  getshixunsDetailsList = (id) => {
    let shixunsDetailsURL = `/shixuns/` + id + `/discusses.json`;
    axios.get(shixunsDetailsURL).then((response) => {
      if (response.status === 200) {
        this.setState({
          TPMRightSectionData: response.data
        });
      }
    }).catch((error) => {
      console.log(error)
    });
  }

  componentDidMount() {
    let id = this.props.match.params.shixunId;
    setTimeout(this.getshixunsDetailsList(id), 1000);
  }
  render() {
    let { TPMRightSectionData } = this.state;

    return (
      <div className="mt30">
        <div id="no_data">
          <div className="justify markdown-body editormd-html-preview" id="challenge_editorMd_propaedeutics">


            {
              TPMRightSectionData===undefined?"":TPMRightSectionData.map((item,key)=>{
                return(
                  <div className="comment_item_cont df clearfix" key={key}>
                  <div className="J_Comment_Face fl">
                      <a href={item.user.user_url} target="_blank">
                          <img alt="用户头像" height="50" src={getImageUrl("images/"+item.user.image_url)} width="50" />
                      </a>
                  </div>

                  <div className="t_content fl" style={{width:'100%'}}>
                        <div className="J_Comment_Reply">
                            <div className="comment_orig_content" style={{margin: '0px'}}>

                                    <div className="J_Comment_Info clearfix mt3">
                                        <div className="t_info fl">
                                        <a href={item.user.user_url} className="content-username hide fl">{item.user.name}</a>
                                        <span className="t_area fl">{item.time}</span>
                                        <span className="fl color-light-green font-14 ml15">[第{item.round}关]</span>
                                        </div>
                                    </div>

                                      <div className="comment_content  clearfix" id="reply_content_3783">
                                              <div className="color-grey-3" id="reply_content_3783"><div>
                                                <p>{item.content}</p>
                                              </div>
                                              <div className="cl"></div>
                                              </div>
                                      </div>

                                  {
                                    item.replies.map((i,k)=>{
                                      return(
                                        <div className="childrenCommentsView" key={k} style={{width:'100%'}}>
                                                  <div className="trangle"></div>
                                                      <div className="childComment">
                                                          <div className="J_Comment_Info clearfix mt3">
                                                              <div className="t_info fl">
                                                                  <a href={i.user.user_url} className="content-username hide fl">{i.user.name}</a>
                                                                  <span className="t_area fl">{i.time}</span>
                                                              </div>
                                                              <p className="fr  orig_reply lineh-20">
                                                                  <span id="hidden_discuss_btn_952"></span>
                                                                  <a className="color-grey-8">
                                                                      <i className="iconfont icon-jiangli fl mt2"></i>
                                                                  </a>
                                                                  <a className="color-grey-8" id="delete_reply_118_952">
                                                                      <i className="iconfont icon-shanchu mr5"></i>
                                                                  </a>
                                                              </p>
                                                          </div>
                                                              <div className="comment_content  clearfix" id="reply_content_3800">
                                                              <div className="color-grey-3" id="reply_content_3800">
                                                              <div>
                                                                <p>{i.content}</p>
                                                              </div>
                                                              <div className="cl"></div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>

                                                )
                                              })
                                            }


                                        <p className="fr orig_reply">
                                            <span id="hidden_discuss_btn_952"></span>
                                            <a  className="color-grey-8">
                                                <i className="iconfont icon-jiangli mr5 fl"></i>
                                            </a>
                                            <a  className="color-grey-8 fl mt2">
                                                <i className=" fa fa-eye mr5"></i>
                                            </a>
                                            <a  className="color-grey-8">
                                                <i className="iconfont icon-shanchu mr5"></i>
                                            </a>
                                            <a  className="color-grey-8">
                                                <i className="iconfont icon-huifu1 mr5"></i>
                                            </a>
                                            <span className="reply_praise_count_952">
                                                <a   className="fr mr5  color-grey-8">
                                                    <i className="iconfont icon-dianzan-xian mr5"></i>
                                                  <span className="fr font-14">3</span>
                                                </a>
                                            </span>
                                        </p>


                                      <div className="commentItemMDEditorView commentItemMDEditorView_4220" style={{display:'none'}}>
                                          <div className="homepagePostReplyPortrait mr15 fl imageFuzzy" id="reply_image_3097" style={{marginTop: '28px', marginRight: '0px'}}>
                                              <a href="/users/innov" target="_blank" alt="用户头像">
                                                  <img alt="0?1442652658" height="33" src="/images/avatars/User/1" width="33"/>
                                              </a>
                                          </div>

                                          <div id="reply_message_4220" className="reply_to_message commentItemMDEditor" style={{paddingTop: '0px', paddingBottom: '20px'}}>
                                              <div id="reply_message_editorMd_4220" className="editorMD" style={{marginBottom: '0px'}}>
                                                  <textarea></textarea>
                                              </div>
                                              <div className="editor__resize" >调整高度</div>
                                              <a id="commitBtn_4220"   className="commentsbtn task-btn task-btn-blue  fr ">发送</a>
                                          </div>
                                      </div>
                            </div>
                        </div>
                  </div>
              </div>
                )
              })
            }

          </div>
        </div>
      </div>
          )
        }
    }

    export default ShixunDiscuss;
