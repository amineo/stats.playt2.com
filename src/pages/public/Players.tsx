import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

// @ts-ignore
import { Header, Content, Loading, Frame } from 'arwes';

const PlayerRow: React.FC = (player: any) => {
	return (
		<tr>
			<td>
				<Link to={`/player/${player.playerGuid}`} className="block transition duration-150 ease-in-out">
					{player.playerName}
				</Link>
			</td>
			<td className="text-xs">{player.totalGamesCtfgame}</td>
			<td className="text-xs">{player.totalGamesLakrabbitgame}</td>
			<td className="text-xs">{player.totalGamesSctfgame}</td>
			<td className="text-xs">{player.totalGamesDmgame}</td>
			<td className="text-xs text-white">
				{Number(player.totalGamesCtfgame) +
					Number(player.totalGamesLakrabbitgame) +
					(Number(player.totalGamesSctfgame) + Number(player.totalGamesDmgame))}
			</td>
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
			<Header className="py-4 mb-4">
				<h5>Players</h5>
			</Header>

			<div className="relative max-w-3xl mx-auto px-4">
				<Frame>
					<div className="px-4 py-4">
						{playersQuery.isLoading ? (
							<Loading animate full />
						) : (
							<table className="min-w-full">
								<thead>
									<tr>
										<th className="px-6 pt-3 text-left text-xs leading-4 font-bold  uppercase tracking-wider" />
										<th className="px-1 py-3  text-left text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											CTF
										</th>
										<th className="px-1 py-3  text-left text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											LAK
										</th>
										<th className="px-1 py-3  text-left text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											LT CTF
										</th>
										<th className="px-1 py-3  text-left text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted">
											DM
										</th>
										<th className="px-1 py-3 text-left text-xs leading-4 font-bold uppercase tracking-wider border-b border-teal-500 border-dotted" />
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
