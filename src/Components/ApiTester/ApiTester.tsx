import React, { useContext } from 'react';

import { FetchContext } from 'Context/FetchContext';

import CardDisplay from 'Components/CardDisplay';

// @ts-ignore
import { Button, Line, Content, Appear } from 'arwes';

const ApiTester: React.FC = (props) => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const getLatestGames = async () => {
		await apiClient.getLatestGames().then((res: any) => {
			console.log(res);
		});
	};

	const getLatestGamesWithSummary = async () => {
		await apiClient.getLatestGamesWithSummary().then((res: any) => {
			console.log(res);
		});
	};

	const getGamesByGametype = async () => {
		await apiClient.getGamesByGametype('CTFGame').then((res: any) => {
			console.log(res);
		});
	};

	const getGameStatsById = async () => {
		await apiClient.getGameStatsById(1179).then((res: any) => {
			console.log(res);
		});
	};

	const getAllPlayers = async () => {
		await apiClient.getAllPlayers().then((res: any) => {
			console.log(res);
		});
	};

	const getPlayerById = async () => {
		await apiClient.getPlayerById(4194030).then((res: any) => {
			console.log(res);
		});
	};

	return (
		<div className="mx-auto shadow-md rounded pt-6 pb-8 mb-4 max-w-sm">
			<CardDisplay header="Api Endpoint Tester">
				<Appear animate>
					<Button onClick={getLatestGames} className="mt-4">
						getLatestGames
					</Button>

					<Button onClick={getLatestGamesWithSummary} className="mt-4">
						getLatestGamesWithSummary
					</Button>

					<Button onClick={getGamesByGametype} className="mt-4">
						getGamesByGametype
					</Button>

					<Button onClick={getGameStatsById} className="mt-4">
						getGameStatsById
					</Button>

					<div className="my-10">
						<Line />
					</div>

					<Button onClick={getAllPlayers} className="mx-2">
						getAllPlayers
					</Button>

					<Button onClick={getPlayerById} className="mx-2" animate>
						getPlayerById
					</Button>
				</Appear>
			</CardDisplay>
		</div>
	);
};

export default ApiTester;
