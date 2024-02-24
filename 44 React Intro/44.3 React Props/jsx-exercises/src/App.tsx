import "./App.css";
import FirstComponent from "./components/FirstComponent";
import NamedComponent from "./components/NamedComponent";
import Tweet from "./components/Tweet";
import Person from "./components/Person";

function App() {
	return (
		<div>
			<h1>Part 1</h1>
			<FirstComponent />
			<NamedComponent name="John" />
			<h1>Part 2</h1>
			<Tweet
				username="Johnb123"
				name="John"
				date="2021-09-01"
				message="This world is out of control man..."
			/>
			<Tweet
				username="xmxgirl37"
				name="Sarah"
				date="2021-08-03"
				message="Hey friends!"
			/>
			<Tweet
				username="the_man"
				name="Chris"
				date="2022-05-01"
				message="Yo yo yo it's your boi Chris"
			/>
			<h1>Part 3</h1>
			<Person
				name="John"
				age={19}
				hobbies={["soccer", "gaming", "reading"]}
			/>
			<Person
				name="Sarah"
				age={17}
				hobbies={["painting", "drawing", "singing"]}
			/>
			<Person
				name="Chris"
				age={22}
				hobbies={["basketball", "gaming", "running"]}
			/>
		</div>
	);
}

export default App;
