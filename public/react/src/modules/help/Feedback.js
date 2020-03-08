import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Form } from "antd";

import "./Feedback.css";

import FeedbackForm from './FeedbackForm';
const NewFeedbackForm = Form.create({ name: 'feedback_form' })(FeedbackForm);

class Feedback extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidMount() {
    window.document.title = "意见反馈";
  }

  componentDidUpdate(prevProps) {
    if (prevProps.current_user !== this.props.current_user) {
      if(!this.props.checkIfLogin()) {
        this.props.showLoginDialog();
      }
    }
  }

  render() {
    return (
      <div>
        <div className="feedback-container">
          <Card title="意见反馈" bordered={false} style={{ minHeight: 600 }}>
            <div className="feedback-content ml20">
              <div className="feedback-message mb20">
                想对我们的平台提供功能建议？<br/>
                发现网页中的问题或bug想告诉我们？<br/>
                期望与我们展开合作？<br/>
                在这里把你想说的一切告诉我们吧？
              </div>
              <div className="feedback-help color-orange mb20">* <Link to="/help/help_center" className="color-orange">看看帮助中心是否有你想要的答案</Link></div>

              <NewFeedbackForm {...this.props}/>
            </div>
          </Card>
        </div>
      </div>
    )
  }
}

export default Feedback;