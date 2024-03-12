import React, { useState } from "react";

interface NewBoxFormProps {
	addBox: (box: { color: string, width: number, height: number }) => void;
}

const NewBoxForm: React.FC<NewBoxFormProps> = ({ addBox }) => {
	const [formData, setFormData] = useState({
		color: "",
		width: "",
		height: "",
	});

	// Handle form field changes
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((data) => ({
			...data,
			[name]: value,
		}));
	};

	// Handle form submission
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault(); // Prevent form from being submitted to the server
		const newBox = {
			color: formData.color,
			width: parseInt(formData.width),
			height: parseInt(formData.height),
		};
		addBox(newBox);
		setFormData({ color: "", width: "", height: "" }); // Reset form
	};

	return (
		<form onSubmit={handleSubmit}>
			<div>
				<label htmlFor="color">Color</label>
				<input
					id="color"
					type="text"
					name="color"
					value={formData.color}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="width">Width</label>
				<input
					id="width"
					type="text"
					name="width"
					value={formData.width}
					onChange={handleChange}
				/>
			</div>
			<div>
				<label htmlFor="height">Height</label>
				<input
					id="height"
					type="text"
					name="height"
					value={formData.height}
					onChange={handleChange}
				/>
			</div>
			<button type="submit">Add Box</button>
		</form>
	);
};

export default NewBoxForm;
