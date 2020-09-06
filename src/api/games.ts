import { AxiosError, AxiosResponse } from 'axios';

// Need to work out the types

export interface IGame {}

export interface IApiClientMethods {
	getLatestGames: any;
	getLatestGamesWithSummary: any;
	getGamesByGametype: any;
	getGameStatsById: any;

	error: any;
	success: any;
	get: any;
}

export const GamesApi = {
	async getLatestGames(): Promise<any> {
		try {
			// @ts-ignore
			const response: AxiosResponse<any> = await this.get<IGame, AxiosResponse<any>>('/games');

			return this.success(response);
		} catch (error) {
			let err: AxiosError = error;

			this.error(err);
			throw err;
		}
	},

	async getLatestGamesWithSummary(): Promise<any> {
		try {
			// @ts-ignore
			const response: AxiosResponse<any> = await this.get<IGame, AxiosResponse<any>>('/games/summary');

			return this.success(response);
		} catch (error) {
			let err: AxiosError = error;

			this.error(err);
			throw err;
		}
	},

	async getGamesByGametype(gametype: string): Promise<any> {
		try {
			// @ts-ignore
			const response: AxiosResponse<any> = await this.get<IGame, AxiosResponse<any>>(
				'/games/gametype/' + gametype
			);

			return this.success(response);
		} catch (error) {
			let err: AxiosError = error;

			this.error(err);
			throw err;
		}
	},

	async getGameStatsById(gameId: string): Promise<any> {
		try {
			// @ts-ignore
			const response: AxiosResponse<any> = await this.get<IGame, AxiosResponse<any>>('/game/' + gameId);

			return this.success(response);
		} catch (error) {
			let err: AxiosError = error;

			this.error(err);
			throw err;
		}
	}
} as IApiClientMethods;
