import "./Person.scss"; // Importing SCSS file for styles

interface PersonProps {
    name: string;
    age: number;
    hobbies: string[];
}

const Person = (props: PersonProps) => {
	let name = props.name;
	if (props.name.length > 8) {
		name = props.name.slice(0, 6) + "...";
	}

	let ageReply;
	if (props.age >= 18) {
		ageReply = "Please go vote!";
	} else {
		ageReply = "You must be 18.";
	}

	return (
		<div className="person">
			<p className="person-info">
				Learn some information about this person
			</p>
			<p className="person-name">Name: {name}</p>
			<p className="person-age">Age: {props.age}</p>
			<h3 className="age-reply">{ageReply}</h3>
			<p className="hobbies-title">Hobbies:</p>
			<ul className="hobbies-list">
				{props.hobbies.map((hobby) => (
					<li key={hobby} className="hobby">
						{hobby}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Person;
