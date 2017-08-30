import filmApp from '../index';
var deepFreeze = require('deep-freeze');

const initialFilterState = {
	viewType: 'byTitle',
	filterDateTime: {
		start: null,
		end: null
	},
	filterFilms: []
}

it('handles errors', () => {
	const stateBefore = {};
	const action = {
		type: 'films/HAS_ERRORED',
		hasErrored: true
	}
	const stateAfter = {
		films: [],
		filters: {...initialFilterState, hasErrored: true},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});


it('successful data fetch', () => {
	const stateBefore = {};
	const action = {
		type: 'films/FETCH_DATA_SUCCESS',
		films: [
			{'id': '1', 'title': 'first'},
			{'id': '2', 'title': 'second'}
		]
	}
	const stateAfter = {
		films: [
			{'id': '1', 'title': 'first'},
			{'id': '2', 'title': 'second'}
		],
		filters: initialFilterState,
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});

it('has saved', () => {
	const stateBefore = {
		films: [
			{'_id': '1', 'title': 'first'},
			{'_id': '2', 'title': 'second'}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'films/HAS_SAVED',
		hasSaved: "response string",
		imdbID: "tt123",
		film: {'_id': '1', 'title': 'first'}
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first', 'reviewed': true, 'imdbID': 'tt123'},
			{'_id': '2', 'title': 'second'}
		],
		filters: initialFilterState,
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});


it('sort by title', () => {
	const stateBefore = {
		films: [
			{'id': '2', 'title': 'second'},
			{'id': '1', 'title': 'first'}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'films/SWITCH_VIEW',
		viewType: 'byTitle'
	}
	const stateAfter = {
		films: [
			{'id': '1', 'title': 'first'},
			{'id': '2', 'title': 'second'}
		],
		filters: {
			viewType: 'byTitle',
			filterDateTime: {
				start: null,
				end: null
			},
			filterFilms: []
		},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});

it('filter film by id', () => {
	const stateBefore = {
		films: [
			{'id': '1', 'title': 'first'},
			{'id': '2', 'title': 'second'}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'filters/FILM_FILTER',
		filterFilmId: '1'
	}
	const stateAfter = {
		films: [
			{'id': '1', 'title': 'first'},
			{'id': '2', 'title': 'second'}
		],
		filters: {
			viewType: 'byTitle',
			filterDateTime: {
				start: null,
				end: null
			},
			filterFilms: ['1']
		},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});

it('remove filtered film by id', () => {
	const stateBefore = {
		films: [
			{'id': '1', 'title': 'first'},
			{'id': '2', 'title': 'second'}
		],
		filters: {
			viewType: 'byTitle',
			filterDateTime: {
				start: null,
				end: null
			},
			filterFilms: ['1']
		}
	};
	const action = {
		type: 'filters/FILM_FILTER',
		filterFilmId: '1'
	}
	const stateAfter = {
		films: [
			{'id': '1', 'title': 'first'},
			{'id': '2', 'title': 'second'}
		],
		filters: {
			viewType: 'byTitle',
			filterDateTime: {
				start: null,
				end: null
			},
			filterFilms: []
		},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});