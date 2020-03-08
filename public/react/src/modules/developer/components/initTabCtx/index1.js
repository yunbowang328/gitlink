/*
 * @Description: 显示tab中的内容 
 * @Author: tangjiang 
 * @Date: 2019-11-18 10:43:03 
 * @Last Modified by: tangjiang
 * @Last Modified time: 2019-11-18 11:35:12
 */
import './index.scss';
import React, { PureComponent } from 'react';
import { Icon, Form, Input } from 'antd';
import { connect } from 'react-redux';
import actions from '../../../../redux/actions';
const FormItem = Form.Item;
const { TextArea } = Input;
const tabCtx = (ctx, props) => (<p {...props}>{ctx}</p>);
const renderUserCase = (ctx, position, props) => {
  const {form: { getFieldDecorator }, testCases = []} = props;
  const testCase = testCases[0] || {}; // 获取第一个测试用例
  return (
    <Form className={'user_case_form'}>
      <FormItem
        className={'input_area flex_l'}
        label='输入'
      >
        {
          getFieldDecorator('input', {
            rules: [
              { required: true, message: '输入值不能为空'}
            ],
            initialValue: testCase.input
          })(<TextArea rows={5} />)
        }
      </FormItem>
      {/* <FormItem 
        className={'input_area flex_r'}
        label="输出">
        {
          getFieldDecorator('output', {
            rules: [
              {required: true, message: '输出值不能为空'}
            ],
            initialValue: testCase.output
          })(<Input />)
        }
      </FormItem> */}
    </Form>
  )
};
const defaultCtx = (<span className={'ctx_default'}>请在这里添加测试用例，点击“调试代码”时将从这里读取输入来测试你的代码...</span>)
const loadingCtx = (<span className={'ctx_loading'}><Icon className={'ctx_icon'} type="loading"/>加载中...</span>);
const loadedCtx = (<span className={'ctx_loaded'}><Icon className={'ctx_icon'} type="loading"/>加载完成</span>);
const maps = {
  // default: (ctx, position) => (<p className={`tab_ctx_area tab_ctx_default pos_${position}`}>{ctx}</p>),
  // loading: (ctx, position) => (<p className={`tab_ctx_area tab_ctx_loading pos_${position}`}>{ctx}</p>),
  // loaded: (ctx, position) => (<p className={`tab_ctx_area tab_ctx_loaded pos_${position}`}>{ctx}</p>),
  // final: (ctx, position) => (<p className={`tab_ctx_area tab_ctx_final pos_${position}`}>{ctx}</p>)
  // 无测试用例时，显示提示信息, ctx: 显示的信息, position: 显示信息的位置
  default: (ctx, position) => tabCtx(defaultCtx, { className: `tab_ctx_area tab_ctx_default pos_${position}` }),
  // 调度代码加载中
  loading: (ctx, position) => tabCtx(loadingCtx, { className: `tab_ctx_area tab_ctx_loading pos_${position}` }),
  // 调度代码加载完成
  loaded: (ctx, position) => tabCtx(loadedCtx, { className: `tab_ctx_area tab_ctx_loaded pos_${position}` }),
  // 显示结果
  final: (ctx, position) => tabCtx(ctx, { className: `tab_ctx_area tab_ctx_final pos_${position}` }),
  // 显示自定义测试用例面板
  userCase: (ctx, position, props) => renderUserCase(ctx, position, props)
}

class InitTabCtx extends PureComponent {

  state = {
    ctx: '',
    position: ''
  }

  handleTestCodeFormSubmit = (cb) => {
    const {form, debuggerCode} = this.props;
    console.log(debuggerCode);
    form.validateFields((err, values) => {
      if (!err) { // 表单验证通过时，调用测试接口
        cb && cb(); // 调用回调函数，切换 tab
        console.log('表单值:', values);
        debuggerCode(values);
      }
    });
  }

  componentDidMount () {
    const { testCases = []} = this.props;
    this.setState({
      status: testCases.length > 0 ? 'userCase' : 'default'
    });
  }

  render () {
    /**
     * @param state 当前状态  default: 显示提示信息 init: 加载初始内容  loading: 加载中  loaded: 加载完成 final: 显示最终内容
     * @param position: start | cetner | end
     * @param testCase: 自定义测试用例
     * @returns
     */
    const { testCodeStatus} = this.props;
    const { ctx, position } = this.state;
    // console.log('===>>>>> 测试用例集合: ', testCases);
    return(
      <React.Fragment>
        { maps[testCodeStatus](ctx, position, this.props) }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  const ojFormReducer = state.ojFormReducer;
  return {
    testCases: ojFormReducer.testCases, // 测试用例
    testCodeStatus: ojFormReducer.testCodeStatus
  };
};

const mapDispatchToProps = (dispatch) => ({
  debuggerCode: (value) => dispatch(actions.debuggerCode(value))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(InitTabCtx));
