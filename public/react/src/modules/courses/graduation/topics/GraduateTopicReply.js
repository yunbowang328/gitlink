import React,{ Component } from "react";
import { Pagination } from "antd";

import update from 'immutability-helper'
import axios from 'axios'
import MemoDetailMDEditor from '../../../forums/MemoDetailMDEditor'

import '../../../forums/Post.css'
import '../../../forums/RightSection.css'
import {ImageLayerOfCommentHOC} from '../../../page/layers/ImageLayerOfCommentHOC'

import Comments from '../../../comment/Comments'
import './GraduateTopicReply.css'
import '../../common/courseMessage.css'
import { generateComments, generateChildComments, _findById, handleContentBeforeCreateNew, addNewComment
  , addSecondLevelComment, NEED_TO_WRITE_CONTENT, handleContentBeforeCreateSecondLevelComment
  , handleDeleteComment, handleCommentPraise, handleHiddenComment } from '../../common/CommentsHelper'
const REPLY_PAGE_COUNT = 10
const $ = window.$;
class GraduateTopicReply extends Component{
  constructor(props){
    super(props);
    this.state={
      pageCount: 1
    }
  }

  componentDidMount(){
    this.fetchReplies()


  }
  _getUser() {
    const { current_user } = this.props;
    current_user.user_url = `/users/${current_user.login}`;
    return current_user;
  }
  _findById = _findById
  createNewComment = (commentContent, id, editor) => {
    const graduation_topic_id = this.props.memo.id

    let content = handleContentBeforeCreateNew(commentContent);
    const { memo } = this.props;
    const url = `/users/reply_message.json`;

    let { comments } = this.state;
    axios.post(url, {
        journals_for_message: {
          jour_type: 'GraduationTopic',
          jour_id: graduation_topic_id,
          notes: content,
          // m_parent_id
          reply_id: memo.user_id
        }
      }
    ).then((response) => {
      if (response.data.status === -1) {
        console.error('服务端异常')
        return;
      }
      // this.props.showNotification('帖子发表成功')

      if (response.data && response.data.id) {
        const _id = response.data.id;
        // md
        editor.setValue && editor.setValue('')

        const user = this._getUser();
        this.setState({
          comments: addNewComment(this.state.comments, _id, content, user, this.props.isSuperAdmin(), this),
          total_count: this.state.total_count + 1
        })
        this.refs.editor.showEditor();

      }
    }).catch((error) => {
      console.log(error)
    })
  }
  replyComment = (commentContent, id, editor) => {
    const { showNotification } = this.props;
    // if (!commentContent || commentContent.length === 0) {
    //   showNotification(NEED_TO_WRITE_CONTENT)
    //   return;
    // }

    if (this.props.memo.id === id ) { // 回复帖子
      this.createNewComment(commentContent, id, editor);
      return;
    }
    const url = `/users/reply_message.json`;

    const { comments } = this.state;
    const user = this._getUser();
    const graduation_topic_id = this.props.memo.id
    const commentIndex = this._findById(id, comments);
    let comment = comments[commentIndex];

    commentContent = handleContentBeforeCreateSecondLevelComment(commentContent)
    axios.post(url, {
          journals_for_message: {
            jour_type: 'GraduationTopic',
            jour_id: graduation_topic_id,
            notes: commentContent,
            m_parent_id: id,
            reply_id: comment.user_id
          }
        },
        {
        }
      ).then((response) => {
        if (response.data.id) {
          let newId = response.data.id;

          this.setState({
            comments: addSecondLevelComment(comments, comment, commentIndex, newId, commentContent, user, editor)
          })

          const newMemo2 = Object.assign({}, this.props.memo);
          newMemo2.total_count = newMemo2.total_count + 1;
          this.setState({
            memo: newMemo2
          })
        }

      }).catch((error) => {
        console.log(error)
      })
  }

  loadMoreChildComments = (parent) => {
    const graduation_topic_id = this.props.memo.id
    const course_id = this.props.course_id
    const url = `/courses/${course_id}/graduation_topics/${graduation_topic_id}/show_comment.json?parent_id=${parent.id}&limit=500`
    axios.get(url,{
    })
    .then((response) => {
      const { comments } = response.data


      // const memo = Object.assign({}, this.state.memo)
      // memo.sum_replies_count = sum_replies_count;
      this.setState({
        // memo,
        comments: generateChildComments(comments, this.state.comments, parent, this.transformReply)
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  onPaginationChange = (pageCount) => {
    this.setState({ pageCount }, () => {
      this.fetchReplies()
    })
  }

  fetchReplies = () => {
    const graduation_topic_id = this.props.memo.id
    const course_id = this.props.course_id
    const url = `/courses/${course_id}/graduation_topics/${graduation_topic_id}/show_comment.json?page=${this.state.pageCount}`
    // page limit parent_id
    axios.get(url,{
    })
    .then((response) => {
      const { comments, messages_count } = response.data

      this.setState({
        comments: generateComments(comments, this.transformReply),
        // : this.state.comments.concat(comments),
        total_count: messages_count
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  transformReply = (reply, children = []) => {
    const isAdmin = this.props.isAdmin()
    const isSuperAdmin = this.props.isSuperAdmin()
    return {
      isSuperAdmin: isSuperAdmin,
      admin: isAdmin, //
      permission: true, //
      children: children,
      child_message_count: reply.child_message_count,
      hidden: reply.hidden,
      id: reply.id,
      image_url: reply.author.image_url,
      reward: null, //
      time: reply.time, // moment(reply.created_on).fromNow(),
      user_id: reply.author.id,
      user_login: reply.author.login,
      user_praise: reply.user_praise,
      username: reply.author.name,
      content: reply.content,
      praise_count: reply.praise_count
    }
  }

  // 公共接口 --- 删除回复
  deleteComment = (parrentComment, childCommentId) => {
    handleDeleteComment(this, parrentComment, childCommentId, 'journals_for_message')
  }
  // 公共接口 --- 回复点赞
  commentPraise = (discussId) => {
    handleCommentPraise(this, discussId, 'journals_for_message')
  }
  // 公共接口 --- 隐藏回复
  hiddenComment = (item, childCommentId) => {
    handleHiddenComment(this, item, childCommentId, 'journals_for_message')
  }

  showCommentInput = () => {
    this.refs.editor.showEditor();
  }
  initReply = (parent) => {
    if (!parent.isAllChildrenLoaded) {
      this.loadMoreChildComments(parent)
    }
  }

  render(){
    let { total_count, comments, pageCount } = this.state
    const { current_user, memo } = this.props

    return(
      <React.Fragment>
        <MemoDetailMDEditor  {...this.props} ref="editor" memo={memo} usingMockInput={true} placeholder="说点什么"
            height={160} showError={true}></MemoDetailMDEditor>

        <div className="padding40 bor-bottom-greyE memoReplies commentsDelegateParent"
            style={{ display: (comments && !!comments.length) ? 'block' : 'none' }}>
          <div className="replies_count">
            <span className="labal">全部回复</span>
            <span className="count">{total_count}</span>
          </div>

          <Comments comments={comments} user={current_user}
            replyComment={this.replyComment}
            deleteComment={this.deleteComment}
            commentPraise={this.commentPraise}
            rewardCode={this.rewardCode}
            hiddenComment={this.hiddenComment}

            usingAntdModal={true}
            isChildCommentPagination={true}
            loadMoreChildComments={this.loadMoreChildComments}
            initReply={this.initReply}
            showRewardButton={false}

            onlySuperAdminCouldHide={true}
          ></Comments>


            {/* { true ?  :
            <div className="memoMore">
              <div className="writeCommentBtn" onClick={this.showCommentInput}>写评论</div>
            </div>} */}
        </div>

        { total_count > REPLY_PAGE_COUNT &&
        <div className="memoMore">
          <Pagination showQuickJumper onChange={this.onPaginationChange} current={pageCount} total={total_count} pageSize={10}/>
          <div className="writeCommentBtn" onClick={this.showCommentInput}>写评论</div>
        </div> }
      </React.Fragment>
    )
  }
}
export default ImageLayerOfCommentHOC() (GraduateTopicReply);