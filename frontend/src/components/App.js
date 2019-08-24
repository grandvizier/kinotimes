import React, {Component} from 'react'
import {fade} from '@material-ui/core/styles/colorManipulator';
import {withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom';
import {AppBar, Toolbar, Typography, Button, IconButton, InputBase} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import Sidebar from './Sidebar'
import VisibleFilmList from '../containers/VisibleFilmList'
import {toggleFilters} from '../actions'

const styles = {
    root: {
        marginTop: '90px',
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: '5px',
        backgroundColor: fade('#ffffff', 0.15),
        marginLeft: 0,
        width: '100px',
    },
    searchInput: {
        color: '#ffffff'
    },
    searchIcon: {
        left: '-30px',
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appBar: {
        backgroundColor: '#7d7e7d#', /* Old browsers */
        background: 'linear-gradient(to bottom, #7d7e7d 0%,#0e0e0e 100%)',
    },
    navButton: {
        marginLeft: '20px'
    },
    navLink: {
        color: '#ffffff',
        textDecoration: 'none',
    }
};

class App extends Component {

    render() {
        return (
            <div style={styles.root}>
                <AppBar position="fixed" style={styles.appBar}>
                    <Toolbar variant="dense">
                        <IconButton color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography style={styles.title} variant="h6" color="inherit" noWrap>
                            Kinotimes
                        </Typography>
                        <Button color="inherit" style={styles.navButton}><NavLink activeClassName="active" to="/titles" style={styles.navLink}>Titles</NavLink></Button>
                        <Button color="inherit" style={styles.navButton}><NavLink activeClassName="active" to="/theaters" style={styles.navLink}>by Theater</NavLink></Button>
                        <Button color="inherit" style={styles.navButton}><NavLink activeClassName="active" to="/times" style={styles.navLink}>by Time</NavLink></Button>
                        <div style={styles.grow}/>
                        <div style={styles.search}>
                            <div style={styles.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder="Search…" style={styles.searchInput}/>
                        </div>
                    </Toolbar>
                </AppBar>
                <Sidebar/>
                <VisibleFilmList/>
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
    {sidebarClick: toggleFilters}
)(App)

export default withStyles(styles)(App);
