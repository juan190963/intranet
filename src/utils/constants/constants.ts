import { IconsProps, OptionsMenuProps } from '../types/types';

export const ICONS: IconsProps = {
	'menu-fold': {
		viewBox: '0 0 24 24',
		d: 'M21 4H7v2h14zm0 7H11v2h10zm0 7H7v2h14zM9.01 8.814L7.596 7.4L3 11.996l4.596 4.596l1.414-1.414l-3.182-3.182z',
	},
	home: {
		viewBox: '0 0 24 24',
		d: 'M4 21V9l8-6l8 6v12h-6v-7h-4v7z',
	},
	meet: {
		viewBox: '0 0 1025 1024',
		d: 'M960.428 768h-262l-154 256l-154-256h-198q-26 0-45-18.5t-19-45.5V192q0-26 19-45t45-19h768q26 0 45 19t19 45v512q0 27-19 45.5t-45 18.5m-64-494q0-18-32-18l-160 160V288q0-13-9.5-22.5t-22.5-9.5h-384q-13 0-22.5 9.5t-9.5 22.5v320q0 13 9.5 22.5t22.5 9.5h384q13 0 22.5-9.5t9.5-22.5V480l160 160q32 0 32-17zm-832-82v448q-27 0-45.5-18.5T.428 576V128q0-53 37.5-90.5t90.5-37.5h704q26 0 45 19t19 45h-704q-53 0-90.5 37.5t-37.5 90.5',
	},
	admin: {
		viewBox: '0 0 24 24',
		d: 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5Zm0 3.9a3 3 0 1 1-3 3a3 3 0 0 1 3-3m0 7.9c2 0 6 1.09 6 3.08a7.2 7.2 0 0 1-12 0c0-1.99 4-3.08 6-3.08',
	},
};

export const OPTIONS_MENU: OptionsMenuProps[] = [
	{ name: 'Home', icon: 'home', link: '/' },
	{ name: 'Salas de reuniones', icon: 'meet', link: '/meeting-room' },
	{ name: 'Admin', icon: 'admin', link: '/admin' },
];