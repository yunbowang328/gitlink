import React, { Component } from 'react';
import {getImageUrl} from 'educoder';
import './CourseTag.css'

/**
  参考antd的api： https://ant.design/components/tag-cn/
  如果传入了非特定的color，前景色默认为白色

 *  */ 
class CourseTag extends Component{
  constructor(props) {
    super(props)
  }
  render(){
    const {  closable, onClose, visible, color } = this.props
    const hasColor = !!color
    return(
      <div className={`courseTag ${ hasColor ? 'course-tag-has-color' : ''} `} 
        style={{ display: visible == undefined || visible == true ? '' : 'none' }}
      >
        <span
          style={{ backgroundColor: color }}
        >{this.props.children}</span>
        { closable && <a href="javascript:void(0)" onClick={onClose}>x</a> }
      </div>
    )
  }
}
export default CourseTag;