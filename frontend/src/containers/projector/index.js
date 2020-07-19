import React, { Component } from 'react'
import { connect } from 'react-redux'
import AdminTheaterList from '../../components/AdminTheaterList'
import {
  theatersFetchData,
  updateTheaterData
} from '../../actions'

class TheaterAdmin extends Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return <AdminTheaterList {...this.props} />
  }
}

const mapStateToProps = state => {
  return {
    theaters: state.theaters
  }
}

TheaterAdmin = connect(
  mapStateToProps,
  {
    fetchData : theatersFetchData,
    updateTheaterData: updateTheaterData
  }
)(TheaterAdmin)

export default TheaterAdmin