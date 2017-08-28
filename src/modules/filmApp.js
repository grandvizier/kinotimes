const sortBy = require('lodash/sortBy');

// Action types:
export const FILMS_HAS_ERRORED = 'films/HAS_ERRORED'
export const FILMS_FETCH_DATA_SUCCESS = 'films/FETCH_DATA_SUCCESS'
export const FILMS_SWITCH_VIEW = 'films/SWITCH_VIEW'

export const FILTER_FILM_FILTER = 'filters/FILM_FILTER'


const initialFilterState = {
	viewType: 'byTitle',
	filterDateTime: {
		start: null,
		end: null
	},
	filterFilms: []
}


export const films = (state = [], action) => {
	switch (action.type) {
		case FILMS_HAS_ERRORED:
			return []

		case FILMS_FETCH_DATA_SUCCESS:
			return action.films

		case FILMS_SWITCH_VIEW:
			return sortFilms(state, action.viewType)

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

		default:
			return state
	}
}


function sortFilms(films, by){
	console.log(by);
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
