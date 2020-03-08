/*
 * @Description: 用户编程信息
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 13:41:48
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-07 17:26:19
 */
import types from "../actions/actionTypes";
import { Base64 } from 'js-base64';
import actions from "../actions";

const initialState = {
  user_program_identifier: '', // 开启OJ题的唯一标题
  hack: {}, // 编程题主要内容
  test_case: {}, // 测试用例
  commitTestRecordDetail: {}, // 调试代码执行结果
  commitRecordDetail: {}, // 提交成功后记录提交的详情
  commitRecord: [], // 提交记录
  userCode: '', // 保存当前用户输入的代码
  isUpdateCode: false, // 是否更新了代码内容
  userCodeTab: 'task', // 学员测评tab位置: task | record | comment 
  userTestInput: '', // 用户自定义输入值 
  recordDetail: {}, // 根据id号获取的记录详情
  hack_identifier: '', // 用户界面编辑时
  editor_code: '', // 保存编辑代码
  notice: false, // 通知
  hadCodeUpdate: false, // 更新代码
  operateType: '', // 点击类型: 调度或提交
  comment_identifier: '', // 用户评论时使用的 identifier
  pages: {
    limit: 15,
    page: 1,
    total: 1
  }
};

const ojForUserReducer = (state = initialState, action) => {
  let tempDetail = null;
  switch (action.type) {
    case types.SAVE_USER_PROGRAM_ID:
      return {
        ...state,
        user_program_identifier: action.payload
      }
    case types.USER_PROGRAM_DETAIL:
      const { hack, test_case } = action.payload;
      const { code }= hack;
      let tempCode = Base64.decode(code)
      let tempDesc;
      try {
        tempDesc = JSON.parse(hack.description);
      } catch (error) {
        tempDesc = hack.description;
      }
      Object.assign(hack, {code: tempCode, description: tempDesc});
      return {
        ...state,
        hack: Object.assign({}, hack),
        test_case: Object.assign({}, test_case),
        comment_identifier: hack.identifier,
        userCode: tempCode
      }
    case types.COMMIT_RECORD_DETAIL:
      let result = action.payload.data;
      if (result['expected_output']) {
        result['expected_output'] = Base64.decode(result['expected_output'])
      }
      if (result['output']) {
        result['output'] = Base64.decode(result['output']);
      }
      try {
        result['error_msg'] = Base64.decode(result['error_msg']);
      } catch (e) {
        console.log('错误信息:', e);
      } 
      if (action.payload.type === 'submit') {
        return { 
          ...state,
          commitRecordDetail: Object.assign({}, result)
        }
      } else {
        return { 
          ...state,
          commitTestRecordDetail: Object.assign({}, result)
        }
      }
      
    case types.COMMIT_RECORD:
      const {records, records_count} = action.payload;
      return {
        ...state,
        commitRecord: records,
        pages: Object.assign({}, state.pages, { total: records_count })
      }
    case types.SAVE_USER_CODE:
      // console.log('save_user_code: ', action.payload);
      // let curCode = Base64.encode(action.payload);
      return {
        ...state,
        userCode: action.payload,
        isUpdateCode: true,
      }
    case types.IS_UPDATE_CODE:
      return {
        ...state,
        isUpdateCode: action.payload
      }
    case types.CHANGE_USER_CODE_TAB:
      return {
        ...state,
        userCodeTab: action.payload
      }
    case types.GET_COMMIT_RECORD_DETAIL_BY_ID:
      tempDetail = action.payload.data;
      if (tempDetail['error_msg']) {
        tempDetail['error_msg'] = Base64.decode(tempDetail['error_msg']);
      } 
      if (tempDetail['expected_output']) {
        tempDetail['expected_output'] = Base64.decode(tempDetail['expected_output']);
      }
      if (tempDetail['output']) {
        tempDetail['output'] = Base64.decode(tempDetail['output']);
      }
      if (tempDetail['code']) {
        tempDetail['code'] = Base64.decode(tempDetail['code']);
      }
      return {
        ...state,
        recordDetail: tempDetail
      }
    case types.RESTORE_INITIAL_CODE:
      const curHack = state.hack;
      let restoreCode = action.payload
      if (restoreCode) {
        curHack['code'] = Base64.decode(restoreCode);
      } else {
        curHack['code'] = '';
      }
      return {
        ...state,
        hack: Object.assign({}, state.hack, curHack),
        editor_code: curHack['code']
      }
    case types.SAVE_HACK_IDENTIFIER:
      return {
        ...state,
        hack_identifier: action.payload
      }
    case types.SAVE_EDITOR_CODE:
      return {
        ...state,
        editor_code: action.payload
      }
    case types.SAVE_USE_TEST_CASE_VALUE:
      return {
        ...state,
        userTestInput: action.payload.input
      }
    case types.SAVE_NOTICE_COUNT:
      return {
        ...state,
        notice: action.payload
      };
    case types.AUTO_UPDATE_CODE:
      return {
        ...state,
        hadCodeUpdate: action.payload
      };
    case types.CLICK_OPERATE_TYPE: 
      return {
        ...state, 
        operateType: action.payload
      }
    case types.CLEAR_OJ_FOR_USER_REDUCER:
      return {
        ...state,
        user_program_identifier: '', // 开启OJ题的唯一标题
        hack: {}, // 编程题主要内容
        test_case: {}, // 测试用例
        commitTestRecordDetail: {}, // 调试代码执行结果
        commitRecordDetail: {}, // 提交成功后记录提交的详情
        commitRecord: [], // 提交记录
        // userCode: '', // 保存当前用户输入的代码
        isUpdateCode: false, // 是否更新了代码内容
        userCodeTab: 'task', // 学员测评tab位置: task | record | comment 
        userTestInput: '', // 用户自定义输入值 
        recordDetail: {}, // 根据id号获取的记录详情
        hack_identifier: '', // 用户界面编辑时
        editor_code: '', // 保存编辑代码
        notice: false, // 通知
        hadCodeUpdate: false, // 更新代码
        operateType: '', // 点击类型: 调度或提交 
      };
    // 保存评论时用的 identifer
    case types.SAVE_COMMENT_IDENTIFIER:
      return {
        ...state,
        comment_identifier: actions.payload
      };
    // 是否点赞
    case types.ADD_OJ_LIKE_COUNT:
      let _count = state.hack.praises_count;
      let _user_praise = state.hack.user_praise;
      _count = +action.payload > 0 ? _count + 1 : _count - 1;
      _user_praise = +action.payload > 0 ? true : false;
      const _hack = Object.assign({}, state.hack, {praises_count: _count, user_praise: _user_praise});
      return {
        ...state,
        hack: _hack
      }
    case types.CHANGE_RECORD_PAGINATION_PAGE: 
      return {
        ...state,
        pages: Object.assign({}, state.pages, { page: action.payload})
      }
    case types.UPDATE_OJ_FOR_USER_COMMENT_COUNT:
      const {comments_count} = state.hack;
      const _comments_count = action.payload === 'add' ? comments_count + 1 : comments_count - 1;
      return {
        ...state,
        hack: Object.assign({}, state.hack, { comments_count: _comments_count })
      }
    // 修改笔记内容
    case types.UPDATE_NOTE_CONTENT:
      const _hack1 = Object.assign({}, state.hack, {notes: action.payload });
      return {
        ...state,
        hack: _hack1
      }
    // 修改 hack passed值
    case types.UPDATE_HACK_PASSED:
        const _hack2 = Object.assign({}, state.hack, {passed: action.payload });
        return {
          ...state,
          hack: _hack2
        }
    default:
      return state;
  }
}

export default ojForUserReducer;
