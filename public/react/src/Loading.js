import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { Spin } from 'antd';

class Loading extends Component {
  componentDidUpdate(prevProps, prevState) {
	if (!prevProps.error && this.props.error) {
		console.log(this.props.error)
		window.location.reload()
	}
  }
  
  render() {
  	// Loading
    return (
      <div className="App" style={{minHeight: '800px',width:"100%"}}>
				<style>
					{
						`
						 .margintop{
						   margin-top:20%;
						 }
						`
					}
				</style>
				<Spin size="large" className={"margintop"}/>
      </div>
    );
  }
}

export default Loading;
