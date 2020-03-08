import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "antd";
import axios from 'axios';

import { MarkdownToHtml } from 'educoder';

class AboutUs extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      content: null
    }
  }

  componentDidMount(){
    window.document.title = "关于我们";
    this.getContent();
  }

  getContent(){
    axios.get("/helps/about.json").then((result) => {
      if(result){
        this.setState({
          content: result.data.content,
          loading: false
        })
      }
    }).catch((error) => {
      console.log(error);
      this.setState({ loading: false });
    })
  }

  render() {
    let { loading, content } = this.state;

    return (
      <div>
        <div className="about-us-container">
          <Card title="关于我们" bordered={false} loading={loading} style={{ minHeight: 600 }}>
            <div className="about-us-content">
              { content && <MarkdownToHtml content={content} selector="work_content" className=""></MarkdownToHtml> }
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default AboutUs;