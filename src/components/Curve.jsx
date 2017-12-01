import React, { Component } from 'react';
import { branch } from 'baobab-react/higher-order';
import { VictoryChart, VictoryAxis, VictoryLine } from 'victory';

const AXIS_STYLE = {
  axis: {
    stroke: '#333'
  },
  tickLabels: {
    fontSize: 8,
    padding: 4,
    fill: '#333',
  },
};

export default branch(
  {
    curves: ['data', 'curves'],
  },
  class Curve extends Component {
    render() {
      const { curves } = this.props;

      return (
        <div className="container-content col-sm-9">
          <h1>Chronologie de la campagne</h1>
          <div className="container-viz">
            {
              curves.length ?
                <VictoryChart
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
                        key={ o.source + '-' + o.candidate }
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
            }
          </div>
        </div>
      );
    }
  }
);
