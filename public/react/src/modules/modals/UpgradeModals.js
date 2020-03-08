import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Spin, Icon , Modal} from 'antd';
import moment from 'moment';
class UpgradeModals extends Component {
  constructor(props) {
    super(props);
    this.state = {
			system_updates:false
    }
  }

  updatasmodals=()=>{
		let {updata} = this.props;
		if(updata&&updata.system_update===true){
			let SystemUpdateEndTime = localStorage.getItem('SystemUpdateEndTime');
			if(SystemUpdateEndTime===null){
				this.setState({
					system_updates:true
				})
			}else if(SystemUpdateEndTime===undefined){
				this.setState({
					system_updates:true
				})
			}else if(moment(SystemUpdateEndTime) < moment(updata.end_time)){
				this.setState({
					system_updates:true
				})
			}
		}
	}

	componentDidMount() {
    this.updatasmodals()
	}

	componentDidUpdate(prevProps){
		// if (prevProps.data!=this.props.updata){
		// 	this.updatasmodals()
		// }
	}

	setmodalSave=()=>{
		let {updata}=this.props;
		localStorage.setItem('SystemUpdateEndTime',updata.end_time);
		this.setState({
			system_updates:false
		})
	}


render() {
    // const antIcons = <Icon type="loading" style={{ fontSize: 24 }} spin />
	{/*<Spin indicator={antIcons} spinning={this.state.system_updates} >*/}

	{/*</Spin>*/}
	  let {system_updates}=this.state;
    let {updata}=this.props;
    return(
         <Modal
          keyboard={false}
          title={updata&&updata.subject}
					visible={system_updates}
          // visible={this.props.modalsType===undefined?false:this.props.modalsType}
          closable={false}
          footer={null}
          destroyOnClose={true}
          centered={true}
          width="530px"
        >
					 <div className="task-popup-content">
              <pre className="break-word break-word-firefox">{updata&&updata.system_score}</pre>
						 <div className="clearfix edu-txt-center mt20">
							 <a className="task-btn task-btn-orange pop_close" onClick={()=>this.setmodalSave()}>知道啦</a>
						 </div>
					 </div>
        </Modal>
    )
  }
}

export default UpgradeModals;