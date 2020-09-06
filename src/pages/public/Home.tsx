import React from 'react';
import ApiTester from 'Components/ApiTester';

const Home = () => {
	return (
		<div className="py-16 bg-gray-50 overflow-hidden lg:py-24">
			<div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-screen-xl">
				<div className="relative">
					<ApiTester />
				</div>
			</div>
		</div>
	);
};

export default Home;
