import React, { useEffect } from 'react';
import '@/styles/login/password_Recuperation.scss'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../../atoms/ErrorMessage/ErrorMessage';
import { LoginData } from '@/types/authTypes';
import { inputProps } from '@/components/molecules/Recuperation/RecuperationConfig';
import usePasswordToggle from '@/utils/hooks/usePasswordToggle';
import { useAuthStore } from '@/store/auth';
import { AxiosError } from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/components/atoms/Logo/Logo';
import useWindowSize from '@/utils/hooks/useWindowSize';
import show from '@/assets/login/images/showPassword.svg';
import disguise from '@/assets/login/images/disguisePassword.svg';
import Swal from 'sweetalert2';

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
    const size = useWindowSize();

    useEffect(() => {
        console.log(user);
    }, [user]);

    const onSubmit = async (data: { email: string; password: string }) => {
        try {
            await login(data.email, data.password);
            navigate('/');
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de autenticación',
                    text: error.response.data.message,
                    confirmButtonText: 'Cerrar',
                });
            }
        }
    };

    return (
        <>
            <div className='flex flex-col justify-center container__pasword h-full '>
                <div className='flex justify-center mt-5 sm:mt-0'>
                    <Logo width={size.width < 768 ? '100' : '173'} height='auto' />
                </div>
                <div className='flex max-sm:px-5 mt-5 mb-2 sm:mt-0 sm:mb-0 px-10 items-center justify-center sm:h-20 flex-col text-white'>
                    <h1 className='text-white title__pasword font-bold text-lg text-center'>ELIGE UNA CONTRASEÑA SEGURA</h1>
                    <p className='text-white__pasword font-light text-sm text-center'>(números letras y caracteres especiales)</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='pt-2 pb-10 max-sm:px-5 px-10 rounded-b-xl'
                >
                    <div className='max-w-xs block mx-auto'>
                        <div className='mb-6'>
                            <label
                                htmlFor='password'
                                className='block text-base font-medium text-white credentials__pasword ml-7'
                            >
                                Contraseña
                                <div className='relative'>
                                    <input
                                        id='password'
                                        {...register('password', inputProps.password)}
                                        type={showPassword ? 'text' : 'password'}
                                        className={`input focus-visible:shadow-none ${errors.password ? 'input--error ' : ''} input__pasword  bg-indigo-600 border-solid credentials__pasword `}
                                        placeholder='contraseña'
                                    />
                                    <button
                                        type='button'
                                        className='absolute inset-y-0 right-0 px-5 py-1 flex items-center focus:outline-none'
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <img src={disguise} className='relative right-10 text-blue-600  show__password_' />
                                        ) : (
                                            <img src={show} className='relative right-10 text-blue-600  show__password_' />
                                        )}
                                    </button>
                                </div>
								<ErrorMessage error={errors.password?.message} />
                            </label>
                            <label
                                htmlFor='confirmPassword'
                                className='block text-base font-medium text-white credentials__pasword ml-7'
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
                                        className={`input focus-visible:shadow-none ${errors.confirmPassword ? 'input--error' : ''} input__pasword bg-indigo-600 border-solid credentials__pasword `}
                                        placeholder='confirmar'
                                    />
                                    <button
                                        type='button'
                                        className='absolute inset-y-0 right-0 px-5 py-1 flex items-center focus:outline-none'
                                        onClick={togglePasswordVisibilityconfirm}
                                    >
                                        {confirmPassword ? (
                                            <img src={disguise} className=' relative right-10 text-blue-600  show__password_' />
                                        ) : (
                                            <img src={show} className=' relative right-10 text-blue-600  show__password_' />
                                        )}
                                    </button>
                                </div>
								<ErrorMessage error={errors.confirmPassword?.message } />
                            </label>
                        </div>
                        <div className='flex buttons____pasword '>
							<button type='submit' className='relative w-20 h-10 bg-indigo-300 font-bold text-sm text-center text-indigo-950	
							top-5   Recuperation__return__pasword '>
							<Link to='/email' rel='noreferrer' className='text-white__return__pasword'>
								VOLVER
							</Link>
							</button>

							<button type='submit' className='relative w-20 h-10 bg-white font-bold text-sm text-center text-indigo-950	
							top-5  Recuperation__send__pasword '>
								ENVIAR
							</button>
						</div>
                    </div>
                </form>
            </div>
        </>
    );
};
