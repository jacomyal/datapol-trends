import _ from 'lodash';
import Baobab, { monkey } from 'baobab';

const timeSeries = require('../assets/data/timeseries_candidates_web.json');
const allQueries = require('../assets/data/queries_all.json');

const config = require('../assets/config.json');

export default new Baobab({
  nav: {
    querySearch: undefined,
    candidates: _(config.candidates)
      .keyBy('id')
      .mapValues(() => true)
      .value(),
    categories: _(config.categories)
      .keyBy('id')
      .mapValues(() => true)
      .value(),
    event: null,
    queries: [],
    options: {
      flatten: false,
    },
  },
  data: {
    config,
    timeSeries,
    allQueries,
    querySeries: {},

    // The filtered queries:
    queries: monkey({
      cursors: {
        allQueries: ['data', 'allQueries'],
        candidates: ['nav', 'candidates'],
        categories: ['nav', 'categories'],
        querySearch: ['nav', 'querySearch'],
        event: ['nav', 'event'],
      },
      get(data) {
        const { candidates, categories, querySearch, event } = data;

        return (
          _(data.allQueries)
            .pickBy((o, query) => (
              o.candidates.some(str => candidates[str])
              && o.categories.some(str => categories[str])
              && (!event || o.events.includes(event))
              && (!querySearch || query.indexOf(querySearch) >= 0)
            ))
            .map((o, query) => ({
              ...o,
              id: query,
            }))
            .value()
        );
      },
    }),

    // The data to display:
    eventPoints: monkey({
      cursors: {
        events: ['data', 'config', 'events'],
      },
      get({ events }) {
        const pointsPerDay = {};
        const points = events.map(event => {
          pointsPerDay[event.date] = pointsPerDay[event.date] || 0;
          const point = {
            id: event.id,
            date: event.date,
            label: event.label,
            x: new Date(event.date),
            y: -pointsPerDay[event.date],
            symbol: 'square',
          };

          pointsPerDay[event.date] += 2;

          return point;
        });

        return points;
      },
    }),
    candidateCurves: monkey({
      cursors: {
        timeSeries: ['data', 'timeSeries'],
        candidates: ['data', 'config', 'candidates'],
        candidatesOn: ['nav', 'candidates'],
      },
      get(data) {
        const curves = [];

        data.candidates
          .filter(({ id }) => data.candidatesOn[id])
          .forEach(candidate => {
            curves.push({
              id: candidate.id,
              color: candidate.color,
              data: _.map(
                data.timeSeries[candidate.id],
                ({ value }, d) => ({
                  x: new Date(d),
                  y: value,
                }),
              )
            })
          });

        return curves;
      },
    }),
    queryCurves: monkey({
      cursors: {
        queries: ['nav', 'queries'],
        querySeries: ['data', 'querySeries'],
      },
      get(data) {
        const curves = [];

        data.queries
          .filter(({ id }) => data.querySeries[id])
          .forEach(query => {
            curves.push({
              id: query.id,
              color: query.color,
              data: data.querySeries[query.id].map(
                ({ value, date }) => ({
                  x: new Date(date),
                  y: value,
                })
              )
            })
          });

        return curves;
      },
    }),
  },
});
