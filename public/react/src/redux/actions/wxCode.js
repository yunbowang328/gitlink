/*
 * @Description:
 * @Author: tangjiang
 * @Github:
 * @Date: 2020-01-15 15:41:10
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-18 11:43:43
 */
import types from './actionTypes.js';
import {
  fetchWxCode,
  fetchWxCodeTextCase,
  fetchRestoreWxCode,
  fetchUpdateWxCode,
  fetchWxCodeGameBuild,
  fetchWxCodeGameStatus
} from '../../services/wxcodeService.js';

// 加载代码块
export const getWXCode = (identifier) => {
  return (dispatch) => {
    fetchWxCode(identifier).then(res => {
      if (res.status === 200) {
        dispatch({
          type: types.GET_WXCODE_BY_IDENTIFIER,
          payload: res.data.content
        });
      }
    });
  }
};

// 加载测试集
export const getWXCodeTestCase = (identifier, params) => {
  return (dispatch) => {
    fetchWxCodeTextCase(identifier, params).then(res => {
      // console.log('加载测试集: ====>>>>>>', res);
      try{
        const {data = {}} = res;
        if(data.test_sets){
          const _path = data.challenge.path;
          dispatch({
            type: types.GET_WXCODE_TEST_CASE,
            payload: {
              test_sets: data.test_sets || [],
              game_id: data.game && data.game.id,
              myIdentifier: data.myshixun.identifier,
              exec_time: data.challenge.exec_time,
              path: _path.split('；')[0] || _path.split(';')[0] || _path,
              last_compile_output: data.last_compile_output,
              test_sets_count: data.test_sets_count,
              sets_error_count: data.sets_error_count
            }
          });
        }
      } catch(err) {
        console.log(err);
      };
    });
  }
}

// 初始化
export const restoreWXCode = (identifier, params) => {
  return (dispatch) => {
    fetchRestoreWxCode(identifier, params).then(res => {
      console.log('点击了初始化代码: ', res);
      const {data} = res;
      dispatch({
        type: types.SHOW_WX_CODE_LOADING,
        payload: false
      })
      dispatch({
        type: types.GET_WXCODE_BY_IDENTIFIER,
        payload: data.content || ''
      });
    });
  }
}

// 更新编辑器代码
export const updateWXCodeForEditor = (code) => {
  return {
    type: types.UPDATE_WXCODE_FOR_EDITOR,
    payload: code
  }
}

export const updateWxCode = (path, identifier, userCode, game_id, evaluate = 0,) => {
  return fetchUpdateWxCode(identifier, {
    path,
    evaluate,
    content: userCode,
    game_id
  });
}
// 定时更新代码内容
export const updateWXCodeForInterval = (identifier, $path) => {
  return (dispatch, getState) => {
    const {wxCode, userCode, game_id, myIdentifier, path} = getState().wxcodeReducer;
    if (wxCode !== userCode) {
      updateWxCode(path, myIdentifier, userCode, game_id, 0).then(res => {
        dispatch({
          type: types.GET_WXCODE_BY_IDENTIFIER,
          payload: userCode
        });
      });
    }
  }
}

// 评测
export const evaluateWxCode = (identifier, path) => {
  return (dispatch, getState) => {
    const {
      userCode,
      wxCode,
      game_id,
      myIdentifier,
      exec_time,
      path,
      last_compile_output,
      test_sets_count,
      sets_error_count
    } = getState().wxcodeReducer;
    updateWxCode(path, myIdentifier, userCode, game_id, 1).then(res => {
      // build
      // const {} = res;
      console.log(res);
      const _resubmit = res.data.resubmit;
      const params = {
        first: 1,
        content_modified: userCode !== wxCode ? 1 : 0,
        sec_key: res.data.sec_key,
        resubmit: _resubmit
      }

      setTimeout(() => {
        // console.log(params);
        fetchWxCodeGameBuild(identifier, params).then(res => {
          const {status} = res.data;
          if (status === 1) {
            // 定时调用 game_status fetchWxCodeGameStatus
            let count = 1;
            const intervalTime = 500;
            let time_out = false;
            function wxCodeGameStatus (intervalTime, finalTime, count, timer) {
              const excuteTime = (count++) * intervalTime; // 当前执行时间
              console.log(finalTime, count, excuteTime);
              if ((excuteTime / 1000) > (finalTime + 1)) time_out = true;
              fetchWxCodeGameStatus(identifier, {resubmit: _resubmit, time_out}).then(r => {
                const { status, test_sets = [], gold, experience, next_game, sets_error_count, test_sets_count, last_compile_output} = r.data;
                if (+status > -1 || ((excuteTime / 1000) > (finalTime + 1))) {
                  clearInterval(timer);
                  timer = null;
                  dispatch({
                    type: types.SHOW_WX_CODE_LOADING,
                    payload: false
                  });
                  setTimeout(() => {
                    // 显示测试集弹框
                    // dispatch({
                    //   type: types.IS_SHOW_WXCODE_TEST_CASES,
                    //   payload: true
                    // });
                    // 评测是否通过， 通过 弹通过，否则 弹测试集
                    if (status === 2 && sets_error_count === 0) {
                      dispatch({
                        type: types.SET_GOLD_AND_EXPERIENCE,
                        payload: {
                          gold,
                          experience,
                          next_game
                        }
                      });
                      dispatch({
                        type: types.SHOW_WX_CODE_DIALOG,
                        payload: true
                      });

                    } else {
                      dispatch({
                        type: types.IS_SHOW_WXCODE_TEST_CASES,
                        payload: true
                      });
                    }
                    dispatch({
                      type: types.GET_WXCODE_TEST_CASE,
                      payload: {
                        test_sets,
                        game_id,
                        myIdentifier,
                        exec_time,
                        path,
                        last_compile_output,
                        test_sets_count,
                        sets_error_count
                      }
                    });
                  }, 50);
                }
              }).catch(err => {
                dispatch({
                  type: types.SHOW_WX_CODE_LOADING,
                  payload: false
                });
              });
            }
            let timer = setInterval(() => {
              wxCodeGameStatus(intervalTime, exec_time, count++, timer);
            }, intervalTime);
          }
        })
      }, 50);

    }).catch(err => {
      dispatch({
        type: types.SHOW_WX_CODE_LOADING,
        payload: false
      });
    });
  }
}

// 显示测试集
export const showWXCodeTextCase = (flag) => {
  return {
    type: types.IS_SHOW_WXCODE_TEST_CASES,
    payload: flag
  }
}

// 显示测评中的状态
export const changeWXCodeEvaluateLoading = (flag) => {
  return {
    type: types.SHOW_WX_CODE_LOADING,
    payload: flag
  }
}

// 关闭对话框
export const changeWXCodeEvaluateDialog = (flag) => {
  return {
    type: types.SHOW_WX_CODE_DIALOG,
    payload: flag
  }
}
