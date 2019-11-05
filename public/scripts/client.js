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

// const header = function (tweet) {
//   let username = tweet["user"]["name"];
//   let tweeter = tweet["user"]["handle"];
//   return username, tweeter;
// }


const renderTweets = function(tweets) {
  for (let tweet of tweets) {
    let result = createTweetElement(tweet)
    $('#tweets-container').append(result);
  }
  
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet'); //create new article class??
  // ...
  $tweet.append($("<h5 id='left'>").text(tweet["user"]["name"]));
  $tweet.append($("<h5 id='right'>").text(tweet["user"]["handle"]));
  $tweet.append($('<p>').text(tweet["content"]["text"]));
  $tweet.append($('<h6>').text(tweet["created_at"]));
  return $tweet;
}

renderTweets(data);


// const $tweet = createTweetElement();

// Test / driver code (temporary)
// console.log($tweet); // to see what it looks like
// $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.