jQuery.Alert 2
==============

Say no to vanilla JS alerts. They're fugly on some browsers and will make your users think there are errors on your page.

With this plugin you'll be able to create rich, completely customizable alerts in seconds.

[Live demo and documentation](http://biohzrdmx.github.io/jQuery.Alert/)

## Installing

Just download `jquery.alert.js` and `jquery.alert.css` then add them to your HTML file:

```html
<script type="text/javascript" src="js/jquery.hoverplay.min.js"></script>
<link rel="stylesheet" type="text/css" href="css/jquery.hoverplay.css">
```

You may instead use the minified version if you like.

## Basic usage

Remember the old `alert()` function? Well, just add jQuery to the mix and you're set.

```javascript
$.alert("Hello! <strong>I'm an alert!</strong>");
```

Yep, it even displays HTML markup.

## Advanced topics

jQuery.Alert 2 is even more customizable than the original version.

You can pass an `options` object as the second argument `$.alert('Hello', options)` or extend the `$.alert.defaults` object to make global modifications.

### Theme

This version includes two basic themes, a light one and a dark one.

To choose between them, just add a `theme` key on your `options` object and set it to either `theme-light` or `theme-dark`, for example:

```javascript
$.alert("Hello! <strong>I'm an alert!</strong>", {
  theme: 'theme-dark'
});
```

To change the theme globally, use the `$.extend` method on the `$.alert.defaults` object:

```javascript
$.extend(true, $.alert.defaults, {
  theme: 'theme-dark'
});
```

### Changing the button template

For example, if you like Bootstrap buttons, you may use them this way:

```javascript
$.extend(true, $.alert.defaults, {
  templates: {
    button: '<a href="#" class="btn btn-primary"></a>'
  }
});
```

By extending the `$.alert.defaults` object, all alerts will use the new template.

### Buttons

Changing the default button is very simple. In this case, we will pass an options object to change the button only for that call.

```javascript
$.alert("Hi! this is an awesome alert.", {
  buttons: {
    close: 'Cancel',
    retry: 'Try again'
  }
});
```

This can be useful for localization.

As you can see, buttons are named with a camel-cased name (`code`, `retry`) and the label is just an string (`'Cancel'`, `'Try again'`). Button names are important because of the callback mechanism.

### Callbacks

You may also get notified when something happens to your alert, the supported events are:

- `createButton` - Allows you to manipulate a button right after it has been created.
- `button{Name}` - Allows you to receive a notification when a button has been clicked.
- `onOpen` - The alert has just been shown to the user.
- `onClose` - The alert has just been closed.
- `onKey` - Allows you to process keyboard input.

#### createButton

This receives three arguments `button`, `text` and `name`, where `button` is the jQuery-wrapped button element, `text` and `name` are the string representations of the button text and name.

You may for example, change the class of an specific button:

```javascript
$.alert("Hi! this is an awesome alert.", {
  callbacks: {
    createButton: function(button, text, name) {
      switch (name) {
        case 'close':
          button.removeClass('btn-primary').addClass('btn-link');
        break;
      }
      button.text(text);
    }
  }
});
```

It is very important to note that if you're overriding this, you must manually set the button text.

#### button{Name}

To receive events on button pressed you must add as many `button{Name}` callbacks as you need, replacing `{Name}` with the proper-cased name of each button, for example if your button was defined as `retry: 'Try again'` you should create a `buttonRetry` callback.

The callback function receives a single argument, the jQuery-wrapped button element as `button`:

```javascript
$.alert("Hi! this is an awesome alert.", {
  callbacks: {
    buttonRetry: function(button) {
      console.log("You clicked on 'Try again'");
      $.alert.api.close();
    }
  }
});
```

As you can see you can easily dismiss an alert programatically with the `$.alert.api.close()` function (more on API functions below).

If you don't add a callback for an specific button it will be handled by the default callback, just closing the alert box.

#### onOpen

Say you may want to show the alert and change something once it has been shown, you may do it with the `onOpen` callback:

```javascript
$.alert("Hi! this is an awesome alert, wait 3 seconds to try again.", {
  callbacks: {
    createButton: function(button, text, name) {
      switch (name) {
        case 'retry':
          button.addClass('disabled');
        break;
      }
      button.text(text);
    },
    onOpen: function(element) {
      setTimeout(function() {
        element.find('.alert-buttons .btn-primary').removeClass('disabled');
      }, 3000);
    }
  }
});
```

For this example, we disable the 'Try again' button with the `createButton` callback and once we receive the `onOpen` one, we wait for 3 seconds, then enable it again.

#### onClose

There's also an equivalent callback for the close event.

```javascript
$.alert("Hi! this is an awesome alert.", {
  callbacks: {
    onClose: function(element) {
      console.log('Alert has been closed');
    }
  }
});
```

#### onKey

This new version supports keyboard events, so if you want to do something with it, this is the callback. The function gets a single argument, the key name as `key`:

```javascript
$.alert("Hi! this is an awesome alert.", {
  callbacks: {
    onKey: function(key) {
      switch (key) {
        case 'Enter':
          $.alert.api.button('retry');
        break;
        case 'Escape':
        case ' ':
          $.alert.api.button('close');
        break;
      }
    }
  }
});
```

In this example, the Escape and Space keys dismiss the alert (by calling on the `$.alert.api.button` to simulate a click on the `close` button) while the Enter key uses the `retry` button.

If you don't process this event, the default will dismiss the alert for the three keys (Escape, Enter and Space).

### API

jQuery.Alert 2 exposes some API functions through the `$.alert.api` object, and you may use them to interact with the plugin. These functions are:

- `show` - Open the alert
- `close` - Close the alert
- `button` - Simulate a click on a given button

#### show

This is called when you use the short-form `$.alert()` and as such, receives two arguments, `message` and `options`.

```javascript
$.alert.api.show("Hello! <strong>I'm an alert!</strong>");
```

#### close

This just closes the alert, receives no arguments.

```javascript
$.alert.api.close();
```

#### button

Trigger a click for the specified button, receives the button name:

```javascript
$.alert.api.button('close');
```

### Animations

The default implementation uses `$.fn.animate` to present the overlay and alert box, but you may override it to use your own methods or even something like Velocity.js. For this to work, you'd have to override the `animations` object on `$.alert.defaults` (although you may do so with `options` too):

```javascript
$.extend(true, $.alert.defaults, {
  animations: {
    overlayIn: function(element) {
      element.css('opacity', 0).show().velocity('transition.fadeIn', { delay: 200, duration: 350 });
    },
    overlayOut: function(element) {
      element.velocity('transition.fadeOut', {
        delay: 200,
        duration: 350,
        complete: function() {
          element.hide();
        }
      });
    },
    boxIn: function(element) {
      element.css('opacity', 0).show().velocity('transition.flipYIn', {
        delay: 200,
        duration: 350,
        complete: function() {
          var container = element.closest('.jquery-alert'),
            options = container.data('options');
          options.callbacks.onOpen(element);
        }
      });
    },
    boxOut: function(element) {
      element.velocity('transition.slideLeftOut', {
        duration: 350,
        complete: function() {
          var container = element.closest('.jquery-alert'),
            options = container.data('options');
          element.hide();
          options.callbacks.onClose(element);
        }
      });
    }
  }
});
```

There are four animations: `overlayIn`, `overlayOut`, `boxIn` and `boxOut`. The first two take care of the overlay, while the later two animate the alert box.

Please note how the box-related ones _MUST_ invoke a callback (`onOpen` or on `onClose`).

### Styling

Please refer to `jquery.alert.less` for the LESS source or `jquery.alert.css` for the generated CSS.

There you will find the classes that must be overriden to change the appearance of the overlay and alert box.

You may specify any value for the `theme` option, so that it matches your custom theme name.

## Requirements

- jQuery 1.8+
- A recent/decent web browser (Firefox, Chrome or Opera suggested; **IE/Edge NOT TESTED/DON'T CARE**)

## Licensing

MIT Licensed

## Contributing

Fork the repo, add an interesting feature or fix a bug and send a pull request.

## Troubleshooting

Open an issue and provide a clear description of the error, how to reproduce it and your test environment specs (browser, jQuery version, etc.)

## Credits

Lead coder: biohzrdmx (github.com/biohzrdmx)