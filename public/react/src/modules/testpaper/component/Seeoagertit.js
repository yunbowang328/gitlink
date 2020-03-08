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
class Seeoagertit extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:1,
		}
	}
	//初始化
	componentDidMount(){


	}
	onChange=(e)=> {
	}

	render() {

		return (

			<div className="w100s mt20 mb20 backgroudwhites" style={{
				position: "relative",
			}}>
				<div className="w100s sortinxdirection">
					<div className="w70s sortinxdirection">
						<p className="questionstishu lh34">题数：{this.props.all_score}</p>
						<p className="ml58 questionstotal lh34">总分：{this.props.all_questions_count}</p>
					</div>
				</div>
				<div className="questiontypeheng w100s mt19 mb19"></div>
				<div className="w100s sortinxdirection">
					<div className="pagertdstcolor w50s sortinxdirection">拖动试题可调整排序</div>


				</div>
			</div>
		)

	}



}
export default Seeoagertit ;
