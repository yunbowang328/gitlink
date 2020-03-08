import React,{ Component } from "react";
import { getImageUrl, markdownToHTML, WordsBtn } from 'educoder';
import { Tooltip } from  'antd'
const _origin = ''
class Graduationtaskitem extends Component{
	constructor(props){
		super(props);

	}
	parseCommentContent = (oldContent) => {
		return markdownToHTML(oldContent);
	}
	renderChildenComments = () => {

	}
	render(){
		let { item }=this.props;
		const _content = item.content && this.parseCommentContent(item.content)
		return(
			<div className="comment_item_cont appraise df clearfix" key={item.id}>
				<div className="J_Comment_Face fl">
					<a href={`${_origin}/users/${item.user_login}`} target="_blank">
						<img alt="用户头像" height="50" src={getImageUrl(`images/${item.image_url}`)} width="50"/>
					</a>
				</div>

				<div className="t_content fl">
					<div className="J_Comment_Reply">
						<div className="comment_orig_content" style={{ margin:"0px" }}>


							<div className="J_Comment_Info clearfix mt3">
								<div className="t_info fl">
									<a href={`${_origin}/users/${item.user_login}`} className="content-username hide fl">
										{item.username}（{item.comment_role}）
									</a>
									<span className="t_area fl">{item.time}</span>
									{/* 分数 */}
									{item.score != null && item.score >= 0 && <span className="score_area fl">{item.score}分</span>}

									{ !item.is_invalid && item.delete && <Tooltip title={ "删除" } >
										<i className="iconfont icon-shanchu mr5 fr" style={{marginLeft: '6px'}}
											 onClick={() => this.props.onDelete(item)}>
										</i>
									</Tooltip>}
									{/* <WordsBtn style="blue" className="fr">回复</WordsBtn> */}
									{ item.is_invalid ? <span className="validate_area fr">失效</span> : ''}
								</div>
							</div>

							{!!_content && <div className="comment_content  clearfix" id={`reply_content_${item.id}`}>
								<div className="color-grey-3" id={`reply_content_${item.id}`}>
									<div  className={"break_word_comments"} dangerouslySetInnerHTML={{__html: _content}}></div>
									<div className="cl"></div>
								</div>
							</div>}
							{!_content && <span className="color656565 mt2 color-grey-9 font-12 mr8" style={{ display: 'inline-block'}}>{"暂未写评语"}</span>}

							<div className="childrenCommentsView">
								{(item && item.children && item.children.length) ? <div className="trangle"></div>: ''}
								{this.renderChildenComments(item)}
								{ item.isAllChildrenLoaded != true && item.children && this.props.isChildCommentPagination == true && item.children.length >= 5?
									<Tooltip title={ "点击查看更多回复" } disableFocusListener={true}>
										<div className="loadMoreChildComments" onClick={() => {this.props.loadMoreChildComments && this.props.loadMoreChildComments(item)}}>
											<i className="iconfont icon-xiajiantou"></i>
										</div>
									</Tooltip>
									: ''}
							</div>
							{/*mr10 */}
							<p className="fr orig_reply">
								{/* 第二排右侧按钮区域 */}
							</p>


						</div>
					</div>
				</div>
			</div>
		)
	}
}
export default Graduationtaskitem;