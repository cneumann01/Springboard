import React from "react";
import { Link } from "react-router-dom";
import './index.css';

function VendingMachine() {
	return (
		<div className="vending-machine">
			<h1>Vending Machine</h1>
			<ul className="snacks-list">
				<li>
					<Link to="/snack1">Snack 1</Link>
				</li>
				<li>
					<Link to="/snack2">Snack 2</Link>
				</li>
				<li>
					<Link to="/snack3">Snack 3</Link>
				</li>
			</ul>
		</div>
	);
}

export default VendingMachine;
