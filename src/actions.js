import { mapValues, without } from 'lodash';
import ajax from 'djax';

import state from './state';

const COLORS = [
  '#ff6cf5',
  '#5ec12a',
  '#d140f3',
  '#00833b',
  '#0041da',
  '#d37e00',
  '#53079d',
  '#a7b075',
  '#837fff',
  '#be4400',
  '#51a5ff',
  '#ff603b',
  '#32b9db',
  '#d30029',
  '#1e377b',
  '#de9e5a',
  '#96005f',
  '#5d5500',
  '#db95c6',
  '#850030',
];

export function setOption(state, { option, value }) {
  state.set(['nav', 'options', option], value);
  return state;
};

export function toggleSelection(state, { type, value }) {
  state.set(
    ['nav', type, value],
    !state.get('nav', type, value)
  );
  return state;
};

export function selectEvent(state, { event }) {
  state.set(['nav', 'event'], event);
  return state;
};

export function searchQueries(state, { search }) {
  state.set(['nav', 'querySearch'], search);
  return state;
};

export function toggleQuery(state, { query }) {
  const queries = state.get('nav', 'queries');
  const queryData = state.get('data', 'querySeries', query);

  if (queries.some(o => o.id === query)) {
    state.set(
      ['nav', 'queries'],
      queries.filter(o => o.id !== query)
    );
  } else {
    state.set(
      ['nav', 'queries'],
      queries.concat({
        id: query,
        color: COLORS[Math.floor(Math.random() * COLORS.length)]
      })
    );

    // TODO:
    // Clean that side effect?
    if (!queryData) {
      ajax(
        'assets/data/queries/' + query + '.json'
      ).done(queryData => state.set(
        ['data', 'querySeries', query],
        queryData.timeseries
      ));
    }
  }

  return state;
};

export default {
  setOption,
  toggleSelection,
  selectEvent,
  toggleQuery,
  searchQueries,
};
