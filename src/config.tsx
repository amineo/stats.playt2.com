const DEV_API_ENDPOINT: string = 'http://localhost:8080';
const PROD_API_ENDPOINT: string = 'https://api.playt2.com';

const API_VERSION: string = '';

const DEV_FE_ORIGIN: string = 'http://localhost:3000';
const PROD_FE_ORIGIN: string = 'https://stats.playt2.com';

// // [ Construct Base Endpoint from NODE_ENV ]
// const API_BASE_ENDPOINT: string =
// 	(process.env.NODE_ENV === 'development' ? DEV_API_ENDPOINT : PROD_API_ENDPOINT) + API_VERSION;
const API_BASE_ENDPOINT: string = PROD_API_ENDPOINT + API_VERSION;

interface IApiServer {
	endpoint: string;
	origins: Array<string>;
}

interface IConfig {
	apiServer: IApiServer;
}

const config: IConfig = {
	apiServer: {
		endpoint: API_BASE_ENDPOINT,
		origins: [
			DEV_API_ENDPOINT,
			PROD_API_ENDPOINT,
			DEV_FE_ORIGIN,
			PROD_FE_ORIGIN,
		],
	},
};

export default config;
