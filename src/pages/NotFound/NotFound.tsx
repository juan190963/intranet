import React from 'react';
import { Link } from 'react-router-dom';
import LogoImg from '@/assets/logoPernineDynamo.webp';

export const NotFoundPage: React.FC = () => (
	<section className='h-full'>
		<div className='flex flex-col justify-center items-center h-full gap-10 max-sm:p-5'>
			<img
				src={LogoImg}
				className='max-sm:w-60'
				width={400}
				height={230}
				loading='lazy'
				alt='Pernine - Dynamo'
			/>
			<h1 className='text-9xl'>404</h1>
			<p className='text-2xl max-sm:text-center'>
				Lo sentimos, esta página no está disponible.
			</p>
			<Link className='mt-20' to='/'>
				Volver a la pagina principal
			</Link>
		</div>
	</section>
);

export default NotFoundPage;
