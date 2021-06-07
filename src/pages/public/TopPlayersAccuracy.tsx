import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AccuracyLeaderboard from 'Components/AccuracyLeaderboard';

// @ts-ignore
import { Header, Content, Frame } from 'arwes';

const TopPlayersAccuracy = () => {
	return (
		<Content>
			<Helmet>
				<title>Top players by accuracy | Tribes 2 Stats Project</title>
				<link
					rel="canonical"
					href="https://stats.playt2.com/players/top/accuracy"
				></link>
				<meta property="og:site_name" content="Tribes 2 Stats Project" />
				<meta
					property="og:url"
					content="https://stats.playt2.com/players/top/accuracy"
				/>
				<meta property="og:type" content="article" />
				<meta
					property="og:title"
					content="Top players by accuracy | Tribes 2 Stats Project"
				/>
				<meta
					property="og:image"
					content={`https://stats.playt2.com/logo512.png`}
				/>
			</Helmet>
			<Header className="px-1 py-4 mb-4 text-center md:px-4">
				<div className="flex items-center justify-center mb-5">
					<h5 className="m-0">Most Accurate Players</h5>
					<Link
						className="text-xs ml-4"
						to="/players/top/wins"
						aria-label="Next leaderboard: Top Win-Loss Records"
						title="Next leaderboard: Top Win-Loss Records"
						style={{
							color: '#30fffe',
							textShadow: '0 0 8px rgba(116, 255, 241, 0.7)',
						}}
					>
						▶
					</Link>
				</div>
			</Header>
			<div className="relative max-w-3xl mx-auto px-2">
				<Frame border={false} corners={2} layer={'header'}>
					<div className="md:p-5">
						<AccuracyLeaderboard />
					</div>
				</Frame>
			</div>
		</Content>
	);
};

export default TopPlayersAccuracy;
