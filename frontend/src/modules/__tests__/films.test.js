import filmApp from '../index';
var deepFreeze = require('deep-freeze');

const initialFilterState = {
	showFilters: true,
	viewType: 'byTitle',
	filterDateTime: {
		start: null,
		end: null
	},
	filterFilms: [],
	filterGenres: []
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
			{'_id': '1', 'title': 'first'},
			{'_id': '2', 'title': 'second'}
		]
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first'},
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
			{'_id': '2', 'title': 'second'},
			{'_id': '1', 'title': 'first'}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'films/SWITCH_VIEW',
		viewType: 'byTitle'
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first'},
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


it('show filters', () => {
	const stateBefore = {
		films: [],
		filters: {...initialFilterState, showFilters: false}
	};
	const action = {
		type: 'filters/SHOW_FILTERS'
	}
	const stateAfter = {
		films: [],
		filters: {...initialFilterState, showFilters: true},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});

it('hide filters', () => {
	const stateBefore = {};
	const action = {
		type: 'filters/SHOW_FILTERS'
	}
	const stateAfter = {
		films: [],
		filters: {...initialFilterState, showFilters: false},
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
			{'_id': '1', 'title': 'first'},
			{'_id': '2', 'title': 'second'}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'filters/FILM_FILTER',
		filterFilmId: '1'
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first'},
			{'_id': '2', 'title': 'second'}
		],
		filters: {...initialFilterState, filterFilms: ['1']},
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
			{'_id': '1', 'title': 'first'},
			{'_id': '2', 'title': 'second'}
		],
		filters: {
			showFilters: true,
			viewType: 'byTitle',
			filterDateTime: {
				start: null,
				end: null
			},
			filterFilms: ['1'],
			filterGenres: []
		}
	};
	const action = {
		type: 'filters/FILM_FILTER',
		filterFilmId: '1'
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first'},
			{'_id': '2', 'title': 'second'}
		],
		filters: {
			showFilters: true,
			viewType: 'byTitle',
			filterDateTime: {
				start: null,
				end: null
			},
			filterFilms: [],
			filterGenres: []
		},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});


it('filter film by start date', () => {
	const unixTime = 1509052320 // 10/26/2017 @ 21:12 (UTC)
	const stateBefore = {
		films: [
			{'_id': '1', 'title': 'first', 'showtimes': [
				{_id: "59f", timestamp: "2017-10-25T18:00:00.000Z"},
				{_id: "59c", timestamp: "2017-10-26T21:15:00.000Z"}
			]},
			{'_id': '2', 'title': 'second', 'showtimes': [
				{_id: "59d", timestamp: "2017-10-25T17:30:00.000Z"}
			]}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'filters/UPDATE_DATES',
        startDate: unixTime,
        endDate: null
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first', 'showtimes': [
				{_id: "59c", timestamp: "2017-10-26T21:15:00.000Z"}
			]},
			{'_id': '2', 'title': 'second', 'showtimes': []}
		],
		filters: {
			showFilters: true,
			viewType: 'byTitle',
			filterDateTime: {
				start: unixTime,
				end: null
			},
			filterFilms: [],
			filterGenres: []
		},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});

it('filter film by end date', () => {
	const startTime = 1508959800 // 10/25/2017 @ 19:30 (UTC)
	const endTime	= 1509052500 // 10/26/2017 @ 21:15 (UTC)
	const stateBefore = {
		films: [
			{'_id': '1', 'title': 'first', 'showtimes': [
				{_id: "59f", timestamp: "2017-10-25T18:00:00.000Z"},
				{_id: "59c", timestamp: "2017-10-26T21:15:00.000Z"}
			]},
			{'_id': '2', 'title': 'second', 'showtimes': [
				{_id: "59d", timestamp: "2017-10-25T19:30:00.000Z"}
			]}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'filters/UPDATE_DATES',
        startDate: startTime,
        endDate: endTime
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first', 'showtimes': [
				{_id: "59c", timestamp: "2017-10-26T21:15:00.000Z"}
			]},
			{'_id': '2', 'title': 'second', 'showtimes': [
				{_id: "59d", timestamp: "2017-10-25T19:30:00.000Z"}
			]}
		],
		filters: {
			showFilters: true,
			viewType: 'byTitle',
			filterDateTime: {
				start: startTime,
				end: endTime
			},
			filterFilms: [],
			filterGenres: []
		},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});


it('add genre filter', () => {
	const stateBefore = {
		films: [
			{'_id': '1', 'title': 'first', 'details':
				{'director': 'Kubrick', 'genre': 'Horror, Adventure'}
			},
			{'_id': '2', 'title': 'second'}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'filters/GENRE_FILTER',
		genre: 'Adventure'
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first', 'details':
				{'director': 'Kubrick', 'genre': 'Horror, Adventure'}
			},
			{'_id': '2', 'title': 'second'}
		],
		filters: {...initialFilterState, filterGenres: ['Adventure']},
		"form": {},
		"routing": {"location": null}
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});

it('remove genre filter', () => {
	const stateBefore = {
		films: [
			{'_id': '1', 'title': 'first', 'details':
				{'director': 'Kubrick', 'genre': 'Horror, Adventure'}
			},
			{'_id': '2', 'title': 'second'}
		],
		filters: {...initialFilterState, filterGenres: ['Adventure']}
	};
	const action = {
		type: 'filters/GENRE_FILTER',
		genre: 'Adventure'
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first', 'details':
				{'director': 'Kubrick', 'genre': 'Horror, Adventure'}
			},
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
