
//Helper functions

const calDate = tweet => {
  let postDate = tweet["created_at"];
  let currentDate = Date.parse(Date());
  let dateDiff = (currentDate - postDate) / 86400000;
  if (dateDiff >= 365) {
    dateDiff = Math.floor(dateDiff / 365);
    return `Over ${dateDiff} years ago`;
  } else if (dateDiff < 365 && dateDiff > 1) {
    return `${dateDiff} days ago`;
  } else if (dateDiff * 24 > 1) {
    dateDiff = Math.floor(dateDiff * 24);
    return `${dateDiff} hours ago`;
  } else if (dateDiff * 1400 > 1) {
    dateDiff = Math.floor(dateDiff * 1440);
    return `${dateDiff} minutes ago`;
  } else if (dateDiff * 86400 > 0) {
    dateDiff = Math.floor(dateDiff * 86400);
    return `${dateDiff} seconds ago`;
  }
};

// Create tag for new tweet

const header = tweet => {
  const icon = tweet["user"]["avatars"];
  const $header = $('<header>').addClass('tweet_header');
  const $div = $("<div>").addClass('user');
  const $img = $(`<img src=${icon}>`);
  const $username = $("<span>").addClass('username');
  const $handle = $("<span>").addClass('handle');

  $username.text(tweet["user"]["name"]);
  $handle.text(tweet["user"]["handle"]);

  $div.append($img, $username);
  $header.append($div, $handle);

  return $header;
};

const footer = tweet => {
  const $footer = $('<footer>').addClass('tweet_footer');
  const $date = $('<span>').text(calDate(tweet));
  const $div = $("<div>").addClass('social');
  const $flag = $("<img src='/images/flag.png'>");
  const $retweet = $("<img src='/images/retweet.png'>");
  const $like = $("<img src='/images/heart.png'>");

  $div.append($flag, $retweet, $like);
  $footer.append($date, $div);
  return $footer;
};

const createTweetElement = tweet => {
  let $tweet = $('<article>').addClass('tweet');
  $tweet.append(header(tweet));
  $tweet.append($('<p>').text(tweet["content"]["text"]));
  $tweet.append(footer(tweet));
  return $tweet;
};

// Render tweet

const renderTweets = tweets => {
  $('.all-tweets').empty();
  for (let tweet of tweets) {
    let newTweet = createTweetElement(tweet);
    $('.all-tweets').prepend(newTweet);
  }
};

//Post new tweet

const loadTweet = () => {
  $.ajax({url: "/tweets", type: 'GET'})
    .done(tweetDatabase => {
      renderTweets(tweetDatabase);
    });
};

const postTweet = () => {
  const $button = $(".tweetbox");
  const $text = $(".textarea");
  $button.on('click', () => {
    if ($text.val().length < 1) {
      let errormessage = "Your tweet is empty. Please type something!!";
      errMsg(errormessage);
    } else if ($text.val().length > 140) {
      let errormessage = "Your tweet is over the limit of 140 characters.";
      errMsg(errormessage);
    } else {
      $.ajax({
        url: "/tweets",
        type: 'POST',
        data: $text.serialize()
      })
        .done(
          $text.val(""),
          $(".counter").html("140"),
          loadTweet()
        );
    }
  });
  
};

// slide up-slide down - NEW POST

const slideUpDown = () => {
  $(".toggle").on('click',(() => {
    if ($(".new-tweet").hasClass('hidden')) {
      $(".new-tweet").slideToggle().removeClass('hidden');
      $(".textarea").focus();
    } else {
      $(".new-tweet").slideToggle().addClass('hidden');
    }
  })
  );
};

// slide up & down for Error message

const errMsg = errormessage => {
  if ($("#error").hasClass('hidden')) {
    $("#error").slideDown().removeClass('hidden');
    $("#error").text(errormessage);
  } 
  $(".textarea").focus();
};

$(document).ready(() => {
  $('.tweetbox').on('click', event => {
    event.preventDefault();
  });

  if (!$("#error").hasClass('hidden')) {
    $('.textarea').keydown(() => {
      $("#error").slideUp().addClass('hidden');
    }); 
  }

  $("#error").hide().addClass('hidden');
  $(".new-tweet").hide().addClass('hidden');
  loadTweet();
  slideUpDown();
  postTweet();
});
