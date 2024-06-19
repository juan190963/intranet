import React from 'react';
import Template from '../Login/Template';
import { EmailRecuperation } from '@/components/molecules/Recuperation/RecuperationEmailForm';
// import { EmailRecuperation } from '@/components/molecules/Recuperation/RecuperationEmailForm';
const Email : React.FC = () => {
    return (
        <Template>
            <div className='w-full sm:w-2/6'>
            <EmailRecuperation/>
        </div>
        </Template>
    );
};

export default Email;