// $(document).ready(() => {
//   lol();
// });



// function lol() {
//   $(" article.tweet").hover( //<---- This line is your problem
//     function (event) {
//       console.log("hovering", event.currentTarget);
//       $(event.currentTarget).addClass('hoverArticle');
//       $(event.currentTarget).find(".right").addClass('hoverRight');
//     }, function(event) {
//       console.log("no longer hovering", event.currentTarget);
//       $(event.currentTarget).removeClass('hoverArticle');
//       $(event.currentTarget).find(".right").removeClass('hoverRight');
//     }
//   );
// };

// $(document).ready(function() {
//   $("body").find( "article", 
//   function() {
//     $("article").hover( 
//       function() { $(this).addClass('hoverArticle')},
//       function() { $(this).removeClass('hoverArticle')}
//   );
// });
// });      console.log("hovering", event.currentTarget);

// $(document).ready(function() {
//   $("article").hover(
//   function() {
//     $(this).addClass('hoverArticle');
//   },
//   function() {
//     $(this).removeClass('hoverArticle');
//   });
// }):