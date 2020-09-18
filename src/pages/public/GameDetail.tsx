import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

import CtfGameCard from 'Components/CtfGameCard';

import ApiTester from 'Components/ApiTester';

// @ts-ignore
import { Header, Content } from 'arwes';

interface IGameDetailParams {
	gameId: string;
}

const GameDetail = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const { gameId } = useParams<IGameDetailParams>();

	const gameQuery = useQuery([ 'game', gameId ], () => apiClient.getGameStatsById(gameId), {
		refetchOnWindowFocus: false,
		staleTime: Infinity
	});

	return (
		<Content>
			{gameQuery.isLoading ? (
				'Loading stats...'
			) : (
				<div>
					<Header className="py-4 mb-8">
						<h1>{gameQuery.data.map}</h1>

						<h5>
							Game ID: {gameId} - {gameQuery.data.gametype} -
						</h5>
					</Header>

					<CtfGameCard gameStats={gameQuery.data} />

					<div className="py-16 lg:py-24">
						<div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
							<div className="relative">
								<ApiTester />
							</div>
						</div>
					</div>
				</div>
			)}
		</Content>
	);
};

export default GameDetail;
