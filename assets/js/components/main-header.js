class MainHeader extends React.Component {
	render() {
		return(
			<header>
				<span className="bar wow slideInLeft" data-wow-delay="0.3s"></span>
				<h1 className="hide">{this.props.title}</h1>
				<span id="name" className="h4 wow fadeInUp" itemProp="name">{this.props.name}</span>
			  </header>	
		);
	}
}

module.exports.MainHeader = MainHeader;

