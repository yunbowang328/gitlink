/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2020-01-15 15:37:44
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-18 09:46:04
 */
import types from "../actions/actionTypes";
const initialState = {
  wxCode: '',
  userCode: '',
  testCase: [],
  game_id: '',
  myIdentifier: '',
  exec_time: 0,
  last_compile_output: '',
  test_sets_count: 0,
  sets_error_count: 0,
  path: '',
  isShow: false,
  showLoading: false,
  showDialog: false,
  gold: 0,
  experience: 0,
  next_game: ''
};

const wxcodeReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case types.GET_WXCODE_BY_IDENTIFIER:
      console.log('=====>>>>>', payload);
      return {
        ...state,
        wxCode: payload,
        userCode: payload
      }
    case types.GET_WXCODE_TEST_CASE:
      return {
        ...state,
        testCase: payload.test_sets,
        game_id: payload.game_id,
        myIdentifier: payload.myIdentifier,
        exec_time: payload.exec_time,
        path: payload.path,
        last_compile_output: payload.last_compile_output,
        test_sets_count: payload.test_sets_count,
        sets_error_count: payload.sets_error_count
      }
    case types.UPDATE_WXCODE_FOR_EDITOR:
      return {
        ...state,
        userCode: payload
      }
    case types.IS_SHOW_WXCODE_TEST_CASES:
      return {
        ...state,
        isShow: payload
      }
    case types.SHOW_WX_CODE_LOADING:
      return {
        ...state,
        showLoading: payload
      }
    case types.SHOW_WX_CODE_DIALOG:
      return {
        ...state,
        showDialog: payload
      }
    case types.SET_GOLD_AND_EXPERIENCE:
      return {
        ...state,
        gold: payload.gold,
        experience: payload.experience,
        next_game: payload.next_game
      }
    default:
      return {
        ...state
      }
  }
}

export default wxcodeReducer;
