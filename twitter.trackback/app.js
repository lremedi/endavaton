var util = require('util');
var config = require('./config.js');
var database = require('./database.js')(config.db);
var twitter = require('./twitter.js')(config.twitter);
var queue = require('./queue.js')(config.queue);
var fasttext = require('../twitter.sentiment.analysis/index.js')('C:\\Projects\\HackATon\\twitter.ear\\twitter.sentiment.analysis\\bin');
var p = require('./prioritizer.js');
var m = require('./message.js');
var i18n = require('./en.i18n.js');
var fs = require('fs');
var _ = require('underscore');


var manual_stop = false;
var auto_start = true;
var chords = [];
var message = {};
var queues = [];
var root = "";

var ondata = function (tweet) {
    var q = p.prioritize(tweet.text, chords, root);
    if (q) {
        var str_tweet = m.process(tweet);
        queue.enqueue(q, str_tweet);
    }
}

var onend = function(event_data) {
    if (!manual_stop && auto_start){
        start("lremedi");
    }
    if(manual_stop){
    }
}

var stream = function(pattern){
    load_keywords(pattern);
    twitter.start_stream(pattern.root,ondata,onend);
}

var load_keywords = function(pattern){
    chords = pattern.chords;
    root = pattern.root;
    queues.push(root);
    for (var i = chords.length - 1; i >= 0; i--) {
        queues.push(chords[i]);
    }
}

var start = function(user){
    manual_stop = false;
    database.get_pattern(user).then(stream);
};

var stop = function(user){
    manual_stop = true;
    twitter.stop_stream();
}

var refresh = function(user){
    database.get_pattern(user).then(load_keywords);
}

var consume = function(user){
  database.get_pattern(user)
  .then(load_keywords)
  .then(() => {
    queues.map((item) => {
      queue.consume(item,process_tweet);
    })
  });
  analize();
}

var translateTweet = function(message){
  var tweet = JSON.parse(message);
  return{
    id: tweet.id,
    updated: Date.now(),
    created: Date.now(),
    text: tweet.text.replace(/(?:\r\n|\r|\n)/g, '<br />'),
    user: tweet.user.name,
    place: tweet.place
  }
}

var tweets = [];
var process_tweet = function(message){
    var tweet = translateTweet(message);
    database.save_tweet(tweet)
    .then((result)=>{
        if(result.insertedCount == 1){
          let inserted = result.ops[0];
          tweets.push({id:inserted.id, text:inserted.text});
        }
      }
    );
}

var analize = function(){
    setInterval(() => {
        if(tweets.length){
          let toAnalyze = tweets.slice(0);
          fasttext.analyze(toAnalyze.map((item)=>{return item.text}))
          .then((result)=>{
            toAnalyze
            .map((item, index)=>{
              database.update_tweet({id : item.id},{sentiment:result[index]});
              tweets = _.without(tweets, _.findWhere(tweets, { id: item.id}));
            });
          })
        }
      }, 3000);
}

start("lremedi");
consume("lremedi");