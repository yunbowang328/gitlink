import '../../katex.css';
import React,{ Component } from "react";
import { getImageUrl, markdownToHTML, WordsBtn, getUrl } from 'educoder';
import { Tooltip } from  'antd';
import TPMMDEditor from '../../../tpm/challengesnew/TPMMDEditor';
import axios from 'axios';
import moment from 'moment';
import showdown from 'showdown';
import showdownKatex from 'showdown-katex';
const _origin = ''
/**
	https://www.showdoc.cc/127895880302646?page_id=1962215317836957
	comment_scores[:appeal_status]	int	0：正常；1：申诉中，2：撤销申诉；3：申诉成功；4：申诉被拒绝；5：申诉失效
 */
const ACCEPT = 3
const REFUSE = 4
class CCommentItem extends Component{
  constructor(props){
    super(props);

	this.state = {
      show_reply: false,
      show_appeal: false,
	}
  }
  cancelReply = () => {
	  this.setState({ show_reply: false })
  }
  showReply = () => {
	  this.setState({ show_reply: true, show_appeal: false })
  }
  showAppeal = () => {
	  this.setState({ show_appeal: true, show_reply: false })
  }
  cancelAppeal = () => {
	  this.setState({ show_appeal: false })
  }
  onCancel = () => {
	  this.state.show_reply ? this.cancelReply() : this.cancelAppeal()
  }
	cancelMyAppeal = () => {
		this.props.confirm({
      content: <div>
				<div>撤销申诉后，无法再对本评阅记录进行申诉</div>
				<div>是否确认撤销申诉</div>
			</div>,
      onOk: () => {
    		let studentWorkId =this.props.match.params.studentWorkId;
    		let { item, commentIndex }=this.props;

        const url = `/student_works/${studentWorkId}/cancel_appeal.json`
        axios.post(url, {
            score_id: item.id
          })
        .then((response) => {
          if (response.data.status == 0) {
						this.props.showNotification('撤销成功')
						this.props.replySuccess()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    })
	}
  onSubmit = () => {
    let workId=this.props.match.params.workId;
    let studentWorkId =this.props.match.params.studentWorkId;

    let { item, commentIndex }=this.props;
	if (!this.state.secondReplyContent || !this.state.secondReplyContent.trim()) {
		this.props.showNotification('内容不能为空')
		return;
	}
	if (this.state.show_reply) {
		const url = `/student_works/${studentWorkId}/add_score_reply.json`
		axios.post(url, {
			score_id: item.id,
			comment: this.state.secondReplyContent
		}).then((result)=>{
			if(result.data.status == 0){
				this.props.replySuccess()
				this.cancelReply()
			}
		}).catch((error)=>{
			console.log(error)
		})
	} else {
		const appealUrl = `/student_works/${studentWorkId}/appeal_anonymous_score.json`
		axios.post(appealUrl, {
			score_id: item.id,
			comment: this.state.secondReplyContent
		}).then((result)=>{
			if(result.data.status == 0){
				this.props.replySuccess()
				this.cancelAppeal()

			}
		}).catch((error)=>{
			console.log(error)
		})
	}
  }
  onDeleteSecondReply = (item) => {
	  this.props.confirm({
      // content: `确认要删除所选的${len}个帖子吗？`,
      content: `是否确认删除?`,
      onOk: () => {

        const url = `/commons/delete.json`
        axios.delete(url, { data: {
            object_id: item.id,
            object_type: 'journals_for_message'
          }})
        .then((response) => {
          if (response.data.status == 0) {
            this.props.replySuccess()
						this.cancelAppeal()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    })
  }
	on_deal_appeal_score = (mode, item) => {
	  this.props.confirm({
      // content: `确认要删除所选的${len}个帖子吗？`,
      content:
	  	<div>
			<div>{mode == ACCEPT ? '此匿评成绩将被废弃，评阅人的作品将被违规扣分' : '此匿评成绩将被认为合理'}</div>
			<div>是否确认{mode == ACCEPT ? '接受申诉' : '拒绝申诉'}</div>
		</div>
	  ,
      onOk: () => {
		let studentWorkId =this.props.match.params.studentWorkId;
        const url = `/student_works/${studentWorkId}/deal_appeal_score.json`
        axios.post(url,  {
            score_id: item.score_id,
            status: mode
          })
        .then((response) => {
          if (response.data.status == 0) {
            this.props.showNotification(`${mode == ACCEPT ? '接受申诉' : '拒绝申诉'}成功`)
			this.props.replySuccess()
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    })
  }

  parseCommentContent = (oldContent) => {
		return markdownToHTML(oldContent);
  }

  exportMdtoHtml=(md)=> {
  	let newmd=md;
		const converter = new showdown.Converter({
			extensions: [
				showdownKatex({
					// maybe you want katex to throwOnError
					throwOnError: true,
					// disable displayMode
					displayMode: false,
					// change errorColor to blue
					errorColor: '#1500ff',
				}),
			],
		});
		return converter.makeHtml(newmd);
	}

  renderChildenComments = (parent) => {
    if (parent.journals.length == 0) {
			return '';
		}
		const isAdmin = this.props.isAdmin()
		/**
		can_delete: true
		content: "qwe"
		id: 81136
		time: "2019-06-04T11:00:21.000+08:00"

		user_image_url: "avatars/User/1"
		user_login: "innov"
		user_name: "社区导师"
		*/

		// is_appeal_info true 是匿评人匿评信息，需要统一使用头像去掉链接
		return parent.journals.map(item => {
			// <div>{item.content} {item.user_info.user_name}</div>

			// src={getImageUrl(`images/${item.image_url}`)}
			const imgSrc = (!item.user_info.user_image_url || item.user_info.user_image_url === '--') ? `edu_user/anony.png` : item.user_info.user_image_url;
			return (
				<div className="comment_item_cont appraise df clearfix" key={item.id}>
					<div className="J_Comment_Face fl">
						{item.is_appeal_info == true ?
							<a href={`javascript:void(0)`} target="_blank">
								<img alt="用户头像" height="50"
									src={`${getUrl()}/images/edu_user/anony.png`} width="50"/>
							</a>
						: <a href={`${_origin}/users/${item.user_info.user_login}`} target="_blank">
							<img alt="用户头像" height="50"
								src={`${getImageUrl(`images/`+imgSrc)}`}
							width="50"/>
						</a>}
					</div>

					<div className="t_content fl">
						<div className="J_Comment_Reply">
							<div className="comment_orig_content" style={{ margin:"0px" }}>
								<div className="J_Comment_Info clearfix mt3">
									<div className="t_info fl">
										{item.user_info.user_login==="--"?
											<a className="content-username hide fl">
												{item.user_info.user_name}
											</a>
											:<a href={`${_origin}/users/${item.user_info.user_login}`} className="content-username hide fl">
												{item.user_info.user_name}
											</a>}

										<span className="t_area fl">{moment(item.time).format('YYYY-MM-DD HH:mm')}</span>
										{item.is_appeal_info && (item.appeal_status == 1 ?
										<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "} >申诉中</span> :
										  item.appeal_status == 2 ?
										<span className={"edu-filter-btn edu-filter-btn-EDEDED ml15 fl typestyle color666666 "} >申诉已撤销</span> :
										  item.appeal_status == 3 ?
										<span className={"edu-filter-btn edu-filter-btn-4CACFF ml15 fl typestyle "} >申诉成功</span> :
										  item.appeal_status == 4 ?
										<span className={"edu-filter-btn edu-filter-btn-EDEDED ml15 fl typestyle color666666 "} >申诉被拒绝</span> :
										  item.appeal_status == 5 ?
										<span className={"edu-filter-btn edu-filter-btn-EDEDED ml15 fl typestyle color666666 "} >申诉失败</span> : '')
										}


										{/* fr */}
										{/* { item.is_invalid ? <span className="validate_area fr">失效</span> :
										<React.Fragment> */}
										{!item.is_appeal_info && item.can_delete == true && <Tooltip title="删除">
											<i className="iconfont icon-shanchu mr5 fr font-14" onClick={() => this.onDeleteSecondReply(item)}
												style={{ cursor: 'pointer' }}
											></i>
										</Tooltip> }
										{/* </React.Fragment>
										} */}
										{item.is_appeal_info && isAdmin && item.appeal_status == 1 && this.props.isAdmin()===true&&<React.Fragment>
											<WordsBtn style="grey" onClick={() => this.on_deal_appeal_score(REFUSE, item)} className="fr ml6">拒绝申诉</WordsBtn>
											<WordsBtn style="orange" onClick={() => this.on_deal_appeal_score(ACCEPT, item)} className="fr">接受申诉</WordsBtn>
										</React.Fragment>}
										{item.appeal_status == 1 &&	this.props.is_author == true && this.props.isStudent()===true &&
											<WordsBtn style="blue" className="fr mr5" onClick={() => this.cancelMyAppeal()}>撤销申诉</WordsBtn>}

									</div>
								</div>

								<div className="comment_content  clearfix" id={`reply_content_${item.id}`}>
									<div className="color-grey-3" id={`reply_content_${item.id}`}>
										<div  className={"markdown-body"}
												dangerouslySetInnerHTML={{__html:markdownToHTML(item.content)}}></div>
										<div className="cl"></div>
									</div>
								</div>


							</div>
						</div>
					</div>
				</div>
			)
		})
  }
  render(){
    let { item, commentIndex, homework_status, is_author }=this.props;
    let { show_reply, show_appeal }=this.state;
    const _content = item.content ? markdownToHTML(item.content): ''
	const isAnonymous = homework_status && homework_status.indexOf('匿评中') != -1
	const isAppealing = homework_status && homework_status.indexOf('申诉中') != -1
	const attachments = item.attachments;
	const isAdmin = this.props.isAdmin()

    return(
      <div className="ccomment comment_item_cont df clearfix" key={item.id}>
 					<div className="J_Comment_Face fl">

						{item.image_url == '--' ?
						<a href={`javascript:void(0)`} >
							<img alt="用户头像" height="50"
								src={`${getUrl()}/images/edu_user/anony.png`} width="50"/>
							</a>
						: <a href={`${_origin}/users/${item.user_login}`} target="_blank">
							<img alt="用户头像" height="50"
								src={`${getUrl()}/images/${item.image_url}`}
							width="50"/>
						</a>}

						{/* <a href={`${_origin}/users/${item.user_login}`} target="_blank">
							<img alt="用户头像" height="50" src={getImageUrl(`images/${item.image_url}`)} width="50"/>
						</a> */}
					</div>

					<div className="t_content fl">
						<div className="J_Comment_Reply">
							<div className="comment_orig_content" style={{ margin:"0px" }}>


								<div className="J_Comment_Info clearfix mt3">
									<div className="t_info fl">
										{
											item.user_login==="--"?	<a className="content-username hide fl">
													{item.username}（{item.comment_role}）
												</a>
													:
													<a href={`${_origin}/users/${item.user_login}`} className="content-username hide fl">
														{item.username}（{item.comment_role}）
													</a>
										}


										<span className="t_area fl">{item.time}</span>
										{/* 分数 */}
										{item.score !== null && <span className="score_area fl">{item.score}分</span>}


										{/* item.is_invalid && */}
										{/* {  item.delete && isAdmin && <Tooltip title={ "删除" } >
											<i className="iconfont icon-shanchu mr5 fr" style={{marginLeft: '6px'}}
													onClick={() => this.props.onDelete(item)}>
											</i>
										</Tooltip>} */}



										{/* fr */}
										{/* <WordsBtn style="blue" className="fr">回复</WordsBtn> */}
										{ item.is_invalid ? <span className="validate_area fr">失效</span> :
										<React.Fragment>
											<WordsBtn style="blue" className="fr" onClick={this.state.show_reply ? this.cancelReply : this.showReply}>回复</WordsBtn>
											{(isAppealing || isAnonymous) && item.can_appeal && item.appeal_status == 0 &&
												<WordsBtn style="blue" className="fr mr20" onClick={this.state.show_appeal ? this.cancelAppeal : this.showAppeal}>申诉</WordsBtn>}

										</React.Fragment>

											}
										{item.delete && isAdmin
											&& <WordsBtn style="blue" className="fr mr12"
												onClick={() => this.props.onDelete(item)}>删除</WordsBtn>}

									</div>
								</div>

								{!!_content && _content !== 'null' && <div className="comment_content  clearfix mt8" id={`reply_content_${item.id}`}>
									<div className="color-grey-3" id={`reply_content_${item.id}`}>
										<div  className={"markdown-body"} dangerouslySetInnerHTML={{__html: _content}}></div>
										<div className="cl"></div>
									</div>
								</div>}
								{!_content && <span className="color656565 mt2 color-grey-9 font-12 mr8" style={{ display: 'inline-block'}}>{"暂未写评语"}</span>}
								<div className="mt6">
									{attachments && attachments.map((attaItem, key)=>{
										return(
											<div className="color-grey attachItem" key={key}>
												<a className="color-grey ">
													<i className="font-14 color-green iconfont icon-fujian mr8" aria-hidden="true"></i>
												</a>
												<a href={attaItem.url}
													className="mr12 color9B9B" length="58">
													{attaItem.title}
												</a>
												<span className="color656565 mt2 color-grey-6 font-12 mr8">{attaItem.filesize}</span>
												{/*{item.delete===true?<i className="font-14 iconfont  icon-guanbi " id={item.id} aria-hidden="true" onClick={()=>this.onAttachmentRemove(item.id)}></i>:""}*/}
											</div>
										)
									})}
								</div>

								<style>{`
									.ccomment .childrenCommentsView .comment_item_cont .break_word_comments {
										margin-top: 4px;
										width: 94%;
										font-size: 14px;
									}
								`}</style>
								<div className="childrenCommentsView" style={{background: '#fff'}}>
									{/* {(item && item.journals && item.journals.length) ? <div className="trangle"></div>: ''} */}
									{this.renderChildenComments(item)}
									{/* { item.isAllChildrenLoaded != true && item.journals && this.props.isChildCommentPagination == true && item.journals.length >= 5?
										<Tooltip title={ "点击查看更多回复" } disableFocusListener={true}>
											<div className="loadMoreChildComments" onClick={() => {this.props.loadMoreChildComments && this.props.loadMoreChildComments(item)}}>
												<i className="iconfont icon-xiajiantou"></i>
											</div>
										</Tooltip>
									: ''} */}
								</div>
								{/* 去掉了orig_reply 影响到i标签 */}
								<p className="" >
                    				{/* 第二排右侧按钮区域 */}
									{/* ${this.state.show_reply ? '回复' : '申诉'} */}
									{(show_reply || show_appeal) &&
									<React.Fragment>
										<TPMMDEditor mdID={`${commentIndex}`} watch={false}
											height={130} onChange={(val) => this.setState({ secondReplyContent: val})}
											placeholder={`请输入内容`} noStorage={true}
										></TPMMDEditor>
										<div className="fr">
											<a  className="task-btn task-btn-orange fr" style={{height: '26px', lineHeight: '26px', width: '60px'}}
												onClick={this.onSubmit}
											>{this.state.show_reply ? '回复' : '申诉'}</a>
											<a onClick={this.onCancel} className="defalutCancelbtn fr"
												style={{height: '26px', width: '60px', fontSize: '14px', lineHeight: '26px', marginRight: '10px'}}>取消</a>

										</div>
									</React.Fragment>
									}
								</p>


							</div>
						</div>
					</div>
				</div>
    )
  }
}
export default CCommentItem;