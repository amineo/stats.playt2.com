import React, { Suspense } from 'react';
import './assets/app.gen.css';
import { Route, Switch } from 'react-router-dom';
import { FetchProvider } from 'Context/FetchContext';

// Components
import AppShell from 'Components/AppShell';

// Public Pages
import Home from 'pages/public/Home';
import FourOFour from 'pages/error/404';

const LoadingFallback: React.SFC = () => <div className="p-4">Loading...</div>;

const AppRoutes: React.FC = () => {
	return (
		<Suspense fallback={<LoadingFallback />}>
			<Switch>
				<FetchProvider>
					<Switch>
						<Route exact path="/">
							<Home />
						</Route>

						{/** Site 404 */}
						<Route component={FourOFour} />
					</Switch>
				</FetchProvider>
			</Switch>
		</Suspense>
	);
};

const App: React.FC = () => {
	return (
		<AppShell>
			<AppRoutes />
		</AppShell>
	);
};

export default App;
