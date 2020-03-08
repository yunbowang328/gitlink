/*
 * @Description: 开发者社区编辑模块
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-20 16:35:46
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-07 16:45:34
 */
import types from './actionTypes';
import CONST from '../../constants';
import { 
  fetchPostOjForm,
  fetchGetOjById,
  publishTask,
  cancelPublicTask,
  fetchQuestion,
  fetchTagDisciplines
} from '../../services/ojService';
import { Base64 } from 'js-base64';
import { notification } from 'antd';
import { toStore } from 'educoder'; 
// import { startProgramQuestion } from ''
const { jcLabel } = CONST;
// 表单字段映射
const maps = {
  name: {
    label: jcLabel['name'],
    type: types.VALIDATE_OJ_NAME
  },
  language: {
    label: jcLabel['language'],
    type: types.VALIDATE_OJ_LANGUAGE
  },
  description: {
    label: jcLabel['description'],
    type: types.VALIDATE_OJ_DESCRIPTION
  },
  difficult: {
    label: jcLabel['difficult'],
    type: types.VALIDATE_OJ_DIFFICULT
  },
  timeLimit: {
    label: jcLabel['timeLimit'],
    type: types.VALIDATE_OJ_TIMELIMIT
  },
  category: {
    label: jcLabel['category'],
    type: types.VALIDATE_OJ_CATEGORY
  },
  sub_discipline_id: {
    label: jcLabel['sub_discipline_id'],
    type: types.VALIDATE_OJ_SUB_DISCIPLINE_ID
  },
  openOrNot: {
    label: jcLabel['openOrNot'],
    type: types.VALIDATE_OJ_OPENORNOT
  },
  input: {
    label: '输入'
  },
  output: {
    label: '输出'
  }
};

// 非空校验
const emptyValidate = (key, value) => {
  const reg = /^[\s\S]*.*[^\s][\s\S]*$/;
  if (!reg.test(value)) {
    return {
      [key]: {
        validateStatus: 'error',
        errMsg: `${maps[key].label}不能为空`
      }
    }
  } else {
    return {
      [key]: {
        validateStatus: '',
        errMsg: ''
      }
    }
  }
};

// 组装字段值及校验信息
const payloadInfo = (key, value, errMsg, validateInfo) => ({
  ojForm: {
    [key]: errMsg ? '' : value
  },
  ojFormValidate: {
    [key]: validateInfo
  }
});

// 接口调用成功后，跳转至列表页
// function linkToDev (dispatch, props) {
//   toStore('oj_description', '');
//   dispatch({
//     type: types.IS_MY_SOURCE,
//     payload: true
//   });
//   setTimeout(() => {
//     props.history.push('/problems');
//   }, 1000);
// }

// 表单提交验证
export const validateOjForm = (props, type, cb) => {
  return (dispatch, getState) => {
    const {ojForm, testCases, identifier, code } = getState().ojFormReducer;
    // console.log('code', code);
    /** 表单验证开始  */
    // let keys = Object.keys(ojForm).filter(k => k !== '');
    let keys = Object.keys(ojForm)
    // 循环判断每个字段是否为空
    let hasSuccess = true;
    keys.forEach(key => {
      if (!['category'].includes(key)) {
        const value = ojForm[key];
        const validateResult = emptyValidate(key, value);
        const errMsg = validateResult[key].errMsg;
        if (errMsg) {
          hasSuccess = false;
          dispatch(
            {
              type: maps[key].type, 
              payload: payloadInfo(key, value, errMsg, validateResult[key])
            }
          )
        }
      }
    });
    // 验证测试用例中的数组是否都有对应的值
    const tcValidResult = [];
    // 验证测试用例： 1.必须要有输出值 2. 输入值与输出值必须唯一
    testCases.forEach((obj, i) => {
      let tempObj = {};
      ['input', 'output'].forEach(key => {
        const value = obj[key];
        // 非空校验
        let validateResult = emptyValidate(key, value);
        const errMsg = validateResult[key].errMsg;
        if (errMsg) {
          hasSuccess = false;
        } else {
          // 唯一性校验
          const bool = testCases.some((item, j) => {
            if (i > j && key === 'input') {
              return (item[key] === value);
            } else {
              return false;
            }
          });

          if (bool) {
            hasSuccess = false;
            validateResult = {
              [key]: {
                validateStatus: 'error',
                errMsg: `与测试用例${i}的输入值重复了，请重新填写`
              }
            };
          }
        }
        Object.assign(tempObj, validateResult);
      });
      tcValidResult.push(tempObj);
    });

    if (testCases.length === 0) {
      hasSuccess = false;
      notification['error']({
        message: '提示',
        description: '测试用例必须输入!'
      });
    }
    
    // if (!code) {
    //   hasSuccess = false;
    //   notification['error']({
    //     message: '必填',
    //     description: '代码块内容必须输入!'
    //   });
    // }
    // 更改测试用例验证结果
    dispatch({
      type: types.UPDATE_TEST_AND_VALIDATE,
      payload: {
        testCaseValidate: tcValidResult
      }
    });
    // 验证成功后，调用提交接口
    if (!hasSuccess) {
      dispatch({ // 提交
        type: types.SUBMIT_LOADING_STATUS,
        payload: false
      });
      dispatch({ // 发布
        type: types.PUBLISH_LOADING_STATUS,
        payload: false
      });
    }
    /** 表单验证结束 */
    /** 表单验证通过后，调用保存 or 更新 or 发布  */
    if (hasSuccess) {
      // console.log('表单保存的数据为: ', getState());
      const {ojFormReducer} = getState();
      const {code, score, ojForm, testCases = [], tag_discipline_id = []} = ojFormReducer;
      const {category, description, difficult, language, name, openOrNot, timeLimit, sub_discipline_id} = ojForm;
      let paramsObj = {};
      const hack = { // 编程题干
        name,
        description: JSON.stringify(description),
        difficult,
        category,
        'open_or_not': openOrNot,
        'time_limit': timeLimit,
        sub_discipline_id,
        // tag_discipline_id,
        score
      };

      const hack_codes = { // 代码区域参数
        code: Base64.encode(code),
        language
      };

      if (!identifier) { // 新增
        const tempTc = testCases.map(tc => {
          delete tc.isAdd
          return tc;
        });
        paramsObj['params'] = {
          hack,
          hack_sets: tempTc,
          hack_codes,
          tags: tag_discipline_id
        }
        paramsObj['submitType'] = 'add';
      } else { // 存在时调用更新接口
        const update_hack_sets = []; // 编辑的测试集
        const hack_sets = []; // 新增的测试集
        testCases.forEach(tc => {
          if (tc.isAdd) { // 新增
            delete tc.isAdd;
            hack_sets.push(tc);
          } else {
            delete tc.isAdd;
            update_hack_sets.push(tc);
          }
        });
        paramsObj['params'] = {
          hack,
          hack_sets,
          hack_codes,
          update_hack_sets,
          tags: tag_discipline_id
        }
        paramsObj['submitType'] = 'update';
        paramsObj['identifier'] = identifier;
      }

      // 先调用保存接口
      fetchPostOjForm(paramsObj).then(res => {
        if (res.status === 200) { // 保存成功后，重新跳转至列表页
          if (res.data.status === 0) {
            // 改变按钮loading状态
            dispatch({
              type: types.SUBMIT_LOADING_STATUS,
              payload: false
            });
            if (type === 'publish') {
              publishTask(identifier).then(res => {
                dispatch({
                  type: types.PUBLISH_LOADING_STATUS,
                  payload: false
                });

                if (res.data.status === 0) {
                  // message.success('发布成功!');
                  notification.success({
                    message: '提示',
                    description: '发布成功!'
                  });
                  // linkToDev(dispatch, props);
                  // 改变发布状态值 0 => 1
                  dispatch({
                    type: types.CHANGE_PUBLISH_VALUE,
                    payload: 1
                  });
                }
              }).catch(() => {
                dispatch({
                  type: types.PUBLISH_LOADING_STATUS,
                  payload: false
                });
              });
            } else if (type === 'challenge') {
              cb && cb();
            } else {
              const {identifier} = res.data;
              
              // message.success(paramsObj['submitType'] === 'update' ? '更新成功' : '保存成功');
              notification.success({
                message: '提示',
                description: paramsObj['submitType'] === 'update' ? '更新成功' : '保存成功'
              });
              // 保存成功后的identifier
              identifier && dispatch({
                type: types.SAVE_OJ_FORM_ID,
                payload: identifier
              });
              
              console.log(identifier , props.identifier);
              if (identifier || props.identifier) {
                dispatch(getOJFormById(identifier || props.identifier));
              }
              // 保存成功后，调用编辑接口并改变路
              if (paramsObj['submitType'] === 'add' && identifier) {
                
                props.history.push(`/problems/${identifier}/edit`);
              };
            }
            // 保存或更新后，调用start接口
            // linkToDev(dispatch, props);
          }
        }}
      ).catch(err => {
        dispatch({
          type: types.SUBMIT_LOADING_STATUS,
          payload: false
        });
        dispatch({
          type: types.PUBLISH_LOADING_STATUS,
          payload: false
        });
      });
      // 调用保存或更新
      // if (type === 'publish') {
      //   // 提示发布信息
      //   publishTask(identifier).then(res => {
      //     dispatch({
      //       type: types.PUBLISH_LOADING_STATUS,
      //       payload: false
      //     });

      //     if (res.data.status === 0) {
      //       // message.success('发布成功!');
      //       notification.success({
      //         message: '提示',
      //         description: '发布成功!'
      //       });
      //       // linkToDev(dispatch, props);
      //       // 改变发布状态值 0 => 1
      //       dispatch({
      //         type: types.CHANGE_PUBLISH_VALUE,
      //         payload: 1
      //       });
      //     }
      //   }).catch(() => {
      //     dispatch({
      //       type: types.PUBLISH_LOADING_STATUS,
      //       payload: false
      //     });
      //   });
      // } else {
      //   // 调用更新
      //   fetchPostOjForm(paramsObj).then(res => {
      //     if (res.status === 200) { // 保存成功后，重新跳转至列表页
      //       if (res.data.status === 0) {
      //         // 改变按钮loading状态
      //         dispatch({
      //           type: types.SUBMIT_LOADING_STATUS,
      //           payload: false
      //         });
      //         // message.success(paramsObj['submitType'] === 'update' ? '更新成功' : '保存成功');
      //         notification.success({
      //           message: '提示',
      //           description: paramsObj['submitType'] === 'update' ? '更新成功' : '保存成功'
      //         });
      //         const {identifier} = res.data;
      //         // 保存成功后的identifier
      //         identifier && dispatch({
      //           type: types.SAVE_OJ_FORM_ID,
      //           payload: identifier
      //         });
      //         // 保存或更新后，调用start接口
      //         // linkToDev(dispatch, props);
      //       }
      //     }}
      //   ).catch(err => {
      //     dispatch({
      //       type: types.SUBMIT_LOADING_STATUS,
      //       payload: false
      //     });
      //   });
      // }
    }
  }
};
// 撤销发布
export const handleClickCancelPublish = (props, identifier) => {
  return (dispatch) => {
    cancelPublicTask(identifier).then(res => {
      dispatch({
        type: types.PUBLISH_LOADING_STATUS,
        payload: false
      });
      if (res.status = 200) {
        const { data} = res;
        if (data.status === 0) {
          // message.success('撤销发布成功!');
          notification.success({
            message: '提示',
            description: '撤销发布成功!'
          });
          // 改变发布状态值
          dispatch({
            type: types.CHANGE_PUBLISH_VALUE,
            payload: 0
          });
          // linkToDev(dispatch, props);
        }
      }
    }).catch(() => {
      dispatch({
        type: types.PUBLISH_LOADING_STATUS,
        payload: false
      });
    })
  }
}
// 保存提交的代码
export const saveOjFormCode = (value) => {
  return {
    type: types.SAVE_OJ_FORM_CODE,
    payload: value
  };
}
// 验证任务名称 
export const validateOJName = (value) => {
  const validate = emptyValidate('name', value)['name'];
  const errMsg = validate.errMsg;
  return {
    type: types.VALIDATE_OJ_NAME,
    payload: payloadInfo('name', value, errMsg, validate)
  }
};
// 验证编程语言
export const validateOjLanguage = (value) => {
  const validate = emptyValidate('language', value)['language'];
  const errMsg = validate.errMsg;
  return {
    type: types.VALIDATE_OJ_LANGUAGE,
    payload: payloadInfo('language', value, errMsg, validate)
  }
};
// 验证描述
export const validateOjDescription = (value) => {
  // createAction('description', value, types.VALIDATE_OJ_DESCRIPTION);
  const validate = emptyValidate('description', value)['description'];
  const errMsg = validate.errMsg;
  return {
    type: types.VALIDATE_OJ_DESCRIPTION,
    payload: payloadInfo('description', value, errMsg, validate)
  }
};
// 验证难易度
export const validateOjDifficult = (value) => {
  // createAction('difficult', value, types.VALIDATE_OJ_DIFFICULT);
  const validate = emptyValidate('difficult', value)['difficult'];
  const errMsg = validate.errMsg;
  return {
    type: types.VALIDATE_OJ_DIFFICULT,
    payload: payloadInfo('difficult', value, errMsg, validate)
  }
};
// 验证时间限制
export const validateOjTimeLimit = (value) => {
  // createAction('timeLimit', value, types.VALIDATE_OJ_TIMELIMIT);
  const validate = emptyValidate('timeLimit', value)['timeLimit'];
  const errMsg = validate.errMsg;
  return {
    type: types.VALIDATE_OJ_TIMELIMIT,
    payload: payloadInfo('timeLimit', value, errMsg, validate)
  }
};
// 验证分类
export const validateOjCategory = (value) => {
  // createAction('category', value, types.VALIDATE_OJ_CATEGORY);
  const validate = emptyValidate('category', value)['category'];
  const errMsg = validate.errMsg;
  return {
    type: types.VALIDATE_OJ_CATEGORY,
    payload: payloadInfo('category', value, errMsg, validate)
  }
};
// 验证方向
export const validateOjSubDisciplineId = (value) => {
  const validate = emptyValidate('sub_discipline_id', value)['sub_discipline_id'];
  const errMsg = validate.errMsg;
  return {
    type: types.VALIDATE_OJ_SUB_DISCIPLINE_ID,
    payload: payloadInfo('sub_discipline_id', value, errMsg, validate)
  }
};
// 验证公开程序
export const validateOpenOrNot = (value) => {
  const validate = emptyValidate('openOrNot', value)['openOrNot'];
  const errMsg = validate.errMsg;
  return {
    type: types.VALIDATE_OJ_OPENORNOT,
    payload: payloadInfo('openOrNot', value, errMsg, validate)
  }
};
// 保存知识点
export const saveTagDisciplineId = (value) => {
  // console.log('====????????????', value);
  return {
    type: types.SAVE_TAG_DISCIPLINE_ID,
    payload: value
  };
}
// 新增测试用例
export const addTestCase = (obj) => {
  return {
    type: types.ADD_TEST_CASE,
    payload: obj
  }
}
// 删除测试用例
export const deleteTestCase = (obj) => {
  return {
    type: types.DELETE_TEST_CASE,
    payload: obj
  }
}
// 根据id号编辑OJ
export const getOJFormById = (id) => {
  return (dispatch) => {
    fetchGetOjById(id).then(res => {
      // console.log('获取OJ表单信息成功: ', res);
      dispatch({
        type: types.SAVE_EDIT_OJ_FORM_AND_TEST_CASE,
        payload: res.data
      });
      // 保存用户信息
      dispatch({
        type: types.SAVE_USER_INFO,
        payload: res.data.user
      });
    });
  }
}
// 保存表单 id 信息
export const saveOJFormId = (id) => {
  return {
    type: types.SAVE_OJ_FORM_ID,
    payload: id
  }
}
// 清空值
export const clearOJFormStore = () => {
  return {
    type: types.CLEAR_JSFORM_STORE
  }
}

// 测试用例输入值改变时
export const testCaseInputChange = (value, index) => {
  return (dispatch, getState) => {
    // 非空校验
    let validate = emptyValidate('input', value)['input'];
    if (!validate.errMsg) {
      // 唯一性校验
      let _errMsg = '';
      const {testCases} = getState().ojFormReducer;
      const bool = testCases.some((item, i) => {
        if (i !== index) {
          if (item['input'] === value) {
            _errMsg=`与测试用例${i + 1}的输入值重复了，请重新填写`;
          }
          return item['input'] === value;
        } else {
          return false;
        }
      });
      if (bool) {
        validate =  {
          validateStatus: 'error',
          errMsg: _errMsg
        };
      }
    }
    dispatch({
      type: types.TEST_CASE_INPUT_CHANGE,
      payload: {
        input: validate,
        value,
        index
      }
    });
  }
}

// 测试用例输出值改变时
export const testCaseOutputChange = (value, index) => {
  const validate = emptyValidate('output', value)['output'];
  return {
    type: types.TEST_CASE_OUTPUT_CHANGE,
    payload: {
      output: validate,
      value,
      index
    }
  }
  // return (dispatch, getState) => {
  //   // 非空校验
  //   let validate = emptyValidate('output', value)['output'];
  //   if (!validate.errMsg) {
  //     // 唯一性校验
  //     const {testCases} = getState().ojFormReducer;
  //     let _errMsg = '';
  //     const bool = testCases.some((item, i) => {
  //       if (i !== index) {
  //         // if (item['output'] === value) {
  //         //   _errMsg=`与测试用例${index}的输入值重复了，请重新填写`;
  //         // }
  //         return item['output'] === value;
  //       } else {
  //         return false;
  //       }
  //     });
  //     if (bool) {
  //       validate =  {
  //         validateStatus: 'error',
  //         errMsg: _errMsg
  //       };
  //     }
  //   }
  //   dispatch({
  //     type: types.TEST_CASE_OUTPUT_CHANGE,
  //     payload: {
  //       output: validate,
  //       value,
  //       index
  //     }
  //   });
  // }
}

// // 调试代码时，更改对应的状态值
// export const changeTestCodeStatus = () => {
// 更新测试用命及验证
export const updateTestAndValidate = (obj) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATE_TEST_AND_VALIDATE,
      payload: obj
    });
  }
  // return {
  //   type: types.UPDATE_TEST_AND_VALIDATE,
  //   payload: obj
  // }
}

// 更新测试用例索引
export const updateOpenTestCaseIndex = (value) => {
  return {
    type: types.UPDATE_OPEN_TESTCASE_INDEX,
    payload: value
  }
}

// 获取课程题库
export const getQuestion = (params) => {
  return (dispatch, getState) => {
    const {ojForm: {sub_discipline_id}} = getState().ojFormReducer;
    fetchQuestion(params).then(res => {
      const { data = {} } = res;
      const { disciplines = [] } = data;
      dispatch({
        type: types.GET_COURSE_QUESTION,
        payload: disciplines
      });
      // 如果课程id号存在， 同步更新知识点
      if (sub_discipline_id) {
        let temp_knowledges = [];
        disciplines.forEach(c => {
          if (sub_discipline_id && c.sub_disciplines) {
            c.sub_disciplines.forEach(sub => {
              if (+sub.id === sub_discipline_id) {
                temp_knowledges = sub.tag_disciplines || [];
              }
            });
          }
        });
        dispatch({
          type: types.CHANGE_KNOWLEDGES,
          payload: temp_knowledges
        })
      }
      // let temp_knowledges = [];
      // // console.log('选择的课程: =====>>>>>>', sub_discipline_id);
      // disciplines.forEach(c => {
      //   if (sub_discipline_id && c.sub_disciplines) {
      //     c.sub_disciplines.forEach(sub => {
      //       if (+sub.id === +sub_discipline_id) {
      //         temp_knowledges = sub.tag_disciplines || [];
      //       }
      //     });
      //   }
      // });
      // dispatch({
      //   type: types.CHANGE_KNOWLEDGES,
      //   payload: temp_knowledges
      // });
    });
  }
}

// 保存所选择的知识点
export const saveKnowledge = (values) => {
  return {
    type: types.CHANGE_KNOWLEDGES,
    payload: values
  }
}

/**
 * 新增时跳转到OJ时带的默认参数: 
 * @param {}} params 
 * { 
 *  difficult: '',  // 难易度
 *  sub_discipline_id: '' // 课程方向
 *  tag_discipline_id： [] 知识点
 * }
 */
export const setOjInitialValue = (params) => {
  return {
    type: types.SET_OJ_INITIAL_VALUE,
    payload: params
  }
}

// 新增知识点
export const tagDisciplines = (params) => {
  return (dispatch) => {
    fetchTagDisciplines(params).then(res => {
      // console.log('新增知识点成功======>>>>', res);
      if (res.data.status === 0) {
        notification.success({
          message: '提示',
          description: '新增知识点成功'
        });
        // 重新调用获取课程列表接口
        dispatch(getQuestion({
          source: 'question'
        }));
      }
    });
  }
} 
