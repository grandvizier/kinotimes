import React, { Component } from 'react'
import { connect } from 'react-redux'
import GenreList from '../components/GenreList'
import {
  toggleGenreFilter,
} from '../actions'
const flatten = require('lodash/flattenDeep');
const uniq = require('lodash/uniq');


const sortThroughGenres = (films, viewType) => {
	let genres = films.map( f => {
		if (viewType === 'byTitle'){
			return (f.details) ? f.details.genre.split(',').map((item) => item.trim()) : null
		} else {
			if (f.showtimes){
				return f.showtimes.map( s => {
					return (s._film && s._film.details) ? s._film.details.genre.split(',').map((item) => item.trim()) : null
				})
			} else {
				return null
			}
		}
	})
	genres = uniq(flatten(genres)).sort()
	return genres
}

class Genres extends Component {
	render() {
		return <GenreList {...this.props} />
	}
}

const mapStateToProps = state => {
	return {
		genres: sortThroughGenres(state.films, state.filters.viewType),
		filteredGenres: state.filters.filterGenres
	}
}

Genres = connect(
	mapStateToProps,
	{ onGenreSelect: toggleGenreFilter}
)(Genres)


export default Genres