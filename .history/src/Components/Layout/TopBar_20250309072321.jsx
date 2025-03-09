import { useState, useRef, useEffect } from 'react';
import { MdOutlineMenu, MdNotifications, MdOutlineLanguage, MdHelpOutline } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

function TopBar({ toggleSidebar, sidebarOpen }) {
  const { t } = useTranslation();
  // ...existing code...

  return (
    <header className="bg-white shadow-sm z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and menu toggle */}
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
            >
              <MdOutlineMenu className="h-6 w-6" />
            </button>
            
            {/* Logo */}
            <div className="ml-4 flex items-center">
              <span className="text-lg font-semibold text-gray-900">{t('Crm.System')}</span>
            </div>
          </div>
          
          {/* Right side - user actions */}
          <div className="flex items-center">
            {/* ...existing code... */}
          </div>
        </div>
      </div>
    </header>
  );
}

TopBar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  sidebarOpen: PropTypes.bool.isRequired
};

export default TopBar;