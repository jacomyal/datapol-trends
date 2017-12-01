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
    sources: _(config.sources)
      .keyBy('id')
      .mapValues(() => true)
      .value(),
    candidates: _(config.candidates)
      .keyBy('id')
      .mapValues(() => true)
      .value(),
    topics: _(config.topics)
      .keyBy('id')
      .mapValues(() => true)
      .value(),
    event: null,
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
        topics: ['nav', 'topics'],
        event: ['nav', 'event'],
      },
      get(data) {
        const { candidates, topics, event } = data;
        return _.filter(
          data.allQueries,
          query => (
            query.candidates.some(str => candidates[str])
            && query.topics.some(str => topics[str])
            && (!event || query.events.includes(event))
          )
        )
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
