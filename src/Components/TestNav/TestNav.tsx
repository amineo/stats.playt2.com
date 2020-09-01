import React from 'react';
import { Link } from 'react-router-dom';

const TestNav = () => {
	return (
		<div className="container mx-auto px-2 py-1">
			<nav className="flex">
				{' '}
				<div className="px-3 py-2 font-medium text-sm leading-5">Test Nav</div>
				<Link
					to="/"
					className="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-700 bg-gray-100 focus:outline-none focus:bg-gray-200"
					aria-current="page"
				>
					Home
				</Link>
				<Link
					to="/fake-page"
					className="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100"
				>
					404 Page
				</Link>
				<Link
					to="/app/dashboard"
					className="ml-4 px-3 py-2 font-medium text-sm leading-5 rounded-md text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 focus:bg-gray-100"
				>
					Dashboard
				</Link>
			</nav>
		</div>
	);
};
export default TestNav;
