import React, { useEffect } from 'react';
import './LoginForm.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { LoginData } from '@/types/authTypes';
import { inputProps } from './loginFormConfig';
import usePasswordToggle from '@/utils/hooks/usePasswordToggle';
import { useAuthStore } from '@/store/auth';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

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
		console.log(user);
	}, [user]);

	const onSubmit = async (data: LoginData) => {
		try {
			await login(data.email, data.password);
			navigate("/");
		} catch (error: unknown) {
			if (error instanceof AxiosError && error.response) {
				toast.error(error.response.data.message);
			}
		}
	};

	return (
		<>
			<div className='shadow-xl rounded-b-xl'>
				<div className='flex max-sm:px-5 px-10 items-center justify-center h-32 login__header rounded-t-xl'>
					<span className='text-white'>
						!Hola, te damos la bienvenida a la intranet!
					</span>
				</div>
				<div className='flex max-sm:px-5 px-10 items-center justify-center h-20 '>
					<span className=''>Para acceder, ingresa los siguientes datos:</span>
				</div>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='pt-2 pb-10 max-sm:px-5 px-10 rounded-b-xl'
				>
					<div className='max-w-md block mx-auto'>
						<div className='mb-2'>
							<label
								htmlFor='email'
								className='block text-base font-medium text-gray-700'
							>
								Correo electronico registrado
								<input
									type='email'
									id='email'
									autoComplete='off'
									{...register('email', inputProps.email)}
									className={`input focus-visible:shadow-none ${errors.email ? 'input--error' : ''}`}
								/>
							</label>
							<ErrorMessage error={errors.email?.message} />
						</div>
						<div className='mb-6'>
							<label
								htmlFor='password'
								className='block text-base font-medium text-gray-700'
							>
								Contraseña
								<div className='relative'>
									<input
										id='password'
										{...register('password', inputProps.password)}
										type={showPassword ? 'text' : 'password'}
										className={`input focus-visible:shadow-none ${errors.password ? 'input--error' : ''}`}
									/>
									<button
										type='button'
										className='absolute inset-y-0 right-0 px-2 py-1 flex items-center focus:outline-none'
										onClick={togglePasswordVisibility}
									>
										{/* {showPassword ? (
											<MdVisibilityOff className='h-5 w-5 text-gray-400' />
										) : (
											<MdVisibility className='h-5 w-5 text-gray-400' />
										)} */}
									</button>
								</div>
							</label>
							<ErrorMessage error={errors.password?.message} />
						</div>
						<button type='submit' className='w-full mt-5 px-4 py-2 primary-button'>
							Iniciar sesión
						</button>
						<div className='mt-8 text-center'>
							{/* <Link
								to={ROUTES.RESET_PASSWORD}
								rel='noreferrer'
								className='text-base'
							>
								¿Olvidaste la contraseña?
							</Link> */}
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
