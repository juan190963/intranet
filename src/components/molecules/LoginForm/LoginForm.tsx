import React, { useEffect } from 'react';
import '@/styles/login/loginForm.scss';
import '@/styles/login/componentLogin.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { LoginData } from '@/types/authTypes';
import { inputProps } from './loginFormConfig';
import usePasswordToggle from '@/utils/hooks/usePasswordToggle';
import { useAuthStore } from '@/store/auth';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/atoms/Logo/Logo';
import useWindowSize from '@/utils/hooks/useWindowSize';
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
			<div className='flex flex-col justify-center container h-full  '>
				<div className='flex justify-center mt-5 sm:mt-0 logo'>
					<Logo width={size.width < 768 ? '100' : '173'} height='auto' />
				</div>
				<div className='flex max-sm:px-5 mt-5 mb-2 sm:mt-0 sm:mb-0 px-10 items-center justify-center sm:h-20'>
					<h1 className='text-white title font-bold text-lg text-center '>BIENVENIDO A NUESTRA INTRANET</h1>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='pt-2 pb-10 max-sm:px-5 px-10 rounded-b-xl'
				>
					<div className='max-w-xs block mx-auto'>
						<div className='mb-2 '>
							<label
								htmlFor='email'
								className='block text-base font-medium text-white credentials ml-7 '
							>
								email empresarial
								<input
									type='email'
									id='email'
									autoComplete='off'
									placeholder='@pernine.com'
									{...register('email', inputProps.email)}
									className={`input focus-visible:shadow-none  ${errors.email ? 'input--error' : ''} input bg-indigo-600 border-solid	 border-indigo-900`}
								/>
							<ErrorMessage error={errors.email?.message}  />
							</label>
							
							
						</div>
						<div className='mb-6'>
							<label
								htmlFor='password'
								className='block text-base font-medium text-white credentials ml-7 mt-3	'
							>
								contraseña
								<div className='relative'>
									<input
										id='password'
										{...register('password', inputProps.password)}
										type={showPassword ? 'text' : 'password'}
										className={`input focus-visible:shadow-none ${errors.password ? 'input--error' : ''} input__Password bg-indigo-600 border-solid	 
										border-indigo-900input bg-indigo-600 border-solid	 border-indigo-900 `}
										placeholder='contraseña'
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 px-5 py-1 flex items-center focus:outline-none'
										onClick={togglePasswordVisibility}
									>
										{showPassword ? (
											<img src={disguise} className='relative right-10  text-blue-600 disguise__password' />
										) : (
											<img src={show} className='relative right-10 text-blue-600  show__password' />
										)}
									</button>
								</div>
								<ErrorMessage error={errors.password?.message} />
							</label>
							
						</div>

						<div className='flex mr-6'>
							<label htmlFor="rememberMe" className='block text-base font-medium text-xs text-white remember ml-7	' >recuerdame</label>
							<input
								type="checkbox"
								id="rememberMe"
								className=' ml-2 remember'
							/>
						</div>

						<button
							type='submit'
							className='block m-auto mt-5 px-4 py-2 bg-white font-bold text-xs rounded-lg loginButton'
						>
							INICIAR SESIÓN
						</button>
						<div className='flex justify-center sm:mt-2 '>
							<Link to='/email' rel='noreferrer' className=' text-white__Recordar font-medium text-xs 		'>
								Recordar contraseña
							</Link>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
