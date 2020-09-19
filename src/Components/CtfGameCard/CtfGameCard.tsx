import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Content, Words, Header, Button } from 'arwes';
import CardDisplay from 'Components/CardDisplay';

const PlayerRow: React.FC = (player: any) => {
	return (
		<tr>
			<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 font-medium">
				<Link to={`/player/${player.playerGuid}`}>{player.playerName}</Link>
			</td>
			<td className="px-6 py-4 whitespace-no-wrap text-sm leading-5">{player.stats.scoreTG}</td>
			<td className="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
				<Button>More</Button>
			</td>
		</tr>
	);
};

const CtfGameCard: React.FC = (gameStats: any) => {
	return (
		<div>
			<Header className="py-4 mb-8">
				<Content>
					<div className="table w-full">
						<div className="table-cell">
							<h1>{gameStats.map}</h1>
						</div>
						<div className="table-cell text-right">
							<h5>Game ID: {gameStats.gameId}</h5>
						</div>
					</div>
				</Content>
			</Header>
			<div className=" max-w-md mx-auto sm:flex sm:justify-center ">
				<div className="px-6 text-center w-1/3">
					<Content>
						<h1 className="text-6xl font-bold text-white text-right ">{gameStats.teams.storm.score}</h1>
						<h4 className="text-4xl text-right">Storm</h4>
					</Content>
				</div>
				<div className="px-6 text-center w-1/3">
					<Content>
						<Words>
							{gameStats.teams.storm.players.length} vs {gameStats.teams.inferno.players.length}
						</Words>
					</Content>
				</div>
				<div className="px-6 text-center w-1/3">
					<Content>
						<h1 className="text-6xl font-bold text-white ">{gameStats.teams.inferno.score}</h1>
						<h4 className="text-4xl">Inferno</h4>
					</Content>
				</div>
			</div>
			<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
				<div className="col-span-1">
					<CardDisplay header="Storm">
						<Content>
							<table className="min-w-full">
								<thead className="border-b border-teal-500 border-dotted">
									<tr>
										<th className="px-6 pt-2 text-left text-xs leading-4 font-bold  uppercase tracking-wider">
											<h6>Player</h6>
										</th>
										<th className="px-6 pt-2 text-left text-xs leading-4 font-bold uppercase tracking-wider">
											<h6>Score</h6>
										</th>
										<th className="px-6 pt-2" />
									</tr>
								</thead>

								{gameStats.teams.storm.players.map((player: any, index: number) =>
									PlayerRow(player, index)
								)}
							</table>
						</Content>{' '}
					</CardDisplay>
				</div>
				<div className="col-span-1">
					<CardDisplay header="Interno">
						<Content>
							<table className="min-w-full">
								<thead className="border-b border-teal-500 border-dotted">
									<tr>
										<th className="px-6 pt-2 text-left text-xs leading-4 font-bold  uppercase tracking-wider">
											<h6>Player</h6>
										</th>
										<th className="px-6 pt-2 text-left text-xs leading-4 font-bold uppercase tracking-wider">
											<h6>Score</h6>
										</th>
										<th className="px-6 pt-2" />
									</tr>
								</thead>
								{gameStats.teams.inferno.players.map((player: any, index: number) =>
									PlayerRow(player, index)
								)}
							</table>
						</Content>
					</CardDisplay>
				</div>
			</div>
		</div>
	);
};

export default CtfGameCard;
