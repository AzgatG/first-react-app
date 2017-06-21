import React from 'react';
import '../index.css';

import StartForm from './Form.jsx'
import Board from './Board.jsx'

class Game extends React.Component {
	constructor() {
		super();
		this.state = {
			history: [{
				squares: [],
			}],
			xIsNext: true,
			stepNumber: 0,
			gameStart: false,
			x: 0,
			y: 0,
		};
	}

	handleClick(i) {
		const history = this.state.history.slice(0, this.state.stepNumber + 1);
		const current = history[history.length - 1];
		const squares = current.squares.slice();
		if (calculateWinner(squares, this.state.y) || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? 'X' : 'O';
		this.setState({
			history: history.concat([{
				squares: squares
			}]),
			xIsNext: !this.state.xIsNext,
			stepNumber: history.length,
		});
	}

	jumpTo(step) {
		this.setState({
			stepNumber: step,
			xIsNext: (step % 2) ? false : true,
		});
	}

	toogleGame = (x, y) => {
		if (x && y) {
			if (!this.state.gameStart) {
				this.setState({
					history: [{
						squares: Array(x * y).fill(null),
					}],
					stepNumber: 0
				});
			}
			this.setXY(x, y);
		}
		this.setState({
			gameStart: !this.state.gameStart
		});
	}

	resetGame = () => {
		let x = this.state.x;
		let y = this.state.y;
		this.setState({
			history: [{
				squares: Array(x * y).fill(null),
			}],
			stepNumber: 0
		});
	}

	setXY = (x, y) => {
		this.setState({
			x: x,
			y: y
		});
	}

	render() {
		if (this.state.gameStart) {
			const history = this.state.history;
			const current = history[this.state.stepNumber];
			const winner = calculateWinner(current.squares, this.state.y);
			const moves = history.map((step, move) => {
				const desc = move ?
					'Move #' + move :
					'Game start';
				return (
					<li key={move}>
						<a href="#" onClick={() => this.jumpTo(move)}>{desc}</a>
					</li>
				);
			});

			let status;
			if (winner) {
				status = 'Winner: ' + winner;
			} else {
				status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
			}
			return (
				<div>
					<button onClick={this.toogleGame}>New Game</button>
					<button onClick={this.resetGame}>Reset Game</button>
					<div className="game">
						<div className="game-board">
							<Board
								x={this.state.x}
								y={this.state.y}
								squares={current.squares}
								onClick={(i) => this.handleClick(i)}
							/>
						</div>
						<div className="game-info">
							<div>{status}</div>
							<ol>{moves}</ol>
						</div>
					</div>
				</div>
			);
		} else {
			return (
				<StartForm
					x={this.state.x}
					y={this.state.y}
					toogleGame={this.toogleGame}
				/>
			)
		}
	}
}

export default Game;

function calculateWinner(squares, y) {
	let winner = null;
	squares.forEach((el, i) => {
		if (!winner) {
			if (el) {
				if (winerCalculate(i, y, squares)) {
					winner = el;
				}
			}
		}
	});
	return winner;
}

function winerCalculate(i, y, squares) {
	let len = y - 1;
	y = +y;
	if (gor(i, y, len, squares)) {
		return squares[i];
	}
	if (vert(i, y, len, squares)) {
		return squares[i];
	}
	if (!(i % len) && i !== len) return;
	if (!(i % len) && i !== len * 2) return;
	if (!(i % len) && i !== len * 3) return;
	if (!(i % len) && i !== len * 4) return;
	if (diogR(i, y, len, squares)) {
		return squares[i];
	}
	if (diogL(i, y, len, squares)) {
		return squares[i];
	}
};

function gor(i, y, len, squares) {
	if (!(i + 1 % len)) return;
	if (!(i + 2 % len)) return;
	if (!(i + 3 % len)) return;
	return squares[i] === squares[i + 1] &&
		squares[i] === squares[i + 2] &&
		squares[i] === squares[i + 3] &&
		squares[i] === squares[i + 4]
};

function vert(i, y, len, squares) {
	return squares[i] === squares[i + y] &&
		squares[i] === squares[i + y * 2] &&
		squares[i] === squares[i + y * 3] &&
		squares[i] === squares[i + y * 4];
};

function diogR(i, y, len, squares) {
	if (!((i + y) % len)) return;
	if (!((i + y * 2 + 1) % len)) return;
	if (!((i + y * 3 + 2) % len)) return;
	return squares[i] === squares[i + y + 1] &&
		squares[i] === squares[i + y * 2 + 2] &&
		squares[i] === squares[i + y * 3 + 3] &&
		squares[i] === squares[i + y * 4 + 4]
};

function diogL(i, y, len, squares) {
	if (!((i + y * 2 + 1) % len)) return;
	if (!((i + y * 3 + 2) % len)) return;
	if (!((i + y * 4 + 3) % len)) return;
	return squares[i] === squares[i + y - 1] &&
		squares[i] === squares[i + y * 2 - 2] &&
		squares[i] === squares[i + y * 3 - 3] &&
		squares[i] === squares[i + y * 4 - 4]
};