import React, { Component } from 'react';

import Cropper from '../../common/components/Cropper'
import ChangeHeaderPicModal from '../user/account/ChangeHeaderPicModal'
class TestCrop extends Component {
  state = {
  };

  handleChange = (info) => {
  }

  render() {
    
    const props = this.props;
    return (
      <div>
        <button onClick={() => { this.refs['changeHeaderPicModal'].setVisible(true)}}>open</button>
        <ChangeHeaderPicModal ref="changeHeaderPicModal"></ChangeHeaderPicModal>
        <Cropper></Cropper>
      </div>
    );
  }
}

export default  (TestCrop);
