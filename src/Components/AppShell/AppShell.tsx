import React from 'react';
import { Link } from 'react-router-dom';

// @ts-ignore
import { Header, Footer, Button, Content } from 'arwes';

const AppShell: React.FC = ({ children }) => {
	return (
		<div>
			<Header animate>
				<nav>
					<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex items-center justify-between h-16">
							<div className="flex items-center">
								<div className="flex-shrink-0">
									<Link to="/">
										<img
											className="h-8 w-8"
											src="https://d33wubrfki0l68.cloudfront.net/1699fc97aa9b1cb851a6c0039162a9241724e1fb/7289f/images/logo.png"
											alt="Tribes 2 Stats Project"
										/>
									</Link>
								</div>
								<div className="md:block">
									<div className="ml-10 flex items-baseline">
										<Content>
											<Link to="/games" className="ml-4 px-3 py-2 rounded-md text-sm font-medium">
												Games
											</Link>
											<Link
												to="/players"
												className="ml-4 px-3 py-2 rounded-md text-sm font-medium"
											>
												Players
											</Link>
										</Content>
									</div>
								</div>
							</div>
							<div className="md:block">
								<div className="ml-4 flex items-center md:ml-6">
									<span className="inline-flex rounded-md shadow-sm">
										<a
											href="https://www.playt2.com/discord"
											className="inline-flex items-center px-2.5 py-1.5"
											target="_blank"
											rel="noopener noreferrer"
										>
											<Button animate layer="header">
												Join Discord
											</Button>
										</a>
									</span>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</Header>

			<div className="w-full px-4 sm:px-8 py-2">{children}</div>

			<Footer animate>
				<p>Footer</p>
			</Footer>
		</div>
	);
};

export default AppShell;
