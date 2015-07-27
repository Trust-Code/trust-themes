			
			
			(function () {
				"use strict";
					
					
					/* ------------------------------------------------------------------------ */
					/* LOADER *///
					/* ------------------------------------------------------------------------  */

					 
					jQuery(window).load(function() { // makes sure the whole site is loaded
						jQuery('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
						jQuery('body').delay(350).css({'overflow-x':'hidden', 'overflow-y':'visible'});
					});
	
	
	
					/* ------------------------------------------------------------------------ 
					   TOOLTIP
					------------------------------------------------------------------------ */
					jQuery('[data-toggle="tooltip"]').tooltip();
					
					
					
					/* ------------------------------------------------------------------------ 
					   TOGGLE SEARCH CUSTOM FUNCTION
					------------------------------------------------------------------------ */
					jQuery("#show-search").on("click", function(){
						jQuery("#search").fadeIn();
						return false;
					});
					jQuery("#close-search").on("click", function(){
						jQuery("#search").fadeOut();
						return false;
					});
					
					
					
				
					/* ------------------------------------------------------------------------ 
					   OUR WORK 
					------------------------------------------------------------------------ */
					jQuery(".our-work").owlCarousel({
						items: 4,
						itemsDesktop: [1199, 4],
						itemsDesktopSmall: [979, 3],
						itemsTablet: [768, 2],
						itemsMobile: [479, 1]
					});
				
				
										
					
					
					/* ------------------------------------------------------------------------ 
					   TEXT SLIDER 
					------------------------------------------------------------------------ */
					jQuery(".text-slider").owlCarousel({
						singleItem: true
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   IMAGE ROTATER
					------------------------------------------------------------------------ */
					jQuery(".image-slider, .img-slider").owlCarousel({
						navigation: true,
						singleItem: true
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   LATEST WORK SLIDER
					------------------------------------------------------------------------ */
					jQuery(".latest-work-slider").owlCarousel({
						singleItem: true,
						navigation: true,
						transitionStyle : "fade"
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   COUNTER SLIDER
					------------------------------------------------------------------------ */
					jQuery(".slider-counter").owlCarousel({
						singleItem: true,
						navigation: false,
						autoPlay  : true
					});
					
					
					/* ------------------------------------------------------------------------ 
					   RECENT WORK
					------------------------------------------------------------------------ */
					jQuery(".recent-work").owlCarousel({
						items: 3,
						itemsDesktop: [1199, 3],
						itemsDesktopSmall: [979, 3],
						itemsTablet: [768, 2],
						itemsMobile: [479, 1],
						navigation: true
					});
					
					
					
					/* ------------------------------------------------------------------------ 
					   IMG SLIDER
					------------------------------------------------------------------------ */
					jQuery(".img-slider-with-thumbs").responsiveSlides({
						manualControls: '.img-slider-with-thumbs-pager',
						maxwidth: 1000
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   BG IMG SLIDER
					------------------------------------------------------------------------ */
					jQuery(".bg-image-slides").responsiveSlides({
						maxwidth: 10000,
						nav: true
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   HISTORY SLIDER
					------------------------------------------------------------------------ */ 
					jQuery("#history-slider").responsiveSlides({
						maxwidth: 1200,
						manualControls: '#history-slider-pager',
						timeout: 10000E3,
						speed: 700
					});
					
	
	
					
					/* ------------------------------------------------------------------------ 
					   TWEET SLIDER
					------------------------------------------------------------------------ */
					jQuery(".tweet-slider").responsiveSlides({
						maxwidth: 550
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   LOGOS CAROUSEL
					------------------------------------------------------------------------ */
					jQuery(".logos-carousel").owlCarousel({
						items: 4,
						itemsDesktop: [1199, 4],
						itemsDesktopSmall: [979, 3],
						itemsTablet: [768, 2],
						itemsMobile: [479, 1]
					});
					
					jQuery(".logos-carousel-5-items").owlCarousel({
						items: 5,
						itemsDesktop: [1199, 5],
						itemsDesktopSmall: [979, 4],
						itemsTablet: [768, 2],
						itemsMobile: [479, 1]
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   COMPANY PARTNERS
					------------------------------------------------------------------------ */
					jQuery(".company-partners-carousel").owlCarousel({
						items: 3,
						itemsDesktop: [1199, 3],
						itemsDesktopSmall: [979, 3],
						itemsTablet: [768, 2],
						itemsMobile: [479, 1]
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   RECENT NEWS
					------------------------------------------------------------------------ */
					jQuery(".recent-news-carousel").owlCarousel({
						items: 3,
						itemsDesktop: [1199, 3],
						itemsDesktopSmall: [979, 3],
						itemsTablet: [768, 2],
						itemsMobile: [479, 1]
					});
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   LOGO SLIDER 1
					------------------------------------------------------------------------ */
					jQuery(".logo1-rotater").responsiveSlides({
						maxwidth: 1000,
						timeout: 3E3,
						speed: 700
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   LOGO SLIDER 2
					------------------------------------------------------------------------ */
					jQuery(".logo2-rotater").responsiveSlides({
						maxwidth: 1000,
						timeout: 4E3,
						speed: 700
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   LOGO SLIDER 3
					------------------------------------------------------------------------ */
					jQuery(".logo3-rotater").responsiveSlides({
						maxwidth: 1000,
						timeout: 2E3,
						speed: 700
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   LOGO SLIDER 4
					------------------------------------------------------------------------ */
					jQuery(".logo4-rotater").responsiveSlides({
						maxwidth: 1000,
						timeout: 5E3,
						speed: 700
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   LOGO SLIDER 5
					------------------------------------------------------------------------ */
					jQuery(".logo5-rotater").responsiveSlides({
						maxwidth: 1000,
						timeout: 6E3,
						speed: 700
					});
					
					
					
					/* ------------------------------------------------------------------------ 
					   COMPANY ENVIORNMENT SLIDER
					------------------------------------------------------------------------ */
					jQuery("#company-environment-slider").responsiveSlides({
						maxwidth: 1170,
						pager: true
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   COMPANY PARTNERS TABS
					------------------------------------------------------------------------ */
					jQuery('.company-partners-tabs, .careers-tabs').easyResponsiveTabs({
						type: 'default', //Types: default, vertical, accordion           
						width: 'auto', //auto or any width like 600px
						fit: true,   // 100% fit in a container
						closed: 'accordion' // Start closed if in accordion view
					});
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   FORM VALIDATION [use id to identify]
					------------------------------------------------------------------------ */
					jQuery("#subscribe").validationEngine();
				
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   FULL WIDTH EMBEDED VIDEO
					------------------------------------------------------------------------ */
					var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
					$fluidEl = $("figure");
							
					$allVideos.each(function() {
					
					$(this)
						// jQuery .data does not work on object/embed elements
						.attr('data-aspectRatio', this.height / this.width)
						.removeAttr('height')
						.removeAttr('width');
					
					});
					
					$(window).resize(function() {
					
					  var newWidth = $fluidEl.width();
					  $allVideos.each(function() {
					  
						var $el = $(this);
						$el
							.width(newWidth)
							.height(newWidth * $el.attr('data-aspectRatio'));
					  
					  });
					
					}).resize();
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   TEXT ROTATORS 
					------------------------------------------------------------------------ */
					jQuery(".text-rotator .rotate").textrotator({
						animation: "flipUp",
						speed: 1750
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   PARALLAX 
					------------------------------------------------------------------------ */
					var mobiles = jQuery(window).width();	
					if (mobiles >= 992) {
						jQuery.stellar({
							horizontalScrolling: false,
							verticalOffset: 0
						});
					}
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   CHECK OUT CUSTOM FUNCTION
					------------------------------------------------------------------------ */
					jQuery("#checkout-btn").on("click", function(){
						jQuery("#checkout").addClass("opened");
						return false;
					});
					jQuery("#checkout-close-btn").on("click", function(){
						jQuery("#checkout").removeClass("opened");
						return false;
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   TOGGLE FAQ
					------------------------------------------------------------------------ */
					jQuery(".toggle h3").on("click", function(){
						jQuery(this).parent(".toggle").find(".toggle-content").slideToggle();
						jQuery(this).parent(".toggle").toggleClass("active");
						return false;
					});
					
					
					
					
					/* ------------------------------------------------------------------------ */
					/* ANIMATIONS *///
					/* ------------------------------------------------------------------------ */	
					jQuery('.animate-it').appear();
						jQuery(document.body).on('appear', '.animate-it', function(e, $affected) {
							var fadeDelayAttr;
							var fadeDelay;
							jQuery(this).each(function(){
								if (jQuery(this).data("delay")) {
									fadeDelayAttr = jQuery(this).data("delay")
									fadeDelay = fadeDelayAttr;				
								} else {
									fadeDelay = 0;
								}			
								jQuery(this).delay(fadeDelay).queue(function(){
									jQuery(this).addClass('animated').clearQueue();
								});			
							})			
						});
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   SMOOTH SCROLLING
					------------------------------------------------------------------------ */ 
					jQuery('.scroll').each( function() {
					var $this = jQuery(this), 
						target = this.hash;
						jQuery(this).click(function (e) { 
							e.preventDefault();
							if( $this.length > 0 ) {
								if($this.attr('href') == '#' ) {  
								} else {
								   jQuery('html, body').animate({ 
										scrollTop: (jQuery(target).offset().top) - -1
									}, 1000);
								}  
							}
						});
					});
					
						
						
						
					/* ------------------------------------------------------------------------ 
					   TESTIMONIALS CAROUSEL
					------------------------------------------------------------------------ */
					jQuery(".testimonial-carousel, .testimonial-carousel-demo").owlCarousel({
						singleItem: true
					});
						
					
					
					
					/* ------------------------------------------------------------------------ 
					   FANCYBOX
					------------------------------------------------------------------------ */
					jQuery('.fancybox').fancybox({
						maxWidth	: 600,
						maxHeight	: 800,
						fitToView	: false,
						width		: '100%',
						height		: '70%',
						autoSize	: false,
						autoHeight : true,
						closeClick	: false,
						openEffect	: 'none',
						closeEffect	: 'none'
					});
					
					
						
					
					
					/* ------------------------------------------------------------------------ 
					   FANCYBOX MEDIA
					------------------------------------------------------------------------ */
					jQuery('.fancybox-media').fancybox({
						openEffect  : 'none',
						closeEffect : 'none',
						helpers : {
							media : {}
						}
					});
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   OUR PROCESS TABS
					------------------------------------------------------------------------ */
					jQuery('.our-process-tab').easyResponsiveTabs({
						type: 'default', //Types: default, vertical, accordion           
						width: 'auto', //auto or any width like 600px
						fit: true,   // 100% fit in a container
						closed: 'accordion' // Start closed if in accordion view
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   NORMAL TABS
					------------------------------------------------------------------------ */
					jQuery('.normal-tabs').easyResponsiveTabs({
						type: 'default', //Types: default, vertical, accordion           
						width: 'auto', //auto or any width like 600px
						fit: true,   // 100% fit in a container
						closed: 'accordion' // Start closed if in accordion view
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   NORMAL TABS [with bordered nav]
					------------------------------------------------------------------------ */
					jQuery('.normal-tabs-bordered-btns').easyResponsiveTabs({
						type: 'default', //Types: default, vertical, accordion           
						width: 'auto', //auto or any width like 600px
						fit: true,   // 100% fit in a container
						closed: 'accordion' // Start closed if in accordion view
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   VERTICAL TABS [with bordered nav]
					------------------------------------------------------------------------ */
					jQuery('#verticalTab').easyResponsiveTabs({
						type: 'vertical',
						width: 'auto',
						fit: true
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   MY PROFILE TABS 
					------------------------------------------------------------------------ */ 
					jQuery('#my-profile').easyResponsiveTabs({
						type: 'default', //Types: default, vertical, accordion           
						width: 'auto', //auto or any width like 600px
						fit: true,   // 100% fit in a container
						closed: 'accordion' // Start closed if in accordion view
					});
					
					
					
					
					
					
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   PORTFOLIO WIDGET
					------------------------------------------------------------------------ */
					jQuery('#Container-portfolio').mixItUp();
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   SKILLS WIDGET
					------------------------------------------------------------------------ */
					jQuery('.skills-widget').appear();
					jQuery(document.body).on('appear', '.skills-widget', function(e, $affected) {
						var fadeDelayAttr;
						var fadeDelay;
						
						jQuery(this).each(function(){
						
							if (jQuery(this).data("delay")) {
								fadeDelayAttr = jQuery(this).data("delay")
								fadeDelay = fadeDelayAttr;				
							} else {
								fadeDelay = 0;
							}			
							jQuery(this).delay(fadeDelay).queue(function(){
								jQuery('.skills-widget .progress').each(function(){
									jQuery(this).css('width', jQuery(this).attr('data-width') + '%'), jQuery(this).find('.progress-bar').css('overflow', 'visible')
								});
								
							});			
						})			
					});
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   RANGE SLIDER [price filter]
					------------------------------------------------------------------------ */
					jQuery( "#slider-range" ).slider({
					range: true,
					min: 24781,
					max: 50000,
					values: [ 28781,45000],
					
					slide: function( event, ui ) {
						
						jQuery( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
					},
					
					stop: function(event, ui) {
					   jQuery( "#sort_price_max" ).val(ui.values[ 1 ] );
					   jQuery( "#sort_price_min" ).val(ui.values[ 0 ] );
					}
					});
					jQuery( "#amount" ).val( "$" + jQuery( "#slider-range" ).slider( "values", 0 ) +
					" - $" + jQuery( "#slider-range" ).slider( "values", 1 ) );
					
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   ITEM COUNTER CUSTOM SCRIPT
					------------------------------------------------------------------------ */
					var itemcount= 0;

					$('#pluss-item').on("click", function() { 
						itemcount++;
						$('#total-items').val(itemcount);
						return false;
					});

					$('#less-item').on("click", function() { 
						itemcount--;
						$('#total-items').val(itemcount);
						return false;
					});
					
					$('.verticalTab').easyResponsiveTabs({
						type: 'vertical',
						width: 'auto',
						fit: true
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   DELETE LIST [my orders list delete list custom function]
					------------------------------------------------------------------------ */
					jQuery(".hide-btn").on("click", function(){  
						jQuery(this).parent().parent(".hide-this").hide();
						return false;
					});
					
					
					
					
					/* ------------------------------------------------------------------------ 
					   CONTACT FORM
					------------------------------------------------------------------------ */
					jQuery("#contact_form").validationEngine('attach', {
						onValidationComplete: function(form, status){
						 //alert("The form status is: " +status+", it will never submit");
						 if(status == true){
						  var contact_form = $("#contact_form").serialize();
						  $.ajax({
						   type: "POST",
						   url: 'submit.php',
						   data: contact_form,
						   success: function(html)
						   { 
						   $("#contact_form").css('opacity', '0');
								$("#response").fadeIn();
								$("#response").html('<div class="success">' + html + '<div>');
								$('#contact_form')[0].reset();
						   
						   }
						  });
						 }
					
						}  
					   });
						
						
						
						
						/* ------------------------------------------------------------------------ 
						   NEWSLETTER FORM
						------------------------------------------------------------------------ */
						jQuery("#email_form").validationEngine('attach', {
						onValidationComplete: function(form, status){
						 //alert("The form status is: " +status+", it will never submit");
						 if(status == true){
						  var email_form = $("#email_form").serialize();
						  $.ajax({
						   type: "POST",
						   url: 'submit.php',
						   data: email_form,
						   success: function(html)
						   {
						   $("#email_form").hide();
								$("#response2").show();
								$("#response2").html('<div class="success">' + html + '<div>');
								$('#email_form')[0].reset();
						   
						   }
						  });
						 }
					
						}  
					   });
					
					
			})(jQuery);