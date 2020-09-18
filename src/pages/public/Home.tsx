import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';
import CardDisplay from 'Components/CardDisplay';
import GameRow from 'Components/GameRow';

import ApiTester from 'Components/ApiTester';

// @ts-ignore
import { Header, Content, Loading } from 'arwes';

const Home = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const ctfGamesQuery = useQuery([ 'latest', 'CTFGame' ], () => apiClient.getGamesByGametype('CTFGame'), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	const lakGamesQuery = useQuery([ 'latest', 'LakRabbitGame' ], () => apiClient.getGamesByGametype('LakRabbitGame'), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	const ltCtfGamesQuery = useQuery([ 'latest', 'SCtFGame' ], () => apiClient.getGamesByGametype('SCtFGame'), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	const dmGamesQuery = useQuery([ 'latest', 'DMGame' ], () => apiClient.getGamesByGametype('DMGame'), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	return (
		<Content>
			<Header className="py-4 mb-4">
				<h5>Latest Games</h5>
			</Header>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 my-5">
				<div className="col-span-1">
					<CardDisplay header="CTF">
						{ctfGamesQuery.isLoading ? (
							<Loading animate />
						) : (
							ctfGamesQuery.data.map((game: any, index: number) => GameRow(game, index))
						)}
					</CardDisplay>
				</div>
				<div className="col-span-1">
					<CardDisplay header="Lak">
						{lakGamesQuery.isLoading ? (
							<Loading animate />
						) : (
							lakGamesQuery.data.map((game: any, index: number) => GameRow(game, index))
						)}
					</CardDisplay>
				</div>
			</div>

			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 my-5">
				<div className="col-span-1">
					<CardDisplay header="LT CTF">
						{ltCtfGamesQuery.isLoading ? (
							<Loading animate />
						) : (
							ltCtfGamesQuery.data.map((game: any, index: number) => GameRow(game, index))
						)}
					</CardDisplay>
				</div>
				<div className="col-span-1">
					<CardDisplay header="DM">
						{dmGamesQuery.isLoading ? (
							<Loading animate />
						) : (
							dmGamesQuery.data.map((game: any, index: number) => GameRow(game, index))
						)}
					</CardDisplay>
				</div>
			</div>
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

export default Home;
