let Logger = require('./utils/logger');
let { Header } = require('./components/header');
let { Main }  = require('./components/main');

import { WOW } from '../.././components/wow/dist/wow';
let FontFaceObserver = require('../.././components/fontfaceobserver/fontfaceobserver');

class App extends React.Component {
	/**
	 * Listen for fonts being loaded in the background.
	 */
	 fonts() {
		if(FontFaceObserver) {
			// Add .font class to the document body.
			document.body.classList.add('font');

			var inconsolataFont = new FontFaceObserver('Inconsolata');

			inconsolataFont.load(null, 10000).then(() => {
				// Add .font class to the document body.
				document.body.classList.add('font--inconsolata');
				this.animate();	
			});
		}
	}
	
	/**
	 * Animate elements on scroll.
	 */
	animate() {
		// check for WOW
		if(WOW) {
		  var wow = new WOW({
		    boxClass:     'wow',      // animated element css class (default is wow)
		    animateClass: 'animated', // animation css class (default is animated)
		    offset:       0,          // distance to the element when triggering the animation (default is 0)
		    mobile:       true,       // trigger animations on mobile devices (default is true)
		    live:         false,       // act on asynchronously loaded content (default is true)
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
	 * Website copyrights.
	 */
	copyright() {
		var since = document.body.dataset.since;
		var year = (new Date()).getFullYear();
		var name = document.title;
		var copyrightText = `Copyright © ${since} - ${year} ${name}. All rights reserved.`;

		Logger.log(copyrightText);
	}

	componentDidMount() {
		this.fonts();
		this.copyright();
	}

	render() {
		let name = "Nordanne Isahac";
		let description = 'Hello World! I\'m a Frontend Developer, content writer and a huge advocate on performant tools.';
		
		return(
			<div id="app">
				<Header name={name}/>
				<Main title="About" name={name} description={description}/>
			</div>
		);
	}
}

ReactDOM.render(<App/>, document.getElementById('container'));

