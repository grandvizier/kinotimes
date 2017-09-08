import React from 'react'
import { Field, reduxForm } from 'redux-form'

import { Col, FormControl, FormGroup } from 'react-bootstrap';

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
			<Col xs={6}>
				<FormGroup controlId="imdbID" bsSize="sm">
					<Field name="imdbID"
						type='text'
						component={FieldInput}
						placeholder={imdbID}
					/>
				</FormGroup>
			</Col>
			<Col xs={6}>
				<FormGroup>
					<button type="submit">Update Film</button>
				</FormGroup>
			</Col>
		</form>
	)
}

AdminUpdateFilm = reduxForm()(AdminUpdateFilm)

export default AdminUpdateFilm;
