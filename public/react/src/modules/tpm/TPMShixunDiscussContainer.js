import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import TPMShixunDiscuss from './TPMShixunDiscuss'

import axios from 'axios';

class TPMShixunDiscussContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentWillReceiveProps(newProps, newContext) {

  }

  componentDidMount() {

  }

    render() {
        const { tpmLoading } = this.props;
        const user = this.props.current_user;
        return (
          <React.Fragment>
          { tpmLoading ? <div style={{ minHeight: '886px'}}></div> :
          <TPMShixunDiscuss
              {...this.props}
              {...this.state}
              user={user}
              aboutFocus={this.props.aboutFocus}
							is_jupyter={this.props.is_jupyter}
          >
          </TPMShixunDiscuss>
          }
          </React.Fragment>
        );
    }
}

export default TPMShixunDiscussContainer;
