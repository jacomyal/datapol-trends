import React from 'react';
import { render } from 'react-dom';
import { root } from 'baobab-react/higher-order';

import state from './state';
import App from './components/App.jsx';

const RootedApp = root(state, App);

render(<RootedApp />, document.querySelector('#app'));
