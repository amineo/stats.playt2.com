import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { queryCache } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

interface IGameRow {
	game: any;
	index: number;
}

const RowCTF: React.FC = (game: any) => {
	return (
		<Link
			to={`/game/${game.gameId}`}
			className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
		>
			<div className="flex items-center px-4 py-4 sm:px-6">
				<div className="min-w-0 flex-1 flex items-center">
					<div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
						<div>
							<div className="text-sm leading-5 font-medium text-indigo-600 truncate">{game.map}</div>
							<div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
								<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">
									Played: {game.datestamp.split(/[T]/)[0]}
								</span>
							</div>
						</div>
						<div className="hidden md:block">
							<div>
								<div className="text-sm leading-5 text-gray-900" />
								<div className="mt-2 flex items-center">
									<span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
										{game.gametype}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
		</Link>
	);
};

const RowDefault: React.FC = (game: any) => {
	return (
		<Link
			to={`/game/${game.gameId}`}
			className="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out"
		>
			<div className="flex items-center px-4 py-4 sm:px-6">
				<div className="min-w-0 flex-1 flex items-center">
					<div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
						<div>
							<div className="text-sm leading-5 font-medium text-indigo-600 truncate">{game.map}</div>
							<div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
								<span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-gray-100 text-gray-800">
									Played: {game.datestamp.split(/[T]/)[0]}
								</span>
							</div>
						</div>
						<div className="hidden md:block">
							<div>
								<div className="text-sm leading-5 text-gray-900" />
								<div className="mt-2 flex items-center">
									<span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium leading-5 bg-indigo-100 text-indigo-800">
										{game.gametype}
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
						<path
							fillRule="evenodd"
							d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
							clipRule="evenodd"
						/>
					</svg>
				</div>
			</div>
		</Link>
	);
};

const GameRow: React.FC<IGameRow> = (game: any, index: number) => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	// Should rework this, react warning about hook load order (prob not a real issue though)

	return (
		<div
			key={index}
			onMouseEnter={() => {
				queryCache.prefetchQuery([ 'game', game.gameId ], () => apiClient.getGameStatsById(game.gameId), {
					refetchOnWindowFocus: false,
					staleTime: Infinity
				});
			}}
		>
			{game.gametype === 'CTFGame' || game.gametype === 'SCtFGame' ? (
				<RowCTF {...game} />
			) : (
				<RowDefault {...game} />
			)}
		</div>
	);
};

GameRow.defaultProps = {};

export default GameRow;
