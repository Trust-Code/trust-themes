;
(function($) {
    $(document).ready(function() {
	$('.bxslider').bxSlider();
    });
    $(document).ready(function() {
	$('.bxslider-two').bxSlider({
	    slideWidth : 166,
	    minSlides : 5,
	    maxSlides : 5,
	    moveSlides : 1,
	    slideMargin : 0,
	    pager : false
	});
    });
})(jQuery);