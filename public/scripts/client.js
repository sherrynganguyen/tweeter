
function calDate(tweet) {
  let postDate = tweet["created_at"];
  let currentDate = Date.parse(Date())
  let dateDiff = Math.round((currentDate - postDate)/86400000);
  return dateDiff;
}

// Create tag for new tweet

function header(tweet) {
  const icon = tweet["user"]["avatars"];
  const $header = $('<header>').addClass('tweet_header');
  const $div = $("<div>").addClass('user');
  const $img = $(`<img src=${icon}>`);
  const $username = $("<span>").addClass('username');
  const $handle = $("<span>").addClass('handle');

  $username.text(tweet["user"]["name"]);
  $handle.text(tweet["user"]["handle"]);

  $div.append($img, $username)
  $header.append($div, $handle)

  return $header;
}

function footer(tweet) {
  const $footer = $('<footer>').addClass('tweet_footer');
  const $date = $('<span>').text(calDate(tweet) +" days ago");
  const $div = $("<div>").addClass('social');
  const $flag = $("<img src='/images/flag.png'>");
  const $retweet = $("<img src='/images/retweet.png'>");
  const $like = $("<img src='/images/heart.png'>");

  $div.append($flag, $retweet, $like);
  $footer.append($date, $div);
  return $footer;
}

const createTweetElement = function(tweet) {
  let $tweet = $('<article>').addClass('tweet');
  $tweet.append(header(tweet));
  $tweet.append($('<p>').text(tweet["content"]["text"]));
  $tweet.append(footer(tweet));
  return $tweet;
}

// rendering tweet

const renderTweets = function(tweets) {
  $('.all-tweets').empty();
  // TODO: should we delete all the old tweets here before drawing in a bunch of new ones?
  for (let tweet of tweets) {
    let result = createTweetElement(tweet)
    $('.all-tweets').prepend(result);
  }
  
}

//Post new tweet

const postTweet = function() {
  const $button = $(".tweetbox");
  $button.on('click',function () {
    if ($(".textarea").val().length < 1) {
      let errormessage = "Your tweet is empty. Please type something!!"
      errMsg(errormessage);
    } else if ($(".textarea").val().length > 140) {
      let errormessage = "Your tweet is over the limit of 140 characters."
      errMsg(errormessage);
    } else {
      $.ajax({
        url: "/tweets", 
        type: 'POST', 
        data: $(".textarea").serialize()
      })
      .done(
        $('.textarea').val(""),
        $('.counter').html("140"),
        loadTweet()
        );
    }
  });  
  
};

const loadTweet = function() {
  $.ajax({url: "/tweets", type: 'GET'})
  .done(function(tweetDatabase) {
    renderTweets(tweetDatabase);
  });
};

// slide up-slide down - NEW POST

const slideUpDown = function() {
  $( "#toggle" ).on('click',(function() {
    if ($(".new-tweet").hasClass('hidden')) {
      $( ".new-tweet" ).slideToggle().removeClass('hidden')
    } else {
      $( ".new-tweet" ).slideToggle().addClass('hidden')
    }
  })
  ) 
}

// slide up & down for Error message


const errMsg = function(errormessage) {
  // $( ".tweetbox" ).on('click',(function() {
    if ($("#error").hasClass('hidden')) {
      $( "#error" ).slideToggle().removeClass('hidden')
      $( "#error" ).text(errormessage)
    } else {
      $( "#error" ).slideToggle().addClass('hidden')
    }
  // })
  // ) 
}

  $('.all-tweet').load()
// $(".new-tweet").hide().addClass('hidden');
  $('.tweetbox').on('click', function(event) {
    event.preventDefault();
  });
  slideUpDown();
  
  postTweet();

$(document).ready(function() {
  $("#error").hide().addClass('hidden')
  $(".new-tweet").hide().addClass('hidden')
  loadTweet();
  slideUpDown()
  postTweet();

});
