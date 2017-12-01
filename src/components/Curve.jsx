import sizeMe from 'react-sizeme';
import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

const AXIS_STYLE = {
  axis: {
    stroke: '#333'
  },
  tickLabels: {
    padding: 4,
    fill: '#333',
  },
};

function Candidates(props) {
  return (
    props.curves.length ?
      <VictoryChart
        width={ props.size.width }
        height={ 600 }
      >
        <VictoryAxis
          tickFormat={
            x => new Date(x).toISOString().substr(0, 10)
          }
          style={ AXIS_STYLE }
        />
        <VictoryAxis
          dependentAxis
          style={ AXIS_STYLE }
        />
        {
          props.curves.map(o => (
            <VictoryLine
              key={ o.candidate }
              data={ o.data }
              style={{
                data: {
                  ...o.style,
                  stroke: o.color,
                  strokeWidth: 1,
                },
              }}
            />
          ))
        }
      </VictoryChart> :
      <div>Aucune courbe à afficher</div>
  );
}

function Queries(props) {
  return (
    props.curves.length ?
      <VictoryChart
        width={ props.size.width }
        height={ 600 }
      >
        <VictoryAxis
          tickFormat={
            x => new Date(x).toISOString().substr(0, 10)
          }
          style={ AXIS_STYLE }
        />
        <VictoryAxis
          dependentAxis
          style={ AXIS_STYLE }
        />
        {
          props.curves.map(o => (
            <VictoryLine
              key={ o.candidate }
              data={ o.data }
              style={{
                data: {
                  ...o.style,
                  stroke: o.color,
                  strokeWidth: 1,
                },
              }}
            />
          ))
        }
      </VictoryChart> :
      <div>Aucune courbe à afficher</div>
  );
}

export default sizeMe()(branch(
  {
    curves: ['data', 'curves'],
  },
  class Curve extends Component {
    render() {
      return (
        <div className="container-content scrollable col-sm-9">
          <h1>Chronologie de la campagne</h1>
          <div className="container-viz">
            <Candidates { ...this.props } />
            <Queries { ...this.props } />
          </div>
        </div>
      );
    }
  }
));
