export function filmsFetchDataSuccess(films) {
    return {
        type: 'FILMS_FETCH_DATA_SUCCESS',
        films
    };
}
export function filmsHasErrored(bool) {
    return {
        type: 'FILMS_HAS_ERRORED',
        hasErrored: bool
    };
}
export function filmsIsLoading(bool) {
    return {
        type: 'FILMS_IS_LOADING',
        isLoading: bool
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


export function filmsFetchData(url) {
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