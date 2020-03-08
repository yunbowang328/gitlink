import React,{ Component } from "react";
import { Modal,Checkbox,Upload,Button,Icon,message,Input,Radio} from "antd";
import axios from 'axios';
import Modals from '../../modals/Modals';
const RadioGroup = Radio.Group;
const Search = Input.Search;

class Associationmodel extends Component{
  constructor(props){
    super(props);
    this.state={
      group_ids:[],
      fileList:[],
      Modalstype:false,
      Modalstopval:"",
      ModalCancel:"",
      ModalSave:"",
      loadtype:false,
      search:undefined,
      page:1,
      limit:"",
      projects:undefined,
      projectvalue:undefined,
      projectvaluetype:false,
			searchtypes:false
    }
  }


  componentDidMount() {
   this.searchValue();
  }

  searchValue=()=>{
    let {search}=this.state;
    let url="/users/search_user_projects.json";
    axios.get(url, {
      params: {
        search: search
      }
    }).then((result)=>{
    if(result.status===200){
      this.setState({
        projects:result.data.projects,
				searchtypes:search===undefined&&result.data.projects.length==0?true:false
      })
    }

    }).catch((error)=>{
      console.log(error)
    })
  }

  inputSearchValue=(e)=>{
    this.setState({
      search:e.target.value
    })
  }


  goback=()=>{
  	// debugger
    this.setState({
      Modalstype:false,
    })
		this.props.Cancel()
		this.props.funlist()

  }


   setSaves=()=>{
  	// debugger
     let {projectvalue}=this.state;
     let taskid=this.props.taskid;
     let url="/graduation_tasks/"+taskid+"/graduation_works/relate_project.json";

     axios.post(url, {
         project_id: projectvalue
     }).then((result)=>{

				 this.goback()
           // this.setState({
           //   Modalstype:true,
           //   Modalstopval:result.data.message,
           //   ModalSave:this.goback,
           //   loadtype:true
           // })


     }).catch((error)=>{
       console.log(error)
     })
   }
  Saves=()=>{
    let {projectvalue,searchtypes}=this.state
		if(searchtypes===false){

    if(projectvalue===undefined||projectvalue===""){
      this.setState({
        projectvaluetype:true,
      })
    }else{
      this.setState({
        projectvaluetype:false,
      })
    }
    let taskid=this.props.taskid;
    console.log(this.props)
     let url="/graduation_tasks/"+taskid+"/graduation_works/check_project.json";
     axios.get(url, {
       params: {
         project_id: projectvalue
       }
     }).then((result)=>{

         if(result.data.is_relate===false){
              this.setSaves()
         }else{
           this.setState({
             Modalstype:true,
             Modalstopval:"该项目已被"+result.data.relate_user+"关联",
             ModalSave:this.ModalSave,
             loadtype:true
           })
         }

     }).catch((error)=>{
       console.log(error)
     })
		}else{
			this.goback()
		}

	}

  onChange = (e) => {

    this.setState({
      projectvalue: e.target.value,
    });

  }

  ModalSave=()=>{
    this.setState({
      Modalstype:false
    })
  }

  render(){
    let {
      Modalstype,
      Modalstopval,
      ModalCancel,
      ModalSave,
      loadtype,
      search,
      projects,
      projectvalue,
      projectvaluetype
    }=this.state;



    return(
      <div>
        {/*提示*/}
        <Modals
          modalsType={Modalstype}
          modalsTopval={Modalstopval}
          modalCancel={ModalCancel}
          modalSave={ModalSave}
          loadtype= {loadtype}

        />
        <Modal
          className={"HomeworkModal"}
          title={this.props.modalname}
          // visible={this.props.visible}
          visible={this.props.visible}
          closable={false}
          footer={null}
          keyboard={false}
          destroyOnClose={true}
        >
          <div className="task-popup-content">
						{this.state.searchtypes===false?  <p className="task-popup-text-center font-16">

              <Search
                placeholder="请输入项目名称进行搜索"
                id="subject_search_input"
                value={search}
                onInput={this.inputSearchValue}
                onSearch={this.searchValue}
                autoComplete="off"
              ></Search>

            </p>:""}
						<style>
							{
								`
									.project_namestyle{
									    width: 470px;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
									}
								`
							}
						</style>
						{this.state.searchtypes===false?<div className={"Association mb20"} style={{
							paddingLeft:'0px'
						}}>

              <RadioGroup onChange={this.onChange} value={projectvalue}>

                {projects&&projects.map((item,key)=>{
                  return(
                    <div key={key} style={{

                      height: '30px'
                    }}>
                      <Radio value={item.project_id} className="fl "></Radio>
                      <div className={"fl ml5 project_namestyle"}>{item.project_name}</div>
                    </div>
                  )
                })}

              </RadioGroup>

            </div>:

						<div style={{
							paddingLeft:'0px'
						}}>

		         <div className={"font-16"} style={{
		         	margin:'0px 17%'
						 }}>
							 你当前尚未管理任何项目，请先 <span><a className={"font-16"}  style={{color:'#1890ff'}} href={"/projects/new"} target="_blank">创建项目</a>  </span>再关联
						 </div>
						</div>}

            {projectvaluetype===true?<span className={"color-red ml20 "}>请先选择项目</span>:""}

            <div className="clearfix mt25 edu-txt-center mb10">
              <a  className="task-btn color-white mr80" onClick={this.props.Cancel}>取消</a>
              <a className="task-btn task-btn-orange" onClick={this.Saves}>确认</a>
            </div>

          </div>
        </Modal>
      </div>
    )
  }
}
export default Associationmodel;