import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

import './TPMShixunDiscuss.css'

import Repository from './shixunchild/Repository/Repository'
import TPMRightSection from './component/TPMRightSection'
import TPMNav from './component/TPMNav'

// import RepositoryChooseModal from './component/modal/RepositoryChooseModal'

class TPMRepository extends Component {
    constructor(props) {
      super(props)
    }


    render() {
      const { loadingContent, creator, shixun, myshixun, recommend_shixuns, current_user, watched,
        aboutFocus, user, match, isContentWidth100
       } = this.props;

      return (
      <React.Fragment>
      <div className="tpmComment educontent clearfix mt30 mb80">
        {/* 可能会影响到其他页面的样式，需要测试、协商 */}
        <div className={`${isContentWidth100 ? 'width100': 'with65'} fl edu-back-white`}
            style={{background: 'transparent'}}>
            <TPMNav
                match={match}
                user={user}
                shixun={shixun}
                {...this.props}
								is_jupyter={this.props.is_jupyter}
            ></TPMNav>
            {/* <RepositoryChooseModal {...this.props}></RepositoryChooseModal> */}
        { loadingContent ?
          <CircularProgress size={40} thickness={3} style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '200px', display: 'block' }}/> :
          <Repository
            {...this.props}
          />
        }
        </div>

        { !isContentWidth100 && <div className="with35 fr pl20">
          <TPMRightSection {...this.props}></TPMRightSection>
        </div>}
      </div>
      </React.Fragment>

      );
    }
}

export default TPMRepository;
