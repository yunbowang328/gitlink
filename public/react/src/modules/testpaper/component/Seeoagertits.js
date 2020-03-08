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
	jixuxuantioncli = () => {
		this.props.history.replace("/question");
	}

	render() {

		return (

			<div className="w100s mt20 mb20 backgroudwhites" style={{
				position: "relative",
			}}>
				<div className="w100s sortinxdirection">
					<div className="w70s sortinxdirection">
						<p className="questionstishu lh34">题数：{this.props.all_score}</p>
						<p className="ml58 questionstishu  lh34">总分：<span className="questionstotal">{this.props.all_questions_count}</span></p>
						<p className="ml58 questionstishu   lh34">难度：<span className="questionstotal">
							{this.props.difficulty===undefined?"":
								this.props.difficulty===1?"简单":this.props.difficulty===2?"适中":this.props.difficulty===3?"困难":""
							}
						</span></p>

					</div>
					<div className="w30s xaxisreverseorder">
						<div className="jixuxuanti xiaoshou" onClick={() => this.props.setnewmyshixunmodelbool(true)}>
							继续选题
						</div>
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
