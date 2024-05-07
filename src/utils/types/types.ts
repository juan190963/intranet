export type IconsProps = {
	[key: string]: svgProps;
};

type svgProps = {
	viewBox: string;
	d: string;
};

export interface OptionsMenuProps {
	name: string;
	icon: string;
	link: string;
}
