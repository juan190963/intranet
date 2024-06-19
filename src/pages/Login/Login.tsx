import React from 'react';
import Template from '../Login/Template';
import { LoginForm } from '@/components/molecules/LoginForm/LoginForm';
// import { EmailRecuperation } from '@/components/molecules/Recuperation/RecuperationEmailForm';
const Login : React.FC = () => {
    return (
        <Template>
            <div className='w-full sm:w-2/6'>
            <LoginForm/>
        </div>
        </Template>
    );
};

export default Login;