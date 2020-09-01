import { AxiosError, AxiosResponse } from 'axios';

// Need to work out the types

export interface IUser {
	username: string;
	password: string;
	email: string;
}

export interface IApiClientMethods {
	getAllUsers: any;
	error: any;
	success: any;
	get: any;
}

export const UserApi = {
	async getAllUsers(): Promise<IUser[]> {
		try {
			// @ts-ignore
			const response: AxiosResponse<IUser[]> = await this.get<IUser, AxiosResponse<User[]>>('/user/list');

			return this.success(response);
		} catch (error) {
			let err: AxiosError = error;

			this.error(err);
			throw err;
		}
	}
} as IApiClientMethods;
