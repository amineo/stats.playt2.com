import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { mix } from 'polished';

// @ts-ignore
import { Loading } from 'arwes';

import {
	Cell,
	Tooltip,
	ResponsiveContainer,
	ComposedChart,
	XAxis,
	YAxis,
	CartesianGrid,
	Bar,
} from 'recharts';

import { FetchContext } from 'Context/FetchContext';
import useQueryParams from 'utils/useQueryParams';

const gameTypeOptions = {
	CTFGame: { label: 'CTF' },
} as const;

const minGamesOptions = {
	25: { label: '25' },
	50: { label: '50' },
	100: { label: '100' },
	500: { label: '500' },
	1000: { label: '1,000' },
} as const;

const WinsTooltip = ({ payload, label }: any) => {
	if (!payload || !payload.length) {
		return <div />;
	}

	return (
		<div className="bg-opacity-50 bg-black px-6 shadow text-base text-sm text-white">
			<h5 className="mb-2">
				#{payload[0].payload.index + 1} &ndash; {label}
			</h5>
			wins: {payload[0].payload.winCount}
			<br />
			losses: {payload[0].payload.lossCount}
			<br />
			draws: {payload[0].payload.drawCount}
			<br />
			winning percentage: {(100 * payload[0].payload.winPercent).toFixed(1)}%
		</div>
	);
};

const PlayerLabel = ({
	data,
	payload,
	isLoading,
	tickFormatter,
	verticalAnchor,
	visibleTicksCount,
	...rest
}: any) => {
	return (
		<Link to={`/player/${data[payload.index].playerGuid}`}>
			<text
				{...rest}
				width={250}
				fontSize={payload.index === 0 ? 18 : 16}
				fill={payload.index === 0 ? 'white' : '#a1ecfb'}
				opacity={isLoading ? 0.5 : 1}
			>
				<tspan x={rest.x} dy={payload.index === 0 ? '0.315em' : '0.355em'}>
					{payload.value}
				</tspan>
			</text>
		</Link>
	);
};

const limit = 50;

export default function WinsLeaderboard() {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const [params, setQueryParams] = useQueryParams();
	const { minGames = '50', gameType = 'CTFGame' } = params;

	const winsQuery = useQuery(
		['wins', gameType, minGames],
		() => apiClient.getTopPlayersByWins({ minGames, limit }),
		{
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			keepPreviousData: true,
		},
	);

	const data = useMemo(() => {
		if (winsQuery.data && winsQuery.data.players.length) {
			const topPlayer = winsQuery.data.players[0];
			return winsQuery.data.players.map((player: any, index: number) => {
				return {
					...player,
					index,
					vsTopPlayer: topPlayer.winPercent
						? player.winPercent / topPlayer.winPercent
						: 1,
				};
			});
		} else {
			return [];
		}
	}, [winsQuery.data]);

	return (
		<section>
			<header className="py-3 text-center">
				<h5 className="normal-case text-shadow-none">
					Winning percentage in{' '}
					<select
						value={gameType || ''}
						onChange={(event) => {
							setQueryParams({ gameType: event.target.value || null });
						}}
					>
						{Object.entries(gameTypeOptions).map(([value, option]) => (
							<option key={value} value={value}>
								{option.label}
							</option>
						))}
					</select>
					<br />
					with min.{' '}
					<select
						value={minGames || ''}
						onChange={(event) => {
							setQueryParams({ minGames: event.target.value || null });
						}}
					>
						{Object.entries(minGamesOptions).map(([value, option]) => (
							<option key={value} value={value}>
								{option.label}
							</option>
						))}
						{minGames in minGamesOptions ? null : (
							<option key={minGames} value={minGames}>
								{minGames} (custom)
							</option>
						)}
					</select>{' '}
					games played
				</h5>
			</header>
			{winsQuery.isFetching ? (
				<div
					className={`mx-auto w-32 h-32 my-8 ${
						data.length ? 'absolute inset-x-0' : 'relative'
					}`}
				>
					<Loading animate full />
				</div>
			) : null}
			{data.length ? (
				<ResponsiveContainer width="100%" height={90 + data.length * 28}>
					<ComposedChart
						data={data}
						layout="vertical"
						margin={{
							top: 20,
							left: 90,
							right: 50,
							bottom: 30,
						}}
					>
						<Tooltip content={<WinsTooltip />} />
						<CartesianGrid horizontal={false} stroke="#8ec8c8" opacity={0.3} />
						<XAxis
							type="number"
							orientation="top"
							padding={{ left: 0, right: 0 }}
							stroke="rgba(0, 201, 200, 0.5)"
							tickSize={10}
							tickMargin={10}
							tick={{
								fontSize: 15,
								fill: 'white',
								opacity: 0.8,
							}}
							tickFormatter={(value) => `${(100 * value).toFixed(0)}%`}
						/>
						<YAxis
							type="category"
							dataKey="playerName"
							padding={{ top: 4, bottom: 4 }}
							stroke="rgba(0, 201, 200, 0.5)"
							tickSize={0}
							tickMargin={10}
							minTickGap={0}
							tick={
								<PlayerLabel data={data} isLoading={winsQuery.isFetching} />
							}
						/>
						<Bar dataKey="winPercent" barSize={12}>
							{data.map((player: any, index: number) => (
								<Cell
									key={index}
									fill={mix(
										player.vsTopPlayer,
										'rgba(157, 255, 233, 1)',
										'rgba(80, 177, 170, 0.7)',
									)}
									opacity={winsQuery.isFetching ? 0.2 : 1}
								/>
							))}
						</Bar>
					</ComposedChart>
				</ResponsiveContainer>
			) : null}
			{winsQuery.isFetched && !data.length ? (
				<p className="text-center text-red-500 p-8">Not Enough Data</p>
			) : null}
		</section>
	);
}
