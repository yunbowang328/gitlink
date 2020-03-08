import React from "react";
import ReactDOM from "react-dom";
import { Drawer } from "antd";
import FloatButton from './FloatButton'
import PropTypes from 'prop-types';

class SecondDrawer extends React.Component {
  state = { visible: false, childrenDrawer: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  showSecondDrawer = () => {
    this.setState({
      childrenDrawer: true
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      childrenDrawer: false
    });
  };
  
  swtichFirstDrawer = () => {
    this.setState({
      visible: !this.state.visible,
      childrenDrawer: false
    });
  };
  componentDidMount() {
    this.setState({ visible: true }, () => {
      this.setState({ visible: false });
    });
  }
  render() {
    const { floatText, maskClosable, children, secondDrawerChildren, firstDrawerWidth, getSecondDrawerWidth
        ,firstDrawerClassName, secondDrawerClassName
       } = this.props
    const secondDrawerWidth = getSecondDrawerWidth();
    // 180  不知道为什么会偏移 180px
    return (
        <Drawer
          mask={!this.state.visible}
          title="　"
          width={this.state.childrenDrawer ? secondDrawerWidth + firstDrawerWidth - 180 : firstDrawerWidth}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          maskClosable={maskClosable}
          className={firstDrawerClassName}
          getContainer={false}
        >
          {/* <button type="primary" onClick={this.showSecondDrawer}>
            Two-level drawer
          </button> */}
          <FloatButton onClick={this.swtichFirstDrawer}>{floatText}</FloatButton>
          { children }
          
          <Drawer
            mask={false}
            title="　"
            width={secondDrawerWidth}
            closable={false}
            onClose={this.onChildrenDrawerClose}
            visible={this.state.childrenDrawer}
            className={secondDrawerClassName}

          >
            { secondDrawerChildren }
            {/* <button
              style={{
                marginRight: 8
              }}
              onClick={this.onChildrenDrawerClose}
            >
              Cancel
            </button> */}
          </Drawer>
        </Drawer>
    );
  }
}

SecondDrawer.propTypes = {
  floatText: PropTypes.string,
  maskClosable: PropTypes.bool,
  secondDrawerChildren: PropTypes.element,
};
// firstDrawerWidth={firstDrawerWidth}
// getSecondDrawerWidth={this.getSecondDrawerWidth}
export default SecondDrawer