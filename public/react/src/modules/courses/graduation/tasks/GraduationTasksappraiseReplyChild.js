import React,{ Component } from "react";
import { Pagination } from "antd";
import {ImageLayerOfCommentHOC} from '../../../page/layers/ImageLayerOfCommentHOC'
import GraduationTasksappraiseMainEditor from './GraduationTasksappraiseMainEditor'
import Graduationtaskitem from './Graduationtaskitem'
import '../../../forums/Post.css'
import '../../../comment/Comment.css'
import '../../common/courseMessage.css'
import './GraduationTasksappraiseReply.css'
import ModulationModal from "../../coursesPublic/ModulationModal";
import Modals from '../../../modals/Modals';
const REPLY_PAGE_COUNT = 10
const $ = window.$;

class GraduationTasksappraiseReplyChild extends Component{
	constructor(props){
		super(props);
		this.state={

		}
	}

	render(){
		let { total_count, comments, pageCount, comment_scores} = this.props;

		const isAdmin = this.props.isAdmin();
		const isStudent=this.props.isStudent();


		return(
			<React.Fragment>

					<div className={`${comment_scores && comment_scores.length && 'bor-bottom-greyE'} stud-class-set  edu-back-white mb10 padding20-30 `}
							style={{height:"100%"}}>

						<Modals
							modalsType={this.props.Modalstype}
							modalsTopval={this.props.Modalstopval}
							modalCancel={this.props.ModalCancel}
							modalSave={this.props.ModalSave}
							closable={false}
							footer={null}
							destroyOnClose={true}
							centered={true}
						/>


						{this.props.Modulationtype===true?<ModulationModal
							modalname={"调分"}
							visible={this.props.Modulationtype}
							Cancelname={"取消"}
							Savesname={"保存"}
							Cancel={this.props.cancelmodel}
							Saves={(value,num)=>this.props.saveModulationModal(value,num)}
							closable={false}
							footer={null}
							destroyOnClose={true}
							centered={true}
						/>:""}

						{/*<div style={{ width:'100%',height:'75px'}} >*/}
						{/*<p className=" fl color-black mt25 summaryname">{datalist&&datalist.task_name}</p>*/}
						{/*<a className="color-grey-6 fr font-16 mt10 mr20" onClick={this.goback}>返回</a>*/}
						{/*{this.props.isStudent()?<a className={"fr color-blue font-16 mt10 mr20"} onClick={this.addAccessory}>补交附件</a>:""}*/}
						{/*</div>*/}
						{this.props.ultimate===true? isAdmin &&
							<div style={{ width:'100%',height:'75px'}} >
								<a className={"fr color-blue font-16 mt10 mr20"} onClick={()=>this.props.showModulationtype(this.props.task_id)}>调分</a>
							</div>
							:""}
						{this.props.ultimate===true?"":<div className={"color-grey-6 mb10"}>
							<span className="labal">全部评阅</span>
							{ !!comment_scores.length && <span className="count">
								{comment_scores.length===0?"":`(${comment_scores.length})`}
							</span> }
						</div>}

						{this.props.ultimate===true ? "": isAdmin && <GraduationTasksappraiseMainEditor {...this.props}
								addSuccess={() => this.props.addSuccess()}
								showSameScore={this.props.task_type == 2}																																							
							></GraduationTasksappraiseMainEditor> }
				</div>

				{!!comment_scores.length && <div className={"stud-class-set  edu-back-white mb10"} style={{height:"100%"}}>

					<div className="padding20 memoReplies commentsDelegateParent course-message"
								style={{ paddingTop: '0px', paddingBottom: '0px' }}
					>

						
						<style>{`
						`}</style>
						<div className="panel-comment_item">
							{ comment_scores.map(item => {
								return <Graduationtaskitem item={item} onDelete={this.props.onDelete} {...this.props}></Graduationtaskitem>
							}) }
						</div>
					</div>
				</div> }
			</React.Fragment>
		)
	}
}
export default ImageLayerOfCommentHOC() (GraduationTasksappraiseReplyChild);