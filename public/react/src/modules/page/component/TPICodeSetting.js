import React, { Component } from 'react';
import Switch from 'material-ui/Switch';
import Tooltip from 'material-ui/Tooltip';

import { Select } from 'antd';
import 'antd/lib/select/style/index.css'

const Option = Select.Option;
// import Menu from 'material-ui/Menu';
// import Select from 'material-ui/Select';
// import MenuItem from '@material-ui/core/MenuItem';

// const MenuItem = Menu.MenuItem
const $ = window.$;

class TPICodeSetting extends Component {


	render() {
		const { autoCompleteSwitch, onAutoCompleteSwitchChange, onFontSizeChange 
			, cmFontSize, cmCodeMode,
			onCodeModeChange,
			shixun } = this.props;
		const task_pass = shixun.task_pass
		const forbid_copy = shixun.forbid_copy
		const test_set_permission = shixun.test_set_permission
	    return (
    	  	<div className="ide-settings--content">
			  	<style>{`
					.ide-settings--section {
						padding: 16px;
						padding-bottom: 10px;
					}  
					.-padding-24 {
						padding: 14px;
					}
				`}</style>
    	  		<h3 className="ide-settings--section -light ">
    	  			代码格式
    	  		</h3>
				  {/* 去掉 -space-v-24 class */}
    	  		<div className="-padding-24 ">
	    	  		{/*<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">Tab Size</div>
	    	  			<div className="ide-settings--item-value">
	    	  				<div className="select -view-flat -value">
	    	  					<div className="-layout-v -start">
		    	  					<div className="select--wrapper -layout-h -center -justify" >
			    	  					<div className="select--content -layout-h -center -space-h-4">
			    	  						1
			    	  					</div>
		    	  					</div>
	    	  					</div>
	    	  				</div>
	    	  			</div>
	    	  		</div>*/}
							<div className="-layout-h -center -justify-between">
								<div className="ide-settings--item-key">显示模式</div>
								<div className="ide-settings--item-value">
									<div className="select -view-flat -value">
	    	  					<div className="-layout-v -start">
	    	  						<div className="select--wrapper -layout-h -center -justify" >
													<Select 
														style={{ width: '120px' }}
														value={cmCodeMode}
														onChange={onCodeModeChange}
													>
														<Option value={'vs'}>白色背景</Option>
														<Option value={'vs-dark'}>黑色背景</Option>
							          	</Select>
	    	  						</div>
	    	  					</div>
	    	  				</div>
								</div>
							</div>
	    	  		<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">字体大小</div>
	    	  			<div className="ide-settings--item-value">
	    	  				<div className="select -view-flat -value">
	    	  					<div className="-layout-v -start">
	    	  						<div className="select--wrapper -layout-h -center -justify" >
							          	<Select
														style={{ width: '120px' }}
							          		value={cmFontSize}
							          		onChange={onFontSizeChange}>
	    	  								<Option value={12}>12px</Option>
	    	  								<Option value={14}>14px</Option>
								            <Option value={16}>16px</Option>
								            <Option value={18}>18px</Option>
								            <Option value={20}>20px</Option>
								            <Option value={22}>22px</Option>
							          	</Select>
	    	  						</div>
	    	  					</div>
	    	  				</div>
	    	  			</div>
	    	  		</div>
	    	  		{/* <div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">代码补全</div>
	    	  			<div className="ide-settings--item-value">
	    	  				<div className="select -view-flat -value">
	    	  					<div className="-layout-v -start">
	    	  						<div className="select--wrapper -layout-h -center -justify" >
	    	  							<Switch
								          checked={autoCompleteSwitch}
								          onChange={onAutoCompleteSwitchChange}
								          value="checkedB"
								          color="primary"
								        />
	    	  						</div>
	    	  					</div>
	    	  				</div>
	    	  			</div>
	    	  		</div> */}
	    	  		{/*<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">Auto-brackets</div>
	    	  			<div className="ide-settings--item-value">
	    	  				<div className="select -view-flat -value">
	    	  					<div className="-layout-v -start">
	    	  						<div className="select--wrapper -layout-h -center -justify" >
	    	  							4
	    	  						</div>
	    	  					</div>
	    	  				</div>
	    	  			</div>
	    	  		</div>*/}
	    	  	</div>
	    	  	<h3 className="ide-settings--section -light ">快捷键</h3>
	    	  	<div className="-padding-24 ">
	    	  		{/*<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">CTRL + Enter</div>
	    	  			<div className="ide-settings--item-value">Submit Solution</div>
	    	  		</div>*/}
	    	  		{/* <div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">ALT + /</div>
	    	  			<div className="ide-settings--item-value">代码补全</div>
	    	  		</div> */}
	    	  		<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">保存代码</div>
	    	  			<div className="ide-settings--item-value">Ctrl + S</div>
	    	  		</div>
					<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">唤出快捷键列表</div>
	    	  			<div className="ide-settings--item-value">F1 / Alt + F1</div>
	    	  		</div>
					<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">左右缩进</div>
	    	  			<div className="ide-settings--item-value">Ctrl + ]/[</div>
	    	  		</div>
					<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">跳到匹配的括号</div>
	    	  			<div className="ide-settings--item-value">Ctrl + Shift + \</div>
	    	  		</div>
					<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">转到行首</div>
	    	  			<div className="ide-settings--item-value">Home</div>
	    	  		</div>
					<div className="-layout-h -center -justify-between">
	    	  			<div className="ide-settings--item-key">转到行尾</div>
	    	  			<div className="ide-settings--item-value">End</div>
	    	  		</div>
	    	  	</div>
				
				<h3 className="ide-settings--section -light ">
    	  			关卡配置信息
					{/* <a href="https://github.com/Microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide"></a> */}
    	  		</h3>
				<div className="-padding-24 " style={{    marginBottom: '40px' }}>
					<Tooltip title={ task_pass ? "允许学员跳关挑战" : "不允许学员跳关挑战"} disableFocusListener={true}>                    
						<div className="-layout-h -center -justify-between">
							<div className="ide-settings--item-key">跳关</div>
							<div className="ide-settings--item-value">{ task_pass ? '允许' : '不允许'}</div>

						</div>
					</Tooltip>


                    <Tooltip title={ test_set_permission ? "允许学员通过金币解锁查看测试集内容" 
							: "不允许学员通过金币解锁查看测试集内容"} disableFocusListener={true}>
						<div className="-layout-h -center -justify-between">
							<div className="ide-settings--item-key">测试集解锁</div>
							<div className="ide-settings--item-value">{ test_set_permission ? '允许' : '不允许'}</div>
						</div>
					</Tooltip>
					
                    <Tooltip title={ forbid_copy ? "不允许学员复制和粘贴代码" 
							: "允许学员复制和粘贴代码"} disableFocusListener={true}>

						<div className="-layout-h -center -justify-between">
							<div className="ide-settings--item-key">代码复制粘贴</div>
							<div className="ide-settings--item-value">{ !forbid_copy ? '允许' : '不允许'}</div>
						</div>
					</Tooltip>
				</div>
				
				{/* <a href="https://github.com/Microsoft/monaco-editor/wiki/Monaco-Editor-Accessibility-Guide"></a> */}
				{/* <h3 className="ide-settings--section -light ">
    	  			说明
    	  		</h3>
				<div className="-padding-24 " style={{ marginBottom: '75px' }}>
					<div className="-layout-h -center -justify-between">
						<div className="ide-settings--item-key">
							本编辑器和Visual Studio Code的快捷键一致，使用F1或Alt+F1 (Internet Explorer)可以唤出快捷键列表。
						</div>
					</div>
				</div> */}


	    	</div>
	    );
  	}
}


export default ( TPICodeSetting ) ;
