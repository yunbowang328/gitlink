import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message,Input,Select} from "antd";
const Option = Select.Option;

class AllocationModal extends Component{
  constructor(props){
    super(props);
    this.state={
      group_ids:[],
      fileList:[],
      textareaval:undefined,
      Inputsval:undefined,
      Allocationval:undefined
    }
  }


  Saves=()=>{
    let {Allocationval}=this.state;
    if(Allocationval===""||Allocationval===undefined){
      this.setState({
        textareavaltype:true
      })
      return
    }
    this.props.Saves(Allocationval)

  }

  handleChange=(value)=>{
     this.setState({
       Allocationval:parseInt(value)
     })
  }
  render(){
    let {textareavaltype,Allocationval}=this.state;
    let {teacherlist}=this.props;
    // console.log(teacherlist)

    return(
      <div>
        <Modal
          keyboard={false}
          className={"HomeworkModal"}
          title={this.props.modalname}
          visible={this.props.visible}
          closable={false}
          footer={null}
          destroyOnClose={true}
        >
          <div className="task-popup-content">

            <p  style={{
              width: '100%',
            }}>
              <span style={{marginLeft: '90px'}}>

                选择：<Select placeholder="请选择交叉评阅老师" style={{ width: 300 }} value={Allocationval} onChange={this.handleChange}>

                        {teacherlist&&teacherlist.map((item,key)=>{
                          return(
                          <Option value={item.id} key={key}>{item.name}</Option>
                          )
                        })}

                    </Select>

              </span>


            </p>
            <p>
              <span className={textareavaltype===true?"color-red ml90":"none"}>请先选择成员</span>
            </p>

            <div className="clearfix mt30 edu-txt-center mb10">
              <a  className="task-btn color-white mr30" onClick={this.props.Cancel}>{this.props.Cancelname}</a>
              <a className="task-btn task-btn-orange" onClick={this.Saves}>{this.props.Savesname}</a>
            </div>

          </div>
        </Modal>
      </div>
    )
  }
}
export default AllocationModal;