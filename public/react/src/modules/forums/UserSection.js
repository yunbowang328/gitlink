import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import PropTypes from 'prop-types';

import classNames from 'classnames'

import axios from 'axios'

class UserSection extends Component {
    constructor(props) {
      super(props)

      this.state = {
     
      }
    }
    /*点击关注或者取消关注*/
    AboutFocus(){
        const { author_info } = this.props
        /*http://localhost:3000/api/v1/users/155/watch?object_id=156&object_type=user*/

        // const focusUrl = `/api/v1/users/${author_info.user_id}/${this.props.author_info.watched ? 'unwatch' : 'watch'}?object_id=${author_info.user_id}&object_type=user`

        // axios.get(focusUrl,{
        // })
        // .then((response) => {
        //     const status = response.data.status;
        //     console.log(status);
        //     if(status == 1){
        //         const new_author_info = Object.assign({}, this.props.author_info)
        //         new_author_info.watched = !new_author_info.watched
        //         this.props.initForumState({author_info: new_author_info})
        //     }
        // }).catch((error) => {
        //     console.log(error)
        // })

        let url=`/users/${author_info.user_id}/watch.json`;
        // 取消关注
        if(author_info.watched){
            axios.delete(url).then((result)=>{
                if(result){
                    const new_author_info = Object.assign({}, this.props.author_info)
                    new_author_info.watched = !new_author_info.watched
                    this.props.initForumState({author_info: new_author_info})
                }
            }).catch((error)=>{
                console.log(error)
            })
        }else{
            // 关注
            axios.post(url).then((result)=>{
                if(result){
                    const new_author_info = Object.assign({}, this.props.author_info)
                    new_author_info.watched = !new_author_info.watched
                    this.props.initForumState({author_info: new_author_info})
                }
            }).catch((error)=>{
                console.log(error);
            })
        }
    }


  	render() {
  		const { match, history, author_info , current_user } = this.props
        if (!author_info || !current_user) {
            return <div className="edu-back-white" id="forum_index_list"></div>
        }
	    return (
    		<div className="edu-back-white padding40-20 edu-txt-center">
	        	<a href={`/users/${author_info.login}`} target="_blank"><img src={`/images/${author_info.image_url}`} width="90" height="90" className="radius mb5"/></a>
                <p className="font-20 userPrivateName">{author_info.username}</p>
                <p className="color-grey-9 userPrivatePost">{author_info.identity}</p>
                { author_info.user_id !== current_user.user_id && 
                <p className="clearfix mt30">
                    <a href="javascript:void(0)" className="fl font-16 mr10 user_default_btn edu-blueback-btn" onClick={()=>{this.AboutFocus()}}>{ author_info.watched == true ? "取消关注" : "关注" }</a>
                    <a href={`/messages/${current_user.login}/message_detail?target_ids=${author_info.user_id}`} className="fr font-16 user_default_btn user_private_btn" target="_blank">私信</a>
                </p> }
	        </div>
	    );
  	}
}

export default UserSection;
