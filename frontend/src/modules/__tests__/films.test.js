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
	favoriteFilms: [],
	filterGenres: []
}

const routerObj = {
	"action": "POP",
	"location": {
		"hash": "",
		"pathname": "/",
		"query": {},
		"search": "",
		"state": undefined,
	}
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
		"router": routerObj
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
		"router": routerObj
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
		"router": routerObj
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
		"router": routerObj
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
		"router": routerObj
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
		"router": routerObj
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
		"router": routerObj
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
			favoriteFilms: [],
			filterGenres: []
		},
		"form": {},
		"router": routerObj
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
			favoriteFilms: [],
			filterGenres: []
		},
		"form": {},
		"router": routerObj
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});


it.skip('filter film by genre', () => {
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
				{'director': 'Kubrick', 'genre': 'Horror, Adventure'},
				'hidden': true
			},
			{'_id': '2', 'title': 'second', 'hidden': false}
		],
		filters: {...initialFilterState, filterGenres: ['Adventure']},
		"form": {},
		"router": routerObj
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});

it.skip('remove filtered film by genre', () => {
	const stateBefore = {
		films: [
			{'_id': '1', 'title': 'first', 'details':
				{'director': 'Kubrick', 'genre': 'Horror, Adventure'},
				'hidden': true
			},
			{'_id': '2', 'title': 'second', 'hidden': false}
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
				{'director': 'Kubrick', 'genre': 'Horror, Adventure'},
				'hidden': false
			},
			{'_id': '2', 'title': 'second', 'hidden': false}
		],
		filters: initialFilterState,
		"form": {},
		"router": routerObj
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});


it('favorite a film by id', () => {
	const stateBefore = {
		films: [
			{'_id': '1', 'title': 'first'},
			{'_id': '2', 'title': 'second'}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'filters/FILM_FAVORITE',
		saveFilmId: '1'
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first', 'favorite': true},
			{'_id': '2', 'title': 'second'}
		],
		filters: {...initialFilterState, favoriteFilms: ['1']},
		"form": {},
		"router": routerObj
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});

it('remove favorite film by id', () => {
	const stateBefore = {
		films: [
			{'_id': '1', 'title': 'first', 'favorite': true},
			{'_id': '2', 'title': 'second'}
		],
		filters: {...initialFilterState, favoriteFilms: ['1']}
	};
	const action = {
		type: 'filters/FILM_FAVORITE',
		saveFilmId: '1'
	}
	const stateAfter = {
		films: [
			{'_id': '1', 'title': 'first', 'favorite': false},
			{'_id': '2', 'title': 'second'}
		],
		filters: initialFilterState,
		"form": {},
		"router": routerObj
	};

	deepFreeze(stateBefore);
	deepFreeze(action);

	expect(filmApp(stateBefore, action)).toEqual(stateAfter);
});
