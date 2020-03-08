import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Row, Col ,Menu,Popover,Button} from 'antd';

import Loading from '../../Loading';

import Loadable from 'react-loadable';

import { TPMIndexHOC } from './TPMIndexHOC';

import { SnackbarHOC } from 'educoder';

import TPMBanner from './TPMBanner';

import axios from 'axios';

import TPMShixunDiscussContainer from './TPMShixunDiscussContainer';

import TPMRepositoryComponent from './TPMRepositoryComponent';

import TPMRepositoryCommits from './shixunchild/Repository/TPMRepositoryCommits';

import TPMsettings from './TPMsettings/TPMsettings';

import TPMChallengeComponent from './TPMChallengeContainer';
import TPMPropaedeuticsComponent from './TPMPropaedeuticsComponent';
import TPMRanking_listComponent from './TPMRanking_listContainer';
import TPMCollaboratorsComponent from './TPMCollaboratorsContainer';
import Audit_situationComponent from './Audit_situationComponent';
import TPMDataset from './TPMDataset';
import TPMNav from './component/TPMNav';

import '../page/tpiPage.css';

//任务
// const TPMChallengeComponent = Loadable({
//   loader: () => import('./TPMChallengeContainer'),
//   loading: Loading,
//   })

//背景知识
// const TPMPropaedeuticsComponent = Loadable({
//   loader: () => import('./TPMPropaedeuticsComponent'),
//   loading: Loading,
//   })

//版本库
// const TPMRepositoryComponent = Loadable({
//   loader: () => import('./TPMRepositoryComponent'),
//   loading: Loading,
//   })

// const TPMRepositoryComponent = Loadable({
//   loader: () => import('./TPMRepositoryComponent'),
//   loading: Loading,
//   })

//合作
// const TPMCollaboratorsComponent = Loadable({
// loader: () => import('./TPMCollaboratorsContainer'),
// loading: Loading,
// })


//评论
// const TPMShixunDiscussComponent = Loadable({
//   loader: () => import('./TPMShixunDiscussContainer'),
//   loading: Loading,
//   })

//排行版
// const TPMRanking_listComponent = Loadable({
// loader: () => import('./TPMRanking_listContainer'),
// loading: Loading,
// })

// //编辑实训
// const TPMModifysettings = Loadable({
//   loader: () =>import('./modules/tpm/TPMsettings/TPMsettings'),
//   loading: Loading,
//   })

//新建实训
const TPMchallengesnew = Loadable({
    loader: () => import('./challengesnew/TPMchallengesnew'),
    loading: Loading,
})
//新建实训
// const TPMchallengesnew = Loadable({
//   loader: () => import('./challengesnew/TpmTask/TpmTaskIndex'),
//   loading: Loading,
// })

//新建tab2
const TPMevaluation = Loadable({
    loader: () => import('./challengesnew/TPMevaluation'),
    loading: Loading,
})

//新建tab3答案
// const TPManswer = Loadable({
//     loader: () => import('./challengesnew/TPManswer'),
//     loading: Loading,
// })
const TPManswer = Loadable({
    loader: () => import('./challengesnew/TPManswer2'),
    loading: Loading,
})

//选择题
const TPMquestion = Loadable({
    loader: () => import('./challengesnew/TPMquestion'),
    loading: Loading,
})

//fork列表
const TPMFork_listComponent = Loadable({
    loader: () => import('./TPMFork/TPMForklist'),
    loading: Loading,
})
//背景知识修改
const TPMUpdatepropaede = Loadable({
    loader: () => import('./TPMUpdatepropaede/TPMUpdatepropaede'),
    loading: Loading,
})



// 版本库添加文件
const AddFile = Loadable({
	loader: () => import('./shixunchild/Repository/RepositoryAddFile'),
	loading: Loading,
})

const interceptorUrlArray = ['repository.json', 'commits.json', 'propaedeutics.json'
    , 'challenges.json', 'discusses.json', 'ranking_list.json', 'collaborators.json']
const cacheInterceptorUrlMap = {}
class TPMIndex extends Component {
    constructor(props) {
      super(props)
      this.state = {
          loadingContent: false,
          power: false,
          shixunsDetails: {},
          shixunId: undefined,
          star_info: [0, 0, 0, 0, 0, 0],
          star_infos: [0, 0, 0, 0, 0, 0],
          identity:undefined,
          TPMRightSectionData:undefined,
          PropaedeuticsList: undefined,
				  tpmindexjupyterbool:false,
				  is_jupyter:false,
          selectedKeys:"",
          openknows:false
      }
    }

    openknow=()=>{
      let storage=window.localStorage;
      this.setState({
        openknows:false
      })
      let newTPMsettings=this.props.user&&this.props.user.user_id+'newTPMsettings'
      storage.setItem(newTPMsettings,false);
    }


  componentDidUpdate(prevProps, prevState) {
    if (prevProps!=this.props) {
        if(this.props.user&&this.props.user.user_id){
          let getnewTPMsettings=this.props.user&&this.props.user.user_id+'newTPMsettings';
          let newTPMsettings=window.localStorage.getItem(getnewTPMsettings)
          if(newTPMsettings===undefined||newTPMsettings===false||newTPMsettings===null){
            this.setState({
              openknows:false
            })
          }else{
            this.setState({
              openknows:false
            })
          }
        }
      }
    }

    getcomponentdidmount=()=>{
      let userid=this.props.user&&this.props.user.user_id;
      let getnewTPMsettings=this.props.user&&this.props.user.user_id+'newTPMsettings';
      let newTPMsettings=window.localStorage.getItem(getnewTPMsettings)
      let id = this.props.match.params.shixunId;
      // console.log('props', this.props);
      // let collaborators = `/shixuns/` + id + `/propaedeutics.json`;
      //
      // axios.get(collaborators).then((response) => {
      //     if (response.status === 200) {
      //         if (response.data.status === 403||response.data.status === 401||response.data.status === 500) {
      //
      //         }else{
      //             this.setState({
      //                 PropaedeuticsList: response.data,
      //                 shixunId: id
      //             });
      //         }
      //
      //     }
      // }).catch((error) => {
      //     console.log(error)
      // });
      let Url = `/shixuns/` + id + `.json`;
      axios.get(Url).then((response) => {
        if (response.status === 200) {
          document.title=response.data.name;
          let newstar_info = [];
          // let start1=
          for (var i = 0; i < response.data.score_info.length; i++) {

            if (i === 0) {
              newstar_info.push(response.data.score_info[i])
            } else {
              newstar_info.push((response.data.score_info[i] / 100) * 5)
            }
          }
          let newstar_infos = response.data.score_info;
          this.setState({
            shixunsDetails: response.data,
            shixunId: id,
            star_info: newstar_info,
            star_infos: newstar_infos,
            power: response.data.power,
            identity: response.data.identity,
            propaedeutics:response.data.propaedeutics,
            status: response.data.shixun_status,
            secret_repository: response.data.secret_repository,
            public:response.data.public,
            is_jupyter:response.data.is_jupyter=== undefined||response.data.is_jupyter===null?false:response.data.is_jupyter,
          });

          if(userid){
            if(response.data.identity <4){
              if(newTPMsettings===undefined||newTPMsettings===false||newTPMsettings===null){
                console.log()
                this.setState({
                  openknows:true
                })
              }else{
                this.setState({
                  openknows:false
                })
              }
            }
          }

        }
      }).catch((error) => {
        this.setState({
          shixunsDetails: undefined,
          shixunId:  undefined,
          star_info:  undefined,
          star_infos:  undefined,
          power:  undefined,
          identity:  undefined,
          status: undefined,
          propaedeutics:undefined,
          is_jupyter:false,
        });
      });

      this.tpmContentRequestInterceptor = axios.interceptors.request.use((config) => {
        let url = config.url;
        // console.log('tpmContentRequestInterceptor:', url)
        for ( let i = 0; i < interceptorUrlArray.length; i++ ) {
          if (url.indexOf(interceptorUrlArray[i]) != -1) {
            url = url.split('?')[0]
            console.log('loadingContent, url:', url)

            this.setState({ loadingContent: false })

            cacheInterceptorUrlMap[url] = true
          }
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      });

      // Add a response interceptor
      this.tpmContentResponseInterceptor = axios.interceptors.response.use((response) => {
        // console.log('loadingContent finished, url:', response.config.url)
        // TODO 依赖了api这个前缀
        let url = response.config.url.split('api')[1];
        url = url.split('?')[0]
        if (cacheInterceptorUrlMap[url]) {

          this.setState({ loadingContent: false })
          delete cacheInterceptorUrlMap[response.url]
        }
        return response;
      }, function (error) {
        // Do something with response error
        return Promise.reject(error);
      });
      //右侧数据
      let shixunsDetailsURL=`/shixuns/`+id+`/show_right.json`;
      axios.get(shixunsDetailsURL).then((response)=> {
        if(response.data){

        }
        this.setState({
          TPMRightSectionData: response.data
        });
      })
      this.getnavdatas()
    }
    componentDidMount = () => {
        this.getcomponentdidmount()

    }

    componentWillUnmount = () => {
      axios.interceptors.request.eject(this.tpmContentRequestInterceptor);
      this.tpmContentRequestInterceptor = null;
      axios.interceptors.request.eject(this.tpmContentResponseInterceptor);
      this.tpmContentResponseInterceptor = null;
      // this.getnavdatas()
    }

    setLoadingContent = (isLoadingContent) => {
        // this.setState({ loadingContent: isLoadingContent })
    }


    getnavdatas=()=>{
      let selectedKeys;
      const {location} = this.props;
      if(location.pathname.indexOf('/challenges')!=-1){
        selectedKeys="1"
      }else if(location.pathname.indexOf('/propaedeutics')!=-1){
        selectedKeys="2"
      }else if(location.pathname.indexOf('/repository')!=-1){
        selectedKeys="3"
      }else if(location.pathname.indexOf('/secret_repository')!=-1){
        selectedKeys="4"
      } else if(location.pathname.indexOf('/collaborators')!=-1){
        selectedKeys="5"
      }else if(location.pathname.indexOf('/dataset')!=-1){
        selectedKeys="6"
      }else if(location.pathname.indexOf('/shixun_discuss')!=-1){
        selectedKeys="7"
      }else if(location.pathname.indexOf('/ranking_list')!=-1){
        selectedKeys="8"
      }else if(location.pathname.indexOf('/settings')!=-1){
        selectedKeys="9"
      }
      this.setState({
        selectedKeys:selectedKeys
      })
    }

  handleClick=(e)=>{

    this.setState({
      selectedKeys: e.key,
    });
    let id = this.props.match.params.shixunId;
    if(e.key==="1"){
      this.props.history.replace(`/shixuns/${id}/challenges`);
    }else if(e.key==="2"){
      this.props.history.replace(`/shixuns/${id}/propaedeutics`);
    }else if(e.key==="3"){
      this.props.history.replace(`/shixuns/${id}/repository`);
    }else if(e.key==="4"){
      this.props.history.replace(`/shixuns/${id}/secret_repository`);
    }else if(e.key==="5"){
      this.props.history.replace(`/shixuns/${id}/collaborators`);
    }else if(e.key==="6"){
      this.props.history.replace(`/shixuns/${id}/dataset`);
    }else if(e.key==="7"){
      this.props.history.replace(`/shixuns/${id}/shixun_discuss`);
    }else if(e.key==="8"){
      this.props.history.replace(`/shixuns/${id}/ranking_list`);
    }else if(e.key==="9"){
      this.props.history.replace(`/shixuns/${id}/settings`);
    }
  }
  	render() {

        let url = window.location.href;
        let flag = url.indexOf("add_file")>-1;

        return (
            <div className="newMain clearfix">
							  {/*头部*/}
                {
                    !flag &&
                    <TPMBanner
                        {...this.props}
                        {...this.state}
												is_jupyter={this.state. is_jupyter}
                    ></TPMBanner>
                }


                <style>
                  {
                    `
                     .ant-menu-item{
                         margin:0 40px 0 0;
                         padding:0px;
                     }       
                     .ant-popover{
                       z-index:1000 !important;
                      }
                    `
                  }
                </style>
              <Row type="flex" className={"backgroudwhite"}>
                  <div className={"educontent clearfix"}>
                    <Col span={24}>

                      <Menu onClick={this.handleClick} selectedKeys={[this.state.selectedKeys]} mode="horizontal">

                        <Menu.Item key="1" className={"competitionmr50"}>
                          <span className={"tpmbannernavstyler"}>任务</span>
                        </Menu.Item>

                        {	this.state.propaedeutics===undefined?"":this.state.propaedeutics===false?"":<Menu.Item key="2" className={"competitionmr50"}>
                          <span className={"tpmbannernavstyler"}>背景知识</span>
                        </Menu.Item>}

                        { this.state.identity >4||this.state.identity===undefined ?"":
                          this.state.is_jupyter===false?<Menu.Item key="3" className={"competitionmr50"}>
                            <span className={"tpmbannernavstyler"}>版本库</span>
                          </Menu.Item>:""}

                        {this.state.identity >4||this.state.identity===undefined ?"":	this.state.secret_repository && <Menu.Item key="4" className={"competitionmr50"}>
                          <span className={"tpmbannernavstyler"}>私密版本库</span>
                        </Menu.Item>}

                        <Menu.Item key="5" className={"competitionmr50"}>
                          <span className={"tpmbannernavstyler"}>合作者</span>
                        </Menu.Item>

                        {	this.state.identity >4||this.state.identity===undefined ? "":this.state.is_jupyter===true?<Menu.Item key="6" className={"competitionmr50"}>
                          <span className={"tpmbannernavstyler"}>数据集</span>
                        </Menu.Item>:""}

                        {	this.state.is_jupyter===false?<Menu.Item key="7" className={"competitionmr50"}>
                          <span className={"tpmbannernavstyler"}>评论</span>
                        </Menu.Item>:""}

                        {	this.state.is_jupyter===false? <Menu.Item key="8" className={"competitionmr50"}>
                          <span className={"tpmbannernavstyler"}>排行榜</span>
                        </Menu.Item>:""}
                        {/*{this.state.identity >4||this.state.identity===undefined ? "":this.state.openknows===true?<span>*/}
                        {/* <Popover*/}
                        {/*      content={*/}
                        {/*        <pre className={"bannerpd201"}>*/}
                        {/*          <div>更多设置在这里，点击“配置”看一看~</div>*/}
                        {/*          <div className={"wechatcenter mt15"}><Button  type="primary" onClick={this.openknow} >我知道了</Button></div>*/}
                        {/*        </pre>*/}
                        {/*      }*/}
                        {/*      trigger="click"*/}
                        {/*      placement="top"*/}
                        {/*      visible={this.state.openknows}*/}
                        {/*    >*/}
                        {/*  </Popover>*/}
                        {/*</span>:""}*/}

                        {this.state.identity >4||this.state.identity===undefined ? "":
                          <Menu.Item key="9" className={"competitionmr50"}>
                              <span className={"tpmbannernavstyler"}>配置</span>
                          </Menu.Item>
                        }

                        {this.state.identity >2||this.state.identity===undefined?"":
                          <div className={"fr"}>
                            <Link to={`/shixuns/${this.props.match.params.shixunId}/audit_situation`}
                                  className={`${this.props.match.url.indexOf('audit_situation') != -1 ? 'font-16 audit_situationactive' : 'font-16 audit_situationactive'} fl`}>审核情况</Link>
                          </div>
                        }
                      </Menu>
                    </Col>
                  </div>
              </Row>

                   {/*筛选*/}
							  {/*{*/}
								{/*	tpmindexjupyterbool===false?*/}

								{/*		:""*/}
								{/*}*/}
							{/*	*/}

                  <Switch {...this.props}>

                  <Route path="/shixuns/:shixunId/repository/:repoId/commits" render={
                      (props) => (<TPMRepositoryCommits {...this.props} {...this.state} {...props} is_jupyter={this.state.is_jupyter}
                        />)
                    }></Route>
                 <Route path="/shixuns/:shixunId/secret_repository/:repoId/commits" render={
                      (props) => (<TPMRepositoryCommits {...this.props} {...this.state} {...props} secret_repository_tab={true} is_jupyter={this.state.is_jupyter}
                        />)
                    }></Route>
                    {/*任务*/}
                    <Route exact path="/shixuns/:shixunId/challenges" render={
                      (props) => (<TPMChallengeComponent {...this.props}  {...this.state} {...props} is_jupyter={this.state.is_jupyter}
                        />)
                    }></Route>

                    <Route path="/shixuns/:shixunId/repository/add_file" render={
                            (props) => (<AddFile {...this.props} {...this.state} {...props}
                            />)
                    }></Route>

                    <Route path="/shixuns/:shixunId/repository" render={
                        (props) => (<TPMRepositoryComponent {...this.props} {...this.state} {...props} is_jupyter={this.state.is_jupyter}
                        />)
                    }></Route>
                    <Route path="/shixuns/:shixunId/secret_repository" render={
                        (props) => (<TPMRepositoryComponent {...this.props} {...this.state} {...props} secret_repository_tab={true} is_jupyter={this.state.is_jupyter}
                        />)
                    }></Route>

                    {/* <Route exact path="/shixuns/:shixunId/propaedeutics" component={TPMPropaedeuticsComponent}></Route> */}

                    <Route exact path="/shixuns/:shixunId/propaedeutics" render={
                      (props) => (<TPMPropaedeuticsComponent {...this.props} {...this.state} {...props} is_jupyter={this.state.is_jupyter}
                        />)
                    }></Route>


                    <Route exact path="/shixuns/:shixunId/collaborators" render={
                      (props) => (<TPMCollaboratorsComponent {...this.props} {...this.state} {...props} is_jupyter={this.state.is_jupyter}
                        />)
                    }></Route>


                    {/* <Route exact path="/shixuns/:shixunId/repository/:shixunId/" component={TPMRepositoryComponent}></Route> */}


                    <Route path="/shixuns/:shixunId/shixun_discuss" render={
                      (props) => (<TPMShixunDiscussContainer {...this.props} {...this.state} {...props} is_jupyter={this.state.is_jupyter}
                        initForumState={(data)=>this.initForumState(data)}
                        setSearchValue={this.setSearchValue}
                        setHotLabelIndex={this.setHotLabelIndex}
                        />)
                    }></Route>


                    <Route path="/shixuns/:shixunId/settings" render={
                      (props) => (<TPMsettings {...this.props} {...this.state} {...props} />)
                    }></Route>

                     {/*实训项目条目塞选*/}
                    <Route exact path="/shixuns/:shixunId/ranking_list" render={
                      (props) => (<TPMRanking_listComponent {...this.props} {...this.state} {...props} is_jupyter={this.state.is_jupyter}
                        />)
                    }></Route>
                    {/*合作者*/}
										<Route exact path="/shixuns/:shixunId/dataset" render={
											(props) => (<TPMDataset {...this.props} {...this.state} {...props} is_jupyter={this.state.is_jupyter}
											/>)
										}></Route>

										<Route exact path="/shixuns/:shixunId/audit_situation" render={
											(props) => (<Audit_situationComponent {...this.props} {...this.state} {...props} is_jupyter={this.state.is_jupyter}
											/>)
										}></Route>

                  <Route exact path="/shixuns/:shixunId/fork_list" render={
                      (props) => (<TPMFork_listComponent {...this.props} {...props}
                      />)
                  }></Route>

                  <Route exact path="/shixuns/:shixunId/update_propaedeutics" render={
                      (props) => (<TPMUpdatepropaede {...this.props} {...props}
                      />)
                  }></Route>

                  {/*评测设置*/}
                  <Route path="/shixuns/:shixunId/challenges/:checkpointId/tab=2" render={
                      (props) => (<TPMevaluation {...this.props}  {...props} {...this.state}/>)
                  }></Route>


                  {/*参考答案*/}
                  <Route path="/shixuns/:shixunId/challenges/:checkpointId/tab=3" render={
                      (props) => (<TPManswer {...this.props}  {...props} {...this.state}/>)
                  }></Route>

                  {/*新建关卡*/}
                  <Route path="/shixuns/:shixunId/challenges/new" render={
                      (props) => (<TPMchallengesnew {...this.props} {...props}  {...this.state}/>)
                  }></Route>

                  {/*编辑关卡*/}
                  <Route path="/shixuns/:shixunId/challenges/:checkpointId/editcheckpoint" render={
                      (props) => (<TPMchallengesnew {...this.props} {...props} {...this.state} />)
                  }></Route>

                  {/*新建选择题*/}
                  <Route path="/shixuns/:shixunId/challenges/newquestion" render={
                      (props) => (<TPMquestion {...this.props}  {...props} {...this.state} />)
                  }></Route>

                  {/*修改选择题*/}
                  <Route path="/shixuns/:shixunId/challenges/:checkpointId/editquestion/:choose_id" render={
                      (props) => (<TPMquestion {...this.props}  {...props} {...this.state}/>)
                  }></Route>

                  {/*修改选择题*/}
                  <Route path="/shixuns/:shixunId/challenges/:checkpointId/editquestion" render={
                      (props) => (<TPMquestion {...this.props}  {...props} {...this.state}/>)
                  }></Route>

									<Route exact path="/shixuns/:shixunId" render={
											(props) => (<TPMChallengeComponent {...this.props} {...this.state} {...props} 	is_jupyter={this.state.is_jupyter}
											/>)
									}></Route>


                      {/*<Route exact path="/shixuns/:shixunId" component={TPMChallengeComponent}></Route>*/}
                  </Switch>

            </div>
	    );
  	}
}

export default SnackbarHOC() (TPMIndexHOC  ( TPMIndex ));
