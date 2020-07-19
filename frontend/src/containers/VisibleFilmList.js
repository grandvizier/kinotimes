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
    if (this.props.location !== "/theaters") {
      this.props.fetchData(this.props.filters.viewType);
    } else {
      this.props.fetchData("byTheater");
    }
  }

  render() {
    if (this.props.location !== "/theaters") {
      return <FilmList {...this.props} />;
    }
    return <TheaterList {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    films: getVisibleFilms(state.films, state.filters),
    theaters: state.theaters,
    filters: state.filters,
    location: state.router.location.pathname,
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
