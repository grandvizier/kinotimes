import React from 'react'
import PropTypes from 'prop-types'
import AdminFilm from './AdminFilm'
import { Grid, Paper } from '@material-ui/core'

const AdminFilmList = ({ films, addImdbId, removeOldFilms, clearCache, updateImdb }) => (
	<Grid container>
		<Paper>
            <Grid item>Film count: { films.length }</Grid>
			<Grid item><button onClick={e => {
		      e.preventDefault()
		      removeOldFilms()
		    }} >Remove Old Films</button></Grid>

		    <Grid item><button onClick={e => {
		      e.preventDefault()
		      clearCache()
		    }} >Clear cache</button></Grid>

			<Grid item><button onClick={e => {
		      e.preventDefault()
		      updateImdb()
		    }} >Update imdb</button></Grid>
		</Paper>
		<Grid container>
		{films.map(film => (
			<AdminFilm key={film._id} {...film}
				handleSubmit={values => {
					addImdbId(film, values.imdbID)
				}}
				/>
		))}
		</Grid>
	</Grid>
)

AdminFilmList.propTypes = {
	films: PropTypes.array.isRequired,
	addImdbId: PropTypes.func.isRequired,
	removeOldFilms: PropTypes.func.isRequired,
	clearCache: PropTypes.func.isRequired,
	updateImdb: PropTypes.func.isRequired
}

export default AdminFilmList
