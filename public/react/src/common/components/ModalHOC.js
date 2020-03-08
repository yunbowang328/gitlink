import React, { Component } from 'react';
import { Modal } from 'antd';


export function ModalHOC(options = {}) {
	return function wrap(WrappedComponent) {
	    return class Wrapper extends Component {
	      	constructor(props) {
		        super(props);
                
		        this.state = {
		        	 titlemessage: '',
		        	 Modallist: false,
                     Modallisttype: false,
					 singleButton: false
		        }
	      	}

	      	// 全局的modal this.props.showModal 调用即可
			showModal = (title, content, okCallback) => {
				this.okCallback = okCallback;
				this.setState({
					titlemessage: title,
					Modallist: content,
					Modallisttype: true,
					singleButton: false,

				})
			}

			showSingleButtonModal = (title, content) => {
				this.setState({
					titlemessage: title,
					Modallist: content,
					Modallisttype: true,
					singleButton: true,
				})
			}

			onCancel = () => {
				this.setState({
                    Modallisttype:false
                })
			}
            hidemodeldelete = () => {
				if (this.okCallback) {
					this.okCallback()
				}
                
				this.onCancel()
            }
	      	render() {
		        const { titlemessage, Modallisttype, Modallist, singleButton } = this.state;
		        
		        return (
		        	<React.Fragment>
		        		<Modal
									          keyboard={false}
									          title={titlemessage}
                            // visible={modeldelet===true&&listid===list.id?true:false}
                            visible={Modallisttype}
                            className={"ecmodeldelet"}
                            closable={false}
                            footer={null}
                        >
                            <div className="task-popup-content"  >
                                <div className="task-popup-text-center font-14">{Modallist}</div>
                            </div>
                            { singleButton ? <div className="task-popup-submit clearfix"
									style={{ textAlign: 'center' }}>
                                <a  className="task-btn task-btn-orange"
                                    onClick={this.onCancel}
                                >知道啦</a>
                            </div> : <div className="task-popup-submit clearfix">
                                <a onClick={this.onCancel} className="task-btn fl">取消</a>
                                <a  className="task-btn task-btn-orange fr"
                                    onClick={this.hidemodeldelete}
                                >确定</a>
							</div> }
                        </Modal>
			            <WrappedComponent {...this.props} 
							showModal={ this.showModal } 
							showSingleButtonModal={ this.showSingleButtonModal } 
							>
			       	
			            </WrappedComponent>
		          	</React.Fragment>
		        )
	      	}
	    }
	}
}



/**

import { ModalHOC } from '../common/ModalHOC'

export default ModalHOC() (XXXComponent) ;

this.props.showModal('提示', '确定要删除吗？', () => {
    this.remove(k)
})

 */