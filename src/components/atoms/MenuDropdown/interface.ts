export interface MenuDropdownProps {
	textMenu?: string;
	imageMenu?: string;
	options?: Options[];
}

export interface Options {
	name: string;
	onClick: () => void;
}
