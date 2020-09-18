import React, { useContext, useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

import CtfGameCard from 'Components/CtfGameCard';

import ApiTester from 'Components/ApiTester';

// @ts-ignore
import { Header, Content, Frame, Button } from 'arwes';

interface IGameDetailParams {
	gameId: string;
}

const GameDetail = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const { gameId } = useParams<IGameDetailParams>();

	const [ gameStats, setGameStats ] = useState<any>([]);

	const getGameStatsById = useCallback(
		async () => {
			await apiClient.getGameStatsById(gameId).then((res: any) => {
				setGameStats(res);
			});
		},
		[ apiClient, gameId ]
	);

	useEffect(
		() => {
			getGameStatsById();
		},
		[ getGameStatsById ]
	);

	return (
		<Content>
			<Header className="py-4 mb-8">
				<h5>
					Game ID: {gameId} - {gameStats.gametype}
				</h5>
			</Header>

			<CtfGameCard gameStats={gameStats} />

			<div className="py-16 lg:py-24">
				<div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
					<div className="relative">
						<ApiTester />
					</div>
				</div>
			</div>
		</Content>
	);
};

export default GameDetail;
