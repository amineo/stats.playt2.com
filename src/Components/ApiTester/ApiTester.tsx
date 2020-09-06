import React, { useState, useContext } from 'react';

/* for userlist */
import { FetchContext } from 'Context/FetchContext';

import CardDisplay from 'Components/CardDisplay';

const ApiTester: React.FC = (props) => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.authAxios;

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
		<div className="mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm">
			<CardDisplay title="User List">
				<div>
					<button
						onClick={getLatestGames}
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						getLatestGames
					</button>

					<button
						onClick={getLatestGamesWithSummary}
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						getLatestGamesWithSummary
					</button>

					<button
						onClick={getGamesByGametype}
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						getGamesByGametype
					</button>

					<button
						onClick={getGameStatsById}
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						getGameStatsById
					</button>
					<hr className="my-5" />

					<button
						onClick={getAllPlayers}
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						getAllPlayers
					</button>

					<button
						onClick={getPlayerById}
						className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					>
						getPlayerById
					</button>
				</div>
			</CardDisplay>
		</div>
	);
};

export default ApiTester;
