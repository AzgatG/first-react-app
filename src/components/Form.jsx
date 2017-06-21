import React from 'react';
import '../index.css';


class StartForm extends React.Component {
	handleClick = () => {
		let x = this.x.value;
		let y = this.y.value;
		if (x && y && x > 5 && y > 5 && x < 30 && y < 30) {
			this.props.toogleGame(x, y);
		}
	}

	render() {
		return (
			<form>
				<input
					type="number"
					placeholder="X"
					ref={(x) => this.x = x}
				/>
				<input
					type="number"
					placeholder="Y"
					ref={(y) => this.y = y}
				/>
				<button type="button" onClick={this.handleClick}>Ok</button>
			</form>
		)
	}
}

export default StartForm;