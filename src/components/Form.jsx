import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';

import { setOption } from '../actions';

export default branch(
  {
    options: ['nav', 'options'],
  },
  class Form extends Component {
    render() {
      return (
        <div>
          <label htmlFor="flatten">Flatten curves?</label>
          <input
            name="flatten"
            type="checkbox"
            value={ this.props.options.flatten }
            onChange={
              e => this.props.dispatch(
                setOption,
                { option: 'flatten', value: e.target.checked }
              )
            }
          />
        </div>
      );
    }
  }
);
