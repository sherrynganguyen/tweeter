$(document).ready(function() {
  // --- our code goes here ---
  $(".textarea").keyup(function() {
    const max = 140;
    let character = $(this).val().length;
    if (character > max) {
      $(".counter").text(max  - character);
      $(".counter").css('color', 'red');
      // alert('You reached the limit');
      // $(this).disabled;
      
    } else {
      $(".counter").text(max  - character);

    }

    }) 
});