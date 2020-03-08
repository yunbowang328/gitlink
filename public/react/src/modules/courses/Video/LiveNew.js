import React,{ Component } from "react";
import { Modal , Form , Input , Spin , Select , AutoComplete , DatePicker , InputNumber } from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import { handleDateString } from 'educoder';

import './video.css';
import axios from 'axios';

const { TextArea } = Input;
const { Option  } = Select;
const array=['腾讯课堂','B站','斗鱼','威佰通'];

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
      result.push(i);
  }
  return result;
}
function disabledDateTime() {
  return {
    disabledMinutes: () => range(1, 30).concat(range(31, 60)),
  };
}
function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}


class LiveNew extends Component{

  constructor(props){
    super(props);
    this.state={
      isSpining:false,
      beginTime:undefined,
      wei_flag:undefined
    }
  }

  componentDidMount=()=>{
    this.checkType();
  }

  componentDidUpdate=(prevState)=>{
    if(prevState && prevState.liveId !== this.props.liveId){
      this.setState({
        isSpining:true
      })
      this.checkType();
    }
  }

  checkType=()=>{
    const { liveId } = this.props;
    this.clearAll();
    if(liveId){
      const url =`/live_links/${liveId}/edit.json`;
      axios.get(url).then(result=>{
        if(result){
          this.props.form.setFieldsValue({
            url:result.data.url,
            description:result.data.description,
            platform:result.data.platform || "腾讯课堂",
            duration:result.data.duration,
            course_name:result.data.course_name
          })
          this.setState({
            beginTime:result.data.live_time && moment(result.data.live_time,"YYYY-MM-DD HH:mm"),
            wei_flag:result.data.platform && result.data.platform === "威佰通"
          })
        }
      })
    }
    this.setState({
      isSpining:false
    })
  }

  handleSubmit=()=>{
    this.props.form.validateFields((err, values) => {
      if(!err){
        this.setState({
          isSpining:true
        })
        const { liveId } = this.props;
        if(liveId){
          // 修改
          this.updateFunc(liveId,values);
        }else{
          this.creatFunc(values);
        }
      }
    })
  }
  // 修改
  updateFunc=(id,values)=>{
    const url = `/live_links/${id}.json`;
    const { beginTime } = this.state;
    axios.put(url,{
      ...values,
      live_time:beginTime
    }).then(result=>{
      if(result){
        this.props.showNotification("修改成功!");
        const { setliveVisibel } = this.props;
        setliveVisibel && setliveVisibel(false,true);
      }
      this.setState({
        isSpining:false
      })
    }).catch(error=>{
      this.setState({
        isSpining:false
      })
      console.log(error);
    })
  }

  // 新增
  creatFunc=(values)=>{
    const CourseId=this.props.match.params.coursesId;
    const url =  `/courses/${CourseId}/live_links.json`;
    const { beginTime } = this.state;
    axios.post(url,{
      ...values,
      live_time:beginTime
    }).then(result=>{
      if(result){
        this.props.showNotification("添加成功!");
        const { setliveVisibel } = this.props;
        setliveVisibel && setliveVisibel(false,true);
      }
      this.setState({
        isSpining:false
      })
    }).catch(error=>{
      this.setState({
        isSpining:false
      })
      console.log(error);
    })
  }

  validateDesc= (rule, value, callback) => {
    if(!value){
      callback();
    }
    if (value.length > 100) {
      callback("直播说明不能超过100个字！");
    }else{
      callback();
    }
  }

  cancelNew=()=>{
    const { setliveVisibel } = this.props;
    this.clearAll();
    setliveVisibel && setliveVisibel(false);
  }

  clearAll=()=>{
    this.props.form.setFieldsValue({
      course_name:undefined,
      platform:"腾讯课堂",
      url:undefined,
      description:undefined,
      duration:undefined
    })
    this.setState({
      beginTime:undefined,
      wei_flag:false
    })
  }

  onChangeTime=(data,dateString)=>{
    this.setState({
      beginTime:handleDateString(dateString)
    })
  }

  ChangePlatform=(e)=>{
    if(e === "威佰通"){
      this.setState({
        wei_flag:true
      })
    }else{
      this.setState({
        wei_flag:false
      })
    }
  }

  render(){
    const { isSpining , beginTime , wei_flag } = this.state;
    const {getFieldDecorator} = this.props.form;
    const { visible } = this.props;

    const dataSource = array.map((item,key)=>{
      return(
        <Option value={item}>{item}</Option>
      )
    })
    return(
      <Modal
        visible={visible}
        width="560px"
        title={'添加直播'}
        footer={null}
        closable={false}
        className="liveModal"
      >
        <Spin spinning={isSpining}>
          <div className="task-popup-content">
            <Form onSubmit={this.handleSubmit}>
              <Form.Item label={`直播课程`}>
                {getFieldDecorator('course_name', {
                    rules: [{required: true, message: "请输入课程名称"}],
                })(
                  <Input placeholder="请输入课程名称" />
                )}
              </Form.Item>
              <Form.Item label={`直播平台`}>
                {getFieldDecorator('platform', {
                    rules: [{required: true, message: "请选择直播平台"}],
                })(
                  <AutoComplete
                    placeholder="请选择或输入直播平台名称"
                    onChange={this.ChangePlatform}
                    dataSource={dataSource}
                    >
                    </AutoComplete>
                )}
              </Form.Item>
              <Form.Item label={wei_flag?`会议号`:`直播链接`}>
                {getFieldDecorator('url', {
                    rules: [],
                })(
                  <Input placeholder={wei_flag?`请输入会议号`:"请输入第三方直播链接，如：腾讯课堂播放链接等。"} />
                )}
              </Form.Item>
              <div className="flex-bottom">
                <div className="flex1">
                  <p className="ant-col ant-form-item-label color-grey-3 font-16 setStyle">开播时间</p>
                  <DatePicker
                    dropdownClassName="hideDisable"
                    className="timeStyle mb20"
                    placeholder="如：2020/02/02 12:00"
                    style={{width:"220px"}}
                    showTime={{ format: 'HH:mm' }}
                    locale={locale}
                    format="YYYY-MM-DD HH:mm"
                    showToday={false}
                    disabledTime={disabledDateTime}
                    disabledDate={disabledDate}
                    value={beginTime && moment(beginTime,"YYYY-MM-DD HH:mm")}
                    onChange={this.onChangeTime}
                  ></DatePicker>
                </div>
                <Form.Item label={`直播预计时长`}>
                  {getFieldDecorator('duration', {
                      rules: [],
                  })(
                    <InputNumber placeholder="请输入直播时长" style={{width:"220px"}}/>
                  )}
                </Form.Item>
                <span className="mb20 ml5">分钟</span>
              </div>
              <Form.Item label={`直播说明`}>
                {getFieldDecorator('description', {
                    rules: [{
                      validator: this.validateDesc,
                    }],
                })(
                  <TextArea rows={4} placeholder="可在此介绍开播具体事项，如开播时间安排等。" />
                )}
              </Form.Item>
              
            </Form>
            <div className="clearfix mt30 edu-txt-center">
              <a onClick={this.cancelNew} className="task-btn mr30">取消</a>
              <a type="submit" onClick={this.handleSubmit} className="task-btn task-btn-orange">确定</a>
            </div>
          </div>
        </Spin>
      </Modal>
    )
  }
}
const WrappedLiveNew = Form.create({name: 'LiveNew'})(LiveNew);
export default WrappedLiveNew;