import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class NotFoundPage extends Component {
  render() {
    return (
      <div className="App">
        404 Page
          <br></br>
        　
        <Link to="/tasks/ixq5euhgrf7y">Index</Link>
          |　
        <Link to="/shixuns/uznmbg54/challenges">tpm challenges</Link>
          |　
        <Link to="/shixuns/uznmbg54/shixun_discuss">tpm discuss</Link>
          |　
        <Link to="/forums/categories/all">forums</Link>
        　|　
        <Link to="/comment">Comment</Link>
        　|　
        <Link to="/testMaterial">testMaterial</Link>
        　|　
        <Link to="/testCodeMirror">testCodeMirror</Link>
        　|　
        <Link to="/taskList">taskList</Link>
        　|　
        <Link to="/testRCComponent">testRCComponent</Link>
          |　
        <Link to="/tpforums">tpforums</Link>


          |　
        <Link to="/testUrlQuery">url-query test</Link>
        
      </div>
    );
  }
}

export default NotFoundPage;
