import React from 'react';
import { Link } from 'react-router-dom';

const FourOFour = () => {
	return (
		<div className="flex flex-col items-center h-screen">
			<h1 className="text-6xl font-bold text-white mt-10">404</h1>
			<h2 className="text-4xl">Page Not Found</h2>
			<div className="mt-2">
				<Link to="/">Go Back Home</Link>
			</div>
		</div>
	);
};

export default FourOFour;
