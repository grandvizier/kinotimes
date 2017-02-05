var React = require("react");
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var FormGroup = require('react-bootstrap').FormGroup;
var FormControl = require('react-bootstrap').FormControl;
var Button = require('react-bootstrap').Button;

module.exports = React.createClass({
    render:function(){
        return(
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">KinoTimes</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                      <NavItem eventKey={1} href="#/movie">By Movies</NavItem>
                      <NavItem eventKey={2} href="#/time">By Time</NavItem>
                      <NavItem eventKey={2} href="#/theater">By Theater</NavItem>
                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup>
                          <FormControl type="text" placeholder="Search" />
                        </FormGroup>
                        {' '}
                        <Button type="submit">Search</Button>
                    </Navbar.Form>
                </Navbar.Collapse>
            </Navbar>
        )
    }
})