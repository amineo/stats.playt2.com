import React from 'react';
import { Link } from 'react-router-dom';

interface IGameRow {
	game: any;
	index: number;
}

const RowCTF: React.FC = (game: any) => {
	return (
		<Link
			to={`/game/${game.gameId}`}
			className="block transition duration-150 ease-in-out border-dotted border-transparent hover:border-teal-500 border"
		>
			<div className="flex items-center px-4 py-4 sm:px-6">
				<div className="min-w-0 flex-1 flex items-center">
					<div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
						<div className="leading-5 font-medium truncate">{game.map}</div>
						<div className="md:block">
							<div className="flex items-center text-sm">{game.datestamp.split(/[T]/)[0]}</div>
						</div>
					</div>
				</div>
				<div>
					<svg className="h-5 w-5 " fill="currentColor" viewBox="0 0 20 20">
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
			className="block transition duration-150 ease-in-out border-dotted border-transparent hover:border-teal-500 border"
		>
			<div className="flex items-center px-4 py-4 sm:px-6">
				<div className="min-w-0 flex-1 flex items-center">
					<div className="min-w-0 flex-1 md:grid md:grid-cols-2 md:gap-4">
						<div className=" leading-5 font-medium truncate">{game.map}</div>
						<div className="hidden md:block">
							<div className="flex items-center text-sm">{game.datestamp.split(/[T]/)[0]}</div>
						</div>
					</div>
				</div>
				<div>
					<svg className="h-5 w-5 " fill="currentColor" viewBox="0 0 20 20">
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
	return (
		<div key={`r_${game.gameId}`}>
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
