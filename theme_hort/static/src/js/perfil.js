(function($) {
    'use strict';

    $(document).ready(function() {
	function UserModel(user) {
	    this.id = ko.observable(user.id);
	    this.name = ko.observable(user.name);
	    this.email = ko.observable(user.email);
	    this.address = ko.observable(user.address);
	    this.number = ko.observable(user.number);
	    this.city = ko.observable(user.city);
	    this.state = ko.observable(user.state);
	    this.country = ko.observable(user.country);
	    this.occupation = ko.observable(user.occupation);
	    this.phone = ko.observable(user.phone);
	    this.mobile = ko.observable(user.mobile);
	    this.birthday = ko.observable(user.birthday);
	    this.gender = ko.observable(user.gender);
	    this.join_events = ko.observable(user.join_events);
	    this.profile = ko.observable(user.profile);
	    this.karma = ko.observable(user.karma);
	    this.image = ko.observable(user.image);
	    this.comment = ko.observable(user.comment);
	}
	function MainModel() {
	    this.user = ko.observable();
	    this.users = ko.observableArray([]);
	}
	var model = new MainModel();
	ko.applyBindings(model);

	openerp.jsonRpc('/forum/users').then(function(users) {
	    model.users(users);

	    $('.bxslider-two').bxSlider({
		slideWidth : 166,
		minSlides : 5,
		maxSlides : 5,
		moveSlides : 1,
		slideMargin : 0,
		pager : false
	    });
	});

	openerp.jsonRpc('/user/profile').then(function(user) {	    
	    model.user(new UserModel(user));
	    $('#tokenize-interesse').tokenize();
	    $('#tokenize-produz').tokenize();
	    $('#tokenize-interesse-editar').tokenize();
	    $('#tokenize-produz-editar').tokenize();
	});	

    });

})(jQuery);