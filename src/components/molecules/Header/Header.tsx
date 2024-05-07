import { Logo } from '@/components/atoms/Logo/Logo';
import { MenuDropdown } from '@/components/atoms/MenuDropdown/MenuDropdown';
import { useAuthStore } from '@/store/auth';
import React from 'react';
import { HeaderProps } from './interface';

export const Header: React.FC<HeaderProps> = ({ isSidebarExpanded }) => {
	const { user, logout } = useAuthStore();
	const handleLogout = () => {
		logout();
	};

	const options = [{ name: 'Cerrar sesión', onClick: handleLogout }];

	return (
		<header className={`bg-white h-[80px] ${isSidebarExpanded ? 'ml-72' : 'ml-20'}`}>
			<nav
				className={`mx-auto flex items-center p-6 lg:px-8 ${isSidebarExpanded ? 'justify-end' : 'justify-between'}`}
			>
				{!isSidebarExpanded ? <Logo width='75' height='43' /> : <></>}
				<MenuDropdown
					textMenu={user?.fullName}
					imageMenu='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
					options={options}
				/>
			</nav>
		</header>
	);
};
