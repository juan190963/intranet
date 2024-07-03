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
				className=' sm:pb-10 max-sm:px-1 px-10 rounded-b-xl '
			>
				<div className='sm:max-w-xs block mx-auto '>
					<div className='mb-2'>
						<label
							htmlFor='email'
							className={`mb-2 ${errors.email ? 'credential' : ''} block text-base sm:text-base text-white credentials sm:ml-7 font-medium`}  
						>
							email empresarial
							<div>
								<input
									type='email'
									id='email'
									autoComplete='off'
									placeholder='ejemplo@pernine.com.co'
									{...register('email', inputProps.email)}
									className={`input__Password py-3 px-4 block w-full border-gray-200 rounded-lg text-base ${errors.email ? 'input--error ' : ''} 
									border-indigo-900input bg-indigo-600 border-solid border-indigo-900 `}
								/>
							</div>

							<ErrorMessage error={errors.email?.message} />
						</label>

					</div>

					<div className='flex buttons  justify-center gap-8 ml-4 mt-8 '>
						<button type='submit' className=' w-20 h-8 bg-indigo-300 font-bold text-sm text-center text-indigo-950	 Recuperation__return '>
							<Link to='/login' rel='noreferrer' className='text-white__return'>
								VOLVER
							</Link>
						</button>

						<button type='submit' className=' w-20 h-8 bg-white font-bold text-sm text-center text-indigo-950  Recuperation__send '>
							ENVIAR
						</button>
					</div>


				</div>
			</form>
		</>
	);
};
