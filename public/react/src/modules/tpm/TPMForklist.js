import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

import './TPMShixunDiscuss.css'

import Shixunfork_list from './shixunchild/Shixunfork_list'
import TPMRightSection from './component/TPMRightSection'
import TPMNav from './component/TPMNav'

class TPMForklist extends Component {
    constructor(props) {
      super(props)

    }

    componentWillReceiveProps(newProps, newContext) {

    }

    componentDidMount() {

    }



    render() {
      const { loadingContent, creator, shixun, myshixun, recommend_shixuns, current_user, watched,
        aboutFocus, user, match
       } = this.props;

      return (
      <React.Fragment>
      <div className="tpmComment educontent clearfix mt30 mb80">

        <div className="with65 fl edu-back-white commentsDelegateParent" >
            <TPMNav
                match={match}
                user={user}
                shixun={shixun}
                {...this.props}
								is_jupyter={this.props.is_jupyter}
            ></TPMNav>
        { loadingContent ?
          <CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '200px', display: 'block' }}/> :

          <Shixunfork_list/>
        }
        </div>

        <div className="with35 fr pl20">
          <TPMRightSection {...this.props}></TPMRightSection>
        </div>
      </div>
      </React.Fragment>

      );
    }
}

export default TPMForklist;
