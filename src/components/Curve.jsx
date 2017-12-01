import sizeMe from 'react-sizeme';
import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import {
  VictoryChart, VictoryAxis, VictoryTooltip,
  VictoryLine, VictoryScatter
} from 'victory';

const AXIS_STYLE = {
  axis: {
    stroke: '#333'
  },
  tickLabels: {
    padding: 4,
    fill: '#333',
  },
};

function Curves({ size, curves, title, points }) {
  return (
    <div>
      <h3>{ title }</h3>
      <VictoryChart
        width={ size.width }
        height={ 600 }
        domain={{
          x: [new Date('2016-11-01'), new Date('2017-07-01')],
        }}
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
        {
          points ?
            <VictoryScatter
              style={{
                data: { fill: '#333' }
              }}
              size={ 5 }
              data={ points }
              labels={ o => o.label }
              labelComponent={
                <VictoryTooltip />
              }
            /> :
            undefined
        }
      </VictoryChart>
    </div>
  );
}

export default sizeMe()(branch(
  {
    candidateCurves: ['data', 'candidateCurves'],
    queryCurves: ['data', 'queryCurves'],
    eventPoints: ['data', 'eventPoints'],
    event: ['nav', 'event'],
  },
  class Curve extends Component {
    render() {
      const {
        size,
        candidateCurves, queryCurves,
        eventPoints, event,
      } = this.props;

      return (
        <div className="container-content scrollable col-sm-9">
          <h1>Chronologie de la campagne</h1>
          <div className="container-viz">
            {
              candidateCurves.length ?
                <Curves
                  { ...{
                    size,
                    title: 'Candidats',
                    curves: candidateCurves,
                    points: eventPoints.map(point => (
                      point.id === event ?
                        {
                          ...point,
                          size: 10,
                          fill: '#fff',
                          stroke: '#000',
                          strokeWidth: 3,
                          symbol: 'circle',
                          zIndex: 1000,
                        } :
                        point
                    )),
                  } }
                /> :
                undefined
            }
            {
              queryCurves.length ?
                <Curves
                  { ...{
                    size,
                    title: 'Requêtes',
                    curves: queryCurves,
                  } }
                /> :
                undefined
            }
          </div>
        </div>
      );
    }
  }
));
