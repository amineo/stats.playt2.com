// @ts-nocheck
import React, { Suspense, useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import './assets/app.gen.css';
import { Route, Switch } from 'react-router-dom';
import { FetchProvider } from 'Context/FetchContext';

import {
	withStyles,
	Arwes,
	Content,
	Words,
	Image,
	Button,
	Loading,
	createLoader,
	createResponsive,
	utils,
	Header,
	Frame
} from 'arwes';

// Components
import AppShell from 'Components/AppShell';

// Public Pages
import Home from 'pages/public/Home';
import GameDetail from 'pages/public/GameDetail';
import Players from 'pages/public/Players';
import PlayerDetail from 'pages/public/PlayerDetail';

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

const App: React.FC = (props) => {
	const [ show, setShow ] = useState(false);
	const [ loaded, setLoaded ] = useState(false);

	const loader = createLoader();

	loader.load(props.resources).then(
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
				background={props.resources.background}
				pattern={props.resources.pattern}
			>
				{(anim) => (
					<AppShell>
						{/* <Button animate show={anim.entered}>
							Travel to Space
						</Button>
						<Frame animate show={anim.entered} level={1} corners={3}>
							<p>An SciFi Project</p>
						</Frame>
						<Frame animate show={anim.entered} level={3} corners={6} layer="header">
							<p>An SciFi Project</p>
						</Frame> 				<Content>
							<h1>Arwes</h1>
							<p>
								Futuristic Sci-Fi and <a href="/cyberpunk">Cyberpunk</a>
								Graphical User Interface Framework for Web Apps
							</p>
						
						</Content>*/}
						<AppRoutes />
					</AppShell>
				)}
			</Arwes>
			<ReactQueryDevtools initialIsOpen={false} />
		</div>
	);
};

export default App;
