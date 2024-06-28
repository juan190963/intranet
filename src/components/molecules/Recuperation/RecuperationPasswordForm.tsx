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
                                    className={`input focus-visible:shadow-none ${errors.password ? 'input--error ' : ''} input bg-indigo-600 border-solid credentials `}
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
                                    className={`input focus-visible:shadow-none ${errors.confirmPassword ? 'input--error' : ''} input bg-indigo-600 border-solid credentials `}
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
                    <div className='flex buttons '>
                        <button type='submit' className='relative w-20 h-10 bg-indigo-300 font-bold text-sm text-center text-indigo-950	
							top-5   Recuperation__return '>
                            <Link to='/email' rel='noreferrer' className='text-white__return'>
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
