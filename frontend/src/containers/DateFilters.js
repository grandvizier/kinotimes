import { connect } from 'react-redux'
import { updateDateFilters } from '../actions'
import DateFilter from '../components/DateFilter'

let startDate = null
let endDate = null

const handleStartDate = (date) => {
	startDate = date.unix();
}
const handleEndDate = (date) => {
	endDate = date.unix();
}

const mapStateToProps = state => {
	return {
		handleStartDate,
		handleEndDate
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onClick: () => {
			dispatch(updateDateFilters(startDate, endDate))
		}
	}
}

const DateFilters = connect(
	mapStateToProps,
	mapDispatchToProps
)(DateFilter)

export default DateFilters