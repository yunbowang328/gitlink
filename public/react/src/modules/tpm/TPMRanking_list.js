import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

import './TPMShixunDiscuss.css'

import Ranking_list from './shixunchild/Ranking_list/Ranking_list'
import TPMRightSection from './component/TPMRightSection'
import TPMNav from './component/TPMNav'

class TPMRanking_list extends Component {
    constructor(props) {
      super(props)

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
                {...this.props}
								is_jupyter={this.props.is_jupyter}
            ></TPMNav>

            <Ranking_list
                {...this.props}
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

export default TPMRanking_list;
