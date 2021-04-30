import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useQuery } from 'react-query';
import { mix } from 'polished';

// @ts-ignore
import { Header, Content, Loading, Frame, Line, Table } from 'arwes';

import {
	BarChart,
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

const statOptions = {
	discMATG: { label: 'disc MAs' },
	discHitsTG: { label: 'disc hits (direct)' },
	discDmgHitsTG: { label: 'disc hits (incl. splash)' },
	laserMATG: { label: 'laser MAs' },
	laserHitsTG: { label: 'laser hits' },
	cgHitsTG: { label: 'chaingun hits' },
	shockHitsTG: { label: 'shocklance hits' },
} as const;

const gameTypeOptions = {
	CTFGame: { label: 'CTF' },
	LakRabbitGame: { label: 'LakRabbit' },
} as const;

function useQueryParams() {
	const location = useLocation();
	const history = useHistory();

	const queryParams = useMemo(() => {
		const params = new URLSearchParams(location.search);
		const plainParams: any = {};
		params.forEach((value, key) => {
			plainParams[key] = value === '' ? null : value;
		});
		return plainParams;
	}, [location.search]);

	const setQueryParams = useCallback(
		(values) => {
			const newParams = new URLSearchParams(location.search);
			Object.entries(values).forEach(([key, value]) => {
				if (value != null) {
					newParams.set(key, `${value}`);
				} else {
					newParams.delete(key);
				}
			});
			const newParamsString = newParams.toString();
			history.push(newParamsString ? `?${newParamsString}` : '');
		},
		[history, location.search]
	);

	return [queryParams, setQueryParams];
}

const AccuracyTooltip = ({ payload, label }: any) => {
	if (!payload || !payload.length) {
		return <div />;
	}

	return (
		<div className="bg-opacity-50 bg-black px-6 shadow text-base text-sm text-white">
			<h5 className="mb-2">
				{label}
			</h5>
			hits: {payload[0].payload.hits}
			<br />
			shots: {payload[0].payload.shots}
			<br />
			accuracy: {(100 * payload[0].payload.accuracy).toFixed(1)}%
		</div>
	);
};

const PlayerLabel = ({
	data,
	payload,
	isLoading,
	tickFormatter,
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
				<tspan x={rest.x} dy="0.355em">{payload.value}</tspan>
			</text>
		</Link>
	);
};

const limit = 50;

export default function AccuracyLeaderboard() {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const [params, setQueryParams] = useQueryParams();
	const {
		stat = 'discMATG',
		gameType = null,
	} = params;

	const accuracyQuery = useQuery(
		['accuracy', stat, gameType],
		() => apiClient.getTopPlayersByAccuracy({ stat, gameType, limit }),
		{
			refetchOnWindowFocus: false,
			staleTime: Infinity,
			keepPreviousData: true
		}
	);

	const data = useMemo(() => {
		if (accuracyQuery.data && accuracyQuery.data.players.length) {
			const topPlayer = accuracyQuery.data.players[0];
			return accuracyQuery.data.players.map((player: any) => {
				return {
					...player,
					vsTopPlayer: topPlayer.accuracy
						? player.accuracy / topPlayer.accuracy
						: 1
				};
			})
		} else {
			return [];
		}
	}, [accuracyQuery.data]);

	return (
		<section>
			<header className="py-8 px-5 text-center">
				<h5 className="normal-case text-shadow-none">
					Accuracy of{' '}
					<select value={stat} onChange={event => {
						setQueryParams({ stat: event.target.value });
					}}>
						{Object.entries(statOptions).map(([value, option]) => 
							<option key={value} value={value}>{option.label}</option>)}
					</select>
					{' '}in{' '}
					<select value={gameType || ''} onChange={event => {
						setQueryParams({ gameType: event.target.value || null });
					}}>
						<option value="">all</option>
						{Object.entries(gameTypeOptions).map(([value, option]) => 
							<option key={value} value={value}>{option.label}</option>)}
					</select>
					{' '}games
				</h5>
			</header>
			{data.isFetching ? <Loading animate full /> : null}
			{data.length ? (
				<ResponsiveContainer width="100%" height={data.length * 30}>
					<ComposedChart
						data={data}
						layout="vertical"
						margin={{
							top: 0,
							left: 120,
							right: 80,
							bottom: 50
						}}
					>
						<Tooltip content={<AccuracyTooltip />} />
						<CartesianGrid
							horizontal={false}
							stroke="#8ec8c8"
							opacity={0.3}
						/>
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
								opacity: 0.8
							}}
							tickFormatter={value => `${(100 * value).toFixed(0)}%`}
						/>
						<YAxis
							type="category"
							dataKey="playerName"
							padding={{ top: 4, bottom: 4 }}
							stroke="rgba(0, 201, 200, 0.5)"
							tickSize={0}
							tickMargin={10}
							minTickGap={0}
							tick={<PlayerLabel data={data} isLoading={accuracyQuery.isFetching} />}
						/>
						<Bar dataKey="accuracy" barSize={12}>
							{data.map((player: any, index: number) => (
								<Cell
									key={index}
									fill={mix(player.vsTopPlayer, 'rgba(157, 255, 233, 1)', 'rgba(80, 177, 170, 0.7)')}
									opacity={accuracyQuery.isFetching ? 0.2 : 1}
								/>
							))}
						</Bar>
					</ComposedChart>
				</ResponsiveContainer>
			) : <p className="text-center text-red-500 p-8 pb-20">Not Enough Data</p>}
		</section>
	);
}
