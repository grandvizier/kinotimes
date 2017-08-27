import { connect } from 'react-redux'
import { switchView } from '../actions'
import ViewLink from '../components/ViewLink'

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.filter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(switchView(ownProps.filter))
    }
  }
}

const Filter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewLink)

export default Filter