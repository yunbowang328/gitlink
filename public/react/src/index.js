import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './indexPlus.css';
import App from './App';

// 加之前main.js 18.1MB
// import { message } from 'antd';
import message from 'antd/lib/message';
import 'antd/lib/message/style/css';

import { AppContainer } from 'react-hot-loader';

import registerServiceWorker from './registerServiceWorker';

import { configureUrlQuery } from 'react-url-query';

import history from './history';

// link the history used in our app to url-query so it can update the URL with it.
configureUrlQuery({ history });
// -----------------------------------------------------------------------------------	请求配置

window.__useKindEditor = false;


const render = (Component) => {
  ReactDOM.render(
    <AppContainer {...this.props}  {...this.state}>
      <Component {...this.props} {...this.state}/>
    </AppContainer>,
    document.getElementById('root')
  );
}


// ReactDOM.render(
// 	,
// 	document.getElementById('root'));
// registerServiceWorker();

render(App);
if (module.hot) {
  module.hot.accept('./App', () => { render(App) });
}
