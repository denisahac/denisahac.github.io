window.onload = init;

/**
 * Function initializer.
 */
function init() {
	fonts();
	copyrights();
	animate();
}

/**
 * Listen for fonts being loaded in the background.
 */
function fonts() {
	// Add .font class to the document body.
	document.body.classList.add('font');

	var inconsolataFont = new FontFaceObserver('Inconsolata');

	inconsolataFont.load(null, 10000).then(function() {
		// Add .font class to the document body.
		document.body.classList.add('font--inconsolata');
	});
}

/**
 * Website copyrights.
 */
function copyrights() {
	var since = document.body.dataset.since;
	var year = (new Date()).getFullYear();
	var name = document.title;
	var copyrightText = `Copyright © ${since} - ${year} ${name}. All rights reserved.`;

	log(copyrightText);
}

/**
 * Animate elements on scroll.
 */
function animate() {
	// check for WOW
	if(window.WOW) {
	  var wow = new WOW({
	    boxClass:     'wow',      // animated element css class (default is wow)
	    animateClass: 'animated', // animation css class (default is animated)
	    offset:       0,          // distance to the element when triggering the animation (default is 0)
	    mobile:       true,       // trigger animations on mobile devices (default is true)
	    live:         true,       // act on asynchronously loaded content (default is true)
	    callback:     function(box) {
	      // the callback is fired every time an animation is started
	      // the argument that is passed in is the DOM node being animated
	    },
	    scrollContainer: null // optional scroll container selector, otherwise use window
	  });
	  wow.init();
	}
}

/**
 * Shorthand for console.log
 *
 * @param {string} message The message to log.
 */
function log(message) {
	console.log(message);
}