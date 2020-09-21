import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

// @ts-ignore
import { Header, Content, Loading, Frame, Line } from 'arwes';

interface IPlayerDetailParams {
	playerGuid: string;
}

const GameStatCard = (game: any) => {
	return (
		<Frame animate level={1} corners={3} layer={'header'} className="mb-6">
			<div className="py-4 px-4">
				<Link to={`/game/${game.stats.gameID}`}>
					<h3>{game.map}</h3>
				</Link>
				<Line />
			</div>
		</Frame>
	);
};

const PlayerDetail = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const { playerGuid } = useParams<IPlayerDetailParams>();

	const playerQuery = useQuery([ 'player', playerGuid ], () => apiClient.getPlayerById(playerGuid), {
		refetchOnWindowFocus: false,
		staleTime: Infinity
	});

	return (
		<Content>
			{playerQuery.isLoading ? (
				<div className="h-screen">
					<Loading animate full />
				</div>
			) : (
				<div>
					<Header className="py-4 mb-4">
						<div className=" table w-full">
							<div className="table-cell text-left w-6/12">
								<h3>{playerQuery.data.playerName}</h3>
							</div>
							<div className="table-cell text-right w-6/12">
								<h5>
									<small>Last Played:</small> {playerQuery.data.updatedAt.split(/[T]/)[0]}
								</h5>
							</div>
						</div>
					</Header>

					<h5>Game History (Past {playerQuery.data.gameDetails.length} Games)</h5>

					{playerQuery.data.gameDetails.map((game: any) => <GameStatCard {...game} />)}
				</div>
			)}
		</Content>
	);
};

export default PlayerDetail;
