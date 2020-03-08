import React,{ Component } from "react";
import {Tooltip, Modal, Input } from 'antd'
import moment from 'moment'
import { getUrl, WordsBtn } from 'educoder'
import axios from 'axios'
class AddDirModal extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  onInput = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }
  open = () => {
    this.setState({ visible: true, inputValue: '' })
  }
  onSave = () => {
    let coursesId = this.props.match.params.coursesId;
    const url = `/courses/${coursesId}/boards.json`
    let { inputValue } = this.state;
    if (!inputValue) {
      this.setState({ errorMsg: '名称不能为空'})
      return;
    } 
    if (inputValue.length > 20) {
      this.setState({ errorMsg: '名称不能超过20个字'})
      return;
    }
    this.setState({ errorMsg: ''})

    axios.post(url,{
        name: inputValue
      }).then((response)=>{
      if (response.data.status == 0) {
        this.onCancel()
        this.props.showNotification('添加成功')
        this.props.addSuccess && this.props.addSuccess()
      }
    }).catch((error)=>{
      console.log(error)
    })
  }
  onCancel = () => {
    this.setState({ visible: false, inputValue: '', errorMsg: '' })
  }
  render(){
    let { inputValue, visible, errorMsg } = this.state;
    const { title } = this.props;
    return(
        <Modal
             keyboard={false}
             title={title}
             visible={visible}
             className={"Navmodal"}
             closable={false}
             footer={null}
             destroyOnClose={true}
             centered={true}
           >
             <div className="df">
                <div className={"fl mt5"}>{this.props.label}：</div>
                <Input placeholder={this.props.inputPlaceholder || '示例：讨论小组A'}
                    className={"input-flex-35 greyInput fl"}
                    maxLength="60"
                    value={inputValue}
                    onInput={this.onInput}
                />
             </div>

             {errorMsg && <span style={{color: 'red', marginTop: '2px', display: 'inline-block' }}>{errorMsg}</span>}
             
             {/* {this.state.NavmodalValuetype===true?<span className={"color-red"}>
                 {this.state.NavmodalValues}
             </span>:""} */}

             {/* this.state.NavmodalValuetype===true?"clearfix mt20 edu-txt-center": */}
             <div className={"clearfix mt50 edu-txt-center"}>
               <a  className="task-btn mr30" onClick={this.onCancel}>取消</a>
               <a className="task-btn task-btn-orange" onClick={this.onSave}>确定</a>
             </div>
           </Modal>
      )
    }
}
export default AddDirModal;