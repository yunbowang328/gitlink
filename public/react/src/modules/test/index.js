import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import MonacoTest from './monaco'
import TestCrop from './TestCrop'
import TestDragBeautiful from './dnd/TestDragBeautiful'

class TestIndex extends Component {
  state = {
    loading: false,
  };

  render() {
      
    return (
        <div style={{height: '100%'}}>
            test page

            <Switch {...this.props}>
                <Route exact path="/test/monacoTest" component={MonacoTest}></Route>
                <Route exact path="/test/testCrop" component={TestCrop}></Route>
                <Route exact path="/test/dragBeautifulTest" component={TestDragBeautiful}></Route>
            </Switch>

        </div>
    );
  }
}

export default TestIndex;
