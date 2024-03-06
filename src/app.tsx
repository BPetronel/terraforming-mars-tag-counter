import * as React from 'react';
import {Fragment} from 'react';

import Tag from './components/tag';
import './app.scss';

const tags = [
	'building',
	'space',
	'science',
	'plant',
	'microbe',
	'animal',
	'power',
	'jovian',
	'earth',
	'city',
	'event',
	'venus',
	'wild'
];

const emptyState = tags.reduce(
	(accumulator, tag) => ({...accumulator, [tag]: 0}),
	{}
);

const nonZero = (value: number) => (value < 0 ? 0 : value);

const getDefaultState = () => {
	const storedData = localStorage.getItem('state') ?? '';
	const storedState = storedData ? JSON.parse(storedData) : undefined;
	return storedState || emptyState;
};

function App() {
	const [state, setState] =
		React.useState<Record<string, number>>(getDefaultState());

	const handleIncrease = (tag: string, value: number) => {
		setState(currentState => ({
			...currentState,
			[tag]: nonZero(currentState[tag] + value)
		}));
	};

	const handleReset = React.useCallback(() => setState(emptyState), []);

	React.useEffect(() => {
		localStorage.setItem('state', JSON.stringify(state));
	}, [state]);

	return (
		<Fragment>
			<header>
				<h1>Terraforming Card Tags Tracker</h1>
			</header>
			<section>
				<ul className="tag-list">
					{tags.map(tag => (
						<Tag
							key={tag}
							name={tag}
							picture={require(`../assets/${tag}.png`)}
							value={state[tag]}
							onIncrease={() => handleIncrease(tag, +1)}
							onDecrease={() => handleIncrease(tag, -1)}
						/>
					))}
				</ul>
			</section>
			<button className="reset-button" onClick={handleReset}>
				Reset
			</button>
		</Fragment>
	);
}

export default App;
