/*
| ----------------------------------------------------------------------------------
| TABLE OF CONTENT
| ----------------------------------------------------------------------------------
-CAROUSEL SETTING     
-Go to top animation   
-Search Field Animation   
-More App
-Mobile Menu Animation
-Popup Settings
-Placeholder for IE
-Scroll to top button
*/

new WOW().init();

$(document).ready(function(){
	"use strict";
	
    /////////////////////////////////////////////////////////////////
    // CAROUSEL SETTING
    /////////////////////////////////////////////////////////////////
    
    $('.dropdown-menu a').on('click', function(e){
		e.stopPropagation();
    });
	
	$("#owl-reviews").owlCarousel({
		singleItem : true,
		autoPlay: 4000
	});
	$("#owl-apps").owlCarousel({
		items : 4,
		itemsCustom : [
			[0, 1],
			[580, 2],
			[860, 3],
			[1120, 4],
		],
	});
	$("#owl-trending").owlCarousel({
		items : 4,
	});	
	$("#owl-members").owlCarousel({
		items : 6,
	});
	$("#owl-screenshots").owlCarousel({
		items : 3,
		navigation: true,
		navigationText: ['',''],
		pagination: false,
		itemsCustom : [
			[0, 1],
			[650, 2],
			[950, 3],
		],
	});
	$(".owl-blog_carousel").owlCarousel({		
		singleItem : true,
    	transitionStyle : "fadeUp",
	});
	$("#owl-trend_carousel").owlCarousel({		
		singleItem : true,
		autoPlay: 4000
	});
	$("#owl-app-screenshot").owlCarousel({		
		singleItem : true,
		autoPlay: 4500
	});
	
    /////////////////////////////////////////////////////////////////
    // Go to top animation
    /////////////////////////////////////////////////////////////////
	
	$(".goToTop").on('click', function(e){
		e.preventDefault();
		$('html,body').animate({
			scrollTop:0
		},'slow');
	});
	
    /////////////////////////////////////////////////////////////////
    // Search Field Animation
    /////////////////////////////////////////////////////////////////
	
	$(".iconSearch").on('click', function(e){
		e.preventDefault();
		$(this).parent('.search').toggleClass('active');
	});
	
    /////////////////////////////////////////////////////////////////
    // More App
    /////////////////////////////////////////////////////////////////
	
	$('.showAllAppBtn').on('click', function(e){
		e.preventDefault();
		$('.app-product-item').removeClass('hidden').addClass('fadeInUp');
		$(this).addClass('hidden');
	});
	
    /////////////////////////////////////////////////////////////////
    // Mobile Menu Animation
    /////////////////////////////////////////////////////////////////
	
	$('.mobileMenuNav').on('click', function(e){
		$('body').toggleClass('openMenu');
	});
	
    /////////////////////////////////////////////////////////////////
    // Popup Settings
    /////////////////////////////////////////////////////////////////
	
	$(document).delegate('*[data-toggle="lightbox"]:not([data-gallery="navigateTo"])', 'click', function(event) {
		event.preventDefault();
		$(this).ekkoLightbox({});
	});
	
    /////////////////////////////////////////////////////////////////
    // Placeholder for IE
    /////////////////////////////////////////////////////////////////
	
	$('input, textarea').placeholder();
});


/////////////////////////////////////////////////////////////////
// Scroll to top button & Fixed Header
/////////////////////////////////////////////////////////////////

var topOffset = $(window).scrollTop();
if(topOffset > 0){
	$('body').addClass('fixed-header');
}

$(window).scroll(function(){
	var fromTop = $(this).scrollTop();
	var display = 'none';
	if(fromTop > 650){
		display = 'block';
	}
	if(fromTop > 0){
		$('body').addClass('fixed-header');
	}
	else{
		$('body').removeClass('fixed-header');
	}
	$('#scrollTop').css({'display': display});
});