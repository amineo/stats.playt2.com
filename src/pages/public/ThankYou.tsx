import React from 'react';
// import { Link } from 'react-router-dom';
// import { Header, Footer, Button, Content, Frame } from 'arwes';

const ThankYou = () => {
	return (
		<div className="flex flex-col items-center h-screen">
			<h1 className="text-6xl font-bold text-white mt-10">VGRT</h1>
			<h2 className="text-4xl text-center mt-12">Thanks for all the great games and memories.</h2>
			<div className="mt-24">
			<a
											href="https://www.playt2.com/discord"
											className="inline-flex items-center px-1 md:px-2.5 py-1.5"
											target="_blank"
											rel="noopener noreferrer"
										>
									
												PlayT2.com
											
										</a>
			</div>
		</div>
	);
};

export default ThankYou;
