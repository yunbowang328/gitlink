/*
 * @Description: 学员学习
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-23 10:53:19
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-06 15:27:34
 */
import './index.scss';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import LeftPane from './leftpane';
import RightPane from './rightpane';
// import { Link } from 'react-router-dom';
// import { getImageUrl } from 'educoder'
// import RightPane from '../newOrEditTask/rightpane';
import { Icon } from 'antd';
import UserInfo from '../components/userInfo';
import actions from '../../../redux/actions';
import { fromStore, CNotificationHOC} from 'educoder';
import { withRouter } from 'react-router';

function StudentStudy (props) {

  const [hasUpdate, setHasUpdate] = useState(true);
  const {
    hack,
    userInfo,
    // hack_identifier,
    // user_program_identifier,
    restoreInitialCode,
    changeUserCodeTab,
    changeShowOrHideControl
  } = props;

  const {
    match: { params }, 
    getUserProgramDetail,
    saveUserProgramIdentifier
  } = props;

  let { id, tab } = params;

  useEffect(() => {
    // 保存当前的id
    saveUserProgramIdentifier(id);
    // startProgramQuestion(id);
    getUserProgramDetail(id);
    
    if (tab) {
      changeUserCodeTab(tab);
    }
  }, []);

  useEffect(() => {
    const { hack = {} } = props;
    if (hack.modify_code && hasUpdate) { // 代码更改，提示是否需要更新代码
      setHasUpdate(false);
      handleUpdateNotice();
    }
  }, [props, hasUpdate, setHasUpdate]);

  const handleUpdateNotice = () => {
   console.log(props);
   props.confirm({
      title: '提示',
      content: (
        <p>
          代码文件有更新啦 <br />
          还未提交的代码，请自行保存
        </p>
      ),
      onOk () {
        restoreInitialCode(id, '更新成功');
      }
   })
    // Modal.confirm({
    //   title: '提示',
    //   content: (
    //     <p>
    //       代码文件有更新啦 <br />
    //       还未提交的代码，请自行保存
    //     </p>
    //   ),
    //   okText: '立即更新',
    //   cancelText: '稍后再说',
    //   onOk () {
    //     restoreInitialCode(id, '更新成功');
    //   }
    // });
  }
  // const _hack_id = hack_identifier || fromStore('hack_identifier');
  // 处理编辑
  const handleClickEditor = (identifier) => {
    if (!identifier) return;
    changeShowOrHideControl(false);
    props.saveEditorCodeForDetail('');
    props.clearOjForUserReducer();
    props.history.push(`/problems/${identifier}/edit`);
  }
  // 处理退出 
  const handleClickQuit = () => {
    // 退出时，清空内容
    props.clearOjForUserReducer();
    // 将控制台关闭
    changeShowOrHideControl(false);
    props.saveEditorCodeForDetail('');
    props.history.push('/problems');
  }

  return (
    <div className={'student_study_warp'}>
      <div className={'student_study_header'}>
        {/* <div className={'avator_nicker'}>
          <img alt="用户头像" className={'student_img'} src={getImageUrl((mygetHelmetapi && mygetHelmetapi.nav_logo_url) || 'images/educoder/headNavLogo.png?1526520218')} />
          <span className={'student_nicker'}>
            {(mygetHelmetapi &&mygetHelmetapi.name) || ''}
          </span>
        </div> */}
        <UserInfo userInfo={userInfo}/>
        <div className={'study_name'}>
          <span>{hack.name}</span>
        </div>
        <div className={'study_quit'}>
          {/* to={`/problems/${_hack_id}/edit`} */}
          <span 
            style={{ display: userInfo.hack_manager ? 'inline-block' : 'none' }}
            onClick={() => handleClickEditor(hack.identifier)} 
            className={`quit-btn`}
          >
            <Icon type="form" className="quit-icon"/> 编辑
          </span>
          {/* to="/problems" */}
          <span onClick={handleClickQuit} className="quit-btn">
            <Icon type="poweroff" className="quit-icon"/> 退出
          </span>
          {/* <Button type="link" icon="form" className='quit-btn'>
            <Link to="/problems">编辑</Link>
          </Button>
          <Button type="link" icon="poweroff" className='quit-btn'>
            <Link to="/problems">退出</Link>
          </Button> */}
        </div>
      </div>
      <div className="split-pane-area">
        <SplitPane className="outer-split-pane" split="vertical" minSize={350} maxSize={-350} defaultSize="40%">
          <div className={'split-pane-left'}>
            <LeftPane />
          </div>
          <SplitPane split="vertical" defaultSize="100%" allowResize={false}>
            <RightPane 
              updateNotice={handleUpdateNotice}
            />
            <div />
          </SplitPane>
        </SplitPane>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { hack_identifier, user_program_identifier,  hack } = state.ojForUserReducer;
  return {
    hack,
    userInfo,
    user_program_identifier,
    hack_identifier
  }; 
};

const mapDispatchToProps = (dispatch) => ({
  // 调用开启编辑
  // startProgramQuestion: (id) => dispatch(actions.startProgramQuestion(id))
  // 调用编程题详情
  getUserProgramDetail: (id) => dispatch(actions.getUserProgramDetail(id)),
  saveUserProgramIdentifier: (id) => dispatch(actions.saveUserProgramIdentifier(id)),
  saveEditorCodeForDetail: (code) => dispatch(actions.saveEditorCodeForDetail(code)),
  // 恢复初始代码
  restoreInitialCode: (identifier, msg) => dispatch(actions.restoreInitialCode(identifier, msg)),
  changeShowOrHideControl: (flag) => dispatch(actions.changeShowOrHideControl(flag)),
  clearOjForUserReducer: () => dispatch(actions.clearOjForUserReducer()),
  changeUserCodeTab: (tab) => dispatch(actions.changeUserCodeTab(tab)) 
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CNotificationHOC()(StudentStudy)));


