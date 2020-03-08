import React, {Component} from 'react';

//MonacoDiffEditor  对比模式
import {
  Badge,
  Select,
  Radio,
  Checkbox,
  Modal,
  DatePicker,
  Button,
} from 'antd';

import locale from 'antd/lib/date-picker/locale/zh_CN';

import moment from 'moment';

import axios from 'axios';

import './css/TPMsettings.css';

import {handleDateStrings} from "./oldTPMsettings";

import Bottomsubmit from "../../modals/Bottomsubmit";

const $ = window.$;

let timeout;

let currentValue;

const Option = Select.Option;

const RadioGroup = Radio.Group;

function range(start, end) {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
}

function disabledDateTime() {
  return {
    // disabledHours: () => range(0, 24).splice(4, 20),
    disabledMinutes: () => range(1, 30).concat(range(31, 60)),
    // disabledSeconds: () => [0, 60],
  };
}

function disabledDate(current) {
  return current && current < moment().endOf('day').subtract(1, 'days');
}


export default class Shixuninformation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      can_copy: false,
      use_scope: 0,
      opening_time: null,
      opentime: false,
      oldscope_partment: [],
      scope_partment: [],
      loading: false,
      opening_timetype:false,
      use_scope_type:false,
      scope_partmenttype:false
    }
  }

  componentDidMount() {
    if (this.props.data) {
      if (this.props.data.shixun) {
        let time =this.props.data && this.props.data.shixun.opening_time;
        let timetype=false;
        if(!time){
          timetype=false;
        }else{
          timetype=true;
        }
        this.setState({
          use_scope_type:this.props&&this.props.status>1&& this.props.data && this.props.data.shixun.use_scope===0&&this.props&&this.props.identity>2||this.props&&this.props.public===2&& this.props.data && this.props.data.shixun.use_scope===0&&this.props&&this.props.identity>2?true:false,
          can_copy: this.props.data && this.props.data.shixun.can_copy === undefined ? false : this.props.data && this.props.data.shixun.can_copy,
          use_scope: this.props.data && this.props.data.shixun.use_scope,
          opening_time: this.props.data && this.props.data.shixun.opening_time,
          opentime: timetype,
          oldscope_partment: this.props.data && this.props.data.shixun.scope_partment,
        })
      }
    }
    let departmentsUrl = `/shixuns/departments.json`;
    axios.get(departmentsUrl).then((response) => {
      if (response.status === 200) {
        if (response.data.message === undefined) {
          this.setState({
            departmentslist: response.data.shools_name
          });
        }
      }
    }).catch((error) => {
      console.log(error)
    });
  }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps.data != this.props.data) {
      if (this.props.data) {
        if (this.props.data.shixun) {
          let time =this.props.data && this.props.data.shixun.opening_time;
          let timetype=false;
          if(!time){
            timetype=false;
          }else{
            timetype=true;
          }
          this.setState({
            use_scope_type:this.props&&this.props.status>1&& this.props.data && this.props.data.shixun.use_scope===0&&this.props&&this.props.identity>2||this.props&&this.props.public===2&& this.props.data && this.props.data.shixun.use_scope===0&&this.props&&this.props.identity>2?true:false,
            can_copy: this.props.data && this.props.data.shixun.can_copy === undefined ? false : this.props.data && this.props.data.shixun.can_copy,
            use_scope: this.props.data && this.props.data.shixun.use_scope,
            opening_time: this.props.data && this.props.data.shixun.opening_time,
            opentime: timetype,
            oldscope_partment: this.props.data && this.props.data.shixun.scope_partment,
          })
        }
      }
    }
  }

  onChangeTimePicker = (value, dateString) => {
    this.setState({
      opening_time: dateString === "" ? "" : handleDateStrings(dateString),
      opening_timetype:false,
      loading: false
    })
  }

  onSubmits = () => {
    let {can_copy, use_scope, scope_partment, opening_time,oldscope_partment} = this.state;

    if(this.state.opentime===true){
      if(opening_time===null){
        this.setState({
          opening_timetype:true
        })

        return
      }
    }

    if(use_scope===1){
      if(oldscope_partment.length===0&&scope_partment.length===0){
        this.setState({
          scope_partmenttype:true
        })
        this.props.showNotification("请选择指定单位公开")
        return
      }
    }

    let list=[]
    scope_partment.map((item,key)=>{
      list.push(item)
    })

    oldscope_partment.map((item,key)=>{
      list.push(item)
    })

    let id = this.props.match.params.shixunId;
    let url = `/shixuns/${id}/update_permission_setting.json`;

    axios.post(url,
      {
        scope_partment:use_scope===0?undefined:list,
        shixun: {
          can_copy: can_copy,
          use_scope: use_scope,
          opening_time: opening_time
        }
      }
    ).then((response) => {
      if (response.data.status === -1) {

      } else {
        this.props.showNotification("权限配置保存成功!")
        this.setState({
          loading: false,
          scope_partment:[],
          oldscope_partment:list
        })
        this.props.getdatas("3")
      }
    }).catch((error) => {


    })

  }
  CheckboxonChange = (e) => {
    this.setState({
      can_copy: e.target.checked
    })
  }

  SelectOpenpublic = (e) => {
    this.setState({
      use_scope: e.target.value,
    });
  }

  shixunScopeInput = (e) => {
    let {scope_partment, oldscope_partment} = this.state;
    let datalist = scope_partment;
    if (datalist === undefined) {
      datalist = []
    }

    let scopetype = false;

    if(scope_partment.length>0){
      scope_partment.map((item, key) => {
        if (item === e) {
          scopetype = true
        }
      })
    }

    if(oldscope_partment.length>0){
      oldscope_partment.map((item, key) => {
        if (item === e) {
          scopetype = true
        }
      })
    }



    if (scopetype === false) {
      datalist.push(e)
      this.setState({
        scope_partment: datalist,
        scope_partmenttype:false
      });
    } else {
      this.props.showNotification("请勿指定相同的单位")
    }

  }

  shixunsfetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    function fake() {
      let departmentsUrl = `/shixuns/departments.json?q=` + currentValue;
      axios.get(departmentsUrl).then((response) => {
        callback(response.data.shools_name);
      }).catch((error) => {
        console.log(error)
      });
    }

    timeout = setTimeout(fake, 300);
  }

  shixunHandleSearch = (value) => {
    this.shixunsfetch(value, departmentslist => this.setState({departmentslist}));
  }

  deleteScopeInput = (key) => {
    let {scope_partment} = this.state;
    let datalist = scope_partment;
    datalist.splice(key, 1);
    this.setState({
      scope_partment: datalist
    });
  }

  setopentime = (e) => {
    if(e.target.checked===false){
      this.setState({
        opening_time:null
      })
    }
    this.setState({
      opentime: e.target.checked
    })

  }

  render() {

    let options;
    if (this.state.departmentslist != undefined) {
      options = this.state.departmentslist.map((d, k) => {
        return (
          <Option key={d} id={k}>{d}</Option>
        )
      })
    }

    const dateFormat = 'YYYY-MM-DD HH:mm';

    // console.log()

    return (
      <div>
        <div className="educontent mb200 edu-back-white padding10-20 pdb30 mb50">
          {this.props&&this.props.is_jupyter===true?"":<div className="clearfix ml40">
            <span className="color-grey-6 mt5 fl font-16 ml20" style={{minWidth: '45px'}}>复制:</span>
            <span className="fl mt8 ml13">
              <Checkbox
                checked={this.state.can_copy}
                onChange={this.CheckboxonChange}></Checkbox>
              <label style={{top: '6px'}} className="color-grey-9 ml10">（选中则允许已职业认证的教师复制该实训）</label>
            </span>
          </div>}

        <div className="edu-back-white mb10 ml30 mt20">
          {this.props&&this.props.status>1&&this.state.use_scope===0&&this.props&&this.props.identity>2&&this.state.use_scope_type===true||this.props&&this.props.public===2&&this.state.use_scope===0&&this.props&&this.props.identity>2&&this.state.use_scope_type===true?"":<div>
                <span className="color-grey-6 mt5 fl font-16" style={{minWidth: '45px'}}>公开程度:</span>
                <span className="fl mt8 ml20">
            <RadioGroup onChange={this.SelectOpenpublic} value={this.state.use_scope}>
              <Radio className="radioStyle" value={0}><span>对所有单位公开</span> <span
                className="color-grey-9">（实训发布后，所有用户可见）</span></Radio>
              <Radio className="radioStyle" value={1}><span>对指定单位公开</span> <span
                className="color-grey-9">（实训发布后，仅对下方指定单位的用户可见）</span></Radio>
            </RadioGroup>

            <div className="clearfix" id="unit-all"
                 style={{display: this.state.use_scope === 0 ? 'none' : 'block'}}>
              <div className="fl ml25">
                <div className="fl" id="unit-input-part" style={{width: '100%'}}>
                  <div id="person-unit" className="fl pr mr10">
                    <div className="shixunScopeInput fl">
                      <Select
                        style={{width: '200px'}}
                        placeholder="请输入并选择单位名称"
                        onChange={(value) => this.shixunScopeInput(value)}
                        onSearch={this.shixunHandleSearch}
                        showSearch
                        value={this.state.scope_partment}
                        defaultActiveFirstOption={false}
                        showArrow={false}
                        filterOption={false}
                        notFoundContent={null}
                        className={this.props.scope_partmenttype === true ? "bor-red" : ""}
                      >
                        {options}
                      </Select>
                    </div>
                    <span className="color-grey-9 openrenyuan">（请通过搜索并选中单位名称进行添加）</span>
                  </div>
                </div>

                <div style={{width: '100%'}}>
                  <div className="mt20 clearfix" id="task_tag_content">
                    {
                      this.state.oldscope_partment.map((item, key) => {
                        return (
                          <li key={key} className={"fl mr20"}>
                            <Button type="primary" ghost className={"Permanentban "}>
                              {item}
                            </Button>
                          </li>
                        )
                      })
                    }
                    {
                      this.state.scope_partment === undefined ? "" : this.state.scope_partment.map((item, key) => {

                        return (
                          <li key={key} className={"fl mr20"}>
                            <Badge count={"x"} onClick={(key) => this.deleteScopeInput(key)}>
                              <Button type="primary" ghost className={"Permanentban "}>
                                {item}
                              </Button>
                            </Badge>
                          </li>
                        )
                      })
                    }
                  </div>

                </div>

                  <span
                    className={this.props.scope_partmenttype === true ? "color-orange ml20 fl" : "color-orange ml20 fl none"}
                    id="public_unit_notice">
                            <i className="fa fa-exclamation-circle mr3"></i>
                        请选择需要公开的单位
                 </span>
                </div>
              </div>


            </span>
              </div>}

            <div className="clearfix mt20">
              <span className="color-grey-6 mt5 fl font-16" style={{minWidth: '45px'}}>开启时间:</span>
              <span className="fl mt8 ml20">
                <Checkbox
                  checked={this.state.opentime === undefined ? false : this.state.opentime}
                  onChange={this.setopentime}></Checkbox>
                <label style={{top: '6px'}}
                       className="color-grey-9 ml10">（选中则学员在指定的开启时间后，才能开启学习；不选中则学员在实训发布后，能立即开启学习）</label>
               <div className={"both"}></div>
                {this.state.opentime === false ? "" : <div className="mt20 ml25">
                  <DatePicker
                    className={this.state.opening_timetype===true?"bor-red":""}
                    showToday={false}
                    showTime={{format: 'HH:mm'}}
                    format="YYYY-MM-DD HH:mm"
                    width={178}
                    locale={locale}
                    disabledTime={disabledDateTime}
                    disabledDate={disabledDate}
                    placeholder="请输入开启时间"
                    value={this.state.opening_time === null || this.state.opening_time === "" ? "" : moment(this.state.opening_time, dateFormat)}
                    onChange={this.onChangeTimePicker}
                    dropdownClassName="hideDisable"
                  />
                </div>}
                <div className={this.state.opening_timetype===true?"color-red mt10 ml20":"none"}>请选择开启时间</div>
              </span>

            </div>


          </div>
        </div>
        {this.props.identity < 5 ?
          <Bottomsubmit {...this.props} {...this.state} url={`/shixuns/${this.props.match.params.shixunId}/challenges`}
                        onSubmits={this.onSubmits} loadings={this.state.loading}
                        // bottomvalue={ this.props.shixunsDetails&&this.props.shixunsDetails.is_jupyter === true?"确 定":"下一步"}
          /> : ""}
      </div>
    );
  }
}


