import React, { Component } from 'react';
import { Redirect } from 'react-router';

import PropTypes from 'prop-types';

import { CircularProgress } from 'material-ui/Progress';

import './TPMShixunDiscuss.css'

import Challenges from './shixunchild/Challenges/Challenges'
import Challengesjupyter from './shixunchild/Challenges/Challengesjupyter'
import TPMRightSection from './component/TPMRightSection'

import TPMNav from './component/TPMNav'

class TPMChallenge extends Component {
    constructor(props) {
      super(props)

    }

    render() {
      const { loadingContent, shixun, user, match,jupyterbool,is_jupyter
       } = this.props;
      return (
        <React.Fragment>
          <div className="educontent clearfix mt30 mb80">

            <div className="with65 fl " >
                <TPMNav
                    match={match}
                    user={user}
                    shixun={shixun}
                    {...this.props}
										is_jupyter={this.props.is_jupyter}
                ></TPMNav>
							{
								is_jupyter===true?
									<Challengesjupyter
										{...this.props}
									/>
									:
									<Challenges
										{...this.props}
									/>
							}


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

export default TPMChallenge;
