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

// next theme element change should be font
// https://material-ui.com/customization/typography/
// as well as spacing, and a few other things...
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
  overrides: {
    MuiGrid: {
      item: {
        // border: 'white solid 1px',
        borderRadius: 3,
        boxShadow: '0 1px 3px 1px rgba(255, 188, 105, 0.3)',
      },
    },
  },
});

/*
import ViewFilter from '../containers/ViewFilters'
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
