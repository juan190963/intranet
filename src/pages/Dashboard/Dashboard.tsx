import { Header } from '@/components/molecules/Header/Header';
import { Sidebar } from '@/components/molecules/Sidebar/Sidebar';
import React, { useEffect, useState } from 'react';

export interface AppLayoutProps {
	children: React.ReactNode;
}

const Dashboard: React.FC<AppLayoutProps> = ({ children }) => {
	const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

	useEffect(() => {
		const localStorageValue = localStorage.getItem('sidebarExpanded');

		setIsSidebarExpanded(localStorageValue?.includes('true') ?? false);
	}, []);

	return (
		<>
			<div className='h-full'>
				<Sidebar
					isSidebarExpanded={isSidebarExpanded}
					setIsSidebarExpanded={setIsSidebarExpanded}
				></Sidebar>
				<Header isSidebarExpanded={isSidebarExpanded} />
				<div
					className={`h-[calc(100%-80px)] max-h-full overflow-auto mx-auto sm:px-4 py-4 bg-gray-100 ${isSidebarExpanded ? 'ml-72' : 'ml-20'}`}
				>
					{children}
				</div>
			</div>
		</>
	);
};

export default Dashboard;
