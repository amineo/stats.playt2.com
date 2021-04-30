import React, { Suspense, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import './assets/app.gen.css';
import { Route, Switch } from 'react-router-dom';
import { FetchProvider } from 'Context/FetchContext';

// @ts-ignore
import { Arwes, Loading, createLoader } from 'arwes';

// Components
import AppShell from 'Components/AppShell';

// Public Pages
import Home from 'pages/public/Home';
import GameDetail from 'pages/public/GameDetail';
import Players from 'pages/public/Players';
import PlayerDetail from 'pages/public/PlayerDetail';
import TopPlayersAccuracy from 'pages/public/TopPlayersAccuracy';

import FourOFour from 'pages/error/404';

const LoadingFallback: React.FC = () => <div className="p-4">Loading...</div>;

const AppRoutes: React.FC = () => {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Switch>
				<FetchProvider>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>
						<Route exact path="/games">
							<Home />
						</Route>
						<Route path="/game/:gameId">
							<GameDetail />
						</Route>
						<Route exact path="/players">
							<Players />
						</Route>
						<Route exact path="/players/top/accuracy">
							<TopPlayersAccuracy />
						</Route>
						<Route exact path="/player/:playerGuid">
							<PlayerDetail />
						</Route>
						{/** Site 404 */}
						<Route component={FourOFour} />
					</Switch>
				</FetchProvider>
			</Switch>
		</Suspense>
	);
};

const App: React.FC = (resources: any) => {
	const [ show, setShow ] = useState(false);
	const [ loaded, setLoaded ] = useState(false);

	const loader = createLoader();

	loader.load(resources).then(
		() => {
			console.log('Resources were loaded.');
			setTimeout(() => {
				setShow(true);
				setLoaded(true);
			}, 250);
		},
		() => {
			console.error('Error when loading.');
		}
	);

	return (
		<div>
			<Loading
				full
				animate
				show={!show && !loaded}
				animation={{
					unmountOnExit: true
				}}
			/>

			<Arwes
				animate
				show={show}
				showResources={show}
				background={resources.background}
				pattern={resources.pattern}
			>
				{(anim: any) => (
					<AppShell>
						<AppRoutes />
					</AppShell>
				)}
			</Arwes>
			<ReactQueryDevtools initialIsOpen={false} />
		</div>
	);
};

export default App;
