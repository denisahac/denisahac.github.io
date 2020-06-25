(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
'use script';

(function ($) {
	var is_medium_up = false;
	var has_body_padding = false;
	var header_shrinked = false;
	var mainMenu = null;
	initComponents();

	/**
  * Components intialization.
  */
	function initComponents() {
		initHeader();
		carousel('.js-testimonials', {
			items: 3,
			margin: 20,
			loop: true,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			dots: false,
			autoplay: false,
			autoplayTimeout: 6000, // 6 seconds
			autoplaySpeed: 900, // 0.9 second

			responsive: {
				0: {
					items: 1,
					autoplay: true,
					dots: true
				},
				740: {
					items: 2,
					autoplay: true,
					dots: true
				},

				1024: {
					items: 3,
					autoplay: false,
					dots: false
				}
			}
		});

		carousel('.js-carousel', {
			items: 1,
			loop: true,
			mouseDrag: false,
			touchDrag: false,
			pullDrag: false,
			dots: false,
			autoplay: true,
			autoplayTimeout: 6000, // 6 seconds
			autoplaySpeed: 900, // 0.9 second
			animateOut: 'fadeOut'
		});
		initFonts();
		logSiteInfo();
	}

	/**
   * Window load event listener
   */
	$(window).on('load', function () {

		$('.js-loading__inner').fadeOut('slow', function () {
			var timer = setInterval(function () {

				$('.js-loading').fadeOut(300, function () {
					clearInterval(timer);
					$(window).resize();
					animate();
					initZF();
				});
			}, 100);
		});
	});

	/**
  * Shrink header on scroll.
  */
	function initHeader() {
		var scrollTop = $(window).scrollTop();
		var offsetTop = getHeaderHeight() / 3;
		var $header = $('#container > header');

		toggleShrink();

		$(window).scroll(function () {
			scrollTop = $(window).scrollTop();
			toggleShrink();
		});

		/**
   * Toggle mini header
   */
		function toggleShrink() {
			if (scrollTop >= offsetTop && !header_shrinked) {
				$header.addClass('shrinked');
				header_shrinked = true;
			} else if (scrollTop < offsetTop && header_shrinked) {
				$header.removeClass('shrinked');
				header_shrinked = false;
			}
		}
	}

	/**
  * Intialize Foundation components.
  */
	function initZF() {
		if ($().foundation) {
			$(document).foundation();

			if (Foundation.MediaQuery.atLeast('medium')) {
				is_medium_up = true;
			}

			var canvasPaddingTop = getHeaderHeight() - getInnerHeaderHeight();

			$('#off-canvas').css('top', canvasPaddingTop + 'px');

			initBody();
		}
	}

	/**
  * Document body intialization.
  */
	function initBody() {
		$(document.body).css('paddingTop', getHeaderHeight() + 'px');
	}

	/**
  * Create a carousel using Owl Carousel 2.
  *
  * @param {string} elem The target element.
  * @pram {object} options The carousel options in JSON format.
  */
	function carousel(elem, options) {
		if ($().owlCarousel) {
			options = options || {};

			$(elem).owlCarousel(options);
		}
	}
	/**
  * Listen for custom fonts when successfully loaded.
  */
	function initFonts() {
		if (window.FontFaceObserver) {
			var fontRubik = new FontFaceObserver('Montserrat');

			$(document.body).addClass('font');

			fontRubik.load(null, 10000).then(function () {
				return function () {
					// Add `.font--rubik` to the document body.
					$(document.body).addClass('font--montserrat');
				};
			});
		}
	}

	/**
  * Animate elements on scroll.
  */
	function animate() {
		// check for WOW
		if (window.WOW) {
			var wow = new WOW({
				boxClass: 'wow', // animated element css class (default is wow)
				animateClass: 'animated', // animation css class (default is animated)
				offset: 0, // distance to the element when triggering the animation (default is 0)
				mobile: true, // trigger animations on mobile devices (default is true)
				live: true, // act on asynchronously loaded content (default is true)
				callback: function callback(box) {
					// the callback is fired every time an animation is started
					// the argument that is passed in is the DOM node being animated
				},
				scrollContainer: null // optional scroll container selector, otherwise use window
			});
			wow.init();
		}
	}

	/**
  * Get the header height.
  *
  * @return {int} The height of the header in pixels.
  */
	function getHeaderHeight() {
		return $('#container > header').innerHeight();
	}

	/**
  * Get the inner header height.
  *
  * @return {int} The height of the inner header in px.
  */
	function getInnerHeaderHeight() {
		return $('#container > header > .inner').innerHeight();
	}

	/**
  * Window resize listener.
  */
	$(window).resize(function () {
		if (Foundation.MediaQuery.is('small only')) {
			is_medium_up = false;
		} else {
			is_medium_up = true;
		}

		initBody();
	});

	/**
  * Display site information to the browser console.
  */
	function logSiteInfo() {
		var siteName = $(document.body).data('site-name');
		var siteNameStyles = 'font-family: sans-serif; font-size: 42px; font-weight: 700; color: #16b5f1; text-transform: uppercase;';

		var siteDescription = $(document.body).data('site-description');

		console.log('%c%s', siteNameStyles, siteName);
		log(siteDescription);
		log('Designed by: Nat Cheng http://natcheng.com/');
		log('Coded by: Den Isahac https://www.denisahac.xyz/');
	}

	/**
  * Shorthand for console.log
  *
  * @param {string} message The message to log.
  */
	function log(message) {
		console.log(message);
	}
})(jQuery);
},{}]},{},[1])