import React from 'react';
import { LoginForm } from '@/components/molecules/LoginForm/LoginForm';
import imageDesktop from '@/assets/login/images/coverPage.webp';
import imageMobile from '@/assets/login/images/coverPageMobile.webp';
import useWindowSize from '@/utils/hooks/useWindowSize';

const Login: React.FC = () => {
	const size = useWindowSize();
	const backgroundImage = size.width < 768 ? imageMobile : imageDesktop;

	return (
		<div className='flex flex-col sm:flex-row gap-y-3 gap-x-8 h-full'>
			<div className='w-full sm:w-2/5'>
				<LoginForm />
			</div>
			<div
				className='flex items-center w-full sm:w-3/5 sm:m-5 h-full max-w-full'
				style={{
					backgroundImage: `url(${backgroundImage})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: 'cover',
				}}
			/>
		</div>
	);
};

export default Login;
