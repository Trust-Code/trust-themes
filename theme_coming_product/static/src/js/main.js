/*
	Eventually by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function() {

	"use strict";

	// Methods/polyfills.

		// classList | (c) @remy | github.com/remy/polyfills |
		// rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// window.addEventListener
			(function(){if("addEventListener"in window)return;window.addEventListener=function(type,f){window.attachEvent("on"+type,f)}})();

	// Vars.
		var	$body = document.querySelector('body');

	// Disable animations/transitions until everything's loaded.
		$body.classList.add('is-loading');

		window.addEventListener('load', function() {
			window.setTimeout(function() {
				$body.classList.remove('is-loading');
			}, 100);
		});

	// Slideshow Background.
		(function() {

			// Settings.
				var settings = {

					// Images (in the format of 'url':
					// 'alignment').
						images: {
							'/theme_coming_product/static/src/images/bg01.jpg': 'center',
							'/theme_coming_product/static/src/images/bg02.jpg': 'center',
							'/theme_coming_product/static/src/images/bg03.jpg': 'center',
							'/theme_coming_product/static/src/images/bg04.jpg': 'center',
							'/theme_coming_product/static/src/images/bg05.jpg': 'center'
						},

					// Delay.
						delay: 6000

				};

			// Vars.
				var	pos = 0, lastPos = 0,
					$wrapper, $bgs = [], $bg,
					k, v;

			// Create BG wrapper, BGs.
				$wrapper = document.createElement('div');
					$wrapper.id = 'bg';
					$body.appendChild($wrapper);

				for (k in settings.images) {

					// Create BG.
						$bg = document.createElement('div');
							$bg.style.backgroundImage = 'url("' + k + '")';
							$bg.style.backgroundPosition = settings.images[k];
							$wrapper.appendChild($bg);

					// Add it to array.
						$bgs.push($bg);

				}

			// Main loop.
				$bgs[pos].classList.add('visible');
				$bgs[pos].classList.add('top');

				// Bail if we only have a single BG or the
				// client doesn't support transitions.
					if ($bgs.length == 1
					||	!canUse('transition'))
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $bgs.length)
							pos = 0;

					// Swap top images.
						$bgs[lastPos].classList.remove('top');
						$bgs[pos].classList.add('visible');
						$bgs[pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$bgs[lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

	// Signup Form.
		(function() {

			// Vars.
				var $form = document.querySelectorAll('#signup-form')[0],
					$submit = document.querySelectorAll('#signup-form input[type="submit"]')[0],
					$message;

			// Bail if addEventListener isn't supported.
				if (!('addEventListener' in $form))
					return;

			// Message.
				$message = document.createElement('span');
					$message.classList.add('message');
					$form.appendChild($message);

				$message._show = function(type, text) {

					$message.innerHTML = text;
					$message.classList.add(type);
					$message.classList.add('visible');

					window.setTimeout(function() {
						$message._hide();
					}, 3000);

				};

				$message._hide = function() {
				    $message.classList.remove('visible');
				};

                        	function getUrlVars() {
                                	var vars = [], hash;
                                	var hashes = window.location.href.slice(
                                		window.location.href.indexOf('?') + 1).split('&');
                                	for (var i = 0; i < hashes.length; i++) {
                                	    hash = hashes[i].split('=');
                                	    vars.push(hash[0]);
                                	    vars[hash[0]] = hash[1];
                                	}
                                	return vars;
                        	};                            
				
				$form.addEventListener('submit', function(event) {
				    	var origem = getUrlVars()["origem"] == 'harpia'?'em-breve-page-harpia':'em-breve-page-uirapuru';
				    
					event.stopPropagation();
					event.preventDefault();
					// Hide message.
					$message._hide();
					// Disable submit.
					$submit.disabled = true;					
					
					
					$.ajax({
                                            url: 'http://www.pelicanerp.com.br/lead-capture',
                                            type: 'post',
                                            success: function (data) {
                                        	$form.reset();
                                        	$submit.disabled = false;
                                        	$message._show('success', 'Muito obrigado! Em breve lhe enviaremos novidades');
                                            },
                                            data: { 
                                        	'contact_name' : $('#em-breve-page-name').val(),
                				'email_from' : $('#em-breve-page-email').val(),
                				'company_segment' : $('#em-breve-page-company-segment').val(),
                				'origin' : origem,
                			    },
                			    error:function(error) {
                				alert('Falha ao executar comando!');
                				$submit.disabled = false;
                			    }
                                        });					

				});

		})();

})();