import React from 'react';
import { useLocation } from 'react-router-dom';
import { Logo } from '@/components/atoms/Logo/Logo';
import useWindowSize from '@/utils/hooks/useWindowSize';

type TemplateProps = {
	children: React.ReactNode;
};

export const TemplateLogin: React.FC<TemplateProps> = ({ children }) => {
	const location = useLocation();
	const size = useWindowSize();

	// Determina el título y el contenido del párrafo según la página actual
	const getPageContent = () => {
		switch (location.pathname) {
			case '/login':
				return { title: 'Bienvenido a nuestra intranet', paragraph: '' };
			case '/email':
				return { title: 'Ingresa tu e-mail empresarial para cambiar la contraseña', paragraph: '' };
			case '/password':
				return { title: 'Elige una contraseña segura ', paragraph: ' (números letras y caracteres especiales)' };
			default:
				return { title: '', paragraph: '' };
		}
	};

	const { title, paragraph } = getPageContent();

	return (
		<div className='flex flex-col md:flex-row gap-x-6 h-full'>
			<div className='w-full md:w-3/12 max-sm:h-2/3'>
				<div className='flex flex-col justify-center login-form__container h-full'>
					<div className='flex justify-center  sm:mt-0 logo'>
						<Logo width={size.width < 768 ? '100' : '30%'} height='auto' />
					</div>

					<div className='flex-col  max-sm:px-5  mb-2 sm:mt-0 sm:mb-0 px-10 items-center justify-center sm:h-20'>
						<h1 className='text-white title font-bold text-lg text-center'>{title}</h1>
						<p className='text-white font-light text-sm text-center'>{paragraph}</p>
					</div>
					{children}
				</div>
			</div>
			<div className='w-full md:w-9/12 max-md:h-1/3 templateLogin__container--img' />
		</div>
	);
};

export default TemplateLogin;
