let { MainHeader } = require('./main-header');
let { MainFooter } = require('./main-footer');

class Main extends React.Component {
	render() {
		return(
			<main>
				<article>
					<MainHeader title={this.props.title} name={this.props.name}/>
	
					<p id="description" className="wow fadeInUp" data-wow-delay="0.3s" itemProp="description">{this.props.description}</p>

					<MainFooter/>
				</article>
			</main>
		);
	}
}

module.exports.Main = Main;

