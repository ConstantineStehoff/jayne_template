/* Form validation, pricetable resize on hover, and on click button scroll */
// use of this script requires plugins.js and contact-form.php

// ******************************* Configuration start **************************//

var gm_address_latitude = -37.815209, //Latitude and longitude address
	gm_address_longitude = 144.965429,
	gm_circle_color = '#E67E22'; //Color of the address highlighter

// ******************************* Configuration end **************************//

//Do not change these variables
var map,
	formName = $('.b-contact-form__input--name'),
	formEmail = $('.b-contact-form__input--email'),
	formMsg = $('.b-contact-form__textarea--message'),
	priceTableItems = $('.b-pricing-table__item'),
	place = new google.maps.LatLng(gm_address_latitude, gm_address_longitude),
	k = {path:google.maps.SymbolPath.CIRCLE, fillOpacity:1, fillColor:gm_circle_color, strokeOpacity:1, strokeColor:gm_circle_color, strokeWeight:1, scale:12};

/* This function resizes the price tables container */
function priceContainerResized(){ 
	if(window.matchMedia("(min-width: 767px)").matches){	
		$('.b-pricing-table__container').css('height', $('.b-pricing-table__item').height()+155);
	} else {
		$('.b-pricing-table__container').css('height', 'auto');
	}
}

/* This function highlights the errors in the form */			
function highlightErrors(validator, input_field, error_type){
	if(validator){
		$(input_field).addClass('b-contact-form__error');
		$(error_type).addClass('g-show').fadeIn(500);
	} else {
		$(input_field).removeClass('b-contact-form__error');
		$(error_type).removeClass('g-show').fadeOut(500);
	}
}

/* This function initializes the contacts map */
function initialize() {
   var mapOptions = {
        center: place,
        zoom: 15,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL,
            position: google.maps.ControlPosition.TOP_LEFT
        },
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    var t = new google.maps.Marker({
    	position: place,
        map: map,
       	icon: k
    });
}

$(function() {
	formName.watermark('Name'); //Placeholders for the form
	formEmail.watermark('Email');
	formMsg.watermark('Message');
	
	/* Form validation with ajax and php script on form submit */
	$("form").submit(function (e) {
        e.preventDefault(); //prevent default form submit
		$.ajax({
			type: "POST",
			url: "assets/php/contact-form.php", 
			data: { 
				contactName : formName.val(),
				contactEmail : formEmail.val(),
				contactMsg : formMsg.val()
			},
			dataType: 'json',
			success : function(data){
				highlightErrors(data['errors']['Name']['missing-error'], '.b-contact-form__input--name', '.b-contact-form__error-msg--name-empty');
				highlightErrors(data['errors']['Email']['missing-error'], '.b-contact-form__input--email', '.b-contact-form__error-msg--email-empty');
				if(data['errors']['Email']['missing-error'] === false){
					highlightErrors(data['errors']['Email']['validEmail-error'], '.b-contact-form__input--email', '.b-contact-form__error-msg--email-validEmail');
				}	
				highlightErrors(data['errors']['Message']['missing-error'], '.b-contact-form__textarea--message', '.b-contact-form__error-msg--msg-empty');
					$('.b-contact-form__success-msg').removeClass('g-show').addClass((data['success']) ? 'g-show' : '');
				},
				error: function(jqXHR, textStatus, errorThrown) {
	  				console.log(textStatus, errorThrown);
				}
		});	
	});	
		
	/* Scrolls to the contact us section when contact link is clicked */
	$('.b-services__contact-link').on("click", function(){
		$('html, body').animate({scrollTop: $('.b-contact-us').offset().top}, 2000);	
	});
			
	$(window).resize(function(){ priceContainerResized();}); //using resizing container function
	priceContainerResized(); 
			
	/* Resizing the price table on hover */
	priceTableItems.hover(function(){
		priceTableItems.removeClass('b-pricing-table__item--active');
		$(this).addClass('b-pricing-table__item--active');
	});
	google.maps.event.addDomListener(window, "load", initialize);
});		