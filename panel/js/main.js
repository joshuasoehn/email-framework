$(function() {

  var activeTemplate;

  $('.template-list li a').click(function(e){
    e.preventDefault();
    activeTemplate = $(this).attr('href');
    $('.template-list li a').removeClass('active')
    $(this).addClass('active');
    console.log(activeTemplate);
    $('iframe').attr("src", activeTemplate)
  });

});
