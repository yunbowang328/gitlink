import React, { Component } from 'react';

import { SnackbarHOC, CNotificationHOC } from 'educoder';


import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Loadable from 'react-loadable';
import Loading from '../../Loading';
import { TPMIndexHOC } from '../tpm/TPMIndexHOC';
import NewFooter from "../tpm/NewFooter";

const PathsDetail = Loadable({
    loader: () => import('./PathDetail/PathDetailIndex'),
    loading:Loading,
})
const PathsNew = Loadable({
    loader: () => import('./PathNew'),
    loading:Loading,
})
// const Statistics = Loadable({
//     loader: () => import('./SchoolStatistics/Statistics'),
//     loading:Loading
// })
const Statistics = Loadable({
    loader: () => import('./statics'),
    loading: Loading
});

const ShixunPaths = Loadable({
    loader: () => import('./ShixunPaths'),
    loading:Loading,
})

class Index extends Component{
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <Switch {...this.props}>
                    <Route path="/paths/:pathId/statistics" component = {Statistics}  {...this.props} {...this.state}></Route>

                    <Route path="/paths/new"
                        render={(props)=>(<PathsNew {...this.props} {...this.state} {...props}/>)}
                    ></Route>
                    <Route path="/paths/:pathId/edit"
                        render={(props)=>(<PathsNew {...this.props} {...this.state} {...props}/>)}
                    ></Route>
                     {/*编辑页面*/}
										<Route path="/paths/:pathId"
													 render={(props)=>(<PathsDetail {...this.props} {...this.state} {...props}/>)}
										></Route>

                    {/*<Route path="/paths/:pathId" exact component = {PathsDetail}  {...this.props} {...this.state}></Route>*/}
										<Route path="/paths" exact
													 render={(props)=>(<ShixunPaths {...this.props} {...this.state} {...props}/>)}
										></Route>
                </Switch>
            </div>
        )
    }
}
export default CNotificationHOC() (SnackbarHOC() ( TPMIndexHOC(Index) ));