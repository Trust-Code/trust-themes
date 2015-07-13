$(function(){
    
    var ua = navigator.userAgent.toLowerCase(),
    isAndroid = ua.indexOf("android") > -1;
    
    var skills = function (){
        $('.bar-chart .bar-chart-item').each(function(){
            var newWidth = $(this).parent().width() * ($(this).data('percent') / 100);
            
            if (jQuery.browser.mobile === false && !isAndroid){
                $(this).width(0).animate({
                    width: newWidth
                }, 1500);
            }
            else{
                $(this).css('width', newWidth);
            }
        }); 
    };
    
    if (jQuery.browser.mobile === false && !isAndroid){
        $('.bar-chart').one('inview', function(isInView){
            if (isInView) {
                skills();
            }
        });
    }
    else{
        skills();
    }
    
    $(window).smartresize(function(){
        skills();
    });
});