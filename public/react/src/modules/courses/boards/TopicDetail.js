import React, { Component } from 'react';
import axios from 'axios'
import moment from 'moment'
import Comments from '../../comment/Comments'
import {ImageLayerOfCommentHOC} from '../../page/layers/ImageLayerOfCommentHOC'
import MemoDetailMDEditor from '../../forums/MemoDetailMDEditor'
import { RouteHOC } from './common.js'
import '../../forums/Post.css'
import '../../forums/RightSection.css'
import './TopicDetail.css'
import '../common/courseMessage.css'
import { Pagination, Tooltip,Button } from 'antd'
import { bytesToSize, ConditionToolTip, markdownToHTML, MarkdownToHtml , setImagesUrl } from 'educoder'
import SendToCourseModal from '../coursesPublic/modal/SendToCourseModal'
import CBreadcrumb from '../common/CBreadcrumb'
import { generateComments, generateChildComments, _findById, handleContentBeforeCreateNew, addNewComment
  , addSecondLevelComment, NEED_TO_WRITE_CONTENT, handleContentBeforeCreateSecondLevelComment
  , handleDeleteComment, handleCommentPraise, handleHiddenComment } from '../common/CommentsHelper'

const $ = window.$
const REPLY_PAGE_COUNT = 10;
let setTime;
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
class TopicDetail extends Component {
    constructor(props) {
      super(props)

      this.state = {
        memo: {},
        memoLoading: true,
        hasMoreComments: false,
        pageCount: 1,
        comments: [],
        goldRewardDialogOpen: false,
        author:undefined,
        commentstype:false
      }
    }
    componentDidMount() {
      window.$("html,body").animate({"scrollTop":0})

      const topicId = this.props.match.params.topicId
      const bid = this.props.match.params.boardId

      const memoUrl = `/messages/${topicId}.json`;
      this.setState({
        memoLoading: true
      })
      axios.get(memoUrl,{
          })
          .then((response) => {

            if (response.data.status === -1) {
              setTimeout(() => {
                this.props.showNotification('帖子不存在！')
              }, 300)
              // this.props.toListPage(response.data.data.course_id, bid)
              return;
            } else  {

              this.setState({
                memo: Object.assign({}, {
                  ...response.data.data,
                  replies_count: response.data.data.total_replies_count
                }, {...this.state.memo}),
                author:response.data.data.author
              }, () => {
              })

              // const { memo_replies, memo } = response.data;
              // let hasMoreComments = false;
              // if (memo_replies && memo_replies.length === 10 && memo.total_replies_count > 10) {
              //   // 遍历一遍，计算下是否还有评论未加载
              //   let totalCount = 10;
              //   memo_replies.forEach(item=>{
              //     totalCount += item.children.length
              //   })
              //   if (totalCount < memo.total_replies_count) {
              //     hasMoreComments = true;
              //   }
              // }
              // this.setState({
              //   hasMoreComments,
              //   pageCount: 1,
              //   comments: memo_replies
              // })
              // delete response.data.memo_replies;
              // this.setState(response.data)
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

      this.fetchReplies()

      $('body>#root').on('onMemoDelete', (event) => {
        // const val = $('body>#root').data('onMemoDelete')
        const val = window.onMemoDelete ;
        this.onMemoDelete( JSON.parse(decodeURIComponent(val)) )
      })


    }

    onPaginationChange = (pageCount) => {
      this.setState({ pageCount }, () => {
        this.fetchReplies()
      })
    }

    componentWillUnmount() {
      $('body>#root').off('onMemoDelete')
    }
    onMemoDelete(memo) {
      const deleteUrl = `/commons/delete.json`;
      // 获取memo list
        axios.delete(deleteUrl, { data: {
            object_id: memo.id,
            object_type: 'message'
          }
        })
        .then((response) => {
          const status = response.data.status
          if (status === 0) {

            this.props.showNotification('删除成功');
            const props = Object.assign({}, this.props, {})
            this.props.toListPage( Object.assign({}, this.props.match.params, {'coursesId': this.state.memo.course_id} ) )

          } else if (status === -1) {
            this.props.showNotification('帖子已被删除');
            this.props.history.push(`/forums`)
          }
        }).catch((error) => {
          console.log(error)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      // if (this.state.memo && this.state.memo.content
      //     && (!prevProps.memo || prevProps.memo.content != this.state.memo.content) ) {
      if (this.state.memo && this.state.memo.content && prevState.memoLoading === true && this.state.memoLoading === false) {
        // md渲染content，等xhr执行完（即memoLoading变化），memo.content更新后初始化md

          setTimeout(()=>{
            // var shixunDescr = window.editormd.markdownToHTML("memo_content_editorMd", {
            //     htmlDecode: "style,script,iframe",  // you can filter tags decode
            //     taskList: true,
            //     tex: true,  // 默认不解析
            //     flowChart: true,  // 默认不解析
            //     sequenceDiagram: true // 默认不解析
            // });
          }, 200)
      }

    }

    clickPraise(){
        const { memo } = this.state;
        // const url = `/api/v1/discusses/${memo.id}/plus`;
        const url = memo.user_praise ? '/praise_tread/unlike.json' : `/praise_tread/like.json`;
        const _method = memo.user_praise ? axios.delete : axios.post
        let _data = {
          object_id: memo.id,
          object_type: 'message',  //Discuss
        }
        if (memo.user_praise) {
          _data = {
            data: _data
          }
        }
        _method(url, {
              ..._data
            },
            {

            }
        ).then((response) => {

            const newMemo = Object.assign({}, this.state.memo)
            newMemo.praises_count = newMemo.user_praise ? newMemo.praises_count - 1 : newMemo.praises_count + 1
            newMemo.total_praises_count = newMemo.user_praise ? newMemo.total_praises_count - 1 : newMemo.total_praises_count + 1
            newMemo.user_praise = !newMemo.user_praise
            this.setState({memo : newMemo })
        }).catch((error) => {
                console.log(error)
        })
    }
    renderAttachment() {
      const { memo } = this.state;
      const attachments = []
      memo.attachments.forEach((item, index) => {
        const ar = item.url.split('/')
        const fileName = item.title || ar[ar.length - 1]
        let filesize = 0
        if (item.filesize) {
          filesize = item.filesize
          // filesize = bytesToSize(item.filesize)
        }
        attachments.push(
          // <p className="clearfix" key={index} >
          //   <a href={item.url} className="color-green clearfix notefileDownload">
          //     <i className="iconfont icon-fujian color-green ml5 fl"></i>
          //     {fileName && <ConditionToolTip title={fileName} condition={fileName.length > 30 }>
          //       <span className="fl task-hide upload_item" style={{ color: '#333'}}>{fileName}</span>
          //     </ConditionToolTip>}
          //     <span className="fl" style={{ color: '#999', marginLeft: '6px'}}>{filesize? ` ${filesize.replace(' ', '')}` : ''}</span>
          //   </a>
          // </p>

          <div className="color-grey df" key={index}>
            <a className="color-grey ">
              <i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
            </a>
            {/* {fileName && <ConditionToolTip title={fileName} condition={fileName.length > 30 }> </ConditionToolTip>} */}
              <a href={item.url} title={fileName.length > 30 ? fileName : ''}
                  className="mr12 color9B9B overflowHidden1" length="58" style={{maxWidth: '480px'}}>
                {fileName}
              </a>


            <span className="color656565 mt2 color-grey-6 font-12 mr8">{item.filesize}</span>

          </div>
          )
      })
      return attachments;
    }
    // ------------------------------------------------------------------------------------------- comments  START
    // ------------------------------------------------------------------------------------------- comments  START
    transformReply = (reply, children = []) => {
      const isAdmin = this.props.isAdmin()
      const isSuperAdmin = this.props.isSuperAdmin()
      return {
        isSuperAdmin: isSuperAdmin,
        admin: isAdmin, //
        permission: true, //
        children: children,
        child_message_count: reply.total_count,
        hidden: reply.is_hidden,
        id: reply.id,
        image_url: reply.author.image_url,
        reward: null, //
        time: moment(reply.created_on).fromNow(),
        user_id: reply.author.id,
        user_login: reply.author.login,
        user_praise: reply.liked,
        username: reply.author.name,
        content: reply.content,
        praise_count: reply.praises_count
      }
    }

    fetchReplies = () => {
      const topicId = this.props.match.params.topicId
      const url = `/messages/${topicId}/reply_list.json?page=${this.state.pageCount}&page_size=${REPLY_PAGE_COUNT}`
      axios.get(url,{
      })
      .then((response) => {
        const { replies, liked, total_replies_count, total_count } = response.data.data

        const memo = Object.assign({}, this.state.memo)
        memo.user_praise = liked
        memo.total_replies_count = total_replies_count;
        this.setState({
          memo,
          comments: generateComments(replies, this.transformReply, 'replies'),
          // : this.state.comments.concat(comments),
          total_count: total_count
        })
      }).catch((error) => {
        console.log(error)
      })
    }

    _getUser() {
      const { current_user } = this.props;
      current_user.user_url = `/users/${current_user.login}`;
      return current_user;
    }
    _findById = _findById
    replyComment = (commentContent, id, editor) => {
      const { showNotification } = this.props;
      // if (!commentContent || commentContent.length === 0) {
      //   showNotification(NEED_TO_WRITE_CONTENT)
      //   return;
      // }

      if (this.state.memo.id === id ) { // 回复帖子
        this.createNewComment(commentContent, id, editor);
        return;
      }
      const url = `/messages/${id}/reply.json`;

      const { comments } = this.state;
      const user = this._getUser();
      /*
      移除末尾的空行
      .replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'');

      */

      commentContent = handleContentBeforeCreateSecondLevelComment(commentContent)
      if (!commentContent) {
        this.props.showNotification('不能为空')
        return;
      }
      axios.post(url, {
            content: commentContent
          },
          {
          }
        ).then((response) => {
          if (response.data.data.id) {
            let newId = response.data.data.id;
            const commentIndex = this._findById(id, comments);
            const parentComment = comments[commentIndex]

            this.setState({
              // runTesting: false,
              comments: addSecondLevelComment(comments, parentComment, commentIndex, newId, commentContent, user, editor)
            }, ()=>{
              // keditor代码美化
              editor.html && window.prettyPrint()
            })

            const newMemo2 = Object.assign({}, this.state.memo);
            newMemo2.total_replies_count = newMemo2.total_replies_count + 1;
            this.setState({
              memo: newMemo2
            })
          }

        }).catch((error) => {
          console.log(error)
        })
    }
    // 公共接口 --- 删除回复
    deleteComment = (parrentComment, childCommentId) => {
      handleDeleteComment(this, parrentComment, childCommentId, 'message')

    }
    // 公共接口 --- 回复点赞
    commentPraise = (discussId) => {
      handleCommentPraise(this, discussId, 'message', (old_user_praise) => {
        const newMemo2 = Object.assign({}, this.state.memo);

        newMemo2.total_praises_count = old_user_praise
              ? newMemo2.total_praises_count - 1 : newMemo2.total_praises_count + 1;
        this.setState({
          memo: newMemo2
        })
      })
    }
    // 公共接口 --- 隐藏回复
    hiddenComment = (item, childCommentId) => {
      handleHiddenComment(this, item, childCommentId, 'message')
    }
    createNewComment = (commentContent, id, editor) => {
      let content = handleContentBeforeCreateNew(commentContent);
      const { memo } = this.props;

      const url = `/messages/${id}/reply.json`;

      // const url = `/api/v1/memos/${memo.id}/reply`;
      let { comments } = this.state;
      axios.post(url, {
          content: content
        },
        {
        }
      ).then((response) => {
        if (response.data.status === -1) {
          console.error('服务端异常')
          return;
        }
        // this.props.showNotification('帖子发表成功')

        if (response.data) {
          const _id = response.data.data.id;
          // ke
          editor.html && editor.html('');
          editor.afterBlur && editor.afterBlur()
          // md
          editor.setValue && editor.setValue('')


          const user = this._getUser();
          this.setState({
            comments: addNewComment(comments, _id, content, user, this.props.isSuperAdmin(), this)
          })
          const newMemo2 = Object.assign({}, this.state.memo);
          newMemo2.total_replies_count = newMemo2.total_replies_count + 1;
          this.setState({
            memo: newMemo2
          })
          this.refs.editor.showEditor();
          this.refs.editor.close();


        }
      }).catch((error) => {
        console.log(error)
      })
    }

    /**
     * parent.isAllChildrenLoaded 为 true的时候，表示已经没有更多子回复了
     */
    loadMoreChildComments = (parent) => {
      const url = `/messages/${parent.id}/reply_list.json?page=1&page_size=500`
      axios.get(url,{
      })
      .then((response) => {
        const { replies, liked, total_replies_count } = response.data.data

        // const memo = Object.assign({}, this.state.memo)
        // memo.total_replies_count = total_replies_count;
        this.setState({
          // memo,
          comments: generateChildComments(replies, this.state.comments, parent, this.transformReply)
        })
      }).catch((error) => {
        console.log(error)
      })
    }
    // ------------------------------------------------------------------------------------------- comments  END
    // ------------------------------------------------------------------------------------------- comments  END
    // 置顶
    setTop(memo) {
      // const params = {
      //   sticky: memo.sticky ? 0 : 1,
      // }
      // if (this.state.p_s_order) {
      //   params.order = this.state.p_s_order;
      // }
      // if (this.state.p_forum_id) {
      //   params.forum_id = this.state.p_forum_id;
      // }
        // let paramsUrl = urlStringify(params)
      const set_top_or_down_Url = `/messages/${memo.id}/sticky_top.json`;
      // 获取memo list
        axios.put(set_top_or_down_Url, {

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
      if (window.__useKindEditor === true) {
        this.refs.editor.showEditor();
      } else {
        this.refs.editor.showEditor();
      }
    }
    initReply = (parent) => {
      if (!parent.isAllChildrenLoaded) {
        this.loadMoreChildComments(parent)
      }
    }

  startcomments=()=>{
    setTime = setInterval( ()=> {
        this.fetchReplies()
      }, 5000);
      this.setState({
        commentstype:true
      })
    }

  clearcomments=()=>{
    clearInterval(setTime);
    this.setState({
      commentstype:false
    })
  }

  	render() {
  		const { match, history } = this.props
      const { recommend_shixun, current_user,author_info } = this.props;
      const { memo, comments, hasMoreComments, commentstype, pageCount, total_count , author } = this.state;
      const messageId = match.params.topicId
      if (this.state.memoLoading || !current_user) {
        return <div className="edu-back-white" id="forum_index_list"></div>
      }
      current_user.user_url = `/users/${current_user.login}`;
      const isCurrentUserTheAuthor = current_user.login == memo.author.login
      const isAdmin = this.props.isAdmin()
      // TODO 图片上传地址
      const courseId=this.props.match.params.coursesId;
      const boardId = this.props.match.params.boardId;
      const isCourseEnd = this.props.isCourseEnd();

			document.title=this.props.coursedata&&this.props.coursedata.name;
	    return (
        <div className="edu-back-white edu-class-container edu-position course-message topicDetail" id="yslforum_index_list"> {/* fl with100 */}
          <style>{`
            .topicDetail #forum_list .return_btn.no_mr {
              margin-right: 1px;
            }
            /* 有内容时，编辑器下方的边框*/
            .topicDetail .borderBottom.commentInputs {
              border-bottom: 1px solid rgb(238, 238, 238);
            }
            .independent {
              background: rgb(250, 250, 250);
              padding-bottom: 20px;
              margin-bottom: 0px !important;
            }

            .course-message.topicDetail .panel-comment_item .comment_orig_content {
                width: 1072px;
            }
          `}</style>
          <CBreadcrumb className={'independent'} items={[
            { to: current_user&&current_user.first_category_url, name: this.props.coursedata.name},
            { to: `/courses/${courseId}/boards/${boardId}`, name: memo.board_name },
            { name: '帖子详情'}
          ]}></CBreadcrumb>

          <SendToCourseModal
            ref="sendToCourseModal"
            {...this.props}
            moduleName="帖子"
            seletedMessageIds={[messageId]}
          ></SendToCourseModal>
          <div className="clearfix">
        		<div id="forum_list" className="forum_table mh650">
    	        	<div className="padding30 bor-bottom-greyE" style={{paddingBottom: '20px'}}>
                        <div className="font-16 cdefault clearfix pr pr35">
                            <span className="noteDetailTitle">{memo.subject}</span>
                            { !!memo.sticky && <span className="btn-cir btn-cir-red ml10"
                                style={{position: 'relative', bottom: '4px'}}>置顶</span>}
                            { !!memo.reward && <span className="color-orange font-14 ml15"
                              data-tip-down={`获得平台奖励金币：${memo.reward}`} >
                              <i className="iconfont icon-gift mr5"></i>{memo.reward}
                            </span> }
                            {/* || current_user.user_id === author_info.user_id */}
                            { current_user && (isAdmin || isCurrentUserTheAuthor)  &&
                                <div className="edu-position-hidebox" style={{position: 'absolute', right: '2px',top:'4px'}}>
                                    <a href="javascript:void(0);"><i className="fa fa-bars font-16"></i></a>
                                    <ul className="edu-position-hide undis">

                                        { ( isCurrentUserTheAuthor || isAdmin ) &&
                                            <li><a
                                              onClick={() => this.props.toEditPage( Object.assign({}, this.props.match.params, {'coursesId': this.state.memo.course_id}) ) }
                                            >编&nbsp;&nbsp;辑</a></li>}
                                        { isAdmin &&
                                          ( memo.sticky == true ?
                                            <li><a href="javascript:void(0);" onClick={() => this.setTop(memo)}>取消置顶</a></li>
                                            :
                                            <li><a href="javascript:void(0);" onClick={() => this.setTop(memo)}>置&nbsp;&nbsp;顶</a></li> )
                                        }
                                        { isAdmin &&
                                            <li><a href="javascript:void(0);" onClick={() => this.refs.sendToCourseModal.setVisible(true)}>发&nbsp;&nbsp;送</a></li>
                                        }
                                        { ( isCurrentUserTheAuthor || isAdmin ) && <li>
                                            <a href="javascript:void(0)" onClick={() =>
                                                window.delete_confirm_box_2_react(`onMemoDelete`, '您确定要删除吗？' , memo)}>

                                            删&nbsp;&nbsp;除</a>
                                        </li>
                                        }
                                    </ul>
                                </div>
                            }

                        </div>
                        <div className="df mt20">
                        <img src={setImagesUrl(`/images/${author && author.image_url}`)} className="radius mr10 mt2" width="40px" height="40px"/>
                        <div className="flex1">
                          <div className="color-grey-9 lineh-20">
                            <span class="color-grey-3 mr20 fl" style={{"fontWeight":"400"}}>{author && author.name}</span>
                            <span className="fl">{moment(memo.created_on).fromNow()} 发布</span>
                          </div>

                          <div className="color-grey-9 clearfix">
                              <span className="fl" style={{marginTop: '4px'}}>
                                {/* { current_user.admin && <Tooltip title={ "帖子奖励" }>
                                  <span className="noteDetailNum rightline cdefault" style={{padding: '0 4px', cursor: 'pointer'}}>
                                    <i className="iconfont icon-jiangli mr5" onClick={this.showRewardDialog}></i>
                                  </span>
                                  </Tooltip> } */}
                                  <Tooltip title={"浏览数"}>
                                    <span className={`noteDetailNum `} style={{paddingLeft: '0px'}}>
                                      <i className="iconfont icon-liulanyan mr5"></i>
                                      <span style={{ top: "1px", position: "relative" }}>{memo.visits || '1'}</span>
                                    </span>
                                  </Tooltip>
                                  { !!memo.total_replies_count &&
                                  <Tooltip title={"回复数"}>
                                  <a href="javascript:void(0)" className="noteDetailNum">
                                    <i className="iconfont icon-huifu1 mr5" onClick={this.showCommentInput}></i>
                                    <span style={{ top: "2px", position: "relative" }}>{ memo.total_replies_count }</span>
                                  </a>
                                  </Tooltip>
                                  }
                                  {!!memo.total_praises_count &&
                                  <Tooltip title={"点赞数"}>
                                    <span className={`noteDetailNum `} style={{}}>
                                      <i className="iconfont icon-dianzan-xian mr5"></i>
                                      <span style={{ top: "2px", position: "relative" }}>{ memo.total_praises_count }</span>
                                    </span>
                                  </Tooltip>
                                    }
                              </span>
                              <div className="fr">
                              {/* || current_user.user_id === author_info.user_id */}
                                <a className={`task-hide fr return_btn color-grey-6 ${ current_user && (isAdmin 
                                    ) ? '': 'no_mr'} `} onClick={() => this.props.toListPage(Object.assign({}, this.props.match.params, {'coursesId': this.state.memo.course_id})) } >
                                  返回
                                </a>
                              </div>
                          </div>
                        </div>
                      </div>
                    </div>


                    <div className="padding30 memoContent new_li" style={{ paddingBottom: '10px'}}>
                      {/* <MarkdownToHtml content={memo.content}></MarkdownToHtml>  */}
                      {memo.is_md == true ?
                        <MarkdownToHtml content={memo.content}></MarkdownToHtml>
                        :
                        <div dangerouslySetInnerHTML={{ __html: memo.content }}></div>
                      }
                    </div>
                    <div className="padding30 bor-bottom-greyE" style={{paddingTop: '2px'}}>
                        <div className="mt10 mb20">
                          {/* ${memo.user_praise ? '' : ''}  */}
                          <Tooltip title={`${memo.liked ? '取消点赞' : '点赞'}`}>
                            <p className={`noteDetailPoint  ${memo.user_praise ? 'Pointed' : ''}`} onClick={()=>{this.clickPraise()}} >
                              <i className="iconfont icon-dianzan"></i><br/>
                              <span>{memo.praises_count}</span>
                            </p>
                          </Tooltip>
                        </div>

                        { memo.attachments && !!memo.attachments.length &&
                        <div>
                            {this.renderAttachment()}
                        </div>
                        }
                    </div>

                      {!isCourseEnd && <MemoDetailMDEditor ref="editor" memo={memo} usingMockInput={true} placeholder="说点什么"
                                                           {...this.props}
                          height={160} showError={true} buttonText={'发表'} className={comments && comments.length && 'borderBottom'}></MemoDetailMDEditor>}

                  {/*  onClick={ this.createNewComment }
                        enableReplyTo={true}
                  */}
                    <div className="padding20  memoReplies commentsDelegateParent comments_hideSecondReplyUserHeader"
                        style={{ display: (comments && !!comments.length) ? 'block' : 'none', paddingBottom: '0px' }}>
                      <div className="replies_count commentstypetop">
                        {this.props.isAdmin()===true? <span className="commentstypebutton font-16 ">
                          {this.state.commentstype===false?<Button type="primary" onClick={()=>this.startcomments()}>开启刷新评论</Button>
                            :<Button type="danger" onClick={()=>this.clearcomments()}>停止刷新</Button>}
                        </span>:""}

                        <span className="labal font-16">全部回复</span>
                        <span className="count font-16">({memo.total_replies_count})</span>

                      </div>

                      <Comments comments={comments} user={current_user}
                        replyComment={this.replyComment}
                        deleteComment={this.deleteComment}
                        commentPraise={this.commentPraise}
                        rewardCode={this.rewardCode}
                        hiddenComment={this.hiddenComment}
                        buttonText={'发表'}

                        usingAntdModal={true}
                        isChildCommentPagination={true}
                        loadMoreChildComments={this.loadMoreChildComments}
                        initReply={this.initReply}
                        showRewardButton={false}
                        showReply={!isCourseEnd}

                        onlySuperAdminCouldHide={true}
                      ></Comments>


                        {/* { true ?  :
                        <div className="memoMore">
                          <div className="writeCommentBtn" onClick={this.showCommentInput}>写评论</div>
                        </div>} */}
                    </div>


                    <div className="memoMore" style={{'margin-top': '20px'}}>
                      { total_count > REPLY_PAGE_COUNT &&
                        <Pagination showQuickJumper onChange={this.onPaginationChange} current={pageCount} total={total_count} pageSize={10}/>
                      }
                      {!isCourseEnd && <div className="writeCommentBtn" onClick={this.showCommentInput}>写评论</div>}
                    </div>

    	        </div>
            </div>
          </div>

	    );
  	}
}

export default ImageLayerOfCommentHOC() ( RouteHOC()(TopicDetail) );
