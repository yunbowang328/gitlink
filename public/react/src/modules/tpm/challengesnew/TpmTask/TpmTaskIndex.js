import React, {Component} from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Loadable from 'react-loadable';

import Loading from "../../../../Loading";

import Bottomsubmit from "../../../modals/Bottomsubmit";


const TPMchallengestask = Loadable({
    loader: () => import('../../challengesnew/TPMchallengesnew'),
    loading: Loading,
})

export default class TpmTaskIndex extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  componentDidMount() {

  }


  render() {
    // console.log(a.indexOf("vnc"))
    // console.log(b.indexOf("vnc"))

    return (

      <div>
        <Switch {...this.props}>
          {/*新建关卡*/}
          <Route path="/shixuns/:shixunId/challenges/new" render={
            (props) => (<TPMchallengestask {...this.props} {...props}  {...this.state}/>)
          }></Route>

          {/*编辑关卡*/}
          <Route path="/shixuns/:shixunId/challenges/:checkpointId/editcheckpoint" render={
            (props) => (<TPMchallengestask {...this.props} {...props} {...this.state} />)
          }></Route>
        </Switch>
      </div>

    );
  }
}


