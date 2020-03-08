import React,{ Component } from "react";

import {
	Form, Input, InputNumber, Switch, Radio,
	Slider, Button, Upload, Icon, Rate, Checkbox, message,
	Row, Col, Select, Modal, Tooltip
} from 'antd';
import TPMMDEditor from '../../../modules/tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
import update from 'immutability-helper'
import './../questioncss/questioncom.css';
import {getUrl, ActionBtn, DMDEditor, ConditionToolTip} from 'educoder';
import QuillForEditor from '../../../common/quillForEditor';

const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

const tagArray = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

//题库的试卷  判断题  组件
class JudquestionEditor extends Component{
	constructor(props){
		super(props);
		/**
		 choice_id: 32076
		 choice_position: 1
		 choice_text: "1"
		 standard_boolean: true
		 */
		const {question_choices} = this.props;
		let _standard_answers = undefined;
		let _question_choices = undefined;
		if (question_choices) {
			_standard_answers = []
			_question_choices = []

			question_choices.forEach((item, index) => {
				_standard_answers.push(item.standard_boolean)
				_question_choices.push(item.choice_text)
			})
		}
		this.state = {
			question_choices: _question_choices || ['', '', '', ''],
			standard_answers: _standard_answers || [false, false, false, false],
			question_title: this.props.question_title!==undefined?JSON.parse(this.props.question_title):"",
			question_type: this.props.question_type || 0,
			question_score: this.props.question_score || this.props.init_question_score,
			question_titles: this.props.question_titles!==undefined?JSON.parse(this.props.question_titles):"",
			question_titlesysl:this.props.question_titlesysl||'',
			question_titleysl:this.props.question_title || '',
			zqda:null,
			item_banksedit:[],
			mychoicess:[],
		}
	}
	addOption = () => {

		const { question_choices, standard_answers } = this.state;
		// ////////console.log("addOption");
		// ////////console.log(question_choices);
		// ////////console.log(standard_answers);


		question_choices.push('')
		standard_answers.push(false)
		this.setState({ question_choices, standard_answers })
	}
	deleteOption = (index) => {
		let {question_choices}=this.state;

		// ////////console.log("deleteOption");
		// ////////console.log(question_choices);

		if(question_choices[index]===""){
			// repeat code
			this.toMDMode(null)
			this.setState(
				(prevState) => ({
					question_choices : update(prevState.question_choices, {$splice: [[index, 1]]}),
					standard_answers : update(prevState.standard_answers, {$splice: [[index, 1]]})
				})
			)
		}else{
			this.props.confirm({
				content: `确认要删除这个选项吗？`,
				onOk: () => {
					this.toMDMode(null)
					this.setState(
						(prevState) => ({
							question_choices : update(prevState.question_choices, {$splice: [[index, 1]]}),
							standard_answers : update(prevState.standard_answers, {$splice: [[index, 1]]})
						})
					)
				}
			})
		}
	}
	onSave = () => {
		var editordata=[];
		const {question_title, question_score,question_titleysl,question_titlesysl, question_type,question_titles, zqda,question_choices, standard_answers } = this.state;
		const { question_id_to_insert_after, question_id } = this.props
		// TODO check
		const answerArray = standard_answers.map((item, index) => { return item == true ? index+1 : -1 }).filter(item => item != -1);
		if(!question_titleysl) {
			this.props.showNotification('请您输入题干');
			return editordata;
		}

		if(zqda===null) {
			this.props.showNotification('请先点击选择本选择题的正确选项');
			return editordata;
		}



		//
		// if(!question_titlesysl) {
		// 	this.props.showNotification('请您输入题目解析');
		// 	return editordata;
		// }
		/**
		 {
        "question_title":"同学朋友间常用的沟通工具是什么？",
        "question_type":1,
        "question_score":5,
        "question_choices":["a答案","b答案","c答案","d答案"],
        "standard_answers":[1]
    }*/


		editordata=[question_titleysl,zqda,question_titlesysl];
		// question_title,
		// question_type: answerArray.length > 1 ? 1 : 0,
		// question_score,
		// question_choices,
		// standard_answers: answerArray,
		// insert_id: question_id_to_insert_after || undefined
		return editordata;
	}
	onCancel = () => {
		this.props.onEditorCancel()
	}



	componentDidMount = () => {
		try {
			this.props.getanswerMdRef(this);
		}catch (e) {

		}
		try {
			this.setState({
				item_banksedit:this.props.item_banksedit,
				question_title: this.props.item_banksedit.name!==undefined?JSON.parse(this.props.item_banksedit.name):"",
				question_titles: this.props.item_banksedit.analysis!==undefined?JSON.parse(this.props.item_banksedit.analysis):"",
				mychoicess:this.props.item_banksedit.choices,
				question_titleysl:this.props.item_banksedit.name|| '',
				question_titlesysl:this.props.item_banksedit.analysis||'',
			})
			if(this.props.item_banksedit){
				if(this.props.item_banksedit.choices){
					for(var ik=0;ik<this.props.item_banksedit.choices.length;ik++ ){
						if( this.props.item_banksedit.choices[ik].choice_text==="正确"){
							if( this.props.item_banksedit.choices[ik].is_answer===true){
								this.setState({
									zqda:"0"
								})
							}

						}else{
							if( this.props.item_banksedit.choices[ik].is_answer===true){
								this.setState({
									zqda:"1"
								})
							}
						}
					}
				}
			}
		}catch (e) {

		}
	}

	componentDidUpdate(prevProps) {
		 ////console.log("componentDidUpdate");
		////console.log(prevProps);
		////console.log(this.props.item_banksedit);

		if(prevProps.item_banksedit !== this.props.item_banksedit){
			this.setState({
				item_banksedit:this.props.item_banksedit,
				question_title: this.props.item_banksedit.name!==undefined?JSON.parse(this.props.item_banksedit.name):"",
				question_titles: this.props.item_banksedit.analysis!==undefined?JSON.parse(this.props.item_banksedit.analysis):"",
				mychoicess:this.props.item_banksedit.choices,
				question_titleysl:this.props.item_banksedit.name|| '',
				question_titlesysl:this.props.item_banksedit.analysis||'',

			})
			if(this.props.item_banksedit){
				if(this.props.item_banksedit.choices){
					for(var ik=0;ik<this.props.item_banksedit.choices.length;ik++ ){
						 if( this.props.item_banksedit.choices[ik].choice_text==="正确"){
						 	if( this.props.item_banksedit.choices[ik].is_answer===true){
                  this.setState({
										zqda:"0"
									})
							}

						 }else{
							 if( this.props.item_banksedit.choices[ik].is_answer===true){
								 this.setState({
									 zqda:"1"
								 })
							 }
						}
					}
				}
			}

		}
	}
	onOptionClick = (index) => {

		let standard_answers = this.state.standard_answers.slice(0);
		// ////////console.log("onOptionClick");
		// ////////console.log(standard_answers);
		// ////////console.log(standard_answers[index]);
		// ////////console.log(!standard_answers[index]);
		for (var i=0;i<standard_answers.length;i++){
			if(index===i){
				standard_answers[index] = true;
			}else{
				standard_answers[i] = false;
			}

		}
		// standard_answers[index] = !standard_answers[index];
		this.setState({ standard_answers })
	}
	onOptionContentChange = (value, index) => {
		if (index >= this.state.question_choices.length) {
			// TODO 新建，然后删除CD选项，再输入题干，会调用到这里，且index是3
			return;
		}
		let question_choices = this.state.question_choices.slice(0);
		question_choices[index] = value;
		this.setState({ question_choices })
	}
	on_question_score_change = (e) => {
		this.setState({ question_score: e })
	}
	toMDMode = (that) => {
		if (this.mdReactObject) {
			let mdReactObject = this.mdReactObject;
			this.mdReactObject = null
			mdReactObject.toShowMode()
		}
		this.mdReactObject = that;

	}
	toShowMode = () => {

	}


	handleFormLayoutChange=(e)=>{
		////////console.log("难度塞选");
		////////console.log(value);
	 this.setState({
		 zqda:e.target.value,

	 })

	}

	onContentChange=(value,quill)=>{
		const _text = quill.getText();
		const reg = /^[\s\S]*.*[^\s][\s\S]*$/;
		if (!reg.test(_text)) {
			// 处理编辑器内容为空
			this.setState({
				question_titleysl:""
			})
		} else {
			// 提交到后台的内容需要处理一下;
			var texts="";
			if(_text.length>=1001){
				var result = _text.substring(0,1000);
				texts={"ops":[{"insert":result}]};
				texts=JSON.stringify(texts);
			}else {
				value =  JSON.stringify(value)
				texts=value;
			}
			this.setState({
				question_titleysl:texts
			})
		}
	}
	onContentChanges=(value,quill)=>{
		const _text = quill.getText();
		const reg = /^[\s\S]*.*[^\s][\s\S]*$/;
		if (!reg.test(_text)) {
			// 处理编辑器内容为空
			this.setState({
				question_titlesysl:""
			})
		} else {
			// 提交到后台的内容需要处理一下;
			var texts="";
			if(_text.length>=1001){
				var result = _text.substring(0,1000);
				texts={"ops":[{"insert":result}]};
				texts=JSON.stringify(texts);
			}else {
				value =JSON.stringify(value);
				texts=value;
			}
			this.setState({
				question_titlesysl:texts
			})
		}
	}
	render() {
		let { question_title, question_score, question_type, question_choices, standard_answers,question_titles} = this.state;
		let { question_id, index, exerciseIsPublish,
			// question_title,
			// question_type,
			// question_score,
			isNew } = this.props;

		// const { getFieldDecorator } = this.props.form;

		// const isAdmin = this.props.isAdmin()
		// const courseId=this.props.match.params.coursesId;
		// const isEdit = !!this.props.question_id
		const qNumber = `question_`;
		// TODO show模式  isNew为false isEdit为false

		// [true, false, true] -> [0, 2]

		const answerTagArray = standard_answers.map((item, index) => { return item == true ? tagArray[index] : -1 }).filter(item => item != -1);
		// ////////console.log("xuanzheshijuan");
		// ////////console.log(answerTagArray);
		// ////////console.log(!exerciseIsPublish);
		const params= this.props&&this.props.match&&this.props.match.params;
		return(
			<div className="padding20-30  signleEditor danxuano" id={qNumber}>
				<style>{`
              .optionMdEditor {
                flex:1
              }
              .optionRow {
                margin:0px!important;
                /* margin-bottom: 20px!important; */
              }
              .signleEditor .content_editorMd_show{
                display: flex;
                margin-top:0px!important;
                border-radius:2px;
                max-width: 1056px;
                word-break:break-all;
              }
              #e_tips_mdEditor_question_undefined4{
               display: none;
              }
            `}</style>
				<p className="mb10 clearfix">
					{/* {!question_id ? '新建' : '编辑'} */}
					<span className="xingcolor font-16 fl mr4">*</span>
					<span className="xingtigan  fl">题干：</span>
				</p>

				<QuillForEditor
					autoFocus={true}
					imgAttrs={{width: '146px', height: '136px'}}
					style={{ height: '155px'}}
					placeholder="请您输入题干"
					options={['code-block', 'image', 'formula']}
					value={question_title}
					onContentChange={this.onContentChange}

				/>

				<div className="mb10 sortinxdirection">
					{/* {!question_id ? '新建' : '编辑'} */}
					<span className="xingcolor font-16 fl mr4">*</span>
					<span className="xingtigans  fl"><span className="xingtigan">答案选项：</span>点击选项可设置正确答案</span>
				</div>

				<style>
					{
						`
						.choice_textcsss {
						border-radius:2px !important;
						}
						.choice_textcss {
						margin-left: 40px !important;
						border-radius:2px !important;
						}
						`
					}
				</style>
				<div className="mb15 sortinxdirection ">
						<Radio.Group buttonStyle="solid"  value={this.state.zqda} onChange={this.handleFormLayoutChange}>
							<Radio.Button value="0" className={"choice_textcsss"}>正确</Radio.Button>
							<Radio.Button value="1" className={"choice_textcss"}>错误</Radio.Button>

						</Radio.Group>

				</div>


				<div>


					<div className="mt10">
					<p className="mb10 clearfix">
						{/* {!question_id ? '新建' : '编辑'} */}
						<span className="xingcolor font-16 fl mr4"></span>
						<span className="xingtigan  fl">题目解析：</span>
					</p>

					<QuillForEditor
						autoFocus={false}
						imgAttrs={{width: '146px', height: '136px'}}
						style={{height: '166px' }}
						placeholder="请您输入题目解析"
						options={['code-block', 'image', 'formula']}
						value={question_titles}
						onContentChange={this.onContentChanges}
					/>

				</div>
				</div>

			</div>
		)
	}
}
// RouteHOC()
export default (JudquestionEditor);
