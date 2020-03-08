/*
 * @Description: 评论组件
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-17 17:31:33
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-24 18:03:21
 */
import React from 'react';
// import CommentForm from './CommentForm';
import CommentList from './CommentList';
function Comment (props) {

  const { 
    commentLists,
    // addComment,
    // cancelComment,
    isAdmin,
    addChildComment,
    likeComment,
    showOrHideComment,
    submitDeleteComment
  } = props;
  
  // const handleCancelComment = () => {
  //   cancelComment && cancelComment();
  // };
  return (
    <React.Fragment>
      {/* <CommentForm 
        onCancel={handleCancelComment}
        onSubmit={addComment}
      /> */}
      <CommentList 
        isAdmin={isAdmin}
        likeComment={likeComment}
        showOrHideComment={showOrHideComment}
        commentLists={commentLists}
        submitChildComment={addChildComment}
        submitDeleteComment={submitDeleteComment}
      />
    </React.Fragment>
  );
}

export default Comment;
