import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { 
  // filmsFetchData,
  filmsIsLoading,
  filmsHasErrored,
  switchView
} from '../../actions';


class Film extends Component {
    // componentDidMount() {
    //     this.props.fetchData('http://599dccc2d3276800116b9c80.mockapi.io/films');
    // }

    render() {
        if (this.props.filmsHasErrored) {
            return <p>Sorry! There was an error loading the films</p>;
        }

        if (this.props.filmsIsLoading) {
            return <p>Loading…</p>;
        }

        return (
            <ul>
                {this.props.films.map((film) => (
                    <li key={film.id}>
                        {film.name}
                    </li>
                ))}
            </ul>
        );
    }
}

Film.propTypes = {
    // fetchData: PropTypes.func.isRequired,
    films: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  films: state.films,
  filters: state.filters
})

const mapDispatchToProps = dispatch => bindActionCreators({
  switchView,
  // fetchData: (url) => dispatch(filmsFetchData(url)),
}, dispatch)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Film)