import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class TPMNav extends Component {

  	render() {
			// console.log("componentDidMount");
			// console.log("TPMNavTPMNavTPMNavTPMNav");
			// console.log(this.props);

      const { user, match, shixun, secret_repository,is_jupyter} = this.props;
  		let isAdminOrCreator = false;
      	if (user) {
	        isAdminOrCreator = user.admin || user.manager
      	}
  		const shixunId = match.params.shixunId;
  		// const challengesPath = `/shixuns/${shixunId}/challenges`;
		// console.log(this.props.propaedeutics)
		const challengesPath = `/shixuns/${shixunId}/challenges`;
		// console.log(match.path)
		// 	console.log("TPMNavTPMNavTPMNav");
		// 	console.log(is_jupyter);
			const  is_teacher = this.props&&this.props.current_user&&this.props.current_user.is_teacher?this.props.current_user.is_teacher:"";
			const isfalse=true;
	    return (


					isfalse?"":

	      	<div className="bor-bottom-greyE clearfix pl20 pr20 pt40 pb20 edu-back-white challengeNav">
		        <Link
							to={challengesPath}
		        	className={match.path === "/shixuns/:shixunId"|| match.path ==="/shixuns/:shixunId/challenges"?  " active fl mr40": 'fl mr40'}>任务</Link>

				{
					this.props.propaedeutics===undefined?"":this.props.propaedeutics===false?"":<Link to={`/shixuns/${shixunId}/propaedeutics`}
								 className={`${match.url.indexOf('propaedeutics') != -1 ? 'active' : ''} fl mr40 `}
								 id={"knowledge"}
						>背景知识</Link>
				}

						{ this.props.identity >4||this.props.identity===undefined ?"":
							(this.props.is_jupyter===false?
								<Link to={`/shixuns/${shixunId}/repository`}
											className={`${match.url.indexOf('/repository') != -1 ? 'active' : ''} fl mr40`}>版本库</Link>
							:"")
						}



						{this.props.identity >4||this.props.identity===undefined ?"":	secret_repository && <Link to={`/shixuns/${shixunId}/secret_repository`}
                      className={`${match.url.indexOf('secret_repository') != -1 ? 'active' : ''} fl mr40`}>私密版本库</Link>}

		        <Link to={`/shixuns/${shixunId}/collaborators`}
		        	className={`${match.url.indexOf('collaborators') != -1 ? 'active' : ''} fl mr40`}>合作者</Link>

						 {/*jupyter*/}
						{
							this.props.is_jupyter===true?
										<Link to={`/shixuns/${shixunId}/dataset`}
													className={`${match.url.indexOf('dataset') != -1 ? 'active' : ''} fl mr40`}>数据集</Link>
								:""
						}

						{
							this.props.is_jupyter === false ?
								<Link to={`/shixuns/${shixunId}/shixun_discuss`}
											className={`${match.url.indexOf('shixun_discuss') != -1 ? 'active' : ''} fl mr40`}>评论</Link>
								:""
						}
						{
							this.props.is_jupyter === false ?
		        <Link to={`/shixuns/${shixunId}/ranking_list`}
		        	className={`${match.url.indexOf('ranking_list') != -1 ? 'active' : ''} fl mr40`}>排行榜</Link>:""
						}

						{this.props.identity >2||this.props.identity===undefined?"":
									<Link to={`/shixuns/${shixunId}/audit_situation`}
												className={`${match.url.indexOf('audit_situation') != -1 ? 'active' : ''} fl`}>审核情况</Link>
						}

						{this.props.identity >4||this.props.identity===undefined ? "":<Link  to={`/shixuns/${shixunId}/settings`} className="edu-default-btn edu-blueline-btn ml20 fr"
                >配置</Link>}
	      	</div>
	    );
  	}
}

export default TPMNav;
