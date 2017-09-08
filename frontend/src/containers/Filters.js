import { connect } from 'react-redux'
import FilterBlock from '../components/FilterBlock'
import {
  toggleFilmFilter,
} from '../actions'


const mapStateToProps = state => {
  return {
    filterDateTime: state.filters.filterDateTime,
    filterFilms: state.filters.filterFilms,
    allFilms: state.films
  }
}

const Filters = connect(
  mapStateToProps,
  { onFilmClick: toggleFilmFilter}
)(FilterBlock)

export default Filters