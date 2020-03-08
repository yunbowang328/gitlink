import React, {Component} from "react";
import {
    Form,
    Select,
    Input,
    Button,
    Checkbox,
    Upload,
    Icon,
    message,
    Modal,
    Table,
    Divider,
    InputNumber,
    Tag,
    DatePicker,
    Radio,
    Tooltip,
    notification
} from "antd";
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
import {Link, Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import '../css/members.css'
import "../common/formCommon.css"
import '../css/Courses.css'
import '../css/members.css'
import "../common/formCommon.css"
import '../css/Courses.css'
import moment from 'moment';
import '../css/members.css'
import "../common/formCommon.css"
import './style.css'
import Workquestionandanswer from "./Workquestionandanswer";
const { TextArea } = Input;


class Homeworddescription extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            description:props.description,
        }


    }

    componentDidMount() {


    }
    //取消操作
    clickcancel =()=>{
      this.props.NOReleaseNotes();
    }
    //确认操作
    onSaveExercise=()=>{
			// if(this.state.description === "" || this.state.description===undefined || this.state.description === null){
			//     this.props.showNotification("请输入作业说明");
			//     return
			// }
        this.props.ReleaseNotes(this.state.description);
    }
    //获取输入框
    settextarea=(e)=>{
			console.log("settextarea");
			console.log(e);
        this.setState({
            description:e
        })
    }
    render() {
			const {getFieldDecorator} = this.props.form;
        return (
            <div >
                <div  style={{
                    "background-color":"#FFFFff",
                    "padding":"20px 20px",
                    "position": "relative",
                    "margin-bottom":" 0px"}}>
                    <style>
                        {`
                   .ant-form-item-label{width:80px;}
                  `}
                    </style>
									<Form layout='vertical' onSubmit={this.handleSubmit}>
										<style>
											{
												`.ant-form-item{
															    margin-bottom:0px !important;
															}
															.chooseDestwo .ant-form-item{
															    margin-bottom:0px !important;
															}
														
															.chooseDestwo .ant-form-item-control-wrapper .ant-form-item-control .ant-form-explain{
															padding-left: 25px !important;
														  position: absolute;
															}
															.ant-form-vertical .ant-form-item {
															margin-bottom:0px !important;
															 }
															`

											}
										</style>
										<Form.Item
											style={{"borderBottom": 'none'}}
											className="chooseDestwo "
										>
											{getFieldDecorator('content', {
												rules: [{
													max: 5000, message: '最大限制为5000个字符',
												}],
											})(
												<TPMMDEditor ref={this.mdRef} placeholder={'请在此输入作业内容和要求，最大限制5000个字符'}
																		 mdID={'courseMessageMD'} initValue={this.state.description}
																		 className="courseMessageMD" onChange={this.settextarea}
																		 style={{"height": "120px"}}></TPMMDEditor>
											)}


                    </Form.Item>
                    <div className="clearfix mt10">
                            <Button  type="primary" className="defalutSubmitbtn  fr mr20 "style={{"width":"90px"}} onClick={this.onSaveExercise} >保存</Button>
                            <Button className="defalutCancelbtn fr mr20 w20"  style={{"width":"90px"}} onClick={this.clickcancel} >取消</Button>
                    </div>

										{/*<Form.Item>*/}
										{/*    <div className="clearfix mt28  fr pb50 mr25" >*/}
										{/*        <a className="defalutCancelbtn fl mr20 " onClick={()=>this.bianji(false)}>取消</a>*/}
										{/*        <Button   htmlType="submit"  className="ant-btn defalutSubmitbtn fl  ant-btn-primary">*/}
										{/*            <span>提 交</span></Button>*/}
										{/*    </div>*/}
										{/*    <div className="clearfix mt10">*/}
										{/*        <Button  type="primary" className="defalutSubmitbtn  fr mr20 "style={{"width":"90px"}} onClick={this.onSaveExercise} >保存</Button>*/}
										{/*        <Button className="defalutCancelbtn fr mr20 w20"  style={{"width":"90px"}} onClick={this.clickcancel} >取消</Button>*/}
										{/*    </div>*/}
										{/*</Form.Item>*/}
									</Form>

                </div>
            </div>
        )
    }






}
const Homeworddescriptions = Form.create({name: 'taskPollNew'})(Homeworddescription);
export default Homeworddescriptions;