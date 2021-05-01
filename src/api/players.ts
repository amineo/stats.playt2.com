import { AxiosError, AxiosResponse } from 'axios';

// Need to work out the types

export interface IPlayer {}

export interface IApiClientMethods {
	getAllPlayers: any;
	getPlayerById: any;
	getTopPlayersByAccuracy: any;

	error: any;
	success: any;
	get: any;
}

export const PlayersApi = {
	async getAllPlayers(): Promise<any> {
		try {
			// @ts-ignore
			const response: AxiosResponse<any> = await this.get<IGame, AxiosResponse<any>>('/players?limit=300');

			return this.success(response);
		} catch (error) {
			let err: AxiosError = error;

			this.error(err);
			throw err;
		}
	},

	async getPlayerById(playerId: string): Promise<any> {
		try {
			// @ts-ignore
			const response: AxiosResponse<any> = await this.get<IGame, AxiosResponse<any>>('/player/' + playerId);

			return this.success(response);
		} catch (error) {
			let err: AxiosError = error;

			this.error(err);
			throw err;
		}
	},

	async getTopPlayersByAccuracy(params: {
		stat: string,
		gameType?: string,
		minGames?: number,
		minShots?: number,
		limit?: number
	}): Promise<any> {
		try {
			// @ts-ignore
			const response: AxiosResponse<any> = await this.get<IGame, AxiosResponse<any>>('/players/top/accuracy', {
				params
			});

			return this.success(response);
		} catch (error) {
			let err: AxiosError = error;

			this.error(err);
			throw err;
		}
	}
} as IApiClientMethods;
