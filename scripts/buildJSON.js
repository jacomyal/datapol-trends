const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const Papa = require('papaparse');

const FILES = {
  news: 'timeseries_candidates_news.csv',
  web: 'timeseries_candidates_web.csv',
  youtube: 'timeseries_candidates_youtube.csv',
};

// Load all CSV files:
const DATA = {};

_.forEach(FILES, (path, key) => {
  const text = fs.readFileSync(__dirname + '/../assets/data/' + path, 'utf8');
  const res = Papa.parse(text, { header: true });

  DATA[key] = res.data.reduce((iter, row) => {
    if (row.keyword) {
      iter[row.keyword] = iter[row.keyword] || {};
      iter[row.keyword][row.time] = { value: +row.value };
      if (row.partial) iter[row.keyword][row.time].untrust = true;
    }
    return iter;
  }, {});
});

// Save all JSON files:
_.forEach(FILES, (path, key) => {
  console.log(DATA[key])
  fs.writeFileSync(
    __dirname + '/../assets/data/timeseries_candidates_' + key + '.json',
    JSON.stringify(DATA[key], null, '  ')
  );
});
