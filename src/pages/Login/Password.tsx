import React from 'react';
import Template from '../Login/Template';
import { PasswordRecuperation } from '@/components/molecules/Recuperation/RecuperationPasswordForm';
// import { EmailRecuperation } from '@/components/molecules/Recuperation/RecuperationEmailForm';
const Email : React.FC = () => {
    return (
        <Template>
            <div className='w-full sm:w-2/6'>
            <PasswordRecuperation/>
        </div>
        </Template>
    );
};

export default Email;