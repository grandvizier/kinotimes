import React from 'react';
import { Route } from 'react-router-dom';
import { Grid, Jumbotron, Navbar } from 'react-bootstrap';

import Film from '../../components/App'
import Admin from '../projectionist'

const App = () => (
	<div>
	<Navbar inverse fixedTop>
		<Grid>
			<Navbar.Header>
				<Navbar.Brand>
				<a href="/">Kinotimes</a>
				</Navbar.Brand>
				<Navbar.Toggle />
			</Navbar.Header>
		</Grid>
	</Navbar>
	<Jumbotron>
    	<Grid>
			<main>
				<Route exact path="/" component={Film} />
				<Route exact path="/projectionist" component={Admin} />
			</main>
		</Grid>
	</Jumbotron>
	</div>
)

export default App