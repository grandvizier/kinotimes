import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import LocalizedFormat from 'dayjs/plugin/localizedFormat'
dayjs.extend(advancedFormat)
dayjs.extend(LocalizedFormat)

// Action types:
export const FILMS_HAS_ERRORED = 'films/HAS_ERRORED'
export const FILMS_FETCH_DATA_SUCCESS = 'films/FETCH_DATA_SUCCESS'
export const FILMS_SWITCH_VIEW = 'films/SWITCH_VIEW'
export const FILMS_HAS_SAVED = 'films/HAS_SAVED'

export const FILTER_SHOW_FILTERS = 'filters/SHOW_FILTERS'
export const FILTER_FILM_FILTER = 'filters/FILM_FILTER'
export const FILTER_FILM_FAVORITE = 'filters/FILM_FAVORITE'
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
	favoriteFilms: [],
	filterGenres: []
}


export const films = (state = [], action) => {
	switch (action.type) {
		case FILMS_HAS_ERRORED:
			return []

		case FILMS_FETCH_DATA_SUCCESS:
			return action.films

		// case FILMS_SWITCH_VIEW:
		// 	return sortFilms(state, action.viewType)

		case FILTER_UPDATE_DATES:
			const updatedTimes = state.map(film => {
				let acceptableTimes = film.showtimes.filter(function(showtime)
				{
				    var t = dayjs(showtime.timestamp)
				    let after = (action.startDate) ? t.format('X') >= action.startDate : true
				    let before = (action.endDate) ? t.format('X') <= action.endDate : true
				    return (after && before)
				})
				return { ...film, showtimes: acceptableTimes }
			})
			return updatedTimes

		case FILTER_FILM_FAVORITE:
			const updatedFavorites = state.map(film => {
				if(film._id === action.saveFilmId) {
					return {...film, favorite: !film.favorite}
				}
				return film
			})
			return updatedFavorites

		case FILTER_GENRE_FILTER:
			const filterGenres = state.map(film => {
				let genreStrings = (film.details && film.details.genre) ?
					film.details.genre.split(',').map((item) => item.trim()) :
					[]
				//console.log(genreStrings, film.title, film.hidden)
				return {...film,
					hidden: (genreStrings.indexOf(action.genre) > -1) ? !film.hidden : film.hidden }
			})
			return filterGenres


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

		case FILTER_FILM_FAVORITE:
			let filmAlreadyFavorite = state.favoriteFilms.indexOf(action.saveFilmId) > -1;
			let favoriteFilms = state.favoriteFilms.slice();

			if(filmAlreadyFavorite) {
				favoriteFilms = favoriteFilms.filter(id => id !== action.saveFilmId);
			}
			else {
				favoriteFilms.push(action.saveFilmId);
			}
			return {
				...state,
				favoriteFilms
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
