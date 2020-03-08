import React, { Component } from 'react';
import { SnackbarHOC } from 'educoder';
import { TPMIndexHOC } from '../modules/tpm/TPMIndexHOC';
import {Spin,Alert} from 'antd';

class ShowSpin extends Component{
  constructor(props) {
    super(props)
  }



  render() {
    let marigin={
      width: '100%',
      minHeight: '500px',
    }
    return (

          <Spin style={marigin}>

            <Alert
              style={marigin}
              type="info"
            />

          </Spin>

    )
  }
}

export default SnackbarHOC() ( TPMIndexHOC(ShowSpin) );