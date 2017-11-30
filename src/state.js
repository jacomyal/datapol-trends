import Baobab from 'baobab';

export default new Baobab({
  nav: {
    candidates: {},
    sources: {},
    options: {
      flatten: false,
    },
  },
  data: {
    timeSeries: {},
  },
});
