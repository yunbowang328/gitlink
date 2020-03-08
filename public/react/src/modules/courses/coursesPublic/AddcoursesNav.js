import React,{ Component } from "react";
import { Modal,Checkbox,Input,Select} from "antd";
const Option = Select.Option;

class AddcoursesNav extends Component{
  constructor(props){
    super(props);
    this.state={
      StudentList_value:""
    }
  }



  render(){
    // let {StudentList_value}=this.state;
    // let {child}=this.props;
    //
    return(
      <div>

        <Modal
          title={this.props.addname}
          visible={this.props.addnametype}
          keyboard={false}
          className={"Navmodal"}
          closable={false}
          footer={null}
          destroyOnClose={true}
          centered={true}
          width={"600px"}
        >

          {this.props.addnametab===2?
            <div>
                <div className={"fl mt5"}>目录名称：</div>
                <Input placeholder="请输入名称，最大限制60个字符"
                       className={"inputNav greyInput fl mb40"}
                       maxLength="60"
                       style={{width:'450px'}}
                       // value={NavmodalValue}
                       // onInput={this.setNavmodalValue}
                />
                <div className="clearfix mt70 edu-txt-center">
                    <a  className="task-btn mr30" onClick={this.props.addcanner}>取消</a>
                    <a className="task-btn task-btn-orange" onClick={this.props.addsave}>确定</a>
                </div>
            </div>
           : this.props.addnametab===4?
              <div>
                  <div className={"fl mt5"}>选择目录名称：</div>

                  <Select placeholder="请选择目录"  className={"inputNav greyInput fl mb40"}  style={{width:'420px'}} >
                    <Option value="jack">一级</Option>
                    <Option value="lucy">一级</Option>
                    <Option value="disabled">一级</Option>
                    <Option value="Yiminghe">一级</Option>
                  </Select>

                  <div className="clearfix mt70 edu-txt-center">
                      <a  className="task-btn mr30" onClick={this.props.addcanner}>取消</a>
                      <a className="task-btn task-btn-orange" onClick={this.props.addsave}>确定</a>
                  </div>
              </div>
            :""}
        </Modal>

      </div>
    )
  }
}
export default AddcoursesNav;


