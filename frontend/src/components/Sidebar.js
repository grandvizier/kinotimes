import React, {Component} from 'react'
import { withStyles } from '@material-ui/core/styles';
import ViewFilter from '../containers/ViewFilters'
import Filters from '../containers/Filters'
import DateFilters from '../containers/DateFilters'
import {Grid, Paper} from '@material-ui/core'

const styles = {
    root: {
        zIndex: 10000,
        flexGrow: 1,
        position:'fixed',
        top: '50px',
        width: '100%'
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Sidebar extends Component {
    render() {
        return (
            <div style={styles.root}>
                <Grid container className="filters pre-scrollable" id="sidebar">
                    <Paper header="Time">
                        <DateFilters/>
                    </Paper>
                </Grid>
                <Grid container className="filters pre-scrollable" id="sidebar">
                    <Paper>
                        <Filters/>
                    </Paper>
                </Grid>
            </div>
        )
    }
}

export default withStyles(styles)(Sidebar);
