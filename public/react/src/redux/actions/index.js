/*
 * @Description: 全局导出 action 类型 
 * @Author: tangjiang 
 * @Date: 2019-11-13 20:12:23 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-14 09:55:47
 */

import toggleTodo from './testAction.js';
import {
  getOJList, 
  changePaginationInfo,
  deleteItem
} from './ojList';

import {
  validateOjForm,
  saveOjFormCode,
  getOJFormById,
  saveOJFormId,
  clearOJFormStore,
  validateOJName,
  validateOjLanguage,
  validateOjDescription,
  validateOjDifficult,
  validateOjTimeLimit,
  validateOjCategory,
  validateOpenOrNot,
  validateOjSubDisciplineId,
  saveTagDisciplineId,
  addTestCase,
  deleteTestCase,
  testCaseInputChange,
  testCaseOutputChange,
  updateTestAndValidate,
  updateOpenTestCaseIndex,
  handleClickCancelPublish,
  getQuestion,
  saveKnowledge,
  setOjInitialValue,
  tagDisciplines
} from './ojForm';

import {
  startProgramQuestion,
  debuggerCode,
  getUserCommitRecord,
  getUserCommitRecordDetail,
  updateCode,
  saveUserInputCode,
  changeUserCodeTab,
  submitUserCode,
  getUserProgramDetail,
  saveUserProgramIdentifier,
  restoreInitialCode,
  saveUserCodeForInterval,
  saveEditorCodeForDetail,
  saveOpacityType,
  clearOjForUserReducer,
  changeRecordPagination,
  addNotes
  // isUpdateCodeCtx
} from './ojForUser';

import {
  changeShowOrHideControl,
  changeLoadingState,
  changeSubmitLoadingStatus,
  changePublishLoadingStatus,
  isMyPublish,
} from './common';

import {
  getUserInfoForNew
} from './user';

import {
  addComment,
  getCommentLists,
  replayChildComment,
  deleteComment,
  likeComment,
  showOrHideComment,
  changePagination
} from './comment';

import {
  getJupyterTpiDataSet,
  getJupyterTpiUrl,
  getJupyterInfo,
  syncJupyterCode,
  changeGetJupyterUrlState,
  saveJupyterTpi,
  changeCurrentPage,
  changeshowDrawer,
  reset_with_tpi,
  addjypertime,
  active_with_tpi,
  updataspinning
} from './jupyter';

import {
  showOrHideTpiTestCase,
  isCollpaseTsetCase
} from './tpi';

import {
  staticList,
  changeParams,
  initTotal
} from './static';

import {
  getWXCode,
  getWXCodeTestCase,
  restoreWXCode,
  updateWXCodeForEditor,
  updateWXCodeForInterval,
  evaluateWxCode,
  showWXCodeTextCase,
  changeWXCodeEvaluateLoading,
  changeWXCodeEvaluateDialog
} from './wxCode';
export default {
  toggleTodo,
  getOJList,
  deleteItem,
  changePaginationInfo,
  getOJFormById,
  saveOJFormId,
  clearOJFormStore,
  validateOjForm,
  saveOjFormCode,
  validateOJName,
  validateOjLanguage,
  validateOjDescription,
  validateOjDifficult,
  validateOjTimeLimit,
  validateOjCategory,
  validateOpenOrNot,
  validateOjSubDisciplineId,
  saveTagDisciplineId,
  handleClickCancelPublish,
  getQuestion,
  saveKnowledge,
  setOjInitialValue,
  tagDisciplines,
  // 
  addTestCase,
  deleteTestCase,
  testCaseInputChange,
  testCaseOutputChange,
  debuggerCode,
  startProgramQuestion,
  changeShowOrHideControl,
  changeLoadingState,
  getUserCommitRecord,
  getUserCommitRecordDetail,
  updateCode,
  saveUserInputCode,
  changeUserCodeTab,
  changeSubmitLoadingStatus,
  submitUserCode,
  changePublishLoadingStatus,
  isMyPublish,
  getUserProgramDetail,
  updateTestAndValidate,
  updateOpenTestCaseIndex,
  saveUserProgramIdentifier,
  restoreInitialCode,
  getUserInfoForNew,
  saveUserCodeForInterval,
  saveEditorCodeForDetail,
  saveOpacityType,
  clearOjForUserReducer,
  changeRecordPagination,
  addNotes,
  // jupyter
  getJupyterTpiDataSet,
  getJupyterTpiUrl,
  getJupyterInfo,
  syncJupyterCode,
  changeGetJupyterUrlState,
  saveJupyterTpi,
  changeCurrentPage,
  changeshowDrawer,
  reset_with_tpi,
  addjypertime,
  active_with_tpi,
  updataspinning,
  // isUpdateCodeCtx
  // 评论
  addComment,
  getCommentLists,
  replayChildComment,
  deleteComment,
  likeComment,
  showOrHideComment,
  changePagination,
  // tpi
  showOrHideTpiTestCase,
  isCollpaseTsetCase,
  // 统计
  staticList,
  changeParams,
  initTotal, 
  // 微信
  getWXCode,
  getWXCodeTestCase,
  restoreWXCode,
  updateWXCodeForEditor,
  updateWXCodeForInterval,
  evaluateWxCode,
  showWXCodeTextCase,
  changeWXCodeEvaluateLoading,
  changeWXCodeEvaluateDialog
}