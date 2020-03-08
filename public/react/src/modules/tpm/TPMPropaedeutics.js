import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

import './TPMShixunDiscuss.css'

import Propaedeutics from './shixunchild/Propaedeutics/Propaedeu_tics'

import TPMRightSection from './component/TPMRightSection'

import TPMNav from './component/TPMNav'

import axios from 'axios';

class TPMPropaedeutics extends Component {
    constructor(props) {
      super(props)
        this.state = {
            shixunId: undefined
        }
    }

    componentWillReceiveProps(newProps, newContext) {
    }

    componentDidMount() {


    }


    render() {
      const { loadingContent, creator, shixun, myshixun, recommend_shixuns, current_user, watched,
        aboutFocus, user, match
       } = this.props;
      // <Comments
          //   {...this.props}
          //   user={_user}
          //   onPaginationChange={this.onPaginationChange}
          // ></Comments>
      return (
      <React.Fragment>
      <div className="tpmComment educontent clearfix mt30 mb80">

        <div className="with65 fl edu-back-white commentsDelegateParent" >
            <TPMNav
                match={match}
                user={user}
                shixun={shixun}
                {...this.state}
                {...this.props}
								is_jupyter={this.props.is_jupyter}
            />

          <Propaedeutics
              {...this.props}
              {...this.state}
          />

        </div>

        <div className="with35 fr pl20">
          <TPMRightSection {...this.props}></TPMRightSection>
        </div>
      </div>
      </React.Fragment>

      );
    }
}

export default TPMPropaedeutics;
