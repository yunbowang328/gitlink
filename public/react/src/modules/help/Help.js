import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, Link } from 'react-router-dom';
import { Affix, Menu, Row, Col } from "antd";
import { SnackbarHOC } from 'educoder';

import './Help.css';

import CustomLoadable from "../../CustomLoadable";
import {TPMIndexHOC} from "../tpm/TPMIndexHOC";

const AboutUs = CustomLoadable(() => import('./AboutUs'));
const ContactUs = CustomLoadable(() => import('./ContactUs'));
const Cooperatives = CustomLoadable(() => import('./Cooperatives'));
const Agreement = CustomLoadable(() => import('./Agreement'));
const HelpCenter = CustomLoadable(() => import('./HelpCenter'));
const Feedback = CustomLoadable(() => import('./Feedback'));

class Help extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      type: props.match.params.type || 'about_us'
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match.params.type !== this.props.match.params.type){
      this.setState({ type: this.props.match.params.type });
    }
  }

  render() {
    return (
      <div className="newMain clearfix">
        <div className="educontent help-container">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={4}>
              <Affix offsetTop={20}>
                <div className="help-menu">
                  <Menu
                    mode="inline"
                    selectedKeys={[this.state.type]}>

                    <Menu.Item key="about_us"><Link to="/help/about_us">关于我们</Link></Menu.Item>
                    <Menu.Item key="contact_us"><Link to="/help/contact_us">联系我们</Link></Menu.Item>
                    <Menu.Item key="cooperatives"><Link to="/help/cooperatives">合作伙伴</Link></Menu.Item>
                    <Menu.Item key="agreement"><Link to="/help/agreement">服务协议</Link></Menu.Item>
                    <Menu.Item key="help_center"><Link to="/help/help_center">帮助中心</Link></Menu.Item>
                    <Menu.Item key="feedback"><Link to="/help/feedback">意见反馈</Link></Menu.Item>
                  </Menu>
                </div>
              </Affix>
            </Col>
            <Col span={20}>
              <div className="help-content">
                <Switch>
                  <Route path='/help/about_us' component={AboutUs}></Route>
                  <Route path='/help/contact_us' component={ContactUs}></Route>
                  <Route path='/help/cooperatives' component={Cooperatives}></Route>
                  <Route path='/help/agreement' component={Agreement}></Route>
                  <Route path='/help/help_center' component={HelpCenter}></Route>
                  <Route path='/help/feedback' render={ (props)=>(<Feedback {...this.props} {...props} {...this.state}></Feedback>) }></Route>
                  <Route component={AboutUs}/>
                </Switch>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default SnackbarHOC() (TPMIndexHOC  ( Help ));