import React, { useState } from "react";
import Box from "./Box";
import NewBoxForm from "./NewBoxForm";
import "./BoxList.scss";

interface BoxData {
	id: number;
	color: string;
	width: number;
	height: number;
}

const BoxList: React.FC = () => {
	const [boxes, setBoxes] = useState<BoxData[]>([]);

	// Function to add a new box to the list
	const addBox = (newBox: Omit<BoxData, "id">) => {
		const newBoxWithId = { ...newBox, id: Date.now() }; // Generate a unique ID
		setBoxes((oldBoxes) => [...oldBoxes, newBoxWithId]);
	};

	// Function to remove a box from the list
	const removeBox = (id: number) => {
		setBoxes((oldBoxes) => oldBoxes.filter((box) => box.id !== id));
	};

	return (
		<div className="BoxList">
			<NewBoxForm addBox={addBox} />
			{boxes.map(({ id, color, width, height }) => (
				<Box
					key={id}
					id={id}
					color={color}
					width={width}
					height={height}
                    x={(Math.random() * 500)}
                    y={(Math.random() * 500)}
					removeBox={removeBox}
				/>
			))}
		</div>
	);
};

export default BoxList;
