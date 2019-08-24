import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';

import Film from '../../components/App'
import Admin from '../projectionist'

const styles = {
    root: {
        paddingTop: '10px',
    }
};

class App extends Component {
    render() {
        return (
            <div style={styles.root}>
                <main>
                    <Route exact path="/" component={Film}/>
                    <Route path="/titles" component={Film}/>
                    <Route path="/theaters" component={Film}/>
                    <Route path="/times" component={Film}/>
                    <Route exact path="/projectionist" component={Admin}/>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(App)
