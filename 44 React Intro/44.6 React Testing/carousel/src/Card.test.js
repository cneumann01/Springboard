import React from "react";
import { render } from "@testing-library/react";
import Card from "./Card";

// Smoke Test for Card Component
describe("Smoke test for Card component", () => {
	it("renders without crashing", () => {
		render(
			<Card
				caption="Test caption"
				src="test.jpg"
				currNum={1}
				totalNum={3}
			/>
		);
	});
});

// Snapshot Test for Card Component
describe("Snapshot test for Card component", () => {
	it("matches snapshot", () => {
		const { asFragment } = render(
			<Card
				caption="Test caption"
				src="test.jpg"
				currNum={1}
				totalNum={3}
			/>
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
