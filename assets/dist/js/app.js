"use strict";

var _wow = require("../.././components/wow/dist/wow");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Logger = require('./utils/logger');

var _require = require('./components/header'),
    Header = _require.Header;

var _require2 = require('./components/main'),
    Main = _require2.Main;

var FontFaceObserver = require('../.././components/fontfaceobserver/fontfaceobserver');

var App =
/*#__PURE__*/
function (_React$Component) {
  _inherits(App, _React$Component);

  function App() {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));
  }

  _createClass(App, [{
    key: "fonts",

    /**
     * Listen for fonts being loaded in the background.
     */
    value: function fonts() {
      var _this = this;

      if (FontFaceObserver) {
        // Add .font class to the document body.
        document.body.classList.add('font');
        var inconsolataFont = new FontFaceObserver('Inconsolata');
        inconsolataFont.load(null, 10000).then(function () {
          // Add .font class to the document body.
          document.body.classList.add('font--inconsolata');

          _this.animate();
        });
      }
    }
    /**
     * Animate elements on scroll.
     */

  }, {
    key: "animate",
    value: function animate() {
      // check for WOW
      if (_wow.WOW) {
        var wow = new _wow.WOW({
          boxClass: 'wow',
          // animated element css class (default is wow)
          animateClass: 'animated',
          // animation css class (default is animated)
          offset: 0,
          // distance to the element when triggering the animation (default is 0)
          mobile: true,
          // trigger animations on mobile devices (default is true)
          live: false,
          // act on asynchronously loaded content (default is true)
          callback: function callback(box) {// the callback is fired every time an animation is started
            // the argument that is passed in is the DOM node being animated
          },
          scrollContainer: null // optional scroll container selector, otherwise use window

        });
        wow.init();
      }
    }
    /**
     * Website copyrights.
     */

  }, {
    key: "copyright",
    value: function copyright() {
      var since = document.body.dataset.since;
      var year = new Date().getFullYear();
      var name = document.title;
      var copyrightText = "Copyright \xA9 ".concat(since, " - ").concat(year, " ").concat(name, ". All rights reserved.");
      Logger.log(copyrightText);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fonts();
      this.copyright();
    }
  }, {
    key: "render",
    value: function render() {
      var name = "Nordanne Isahac";
      var description = 'Hello World! I\'m a Frontend Developer, content writer and a huge advocate on performant tools.';
      return React.createElement("div", {
        id: "app"
      }, React.createElement(Header, {
        name: name
      }), React.createElement(Main, {
        title: "About",
        name: name,
        description: description
      }));
    }
  }]);

  return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('container'));