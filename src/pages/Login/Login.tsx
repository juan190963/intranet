import React from 'react';
import { LoginForm } from '@/components/molecules/LoginForm/LoginForm';
import { Slider } from '@/components/molecules/Slider/Slider';

const Login: React.FC = () => {
	const images = [
		'img1',
		'img2',
		'img3',
		'img4',
		'img5',
		'img6',
		'img7',
		'img8',
	];

	return (
		<div className='flex lg:flex-wrap px-4 max-lg:flex-col p-10 justify-center h-full'>
			<div className='flex flex-col items-center justify-center max-lg:w-full md:w-2/5 max-lg:hidden'>
				<Slider images={images} autoPlay showButtons={false} />
			</div>
			<div className='md:flex flex-col justify-center w-2/5 max-lg:w-full'>
				<LoginForm />
			</div>
		</div>
	);
};

export default Login
