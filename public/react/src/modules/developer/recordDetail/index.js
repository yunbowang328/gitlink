/*
 * @Description: 提交记录详情
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-04 08:36:21
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-02 13:48:02
 */
import './index.scss';
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import moment from 'moment';
import ErrorResult from '../components/errorResult';
import { Link } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import { connect } from 'react-redux';
// import { getImageUrl } from 'educoder';
import { withRouter } from 'react-router'
import actions from '../../../redux/actions';
import CONST from '../../../constants';
import UserInfo from '../components/userInfo';

const {reviewResult} = CONST;

function RecordDetail (props) {
  const {
    match: { params }, 
    recordDetail,
    // identifier,
    getUserCommitRecordDetail,
    saveEditorCodeForDetail
  } = props;
  
  const id = params.id;
  const [detail, setDetail] = useState({});
  const [user, setUser] = useState({});
  const [identifier, setIdentifier] = useState('');

  useEffect(() => {
    // 根据id获取记录详情
    getUserCommitRecordDetail(id, 'detail');    
  }, []);

  useEffect(() => {
    setDetail(recordDetail);
    // console.log('详情: ', recordDetail);
    if (recordDetail) {
      const { user, myproblem_identifier, code } = recordDetail;
      setUser(user);
      setIdentifier(myproblem_identifier);
      if (code) {
        saveEditorCodeForDetail(code);
      }
    }
  }, [recordDetail]);
  
  const handleReturn = (identifier) => {
    if (identifier) {
      saveEditorCodeForDetail('');
      setTimeout(() => {
        props.history.push(`/myproblems/${identifier}`);
      }, 300);
    }
  }

  const handleEditorCode = (identifier, code) => {
    if (identifier) {
      console.log(code);
      saveEditorCodeForDetail(code);
      props.history.push(`/myproblems/${identifier}`);
    }
  }
  return (
    <div className="record_detail_area">
      <div className="record_detail_header">
        {/* <div className="avator_nicker">
          <img alt="用户头像" className={'student_img'} src={getImageUrl( (user && `images/${user.image_url}`)|| 'images/educoder/headNavLogo.png?1526520218')} />
          <span className={'student_nicker'}>
            {(user && user.name) || ''}
          </span>
        </div> */}
        <UserInfo userInfo={user || {}}/>
        <div className={'study_name'}>
          <span>{detail.name || 'test'}</span>
        </div>
        <div className={'study_quit'}>
          <Button style={{ visibility: identifier ? 'visible' : 'hidden'}} onClick={() => handleReturn(identifier)}>
            返回该题
            {/* <Link to={`/myproblems/${identifier}`}>返回该题</Link> */}
          </Button>
        </div>
      </div>
      <div className="record_detail_ctx">
        <div className="detail_ctx_header">
          <h2 className="header_h2">提交记录</h2>
        </div>
        <div className="detail_ctx_status">
          <span className="status_label">
            状态: <span className={detail.status === 0 ? 'status_label_success' : 'status_label_error'}>{reviewResult[detail.status]}</span>
          </span>
          <span className="status_label">
            提交时间: <span className="status_label_sub">
              {moment(detail.created_at).format('YYYY-MM-DD HH:mm')}
            </span>
          </span>
          <span className="status_label">
            语言: <span className="status_label_sub">{detail.language}</span>
          </span>
          <span className="status_label" style={{ visibility: detail.status === 0 ? 'visible' : 'hidden'}}>
            执行用时: <span className="status_label_sub">{`${detail.execute_time && Number(detail.execute_time * 1000).toFixed(2)}ms`}</span>
          </span>
          <span className="status_label pass_case" style={{ display: [-1, 0, 2, 5].includes(detail.status) ? 'inline-block' : 'none'}}>
            <span className="status_label_sub">{detail.pass_sets_count}</span>
            <span className="pass_case_span"> / {detail.set_count}</span>
            个通过测试用例
          </span>
        </div>
        <div className="result_error_area">
          <ErrorResult detail={detail}/>
        </div>
        <div className="detail_ctx_header">
          <h2 className="header_h2">提交内容</h2>
          <Button
            style={{ visibility: identifier ? 'visible' : 'hidden'}}
            className={'header_btn'} 
            type="primary"
            onClick={() => handleEditorCode(identifier, detail.code)}
          >
              编辑代码
            {/* <Link to={`/myproblems/${identifier}`}>编辑代码</Link> */}
          </Button>
        </div>
        <div className="result_code_area">
          <MonacoEditor
            height="100%"
            width="100%"
            language={(detail.language && detail.language.toLowerCase()) || ''}
            value={detail.code || ''}
            theme="dark"
            readOnly={true}
          />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const {recordDetail} = state.ojForUserReducer;
  return {
    // identifier: user_program_identifier,
    recordDetail
  }
}
const mapDispatchToProps = (dispatch) => ({
  // 根据id号获取记录详情
  getUserCommitRecordDetail: (id, type) => dispatch(actions.getUserCommitRecordDetail(id, type)),
  saveEditorCodeForDetail: (code) => dispatch(actions.saveEditorCodeForDetail(code))
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(RecordDetail));