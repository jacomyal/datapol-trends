import { mapValues } from 'lodash';

import state from './state';

export function setOption(state, { option, value }) {
  state.set(['nav', 'options', option], value);
  return state;
};

export function toggleCandidate(state, { candidate }) {
  state.set(
    ['nav', 'candidates', candidate],
    !state.get('nav', 'candidates', candidate)
  );
  return state;
};

export function toggleSource(state, { source }) {
  state.set(
    ['nav', 'sources', source],
    !state.get('nav', 'sources', source)
  );
  return state;
};

export default {
  setOption,
  toggleCandidate,
  toggleSource,
};
