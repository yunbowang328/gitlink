import React,{ Component } from "react";

import {
	Form, Input, InputNumber, Switch, Radio,
	Slider, Button, Upload, Icon, Rate, Checkbox, message,
	Row, Col, Select, Modal, Tooltip
} from 'antd';
import QuillForEditor from '../../../common/quillForEditor';
import TPMMDEditor from '../../../modules/tpm/challengesnew/TPMMDEditor';
import axios from 'axios'
import update from 'immutability-helper'
import './../questioncss/questioncom.css';
import {getUrl, ActionBtn, DMDEditor, ConditionToolTip} from 'educoder';
const { TextArea } = Input;
const confirm = Modal.confirm;
const $ = window.$
const { Option } = Select;

const tagArray = [
	'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
	'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
	'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
]

//题库的试卷  单选题  组件
class SingleEditor extends Component{
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

		const choicescomy=[];
		try {
			if(this.props.item_banksedit){
				if(this.props.item_banksedit.choices){

					this.props.item_banksedit.choices.forEach((item, index) => {
						////console.log("SingleEditor");
						////console.log(item);
						choicescomy.push({
							choice_text:item.choice_text,
							standard_boolean:item.is_answer,
						})
					})

					_standard_answers = []
					_question_choices = []
					choicescomy.forEach((item, index) => {
						_standard_answers.push(item.standard_boolean)
						_question_choices.push(item.choice_text)
					})
				}

			}
		}catch (e) {

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
			item_banksedit:[],
		}
	}
	addOption = () => {

		const { question_choices, standard_answers } = this.state;
		// //////console.log("addOption");
		// //////console.log(question_choices);
		// //////console.log(standard_answers);


		question_choices.push('')
		standard_answers.push(false)
		this.setState({ question_choices, standard_answers })
	}
	deleteOption = (index) => {
		let {question_choices}=this.state;

		// //////console.log("deleteOption");
		// //////console.log(question_choices);

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
					this.toMDMode(null)
					this.setState(
						(prevState) => ({
							question_choices : update(prevState.question_choices, {$splice: [[index, 1]]}),
							standard_answers : update(prevState.standard_answers, {$splice: [[index, 1]]})
						})
					)
		}
	}
	onSave = () => {
		var editordata=[];
		const {question_title, question_titleysl,question_score, question_type,question_titles,question_titlesysl, question_choices, standard_answers } = this.state;
		const { question_id_to_insert_after, question_id } = this.props
		// TODO check
		const answerArray = standard_answers.map((item, index) => { return item == true ? index+1 : -1 }).filter(item => item != -1);

		// const _text = quill.getText();
		// const reg = /^[\s\S]*.*[^\s][\s\S]*$/;
		// if (!reg.test(_text)) {
		// 	// 处理编辑器内容为空
		// } else {
		// 	// 提交到后台的内容需要处理一下;
		// 	value =  JSON.stringify(value)
		// }
		if(!question_titleysl) {
			// this.refs['titleEditor'].showError()
			this.props.showNotification('请您输入题干');
			return editordata;
		}
		for(let i = 0; i < question_choices.length; i++) {
			if (!question_choices[i]) {
				// this.refs[`optionEditor${i}`].showError()
				this.props.showNotification(`请先输入 ${tagArray[i]} 选项的内容`);
				return editordata;
			}
		}

		if(!answerArray || answerArray.length == 0) {
			this.props.showNotification('请先点击选择本选择题的正确选项');
			return editordata;
		}




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
		editordata=[question_titleysl,answerArray,question_choices,question_titlesysl];
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
				question_titleysl:this.props.item_banksedit.name|| '',
				question_titles: this.props.item_banksedit.analysis!==undefined?JSON.parse(this.props.item_banksedit.analysis):"",
				question_titlesysl:this.props.item_banksedit.analysis||'',
				mychoicess:this.props.item_banksedit.choices,

			})


		}catch (e) {

		}
	}
	componentDidUpdate(prevProps) {
		////console.log("componentDidUpdate");
		// ////console.log(prevProps);
		// ////console.log(this.props.item_banksedit);

		if(prevProps.item_banksedit !== this.props.item_banksedit) {
			this.setState({
				item_banksedit: this.props.item_banksedit,
				question_title: this.props.item_banksedit.name!==undefined?JSON.parse(this.props.item_banksedit.name):"",
				question_titleysl:this.props.item_banksedit.name|| '',
				question_titles: this.props.item_banksedit.analysis!==undefined?JSON.parse(this.props.item_banksedit.analysis):"",
				question_titlesysl:this.props.item_banksedit.analysis||'',
				mychoicess: this.props.item_banksedit.choices,

			})
		}
	}
	onOptionClick = (index) => {

		let standard_answers = this.state.standard_answers.slice(0);
		// //////console.log("onOptionClick");
		// //////console.log(standard_answers);
		// //////console.log(standard_answers[index]);
		// //////console.log(!standard_answers[index]);
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
	onOptionContentChange = (value,quill,index) => {
		if (index >= this.state.question_choices.length) {
			// TODO 新建，然后删除CD选项，再输入题干，会调用到这里，且index是3
			return;
		}
    var texts;
		const _text = quill.getText();
		const reg = /^[\s\S]*.*[^\s][\s\S]*$/;
		if (!reg.test(_text)) {
			// 处理编辑器内容为空
			texts="";
		} else {
			if(_text.length>=301){
				var result = _text.substring(0,300);
				texts={"ops":[{"insert":result}]};
				texts=JSON.stringify(texts);
			}else {
				// 提交到后台的内容需要处理一下;
				value =  JSON.stringify(value)
				texts=value;
			}
		}
		let question_choices = this.state.question_choices.slice(0);
		question_choices[index] = texts;
		this.setState({ question_choices });
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

	onContentChange=(value,quill)=>{
		var _text = quill.getText();

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
			try {
				//console.log("onContentChange");
				//console.log(quill.getText().length);
			}catch (e) {

			}
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
				question_titlesysl:texts
			})
		}
	}
	handleShowImage = (url) => {
		//console.log("点击了图片放大");
		//console.log(url);
		alert(url);
	}

	render() {
		let { question_title, question_score, question_type, question_choices, standard_answers,question_titles,question_titlesysl} = this.state;
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
		// //////console.log("xuanzheshijuan");
		// //////console.log(answerTagArray);
		// //////console.log(!exerciseIsPublish);
		return(
			<div className="padding20-30  signleEditor danxuano" id={qNumber}>

				<style>{`
              .optionMdEditor {
                flex:1
              }
              .optionRow {
                  /* margin:0px!important; */
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

				<div className="mb10 mt10 sortinxdirection">
					{/* {!question_id ? '新建' : '编辑'} */}
					<span className="xingcolor font-16 fl mr4">*</span>
					<span className="xingtigans  fl"><span className="xingtigan">答案选项：</span>点击选项可设置正确答案</span>
				</div>

				{question_choices.map( (item, index) => {
					const bg = standard_answers[index] ? 'check-option-bg' : ''
					return <div className={index>0?"df optionRow mt15": "df optionRow"} key={index} >
						{/* 点击设置答案 */}
						{/* TODO 加了tooltip后，会丢失掉span的class */}
						{/* <Tooltip title={standard_answers[index] ? '点击取消标准答案设置' : '点击设置为标准答案'}> */}
						<span className={`option-item fr mr10 color-grey select-choice ${bg} `}
									name="option_span" onClick={() => this.onOptionClick(index)} style={{flex: '0 0 38px'}}>
                      <ConditionToolTip key={index} title={'点击设置为标准答案'} placement="left" condition={true}>
                        <div style={{width: '100%', height: '100%'}}>{tagArray[index]}</div>
                      </ConditionToolTip>
                  </span>
						{/* </Tooltip> */}
						<div style={{ flex: '0 0 1038px'}}>
							{
								item===undefined||item===null||item===""?
									<QuillForEditor
										autoFocus={false}
										imgAttrs={{width: '146px', height: '136px'}}
										style={{ height: '166px'}}
										placeholder="请您输入题干"
										options={['code-block', 'image', 'formula']}
										value={item}
										onContentChange={(value,quill) => this.onOptionContentChange(value,quill,index)}
									/>
									:
									<QuillForEditor
										autoFocus={false}
										imgAttrs={{width: '146px', height: '136px'}}
										style={{ height: '166px'}}
										placeholder="请您输入题干"
										options={['code-block', 'image', 'formula']}
										value={JSON.parse(item)}
										onContentChange={(value,quill) => this.onOptionContentChange(value,quill,index)}
									/>

							}





						</div>
						{exerciseIsPublish || index<=1?
							<i className=" font-18  ml15 mr20"></i>
							:<Tooltip title="删除">
								<i className="iconfont icon-htmal5icon19 font-18 color-grey-c ml15" onClick={() => this.deleteOption(index)}></i>
							</Tooltip> }
						{ !exerciseIsPublish && index<7 && <Tooltip title={`新增参考答案`}>
							<i className="color-green font-16 iconfont icon-roundaddfill ml6"
								 onClick={() => this.addOption()}
								 style={{float: 'right', visibility: index == question_choices.length - 1 ? '' : 'hidden', marginTop: '2px'}}
							></i>
						</Tooltip>}

					</div>
				}) }



				<div className="mt10">
					<p className="mb10  clearfix">
						{/* {!question_id ? '新建' : '编辑'} */}
						<span className="xingcolor font-16 fl mr4"></span>
						<span className="xingtigan  fl">题目解析：</span>
					</p>
					<div className="mt10"></div>
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
		)
	}
}
// RouteHOC()
export default (SingleEditor);
