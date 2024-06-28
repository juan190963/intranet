import React, { useEffect } from 'react';
import '@/styles/login/loginForm.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { LoginData } from '@/types/authTypes';
import { inputProps } from '../LoginForm/loginFormConfig';
import { useAuthStore } from '@/store/auth';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
// import TemplateLogin from '@/components/template/TemplateLogin'


export const EmailRecuperation: React.FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<LoginData>({ mode: 'onChange' });
	const { login, user } = useAuthStore();
	const navigate = useNavigate();

	useEffect(() => {
		//sale error
		// console.log(user);
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
				className='pt-2 pb-10 max-sm:px-5 px-10 rounded-b-xl'
			>
				<div className='max-w-xs block mx-auto'>
					<div className='mb-2'>
						<label
							htmlFor='email'
							className='block text-base font-medium text-white credentials ml-7'
						>
							email empresarial
							<input
								type='email'
								id='email'
								autoComplete='off'
								{...register('email', inputProps.email)}
								className={`input focus-visible:shadow-none ${errors.email ? 'input--error' : ''} input bg-indigo-600 border-solid`}
								placeholder='@pernine.com'
							/>
							<ErrorMessage error={errors.email?.message} />
						</label>

					</div>

					<div className='flex buttons '>
						<button type='submit' className='relative w-20 h-10 bg-indigo-300 font-bold text-sm text-center text-indigo-950	
							top-5   Recuperation__return '>
							<Link to='/login' rel='noreferrer' className='text-white__return'>
								VOLVER
							</Link>
						</button>

						<button type='submit' className='relative w-20 h-10 bg-white font-bold text-sm text-center text-indigo-950	
							top-5  Recuperation__send '>
							ENVIAR
						</button>
					</div>


				</div>
			</form>
		</>
	);
};
