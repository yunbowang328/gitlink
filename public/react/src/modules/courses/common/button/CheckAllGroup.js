import React,{ Component } from "react";
import { WordsBtn } from "educoder";
import { Checkbox  } from 'antd'
const CheckboxGroup = Checkbox.Group;

class CheckAllGroup extends Component{
  constructor(props){
    super(props);
    this.state = {
      checkAll: true,
      checkedValues: []
    }
  }
  
  onCheckAll = () => {
    this.setState({
      'checkAll': true,
      checkedValues: []
    })
    this.props.onChange && this.props.onChange([], true);
  }
  onChange = (checkedValues) => {
    if (checkedValues.length > 0) {
      this.setState({
        'checkAll': false,
        checkedValues
      })
      this.props.onChange && this.props.onChange(checkedValues, false)
    } else {
      this.setState({
        'checkAll': true,
        checkedValues: []
      })
      this.props.onChange && this.props.onChange(checkedValues, true);
    }
    console.log(checkedValues, arguments)
  }

  render() {
    let { label, options, checkboxGroupStyle }=this.props;
    const { checkAll, checkedValues } = this.state;
    return (
      <li className="clearfix">
        <style>{`
        .groupList .ant-checkbox-group-item{
          margin-bottom:5px;
        }
        `}</style>
        <span className="fl mr10 color-grey-8">{label}</span>
        <span className="fl mr25">
          <a href="javascript:void(0);" id="comment_no_limit" className={`pl10 pr10 ${checkAll ? 'check_on' : ''}`} onClick={this.onCheckAll}>全部</a>
        </span>
        <div className="fl groupList" style={{maxWidth:"990px"}}>
          {
            options.length > 1 && <CheckboxGroup options={options} onChange={this.onChange} value={checkedValues} style={checkboxGroupStyle}/>
          }
        </div>
      </li>
    )
  }
}
export default CheckAllGroup;