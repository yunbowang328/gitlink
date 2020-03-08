import React,{ Component } from "react";
import { Modal,Input, Checkbox, Spin} from "antd";
import '../css/members.css'

class ModalWrapper extends Component{
  constructor(props){
    super(props);
    this.state={
      visible:false,
    }
  }
  setVisible=(visible)=>{
    this.setState({
      visible
    })
  }
  onCancel = () => {
    this.setVisible(false)
    this.props.onCancel && this.props.onCancel()
  }
  onOk = () => {
    this.props.onOk && this.props.onOk()
  }
  render(){
    let {flag, visible}=this.state
    let { onOk, cancelText, okText, title, width, className, bottomRender, loading}=this.props;

    return(
        <Modal
            title={ title }
            visible={visible}
            closable={false}
            width={ width || "600px" }
            footer={null}
            destroyOnClose={true}
            centered={true}
            className={className || ''}
            keyboard={false}
        >
          {
             visible == true ? <style>
               {
                 `
              body {
							  overflow: hidden !important;
							}
              `
               }
             </style>:""
           }
          <Spin spinning={!!this.props.loading}>
          <div className="newupload_conbox clearfix">
              {this.props.children}
              {this.props.checkBoxValuestype===true?<div className={"mt10 color-red"}>
                      请先选择课堂
              </div>:""}
              <div className="mt20 marginauto clearfix edu-txt-center">
                <a onClick={this.onCancel} className="pop_close task-btn mr30">{ cancelText || '取消' }</a>
                <a onClick={this.onOk} className="task-btn task-btn-orange" id="submit_send_shixun">{ okText || "确定" }</a>
              </div>
              { bottomRender }
          </div>
          </Spin>
        </Modal>
    )
  }
}
export default ModalWrapper;