/*
 * @Description: 评论单列
 * @Author: tangjiang
 * @Github: 
 * @Date: 2019-12-17 17:35:17
 * @LastEditors  : tangjiang
 * @LastEditTime : 2019-12-27 11:05:17
 */
import './index.scss';
import 'quill/dist/quill.core.css'; // 核心样式
import 'quill/dist/quill.snow.css'; // 有工具栏
import 'quill/dist/quill.bubble.css'; // 无工具栏
import 'katex/dist/katex.min.css'; // katex 表达式样式
import React, { useState } from 'react';
import CommentIcon from './CommentIcon';
import { getImageUrl, CNotificationHOC } from 'educoder'
import { Icon } from 'antd';
import CommentForm from './CommentForm';
import QuillForEditor from '../../quillForEditor';

function CommentItem ({
  isAdmin,
  options,
  confirm,
  comment,
  submitDeleteComment,
  submitChildComment,
  likeComment,
  showOrHideComment
}) {
  // 显示评论输入框
  const [showQuill, setShowQuill] = useState(false);
  // 加载更多评论内容
  // const [showMore, setShowMore] = useState(false);
  // 显示子列数
  const [showItemCount, setShowItemCount] = useState(5);
  // 箭头方向
  const [arrow, setArrow] = useState(false);
  // 上传图片的ulr
  const [url, setUrl] = useState('');

  const { 
    author = {}, // 作者
    id, // 评论id
    content, // 回复内容
    time, // 回复时间
    hidden, // 是否隐藏
    // hack_id, // OJ的ID
    praise_count, // 点赞数
    user_praise, // 当前用户是否点赞
    can_delete,
    children = [] // 子回复
  } = comment;

  // 删除评论 type: parent | child,  id
  const deleteComment = (id) => {
    confirm({
      title: '提示',
      content: ('确定要删除该条回复吗?'),
      onOk () {
        console.log('点击了删除', id);
        submitDeleteComment && submitDeleteComment(id);
      }
    });
  }

  // 评论头像
  const commentAvatar = (author) => ( 
    <img 
      className="item-flex flex-image" 
      src={author.image_url ? getImageUrl(`images/${author.image_url}`) : 'https://b-ssl.duitang.com/uploads/item/201511/13/20151113110434_kyReJ.jpeg'}
      alt=""
    />
  );
  
  // 评论信息
  const commentInfo = (id, author, time, can_delete) => {
    const _classNames = can_delete ? 'item-close' : 'item-close hide';
    return (
      <div className="item-header">
        <span className="item-name">{author.name || ''}</span>
        <span className="item-time">{time || ''}</span>
        <span className={_classNames}>
          <span className="iconfont icon-shanchu icon_font_size_14" onClick={() => deleteComment(id)}></span>
        </span>
      </div>
    );  
  };

  const handleShowUploadImage = (url) => {
    // console.log('==============>>>>>>>>>>>>',url);
    setUrl(url);
  }
  // 评论内容
  const commentCtx = (ctx) => {
    let _ctx = null;
    try {
      _ctx = JSON.parse(ctx);
    } catch (e) {
      _ctx = ctx;
    }
    return (
      <QuillForEditor
        readOnly={true}
        value={_ctx}
        showUploadImage={handleShowUploadImage}
      />
  )};

  // 加载更多
  const handleOnLoadMore = (len) => {
    setShowItemCount(!arrow ? len : 1);
    setArrow(!arrow);
  };

  // 评论追加内容
  const commentAppend = (children = []) => {

    const len = children.length;
    const _moreClass = len > showItemCount ? 'comment_item_loadmore show' : 'comment_item_loadmore'
    const lastTxt = len - showItemCount;
    const renderChild = (children) => {
      return children.map((child, i) => {
        const {
          id, // 评论id
          author = {},
          time,
          content,
          can_delete
        } = child;
        const showOrHide = i < showItemCount ? 'comment_item_show' : 'comment_item_hide';
        return (
          <li
            key={`child_${i}`}
            className={showOrHide}
          >
            <div className="comment_item_area comment_child_item_area">
              {commentAvatar(author)}
              <div className="item-flex item-desc">
                {commentInfo(id, author, time, can_delete)}
                {commentCtx(content)}
              </div>
            </div>
          </li>
        );
      })
    }

    const _clazz = len > 0 ? 'comment_item_append_list active' : 'comment_item_append_list';
    return (
      <ul className={_clazz}>
        {renderChild(children)}

        <li className={_moreClass} onClick={() => handleOnLoadMore(len)}>
          <p className="loadmore-txt">展开其余{lastTxt}条评论</p>
          <p className="loadmore-icon">
            <Icon type={!arrow ? 'down' : 'up'}/>
          </p>
        </li>
      </ul>
    );
  };
  // 点击图标
  const handleShowOrHide = (id, hidden) => {
    showOrHideComment && showOrHideComment(id, hidden);
  }

  // 点赞
  const handleClickLick = (id) => {
    likeComment && likeComment(id);
  }
  
  // 点击评论icon
  const handleClickMessage = () => {
    setShowQuill(true);
  }

  // 点击取消
  const handleClickCancel = () => {
    setShowQuill(false);
  }

  // 点击保存
  const handleClickSubmit = (id) => {
    return (ctx) => {
      setShowQuill(false);
      submitChildComment && submitChildComment(id, ctx);
    }
  }

  const handleClose = () => {
    setUrl('');
  }

  return (
    <li className="comment_item_area">
      {commentAvatar(author)}
      <div className="item-flex item-desc">
        {commentInfo(id, author, time, can_delete)}
        {commentCtx(content)}
        
        {commentAppend(children)}

        <div className="comment_icon_area">
          <CommentIcon
            style={{ display: isAdmin ? 'inline-block' : 'none'}}
            className='comment-icon-margin' 
            type={!hidden ? "xianshi" : 'yincang1'} 
            iconClick={() => handleShowOrHide(id, !hidden ? 1 : 0)}
          />

          <CommentIcon
            style={{ display: can_delete ? 'inline-block' : 'none'}}
            className='comment-icon-margin' 
            type={'shanchu'} 
            iconClick={() => deleteComment(id)}
          />
          {/* 回复 */}
          <CommentIcon 
            className='comment-icon-margin' 
            type="huifu1"
            count={children.length} 
            iconClick={handleClickMessage}
          />
          {/* 点赞 */}
          <CommentIcon 
            iconColor={ user_praise ? '#5091FF' : '' }
            className='comment-icon-margin'
            theme={user_praise ? 'filled' : ''}
            type="dianzan"
            count={praise_count}
            iconClick={() => handleClickLick(id)}
          />
        </div>

        <div
          style={{ display: showQuill ? 'block' : 'none'}}
          className="comment_item_quill">
          <CommentForm
            onCancel={handleClickCancel}
            onSubmit={handleClickSubmit(id)}
          />
        </div>

        {/* 显示上传的图片信息 */}
        <div className="show_upload_image" style={{ display: url ? 'block' : 'none'}}>
          <Icon type="close" className="image_close" onClick={handleClose}/>
          <div className="image_info">
            <img className="image" src={url} alt=""/>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CNotificationHOC() (CommentItem);
