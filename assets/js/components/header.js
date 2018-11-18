class Header extends React.Component {
	render() {
		return (
			<header>
				<h1 className="hide">{this.props.name}</h1>
			</header>
		);
	}
}

module.exports.Header = Header;

