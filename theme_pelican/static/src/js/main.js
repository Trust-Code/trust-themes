(function() {
    "use strict";
    var $form = document.querySelectorAll('#demo-page-contact-form')[0];
    $form.addEventListener('submit', function(event) {

	var $submit = document.querySelectorAll('#demo-page-contact-form input[type="submit"]')[0];	
	event.stopPropagation();
	event.preventDefault();
	$submit.disabled = true;
	$.ajax({
	    url : '/lead-capture',
	    type : 'post',	    
	    success : function(data) {		
		$form.reset();
		$submit.disabled = false;		
		$('#demo-page-alert').slideDown();
	    },
	    data : {
		'contact_name' : $('#demo-page-contact-name').val(),
		'email_from': $('#demo-page-contact-email').val(),
		'company_segment': $('#demo-page-contact-company-segment').val(),
		'origin': 'demo-page-pelican',
	    },
	    error: function(error) {
		alert('Falha ao executar comando!');
		$submit.disabled = false;
	    },
	});

    });
})();