import moment from 'moment'
const sortBy = require('lodash/sortBy');

// Action types:
export const FILMS_HAS_ERRORED = 'films/HAS_ERRORED'
export const FILMS_FETCH_DATA_SUCCESS = 'films/FETCH_DATA_SUCCESS'
export const FILMS_SWITCH_VIEW = 'films/SWITCH_VIEW'
export const FILMS_HAS_SAVED = 'films/HAS_SAVED'

export const FILTER_SHOW_FILTERS = 'filters/SHOW_FILTERS'
export const FILTER_FILM_FILTER = 'filters/FILM_FILTER'
export const FILTER_UPDATE_DATES = 'filters/UPDATE_DATES'
export const FILTER_GENRE_FILTER = 'filters/GENRE_FILTER'


const initialFilterState = {
	showFilters: true,
	viewType: 'byTitle',
	filterDateTime: {
		start: null,
		end: null
	},
	filterFilms: [],
	filterGenres: []
}


export const films = (state = [], action) => {
	switch (action.type) {
		case FILMS_HAS_ERRORED:
			return []

		case FILMS_FETCH_DATA_SUCCESS:
			return action.films

		case FILMS_SWITCH_VIEW:
			return sortFilms(state, action.viewType)

		case FILTER_UPDATE_DATES:
			const updatedTimes = state.map(film => {
				let acceptableTimes = film.showtimes.filter(function(showtime)
				{
				    var t = moment(showtime.timestamp)
				    let after = (action.startDate) ? t.format('X') >= action.startDate : true
				    let before = (action.endDate) ? t.format('X') <= action.endDate : true
				    return (after && before)
				})
				return { ...film, showtimes: acceptableTimes }
			})
			return updatedTimes


		case FILMS_HAS_SAVED:
			const updatedFilms = state.map(film => {
				if(film._id === action.film._id){
					return { ...film, reviewed: true, imdbID: action.imdbID }
				}
				return film
			})
			return updatedFilms

		default:
			return state
	}
}


export const filters = (state = initialFilterState, action) => {
	switch (action.type) {
		case FILMS_SWITCH_VIEW:
			return {
				...state,
				viewType: action.viewType
			}

		case FILMS_HAS_ERRORED:
			return {
				...state,
				hasErrored: action.hasErrored
			}

		case FILTER_SHOW_FILTERS:
			return {
				...state,
				showFilters: !state.showFilters
			}

		case FILTER_FILM_FILTER:
			let idAlreadyExists = state.filterFilms.indexOf(action.filterFilmId) > -1;
			let filterFilms = state.filterFilms.slice();

			if(idAlreadyExists) {
				filterFilms = filterFilms.filter(id => id !== action.filterFilmId);
			}
			else {
				filterFilms.push(action.filterFilmId);
			}
			return {
				...state,
				filterFilms
			}

		case FILTER_GENRE_FILTER:
			let indexGenre = state.filterGenres.indexOf(action.genre);
			let filterGenres = state.filterGenres.slice();

			if(indexGenre > -1) {
				filterGenres.splice(indexGenre, 1);;
			}
			else {
				filterGenres.push(action.genre);
			}
			return {
				...state,
				filterGenres
			}

		case FILTER_UPDATE_DATES:
			return {
				...state,
				filterDateTime: {start: action.startDate, end: action.endDate}
			}

		default:
			return state
	}
}


function sortFilms(films, by){
	if (by === "byTitle"){
		return sortBy(films, 'title');
	} else if (by === "byTheater"){
		return sortBy(films, 'createdAt');
	} else {
		return films;
	}

}

// function dynamicSort(property) {
//     var sortOrder = 1;
//     if(property[0] === "-") {
//         sortOrder = -1;
//         property = property.substr(1);
//     }
//     return function (a,b) {
//         var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
//         return result * sortOrder;
//     }
// }


// export function filmsHasErrored(state = false, action) {
//     switch (action.type) {
//         case 'FILMS_HAS_ERRORED':
//             return action.hasErrored;

//         default:
//             return state;
//     }
// }

// export function filmsIsLoading(state = false, action) {
//     switch (action.type) {
//         case 'FILMS_IS_LOADING':
//             return action.isLoading;

//         default:
//             return state;
//     }
// }

// export function films(state = [], action) {
//     switch (action.type) {
//         case 'FILMS_FETCH_DATA_SUCCESS':
//             return action.films;

//         default:
//             return state;
//     }
// }
