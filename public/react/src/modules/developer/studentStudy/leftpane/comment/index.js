/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 09:49:35
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-26 10:43:45
 */
import './index.scss';
import React, { useEffect, useState } from 'react';
import Comment from '../../../../../common/components/comment';
import { connect } from 'react-redux';
import actions from '../../../../../redux/actions';
import { Pagination } from 'antd';
const CommentTask = (props) => {

  // 当前页
  const [current, setCurrent] = useState(1);

  const {
    pages,
    isAdmin,
    identifier,
    commentLists,
    addComment,
    likeComment,
    deleteComment,
    getCommentLists,
    showOrHideComment,
    replayChildComment,
    changePagination
  } = props;

  useEffect(() => {
    if (identifier) {
      // 获取评论列表数据
      getCommentLists(identifier);
    }
  }, [identifier]);

  // 添加评论
  const handleAddComment = (ctx) => {
    addComment(identifier, {
      comments: {
        content: ctx
      }
    });
  };
  // 添加子评论
  const handleAddChildComment = (parentId, ctx) => {
    replayChildComment(identifier, {
      comments: {
        content: ctx,
        parent_id: parentId
      }
    });
  }
  // 删除评论
  const handleSubmitDeleteComment = (id) => {
    // console.log('删除评论:', identifier, id);
    deleteComment(identifier, id);
  }

  // 点赞
  const handleLikeComment = (id) => {
    likeComment(identifier, id, {
      container_type: 'Discuss',
      type: 1
    });
  }

  // 显示或隐藏
  const handleShowOrHideComment = (id, hidden) => {
    showOrHideComment(identifier, id, {
      hidden
    });
  }

  // 点击分页
  const handlePageChange = (page, pageSize) => {
    setCurrent(page);
    changePagination(page);
    // setTimeout(() => {
    // 调用查询接口
    getCommentLists(identifier);  
    // }, 300);
  }
  
  const _style = {
    display: pages.total > pages.limit ? 'block' : 'none'
  }

  return (
    <div className="task_comment_task">
      <Comment 
        isAdmin={isAdmin}
        commentLists={commentLists}
        addComment={handleAddComment}
        addChildComment={handleAddChildComment}
        likeComment={handleLikeComment}
        showOrHideComment={handleShowOrHideComment}
        submitDeleteComment={handleSubmitDeleteComment}
      />

      <div className="task_comment_page" style={ _style }>
        <Pagination 
          showQuickJumper 
          current={current}
          pageSize={pages.limit}
          total={pages.total}
          onChange={handlePageChange}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {
    commentLists, // 评论列表
    pages
  } = state.commentReducer;
  const {
    comment_identifier
  } = state.ojForUserReducer;
  const { userInfo } = state.userReducer;
  return {
    commentLists,
    isAdmin: userInfo.admin,
    identifier: comment_identifier,
    pages
  }
}

const mapDispatchToProps = (dispatch) => ({
  // getCommentLists: (identifier) => dispatch(action.getCommentLists(identifier)) 
  getCommentLists: (identifier) => dispatch(actions.getCommentLists(identifier)),
  addComment: (identifier, comments) => dispatch(actions.addComment(identifier, comments)),
  replayChildComment: (identifier, comment) => dispatch(actions.replayChildComment(identifier, comment)),
  deleteComment: (identifier, id) => dispatch(actions.deleteComment(identifier, id)),
  likeComment: (identifier, id, params) => dispatch(actions.likeComment(identifier, id, params)),
  showOrHideComment: (identifier, id, params) => dispatch(actions.showOrHideComment(identifier, id, params)),
  changePagination: (page) => dispatch(actions.changePagination(page))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentTask);
