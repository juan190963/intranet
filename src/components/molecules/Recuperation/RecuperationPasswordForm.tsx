import React, { useEffect } from 'react';
import '@/styles/login/loginForm.scss'
import '@/styles/login/componentLogin.scss'
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
            <div className='flex flex-col justify-center container h-full '>
                <div className='flex justify-center mt-5 sm:mt-0'>
                    <Logo width={size.width < 768 ? '100' : '173'} height='auto' />
                </div>
                <div className='flex max-sm:px-5 mt-5 mb-2 sm:mt-0 sm:mb-0 px-10 items-center justify-center sm:h-20 flex-col text-white'>
                    <h1 className='text-white title font-bold text-lg text-center'>ELIGE UNA CONTRASEÑA SEGURA</h1>
                    <p className='text-white font-light text-sm text-center'>(números letras y caracteres especiales)</p>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='pt-2 pb-10 max-sm:px-5 px-10 rounded-b-xl'
                >
                    <div className='max-w-xs block mx-auto'>
                        <div className='mb-6'>
                            <label
                                htmlFor='password'
                                className='block text-base font-medium text-white credentials ml-7'
                            >
                                Contraseña
                                <div className='relative'>
                                    <input
                                        id='password'
                                        {...register('password', inputProps.password)}
                                        type={showPassword ? 'text' : 'password'}
                                        className={`input focus-visible:shadow-none ${errors.password ? 'input--error ' : ''} input input__Password bg-indigo-600 border-solid credentials`}
                                        placeholder='Contraseña'
                                    />
                                    <button
                                        type='button'
                                        className='absolute inset-y-0 right-0 px-5 py-1 flex items-center focus:outline-none'
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? (
                                            <img src={disguise} className='relative right-10 text-blue-600 disguise__password' />
                                        ) : (
                                            <img src={show} className='relative right-10 text-blue-600 show__password' />
                                        )}
                                    </button>
                                    <ErrorMessage error={errors.password?.message} />
                                </div>
                            </label>
                            <label
                                htmlFor='confirmPassword'
                                className='block text-base font-medium text-white credentials ml-7'
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
                                        className={`input focus-visible:shadow-none ${errors.confirmPassword ? 'input--error' : ''} input input__Password bg-indigo-600 border-solid credentials`}
                                        placeholder='Confirmar'
                                    />
                                    <button
                                        type='button'
                                        className='absolute inset-y-0 right-0 px-5 py-1 flex items-center focus:outline-none'
                                        onClick={togglePasswordVisibilityconfirm}
                                    >
                                        {confirmPassword ? (
                                            <img src={disguise} className='relative right-10 text-blue-600 show__password' />
                                        ) : (
                                            <img src={show} className='relative right-10 text-blue-600 show__password' />
                                        )}
                                    </button>
                                    <ErrorMessage error={errors.confirmPassword?.message } />
                                </div>
                            </label>
                        </div>
                        <div className='flex justify-center gap-6'>
                            <button type='submit' className='w-20 h-10 bg-indigo-300 font-bold text-sm text-center text-indigo-950 top-5 Recuperation__return'>
                                <Link to='/email' rel='noreferrer' className='text-white__return'>
                                    VOLVER
                                </Link>
                            </button>
                            <button type='submit' className='w-20 h-10 bg-white font-bold text-sm text-center text-indigo-950 top-5 Recuperation__send'>
                                ENVIAR
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};
