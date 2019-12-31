import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {withStyles, createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

import Film from '../../components/App'
import Admin from '../projectionist'

const styles = {
    root: {
        paddingTop: '10px',
    }
};

const darkTheme = createMuiTheme({
  palette: {
    // Switching the dark mode on is a single property value change.
    type: 'dark',
  },
});

/*
    <ViewFilter filter="byTitle">
        Title
    </ViewFilter>
    {'  '}
    <ViewFilter filter="byTheater">
        Theater
    </ViewFilter>
    {'  '}
    <ViewFilter filter="byTime">
        Time
    </ViewFilter>
*/
class App extends Component {
    render() {
        return (
            <ThemeProvider theme={darkTheme}>
                <div style={styles.root}>
                    <main>
                        <Route exact path="/" component={Film}/>
                        <Route path="/titles" component={Film}/>
                        <Route path="/theaters" component={Film}/>
                        <Route path="/times" component={Film}/>
                        <Route exact path="/projectionist" component={Admin}/>
                    </main>
                </div>
            </ThemeProvider>
        )
    }
}

export default withStyles(styles)(App)
