import React,{ Component } from "react";
import {DatePicker,Select,Tooltip,Input} from "antd";
import { handleDateString } from 'educoder';

import '../css/members.css';
import '../css/busyWork.css';
import './pollStyle.css';

import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

const Search=Input.Search;
const Option=Select.Option;
const dataformat="YYYY-MM-DD HH:mm"

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}
function disabledDateTime() {
  return {
    disabledMinutes: () => range(1, 30).concat(range(31, 60)),
    // disabledSeconds: () => range(1,60)
  }
}

function disabledDate(current) {
	return current && current < moment().endOf('day').subtract(1, 'days');
}


class PollDetailTabForthRules extends Component{
  constructor(props){
    super(props);
    let list= [{
      course_group_id:[],
      course_group_name:[],
      publish_time:undefined,
      end_time:undefined,
      publish_flag:"",
      end_flag:"",
      class_flag:"",
      course_search:"",
      poll_status:0,
      p_timeflag:false,
      e_timeflag:false
    }]
    this.state={
      rules: this.props.rules && this.props.rules.length == 0 ? list : this.props.rules,
      course_group:this.props.course_group,
      selectedCourse:[],
      flagPageEdit:this.props.flagPageEdit
    }

  }
  componentDidUpdate(prevProps) {
    if (JSON.stringify(this.props.rules) != JSON.stringify(prevProps.rules) ) {
      this.setState({rules:this.props.rules});
      this.unitChoose(this.props.rules);
    }
    if(this.props.flagPageEdit != prevProps.flagPageEdit){
			this.setState({flagPageEdit: this.props.flagPageEdit})
    }
  }
  componentDidMount=()=>{
    this.unitChoose(this.props.rules);
  }
  // 添加发布规则
  AddRules=()=>{
    let {rules}=this.state;
    let newrules=rules;
    let list= {
      course_group_id:[],
      course_group_name:[],
      publish_time:undefined,
      end_time:undefined,
      publish_flag:"",
      end_flag:"",
      class_flag:"",
      course_search:"",
      poll_status:0,
      e_timeflag:false,
      p_timeflag:false
    }
    newrules.push(list)
    this.setState({
      rules:newrules
    })
    this.props.rulesCheckInfo && this.props.rulesCheckInfo(rules)
  }
  //删除发布规则
  removeRules=(index)=>{
    let { rules }=this.state;
    var lists= rules;
    let num=parseInt(index);
    lists.splice(num,1);
    this.setState({
      rules:lists
    })
    this.unitChoose(lists);
    this.props.rulesCheckInfo && this.props.rulesCheckInfo(lists)
  }

  //修改发布规则里面的结束时间
  changeRuleEndTime=(e,date,index)=>{
    let arr=Object.assign({}, this.state.rules[parseInt(index)]);

    arr.end_time=handleDateString(date);
    if(date!="" && date!=undefined && moment(date,dataformat)>moment() && moment(date,dataformat)>moment(arr.publish_time,dataformat)){
      arr.end_flag=""
    }
    let rules=this.state.rules;
    rules[index]=arr;
    this.setState({
      rules
    })
    this.props.rulesCheckInfo && this.props.rulesCheckInfo(rules)
  }
  //修改发布规则里面的发布时间
  changeRulePublishTime=(e,date,index)=>{
  	// debugger
    let arr=Object.assign({}, this.state.rules[parseInt(index)]);
    arr.publish_time=date=== ""?"":moment(handleDateString(date)).format("YYYY-MM-DD HH:mm");
    if(!arr.end_time){
      if(e!=null){
        arr.end_time = moment(moment(handleDateString(date)).add(1, 'months')).format("YYYY-MM-DD HH:mm")
      }
    }
    if(date!="" && date !=undefined && moment(date,dataformat)>moment()){
      arr.publish_flag=""
    }
    let rules=this.state.rules;
    rules[index]=arr;
    this.setState({
      rules
    })
    this.props.rulesCheckInfo && this.props.rulesCheckInfo(rules)
  }

  // changeOpen=(e,index)=>{
  //   let arr=Object.assign({}, this.state.rules[parseInt(index)]);
  //   arr.open= true;
  //   let rules=this.state.rules;
  //   rules[index]=arr;
  //   this.setState({
  //     rules
  //   })
  // }
  // changeClose=(e,index)=>{
  //   let arr=Object.assign({}, this.state.rules[parseInt(index)]);
  //   arr.open= false;
  //   let rules=this.state.rules;
  //   rules[index]=arr;
  //   this.setState({
  //     rules
  //   })
  // }

  // 选择分班
  changeClasses=(value,option,index)=>{
    let arr=Object.assign({}, this.state.rules[parseInt(index)]);
    arr.course_group_id=value;
    arr.class_flag="";
    let rules=this.state.rules;
    rules[index]=arr;
    //修改选择分班下拉选项（是否被选中）
    //let course_group = this.state.course_group;

    this.unitChoose(rules);


    this.setState({
      rules:rules,
      //course_group:course_group
    })
    this.props.rulesCheckInfo && this.props.rulesCheckInfo(rules)
  }

  //整合所有已经选择了的course_group_id
  unitChoose=(rules)=>{
    let arr = [];
    if(rules){
      rules.forEach(ele => {
        let Arraytype=Array.isArray(ele.course_group_id);
        if(Arraytype===true){
          ele.course_group_id.forEach(e=>{
            arr.push(e)
          })
        }else{
          arr.push(ele.course_group_id)
        }
      });
    }

		let course_group =this.state.course_group;
    course_group.forEach(ele=>{
        if(arr.indexOf(ele.course_group_id) != -1){
          ele.course_choosed = 1
        }else{
          ele.course_choosed = 0
        }

    })
    this.setState({
      course_group
    })
  }

  fouceThis=(e)=>{
    e.preventDefault();
  }
  // 输入搜索分班
  inputSearchCourse=(e,index)=>{
    this.inputSearch(e,index);
  }

  //搜索
  ActionSearchCourse=(e,index)=>{
    this.inputSearch(e,index);
  }

  inputSearch=(e,index)=>{
    let arr=Object.assign({}, this.state.rules[parseInt(index)]);
    arr.course_search=e.target.value;
    let rules=this.state.rules;
    rules[index]=arr;
    this.setState({
      rules
    })
  }

  notUnifiedSettingCheck=(rules) => {

    let flag,flag1,flag2 = true;
    let myRules = []
    if (rules.length == 0) {
      myRules = this.state.rules.slice(0);
    } else {
      myRules = rules;
    }
    for(var i=0;i<myRules.length;i++){
      let arr=Object.assign({}, myRules[parseInt(i)]);
      if(arr.poll_status < 2){
        if(arr.course_group_id===undefined || arr.course_group_id.length==0){
          arr.class_flag="请选择分班"
          flag1=false;
        }else{
          flag1=true;
        }
        if(arr.publish_time===undefined||arr.publish_time===null||arr.publish_time===""){
          arr.publish_flag="请选择发布时间"
          flag1=false;
        }
        else if(!arr.p_timeflag && moment(arr.publish_time,dataformat) <= moment()){
          arr.publish_flag="发布时间不能早于当前时间"
          flag1=false;
        }
        if(arr.end_time===undefined||arr.end_time===null||arr.end_time===""){
          arr.end_flag="请选择截止时间"
          flag1=false;
        }
        else if(!arr.e_timeflag && moment(arr.end_time,dataformat) <= moment()){
          if(this.props.type==="Shixun"){

          }else{
            arr.end_flag="截止时间不能早于当前时间"
            flag1=false;
          }

        }else if(!arr.e_timeflag && moment(arr.end_time,dataformat) <= moment(arr.publish_time,dataformat)){
          arr.end_flag="截止时间不能早于发布时间"
          flag1=false;
        }else{
          flag1=true;
        }
        myRules[i]=arr
      }
    }
    return {
      validate: flag1,
      rules: myRules
    };
  }


	exerciseSettingCheck=(rules) => {

		let flag,flag1,flag2 = true;
		let myRules = []
		if (rules.length == 0) {
			myRules = this.state.rules.slice(0);
		} else {
			myRules = rules;
		}
		for(var i=0;i<myRules.length;i++){
		let arr=Object.assign({}, this.state.rules[parseInt(i)]);
				if(arr.poll_status < 2){
						if(arr.course_group_id===undefined || arr.course_group_id.length===0){
								arr.class_flag="请选择分班"
								flag=false;
						}else{
								flag=true;
						}


						if(arr.publish_time==undefined||arr.publish_time===null||arr.publish_time===""){
								arr.publish_flag="请选择发布时间"
								flag1=false;
						}
						else if(moment(arr.publish_time,dataformat) <= moment()){
								arr.publish_flag="发布时间不能早于当前时间"
								flag1=false;
						}
						if(arr.end_time===undefined||arr.end_time===null||arr.end_time===""){
								arr.end_flag="请选择截止时间"
								flag2=false;
						}
						else if(moment(arr.end_time,dataformat) <= moment()){
              if(this.props.type==="Shixun"){

              }else{
                arr.end_flag="截止时间不能早于当前时间"
                flag2=false;
              }

						}else if(moment(arr.end_time,dataformat) <= moment(arr.publish_time,dataformat)){
								arr.end_flag="截止时间不能早于发布时间"
								flag2=false;
						}else{
								flag2=true;
						}
					myRules[i]=arr
				}
		}
		if(flag===false ||flag1===false ||flag2===false){
			return {
				validate: false,
				rules: myRules
			};
		}else{
			return {
				validate: true,
				rules: myRules
			};
		}



	}
  render(){
    let {rules,course_group,flagPageEdit}=this.state
		let isAdmin=this.props.isAdmin();
    console.log(flagPageEdit)
    return(
      <div className="bor-top-greyE pt20">
        <p className="clearfix mb10">
          <span className="fl with40 pr20">&nbsp;</span>
          <span className="fl pr20 color-grey-c with25">(学生收到{this.props.moduleName || (this.props.type==="Exercise"?"试卷":"问卷")}的时间)</span>
          <span className="fl color-grey-c">({this.props.moduleName == '作业' ? '学生“按时”提交作品的时间截点' : '学生可以答题的时间截点'})</span>
        </p>
        {/* item宽度超长 */}
        <style>{`
          .setInfo .ant-select-selection--multiple .ant-select-selection__choice__content {
            max-width:280px;
          }
        `}</style>

				{
          rules && rules.length > 0 && rules.map((rule,r)=>{
						const courseGroup = rule.course_search != "" ?
              course_group.filter( item => item.course_group_name.indexOf(rule.course_search) != -1)
              :course_group

            return(
            <div className="clearfix mb5" key={r}>
              {
                flagPageEdit===undefined?"":
                  flagPageEdit===true?
                    <style>
                      {
                        `
                                  .yskspickersy
                        .ant-input, .ant-input .ant-input-suffix{
                            background-color: #fff !important;
                        }
									     	`
                      }
                    </style>
                    :""
              }

              <div className="with40 fl pr20 df">
                <span className="font-16 pr20 fl mt8">发布规则{r+1}</span>
                <div className="flex1">
                  <style>
                    {
                      `.ant-select{
                            min-width:200px,
                      }
                      `
                    }
                  </style>
										<Select
											placeholder="请选择分班名称"
											className={rule.class_flag && rule.class_flag!=""?"noticeTip setInfo":"setInfo" }
											mode="multiple"
											filterOption={(input, option) =>
												option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
											}
											value={rule.course_group_id}
											onChange={(value,option)=>this.changeClasses(value,option,r)}
											disabled={this.props.isAdmin()===true?rule.p_timeflag===undefined?moment(rule.publish_time,dataformat) <= moment()?true:!flagPageEdit: rule.e_timeflag ===undefined?rule.publish_time===null?false:!flagPageEdit:rule.p_timeflag == true ? true : !flagPageEdit:true}
										>
										{
											courseGroup && courseGroup.length > 0 && courseGroup.map((team,t)=>{
												return(
													<Option value={team.course_group_id} key={t} style={{display:`${team.course_choosed==0 ? "" : "none"}`}}>{team.course_group_name}</Option>
												)
											})
										}
										</Select>
                  <p className="color-orange-tip lineh-25 clearfix" style={{height:"25px"}}>
                    {
                      rule.class_flag && rule.class_flag!=""?<span className="fl color-red">{rule.class_flag}</span>:""
                    }
                  </p>
                </div>
              </div>
              <div className="fl pr20 with25 yskspickersy">
                <Tooltip placement="bottom" title={
									rule.p_timeflag===undefined?moment(rule.publish_time,dataformat) <= moment()?isAdmin===true?"发布时间已过，不能再修改":"":"": rule.e_timeflag ===undefined?rule.publish_time===null?"":!flagPageEdit:rule.p_timeflag == true ? isAdmin===true?"发布时间已过，不能再修改":"" : ""
                }>
                  <span>
                    <DatePicker
                      showToday={false}
                      dropdownClassName="hideDisable"
                      placeholder="请选择发布时间"
                      locale={locale}
                      className={rule.publish_flag && rule.publish_flag!=""?"noticeTip winput-240-40":"winput-240-40"}
                      value={rule.publish_time && moment(rule.publish_time,dataformat)}
                      onChange={(e, date)=>this.changeRulePublishTime(e, date,r)}
                      showTime={{ format: 'HH:mm' }}
                      format="YYYY-MM-DD HH:mm"
                      disabledTime={disabledDateTime}
											disabledDate={disabledDate}
                      disabled={ this.props.isAdmin()===true?rule.p_timeflag===undefined?moment(rule.publish_time,dataformat) <= moment()?true:!flagPageEdit: rule.e_timeflag ===undefined?rule.publish_time===null?false:!flagPageEdit:rule.p_timeflag == true ? true : !flagPageEdit:true}
                      style={{"height":"42px",width:'100%'}}
                    ></DatePicker>
                  </span>
                </Tooltip>
                <p className="color-orange-tip lineh-25 clearfix" style={{height:"25px"}}>
                  {
                    rule.publish_flag && rule.publish_flag!=""?<span className="fl color-red  mt10">{rule.publish_flag}</span>:""
                  }
                </p>
              </div>
              <div className="fl mr20 yskspickersy">
                <Tooltip placement="bottom" title={rule.e_timeflag ? this.props.isAdmin()?"":"截止时间已过，不能再修改":""}>
                  <span>
                    <DatePicker
											showToday={false}
											dropdownClassName="hideDisable"
											placeholder="请选择截止时间"
											locale={locale}
											className={rule.end_flag && rule.end_flag !="" ? "noticeTip winput-240-40":"winput-240-40" }
											value={rule.end_time && moment(rule.end_time,dataformat)}
											onChange={(e, date)=>this.changeRuleEndTime(e, date,r)}
											showTime={{ format: 'HH:mm' }}
											format="YYYY-MM-DD HH:mm"
											disabledTime={disabledDateTime}
											disabledDate={disabledDate}
											disabled={
                        this.props.isAdmin()===true?this.props.type==="Shixun"?!flagPageEdit:
										    this.props.type==="Exercise"||this.props.type==="polls"?
											  rule.e_timeflag === undefined ? rule.publish_time === null ? false : moment(rule.end_time, dataformat) <= moment() ?this.props.isAdmin()?!flagPageEdit: true : !flagPageEdit : rule.e_timeflag == true ? this.props.isAdmin()?!flagPageEdit :true : !flagPageEdit:
                          rule.e_timeflag === undefined ? rule.publish_time === null ? false : moment(rule.end_time, dataformat) <= moment() ? true : !flagPageEdit : rule.e_timeflag == true ? true : !flagPageEdit:true
                      }
											style={{"height":"42px"}}
                    ></DatePicker>
                  </span>
                </Tooltip>
                <p className="color-orange-tip lineh-25 clearfix" style={{height:"25px"}}>
                  {
                    rule.end_flag && rule.end_flag!=""?<span className="fl color-red  mt10">{rule.end_flag}</span>:""
                  }
                </p>
              </div>
              {
                flagPageEdit ?this.props.isAdmin()?
                <li className="fl pt5">
                  {rule.p_timeflag===undefined?r > 0&&rule.publish_time===null?<Tooltip title="删除">
                      <a className="mr20" onClick={()=>this.removeRules(`${r}`)}><i className="iconfont icon-shanchu color-grey-9 font-18"></i></a>
                    </Tooltip>
                    :(
											this.props.Commonheadofthetestpaper?
												(this.props.Commonheadofthetestpaper.exercise_status===1&&r > 0?
													<Tooltip title="删除">
														<a className="mr20" onClick={()=>this.removeRules(`${r}`)}><i className="iconfont icon-shanchu color-grey-9 font-18"></i></a>
													</Tooltip>
													:"")
												:this.props.teacherdatapage?
												(
													this.props.teacherdatapage.homework_status[0]==="未发布"&&r > 0?
														<Tooltip title="删除">
															<a className="mr20" onClick={()=>this.removeRules(`${r}`)}><i className="iconfont icon-shanchu color-grey-9 font-18"></i></a>
														</Tooltip>
														:""
												):

												""
										):
										r > 0 && rule.p_timeflag == false ?
                    <Tooltip title="删除">
                      <a className="mr20" onClick={()=>this.removeRules(`${r}`)}><i className="iconfont icon-shanchu color-grey-9 font-18"></i></a>
                    </Tooltip>
                    :""
                  }
                  <Tooltip title="新增"><a className="mt6" onClick={this.AddRules}><i className="iconfont icon-tianjiafangda color-green font-18"></i></a> </Tooltip>
                </li>
                :"":""
              }

						</div>
            )
					})
        }
      </div>
    )
  }
}
export default PollDetailTabForthRules;
