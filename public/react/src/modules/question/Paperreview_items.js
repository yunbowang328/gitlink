import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn, getImageUrl,markdownToHTML} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Drawer,
	Input,
	Button,
	Breadcrumb
} from "antd";
import Itembankstop from "./component/Itembankstop";
import NoneData from './component/NoneData';
import './questioncss/questioncom.css';
import '../tpm/newshixuns/css/Newshixuns.css';
import Paperreview_single from "./Paperreview_single";

//判断题
class Paperreview_items extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}

	}

	//初始化
	componentDidMount() {




	}


	getdata = (data) => {

	}

	preservation = () => {




	}


	setitem_type = (item_type) => {


	}

	render() {
		let {paperreviewsingleindex,paperreviewsinglename,typenames,indexs,object,typenamesn}=this.props;

		// //console.log(object);
		// //console.log("Paperreview_items");
		// //console.log(object.item_id);
		return (
			<div>
				{
					paperreviewsingleindex===indexs&&paperreviewsinglename===typenames?
						<div 	 className="xaxisreverseorder mt25 mr2">
							<div className="scd xiaoshou" onClick={()=>this.props.showsetmodalsTypedels(object.item_id,true,1)}>删除</div>
							{
								this.props.match.params.type==="Intelligence"?
									<div className="szdfds xiaoshou" onClick={() =>this.props.Changingtopics(object.item_id)}>换题</div>
									:
									""
							}
							<div className="szdfd xiaoshou" onClick={()=>this.props.Singlemagazines(true,object.id,typenamesn)}>设置得分</div>
						</div>
						:	<div  className="xaxisreverseorder mt25 ">
						</div>
				}
				<Paperreview_single paperreviewsingleindex={paperreviewsingleindex}
														name={typenames}
														key={indexs}
														showparagraphs={(e,name) => this.props.showparagraphs(e,name)}
														objectsingle={object} key={indexs} indexx={indexs + 1}
														indexxy={indexs}
														hideparagraphs={() => this.props.hideparagraphs()}></Paperreview_single>
			</div>
		)

	}


}

export default Paperreview_items


