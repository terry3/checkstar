const show = require('./show_data');
const fetch = require('./fetch_data');

process.argv.forEach(function (val, index, array) {
  if (val === 'show') {
    show.queryMainRepo();
  } else if (val === 'fetch') {
    fetch();
  }
});

