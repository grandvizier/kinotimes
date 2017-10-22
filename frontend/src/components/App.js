import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from './Header'
import VisibleFilmList from '../containers/VisibleFilmList'
import { Col, Row, Navbar, Nav, NavItem } from 'react-bootstrap'
import {
  toggleFilters
} from '../actions'


class App extends Component {
	render() {
		return (
			<div>
				<Navbar inverse >
					<Navbar.Header>
						<Navbar.Brand>
							<a href="/">Kinotimes</a>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<Nav onSelect={this.props.sidebarClick}>
							<NavItem eventKey={1} href="#">Filters</NavItem>
						</Nav>
					</Navbar.Collapse>
				</Navbar>
				<Row id="row-main">
					<Col md={3} id="sidebar" className={(this.props.showSidebar ? null : 'collapsed')}>
						<Header />
					</Col>
					<Col md={(this.props.showSidebar ? 9 : 12)} id="content">
						<VisibleFilmList />
					</Col>
				</Row>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		showSidebar: state.filters.showFilters
	}
}

App = connect(
  mapStateToProps,
  { sidebarClick: toggleFilters}
)(App)

export default App