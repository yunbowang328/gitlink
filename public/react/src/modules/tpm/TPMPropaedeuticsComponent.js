import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import TPMPropaedeutics from './TPMPropaedeutics'

import axios from 'axios';

class TPMPropaedeuticsComponent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        // tpmLoading: true,
        // creator: {
        //   owner_id: ''
        // }
      }
    }

    render() {
      const { tpmLoading } = this.props;

      return (
        <React.Fragment>
        { tpmLoading ? <div style={{ minHeight: '886px'}}></div> :
        <TPMPropaedeutics
            {...this.props}
						is_jupyter={this.props.is_jupyter}
        >
        </TPMPropaedeutics>
        }
        </React.Fragment>


      );
    }
}

export default  TPMPropaedeuticsComponent ;
