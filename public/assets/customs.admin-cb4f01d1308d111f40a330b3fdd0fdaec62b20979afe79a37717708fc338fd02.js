$(document).ready(function(){
  $(".checkbox input[type=checkbox]").click(function() {
    $("#update-slide-status").trigger("click");
  });
});
