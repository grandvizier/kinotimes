import React from 'react'
import PropTypes from 'prop-types'
import Theater from './Theater'
import { Grid } from '@material-ui/core'

const TheaterList = ({ films, filters, onFilmClick }) => (
 	<Grid item xs={12}>
		{films.map(theater => (
			<Theater key={theater._id} {...theater} filters={filters} onClick={onFilmClick} />
		))}
	</Grid>
)

TheaterList.propTypes = {
	films: PropTypes.array.isRequired,
	filters: PropTypes.object.isRequired,
	onFilmClick: PropTypes.func.isRequired
}

export default TheaterList
