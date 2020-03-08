import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

import './TPMShixunDiscuss.css'

import Collaborators from './shixunchild/Collaborators/Collaborators'
import TPMRightSection from './component/TPMRightSection'
import TPMNav from './component/TPMNav'

class TPMCollaborators extends Component {
    constructor(props) {
      super(props)
    }


    render() {
      const { loadingContent, creator, shixun, myshixun, recommend_shixuns, current_user, watched,
        aboutFocus, user, match
       } = this.props;
      return (
      <React.Fragment>
        <div className="educontent clearfix mt30 mb80">

          <div className={" with65 fl "}>
              {/*<TPMNav*/}
              {/*    match={match}*/}
              {/*    user={user}*/}
              {/*    shixun={shixun}*/}
              {/*    {...this.props}*/}
							{/*		is_jupyter={this.props.is_jupyter}*/}
              {/*></TPMNav>*/}
            <Collaborators
             {...this.props}
            />

          </div>

          <div className="with35 fr pl20">
            <TPMRightSection
            {...this.props}
            />
          </div>
        </div>
      </React.Fragment>

      );
    }
}

export default TPMCollaborators;
