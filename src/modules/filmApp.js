const sortBy = require('lodash/sortBy');

// Action types:
export const FILMS_HAS_ERRORED = 'films/HAS_ERRORED'
export const FILMS_SWITCH_VIEW = 'films/SWITCH_VIEW'


const initialFilterState = {
	viewType: 'byTitle',
	filterDateTime: {
		start: null,
		end: null
	},
	filterFilms: []
}

const initialFilms = [
{
"id": "1",
"createdAt": 1503513900,
"name": "name 1",
"details": {}
},
{
"id": "2",
"createdAt": 1503513840,
"name": "name 2",
"details": {}
},
{
"id": "3",
"createdAt": 1503513780,
"name": "name 3",
"details": {}
}
]

export const films = (state = initialFilms, action) => {
	switch (action.type) {
		case FILMS_HAS_ERRORED:
			return {
				...state,
				hasErrored: action.hasErrored
			}

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

		default:
			return state
	}
}


function sortFilms(films, by){
	console.log(by);
	if (by === "byTitle"){
		return sortBy(films, 'name');
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
