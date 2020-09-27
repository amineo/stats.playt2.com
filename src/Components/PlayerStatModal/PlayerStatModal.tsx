// @ts-nocheck
import React, { PureComponent } from 'react';

import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Tooltip,
	Legend,
	PieChart,
	Pie,
	Sector
} from 'recharts';

import { Content, Line, Table } from 'arwes';

const renderActiveShape = (props) => {
	const RADIAN = Math.PI / 180;
	const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
	const sin = Math.sin(-RADIAN * midAngle);
	const cos = Math.cos(-RADIAN * midAngle);
	const sx = cx + (outerRadius + 10) * cos;
	const sy = cy + (outerRadius + 10) * sin;
	const mx = cx + (outerRadius + 30) * cos;
	const my = cy + (outerRadius + 30) * sin;
	const ex = mx + (cos >= 0 ? 1 : -1) * 22;
	const ey = my;
	const textAnchor = cos >= 0 ? 'start' : 'end';

	return (
		<g>
			<text x={cx} y={cy} dy={8} textAnchor="middle" fill="#A1ECFB">
				{payload.name}
			</text>
			<Sector
				cx={cx}
				cy={cy}
				innerRadius={innerRadius}
				outerRadius={outerRadius}
				startAngle={startAngle}
				endAngle={endAngle}
				stroke="#3FD7F6"
				fill="#1E6372"
			/>
			<Sector
				cx={cx}
				cy={cy}
				startAngle={startAngle}
				endAngle={endAngle}
				innerRadius={outerRadius + 6}
				outerRadius={outerRadius + 10}
				fill="#3FD7F6"
			/>
			<path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
			<circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#A1ECFB">{`${value}`}</text>
			<text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#A1ECFB">
				{`(${(percent * 100).toFixed(2)}%)`}
			</text>
		</g>
	);
};

export class TwoLevelPieChart extends PureComponent {
	state = {
		activeIndex: this.props.data.oScore >= this.props.data.dScore ? 0 : 1,
		data: [ { name: 'Offense', value: this.props.data.oScore }, { name: 'Defense', value: this.props.data.dScore } ]
	};

	onPieEnter = (data, index) => {
		this.setState({
			activeIndex: index
		});
	};

	render() {
		return (
			<PieChart width={400} height={400}>
				<Pie
					activeIndex={this.state.activeIndex}
					activeShape={renderActiveShape}
					data={this.state.data}
					cx={200}
					cy={200}
					innerRadius={60}
					outerRadius={80}
					fill="#8B5C15"
					stroke="#DF9527"
					dataKey="value"
					onMouseEnter={this.onPieEnter}
					className="text-xs"
				/>
			</PieChart>
		);
	}
}

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

function ModalStatLine(props: any) {
	return (
		<div key={`w_${props.name}`}>
			<div className="text-sm inline-block sm:text-base md:text-lg">{props.name} : </div> {' '}
			<p className="text-sm inline-block py-0 sm:text-base md:text-lg">
				{props.statValue ? <small>{parseFloat(props.statValue.toFixed(2))}</small> : <small>0</small>}
			</p>
		</div>
	);
}

const weaponLegend = (props) => {
	const { payload } = props;
	return (
		<div className="text-center w-full relative">
			{payload.map((entry, index) => (
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

const PlayerStatModal = (player: any) => {
	if (!player.stats) {
		return <div />;
	}

	return (
		<Content>
			<h2 className="text-center">{player.playerName}</h2>
			<Line />

			<div className="border-b border-teal-500 border-dotted table w-full mb-6">
				<div className="text-sm px-1 table-cell w-3/12 sm:text-base md:text-lg">
					<ModalStatLine name="Score" statValue={player.stats.scoreTG} />
					<ModalStatLine name="KDR" statValue={player.stats.kdrAvg} />
					<ModalStatLine name="Damage" statValue={player.stats.totalWepDmgTG} />
					<ModalStatLine name="Lt Kills" statValue={player.stats.armorLTG} />
				</div>

				<div className="text-sm px-1 table-cell w-3/12 sm:text-base md:text-lg">
					<ModalStatLine name="Kills" statValue={player.stats.killsTG} />
					<ModalStatLine name="Kill Streak" statValue={player.stats.killStreakTG} />
					<ModalStatLine name="Avg. Speed" statValue={player.stats.avgSpeedAvg} />
					<ModalStatLine name="Med Kills" statValue={player.stats.armorMTG} />
				</div>

				<div className="text-sm px-1 table-cell w-3/12 sm:text-base md:text-lg">
					<ModalStatLine name="Deaths" statValue={player.stats.deathsTG} />
					<ModalStatLine name="Mine Disc" statValue={player.stats.minePlusDiscKillTG} />
					<ModalStatLine name="Shots Fired" statValue={player.stats.shotsFiredTG} />
					<ModalStatLine name="Hvy Kills" statValue={player.stats.armorHTG} />
				</div>

				<div className="text-sm px-1 table-cell w-3/12 sm:text-base md:text-lg">
					<ModalStatLine name="Assists" statValue={player.stats.assistTG} />
					<ModalStatLine name="Shot Rating" statValue={player.stats.weaponScoreTG} />
					<ModalStatLine name="Dist Moved (km)" statValue={player.stats.distMovTG} />
					<ModalStatLine name="Survival (mins)" statValue={player.stats.timeTLAvg / 60} />
				</div>
			</div>

			<div className="border-b border-teal-500 border-dotted table w-full mb-6">
				<div className="table-cell w-6/12 align-top">
					<RadarChart
						cx={300}
						cy={250}
						outerRadius={150}
						width={600}
						height={500}
						data={
							returnWeaponTotals(player.stats).length ? (
								returnWeaponTotals(player.stats)
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
						<Radar name="Kills" dataKey="kills" stroke="#3FD7F6" fill="#3FD7F6" fillOpacity={0.4} />
						<Radar name="Damage" dataKey="dmg" stroke="#ffeb3b" fill="#ffeb3b" fillOpacity={0.2} />
					</RadarChart>
				</div>
				<div className="table-cell w-6/12 align-top pt-4">
					<TwoLevelPieChart
						data={{
							oScore: Number(player.stats.offenseScoreTG),
							dScore: Number(player.stats.defenseScoreTG)
						}}
					/>
				</div>
			</div>
			<Table
				animate
				headers={[ 'Weapon', 'Kills', 'Deaths', 'MAs', 'Combos', 'Max Dist (m)', 'Speed (km/h)', 'Damage' ]}
				dataset={[
					[
						'Blaster',
						player.stats.blasterKillsTG,
						player.stats.blasterDeathsTG,
						player.stats.blasterMATG,
						player.stats.blasterComTG,
						parseFloat(player.stats.blasterHitDistMax.toFixed(2)),
						parseFloat(player.stats.blasterHitSVMax.toFixed(2)),
						parseFloat(player.stats.blasterDmgTG.toFixed(2))
					],
					[
						'Plasma Rifle',
						player.stats.plasmaKillsTG,
						player.stats.plasmaDeathsTG,
						player.stats.plasmaMATG,
						player.stats.plasmaComTG,
						parseFloat(player.stats.plasmaHitDistMax.toFixed(2)),
						parseFloat(player.stats.plasmaHitSVMax.toFixed(2)),
						parseFloat(player.stats.plasmaDmgTG.toFixed(2))
					],
					[
						'Chaingun',
						player.stats.cgKillsTG,
						player.stats.cgDeathsTG,
						player.stats.cgMATG,
						player.stats.cgComTG,
						parseFloat(player.stats.cgHitDistMax.toFixed(2)),
						parseFloat(player.stats.cgHitSVMax.toFixed(2)),
						parseFloat(player.stats.cgDmgTG.toFixed(2))
					],
					[
						'Spinfusor',
						player.stats.discKillsTG,
						player.stats.discDeathsTG,
						player.stats.discMATG,
						player.stats.discComTG,
						parseFloat(player.stats.discHitDistMax.toFixed(2)),
						parseFloat(player.stats.discHitSVMax.toFixed(2)),
						parseFloat(player.stats.discDmgTG.toFixed(2))
					],
					[
						'Grenade Launcher',
						player.stats.grenadeKillsTG,
						player.stats.grenadeDeathsTG,
						player.stats.grenadeMATG,
						player.stats.grenadeComTG,
						parseFloat(player.stats.grenadeHitDistMax.toFixed(2)),
						parseFloat(player.stats.grenadeHitSVMax.toFixed(2)),
						parseFloat(player.stats.grenadeDmgTG.toFixed(2))
					],
					[
						'Laser Rifle',
						player.stats.laserKillsTG,
						player.stats.laserDeathsTG,
						player.stats.laserMATG,
						player.stats.laserComTG,
						parseFloat(player.stats.laserHitDistMax.toFixed(2)),
						parseFloat(player.stats.laserHitSVMax.toFixed(2)),
						parseFloat(player.stats.laserDmgTG.toFixed(2))
					],
					[
						'Fusion Mortar',
						player.stats.mortarKillsTG,
						player.stats.mortarDeathsTG,
						player.stats.mortarMATG,
						player.stats.mortarComTG,
						parseFloat(player.stats.mortarHitDistMax.toFixed(2)),
						parseFloat(player.stats.mortarHitSVMax.toFixed(2)),
						parseFloat(player.stats.mortarDmgTG.toFixed(2))
					],
					[
						'Missile Launcher',
						player.stats.missileKillsTG,
						player.stats.missileDeathsTG,
						player.stats.missileMATG,
						player.stats.missileComTG,
						parseFloat(player.stats.missileHitDistMax.toFixed(2)),
						parseFloat(player.stats.missileHitSVMax.toFixed(2)),
						parseFloat(player.stats.missileDmgTG.toFixed(2))
					],
					[
						'Shocklance',
						player.stats.shockKillsTG,
						player.stats.shockDeathsTG,
						player.stats.shockMATG,
						player.stats.shockComTG,
						parseFloat(player.stats.shockHitDistMax.toFixed(2)),
						parseFloat(player.stats.shockHitSVMax.toFixed(2)),
						parseFloat(player.stats.shockDmgTG.toFixed(2))
					],
					[
						'Hand Grenade',
						player.stats.hGrenadeKillsTG,
						player.stats.hGrenadeDeathsTG,
						player.stats.hGrenadeMATG,
						player.stats.hGrenadeComTG,
						parseFloat(player.stats.hGrenadeHitDistMax.toFixed(2)),
						parseFloat(player.stats.hGrenadeHitSVMax.toFixed(2)),
						parseFloat(player.stats.hGrenadeDmgTG.toFixed(2))
					],
					[
						'Mine',
						player.stats.mineKillsTG,
						player.stats.mineDeathsTG,
						player.stats.mineMATG,
						player.stats.mineComTG,
						parseFloat(player.stats.mineHitDistMax.toFixed(2)),
						parseFloat(player.stats.mineHitVVMax.toFixed(2)),
						parseFloat(player.stats.mineDmgTG.toFixed(2))
					]
				]}
			/>
		</Content>
	);
};
export default PlayerStatModal;
