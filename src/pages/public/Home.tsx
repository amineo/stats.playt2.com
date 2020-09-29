import React, { useContext } from 'react';
import { useQuery, queryCache } from 'react-query';

import { FetchContext } from 'Context/FetchContext';
import CardDisplay from 'Components/CardDisplay';
import GameRow from 'Components/GameRow';

// @ts-ignore
import { Header, Content, Loading } from 'arwes';

const Home = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const ctfGamesQuery = useQuery([ 'latest', 'CTFGame' ], () => apiClient.getGamesByGametype('CTFGame', 15), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	const lakGamesQuery = useQuery(
		[ 'latest', 'LakRabbitGame' ],
		() => apiClient.getGamesByGametype('LakRabbitGame', 18),
		{
			refetchOnWindowFocus: false,
			staleTime: 300000
		}
	);

	const ltCtfGamesQuery = useQuery([ 'latest', 'SCtFGame' ], () => apiClient.getGamesByGametype('SCtFGame', 11), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	const dmGamesQuery = useQuery([ 'latest', 'DMGame' ], () => apiClient.getGamesByGametype('DMGame', 14), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	return (
		<Content>
			<Header className="py-4 mb-4 text-center">
				<h5>Latest Games</h5>
			</Header>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 my-5">
				<div className="col-span-1">
					<CardDisplay header="CTF">
						{ctfGamesQuery.isLoading ? (
							<Loading animate full />
						) : (
							ctfGamesQuery.data.map((game: any, index: number) => (
								<div
									key={game.gameId}
									onMouseEnter={() => {
										queryCache.prefetchQuery(
											[ 'game', game.gameId ],
											() => apiClient.getGameStatsById(game.gameId),
											{
												refetchOnWindowFocus: false,
												staleTime: Infinity
											}
										);
									}}
								>
									<GameRow {...game} />
								</div>
							))
						)}
					</CardDisplay>
				</div>
				<div className="col-span-1">
					<CardDisplay header="Lak">
						{lakGamesQuery.isLoading ? (
							<Loading animate full />
						) : (
							lakGamesQuery.data.map((game: any, index: number) => (
								<div
									key={game.gameId}
									onMouseEnter={() => {
										queryCache.prefetchQuery(
											[ 'game', game.gameId ],
											() => apiClient.getGameStatsById(game.gameId),
											{
												refetchOnWindowFocus: false,
												staleTime: Infinity
											}
										);
									}}
								>
									<GameRow {...game} />
								</div>
							))
						)}
					</CardDisplay>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 my-5">
				<div className="col-span-1">
					<CardDisplay header="LT CTF">
						{ltCtfGamesQuery.isLoading ? (
							<Loading animate full />
						) : (
							ltCtfGamesQuery.data.map((game: any, index: number) => (
								<div
									key={game.gameId}
									onMouseEnter={() => {
										queryCache.prefetchQuery(
											[ 'game', game.gameId ],
											() => apiClient.getGameStatsById(game.gameId),
											{
												refetchOnWindowFocus: false,
												staleTime: Infinity
											}
										);
									}}
								>
									<GameRow {...game} />
								</div>
							))
						)}
					</CardDisplay>
				</div>
				<div className="col-span-1">
					<CardDisplay header="DM">
						{dmGamesQuery.isLoading ? (
							<Loading animate full />
						) : (
							dmGamesQuery.data.map((game: any, index: number) => (
								<div
									key={game.gameId}
									onMouseEnter={() => {
										queryCache.prefetchQuery(
											[ 'game', game.gameId ],
											() => apiClient.getGameStatsById(game.gameId),
											{
												refetchOnWindowFocus: false,
												staleTime: Infinity
											}
										);
									}}
								>
									<GameRow {...game} />
								</div>
							))
						)}
					</CardDisplay>
				</div>
			</div>
		</Content>
	);
};

export default Home;
