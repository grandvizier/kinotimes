import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import { films, filmsHasErrored, filmsIsLoading } from './films';

export default combineReducers({
  routing: routerReducer,
  counter,
  films,
  filmsHasErrored,
  filmsIsLoading
})