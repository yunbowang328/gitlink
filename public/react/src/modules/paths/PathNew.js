import React,{ Component } from "react";

import {getUrl,markdownToHTML} from 'educoder';
import {Input,Button} from 'antd';
import TPMMDEditor from "../tpm/challengesnew/TPMMDEditor";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import axios from 'axios';
// import '../page/tpiPage.css';
require('codemirror/lib/codemirror.css');


const $ = window.$;

class PathNew extends Component{
  constructor(props){
    super(props);
    this.contentMdRef = React.createRef();
    this.Point_editMD = React.createRef();
    this.state={
      pathName:"",
      description:"",
      point:"",
      flag_name:true,
			bottonloading:false
    }
  }

  // 提交
  submitNewPath=()=>{
    let {pathName} = this.state;
    if(pathName===""){
      this.props.showSnackbar("请输入实践课程名称");
      window.location.href="#part_Name";
      this.setState({
        flag_name:false
      })
      return;
    }
    let des= this.contentMdRef.current.getValue().trim();
    if(des===""){
      this.props.showSnackbar("请输入实践课程的简介");
      window.location.href="#part_Des";
      return;
    }
    if (des.length > 8000) {
      this.props.showSnackbar("实践课程的简介最大限制8000个字符");
      window.location.href="#part_Des";
      return;
    }
    let point = this.Point_editMD.current.getValue().trim();
    if(point===""){
      this.props.showSnackbar("请输入实践课程的学习须知");
      window.location.href="#part_point";
      return;
    }
    if(point.length > 2000){
      this.props.showSnackbar("实践课程的学习须知最大限制2000个字符");
      window.location.href="#part_point";
      return;
    }
    if (this.isEditPage == true) {
			this.setState({
				bottonloading:true
			})
      let pathId = this.props.match.params.pathId;

      const editUrl = `/paths/${pathId}.json`
      axios.put(editUrl,{
        name:pathName,
        description:des,
        learning_notes:point
      }).then((response)=>{
        // console.log(response.data.subject_id);
        if (response.data.subject_id) {
          this.props.history.push(`/paths/${response.data.subject_id}`)
        }else{
					this.setState({
						bottonloading:false
					})
				}
      }).catch((error)=>{
        console.log(error);
				this.setState({
					bottonloading:false
				})
      })
    } else {
			this.setState({
				bottonloading:true
			})
      let url="/paths.json"
      axios.post(url,{
        name:pathName,
        description:des,
        learning_notes:point
      }).then((response)=>{
        // console.log(response.data.subject_id);
        if (response.data.subject_id) {
          this.props.history.push(`/paths/${response.data.subject_id}`)
        }else{
					this.setState({
						bottonloading:false
					})
				}
      }).catch((error)=>{
        console.log(error);
				this.setState({
					bottonloading:false
				})
      })
    }
    
  }

  componentDidMount() {

		let url = "/paths/new.json"
		axios.get(url).then((result) => {
			console.log(result)
		}).catch((error) => {
			console.log(error);
		})


    let pathId = this.props.match.params.pathId;
    if (pathId) {
      this.isEditPage = true

      // const url = `/paths/${pathId}.json`
      const url = `/paths/${pathId}/edit.json`
      axios.get(url).then((response)=>{
        /**
          description:
          id: 13
          learning_notes:
          name: 
         */ 
         if (response.data.name) {
          this.setState({
            pathName: response.data.name
          })
          this.contentMdRef.current.setValue(response.data &&  response.data.description);
          this.Point_editMD.current.setValue(response.data &&  response.data.learning_notes);

         }
      }).catch((error)=>{
        console.log(error);
      })
    } else {
      this.isEditPage = false

      this.contentMdRef.current.setValue("");
      this.Point_editMD.current.setValue("");
    }
    
  }

  InputName=(e)=>{
    this.setState({
      pathName:e.target.value,
    })
  }

  render(){
    let pathId = this.props.match.params.pathId;

    let {pathName,description,point,flag_name}=this.state;
    return(
      <div className="newContainer">
        <div className="newMain clearfix">
          <div className="educontent mt10 mb50">
            <div className="mb10 edu-back-white">
              <p className="padding20 bor-bottom-greyE font-18 color-grey-3">{pathId ? '编辑' : '创建'}实践课程</p>
              <div className="padding30-20" id="part_Name">
                <p className="color-grey-6 font-16 mb15">实践课程名称</p>
                <div className="df">
                  <span className="mr30 color-orange pt10">*</span>
                  <div className="flex1 mr20">
                    <Input className={flag_name===true?"input-100-45 greyInput":"input-100-45 greyInput bor-red"}
                      maxLength="60"
                      placeholder="例如：从Python程序设计-入门精通"
                      value={pathName}
                      onInput={this.InputName}
                    ></Input>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb10 edu-back-white padding30-20" id="part_Des">
              <p className="color-grey-6 font-16 mb15">简介</p>
              <div className="df">
                <span className="mr30 color-orange pt10">*</span>
                <div className="flex1 mr20">
                  <div id="shixun_introduction" className="new_li">
                    {/*<textarea className="input-100-45" name="description" placeholder="请在此输入实践课程的简介" value={description}></textarea>*/}
                    <TPMMDEditor ref={this.contentMdRef} placeholder="请在此输入实践课程的简介，最大限制8000个字符" mdID={'courseContentMD'}
                                 refreshTimeout={1500}
                                 className="courseMessageMD"
                      // initValue={this.state.description === null ? "" : this.state.description}
                    ></TPMMDEditor>

                  </div>
                  <p id="e_tip_shixun_introduction" className="edu-txt-right color-grey-cd font-12"></p>
                  <p id="e_tips_shixun_introduction" className="edu-txt-right color-grey-cd font-12"></p>
                </div>
              </div>
            </div>

            <div className="mb10 edu-back-white padding30-20" id="part_point">
              <p className="color-grey-6 font-16 mb15" id="learning_notes">学习须知</p>
              <div className="df">
                <span className="mr30 color-orange pt10">*</span>
                <div className="flex1 mr20">
                  <div id="shixun_propaedeutics" className="new_li ">
                    {/*<textarea name="learning_notes" placeholder="请在此输入实践课程的学习须知" value={point}></textarea>*/}
                    <TPMMDEditor ref={this.Point_editMD} placeholder="请在此输入实践课程的学习须知，最大限制2000个字符" mdID={'Point_editMDs'}
                                 refreshTimeout={1500}
                                 className="courseMessageMD"
                      // initValue={this.state.description === null ? "" : this.state.description}
                    ></TPMMDEditor>
                  </div>
                  <p id="e_tip_shixun_propaedeutics" className="edu-txt-right color-grey-cd font-12"></p>
                  <p id="e_tips_shixun_propaedeutics" className="edu-txt-right color-grey-cd font-12"></p>
                </div>
              </div>
            </div>
            
            <div className="clearfix mb30 mt30">
              <button className="defalutSubmitbtn fl mr20" loading={this.state.bottonloading} onClick={this.submitNewPath}>提交</button>
              {this.isEditPage ? 
                <Link to={`/paths/${this.props.match.params.pathId}`} 
                    className="defalutCancelbtn fl">取消</Link>
                : <Link to={`/paths`} className="defalutCancelbtn fl">取消</Link>
                }
            </div>
          
          </div>
        </div>
        
      </div>
    )
  }
}
export default PathNew;