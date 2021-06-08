import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import Duration from 'dayjs/plugin/duration';

import {
	ResponsiveContainer,
	ComposedChart,
	Line,
	ReferenceLine,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
} from 'recharts';

dayjs.extend(Duration);

const ScoreTooltip = ({ payload }: any) => {
	if (!payload || !payload.length) {
		return null;
	}

	let teamLabel;
	if (payload.length > 1) {
		teamLabel = 'Storm / Inferno';
	} else if (payload[0].dataKey === 'stormScore') {
		teamLabel = 'Storm';
	} else {
		teamLabel = 'Inferno';
	}

	const time = payload[0].payload.time;
	const format = time >= 60 ? 'H:mm:ss' : 'mm:ss';
	const displayTime = dayjs.duration(time * 1000 * 60).format(format);

	return (
		<div className="bg-opacity-50 bg-black px-6 shadow text-base text-sm text-white">
			<h5 className="mb-2">{teamLabel}</h5>
			score: {payload.map((data: any) => data.value).join(' / ')}
			<br />
			time: {displayTime}
		</div>
	);
};

export default function CapTimelineChart({
	teamOneCapTimesGame,
	teamTwoCapTimesGame,
	matchRunTimeTG,
	mini = false,
}: {
	teamOneCapTimesGame: number[];
	teamTwoCapTimesGame: number[];
	matchRunTimeTG: number;
	mini?: boolean;
}) {
	const endTime = Math.max(
		matchRunTimeTG,
		...teamOneCapTimesGame.slice(-1),
		...teamTwoCapTimesGame.slice(-1),
	);

	const data = [
		{ stormScore: 0, infernoScore: 0, time: 0 },
		...teamOneCapTimesGame.map((time, i) => ({ stormScore: i + 1, time })),
		...teamTwoCapTimesGame.map((time, i) => ({ infernoScore: i + 1, time })),
		{
			stormScore: teamOneCapTimesGame.length,
			infernoScore: teamTwoCapTimesGame.length,
			time: matchRunTimeTG,
		},
	];

	let endLineColor = 'rgba(255, 255, 255, 0.6)';
	if (teamOneCapTimesGame.length > teamTwoCapTimesGame.length) {
		endLineColor = 'rgba(105, 193, 255, 0.7)';
	} else if (teamTwoCapTimesGame.length > teamOneCapTimesGame.length) {
		endLineColor = 'rgba(255, 140, 101, 0.7)';
	}

	const capTicks = useMemo(() => {
		const capCount = Math.max(
			teamOneCapTimesGame.length,
			teamTwoCapTimesGame.length,
			1,
		);

		const ticks = [];
		for (let i = 0; i <= capCount; i++) {
			ticks.push(i);
		}

		return ticks;
	}, [teamOneCapTimesGame.length, teamTwoCapTimesGame.length]);

	return (
		<ResponsiveContainer width="100%" height={mini ? 150 : 600}>
			<ComposedChart
				data={data}
				margin={{
					top: 20,
					left: -10,
					right: 40,
					bottom: 20,
				}}
			>
				<CartesianGrid stroke="#8ec8c8" opacity={0.2} />
				<XAxis
					type="number"
					dataKey="time"
					stroke="rgba(161, 236, 251, 0.5)"
					tickCount={mini ? 2 : undefined}
					tickMargin={10}
					tickSize={10}
					tick={{
						fill: '#8ec8c8',
						fontSize: mini ? 12 : 13,
					}}
					tickFormatter={(value, i) => (i === 0 ? 'start' : `${value} min.`)}
				/>
				<YAxis
					stroke="rgba(161, 236, 251, 0.5)"
					domain={[0, capTicks[capTicks.length - 1]]}
					ticks={capTicks}
					tickCount={mini ? 2 : undefined}
					tick={{ fill: '#A1ECFB', fontSize: mini ? 13 : 16 }}
					tickMargin={10}
				/>
				<ReferenceLine
					x={endTime}
					label={
						mini
							? undefined
							: {
									value: 'match ended',
									position: 'right',
									offset: 15,
									angle: 90,
									dy: -30,
									fill: 'rgba(255, 255, 255, 1)',
									fontSize: 14,
							  }
					}
					stroke={endLineColor}
					alwaysShow
				/>
				<Line
					dataKey="stormScore"
					stroke="rgba(105, 193, 255, 0.9)"
					strokeWidth={2}
					type="stepAfter"
					connectNulls
				/>
				<Line
					dataKey="infernoScore"
					stroke="rgba(255, 140, 101, 0.9)"
					strokeWidth={2}
					type="stepAfter"
					connectNulls
					dot={false}
				/>
				<Tooltip content={<ScoreTooltip />} />
			</ComposedChart>
		</ResponsiveContainer>
	);
}
