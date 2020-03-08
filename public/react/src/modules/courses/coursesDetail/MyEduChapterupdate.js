import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import { Modal,Checkbox,Tree} from 'antd';
import axios from 'axios';
import './chapterupdate.css'
const { TreeNode } = Tree;
//立即章节选择
const treeData = [
	{
		title: '0-0',
		key: '0-0',
		children: [
			{
				title: '0-0-0',
				key: '0-0-0',
				children: [
					{ title: '0-0-0-0', key: '0-0-0-0' },
					{ title: '0-0-0-1', key: '0-0-0-1' },
					{ title: '0-0-0-2', key: '0-0-0-2' },
				],
			},
			{
				title: '0-0-1',
				key: '0-0-1',
				children: [
					{ title: '0-0-1-0', key: '0-0-1-0' },
					{ title: '0-0-1-1', key: '0-0-1-1' },
					{ title: '0-0-1-2', key: '0-0-1-2' },
				],
			},
			{
				title: '0-0-2',
				key: '0-0-2',
			},
		],
	},
	{
		title: '0-1',
		key: '0-1',
		children: [
			{ title: '0-1-0-0', key: '0-1-0-0' },
			{ title: '0-1-0-1', key: '0-1-0-1' },
			{ title: '0-1-0-2', key: '0-1-0-2' },
			{ title: '0-1-0-3', key: '0-1-0-3' },
			{ title: '0-1-0-4', key: '0-1-0-4' },
			{ title: '0-1-0-5', key: '0-1-0-5' },
			{ title: '0-1-0-6', key: '0-1-0-6' },
			{ title: '0-1-0-7', key: '0-1-0-7' },
			{ title: '0-1-0-8', key: '0-1-0-8' },
			{ title: '0-1-0-9', key: '0-1-0-9' },
			{ title: '0-1-0-10', key: '0-1-0-10' },
			{ title: '0-1-0-11', key: '0-1-0-11' },
			{ title: '0-1-0-12', key: '0-1-0-12' },
			{ title: '0-1-0-13', key: '0-1-0-13' },
			{ title: '0-1-0-14', key: '0-1-0-15' },
			{ title: '0-1-0-16', key: '0-1-0-16' },
			{ title: '0-1-0-17', key: '0-1-0-17' },
			{ title: '0-1-0-18', key: '0-1-0-18' },
		],
	},
	{
		title: '0-2',
		key: '0-2',
	},
];
class MyEduChapterupdate extends Component {
   //树状图
	constructor(props) {
		super(props);
		this.state={
			myeduchecked:false,
			expandedKeys: ['0-0-0', '0-0-1'],
			autoExpandParent: true,
			checkedKeys:[],
			selectedKeys: [],
		}
	}

	//取消按钮
	modalCancel=()=>{
		//外部传进来的参数
   this.props.setchapterupdatefalse();
	}

	//确认按钮
	setDownload=()=>{
		//外部传进来的参数
		this.props.setchapterupdatefalse();
	}

	//点击了选项
	onChange=(e)=> {
		this.setState({
			myeduchecked:e.target.checked,
		})
		// console.log(`checked = ${e.target.checked}`);
		if(e.target.checked===true){
			this.setState({
				checkedKeys:['0-0','0-1','0-2'],
			})
		}else {
			this.setState({
				checkedKeys:[],
			})

		}
	}

	onExpand =(expandedKeys) => {
		console.log('onExpand', expandedKeys);
		// if not set autoExpandParent to false, if children expanded, parent can not collapse.
		// or, you can remove all expanded children keys.
		this.setState({
			expandedKeys,
			autoExpandParent: false,
		});
	};

	onCheck = (checkedKeys) => {
		console.log('onCheck', checkedKeys);
		this.setState({ checkedKeys });
	};

	onSelect = (selectedKeys, info) => {
		console.log('onSelect', info);
		this.setState({ selectedKeys });
	};

	renderTreeNodes = (data) =>
		data.map(item => {
			if (item.children) {
				return (
					<TreeNode title={item.title} key={item.key} dataRef={item}>
						{this.renderTreeNodes(item.children)}
					</TreeNode>
				);
			}
			return <TreeNode key={item.key} {...item} />;
		});

	render() {

		return(
			<Modal
				keyboard={false}
				closable={false}
				footer={null}
				destroyOnClose={true}
				title={"章节编辑"}
				centered={true}
				visible={this.props.chapterupdate}
				width="600px"
				heigth="658px"
			>
				<div className="educouddiv" style={{
					heigth:"578px",
					width:"100%"
				}}>
					<div style={{
						width:"100%",
					}}
					className="private-listtwo heigth459px"
					>
						<style>
							{
								`
								span {
								  max-width: 500px;
									overflow:hidden;
									text-overflow:ellipsis;
									white-space:nowrap;
									cursor: default;
								}
								`
							}
						</style>

						<Tree
							checkable
							onExpand={this.onExpand}
							expandedKeys={this.state.expandedKeys}
							autoExpandParent={this.state.autoExpandParent}
							onCheck={this.onCheck}
							checkedKeys={this.state.checkedKeys}
							onSelect={this.onSelect}
							selectedKeys={this.state.selectedKeys}
						>
							{this.renderTreeNodes(treeData)}
						</Tree>

					</div>
				</div>
				<div className="yslcheckbox mt40">
					<div className="mr15"><Checkbox  onChange={(e) => this.onChange(e)}  checked={this.state.myeduchecked}></Checkbox></div>
					<div style={{
						width:"100%"
					}}><span style={{color:"#999999"}}>已选择</span><span style={{color:"#E65656"}}>3</span><span style={{color:"#999999"}}> 个章节 </span><span style={{color:"#E65656"}}>5</span><span style={{color:"#999999"}}>个实训</span></div>
					<div className="yslcheckbox2" style={{	width:"100%"}}><span className="font-14" style={{
						color:"#A3A3A3",
					}}>勾选则在课堂中显示，否则不显示</span></div>
				</div>
				<div className="clearfix edu-txt-center pt37 pb28" >
					<a className="task-btn mr30" style={{width:"100px",heigth:"38px"}} onClick={()=>this.modalCancel()}>取消</a>
					<a className="task-btn task-btn-orange"style={{width:"100px",heigth:"38px"}} onClick={()=>this.setDownload()}>确定</a>
				</div>
			</Modal>
		)
	}
}

export default MyEduChapterupdate;