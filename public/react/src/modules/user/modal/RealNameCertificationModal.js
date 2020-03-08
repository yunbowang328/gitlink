import React, { Component } from "react";
import { message, Icon, Input, Form, Upload,Radio ,Tooltip} from "antd";
import axios from 'axios'
import ModalWrapper from "../../courses/common/ModalWrapper"
import { getUploadActionUrl, ImageLayer2 ,ConditionToolTip } from 'educoder'
import '../account/common.css'
import AccountBasicEditItem from '../account/AccountBasicEditItem'
import ApplyForAddOrgModal from './ApplyForAddOrgModal'
import ApplyForAddChildOrgModal from './ApplyForAddChildOrgModal'

import authImg from '../../../images/account/auth.png'
import jobImg from '../../../images/account/job.png'

const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;
const MAX_NAME_LENGTH = 10
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}
export function getHiddenName(name) {
  if (!name) return ''
  let len=parseInt(name.length)-1;
  let str="";
  for(var i = 0; i < len; i++){ str += "*"; }
  const newName = name.substr(0,1)+str;
  return newName
}
class RealNameCertificationModal extends Component{
  constructor(props){
    super(props);
    this.state={
      identity:"teacher",
      departmentsName:undefined,
      fileID:undefined,
      filterSchoolList:undefined,
      filterDepartments :undefined,
      school:undefined,
      school_id:undefined,
      department_id:undefined,
      schoolList:undefined,
      departments:undefined,
      showRealName:true,
      realName:undefined,
      imageUrl2:undefined
    }
  }

// 弹框出现（visible==true）时给formitem赋值
  setVisible = (visible) => {
    this.refs.modalWrapper.setVisible(visible);
    this.setState({
      imageUrl2:undefined
    })
    if(visible && this.props.basicInfo){
      this.setValue(this.props.basicInfo);
      this.getSchoolList(this.props.basicInfo);
    }
  }


  setValue=(basicInfo)=>{
    // debugger;
    if(basicInfo){
      this.props.form.setFieldsValue({
        nickname:basicInfo.nickname,
        name:!basicInfo.show_realname ? this.hideRealName(basicInfo.name) : basicInfo.name,
        job:basicInfo.identity,
        org:basicInfo.school_name
      })
      setTimeout(() => {
        // 等显示后再set
        this.props.form.setFieldsValue({
          job:basicInfo.identity,
          sex:String(basicInfo.gender),
          student_No:basicInfo.student_id,
          org2:basicInfo.department_name,
          job1:basicInfo && basicInfo.identity=="teacher" ? basicInfo.technical_title:"教授",
          job2:basicInfo && basicInfo.identity=="professional" ? basicInfo.technical_title:"企业管理者",
        })
      }, 100)
      this.setState({
        forDisable: true,
        nameLength:basicInfo.nickname?basicInfo.nickname.length:0,
        showRealName:basicInfo.show_realname,
        realName: basicInfo.name,
        identity:basicInfo.identity,
        school_id:basicInfo.school_id,
        department_id:basicInfo.department_id
      })
    }
  }

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
        }else if(result.data.departments && result.data.departments.length == 0 && flag==true){
          this.props.form.setFieldsValue({
            org2:''
          })
        }
      }
    }).catch((error)=>{
      console.log(error);
    })
  }

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

  onSendOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log(values);
      console.log(this.state.showRealName ? values.name : this.state.realName);
      // return;
      if(!err){
        let{ imageUrl2 , showRealName , realName }=this.state;
        let{ current_user , basicInfo }=this.props;
        if(imageUrl2){
          let { certification } = this.props;
          if(certification == 1){
            // 实名认证
            let url="";
            if( basicInfo===undefined){
              url = `/users/accounts/${current_user && current_user.login}/authentication_apply.json`;

            }else {
              url = `/users/accounts/${basicInfo && basicInfo.id}/authentication_apply.json`;
            }

            axios.post((url),{
              name:this.state.showRealName ? values.name : realName,
              gender:parseInt(values.sex),
              id_number:values.credentials,
              show_realname:showRealName,
              attachment_ids:[this.state.fileID]
            }).then((result)=>{
              if(result){
                this.props.showNotification("申请已提交，请等待审核!");
                try {
                  this.props.getBasicInfo();
                } catch (e) {
                }
                try {
                  this.props.Getdata(this.props.userdata.id);
                } catch (e) {

                }
                this.setVisible(false);
              }
            }).catch((error)=>{
              console.log(error);
            })
          }else{
            // 职业认证
            // console.log(values.job == "student" ? values.student_No : values.job == "teacher" ? values.job1 : values.job2);
            let url="";
            if( basicInfo===undefined){
              url = `/users/accounts/${current_user && current_user.login}/professional_auth_apply.json`;
            }else {
              url = `/users/accounts/${basicInfo && basicInfo.id}/professional_auth_apply.json`;

            }
            axios.post((url),{
              school_id:this.state.school_id,
              department_id:this.state.department_id,
              identity:this.state.identity,
              extra: values.job == "student" ? values.student_No : values.job == "teacher" ? values.job1 : values.job2,
              attachment_ids:[this.state.fileID]
            }).then((result)=>{
              if(result){
                this.props.showNotification("申请已提交，请等待审核!");
                try {
                  this.props.getBasicInfo();
                } catch (e) {

                }
                try {
                  this.props.Getdata(this.props.userdata.id);
                } catch (e) {

                }
                this.setVisible(false);

              }
            }).catch((error)=>{
              console.log(error);
            })
          }
        }else{
          this.props.showNotification("请先上传照片！");
        }
      }
    })
  }

  onOk = () => {
    const { course_lists, checkBoxValues } = this.state
    this.onSendOk()
  }

  handleChange2 = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log(info.file.response);
      getBase64(info.file.originFileObj, imageUrl2 => this.setState({
        imageUrl2,
        loading: false,
        fileID:info.file.response && info.file.response.id
      }));
    }
  }
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
  // 选择学校(获取对应学校的学院、部门)
  changeList=(e)=>{
    this.getDepartments(e.trim(),true);
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

  render(){
    const { course_lists, checkBoxValues, searchValue, loading, imageUrl, imageUrl2,
    identity,
    departmentsName ,
    filterSchoolList ,
    filterDepartments ,
    school,
    department_id,
    departments,
    school_id,

    showRealName
    } = this.state
    const { moduleName } = this.props
    const { getFieldDecorator } = this.props.form;
    let {certification}=this.props;
    // /api/users/accounts/${this.props.current_user.login}/auth_attachment.json

    // 已职业认证的账户不能修改职业，学校/单位，院系/部门（true为disable）
    // const professionalFlag = basicInfo && basicInfo.professional_certification == "certified" ;

    let{ basicInfo }=this.props
    let common={
      changeJob:this.changeJob,
      filterList:this.filterList,
      changeList:this.changeList,
      changeDepartment:this.changeDepartment,
      showApplyForAddOrgModal:this.showApplyForAddOrgModal,
      showApplyForAddChildOrgModal:this.showApplyForAddChildOrgModal
    }
    const uploadProps2 = {
      // name: 'image',
      data: {type: certification == 1 ? "real_name" : "professional"},
      multiple: true,
      showUploadList: false,
      // https://newweb.educoder.net
      action: this.props.current_user ? `${getUploadActionUrl()}` : '',
      className: 'idPic-uploader',
      onChange: this.handleChange2,
      beforeUpload: (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg' || file.type === 'image/bmp';
        if (!isJpgOrPng) {
          this.props.showNotification('请上传正确文件格式');
        }
        return isJpgOrPng;
      },
    };

    // form合并了
    const propsWithoutForm = Object.assign({}, this.props)
    delete propsWithoutForm.form
    return(
      <div>
          <ApplyForAddOrgModal ref="applyForAddOrgModal" wrappedComponentRef={(form) => this.applyForAddOrgForm = form}  schoolName={school}
          {...propsWithoutForm} addOrgSuccess={this.addOrgSuccess}
          ></ApplyForAddOrgModal>
          <ApplyForAddChildOrgModal ref="applyForAddChildOrgModal" schoolName={school} schoolId={school_id} departmentName={departmentsName}
                                    {...propsWithoutForm}
                                    wrappedComponentRef={(form) => this.applyForAddChildOrgForm = form}
                                    addChildOrgSuccess={this.addChildOrgSuccess}
          ></ApplyForAddChildOrgModal>
        <ModalWrapper
          ref="modalWrapper"
          title={
            certification && certification == 1 ?
            <span><i className="iconfont icon-shenfenrenzheng font-18 color-blue mr5" style={{fontWeight:"normal"}}></i>实名认证</span>:
            <span><i className="iconfont icon-zhiyerenzheng font-18 color-blue mr5" style={{fontWeight:"normal"}}></i>职业认证</span>
          }
          {...this.props }
          {...this.state}
          onOk={this.onOk}
          okText="保存"
          className="applyForModal certificationModal courseNormalForm autoModal"
          width="660px"
          bottomRender={
            certification && certification == 1?
            <div className="bottomRender">
              <p>认证须知：</p>
              <p>
                1.你需要准备有效的身份证正面（人像面）的证件照照片，请确保证件照片清晰可见，严禁PS；
              </p><p>
              2.我们将在你提交认证信息后的24小时（不包含节假日）内完成审核，审核结果将会以系统消息的形式发送给你；
              </p><p>
                3.实名认证审核完成后，无法删除，请谨慎填写；
              </p><p>
                4.实名认证审核完成后，系统将自动发放500个金币作为奖励；
              </p><p>
                5.我们会确保你所提供的信息均处于严格的保密状态，不会泄露；
              </p><p>
                6.如存在恶意乱填写姓名，证件号，及上传与实名认证证件无关图片者，一经发现将冻结EduCoder账号。
              </p><p>
                7.提交实名认证后系统会自动将状态改为已认证，你将可以体验平台需要实名认证的功能；如果在认证后的使用过程中未通过审核，你将不能继续体验需要认证的功能。
              </p>
            </div>:
            <div className="bottomRender">
              <p>认证须知：</p>
              <p>
              1.根据职业上传相应的证件照：教师（教师证），专业人士（员工证）、学生（学生证），请确保证件照内容完整并且清晰可见，严禁PS；
              </p><p>
              2.我们将在你提交职业证信息后的24小时（不包含节假日）内完成审核，审核结果将会以系统消息的形式发送给你；
              </p><p>
              3.职业认证审核完成后，无法删除，请谨慎填写；职业变更请选择重新认证；
              </p><p>
              4.职业认证审核完成后，系统将自动发放500个金币作为奖励；
              </p><p>
              5.我们会确保你所提供的信息均处于严格的保密状态，不会泄露；
              </p><p>
              6.如存在恶意乱填写姓名，学号，及上传与职业证件无关图片者，一经发现将冻结EduCoder账号。
              </p>
              <p>
              7.非老师身份提交职业认证后系统会自动将状态改为已认证，你将可以体验平台需要职业认证的功能；如果在认证后的使用过程中未通过审核，你将不能继续体验需要认证的功能。
              </p>
            </div>
            }
          >
          <style>{`
            .applyForModal .ant-form-item{
              margin-bottom:18px;
            }
            .applyForModal .ant-form-item-label {
              width: 100px;
              padding-right: 10px;
            }
            .applyForModal .ant-form-item-label label {
              color: #979797
            }          
            .applyForModal .ant-upload.ant-upload-drag .ant-upload {
              padding: 0px;
            }

            .certificationModal .ant-modal-body{
              padding:20px;
            }
            // .certificationModal .formItemInline .ant-form-item-control-wrapper {
            //   width: 448px;
            // }
            span.idPic-uploader {
              margin-right:20px;
              height:110px;
            }
            .idPic-uploader > .ant-upload {
              width: 160px;
              height: 110px;
            }
            .idPic-uploader .ant-upload.ant-upload-drag p.ant-upload-drag-icon {
              margin-bottom: 0px;
            }
            .idPic-uploader .ant-upload.ant-upload-drag p.ant-upload-drag-icon i{
              font-size:42px!important;
              color:#4B667F
            }
            .idPic-uploader .ant-upload.ant-upload-drag p.ant-upload-text a{
              font-size: 12px;
              color:#4B667F;
              border-bottom:1px solid #4B667F
            }
            .idPic-uploader .ant-upload.ant-upload-drag {
              padding: 0px;
              border:1px solid rgba(218,218,218,1)!important;
            }
            .idPic-uploader img {
              width:100%
            }
            .first_uploader {
              margin-left: 42px;
            }
            .certificationModal .marginauto{
              margin-top:20px!important;
            }
            .bottomRender {
              padding: 19px;
              background: rgb(245,245,245);
              margin-top: 20px;
              color: #656565;
            }

            span.idPic-uploader.demoImg {
              width:160px;
              background:rgba(240,240,240,1);
              border:1px solid rgba(218,218,218,1);
              border-radius:4px;
              padding:0px 5px;
              justify-content: center;
              align-items: center;
              display: -webkit-flex;
            }
            .formItemInline.ant-form-item {
              display: -ms-flexbox;
              display: flex;
            }
            .formItemInline {
                display: flex;
                margin-bottom: 10px;
                position: relative;
            }
            .formItemInline .ant-form-explain{
              position:absolute;
              bottom:-20px;
              left:0px;
              width:100%;
            }
            .yslgraduainputedit{
              width:295px;
            }
          `}</style>

          <Form onSubmit={this.handleSubmit}>
            {certification && certification == 1 ?
            <div>
              <Form.Item
                label="姓名"
                className="formItemInline"
              >
                <React.Fragment>{getFieldDecorator('name', {
                    rules: [{
                      // initialValue: this.state.cityDefaultValue,
                      required: true,
                      message: `请输入真实姓名，最大限制${MAX_NAME_LENGTH}个字符`,

                    },
											{ validator: this.handleSubmitNames },
                    ],
                  })(
                    <Input placeholder={`请输入真实姓名，最大限制${MAX_NAME_LENGTH}个字符`} className="yslgraduainputedit"  disabled={!showRealName && this.state.forDisable == true } addonAfter={
                      <i className={showRealName?"iconfont icon-xianshi font-18 color-blue":"iconfont icon-yincang font-18 color-blue"}
                            onClick={()=>this.showOrHide(showRealName)}></i>
                    }></Input>
                  )}
                  <span>{ showRealName ? '（显示：平台将显示您的真实姓名）' : '（隐藏：平台将显示你的昵称）' }</span>
                  </React.Fragment>
                  {/* // <div className="df" style={{}}>
                  //   <Tooltip title="已完成实名认证，不能修改">
                  //     <span className="mr8" >{showRealName ? this.props.basicInfo.name : getHiddenName(this.props.basicInfo.name)}</span>
                  //   </Tooltip>
                  //   <i className={showRealName?"iconfont icon-xianshi font-18 color-blue":"iconfont icon-yincang font-18 color-blue"}
                  //       onClick={()=>this.showOrHide(showRealName)}></i>
                  //   <span>{ showRealName ? '（显示：平台将显示您的真实姓名）' : '（隐藏：平台将显示你的昵称）' }</span>
                  // </div> */}

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
                      <Radio value="0">男</Radio>
                      <Radio value="1">女</Radio>
                  </RadioGroup>
                )}
              </Form.Item>
              <Form.Item
                label="证件号："
                className="formItemInline"
              >
                {getFieldDecorator('credentials', {
                  rules: [{
                    // initialValue: this.state.cityDefaultValue,
                    required: true,
                    message: '请输入证件号',
                  }],
                })(
                  <Input placeholder="请输入证件号" ></Input>
                )}
              </Form.Item>
            </div>
            :
              <AccountBasicEditItem
                identity={identity}
                getFieldDecorator={getFieldDecorator}
                professionalFlag={false}
                basicInfo={basicInfo}
                {...this.props}
                {...this.state}
                {...common}
                form={this.props.form}
                filterSchoolList={filterSchoolList}
                filterDepartments={filterDepartments}
                departmentsName={departmentsName}
                school={school}
                department_id={department_id}
                departments={departments}
              ></AccountBasicEditItem>
            }
            <div className="mt15" style={{ marginLeft: '18px' }}>
              <div className="df">
                <span style={{color: '#999999'}}>{ certification && certification == 1 ? "身份证上传:":"职业证上传:" }</span>
                <div className="df ml10" style={{ justifyContent: 'center' }} >
                  <span className="idPic-uploader demoImg">
                    <img src={`${certification == 1 ? authImg : jobImg}`} alt="avatar" style={{ maxHeight: '110px'}}/>
                  </span>
                  <Dragger {...uploadProps2}
                    accept=".png,.jpg,.bmp,.jpeg"
                  >
                    {imageUrl2 ?
                      // <a href={imageUrl2} target="_blank" title="点击重新上传图片"></a>
                        <img src={imageUrl2} alt="avatar" style={{ maxHeight: '110px'}}/>
                      :
                      <React.Fragment>
                        <p className="ant-upload-drag-icon">
                          <i className="iconfont icon-cuban2shangchuanyunduan" style={{color:"#4B667F",font:"42px"}}></i>
                        </p>
                        <p className="ant-upload-text mt20"><a>点击或拖拽上传图片</a></p>
                        {/* <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p> */}
                      </React.Fragment>
                    }
                  </Dragger>
                </div>
              </div>
              <div className="df mt10 color-grey-9">
                <span className="fl edu-txt-center" style={{width:"200px",marginLeft:"65px"}}>
                  <p>示例图片</p>
                  <p className="font-12" style={{color: '#FF6800'}}>（png/jpg/bmp格式，不超过2MB）</p>
                </span>
                <span className="fl edu-txt-center" style={{width:"160px"}}>
                  <ImageLayer2 parentSel={'#imageLayerBtn'} parentSel={'#imageLayerBtn'}
                  ></ImageLayer2>
                  <a href="javascript:void(0)" id="imageLayerBtn" src={imageUrl || imageUrl2} className="color-orange" style={{borderBottom:"1px solid #ff6800"}}>查看大图</a>
                  </span>
              </div>
            </div>
          </Form>


        </ModalWrapper>

      </div>
    )
  }
}
const WrappedRealNameCertificationModal = Form.create({ name: 'RealNameCertificationModal' })(RealNameCertificationModal);

export default WrappedRealNameCertificationModal;


