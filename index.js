const show = require('./show_data');
const fetch = require('./fetch_data');
const schedule = require('node-schedule');

process.argv.forEach(function (val, index, array) {
  if (val === 'show') {
    show.queryMainRepo();
  } else if (val === 'fetch') {
    fetch();
  } else if (val === 'schedule') {
    var rule = new schedule.RecurrenceRule();
    rule.minute = 11;
    schedule.scheduleJob(rule, function(){
      console.log('fetch github data');
    });
  }
});

