export function filmsFetchDataSuccess(films) {
    return {
        type: 'films/FETCH_DATA_SUCCESS',
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

export const filmsFetchData = (url) => {
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
            .catch((e) => dispatch(filmsHasErrored(true, e)));
    };
}