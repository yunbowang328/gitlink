import React, { Component } from 'react';

import CodeMirror from 'react-codeMirror'

require('codemirror/lib/codemirror.css');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
/*

*/
class TestCodeMirror extends Component {
	constructor(props) {
		super(props)

		this.updateCode = this.updateCode.bind(this)

		this.state = {
			code: '// Code\n //2 \n //3 \n //4 \n //5 \n\n\n\n\n\n\n'
		}
	}

	updateCode(newCode) {
		this.setState({
			code: newCode,
		});
	}

	componentDidMount() {
		var readOnlyLines = [0,1,2,3,8];
		
		this.refs.editor.getCodeMirror().on('beforeChange',function(cm,change) {
			console.log('change.from.line', change.from.line)
		    if ( readOnlyLines.indexOf(change.from.line) !== -1 
					// 有问题：如果用回车将有内容的行挤到不可编辑的行，那么无法删除掉不可编辑行里的内容了
					// 解决办法：将所需的行数固定写好，禁用掉回车键。
		    		// || change.from.line > ( readOnlyLines[readOnlyLines.length -1] + 1 ) 
		    		) {
		        change.cancel();
		    }
		});
	}
	setCode() {
		this.setState({
			code: 'test'
		})
	}

	render() {
		var options = {
			lineNumbers: true,
			mode: 'javascript',
		};
		return (
			<div>
				<button onClick={this.setCode.bind(this)}>set</button>
				<CodeMirror ref="editor" value={this.state.code} onChange={this.updateCode} options={options} />
			</div>
		)
	}
}

export default TestCodeMirror;