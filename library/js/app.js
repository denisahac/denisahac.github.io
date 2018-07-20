(function($) {

  initComponents();

  /**
   * Initialize components
   */
  function initComponents() {
    fontLoader();
    initZF(); // Zurb Foundation Framework v6.*
    animate(); // animation
    // coolKid(); // credits
  }

  /**
   * Window load event listener
   */
  $(window).load(function() {
    $('.js-loading__inner').hide(100, function() {
      var timer = setInterval(function() {
        $(document.body).removeClass('init'); // remove '.init' body class

        $('.js-loading').fadeOut(300, function() {
          clearInterval(timer);
        });
      }, 100);
    });
  });


  /**
   * Font observer. Notifies when fonts are loaded.
   */
  function fontLoader() {
    // check FontFaceObserver
    if(window.FontFaceObserver) {
      var oswald = new FontFaceObserver('Roboto');

      oswald.load(null, 10000).then(function() {
        // add custom class to the document body
        $(document.body).addClass('font-loaded roboto');
      });
    }
  }


  /**
   * Initialize Foundation Framework
   */
  function initZF() {
    // check for Foundation
    if($().foundation) {
      $(document).foundation();
    }
  }

  /**
   * Animation
   */
  function animate() {
    if(window.WOW) {
      var wow = new WOW({
        boxClass:     'wow',      // animated element css class (default is wow)
        animateClass: 'animated', // animation css class (default is animated)
        offset:       10,          // distance to the element when triggering the animation (default is 0)
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
   * @param {String} message - The message to log
   */
  function log(message) {
    console.log(message); // log the message
  }

  /**
  * Customized console message
  */
  function coolKid() {
   // Check for console.message
   if(console.message) {
     var siteTitle = $('.js-title').html();
     var siteCopyright = $('.js-copyright').html();

     var decode = document.createElement("div");
     decode.innerHTML = siteCopyright;

     siteCopyright = decode.childNodes[0].nodeValue;

     siteTitle = siteTitle.toUpperCase();

     // log site title
     console
     .message()
     .text(siteTitle, {
       fontSize: '42px',
       color: '#f2024e',
       fontFamily: '\'Oswald\', sans-serif',
       fontWeight: 700
      })
    .print();

    // log copyright
    console
    .message()
    .text(siteCopyright, {
      fontSize: '1rem',
      color: '#9f96ca',
      fontFamily: '\'Oswald\', sans-serif',
      fontWeight: 700
     })
     .print();
    }
  }
})(jQuery);
