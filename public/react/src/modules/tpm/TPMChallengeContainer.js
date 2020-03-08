import React, { Component } from 'react';
import { Redirect } from 'react-router';
import TPMChallenge from './TPMChallenge';
class TPMChallengeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tpmLoading: true,
      creator: {
        owner_id: '',
      }
    }
  }

    render() {
        const { tpmLoading } = this.props;
        const user = this.props.current_user;
        // console.log("TPMChallengeContainerTPMChallengeContainer");
			  // console.log(this.props);

			return (
          <React.Fragment>

              { tpmLoading ? <div style={{ minHeight: '886px'}}></div> :
              <TPMChallenge
                  {...this.props}
									is_jupyter={this.props.is_jupyter}
              >
              </TPMChallenge>
              }

          </React.Fragment>
        );
    }
}

export default TPMChallengeContainer;
