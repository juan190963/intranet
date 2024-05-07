import React from 'react';
import { IconProps } from './interface';
import { ICONS } from '@/utils/constants/constants';

export const Icon: React.FC<IconProps> = ({
	name,
	width = '1em',
	height = '1em',
}) => {
	const svgRender = ICONS[name];
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width={width}
			height={height}
			viewBox={svgRender.viewBox}
		>
			<path fill='currentColor' d={svgRender.d} />
		</svg>
	);
};
