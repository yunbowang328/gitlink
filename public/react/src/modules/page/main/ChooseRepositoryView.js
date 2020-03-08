import React, { Component } from 'react';

import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';

import PropTypes from 'prop-types';

import { createForm } from 'rc-form';

import CheckBoxGroup from '../component/CheckBoxGroup'
import { withStyles } from 'material-ui/styles';

import classNames from 'classnames';
import './ChooseRepositoryView.css'

import './ChooseView.css';

const myStyles = theme => ({
  // root: {
  //   color: 'inherit',
  //   textDecoration: 'inherit',
  //   '&:hover': {
  //     textDecoration: 'underline',
  //   },
  // },
  // 使用主题的主色
  primary: {
    color: theme.palette.primary.main,
  },
  radio: {
    // '&$checked': {
    //   color: '#4B8DF8'
    // }
	color: 'rgb(139, 147, 153)'
  },
  checked: {}
});

const styles = {
  block: {
    maxWidth: 250
  },
  radioButton: {
    // marginBottom: 16,
  },
};
const iconStyle = {
	marginRight: 5
}
const groupStyle = {
	fontSize: '16px',
    fontWeight: 'bold'
}
const selectedOptionValueStyle = {
	// color:'rgb(0, 188, 212)',
	 fontSize: 18
}

const optionValueArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']


class ChooseRepositoryView extends Component {


/*
category:1
challenge_question:[{positon: 0, option_name: "所有计算机上都应使用的软件"}, {positon: 1, option_name: "能被各用户共同使用的软件"},…]
subject:"计算机中的应用软件是指："

option_name:"所有计算机上都应使用的软件"
positon:0
*/
	componentDidMount() {
		this.props.chooseQfun(this)
	}
	renderChooseQuestions() {
		const { getFieldDecorator } = this.props.form;
		const { choose, choose_test_cases } = this.props;
		if (!choose) {
			return ""
		}
		// 初始化  initialValue + defaultSelected  defaultSelected={``}
		// {this.renderChoiceItems(item, index)}	
		// String.valueOf(index)
		var choiceQuestionComponent = choose.map( (item, index) => {
			var choose_test = choose_test_cases.test_sets[index];
			const { actual_output } = choose_test;

			// category = 1 为单选题   2 为多选题

			//  <p style={{paddingLeft:'27px'}}>{item.subject}</p>
			/*
				<ReactMarkdown 
                    	source={item.subject} style={{paddingLeft:'27px'}}
                    	renderers={{code: CodeBlock}}
                    	/>
			*/
			const len = item.challenge_question.length
			const actual_output_array = actual_output ? actual_output.split('') : []
			const initialValueArray = [];
			actual_output_array.forEach( item => {
				const i = optionValueArray.indexOf(item);
				initialValueArray[i] = item
			})
			
			return (
				<div id={`choice${index}`} key={index} className="mb15">
					{/* <div style={groupStyle}>
						{( item.category === 1 ? "单选题" : "多选题" )}
                    </div> */}
					<div className="clearfix">
						<span className="fl" style={{"color":"#8B9399"}}>{index+1}.</span>
						<div id={`choose_subject_${index+1}`} className="fl choiceMD">
							<textarea style={{display:'none'}}>{item.subject}</textarea>
						</div>
					</div>
                    
					<div>
						{getFieldDecorator("" + (index), {
		  					initialValue: item.category === 1 ? actual_output : (actual_output && actual_output.split(''))
		  				})(
		  					 item.category === 1 ? 
							    <RadioGroup name={`${index}`} defaultSelected={actual_output} className="radiogroup">
							    	{this.renderChoiceItems(item, index)}
							    </RadioGroup>
							    : this.renderMultiChoiceItems(item, index, initialValueArray)
							
						    )
		  				}	    	
					</div>
				</div>
			)
		})

		return choiceQuestionComponent
	}

	_toHtml(contentStr) {
		// html字符表 https://www.beejson.com/word/htmlzhuanyi.html
		return contentStr.replace(/</g, '&lt;').replace(/\r\n/g, '</br>')
	}
	renderChoiceItems(item, index) {
		const { classes } = this.props;
		var ar =  []
		var fVal = this.props.form.getFieldsValue();
		item.challenge_question.map((optionItem, optionIndex) =>{
			const isSelected = fVal[index] === optionValueArray[optionIndex]

			// test optionItem.option_name = '<div>11</div><div>11</div>12'  // '1\r\n2\r\n3\r\n'
			const showText = this._toHtml(optionItem.option_name)
			/*
	<div style={ { display: 'inline-block'} }
		        				dangerouslySetInnerHTML={{__html: optionItem.option_name}}>
		        			</div> 
		        			<textarea value={optionItem.option_name}></textarea>
			*/
			ar.push(
				<FormControlLabel key={`${optionItem.option_name + optionIndex}`} value="male" control={
					<Radio
						// color="primary"
						classes={{root: this.props.classes.radio,
							checked: this.props.classes.checked}}
						checked={isSelected}
						
				        value={`${optionValueArray[optionIndex]}`}
				    	
				        style={styles.radioButton}
				    />
				} label={<div className="break-word" style={{lineHeight:"24px"}}>
		        			<div style={ { display: 'inline-block',"color":"#8B9399"} }>
		        					{optionValueArray[optionIndex]}、
		        			</div>
		        			<div style={ { display: 'inline-block',"color":"#8B9399"} }
		        				dangerouslySetInnerHTML={{__html: showText}}>
		        			</div> 
		        			
		        			
		    			</div>} ></FormControlLabel>
		    )
		})
		// 
		// <span style={ isSelected ? { fontSize: 16} : {}}> {optionItem.option_name}</span>
		return ar
	}


	renderMultiChoiceItems(item, index, initialValueArray) {
		return <CheckBoxGroup 
			{...this.props}
			options={item.challenge_question} initialValueArray={initialValueArray}
			itemLabelFunction={(option, index)=> {
				// option.option_name = '1\r\n2\r\n3\r\n'
				const showText = this._toHtml(option.option_name)
				return (
					<div className="break-word" style={{lineHeight:"24px"}}>
						<div style={ { display: 'inline-block',"color":"#8B9399"} }>
        					{optionValueArray[index]}、
	        			</div>
	        			<div style={ { display: 'inline-block',"color":"#8B9399"} }
	        				dangerouslySetInnerHTML={{__html: showText}}>
	        			</div> 
		        	</div>
					)
				
			}}
			itemValueFunction={(option, index)=> {return optionValueArray[index]}}></CheckBoxGroup>
	}

	submit = () => {
	    this.props.form.validateFields((error, value) => {
	      	console.log(error, value);
	      	var valueArray = [];
	      	var unSelectOptionIndexArray = []
			for(var key in value) {
				valueArray[parseInt(key)] = value[key];
				if (!value[key]) {
					unSelectOptionIndexArray.push(key)
				}
			}
			if (unSelectOptionIndexArray.length) {
				var unSelectOptionIndex = unSelectOptionIndexArray[0]
				var _unSelectOptionDom = window.$('#games_repository_contents #choice' + unSelectOptionIndex )[0]
				_unSelectOptionDom.scrollIntoView()
			}
			console.log(unSelectOptionIndexArray, valueArray)
	    });
	}

	/*
		<button onClick={this.submit}>submit</button>
	*/
  	render() {

        const { repositoryCode, onRepositoryCodeUpdate, showFilesDrawer, drawerOpen, loadingFirstRepoFiles, loading, choose } = this.props;

	    return (
            <React.Fragment>
            	{ loading === true ? 
            		''
            	: 
            		<div id="choiceRepositoryView" style={{"color":"#8B9399!important"}}>
            			{this.renderChooseQuestions()}
            		</div>
            	}
            	
		    </React.Fragment>
	    );
  	}
}

export default createForm()( withStyles(myStyles)( ChooseRepositoryView ) );
