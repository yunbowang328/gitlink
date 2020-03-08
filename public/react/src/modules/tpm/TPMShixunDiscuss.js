import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

import './TPMShixunDiscuss.css'

import ShixunDiscuss from './shixunchild/ShixunDiscuss/ShixunDiscuss'
import TPMRightSection from './component/TPMRightSection'
import TPMNav from './component/TPMNav'

import Comments from '../comment/Comments'
import { commentHOC } from '../comment/CommentsHOC'

class TPMShixunDiscuss extends Component {
    constructor(props) {
      super(props)

    }

    componentWillReceiveProps(newProps, newContext) {
    }

    componentDidMount() {
      // TODO 加了HOC后 mount了两次
      this.props.fetchCommentIfNotFetched &&
      this.props.fetchCommentIfNotFetched();
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
          <Comments
            {...this.props}
            user={user}
            showHiddenButton={true}
          ></Comments>
          // onPaginationChange={this.onPaginationChange}
          // <ShixunDiscuss
          //  {...this.props}
          // />
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

export default commentHOC ( TPMShixunDiscuss );
