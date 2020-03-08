import React, { Component } from 'react';
import axios from 'axios'
import { Spin, Icon } from 'antd'
import ClipboardJS from 'clipboard'
import { connect } from 'react-redux';
import VNCDisplay from './VNCDisplay'
import FloatButton from './component/FloatButton'
import SecondDrawer from './component/SecondDrawer'
import RepoTree from './component/repo/RepoTree'
import TPIMonaco from './component/monaco/TPIMonaco'
import notEditablePathImg from '../../images/tpi/notEditablePath.png'

import { Drawer } from "antd";

import './VNC.css'
const $ = window.$;
const firstDrawerWidth = 260;
class VNCContainer extends Component {
	constructor(props) {
		super(props)
		
		this.state = {
			fileTreeSelectedKeys: [],
			repositoryCode: '',
			displayKey: 1,
			vnc_reseting: false,
			saving: false,
		}
	}
	componentDidMount() {
		if (!this.clipboard) {
			const clipboard = new ClipboardJS('.copybtn');
			clipboard.on('success', (e) => {
				this.props.showSnackbar('复制成功')
			});
			this.clipboard = clipboard
		}

	}

	// shouldComponentUpdate () {
	// 	return false;
	// }

	getSecondDrawerWidth = () => {
		return $('#game_right_contents').width() - firstDrawerWidth
	}
	onEditBlur = () => {
		console.log('blurblur')
		this.doFileUpdateRequestOnCodeMirrorBlur()
	}
	doFileUpdateRequestOnCodeMirrorBlur = () => {
		if (!this.currentPath) {
			console.error('未找到文件path')
			return;
		}
		const { myshixun, game } = this.props
		var url = `/myshixuns/${myshixun.identifier}/update_file.json`
		const codeContent = window.editor_monaco.getValue()

		this.setState({saving: true})
		axios.post(url, {
				content: codeContent,
				// 评测的时候传1，其它情况不用传，主要是为了区分是用户自己提交还是自动提交
				// evaluate: 0,
				game_id : game.id,
				path: this.currentPath 
			}
		).then(res => {
			this.setState({saving: false})
		}).catch(e => {
			this.setState({saving: false})
			console.error('update_file error')
		})
	}
	renderSecondDrawerChildren = () => {
		const { readingCodeLoading, repositoryCode, saving } = this.state;
		const { shixun } = this.props
		const height = $(window).height() - 130

		const isEditablePath = false;
		return (
		<Spin tip={saving ? "保存中..." : "加载中..."} spinning={readingCodeLoading || saving}>
			<div style={{ height: `${height}px` }}>
				{/* (isEditablePath ? 'none' : 'block') */}
				<div className="codemirrorBackground" 
                        style={{ backgroundImage: `url('${notEditablePathImg}')`, display: (shixun.code_edit_permission ? 'none' : 'block') }}></div>
				<TPIMonaco
					{...this.state}
					codeLoading={readingCodeLoading}
					repositoryCode={repositoryCode}
					isEditablePath={shixun.code_edit_permission}
					shixun={this.props.shixun}
					doFileUpdateRequestOnCodeMirrorBlur={this.doFileUpdateRequestOnCodeMirrorBlur}
					onEditBlur={this.onEditBlur}
				></TPIMonaco>
			
			</div>
		</Spin>);
	}
	fetchReadRepositoryCode = (path) => {
		this.currentPath = path;
		const status = 1
		const fetchRepoCodeUrl = `/tasks/${this.props.game.identifier}/rep_content.json?path=${path}&status=${status}`
		this.setState({ readingCodeLoading: true });
    	axios.get(fetchRepoCodeUrl, {
    	}).then((fetchReadRepositoryCodeResponse) => {
			
			
			if (fetchReadRepositoryCodeResponse.data.content || fetchReadRepositoryCodeResponse.data.content == "") {
				this.setState({ 
					repositoryCode: fetchReadRepositoryCodeResponse.data.content,
					readingCodeLoading: false
				})
			} else {
				this.setState({ readingCodeLoading: false });
			}
			// this.setState({ isEditablePath, currentPath: path });

    	}).catch(error =>{
    		console.log(error)
			this.setState({ readingCodeLoading: false });
			this.props.showSnackbar(`服务端异常，请联系管理员！`);
    	})
	}
	onTreeSelect = (selectedKeys, info) => {
		const isLeaf = info.node.isLeaf();
		if (isLeaf) {		// 叶子节点
			selectedKeys.length && this.setState({
				fileTreeSelectedKeys: selectedKeys
			})
			this.refs["secondDrawer"].showSecondDrawer()

			console.log('leaf clicked')
			const nodePath = info.node.props.eventKey;
			if (nodePath) {
				const filetype = nodePath.split('.').pop().toLowerCase();
				if (filetype == 'jpg' || filetype == 'png' || filetype == 'gif' || filetype == 'jpeg'
						|| filetype == 'jar' || filetype == 'exe'
						|| filetype == 'doc' || filetype == 'pdf' || filetype == 'xsl' || filetype == 'ppt') {
					this.props.showSnackbar(`不支持加载${filetype}类型的文件。`)
					return;
				}
				this.fetchReadRepositoryCode(nodePath);	
			} else {
				console.error('no eventKey:', info.node)
			}
		}
	}
	onBottomDrawerClose = () => {
		this.setState({ bottomDrawer: false })
	}
	swtichBottomDrawer = () => {
		this.setState({ bottomDrawer: !this.state.bottomDrawer })
	}
	showCodeEvaluate = () => {
		this.setState({ bottomDrawer: true })
	}
	onResetVNC = () => {
		if (this.state.vnc_reseting) return;
		// 桌面系统将恢复到初始状态，您在系统中创建的数据可能会丢失
		// 请确保您的数据已保存（如：版本库代码已推送到服务器）
		// 是否确认重置？
		this.props.confirm({
			content: <div style={{textAlign: 'center'}}>
				<div>桌面系统将恢复到初始状态，您在系统中创建的数据可能会丢失</div>
				<div>请确保您的数据已保存（如：版本库代码已推送到服务器）</div>
				<div>是否确认重置？</div>
			</div>,
			onOk: () => {
				const url = `/tasks/${this.props.game.identifier}/reset_vnc_link.json`
				this.setState({ vnc_reseting: true })
				axios.get(url, {
				}).then((response) => {
					if (response.data.data && response.data.data.vnc_url) {
						// reset
						this.setState({
							displayKey: this.state.displayKey + 1,
							vnc_url: response.data.data.vnc_url,
							vnc_reseting: false
						})
					} else {
					}
					// this.setState({ isEditablePath, currentPath: path });

				}).catch(error =>{
					console.log(error)
					this.setState({ vnc_reseting: false });
					this.props.showSnackbar(`服务端异常，请联系管理员！`);
				})

				console.log('doooo')
			},
			onCancel() {
				console.log('Cancel');
			},
		})
	}
	
	/*
	selectedKeys={fileTreeSelectedKeys}
	onSelect={onTreeSelect}
	*/
  	render() {
  		const { challenge, vnc_url, git_url, showOrHide, isCollapse } = this.props

			const _classCtx = this.state.bottomDrawer ? 'btn_test_case_active' : 'btn_test_case';
			const _classes = this.state.bottomDrawer 
				? `iconfont icon-xiajiantou btn-arrow` 
				: 'iconfont icon-shangjiantou btn-arrow';
		const secondDrawerChildren = this.renderSecondDrawerChildren();

			const _drawClasses = showOrHide
			? ('codeEvaluateDrawer code_evaluate_stretch')
			: (isCollapse ? 'codeEvaluateDrawer active' : 'codeEvaluateDrawer');
	    return (
	      	<React.Fragment>
                <SecondDrawer
					ref="secondDrawer"
                    floatText={'版本库'}
					maskClosable={false}
					secondDrawerChildren={secondDrawerChildren}	
					firstDrawerWidth={firstDrawerWidth}
					getSecondDrawerWidth={this.getSecondDrawerWidth}

					firstDrawerClassName="repoFilesDrawer vncDrawer"
					secondDrawerClassName="codeInDrawer"
                >
					<style>{`
						/* 评测结果 */
						.codeEvaluateDrawer{
							position: absolute;
							bottom: 84px;
							transition: all .3s;
							// bottom: px;
						}

						.codeEvaluateDrawer.active{
							bottom: 50px;
						}

						.code_evaluate_stretch{
							top: 0px;
						}

						.codeEvaluateDrawer #game_test_set_results {
							height: 198px;
						}					    
						.codeEvaluateDrawer .ant-drawer-body {
							padding: 0px;
						}
						.codeEvaluateDrawer .ant-drawer-content-wrapper, .codeEvaluateDrawer .ant-drawer-mask {
							position: absolute;
						}
						.codeEvaluateDrawer .ant-drawer-content-wrapper .ant-drawer-content{
							height: 100%;
							background: rgb(5, 16, 26) !important;
						}

						.code_evaluate_stretch .ant-drawer-content-wrapper{
							height: 100% !important;
						}

						.code_evaluate_stretch #game_test_set_results {
							height: calc(100vh - 136px) !important;
						}

						.codeEvaluateFloatButton {
							bottom: 180px !important;
							left: unset;
							right: 0px;
							top: unset;
						}
						.codeEvaluateFloatButton .text {
							left: 10px;
						}
						
						.vncDrawer .ant-drawer-body {
							padding: 0px;
						}


						.vncDrawer .rc-tree {
							padding: 16px;
							max-width: 220px;
							color: #CBCBCB;
						}

						.vncDrawer .ant-drawer-wrapper-body {
							background: #242324;
							height: 100%;
						}
						.codeInDrawer .ant-drawer-wrapper-body {
							background: #1D1C1D;
						}
						
						.vncDrawer .ant-drawer-header, .codeInDrawer .ant-drawer-header {
							border-bottom: 0;
						}
						.codeInDrawer .ant-drawer-header,
						.codeInDrawer .ant-drawer-content{
							background: rgb(28, 28, 28) !important;
						}

						.vncDrawer > div:nth-child(1) {
							opacity: 1 !important;
						}
						.vncDrawer > div:nth-child(2) {
							top: 0px !important;
							height: 100% !important;
							min-width: unset;
						}

						.codeInDrawer .ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
							text-shadow: none;
						}

						.resetVNC {
							top: 30px;
							writing-mode: initial;
							left: calc(100% - 120px);
							background-image: none;
							width: auto;
							background: #081516;
							height: 30px;
							padding: 0 6px;
							border-radius: 4px;
						}
						.resetVNC .text {
							top: 0px;
							writing-mode: initial;
							left: unset;
						}
						.resetVNC .text span {
							vertical-align: middle;
							margin-left: 2px;
						}
						.float_button:hover .text {
							color: #4CACFF;
						}
						.resetVNC1{
							top: -50px;
							writing-mode: initial;
							left: calc(100% - 230px);
							background-image: none;
							width: auto;
							// background: #081516;
							height: 30px;
							padding: 0 6px;
							border-radius: 4px;
							z-index: 10;
							font-size: 16px;
							transition: color .3s;
						}
						.resetVNC1 .text {
							top: 0px;
							writing-mode: initial;
							left: unset;
						}
						.resetVNC1 .text span {
							vertical-align: middle;
							margin-left: 2px;
						}
						.float_button:hover .text {
							transition: color .3s;
							color: #4CACFF;
						}
					`}</style>
					<div style={{ 'padding': '16px', 'border-bottom': '1px solid #3A383A' }}>
						<div style={{ color: '#888888' }}>网址克隆</div>
						<div>
							<input value={git_url} readonly={true} style={{ color: '#BABABA', width: '203px', background: 'transparent', border: 'none' }}></input>
							<i class="iconfont icon-fuzhi font-14 ml10 copybtn" 
								style={{color: '#4CACFF', cursor: 'pointer', verticalAlign: 'baseline'}} data-clipboard-text={git_url} ></i>
						</div>
					</div>
					<RepoTree
						{...this.props}
						fileTreeSelectedKeys={this.state.fileTreeSelectedKeys}
						onTreeSelect={this.onTreeSelect}

					></RepoTree>
				</SecondDrawer>
        {/* <FloatButton className="resetVNC" onClick={this.onResetVNC}>
					{this.state.vnc_reseting ? <Icon type="loading" style={{verticalAlign: 'sub'}} />
							: <i className="iconfont icon-zhongzhi2 font-16 "></i>}
					<span>重置桌面系统</span>
				</FloatButton> */}
				<FloatButton className="resetVNC1" onClick={this.onResetVNC}>
					{this.state.vnc_reseting ? <Icon type="loading" style={{verticalAlign: 'sub'}} />
							: <i className="iconfont icon-zhongzhi2 font-24"></i>}
					<span>重置实训</span>
				</FloatButton>

			  	{/* <Spin tip="加载中..." spinning={this.state.vnc_reseting}>
				</Spin> */}
				
				
                <VNCDisplay
                    {...this.props}
					key={this.state.displayKey}
					vnc_url={this.state.vnc_url || this.props.vnc_url}
                >	
					<Spin tip="加载中..." spinning={this.state.vnc_reseting}>
					</Spin>
					<Drawer
						mask={true}
						title=""
						width={firstDrawerWidth}
						closable={false}
						onClose={this.onBottomDrawerClose}
						visible={isCollapse}
						className={_drawClasses}
						placement="bottom"
						getContainer={false}
						// style={{ position: 'absolute', bottom: '-25px', zIndex: 1 }}
						// style={{ position: 'absolute', bottom: '50px', top: 0, zIndex: 1 }}
						afterVisibleChange={(visible) => {
							if (visible) {
								const canvas = $('.vncDisply canvas')[0]
								canvas && canvas.focus()
							}
							
						}}
					>
						{ this.props.codeEvaluate }
					</Drawer>
					{/* <FloatButton onClick={this.swtichBottomDrawer}
						className="codeEvaluateFloatButton"
					>测试集</FloatButton> */}
					{/* <div 
						className={_classCtx}
						onClick={this.swtichBottomDrawer}
					> */}
						{/* <span className="iconfont icon-shangjiantou btn-arrow"></span> */}
						{/* <span className={_classes}></span> */}
					{/* </div> */}
				</VNCDisplay>

                
		    </React.Fragment>
	    );
  	}
}

const mapStateToProps = (state) => {
	const { showOrHide, isCollapse } = state.tpiReducer;
	return {
		showOrHide,
		isCollapse
	}
};

export default connect(
	mapStateToProps
)(VNCContainer);
