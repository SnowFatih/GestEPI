import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { HiMenuAlt1 } from 'react-icons/hi';
import { TbChevronDown } from 'react-icons/tb';
import { Link, useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/contexts/auth';

import { Logo } from '@/components/atoms/Logo';

import { NavbarSubMenuItem } from './NavbarSubMenuItem';

type NavbarLink = {
  label: string;
  href: string;
};

interface NavbarProps {
  links: NavbarLink[];
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ links, onMenuClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, clearUser } = useAuthContext();
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onLogout = () => {
    clearUser();
    navigate('/login');
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent): void {
      const elementId = event.target instanceof Element ? event.target.id : '';
      if (ref.current && !ref.current.contains(event.target as Node) && elementId !== 'options-menu') {
        setIsMenuOpen(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  return (
    <nav className="flex items-center justify-between bg-hero-patterns bg-gray-700 border-b-2 border-slate-200 px-4 py-3 relative z-10">
      {onMenuClick && (
        <div className="sm:hidden">
          <HiMenuAlt1 className="w-7 h-7 text-white cursor-pointer relative" onClick={() => onMenuClick()} />
        </div>
      )}
      <div className="flex items-center">
        <div className="mr-4">
          <a href="/" className="text-xl font-bold flex flex-row gap-3 text-white h-[25px]">
            <Logo /> {t('app.name')}
          </a>
        </div>
        <div>
          {links.map((link) => (
            <Link to={link.href} className="mr-4">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      {user && (
        <div>
          {/* Dropdown avec bouton de déconnexion */}
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                id="options-menu"
                aria-expanded="true"
                aria-haspopup="true"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {user.email}
                <TbChevronDown className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {isMenuOpen && (
              <div
                className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[1001]"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
                ref={ref}
              >
                <hr />
                <NavbarSubMenuItem label={t('authentication.logout')} onClick={onLogout} />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
