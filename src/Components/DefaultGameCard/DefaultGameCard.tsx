import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Frame, Header } from 'arwes';
import CardDisplay from 'Components/CardDisplay';

const DefaultGameCard: React.FC = (gameStats: any) => {
	return (
		<div>
			<Header className="py-4 mb-8">
				<h1>{gameStats.map}</h1>

				<h5>
					Game ID: {gameStats.gameId} - {gameStats.gametype}
				</h5>
			</Header>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div className="col-span-1">
					<CardDisplay header="Storm">{JSON.stringify(gameStats)}</CardDisplay>
				</div>
				<div className="col-span-1">
					<CardDisplay header="Interno">delete</CardDisplay>
				</div>
			</div>
		</div>
	);
};

export default DefaultGameCard;
