/**
 * jQuery Alert
 * @author     biohzrdmx <github.com/biohzrdmx>
 * @version    1.0.20131213
 * @requires   jQuery 1.8+
 * @license    MIT
 */
;(function($) {
	if (typeof $.easing.easeInOutQuad !== 'function' ) {
		$.easing.easeInOutQuad = function (x, t, b, c, d) { if ((t/=d/2) < 1) return c/2*t*t + b; return -c/2 * ((--t)*(t-2) - 1) + b; };
	}
	$.alert = function(message, options) {
		var opts = $.extend(true, {}, $.alert.defaults, options);
		var alert = $( opts.markup.replace('{message}', message) );
		var container = $(opts.container);
		var buttons = [];
		if (opts.onlyOne && container.find('.alert-overlay').length > 0) {
			$.alert.close();
		}
		//
		if (opts.themeClass) {
			alert.addClass(opts.themeClass);
		}
		//
		var buttonContainer = alert.find('.alert-buttons');
		buttonContainer.empty();
		$.each(opts.buttons, function(index, val) {
			var button = $(opts.buttonMarkup);
			var key = opts.buttons[index].key || index;
			button.addClass('button-' + key);
			button.text( opts.buttons[index].text || 'Close' );
			button.on('click', opts.buttons[index].action || $.noop);
			buttonContainer.append(button);
		});
		//
		var dialog = alert.find('.alert');
		alert.hide();
		container.append(alert);
		alert.fadeIn();
		opts.fnShow(dialog, opts.onOpen);
		alert.data('alert-opts', opts);
	};
	$.alert.close = function() {
		var alert = $('.alert-overlay');
		var dialog = alert.find('.alert');
		var opts = alert.data('alert-opts');
		var detachIt = function() {
			alert.detach();
			opts.onClose.call();
		};
		if (opts) {
			opts.fnHide(dialog, function() {
				alert.fadeOut(detachIt);
			});
		} else {
			alert.fadeOut(detachIt);
		}
	};
	$.alert.defaults = {
		container: 'body',
		markup: '<div class="alert-overlay"><div class="alert"><div class="alert-message">{message}</div><div class="alert-buttons"></div></div></div>',
		buttonMarkup: '<button></button>',
		themeClass: '',
		onlyOne: true,
		buttons: [
			{
				text: 'Close',
				action: function() {
					$.alert.close();
				}
			}
		],
		onOpen: $.noop,
		onClose: $.noop,
		fnShow: function(element, callback) {
			element.css({ opacity: 0, marginTop: '-=40' });
			element.animate({ opacity: 1, marginTop: '+=40' }, { duration: 200, easing: 'easeInOutQuad', complete: callback || $.noop });
		},
		fnHide: function(element, callback) {
			element.animate({ opacity: 0, marginTop: '-=40' }, { duration: 200, easing: 'easeInOutQuad', complete: callback || $.noop });
		}
	};
})(jQuery);