export function filmsHasErrored(state = false, action) {
    switch (action.type) {
        case 'FILMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function filmsIsLoading(state = false, action) {
    switch (action.type) {
        case 'FILMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function films(state = [], action) {
    switch (action.type) {
        case 'FILMS_FETCH_DATA_SUCCESS':
            return action.films;

        default:
            return state;
    }
}