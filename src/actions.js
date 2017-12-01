import { mapValues } from 'lodash';

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

export function showQuery(state, { query }) {
  // TODO
  return state;
};

export default {
  setOption,
  toggleSelection,
  selectEvent,
  showQuery,
};
