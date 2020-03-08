import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn,SnackbarHOC,getImageUrl} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Radio,
	Checkbox
} from "antd";
import './../testioncss/testioncss.css';
class Contentquestionbank extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:1,
		}
	}
	//初始化
	componentDidMount(){
		//////console.log("componentDidMount");
		//////console.log(this.state);
		//////console.log(this.props);
		// let homeworkid = this.props.match.params.homeworkid;
		// let url = "/homework_commons/" + homeworkid + "/end_groups.json";
		// axios.get(url).then((response) => {
		// 	if (response.status === 200) {
		// 		this.setState({})
		// 	}
		// }).catch((error) => {
		// 	//////console.log(error)
		// });

	}
	onChange=(e)=> {
		//////console.log(`checked = ${e.target.checked}`);
	}

	render() {

		return (

			<div className=" clearfix  Contentquestionbankstyle">
				<div className="educontent   w100s">
					<div className="sortinxdirection w100s" >
						<div className="sortinxdirection w50s">

						</div>
						<div className="xaxisreverseorder testpaper w50s">
							共{this.props.items_count?this.props.items_count:0}个试卷
						</div>
					</div>




				</div>
			</div>
		)

	}



}
export default Contentquestionbank ;
