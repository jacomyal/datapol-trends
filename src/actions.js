import { mapValues, without } from 'lodash';

import state from './state';

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
  state.set(
    ['nav', 'queries'],
    queries.includes(query) ?
      without(queries, query) :
      queries.concat(query)
  );
  return state;
};

export default {
  setOption,
  toggleSelection,
  selectEvent,
  toggleQuery,
  searchQueries,
};
