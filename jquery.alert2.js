/**
 * jQuery.Alert
 * @version   2.0
 * @author    biohzrdmx <github.com/biohzrdmx>
 * @requires  jQuery 1.8+
 * @license   MIT
 * @copyright Copyright © 2018 biohzrdmx. All rights reserved.
 */
;(function($) {
	if (typeof $.easing.easeInOutQuad !== 'function' ) {
		$.easing.easeInOutQuad = function (x, t, b, c, d) { if ((t/=d/2) < 1) return c/2*t*t + b; return -c/2 * ((--t)*(t-2) - 1) + b; };
	}
	$.alert = function(message, options) {
		$.alert.api.show(message, options);
	};
	$.alert.api = {
		show: function(message, options) {
			var options = $.extend(true, {}, $.alert.defaults, options || {}),
				parent = $(options.parent);
				container = parent.find('.jquery-alert'),
				alertOverlay = container.find('.alert-overlay'),
				alertBox = container.find('.alert-box');
			if (container.length == 0) {
				container = $(options.templates.container);
				alertOverlay = $(options.templates.overlay);
				alertBox = $(options.templates.box);
				container.append(alertOverlay);
				container.append(alertBox);
				parent.append(container);
				container.attr('tabindex', 0);
				container.on('keyup', function(e) {
					options.callbacks.onKey(e.key);
				});
			}
			if (! container.hasClass('is-open') ) {
				container.attr('class', 'jquery-alert ' + options.theme);
				var alertMessage = alertBox.find('.alert-message'),
					alertButtons = alertBox.find('.alert-buttons');
				options.callbacks.createMessage(alertMessage, message);
				if (options.buttons) {
					alertButtons.empty();
					for (var name in options.buttons) {
						if (! options.buttons.hasOwnProperty(name) ) continue;
						var button = $(options.templates.button),
							label = options.buttons[name];
						options.callbacks.createButton(button, label, name);
						button.data('name', name);
						button.on('click', function(e) {
							e.preventDefault();
							var el = $(this),
								name = el.data('name');
							name = name[0].toUpperCase() + name.slice(1);
							var fnName = 'button' + name;
							var fnCallback = options.callbacks[fnName] || options.callbacks.onButton;
							fnCallback(el);
						});
						alertButtons.append(button);
						options.buttons[name] = button;
					}
				}
				container.data('options', options);
				options.animations.overlayIn(alertOverlay);
				options.animations.boxIn(alertBox);
				container.addClass('is-open');
				container.focus();
			}
		},
		close: function() {
			var container = $('.jquery-alert'),
				options = container.data('options'),
				alertOverlay = container.find('.alert-overlay'),
				alertBox = container.find('.alert-box');
			options.animations.boxOut(alertBox);
			options.animations.overlayOut(alertOverlay);
			setTimeout(function() {
				container.removeClass('is-open');
			}, 350);
		},
		button: function(name) {
			var container = $('.jquery-alert'),
				options = container.data('options');
				button = null,
				ret = false;
			button = options.buttons[name] || null;
			if (button) {
				button.trigger('click');
				ret = true;
			}
			return ret;
		}
	};
	$.alert.defaults = {
		parent: 'body',
		buttons: { close: 'Close' },
		theme: 'theme-light',
		templates: {
			button: '<a href="#" class="button"></a>',
			container: '<div class="jquery-alert"></div>',
			overlay: '<div class="alert-overlay"></div>',
			box: '<div class="alert-box"><div class="alert-message">{message}</div><div class="alert-buttons">{buttons}</div></div>'
		},
		animations: {
			overlayIn: function(element) {
				element.fadeIn(350);
			},
			overlayOut: function(element) {
				element.fadeOut(350);
			},
			boxIn: function(element) {
				element.css('opacity', 0).show().animate({ opacity: 1, marginTop: '-=15' }, {
					duration: 200,
					easing: 'easeInOutQuad',
					complete: function() {
						var container = $('.jquery-alert'),
							options = container.data('options');
						options.callbacks.onOpen(element);
					}
				});
			},
			boxOut: function(element) {
				element.animate({ opacity: 0, marginTop: '+=15' }, {
					duration: 200,
					easing: 'easeInOutQuad',
					complete: function() {
						var container = $('.jquery-alert'),
							options = container.data('options');
						$(this).hide();
						options.callbacks.onClose(element);
					}
				});
			}
		},
		callbacks: {
			createMessage: function(message, text) {
				message.html(text);
			},
			createButton: function(button, text, name) {
				button.text(text);
			},
			onOpen: $.noop,
			onClose: $.noop,
			onButton: function() {
				$.alert.api.close();
			},
			onKey: function(key) {
				switch (key) {
					case 'Escape':
					case 'Enter':
					case ' ':
						$.alert.api.button('close');
					break;
				}
			}
		}
	};
})(jQuery);