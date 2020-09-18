import React from 'react';

// @ts-ignore
import { Project } from 'arwes';

export interface ICardDisplay {
	header: string;
}

const CardDisplay: React.FC<ICardDisplay> = (props) => {
	return (
		<Project animate {...props}>
			{props.children}
		</Project>
	);
};

CardDisplay.defaultProps = {};

export default CardDisplay;
