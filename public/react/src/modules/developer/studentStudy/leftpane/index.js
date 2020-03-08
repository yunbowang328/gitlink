/*
 * @Description: 学员测评页面
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-11-23 11:33:41
 * @LastEditors  : tangjiang
 * @LastEditTime : 2020-01-02 13:51:22
//  */
import './index.scss';
import React, { useState, useEffect, useMemo } from 'react';
import { Divider } from 'antd';
import { connect } from 'react-redux';
import Comment from './comment';
import CommitRecord from './commitRecord';
import TaskDescription from './taskDescription';
import TextNumber from './../../components/textNumber';
import actions from '../../../../redux/actions';
import CommentForm from '../../../../common/components/comment/CommentForm';
// const { TabPane } = Tabs;

const LeftPane = (props) => {

  const { hack, userCodeTab } = props;
  const { 
    pass_count,
    submit_count,
    praises_count, /* 点赞数 */
    comments_count, /* 评论数*/
    user_praise // 用户是否点赞
  } = hack;
  const [defaultActiveKey, setDefaultActiveKey] = useState('task');
  
  const navItem = [
    {
      title: '任务描述',
      key: 'task'
    }, 
    {
      title: '提交记录',
      key: 'record'
    },
    {
      title: '评论',
      key: 'comment'
    }
  ];

  const Comp = {
    task: (<TaskDescription />),
    record: (<CommitRecord />),
    comment: (<Comment />)
  };
  
  useEffect(() => {
    setDefaultActiveKey(userCodeTab);
  }, [userCodeTab])

  const renderComp = useMemo(() => {
    return Comp[defaultActiveKey];
  }, [defaultActiveKey, setDefaultActiveKey]);

  const renderNavItem = navItem.map((item) => {
    
    const _classes = item.key === defaultActiveKey ? 'add_editor_item active' : 'add_editor_item';
    return (
      <li
        key={item.key}
        className={_classes}
        onClick={() => setDefaultActiveKey(item.key)}
      >
        <span className={'item-span'}>{item.title}</span>
      </li>
    )
  });

  // 点击消息
  const handleClickMessage = () => {
    // 切换到评论tab
    setDefaultActiveKey('comment');
  }

   // 点击点赞
  const handleClickLike = () => {
    // 对OJ进行点赞
    const {id, identifier } = props.hack;
    props.likeComment(identifier, id, {
      container_type: 'Hack',
      type: 1
    });
  };

   // 点击不喜欢
  // const handleClickDisLike = () => {
  //   console.log('点击的DisLike---------');
  // }

  // 添加评论
  const handleAddComment = (ctx) => {
    // console.log('添加的评论内容: ', ctx, props.identifier);
    props.identifier && props.addComment(props.identifier, {
      comments: {
        content: ctx
      }
    });
  };

  const _style = {
    display: defaultActiveKey === 'record' ? 'none' : 'flex'
  };

  return (
    <React.Fragment>
      <ul className={'add_editor_list_area'}>
        { renderNavItem }
      </ul>
      <div className="comp_ctx">
        { renderComp }
      </div>
      <div className={'number_area'} style={_style}>
        <div className="number_flex flex_count" style={{ display: defaultActiveKey !== 'comment' ? 'flex' : 'none'}}>
          <TextNumber text="通过次数" number={pass_count} position="vertical"/>
          <Divider type="vertical" style={{ height: '20px', margin: '10px 20px' }}/>
          <TextNumber text="提交次数" number={submit_count} position="vertical"/>
        </div>
        <div className="number_flex flex_quill" style={{ display: defaultActiveKey === 'comment' ? 'flex' : 'none'}}>
          <CommentForm 
            onSubmit={handleAddComment}
            type="bottom"
          />
        </div>
        <div className="number_flex flex_info">
          <TextNumber text="huifu1" number={hack.comments_count} type="icon" onIconClick={handleClickMessage}/>
          <TextNumber 
            className={user_praise ? 'like active' : 'like'}
            text="dianzan" 
            number={praises_count}
            theme={user_praise ? 'filled' : ''}
            type="icon" 
            onIconClick={handleClickLike}/>
          {/* <TextNumber text="dislike" number={0} type="icon" onIconClick={handleClickDisLike}/> */}
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  const { hack, userCodeTab, comment_identifier} = state.ojForUserReducer;
  return {
    hack,
    userCodeTab,
    identifier: comment_identifier
  }
}
// changeUserCodeTab
const mapDispatchToProps = (dispatch) => ({
  changeUserCodeTab: (key) => dispatch(actions.changeUserCodeTab(key)),
  likeComment: (identifier, id, params) => dispatch(actions.likeComment(identifier, id, params)),
  addComment: (identifier, comments) => dispatch(actions.addComment(identifier, comments))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LeftPane);
