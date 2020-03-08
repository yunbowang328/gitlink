import React, { Component } from 'react';

import { SnackbarHOC, getImageUrl } from 'educoder';
import ChangeHeaderPicModal from './ChangeHeaderPicModal'
class AccountImg extends Component {
    editImg = () => {
      this.refs['picModal'].setVisible(true)
    }
    render() {
      const picUrl = getImageUrl("images/"+this.props.src)
      return (
        <div className="headphoto mt14">
          <ChangeHeaderPicModal 
            {...this.props} ref="picModal" imageSrc={picUrl} userLogin={this.props.current_user ? this.props.current_user.login : '' }></ChangeHeaderPicModal>
          <style>{`
            /*
            .headphoto {
              text-align: center;
              background: #FFFFff;
              width: 115px;
              height: 115px;
              padding: 3px;
              border-radius: 50%;
              position: relative;
              float: left;
              margin-top: 19px;
              box-sizing: border-box;
            }
            .headphoto img {
              width: 109px;
              border-radius: 50%;
              height: 109px;
            }
            .headphoto-black {
              display: none;
              cursor: pointer;
              position: absolute;
              top: 3px;
              left: 3px;
              width: 109px;
              height: 109px;
              text-align: center;
              line-height: 112px;
              border-radius: 50%;
              background-color: rgba(0,0,0,0.3);
              color: #fff;
            } */
            .headphoto:hover .headphoto-black {
              display: block;
            }
          `}</style>
          <img alt="头像" id="user_avatar_show" nhname="avatar_image" src={`${picUrl}`}></img>
          <p className="headphoto-black" onClick={this.editImg} >修改头像</p>
        </div>
      );
    }
}

export default AccountImg;
