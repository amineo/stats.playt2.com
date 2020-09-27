import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from '@tailwindui/react';
// @ts-ignore
import { Content, Frame, Table, Words, Header, Line, Button } from 'arwes';
import CardDisplay from 'Components/CardDisplay';
import PlayerStatModal from 'Components/PlayerStatModal';

const CtfGameCard: React.FC = (gameStats: any) => {
	const [ isOpen, setIsOpen ] = useState(false);
	const [ modalPlayerData, setModalPlayerData ] = useState();

	const fullPlayerListByScore = [
		...gameStats.teams.storm.players,
		...gameStats.teams.inferno.players,
		...gameStats.teams.obs.players
	];
	// sort by high score
	fullPlayerListByScore.sort((a, b) => b.stats.scoreTG - a.stats.scoreTG);

	function fireModal(toggle: boolean, player: any) {
		setIsOpen(toggle);
		setModalPlayerData(player);
	}

	return (
		<div>
			<Header className="py-1 mb-8 md:px-4">
				<Content>
					<div className="table w-full">
						<div className="table-cell pt-2">
							<h1>{gameStats.map}</h1>
						</div>
						<div className="table-cell text-right">
							<h5>Game ID: {gameStats.gameId}</h5>
						</div>
					</div>
				</Content>
			</Header>

			<div className="text-center text-sm text-teal-400">{gameStats.gametype}</div>
			<div className="flex justify-center max-w-2xl mx-auto">
				<div className="px-1 text-center md:px-2 lg:px-6 flex w-full justify-center">
					<Content>
						<h1 className="text-6xl font-bold text-white">{gameStats.teams.storm.score}</h1>
						<h4 className="text-4xl">Storm</h4>
					</Content>
				</div>
				<div className="px-1 text-center md:px-2 lg:px-6 flex w-full justify-center">
					<Content>
						<Words>
							{gameStats.teams.storm.players.length}
							<span className="text-xs px-4">vs</span>
							{gameStats.teams.inferno.players.length}
						</Words>
						<div>
							<small className="text-xs text-teal-400">{gameStats.datestamp.split(/[T]/)[0]}</small>
						</div>
					</Content>
				</div>
				<div className="px-1 text-center md:px-2 lg:px-6 flex w-full justify-center">
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
										<th className="px-1 pt-2 text-left text-xs leading-4 font-bold  uppercase tracking-wider md:px-2 lg:px-6">
											<h6>Player</h6>
										</th>
										<th className="px-1 pt-2 text-left text-xs leading-4 font-bold  uppercase tracking-wider md:px-2 lg:px-6">
											<h6>Score</h6>
										</th>
										<th className="px-1 pt-2 md:px-2 lg:px-6" />
									</tr>
								</thead>

								{gameStats.teams.storm.players.map((player: any) => (
									<tr>
										<td className="px-1 py-4 whitespace-no-wrap  leading-5 font-medium md:px-2 lg:px-6">
											<small>
												<Link to={`/player/${player.playerGuid}`}>{player.playerName}</Link>
											</small>
										</td>
										<td className="px-1 py-4 whitespace-no-wrap text-sm leading-5 md:px-2 lg:px-6">
											{player.stats.scoreTG}
										</td>
										<td className="px-1 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium md:px-2 lg:px-6">
											<Button onClick={() => fireModal(!isOpen, player)}>More</Button>
										</td>
									</tr>
								))}
							</table>
						</Content>{' '}
					</CardDisplay>
				</div>
				<div className="col-span-1">
					<CardDisplay header="Inferno">
						<Content>
							<table className="min-w-full">
								<thead className="border-b border-teal-500 border-dotted">
									<tr>
										<th className="px-1 pt-2 text-left text-xs leading-4 font-bold  uppercase tracking-wider md:px-2 lg:px-6">
											<h6>Player</h6>
										</th>
										<th className="px-1 pt-2 text-left text-xs leading-4 font-bold  uppercase tracking-wider md:px-2 lg:px-6">
											<h6>Score</h6>
										</th>
										<th className="px-1 pt-2 md:px-2 lg:px-6" />
									</tr>
								</thead>
								{gameStats.teams.inferno.players.map((player: any, index: number) => (
									<tr>
										<td className="px-1 py-4 whitespace-no-wrap  leading-5 font-medium md:px-2 lg:px-6">
											<small>
												<Link to={`/player/${player.playerGuid}`}>{player.playerName}</Link>
											</small>
										</td>
										<td className="px-1 py-4 whitespace-no-wrap text-sm leading-5 md:px-2 lg:px-6">
											{player.stats.scoreTG}
										</td>
										<td className="px-1 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium lg:px-6">
											<Button onClick={() => fireModal(!isOpen, player)}>More</Button>
										</td>
									</tr>
								))}
							</table>
						</Content>
					</CardDisplay>
				</div>
			</div>
			<div className="my-6">
				<Frame border={false} corners={2} layer={'header'}>
					<Content>
						<div className="px-1 py-1 md:px-2 lg:px-6 md:py-4">
							<h4>Leaderboard</h4>
							<Line />
							<Table
								animate
								headers={[
									'Player',
									'Score',
									'Team',
									'Kills',
									'Assists',
									'MAs',
									'Kill Streak',
									'Flag Caps',
									'Grabs',
									'Defends',
									'Returns',
									'Carrier Kills'
								]}
								dataset={fullPlayerListByScore.map(
									(player) =>
										player.stats.scoreTG > 0
											? [
													<Link to={`/player/${player.playerGuid}`}>{player.playerName}</Link>,
													player.stats.scoreTG,
													player.stats.dtTeamGame === 1
														? 'Storm'
														: player.stats.dtTeamGame === 2 ? 'Inferno' : 'Obs',
													player.stats.killsTG,
													player.stats.assistTG,
													player.stats.totalMATG,
													player.stats.killStreakTG,
													player.stats.flagCapsTG,
													player.stats.flagGrabsTG,
													player.stats.flagDefendsTG,
													player.stats.flagReturnsTG,
													player.stats.carrierKillsTG
												]
											: []
								)}
							/>
						</div>
					</Content>
				</Frame>
			</div>

			<Transition
				show={isOpen}
				enter="transition-opacity duration-75"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				className="z-50"
			>
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div className="fixed inset-0 transition-opacity ">
							<div className="absolute inset-0 bg-gray-900 opacity-75" />
						</div>

						<div
							className="inline-block align-bottom  p-5 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
						>
							<Frame border={false} corners={2}>
								<div className="pt-5 pb-4 px-1 relative md:px-2 lg:px-6">
									<div className="absolute right-1 top-1">
										<Button
											animate
											type="button"
											layer={'secondary'}
											onClick={() => fireModal(false, {})}
											className="text-xs"
										>
											<svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
												<path
													fillRule="evenodd"
													d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
													clipRule="evenodd"
												/>
											</svg>
										</Button>
									</div>
									<PlayerStatModal {...modalPlayerData} />

									<div className="mt-5 sm:mt-6">
										<span className="flex w-full rounded-md shadow-sm">
											<Button
												animate
												type="button"
												layer={'secondary'}
												onClick={() => fireModal(false, {})}
												className="inline-flex justify-center w-full text-center"
											>
												Close
											</Button>
										</span>
									</div>
								</div>
							</Frame>
						</div>
					</div>
				</div>
			</Transition>
		</div>
	);
};

export default CtfGameCard;
