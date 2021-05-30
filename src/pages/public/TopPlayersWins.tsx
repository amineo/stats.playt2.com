import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import WinsLeaderboard from 'Components/WinsLeaderboard';

// @ts-ignore
import { Header, Content, Frame } from 'arwes';

const TopPlayersWins = () => {
	return (
		<Content>
			<Helmet>
				<title>Top players by win-loss record | Tribes 2 Stats Project</title>
				<link rel="canonical" href="https://stats.playt2.com/players/top/wins"></link>
				<meta property="og:site_name" content="Tribes 2 Stats Project" />
				<meta property="og:url" content="https://stats.playt2.com/players/top/wins" />
				<meta property="og:type" content="article" />
				<meta property="og:title" content="Top players by win-loss record | Tribes 2 Stats Project" />
				<meta property="og:image" content={`https://stats.playt2.com/logo512.png`} />
			</Helmet>
			<Header className="px-1 py-4 mb-4 text-center md:px-4">
				<div className="flex items-center justify-center mb-5">
					<Link
						className="text-xs mr-4"
						to="/players/top/accuracy"
						aria-label="Previous leaderboard: Most Accurate Players"
						title="Previous leaderboard: Most Accurate Players"
						style={{
							color: '#30fffe',
							textShadow: '0 0 8px rgba(116, 255, 241, 0.7)'
						}}
					>◀</Link>
					<h5 className="m-0">Top Win-Loss Records</h5>
				</div>
			</Header>
			<div className="relative max-w-3xl mx-auto px-2">
				<Frame border={false} corners={2} layer={'header'}>
					<div className="md:p-5">
						<WinsLeaderboard />
					</div>
				</Frame>
			</div>
		</Content>
	);
};

export default TopPlayersWins;

