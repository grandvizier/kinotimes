const apiBaseUrl = "http://localhost:8888"

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

export const toggleFilmFilter = (id) => {
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
    // let newView = 'byTheater';
    return dispatch => {
        dispatch({
            type: 'films/SWITCH_VIEW',
            viewType: newView
        })
    };
}

export const filmsFetchData = () => {
    return (dispatch) => {
        dispatch(filmsIsLoading(true));

        fetch(apiBaseUrl + "/api")
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
            body: JSON.stringify({"title":film.title,"imdbID":imdbID})
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

