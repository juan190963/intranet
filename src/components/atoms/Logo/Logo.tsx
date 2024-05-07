import React from 'react';
import LogoImg from '@/assets/logoPernineDynamo.webp';
import { LogoProps } from './interface';

export const Logo: React.FC<LogoProps> = ({ width, height }) => (
	<img
		className='block transition-all'
		src={LogoImg}
		width={width}
		height={height}
		alt='Pernine - Dynamo'
		loading='lazy'
	/>
);
