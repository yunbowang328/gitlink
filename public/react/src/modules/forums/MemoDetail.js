import React, { Component } from 'react';
import { Redirect } from 'react-router';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import axios from 'axios'

import moment from 'moment'

import Comments from '../comment/Comments'

import update from 'immutability-helper'
// import Tooltip from 'material-ui/Tooltip';
import RewardDialog from '../common/RewardDialog';

import {ImageLayerOfCommentHOC} from '../page/layers/ImageLayerOfCommentHOC'

import MemoDetailKEEditor from './MemoDetailKEEditor'
import MemoDetailMDEditor from './MemoDetailMDEditor'

import { bytesToSize, CBreadcrumb ,htmlEncode} from 'educoder'
import { Tooltip } from 'antd'

// import CBreadcrumb from '../courses/common/CBreadcrumb'
import { typeNameMap2 } from './MemoNew'
import CaseDetail from "../moop_cases/CaseDetail";
const $ = window.$
function urlStringify(params) {
  let noParams = true;
  let paramsUrl = '';
    for (let key in params) {
      noParams = false;
      paramsUrl += `${key}=${params[key]}&`
    }
    if (noParams) {
      return '';
    }
    paramsUrl = paramsUrl.substring(0, paramsUrl.length - 1);
    return paramsUrl;
}
class MemoDetail extends Component {
    constructor(props) {
      super(props)

      this.state = {
        memoLoading: true,
        hasMoreComments: false,
        pageCount: 2,

        goldRewardDialogOpen: false
      }
    }
    componentDidMount() {
      // window.$("html,body").animate({"scrollTop":0})

      const { match } = this.props

      const memoUrl = `/memos/${match.params.memoId}.json`;
      this.setState({
        memoLoading: true
      })
      axios.get(memoUrl,{
              // withCredentials: true,
          })
          .then((response) => {
            const memo = response.data.memo
            if (response.data.status === -1) {
              setTimeout(() => {
                this.props.showNotification('帖子不存在！')
              }, 300)
              this.props.history.push(`/forums`)
              return;
            } else if (memo) {
              // this.setState({...response.data})

              const { memo_replies, memo } = response.data;
              let hasMoreComments = false;
              if (memo_replies && memo_replies.length === 10 && memo.replies_count > 10) {
                // 遍历一遍，计算下是否还有评论未加载
                let totalCount = 10;
                memo_replies.forEach(item=>{
                  totalCount += item.children.length
                })
                if (totalCount < memo.replies_count) {
                  hasMoreComments = true;
                }
              }
              this.setState({
                hasMoreComments,
                pageCount: 2,
                comments: memo_replies
              })
              delete response.data.memo_replies;
              // reset
              response.data.memo.praise_count = response.data.memo.memo_praise_count
              this.props.initForumState(response.data)
              // const user = response.data.current_user;
              // user.tidding_count = response.data.tidding_count;
              // this.props.initCommonState(user)
            }
            this.setState({
              memoLoading: false
            })

          }).catch((error) => {
            console.log(error)
          })

      $('body>#root').on('onMemoDelete', (event) => {
        // const val = $('body>#root').data('onMemoDelete')
        const val = window.onMemoDelete ;
        this.onMemoDelete( JSON.parse(decodeURIComponent(val)) )
      })



    }
    componentWillUnmount() {
      $('body>#root').off('onMemoDelete')
    }
    onMemoDelete(memo) {
      const deleteUrl = `/memos/${memo.id}.json`;
      // 获取memo list
        axios.delete(deleteUrl, {
            // withCredentials: true,
        })
        .then((response) => {
          const status = response.data.status
          if (status === 0) {

            this.props.showNotification('删除成功');
            this.props.history.push(`/forums`)

          } else if (status === -1) {
            this.props.showNotification('帖子已被删除');
            this.props.history.push(`/forums`)
          }
        }).catch((error) => {
          console.log(error)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      // if (this.props.memo && this.props.memo.content
      //     && (!prevProps.memo || prevProps.memo.content != this.props.memo.content) ) {
      if (this.props.memo && this.props.memo.content && prevState.memoLoading === true && this.state.memoLoading === false) {
        // md渲染content，等xhr执行完（即memoLoading变化），memo.content更新后初始化md
        if (this.props.memo.is_md) {
          setTimeout(()=>{
          var shixunDescr = window.editormd.markdownToHTML("memo_content_editorMd", {
              htmlDecode: "style,script,iframe",  // you can filter tags decode
              taskList: true,
              tex: true,  // 默认不解析
              flowChart: true,  // 默认不解析
              sequenceDiagram: true // 默认不解析
          });
          }, 200)
        }
      }
    }

    clickPraise(){
        const { memo } = this.props;
        const url = `/discusses/${memo.id}/plus.json`;
        console.log(url)
        axios.post(url, {
                container_type: 'Memo',
                type: 1   //  "踩0；赞1"
            },
            {
                // withCredentials: true
            }
        ).then((response) => {

            const newMemo = Object.assign({}, this.props.memo)
            newMemo.praise_count = response.data.praise_count
            newMemo.user_praise = !newMemo.user_praise
            this.props.initForumState({memo : newMemo })
        }).catch((error) => {
                console.log(error)
        })
    }
    renderAttachment() {
      const { memo, attachments_list } = this.props;
      const attachments = []
      attachments_list.forEach((item, index) => {
        const ar = item.url.split('/')
        const fileName = item.title
        let filesize = item.filesize

        attachments.push(
          <div className="color-grey df" key={index} style={{ lineHeight: '17px'}}>
            <a className="color-grey ">
              <i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
            </a>
              <a href={item.url} title={fileName.length > 30 ? fileName : ''}
                  className="mr12 color9B9B overflowHidden1" length="58" style={{maxWidth: '480px'}}>
                {fileName}
              </a>
            <span className="color656565 mt2 color-grey-6 font-12 mr8">{filesize}</span>

          </div>
          )
      })
      return attachments;
    }
    // ------------------------------------------------------------------------------------------- comments  START
    // ------------------------------------------------------------------------------------------- comments  START
    _getUser() {
      const { current_user } = this.props;
      current_user.user_url = `/users/${current_user.login}`;
      return current_user;
    }
    _findById(id, arg_comments) {
      const comments = arg_comments;
      for(let i = 0; i < comments.length; i++) {
        if (id === comments[i].id) {
          return i;
        }
      }
    }
    replyComment = (commentContent, id, editor) => {
      const { showNotification } = this.props;
      if (!commentContent || commentContent.length === 0) {
        showNotification('必须填写内容！')
        return;
      }

      if (this.props.memo.id === id ) { // 回复帖子
        this.createNewComment(commentContent, id, editor);
        return;
      }
      // /${id}
      const url = `/memos/reply.json`;
      const { comments } = this.state;
      const user = this._getUser();
      /*
      移除末尾的空行
      .replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'');

      */
      if (commentContent) {
        commentContent = commentContent.replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'');
      }

			commentContent=htmlEncode(commentContent)
      axios.post(url, {
            parent_id: id,
            content: commentContent
          },
          {
            // withCredentials: true
          }
        ).then((response) => {
          response.data.memo = response.data
          if (response.data.memo) {
            let newDiscuss = response.data.memo;

            var commentIndex = this._findById(id, comments);
            let comment = comments[commentIndex];
            if (!comment.children ) {
              comment.children = []
            }
            // TODO userName iamge_url
            comment.children.push( {
              "can_delete": true,
              "content": commentContent,

              "image_url": user.image_url,
              "username": user.username,
              "user_login": user.login,

              "id": newDiscuss.id,
              // "position": newDiscuss.position,
              "time": "1分钟前",
              "praise_count": 0,

              "user_id": newDiscuss.author_id,
            })


            comments[commentIndex] = comment
            // ke
            editor.html && editor.html('')
            // md
            if (editor.setValue) {
              editor.setValue('')
              const $ = window.$
              var view_selector = `.commentItemMDEditorView_${id}`
              $(view_selector).hide();
            }


            this.setState({
              // runTesting: false,
              comments: comments
            }, ()=>{
              // keditor代码美化
              editor.html && window.prettyPrint()
            })

            const newMemo2 = Object.assign({}, this.props.memo);
            newMemo2.replies_count = newMemo2.replies_count + 1;
            this.props.initForumState({
              memo: newMemo2
            })
          }

        }).catch((error) => {
          console.log(error)
        })
    }
    deleteComment = (parrentComment, childCommentId) => {
      let deleteCommentId = parrentComment.id
      if (childCommentId) {
        deleteCommentId = childCommentId;
      }
      const url = `/memos/${deleteCommentId}.json`
      let comments = this.state.comments;

      axios.delete(url,
            {
              // withCredentials: true
            }
          ).then((response) => {
            // TODO 删除成功或失败
            if (response.data && response.data.status === 0) {
              const commentIndex = this._findById(parrentComment.id, comments);

              // https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state
              if (!childCommentId) {
                this.setState((prevState) => ({
                  comments: update(prevState.comments, {$splice: [[commentIndex, 1]]})
                }))

                // if (this.state.comments.length <= 5) {
                //   this.fetchComment()
                // }
              } else {
                let childCommentIndex = this._findById(childCommentId, comments[commentIndex].children);
                comments[commentIndex].children = update(comments[commentIndex].children, {$splice: [[childCommentIndex, 1]]})
                this.setState({ comments })
              }

              const newMemo = Object.assign({}, this.props.memo);
              newMemo.replies_count = newMemo.replies_count - 1;
              this.props.initForumState({
                memo: newMemo
              })
            }

          }).catch((error) => {
            console.log(error)
          })
    }
    // 评论点赞
    commentPraise = (discussId) => {
      const { comments } = this.state;
      const commentIndex = this._findById(discussId, comments);

      const url = `/discusses/${discussId}/plus.json`
      axios.post(url, {
              // id: discussId,
              // container_id: challenge.id,
              container_type: 'Memo',  //Discuss
              type: comments[commentIndex].user_praise === true ? 0 : 1,   //  "踩0；赞1"
            },
            {
              // withCredentials: true
            }
          ).then((response) => {
            if (response.data.praise_count === 0 || response.data.praise_count) {

              comments[commentIndex].user_praise = !comments[commentIndex].user_praise;
              comments[commentIndex].praise_count = response.data.praise_count;

              this.setState({
                comments
              })
            }

          }).catch((error) => {
            console.log(error)
          })
    }
    rewardCode = (parrentComment, childComment, amount) => {
      const { showNotification } = this.props;
      const { comments } = this.state;
      let handleComment = parrentComment
      if (childComment) {
        handleComment = childComment;
      }
      let handleCommentId = handleComment.id;
      const url = `/discusses/${handleCommentId}/reward_code.json`

      axios.post(url, {
            id: handleCommentId,

            container_type: 'Memo',
            score: amount,
            user_id: handleComment.user_id
          },
            {
              // withCredentials: true
            }
          ).then((response) => {
            if (response.data && response.data.code) {
              const commentIndex = this._findById(parrentComment.id, comments);

              if (childComment) {
                const childCommentIndex = this._findById(handleComment.id, parrentComment.children);
                const newChildComment = Object.assign({}, childComment);
                newChildComment.reward = response.data.code
                parrentComment.children[childCommentIndex] = newChildComment

                comments[commentIndex] = parrentComment;

                  this.setState({
                  comments
                })
              } else {
                comments[commentIndex].reward = response.data.code;

                  this.setState({
                  comments
                })
              }
            }
          }).catch((error) => {
            console.log(error)
            showNotification('奖励失败，请联系系统管理员！')
          })
    }
    hiddenComment = (item, childCommentId) => {
      const id = item.id
      const { showNotification } = this.props;
      const user = this._getUser();
      const url = `/memos/${id}/hidden.json`
      const { comments } = this.state;

      const commentIndex = this._findById(id, comments);
      const comment = comments[commentIndex];
      axios.post(url, {
              hidden: !comment.hidden ? "1" : "0"
            },
            {
              // withCredentials: true
            }
          ).then((response) => {
            if (response.data.status === -1) {
              showNotification(response.data.message)
              return;
            }
            if (response.data.status === 0) {

              if (!childCommentId) {
                comment.hidden = !comment.hidden;
                this.setState({
                  comments: comments
                })
              } else {  // TODO 目前子回复没hidden字段
                let childCommentIndex = this._findById(childCommentId, comments[commentIndex].children);
                const childComment = comments[commentIndex].children[childCommentIndex]
                childComment.hidden = !childComment.hidden;
                this.setState({ comments })
              }

            }
            // {"message":"Couldn't find Discuss with id=911","status":-1}

          }).catch((error) => {
            console.log(error)
          })
    }
    createNewComment = (commentContent, id, editor) => {
      let content = commentContent;
      const { memo } = this.props;
      if(content != undefined){
        content = content.replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'');

        var beforeImage = content.split("<img");
        var afterImage = content.split("/>");
        if(beforeImage[0] == "" && afterImage[1] == ""){
            window.notice_box('不支持纯图片评论<br/>请在评论中增加文字信息');
            return;
        }
      }
      // /${memo.id}
      const url = `/memos/reply.json`;
      let { comments } = this.state;
      const user = this._getUser();
			content=htmlEncode(content)
      axios.post(url, {
          parent_id: memo.id,
          content: content
        },
        {
          // withCredentials: true
        }
      ).then((response) => {
        if (response.data.status === -1) {
          console.error('服务端异常')
          return;
        }
        if (response.data) {
          response.data.memo = response.data
          const newMemo = response.data.memo;
          // ke
          editor.html && editor.html('');
          editor.afterBlur && editor.afterBlur()
          // md
          editor.setValue && editor.setValue('')
          if (!comments) {
            comments = [];
          }
          comments.unshift( {
            "can_delete": true,
            "admin": user.admin,
            "content": content,

            "image_url": user.image_url,
            "username": user.username,
            "user_login": user.login,

            "id": newMemo.id,
            "reward": null,
            "hidden": newMemo.hidden,

            "user_praise": false,
            "time": "1分钟前",
            "praise_count": 0,

            "user_id": user.user_id,
          })


          this.setState({
            comments
          })
          const newMemo2 = Object.assign({}, this.props.memo);
          newMemo2.replies_count = newMemo2.replies_count + 1;
          this.props.initForumState({
            memo: newMemo2
          })

        }
      }).catch((error) => {
        console.log(error)
      })
    }
    moreMemos = () => {
      let { comments, pageCount } = this.state;
      let { memo } = this.props;
      const user = this._getUser();
      const url = `/memos/${memo.id}/more_reply.json?page=${pageCount}`;
      axios.get(url, {

        },
        {
          // withCredentials: true
        }
      ).then((response) => {
        if (response.data.status === -1) {
          console.error('服务端异常')
          return;
        }
        let { memo_replies } = response.data;
        if (!memo_replies || memo_replies.length === 0) {
           this.setState({
              hasMoreComments: false
           })
          return;
        }
        if (response.data.memos_count) {
          const newComments = comments.concat(memo_replies);
          const hasMoreComments = memo_replies.length === 10
          this.setState({
            comments: newComments,
            hasMoreComments,
            pageCount: pageCount+1
          })
        }
      }).catch((error) => {
        console.log(error)
      })
    }


    // ------------------------------------------------------------------------------------------- comments  END
    // ------------------------------------------------------------------------------------------- comments  END
    // 置顶
    setTop(memo) {
      const params = {
        sticky: memo.sticky ? 0 : 1,
      }
      if (this.state.p_s_order) {
        params.order = this.state.p_s_order;
      }
      if (this.state.p_forum_id) {
        params.forum_id = this.state.p_forum_id;
      }
        let paramsUrl = urlStringify(params)
      const set_top_or_down_Url = `/memos/${memo.id}/sticky_or_cancel.json?${paramsUrl}`;
      // 获取memo list
        axios.post(set_top_or_down_Url, {
            // withCredentials: true,
        })
        .then((response) => {
          const status = response.data.status
          if (status === 0) {
            this.props.showNotification( memo.sticky ? '取消置顶成功' : '置顶成功');
            memo.sticky = memo.sticky ? false : true
            this.setState({
              memo: Object.assign({}, memo)
            })
          }
        }).catch((error) => {
          console.log(error)
        })
    }
    // --------------------------------------------------------------------------------------------帖子獎勵
    rewardCodeMemo = (inputVal) => {
      console.log(inputVal)
      const { memo, author_info } = this.props;
      const newMemo = Object.assign({}, memo);
      const _reward = parseInt(inputVal)

      const url = `/discusses/${memo.id}/reward_code.json`

      axios.post(url, {
            id: memo.id,

            container_type: 'Memo',
            score: _reward,
            user_id: author_info.user_id
          }, {
        // withCredentials: true,
      })
      .then((response) => {
        const { code } = response.data;
        if (code > 0) {
          newMemo.reward = code
          this.props.initForumState({
            memo: newMemo
          })
          this.props.showNotification( '奖励成功' );
        } else {
          this.props.showNotification( '奖励失败，请联系系统管理员！' );
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    setRewardDialogVisible = (visible) => {
      this.setState({
        goldRewardDialogOpen: visible
      })
    }
    showRewardDialog = () => {
      this.setState({
        goldRewardDialogOpen: true
      })
    }
    // --------------------------------------------------------------------------------------------帖子獎勵 END
    showCommentInput = () => {

      debugger
      if (window.__useKindEditor === true) {
        this.refs.editor.showEditor();
      } else {
        this.refs.editor.showEditor();
      }
    }
  	render() {
  		const { match, history } = this.props
      const { memo, recommend_shixun, current_user,author_info } = this.props;
      const { comments, hasMoreComments, goldRewardDialogOpen } = this.state;
			document.title = memo&&memo.subject!=undefined?memo&&memo.subject:"交流问答";
      if (!memo || this.state.memoLoading) {
        return <div className="edu-back-white" id="forum_index_list"></div>
      }
      let _current_user = {}
      if (current_user) {
        _current_user = current_user
      }
      (_current_user.user_url = `/users/${_current_user.login}`);
      memo.isDetailPage = true;
      // TODO 图片上传地址
	    return (
        <React.Fragment>
          <CBreadcrumb items={[
            { to: `/forums/categories/${memo.forum_id}`, name: typeNameMap2[memo.forum_id]},
            { name: '详情' },
          ]}
            separator={' / '}
          ></CBreadcrumb>
        <div className="edu-back-white memoDetail" id="forum_index_list"> {/* fl with100 */}
          <style>{`
            .memoDetail .commentsbtn {
              margin-top: 6px;
            }
          `}</style>

          <RewardDialog goldRewardDialogOpen={goldRewardDialogOpen}
            setRewardDialogVisible={this.setRewardDialogVisible}
            rewardCode={this.rewardCodeMemo}
            {...this.props}
          ></RewardDialog>
          <div className="clearfix">
        		<div id="forum_list" className="forum_table mh650">
    	        	<div className="padding40-30 bor-bottom-greyE">
                        <div className="font-16 mb5 cdefault clearfix pr pr35" style={{display: 'flex', alignItems: 'center'}}>
                            {/* overflowHidden1   */}
                            <span className="noteDetailTitle " style={{maxWidth: '634px'}}>{memo.subject}</span>
                            { memo.sticky && <span className="btn-cir btn-cir-red ml10 "
                                style={{ height: '20px', alignSelf: 'flex-start', marginTop: '10px' }}
                            >置顶</span>}
                            { !!memo.reward &&
                            <Tooltip title={`获得平台奖励金币：${memo.reward}`}>
                              <span className="color-orange font-14 ml15"
                                  style={{ height: '20px', alignSelf: 'flex-start', marginTop: '1px' }}
                              >
                                <i className="iconfont icon-gift mr5"></i>
                                <span style={{ 'vertical-align': 'sub' }}>{memo.reward}</span>
                              </span>
                            </Tooltip>
                             }

                            <div style={{ flex: 1, alignSelf: 'flex-start' }}>
                              { _current_user && (_current_user.admin === true || _current_user.user_id === author_info.user_id) &&
                                  <div className="edu-position-hidebox" style={{position: 'absolute', right: '12px',top:'4px'}}>
                                      <a href="javascript:void(0);"><i className="fa fa-bars font-16"></i></a>
                                      <ul className="edu-position-hide undis">
                                    { _current_user.admin === true &&
                                        ( memo.sticky === true ?
                                            <li><a href="javascript:void(0);" onClick={() => this.setTop(memo)}>取消置顶</a></li>
                                            :
                                            <li><a href="javascript:void(0);" onClick={() => this.setTop(memo)}>置&nbsp;&nbsp;顶</a></li> )
                                        }
                                          <li><Link to={`/forums/${memo.id}/edit`}>编&nbsp;&nbsp;辑</Link></li>
                                          <li>
                                              <a href="javascript:void(0)" onClick={() =>
                                                  window.delete_confirm_box_2_react(`onMemoDelete`, '您确定要删除吗？' , memo)}>

                                              删&nbsp;&nbsp;除</a>
                                          </li>
                                      </ul>
                                  </div>
                              }
                              {/* <Link className={`task-hide fr return_btn color-grey-6 mt2 ${ _current_user && (_current_user.admin === true
                                  || _current_user.user_id === author_info.user_id) ? '': 'no_mr'} `} to="/forums"
                                  style={{ marginRight: '10px'}}
                              >
                                返回
                              </Link> */}
                            </div>
                        </div>
                        <div className="color-grey-9 clearfix">
                            <span className="fl">{moment(memo.time).fromNow()} 发布</span>
                            <div className="fr detailIcons">
                                <style>{`
                                  .detailIcons i{
                                    vertical-align: sub;
                                  }
                                `}</style>
                                { _current_user.admin && <Tooltip title={ "帖子奖励" }>
                                <span className="noteDetailNum rightline cdefault" style={{padding: '0 4px', cursor: 'pointer'}}>
                                  <i className="iconfont icon-jiangli mr5" onClick={this.showRewardDialog}></i>
                                </span>
                                </Tooltip> }
                                <span className={`noteDetailNum ${!!memo.replies_count ? 'rightline' : ''} cdefault`}>
                                  <i className="iconfont icon-liulanyan mr5"></i>{memo.viewed_count}
                                </span>
                                { !!memo.replies_count &&
                                <Tooltip title={ "写评论" }>
                                <a href="javascript:void(0)" className="noteDetailNum">
                                  <i className="iconfont icon-huifu1 mr5" onClick={this.showCommentInput}></i>{memo.replies_count}
                                </a>
                                </Tooltip>
                                 }
                            </div>
                        </div>
                    </div>


                    <div className="padding40 memoContent new_li">
                      { !memo.is_md ?
                          <div dangerouslySetInnerHTML={{__html: memo.content}}></div>  :

                          <div id="memo_content_editorMd" className="new_li">
                            <textarea style={{'display': 'none'}}>
                              {memo.content}
                            </textarea>
                          </div>
                      }
                    </div>

                    <div className="padding40 bor-bottom-greyE" style={{ paddingTop: '0px'}}>


                        <div className="mt10 mb20">
                          <p className={`noteDetailPoint ${memo.user_praise ? 'Pointed' : ''} `} onClick={()=>{this.clickPraise()}} >
                            <i className="iconfont icon-dianzan"></i><br/>
                            <span>{memo.praise_count}</span>
                          </p>
                        </div>

                        { this.props.attachments_list &&
                        <div>
                            {this.renderAttachment()}
                        </div>
                        }
                    </div>
                    { window.__useKindEditor === true ?
                      <MemoDetailKEEditor ref="editor" memo={memo}  {...this.props}></MemoDetailKEEditor>
                      :
                      <MemoDetailMDEditor ref="editor" memo={memo}  {...this.props}></MemoDetailMDEditor>

                    }
                  {/*  onClick={ this.createNewComment } */}
                    <div className="padding40 bor-bottom-greyE memoReplies commentsDelegateParent"
                        style={{ display: (comments && !!comments.length) ? 'block' : 'none' }}>
                      <div className="replies_count">
                        <span className="labal">全部回复</span>
                        <span className="count">{memo.replies_count}</span>
                      </div>

                      <Comments comments={comments} user={_current_user}
                        replyComment={this.replyComment}
                        deleteComment={this.deleteComment}
                        commentPraise={this.commentPraise}
                        rewardCode={this.rewardCode}
                        hiddenComment={this.hiddenComment}


                      ></Comments>
                      { hasMoreComments ?
                        <div className="memoMore" style={{ cursor: 'default' }}>
                          <a onClick={this.moreMemos}>查看更多评论</a>
                          <div className="writeCommentBtn" onClick={this.showCommentInput}>写评论</div>
                        </div>
                        :
                        <div className="memoMore">
                          <div className="writeCommentBtn" onClick={this.showCommentInput}>写评论</div>
                        </div>}
                    </div>

    	        </div>
            </div>
          </div>

        </React.Fragment>
	    );
  	}
}

export default ImageLayerOfCommentHOC() (MemoDetail);
