import React,{ Component } from "react";
import TPMMDEditor from '../../../modules/tpm/challengesnew/TPMMDEditor'
import {markdownToHTML} from 'educoder'
import './DMDEditor.css'
// 需要父组件通过toShowMode、toMDMode 来控制，一次只能打开一个DMDEditor
class DMDEditor extends Component{
  constructor(props){
    super(props);
    this.mdRef = React.createRef()
    this.state={
        mdMode: false,
        // value: this.props.initValue
    }
  }
  componentDidUpdate(prevProps, prevState) {
    
  }
  componentDidMount() {
    // if(this.props.initValue != this.mdRef.current.getValue()) {
    //   this.mdRef.current.setValue(this.props.initValue)
    // }
  }
  
  
  toMDMode = () => {
    this.setState({mdMode: true}, () => {
        this.mdRef.current.resize()
        this.mdRef.current.setValue(this.props.initValue)
    })
    this.props.toMDMode(this)    
  }
  toShowMode = () => {
    this.setState({mdMode: false})
    this.props.toShowMode && this.props.toShowMode(this)
  }
  onCMBlur = () => {
      this.toShowMode()
  }
  onChange = (val) => {
    //   this.setState({ value: val })
    this.props.onChange(val)
    if (this.state.showError == true) {
      this.setState({showError: false})
    }
  }
  showError = () => {
    this.mdRef.current.showError()
    this.setState({showError: true})
  }
  render(){
    const { mdMode, showError } = this.state;
    const { initValue } = this.props;
    let _style = {}
    if (showError) {
        _style.border = '1px solid red'
    }
    _style = Object.assign(_style, {display: mdMode == true ? 'none' : '', color: initValue? '': '#999', alignItems: 'center',  wordBreak: 'break-all'})
    return(
      <React.Fragment>
        <style>{`
            
        `}</style>
        <div id="content_editorMd_show" className="new_li content_editorMd_show markdown-body"
                style={_style}
                dangerouslySetInnerHTML={{__html: initValue ? markdownToHTML(initValue):this.props.placeholder}}
                onClick={this.toMDMode}
        >

        </div>
        {/* 
          onCMBlur={this.onCMBlur} */}
        <TPMMDEditor
          ref={this.mdRef}
          {...this.props}
          initValue={initValue}
          className={`${this.props.className} ${mdMode == true ? '' : 'hideMd'}`}
          onChange={this.onChange}
        ></TPMMDEditor>
      </React.Fragment>
    )
  }
}
export default DMDEditor;