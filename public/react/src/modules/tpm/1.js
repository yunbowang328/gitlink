import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import Comments from '../comment/Comments'

import { commentHOC } from '../comment/CommentsHOC'
import { CircularProgress } from 'material-ui/Progress';

import './TPMShixunDiscuss.css'

import TPMRightSection from './component/TPMRightSection'
import TPMNav from './component/TPMNav'

class TPMShixunDiscuss extends Component {
    constructor(props) {
      super(props)

    }

    componentWillReceiveProps(newProps, newContext) {
      if (newProps.shixun && newProps.shixun.id && (!this.props || !this.props.shixun || this.props.shixun.id != newProps.shixun.id) ) {
        window.document.title = newProps.shixun.name
        // this.props.fetchCommentIfNotFetched &&
        // this.props.fetchCommentIfNotFetched();
      }
    }

    componentDidMount() {
      // TODO 加了HOC后 mount了两次
      this.props.fetchCommentIfNotFetched &&
      this.props.fetchCommentIfNotFetched();
    }
    //

    onPaginationChange = (page) => {
      window.$("html,body").animate({"scrollTop":160})
      this.props.onPaginationChange(page)
    }

    render() {
      const { loadingComments, creator, shixun, myshixun, recommend_shixuns, current_user, watched,
        aboutFocus, user, match
       } = this.props;

      let _user = user;
      if (user) {
        _user = Object.assign({}, user);
        _user.user_url = `/users/${user.login}`
      }
      return (
        <React.Fragment>
        <div className="tpmComment educontent clearfix mt30 mb80">

          <div className="with65 fl edu-back-white commentsDelegateParent" >
              <TPMNav
                  match={match}
                  user={user}
                  shixun={shixun}
                  {...this.props}
              ></TPMNav>
          { loadingComments ?
            <CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '200px', display: 'block' }}/> :
            <Comments
              {...this.props}
              user={_user}
              onPaginationChange={this.onPaginationChange}
            ></Comments>
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

export default commentHOC( TPMShixunDiscuss );
