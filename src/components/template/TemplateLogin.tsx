import React from 'react';

type TemplateProps = {
	children: React.ReactNode;
};

const Login: React.FC<TemplateProps> = ({ children }) => {
	return (
		<div className='flex flex-col md:flex-row gap-x-6 h-full'>
			<div className='w-full md:w-3/12 max-sm:h-2/3'>{children}</div>
			<div className='w-full md:w-9/12 max-md:h-1/3 templateLogin__container--img' />
		</div>
	);
};

export default Login;
