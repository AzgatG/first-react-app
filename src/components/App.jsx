import React, { Component } from 'react';
import '../index.css';

import Game from './Game.jsx';


class App extends Component {
	render() {
		return (
			<div className="gameArea">
				<Game />
			</div>
		);
	}
}

export default App;