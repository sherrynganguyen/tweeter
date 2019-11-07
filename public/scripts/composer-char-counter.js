$(document).ready(function() {
  $(".textarea").keyup(function() {
    const max = 140;
    let character = $(this).val().length;
    if (character > max) {
      $(this).siblings("span").text(max  - character);
      $(this).siblings("span").addClass('colorchange');
      
      // alert('You reached the limit');
      // $(this).prop('disabled', true);
      
    } else {
      $(this).siblings("span").text(max  - character);
      $(this).siblings("span").removeClass('colorchange');
    }

    }) 

});