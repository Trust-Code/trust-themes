(function($) {
    'use strict';

    function imageIsLoaded(e) {
        $('#img-profile').attr('src', e.target.result);
    };

    function getUrlVars() {
        var vars = [];
        var hash;
        var hashes = window.location.href.slice(
            window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }

    $(document).ready(function() {
        var email = getUrlVars()["email"];
        if (email)
            $('#login').val(unescape(email));

        function ProductModel(product) {
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
            self.district = ko.observable(user.district);
            self.city = ko.observable(user.city);
            self.city_id = ko.observable(user.city_id);
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
            self.can_buy = ko.observable(user.can_buy);
            self.karma = ko.observable(user.karma);
            self.image = ko.observable(user.image);
            self.comment = ko.observable(user.comment);

            self.old_password = ko.observable('');
            self.new_password = ko.observable('');
            self.confirm_password = ko.observable('');

            self.available_products = ko.observableArray(user.products);
            self.chosen_products = ko.observableArray(user.produce_ids);
            self.produce_images = ko.observableArray(user.produce_images);
            self.available_interests = ko.observableArray(user.products);
            self.chosen_interests = ko.observableArray(user.interest_in_ids);
            self.interest_images = ko.observableArray(user.interest_images);
            self.available_categories = ko.observableArray(user.categories);
            self.chosen_categories = ko.observableArray(user.post_category_ids);

            self.activities = ko.observableArray(user.activities);

            self.search_zip = function() {
                openerp.jsonRpc('/zip/search', '', {
                    'zip': self.zip()
                }).then(function(data) {
                    if (data['sucesso']) {
                        self.city_id(data['city_id']);
                        self.city(data['city']);
                        self.state(data['state']);
                        self.country(data['country']);
                        self.address(data['street']);
                        self.district(data['district']);
                    } else {
                        alert('CEP não encontrado');
                    }
                });

            };

            self.salvar_perfil = function() {
                var interests = [];
                $("#tokenize-interesse-editar option:selected")
                    .each(function() {
                        interests.push($(this).val());
                    });
                var produces = [];
                $("#tokenize-produz-editar option:selected").each(
                    function() {
                        produces.push($(this).val());
                    });
                var categories = [];
                $("#tokenize-temas-editar option:selected").each(
                    function() {
                        categories.push($(this).val());
                    });
                var imageUrl = $('#img-profile').attr('src');

                openerp.jsonRpc('/user/update', '', {
                    'name': self.name(),
                    'image': imageUrl,
                    'address': self.address(),
                    'number': self.number(),
                    'city': self.city(),
                    'state': self.state(),
                    'country': self.country(),
                    'occupation': self.occupation(),
                    'phone': self.phone(),
                    'mobile': self.mobile(),
                    'birthday': self.birthday(),
                    'join_events': self.join_events(),
                    'supplier': self.supplier(),
                    'customer': self.customer(),
                    'zip': self.zip(),
                    'gender': self.gender(),
                    'city_id': self.city_id(),
                    'comment': self.comment(),
                    'produce_ids': produces,
                    'interest_in_ids': interests,
                    'post_category_ids': categories,
                }).then(function(data) {
                    alert('Dados salvos');
                    window.location.reload();
                }).fail(function(err) {
                    alert(
                        'Problema para salvar os dados'
                    );
                });
            };
            self.alterar_senha = function() {
                if (self.new_password() == self.confirm_password()) {
                    openerp.jsonRpc('/password/update',
                        '', {
                            'old_password': self.old_password(),
                            'new_password': self.new_password(),
                            'confirm_password': self
                                .confirm_password(),
                        }).then(function(data) {
                        alert(
                            'Dados salvos! Você deve efetuar login novamente'
                        );
                        window.location = '/';
                    }).fail(function(err) {
                        alert(
                            'Problema para salvar os dados'
                        );
                    });
                }
            };
            self.page_view = function(page) {
                ga('send', 'pageview', page);
                alert('Ainda em construção! Aguarde');
            };
        }

        function MainModel() {
            var self = this;
            self.user = ko.observable();
            self.users = ko.observableArray([]);
            self.email_subscribe = ko.observable();

            self.subscribe = function() {
                var dados = {
                    'list_id': 1,
                    'email': self.email_subscribe()
                };
                openerp.jsonRpc(
                    '/website_mass_mailing/subscribe',
                    '',
                    dados).then(
                    function(data) {
                        window.location =
                            '/web/signup?email=' + self
                            .email_subscribe();
                    });
                return false;
            };
        }
        var model = new MainModel();
        ko.applyBindings(model);

        openerp.jsonRpc('/forum/users').then(function(users) {
            model.users(users);

            $('.bxslider-two').bxSlider({
                slideWidth: 166,
                minSlides: 5,
                maxSlides: 5,
                moveSlides: 1,
                slideMargin: 0,
                pager: false
            });
        });

        var SPMaskBehavior = function(val) {
                return val.replace(/\D/g, '').length === 11 ?
                    '(00) 00000-0000' :
                    '(00) 0000-00009';
            },
            spOptions = {
                onKeyPress: function(val, e, field, options) {
                    field.mask(SPMaskBehavior.apply({},
                        arguments), options);
                }
            };

        openerp.jsonRpc('/user/profile').then(function(user) {
            model.user(new UserModel(user));
            $("#tokenize-interesse").select2(); //
            $('#tokenize-produz').select2();
            $('#tokenize-temas').select2();
            $('#tokenize-interesse-editar').select2();
            $('#tokenize-produz-editar').select2();
            $('#tokenize-temas-editar').select2();
            $('#cep-edit').mask('00000-000');
            $('#birthday-edit').mask('00/00/0000');
            $('#phone-edit').mask(SPMaskBehavior,
                spOptions);
            $('#cell-edit').mask(SPMaskBehavior,
                spOptions);
            $('.bxslider-perfil').bxSlider({
                slideWidth: 100,
                minSlides: 5,
                maxSlides: 5,
                moveSlides: 1,
                slideMargin: 0,
                pager: false,
            });
            $("#profile-image").change(function() {
                if (this.files && this.files[0]) {
                    var reader = new FileReader();
                    reader.onload =
                        imageIsLoaded;
                    reader.readAsDataURL(this.files[
                        0]);
                }
            });
        }).fail(function(data, erro) {
            if (erro['message'] ==
                'Odoo Session Expired' &&
                window.location
                .pathname.indexOf('/page/perfil') > -1) {
                window.location = '/';
            }
        });
    });

})(jQuery);
