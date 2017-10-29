import { connect } from 'react-redux'
import { updateDateFilters } from '../actions'
import DateFilter from '../components/DateFilter'
import ReactGA from 'react-ga'

let startDate = null
let endDate = null

const handleStartDate = (date) => {
	startDate = date.unix();
	ReactGA.event({
		category: 'Filter',
		action: 'Start Date',
	});
}
const handleEndDate = (date) => {
	endDate = date.unix();
	ReactGA.event({
		category: 'Filter',
		action: 'End Date',
	});
}

const mapStateToProps = state => {
	return {
		handleStartDate,
		handleEndDate
	}
}

const mapDispatchToProps = dispatch => {
	return {
		updateClick: () => {
			dispatch(updateDateFilters(startDate, endDate))
		}
	}
}

const DateFilters = connect(
	mapStateToProps,
	mapDispatchToProps
)(DateFilter)

export default DateFilters