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

//多选题
class Paperreview_multlple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			questions:0,
			totalscore:0,
			total:0,

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
		let {questions,totalscore,total,items} = this.state;
		// ////console.log(params);
		return (
			<div className="w100s borderwdswuh  mt25 mb20 " style={{
				minHeight: "114px",
			}}>


				{/*顶部*/}
				<div className="w100s sortinxdirection">
					<div className=" listjihetixingstit markdown-body"  style={{wordBreak: "break-word"}} dangerouslySetInnerHTML={{__html: markdownToHTML(items&&items.name).replace(/▁/g, "▁▁▁")}}>
					</div>
				</div>
				{/*内容*/}
				{/*<div className="w100s sortinxdirection">*/}

				{/*	<p className="w100s listjihetixingstits sortinxdirection ">*/}
				{/*		{*/}
				{/*			items.item_type==="JUDGMENT"?*/}
				{/*				items === undefined ||items === null? "" : items.choices.map((object, index) => {*/}
				{/*					return (*/}
				{/*						<p className={index===1? "sortinxdirection  ml10":"sortinxdirection  " }  >*/}
				{/*							<Radio checked={object.is_answer}>*/}
				{/*								{object.choice_text}*/}
				{/*							</Radio>*/}
				{/*						</p>*/}
				{/*					)*/}
				{/*				})*/}
				{/*				:*/}
				{/*				items === undefined ||items === null? "" : items.choices.map((object, index) => {*/}
				{/*					return (*/}
				{/*						<p className="sortinxdirection " >*/}
				{/*							{tagArray[index]}*/}
				{/*							<p style={{wordBreak: "break-word"}} dangerouslySetInnerHTML={{__html: markdownToHTML(object.choice_text).replace(/▁/g, "▁▁▁")}}></p>*/}
				{/*						</p>*/}
				{/*					)*/}
				{/*				})*/}
				{/*		}*/}

				{/*	</p>*/}
				{/*</div>*/}
			</div>
		)

	}


}

export default Paperreview_multlple


