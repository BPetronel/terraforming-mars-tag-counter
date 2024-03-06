import * as React from 'react';
import './tag.scss';

type Properties = {
	name: string;
	picture: string;
	value: number;
	onIncrease: () => void;
	onDecrease: () => void;
};

const Tag = ({name, picture, value, onIncrease, onDecrease}: Properties) => (
	<li className="tag">
		<img className="image" src={picture} />
		<span className="name">{name}</span>
		<span className="counter">
			<button className="button" onClick={onDecrease}>
				-
			</button>
			<span className="counter" id="scienceCounter">
				{value}
			</span>
			<button className="button" onClick={onIncrease}>
				+
			</button>
		</span>
	</li>
);

export default Tag;
