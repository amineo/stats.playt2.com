import React, { useContext, useCallback, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FetchContext } from 'Context/FetchContext';
import CardDisplay from 'Components/CardDisplay';
import GameRow from 'Components/GameRow';

import ApiTester from 'Components/ApiTester';

// @ts-ignore
import { Header, Footer, Content, Frame, Button } from 'arwes';

const Home = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const [ ctfGames, setCtfGames ] = useState([]);
	const [ lakGames, setLakGames ] = useState([]);

	const getLatestCTFGames = useCallback(
		async () => {
			await apiClient.getGamesByGametype('CTFGame').then((res: any) => {
				setCtfGames(res);
			});
		},
		[ apiClient ]
	);
	const getLatestLakGames = useCallback(
		async () => {
			await apiClient.getGamesByGametype('LakRabbitGame').then((res: any) => {
				setLakGames(res);
			});
		},
		[ apiClient ]
	);

	useEffect(
		() => {
			getLatestCTFGames();
			getLatestLakGames();
		},
		[ getLatestCTFGames, getLatestLakGames ]
	);

	return (
		<Content>
			<Header className="py-4 mb-8">
				<h5>Latest Games</h5>
			</Header>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div className="col-span-1">
					<CardDisplay header="CTF">{ctfGames.map((game, index) => GameRow(game, index))}</CardDisplay>
				</div>
				<div className="col-span-1">
					<CardDisplay header="Lak">{lakGames.map((game, index) => GameRow(game, index))}</CardDisplay>
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
