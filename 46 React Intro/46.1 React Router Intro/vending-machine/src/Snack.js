import React from "react";
import { Link } from "react-router-dom";
import "./index.css"; 

function Snack({ name, description }) {
	return (
		<div className="snack">
			<h1>{name}</h1>
			<p>{description}</p>
			<Link to="/" className="go-back-link">
				Go back
			</Link>
		</div>
	);
}
export default Snack;
