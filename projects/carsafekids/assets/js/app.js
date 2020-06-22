'use script';

(function($) {
	let is_medium_up = false;
	let has_body_padding = false;
	let header_shrinked = false;
	let mainMenu = null;
	let captcha = null;
	let contactForm = null;
	let RECAPTCHA_KEY = document.body.dataset.recaptchaKey;
	let RECAPTCHA_SECRET = document.body.dataset.recaptchaSecret;
	initComponents();

	/**
	 * Components intialization.
	 */
	function initComponents() {
		initHeader();
		initMenu();
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
		initGallery();
//		initContactForm();
		logSiteInfo();
	}

	/**
   * Window load event listener
   */
  $(window).on('load', () => {

    $('.js-loading__inner').fadeOut('slow', function() {
      var timer = setInterval(function() {

        $('.js-loading').fadeOut(300, function() {
          clearInterval(timer);
          $(window).resize();
          //animate();
				  initZF();
        });

      }, 100);
    });
  });

  /**
   * Shrink header on scroll.
   */
  function initHeader() {
  	let scrollTop = $(window).scrollTop();
  	let offsetTop = getHeaderHeight() / 3;
  	let $header = $('#container > header');

  	toggleShrink();

  	$(window).scroll(function() {
  		scrollTop = $(window).scrollTop();
  		toggleShrink();
  	});

  	/**
  	 * Toggle mini header
  	 */
  	function toggleShrink() {
  		if(scrollTop >= offsetTop && !header_shrinked) {
  			$header.addClass('shrinked');
  			header_shrinked = true;
  		} else if(scrollTop < offsetTop && header_shrinked) {
				$header.removeClass('shrinked');
  			header_shrinked = false;
  		}
  	}
  }

	/**
	 * Intialize Foundation components.
	 */
	function initZF() {
		if($().foundation) {
			$(document).foundation();

			if(Foundation.MediaQuery.atLeast('medium')) {
				is_medium_up = true;
			}

			$('#off-canvas').css('paddingTop', (getHeaderHeight() + 'px'));

			initBody();
		}
	}

	/**
	 * Navigation menu smooth scrolling.
	 */
	function initMenu() {
		if(Foundation && Foundation.Magellan) {
			let magellan = new Foundation.Magellan($('#off-canvas-menu'), {
				threshold: 0,
				offset: getHeaderHeight()
			});

			new Foundation.Magellan($('#main-menu'), {
				threshold: 0,
				offset: 40
			});
			new Foundation.SmoothScroll($('.js-magellan'), {
				threshold: 0,
				offset: getHeaderHeight()
			});

			magellan.$element.on('click.zf.magellan', 'a[href^="#"]', () => {
				$('#off-canvas').foundation('close', () => {});
				$('#hamburger').removeClass('is-active');
			});
		}
	}

	/**
	 * Document body intialization.
	 */
	function initBody() {
    /*
		if(!is_medium_up && !has_body_padding) {
			$(document.body).css('paddingTop', (getHeaderHeight() + 'px'));

			has_body_padding = true;
		} else if(is_medium_up && has_body_padding) {
			$(document.body).removeAttr('style');

			has_body_padding = false;
		}
    */
		$(document.body).css('paddingTop', (getHeaderHeight() + 'px'));
	}

	/**
	 * Create a carousel using Owl Carousel 2.
	 *
	 * @param {string} elem The target element.
	 * @pram {object} options The carousel options in JSON format.
	 */
	function carousel(elem, options) {
		if($().owlCarousel) {
			options = options || {};

			$(elem).owlCarousel(options);
		}
	}
	/**
	 * Listen for custom fonts when successfully loaded.
	 */
	function initFonts() {
		if(window.FontFaceObserver) {
			let fontRubik = new FontFaceObserver('Montserrat');

			$(document.body).addClass('font');

			fontRubik.load(null, 10000).then(() => function() {
				// Add `.font--rubik` to the document body.
				$(document.body).addClass('font--montserrat');
			});
		}
	}

	/**
	 * Popup image on gallery.
	 */
	function initGallery() {
		if($().magnificPopup) {
			$('.js-image').magnificPopup({
				type: 'image',
				mainClass: 'mfp-with-zoom',
				gallery: {
					enabled: true
				},
				zoom: {
					// enabled: true,
					duration: 300,
					easing: 'ease-in-out'
				}
			});
		}
	}

	/**
	 * Contact form.
	 */
	function initContactForm() {
		contactForm = new Vue({
			el: '#contact-app',
			data: {
				success: false,
				name: '',
				email: '',
				phone: '',
				message: '',
				hasError: false,
				hasErrors: {
					name: false,
					email: false,
					phone: false,
					message: false,
					captcha: false,
				},
				errors: {
					name: '',
					email: '',
					phone: '',
					message: '',
					captcha: ''
				},
				captcha: null,
			},

			mounted: function() {
				
			},

			methods: {
				submit: function(e) {
					e.preventDefault();

					this.loading();
					this.validate();
				},

				post: function() {
					let that = this;

					$.ajax({
						type: 'POST',
						url: 'contact.php',
						data: {
							name: that.name,
							email: that.email,
							phone: that.phone,
							message: that.message
						},
						dataType: 'json',
						success: function(response) {
							that.hasError = response.hasError;
							that.hasErrors = response.hasErrors;
							that.errors = response.errors;
							that.success = response.success;

							if(that.success) {
								that.clear();
							}

							that.finished();
						},
						error: function(err) {
							console.error(err);

							that.finished();
						}
					});
				}, 

				validate: function() {
					if(this.name === '') {
						this.errors.name = 'Name is required.';
						this.hasErrors.name = true;
					} else {
						this.hasErrors.name = false;
					}

					let emailRegEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if(this.email === '') {
						this.errors.email = 'Email is required.';
						this.hasErrors.email = true;
					} else if(!emailRegEx.test(this.email)) {
						this.errors.email = 'Email is invalid.';
						this.hasErrors.email = true;
					} else {
						this.hasErrors.email = false;
					}

					let phoneRegEx = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
					if(this.phone !== '' && !phoneRegEx.test(this.phone)) {
						this.errors.phone = 'Phone is invalid.';
						this.hasErrors.phone = true;
					} else{
						this.hasErrors.phone = false;
					}

					if(this.message === '') {
						this.errors.message = 'Message is required.';
						this.hasErrors.message = true;
					} else {
						this.hasErrors.message = false;
					}

					if(this.hasErrors.name || this.hasErrors.email || this.hasErrors.phone || this.hasErrors.message) {
						this.hasError = true;
					} 

					this.validateRecaptcha();
				},

				validateRecaptcha: function() {
					let that = this;					
					that.hasError = true;

					if(grecaptcha && that.captcha !== null) {
						let token = grecaptcha.getResponse(that.captcha);

						if(token !== '') {
							if(that.hasErrors.captcha) {
								$.ajax({
									type: 'GET',
									url: 'recaptcha.php',
									data: {
										url: 'https://www.google.com/recaptcha/api/siteverify',
										secret: RECAPTCHA_SECRET,
										response: token
									},
									success: function(response) {
										that.errors.captcha = !response.success;
										
										// Success
										if(!that.errors.captcha) {
											that.hasError = false;

											if(!that.hasError) {
												that.post();
											} else {
												that.finished();
											}
										} else {
											that.errors.captcha = 'Invalid reCaptcha.'
											that.hasErrors.captcha = true;
											that.finished();
										}
									},
									error: function(err) {
										that.errors.captcha = 'Invalid reCaptcha.'
										that.hasErrors.captcha = true;
										that.finished();
									}
								});
							}
							else {
								this.post();
							}
						} else {
							this.errors.captcha = 'Verify that you are not a robot';
							this.hasErrors.captcha = true;
							that.finished();
						}
					}
				},

				clear: function() {
					this.name = '';
					this.email = '';
					this.phone = '';
					this.message = '';
					this.hasError = false;
					this.hasErrors = {
						name: false,
						email: false,
						phone: false,
						message: false,
						captcha: false
					};
					this.errors = {
						name: '',
						email: '',
						phone: '',
						message: '',
						captcha: ''
					};
				},

				loading: function() {
					$(this.$el).find('[type="submit"]').addClass('sending');
				},

				finished: function() {
					$(this.$el).find('[type="submit"]').removeClass('sending');
				}
			}
		});
	}

	/**
	 * On Google Recaptcha on load listener.
	 */
	window.onRecaptchaLoad = function() {
		captcha = grecaptcha.render('recaptcha', {
			'sitekey': RECAPTCHA_KEY
		});

		contactForm.captcha = captcha;
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
	 * Get the header height.
	 *
	 * @return {int} The height of the header in pixels.
	 */
	function getHeaderHeight() {
		return $('#container > header').innerHeight();
	}

	/**
	 * Window resize listener.
	 */
	$(window).resize(() => {
		if(Foundation.MediaQuery.is('small only')) {
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
    log('Developed by: Den Isahac https://www.denisahac.xyz/');
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
