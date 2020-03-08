/*
 * @Description: 微信端代码编辑器
 * @Author: tangjiang
 * @Github:
 * @Date: 2020-01-15 09:56:34
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-18 15:07:09
 */
import './index.scss';
import React, {useState, useEffect, useRef} from 'react';
import MonacoEditor from '@monaco-editor/react';
import { Input, Icon } from 'antd';
import { connect } from 'react-redux';
import actions from '../../redux/actions';
 import cookie from 'react-cookies';

const { TextArea } = Input;
const App = (props) => {

  const {
    isShow,
    wxCode,
    path,
    showLoading,
    showDialog,
    gold,
    experience,
    next_game,
    // userCode,
    testCase = [],
    getWXCode,
    last_compile_output,
    test_sets_count,
    sets_error_count,
    getWXCodeTestCase,
    restoreWXCode,
    updateWXCodeForEditor,
    updateWXCodeForInterval,
    evaluateWxCode,
    showWXCodeTextCase,
    changeWXCodeEvaluateLoading,
    changeWXCodeEvaluateDialog
  } = props;

  const {identifier} = props.match.params;
  // 获取路径参数
	const setCookier = () => {
		// const _params = window.location.search;
		// if (_params) {
		// 	let _search = _params.split('?')[1];
		// 	_search.split('&').forEach(item => {
		// 		// console.log(item);
		// 		const _arr = item.split('=');
		// 		cookie.remove(_arr[0], {
		// 			path: '/',
		// 			domain: '.educoder.net'
		// 		});
		// 		cookie.save(_arr[0], _arr[1], {
		// 			path: '/',
		// 			domain: '.educoder.net'
		// 		});
		// 	});
		// }
	}
  setCookier();
  const [isActive, setIsActive] = useState(-1);
  const [tip, setTip] = useState('');
  const [codes, setCodes] = useState(wxCode);
  // const [showInfo, setShowInfo] = useState(false);
  // const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (codes !== props.wxCode) {
      setCodes(props.wxCode);
    }
  }, [props]);
  const editorRef = useRef(null);
  let timer = null;

  const loadResult = (identifier) => {
    // 加载代码块内容
    getWXCode(identifier);
    // 加载测试集
    const params = {
      path,
      status: 0,
      retry: 1
    };
    getWXCodeTestCase(identifier, params);
  }
  useEffect(() => {
    setTimeout(() => {
      setCookier();
      loadResult(identifier);
    }, 0);
  }, []);
  // 关闭
  const handleCloseTestCase = () => {
    // setIsVisible(false);
    showWXCodeTextCase(false)
  }
  // 测试集
  const handleClickTestCase = () => {
    // setIsVisible(true);
    showWXCodeTextCase(true)
  }
  // 编辑器代码
  const handleEditorChange = (origin, monaco) => {
    editorRef.current = monaco; // 获取当前monaco实例
    // setEditCode(origin); // 保存编辑器初始值
    editorRef.current.onDidChangeModelContent(e => { // 监听编辑器内容的变化
      // TODO 需要优化 节流
      const val = editorRef.current.getValue();
      // console.log('编辑器代码====>>>>', val);
      // updateWXCodeForEditor(val);
      codeChange(val);
    });
  };

  const codeChange = (code) => {
    // console.log(code);
    updateWXCodeForEditor(code);
    if (!timer) {
      timer = setInterval(function () {
        clearInterval(timer);
        timer = null;
        // 调用更新代码
        updateWXCodeForInterval(identifier, path);
      }, 5000);
    }
  }

  // 关闭单个测试集
  const handleCloseItem = (i, flag) => {
    if (!flag) return;
    setIsActive(isActive === i ? -1 : i);
  }
  // 初始化
  const handleResetCode = () => {
    clearInterval(timer);
    timer = null;
    const result = window.confirm('你在本文件中修改的内容将丢失, 是否确定重新加载初始代码？');
    if (result) {
      setTip('初始化中...');
      changeWXCodeEvaluateLoading(true);
      identifier && restoreWXCode(identifier, { path });
    }
  }
  // 评测
  const handleEvalateCode = () => {
    changeWXCodeEvaluateLoading(true);
    evaluateWxCode(identifier, path);
    setTip('评测中...');
  }

  // 关闭弹框
  const handleCloseDialog = () => {
    changeWXCodeEvaluateDialog(false);
  }

  // 查看测试集
  const handleClickShowResult = () => {
    showWXCodeTextCase(true);
    changeWXCodeEvaluateDialog(false);
  }

  // 下一关
  const handleClickNext = () => {
    changeWXCodeEvaluateDialog(false);
    loadResult(next_game);
  }

  const tcclasses = isShow ? `wx-code-test-case active` : 'wx-code-test-case';
  const loading = showLoading ? 'code-evaluate-loading active' : 'code-evaluate-loading';
  const dialog = showDialog ? 'pass-dialog active' : 'pass-dialog';
  const _val = +sets_error_count === 0;
  let resultTxt = (_val) ? '全部通过' : `${sets_error_count}组测试结果不匹配`;
  const iclasses = _val ? 'iconfont icon-wancheng icon success' : 'iconfont icon-tishi1 icon fail';
  const tclasses = _val ? 'result-txt success' : 'result-txt fail';
  const ulClasses = !!last_compile_output ? 'case-list hasResult' : 'case-list';
  const resultFlag = !!last_compile_output ? 'wxcode-test-result active' : 'wxcode-test-result';
  // console.log('==========>>>>>>>> 评测结果样式', last_compile_output, resultFlag);
  return (
    <div className="wx-code-area">
      <div className="wx-code-flex">
        <div className="wx-code-item">
          <MonacoEditor
            height="100%"
            width="100%"
            language="python"
            value={codes}
            options={{
              selectOnLineNumbers: true,
              automaticLayout: true,
              fontSize: `42px`
            }}
            theme='dark'
            editorDidMount={handleEditorChange}
          />
        </div>
        <div className="wx-code-test">
          <div className="flex-btn">
            <span className="icon-btn" onClick={handleResetCode}>
              <i className="iconfont icon-chushihua icon"></i>
              <span className="icon-txt">初始化</span>
            </span>
            <span className="icon-btn" onClick={handleClickTestCase}>
              <i className="iconfont icon-ceshiji icon"></i>
              <span className="icon-txt">测试集</span>
            </span>
          </div>
          {/* <Button type="primary" shape="circle">评测</Button> */}
          <button className="wx-pt-btn" onClick={handleEvalateCode}>评测</button>
        </div>
      </div>
      {/* 测试集 */}
      <div className={tcclasses}>
        <div className="text-case-list">
          <div className="list-header">
            <span className="header-title">共{testCase.length}个测试用例</span>
            <span className="header-close" onClick={handleCloseTestCase}>关闭</span>
          </div>
          <div className={resultFlag}>
            <i className={iclasses}></i>
            <span className={tclasses}>{test_sets_count - sets_error_count}/{test_sets_count}</span>
            <span className={`${tclasses} result-txt-desc`}>{resultTxt}</span>
          </div>
          <ul className={ulClasses}>
            {
              testCase.map((item, i) => {
                const {input, output, actual_output, is_public, result, compile_success} = item;
                const _classes = isActive === i ? 'case-item-desc active' : 'case-item-desc';
                const iconclasses = isActive === i ? 'iconfont icon-sanjiaoxing-down icon active' : 'iconfont icon-triangle icon';
                const headerClasses = is_public ? 'item-header-desc active' : 'item-header-desc';
                // console.log(_classes);
                return (
                  <li className="case-item" key={`item_${i}`}>
                    <div className="case-item-header" onClick={() => handleCloseItem(i, is_public)}>
                      <h2 className={headerClasses}>
                        <i className={iconclasses}></i>
                        测试集{i + 1}
                      </h2>
                      {
                        is_public
                          ? compile_success > 0
                            ? result ? <span className="iconfont icon-wancheng case_item_success"></span>
                                     : <span className="iconfont icon-jinggao1 case_item_fail"></span>
                            : ''
                          :
                            <span className="case-item-tips">隐藏测试集，暂不支持解锁和查看 </span>
                        // is_public
                        //   ? result ? <span className="iconfont icon-wancheng case_item_success"></span>
                        //            : <span className="iconfont icon-jinggao1 case_item_fail"></span>)
                        //   : (
                        //       隐藏测试集，暂不支持解锁和查看
                        //       {/* {result
                        //         ? <span className="iconfont icon-wancheng case_item_success"></span>
                        //         : <span className="iconfont icon-jinggao1 case_item_fail"></span>
                        //       } */}
                        //     </span>)
                      }
                    </div>

                    <div className={_classes}>
                      <span className="desc-title">测试输入</span>
                      <span className="test-input">{input || '-'}</span>
                      <span className="desc-title">预期输出</span>
                      {/* <textarea rows="5">预期输出</textarea> */}
                      <TextArea
                        readOnly={true}
                        className="text-area-style"
                        value={output}
                        onChange={this.onChange}
                        placeholder="Controlled autosize"
                        autoSize={{ minRows: 3, maxRows: 6 }}
                      />
                      {/* <TextArea rows={5} className="hope-result">预期输出</TextArea> */}
                      <span className="desc-title">实际输出</span>
                      <TextArea
                        readOnly={true}
                        className="text-area-style"
                        value={actual_output}
                        autoSize={{ minRows: 1, maxRows: 3 }}
                      />
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
      {/* 测评中 */}
      <div className={loading}>
        <span className="loading-flex">
          <Icon className="loading-icon" type="loading" />
          <span className="loading-txt">{tip}</span>
        </span>
      </div>
      {/* 通过弹框 */}
      <div className={dialog}>
        <div className="pass-box">
          <div className="pass-img"></div>
          <div className="pass-ctx">
          <div className="pass-title">{next_game ? '评测通过' : '恭喜通关'}</div>
            <p className="pass-value">
              金币 <span className="value_color">{gold > 0 ? `+${gold}` : 0}</span>,
              经验值 <span className="value_color">{experience > 0 ? `+${experience}` : 0}</span>
            </p>
            {
              next_game
                ? (
                  <div className="pass-btn">
                    <button className="btn btn-first" onClick={handleClickShowResult}>评测结果</button>
                    <button className="btn btn-second" onClick={handleClickNext}>下一关</button>
                  </div>
                )
                : (
                  <div className="pass-btn-all">
                    <button className="btn btn-second" onClick={handleClickShowResult}>评测结果</button>
                  </div>
                )
            }
          </div>
        </div>
        <i className="iconfont icon-roundclose icon_close" onClick={handleCloseDialog}></i>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const {
    path,
    isShow,
    wxCode,
    userCode,
    gold,
    experience,
    next_game,
    testCase,
    showLoading,
    showDialog,
    last_compile_output,
    test_sets_count,
    sets_error_count
  } = state.wxcodeReducer;
  // console.log(state);
  return {
    path,
    isShow,
    wxCode,
    userCode,
    gold,
    experience,
    next_game,
    testCase,
    showLoading,
    showDialog,
    last_compile_output,
    test_sets_count,
    sets_error_count
  };
}

const mapDispatchToProps = (dispatch) => ({
  getWXCode: (identifier) => dispatch(actions.getWXCode(identifier)),
  getWXCodeTestCase: (identifier, params) => dispatch(actions.getWXCodeTestCase(identifier, params)),
  restoreWXCode: (identifier, params) => dispatch(actions.restoreWXCode(identifier, params)),
  updateWXCodeForEditor: (code) => dispatch(actions.updateWXCodeForEditor(code)),
  updateWXCodeForInterval: (identifier, path) => dispatch(actions.updateWXCodeForInterval(identifier, path)),
  evaluateWxCode: (identifier, path) => dispatch(actions.evaluateWxCode(identifier, path)),
  showWXCodeTextCase: (flag) => dispatch(actions.showWXCodeTextCase(flag)),
  changeWXCodeEvaluateLoading: (flag) => dispatch(actions.changeWXCodeEvaluateLoading(flag)),
  changeWXCodeEvaluateDialog: (flag) => dispatch(actions.changeWXCodeEvaluateDialog(flag))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
