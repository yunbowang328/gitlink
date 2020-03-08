import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import TPMCollaborators from './TPMCollaborators'

import axios from 'axios';

class TPMChallengeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillReceiveProps(newProps, newContext) {

  }

  componentDidMount() {
    // this.props.showShixun();
  }



    render() {
        const { tpmLoading } = this.props;
        const user = this.props.current_user;
        return (
          <React.Fragment>
          { tpmLoading ? <div style={{ minHeight: '886px'}}></div> :
          <TPMCollaborators
              {...this.props}
              {...this.state}
              user={user}
              aboutFocus={this.props.aboutFocus}
							is_jupyter={this.props.is_jupyter}
          >
          </TPMCollaborators>
          }
          </React.Fragment>
        );
    }
}

export default TPMChallengeContainer;
