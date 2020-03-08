import React,{ Component } from "react";
import { markdownToHTML } from 'educoder'
import './MarkdownToHtml.css'
/** 
  selector 需要传入唯一的selector作为id，不然会引起冲突
*/ 
class MarkdownToHtml extends Component{
  constructor(props){
    super(props);
    this.state={
    }
  }
  _markdownToHTML = (content, selector) => {    
    markdownToHTML(content, selector)    
  }
  componentDidUpdate = (prevProps) => {
    if (this.props.content) {
      if ( prevProps.content != this.props.content ) {
        this._markdownToHTML(this.props.content, `markdown_to_html_${this.props.selector || ''}`)
      }
    }
  }
  componentDidMount () {
    this.props.content && this._markdownToHTML(this.props.content, `markdown_to_html_${this.props.selector || ''}`)
    
  }
  render(){
    const { style, className } = this.props
    let _selector = `markdown_to_html_${this.props.selector || ''}`
    
    return(
      <div id={_selector } className={`markdownToHtml new_li markdown-body ${className} ${_selector}`}
        // dangerouslySetInnerHTML={{__html: markdownToHTML(this.props.content)}}
        style={style}
      >
      </div>
    )
  }
}
export default MarkdownToHtml;