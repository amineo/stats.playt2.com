import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

// @ts-ignore
import { Header, Content, Loading, Frame, Line, Table } from 'arwes';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Tooltip } from 'recharts';

interface IPlayerDetailParams {
	playerGuid: string;
}

const returnWeaponTotals = (statTotals: any) => {
	let totals = [
		{ weapon: 'Chaingun', val: statTotals['cgKillsTG'] },
		{ weapon: 'Disc', val: statTotals['discKillsTG'] },
		{ weapon: 'Grenade Launcher', val: statTotals['grenadeKillsTG'] },
		{ weapon: 'Shocklance', val: statTotals['shockKillsTG'] },
		{ weapon: 'Laser Rifle', val: statTotals['laserKillsTG'] },
		{ weapon: 'Blaster', val: statTotals['blasterKillsTG'] },
		{ weapon: 'Plasma Rifle', val: statTotals['plasmaKillsTG'] },
		{ weapon: 'Mortar Launcher', val: statTotals['mortarKillsTG'] },
		{ weapon: 'Missile Launcher', val: statTotals['missileKillsTG'] },
		{ weapon: 'Hand Grenade', val: statTotals['hGrenadeKillsTG'] },
		{ weapon: 'Mine', val: statTotals['mineKillsTG'] },
		{ weapon: 'Satchel', val: statTotals['satchelKillsTG'] }
	];

	// dont return if the val is 0
	return totals.filter(function(el) {
		return el.val > 0;
	});
};

const GameStatCard = (game: any) => {
	return (
		<Frame animate level={1} corners={3} layer={'header'} className="mb-6">
			<div className="py-4 px-4">
				<div className="table w-full mb-4">
					<div className="table-cell align-top">
						<Link to={`/game/${game.stats.gameID}`}>
							<span className="block">{game.map}</span>
						</Link>
					</div>
					<div className="table-cell text-right">
						<small className="block">{game.gametype}</small>
						<small>{game.datestamp.split(/[T]/)[0]}</small>
					</div>
				</div>

				<Line />

				<Table
					animate
					headers={[
						'Score',
						'Kills',
						'Assists',
						'Kill Streak',
						'MAs',
						'Flag Caps',
						'Grabs',
						'Defends',
						'Returns',
						'Carrier Kills'
					]}
					dataset={[
						[
							game.stats.scoreTG,
							game.stats.killsTG,
							game.stats.assistTG,
							game.stats.killStreakTG,
							game.stats.totalMATG,
							game.stats.flagCapsTG,
							game.stats.flagGrabsTG,
							game.stats.flagDefendsTG,
							game.stats.flagReturnsTG,
							game.stats.carrierKillsTG
						]
					]}
				/>
			</div>
		</Frame>
	);
};

const WeaponTooltip = ({ payload, label }: any) => {
	if (!payload.length) {
		return <div />;
	}
	return (
		<div className="bg-opacity-50 bg-black px-6 shadow">
			<h5>
				{label} - {payload[0].value} kills
			</h5>
		</div>
	);
};

const PlayerDetail = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const { playerGuid } = useParams<IPlayerDetailParams>();

	const playerQuery = useQuery([ 'player', playerGuid ], () => apiClient.getPlayerById(playerGuid), {
		refetchOnWindowFocus: false,
		staleTime: Infinity
	});

	const cappedGameDetailList = [];

	if (playerQuery.isSuccess) {
		for (let i = 0; i < 50; i++) {
			cappedGameDetailList.push(playerQuery.data.gameDetails[i]);
		}
	}

	return (
		<Content>
			{playerQuery.isLoading ? (
				<div className="h-screen">
					<Loading animate full />
				</div>
			) : (
				<div>
					<div className="py-4 mb-4">
						<Header>
							<div className=" table w-full">
								<div className="table-cell text-left w-6/12">
									<h3>{playerQuery.data.playerName}</h3>
								</div>
								<div className="table-cell text-right w-6/12">
									<h5>
										<small>Last Played:</small> {playerQuery.data.updatedAt.split(/[T]/)[0]}
									</h5>
								</div>
							</div>
						</Header>
					</div>
					<div>
						<Frame border={false}>
							<h5>Aggregate Totals</h5>

							<div className="px-4">
								<Table
									animate
									headers={[
										'Score',
										'Kills',
										'Assists',
										'MAs',
										' -',
										' -',
										' -',
										'Games Played'

										// 'Kill Streak',
										// 'Flag Caps',
										// 'Grabs',
										// 'Defends',
										// 'Returns',
										// 'Carrier Kills',
									]}
									dataset={[
										[
											playerQuery.data.statTotals.scoreTG,
											playerQuery.data.statTotals.killsTG,
											playerQuery.data.statTotals.assistTG,
											playerQuery.data.statTotals.totalMATG,
											' -',
											' -',
											' -',
											playerQuery.data.gameDetails.length

											// playerQuery.data.statTotals.killStreakTG,
											// playerQuery.data.statTotals.flagCapsTG,
											// playerQuery.data.statTotals.flagGrabsTG,
											// playerQuery.data.statTotals.flagDefendsTG,
											// playerQuery.data.statTotals.flagReturnsTG,
											// playerQuery.data.statTotals.carrierKillsTG,
										]
									]}
								/>
							</div>

							<RadarChart
								cx={300}
								cy={250}
								outerRadius={150}
								width={600}
								height={500}
								data={
									returnWeaponTotals(playerQuery.data.statTotals).length ? (
										returnWeaponTotals(playerQuery.data.statTotals)
									) : (
										[ { weapon: 'No Data', val: 1 } ]
									)
								}
								className="text-xs text-white mx-auto"
							>
								<PolarGrid stroke="#035659" />
								<PolarAngleAxis dataKey="weapon" stroke="#A1ECFB" />
								<PolarRadiusAxis stroke="#DF9527" />
								<Tooltip content={<WeaponTooltip />} />
								<Radar
									name="weaponUsage"
									dataKey="val"
									stroke="#3FD7F6"
									fill="#3FD7F6"
									fillOpacity={0.4}
								/>
							</RadarChart>
						</Frame>
					</div>
					<div className="mt-10">
						<h5>Game History (Past {cappedGameDetailList.length} Games)</h5>

						{cappedGameDetailList.map((game: any) => <GameStatCard {...game} />)}
					</div>
				</div>
			)}
		</Content>
	);
};

export default PlayerDetail;
