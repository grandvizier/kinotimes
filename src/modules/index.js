import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { films, filters } from './filmApp';

export default combineReducers({
  routing: routerReducer,
  films,
  filters	
})