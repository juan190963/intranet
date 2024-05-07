import { Dispatch, SetStateAction } from 'react';
export type SidebarProps = {
	isSidebarExpanded: boolean;
	setIsSidebarExpanded: Dispatch<SetStateAction<boolean>>;
};
