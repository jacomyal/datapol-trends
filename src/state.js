import _ from 'lodash';
import Baobab from 'baobab';

const timeSeries = {
  news: require('../assets/data/timeseries_candidates_news.json'),
  web: require('../assets/data/timeseries_candidates_web.json'),
  youtube: require('../assets/data/timeseries_candidates_youtube.json'),
};

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
    options: {
      flatten: false,
    },
  },
  data: {
    config,
    timeSeries,
  },
});
