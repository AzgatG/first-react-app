import React from 'react';
import '../index.css';

import Square from './Square.jsx'


class Board extends React.Component {
	renderSquare(i) {
		return <Square
			key={i}
			value={this.props.squares[i]}
			onClick={() => this.props.onClick(i)}
		/>;
	}

	render() {
		let x = this.props.x;
		let y = this.props.y;
		let q = 0;
		const board = [];
		let boardStep = [];
		for (let i = 0; i < x; i++) {
			for (let j = 0; j < y; j++) {
				boardStep.push(this.renderSquare(q))
				q++;
			}
			board.push(boardStep);
			boardStep = [];
		}
		return (
			<div>
				{
					board.map((element, index) => {
						return (
							<div className="board-row" key={index}>
								{element}
							</div>
						)
					})
				}
			</div>
		);
	}
}

export default Board;