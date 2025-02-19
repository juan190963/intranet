import { Menu, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { MenuDropdownProps } from './interface';

export const MenuDropdown: React.FC<MenuDropdownProps> = ({
	imageMenu,
	textMenu,
	options,
}) => {
	return (
		<Menu as='div' className='relative ml-3'>
			<div>
				<Menu.Button className='flex max-w-xs items-center rounded-full text-sm'>
					{textMenu ? <span className='px-6 text-base'>{textMenu}</span> : <></>}
					{imageMenu ? (
						<img className='h-8 w-8 rounded-full' src={imageMenu} alt={textMenu} />
					) : (
						<></>
					)}
				</Menu.Button>
			</div>
			<Transition
				as={Fragment}
				enter='transition ease-out duration-100'
				enterFrom='transform opacity-0 scale-95'
				enterTo='transform opacity-100 scale-100'
				leave='transition ease-in duration-75'
				leaveFrom='transform opacity-100 scale-100'
				leaveTo='transform opacity-0 scale-95'
			>
				<Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
					<div className='px-1 py-1 '>
						{options?.map(option => (
							<Menu.Item key={option.name}>
								{({ active }) => (
									<button
										onClick={option.onClick}
										className={`${
											active ? 'bg__primary-color text-white' : 'text-gray-900'
										} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
									>
										{option.name}
									</button>
								)}
							</Menu.Item>
						))}
					</div>
				</Menu.Items>
			</Transition>
		</Menu>
	);
};

// return (
// 	<div className='fixed top-16 w-56 text-right'>
// 		<Menu as='div' className='relative inline-block text-left'>
// 			<div>
// 				<Menu.Button className='inline-flex w-full justify-center rounded-md bg-black/20 px-4 py-2 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75'>
// 					Options
// 					<ChevronDownIcon
// 						className='-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100'
// 						aria-hidden='true'
// 					/>
// 				</Menu.Button>
// 			</div>
// 			<Transition
// 				as={Fragment}
// 				enter='transition ease-out duration-100'
// 				enterFrom='transform opacity-0 scale-95'
// 				enterTo='transform opacity-100 scale-100'
// 				leave='transition ease-in duration-75'
// 				leaveFrom='transform opacity-100 scale-100'
// 				leaveTo='transform opacity-0 scale-95'
// 			>
// 				<Menu.Items className='absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none'>
// 					<div className='px-1 py-1 '>
// 						<Menu.Item>
// 							{({ active }) => (
// 								<button
// 									className={`${
// 										active ? 'bg-violet-500 text-white' : 'text-gray-900'
// 									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
// 								>
// 									{active ? (
// 										<EditActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
// 									) : (
// 										<EditInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
// 									)}
// 									Edit
// 								</button>
// 							)}
// 						</Menu.Item>
// 						<Menu.Item>
// 							{({ active }) => (
// 								<button
// 									className={`${
// 										active ? 'bg-violet-500 text-white' : 'text-gray-900'
// 									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
// 								>
// 									{active ? (
// 										<DuplicateActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
// 									) : (
// 										<DuplicateInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
// 									)}
// 									Duplicate
// 								</button>
// 							)}
// 						</Menu.Item>
// 					</div>
// 					<div className='px-1 py-1'>
// 						<Menu.Item>
// 							{({ active }) => (
// 								<button
// 									className={`${
// 										active ? 'bg-violet-500 text-white' : 'text-gray-900'
// 									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
// 								>
// 									{active ? (
// 										<ArchiveActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
// 									) : (
// 										<ArchiveInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
// 									)}
// 									Archive
// 								</button>
// 							)}
// 						</Menu.Item>
// 						<Menu.Item>
// 							{({ active }) => (
// 								<button
// 									className={`${
// 										active ? 'bg-violet-500 text-white' : 'text-gray-900'
// 									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
// 								>
// 									{active ? (
// 										<MoveActiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
// 									) : (
// 										<MoveInactiveIcon className='mr-2 h-5 w-5' aria-hidden='true' />
// 									)}
// 									Move
// 								</button>
// 							)}
// 						</Menu.Item>
// 					</div>
// 					<div className='px-1 py-1'>
// 						<Menu.Item>
// 							{({ active }) => (
// 								<button
// 									className={`${
// 										active ? 'bg-violet-500 text-white' : 'text-gray-900'
// 									} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
// 								>
// 									{active ? (
// 										<DeleteActiveIcon
// 											className='mr-2 h-5 w-5 text-violet-400'
// 											aria-hidden='true'
// 										/>
// 									) : (
// 										<DeleteInactiveIcon
// 											className='mr-2 h-5 w-5 text-violet-400'
// 											aria-hidden='true'
// 										/>
// 									)}
// 									Delete
// 								</button>
// 							)}
// 						</Menu.Item>
// 					</div>
// 				</Menu.Items>
// 			</Transition>
// 		</Menu>
// 	</div>
// );
// };
