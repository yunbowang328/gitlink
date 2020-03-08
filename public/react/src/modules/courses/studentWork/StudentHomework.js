import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,DatePicker} from "antd";
import locale from 'antd/lib/date-picker/locale/zh_CN';

import "../css/Courses.css";
import CoursesListType from '../coursesPublic/CoursesListType';

const { Option } = Select;
const CheckboxGroup = Checkbox.Group;

class StudentHomework extends Component{

  constructor(props){
    super(props)
    this.state={

    }
  }

  componentDidMount(){

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    return(
      <React.Fragment>

        <div>
          <div className="newMain clearfix">
            <div className={"educontent mb20"}>

              <div style={{ width:'100%',height:'70px'}} >
                <p className="ml15 fl color-black mt30 summaryname">Java语言之控制语句</p>

                <CoursesListType
                  typelist={["已开启补交"]}
                  typesylename={"mt28"}
                />

                <a onClick={()=>this.props.history.goBack()} className="color-grey-6 fr font-16 ml20 mt18 mr20">返回</a>
                <a href="/student_work?homework=16737" className="color-grey-6 fr font-16 ml30 mt18 " target={"_blank"}>实训详情</a>
              </div>

              <div className="stud-class-set bor-bottom-greyE">
                <div className="mt10 clearfix edu-back-white poll_list pl20">
                  <a className="active">作业列表</a>
                  <a>作业描述</a>
                  <a>配置</a>
                  <a className={"fr color-blue font-16"}>立即发布</a>
                  <a className={"fr color-blue font-16"}>导出成绩</a>
                </div>
              </div>

              <Form  onSubmit={this.handleSubmit} className={"edu-back-white newcourses  exercise"}>
                {/*内容*/}
                <div className="stud-class-set bor-bottom-greyE pd20 exerciselist">

                  <Form.Item label="发布设置" hasFeedback>

                    {getFieldDecorator("TestingProfile")(
                      <Checkbox id="TestingProfile" value={""} className="fl ml40">统一设置</Checkbox>
                    )}
                    <span className={"coursesselect"}>（选中则所有分班使用相同的发布设置，否则各个分班单独设置）</span>

                    <div className={"clearfix"}>
                      <span className="color-grey-6 mt5 fl ml40" style={{minWidth: '70px'}}>发布时间：</span>
                      <span className="fl mt5">
                            {getFieldDecorator("startTime")(
                              <DatePicker
                                  showToday={false}
                                showTime
                                locale={locale}
                                format={dateFormat}
                                placeholder="请选择发布时间"
                                id={"startTime"}
                                width={"210px"}
                                // value={opening_time===null||opening_time===""?"":moment(opening_time, dateFormat)}
                                // onChange={this.onChangeTimePicker}
                              />
                            )}
                        <span className={"exerciseselect"}>（发布之前，学生不会收到问卷）</span>
                        </span>
                    </div>

                    <div className={"clearfix"}>
                      <span className="color-grey-6 mt5 fl ml40" style={{minWidth: '70px'}}>截止时间：</span>
                      <span className="fl mt5">
                         {getFieldDecorator("endTime")(
                           <DatePicker
                               showToday={false}
                             showTime
                             locale={locale}
                             format={dateFormat}
                             placeholder="请选择截止时间"
                             id={"endTime"}
                             width={"210px"}
                             // value={opening_time===null||opening_time===""?"":moment(opening_time, dateFormat)}
                             // onChange={this.onChangeTimePicker}
                           />
                         )}
                        <span className={"exerciseselect"}>（截止时间点，系统将自动提交所有学生的答题，学生将不能继续答题）</span>

                      </span>
                    </div>

                  </Form.Item>

                </div>

                <div className="stud-class-set bor-bottom-greyE pd20 exercisetime">

                  <Form.Item label="补交设置" hasFeedback>

                    <div className={"clearfix"}>

                      <span className="color-grey-6 mt5 fl ml40 font-16" style={{minWidth: '70px'}}>答题时长：</span>

                      {getFieldDecorator("TestingProfile"
                        , {
                          rules: [{
                            pattern: /^[1-9]\d*$/,
                            message: '答题时长必须为正整数',
                          }],
                        })(
                        <Input id="TestingProfile" className={"greyInput mt10 mr10"} style={{width:'108px',marginLeft:'0px'}} />
                      )}
                      <span  className={"mr10"}>分钟</span>
                      <span className={"coursesselect"}>（选中则所有分班使用相同的发布设置，否则各个分班单独设置）</span>

                    </div>


                  </Form.Item>


                  <Form.Item hasFeedback>
                    <div className={"clearfix pd60"}>

                      {getFieldDecorator("subject", {
                        valuePropName: 'checked',
                      })(
                        <Checkbox id="subject" className="fl">题目顺序随机打乱</Checkbox>
                      )}
                      <span className={"coursesselect"}>（选中则学生答题时，题目顺序按照题型随机显示）</span>

                    </div>

                    <div className={"clearfix pd60"}>

                      {getFieldDecorator("options", {
                        valuePropName: 'checked',
                      })(
                        <Checkbox id="options" className="fl">选项顺序随机打乱</Checkbox>
                      )}
                      <span className={"coursesselect"}>（选中则学生答题时，选项顺序随机显示）</span>

                    </div>
                  </Form.Item>

                </div>

                <div className="stud-class-set pd20 coursenavbox">

                  <Form.Item
                    label="公开设置"
                    hasFeedback
                  >

                    <div className={"clearfix pd28"}>

                      {getFieldDecorator("opergrdee", {
                        valuePropName: 'checked',
                      })(
                        <Checkbox id="opergrdee" className="fl">公开成绩</Checkbox>
                      )}
                      <span className={"coursesselect"}>（选中则在截止时间之后对提交答题的课堂成员公开所有成绩，否则不公开）</span>

                    </div>

                    <div className={"clearfix pd28"}>

                      {getFieldDecorator("openanswer", {
                        valuePropName: 'checked',
                      })(
                        <Checkbox id="openanswer" className="fl">公开答案</Checkbox>
                      )}
                      <span className={"coursesselect"}>（选中则在截止时间之后对提交答题的课堂成员公开试卷题目的答案，否则不公开）</span>

                    </div>

                    <div className={"clearfix pd28"}>

                      {getFieldDecorator("openstatisticss", {
                        valuePropName: 'checked',
                      })(
                        <Checkbox id="openstatisticss" className="fl">公开统计</Checkbox>
                      )}
                      <span className={"coursesselect"}>（选中则在截止时间之后对提交答题的课堂成员公开答题统计，否则不公开）</span>

                    </div>

                  </Form.Item>

                </div>

                <Form.Item wrapperCol={{ span: 12, offset: 5 }} >


                  <div className="clearfix mt30 mb30">
                    <Button type="primary" htmlType="submit"  className="defalutSubmitbtn fl mr20">
                      提交
                    </Button>
                    {/*<a className="defalutSubmitbtn fl mr20">提交</a>*/}
                    <a className="defalutCancelbtn fl">取消</a>
                  </div>
                </Form.Item>

              </Form>

            </div>
          </div>
        </div>

      </React.Fragment>

    )
  }
}
const StudentHomeworkApp = Form.create({ name: 'coursesNew' })(StudentHomework);
export default StudentHomeworkApp;
