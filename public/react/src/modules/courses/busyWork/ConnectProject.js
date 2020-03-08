import React,{ Component } from "react";
import {Radio,Input ,Modal} from "antd";

import '../css/members.css'
import { WordsBtn } from 'educoder'
import axios from 'axios'
import InfiniteScroll from 'react-infinite-scroller';
import NoneData from "../coursesPublic/NoneData"

const Search =Input.Search;
const LIMIT = 15
class ConnectProject extends Component{
  constructor(props){
    super(props);
    this.state={
      project_flag:false,
      page: 1,
      loading: false,
      hasMore: true,
      keyword: ''
    }
  }
  componentDidMount() {
    
  }
  onSubmit = () => {
    const { radioValue, projects } = this.state;
    if (projects.length === 0) {
      this.closeConnectionProject()
      return;
    }

    if (!radioValue) {
      this.props.showNotification('请先在下面的列表中选择项目')
      return;
    }
    this.connectProject(radioValue)
  }
  connectProject = (project_id) => {
    let workId=this.work.homework_id;
    const url = `/homework_commons/${workId}/student_works/relate_project.json`
    axios.post(url, {
      project_id: project_id
    }).then((result)=>{
      if(result.data.status==0){
        this.closeConnectionProject()
        this.props.connectSuccess()
        this.props.showNotification('关联成功')
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  onSearchValue = () => {
    this.fetchData(1)
  }
  fetchData = (page = 1) => {
    // https://www.showdoc.cc/127895880302646?page_id=2032696709966819

    // https://www.showdoc.cc/page/edit/127895880302646/2228554041379772
    // /${this.props.current_user.user_id}
    const url = `/users/projects/search.json`
    this.setState({ loading: true })
    const { keyword } = this.state;
    axios.get(url, {
      params: {
        page: page,
        per_page: LIMIT,
        keyword: keyword
      }
    }).then((result)=>{
      if(result.status==200){
        this.setState({
          count: result.data.count,
          projects: page == 1 ? result.data.projects : this.state.projects.concat(result.data.projects),
          page: page,
          loading: false,
          hasMore: result.data.projects.length != 0
        })
        if (page == 1) {
          this.setState({ haveProjects: result.data.projects.length > 0 })
        }
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  //关联项目
  openConnectionProject=(work)=>{
    this.work = work;
    this.fetchData()
    this.setState({
      project_flag:true
    })
  }
  closeConnectionProject=()=>{
    this.setState({
      project_flag:false
    })
  }
  onChange = (e) => {
    this.setState({ radioValue: e.target.value })
  }

  render(){
    let {project_flag, projects, loading, hasMore, haveProjects }=this.state;
    return(
      <React.Fragment>
        <Modal
            visible={project_flag}
            title="关联项目"
            centered={true}
            closable={false}
            keyboard={false}
            width="600px"
            footer={null}
            destroyOnClose={true}
          >
            <style>{`
            .connectProject .ant-radio {
              float: left;
              line-height: 18px;
            }
            .connectProject .ant-radio-wrapper .name {
                max-width: 480px;
                display: inline-block; 
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .connectProject .ant-radio-wrapper>span:last-child {
              line-height: 18px;
            }

            `}</style>
            <div className="newupload_conbox clearfix connectProject">
              {
                (projects && !!projects.length || this.state.keyword) &&
                <div>
                  <Search placeholder="请输入项目名称进行搜索" className="with100"
                    value={this.state.keyword} onInput={(e) => {this.setState({keyword: e.target.value})}}
                    onSearch={this.onSearchValue}                  
                  ></Search>
                  <Radio.Group onChange={this.onChange} value={this.state.radioValue} className={"with100"}>
                    <div className="mt15" style={{"maxHeight":"228px","overflow-y":"auto", "overflow-x": 'hidden'}}>
                      <InfiniteScroll
                        threshold={20}
                        initialLoad={false}
                        pageStart={0}
                        loadMore={() => this.fetchData(this.state.page + 1)}
                        hasMore={!loading && hasMore}
                        useWindow={false}
                      >
                        { projects.map(item => {
                          return <p className="mb7" key={item.id}><Radio value={item.id}>
                            <span title={item.name.length > 12 ? item.name : ''} className="name">{item.name}</span>
                            </Radio></p>
                        })}
                      </InfiniteScroll>
                    </div>
                  </Radio.Group>
                </div>
              }
              {
                haveProjects && projects.length == 0 && 
                <NoneData></NoneData>
              }
              {
                (!haveProjects) &&
                <div className="edu-txt-center">
                  您当前尚未管理任何项目，请先<WordsBtn style="blue" className="" onClick={this.props.toCreateProject}>创建项目</WordsBtn>再关联
                </div>
              }
              

              <div className="mt30 marginauto clearfix edu-txt-center">
                <a onClick={this.closeConnectionProject} className="pop_close task-btn mr30">取消</a>
                <a className="task-btn task-btn-orange" onClick={this.onSubmit}>确定</a>
              </div>
            </div>
          </Modal>
      </React.Fragment>
    )
  }
}
export default ConnectProject;