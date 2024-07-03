import React, { useEffect } from 'react';
import '@/styles/login/loginForm.scss';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { LoginData } from '@/types/authTypes';
import { inputProps } from '@/components/molecules/Recuperation/RecuperationConfig';
import usePasswordToggle from '@/utils/hooks/usePasswordToggle';
import { useAuthStore } from '@/store/auth';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import show from '@/assets/login/images/showPassword.svg';
import disguise from '@/assets/login/images/disguisePassword.svg';
// import TemplateLogin from '@/components/template/TemplateLogin'

export const PasswordRecuperation: React.FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        watch,
    } = useForm<LoginData>({ mode: 'onChange' });
    const [showPassword, togglePasswordVisibility] = usePasswordToggle();
    const [confirmPassword, togglePasswordVisibilityconfirm] = usePasswordToggle();
    const { login, user } = useAuthStore();
    const navigate = useNavigate();
 

    useEffect(() => {
    }, [user]);

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            await login(data.email, data.password);
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                //sale error
            }
        }
    };

    return (
        <>

          
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='sm:pb-10 max-sm:px-1 px-10 rounded-b-xl'
            >
                <div className='sm:max-w-xs block mx-auto '>
                    <div className='mb-6'>
                        <label
                            htmlFor='password'
							className={`mb-2 ${errors.password ? 'credential' : ''} block text-base sm:text-base text-white credentials sm:ml-7 font-medium`}
                        >
                            Contraseña
                            <div className='relative'>
                                <input
                                    id='password'
                                    {...register('password', inputProps.password)}
                                    type={showPassword ? 'text' : 'password'}
                                    className={`input__Password py-3 px-4 block w-full border-gray-200 rounded-lg text-base ${errors.password ? 'input--error ' : ''} 
									border-indigo-900input bg-indigo-600 border-solid border-indigo-900 `}   
                                    placeholder='contraseña'
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
                            <ErrorMessage error={errors.password?.message} />
                        </label>
                        <label
                            htmlFor='confirmPassword'
							className={`mb-2 ${errors.confirmPassword ? 'credential' : ''} block text-base sm:text-base text-white credentials sm:ml-7 font-medium`}
                        >
                            Confirmar contraseña
                            <div className='relative'>
                                <input
                                    id='confirmPassword'
                                    {...register('confirmPassword', {
                                        ...inputProps.confirmPassword,
                                        validate: (value) => value === watch('password') || 'Las contraseñas no coinciden'
                                    })}
                                    type={confirmPassword ? 'text' : 'password'}
                                    className={`input__Password py-3 px-4 block w-full border-gray-200 rounded-lg text-base ${errors.confirmPassword ? 'input--error' : ''} 
									border-indigo-900input bg-indigo-600 border-solid border-indigo-900 `}                                  
                                    placeholder='confirmar'

                                   
                                />
                                <button
                                    type='button'
                                    className='absolute top-1.5 right-4'
                                    onClick={togglePasswordVisibilityconfirm}
                                >
                                    {confirmPassword ? (
                                        <img src={disguise} className='h-5 w-5' />
                                    ) : (
                                        <img src={show} className='h-5 w-5' />
                                    )}
                                </button>
                            </div>
                            <ErrorMessage error={errors.confirmPassword?.message} />
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
