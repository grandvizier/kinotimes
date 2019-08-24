import { connect } from 'react-redux'
import { switchView } from '../actions'
import ViewLink from '../components/ViewLink'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.filters.viewType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(switchView(ownProps.filter))
    }
  }
}

const ViewFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLink)

export default ViewFilter
