var activeTemplate;
var apikey;

$(function() {

  $.getJSON( "/config.json", function( data ) {
    apikey = data.auth.mailgun.apikey;
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
    $.ajax('https://api.mailgun.net/v3/YOUR_SANDBOX.mailgun.org/messages',
    	{
    		type:"POST",
    		username: 'api',
    		password: 'key-3b94bb4a3f59ae44c7ce8aecc9f5f15f',
    		data:{
    			"html": activeTemplate,
    			"subject": "This is a test email",
    			"from": "hello@kontist.com",
    			"to": "joshua.soehn@kontist.com"
    		},
    		success:function(a,b,c){
    			console.log( 'mail sent: ', b );
    		}.bind(this),
    		error:function( xhr, status, errText ){console.log( 'mail sent failed: ', xhr.responseText );}
    	})
  });

});
