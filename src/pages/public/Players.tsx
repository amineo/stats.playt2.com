import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

// @ts-ignore
import { Header, Content, Loading, Frame } from 'arwes';

const PlayerRow: React.FC = (player: any) => {
	return (
		<tr>
			<td className="py-1">
				<Link to={`/player/${player.playerGuid}`} className="block transition duration-150 ease-in-out">
					{player.playerName}
				</Link>
			</td>
			<td className="text-center text-xs border-l border-teal-500 border-dotted">{player.totalGamesCtfgame}</td>
			<td className="text-center text-xs">{player.totalGamesLakrabbitgame}</td>
			<td className="text-center text-xs">{player.totalGamesSctfgame}</td>
			<td className="text-center text-xs">{player.totalGamesDmgame}</td>
			<td className="text-center text-xs text-white">
				{Number(player.totalGamesCtfgame) +
					Number(player.totalGamesLakrabbitgame) +
					(Number(player.totalGamesSctfgame) + Number(player.totalGamesDmgame))}
			</td>
			<td className="text-center text-xs">{player.updatedAt.split(/[T]/)[0]}</td>
		</tr>
	);
};

const Players = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const playersQuery = useQuery([ 'players' ], () => apiClient.getAllPlayers(), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	return (
		<Content>
			<Helmet>
				<title>Recent Players | Tribes 2 Stats Project</title>
				<link rel="canonical" href={`https://stats.playt2.com/players`}></link>
				<meta name="description" content={`Recent player list`}/>

				<meta property="og:site_name" content="Tribes 2 Stats Project" />
				<meta property="og:url" content={`https://stats.playt2.com/players`} />
				<meta property="og:type" content="article" />
				<meta property="og:title" content={`Recent Players | Tribes 2 Stats Project`} />
				<meta property="og:description" content={`Recent player list`} />
				<meta property="og:image" content={`https://stats.playt2.com/logo512.png`} /> 
			</Helmet>
			<Header className="px-1 py-4 mb-4 text-center md:px-4">
				<h5>Recent Players</h5>
			</Header>

			<div className="relative max-w-3xl mx-auto px-2">
				<Frame border={false} corners={2} layer={'header'}>
					<div className="text-xs px-1 py-4 sm:px-6 md:px-12 sm:text-sm md:text-base
					\">
						{playersQuery.isLoading ? (
							<Loading animate full />
						) : (
							<table className="min-w-full">
								<thead>
									<tr>
										<th className="px-0 pt-3 text-left text-xs leading-4 font-bold  uppercase tracking-wider md:px-6" />
										<th className="px-0 py-3  text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-l border-teal-500 border-dotted md:px-3">
											CTF
										</th>
										<th className="px-0 py-3  text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											LAK
										</th>
										<th className="px-0 py-3  text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											LCTF
										</th>
										<th className="px-0 py-3  text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											DM
										</th>
										<th className="px-0 py-3 text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											Total Games
										</th>
										<th className="px-0 py-3 text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											Last Played
										</th>
									</tr>
								</thead>
								{playersQuery.data.map((player: any, index: number) => PlayerRow(player, index))}
							</table>
						)}
					</div>
				</Frame>
			</div>
		</Content>
	);
};

export default Players;
