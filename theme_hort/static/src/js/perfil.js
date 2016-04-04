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
	    self.partner_id = ko.observable(user.partner_id);
	    self.name = ko.observable(user.name);
	    self.email = ko.observable(user.email);
	    self.zip = ko.observable(user.zip);
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
	    self.supplier = ko.observable(user.supplier);
	    self.customer = ko.observable(user.customer);	    
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
	    self.available_categories = ko.observableArray(user.categories);
	    self.chosen_categories = ko.observableArray(user.post_category_ids);
	    
	    self.activities = ko.observableArray(user.activities);
	    
	    self.search_zip = function(){
		openerp.jsonRpc('/web/dataset/call_kw/res.partner/write', 'call', 
		    {
			'args': [self.partner_id(), {'zip': self.zip()}],
			'method': 'write', 
			'model': 'res.partner',
			'kwargs': { 'context': { 'lang': 'pt_BR', 'tz': 'America/Sao_Paulo'}}
		    }		    
		).then(function (){
		
		openerp.jsonRpc('/web/dataset/call_button', 'call', {
		   'args': [ self.partner_id(), {'lang': 'pt_BR', 'tz': 'America/Sao_Paulo',
		       'params': { 'action': 60, 'id': self.partner_id(), 
			       'menu_id': 74,'model': "res.partner",'view_type': "form"}}],
		   'method': 'zip_search', 
		   'model': 'res.partner',
		   'context_id': self.id(),
		}).then(function (data){
		    openerp.jsonRpc('/user/profile').then(function(user) {
            	       model.user(new UserModel(user));
            	       $("#tokenize-interesse").select2();
            	       $('#tokenize-produz').select2();
            	       $('#tokenize-temas').select2();
            	       $('#tokenize-interesse-editar').select2();
            	       $('#tokenize-produz-editar').select2();
            	       $('#tokenize-temas-editar').select2();
            	       $('#tab-list-menu li:eq(2) a').tab('show');
            	    });		    
		}).fail(function(){
		   alert('Nenhum cep encontrado'); 
		});		
		});
		
	    };

	    self.salvar_perfil = function() {
		var interests = [];
		$("#tokenize-interesse-editar option:selected" ).each(function() {
		    interests.push($(this).val());
                });
		var produces = [];
		$("#tokenize-produz-editar option:selected" ).each(function() {
		    produces.push($(this).val());
                });
		var categories = [];
		$("#tokenize-temas-editar option:selected" ).each(function() {
		    categories.push($(this).val());
                });
		openerp.jsonRpc('/user/update', '', {
		    'name' : self.name(), 'address': self.address(),
		    'number' : self.number(), 'city': self.city(),
		    'state' : self.state(), 'country': self.country(),
		    'occupation' : self.occupation(), 'phone': self.phone(),
		    'mobile' : self.mobile(), 'birthday': self.birthday(),
		    'join_events' : self.join_events(), 'supplier': self.supplier(),
		    'customer': self.customer(), 'zip': self.zip(),
		    'gender': self.gender(), 
		    'comment': self.comment(), 
		    'produce_ids': produces,
		    'interest_in_ids': interests,
		    'post_category_ids': categories,
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
	    $("#tokenize-interesse").select2();	    //
	    $('#tokenize-produz').select2();
	    $('#tokenize-temas').select2();
	    $('#tokenize-interesse-editar').select2();
	    $('#tokenize-produz-editar').select2();
	    $('#tokenize-temas-editar').select2();
	});

    });

})(jQuery);