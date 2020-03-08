/*
 * @Description: 
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-27 09:49:30
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-27 20:22:55
 */
import '../index.scss';
import React from 'react';
import { Tag } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import QuillForEditor from '../../../../../common/quillForEditor';

import CONST from '../../../../../constants';
const {tagBackground, diffText} = CONST;

const TaskDescription = (props) => {

  const { hack = {}, userInfo = {} } = props;
  const {language, difficult, time_limit, username, description} = hack;
  return (
    <div className={'task_description_area'}>
      <div className={'desc_area_header'}>
        <p className={'header_flex'}>
          <span className={'flex_label'}>编程语言:</span>
          <span className={'flex_value'}>{language}</span>
        </p>
        <p className={'header_flex'}>
          <span className={'flex_label'}>难度:</span>
          <Tag color={tagBackground[+difficult]}>{diffText[+difficult]}</Tag>
        </p>
        <p className={'header_flex'}>
          <span className={'flex_label'}>程序运行时间限制:</span>
          <span className={'flex_value'}>{time_limit}秒</span>
        </p>
        <p className={'header_flex'}>
          <span className={'flex_label'}>出题者:</span>
          <Link to={hack.user_path || '/'} target="_blank" style={{ color: '#5091FF'}}>{username}</Link>
        </p>
      </div>
      <div className="task_desc_area">
        <QuillForEditor
          readOnly={true}
          value={description}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { hack } = state.ojForUserReducer;
  const { userInfo } = state.userReducer;
  return {
    hack,
    userInfo
  }
}

export default connect(
  mapStateToProps
)(TaskDescription);