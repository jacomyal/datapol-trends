import _ from 'lodash';
import Baobab, { monkey } from 'baobab';

const timeSeries = {
  sources: {
    news: require('../assets/data/timeseries_candidates_news.json'),
    web: require('../assets/data/timeseries_candidates_web.json'),
    youtube: require('../assets/data/timeseries_candidates_youtube.json'),
  },
};

const allQueries = require('../assets/data/queries_all.json');

const config = require('../assets/config.json');

export default new Baobab({
  nav: {
    querySearch: undefined,
    sources: _(config.sources)
      .keyBy('id')
      .mapValues(() => true)
      .value(),
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

    // The curves to display:
    curves: monkey({
      cursors: {
        timeSeries: ['data', 'timeSeries'],
        candidates: ['data', 'config', 'candidates'],
        sources: ['data', 'config', 'sources'],
        candidatesOn: ['nav', 'candidates'],
        sourcesOn: ['nav', 'sources'],
      },
      get(data) {
        const curves = [];
        const sources = data.candidates.filter(
          ({ id }) => data.candidatesOn[id]
        );

        data.candidates
          .filter(({ id }) => data.candidatesOn[id])
          .forEach(candidate =>
            data.sources
              .filter(({ id }) => data.sourcesOn[id])
              .forEach(source => {
                curves.push({
                  candidate: candidate.id,
                  source: source.id,
                  color: candidate.color,
                  style: source.style,
                  data: _.map(
                    data.timeSeries.sources[source.id][candidate.id],
                    ({ value }, d) => ({
                      x: new Date(d),
                      y: value,
                    }),
                  )
                })
              })
          );

        return curves;
      },
    }),
  },
});
