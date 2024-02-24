import "./Tweet.scss"; // Importing SCSS file for styles

interface TweetProps {
	username: string;
	name: string;
	date: string;
	message: string;
}

const Tweet = (props: TweetProps) => {
	return (
		<div className="tweet">
			<div className="tweet-header">
				<h3 className="name">{props.name}</h3>
				<p className="username">@{props.username}</p>
			</div>
			<p className="date">{props.date}</p>
			<p className="message">{props.message}</p>
		</div>
	);
};

export default Tweet;
