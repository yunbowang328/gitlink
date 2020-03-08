import types from "../actions/actionTypes";

/*
 * @Description: 评论reducer
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-23 10:35:31
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-25 10:56:10
 */
const initialState = {
  comments: {
    content: '' // 评论内容
  },
  commentLists: {}, // 评论列表
  pages: {
    limit: 15,
    page: 1,
    total: 1
  }
};

const commentReducer = (state = initialState, action) => {
  
  const { payload, type } = action;
  switch (type) {
    case types.ADD_COMMENTS:
      return {
        ...state
      }
    case types.GET_COMMENT_LISTS:
      const {disscuss_count} = payload;
      return {
        ...state,
        commentLists: Object.assign({}, payload),
        pages: Object.assign({}, state.pages, { total: disscuss_count })
      }
    case types.CHANGE_COMMENT_PAGINATION_PARAMS:
      const _pages = Object.assign({}, state.pages, { page: payload });
      return {
        ...state,
        pages: _pages
      }
    default:
      return {
        ...state
      }
  }
}

export default commentReducer;
