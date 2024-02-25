import "./EightBall.scss";
import { useState } from "react";

interface msg {
	msg: string;
	color: string;
}

const msgs: msg[] = [
	{ msg: "It is certain.", color: "green" },
	{ msg: "It is decidedly so.", color: "green" },
	{ msg: "Without a doubt.", color: "green" },
	{ msg: "Yes - definitely.", color: "green" },
	{ msg: "You may rely on it.", color: "green" },
	{ msg: "As I see it, yes.", color: "green" },
	{ msg: "Most likely.", color: "green" },
	{ msg: "Outlook good.", color: "green" },
	{ msg: "Yes.", color: "green" },
	{ msg: "Signs point to yes.", color: "goldenrod" },
	{ msg: "Reply hazy, try again.", color: "goldenrod" },
	{ msg: "Ask again later.", color: "goldenrod" },
	{ msg: "Better not tell you now.", color: "goldenrod" },
	{ msg: "Cannot predict now.", color: "goldenrod" },
	{ msg: "Concentrate and ask again.", color: "goldenrod" },
	{ msg: "Don't count on it.", color: "red" },
	{ msg: "My reply is no.", color: "red" },
	{ msg: "My sources say no.", color: "red" },
	{ msg: "Outlook not so good.", color: "red" },
	{ msg: "Very doubtful.", color: "red" },
];

const EightBall: React.FC = () => {
	// Initialize state with a default message and color
	const [msgState, setmsgState] = useState<msg>({
		msg: "Click me for an answer!",
		color: "black",
	});

	const clickHandler = () => {
		// Randomly select a message from the msgs array and update the state
		const randomMessage =
			msgs[Math.floor(Math.random() * msgs.length)];
		setmsgState(randomMessage);
	};

	// Apply the color to the component's style dynamically
	return (
		<div
			className="EightBall-Background"
			onClick={clickHandler}
			style={{ backgroundColor: msgState.color }} // Inline style for dynamic background color
		>
			<p>{msgState.msg}</p>
		</div>
	);
};

export default EightBall;