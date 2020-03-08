/*
 * @Description: 评论列表页
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-17 17:34:00
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-24 18:08:07
 */
import './index.scss';
import React from 'react';
import CommentItem from './CommentItem';
import { Empty } from 'antd';
function CommentList (props) {
  const {
    isAdmin,
    commentLists, // 评论列表
    submitChildComment,
    submitDeleteComment,
    likeComment,
    showOrHideComment
  } = props;

  const {comments = []} = commentLists;

  const renderLi = () => {
    if (comments.length > 0) {
      return comments.map((item, index) => {
        return (
          <CommentItem 
            isAdmin={isAdmin}
            key={`item_${index}`}
            submitChildComment={submitChildComment}
            submitDeleteComment={submitDeleteComment}
            comment={item} 
            likeComment={likeComment}
            showOrHideComment={showOrHideComment}
          />
        );
      });
    } else {
      return (
        <div className="empty_comment">
          <Empty />
        </div>
      );
    }
  }

  return (
    <ul className="comment_list_wrapper">
      {renderLi()}
    </ul>
  );
}

export default CommentList;
