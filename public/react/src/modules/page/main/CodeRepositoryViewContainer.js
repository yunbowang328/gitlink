
import React, { Component } from 'react';

import CodeRepositoryView from './CodeRepositoryView'

import axios from 'axios'

import './CodeRepositoryView.css'

// 自己处理path，加上父节点的path, 这里是处理树节点了，所以是set key
function addPrePath(treeData, parentNodePath) {
	return treeData.map(item => {
		return {
			...item,
			key: `${parentNodePath}/${item.name}`
		}
	})
}
function getNewTreeData(treeData, curKey, child, level) {
  const loop = (data) => {
    data.forEach((item) => {
    	// 这里不能用indexOf 同一级可能出现test目录和test.py文件
      if (item.key == curKey) {
          if (child && child.length) {	// 可能没有子节点
			child = addPrePath(child, curKey);
			item.children = child;
		  }
		  item.isLeaf = false;
      } else {
      	if (item.children) {
          loop(item.children);
        }
      }
    });
  };
  loop(treeData);
}

function fileData2TreeData(repoFilesData) {
	if(repoFilesData!=null){
		const fileTreeData = [];
		repoFilesData.forEach((item) => {
			if (item.kind === 'file') {
				fileTreeData.push({
					key: item.path,
					name: item.name,
					isLeaf: true
				})
			} else {
				fileTreeData.push({
					key: item.path,
					name: item.name,
					// isLeaf: false
				})
			}
		})
		return fileTreeData;
	}

}

class CodeRepositoryViewContainer extends Component {

	constructor(props) {
		super(props)

		this.showFilesDrawer = this.showFilesDrawer.bind(this)
		this.onRepositoryViewExpand = this.onRepositoryViewExpand.bind(this)

		this.state = {
			drawerOpen: false,
			loadingFirstRepoFiles: false,
			fileTreeData: "",
			fileTreeSelectedKeys: [],
			codeRepositoryViewExpanded: false,
			tabIndex: 0,

			settingDrawerOpen: false
		}
	}
	showSettingDrawer = (open) => {
		this.setState({settingDrawerOpen: open})
	}
	tabIndexChange = (index) => {
		this.setState({tabIndex: index});
	}
	onRepositoryViewExpand() {
		window.repository_extend_and_zoom();
		this.setState({
			evaluateViewExpanded: !this.state.evaluateViewExpanded
		}, () => {
			setTimeout(()=>{
				window.__tpiOnResize()
			}, 300)
		})
	}

	showFilesDrawer(open) {
		if (this.props.loading === true) {
			return;
		}
		if (!this.state.fileTreeData) {
			this.fetchRepoFiles();
		}

		this.setState({
            drawerOpen: open,
        })
	}
	loadRepoFiles = () => {
		if (!this.state.fileTreeData) {
			this.fetchRepoFiles();
		}
	}

	componentWillReceiveProps(newProps, oldProps) {
		
	}
	componentDidMount() {
	
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		const { game, challenge } = this.props
		if (this.props.game && (!prevProps.game || prevProps.game.identifier !== this.props.game.identifier) ) {
			this.setState({
				fileTreeSelectedKeys: [ challenge.multiPath ? challenge.path[0] : challenge.path ]
			})
			// 初始化
		} else if (this.state.fileTreeSelectedKeys.length === 0 && challenge && challenge.path) {
			this.setState({
				fileTreeSelectedKeys: [ challenge.multiPath ? challenge.path[0] : challenge.path ]
			})
		} else if (challenge && prevProps && prevProps.challenge
				&& challenge.pathIndex != prevProps.challenge.pathIndex
				&& challenge.pathIndex !== -1) {
			this.setState({
				fileTreeSelectedKeys: [ challenge.multiPath ? challenge.path[challenge.pathIndex] : challenge.path ]
			})
		}
	}

	handleDialogClose() {
		this.setState({
			dialogOpen: false
		})
	}
	onLoadData = (treeNode) => {
	    if (treeNode.props.children && treeNode.props.children.length) {
	      return new Promise((resolve) => {
	        resolve();
	      });
	    }
	    return new Promise((resolve, reject) => {
    		this.fetchRepoFiles(treeNode, resolve, reject)
   		});
  	}
	map2OldData = (treeData) => {
		if (!treeData || treeData.length == 0) {
			return []
		}
		
		if (!treeData || treeData.length === 0) return treeData;
		treeData = treeData.map(item => {
			return {
				kind: item.type == "blob" ? "file" : "dir",		// blob->file tree->dir
				path: item.name,
				name: item.name
			}
		})
		return treeData;
	}
	
	fetchRepoFiles(treeNode, resolve, reject) {
		// http://localhost:3000/api/v1/games/829al3mst4fy/entries?path=src/step1&rev=master
		if (!this.props.challenge || !this.props.game) {
			return;
		}
		// var ar = this.props.challenge.path.split('/');
		// ar.length = ar.length - 2;
		// var _path = ar.join('/');
		var _path = treeNode ? treeNode.props.eventKey : '' ;
		if (_path.charAt(0) === '/') {
			_path = _path.substring(1)
		}
		// var url = `/api/v1/games/${this.props.game.identifier}/entries?path=${_path}&rev=master&gpid=${this.props.myshixun.gpid}`
		let url = `/myshixuns/${this.props.myshixun.identifier}/repository.json`

		
		if (!this.state.fileTreeData || this.state.fileTreeData.length === 0) {
			this.setState({
				loadingFirstRepoFiles: true,
			})
		}
		var that = this;
		axios.post(url, {
				path: _path
				// withCredentials: true,
			})
		  	.then((response) => {
				// if (!response) {
				// 	resolve && resolve();
				// 	return;
				// }
		  		const repoFilesData = this.map2OldData(response.data.trees)
			    if (!this.state.fileTreeData || this.state.fileTreeData.length === 0) {  	// 还没树节点，没加载过
			 
				    const fileTreeData = fileData2TreeData(repoFilesData)
			        this.setState({ 
				    	fileTreeData, 
				    	loadingFirstRepoFiles: false,
				    });
			    } else {
			    	var _treeNode = treeNode;
			    	var _eventKey = _treeNode.props.eventKey;
			    	
			    	const fileTreeData = that.state.fileTreeData;
			    	// 新的数组放置到treenode下
			    	
			    	const tempFileTreeData = fileData2TreeData(repoFilesData)

			    	getNewTreeData(fileTreeData, _eventKey, tempFileTreeData, 2);
			    	this.setState({
			    		fileTreeData,
			    	})
			    }
			    
			    resolve && resolve();

		  	})
		  	.catch(function (error) {
		    	console.log(error);
		    	reject && reject();
		  	});
	}
	onTreeSelect = (selectedKeys, info) => {
		const isLeaf = info.node.isLeaf();
		if (isLeaf) {		// 叶子节点
			selectedKeys.length && this.setState({
				fileTreeSelectedKeys: selectedKeys
			})
			const { fetchRepositoryCode, onPathChange, showSnackbar, challenge } = this.props;
			
			const nodePath = info.node.props.eventKey;
			let isCurrentFile = false;
			// 设置pathIndex为-1，那么代码文件下拉可以切回可编辑的文件
			if (!challenge.multiPath) {	// 单path任务  多path任务 path是数组
				if (challenge.path.trim() == nodePath.trim()) {
					if (challenge.pathIndex === 0) {
						showSnackbar(`当前编辑文件已经是${nodePath}`)
					} else {
						fetchRepositoryCode(null, nodePath, 1);	
						onPathChange(0)
					}
					return;
				} else {
					onPathChange(-1)
				}
			} else {
				
				let cur_index = -1;
				if (challenge.path && challenge.path.forEach) {
					challenge.path.forEach((item, index) => {
						if (nodePath == item) {
							isCurrentFile = true;
							cur_index = index;
						}
					})
				}
				
				if (isCurrentFile) {
					if (challenge.pathIndex == cur_index) {
						showSnackbar(`当前编辑文件已经是${nodePath}`)
					}
					onPathChange(cur_index)
					// showSnackbar(`当前编辑文件已经是${nodePath}`)
				} else {
					onPathChange(-1)
				}
			}
			if (nodePath) {
				const filetype = nodePath.split('.').pop().toLowerCase();
				if (filetype == 'jpg' || filetype == 'png' || filetype == 'gif' || filetype == 'jpeg'
						|| filetype == 'jar'
						|| filetype == 'doc' || filetype == 'pdf' || filetype == 'xsl' || filetype == 'ppt') {
					showSnackbar(`不支持加载${filetype}类型的文件。`)
					return;
				}
				fetchRepositoryCode(null, nodePath, 1);	
			} else {
				console.error('no eventKey:', info.node)
			}
		}
	}
//  /shixuns/mnf6b7z3/shixun_discuss?challenge_id=88
  	render() {
		  
	    return (
				// <React.Fragment>
				// 	{this.props.isOnlyContainer == true ? 
				// 		React.Children.map(this.props.children, child => {
				// 			if(!child) {
				// 				return ''
				// 			}
				// 			return React.cloneElement(child, Object.assign({...this.state}, { 
				// 				loadRepoFiles: this.loadRepoFiles,
				// 				onTreeSelect: this.onTreeSelect,
				// 				onLoadData: this.onLoadData,
				// 			}))
				// 		})

				// 	: 
				
				// 	<CodeRepositoryView {...this.props} 
				// 		{...this.state} 
				// 		showFilesDrawer={this.showFilesDrawer}
				// 		loadRepoFiles={this.loadRepoFiles}
				// 		onLoadData={this.onLoadData}
				// 		onTreeSelect={ this.onTreeSelect }
				// 		onRepositoryViewExpand={this.onRepositoryViewExpand}
				// 		tabIndexChange={this.tabIndexChange}
				// 		showSettingDrawer={this.showSettingDrawer}
				// 	></CodeRepositoryView> }
				// </React.Fragment>
				<React.Fragment>
					{this.props.isOnlyContainer == true ? 
						React.Children.map(this.props.children, child => {
							if(!child) {
								return ''
							}
							return React.cloneElement(child, Object.assign({...this.state}, { 
								loadRepoFiles: this.loadRepoFiles,
								onTreeSelect: this.onTreeSelect,
								onLoadData: this.onLoadData,
							}))
						})

					: 
				
					<CodeRepositoryView {...this.props} 
						{...this.state} 
						showFilesDrawer={this.showFilesDrawer}
						loadRepoFiles={this.loadRepoFiles}
						onLoadData={this.onLoadData}
						onTreeSelect={ this.onTreeSelect }
						onRepositoryViewExpand={this.onRepositoryViewExpand}
						tabIndexChange={this.tabIndexChange}
						showSettingDrawer={this.showSettingDrawer}
					></CodeRepositoryView> }
				</React.Fragment>
	    );
  	}
}

export default CodeRepositoryViewContainer;
