import React, { Component } from "react";
import { Input} from "antd";
import axios from 'axios'
import ModalWrapper from "../../common/ModalWrapper"
class AddStudentModal extends Component{
  constructor(props){
    super(props);
    this.state={
      name: ''
    }
  }
  componentDidMount() {
    
    
  }
  setVisible = (visible) => {
    this.refs.modalWrapper.setVisible(visible)
    if (visible == false) {
      this.setState({
        name: ''
      })
    }
  }

  onSendOk = () => {
    if(!this.state.name || !this.state.name.trim()) {
      this.props.showNotification('请先输入答辩组名称。')
      return;
    }
    const courseId = this.props.match.params.coursesId   
    const url = `/courses/${courseId}/create_graduation_group.json`
    const params = { 
      "name": this.state.name
    }
    axios.post(url, params)
    .then((response) => {
      if (response.data.status == 0) {
        this.setVisible(false)
        this.props.onOk && this.props.onOk();
        this.props.showNotification('添加成功')
      }
    })
    .catch(function (error) {
      console.log(error);
    }); 
  }

  onOk = () => {
    this.onSendOk()
  }

  render(){
    const { name  } = this.state
    const { moduleName } = this.props

    return(
      <ModalWrapper
        ref="modalWrapper"
        width="600px"
        title={`添加答辩组`}
        {...this.props }
        onOk={this.onOk}
        className="addGraduationGroupModal"
      >
        <div style={{width: '100%', textAlign: 'center'}}>
            <span>名称：</span>
            <Input style={{width: '210px'}} value={name} onChange={(e)=> this.setState({name: e.target.value})}
              placeholder={'示例：李老师答辩组'}
            ></Input>
        </div>
      </ModalWrapper>
    )
  }
}
export default AddStudentModal;
