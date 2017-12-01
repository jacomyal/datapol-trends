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

function Curves({ size, curves, title }) {
  return (
    <div>
      <h3>{ title }</h3>
      <VictoryChart
        width={ size.width }
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
          curves.map(o => (
            <VictoryLine
              key={ o.id }
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
      </VictoryChart>
    </div>
  );
}

export default sizeMe()(branch(
  {
    candidateCurves: ['data', 'candidateCurves'],
    queryCurves: ['data', 'queryCurves'],
  },
  class Curve extends Component {
    render() {
      const { size, candidateCurves, queryCurves } = this.props;

      return (
        <div className="container-content scrollable col-sm-9">
          <h1>Chronologie de la campagne</h1>
          <div className="container-viz">
            {
              candidateCurves.length ?
                <Curves
                  { ...{ size, title: 'Candidats', curves: candidateCurves } }
                /> :
                undefined
            }
            {
              queryCurves.length ?
                <Curves
                  { ...{ size, title: 'Requêtes', curves: queryCurves } }
                /> :
                undefined
            }
          </div>
        </div>
      );
    }
  }
));
