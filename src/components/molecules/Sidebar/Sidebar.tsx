import React, { useEffect, useState } from 'react';
import { SidebarProps } from './interface';
import './Sidebar.scss';
import { Logo } from '@/components/atoms/Logo/Logo';
import { Icon } from '@/components/atoms/Icon/Icon';
// import { useAuthStore } from '@/store/auth';
import { OPTIONS_MENU } from '@/utils/constants/constants';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar: React.FC<SidebarProps> = ({
	isSidebarExpanded,
	setIsSidebarExpanded,
}) => {
	// const { user } = useAuthStore();
	const location = useLocation();
	const [optionSelected, setOptionSelected] = useState('');

	const toggleColWidth = () => {
		setIsSidebarExpanded(prevExpanded => !prevExpanded);
		localStorage.setItem('sidebarExpanded', String(!isSidebarExpanded));
	};

	useEffect(() => {
		setOptionSelected(location.pathname);
	}, []);

	return (
		<nav
			className={`sidebar__wrapper fixed top-0 bottom-0 transition-all ${isSidebarExpanded ? 'w-[288px]' : 'sidebar__wrapper--hover w-20'}`}
		>
			<div className='sidebar__header h-[80px] flex justify-between py-4 px-6'>
				<Logo width='75' height='43' />
				<button
					type='button'
					onClick={toggleColWidth}
					className={`text-white transition-all text-3xl ${
						!isSidebarExpanded ? 'rotate-180' : ''
					}`}
				>
					<Icon name='menu-fold' width='1em' height='1em' />
				</button>
			</div>
			<ul className='py-6'>
				{OPTIONS_MENU.map(option => (
					<Link
						className={`flex gap-3 items-center py-2 px-5 text-white ${option.link === optionSelected ? 'active' : ''}`}
						key={option.name}
						to={option.link}
					>
						<Icon width='20px' height='20px' name={option.icon}></Icon>
						<span>{option.name}</span>
					</Link>
				))}
			</ul>
		</nav>
	);
};
