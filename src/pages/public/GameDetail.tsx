import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

import CtfGameCard from 'Components/CtfGameCard';
import DefaultGameCard from 'Components/DefaultGameCard';

import ApiTester from 'Components/ApiTester';

// @ts-ignore
import { Content } from 'arwes';

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

					<div className="py-16 lg:py-24">
						<div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
							<div className="relative">
								<ApiTester />
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default GameDetail;
