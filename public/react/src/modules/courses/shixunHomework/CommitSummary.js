import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import { TPMIndexHOC } from '../../tpm/TPMIndexHOC';
import "../css/Courses.css";
import CoursesMarkdown from "../coursesPublic/CoursesMarkdown";
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
import {
  Form, Icon, Input, Button, Checkbox,message,
} from "antd";
import {WordsBtn} from 'educoder';
//引入对应跳转的组件
import axios from 'axios';
//提交总结
class CommitSummary extends Component{
  constructor(props) {
    super(props)
    this.state = {
      contents: [{val:"",id:1}],
      course_id:0,
      course_name:"",
      category:[],
      homework_id:0,
      user_name:"",
      work_id:0,
      description:"",
      data:undefined,
      cancels:false,
    }

  }
  componentDidMount() {

    this.Getsubmissionsummaryinterface();
    let query = this.props.location.pathname;
    const type = query.split('/');
    this.setState({
      shixuntypes:type[3]
    })
  }


  //获取提交总结接口
  Getsubmissionsummaryinterface=()=>{
    var  worksid=this.props.match.params.id;
    // console.log("Getsubmissionsummaryinterface");
    // console.log(this.props.match.params);
    // console.log(worksid);
    var  url = `/student_works/${worksid}/commit_des.json`;
    axios.get(url).then((result) => {
      // console.log(result);
      if (result.status === 200) {
        // console.log(url)
        // console.log("提交总结接口")
        // console.log(JSON.stringify(result))
        this.setState({
          data:result.data,
          description: result.data.description,
          cancels:true,
        })
      }else {
        this.props.showNotification(result.data.message);

      }
    }).catch((error) => {
      console.log(error)
    })
  }

  submitCommitSummary=()=> {
    const mdContnet = this.refs[`md${1}`].getValue().trim();
    console.log(mdContnet)
  }
  gotohome=()=>{
    // let courseId=this.props.match.params.coursesId;
    // if(courseId===undefined){
    //   this.props.history.push("/courses");
    // }else{
    //   this.props.history.push(this.props.current_user.first_category_url);
    // }
    this.props.history.goBack()
  }
  asdasdsad=()=>{
    this.setState({
      contents:""
    })
  }

  handleSubmit=(e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values.description);
        if(values.description === undefined|| values.description === "" || values.description ===null){
          this.props.showNotification(`请输入提交内容`);
          return

        }
        var  worksid=this.props.match.params.id;

        var  url = `/student_works/${worksid}/update_des.json`;
        axios.post(url,{
          description:values.description,
        }).then((result) => {
          if (result.status === 200) {
            // console.log(url)
            // console.log("提交总结接口")
            // console.log(JSON.stringify(result))
            // message.success(result.data.message);
            // 这里以前是学生
            this.props.history.push(`/courses/${this.props.match.params.coursesId}/${this.state.shixuntypes}/${this.props.match.params.homeworkid}/list?tab=0`);
          }
        }).catch((error) => {
          console.log(error)
        })
      }

    });
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    let {contents,data}=this.state;
    // console.log(this.props);
		document.title=data === undefined ? "" :data.course_name===undefined?"": data.course_name;
    return (
      <div>
        <div className="newMain clearfix">
          {/*<Form onSubmit={this.handleSubmit}>*/}
          <div className={"educontent mb20"}>
            <div style={{
              width:'100%',
              height:'20px'
            }} >
              <div className="educontent mb30">
                <p className="clearfix mb20 mt10 ">
                  <a className="btn colorgrey fl hovercolorblue " onClick={()=>this.gotohome()}>{data === undefined ? "" :data.course_name===undefined?"": data.course_name}</a>
                  <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                  {/* style="grey" */}
                  <a
                    className="btn colorgrey fl hovercolorblue ">{data === undefined ? "" :data.category===undefined?"":data.category.category_name}</a>
                  <span className="color-grey-9 fl ml3 mr3">&gt;</span>
                  <a className="fl">作业详情</a>
                </p>
              </div>

            </div>
            <div className="mt20">
              <p className=" fl color-black mt10 summaryname" onClick={this.asdasdsad}>{this.state.description ? '修改总结' : '提交总结'}</p>
              <a onClick={()=>this.gotohome()} className="color-grey-6 fr font-16 ml30 mt10">返回</a>
            </div>
            {/*educontentbox*/}
            <div className="stud-class-set pt40 pb40">

              <div className={"mt10"}>
                <div style={{ "background": "#fff", "padding": "15px"}}>
                                     <span className="commitcontentsysl">
                            <span className="color-red">*</span>
                            内容</span>
                </div>
                <div className="new-wrap">
                  <Form layout='vertical' onSubmit={this.handleSubmit} >
                    <Form.Item
                    >
                      <div style={{ "background": "#fff","padding-bottom":"20px","padding-left":"20px","padding-right":"20px"}}
                           className="mdInForm">
                        {getFieldDecorator('description', {
                          rules: [{
                            required: true, message: '请在此输入总结内容,最多5000个字符',
                          }, {
                            max: 5000, message: '最大限制为5000个字符',
                          }],
                        })(
                          <TPMMDEditor ref={this.mdRef} placeholder={'请在此输入总结内容，最多5000个字符'}
                                       mdID={'courseMessageMD'} initValue={this.state.description} className="courseMessageMD"></TPMMDEditor>
                        )}
                      </div>
                    </Form.Item>
                    <style>
                      {
                        `
                                            .ant-form-item {
                                              -webkit-box-sizing: border-box;
                                              box-sizing: border-box;
                                              margin: 0;
                                              padding: 0;
                                              color: rgba(0, 0, 0, 0.65);
                                              font-size: 14px;
                                              font-variant: tabular-nums;
                                              line-height: 1.5;
                                              list-style: none;
                                              -webkit-font-feature-settings: 'tnum';
                                              font-feature-settings: 'tnum';
                                              /* margin-bottom: 24px; */
                                              vertical-align: top;
                                            }
                                            `
                      }
                    </style>
                    <Form.Item>
                      <div className="clearfix mt40 mb30">
                        <Button type="primary" htmlType="submit" className="defalutSubmitbtn fl mr20" >
                          提交
                        </Button>
                        <a className="defalutCancelbtn fl" href={`/courses/${this.props.match.params.coursesId}/${this.state.shixuntypes}/${this.props.match.params.homeworkid}/list?tab=0`}>取消</a>
                      </div>
                    </Form.Item>
                  </Form>
                </div>
              </div>



            </div>

          </div>
          {/*</Form>*/}
        </div>
      </div>
    )
  }
}
const GraduationTasksnewApp = Form.create({ name: 'coursesNew' })(CommitSummary);
export default GraduationTasksnewApp;


