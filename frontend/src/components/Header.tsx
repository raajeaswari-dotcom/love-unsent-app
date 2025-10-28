import React, { useState, useEffect, useRef } from 'react';
// FIX: Corrected import path for App.tsx
import { User } from '../../../App';
import { UserIcon, EnvelopeIcon } from './Icons';
import Logo from './Logo';

interface HeaderProps {
  page: string;
  anchor?: string;
  navigate: (page: string, props?: any, anchor?: string) => void;
  cartCount: number;
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

const navLinks = [
  { id: 'shop', label: 'Shop', page: 'home', anchor: 'shop' },
  { id: 'about', label: 'About', page: 'home', anchor: 'how-it-works' },
  { id: 'tarot', label: 'Tarot', page: 'tarot' },
  { id: 'track-order', label: 'Track Order', page: 'track-order' },
  { id: 'contact', label: 'Contact', page: 'home', anchor: 'contact' },
];

const Header: React.FC<HeaderProps> = ({ page, anchor, navigate, cartCount, isAuthenticated, user, onLogout }) => {
  const activeTabId = page === 'home' ? anchor || 'shop' : page;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-[#F3E9DD] sticky top-0 z-50 shadow-md">
      <div 
        className="container mx-auto px-6 relative h-32"
      >
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('home');
          }}
          className="absolute top-1/2 left-1/2 -transform -translate-x-1/2 -translate-y-1/2 transition-opacity hover:opacity-80 cursor-pointer"
        >
          <Logo className="w-56" />
        </a>
        
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 bottom-0 items-end gap-2">
          {navLinks.map(link => (
             <a
              key={link.id}
              href={`#${link.anchor || ''}`}
              onClick={(e) => {
                e.preventDefault();
                navigate(link.page, {}, link.anchor);
              }}
              className={`text-sm uppercase tracking-wider transition-all duration-300 px-5 rounded-t-lg ${
                activeTabId === link.id
                  ? 'bg-[#A37B65] text-white pt-3 pb-4 -mb-1'
                  : 'text-[#2C1B13] hover:text-[#511317] pt-3 pb-3'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="absolute right-6 bottom-4 flex items-center gap-4">
          <div className="relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <button onClick={() => setIsDropdownOpen(prev => !prev)} className="hover:opacity-75 transition-opacity" title="My Account">
                <UserIcon />
              </button>
            ) : (
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('login'); }} className="hover:opacity-75 transition-opacity" title="Login">
                <UserIcon />
              </a>
            )}
            {isDropdownOpen && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <div className="px-4 py-2 text-sm text-gray-700 border-b">
                  <p className="font-bold truncate">{user?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                </div>
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); navigate('profile'); setIsDropdownOpen(false); }}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </a>
                {user?.isAdmin && (
                   <a
                    href="#"
                    onClick={(e) => { e.preventDefault(); navigate('admin-dashboard'); setIsDropdownOpen(false); }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Admin
                  </a>
                )}
                <button
                  onClick={() => { onLogout(); setIsDropdownOpen(false); }}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); navigate('cart'); }}
            className="hover:opacity-75 transition-opacity relative"
          >
            <EnvelopeIcon />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#B97C80] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;