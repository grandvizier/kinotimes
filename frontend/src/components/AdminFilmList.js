import React from 'react'
import PropTypes from 'prop-types'
import AdminFilm from './AdminFilm'
import { Col, Panel } from 'react-bootstrap'

const AdminFilmList = ({ films, addImdbId, removeOldFilms, clearCache, updateImdb }) => (
	<Col xs={18} md={12}>
		<Panel>
			<Col>Film count: { films.length }</Col>
			<Col><button onClick={e => {
		      e.preventDefault()
		      removeOldFilms()
		    }} >Remove Old Films</button></Col>

		    <Col><button onClick={e => {
		      e.preventDefault()
		      clearCache()
		    }} >Clear cache</button></Col>

			<Col><button onClick={e => {
		      e.preventDefault()
		      updateImdb()
		    }} >Update imdb</button></Col>
		</Panel>
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
	addImdbId: PropTypes.func.isRequired,
	removeOldFilms: PropTypes.func.isRequired,
	clearCache: PropTypes.func.isRequired,
	updateImdb: PropTypes.func.isRequired
}

export default AdminFilmList