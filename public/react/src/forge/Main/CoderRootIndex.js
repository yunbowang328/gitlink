import React , { Component } from 'react';
import { Route , Switch , Link} from 'react-router-dom';

import Loadable from 'react-loadable';
import Loading from '../../Loading';


const CoderRootDirectory = Loadable({
	loader: () => import('./CoderRootDirectory'),
	loading: Loading,
})
const CoderRootCommit = Loadable({
	loader: () => import('./CoderRootCommit'),
	loading: Loading,
})
const CoderRootFileDetail = Loadable({
	loader: () => import('./CoderRootFileDetail'),
	loading: Loading,
})
const CoderRootBranch = Loadable({
	loader: () => import('./CoderRootBranch'),
	loading: Loading,
})
class CoderRootIndex extends Component{
  
  render(){

    return(
      <div className="main">
        <Switch {...this.props}>
          <Route path="/projects/:projectsId/coder/commit"
            render={
              (props) => (<CoderRootCommit {...this.props} {...props} {...this.state} />)
            }
          ></Route>
          <Route path="/projects/:projectsId/coder/branch"
            render={
              (props) => (<CoderRootBranch {...this.props} {...props} {...this.state} />)
            }
          ></Route>
          <Route path="/projects/:projectsId/coder"
            render={
              (props) => (<CoderRootDirectory {...this.props} {...props} {...this.state} />)
            }
          ></Route>
          <Route path="/projects/:projectsId"
            render={
              (props) => (<CoderRootDirectory {...this.props} {...props} {...this.state} />)
            }
          ></Route>
        </Switch>
      </div>
    )
  }
}
export default CoderRootIndex;