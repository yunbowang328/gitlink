/*
 * @Description: 用户头像及昵称
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-09 17:11:28
 * @LastEditors: tangjiang
 * @LastEditTime: 2019-12-09 17:36:55
 */
import './index.scss';
import React from 'react';
import { getImageUrl } from 'educoder'

function UserInfo (props) {
  const {image_url, name} = props.userInfo;
  return (
    <div className={'avator_nicker'}>
      <img style={{ display: image_url ? 'inline-block' : 'none'}} alt="用户头像" className={'student_img'} src={getImageUrl(`images/${image_url}` || 'images/educoder/headNavLogo.png?1526520218')} />
      <span className={'student_nicker'}>
        {name || ''}
      </span>
    </div>
  );
}

export default UserInfo
export {
  UserInfo
};
