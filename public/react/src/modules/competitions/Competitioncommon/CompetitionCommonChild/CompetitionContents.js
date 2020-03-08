import React, { Component } from 'react';
import {Button,Layout} from 'antd';
import axios from 'axios';
import {markdownToHTML,getImageUrl,AttachmentList} from 'educoder';


const { Header, Footer, Sider, Content } = Layout;
class CompetitionContents extends Component{
	constructor(props) {
		super(props)
		this.state={
			hash:undefined
		}
	}

	componentDidMount(){
		window.document.title = '竞赛';
		this.props.MdifHasAnchorJustScorll();
	}

	render() {
		let {mdContentdata, data} = this.props;
		//mdhash滚动
		this.props.MdifHasAnchorJustScorll();
		return (

				<div className={"fr"}>
					{data && data.permission.editable === true ? this.props.Competitionedittype === false ? this.props.has_url === false ?
						<Button className={"fr"} type="primary" ghost onClick={() => this.props.Competitionedit()}>
						编辑
					</Button>:"":"":""}
					<div className={this.props.current_user&&this.props.current_user.admin===true||this.props.current_user&&this.props.current_user.business===true?"mt50 mb100 ":"mb100 "}>
						<Content className={"markdown-body"} dangerouslySetInnerHTML={{__html: markdownToHTML(mdContentdata===undefined?"":mdContentdata.md_content===undefined||mdContentdata.md_content===null?"":mdContentdata.md_content).replace(/▁/g, "▁▁▁")}}>
						</Content>

						<div className={"mt30"}>
							<AttachmentList {...this.props} {...this.state} attachments={mdContentdata===undefined?[]:mdContentdata.attachments===undefined?[]:mdContentdata.attachments}></AttachmentList>
						</div>
					</div>
				</div>

		)
	}
}
export default CompetitionContents;
