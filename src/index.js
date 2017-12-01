import React from 'react';
import { render } from 'react-dom';
import { root } from 'baobab-react/higher-order';

import state from './state';
import App from './components/App.jsx';

import styles from '!style-loader!css-loader!sass-loader!../styles/main.scss';

const RootedApp = root(state, App);

render(<RootedApp />, document.querySelector('#app'));
