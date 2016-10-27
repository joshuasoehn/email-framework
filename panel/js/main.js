var activeTemplate;
var config;

$(function() {

  $.getJSON( "/config.json", function( data ) {
    config = data;
  });

  activeTemplate = window.location.hash.split('#')[1];
  $('iframe').attr("src", activeTemplate);

  $('.template-list li a[href="' + activeTemplate + '"]').addClass('active');

  $('.template-list li a').click(function(e){
    e.preventDefault();
    activeTemplate = $(this).attr('href');
    $('.template-list li a').removeClass('active')
    $(this).addClass('active');
    console.log(activeTemplate);
    $('iframe').attr("src", activeTemplate);
    window.location.hash = activeTemplate;
  });

  $('.send-button').click(function(){
    $.ajax({
      type: 'GET',
      url: activeTemplate
    }).done(function(templateContent) {
      console.log(templateContent);
      $.ajax({
        type: 'POST',
        url: 'https://mandrillapp.com/api/1.0/messages/send.json',
        data: {
          'key': config.auth.mandril.apikey,
          'message': {
            'from_email': config.testing.from,
            'to': [
                {
                  'email': config.testing.to,
                  'type': 'to'
                }
              ],
            'autotext': 'true',
            'subject': config.testing.subject,
            'html': templateContent
          }
        }
       }).done(function(response) {
         console.log(response); // if you're into that sorta thing
       });
    });

  });

});
