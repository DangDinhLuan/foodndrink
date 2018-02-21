$(document).ready(function(){
  $(".datepicker").datepicker({
    format: "yyyy-mm-dd",
    icons: {
        time: "fa fa-clock-o",
        date: "fa fa-calendar",
        up: "fa fa-chevron-up",
        down: "fa fa-chevron-down",
        previous: "fa fa-chevron-left",
        next: "fa fa-chevron-right",
        today: "fa fa-screenshot",
        clear: "fa fa-trash",
        close: "fa fa-remove"
    }
  });
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> adf62b8... Admin filter order

  $( "#btn-import" ).on( "click", function() {
    $( "#import-file" ).trigger( "click" );
  });

  $("#import-file").on("change", function(){
    $( "#submit-file" ).trigger( "click" );
  });
<<<<<<< HEAD
=======
>>>>>>> 8628d3c... Admin - View statistics
=======
>>>>>>> adf62b8... Admin filter order
});
