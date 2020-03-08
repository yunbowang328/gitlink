import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import TPMRanking_list from './TPMRanking_list'

import axios from 'axios';
import TPMNav from "./component/TPMNav";

class TPMRanking_listContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
      const { tpmLoading } = this.props;
      const user = this.props.current_user;

      return (
        <React.Fragment>
        { tpmLoading ? <div style={{ minHeight: '886px'}}></div> :
        <TPMRanking_list
            {...this.props}
            {...this.state}
            user={user}
            aboutFocus={this.props.aboutFocus}
						is_jupyter={this.props.is_jupyter}

				>
        </TPMRanking_list>
        }
        </React.Fragment>
      );
  }
}

export default TPMRanking_listContainer;
