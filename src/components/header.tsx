import React from 'react';
import huberLogo from '../images/eats-logo.svg';

export const Header = () => (
     <header className="py-4">
       <div className="w-full max-w-screen-xl mx-auto">
         <img src={huberLogo} className="w-52 mb-10" alt="Nuber Eats" />
         im the header
       </div>
     </header>
   );