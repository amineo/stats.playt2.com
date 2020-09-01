import React from 'react';
import TestNav from 'Components/TestNav';

const AppShell: React.FC = ({ children }) => {
	return (
		<div className="flex">
			<div className="sm:w-64 px-4 sm:px-8 pt-6 bg-white">
				<div className="flex flex-col flex-grow overflow-y-auto">
					<div className="flex items-center flex-shrink-0 px-4">
						<h1>
							<strong>App</strong>
						</h1>
					</div>
					<div className="mt-5 flex-grow flex flex-col" />
				</div>
			</div>
			<div className="flex flex-col w-full border-l border-gray-200">
				<div className="p-4 border-b border-gray-200 bg-white">
					<TestNav />
				</div>
				<div className="px-4 sm:px-8 py-2 bg-gray-100">{children}</div>
				Footer
			</div>
		</div>
	);
};

export default AppShell;
