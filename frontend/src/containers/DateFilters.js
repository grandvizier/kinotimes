import { connect } from 'react-redux'
import { updateDateFilters } from '../actions'
import DateFilter from '../components/DateFilter'
import ReactGA from 'react-ga'

let startDate = (new Date()).getTime()
let _ed = new Date()
let endDate = (_ed.setDate(_ed.getDate() + 4))

const handleStartDate = (date) => {
	startDate = date.getTime();
	ReactGA.event({
		category: 'Filter',
		action: 'Start Date',
	});
}
const handleEndDate = (date) => {
	endDate = date.getTime();
	ReactGA.event({
		category: 'Filter',
		action: 'End Date',
	});
}

const mapStateToProps = state => {
	return {
		startDate,
		endDate,
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