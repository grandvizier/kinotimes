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

it('sort by title', () => {
	const stateBefore = {
		films: [
			{'id': '2', 'name': 'second'},
			{'id': '1', 'name': 'first'}
		],
		filters: initialFilterState
	};
	const action = {
		type: 'films/SWITCH_VIEW',
		viewType: 'byTitle'
	}
	const stateAfter = {
		films: [
			{'id': '1', 'name': 'first'},
			{'id': '2', 'name': 'second'}
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