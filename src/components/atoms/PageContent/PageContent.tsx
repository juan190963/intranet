import React, { ReactNode } from 'react';

type PageContentProps = {
	children?: ReactNode;
};

export const PageContent: React.FC<PageContentProps> = ({ children }) => {
	return (
		<main role='main' className='h-full'>
			<div
				className={`h-full max-h-full overflow-auto mx-auto sm:px-4 py-4 bg-gray-100 ml-72`}
			>
				{children}
			</div>
		</main>
	);
};
