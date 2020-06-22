# Browser Size Tooltip

> Browser window size indicator(width x height)

Since this version 49.0.2623.112 of Google Chrome, I can't see the `width x height px` indicator when inspecting the element, especially when you resize the browser while opening the elements' inspector. So, the culprit of this simple script was that version of Chrome :smile:

Though, you can toggle the **Device mode** in Chrome using the following keyboard shortcut: `Ctrl + Shift + M (or Cmd + Shift + M on Mac)`. However, I still prefer the old implementation. That's just being me! Also, it's cross-browser compatible.

## Installation

Using **bower**  
```sh
$ bower install --save-dev browsersize-tooltip
```

## Usage

```html
<script type="text/javascript" src="bower_components/browsersize-tooltip/dist/browsersize-tooltip.min.js"></script>
```

## Notes

Please remove the script on a production environment.

## License

[Unlicense](http://unlicense.org)


