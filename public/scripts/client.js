/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Fake data taken from initial-tweets.json

//Ajax

const postTweet = function() {
  $('.tweetbox').on('click', function(event) {
    event.preventDefault();
  });
  const $button = $(".tweetbox");
  $button.on('click',function () {
    if ($(".textarea").val().length < 1) {
      alert('Your tweet is empty!!!');
    } else if ($(".textarea").val().length > 140) {
      alert('Your tweet is over the limit!!!');
    } else {
      $.ajax({
        url: "/tweets", 
        type: 'POST', 
        data: $(".textarea").serialize()
      })
      .done(loadTweet());
    }
  });  
  
};

const loadTweet = function() {
  $.ajax({url: "/tweets", type: 'GET'})
  .done(function(tweetDatabase) {
    renderTweets(tweetDatabase);
  });
};

//Ajax


function calDate(tweet) {
  let postDate = tweet["created_at"];
  let currentDate = Date.parse(Date())
  let dateDiff = Math.round((currentDate - postDate)/86400000);
  return dateDiff;
}

function header(tweet) {
  let icon = tweet["user"]["avatars"];
  let photo = $("<h5 class='icon'>").append(`<img src=${icon}>`);
  let username = $("<h5 class='left'>").text(tweet["user"]["name"]);
  let id = $("<h5 class='right'>").text(tweet["user"]["handle"]);
  let header = [photo, username, id]
  return header;
}

function footer(tweet) {
  // let social = $('<div>').addClass=('social');        // JH says maybe something like this?
  const date = $("<h6 id='date'>").text(calDate(tweet) +" days ago");
  const flag = $("<h6 id='social'>").append("<img src='/images/flag.png'>");
  const retweet = $("<h6 id='social'>").append("<img src='/images/retweet.png'>");
  const like = $("<h6 id='social'>").append("<img src='/images/heart.png'>");
  // $(social)
  let footer = [date, flag, retweet, like]
  return footer;
}

const renderTweets = function(tweets) {
  $('.all-tweets').empty;
  // TODO: should we delete all the old tweets here before drawing in a bunch of new ones?
  for (let tweet of tweets) {
    let result = createTweetElement(tweet)
    $('.all-tweets').prepend(result);
  }
  
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  let $header = $('<header>').addClass('tweet');
  let $footer = $('<footer>').addClass('tweet');
  $header.append(header(tweet)[0],header(tweet)[1],header(tweet)[2])
  $footer.append(footer(tweet)[0]);
  $footer.append(footer(tweet)[3], footer(tweet)[2], footer(tweet)[1]);
  $tweet.append($header);
  $tweet.append($('<p>').text(tweet["content"]["text"]));
  $tweet.append($footer);
  return $tweet;
}


