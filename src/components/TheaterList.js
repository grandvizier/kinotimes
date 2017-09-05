import React from 'react'
import PropTypes from 'prop-types'
import Theater from './Theater'
import { Col } from 'react-bootstrap'


const TheaterList = ({ films, filters, onFilmClick }) => (
 	<Col xs={12}>
		{films.map(theater => (
			<Theater key={theater._id} {...theater} onClick={onFilmClick} />
		))}
	</Col>
)

TheaterList.propTypes = {
	films: PropTypes.array.isRequired,
	filters: PropTypes.object.isRequired,
	onFilmClick: PropTypes.func.isRequired
}

export default TheaterList
