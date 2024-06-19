// src/components/Template.tsx
import React from 'react';
import '../../styles/login/imagenesLogin.scss'
import JSPORT from '../../assets/login/images/JSPORT.jpg';
import KAPPA from '../../assets/login/images/KAPPA.jpg';
import NEW from '../../assets/login/images/NEW.jpg';
import TNF from '../../assets/login/images/TNF.jpg';
import SG from '../../assets/login/images/SG.jpg';
import VANS from '../../assets/login/images/VANS.jpg';
import SM from '../../assets/login/images/SM.jpg';

type TemplateProps = {
    children: React.ReactNode;
};

const Login: React.FC<TemplateProps> = ({ children }) => {
return (
    <div className='flex flex-col sm:flex-row  gap-x-8 h-full'>
        <div className='w-full sm:w-2/6'>
            {children}
        </div>
        {<div className='img-login'>

            <img src={JSPORT} className='img-login__jsport' />

            <img src={KAPPA} className='img-login__kappa' />

            <img src={NEW} className='img-login__new' />

            <img src={TNF} className='img-login__tnf' />

            <img src={SG} className='img-login__sg' />

            <img src={VANS} className='img-login__vans' />

            <img src={SM} className='img-login__sm' />

        </div>

        }
    </div>
);
};

export default Login;
