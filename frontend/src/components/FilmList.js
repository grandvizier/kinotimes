import React from 'react'
import PropTypes from 'prop-types'
import Film from './Film'
import { Col } from 'react-bootstrap'


const FilmList = ({ films, onFilmClick }) => (
 	<Col xs={12}>
		{films.map(film => {
			if (!film.hidden) {
				return (<Film key={film._id} {...film} onClick={() => onFilmClick(film._id)} />)
			}
			return null
		})}
	</Col>
)

FilmList.propTypes = {
	films: PropTypes.array.isRequired,
	onFilmClick: PropTypes.func.isRequired
}

export default FilmList
