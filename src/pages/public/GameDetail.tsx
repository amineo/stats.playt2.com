import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

import CtfGameCard from 'Components/CtfGameCard';
import DefaultGameCard from 'Components/DefaultGameCard';

import ApiTester from 'Components/ApiTester';

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
		<div>
			{gameQuery.isLoading ? (
				'Loading stats...'
			) : (
				<>
					{gameQuery.data.gametype === 'CTFGame' || gameQuery.data.gametype === 'SCtFGame' ? (
						<CtfGameCard {...gameQuery.data} />
					) : (
						<DefaultGameCard {...gameQuery.data} />
					)}

				</>
			)}
		</div>
	);
};

export default GameDetail;
