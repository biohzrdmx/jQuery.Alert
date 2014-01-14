##Introduction##

Say no to vanilla JS alerts. They're fugly on some browsers and will make your users think there are errors on your page.

With this plugin you'll be able to create rich, completely customizable alerts in seconds.

###Credits###

**Lead coder:** biohzrdmx [&lt;github.com/biohzrdmx&gt;](http://github.com/biohzrdmx)

###License###

The MIT License (MIT)

Copyright (c) 2013 biohzrdmx

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

##Basic usage##

Remember the old alert() function? Well, just add jQuery to the mix and you're set.

	$('button.example-1').on('click', function(e) {
	  $.alert('Hello! <strong>I'm an alert!</strong>');
	});

Yep, it even displays HTML markup.

###Custom buttons? No problem!###

	$.alert('What the? I have two buttons!', {
	  buttons: [
	    {
	      text: 'Click me',
	      action: function() {
	        $.alert.close();
	      }
	    },
	    {
	      text: 'No! Click me!!',
	      action: function() {
	        $.alert.close();
	      }
	    }
	  ]
	});

###Callbacks? Ja!###

	$('button.example-3').on('click', function(e) {
	  $.alert('Look at the area below the button that you just clicked', {
	    onOpen: function() {
	      $('#callback').text('Alert opened!!');
	    },
	    onClose: function() {
	      $('#callback').text('Alert closed!!');
	    }
	  });
	});

###Styling###

These alerts are fully customizable, from the markup to the CSS!

The JS:

	$('button.example-4').on('click', function(e) {
	  $.alert('Look at the area below the button that you just clicked', {
	    themeClass: 'facebook',
	    markup: '<div class="alert-overlay"><div class="alert"><div class="alert-title">A Facebook-style alert</div><div class="alert-message">{message}</div><div class="alert-buttons"></div></div></div>',
	  });
	});

And the CSS:

	.alert-overlay.facebook {
	  background: none;
	}
	.alert-overlay.facebook .alert {
	  background: none;
	  border: 10px solid rgba(0, 0, 0, 0.5);
	  padding: 0;
	  margin-top: 120px;
	}
	.alert-overlay.facebook .alert .alert-title {
	  border: 1px solid #395998;
	  background: #6A83B4;
	  color: #FFF;
	  font-weight: 700;
	  padding: 5px 10px;
	}
	.alert-overlay.facebook .alert .alert-message {
	  border: 1px solid #555555;
	  background: #FFF;
	  border-bottom: none;
	  border-top: none;
	}
	.alert-overlay.facebook .alert .alert-buttons {
	  border: 1px solid #555555;
	  border-top: 1px solid #CACACA;
	  background: #F1F1F1;
	}
	.alert-overlay.facebook .alert .alert-buttons button {
	  background: #5672A8;
	  color: #FFF;
	  font-weight: 700;
	  border: 1px solid #28467E;
	  box-shadow: inset 0 1px 0 #879AC1;
	}

##Example##

Take a look at `index.html` for some examples.

##Troubleshooting##

This plugin works on IE7+, Firefox and Chrome. Opera should do too, but I don't really care.

Responsiveness can be achieved by using media queries (as the default style does to adjust maximum width) but you may need a polyfill for older browsers that do not support media queries.

Finally, a **minor caveat**: These alerts are *NOT* synchronous. That basically means that you should move your `on accept/reject` logic to the button actions as `$.alert()` will return immediately.