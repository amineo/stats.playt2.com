import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { FetchContext } from 'Context/FetchContext';

// @ts-ignore
import { Header, Content, Loading } from 'arwes';

const Players = () => {
	const fetchContext = useContext(FetchContext);
	const apiClient = fetchContext.apiClient;

	const playersQuery = useQuery([ 'players' ], () => apiClient.getAllPlayers(), {
		refetchOnWindowFocus: false,
		staleTime: 300000
	});

	return <div>{JSON.stringify(playersQuery)}</div>;
};

export default Players;
