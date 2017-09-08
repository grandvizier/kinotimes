import React from 'react'
import PropTypes from 'prop-types'
import AdminFilm from './AdminFilm'
import { Col, Panel } from 'react-bootstrap'

const AdminFilmList = ({ films, addImdbId }) => (
	<Col xs={18} md={12}>
		<Panel>Film count: { films.length }</Panel>
		{films.map(film => (
			<AdminFilm key={film._id} {...film}
				handleSubmit={values => {
					addImdbId(film, values.imdbID)
				}}
				/>
		))}
	</Col>
)

AdminFilmList.propTypes = {
	films: PropTypes.array.isRequired,
	addImdbId: PropTypes.func.isRequired
}

export default AdminFilmList