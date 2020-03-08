import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Loading from '../../Loading';

import Loadable from 'react-loadable';

// import { TPMIndexHOC } from '../tpm/TPMIndexHOC';

import { SnackbarHOC, getImageUrl } from 'educoder';
import LoginRegisterComponent from './LoginRegisterComponent';
import FindPasswordComponent from './FindPasswordComponent';

class LoginRegisterPage extends Component {
    render() {
      // newMain clearfix
      return (
          <div className="">

            <LoginRegisterComponent {...this.props} {...this.state}></LoginRegisterComponent>
            <br></br>
            <br></br>
            <FindPasswordComponent {...this.props} {...this.state}></FindPasswordComponent>
          </div>
      );
    }
}

export default SnackbarHOC() (  ( LoginRegisterPage ));
