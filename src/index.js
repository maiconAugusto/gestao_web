import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router'
import {Provider} from 'react-redux';
import Store from './store/store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Router />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
