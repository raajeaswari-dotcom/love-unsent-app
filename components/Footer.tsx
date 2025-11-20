

import React from 'react';
import Logo from './Logo';

interface FooterProps {
    navigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ navigate }) => {
    const handleNav = (e: React.MouseEvent, page: string) => {
        e.preventDefault();
        navigate(page);
    };

  return (
    <footer id="contact-footer" className="bg-[#5B2C23] text-[#F5EADF] py-12">
      <div className="container mx-auto px-6 text-center">
        <Logo className="w-56 mx-auto mb-6 fill-current text-[#F5EADF]" />
        <nav className="flex justify-center flex-wrap gap-x-6 gap-y-2 mb-6">
          <a href="#" onClick={(e) => handleNav(e, 'about')} className="hover:underline">About</a>
          <a href="#" onClick={(e) => handleNav(e, 'contact')} className="hover:underline">Contact</a>
          <a href="#" onClick={(e) => handleNav(e, 'faq')} className="hover:underline">FAQs</a>
          <a href="#" onClick={(e) => handleNav(e, 'terms')} className="hover:underline">Terms of Service</a>
          <a href="#" onClick={(e) => handleNav(e, 'privacy')} className="hover:underline">Privacy Policy</a>
        </nav>
        <p className="mb-6">&copy; {new Date().getFullYear()}{' '}
            <button onClick={() => navigate('admin-login')} className="hover:underline focus:outline-none">Love Unsent</button>
        . All Rights Reserved.</p>
        <div className="flex justify-center gap-4">
            <a 
                href="https://wa.me/910000000000" // Replace with actual WhatsApp number
                target="_blank" 
                rel="noopener noreferrer" 
                className="bg-[#E9CBA7] text-[#5B2C23] font-bold py-2 px-6 rounded-xl hover:bg-[#e2b98c] transition-colors"
            >
                Contact us on WhatsApp
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
