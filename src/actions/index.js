export function filmsFetchDataSuccess(films) {
    return {
        type: 'FILMS_FETCH_DATA_SUCCESS',
        films
    };
}
export function filmsIsSaving(bool) {
    return {
        type: 'FILMS_IS_SAVING',
        isSaving: bool
    };
}
export function filmsHasSaved(bool) {
    return {
        type: 'FILMS_HAS_SAVED',
        hasSaved: bool
    };
}

export function filmsHasErrored(bool) {
    console.log("OH DAMM");
    return dispatch => {
        dispatch({
            type: 'films/HAS_ERRORED',
            isLoading: bool
        })
    };
}

export const toggleFilmFilter = (id) => {
    return {
        type: 'FILM_FILTER',
        filterFilm: id
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

export const filmsFetchData = (url) => {
    console.log("getting data", url);
    return (dispatch) => {
        dispatch(filmsIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(filmsIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((films) => dispatch(filmsFetchDataSuccess(films)))
            .catch(() => dispatch(filmsHasErrored(true)));
    };
}