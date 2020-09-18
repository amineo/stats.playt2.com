import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Frame, Header } from 'arwes';
import CardDisplay from 'Components/CardDisplay';

const CtfGameCard = (gameStats: any) => {
	return (
		<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
			<div className="col-span-1">
				<CardDisplay header="Storm">{JSON.stringify(gameStats)}</CardDisplay>
			</div>
			<div className="col-span-1">
				<CardDisplay header="Interno">delete</CardDisplay>
			</div>
		</div>
	);
};

export default CtfGameCard;
