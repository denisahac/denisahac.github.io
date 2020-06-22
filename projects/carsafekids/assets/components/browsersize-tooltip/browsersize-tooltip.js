'use strict';

!function() {
  class BrowserSizeTooltip {

    constructor() {
      var oldEl = document.getElementById(this._getID()); // Old element

      if(oldEl == null) {
        this._el = document.createElement('span');
        this._setId();
      } else {
        this._el = oldEl;
      }

      this._init(); // Initialize component
    }

    /**
     * Component initialization
     *
     */
    _init() {
      this._applyStyles({
        'position': 'fixed',
        'bottom': 0,
        'right': 0,
        'zIndex': 9999999,
        'padding': '8px',
        'backgroundColor': '#000000',
        'color': '#FFFFFF'
      });

      this._updateDimension(); // Calculate the dimension
      this._events(); // Events

      this._addEl(); // Append element
    }

    /**
     * The ID string of the element.
     *
     * @return {String] - The ID of the element.
     */
    _getID() {
      return 'browsersize-tooltip-' + Date.now();
    }

    /**
     * Apply element styles.
     *
     * @param {Array} styles [] - The CSS to apply, supplied in JSON format.
     */
    _applyStyles(styles = []) {
      for(var key in styles) {
        var oldStyle = this._el.getAttribute('style');

        if(oldStyle == null) oldStyle = '';

        var newStyle = oldStyle + this._dashed(key) + ':' + styles[key] + ';'; 
        this._el.setAttribute('style', newStyle);
      }
    }

    /**
     * Convert camel-case string to kebab-case.
     *
     * @param {String} property - The string to convert.
     */
    _dashed(property) {
      var newProperty = '';

      for(var i = 0; i < property.length; i++) {
        var char = property.charAt(i);
        if(char >= 'A' && char <= 'Z') { // character is uppercase
          if(property.indexOf(char) > 0) {
            newProperty += '-';
          }
        }
        newProperty += char;
      }

      return newProperty.toLowerCase();
    }

    /**
     * Set the ID attribute of the element.
     */
    _setId() {
      this._el.setAttribute('id', this._getID());
    }

    /**
     * Determine the dimension of the browser window.
     */
    _updateDimension() {
      this._el.innerHTML = window.innerWidth + ' x ' + window.innerHeight + ' pixels';
    }

    /**
     * Append the element to the body.
     */
    _addEl() {
      document.body.appendChild(this._el);
    }

    /**
     * Event listeners.
     * Specifically listening to the resize event of the window.
     */
    _events() {
      var that = this;
      window.addEventListener('resize', function() {
        that._updateDimension();
      })
    }
  }

  new BrowserSizeTooltip();
}();
