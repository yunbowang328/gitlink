import React, { Component } from 'react';
import { ActionBtn } from 'educoder'

import { Form , Modal , Input , Breadcrumb , Button } from 'antd'

import { Link } from 'react-router-dom'

import axios from 'axios'

/**
        ---------------------------- START
 */
function getModeByMirrorName(mirror_name) {
  let mode = 'javascript'
  if (mirror_name && mirror_name.length) {
      for (let i = 0; i < mirror_name.length; i++) {
          let modeVal = mirrorNameModeMap[mirror_name[i]];
          if (modeVal) {
              mode = modeVal;
              break;
          }
      }
  }
  return mode;
}
const _extraKeys = {"Alt-/": "autocomplete"};
function createCMOptions(mirror_name) {
  let mode = getModeByMirrorName(mirror_name)

  let cmOptions = {
      lineNumbers: true,
      mode: mode,
      theme: "railscasts",
      indentUnit:4,
      matchBrackets: true,
      autoRefresh: true,
      smartIndent: true,//智能换行
      extraKeys: _extraKeys,
      autofocus: true,
      styleActiveLine: true,
      lint: true,
      gutters: ["CodeMirror-linenumbers", "breakpoints", "CodeMirror-lint-markers"]
  };
  return cmOptions;
}

const mirrorNameModeMap = {
  'JFinal': 'text/x-java',
  'Java': 'text/x-java',
  'Kotlin': 'text/x-kotlin',
  'C/C++' : 'text/x-c++src',
  'MachineLearning': {
              name: "python",
              version: 3,
              singleLineStringErrors: false
  },
  'Python2.7': {
              name: "python",
              version: 3,
              singleLineStringErrors: false
  },
  'Python3.6': {
              name: "python",
              version: 3,
              singleLineStringErrors: false
  },
}
/**
      ---------------------------- END
*/

class RepositoryAddFile extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let cmOptions = createCMOptions(this.props.mirror_name)
    const extend_editor = window.CodeMirror.fromTextArea(window.$('#codemirror-file-edit')[0]
        , cmOptions);

    // tpi没setValue也可以
    extend_editor.setValue('')
    extend_editor.refresh();

    // 拖拽也需要用 ： window.editor_CodeMirror.refresh()
    window.editor_tempCodeMirror = extend_editor;
    this.extend_editor = extend_editor;
  }
  
  checkPath= (rule, value, callback) =>{
    if(!value){
      callback('文件名不能为空');
    }else if (value == "/" || value.indexOf('.') == -1 ) {
      callback('请输入正确的文件路径，如：src/HelloWorld.java');
    }else{
      callback();
    }
  }

  handleSubmit = () =>{
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        let shixunId = this.props.match.params.shixunId;
        let url = `/shixuns/${shixunId}/add_file.json`
        axios.post(url,{
          path:values.path,
          message:values.message,
          content:this.extend_editor.getValue()
        }).then((result)=>{
          if(result){
            this.props.history.push(`${result.data.url}`)
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    })
  }
  render(){
    const {getFieldDecorator} = this.props.form;
    let { shixunId } = this.props.match.params;
    return(
      <div className="educontent">
        <style>
          {`
            .formStyle .ant-form-item{
              margin-bottom:10px!important;
            }
            .formStyle .ant-col.ant-form-item-label{
              margin-left:-10px;
              line-height:30px;
              margin-bottom:10px;
            }
            .breadcrumb .ant-breadcrumb-separator{
              margin:0px 2px;
            }
            .backgroudwhite{
             display:none;
            }
            /*.filecode .CodeMirror.cm-s-railscasts{
              border:1px solid #E5E5E5;
            }
            .filecode .CodeMirror.cm-s-railscasts .CodeMirror-sizer,.filecode .CodeMirror-gutters,.filecode .CodeMirror-scroll{
              background:#fff;
            }
            .filecode .CodeMirror-linenumber{
              text-align:center
            }*/
          `}
        </style>
        <p className="mt10 mb10">
          <Breadcrumb separator='>' className="breadcrumb">
            <Breadcrumb.Item href='/shixuns'>实训项目</Breadcrumb.Item>
            <Breadcrumb.Item href={`/shixuns/${shixunId}/repository`}>版本库</Breadcrumb.Item>
            <Breadcrumb.Item>添加新文件</Breadcrumb.Item>
          </Breadcrumb>
        </p>
        <Form onSubmit={this.handleSubmit} className="formStyle">
          <div className="edu-back-white padding20-30 mb10">
            <Form.Item label="文件名">
              {getFieldDecorator('path', {
                rules: [
                  {
                    validator:this.checkPath
                  }]
              })(
                <Input placeholder="输入文件路径名，如：src/HelloWorld.java" className="winput-300-35 fl"/>
              )}
            </Form.Item>
          </div>
          <div className="edu-back-white padding30">
            <p className="ant-form-item-label">
              <label>内容</label>
            </p>

            <div className="mt10 mb25 repoCMWrapper filecode">
              <textarea className="" id="codemirror-file-edit" style={{display:'none'}} name="content"></textarea>
            </div>

            <Form.Item label="提交信息">
              {getFieldDecorator('message', {
                rules: [{required: true, message: "请输入提交信息"}],
              })(
                <textarea className="winput-100-130 fl"></textarea>
              )}
            </Form.Item>
          </div>
          <div className="clearfix mt30 edu-txt-right mb30">
            <Button type="primary" className="defalutSubmitbtn fr ml20" onClick={this.handleSubmit}>提交</Button>
            <Link className="defalutCancelbtn fr" to={`/shixuns/${shixunId}/repository`}>取消</Link>
          </div>
        </Form>
        
      </div>
    )
  }
}
const WrappedRepositoryAddFile = Form.create({name: 'taskRepositoryAddFile'})(RepositoryAddFile);
// RouteHOC()
export default (WrappedRepositoryAddFile);