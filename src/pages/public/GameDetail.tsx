import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';

import { FetchContext } from 'Context/FetchContext';

import CtfGameCard from 'Components/CtfGameCard';
import DefaultGameCard from 'Components/DefaultGameCard';

interface IGameDetailParams {
	gameId: string;
}

const GameDetail = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const { gameId } = useParams<IGameDetailParams>();

	const gameQuery = useQuery(
		['game', gameId],
		() => apiClient.getGameStatsById(gameId),
		{
			refetchOnWindowFocus: false,
			staleTime: Infinity,
		},
	);

	return (
		<div>
			{gameQuery.isLoading ? (
				'Loading stats...'
			) : (
				<>
					<Helmet>
						<title>
							{gameQuery.data.map} [{gameQuery.data.gametype}] -{' '}
							{gameQuery.data.datestamp.split(/[T]/)[0]} | Tribes 2 Stats
							Project
						</title>
						<link
							rel="canonical"
							href={`https://stats.playt2.com/game/${gameQuery.data.gameId}`}
						></link>
						<meta property="og:site_name" content="Tribes 2 Stats Project" />
						<meta
							property="og:url"
							content={`https://stats.playt2.com/game/${gameQuery.data.gameId}`}
						/>
						<meta property="og:type" content="article" />
						<meta
							property="og:title"
							content={`${gameQuery.data.map} [${gameQuery.data.gametype}] - ${
								gameQuery.data.datestamp.split(/[T]/)[0]
							} | Tribes 2 Stats Project`}
						/>
						<meta
							property="og:image"
							content={`https://stats.playt2.com/logo512.png`}
						/>
					</Helmet>

					{gameQuery.data.gametype === 'CTFGame' ||
					gameQuery.data.gametype === 'SCtFGame' ? (
						<Helmet>
							<meta
								name="description"
								content={`Storm(${gameQuery.data.teams.storm.players.length}) ${gameQuery.data.teams.storm.score} -vs- Inferno(${gameQuery.data.teams.inferno.players.length}) ${gameQuery.data.teams.inferno.score}`}
							/>
							<meta
								property="og:description"
								content={`Storm(${gameQuery.data.teams.storm.players.length}) ${gameQuery.data.teams.storm.score} -vs- Inferno(${gameQuery.data.teams.inferno.players.length}) ${gameQuery.data.teams.inferno.score}`}
							/>
						</Helmet>
					) : (
						<Helmet>
							<meta
								name="description"
								content={`${gameQuery.data.players.length} players`}
							/>
							<meta
								property="og:description"
								content={`${gameQuery.data.players.length} players`}
							/>
						</Helmet>
					)}

					{gameQuery.data.gametype === 'CTFGame' ||
					gameQuery.data.gametype === 'SCtFGame' ? (
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
