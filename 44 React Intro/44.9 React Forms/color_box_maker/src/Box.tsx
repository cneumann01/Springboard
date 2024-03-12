interface BoxProps {
	id: number;
	color: string;
	width: number;
	height: number;
    x: number;
    y: number;
	removeBox: (id: number) => void;
}

const Box: React.FC<BoxProps> = ({ id, color, width, height, x, y, removeBox }) => {

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
                position: 'absolute',
                left: `${x}px`,
                top: `${y}px`,
			}}>
			<button onClick={handleRemove}>X</button>
		</div>
	);
}

export default Box;
