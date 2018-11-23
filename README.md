jQuery.Alert
============

Say no to vanilla JS alerts. They're fugly on some browsers and will make your users think there are errors on your page.

With this plugin you'll be able to create rich, completely customizable alerts in seconds.

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
$('button.example-1').on('click', function(e) {
  $.alert("Hello! <strong>I'm an alert!</strong>");
});
```

Yep, it even displays HTML markup.

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