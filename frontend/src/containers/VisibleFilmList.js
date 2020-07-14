import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleFilmFilter, toggleFilmSave, filmsFetchData } from "../actions";
import FilmList from "../components/FilmList";
import TheaterList from "../components/TheaterList";

const getVisibleFilms = (films, filters) => {
  if (filters.filterFilms.length) {
    return films.filter(function(obj) {
      return !filters.filterFilms.includes(obj._id);
    });
  } else {
    return films;
  }
};

class VisibleFilmList extends Component {
  componentDidMount() {
    this.props.fetchData(this.props.filters.viewType);
  }

  render() {
    if (this.props.filters.viewType === "byTitle") {
      return <FilmList {...this.props} />;
    }
    return <TheaterList {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    films: getVisibleFilms(state.films, state.filters),
    theaters: state.theaters,
    filters: state.filters
  };
};

VisibleFilmList = connect(
  mapStateToProps,
  {
    onFilterClick: toggleFilmFilter,
    onFilmSave: toggleFilmSave,
    fetchData: filmsFetchData
  }
)(VisibleFilmList);

export default VisibleFilmList;
