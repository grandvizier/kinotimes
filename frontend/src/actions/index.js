const apiBaseUrl = process.env.REACT_APP_KT_URL + ":" + process.env.REACT_APP_KT_BACKEND_PORT

export function clearCache() {
    fetch(apiBaseUrl + "/api/cache/clear")
    return {
        type: 'clearCache'
    };
}
export function removeOldFilms() {
    fetch(apiBaseUrl + "/api/clearOldFilms")
    return {
        type: 'removeOldFilms'
    };
}
export function updateImdb() {
    fetch(apiBaseUrl + "/api/updateImdb")
    return {
        type: 'updateImdb'
    };
}
export function filmsFetchDataSuccess(films) {
    return {
        type: 'films/FETCH_DATA_SUCCESS',
        films
    };
}
export function filmsIsSaving(bool) {
    return {
        type: 'films/IS_SAVING',
        isSaving: bool
    };
}
export function filmsHasSaved(response, film, newId) {
    return {
        type: 'films/HAS_SAVED',
        hasSaved: response,
        film: film,
        imdbID: newId
    };
}

export function filmsHasErrored(bool, err) {
    console.log("OH DAMM", err);
    return dispatch => {
        dispatch({
            type: 'films/HAS_ERRORED',
            hasErrored: bool
        })
    };
}

export function theatersFetchDataSuccess(theaters) {
    return {
        type: 'theaters/FETCH_DATA_SUCCESS',
        theaters
    };
}
export function theaterHasSaved(response, theater) {
    return {
        type: 'theaters/HAS_SAVED',
        hasSaved: response,
        theater: theater
    };
}

export function toggleFilters() {
    return {
        type: 'filters/SHOW_FILTERS'
    };
}

export function updateDateFilters(startDate, endDate) {
    return {
        type: 'filters/UPDATE_DATES',
        startDate: startDate,
        endDate: endDate
    };
}

export function toggleGenreFilter(genre) {
    return {
        type: 'filters/GENRE_FILTER',
        genre
    };
}

export function toggleFilmSave(id) {
    return {
        type: 'filters/FILM_FAVORITE',
        saveFilmId: id
    };
}

export const toggleFilmFilter = (id) => {
    console.log(id)
    return {
        type: 'filters/FILM_FILTER',
        filterFilmId: id
    };
}

export const filmsIsLoading = (bool) => {
    return {
        type: 'FILMS_IS_LOADING',
        isLoading: bool
    };
}

export const switchView = (newView) => {
    return (dispatch) => {
        dispatch(filmsFetchData(newView));

        dispatch({
            type: 'films/SWITCH_VIEW',
            viewType: newView
        })
    };
}

export const filmsFetchData = (filters = 'getAll') => {
    return (dispatch) => {
        dispatch(filmsIsLoading(true));

        fetch(apiBaseUrl + "/api/" + filters)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(filmsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((films) => dispatch(filmsFetchDataSuccess(films)))
            .catch((e) => dispatch(filmsHasErrored(true, e)));

        fetch(apiBaseUrl + "/api/getTheaters")
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((theaters) => dispatch(theatersFetchDataSuccess(theaters)))
            .catch((e) => dispatch(filmsHasErrored(true, e)));
    };
}

export const theatersFetchData = () => {
    return (dispatch) => {
        // TODO: new Loading & HasErrored state for theater
        dispatch(filmsIsLoading(true));

        fetch(apiBaseUrl + "/api/getTheaters")
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                return response;
            })
            .then((response) => response.json())
            .then((theaters) => dispatch(theatersFetchDataSuccess(theaters)))
            .catch((e) => dispatch(filmsHasErrored(true, e)));
    };
}

export const filmUpdateImdb = (film, imdbID) => {
    return (dispatch) => {
        dispatch(filmsIsSaving(true));

        fetch(apiBaseUrl + '/adminapi/projectionist/admin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"title":film.title, "originalID":film.originalID, "imdbID":imdbID})
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(filmsIsSaving(false));
                return response;
            })
            .then((response) => response.json())
            .then((resp) => dispatch(filmsHasSaved(resp, film, imdbID)))
            .catch((e) => dispatch(filmsHasErrored(true, e)));
    };
}

export const updateTheaterData = (data) => {
    return (dispatch) => {
        // TODO: use save actions specific to theater
        dispatch(filmsIsSaving(true));
        // if theater -> data.name === "", throw error

        fetch(apiBaseUrl + '/adminapi/projector/admin/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
            })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(filmsIsSaving(false));
                return response;
            })
            .then((response) => response.json())
            .then((resp) => dispatch(theaterHasSaved(resp, data)))
            .catch((e) => dispatch(filmsHasErrored(true, e)));
    };
}

