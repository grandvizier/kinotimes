import { connect } from 'react-redux'
import {
  toggleFilmFilter,
  filmsFetchData
} from '../actions'
import FilmList from '../components/FilmList'

const getVisibleFilms = (films, filters) => {
  switch (filters) {
    case 'SHOW_ALL':
      return films
    case 'SHOW_COMPLETED':
      return films
    default:
      return films
  }
}

const mapStateToProps = state => {
  return {
    films: getVisibleFilms(state.films, state.filters)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFilmClick: id => {
      dispatch(toggleFilmFilter(id))
    }
  }
}
// fetchData: (url) => dispatch(filmsFetchData(url)),

const VisibleFilmList = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilmList)

export default VisibleFilmList