/* Newsletter email validation with ajax and php script */
// use of this script requires plugins.js, newsletter.php

//Do not change these variables
var note = $('.b-newsletter__valid-note'),
	email = $('.b-newsletter__email');
$(function() {
	email.watermark('Enter your email...'); //Placeholder for a newsletter
	$('.b-newsletter__submit').on('click', email, function() {
		$.ajax({
			type: "POST",
			url: "assets/php/newsletter.php", 
			data: { 
				email : email.val()
			},
			dataType: 'json', 
			success : function(data){
				$('.b-newsletter__email').removeClass('b-newsletter__email--error').addClass((data.error === true) ? 'b-newsletter__email--error' : '');
				note.fadeOut(500, function() {
					note.html(data.msg).fadeIn(500);
				});
			},
			error: function(jqXHR, textStatus, errorThrown) {
		  		console.log(textStatus, errorThrown);
		  		note.fadeOut(500, function() {
					note.html("There was an error").fadeIn(500);
				});
			}
		});
	});
});	