/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json
const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

function calDate(tweet) {
  let postDate = tweet["created_at"];
  let currentDate = Date.parse(Date())
  let dateDiff = Math.round((currentDate - postDate)/86400000);
  return dateDiff;
}

function header(tweet) {
  let username = $("<h5 class='left'>").text(tweet["user"]["name"]);
  let id = $("<h5 class='right'>").text(tweet["user"]["handle"]);
  let header = [username, id]
  return header;
}

function footer(tweet) {

  let date = $("<h6 id='date'>").text(calDate(tweet) +" days ago");
  let flag = $("<h6 id='social'>").prepend("<img src='/images/flag.png'>");
  let retweet = $("<h6 id='social'>").prepend("<img src='/images/retweet.png'>");
  let like = $("<h6 id='social'>").prepend("<img src='/images/heart.png'>");

  let footer = [date, flag, retweet, like]
  return footer;
}

const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let result = createTweetElement(tweet)
    $('.container').append(result);
  }
  
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  $tweet.append(header(tweet)[0]);
  $tweet.append(header(tweet)[1]); 

  $tweet.append($('<p>').text(tweet["content"]["text"]));
  
  $tweet.append(footer(tweet)[0]);
  $tweet.append(footer(tweet)[3], footer(tweet)[2], footer(tweet)[1]);

  return $tweet;
}

renderTweets(data);


// const $tweet = createTweetElement();

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.