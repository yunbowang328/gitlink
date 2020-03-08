import React , { Component } from 'react';
import { Link , Route , Switch } from 'react-router-dom';

import '../css/index.css';
import './setting.css';

import Loadable from 'react-loadable';
import Loading from '../../Loading';

const Branch = Loadable({
	loader: () => import('./Branch'),
	loading: Loading,
})
const Setting = Loadable({
	loader: () => import('./Setting'),
	loading: Loading,
})
const Collaborator = Loadable({
	loader: () => import('./Collaborator'),
	loading: Loading,
})
class Index extends Component{
  render(){
    const { projectsId } = this.props.match.params;
    console.log(this.props);
    const { pathname } = this.props.history.location;

    const flag = (pathname === `/projects/${projectsId}/setting`);
    return(
      <div>
        <ul className="settingNav">
          <li className={flag?"active":""}><Link to={`/projects/${projectsId}/setting`}>仓库</Link></li>
          <li className={pathname.indexOf('setting/collaborator')>-1?"active":""}><Link to={`/projects/${projectsId}/setting/collaborator`}>协作者</Link></li>
          {/* <li className={pathname.indexOf('setting/branch')>-1?"active":""}><Link to={`/projects/${projectsId}/setting/branch`}>分支列表</Link></li> */}
        </ul>
        <div className="main">
          <Switch {...this.props}>
            {/* 分支列表 */}
            {/* <Route path="/projects/:projectsId/setting/branch"
              render={
                (props) => (<Branch {...this.props} {...props} {...this.state}/>)
              }
            ></Route> */}
            {/* 协作者 */}
            <Route path="/projects/:projectsId/setting/collaborator"
              render={
                (props) => (<Collaborator {...this.props} {...props} {...this.state}/>)
              }
            ></Route>
            {/* 修改仓库信息 */}
            <Route path="/projects/:projectsId/setting"
              render={
                (props) => (<Setting {...this.props} {...props} {...this.state}/>)
              }
            ></Route>
          </Switch>
        </div>
      </div>
    )
  }
}
export default Index;