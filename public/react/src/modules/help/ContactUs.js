import React from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Col } from "antd";
import axios from 'axios';

import './ContactUs.css';

class ContactUs extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      contacts: null,
      address: null
    }
  }

  componentDidMount(){
    window.document.title = "联系我们";
    this.getData();
  }

  getData(){
    axios.get("/helps/contact.json").then((result) => {
      if(result){
        this.setState({
          contacts: result.data.contacts,
          address: result.data.address,
          loading: false
        })
      }
    }).catch((error) => {
      console.log(error);
      this.setState({ loading: false });
    })
  }

  render() {
    let { loading, contacts, address } = this.state;

    return (
      <div>
        <div className="contact-us-container">
          <Card title="联系我们" bordered={false} loading={loading} style={{ minHeight: 600 }}>
            <div className="contact-us-content">
              {
                contacts && contacts.map((item, _key) => {
                  return (
                    <div className="contact-item">
                      <div className="contact-item-label">{ item.type }</div>
                      <div className="contact-item-content">
                        <Row>
                          <Col span={12}>{ item.name }</Col>
                        </Row>
                        <Row>
                          <Col span={2}>QQ：</Col>
                          <Col span={10}>{ item.qq }</Col>
                        </Row>
                        <Row>
                          <Col span={2}>Email：</Col>
                          <Col span={10}>{ item.mail }</Col>
                        </Row>
                      </div>
                    </div>
                  )
                })
              }
              {
                address && (
                  <div className="contact-item">
                    <div className="contact-item-label">公司地址</div>
                    <div className="contact-item-content">
                      <Row>
                        <Col span={12}>长沙高新开发区尖山路39号长沙中电软件园一期13栋201室</Col>
                      </Row>
                    </div>
                  </div>
                )
              }
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default ContactUs;