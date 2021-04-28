import React, { useState, useMemo } from 'react';
import orderBy from 'lodash.orderby';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import weekOfYear from 'dayjs/plugin/weekOfYear';

import {
	Tooltip,
	ResponsiveContainer,
	ComposedChart,
	XAxis,
	YAxis,
	CartesianGrid,
	ReferenceLine,
	Line
} from 'recharts';

dayjs.extend(advancedFormat);
dayjs.extend(weekOfYear);

type AggregationPeriod = 'day' | 'week';

function useAccuracyData({
	player,
	stat,
	minShots = 50,
	aggregationPeriod = 'day',
	// TODO: Make game type selectable. Always all games for now.
	gameType
}: {
	player: any,
	stat: string,
	minShots?: number,
	aggregationPeriod?: AggregationPeriod,
	gameType?: string
}): Array<any> {
	return useMemo(() => {
		// Player data not loaded yet.
		if (!player) {
			return [[], {}];
		}

		// Depending on the weapon selected, we'll need a different "total shots"
		// field.
		const totalStat = {
			discMATG: 'discShotsFiredTG',
			discHitsTG: 'discShotsFiredTG',
			discDmgHitsTG: 'discShotsFiredTG',
			laserMATG: 'laserShotsFiredTG',
			laserHitsTG: 'laserShotsFiredTG',
			cgHitsTG: 'cgShotsFiredTG',
			shockHitsTG: 'shockShotsFiredTG'
		}[stat] as string;

		const gamesByDate = new Map();

		player.gameDetails.forEach((game: any) => {
			if (gameType == null || game.gametype === gameType) {
				const aggregationKey = dayjs(game.datestamp)
					.startOf(aggregationPeriod)
					.toISOString();

				if (gamesByDate.has(aggregationKey)) {
					gamesByDate.get(aggregationKey).push(game);
				} else {
					gamesByDate.set(aggregationKey, [game]);
				}
			}
		});

		const timeData: any[] = [];
		const careerData = {
			hits: 0,
			discJumps: 0,
			shots: 0,
			countedShots: 0,
			accuracy: 0,
		};

		gamesByDate.forEach((games, aggregationKey) => {
			// There's a period in September and October 2020 where stats were not
			// tracked correctly, particularly for shocklance. There would be hits but
			// no shots fired, leading to >100% accuracy. Don't count those games.
			// And even for games with valid data, they won't contribute anything if
			// they (legitimately) have 0 shots fired anyway.
			const validGames = games.filter((game: any) => game.stats[totalStat] > 0);

			const hits = validGames.reduce((total: number, game: any) => {
				return total + game.stats[stat];
			}, 0);

			const discJumps = validGames.reduce((total: number, game: any) => {
				// `discJumpTG` is not inclusive of `killerDiscJumpTG`, they are
				// mutually exclusive. So to get the total number of disc jumps, add
				// them up.
				// See: https://github.com/ChocoTaco1/TacoServer/blob/315a54ffb83534fb8cceb443aa2905152555c175/Classic/scripts/autoexec/zDarkTigerStats.cs#L5335-L5340
				return total + game.stats.discJumpTG + game.stats.killerDiscJumpTG;
			}, 0);

			const shots = validGames.reduce((total: number, game: any) => {
				return total + game.stats[totalStat];
			}, 0);

			const countedShots =
				totalStat === 'discShotsFiredTG'
					? Math.max(hits, shots - discJumps)
					: shots;

			careerData.hits += hits;
			careerData.discJumps += discJumps;
			careerData.shots += shots;
			careerData.countedShots += countedShots;

			if (shots >= minShots) {
				timeData.push({
					aggregationKey,
					date: new Date(aggregationKey),
					hits,
					shots,
					countedShots,
					accuracy: countedShots ? hits / countedShots : 0,
				});
			}
		});

		if (careerData.countedShots) {
			careerData.accuracy = careerData.hits / careerData.countedShots;
		}

		return [orderBy(timeData, [(stats) => stats.date], ['asc']), careerData];
	}, [player, stat, gameType, aggregationPeriod, minShots]);
}

const AccuracyTooltip = ({ payload, careerData, aggregationPeriod }: any) => {
	if (!payload || !payload.length) {
		return <div />;
	}

	const date = dayjs(payload[0].payload.date);

	return (
		<div className="bg-opacity-50 bg-black px-6 shadow text-base text-sm text-white">
			<h5 className="mb-2">
				{date.format('YYYY-MM-DD')}
				{
					aggregationPeriod === 'week'
						? <> &ndash; {date.add(6, 'day').format('YYYY-MM-DD')}</>
						: null
				}
			</h5>
			shots: {payload[0].payload.countedShots}
			<br />
			hits: {payload[0].payload.hits}
			<br />
			accuracy: {(100 * payload[0].payload.accuracy).toFixed(1)}%
			<br />
			career average: {(100 * careerData.accuracy).toFixed(1)}%
		</div>
	);
};

export default function AccuracyChart({
	player,
	vsPlayer,
	height
}: {
	player: any,
	vsPlayer?: any,
	height: number
}) {
	const [stat, setStat] = useState('discDmgHitsTG');
	const [gameType, setGameType] = useState<string | undefined>();
	const [aggregationPeriod, setAggregationPeriod] = useState<AggregationPeriod>('week');
	const [timeData, careerData] = useAccuracyData({ player, stat, gameType, aggregationPeriod });
	const [vsTimeData, vsCareerData] = useAccuracyData({ player: vsPlayer, stat, gameType, aggregationPeriod });

	const mergedTimeData = useMemo(() => {
		if (timeData.length && vsTimeData.length) {
			const statsByDate = new Map();

			timeData.forEach((point: any) => {
				const { aggregationKey } = point;
				statsByDate.set(aggregationKey, point);
			});

			vsTimeData.forEach((point: any) => {
				const { aggregationKey } = point;
				if (statsByDate.has(aggregationKey)) {
					statsByDate.set(aggregationKey, {
						...statsByDate.get(aggregationKey),
						vsAccuracy: point.accuracy,
					});
				} else {
					statsByDate.set(aggregationKey, {
						aggregationKey,
						date: point.date,
						vsAccuracy: point.accuracy,
					});
				}
			});

			const data = Array.from(statsByDate.values());
			return orderBy(data, ['date'], ['asc']);
		} else {
			return timeData;
		}
	}, [timeData, vsTimeData]);

	return (
		<section className="w-full xl:w-7/12 self-start">
			<header className="mx-4 text-center">
				<h5 className="normal-case text-shadow-none">
					Accuracy of{' '}
					<select value={stat} onChange={event => {
						setStat(event.target.value);
					}}>
						<option value="discMATG">disc MAs</option>
						<option value="discHitsTG">disc hits (direct)</option>
						<option value="discDmgHitsTG">disc hits (incl. splash)</option>
						<option value="laserMATG">laser MAs</option>
						<option value="laserHitsTG">laser hits</option>
						<option value="cgHitsTG">chaingun hits</option>
						<option value="shockHitsTG">shocklance hits</option>
					</select>
					{' '}in{' '}
					<select value={gameType || ''} onChange={event => {
						setGameType(event.target.value || undefined);
					}}>
						<option value="">all</option>
						<option value="CTFGame">CTF</option>
						<option value="LakRabbitGame">LakRabbit</option>
					</select>
					{' '}games by{' '}
					<select value={aggregationPeriod} onChange={event => {
						setAggregationPeriod(event.target.value as AggregationPeriod);
					}}>
						<option value="day">day</option>
						<option value="week">week</option>
					</select>
				</h5>
				<div className="flex items-center justify-center">
					<svg width="16" height="10" className="mr-2">
						<line x1="0" y1="5" x2="16" y2="5" stroke="white" />
					</svg>
					<span className="text-xs" style={{ color: '#A1ECFB' }}>Career Average</span>
				</div>
			</header>
			{mergedTimeData.length ? (
				<ResponsiveContainer width="100%" height={height}>
					<ComposedChart
						data={mergedTimeData}
						margin={{
							top: 20,
							left: 20,
							right: 50,
							bottom: 60,
						}}
					>
						<XAxis
							dataKey="date"
							padding={{ left: 30, right: 30 }}
							stroke="#A1ECFB"
							minTickGap={25}
							interval="preserveStartEnd"
							tickMargin={10}
							tickSize={10}
							tick={{
								fontSize: '14px',
								fill: '#A1ECFB'
							}}
							type="number"
							scale="time"
							domain={[
								mergedTimeData[0].date.getTime(),
								mergedTimeData[mergedTimeData.length - 1].date.getTime(),
							]}
							tickFormatter={(value) => {
								return dayjs(value).format(
									aggregationPeriod === 'week' ? 'YYYY [W]w' : 'MMM D ’YY'
								);
							}}
						/>
						<YAxis
							dataKey="accuracy"
							stroke="#A1ECFB"
							tick={{
								fill: '#8ec8c8',
								fontSize: '15px'
							}}
							tickMargin={10}
							tickFormatter={(value: number) => `${(100 * value).toFixed(0)}%`}
						/>
						<Tooltip content={
							<AccuracyTooltip
								careerData={careerData}
								aggregationPeriod={aggregationPeriod}
							/>
						} />
						<CartesianGrid
							stroke="#8ec8c8"
							opacity={0.1}
						/>
						{vsCareerData.accuracy != null ? (
							<ReferenceLine
								y={vsCareerData.accuracy}
								stroke="goldenrod"
								strokeDasharray="5 3"
								opacity={0.7}
							/>
						) : null}
						{careerData.accuracy != null ? <ReferenceLine y={careerData.accuracy} stroke="white" /> : null}
						<Line
							dataKey="vsAccuracy"
							connectNulls
							stroke="goldenrod"
							opacity={0.8}
							dot={{
								fill: 'black',
							}}
						/>
						<Line
							dataKey="accuracy"
							connectNulls
							stroke="#1de2d3"
							dot={{
								fill: 'black',
							}}
						/>
					</ComposedChart>
				</ResponsiveContainer>
			) : <p className="text-center text-red-500 p-8">Not Enough Data</p>}
		</section>
	);
}
