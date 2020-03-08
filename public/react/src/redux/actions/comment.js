/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-23 10:53:25
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-27 11:07:02
 */
import types from "./actionTypes";

import {
  fetchAddComment,
  fetchCommentLists,
  fetchAddChildComment,
  fetchDeleteComment,
  fetchLikeComment,
  fetchShowOrHideComment
} from '../../services/commentService';

// 添加评论
export const addComment = (identifier, comments) => {
  return (dispatch) => {
    fetchAddComment(identifier, comments).then(res => {
      if (res.status === 200) {
        // 重新加载评论列表
        dispatch(getCommentLists(identifier));
        // 成功后，评论加一条
        dispatch({
          type: types.UPDATE_OJ_FOR_USER_COMMENT_COUNT,
          payload: 'add' //
        });
      }
    });
  }
};

// 获取评论列表
export const getCommentLists = (identifier) => {
  return (dispatch, getState) => {
    const {pages: {limit, page}} = getState().commentReducer;
    fetchCommentLists(identifier, {
      limit,
      page
    }).then(res => {
      // console.log('获取评论列表: ====>>>>', res);
      if (res.status === 200) {
        const {data} = res;
        dispatch({
          type: types.GET_COMMENT_LISTS,
          payload: data
        })
      }
    });
  }
}

// 子回复 
export const replayChildComment = (identifier, comment) => {
  return (dispatch) => {
    fetchAddChildComment(identifier, comment).then(res => {
      // console.log('添加子评论成功: ====>>>>', res);
      if (res.status === 200) {
        // 重新加载评论列表
        dispatch(getCommentLists(identifier));
        // 成功后，评论加一条
        dispatch({
          type: types.UPDATE_OJ_FOR_USER_COMMENT_COUNT,
          payload: 'add' //
        });
      }
    });
  }
}

// 删除评论
export const deleteComment = (identifier, delId) => {
  return (dispatch) => {
    fetchDeleteComment(identifier, delId).then(res => {
      if (res.status === 200) {
        // 重新加载评论列表
        dispatch(getCommentLists(identifier));
        // 成功后，评论加一条
        dispatch({
          type: types.UPDATE_OJ_FOR_USER_COMMENT_COUNT,
          payload: 'minus' //
        });
      }
    });
  }
}

// 点赞
export const likeComment = (identifier, id, params, cb) => {
  return (dispatch) => {
    fetchLikeComment(id, params).then(res => {
      if (res.status === 200) {
        // 重新加载评论列表
        const {container_type} = params;
        // if (container_type === 'Discuss') {
        //   dispatch(getCommentLists(identifier))
        // } else if {
        // }
        const {praise_count} = res.data;
        switch (container_type) {
          case 'Discuss':
            dispatch(getCommentLists(identifier))
            break;
          case 'Hack':
            dispatch({
              type: types.ADD_OJ_LIKE_COUNT,
              payload: praise_count
            });
            break;
          default:
            break;
        }
      }
    })
  }
}

// 显示或隐藏评论
export const showOrHideComment = (identifier, id, params) => {
  return (dispatch) => {
    fetchShowOrHideComment(identifier, id, params).then(res => {
      if (res.status === 200) {
        // 重新加载评论列表
        dispatch(getCommentLists(identifier));
      }
    });
  }
}

// 改变分页条件
export const changePagination = (page) => {
  return {
    type: types.CHANGE_COMMENT_PAGINATION_PARAMS,
    payload: page
  };
}
