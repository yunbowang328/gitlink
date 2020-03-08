import React,{ Component } from "react";
import { Modal,Checkbox} from "antd";


class PublishModals extends Component{
  constructor(props){
    super(props);

  }

  render(){
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
            <p className="task-popup-text-center font-16">
              <span>{this.props.Topval+","}</span>
              <span className={"color-blue underline"} onClick={this.props.skipTop}>
               {this.props.Botvalleft}
              </span>
            </p>

            <p className="task-popup-text-center font-16 mt10">
              {this.props.Botval}
            </p>

            {this.props.starttime===undefined||this.props.endtime===undefined?""
            : <p className="task-popup-text-center font-16 mt20">
                <span className={"font-14 mr20 color979797"}>{this.props.starttime}</span>
                <span className={"font-14 color979797"}>{this.props.endtime}</span>
              </p>}


            <div className="clearfix mt30 edu-txt-center mb10">
                <a  className="task-btn color-white mr30" onClick={this.props.Cancel}>{this.props.Cancelname}</a>
                <a className="task-btn task-btn-orange" onClick={()=>this.props.Saves()}>{this.props.Savesname}</a>
            </div>

          </div>
        </Modal>
      </div>
    )
  }
}
export default PublishModals;