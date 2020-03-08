import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {WordsBtn, ActionBtn,SnackbarHOC,getImageUrl,markdownToHTML} from 'educoder';
import axios from 'axios';
import {
	notification,
	Spin,
	Table,
	Pagination,
	Radio
} from "antd";
import './../testioncss/testioncss.css';
const tagArray = [
	'A．', 'B．', 'C．', 'D．', 'E．', 'F．', 'G．', 'H．', 'I．',
	'J．', 'K．', 'L．', 'M．', 'N．', 'O．', 'P．', 'Q．', 'R．',
	'S．', 'T．', 'U．', 'V．', 'W．', 'X．', 'Y．', 'Z．'
]
class Listjihe extends Component {
	constructor(props) {
		super(props);
		this.state = {
			page:1,
			name:"单选题",
			nd:"简单",
			chakanjiexibool:false,
		}
	}
	//初始化
	componentDidMount(){


	}

	chakanjiexibool=()=>{
		if(this.state.chakanjiexibool===true){
			this.setState({
				chakanjiexibool:false
			})
		}else{
			this.setState({
				chakanjiexibool:true
			})
		}

	}
	//选用
	Selectingpracticaltraining=(id)=>{
		let data={
			item_ids:[id]
		}
		this.props.getitem_baskets(data);
	}
	//撤销
	Selectingpracticaltrainings=(id)=>{

		this.props.getitem_basketss(id);
	}


	gotoseesj=(id)=>{
		this.props.history.push(`/paperlibrary/see/${id}`);
	}


	render() {
		let {page,name,nd,chakanjiexibool}=this.state;
		let {defaultActiveKey,items}=this.props;

	   const names=	items&&items.name&&items.name;
	   const question_counts=items&&items.question_count&&items.question_count;
	   const total_scores =items&&items.total_score&&items.total_score;
	   const difficultys=items&&items.difficulty&&items.difficulty===1?"简单":items&&items.difficulty&&items.difficulty===2?"适中":items&&items.difficulty&&items.difficulty===3?"困难":""
		 const update_times=items&&items.update_time&&items.update_time;
	   const quotess =items&&items.quotes&&items.quotes;
	   const authors=items&&items.author&&items.author.name;
		return (
			<div className={" borderwdsst  pd20 mb20 intermediatecenter  listjihecolor "} >
        <div className="sortinxdirection w100s">
           <div className="sjimg intermediatecenter">
						 <img src={getImageUrl("images/educoder/shijuans.png")}  className="imgtp"/>
					 </div>
           <div className="w100s  verticallayout ml20" >
						 <div className="w100s " > <p className="sjtitle xiaoshou" onClick={()=>this.gotoseesj(items.id)}>{names}</p></div>
						 <div className="w100s sortinxdirection mt9">
							 <p className="sjtitles">试题数：<span >{question_counts}</span></p>
							 <p className="sjtitles ml48">总分：<span >{total_scores}</span></p>
							 <p className="sjtitles ml48">难度：<span >{difficultys}</span></p>
						 </div>
						 <div className="w100s sortinxdirection mt11">
						 <div  className="w65s  sortinxdirection">
							 <p className='sjtitlesysl'>
								 更新时间：<span>{update_times}</span>

							 </p>
							 <p className='sjtitlesysl ml30'>
								 使用次数：<span>{quotess}</span>
							 </p>
							 {
								 defaultActiveKey===1||defaultActiveKey==="1"?
									 <p className='sjtitlesysl ml30'>
										 创建者：<span>{authors}</span>
									 </p>
									 :
									 ""
							 }


						 </div>

							 {
								 defaultActiveKey===0||defaultActiveKey==="0"?
							 <div  className="w35s  xaxisreverseorder">
									 <p className="viewparsings  xiaoshou mr25 "  onClick={()=>this.props.showmodelysl(items.id)}>
										 <i className="iconfont icon-shanchu1 font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
										 <span>删除</span>
									 </p>
								 {
									 this.props.Isitapopup&&this.props.Isitapopup==="true"?
										""
										:
										<a >
											<p className="viewparsings  xiaoshou mr25 "  onClick={()=>this.props.Testpapereditor(items.id)}>
												<i className="iconfont icon-bianji2 font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
												<span>编辑</span>
											</p>
										</a>
								 }

								 {
									 items.public === false ?
										 <p className="viewparsings  xiaoshou mr25 " onClick={() => this.props.showmodels(items.id)}>
											 <i className="iconfont icon-gongkai font-17 lg ml7 lh30 icontianjiadaohangcolors mr5"></i>
											 <span>公开</span>
										 </p>
										 :""
								 }
							 </div>
						 :""}



						 </div>
					 </div>

					 <div className="sjfqks reversedirection">
						 <div className="newbutoonss">
							 <p className="newbutoontess" >发起考试</p>
						 </div>
					 </div>

				</div>

			</div>
		)

	}

}
export default Listjihe;
