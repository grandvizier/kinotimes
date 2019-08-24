import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { films, filters } from './filmApp';
import { reducer as formReducer } from 'redux-form'

import { createBrowserHistory } from 'history'
const history = createBrowserHistory()

export default combineReducers({
  router: connectRouter(history),
  form: formReducer,
  films,
  filters
})