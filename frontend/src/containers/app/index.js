import React from 'react';
import { Route } from 'react-router-dom';
import { Grid } from 'react-bootstrap';

import Film from '../../components/App'
import Admin from '../projectionist'

const App = () => (
	<div>
	<Grid fluid>
		<main>
			<Route exact path="/" component={Film} />
			<Route exact path="/projectionist" component={Admin} />
		</main>
	</Grid>
	</div>
)

export default App