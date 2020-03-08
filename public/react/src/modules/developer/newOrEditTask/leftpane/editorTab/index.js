/*
 * @Description:
 * @Author: tangjiang
 * @Github:
 * @Date: 2019-11-20 10:35:40
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-02-05 13:26:58
 */
import './index.scss';
// import 'katex/dist/katex.css';
import React from 'react';
import { Form, Input, Select, InputNumber, Button, Cascader, notification } from 'antd';
import { connect } from 'react-redux';
import AddTestDemo from './AddTestDemo';
// import QuillEditor from '../../../quillEditor';
import actions from '../../../../../redux/actions';
import CONST from '../../../../../constants';
import { toStore } from 'educoder'; // 保存和读取store值
// import Wrapper from '../../../../../common/reactQuill';
import QuillForEditor from '../../../../../common/quillForEditor';
import KnowLedge from '../../../components/knowledge';
const scrollIntoView = require('scroll-into-view');
const {jcLabel} = CONST;
const FormItem = Form.Item;
const { Option } = Select;
const maps = {
  language: [
    { title: (<span style={{ color: 'rgba(0, 0, 0, 0.35)' }}>请选择</span>), key: '' },
    { title: 'C', key: 'C' },
    { title: 'C++', key: 'C++' },
    { title: 'Python', key: 'Python' },
    { title: 'Java', key: 'Java' }
  ],
  difficult: [
    { title: (<span style={{ color: 'rgba(0, 0, 0, 0.35)' }}>请选择</span>), key: '' },
    { title: '简单', key: '1' },
    { title: '中等', key: '2'},
    { title: '困难', key: '3' }
  ],
  category: [
    { title: (<span style={{ color: 'rgba(0, 0, 0, 0.35)' }}>请选择</span>), key: '' },
    { title: '程序设计', key: '1' },
    { title: '算法', key: '2'}
  ],
  openOrNot: [
    { title: '公开', key: '1' },
    { title: '私有', key: '0' }
  ]
}
class EditTab extends React.Component {

  constructor (props) {
    super(props);
    // this.editorRef = React.createRef();
    this.scrollRef = React.createRef();
    this.headerRef = React.createRef();
    this.state = {
      scrollEl: null,
      targetEl: null,
      scrollHeight: 0, // 滚动元素的高度
      top: 500,
      bottom: 20,
      offsetTop: 0,
      showAdd: false
      // knowledges: [],
      // coursers: [] // 选中的课程
    }
  }

  componentDidMount () {

    const oWrap = document.getElementById('textCase');
    const scrollHeight = oWrap.offsetHeight;
    const oTarget = this.headerRef.current;
    const offsetTop = oTarget.offsetTop;
    this.setState({
      scrollEl: oWrap,
      targetEl: oTarget,
      offsetTop: offsetTop, // 记录初始位置
      scrollHeight,
    }, () => {
      this.state.scrollEl.addEventListener('scroll', this.handleScroll, false);
    });
    // 获取题库
    // this.props.getQuestion({
    //   source: 'question'
    // });
  }

  // componentDidUpdate (nextProp) {
  //   console.log(nextProp);
  // }

  componentWillUnmount (nextPro) {
    this.state.scrollEl.removeEventListener('scroll', this.handleScroll, false);
  }

  // 处理滚动
  handleScroll = (e) => {
    const oTarget = this.state.targetEl;
    const tOffsetTop = oTarget.offsetTop;
    const tOffsetHeight = oTarget.offsetHeight;
    const scrollTop = e.target.scrollTop;
    const { scrollHeight, offsetTop} = this.state;
    // 滚动距离 + 元素的高度 大于 offsetTop值时， 添加 fix_top 样式
    // console.log(tOffsetTop, tOffsetHeight, scrollTop, scrollHeight, offsetTop);
    if ((scrollTop + tOffsetHeight > tOffsetTop) && (tOffsetTop >= offsetTop)) {
      oTarget.className = `test_demo_title fix_top`;
    } else if ((scrollHeight + scrollTop < offsetTop) && (scrollHeight <= offsetTop)){
      oTarget.className = `test_demo_title`;
    } else if ((tOffsetTop < offsetTop) && (tOffsetTop + tOffsetHeight + scrollTop) < offsetTop) {
      oTarget.className = `test_demo_title`;
    }
  }

  // 改变任务名称
  handleNameChange = (e) => {
    const value = e.target.value;
    this.props.validateOJName(value);
  }
  // 改变语言
  handleLanguageChange = (value) => {
    this.props.validateOjLanguage(value);
  }
  // 改变描述信息
  handleChangeDescription = (value) => {
    // console.log('获取的编辑器内容为: ', value);
    // 描述信息变化时，将信息保存至store中
    toStore('oj_description', value);
    this.props.validateOjDescription(value);
  }
  // 改变难易度
  handleChangeDifficult = (value) => {
    this.props.validateOjDifficult(value);
  }
  // 改变时间限制
  handleTimeLimitChange = (value) => {
    this.props.validateOjTimeLimit(value);
  }
  // 改变方向
  handleChangeSubDisciplineId = (value) => {
    // 课程下拉值变化时， 同步更新知识点
    const { courseQuestions, saveKnowledge } = this.props;
    saveKnowledge([]);
    // 获取当前分类下的知识点
    courseQuestions.forEach(item => {
      if (value[0] && item.id === value[0]) {
        item.sub_disciplines && item.sub_disciplines.forEach(c => {
          if (value[1] && c.id === value[1]) {
            saveKnowledge(c.tag_disciplines)
          } else if (!value[1]) {
            saveKnowledge([]);
          }
        });
      }
    });
    this.setState({
      showAdd: value[1] ? true : false
    });
    // this.props.validateOjCategory(value[1] || '');
    this.props.validateOjSubDisciplineId(value[1] || '');
  }
  // 改变公开程序
  handleChangeOpenOrNot = (value) => {
    this.props.validateOpenOrNot(value);
  }
  // 滚动到底部
  scrollToBottom = () => {
    scrollIntoView(this.scrollRef.current);
  }

  render () {
    const { showAdd } = this.state;
 
    const {
      ojForm,
      ojFormValidate,
      // testCases = [], // 测试用例集合
      addTestCase, // 添加测试用例
      deleteTestCase, // 删除测试用例
      testCasesValidate,
      openTestCodeIndex = [],
      courseQuestions,
      tag_discipline_id,
      knowledges,
      tagDisciplines,
    } = this.props;
    // console.log('knowledge======>>>>>>', knowledges);
    // const {knowledges} = this.state;
    // 表单label
    const myLabel = (name, subTitle, nostar) => {
      if (subTitle) {
        return (
          <span className={`label_text ${nostar}`}>
            {name}
            <span className={'label_sub_text'}>
              ({subTitle})
            </span>
          </span>
        )
      } else {
        return (
          <span className={`label_text ${nostar}`}>{name}</span>
        )
      }
    };
    // 编程语言
    const getOptions = (key) => {
      return maps[key].map((opt, i) => {
        return (
          <Option value={opt.key} key={`opt_${i}`}>{opt.title}</Option>
        );
      });
    };
    // 提交测试用例
    const handleSubmitTest = (obj) => {
      // console.log('提交的测试用例: ', obj);
    };
    // 删除测试用例
    const handleDeleteTest = (obj) => {
      // console.log('删除的测试用例: ', obj);
      deleteTestCase(obj);
    };
    const renderTestCase = () => {
      return this.props.testCases.map((item, i) => {
        return <AddTestDemo
            key={`${i}`}
            isOpen={openTestCodeIndex.includes(i)}
            onSubmitTest={handleSubmitTest}
            onDeleteTest={handleDeleteTest}
            testCase={item}
            testCaseValidate={testCasesValidate[i]}
            index={i}
          />
        });
    };
    // 添加测试用例
    const handleAddTest = () => {
      const {position, testCases = []} = this.props;
      if (testCases.length >= 50) {
        notification.warning({
          message: '提示',
          description: '测试用例不能超过50个'
        });
        return;
      }
      const obj = { // 测试用例参数
        input: '',
        output: '',
        position: position,
        isAdd: true // 新增的测试用例
      }
      const validateObj = { // 测试用例验证参数
        input: {
          validateStatus: '',
          errMsg: ''
        },
        output: {
          validateStatus: '',
          errMsg: ''
        }
      }

      // this.scrollRef.current.scrollTo(1000);
      addTestCase({testCase: obj, tcValidate: validateObj});
      // TODO 点击新增时，需要滚到到最底部
      this.scrollToBottom();
    }

    // 描述信息变化时
    const handleContentChange = (content, quill) => {
      // console.log('描述信息为: ', content);
      const _text = quill.getText();
      const reg = /^[\s\S]*.*[^\s][\s\S]*$/;
      if (!reg.test(_text)) {
        this.handleChangeDescription('');
      } else {
        // 保存获取的描述信息至redux中
        this.handleChangeDescription(content);
      }
    }
    // 编辑器配置信息
    const quillConfig = [
      { header: 1}, {header: 2},
      // {size: ['12px', '14px', '16px', '18px', '20px', false]},
      'bold', 'italic', 'underline', 'strike',   // 切换按钮
      'blockquote', 'code-block', // 代码块
      {align: []}, { 'list': 'ordered' }, { 'list': 'bullet' }, // 列表
      { 'script': 'sub'}, { 'script': 'super' },
      { 'color': [] }, { 'background': [] },  // 字体颜色与背景色
      // {font: []},
      'image', 'formula', // 数学公式、图片、视频
      'clean', // 清除格式
      // 'fill',
    ];

    const renderCourseQuestion = (arrs) => {
      const tempArr = [];
      const sub_id = this.props.ojForm.sub_discipline_id;
      function loop (arrs, tempArr) {
        arrs.forEach(item => {
          const obj = {};
          obj.value = item.id;
          obj.label = item.name;
          // 当item下还有子元素时，递归调用
          if (item.sub_disciplines) {
            arrs = item.sub_disciplines;
            obj.children = [];
            loop(arrs, obj.children);
          }
          tempArr.push(obj);
        });
      }
      loop(arrs, tempArr);

      // 获取选中的下拉值
      let choid_ids = [];
      // let tempKnowledges = [];
      tempArr.forEach(t => {
        // debugger;
        if (sub_id && t.children) {
          t.children.forEach(c => {
            if (c.value === +sub_id) {
              choid_ids = [t.value, c.value];
              // tempKnowledges = c.children || [];
            }
          });
        }
      });

      return (
        <Cascader
          placeholder="请选择"
          options={tempArr}
          expandTrigger="hover"
          value={choid_ids}
          // onChange={this.handleChangeCategory}
          onChange={this.handleChangeSubDisciplineId}
        />
      )
    }

    // 知识点
    const handleKnowledgeChange = (values= []) => {
      const _result = [];
      values.forEach(v => {
        _result.push(v.id);
      });
      // console.log('下拉选择的值:===>>>', _result);
      // 保存选择的知识点
      this.props.saveTagDisciplineId(_result);
    }

    // 新增知识点
    const handleAddKnowledge = (values) => {
      // console.log('调用了新增知识点并返回了结果: ', values);
      // 获取课程id
      const {sub_discipline_id} = this.props.ojForm;
      const obj = Object.assign({}, values, {sub_discipline_id})
      tagDisciplines(obj);
    }
    
    return (
      <div className={'editor_area'} id="textCase">
        <Form className={'editor_form'}>
          <FormItem
            className={`input_area flex_50 flex_50_left`}
            label={<span>{myLabel(jcLabel['difficult'])}</span>}
            validateStatus={ojFormValidate.difficult.validateStatus}
            help={ojFormValidate.difficult.errMsg}
            colon={ false }
          >
            <Select onChange={this.handleChangeDifficult} value={`${ojForm.difficult}`}>
              {getOptions('difficult')}
            </Select>
          </FormItem>

          <FormItem
            className={`input_area flex_50 flex_50_right`}
            label={<span>{myLabel(jcLabel['sub_discipline_id'], '合理的课程分类有利于快速检索')}</span>}
            validateStatus={ojFormValidate.sub_discipline_id.validateStatus}
            help={ojFormValidate.sub_discipline_id.errMsg}
            colon={ false }
          >
            {/* <Select onChange={this.handleChangeCategory} value={`${ojForm.category}`}>
              {getOptions('category')}
            </Select> */}
            {/* <Cascader
              options={courseQuestions}
              expandTrigger="hover"
              onChange={this.handleChangeCategory}
            /> */}
            { renderCourseQuestion(courseQuestions)}
          </FormItem>

          <FormItem
            colon={ false }
            className='input_area flex_100'
            label={<span>{myLabel(jcLabel['knowledge'], '', 'nostar')}</span>}
          >
            <KnowLedge
              showAdd={showAdd}
              options={knowledges}
              values={tag_discipline_id}
              onChange={handleKnowledgeChange}
              addKnowledge={handleAddKnowledge}
            />
          </FormItem>

          <FormItem
            className={`input_area flex_50 flex_50_left`}
            label={<span>{myLabel(jcLabel['timeLimit'], '程序允许时间限制时长，单位：秒')}</span>}
            validateStatus={ojFormValidate.timeLimit.validateStatus}
            help={ojFormValidate.timeLimit.errMsg}
            colon={ false }
          >
            <InputNumber value={ojForm.timeLimit} min={0} max={5} style={{ width: '100%' }} onChange={this.handleTimeLimitChange}/>
          </FormItem>

          <FormItem
            className={`input_area flex_50 flex_50_right`}
            label={<span>{myLabel(jcLabel['language'])}</span>}
            validateStatus={ojFormValidate.language.validateStatus}
            help={ojFormValidate.language.errMsg}
            colon={ false }
          >
            <Select onChange={this.handleLanguageChange} value={`${ojForm.language}`}>
              {getOptions('language')}
            </Select>
          </FormItem>

          <FormItem
            className={`input_area flex_100`}
            label={<span>{myLabel(jcLabel['name'])}</span>}
            validateStatus={ojFormValidate.name.validateStatus}
            help={ojFormValidate.name.errMsg}
            colon={ false }
          >
            <Input
              maxLength={60}
              placeholder="请输入任务名称"
              value={ojForm.name}
              suffix={<span style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.45)' }}>{60 - ojForm.name.length}</span>}
              onChange={this.handleNameChange}
            />
          </FormItem>

          <FormItem
            className={`input_area flex_100`}
            label={<span>{myLabel(jcLabel['description'])}</span>}
            validateStatus={ojFormValidate.description.validateStatus}
            help={ojFormValidate.description.errMsg}
            colon={ false }
          >
            <QuillForEditor
                autoFocus={true}
                style={{ height: '200px' }}
                placeholder="请输入描述信息"
                onContentChange={handleContentChange}
                options={quillConfig}
                value={ojForm.description}
              />
          </FormItem>

          {/* <FormItem
            className={`input_area flex_50 flex_50_right`}
            label={<span>{myLabel(jcLabel['openOrNot'], '社区：您的任务将向整个社会公开')}</span>}
            validateStatus={ojFormValidate.openOrNot.validateStatus}
            help={ojFormValidate.openOrNot.errMsg}
            colon={ false }
          >
            <Select onChange={this.handleChangeOpenOrNot} value={`${ojForm.openOrNot}`}>
              {getOptions('openOrNot')}
            </Select>
          </FormItem> */}

        </Form>

        {/* 添加测试用例 */}
        <div className={'test_demo_title'} ref={this.headerRef}>
          <h2>测试用例</h2>
          <Button type="primary" ghost onClick={handleAddTest}>添加测试用例</Button>
        </div>
        <div className="test_demo_ctx">
          { renderTestCase() }
        </div>

        <div style={ {float:"left", clear: "both", background: 'red' } } ref={this.scrollRef}></div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const ojFormReducer = state.ojFormReducer;
  const {
    ojForm,
    position,
    testCases,
    openTestCodeIndex,
    testCasesValidate,
    ojFormValidate,
    courseQuestions,
    tag_discipline_id,
    knowledges
  } = ojFormReducer;
  return {
    ojForm,
    testCases,
    testCasesValidate,
    ojFormValidate,
    position,
    openTestCodeIndex,
    courseQuestions,
    tag_discipline_id,
    knowledges
  };
};

const mapDispatchToProps = (dispatch) => ({
  // 任务名称校验
  validateOJName: (value) => dispatch(actions.validateOJName(value)),
  validateOjLanguage: (value) => dispatch(actions.validateOjLanguage(value)),
  validateOjDescription: (value) => dispatch(actions.validateOjDescription(value)),
  validateOjDifficult: (value) => dispatch(actions.validateOjDifficult(value)),
  validateOjTimeLimit: (value) => dispatch(actions.validateOjTimeLimit(value)),
  validateOjCategory: (value) => dispatch(actions.validateOjCategory(value)),
  validateOpenOrNot: (value) => dispatch(actions.validateOpenOrNot(value)),
  validateOjSubDisciplineId: (value) => dispatch(actions.validateOjSubDisciplineId(value)),
  saveTagDisciplineId: (value) => dispatch(actions.saveTagDisciplineId(value)),
  // 新增测试用例
  addTestCase: (value) => dispatch(actions.addTestCase(value)),
  // 删除测试用例
  deleteTestCase: (value) => dispatch(actions.deleteTestCase(value)),
  saveKnowledge: (value) => dispatch(actions.saveKnowledge(value)),
  tagDisciplines: (params) => dispatch(actions.tagDisciplines(params))
  // 获取题库
  // getQuestion: (params) => dispatch(actions.getQuestion(params))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditTab);
