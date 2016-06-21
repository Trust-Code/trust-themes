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
    });
})(jQuery);
