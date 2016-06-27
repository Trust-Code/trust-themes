(function($) {
    "use strict";
    $(document).ready(function() {
        $('#consulta-produtos').devbridgeAutocomplete({
            serviceUrl: '/product/search',
            minChars: 0,
            type: 'post',
            dataType: 'json',
            onSelect: function (suggestion) {
                window.location = suggestion.url;
            }
        });

        var slider = new MasterSlider();
        // adds Arrows navigation control to the slider.
        slider.control('arrows');
        //slider.control('timebar' , {insertTo:'#masterslider'});
        slider.control('bullets');

         slider.setup('masterslider' , {
             width:1400,    // slider standard width
             height:500,   // slider standard height
             space:1,
             layout:'fullwidth',
             loop:true,
             preload:0,
             instantStartLayers:true,
             autoplay:true
        });
    });
})(jQuery);
