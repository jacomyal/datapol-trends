import { mapValues } from 'lodash';

import state from './state';

export function setOption(state, { option, value }) {
  state.set(['nav', 'options', option], value);
  return state;
};

export default {
  setOption,
};
