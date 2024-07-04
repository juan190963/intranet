import React, { useEffect } from 'react';
import '@/styles/login/loginForm.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { LoginData } from '@/types/authTypes';
import { inputProps } from './loginFormConfig';
import usePasswordToggle from '@/utils/hooks/usePasswordToggle';
import { useAuthStore } from '@/store/auth';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import show from '@/assets/login/images/showPassword.svg';
import disguise from '@/assets/login/images/disguisePassword.svg';

export const LoginForm: React.FC = () => {

	
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginData>({ mode: 'onChange' });
	const [showPassword, togglePasswordVisibility] = usePasswordToggle();
	const { login, user } = useAuthStore();
	const navigate = useNavigate();


	useEffect(() => {
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

			<form
				onSubmit={handleSubmit(onSubmit)}
				className=' sm:pb-10 max-sm:px-1 px-10 rounded-b-xl  '
			>
				<div className='sm:max-w-xs block mx-auto '>
					<div className='mb-2 '>
						<label
							htmlFor='email'
							className={`mb-2 ${errors.email ? 'credential' : ''} block text-base sm:text-base text-white credentials sm:ml-7   font-medium`} 
						>
							email empresarial
						<div>
							<input
								type='email'
								id='email'
								autoComplete='off'
								placeholder='ejemplo@pernine.com.co'
								{...register('email', inputProps.email)}
								className={`input__Password py-3 px-4 block w-full  rounded-lg text-base ${errors.email ? 'input--error ' : ''} 
								border-indigo-900input bg-indigo-600 border-solid border-indigo-900 `}							/>
						</div>
							
							<ErrorMessage error={errors.email?.message} />
						</label>
					</div>
					<div className='mb-2 sm:mb-2'>
						<label
							htmlFor='password'
							className={`mb-2 ${errors.password ? 'credential' : ''} block text-base sm:text-base text-white credentials sm:ml-7 font-medium`} 
						>
							contraseña
							<div className='relative'>
								<input
									id='password'
									{...register('password', inputProps.password)}
									type={showPassword ? 'text' : 'password'}
									placeholder='contraseña'
								className={`input__Password py-3 px-4 block w-full  rounded-lg text-base ${errors.password ? 'input--error' : ''} 
									border-indigo-900input bg-indigo-600 border-solid border-indigo-900 `}

								/>
								<button
									type='button'
									className='absolute top-1.5 right-4'
									onClick={togglePasswordVisibility}
								>
									{showPassword ? (
										<img src={disguise} className='h-5 w-5' />
									) : (
										<img src={show} className='h-5 w-5' />
									)}
								</button>
								
							</div>
							<ErrorMessage  error={errors.password?.message}/>
						</label>
					</div>

					<div className='flex mb-5 sm:mb-6'>
						<label
							htmlFor='rememberMe'
							className='block font-medium text-xs text-white remember ml-4 sm:ml-7'
						>
							recuerdame
						</label>
						<input type='checkbox' id='rememberMe' className=' ml-2 remember' />
					</div>

					<button
						type='submit'
						className='block m-auto sm:mt-5 px-4 py-2 bg-white font-bold text-xs rounded-lg loginButton'
					>
						INICIAR SESIÓN
					</button>
					<div className='flex justify-center mt-2'>
						<Link
							to='/email'
							rel='noreferrer'
							className=' text-white__Recordar mt-1 font-medium text-xs'
						>
							Recordar contraseña
						</Link>
					</div>
				</div>
			</form>

		</>
	);
};
