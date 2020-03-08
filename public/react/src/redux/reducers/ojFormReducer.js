/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-20 16:40:32
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-03 17:38:50
 */
import { Base64 } from 'js-base64';
import types from '../actions/actionTypes';

const init = {
  ojForm: {
    name: '', // 任务名称
    language: '',
    description: '',
    difficult: '',
    sub_discipline_id: '', // 方向 
    // category: '',
    // openOrNot: 1,
    timeLimit: 3
  },
  tag_discipline_id: [], // 知识点
  ojFormValidate: {
    name: {
      validateStatus: '',
      errMsg: ''
    },
    language: {
      validateStatus: '',
      errMsg: ''
    },
    description: {
      validateStatus: '',
      errMsg: ''
    },
    difficult: {
      validateStatus: '',
      errMsg: ''
    },
    // category: {
    //   validateStatus: '',
    //   errMsg: ''
    // },
    // openOrNot: {
    //   validateStatus: '',
    //   errMsg: ''
    // },
    sub_discipline_id: {
      validateStatus: '',
      errMsg: ''
    },
    timeLimit: {
      validateStatus: '',
      errMsg: ''
    }
  },
  testCases: [
    // {
    //   input: "",
    //   output: "",
    //   position: 1, // 当前测试用例位置
    //   isAdd: true // 是否是新增
    // }
  ], // 测试用例集合
  testCasesValidate: [], // 测试用例验证
  position: 1, // TODO 每次加载信息时同步指定positio值
  score: 200, // 分值： 选择难易度后自动计算分值  200 | 500 | 1000
  code: '', // 提交的代码
  showCode: '', // 编辑器显示的代码 
  identifier: '', // OJ表单id
  loading: false, // 僵尸loading标志
  testCodeStatus: 'default', // 调试代码状态  default(默认值) | loading(加载中) | loaded(加载完成) | userCase(用户自定义测试用例) | finish(测试完成)
  openTestCodeIndex: [0], // 展开的测试用例: 数组， 当出错时，展开所有出错的测试用例， 默认展开第一个
  isPublish: 0, // 是否是发布状态: 0 未发布 1 已发布
  courseQuestions: [], // 课程题库
  knowledges: [], // 知识点下拉值
}

const tcValidateObj = {
  input: {
    errMsg: '',
    validateStatus: ''
  },
  output: {
    errMsg: '',
    validateStatus: ''
  }
}

const scoreMaps = {
  1: 200,
  2: 500,
  3: 1000
};

const initialState = Object.assign({}, init);

const ojFormReducer = (state = initialState, action) => {
  let ojFormValidate = {};
  let ojForm = {};
  if (action.payload) {
    ojFormValidate = action.payload.ojFormValidate;
    ojForm = action.payload.ojForm;
  }

  const returnState = (state, ojForm, ojFormValidate) => {
    return {
      ...state,
      ojFormValidate: Object.assign({}, state.ojFormValidate, ojFormValidate),
      ojForm: Object.assign({}, state.ojForm, ojForm)
    };
  }
  switch (action.type) {
    case types.VALIDATE_OJ_FORM:      
      // 验证成功后，调用后台接口
      return returnState(state, ojForm, ojFormValidate);
    case types.SAVE_OJ_FORM_CODE:
      return {
        ...state,
        code: action.payload
      }
    case types.VALIDATE_OJ_NAME:
      // 验证任务名称
      return returnState(state, ojForm, ojFormValidate);
    case types.VALIDATE_OJ_DESCRIPTION:
      return returnState(state, ojForm, ojFormValidate);
    case types.VALIDATE_OJ_LANGUAGE:
      return returnState(state, ojForm, ojFormValidate);
    case types.VALIDATE_OJ_DIFFICULT:
      const curDifficult = action.payload.ojForm.difficult.trim();
      if (action.payload.ojForm.difficult) {
        state.score = scoreMaps[`${curDifficult}`];
      }
      return returnState(state, ojForm, ojFormValidate);
    case types.VALIDATE_OJ_CATEGORY:
      return returnState(state, ojForm, ojFormValidate);
    case types.VALIDATE_OJ_SUB_DISCIPLINE_ID:
      return returnState(state, ojForm, ojFormValidate);
    case types.VALIDATE_OJ_OPENORNOT:
      return returnState(state, ojForm, ojFormValidate);
    case types.VALIDATE_OJ_TIMELIMIT:
      return returnState(state, ojForm, ojFormValidate);
    case types.SAVE_TAG_DISCIPLINE_ID:
      return {
        ...state,
        tag_discipline_id: action.payload
      }
    case types.ADD_TEST_CASE:
      const { testCase, tcValidate } = action.payload;
      const tcArrs = state.testCases.concat([testCase]);
      const tcValidateArrs = state.testCasesValidate.concat([tcValidate]);
      state.position++; // 位置递增
      const len = tcArrs.length - 1;
      return {
        ...state,
        testCases: [...tcArrs],
        testCasesValidate: [...tcValidateArrs],
        openTestCodeIndex: [len] // 当前展开的测试用例
      };
    case types.DELETE_TEST_CASE:
      const { position } = action.payload;
      // 根据 position 去查找当前元素在数组中的位置
      const index = state.testCases.findIndex((item) => item.position === position);
      const tempTestCase = state.testCases || [];
      const tempTestValicate = state.testCasesValidate || [];
      if (index > -1) {
        tempTestCase.splice(index, 1); // 删除当前元素
        tempTestValicate.splice(index, 1); // 删除测试用例对应的校验
      }
      return {
        ...state,
        testCases: [...tempTestCase],
        testCasesValidate: [...tempTestValicate]
      };
    case types.SAVE_OJ_FORM_ID:
      // state.identifier = action.payload;
      return {
        ...state,
        identifier: action.payload
      }
    case types.SAVE_EDIT_OJ_FORM_AND_TEST_CASE:  // 保存编辑的值
      /**
       * 1. 将当前值保存至OJForm中
       * 2. 将当前的测试用例保存至 testCases中， 并增加 isAdd: false 属性
       * 3. 设置position的值, 即新增下一个测试用例的位置
       * 4. 自定义测试用例是否需要返回
       * 5. 代码执行的结果
       * 6. 更改测试用例状态
       * 7. 添加测试用例验证
       */
      const { code = '', description, language, name, hack_sets = [], time_limit, difficult, category, status, sub_discipline_id, tag_discipline_id } = action.payload;
      const { courseQuestions } = state;
      let desc = null;
      try {
        desc = JSON.parse(description)
      } catch (error) {
        desc = description;
      }
      const currentOjForm = {
        name, // 任务名称
        language,
        description: desc,
        difficult,
        category,
        openOrNot: 1,
        timeLimit: time_limit,
        sub_discipline_id
      };
      // state.code = code; // 保存代码块值
      let curPosition = 0;
      const curTestCases = [];
      const curTcValidates = [];
      hack_sets.forEach(hack => {
        if (hack.position > curPosition) {
          curPosition = hack.position;
        }
        curTcValidates.push(tcValidateObj); // 一个测试用例对应一个校验
        curTestCases.push(Object.assign({}, hack, { isAdd: false }));
        // state.testCases.push(Object.assign({}, hack, { isAdd: false }));
      });
      let cbcode = '';
      if (typeof code === 'string') {
        cbcode = Base64.decode(code);
      } else if (Array.isArray(code)) {
        cbcode = Base64.decode(code[code.length - 1]);
      }

      // console.log('++++>>>>>>>>>>>>>', courseQuestions);
      let temp_knowledges = [];
      courseQuestions.forEach(c => {
        if (sub_discipline_id && c.sub_disciplines) {
          c.sub_disciplines.forEach(sub => {
            if (+sub.id === +sub_discipline_id) {
              temp_knowledges = sub.tag_disciplines || [];
            }
          });
        }
      });
      // state.position = curPosition; // 计算下一个测试用例的位置值
      return {
        ...state,
        ojForm: currentOjForm,
        position: curPosition + 1,
        code: cbcode,
        testCases: curTestCases,
        testCasesValidate: curTcValidates,
        testCodeStatus: hack_sets.length > 0 ? 'userCase' : 'default',
        isPublish: status,
        showCode: cbcode,
        tag_discipline_id,
        knowledges: temp_knowledges
      }
    case types.CHANGE_PUBLISH_VALUE:
      return {
        ...state,
        isPublish: action.payload
      };
    case types.CLEAR_JSFORM_STORE:
      state = Object.assign({}, init);
      return {
        ...state
      }
    // case types.TEST_CODE_STATUS: 
    //   return {
    //     ...state,
    //     testCodeStatus: action.payload // 当前状态值
    //   }
    case types.VALIDATE_TEST_CODE_ARRS:
      return {
        ...state,
        testCasesValidate: action.payload
      }
    case types.TEST_CASE_INPUT_CHANGE:
      const { input } = action.payload;
      // 更新验证消息
      const curIOjTestValidate = state.testCasesValidate.map((tc, i) => {
        if (i === action.payload.index) {
          return Object.assign({}, tc, {input});
        }
        return tc;
      });
      let curITestValues = state.testCases.map((tc, i) => {
        if (i === action.payload.index) {
          return Object.assign({}, tc, { input: action.payload.value })
        }
        return tc;
      });
      return {
        ...state,
        testCasesValidate: [...curIOjTestValidate],
        testCases: [...curITestValues]
      }
    case types.TEST_CASE_OUTPUT_CHANGE:
        const { output } = action.payload;
        // 更新验证消息
        const curOOjTestValidate = state.testCasesValidate.map((tc, i) => {
          if (i === action.payload.index) {
            return Object.assign({}, tc, {output});
          }
          return tc;
        });
        let curOTestValues = state.testCases.map((tc, i) => {
          if (i === action.payload.index) {
            return Object.assign({}, tc, { output: action.payload.value })
          }
          return tc;
        });
      return {
        ...state,
        testCasesValidate: [...curOOjTestValidate],
        testCases: [...curOTestValues]
      }
    case types.UPDATE_TEST_AND_VALIDATE: // 保存或更新测试用例值
      const tempValitate = action.payload.testCaseValidate;
      const openColArrs = [];
      const curOjTestCaseValidate = state.testCasesValidate.map((tc, i) => {
        if (tempValitate[i].input.errMsg || tempValitate[i].output.errMsg) {
          openColArrs.push(i);
        }
        return Object.assign({}, tc, tempValitate[i]);
      });
      // console.log('+++++++++++', openColArrs);
      return {
        ...state,
        testCasesValidate: [...curOjTestCaseValidate],
        openTestCodeIndex: openColArrs
      }
    case types.UPDATE_OPEN_TESTCASE_INDEX:
      const tempArr = [];
      const tIndex = state.openTestCodeIndex.findIndex(i => i === action.payload);
      if (tIndex === -1) {
        tempArr.push(action.payload);
      }
      // console.log(tempArr);
      return {
        ...state,
        openTestCodeIndex: tempArr
      }
    case types.GET_COURSE_QUESTION:
      return {
        ...state,
        courseQuestions: action.payload
      }
    case types.CHANGE_KNOWLEDGES: {
      return {
        ...state,
        knowledges: action.payload
      }
    }
    case types.SET_OJ_INITIAL_VALUE:
      const _p = action.payload;
      return {
        ...state,
        ojForm: Object.assign({}, state.ojForm, {difficult: _p.difficult, sub_discipline_id: _p.sub_discipline_id}),
        tag_discipline_id: _p.tag_discipline_id || []
      }
    default:
      return state;
  }
}

export default ojFormReducer;
