import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Spin, Icon , Modal} from 'antd';
class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      funmodalsType:false,
      istype:false
    }
  }
render() {
    const antIcons = <Icon type="loading" style={{ fontSize: 24 }} spin />
    return(
         <Modal
          className={this.props.className}
         keyboard={false}
          title="提示"
          visible={this.props.modalsType===undefined?false:this.props.modalsType}
          closable={false}
          footer={null}
          destroyOnClose={true}
          centered={true}
          width="530px"
        >
					 {this.props.modalsType===true?<style>
						 {
						 	`
						 	body{
						 	     overflow: hidden !important;
						 	 }
						 	 .ant-modal-body {
                    padding: 20px 40px;
                }
                .color848282{
                   color:#848282;
                }
						 	`
						 }
					 </style>:""}
            <Spin indicator={antIcons} spinning={this.props.antIcon===undefined?false:this.props.antIcon} >
              <div className="task-popup-content">
                <p className="task-popup-text-center font-16">{this.props.modalsTopval}</p>
								{this.props.modalsMidval===undefined?"":<p className={this.props.modalstyles?"task-popup-text-center font-16 mt5 color848282":"task-popup-text-center font-16 mt5"}>{this.props.modalsMidval}</p>}
                <p className={this.props.modalstyles?"task-popup-text-center font-16 mt5 color848282":"task-popup-text-center font-16 mt5"}
                >{this.props.modalsBottomval}</p>
                {this.props.loadtype===true?
                  <div className="clearfix edu-txt-center mt20">
                    <a className="task-btn task-btn-orange pop_close" onClick={this.props.modalSave}>知道啦</a>
                  </div>
                  :
                  <div className="clearfix mt30 edu-txt-center">
                    <a  className="task-btn mr30" onClick={this.props.modalCancel}>取消</a>
                    <a className="task-btn task-btn-orange" onClick={this.props.modalSave}>{this.props.okText || '确定'}</a>
                  </div>
                }
              </div>
            </Spin>
        </Modal>
    )
  }
}

export default Modals;