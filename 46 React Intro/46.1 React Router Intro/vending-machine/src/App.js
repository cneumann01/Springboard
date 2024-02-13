import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VendingMachine from "./VendingMachine";
import Snack from "./Snack";
import "./index.css";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<VendingMachine />} />
				<Route
					path="/snack1"
					element={
						<Snack
							name="Snack 1"
							description="This is an awesome snack!"
						/>
					}
				/>
				<Route
					path="/snack2"
					element={
						<Snack
							name="Snack 2"
							description="This snack is even better!"
						/>
					}
				/>
				<Route
					path="/snack3"
					element={
						<Snack
							name="Snack 3"
							description="The best snack of all!"
						/>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
