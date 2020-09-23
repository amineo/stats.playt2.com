import React from 'react';
import { Link } from 'react-router-dom';
// @ts-ignore
import { Content, Frame, Table, Words, Header, Line, Button } from 'arwes';
import CardDisplay from 'Components/CardDisplay';

const DefaultGameCard: React.FC = (gameStats: any) => {
	const fullPlayerListByScore = [ ...gameStats.players ];
	// sort by high score
	fullPlayerListByScore.sort((a, b) => b.stats.scoreTG - a.stats.scoreTG);

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
				<div className="px-6 text-center">
					<Content>
						<h4 className="text-4xl text-right">{gameStats.gametype}</h4>
					</Content>
				</div>
			</div>

			<div className="my-6">
				<Frame border={false} corners={2}>
					<Content>
						<div className="px-6 py-4">
							<h4>Leaderboard</h4>
							<Line />
							<Table
								animate
								headers={[ 'Player', 'Score', 'Kills', 'Assists', 'MAs', 'Kill Streak' ]}
								dataset={fullPlayerListByScore.map((player) => [
									<Link to={`/player/${player.playerGuid}`}>{player.playerName}</Link>,
									player.stats.scoreTG,
									player.stats.killsTG,
									player.stats.assistTG,
									player.stats.totalMATG,
									player.stats.killStreakTG
								])}
							/>
						</div>
					</Content>
				</Frame>
			</div>
		</div>
	);
};

export default DefaultGameCard;
