import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { TextField, Button } from '@material-ui/core';

// import InputLabel from '@material-ui/core/InputLabel';
// import OutlinedInput from '@material-ui/core/OutlinedInput';

const FieldInput = ({ input, meta, type, placeholder, min, max }) => {
	return (
		<TextField
	        id="imdbID"
	        value={placeholder}
	        label="imdb id"
	        margin="dense"
	        variant="outlined"
	        onChange={input.onChange}
	      />
	)
}


let AdminUpdateFilm = ({ form, handleSubmit, imdbID }) => {
	return (
		<form onSubmit={ handleSubmit } className="updateFilm">
			<Field name="imdbID"
				type='text'
				component={FieldInput}
				placeholder={imdbID}
				/>
			<Button variant="contained" type="submit">Update Film</Button>
		</form>
	)
}

AdminUpdateFilm = reduxForm()(AdminUpdateFilm)

export default AdminUpdateFilm;
