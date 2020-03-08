import React, { Component } from 'react';

import axios from 'axios';

import { TPMIndexHOC } from '../../../tpm/TPMIndexHOC';

import { SnackbarHOC,getImageUrl } from 'educoder'

import { Pagination,Upload,Modal,Checkbox,Spin } from 'antd';

import EcTitleCourseEvaluations from '../../ecTitle/ecTitle'

import 'antd/dist/antd.css';

import './ecStudentList.css';

const $ = window.$;

class EcStudentList extends Component {
    constructor(props) {
        super(props)
        this.state={
            majorschoollist:undefined,
            titlemessage:"提示",
            // ecComponentState:"ecStudentList",
            visible:false,
            Modallist:'',
            Modallisttypes:0,
            studentall:false,
            student_id:undefined,
            Modallisttypess:0,
            ismanager:false,
            isSpin:false,
            pages:1,
            per_pages:20,
            total_student:0,
            Myschoolstudents:[],
        }
    }
    componentDidMount(){
        window.document.title = '学生列表';
        let major_id=this.props.match.params.majorId;
        let year_id=this.props.match.params.yearId;

        const url ='/ec_years/'+year_id+'/students.json';
            axios.get(url, {params: {
                page:this.state.pages,
                per_page:this.state.per_pages,
            }}).then((response) => {
                if(response){
                    if(response.status){
                        if(response.status===200){
                            this.setState({
                                total_student:response.data.count,
                                majorschoollist:response.data,
                                ismanager:response.data.ismanager,
                            });
                            try {
                                if(response.data.students.length>0){
                                    var mst=response.data.students;
                                    for(var i=0;i<mst.length;i++){
                                        mst[i].istrue=false;
                                    }
                                    this.setState({
                                        Myschoolstudents:mst
                                    });
                                }
                            }catch (e) {
                                this.setState({
                                    Myschoolstudents:[]
                                });
                            }

                        }
                    }
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    uploadcomponentDidMount(){
        let major_id=this.props.match.params.majorId;
        let year_id=this.props.match.params.yearId;
        const url ='/ec_years/'+year_id+'/students.json';
        axios.get(url, {params: {
                page: this.state.pages,
                per_page: this.state.per_pages,
            }
          }
        ).then((response) => {
              if(response){
                  if(response.status){
                      if(response.status===200){
                          this.setState({
                              total_student:response.data.count,
                              majorschoollist:response.data,
                              ismanager:response.data.ismanager,
                          });
                          try {
                              if(response.data.students.length>0){
                                  var mst=response.data.students;
                                  for(var i=0;i<mst.length;i++){
                                      mst[i].istrue=false;
                                  }
                                  this.setState({
                                      Myschoolstudents:mst
                                  });
                              }
                          }catch (e) {
                              this.setState({
                                  Myschoolstudents:[]
                              });
                          }

                      }
                  }
              }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
        

    windowsgoblack=()=>{
        window.history.go(-1)
    }


    uploadfile=(file)=>{
        console.log("导入的文件");
        console.log(file);
        this.setState({isSpin:true})
        let {majorschoollist}=this.state;
        let year_id=this.props.match.params.yearId;
        let Url ='/ec_years/'+year_id+'/students/import.json';
        const config = {
            headers: { "Content-Type": "multipart/form-data" }
        };
        const form = new FormData();
        form.append('file', file.file);
        axios.post(Url,form
        ,config).then((response) => {
            if(response.data.status===0){
                // message.success('已成功导入'+response.data.count+"条数据！");
                this.setState({
                    // titlemessage: response.data.message+"(支撑关系变更)",
                    Modallist: '已成功导入'+response.data.success_count+"条数据！",
                    Modallisttype:true,
                    Modallisttypes:1,
                    Modallisttypess:0,
                    isSpin:false
                })
            }else{
                // message.warning(response.data.message);
                this.setState({
                    // titlemessage: response.data.message+"(支撑关系变更)",
                    Modallist:response.data.message,
                    Modallisttype:true,
                    Modallisttypes:0,
                    Modallisttypess:0,
                    isSpin:false
                })
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    hidemodeldelete=(Modallisttypes)=>{
        this.setState({
            Modallisttype:false,
            Modallist:'',
            Modallisttypess:0
        })
        if(Modallisttypes===1){
            // window.location.reload();
            this.uploadcomponentDidMount();
        }
    }

    showecStudentList=(page)=>{

        let major_id=this.props.match.params.majorId;
        let year_id=this.props.match.params.yearId;
        const url ='/ec_years/'+year_id+'/students.json';
        axios.get(url, {params: {
            page:page,
            per_page:this.state.per_pages,
        }}).then((response) => {
            if(response){
                if(response.status){
                    if(response.status===200){
                        this.setState({
                            total_student:response.data.count,
                            majorschoollist:response.data,
                            ismanager:response.data.ismanager,
                            pages:page,
                        });
                        try {
                            if(response.data.students.length>0){
                                var mst=response.data.students;
                                for(var i=0;i<mst.length;i++){
                                    mst[i].istrue=false;
                                }
                                this.setState({
                                    Myschoolstudents:mst
                                });
                            }
                        }catch (e) {
                            this.setState({
                                Myschoolstudents:[]
                            });
                        }

                    }
                }
            }
        }).catch(function (error) {
                console.log(error);
            });
    };
     //全选
    onChangestudentall=(e)=>{
        let {Myschoolstudents}=this.state;
        let mewmajorschoollist=Myschoolstudents
        for(var i=0; i<mewmajorschoollist.length; i++){
            mewmajorschoollist[i].istrue=e.target.checked
        }
        this.setState({
            studentall:e.target.checked,
            Myschoolstudents:mewmajorschoollist
           })
    };
    //单选
    onChangestudent=(e)=>{
        let {Myschoolstudents,studentall}=this.state;
        let mewmajorschoollist=Myschoolstudents;
        let newstudentall=studentall;
        if(e.target.checked===false){
            newstudentall=false
        }
        for(var i=0; i<mewmajorschoollist.length; i++){
            if(i===e.target.index&&e.target.id===mewmajorschoollist[i].student_id){
                mewmajorschoollist[i].istrue=e.target.checked
            }
        }
       this.setState({
         student_id:e.target.id,
         studentall:newstudentall,
        Myschoolstudents:mewmajorschoollist
       })
    };
     // 删除提示
    deletelistbth=()=>{
        let {Myschoolstudents,studentall} =this.state;
        let studentalltype=0
        for(var i=0; i<Myschoolstudents.length; i++){
            if(Myschoolstudents[i].istrue===true){
                studentalltype=1
            }
        }
        if(studentall===true||studentalltype===1){
            this.setState({
                Modallist: '确定删除这些学生吗？',
                Modallisttype:true,
                Modallisttypess:1
            })    
        }else{
            this.setState({
                Modallist: '请选择学生！',
                Modallisttype:true
            })     
        }
    };
    //删除学生
    deletelistbthenters=()=>{
       debugger
        let {Myschoolstudents,studentall} =this.state;
        let major_id=this.props.match.params.majorId;
        let year_id=this.props.match.params.yearId;
        let newstudent_id=[];
        if(studentall===false){
            for(var i=0; i<Myschoolstudents.length; i++){
                if(Myschoolstudents[i].istrue===true){
                    newstudent_id.push(Myschoolstudents[i].id)
                }
            }
        }
        let url ='/ec_years/'+year_id+'/students.json'
        axios.delete(url,{data:{
                ids:newstudent_id,
            }}).then((response) => {
            if(response.data.status===0){
               this.setState({
                    // Modallist: "删除成功！",
                    // Modallisttype:true,
                    Modallisttypes:1,
                    Modallisttypess:0
               })
               this.hidemodeldelete(1);
            }
        }).catch((error) => {
            console.log(error)
        })
    }

    render() {
        let {
            majorschoollist,
            Modallisttype,
            titlemessage,
            Modallist,
            studentall,
            student_id,
            Modallisttypess,
            total_student,
            ismanager,
            Myschoolstudents
        }=this.state;
        const uploadProps = {
            name: 'file',

            onPreview(file) {
                // dispatch({ type: `${nameSpace}/updateState`, payload: { uploadPreviewVisible: true, uploadPreviewImage: file.url || file.thumbUrl } });
            },
            onChange(file) {
                // dispatch({ type: `${nameSpace}/updateState`, payload: { fileList: fileList } });
            },
            onRemove(option) {
            },
            customRequest: file => {
                this.uploadfile(file)
            }
        }
        return (
          <div className="newMain clearfix">
             <Modal
                 title={titlemessage}
                 // visible={modeldelet===true&&listid===list.id?true:false}
                 visible={Modallisttype}
                 className={"ecmodeldelet"}
                 closable={false}
                 footer={null}
             >
                 <div className="task-popup-content">
                     <div className="task-popup-text-center font-14">{Modallist}</div>
                 </div>
                 <div className="task-popup-submit clearfix">
                     <a onClick={()=>this.hidemodeldelete(1)} className="task-btn fl">取消</a>
                     {
                         Modallisttypess===0?<a className="task-btn task-btn-orange fr"
                         onClick={()=>this.hidemodeldelete(1)}
                         >确定</a>:<a className="task-btn task-btn-orange fr"
                             onClick={this.deletelistbthenters}
                         >确定</a>
                     }

                 </div>
             </Modal>
             <div className="educontent mb290">
                {/*<div className="clearfix padding20-30 bor-bottom-greyE mb10 edu-back-white">*/}
                     {/*<span className="fl font-18 courseSystem ">学生列表</span>*/}
                     {/*<a className="fr font-15 courseSystem" onClick={this.windowsgoblack}>返回</a>*/}
                 {/*</div>*/}

                 <div className="edu-back-white ">

                     <div className="clearfix padding20-30 bor-bottom-greyE"><span
                         className=" font-18 courseSystem">学生列表（
                         {total_student}
                         ）</span>
                         <div className="color-grey-9 mr10">提供模板支持导入学生信息(请先下载模板)
                             <a className={"color-blue"} target="_blank" href={'/forums/3533'}>查看详情</a>
                         </div>
                     </div>

                     <div className="padding20-30 padbottom" id="training_objective_contents">
                     {ismanager===false?"":
                     <span className="mr30">请使用导入模板（<a href={'/attachments/download/279190/01_学生列表导入模板2.0.xls'} className="color-green"><i className="iconfont icon-fujian mr5 color-green font-16"></i>点击下载</a>），将本学年所有参与的学生导入系统，以便录入教学活动相关数据</span>
                     }
                         <a className="white-btn edu-orangeback-btn fr mr10" >
                         {ismanager===false?"":<Upload
                             {...uploadProps}
                             showUploadList={false}
                             style={{color:'#fff'}}
                         >
                             导入
                         </Upload>}
                         </a>
                     </div>

                     <div  id="training_objective_contents" className='deletelist' >
                         {ismanager===false?"":<div className="white-btn deletebth ml30 mr10" onClick={this.deletelistbth}>
                             删除
                         </div>}
                     </div>
                     <Spin spinning={this.state.isSpin}>
                         <div>
                         <div className="ListTableLine minH-500 edu-back-white" id="listContent">
                         <p className="clearfix">
                             <span className="column-No column-2 relative">
                             <Checkbox
                                 className={'mr20 changestudent'}
                                 checked={studentall===true?true:false}
                                 onChange={this.onChangestudentall}></Checkbox>
                             序号
                             </span>
                             <span className="column-2">姓名</span>
                             <span className="column-2">学号</span>
                         </p>
                             <style>{
                                 `
                                 .myslispan{
                                  display: flex;
                                  flex-direction:initial;
                                 }
                                 `
                             }</style>
                         <ul>
                             {
                                 Myschoolstudents===undefined?
                                 <div className="edu-txt-center color-grey-9 pt50">
                                     <p className="mb20"><img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")} /></p>
                                     <p>学生数据为空，请导入数据</p>
                                 </div>
                                 :Myschoolstudents&&Myschoolstudents.length===0?
                                 <div className="edu-txt-center color-grey-9 pt50">
                                     <p className="mb20"><img className="edu-nodata-img mb20" src={getImageUrl("images/educoder/nodata.png")}/></p>
                                     <p>学生数据为空，请导入数据</p>
                                 </div>:Myschoolstudents&&Myschoolstudents.map((item,key)=>{
                                     // console.log(item)
                                         return(
                                             <li className="clearfix myslispan" key={key}>
                                                 <div className="column-No column-2 relative">
                                                 <Checkbox
                                                 className={'mr20 changestudents'}
                                                 checked={item.istrue===true?true:false}
                                                 key={key}
                                                 index={key}
                                                 onChange={this.onChangestudent} id={item.student_id}></Checkbox>
                                                 {item.index}
                                                 </div>
                                                 <div className="column-2" >{item.name}</div>
                                                 <div className="column-2">{item.student_id}</div>
                                             </li>
                                         )
                                 })
                             }

                         </ul>
                     </div>
                     </div>
                         <style>
                             {
                                 `
                                     .idpagin{
                                         width: 100% !important;
                                         display: flex;
                                         justify-content: center;
                                     }
                                      
                                     `
                             }
                         </style>
                         <div style={{width:'100%',position: 'relative'}}>
                             {
                                 majorschoollist&&majorschoollist.students&&majorschoollist.students.length===0?"":
                                   <Pagination className={"pagelistStudentList mt30 idpagin"}
                                               showQuickJumper current={this.state.pages}
                                               onChange={this.showecStudentList} pageSize={20}
                                               total={majorschoollist&&majorschoollist.count}></Pagination>
                             }
                         </div>
                     </Spin>

                 </div>
             </div>

         </div>
        )

    }
}

export default SnackbarHOC() (EcStudentList);

