(function($) {
    'use strict';

    $(document).ready(function() {
	function ProductModel(product){
	    this.id = product.id;
	    this.name = product.name;
	}
	
	function UserModel(user) {
	    var self = this;
	    self.id = ko.observable(user.id);
	    self.name = ko.observable(user.name);
	    self.email = ko.observable(user.email);
	    self.address = ko.observable(user.address);
	    self.number = ko.observable(user.number);
	    self.city = ko.observable(user.city);
	    self.state = ko.observable(user.state);
	    self.country = ko.observable(user.country);
	    self.occupation = ko.observable(user.occupation);
	    self.phone = ko.observable(user.phone);
	    self.mobile = ko.observable(user.mobile);
	    self.birthday = ko.observable(user.birthday);
	    self.gender = ko.observable(user.gender);
	    self.join_events = ko.observable(user.join_events);
	    self.profile = ko.observable(user.profile);
	    self.karma = ko.observable(user.karma);
	    self.image = ko.observable(user.image);
	    self.comment = ko.observable(user.comment);

	    self.old_password = ko.observable('');
	    self.new_password = ko.observable('');
	    self.confirm_password = ko.observable('');
	    
	    self.available_products = ko.observableArray(user.products);
	    self.chosen_products = ko.observableArray(user.produce_ids);
	    self.available_interests = ko.observableArray(user.products);
	    self.chosen_interests = ko.observableArray(user.interest_in_ids);

	    self.salvar_perfil = function() {
		var interests = [];
		$("#tokenize-interesse-editar option:selected" ).each(function() {
		    interests.push($(this).val());
                });
		var produces = []
		$("#tokenize-produz-editar option:selected" ).each(function() {
		    produces.push($(this).val());
                });		
		openerp.jsonRpc('/user/update', '', {
		    'name' : self.name(), 'address': self.address(),
		    'number' : self.number(), 'city': self.city(),
		    'state' : self.state(), 'country': self.country(),
		    'occupation' : self.occupation(), 'phone': self.phone(),
		    'mobile' : self.mobile(), 'birthday': self.birthday(),
		    'join_events' : self.join_events(), 'profile': self.profile(),
		    'gender': self.gender(), 
		    'comment': self.comment(), 'produce_ids': produces,
		    'interest_in_ids': interests,
		}).then(function(data) {
		    alert('Dados salvos');
		}).fail(function(err) {
		    alert('Problema para salvar os dados');
		});
	    };	    
	    self.alterar_senha = function() {
		if(self.new_password() == self.confirm_password()){
    		openerp.jsonRpc('/password/update', '', {
    		    'old_password' : self.old_password(),
    		    'new_password' : self.new_password(),
    		    'confirm_password' : self.confirm_password(),
    		}).then(function(data) {
    		    alert('Dados salvos! Você deve efetuar login novamente');
    		    window.location = '/';
    		}).fail(function(err) {
    		    alert('Problema para salvar os dados');
    		});
    		}
	    };
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