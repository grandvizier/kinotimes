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
		films: null,
		hasErrored: true
	}
	const stateAfter = {
		films: {
			hasErrored: true
		},
		filters: initialFilterState,
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
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});