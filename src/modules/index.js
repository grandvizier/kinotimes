import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { films, filters } from './filmApp';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  routing: routerReducer,
  form: formReducer,
  films,
  filters
})