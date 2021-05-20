import React from 'react';
import huberLogo from '../images/eats-logo.svg';

export const Header = () => <header className="bg-red-500 py-4">
     <div className='w-full max-w-screen-2xl bg-yellow-500 mx-auto'>
         <img src={huberLogo} className="w-52 mb-10" alt="Huber Eats" />
         I'm Header
         </div>        
    </header>