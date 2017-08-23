import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { filmsFetchData } from '../actions/films';

const Film = props => (
  <div>
    <h1>Films</h1>
    <ul>
        {props.films.map((film) => (
            <li key={film.id}>
                {film.name}
            </li>
            // <p>
            //   <button onClick={props.increment} disabled={props.isIncrementing}>Increment</button>
            //   <button onClick={props.incrementAsync} disabled={props.isIncrementing}>Increment Async</button>
            // </p>
        ))}
    </ul>

  </div>
)

// FilmList.propTypes = {
//     fetchData: PropTypes.func.isRequired,
//     films: PropTypes.array.isRequired,
//     hasErrored: PropTypes.bool.isRequired,
//     isLoading: PropTypes.bool.isRequired
// };

const mapStateToProps = state => ({
  films: state.films,
  hasErrored: state.filmsHasErrored,
  isLoading: state.filmsIsLoading
})

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (url) => dispatch(filmsFetchData(url))
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Film)