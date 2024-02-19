import React from "react";
import { useParams, Navigate } from "react-router-dom";

const DogDetails = ({ dogs }) => {
	const { name } = useParams();
	const dog = dogs.find(
		(dog) => dog.name.toLowerCase() === name?.toLowerCase()
	);

	if (!dog) return <Navigate to="/dogs" />;

	return (
		<div>
			<h2>{dog.name}</h2>
			<img src={dog.src} alt={dog.name} />
			<ul>
				{dog.facts.map((fact, index) => (
					<li key={index}>{fact}</li>
				))}
			</ul>
		</div>
	);
};

export default DogDetails;
