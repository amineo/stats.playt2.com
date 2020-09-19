import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';

import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

// @ts-ignore
import { Header, Content, Loading } from 'arwes';

interface IPlayerDetailParams {
	playerGuid: string;
}

const PlayerDetail = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const { playerGuid } = useParams<IPlayerDetailParams>();

	const playerQuery = useQuery([ 'player', playerGuid ], () => apiClient.getPlayerById(playerGuid), {
		refetchOnWindowFocus: false,
		staleTime: Infinity
	});

	return <div>{JSON.stringify(playerQuery)}</div>;
};

export default PlayerDetail;
