import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  toggleFilmFilter,
  filmsFetchData
} from '../actions'
import FilmList from '../components/FilmList'

const getVisibleFilms = (films, filters) => {
  if (filters.filterFilms.length) {
    return films.filter(function( obj ) {
      // console.log("show only", filters.filterFilms)
      return !filters.filterFilms.includes(obj.id);
    });
  } else {
    return films
  }
}

class VisibleFilmList extends Component {
  componentDidMount() {
    this.props.fetchData('http://localhost:8888/api/');
  }

  render() {
    return <FilmList {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    films: getVisibleFilms(state.films, state.filters)
  }
}

VisibleFilmList = connect(
  mapStateToProps,
  { onFilmClick: toggleFilmFilter, fetchData : filmsFetchData}
)(VisibleFilmList)

export default VisibleFilmList