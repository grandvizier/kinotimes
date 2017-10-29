import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/app'
import ReactGA from 'react-ga'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

import './index.css'
import './dateTime.css'

const gaCode = (process.env.REACT_APP_KT_GA_TRACKING) ? process.env.REACT_APP_KT_GA_TRACKING : "UA-000000-01"
ReactGA.initialize(gaCode);
// ReactGA.initialize(gaCode, {debug: false, gaOptions: {cookieDomain: 'none'} });

const logPageView = () => {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history} onUpdate={logPageView}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)