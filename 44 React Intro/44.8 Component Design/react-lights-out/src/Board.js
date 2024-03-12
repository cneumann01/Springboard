import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
	const [board, setBoard] = useState(createBoard());

	function createBoard() {
		let initialBoard = [];
		for (let y = 0; y < nrows; y++) {
			// Changed loop variable to `y`
			let row = [];
			for (let x = 0; x < ncols; x++) {
				// Changed loop variable to `x`
				row.push(Math.random() < chanceLightStartsOn);
			}
			initialBoard.push(row);
		}
		return initialBoard;
	}

	function hasWon() {
		// check the board in state to determine whether the player has won.
		return board.every((row) => row.every((cell) => !cell));
	}

	function flipCellsAround(coord) {
		setBoard((oldBoard) => {
			const [y, x] = coord.split("-").map(Number);
			const flipCell = (y, x, boardCopy) => {
				if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
					boardCopy[y][x] = !boardCopy[y][x];
				}
			};

			// Make a (deep) copy of the oldBoard
			const newBoard = oldBoard.map((row) => [...row]);

			// Flip this cell and the cells around it
			flipCell(y, x, newBoard);
			flipCell(y, x - 1, newBoard);
			flipCell(y, x + 1, newBoard);
			flipCell(y - 1, x, newBoard);
			flipCell(y + 1, x, newBoard);

			// Return the copy
			return newBoard;
		});
	}

	// If the game is won, just show a winning message & render nothing else
	if (hasWon()) {
		return <div>You've won!</div>;
	}

	// Make table board
	return (
		<div>
			<h1>Try and turn out all the lights!</h1>

			<table className="Board">
				<tbody>
					{board.map((row, y) => (
						<tr key={y}>
							{row.map((cell, x) => (
								<Cell
									key={`${y}-${x}`}
									isLit={cell}
									flipCellsAroundMe={() =>
										flipCellsAround(`${y}-${x}`)
									}
								/>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
export default Board;
