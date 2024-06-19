import React, { useEffect } from 'react';
import '../../../styles/login/loginForm.scss'
import '../../../styles/login/Volver_Enviar.scss'
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
			<div className='flex flex-col justify-center container h-full '>
				<div className='flex justify-center mt-5 sm:mt-0'>
					<Logo width={size.width < 768 ? '100' : '173'} height='auto' />
				</div>
				<div className='flex max-sm:px-5 mt-5 mb-2 sm:mt-0 sm:mb-0 px-10 items-center justify-center sm:h-20'>
					<h1 className='text-white title'>INGRESA TU E-MAIL EMPRESARIAL PARA CAMBIAR LA CONTRASEÑA</h1>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='pt-2 pb-10 max-sm:px-5 px-10 rounded-b-xl'
				>
					<div className='max-w-xs block mx-auto'>
						<div className='mb-2'>
							<label
								htmlFor='email'
								className='block text-base font-medium text-white credentials'
							>
								Email empresarial
								<input
									type='email'
									id='email'
									autoComplete='off'
									{...register('email', inputProps.email)}
									className={`input focus-visible:shadow-none ${errors.email ? 'input--error' : ''} input` }
								/>
							</label>
							<ErrorMessage error={errors.email?.message} />
						</div>
						
						<div className='buttons'>
							<Link to='/' rel='noreferrer' className='m-auto mt-5 px-4 py-2 buttons--Recuperation__volver'>
								VOLVER
							</Link>
							
						

						
							<Link to='/password' rel='noreferrer' className='m-auto mt-5 px-4 py-2 buttons--Recuperation__enviar'>
								ENVIAR
							</Link>
							
						
						
						</div>
						
						
					</div>
				</form>
			</div>
		</>
	);
};
