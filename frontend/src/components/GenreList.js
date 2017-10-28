import React from 'react'
import PropTypes from 'prop-types'
import { Col } from 'react-bootstrap'


const GenreList = ({ genres, filteredGenres, onGenreSelect }) => (
 	<Col xs={12}>
		{genres.map(genre => (
			<Col key={genre} className="genre">
				<input type="checkbox" id={genre} onChange={() => onGenreSelect(genre)}
					checked={(filteredGenres.indexOf(genre) < 0)} />
				<label htmlFor={genre}>{genre}</label>
			</Col>
		))}
	</Col>
)

GenreList.propTypes = {
	genres: PropTypes.array.isRequired,
	filteredGenres: PropTypes.array.isRequired,
	onGenreSelect: PropTypes.func.isRequired
}

export default GenreList