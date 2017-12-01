import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';

export default branch(
  {
    timeSeries: ['data', 'timeSeries'],
  },
  class Curve extends Component {
    render() {
      return (
        <div className="container-content col-sm-9">
          <h1>Titre</h1>
          <div className="container-viz">
            viz
          </div>
        </div>
      );
    }
  }
);
