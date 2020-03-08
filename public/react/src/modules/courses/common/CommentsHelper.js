import axios from 'axios'
import update from 'immutability-helper'

const transformReplies = (replies, transformFunction) => {
  return replies.map (reply => {
    return transformFunction(reply)
  })
}
// const _findById = (id, arg_comments) => {
//   const comments = arg_comments;
//   for(let i = 0; i < comments.length; i++) {
//     if (id === comments[i].id) {
//       return i;
//     }
//   }
// }
export function _findById(id, arg_comments) {
  const comments = arg_comments;
  for(let i = 0; i < comments.length; i++) {
    if (id === comments[i].id) {
      return i;
    }
  }
}
export function generateComments(comments, transformFunction, childrenName) {
  let newChildrenName = childrenName || 'children'
  const newComments = comments.map((item) => {
    let children = []
    if (item[newChildrenName]) {
      children = transformReplies(item[newChildrenName], transformFunction)
    }
    return transformFunction(item, children)
  })
  return newComments;
}

export function generateChildComments(childrenComments, parentComments, parentComment, transformFunction) {
  const childComments = childrenComments.map((item) => {
    let children = []
    return transformFunction(item, children)
  })
  const oldComments = parentComments

  var commentIndex = _findById(parentComment.id, oldComments);
  let comment = oldComments[commentIndex];
  comment.children = childComments
  comment.isAllChildrenLoaded = true;
  oldComments[commentIndex] = comment
  return oldComments;
}

export function handleContentBeforeCreateNew(argContent) {
  let content = argContent;
  if(content != undefined){
    content = content.replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'');
    
    var beforeImage = content.split("<img");
    var afterImage = content.split("/>");
    if(beforeImage[0] == "" && afterImage[1] == ""){
        window.notice_box('不支持纯图片评论<br/>请在评论中增加文字信息');
        return;
    }
  }
  return content
}

export function addNewComment(comments, _id, content, user, isSuperAdmin, parentComponent) {
  if (!comments) {
    comments = [];
  }
  comments.unshift( {
    "can_delete": true,
    "admin": parentComponent ? parentComponent.props.isAdmin() : user.admin ,
    isSuperAdmin: isSuperAdmin,
    "content": content,

    "image_url": user.image_url,
    "username": user.username,
    "user_login": user.login,

    "id": _id,
    "reward": null,
    "hidden": 0,

    "user_praise": false,
    "time": "1分钟前",
    "praise_count": 0,
    
    "user_id": user.user_id,  
  })
  return comments;
}
export const NEED_TO_WRITE_CONTENT = "必须填写内容！"
export function handleContentBeforeCreateSecondLevelComment(argContent) {
  if (argContent) {
    return argContent.replace(/(\n<p>\n\t<br \/>\n<\/p>)*$/g,'').trim();
  }
  return argContent
}
export function addSecondLevelComment(parentComments, parentComment, commentIndex, newId, commentContent, user, editor) {
  if (!parentComment.children ) {
    parentComment.children = []
  }
  parentComment.children.push( {
    "can_delete": true,
    "content": commentContent,

    "image_url": user.image_url,
    "username": user.username,
    "user_login": user.login,

    "id": newId,
    "time": "1分钟前",
    "praise_count": 0,
    
    "user_id": user.id,  
  })

  parentComments[commentIndex] = parentComment
  
  // md
  if (editor.setValue) {
    editor.setValue('')
    const $ = window.$
    var view_selector = `.commentItemMDEditorView_${parentComment.id}`
    $(view_selector).hide();
  }  

  return parentComments
}

// 公共接口
export function handleDeleteComment(that, parrentComment, childCommentId, objectType) {
  let deleteCommentId = parrentComment.id
  if (childCommentId) {
    deleteCommentId = childCommentId;
  }
  const url = `/commons/delete.json`
  let comments = that.state.comments; 

  axios.delete(url,
    { data: {
        object_id: deleteCommentId,
        object_type: objectType
    }  
  }).then((response) => {
    if (response.data && response.data.status === 0) { 
      const commentIndex = that._findById(parrentComment.id, comments);

      // https://stackoverflow.com/questions/29527385/removing-element-from-array-in-component-state
      if (!childCommentId) {
        that.setState((prevState) => ({
          comments: update(prevState.comments, {$splice: [[commentIndex, 1]]})
        }))
      } else {
        let childCommentIndex = that._findById(childCommentId, comments[commentIndex].children);
        comments[commentIndex].children = update(comments[commentIndex].children, {$splice: [[childCommentIndex, 1]]})
        that.setState({ comments })
      }

      const newMemo = Object.assign({}, that.state.memo);
      newMemo.sum_replies_count = newMemo.sum_replies_count - 1;
      that.setState({
        memo: newMemo,
        total_count: childCommentId ? that.state.total_count : that.state.total_count - 1,
      })
    }
    
  }).catch((error) => {
    console.log(error)
  })  
}

// 公共接口
export function handleCommentPraise(that, discussId, objectType, successCallback) {
  const { comments } = that.state;
  const commentIndex = that._findById(discussId, comments);

  const url = comments[commentIndex].user_praise ? '/praise_tread/unlike.json' : `/praise_tread/like.json`;
  const _method = comments[commentIndex].user_praise ? axios.delete : axios.post
  let _data = {
    object_id: discussId,  
    object_type: objectType,  //Discuss
  }
  if (comments[commentIndex].user_praise) {
    _data = {
      data: _data
    }
  }
  _method(url,
        {
          ..._data
        }     
      ).then((response) => {
        if (response.data.status === 0 ) { 
          
          comments[commentIndex].praise_count = comments[commentIndex].user_praise 
              ? comments[commentIndex].praise_count - 1 : comments[commentIndex].praise_count + 1;
          successCallback && successCallback(comments[commentIndex].user_praise )

          comments[commentIndex].user_praise = !comments[commentIndex].user_praise;

          that.setState({
            comments
          })
        }
        
      }).catch((error) => {
        console.log(error)
      })
}


export function handleHiddenComment(that, item, childCommentId, objectType) {
  const id = item.id
  const { showNotification } = that.props;
  const user = that._getUser();
  const url = item.hidden ? `/commons/unhidden.json` : `/commons/hidden.json`
  const { comments } = that.state;

  const commentIndex = that._findById(id, comments);
  const comment = comments[commentIndex];
  axios.put(url, {
          object_id: item.id,
          object_type: objectType
        },
        {
          
        }     
      ).then((response) => {
        if (response.data.status === -1) { 
          showNotification(response.data.message)
          return;
        }
        if (response.data.status === 0) { 
          
          if (!childCommentId) {
            comment.hidden = !comment.hidden;
            that.setState({
              comments: comments
            })
          } else {  // TODO 目前子回复没hidden字段
            let childCommentIndex = that._findById(childCommentId, comments[commentIndex].children);
            const childComment = comments[commentIndex].children[childCommentIndex]
            childComment.hidden = !childComment.hidden;
            that.setState({ comments })
          }
          
        }
        // {"message":"Couldn't find Discuss with id=911","status":-1}
        
      }).catch((error) => {
        console.log(error)
      })
}