import React from 'react'
import PropTypes from 'prop-types'

import { Col, Button, Form, FormControl, FormGroup } from 'react-bootstrap';

const AdminUpdateFilm = ({ addImdbId, imdbID }) => (
    <Form horizontal>
        <Col xs={6}>
          <FormGroup controlId="imdbID" bsSize="sm">
              <FormControl type="text" defaultValue={imdbID} placeholder="new IMDB id" />
          </FormGroup>
        </Col>

        <Col xs={3}>
        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit" onClick={e => {
		      e.preventDefault()
		      addImdbId()
		    }}>Update Film</Button>
          </Col>
        </FormGroup>
        </Col>
    </Form>
)


AdminUpdateFilm.propTypes = {
  addImdbId: PropTypes.func.isRequired
}

export default AdminUpdateFilm