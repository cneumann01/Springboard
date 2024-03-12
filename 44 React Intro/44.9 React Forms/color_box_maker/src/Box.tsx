interface BoxProps {
	id: number;
	color: string;
	width: number;
	height: number;
	removeBox: (id: number) => void;
}

const Box: React.FC<BoxProps> = ({ id, color, width, height, removeBox }) => {
    
	// Function to handle the "X" button click for box removal.
	const handleRemove = () => {
		removeBox(id); 
	};

	// Return the JSX for the Box component.
	return (
		<div
			className="Box"
			style={{
				backgroundColor: color,
				width: `${width}px`,
				height: `${height}px`,
			}}>
			<button onClick={handleRemove}>X</button>
		</div>
	);
}

export default Box;
