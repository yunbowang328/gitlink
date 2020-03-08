import React, { Component } from 'react';

import { SnackbarHOC, getImageUrl, City, ConditionToolTip } from 'educoder';
import { Form, Button, Input, Radio, Select, Tooltip, Icon, AutoComplete  } from 'antd'
import ApplyForAddOrgModal from '../modal/ApplyForAddOrgModal'
import ApplyForAddChildOrgModal from '../modal/ApplyForAddChildOrgModal'
import AccountBasicEditItem from './AccountBasicEditItem';
import axios from 'axios'
import { identityMap } from './AccountBasic'
const RadioGroup = Radio.Group;
const Option = Select.Option;

const map = identityMap // {"teacher":"教师", "student":"学生", "professional":"专业人士"}
export function getHiddenName(name) {
  if (!name) return ''
  let len=parseInt(name.length)-1;
  let str="";
  for(var i = 0; i < len; i++){ str += "*"; }
  const newName = name.substr(0,1)+str;
  return newName
}
const MAX_NAME_LENGTH = 10
const MAX_NICKNAME_LENGTH = 20
class AccountBasic extends Component {
  constructor(props){
    super(props);
    this.state={
      nameLength:0,
      showRealName:true,
      schoolList:undefined,
      filterSchoolList:undefined,
      school:undefined,
      departments:undefined,
      filterDepartments:undefined,
      departmentsName:undefined,
      identity:"teacher",
      school_id:undefined,
      department_id:undefined
    }
  }

  componentDidUpdate =(prevProps)=>{
    if(this.props.basicInfo && (prevProps.basicInfo == undefined || prevProps.basicInfo.id != this.props.basicInfo.id)){
      this.setValue(this.props.basicInfo);
      this.getSchoolList(this.props.basicInfo);
    }
  }

  componentDidMount = () =>{
    if(this.props.basicInfo){
      this.setValue(this.props.basicInfo);
      this.getSchoolList(this.props.basicInfo);
    }
  }

  setValue=(basicInfo)=>{
    if(basicInfo){
      this.props.form.setFieldsValue({
        nickname:basicInfo.nickname,
        name:!basicInfo.show_realname ? this.hideRealName(basicInfo.name) : basicInfo.name,
        sex:String(basicInfo.gender),
        job:basicInfo.identity,
        org:basicInfo.school_name,
        org2:basicInfo.department_name,

        city:[basicInfo.location,basicInfo.location_city]
      })
      setTimeout(() => {
        // 等显示后再set
        this.props.form.setFieldsValue({
          student_No:basicInfo.student_id,
          job1:basicInfo && basicInfo.identity=="teacher" ? basicInfo.technical_title:"教授",
          job2:basicInfo && basicInfo.identity=="professional" ? basicInfo.technical_title:"企业管理者",
        })
      }, 100)
      //if(basicInfo.nickname){
        this.setState({
          forDisable: true,
          nameLength:basicInfo.nickname?basicInfo.nickname.length:0,
          showRealName:basicInfo.show_realname,
          realName: basicInfo.name,
          identity:basicInfo.identity,
          school_id:basicInfo.school_id,
          department_id:basicInfo.department_id
        })
      //}
    }
  }

  // 获取学校、单位
  getSchoolList=(basicInfo, selectedName)=>{
    let url=`/schools/for_option.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          schoolList:result.data.schools
        })
        if (selectedName) {
          let school_id
          result.data.schools.reverse().some( item => {
            if (item.name == selectedName) {
              school_id = item.id
              return true;
            }
          })
          this.props.form.setFieldsValue({
            org: selectedName
          })
          this.setState({
            school_id,
            school: selectedName
          }, () => {
            this.filterList(selectedName)
          })
        } else if(basicInfo && basicInfo.school_name){
          this.setState({
            school:basicInfo.school_name,
            filterSchoolList:this.state.schoolList.filter(function(item){
              return item.name.indexOf(basicInfo.school_name)>-1;
            })
          })
          this.getDepartments(basicInfo.school_name,false);
        }
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

  // 输入昵称时change剩余的字数
  changeNickName=(e)=>{
    let num= MAX_NICKNAME_LENGTH - parseInt(e.target.value.length);
    this.setState({
      nameLength:num < 0 ? 0 : num
    })
  }

  handleSubmit = () => {
    this.props.form.validateFieldsAndScroll({ force: true }, (err, values) => {
      console.log(values);
      let {basicInfo}=this.props;
      if(!err ){
        if (!this.state.school_id) {
          this.props.showNotification('请先选择学校/单位')
          return;
        }
        if (!this.state.department_id) {
          this.props.showNotification('请先选择院系/部门')
          return;
        }

        let url=`/users/accounts/${basicInfo.id}.json`
        axios.put((url),{
          nickname:values.nickname,
          // 认证中的不能修改
          name: basicInfo.authentication == 'uncertified' ?
              (this.state.showRealName ? values.name : this.state.realName ) : basicInfo.name,
          show_realname:this.state.showRealName,
          gender:parseInt(values.sex),
          location:values.city[0],
          location_city:values.city[1],
          identity: this.state.identity || (values.job=="teacher"?"teacher":values.job=="student"?"student":"professional"),
          technical_title:values.job1 || values.job2,
          student_id:values.job=="student" ? values.student_No : null,
          school_id:this.state.school_id,
          department_id:this.state.department_id
        }).then((result)=>{
          if(result){
            this.props.showNotification('保存成功')
            // 如果是第一次完善资料，重新拉头部接口更新
            if (!this.props.basicInfo.base_info_completed) {
              this.props.fetchUser()
            }
            this.props.getBasicInfo();
            this.props.history.push('/account/profile')

          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    })
  }

  // 隐藏或显示真实姓名
  showOrHide=(flag)=>{
    const name = this.props.form.getFieldsValue().name || this.props.basicInfo.name
    this.setState({
      showRealName:flag==true?false:true
    })
    if(flag==true){ // 隐藏真实姓名
      this.hideRealName(name);
    }else{  // 显示
      this.props.form.setFieldsValue({
        name: this.state.realName
      })
    }
  }

  // 将名字隐藏起来
  hideRealName=(name)=>{
    this.setState({ realName: name })
    const newName = getHiddenName(name)

    this.props.form.setFieldsValue({
      name: newName
    })
    return newName
  }

  // 过滤学校
  filterList =(e)=>{
    const inputVal = e.trim()
    let arr=[];
    if(inputVal){
      arr= this.state.schoolList.filter(function(item){
        return item.name.indexOf(inputVal)>-1;
      });
      this.props.form.setFieldsValue({
        org: inputVal
      })
      this.setState({
        school: inputVal,
        filterSchoolList: arr
      })
    } else {
      this.setState({
        school: '',
      })
    }
    // else{
    //   let {school}=this.state;
    //   arr= this.state.schoolList.filter(function(item){
    //     return item.name.indexOf(school)>-1;
    //   });
    // }
  }
  //搜索部门
  searchDepartment=(e)=>{
    if (e) {
      this.props.form.setFieldsValue({
        org2:e
      })
      let arr = this.state.departments && this.state.departments.filter ? this.state.departments.filter(function(item){
        return item.name.indexOf(e) > -1
      }) : []
      this.setState({
        filterDepartments:arr,
        departmentsName:e
      })
    } else {
      this.setState({
        filterDepartments: this.state.departments
      })
    }
  }

  // 选择部门、学院
  changeDepartment=(e)=>{
    let arr = this.state.departments && this.state.departments.filter ? this.state.departments.filter(function(item){
      return item.name == e;
    }) : [];
    if (!arr[0]) {
      this.setState({
        department_id: '',
        departmentsName: e,
        filterDepartments: [],
      })
      this.this_department_id = ''
      return;
    }
    this.this_department_id = arr[0].id
    this.setState({
      departmentsName:e,
      department_id: arr[0].id,
    })
  }

  // 选择学校(获取对应学校的学院、部门)
  changeList=(e)=>{
    this.getDepartments(e.trim(),true);
  }

  getDepartments=(e,flag)=>{
    let arr=this.state.schoolList.filter(function(item){
      if(item.name.indexOf(e) > -1){
        return item.name;
      }
    });
    if (!arr[0]) {
      if (!e) {
        this.setState({
          filterSchoolList: []
        })
      }
      // 没找到学校，清空部门
      this.setState({
        departments: [],
        filterDepartments: [],
        departmentsName: '',
        school_id: '',
        department_id: '',
      })
      this.this_school_id = ''
      this.props.form.setFieldsValue({
        org2: ''
      })
      return;
    }
    this.props.form.setFieldsValue({
      org: arr[0].name
    })
    this.filterList(e)
    // 保存选择的学校id
    this.this_school_id = arr[0].id
    this.setState({
      school_id: arr[0].id,
      school:e,
    })
    this._getDepartments(arr[0].id, flag)
  }
  _getDepartments = (schoolId, flag, selectedName) => {
    let url=`/schools/${schoolId || this.state.school_id}/departments/for_option.json`;
    axios.get(url).then((result)=>{
      if(result){
        this.setState({
          departments:result.data.departments,
          filterDepartments:result.data.departments
        })
        if (selectedName) {
          let department_id
          result.data.departments.reverse().some( item => {
            if (item.name == selectedName) {
              department_id = item.id
              return true;
            }
          })
          this.props.form.setFieldsValue({
            org2: selectedName
          })
          this.setState({
            department_id,
            // school: selectedName
          })
        } else if(result.data.departments && result.data.departments.length>0 && flag==true){
           // 切换学校后，部门默认选择第一个
          this.props.form.setFieldsValue({
            org2:result.data.departments[0].name
          })
          this.setState({
            department_id: result.data.departments[0].id
          })
        }
      }
    }).catch((error)=>{
      console.log(error);
    })
  }



  addOrgSuccess = (name) => {
    // const schoolList = this.state.schoolList.slice(0)
    // schoolList.push({ id: schoolList.length + 2000, name: name})
    // this.setState({ schoolList })

    this.getSchoolList(this.props.basicInfo, name);
    this.props.form.setFieldsValue({
        org: name
    })
  }

  addChildOrgSuccess = (deptName) => {

    this._getDepartments(this.state.school_id, false, deptName);

  }

  showApplyForAddOrgModal = () => {
    this.applyForAddOrgForm.setVisible(true)
  }
  showApplyForAddChildOrgModal = () => {
    let{school,schoolList}=this.state;
    let arr=schoolList.filter(function(item){
      return item.name == school;
    });
    if(arr.length > 0){
      this.applyForAddChildOrgForm.setVisible(true)
    }else{
      this.props.showNotification("请先选择正确的单位或者学校！");
    }
  }
  // checkNameLength = (rule, value, callback) => {
  //   if (value && value.length <= MAX_NAME_LENGTH) {
  //     callback();
  //     return;
  //   }
  //   callback(`请输入真实姓名，最大限制${MAX_NAME_LENGTH}个字符`);
  // }
  // 切换职称
  changeJob=(e)=>{
    this.setState({
      identity:e
    })
    let {basicInfo}=this.props;
    if(basicInfo){
      this.props.form.setFieldsValue({
        job1:basicInfo && basicInfo.identity=="teacher" ? basicInfo.technical_title:"教授",
        job2:basicInfo && basicInfo.identity=="professional" ? basicInfo.technical_title:"企业管理者",
      })
    }
  }
  //昵称
	handleSubmitName(rule, value, callback){
		if (value) {
			let iconRule1 = /[`~!@#$%^&*()\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
// 判断是否含有emoji表情
			let iconRule2 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
// 如果为true，字符串含有emoji表情 ，false不含
			const iconRule2s =iconRule2.test(value);
// 如果为true，字符串含有特殊符号 ，false不
			const iconRule1s =iconRule1.test(value);

			if (iconRule2s===true|| iconRule1s===true) {
				callback('2-20位中英文、数字及下划线');
			}
			else if(value.length<2){
				callback('2-20位中英文、数字及下划线');
			}else if(value.length>=21){
				callback('2-20位中英文、数字及下划线');
			}
		}
		callback();
	}

	// 姓名
	handleSubmitNames(rule, value, callback){
		if (value) {
				let iconRule1 = /[`~!@#$%^&()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
// 判断是否含有emoji表情
				let iconRule2 = /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/ig;
// 如果为true，字符串含有emoji表情 ，false不含
				const iconRule2s =iconRule2.test(value);
// 如果为true，字符串含有特殊符号 ，false不
				const iconRule1s =iconRule1.test(value);

				if (iconRule2s===true|| iconRule1s===true) {
					callback('2-10位中英文、数字');
				}
				else if(value.length<2){
					callback('2-10位中英文、数字');
				}else if(value.length>=11){
					callback('2-10位中英文、数字');
				}
		}
		callback();
	}
  render() {
    let{
      nameLength,
      showRealName,
      filterSchoolList,
      filterDepartments,
      school,
      school_id,
      departments,
      departmentsName,
      identity
    }=this.state;
    const { getFieldDecorator } = this.props.form;
    let{ basicInfo }=this.props
    let common = {
      changeJob:this.changeJob,
      filterList:this.filterList,
      changeList:this.changeList,
      searchDepartment:this.searchDepartment,
      changeDepartment:this.changeDepartment,
      showApplyForAddOrgModal:this.showApplyForAddOrgModal,
      showApplyForAddChildOrgModal:this.showApplyForAddChildOrgModal
    }
    // 已职业认证的账户不能修改职业，学校/单位，院系/部门（true为disable）
    const professionalFlag = basicInfo && basicInfo.professional_certification == "certified" ;

    // form合并了
    const propsWithoutForm = Object.assign({}, this.props)
    delete propsWithoutForm.form
    return (
      <div>
        <ApplyForAddOrgModal ref="applyForAddOrgModal" wrappedComponentRef={(form) => this.applyForAddOrgForm = form}  schoolName={school}
        {...propsWithoutForm} addOrgSuccess={this.addOrgSuccess}
        ></ApplyForAddOrgModal>
        <ApplyForAddChildOrgModal ref="applyForAddChildOrgModal" schoolName={school} schoolId={school_id} departmentName={departmentsName}
        {...propsWithoutForm} wrappedComponentRef={(form) => this.applyForAddChildOrgForm = form}
        addChildOrgSuccess={this.addChildOrgSuccess}
        ></ApplyForAddChildOrgModal>

        <div className="basicForm courseNormalForm">
          <style>{`
            .formItemInline {    
              display: flex;
              margin-bottom: 10px;
              position:relative;
            }
            .formItemInline .ant-form-explain{
              /* position:absolute;*/
              bottom:-20px;
              left:0px;
              width:100%;
            }
            .formItemInline .ant-form-item-control-wrapper {
              display: inline-block;
            }
            .resetSexStyle .ant-form-item-label,.resetSexStyle .ant-form-item-control-wrapper .ant-form-item-control{
              height:25px;
              line-height:25px;
            }
            .basicForm .title {
              font-size: 16px;
              padding-left: 30px;
              margin-bottom: 10px;
            }
            .basicForm input, .basicForm .ant-input-affix-wrapper, .basicForm .ant-select {
              width: 400px;
              font-size: 14px;
            }
            .basicForm .saveBtn {
              width: 100px;
              margin-left: 100px;
            }
            .basicForm .cancelBtn {
              margin-left: 0px;
            }

            .basicForm .ant-form-item-label {
              width: 100px;
              padding-right: 10px;
            }
            .basicForm .ant-form-item-label label {
              color: #979797
            }
            .basicForm .ant-cascader-picker-label{
              font-size:14px;
            }
            .resetCityStyle .ant-form-item-control{
              width:220px;
            }
            .basicForm .ant-input-suffix {
              line-height: 2.8;
              background: transparent !important;
            }
          `}</style>
          <div className="title">基本信息</div>
          <style>
            {
              `
                .exercicenewinputysl .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
                
                `
            }
          </style>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item
              label="昵称"
              className="mt15 formItemInline"
            >
              {getFieldDecorator('nickname', {
                rules: [{
                  // initialValue: this.state.cityDefaultValue,
                  required: true,
                  message: '请输入您的昵称',
                },
									{ validator: this.handleSubmitName },
                ],
								validateTrigger: 'onSubmit', // 设置进行表单验证的时机为onSubmit
              })(
                <Input placeholder={`请输入您的昵称，最大限制${MAX_NICKNAME_LENGTH}个字符`} className="exercicenewinputysl" onInput={this.changeNickName} maxLength={MAX_NICKNAME_LENGTH} addonAfter ={
                  <span className="color-grey-6 font-13">{String(nameLength)}/{MAX_NICKNAME_LENGTH}</span>
                }></Input>
              )}
            </Form.Item>
            <style>
              {
                `
                .yslgraduainputedit .ant-input{
																		border-right: none !important;
																		height: 40px !important;
																		}
                
                `
              }
            </style>
            <Form.Item
              label="姓名"
              className="formItemInline"
            >
              { basicInfo.authentication == 'uncertified' ? <React.Fragment>{getFieldDecorator('name', {
                  rules: [{
                    // initialValue: this.state.cityDefaultValue,
                    required: true,
                    message: `请输入真实姓名，最大限制${MAX_NAME_LENGTH}个字符`,
                  },
										{ validator: this.handleSubmitNames },

                  ],
									validateTrigger: 'onSubmit', // 设置进行表单验证的时机为onSubmit
								})(
                  <Input placeholder={`请输入真实姓名，最大限制${MAX_NAME_LENGTH}个字符`} className="yslgraduainputedit"  disabled={!showRealName && this.state.forDisable == true } addonAfter={
                    <i className={showRealName?"iconfont icon-xianshi font-18 color-blue":"iconfont icon-yincang font-18 color-blue"}
                          onClick={()=>this.showOrHide(showRealName)}></i>
                  }></Input>
                )}
                <span>{ showRealName ? '（显示：平台将显示您的真实姓名）' : '（隐藏：平台将显示你的昵称）' }</span>
                </React.Fragment> :
                <div className="df" style={{}}>
                  <Tooltip title="已完成实名认证，不能修改">
                    <span className="mr8" >{showRealName ? this.props.basicInfo.name : getHiddenName(this.props.basicInfo.name)}</span>
                  </Tooltip>
                  <i className={showRealName?"iconfont icon-xianshi font-18 color-blue":"iconfont icon-yincang font-18 color-blue"}
                       onClick={()=>this.showOrHide(showRealName)}></i>
                  <span>{ showRealName ? '（显示：平台将显示您的真实姓名）' : '（隐藏：平台将显示你的昵称）' }</span>
                </div>
              }
            </Form.Item>

            <Form.Item
              label="性别"
              className="formItemInline resetSexStyle"
            >
              {getFieldDecorator('sex', {
                rules: [{
                  required: true,
                  message: '请选择性别',
                }],
              })(
                <RadioGroup>
                  <ConditionToolTip title="已完成实名认证，不能修改" condition={basicInfo.authentication != 'uncertified'} >
                    <Radio value="0" disabled={basicInfo.authentication != 'uncertified'}>男</Radio>
                    <Radio value="1" disabled={basicInfo.authentication != 'uncertified'}>女</Radio>
                  </ConditionToolTip>
                </RadioGroup>
              )}
            </Form.Item>


            <Form.Item
              label="所在地"
              className="formItemInline resetCityStyle"
            >
              {getFieldDecorator('city', {
                rules: [{
                  type: 'array',
                  required: true,
                  message: '请先选择所在地',
                }],
              })(
                <City></City>
              )}
            </Form.Item>
            <AccountBasicEditItem
                identity={identity}
                getFieldDecorator = {getFieldDecorator}
                professionalFlag = {professionalFlag}
                basicInfo = {basicInfo}
                {...this.props}
                {...this.state}
                {...common}
                form={this.props.form}
                filterSchoolList={filterSchoolList}
                filterDepartments={filterDepartments}
                departmentsName={departmentsName}
                school={school}
                department_id={this.state.department_id}
                departments={departments}
              ></AccountBasicEditItem>
                {/* htmlType="submit"  */}
            {/* <Form.Item>
              <div className="clearfix mt30 mb30"> */}
                <Button type="primary" onClick={this.handleSubmit} size="middle" className="saveBtn mr20 mt30">{"保存"}</Button>

                {this.props.basicInfo.base_info_completed &&
                  <Button type="" onClick={() => { this.props.history.push('/account/profile') }} size="middle" className="saveBtn cancelBtn mr20 mt30">{"取消"}</Button>}
              {/* </div>
            </Form.Item> */}
          </Form>
          </div>
          <div style={{color: '#989898', marginLeft: '20px', marginBottom: '10px'}}>* 我们确保你所提供的信息均处于严格保密状态，不会泄露</div>
      </div>
    );
  }
}
const WrappedAccountBasic = Form.create({ name: 'AccountBasic' })(AccountBasic);

export default WrappedAccountBasic;
