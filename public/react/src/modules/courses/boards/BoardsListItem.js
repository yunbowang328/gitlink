import React,{ Component } from "react";
import {Tooltip} from 'antd'
import moment from 'moment'
import { getUrl, WordsBtn, ConditionToolTip } from 'educoder'
import './boardsListItem.css';
class BoardsListItem extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
  onTitleClick = (discussMessage) => {
		if(this.props.checkIfLogin()===false){
			this.props.showLoginDialog()
			return
		}
		// if(this.props.checkIfProfileCompleted()===false){
		// 	this.setState({
		// 		AccountProfiletype:true
		// 	})
		// 	return
		// }
		// if(this.props.checkIfProfessionalCertification()===false){
		// 	this.props.showProfileCompleteDialog()
		// 	return
		// }

    const isAdminOrStudent = this.props.isAdminOrStudent();
    if (!isAdminOrStudent && discussMessage.is_public == false) {
      // 没有权限访问
      return;
    }
    const cid = this.props.match.params.coursesId    
    const board_id = this.props.match.params.boardId
    this.props.toDetailPage(cid, board_id, discussMessage.id)
  }
  render(){
    let { addGroup } = this.state;
    const isAdmin = this.props.isAdmin()
    const isAdminOrStudent = this.props.isAdminOrStudent()
    const { checkBox, discussMessage, onSticky, onItemClick, current_user } = this.props;
    if (!discussMessage || !discussMessage.author) {
      return '';
    }
    let canNotLink = !isAdminOrStudent && discussMessage.is_public == false

    return(
        <div className="panel-inner-fourm boardsList">
          <style>{`
            .boardsList .panel-list-img {
              width: 50px;
              height: 50px;
            }
          `}</style>
          { checkBox }
          <a href={`/users/${discussMessage.author.login}`} alt="用户" style={{"width":"50px","height":"50px","display":"block", margin: "0 10px"}}>
            {/* /images/avatars/User/1?1529221779 */}
            <img 
              alt="1?1529221779" className="panel-list-img mr15" height="50"
              src={`${getUrl()}/images/${discussMessage.author.image_url}`} width="50"
            ></img>
          </a>
          <div className="clearfix ds pr pt5 contentSection" onClick={() => onItemClick(discussMessage)}>
            <h6>
								{canNotLink?<span className="fl mt3 font-16 font-bd color-dark maxwidth580 pointer"  title={canNotLink?"私有属性，非课堂成员不能访问":`${discussMessage.subject}`}>{discussMessage.subject}</span>:<a  className="panel-list-title hide fl mt5 color-dark font-bd pointer"
									style={{ fontWeight: 'bold', maxWidth: '700px' }}
							    title={discussMessage.subject}
									onClick={canNotLink ? () => {} : () => this.onTitleClick(discussMessage)}
								>{discussMessage.subject}</a>}
              { !!discussMessage.sticky && <span className="btn-cir btn-cir-red fl mt5 ml5">置顶</span> }
              {
                
                 discussMessage.is_public == false ? (<Tooltip title={'私有属性，非课堂成员不能访问'} placement="bottom">
                  <i className="iconfont icon-guansuo color-grey-c ml10 font-16 fl mt4"></i>
                 </Tooltip>) : ""
              }

            </h6>

            <div className="fr">

              {(isAdmin || discussMessage.author.login == current_user.login) &&
              <WordsBtn style="blue" className="fr font-16 ml28"
                        onClick={(e) => { this.props.toEditPage(this.props.match.params.coursesId, this.props.match.params.boardId, discussMessage.id )} }>编辑</WordsBtn> }

              { isAdmin && <WordsBtn style="blue" className="fr font-16 ml28"
                                     onClick={(e) => { debugger; onSticky(discussMessage); e.cancelBubble = true; e.stopPropagation();}}>
                { discussMessage.sticky ? '取消置顶' : '置顶' }</WordsBtn> }

              {canNotLink?"":<WordsBtn style="blue"  className="font-16 fr " 	onClick={canNotLink ? () => {} : () => this.onTitleClick(discussMessage)}>查看详情</WordsBtn>}

            </div>
              
            <div className="cl"></div>
            <p className="color-grey panel-lightgrey mt18 fl">
              <span className="mr50">
                <a href={`/users/${discussMessage.author.login}`} className="panel-name-small hide fl mr15 mr30 color-grey3 font-14">{discussMessage.author.name}</a>

                { discussMessage.total_replies_count != 0 && <span className="mr15 color-grey9 font-14">{discussMessage.total_replies_count} 回复</span> }
                { discussMessage.praises_count != 0 && <span className="mr15 color-grey9 font-14">{discussMessage.praises_count} 点赞</span> }
                { discussMessage.visits != 0 && <span className="mr15 color-grey9 font-14">{discussMessage.visits} 浏览</span> }

                <span className="mr15 color-light-grey-C font-14">{moment(discussMessage.created_on).fromNow()} </span>
              </span>
            </p>
            {
              discussMessage.category_name && 
              <div className={'directory_style'}>
                <ConditionToolTip title={discussMessage.category_name} condition={discussMessage.category_name}>
                  { <div className=" color-grey9 task-hide fr"
                      style={{"maxWidth":"216px"}} 
                      title={discussMessage.category_name}>
                        所属目录：{discussMessage.category_name}
                    </div>
                  }
                </ConditionToolTip>
              </div>
            }

            {/* { (isAdmin || discussMessage.author.login == current_user.login) &&
            <div className="homepagePostSetting" style={{"right":"4px","top":"5px","display":"block"}}>
              <ul>
                <li className="edu-position edu-position-hidebox">
                  <i className="fa fa-bars color-grey-b"></i>
                  <ul className="edu-position-hide undis">
                    {(isAdmin || discussMessage.author.login == current_user.login) && <li><a href="javascript:void(0)" onClick={(e) => {
                        this.props.toEditPage(this.props.match.params.coursesId, this.props.match.params.boardId, discussMessage.id )} } >编辑</a></li>
                    }
                    {isAdmin && <li><a href="javascript:void(0)" onClick={(e) => { debugger; onSticky(discussMessage); e.cancelBubble = true; e.stopPropagation();} }>
                      { discussMessage.sticky ? '取消置顶' : '置顶' }
                    </a></li>
                    }
                  </ul>
                </li>
              </ul>
            </div>
            } */}


          </div>
        </div>
      )
    }
}
export default BoardsListItem;