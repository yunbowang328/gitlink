import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import TPMForklist from './TPMForklist'

import axios from 'axios';

class TPMRanking_listContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tpmLoading: true,
      creator: {
        owner_id: ''
      }
    }
  }

  componentWillReceiveProps(newProps, newContext) {

  }

  componentDidMount() {
    this.props.showShixun();
  }


    render() {
        const { tpmLoading } = this.props;
        const user = this.props.current_user;
        return (
          <React.Fragment>
          { tpmLoading ? <div style={{ minHeight: '886px'}}></div> :
          <TPMForklist
              {...this.props}
              {...this.state}
              user={user}
              aboutFocus={this.props.aboutFocus}
							is_jupyter={this.props.is_jupyter}
          >
          </TPMForklist>
          }
          </React.Fragment>
        );
    }
}

export default TPMRanking_listContainer;
