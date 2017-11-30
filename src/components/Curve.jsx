import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';

export default branch(
  {
    timeSeries: ['data', 'timeSeries'],
  },
  class Curve extends Component {
    render() {
      return (
        <div>The curve will be here...</div>
      );
    }
  }
);
