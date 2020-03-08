import React, { Component } from 'react';

import Tooltip from 'material-ui/Tooltip';

import './Comment.css'

import messageImg from '../../images/tpi/message.svg'

import messagegreyImg from '../../images/tpi/messagegrey.svg'

const $ = window.$;
function pasteListener(event) {
    if (event.clipboardData.types[0] === 'Files' ) {
        event.preventDefault();
        // event.stopPropagation(); 
    }
}
/*

*/
class CommentInput extends Component {

    componentDidMount() {
        const {  challenge } = this.props;
        
    }

    componentWillReceiveProps(newProps, newContext) {
        // TODO 暂没有切实训的场景
        if (newProps.challenge && newProps.challenge.shixun_id 
                && (!this.props.challenge.shixun_id || newProps.challenge.shixun_id != this.props.challenge.shixun_id)) {
            setTimeout(()=>{
                window.sd_create_editor_from_shixun_data(newProps.challenge.shixun_id, null, "100%", "Shixun"); 
                if ( $.browser.mozilla ) {
                    setTimeout(() => {
                        const _body = $('.ke-edit-iframe')[0].contentWindow.document.body;
                        _body.removeEventListener('paste', pasteListener)
                        _body.addEventListener('paste', pasteListener)
                    }, 4200)
                }
            }, 100)
            
        }
        
    }

    render() {
        const { createNewComment, editedComment, commentOnChange, challenge, shixun, loading, praisePlus, gotNewReply, showNewReply} = this.props;

        /*
            onclick="game_praise('<%= @game_challenge.id %>', '<%= @game_challenge.class %>')"

             onclick="game_tread('<%=  @game_challenge.id %>')"

             style={{display: 'none'}}
        */
        return (
            <li className="comment-input fl" id="shixun_comment_block">
                { !challenge.shixun_id ? '' :
                <div nhname={`new_message_${challenge.shixun_id}`} className="fr" style={{ width: '99%'}}>
                    <form acceptCharset="UTF-8" action="/discusses?challenge_id=118&dis_id=61&dis_type=Shixun" className="df" data-remote="true" id="new_comment_form" method="post">
                        <div className="fl" style={{flex: 1,marginTop:'7px'}} id="editor_panel">
                            <div nhname={`toolbar_container_${challenge.shixun_id}`}></div>
                        {/*有问题或有建议，请直接给我留言吧！*/}
                            <textarea id={`comment_news_${challenge.shixun_id}`}
                                nhname={`new_message_textarea_${challenge.shixun_id}`} name="content" 
                                value={ editedComment } onChange={ commentOnChange } className="none"> 
                            </textarea>
                        </div>
                        <div className="tips"
                            style={{ 'float': 'left', 'marginTop': '6px', 'fontSize': '12px', 'color': '#ff6800'}}>
                            请勿粘贴答案，否则将造成账号禁用等后果！
                        </div>
                        <div className="fr buttons" style={{ minWidth:'25px', height: '32px' }}>
                            <a id={`new_message_submit_btn_${challenge.shixun_id}`} href="javascript:void(0)" 
                            style={{display: 'none'}} onClick={ createNewComment } className="commentsbtn task-btn task-btn-blue  fr">
                            发送
                            </a>
                            <p className="fr ml10" style={{minWidth:'25px'}} >
                                <Tooltip title={ challenge.user_praise ? "取消点赞" : "点赞"}>
                                    <span id="game_praise_tread" className="color-grey mr20" onClick={praisePlus}>
                                        <i className={`mr3  ${ challenge.user_praise ? "iconfont icon-dianzan color-orange03" : "iconfont icon-dianzan-xian" } `} alt="赞" ></i>
                                        { challenge.praise_count ? 
                                                <span className="font-16" id="game_praise_count">{challenge.praise_count}</span> : ''}
                                    </span>
                                </Tooltip>
                            </p>
                            <p className="fr ml10" style={{minWidth:'25px'}} >
                                { gotNewReply ? 
                                <React.Fragment>
                                    <i className={`replyIcon newReplyIcon iconfont icon-tpixiaoxitixing`} onClick={showNewReply}></i>
                                    <span className="dot blink"></span>
                                </React.Fragment>
                                : 
                                <Tooltip title={ "暂无新消息" }>
                                    <i className={`replyIcon iconfont icon-tpixiaoxitixing`}></i>
                                </Tooltip>
                                }
                            </p>
                        </div>
                    </form>
                </div>
                }
            </li>
        )
    }
}

/*
    
                                    <img src={messagegreyImg}/>

    <span data-tip-top={ tread ? "踩" : "取消踩" }  id="game_tread" className="color-grey" style={{paddingTop:'7px'}}>
                              <i className={`fa fa-thumbs-down font-20 mr3 ${ tread ? "" : "color-orange03" } `} ></i>
                              <span className="font-12 font-bd" id="game_tread_count">{tread_count}</span>
                            </span>

    <div className="clearfix with100">
        <textarea className="commentTxt"></textarea>
        <p className="clearfix">
            <a href="javascript:void(0)" className="fl uploadImg mt2">
                <img src="/images/sendimg.svg" className="fl mr3 mt6"/><span className="up">上传图片</span>
            </a>
            <a href="javascript:void(0)" className="commentsbtn task-btn task-btn-blue fr">评论</a>
            <span className="fr mr15 mt3"><i className="fa fa-thumbs-up color-dark-grey mr3 font-18"></i>20</span>
           
            <img src="/images/message.svg" className="fr mr15 mt8"/>
        </p>
    </div>
*/
export default CommentInput;