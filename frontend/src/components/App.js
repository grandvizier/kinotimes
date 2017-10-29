import React, { Component } from 'react'
import { connect } from 'react-redux'
import Sidebar from './Sidebar'
import VisibleFilmList from '../containers/VisibleFilmList'
import { Col, Row, Navbar, Nav, NavItem } from 'react-bootstrap'
import {
  toggleFilters
} from '../actions'


class App extends Component {
	render() {
		return (
			<div>
				<Navbar inverse collapseOnSelect>
					<Navbar.Header>
						<Navbar.Brand>
							Kinotimes
						</Navbar.Brand>
					</Navbar.Header>
					<Nav>
						<NavItem onSelect={this.props.sidebarClick}
							eventKey={1}>{(this.props.showSidebar) ? 'Hide ' : ''}Filters</NavItem>
					</Nav>
				</Navbar>
				<Row id="row-main">
					<Col xs={12} md={3} id="sidebar" className={(this.props.showSidebar ? null : 'collapsed')}>
						<Sidebar />
					</Col>
					<Col xs={12} md={(this.props.showSidebar ? 9 : 12)} id="content">
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