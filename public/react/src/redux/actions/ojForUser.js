/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 13:42:11
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-09 14:14:47
 */
import types from "./actionTypes";
import { Base64 } from 'js-base64';
import { 
  fetchStartProgram,
  fetchUserProgramDetail,
  fetchDebuggerCode, 
  fetchCodeSubmit,
  fetchUserCommitRecord,
  fetchUserCommitRecordDetail,
  fetchUpdateCode,
  fetchUserCodeSubmit,
  fetchRestoreInitialCode,
  fetchAddNotes,
} from "../../services/ojService";
import { notification } from "antd";

// 进入编程页面时，首先调用开启编程题接口
export const startProgramQuestion = (id, props) => {
  return (dispatch) => {
    fetchStartProgram(id).then(res => {
      const { status, data } = res;
      if (status === 200) {
        const {identifier} = data;
        dispatch({
          type: types.SAVE_USER_PROGRAM_ID,
          payload: identifier
        });
        // 保存id值
        dispatch({
          type: types.SAVE_HACK_IDENTIFIER,
          payload: id
        });
        // 跳转至开启编程
        if (identifier) {
          // let data = Object.assign({}, props);
          // const path = {
          //   pathname: `/myproblems/${identifier}`,
          //   state: data
          // }
          // console.log(path);
          // props.history.push(`/myproblems/${identifier}`);
          props.history.push({
            pathname: `/myproblems/${identifier}`,
          });
        }
      }
    })
  }
}

// 保存 identifier, 防止刷新时读取不到
export const saveUserProgramIdentifier = (identifier) => {
  return {
    type: types.SAVE_USER_PROGRAM_ID,
    payload: identifier
  }
}

// 获取用户编程题详情
export const getUserProgramDetail = (identifier, type) => {
  // 调用用户编程详情接口
  return (dispatch) => {
    fetchUserProgramDetail(identifier).then(res => {
      const { status, data = {} } = res;
      if (status === 200) {
        if (data.status === 401) return;
        if (!type) {
          dispatch({
            type: types.USER_PROGRAM_DETAIL,
            payload: data
          });
        } else {
          dispatch({
            type: types.GET_COMMIT_RECORD_DETAIL_BY_ID,
            payload: data
          });
        }
        // 保存默认测试用例
        dispatch({
          type: types.SAVE_USE_TEST_CASE_VALUE,
          payload: data.test_case || {}
        });
        // 代码是否更新 
        let _modify_code = false;
        if (data.hack) {
          _modify_code = data.hack.modify_code;
        }
        dispatch({
          type: types.SAVE_NOTICE_COUNT,
          payload: _modify_code
        })
        // 保存用户登录信息
        dispatch({
          type: types.SAVE_USER_INFO,
          payload: data.user
        });
      }
    });
  }
}

export const saveUserCodeForInterval = (identifier, code) => {
  return (dispatch, getState) => {
    const { userCode } = getState().ojForUserReducer;
    dispatch({
      type: types.AUTO_UPDATE_CODE,
      payload: true
    });
    // console.log('+++', userCode);
    fetchUpdateCode(identifier, {
      code: Base64.encode(userCode)
    }).then(res => {
      if (res.data.status === 401) {
        return;
      };
      // dispatch({
      //   type: types.RESTORE_INITIAL_CODE,
      //   payload: userCode
      // });
      setTimeout(() => {
        dispatch({
          type: types.AUTO_UPDATE_CODE,
          payload: false
        })
      }, 1000);
      // console.log('代码保存成功', res);
    }).catch(() => {
      dispatch({
        type: types.AUTO_UPDATE_CODE,
        payload: false
      })
    });
  }
}

/**
 * @description 保存或更新之前先更新代码
 * @param {*} identifier 
 * @param {*} inputValue 输入值: 自定义 | 系统返回的
 * @param {*} type 测评类型 debug | submit
 */
export const updateCode = (identifier, inputValue, type) => {
  console.log(1111);
  return (dispatch, getState) => {
    const { userCode, isUpdateCode } = getState().ojForUserReducer;
    if (isUpdateCode) {
      fetchUpdateCode(identifier, {
        code: Base64.encode(userCode)
      }).then(res => {
        // 是否更新了代码, 目的是当代码没有更新时不调用更新代码接口，目录没有实现 
        // TODO 需要优化
        if (res.data.status === 401) {
          dispatch({ // 改变 loading 值
            type: types.LOADING_STATUS,
            payload: false
          });
          return;
        };
        dispatch({
          type: types.IS_UPDATE_CODE,
          flag: false
        });
        // debuggerCode(identifier, inputValue);
        dispatch(debuggerCode(identifier, inputValue, type));
      });
    } else {
      // 没有更新时，直接调用调试接口
      dispatch(debuggerCode(identifier, inputValue, type));
    }
  }
}

// 代码评测
export const codeEvaluate = (dispatch, identifier, type, time_limit, hackStatus, score, passed) => {
  // 调试代码成功后，调用轮循接口， 注意: 代码执行的时间要小于设置的时间限制
  const intervalTime = 500;
  let count = 1;
  /**
   * @param {*} excuteTime 执行时间
   * @param {*} finalTime  总时间 
   * @param {*} count  执行次数
   * @param {*} timer  定时器
   */
  function getCodeSubmit (intervalTime, finalTime, count, timer){
    const excuteTime = (count++) * intervalTime; // 当前执行时间
    fetchCodeSubmit(identifier, { mode: type }).then(res => {
      const { status } = res.data; // 评测返回结果
      // 清除定时器条件: 评测通过或者评测时间大于指定时间
      if (+status === 0 || (excuteTime / 1000) > (finalTime + 1)) {
        clearInterval(timer); // 清除定时器
        timer = null;
        let returnData = null;      
        if (status === 1) { // 结果没有返回
          returnData = {
            error_line: -1,
            error_msg: '',
            execute_memory: '',
            execute_time: finalTime,
            input: '',
            output: '',
            status: 2,
            expected_output: '',
            isPassed: false
          };
        } else { // 成功返回结果
          returnData = res.data.data;
        }
        // 返回评测结果
        dispatch({
          type: types.COMMIT_RECORD_DETAIL,
          payload: {
            type,
            data: returnData
          } 
        });
        if (!type || type === 'debug') {
          dispatch({ // 改变 loading 值
            type: types.LOADING_STATUS,
            payload: false
          });
          // 保存执行状态
          dispatch({
            type: types.TEST_CODE_STATUS,
            payload: 'finish'
          });
        } else {
          // 回滚提交按钮状态
          dispatch({
            type: types.SUBMIT_LOADING_STATUS,
            payload: false
          });
          // 改变tab值至提交记录(只在提交时才跳转，测评时，切换到代码执行结果就可以了)
          dispatch({
            type: types.CHANGE_USER_CODE_TAB,
            payload: 'record'
          });
          // 重新调用一下提交记录接口
          dispatch(getUserCommitRecord(identifier));
          dispatch(saveOpacityType(type));
          // 首次通过时，提示评测通过并获得金币
          // console.log('hack status ===>>', hackStatus);
          if (hackStatus === 1 && !passed && returnData.isPassed) {
            dispatch({
              type: types.UPDATE_HACK_PASSED,
              payload: true
            });
            notification.success({
              message: '提示',
              description: `恭喜您获得金币奖励: ${score}`
            });
          }
        }
      }
    }).catch(err => { // 评测异常时
      // 清除定时器
      clearInterval(timer);
      timer = null;
      // 回滚按钮状态
      if (!type || type === 'debug') {
        dispatch({ // 改变 loading 值
          type: types.LOADING_STATUS,
          payload: false
        });
      } else { // 回滚提交按钮状态
        dispatch({
          type: types.SUBMIT_LOADING_STATUS,
          payload: false
        });
      }
    });
  }
  // 开启定时器，调用监听接口
  let timer = setInterval(() => {
    getCodeSubmit(intervalTime, time_limit, count++, timer);
  }, intervalTime);
}

/**
 * @description 调试代码
 * @param {*} identifier 
 * @param {*} inputValue 输入值: 自定义 | 系统返回的
 * @param {*} type 测评类型 debug | submit
 */
export const debuggerCode = (identifier,value, type) => {
  return (dispatch, getState) => {
    // 调用之前 先保存 code 
    // TODO
    // console.log(identifier, value);
    const { hack } = getState().ojForUserReducer;
    if (!type || type === 'debug') {
      dispatch({ // 加载中...
        type: types.TEST_CODE_STATUS,
        payload: 'loading'
      });
    }

    fetchDebuggerCode(identifier, value).then(res => {
      // console.log('调用调试代码成功并返回结果: ', res);
      const { status } = res;
      if (status === 200) {
        if (res.data.status === 401) {
          dispatch({ // 改变 loading 值
            type: types.LOADING_STATUS,
            payload: false
          });
          return;
        };
        // 测评
        codeEvaluate(dispatch, identifier, type, hack.time_limit);
      }
    }).catch(() => {
      dispatch({
        type: types.TEST_CODE_STATUS,
        payload: 'error'
      });
      dispatch({
        type: types.LOADING_STATUS,
        payload: false
      });
      dispatch({
        type: types.SUBMIT_LOADING_STATUS,
        payload: false
      });
    });
  }
}

// 获取提交记录
export const getUserCommitRecord = (identifier) => {
  return (dispatch, getState) => {
    const { pages: { limit, page } } = getState().ojForUserReducer;
    fetchUserCommitRecord(identifier, {
      limit,
      page
    }).then(res => {
      const {status, data} = res;
      if (status === 200) {
        dispatch({
          type: types.COMMIT_RECORD,
          payload: data
        })
      }
    });
  }
}
// 获取提交记录详情
export const getUserCommitRecordDetail = (identifier) => {
  return (dispatch) => {
    fetchUserCommitRecordDetail(identifier).then(res => {
      // console.log('提交记录详情======》》》》', res);
      const { data } = res;
      if (data.status === 401) return;
      dispatch({
        type: types.GET_COMMIT_RECORD_DETAIL_BY_ID,
        payload: data
      });
      dispatch({
        type: types.CLICK_OPERATE_TYPE,
        payload: ''
      });
    });
  }
}

// 保存用户时时输入的代码
export const saveUserInputCode = (code) => {
  return {
    type: types.SAVE_USER_CODE,
    payload: code
  }
}

// 监听是否更新代码块内容
// export const isUpdateCodeCtx = (flag) => {
//   return {
//     type: types.IS_UPDATE_CODE,
//     payload: flag
//   };
// }

// 改变学员测评 tab 值
export const changeUserCodeTab = (key) => {
  return {
    type: types.CHANGE_USER_CODE_TAB,
    payload: key
  }
}

/**
 * @description 用户提交代码， 先调用保存代码接口，再调提交接口，成功后调用调试接口
 * @param {*} identifier 
 */
export const submitUserCode = (identifier, inputValue, type) => {
  return (dispatch, getState) => {
    const { userCode, isUpdateCode, hack} = getState().ojForUserReducer;

    function userCodeSubmit () {
      fetchUserCodeSubmit(identifier).then(res => {
        // console.log('用户提交代码成功======》》》》》', res);
        if (res.status === 200) {
          if (res.data.status === 401) {
            dispatch({
              type: types.SUBMIT_LOADING_STATUS,
              payload: false
            });
            return;
          };
          // 测评
          console.log('hack=====', hack);
          codeEvaluate(dispatch, identifier, type, hack.time_limit, hack.status, hack.score, hack.passed);
        }
      }).catch(() => {
        dispatch({
          type: types.SUBMIT_LOADING_STATUS,
          payload: false
        });
      });
    }
    if (isUpdateCode) {
      fetchUpdateCode(identifier, {
        code: userCode
      }).then(res => {
        // 是否更新了代码, 目的是当代码没有更新时不调用更新代码接口，目录没有实现 
        // TODO 需要优化
        if (res.data.status === 401) {
          dispatch({
            type: types.SUBMIT_LOADING_STATUS,
            payload: false
          });
          return;
        };
        dispatch({
          type: types.IS_UPDATE_CODE,
          flag: false
        });
        userCodeSubmit();
      }).catch(() => {
        dispatch({
          type: types.SUBMIT_LOADING_STATUS,
          payload: false
        })
      });
    } else {
      userCodeSubmit();
    }
  }
}

// 恢复初始代码
export const restoreInitialCode = (identifier, msg) => {
  return (dispatch) => {
    fetchRestoreInitialCode(identifier).then(res => {
      if (res.data.status === 401) return;
      // console.log('恢复初始代码====》》》》', res);
      const {status, data} = res;
      if (status === 200) {
        dispatch({
          type: types.RESTORE_INITIAL_CODE,
          payload: data.code
        });
        notification.success({
          message: '提示',
          description: msg
        });
        dispatch({
          type: types.SAVE_NOTICE_COUNT,
          payload: false
        });
      }
    });
  }
}

// 保存详情页面中的编辑代码
export const saveEditorCodeForDetail = (code) => {
  return {
    type: types.SAVE_EDITOR_CODE,
    payload: code
  }
}

// 保存操作类型: 提交或调试
export const saveOpacityType = (type) => {
  return {
    type: types.CLICK_OPERATE_TYPE,
    payload: type
  }
} 


export const clearOjForUserReducer = () => {
  return {
    type: types.CLEAR_OJ_FOR_USER_REDUCER
  };
}

export const changeRecordPagination = (page) => {
  return {
    type: types.CHANGE_RECORD_PAGINATION_PAGE,
    payload: page
  }
}
// 更新通知状态

// 添加笔记
export const addNotes = (identifier, params, cb) => {
  return (dispatch) => {
    fetchAddNotes(identifier, params).then(res => {
      // console.log('添加笔记成功===>>', res);
      dispatch({
        type: types.LOADING_STATUS,
        payload: false
      });
      const { data } = res;
      if (data.status === 0) {
        cb && cb();
        notification.success({
          message: '提示',
          description: '添加笔记成功'
        });
        dispatch({
          type: types.UPDATE_NOTE_CONTENT,
          payload: params.notes
        })
      }
    }).catch(() => {
      dispatch({
        type: types.LOADING_STATUS,
        payload: false
      });
    })
  }
}
