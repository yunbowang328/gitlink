import React from 'react';
import PropTypes from 'prop-types';
import { Card } from "antd";
import axios from 'axios';

import { MarkdownToHtml } from 'educoder';

class Agreement extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      loading: true,
      content: null
    }
  }

  componentDidMount(){
    window.document.title = "服务协议";
    this.getContent();
  }

  getContent(){
    axios.get("/helps/agreement.json").then((result) => {
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
        <div className="agreement-container">
          <Card title="服务协议" bordered={false} loading={loading} style={{ minHeight: 600 }}>
            <div className="agreement-content">
              { content && <MarkdownToHtml content={content} selector="work_content" className=""></MarkdownToHtml> }
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Agreement;