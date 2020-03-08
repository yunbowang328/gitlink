import React,{Component} from "react";
import { Form, Select, Input, Button,Checkbox,Upload,Icon,message,Modal,Tooltip} from "antd";
import {Link} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash'

import { WordsBtn, getUploadActionUrl, appendFileSizeToUploadFile, appendFileSizeToUploadFileAll, ConditionToolTip } from 'educoder';
import Modals from '../../modals/Modals';
import TPMMDEditor from '../../tpm/challengesnew/TPMMDEditor';
import LeaderIcon from './common/LeaderIcon'

const Search = Input.Search;
const CheckboxGroup = Checkbox.Group;

class CommonWorkPost extends Component{

    constructor(props){
       super(props)
       this.mdRef = React.createRef();
       this.state={
         coursename:"",
         coursesearch:"",
         title_num:20,
         title_value:"",
         fileList: [],
         contents: [{val:"",id:1}],
         type:true,
         workslist:undefined,
         search:"",
         task_status:[],
         members: [],
         selectmemberslist:[],
         minvalue:"",
         setvalue:"",
         minmaxtype:false,
         selectobjct:undefined,
         Loadtype:false,


         limit:20,
         memberNumMin: 2,
         memberNumMax: 5,
       }
    }

    componentDidMount(){
      const studentWorkId = this.props.match.params.studentWorkId
      this.isEdit = !!studentWorkId
      window.location.pathname.indexOf('post_edit') != -1
      let coursesId=this.props.match.params.coursesId;
      let workId=this.props.match.params.workId;
      let url = `/homework_commons/${workId}/student_works/new.json`
      const isGroup = this.props.isGroup()
      if (isGroup) {
        this.searchList('',1, this.state.limit)
      }

      if (this.isEdit) {
        url = `/student_works/${studentWorkId}/edit.json`
        axios.get(url).then((response)=>{
          if(response.data.course_id){

            // TODO
            // response.data.attachments
            const _fileList = response.data.attachments.map(item => {
              return {
                id: item.id,
                uid: item.id,
                name: appendFileSizeToUploadFile(item),
                url: item.url,
                delete: item.delete,
                status: 'done'
              }
            })
            const _memebers = response.data.members ? response.data.members.slice(0) : [];
            this._edit_init_memebers = _memebers
            delete response.data.members;
            this.setState({
              ...response.data,
              selectmemberslist: _memebers || [],
              // members: [],
              task_status: [], //_memebers ? _memebers.map(item => item.user_id) : [],
              fileList: _fileList,
              memberNumMin: response.data.min_num,
              memberNumMax: response.data.max_num,
            })
            this.mine = _memebers.length ? _memebers[0] : null
            // 分组
              // this.setState({
              //   task_status:checkedValues,
              //   selectmemberslist:selects
              // })
            this.props.form.setFieldsValue({
              description: response.data.description,
            }, () => {});
            this.mdRef.current.setValue(response.data.description)
          }
        }).catch((error)=>{
          console.log(error)
        })
      } else {
        axios.get(url).then((response)=>{
          if(response.data.course_id){
            const mine = {
              user_id: response.data.user_id,
              user_name: response.data.user_name,
              student_id: response.data.user_student_id,
              group_name: response.data.group_name,

            }
            this.mine = mine
            // const _memebers = response.data.members.slice(0);
            if (response.data.members) {
              delete response.data.members;
            }
            this.setState({
              ...response.data,
              selectmemberslist: [mine],
              memberNumMin: response.data.min_num,
              memberNumMax: response.data.max_num,
            })
          }
        }).catch((error)=>{
          console.log(error)
        })
      }

    }

    setedit=(workId)=>{

      let coursesId=this.props.match.params.coursesId;
      window.location.href="courses/"+coursesId+"/graduation_tasks/"+workId+"/appraise";

    }

    handleSubmit=(e) => {

      let {fileList,selectmemberslist,workslist, memberNumMin, memberNumMax}=this.state;

      let  userids=[];
      if(selectmemberslist!=undefined&&selectmemberslist.length>0) {
        for (var list of selectmemberslist) {

          if (list.user_id != undefined && list.user_id != null) {
            userids.push(list.user_id)
          }

        }
      }
      const isGroup = this.props.isGroup()
      if(!isGroup){
        userids=undefined
      }

      let listid=[];
      if(fileList!=undefined&&fileList.length>0) {
        for (var list of fileList) {
          listid.push(list.id || list.response.id)
        }
      }
      e.preventDefault();
      if( true ){
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            console.log(values.description);
            // console.log(fileList);
            if(values.description===undefined||values.description===""){

              return
            }
            if(isGroup){
              if(userids!=undefined){
                if(userids.length < memberNumMin){
                  this.setState({
                    minvalue: memberNumMin,
                    setvalue:"小于",
                    minmaxtype:true
                  })

                  return
                }else if(userids.length > memberNumMax){
                  this.setState({
                    minvalue: memberNumMax,
                    setvalue:"大于",
                    minmaxtype:true
                  })
                  return
                } else {
                  this.setState({
                    minmaxtype: false
                  })
                }
              }
            }
            if (!listid || listid.length == 0) {
              this.props.confirm({
                content: <div>
                  <div>还未上传附件</div>
                  <div>是否确认提交作品？</div>
                </div>,
                onOk: () => {
                   this.doCommit(values, listid, userids)
                }
              })
            } else {
              this.doCommit(values, listid, userids)
            }





          }
        });
      }
    }
  doCommit = (values, listid, userids) => {
    let workId=this.props.match.params.workId;
    let studentWorkId=this.props.match.params.studentWorkId;
    let coursesId=this.props.match.params.coursesId;

    // let url="/graduation_tasks/"+id+"/graduation_works.json";
    let url = `/homework_commons/${workId}/student_works.json`
    const moduleName = this.props.getModuleName()
    if (this.isEdit) {
      url = `/student_works/${studentWorkId}.json`
      axios.put(url, {
          description:values.description,
          attachment_ids:listid,
          user_ids:userids
        }
      ).then((response) => {
        if(response.status===200) {
          if(response.data.status===0){
            // this.props.showNotification('保存成功')
          }else{
          }
          this.props.history.push(`/courses/${coursesId}/${moduleName}/${workId}/${studentWorkId}/appraise`)

        }
      }).catch((error) => {
        console.log(error)
      })
    } else {
      axios.post(url, {
          description:values.description,
          attachment_ids:listid,
          user_ids:userids
        }
      ).then((response) => {
        if(response.status===200) {
          if(response.data.status===0){
            this.props.history.push(`/courses/${coursesId}/${moduleName}/${workId}/${response.data.work_id}/appraise`)
            // this.props.showNotification('保存成功')
            // this.setState({
            //   Modalstype:true,
            //   Modalstopval:response.data.message,
            //   ModalSave:()=>this.setedit(response.data.work_id),
            //   Loadtype:true
            // })
          }else{
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }

    handleSelectChange = (value) => {
      console.log(value);
      this.props.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
      });
    }

  goback=()=>{
    // this.props.toListPage(this.props.match.params, this.state.category ? this.state.category.category_id : '')
	  this.props.history.goBack()
	}


  // 输入title
  changeTitle=(e)=>{

    this.setState({
      title_num:20-parseInt(e.target.value.length),
      title_value:e.target.value
    })

  }
  // 附件相关 START
  handleChange = (info) => {
    if (info.file.status === 'uploading' || info.file.status === 'done' || info.file.status === 'removed') {
      let fileList = info.fileList;

      this.setState({ fileList: appendFileSizeToUploadFileAll(fileList) });
    }
  }

  onAttachmentRemove = (file) => {
    // confirm({
    //   title: '确定要删除这个附件吗?',
    //   okText: '确定',
    //   cancelText: '取消',
    //   // content: 'Some descriptions',
    //   onOk: () => {
    //     this.deleteAttachment(file)
    //   },
    //   onCancel() {
    //     console.log('Cancel');
    //   },
    // });
    // return false;

    // this.setState({
    //   Modalstype:true,
    //   // Modalstopval:'确定要删除这个附件吗?',
    //   Modalstopval:'是否确认删除?',
    //   ModalSave: ()=>this.deleteAttachment(file),
    //   ModalCancel:this.cancelAttachment
    // })
    if (file.delete === false) {
      this.props.showNotification(`该作品已被评阅，不能删除该附件`);
      return false
    } else {
      if (!file.percent || file.percent == 100) {
        this.props.confirm({
          content: '是否确认删除?',
          onOk: () => {
            this.deleteAttachment(file)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
        return false;
      }
    }
  }

  cancelAttachment=()=>{
    this.setState({
      Modalstype:false,
      // Modalstopval:'确定要删除这个附件吗?',
      Modalstopval:'是否确认删除?',
      ModalSave:"",
      ModalCancel:""
    })
  }

  deleteAttachment = (file) => {
    const url = `/attachments/${file.response ? file.response.id : file.uid}.json`
    axios.delete(url, {
    })
      .then((response) => {
        if (response.data) {
          // const { status } = response.data;
          if (response.data.status === 0) {

            console.log('--- success')
            // this.setState({
            //   Modalstype:true,
            //   Modalstopval:response.data.message,
            //   ModalSave:this.cancelAttachment,
            //   Loadtype:true,
            // })

            this.setState((state) => {
              const index = state.fileList.indexOf(file);
              const newFileList = state.fileList.slice();
              newFileList.splice(index, 1);
              return {
                fileList: newFileList,
              };
            });

						this.cancelAttachment()
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  inputSearchValue=(e)=>{

    if(e.target.value===""){
      this.setState({
        search:null
      })
    }else{
      this.setState({
        search:e.target.value
      })
    }

  }


  searchValue=()=>{

    let {search, limit} = this.state;

    this.searchList(search,1, limit)

  }

  searchList=(search,page,limit)=>{

    let id=this.props.match.params.workId;
    let workId=this.props.match.params.workId;
    // let url="/graduation_tasks/"+id+"/graduation_works/search_member_list.json";
    let url = `/homework_commons/${workId}/student_works/search_member_list.json`
    axios.get(url,{
      params: {
        search: search,
        page: page,
        limit: limit
      }
    }).then((result)=>{

      if(result){
        this.setState({
          page: result.data.members.length == 0 ? page - 1 : page,
          members: page != 1 && search == this.state.lastSearch ? this.state.members.concat(result.data.members) : result.data.members,
          search: search,
          lastSearch: search,
        })
      }

    }).catch((error)=>{
      console.log(error)
    })
  }


  contentViewScroll=(e)=>{
    //滑动到底判断
		let newscrollTop=parseInt(e.currentTarget.scrollTop);
		let allclientHeight=e.currentTarget.clientHeight+newscrollTop;

		if(e.currentTarget.scrollHeight-allclientHeight===0||e.currentTarget.scrollHeight-allclientHeight===1||e.currentTarget.scrollHeight-allclientHeight===-1){
      // console.log("到达底部");

     let{ search,page,limit }=this.state;

       let newpage=page+1

      this.searchList(search,newpage,limit)

    }

  }

  funtaskstatus=(checkedValues)=>{
    /**
      比较 checkedValues  和 this.state.selectmemberslist
      checkedValues length > this.state.task_status.length 是新增； 反之是删除
      比较找到不同的id
      去除重复的，checkedValues留下的是新增，task_status留下的是删除
     */

    const _checkedValues = checkedValues.slice(0)
    const _task_status = this.state.task_status.slice(0);
    checkedValues.forEach(item => {
      this.state.task_status.forEach(_item => {
        if (item == _item) {
          _.remove(_checkedValues, (item)=> item == _item)
          _.remove(_task_status, (item)=> item == _item)
        }
      })
    })
    let _selectmemberslist = this.state.selectmemberslist.slice(0)
    if (_checkedValues.length) { // 新增
      _selectmemberslist.push( this.state.members.filter(item => item.user_id == _checkedValues[0])[0])
    } else if (_task_status.length) {  // 删除
      _.remove(_selectmemberslist, (item)=> item.user_id == _task_status[0])
    }


    // let{members}=this.state;
    // let newlist =members.concat(this.state.selectmemberslist);
    // let newcheckedValues=checkedValues;
    // let selects= this.mine ? [this.mine] : [];
    // // const selectobjct = this._findByUserId(check)
    // // selects.push(selectobjct)
    // for(var z=0; z<newcheckedValues.length; z++){
    //   for(var i=0; i<newlist.length; i++){
    //     if(newlist[i].user_id===newcheckedValues[z]){
    //       selects.push(newlist[i])
    //       break;
    //     }
    //   }
    // }
    this.setState({
      task_status:checkedValues,
      selectmemberslist: _selectmemberslist
      // selectmemberslist:checkedValues
    })

  }
  doDelete = (id) => {
    let{selectmemberslist,task_status}=this.state;
    let newlist=task_status.slice(0);
    let selects=selectmemberslist;

    for(var i=0; i<newlist.length; i++){
      if(newlist[i]===id){
        newlist.splice(i,1)
      }
    }

    for(var z=0; z<selects.length; z++){
      if(selects[z].user_id===id){
        selects.splice(z,1)
      }
    }
    this.setState({
      task_status:newlist,
      selectmemberslist:selects
    })
  }
  delecttask_status=(id)=>{
    if (this.isEdit) {
      let deleteOldMemberIndex = -1;

      if (this._edit_init_memebers && this._edit_init_memebers.length) {
        this._edit_init_memebers.some((item, index) => {
          if (item.user_id == id) {
            deleteOldMemberIndex = index;
            return true
          }
        })
        if (deleteOldMemberIndex == -1) {
          this.doDelete(id)
          return;
        } else {

        }
      }

      this.props.confirm({
        content: <div>
          <div>TA的作品将被删除</div>
          <div>是否确认删除？</div>
        </div>,
        onOk: () => {
          let workId=this.props.match.params.workId;
          const url = `/homework_commons/${workId}/student_works/delete_work.json`;
          axios.delete(url, { data: {
              user_id: id
            }})
          .then((response) => {
            if (response.data.status == 0) {
              this.searchValue()
              this.doDelete(id)
              deleteOldMemberIndex != -1 && this._edit_init_memebers.splice(deleteOldMemberIndex, 1)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      })
    } else {
      this.doDelete(id)
    }
  }

  gocannel=()=>{
		this.props.history.goBack()
  }

render(){
  const { getFieldDecorator } = this.props.form;
  const isEdit = this.isEdit
  let {search,fileList, workslist,setvalue,minvalue,minmaxtype,Loadtype,
    Modalstype,Modalstopval,ModalCancel,ModalSave,task_status,selectmemberslist,members,
    category,
    course_name, homework_name,
    memberNumMax, memberNumMin
  } =this.state;
  const { current_user  } = this.props

  let courseId=this.props.match.params.coursesId;
  let workId=this.props.match.params.workId;
  const uploadProps = {
    width: 600,
    fileList,
    multiple: true,
    // https://github.com/ant-design/ant-design/issues/15505
    // showUploadList={false}，然后外部拿到 fileList 数组自行渲染列表。
    // showUploadList: false,
    action: `${getUploadActionUrl()}`,
    onChange: this.handleChange,
    onRemove: this.onAttachmentRemove,
    beforeUpload: (file) => {
      // TODO 文件存在则提示并退出
      let gotSameFile = false;
      this.state.fileList && this.state.fileList.some((item) => {
        if (item.name && item.name.startsWith(file.name)) {
          gotSameFile = true;
          return true
        }
      })
      if (gotSameFile) {
        this.props.showNotification("该附件已被上传！")
        return false
      }
      console.log('beforeUpload', file.name);
      const isLt150M = file.size / 1024 / 1024 < 150;
      if (!isLt150M) {
        this.props.showNotification('文件大小必须小于150MB!');
      }
      return isLt150M;
    },
  };

  // console.log(workslist&&workslist)

   //  console.log(selectmemberslist&&selectmemberslist)
  const moduleName = this.props.getModuleName()
  const moduleCHName = this.props.getModuleName(true)
  const isGroup = this.props.isGroup()

  return(
<React.Fragment>

  <div>
    {/*提示*/}
    <Modals
      modalsType={Modalstype}
      modalsTopval={Modalstopval}
      modalCancel={ModalCancel}
      modalSave={ModalSave}
      loadtype={Loadtype}
    />
    <div className="newMain clearfix">
      <div className={"educontent mb20"}>

      <p className="clearfix mt10">
        <WordsBtn style="grey" className="fl">  <Link to={ current_user && current_user.first_category_url} className="color-grey-6">{course_name}</Link></WordsBtn>
        <span className="color-grey-9 fl ml3 mr3">&gt;</span>
        <WordsBtn style="grey" className="fl"> <Link to={`/courses/${courseId}/${moduleName}/${workId}`} className="color-grey-6">{moduleCHName}</Link></WordsBtn>
        <span className="color-grey-9 fl ml3 mr3">&gt;</span>
        {/*<WordsBtn style="grey" className="fl">*/}
          {/*<Link to={"/courses/"+courseId+"/graduation/graduation_tasks/"+category_id} className="color-grey-6">{workslist&&workslist.task_name}</Link>*/}
          {/*<span className="color-grey-9 ml3 mr3">&gt;</span>*/}
        {/*</WordsBtn>*/}

        <span>{`${current_user ? current_user.real_name : ''} ${ this.isEdit ? '编辑' : '提交'}作品` }</span>
      </p>

      <div style={{ width:'100%',height:'75px'}} >
        <p className=" fl color-black mt25 summaryname" title={homework_name}>{homework_name}</p>
        <a className="color-grey-6 fr font-16 ml30 mt10 mr20" onClick={this.goback}>返回</a>
      </div>

      {/*  */}
      <Form   >
        <div className="stud-class-set pd20 coursenavbox edu-back-white">
          <style>{`
                .uploadBtn.ant-btn {
                  border: none;
                  color: #4CACFF;
                  box-shadow: none;
                  background: transparent;
                  padding: 0 6px;
                }
                .ant-upload-list-item:hover .ant-upload-list-item-info{
                  background-color:#fff;
                }

                .upload_1 .ant-upload-list {
                  width: 350px;
                }

              `}</style>
          <Form.Item
            label="内容"
            style={{marginBottom: '4px'}}
            className="mdInForm"

          >
            {getFieldDecorator('description', {
              rules: [{
                required: true, message: '请输入作品内容',
              }, {
                max: 5000, message: '最大限制为5000个字符',
              }],
            })(
              <TPMMDEditor ref={this.mdRef} placeholder={'请在此输入作业内容或作业附件的简要描述，最大限制为5000个字符'} maxLent={"5000"}
                           mdID={'courseMessageMD'} initValue={this.editTopic ? this.editTopic.content : ''} className="courseMessageMD"></TPMMDEditor>
            )}
          </Form.Item>
          <Upload {...uploadProps} className="upload_1 upload_under_markdown_editor">
            <Button className="uploadBtn">
              <Icon type="upload" /> 上传附件
            </Button>
            <span className={"color-grey-9"}>(单个文件150M以内)</span>
          </Upload>
        </div>



        {!isGroup?"":
        <div className="stud-class-set pd20 coursenavbox edu-back-white" style={{borderTop: '1px solid #EAEAEA'}}>
          <Form.Item
            label="小组成员"

          >
            <div>
              <div className={"fl ml20"}>成员要求：{memberNumMin}～{memberNumMax}人</div>
              <Search
                className={"fl mt5 ml20"}
                style={{width:"20%"}}
                placeholder="请输入姓名或学号搜索"
                id="subject_search_input"
                value={search}
                onInput={this.inputSearchValue}
                onSearch={this.searchValue}
                autoComplete="off"
              ></Search>
            </div>


          </Form.Item>

          <style>{`
                .fonthidden{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }
                .members.fl {
                  overflow-y: auto;
                  overflow-x: hidden;
                }
              `}</style>

          <div className={"ml20"} style={{width:"100%"}}>

            <div className={"members workPost fl"}
                 onScroll={this.contentViewScroll}>
              <CheckboxGroup value={task_status} onChange={this.funtaskstatus} style={{ paddingTop: '4px'}}>
                {members.map((item,key)=>{
                  return(
                    <div key={key} style={{
                      // width: '375px',
                      height: '30px'
                    }}>
                      <Checkbox value={item.user_id} key={item.user_id} checked={parseInt(task_status[key])===item.user_id?true:false}
                          disabled={item.commit_status || item.user_id == this.props.current_user.user_id ===true?true:false}  className="fl "
                      ></Checkbox>
                      <Tooltip placement="bottom" title={item.user_nam}><div className={"fl ml5 fonthidden"} style={{width: '70px'}}>{item.user_name}</div></Tooltip>
                      <div className={"fl ml20 color-grey-9 overflowHidden1"} style={{  maxWidth: '147px' }}
                        title={item.group_name && item.group_name.length > 9 ? item.group_name : ''}
                      >{item.group_name}</div>
                      <div className={"fl ml20 color-grey-9 overflowHidden1"} style={{  maxWidth: '99px' }}
                        title={item.student_id && item.student_id.length > 12 ? item.student_id : ''}
                      >{item.student_id}</div>
                      <div className={"fl ml20"}>{item.commit_status===true?<span className={"color-orange"}>已提交</span> :""}</div>
                    </div>
                  )
                })}
              </CheckboxGroup>
            </div>

            <div className={"youjiangboxs"}>
              <i className={"iconfont icon-youjiang fl ml20 mr20"}></i>
            </div>
            <style>{`
               .fonthidden{
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap
                }
              .members .leaderIcon {
              }
              .workPost.members {
                width: 452px;
              }
              `}</style>
            <div className={"members workPost fl"}>

              {selectmemberslist&&selectmemberslist.map((item,key)=>{
                const _is_leader = (item.is_leader || !this.isEdit && key==0)
                return(
                  <div key={key} style={{
                    // width: '375px',
                    height: '30px',
                    display:item.user_name===undefined?"none":""
                  }}>
                    <ConditionToolTip placement="bottom" title={'组长'} condition={_is_leader && item.user_name.length > 5}>
                      <div className={"fl ml5 fonthidden"} style={{width: '98px', color: `${item.user_name.length > 5 && _is_leader ? '#4CACFF' : 'inherit'}`}}>
                        {item.user_name}{ item.user_name.length <= 5 && _is_leader && <LeaderIcon className="leaderIcon" small={true}></LeaderIcon>}
                      </div>
                    </ConditionToolTip>

                    <div className={"fl ml20 color-grey-9 overflowHidden1"} style={{  maxWidth: '147px' }}
                      title={item.group_name && item.group_name.length > 9 ? item.group_name : ''}
                    >{item.group_name}</div>
                    <div className={"fl ml20 color-grey-9 overflowHidden1"} style={{  maxWidth: '99px' }}
                      title={item.student_id && item.student_id.length > 12 ? item.student_id : ''}
                    >{item.student_id}</div>
                    {item.user_id != this.props.current_user.user_id ?
                      <div className={"fr"}><i className={"iconfont icon-shanchudiao fl "}
                        style={{marginTop:'-4px'}} onClick={()=>this.delecttask_status(item.user_id)}></i></div>:""}

                  </div>
                )
              })}
            </div>


            <div className={"both"}>

            </div>

            {minmaxtype===true?<span className={"color-red mt20"}>
                人数不能{setvalue+minvalue}个人
              </span>:""}

          </div>
        </div>}




        <Form.Item>
          <div className="clearfix mt30 mb30">
            <Button type="primary" onClick={this.handleSubmit}  className="defalutSubmitbtn fl mr20">提交</Button>
            <a onClick={this.gocannel} className="defalutCancelbtn fl">取消</a>
          </div>
        </Form.Item>
      </Form>

      </div>
    </div>
  </div>

</React.Fragment>

      )
    }
}
const CommonWorkPostApp = Form.create({ name: 'coursesNew' })(CommonWorkPost);
export default CommonWorkPostApp;
