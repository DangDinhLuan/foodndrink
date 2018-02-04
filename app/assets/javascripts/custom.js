$(document).ready(function(){
  $( ".avatar .camera" ).on( "click", function() {
    $( "#avatar" ).trigger( "click" );
  });

  $("#avatar").on("change", function(){
    readURL(avatar,"img-avatar");
  });

  $(document).on('click', '.browse', function(){
    var file = $(this).parent().parent().parent().find('.file');
    file.trigger('click');
  });
  
  $(document).on('change', '.file', function(){
    $(this).parent().find('.form-control').val($(this).val().replace(/C:\\fakepath\\/i, ''));
  });

  $(document).on("click", function(){
    setTimeout(function() {
      $(".number-floating").animate({opacity: "0"});
      $(".add-to-cart").animate({opacity: "0"});
    }, 2000);
  });

  $(".btn-cart").on("click", function() {
    var numberFloating = $(this).siblings(".number-floating");
    var addToCart = $(this).siblings(".add-to-cart");
    floatingNumber(numberFloating, "240px");
    floatingNumber(addToCart, "130px");
    return 0;
  });


});

function floatingNumber(elem, left) {
  left = (Number(left.replace("px", "")) - 40) + "px";
  elem.html(Number(elem.html()) + 1);
  elem.animate({opacity: "1"});
  elem.animate({left: left, fontSize: "30px"},"fast");
}

// get thumb image
function readURL(input, imgId) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function(e) {
      $('.'+imgId).attr('src', e.target.result);
    }
    reader.readAsDataURL(input.files[0]);
  }
}


/*------------------------@@filter----------------------------*/
$(function() {

  //==================Category page =======================
  $(".checkbox input[type=checkbox]").click(function() {
    $("#submit").trigger("click");
  });

  var orderByPrice = $("input#order_by_price");
  var dropDownLabel = $("#dropdown-label");
  $("#price-default").click(function() {
    dropDownLabel.html($(this).html());
    orderByPrice.val("asc");
    $("#submit").trigger("click");
  });

  $("#price-up").click(function() {
    dropDownLabel.html($(this).html());
    orderByPrice.val("asc");
    $("#submit").trigger("click");
  });

  $("#price-down").click(function() {
    dropDownLabel.html($(this).html());
    orderByPrice.val("desc");
    $("#submit").trigger("click");
  });


  //===================Homepage===================
  $("#sort-default").click(function() {
    dropDownLabel.html($(this).html());
  });

  $("#sort-food").click(function() {
    dropDownLabel.html($(this).html());
  });

  $("#sort-drink").click(function() {
    dropDownLabel.html($(this).html());
  });

});
