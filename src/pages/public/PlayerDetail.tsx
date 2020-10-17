import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

// @ts-ignore
import { Header, Content, Loading, Frame, Line, Table } from 'arwes';

import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';

interface IPlayerDetailParams {
	playerGuid: string;
}

/* Refactor this into a util Hook */
function getWindowDimensions() {
	const { innerWidth: width, innerHeight: height } = window;
	return {
		width,
		height
	};
}

function useWindowDimensions() {
	const [ windowDimensions, setWindowDimensions ] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}
/* /// */

const returnWeaponTotals = (statTotals: any) => {
	let totals = [
		{
			weapon: 'Chaingun',
			kills: statTotals['cgKillsTG'],
			dmg: parseFloat(statTotals['cgDmgTG'].toFixed(2))
		},
		{
			weapon: 'Disc',
			kills: statTotals['discKillsTG'],
			dmg: parseFloat(statTotals['discDmgTG'].toFixed(2))
		},
		{
			weapon: 'Grenade Launcher',
			kills: statTotals['grenadeKillsTG'],
			dmg: parseFloat(statTotals['grenadeDmgTG'].toFixed(2))
		},
		{
			weapon: 'Shocklance',
			kills: statTotals['shockKillsTG'],
			dmg: parseFloat(statTotals['shockDmgTG'].toFixed(2))
		},
		{
			weapon: 'Laser Rifle',
			kills: statTotals['laserKillsTG'],
			dmg: parseFloat(statTotals['laserDmgTG'].toFixed(2))
		},
		{
			weapon: 'Blaster',
			kills: statTotals['blasterKillsTG'],
			dmg: parseFloat(statTotals['blasterDmgTG'].toFixed(2))
		},
		{
			weapon: 'Plasma Rifle',
			kills: statTotals['plasmaKillsTG'],
			dmg: parseFloat(statTotals['plasmaDmgTG'].toFixed(2))
		},
		{
			weapon: 'Mortar Launcher',
			kills: statTotals['mortarKillsTG'],
			dmg: parseFloat(statTotals['mortarDmgTG'].toFixed(2))
		},
		{
			weapon: 'Missile Launcher',
			kills: statTotals['missileKillsTG'],
			dmg: parseFloat(statTotals['missileDmgTG'].toFixed(2))
		},
		{
			weapon: 'Hand Grenade',
			kills: statTotals['hGrenadeKillsTG'],
			dmg: parseFloat(statTotals['hGrenadeDmgTG'].toFixed(2))
		},
		{
			weapon: 'Mine',
			kills: statTotals['mineKillsTG'],
			dmg: parseFloat(statTotals['mineDmgTG'].toFixed(2))
		},
		{
			weapon: 'Satchel',
			kills: statTotals['satchelKillsTG'],
			dmg: parseFloat(statTotals['satchelDmgTG'].toFixed(2))
		}
	];

	// dont return if the val is 0
	return totals.filter(function(el) {
		return el.dmg > 0;
	});
};

const weaponLegend = (props: any) => {
	const { payload } = props;
	return (
		<div className="text-center w-full relative">
			{payload.map((entry: any, index: number) => (
				<span className="inline-block px-4" key={`item-${index}`}>
					<svg
						width="14"
						height="14"
						style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '4px' }}
						viewBox="0 0 32 32"
						version="1.1"
					>
						<path
							fill={entry.color}
							className="recharts-symbols"
							transform="translate(16, 16)"
							d="M16,0A16,16,0,1,1,-16,0A16,16,0,1,1,16,0"
						/>
					</svg>{' '}
					{entry.value}
				</span>
			))}
		</div>
	);
};

const WeaponTooltip = ({ payload, label }: any) => {
	if (!payload.length) {
		return <div />;
	}
	return (
		<div className="bg-opacity-50 bg-black px-6 shadow">
			<h5>
				{label} - Kills: {payload[0].payload.kills}; Damage: {payload[0].payload.dmg}
			</h5>
		</div>
	);
};

const GameStatCard = (game: any) => {
	return game.stats ? (
		<Frame key={game.stats.gameID} animate level={1} corners={3} layer={'header'} className="mb-6">
			<div className="py-1 px-1 md:px-4 md:py-4">
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
	) : (
		<div />
	);
};

const PlayerDetail = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;
	const { width } = useWindowDimensions();
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
					<Helmet>
						<title>{playerQuery.data.playerName} | Tribes 2 Stats Project</title>
						<link rel="canonical" href={`https://stats.playt2.com/player/${playerQuery.data.playerGuid}`}></link>
						<meta name="description" content={`Total Score: ${playerQuery.data.statTotals.scoreTG}; Total Games: ${playerQuery.data.gameDetails.length}; Kills: ${playerQuery.data.statTotals.killsTG}; Assists: ${playerQuery.data.statTotals.assistTG}; MAs: ${playerQuery.data.statTotals.totalMATG}`}/>

						<meta property="og:site_name" content="Tribes 2 Stats Project" />
						<meta property="og:url" content={`https://stats.playt2.com/player/${playerQuery.data.playerGuid}`} />
						<meta property="og:type" content="article" />
						<meta property="og:title" content={`${playerQuery.data.playerName} | Tribes 2 Stats Project`} />
						<meta property="og:description" content={`Total Score: ${playerQuery.data.statTotals.scoreTG}; Total Games: ${playerQuery.data.gameDetails.length}; Kills: ${playerQuery.data.statTotals.killsTG}; Assists: ${playerQuery.data.statTotals.assistTG}; MAs: ${playerQuery.data.statTotals.totalMATG}`} />
						<meta property="og:image" content={`https://stats.playt2.com/logo512.png`} /> 
					</Helmet>
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
						<Frame border={false} corners={2}>
							<div className="px-4 py-4">
								<h5>Aggregate Totals</h5>
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

							<div className="flex justify-center">
								<ResponsiveContainer width={width > 740 ? 600 : 340} height={width > 740 ? 500 : 300}>
									<RadarChart
										outerRadius={width > 740 ? 150 : 75}
										data={
											returnWeaponTotals(playerQuery.data.statTotals).length ? (
												returnWeaponTotals(playerQuery.data.statTotals)
											) : (
												[ { weapon: 'No Data', val: 1 } ]
											)
										}
										className="text-xs text-white mx-auto"
									>
										<Legend verticalAlign="top" iconType="circle" content={weaponLegend} />
										<PolarGrid stroke="#035659" />
										<PolarAngleAxis dataKey="weapon" stroke="#A1ECFB" />
										<PolarRadiusAxis stroke="#DF9527" />
										<Tooltip content={<WeaponTooltip />} />
										<Radar
											name="Kills"
											dataKey="kills"
											stroke="#3FD7F6"
											fill="#3FD7F6"
											fillOpacity={0.4}
										/>
										<Radar
											name="Damage"
											dataKey="dmg"
											stroke="#ffeb3b"
											fill="#ffeb3b"
											fillOpacity={0.2}
										/>
									</RadarChart>
								</ResponsiveContainer>
							</div>
						</Frame>
					</div>
					<div className="mt-10">
						<h5>Game History (Past {cappedGameDetailList.length} Games)</h5>

						{cappedGameDetailList.map((game: any, index: number) => (
							<GameStatCard key={`p_${playerGuid}g_${index}`} {...game} />
						))}
					</div>
				</div>
			)}
		</Content>
	);
};

export default PlayerDetail;
