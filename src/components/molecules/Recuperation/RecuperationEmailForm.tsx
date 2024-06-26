import React, { useEffect } from 'react';
import '../../../styles/login/email_recuperation.scss'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { LoginData } from '@/types/authTypes';
import { inputProps } from '../LoginForm/loginFormConfig';
import { useAuthStore } from '@/store/auth';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/atoms/Logo/Logo';
import useWindowSize from '@/utils/hooks/useWindowSize';

export const EmailRecuperation: React.FC = () => {
	const {
		handleSubmit,
		register,                                               
		formState: { errors },
	} = useForm<LoginData>({ mode: 'onChange' });
	const { login, user } = useAuthStore();
	const navigate = useNavigate();
	const size = useWindowSize();

	useEffect(() => {
		console.log(user);
	}, [user]);

	const onSubmit = async (data: LoginData) => {
		try {
			await login(data.email, data.password);
			navigate('/');
		} catch (error: unknown) {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.message);
			}
		}
	};

	return (
		<>
			<div className='flex flex-col justify-center container__email h-full '>
				<div className='flex justify-center mt-5 sm:mt-0'>
					<Logo width={size.width < 768 ? '100' : '173'} height='auto' />
				</div>
				<div className='flex max-sm:px-5 mt-5 mb-2 sm:mt-0 sm:mb-0 px-10 items-center justify-center sm:h-20'>
					<h1 className='text-white title__email font-bold text-lg text-center'>INGRESA TU E-MAIL EMPRESARIAL PARA CAMBIAR LA CONTRASEÑA</h1>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='pt-2 pb-10 max-sm:px-5 px-10 rounded-b-xl'
				>
					<div className='max-w-xs block mx-auto'>
						<div className='mb-2'>
							<label
								htmlFor='email'
								className='block text-base font-medium text-white credentials__email ml-7'
							>
								email empresarial
								<input
									type='email'
									id='email'
									autoComplete='off'
									{...register('email', inputProps.email)}
									className={`input focus-visible:shadow-none ${errors.email ? 'input--error' : ''} input__email bg-indigo-600 border-solid` }
									placeholder='@pernine.com'
								/>
								<ErrorMessage error={errors.email?.message} />
							</label>
							
						</div>
						
						<div className='flex buttons__email '>
							<button type='submit' className='relative w-20 h-10 bg-indigo-300 font-bold text-sm text-center text-indigo-950	
							top-5   Recuperation__return__email '>
							<Link to='/login' rel='noreferrer' className='text-white__return__email'>
								VOLVER
							</Link>
							</button>

							<button type='submit' className='relative w-20 h-10 bg-white font-bold text-sm text-center text-indigo-950	
							top-5  Recuperation__send__email '>
								ENVIAR
							</button>
						</div>
						
						
					</div>
				</form>
			</div>
		</>
	);
};
