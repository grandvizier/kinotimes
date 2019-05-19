import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { Grid, FormControl, FormGroup, Button } from '@material-ui/core';

const FieldInput = ({ input, meta, type, placeholder, min, max }) => {
	return (
		<FormControl
			type={type}
			defaultValue={placeholder}
			placeholder={placeholder}
			onFocus={input.onChange}
			onChange={input.onChange} />
	)
}


let AdminUpdateFilm = ({ form, handleSubmit, imdbID }) => {
	return (
		<form onSubmit={ handleSubmit }>
			<Grid item xs={6}>
				<FormGroup controlId="imdbID" bsSize="sm">
					<Field name="imdbID"
						type='text'
						component={FieldInput}
						placeholder={imdbID}
					/>
				</FormGroup>
			</Grid>
			<Grid item xs={6}>
				<FormGroup>
					<Button type="submit">Update Film</Button>
				</FormGroup>
			</Grid>
		</form>
	)
}

AdminUpdateFilm = reduxForm()(AdminUpdateFilm)

export default AdminUpdateFilm;
