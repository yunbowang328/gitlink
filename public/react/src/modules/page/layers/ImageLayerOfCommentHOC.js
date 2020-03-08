import React, { Component } from 'react';
import ImageLayer from './ImageLayer'
import { isImageExtension } from 'educoder'
const $ = window.$;
export function ImageLayerOfCommentHOC(options = {}) {
	return function wrap(WrappedComponent) {
    return class Wrapper extends Component {
      constructor(props) {
        super(props);
        
        
        this.state = {
          showImage: false,
          imageSrc: ''
        }
      }

      onDelegateClick = (event) => {
        const imageSrc = event.target.src || event.target.getAttribute('src') || event.target.getAttribute('href')
        // 判断imageSrc是否是图片
        const fileName = event.target.innerHTML.trim()
        if (isImageExtension(imageSrc.trim()) || isImageExtension(fileName) || event.target.tagName == 'IMG') {
          // 非回复里的头像图片; 非emoticons
          if (imageSrc.indexOf('/images/avatars/User') === -1 && 
              imageSrc.indexOf('kindeditor/plugins/emoticons') === -1 ) {  
            this.setState({
              showImage: true,
              imageSrc,
            })
          }
          event.stopPropagation()
          event.preventDefault && event.preventDefault()
          event.originalEvent.preventDefault()
          // event.originalEvent.stopPropagation()
          // event.originalEvent.cancelBubble = true
          return false;
        }
      }

      // jQuery._data( $('.newMain')[0], "events" )
      componentDidMount() {	
        this.props.wrappedComponentRef && this.props.wrappedComponentRef(this.refs['wrappedComponentRef'])

        // commentsDelegateParent #game_left_contents #tab_con_4
        setTimeout(() => {
          $(options.parentSelector || ".commentsDelegateParent")
            .delegate(options.imgSelector || ".J_Comment_Reply .comment_content img, .J_Comment_Reply .childrenCommentsView img","click",  this.onDelegateClick);
        }, 1200)
      }

      componentWillUnmount() {
        $(options.parentSelector || ".commentsDelegateParent", 'click', this.onDelegateClick)
      }
      
      onImageLayerClose = () => {
        this.setState({
          showImage: false,
          imageSrc: '',
        })
      }

			MdifHasAnchorJustScorll=()=>{
				//mdhash滚动
				let anchor = decodeURI(this.props.location.hash).replace('#', '');
				// 对应id的话, 滚动到相应位置
				if (!!anchor) {
					let anchorElement = document.getElementsByName(anchor);
					if (anchorElement) {
						if (anchorElement.length!=0) {
							anchorElement[anchorElement.length-1].scrollIntoView();
						}
					}
				}
			}


      render() {
				this.MdifHasAnchorJustScorll();
        return (
          <React.Fragment>
            <ImageLayer {...this.state} onImageLayerClose={this.onImageLayerClose}></ImageLayer>

            <WrappedComponent {...this.props} ref="wrappedComponentRef">
            </WrappedComponent>
          </React.Fragment>
        )
      }
    }
	}
}