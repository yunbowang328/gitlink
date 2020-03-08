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
import '../../question/questioncss/questioncom.css';
import '../../tpm/newshixuns/css/Newshixuns.css';
import Paperreview_single from "../../question/Paperreview_single";

//判断题
//这不是唯一的 试题库还有Paperreview_items
class Paperlibraryseeid_itemsss extends Component {
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

		return (
			<div>
				{
					paperreviewsingleindex===indexs&&paperreviewsinglename===typenames?
						<div 	 className="xaxisreverseorder mt25 mr2">
							<div className="scd xiaoshou" onClick={()=>this.props.showsetmodalsTypedels(object.id,true,1)}>删除</div>
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

export default Paperlibraryseeid_itemsss


