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
import './../questioncss/questioncom.css';
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
		let {page}=this.state;
		let {selectionbools}=this.props;

		return (

			<div className=" clearfix mt5 Contentquestionbankstyle">
				<div className="educontent   w100s">
					<div className="sortinxdirection w100s" >
						<div className="sortinxdirection w50s">
							{
								selectionbools===true?
									<Checkbox checked={this.props.selectallquestionsonthispages} onChange={()=>this.props.selectallquestionsonthispage()} disabled></Checkbox>
									:
									<Checkbox checked={this.props.selectallquestionsonthispages} onChange={()=>this.props.selectallquestionsonthispage()}></Checkbox>

							}
							<p className="setequesbank ml20">选用本页全部试题</p>
						</div>
						<div className="xaxisreverseorder testpaper w50s">
							共{this.props.items_count?this.props.items_count:0}个试题
						</div>
					</div>




				</div>
			</div>
		)

	}



}
export default Contentquestionbank ;