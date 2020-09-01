import React from 'react';

export interface ICardDisplay {
	title: string;
	showHR?: boolean;
}

const CardDisplay: React.FC<ICardDisplay> = (props) => {
	return (
		<div className="mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm">
			<div className="font-bold text-xl mb-2">{props.title}</div>
			{props.showHR ? <hr className="pb-6" /> : ''}
			{props.children}
		</div>
	);
};

CardDisplay.defaultProps = {
	showHR: true
};

export default CardDisplay;
