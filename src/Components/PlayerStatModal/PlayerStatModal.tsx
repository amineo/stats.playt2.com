// @ts-nocheck
import React, { PureComponent } from 'react';

import {
	Radar,
	RadarChart,
	PolarGrid,
	PolarAngleAxis,
	PolarRadiusAxis,
	Tooltip,
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

function ModalStatLine(props: any) {
	return (
		<div>
			<h5 className="inline-block">{props.name}</h5> :{' '}
			<p className="inline-block py-0 text-sm">{parseFloat(props.statValue.toFixed(2))}</p>
		</div>
	);
}

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

const PlayerStatModal = (player: any) => {
	if (!player.stats) {
		return <div />;
	}

	return (
		<Content>
			<h2 className="text-center">{player.playerName}</h2>
			<Line />

			<div className="border-b border-teal-500 border-dotted table w-full mb-6">
				<div className="table-cell w-3/12">
					<ModalStatLine name="Score" statValue={player.stats.scoreTG} />
					<ModalStatLine name="KDR" statValue={player.stats.kdrAvg} />
					<ModalStatLine name="Damage" statValue={player.stats.totalWepDmgTG} />
					<ModalStatLine name="Lt Kills" statValue={player.stats.armorLTG} />
				</div>

				<div className="table-cell w-3/12">
					<ModalStatLine name="Kills" statValue={player.stats.killsTG} />
					<ModalStatLine name="Kill Streak" statValue={player.stats.killStreakTG} />
					<ModalStatLine name="Avg. Speed" statValue={player.stats.avgSpeedAvg} />
					<ModalStatLine name="Med Kills" statValue={player.stats.armorMTG} />
				</div>

				<div className="table-cell w-3/12">
					<ModalStatLine name="Deaths" statValue={player.stats.deathsTG} />
					<ModalStatLine name="Mine Disc" statValue={player.stats.minePlusDiscKillTG} />
					<ModalStatLine name="Shots Fired" statValue={player.stats.shotsFiredTG} />
					<ModalStatLine name="Hvy Kills" statValue={player.stats.armorHTG} />
				</div>

				<div className="table-cell w-3/12">
					<ModalStatLine name="Assists" statValue={player.stats.assistTG} />
					<ModalStatLine name="Shot Rating" statValue={player.stats.weaponScoreTG} />
					<ModalStatLine name="Dist Moved (km)" statValue={player.stats.distMovTG} />
					<ModalStatLine name="Survival (mins)" statValue={player.stats.timeTLAvg / 60} />
				</div>
			</div>
			<div className="border-b border-teal-500 border-dotted table w-full mb-6 ">
				<div class="table-cell w-6/12 align-top">
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
						<PolarGrid stroke="#035659" />
						<PolarAngleAxis dataKey="weapon" stroke="#A1ECFB" />
						<PolarRadiusAxis stroke="#DF9527" />
						<Tooltip content={<WeaponTooltip />} />
						<Radar name="weaponUsage" dataKey="val" stroke="#3FD7F6" fill="#3FD7F6" fillOpacity={0.4} />
					</RadarChart>
				</div>
				<div class="table-cell w-6/12 align-top pt-4">
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
				headers={[
					'Weapon',
					'Kills',
					'Deaths',
					'MAs',
					'Combos',
					'Max Dist (m)',
					'Speed (km/h)',
					'Damage',
					'Wep. Score'
				]}
				dataset={[
					[
						'Blaster',
						player.stats.blasterKillsTG,
						player.stats.blasterDeathsTG,
						player.stats.blasterMATG,
						player.stats.blasterComTG,
						parseFloat(player.stats.blasterHitDistMax.toFixed(2)),
						parseFloat(player.stats.blasterHitSVMax.toFixed(2)),
						parseFloat(player.stats.blasterDmgTG.toFixed(2)),
						parseFloat(player.stats.blasterScoreTG.toFixed(2))
					],
					[
						'Plasma Rifle',
						player.stats.plasmaKillsTG,
						player.stats.plasmaDeathsTG,
						player.stats.plasmaMATG,
						player.stats.plasmaComTG,
						parseFloat(player.stats.plasmaHitDistMax.toFixed(2)),
						parseFloat(player.stats.plasmaHitSVMax.toFixed(2)),
						parseFloat(player.stats.plasmaDmgTG.toFixed(2)),
						parseFloat(player.stats.plasmaScoreTG.toFixed(2))
					],
					[
						'Chaingun',
						player.stats.cgKillsTG,
						player.stats.cgDeathsTG,
						player.stats.cgMATG,
						player.stats.cgComTG,
						parseFloat(player.stats.cgHitDistMax.toFixed(2)),
						parseFloat(player.stats.cgHitSVMax.toFixed(2)),
						parseFloat(player.stats.cgDmgTG.toFixed(2)),
						parseFloat(player.stats.cgScoreTG.toFixed(2))
					],
					[
						'Spinfusor',
						player.stats.discKillsTG,
						player.stats.discDeathsTG,
						player.stats.discMATG,
						player.stats.discComTG,
						parseFloat(player.stats.discHitDistMax.toFixed(2)),
						parseFloat(player.stats.discHitSVMax.toFixed(2)),
						parseFloat(player.stats.discDmgTG.toFixed(2)),
						parseFloat(player.stats.discScoreTG.toFixed(2))
					],
					[
						'Grenade Launcher',
						player.stats.grenadeKillsTG,
						player.stats.grenadeDeathsTG,
						player.stats.grenadeMATG,
						player.stats.grenadeComTG,
						parseFloat(player.stats.grenadeHitDistMax.toFixed(2)),
						parseFloat(player.stats.grenadeHitSVMax.toFixed(2)),
						parseFloat(player.stats.grenadeDmgTG.toFixed(2)),
						parseFloat(player.stats.grenadeScoreTG.toFixed(2))
					],
					[
						'Laser Rifle',
						player.stats.laserKillsTG,
						player.stats.laserDeathsTG,
						player.stats.laserMATG,
						player.stats.laserComTG,
						parseFloat(player.stats.laserHitDistMax.toFixed(2)),
						parseFloat(player.stats.laserHitSVMax.toFixed(2)),
						parseFloat(player.stats.laserDmgTG.toFixed(2)),
						parseFloat(player.stats.laserScoreTG.toFixed(2))
					],
					[
						'Fusion Mortar',
						player.stats.mortarKillsTG,
						player.stats.mortarDeathsTG,
						player.stats.mortarMATG,
						player.stats.mortarComTG,
						parseFloat(player.stats.mortarHitDistMax.toFixed(2)),
						parseFloat(player.stats.mortarHitSVMax.toFixed(2)),
						parseFloat(player.stats.mortarDmgTG.toFixed(2)),
						parseFloat(player.stats.mortarScoreTG.toFixed(2))
					],
					[
						'Missile Launcher',
						player.stats.missileKillsTG,
						player.stats.missileDeathsTG,
						player.stats.missileMATG,
						player.stats.missileComTG,
						parseFloat(player.stats.missileHitDistMax.toFixed(2)),
						parseFloat(player.stats.missileHitSVMax.toFixed(2)),
						parseFloat(player.stats.missileDmgTG.toFixed(2)),
						parseFloat(player.stats.missileScoreTG.toFixed(2))
					],
					[
						'Shocklance',
						player.stats.shockKillsTG,
						player.stats.shockDeathsTG,
						player.stats.shockMATG,
						player.stats.shockComTG,
						parseFloat(player.stats.shockHitDistMax.toFixed(2)),
						parseFloat(player.stats.shockHitSVMax.toFixed(2)),
						parseFloat(player.stats.shockDmgTG.toFixed(2)),
						parseFloat(player.stats.shockScoreTG.toFixed(2))
					],
					[
						'Hand Grenade',
						player.stats.hGrenadeKillsTG,
						player.stats.hGrenadeDeathsTG,
						player.stats.hGrenadeMATG,
						player.stats.hGrenadeComTG,
						parseFloat(player.stats.hGrenadeHitDistMax.toFixed(2)),
						parseFloat(player.stats.hGrenadeHitSVMax.toFixed(2)),
						parseFloat(player.stats.hGrenadeDmgTG.toFixed(2)),
						parseFloat(player.stats.hGrenadeScoreTG.toFixed(2))
					],
					[
						'Mine',
						player.stats.mineKillsTG,
						player.stats.mineDeathsTG,
						player.stats.mineMATG,
						player.stats.mineComTG,
						parseFloat(player.stats.mineHitDistMax.toFixed(2)),
						parseFloat(player.stats.mineHitVVMax.toFixed(2)),
						parseFloat(player.stats.mineDmgTG.toFixed(2)),
						parseFloat(player.stats.mineScoreTG.toFixed(2))
					]
				]}
			/>
		</Content>
	);
};
export default PlayerStatModal;
