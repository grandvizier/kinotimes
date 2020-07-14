import React, { Suspense, lazy } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import ReactGA from 'react-ga'

import './index.css'
import './dateTime.css'

const LazyApp = lazy(() => import('./containers/app'))

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
        <Suspense fallback={<div>Loading...<br/>(the first page load is a bit slow)</div>}>
          <LazyApp />
        </Suspense>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
