import React, { createContext } from 'react';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { ApiClient } from 'api/client';
// Api Mixins
import { GamesApi } from 'api/games';
import { PlayersApi } from 'api/players';

import appConfig from 'config';

interface IAxios {
	authAxios: any;
}

const FetchContext = createContext<IAxios>({ authAxios: null });
const { Provider } = FetchContext;

const FetchProvider: React.FC = ({ children }) => {
	const apiConfig: AxiosRequestConfig = {
		timeout: 30000,
		baseURL: appConfig.apiServer.endpoint,
		headers: {
			common: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			}
		}
	};

	// Setup an axios instance
	const authAxios = new ApiClient(apiConfig);

	// Error response interceptor  -- used for getting a new token
	authAxios.api.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error: AxiosError) => {
			console.error(error);

			// Hook into a global error handler like sentry or rollbar/etc

			return Promise.reject(error);
		}
	);

	// Augment the ApiClient with mixins
	Object.assign(authAxios, GamesApi);
	Object.assign(authAxios, PlayersApi);

	return (
		<Provider
			value={{
				authAxios
			}}
		>
			{children}
		</Provider>
	);
};

export { FetchContext, FetchProvider };
