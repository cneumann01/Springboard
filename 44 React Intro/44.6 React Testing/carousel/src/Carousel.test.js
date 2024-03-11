import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

it("renders Carousel without crashing", function () {
	render(<Carousel photos={TEST_IMAGES} title="Test title" />);
});

it("works when you click on the right arrow", function () {
	const { container } = render(
		<Carousel photos={TEST_IMAGES} title="images for testing" />
	);
	// expect the first image to show, but not the second
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = container.querySelector(".bi-arrow-right-circle");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).not.toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).toBeInTheDocument();
});

it("moves to the previous image when the left arrow is clicked", function () {
	const { container } = render(
		<Carousel photos={TEST_IMAGES} title="images for testing" />
	);

	// Move forward to the second image
	const rightArrow = container.querySelector(".bi-arrow-right-circle");
	fireEvent.click(rightArrow);

	// Now move back to the first image
	const leftArrow = container.querySelector(".bi-arrow-left-circle");
	fireEvent.click(leftArrow);

	// Expect the first image to show again, but not the second
	expect(
		container.querySelector('img[alt="testing image 1"]')
	).toBeInTheDocument();
	expect(
		container.querySelector('img[alt="testing image 2"]')
	).not.toBeInTheDocument();
});

it("does not show the left arrow when on the first image", function () {
	const { container } = render(
		<Carousel photos={TEST_IMAGES} title="images for testing" />
	);
	const leftArrow = container.querySelector(".bi-arrow-left-circle");
	expect(leftArrow).not.toBeInTheDocument();
});

it("does not show the right arrow when on the last image", function () {
	const { container } = render(
		<Carousel photos={TEST_IMAGES} title="images for testing" />
	);

	// Assuming there are 3 images in TEST_IMAGES for this example
	const rightArrow = container.querySelector(".bi-arrow-right-circle");
	for (let i = 0; i < TEST_IMAGES.length - 1; i++) {
		fireEvent.click(rightArrow);
	}

	// After moving to the last image, check for right arrow visibility
	expect(
		container.querySelector(".bi-arrow-right-circle")
	).not.toBeInTheDocument();
});
