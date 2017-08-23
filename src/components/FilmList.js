import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { filmsFetchData } from '../actions/films';

class FilmList extends Component {
    componentDidMount() {
        this.props.fetchData('http://599dccc2d3276800116b9c80.mockapi.io/films');
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the films</p>;
        }

        if (this.props.isLoading) {
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

FilmList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    films: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        films: state.films,
        hasErrored: state.filmsHasErrored,
        isLoading: state.filmsIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(filmsFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FilmList);