import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminFilmList from '../../components/AdminFilmList'
import {
  filmsFetchData,
  filmUpdateImdb,
  clearCache,
  updateImdb
} from '../../actions'

class Admin extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return <AdminFilmList {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    films: state.films
  }
}

Admin = connect(
  mapStateToProps,
  {
    fetchData : filmsFetchData,
    addImdbId: filmUpdateImdb,
    clearCache: clearCache,
    updateImdb: updateImdb
  }
)(Admin)

export default Admin