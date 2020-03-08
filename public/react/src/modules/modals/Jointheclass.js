import React, { Component } from 'react';
import { Modal} from 'antd';
import axios from 'axios';
import Modals from './Modals';
//加入精品课堂
class Jointheclass extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		// console.log("加入精品课堂");
		// console.log(this.props);
		let type=this.props.yslJointhe===undefined?false:this.props.yslJointhe;
		if(type===true){
			this.setState({
				Modalstype:true
			})
		}

	}

	modalCancel=()=>{
   this.props.ysljoinmodalCancel();
	};

	setDownload=()=>{
		let cousestype=this.props.pathcousestypeid;
		let id=this.props.Pathcourseid===undefined?this.props.match.params.coursesId:this.props.Pathcourseid
		let url = `/courses/${id}/join_excellent_course.json`;
		axios.post(url).then((result) => {
			if(result){
				if(result.data){
					if(result.data.status === 0){
						this.props.showNotification(result.data.message);
						this.props.ysljoinmodalCanceltwo();
						if(cousestype===1){
								window.open(`/courses/${id}/informs`)
						}
					}else {
						this.props.showNotification(result.data.message);
					}
				}

			}
		}).catch((error) => {
			console.log(error)
		})

	}


	render() {
		// console.log("加入精品课堂2");
		 //console.log(this.props.Pathcourseid);
		return(
			<Modals
					modalsType={this.props.yslJointhe===undefined?false:this.props.yslJointhe}
					modalsTopval={"是否确定加入该课堂?"}
					modalCancel={()=>this.modalCancel()}
					modalSave={()=>this.setDownload()}
			></Modals>
		)
	}
}

export default Jointheclass;

