import React from 'react';
import { Link } from 'react-router-dom';

// @ts-ignore
import { Header, Footer, Button, Content, Frame } from 'arwes';

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
									<div className="mr-10">
										<Frame border={false} corners={1} layer={'secondary'}>
											<Content>
												<small className="text-sm block px-4 text-orange-200">
													Hey! Things aren't quite finished yet. Stay tuned!
												</small>
											</Content>
										</Frame>
									</div>
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

			<div className="w-full px-4 sm:px-8 pt-2 pb-10">{children}</div>

			<Footer animate>
				<div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
					<div className="flex justify-center md:order-2">
						<span className="text-xs">Wanna help out?</span>

						<a href="https://github.com/amineo/stats.playt2.com" className="ml-6">
							<span className="sr-only">GitHub</span>
							<svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
					</div>
					<div className="mt-8 md:mt-0 md:order-1">
						<p className="text-center text-sm leading-6">A Tribes 2 Community Project</p>
					</div>
				</div>
			</Footer>
		</div>
	);
};

export default AppShell;
