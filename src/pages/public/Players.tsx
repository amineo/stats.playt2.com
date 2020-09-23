import React, { useContext } from 'react';
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
			<Header className="py-4 mb-4 text-center">
				<h5>Recent Players</h5>
			</Header>

			<div className="relative max-w-3xl mx-auto px-4">
				<Frame border={false} corners={2} layer={'header'}>
					<div className="px-12 py-4">
						{playersQuery.isLoading ? (
							<Loading animate full />
						) : (
							<table className="min-w-full">
								<thead>
									<tr>
										<th className="px-6 pt-3 text-left text-xs leading-4 font-bold  uppercase tracking-wider" />
										<th className="px-3 py-3  text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-l border-teal-500 border-dotted">
											CTF
										</th>
										<th className="px-1 py-3  text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											LAK
										</th>
										<th className="px-1 py-3  text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											LT CTF
										</th>
										<th className="px-1 py-3  text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											DM
										</th>
										<th className="px-1 py-3 text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											Total Games
										</th>
										<th className="px-1 py-3 text-center text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
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
