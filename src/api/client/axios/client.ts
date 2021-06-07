import axios, {
	AxiosInstance,
	AxiosError,
	AxiosRequestConfig,
	AxiosResponse,
} from 'axios';

// Axios Types
// https://github.com/axios/axios/blob/master/index.d.ts

// Axios interceptors
// https://github.com/axios/axios#interceptors

export class ApiClient {
	public api: AxiosInstance;

	public constructor(config: AxiosRequestConfig) {
		this.api = axios.create(config);

		this.api.interceptors.request.use((axiosRCFG: AxiosRequestConfig) => ({
			...axiosRCFG,
		}));

		// this.api.interceptors.response.use((axiosRCFG: AxiosResponse) => ({
		// 	...axiosRCFG
		// }));

		// We can use this to expose these methods on the class instance (not really required but useful to know)
		// this.getUri = this.getUri.bind(this);
		// this.request = this.request.bind(this);
		// this.get = this.get.bind(this);
		// this.delete = this.delete.bind(this);
		// this.head = this.head.bind(this);
		// this.post = this.post.bind(this);
		// this.put = this.put.bind(this);
		// this.patch = this.patch.bind(this);
	}

	/**
	 * Get Uri
	 *
	 * @param {import("axios").AxiosRequestConfig} [config]
	 * @returns {string}
	 * @memberof ApiClient
	 */
	public getUri(config?: AxiosRequestConfig): string {
		return this.api.getUri(config);
	}

	/**
	 * Generic request
	 *
	 * @access public
	 * @template T - `TYPE`: expected object
	 * @template R - `RESPONSE`: expected object inside an axios response
	 * @param {import("axios").AxiosRequestConfig} [config] - axios request config
	 * @returns {Promise<R>} - HTTP axios response payload
	 * @memberof ApiClient
	 *
	 * @example
	 * api.request({
	 *   method: "GET|POST|DELETE|PUT|PATCH"
	 *   baseURL: "https://endpoint.com,
	 *   url: "/api/v1/path",
	 *   headers: {
	 *     "Content-Type": "application/json"
	 *  }
	 * }).then((response: AxiosResponse<User>) => response.data)
	 *
	 */
	public request<T, R = AxiosResponse<T>>(
		config: AxiosRequestConfig,
	): Promise<R> {
		return this.api.request(config);
	}

	/**
	 * HTTP GET method, `statusCode`: 200
	 *
	 * @access public
	 * @template T - `TYPE`: expected object.
	 * @template R - `RESPONSE`: expected object inside an axios response
	 * @param {string} url - endpoint you want to reach.
	 * @param {import("axios").AxiosRequestConfig} [config] - axios request config
	 * @returns {Promise<R>} HTTP `axios` response payload
	 * @memberof ApiClient
	 */
	public get<T, R = AxiosResponse<T>>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<R> {
		return this.api.get(url, config);
	}

	/**
	 * HTTP DELETE method, `statusCode`: 204 No Content
	 *
	 * @access public
	 * @template T - `TYPE`: expected object.
	 * @template R - `RESPONSE`: expected object inside an axios response
	 * @param {string} url - endpoint you want to reach.
	 * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
	 * @returns {Promise<R>} - HTTP [axios] response payload.
	 * @memberof ApiClient
	 */
	public delete<T, R = AxiosResponse<T>>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<R> {
		return this.api.delete(url, config);
	}

	/**
	 * HTTP HEAD method.
	 *
	 * @access public
	 * @template T - `TYPE`: expected object
	 * @template R - `RESPONSE`: expected object inside a axios response format
	 * @param {string} url - endpoint you want to reach.
	 * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
	 * @returns {Promise<R>} - HTTP [axios] response payload.
	 * @memberof ApiClient
	 */
	public head<T, R = AxiosResponse<T>>(
		url: string,
		config?: AxiosRequestConfig,
	): Promise<R> {
		return this.api.head(url, config);
	}

	/**
	 * HTTP POST method `statusCode`: 201 Created.
	 *
	 * @access public
	 * @template T - `TYPE`: expected object
	 * @template B - `BODY`: body request object
	 * @template R - `RESPONSE`: expected object inside an axios response
	 * @param {string} url - endpoint you want to reach.
	 * @param {B} data - payload to be send as the `request body`,
	 * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
	 * @returns {Promise<R>} - HTTP [axios] response payload.
	 * @memberof ApiClient
	 */
	public post<T, B, R = AxiosResponse<T>>(
		url: string,
		data?: B,
		config?: AxiosRequestConfig,
	): Promise<R> {
		return this.api.post(url, data, config);
	}

	/**
	 * HTTP PUT method
	 *
	 * @access public
	 * @template T - `TYPE`: expected object.
	 * @template B - `BODY`: body request object.
	 * @template R - `RESPONSE`: expected object inside an axios response
	 * @param {string} url - endpoint you want to reach.
	 * @param {B} data - payload to be send as the `request body`,
	 * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
	 * @returns {Promise<R>} - HTTP [axios] response payload.
	 * @memberof ApiClient
	 */
	public put<T, B, R = AxiosResponse<T>>(
		url: string,
		data?: B,
		config?: AxiosRequestConfig,
	): Promise<R> {
		return this.api.put(url, data, config);
	}

	/**
	 * HTTP PATCH method
	 *
	 * @access public
	 * @template T - `TYPE`: expected object.
	 * @template B - `BODY`: body request object.
	 * @template R - `RESPONSE`: expected object inside an axios response
	 * @param {string} url - endpoint you want to reach.
	 * @param {B} data - payload to be send as the `request body`,
	 * @param {import("axios").AxiosRequestConfig} [config] - axios request configuration.
	 * @returns {Promise<R>} - HTTP [axios] response payload.
	 * @memberof ApiClient
	 */
	public patch<T, B, R = AxiosResponse<T>>(
		url: string,
		data?: B,
		config?: AxiosRequestConfig,
	): Promise<R> {
		return this.api.patch(url, data, config);
	}

	/**
	 * Generic success handler
	 *
	 * @template T - type.
	 * @param {import("axios").AxiosResponse<T>} response - axios response.
	 * @returns {T} - expected object.
	 * @memberof ApiClient
	 */
	public success<T>(response: AxiosResponse<T>): T {
		return response.data;
	}

	/**
	 * Generic error handler
	 *
	 * @template T - type.
	 * @param {import("axios").AxiosError<T>} response - axios error response.
	 * @returns {T} - expected object.
	 * @memberof ApiClient
	 */
	public error<T>(error: AxiosError<Error>) {
		throw error;
	}
}
