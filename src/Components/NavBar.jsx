import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MdSearch,
  MdNotifications,
  MdSettings,
  MdPerson,
  MdLanguage,
  MdMenu,
  MdChevronLeft,
  MdChevronRight,
  MdChat
} from 'react-icons/md';
import PropTypes from 'prop-types';
import NotificationsPopup from './NotificationsPopup';
import Button from './UI/Button';

function NavBar({
  setActivePage,
  toggleSidebar = () => { },
  isSidebarCollapsed = false,
  isMobile = false
}) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const notifications = [
    { message: 'New order received', time: '2 minutes ago' },
    { message: 'Meeting reminder', time: '1 hour ago' },
    { message: 'Stock update required', time: '3 hours ago' },
  ];

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <nav className="bg-white shadow-sm py-3 px-3 sticky top-0 z-10 font-body">
      <div className="flex items-center justify-between h-10">
        {/* Left section with toggle and title */}
        <div className="flex items-center">
          {/* Sidebar toggle button - UPDATED for more visibility */}
          <Button
            onClick={toggleSidebar}
            variant="secondary"
            size="sm"
            className="rounded-md border border-gray-300 shadow-sm hover:shadow-md transition-all duration-300 hover:border-gray-400"
            aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            icon={isRTL ? 
              (isSidebarCollapsed ? <MdChevronRight className="text-xl text-gray-700" /> : <MdChevronLeft className="text-xl text-gray-700" />) : 
              (isSidebarCollapsed ? <MdChevronRight className="text-xl text-gray-700" /> : <MdChevronLeft className="text-xl text-gray-700" />)
            }
          />
          
          {/* Mobile menu button - only visible on mobile */}
          {isMobile && (
            <Button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              variant="ghost"
              size="sm"
              className="ml-2 md:hidden"
              aria-label="Toggle mobile menu"
              icon={<MdMenu className="text-xl" />}
            />
          )}
          
          {/* Mobile title - only visible on mobile */}
          <h1 className="text-lg font-medium ml-3 sm:hidden">CRM</h1>
        </div>
        
        {/* Center section with search bar */}
        <div className="hidden sm:flex flex-1 max-w-xl mx-4 lg:mx-8">
          <div className="relative w-full">
            <input
              type="text"
              placeholder={t('search')}
              className={`
                font-body w-full h-10 py-2 rounded-lg border border-gray-300
                focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
                ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}
              `}
              aria-label="Search"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <MdSearch className={`
              absolute top-2.5 text-gray-400 text-xl
              ${isRTL ? 'right-3' : 'left-3'}
            `} />
          </div>
        </div>
        
        {/* Right section with user actions - added spacing */}
        <div className="flex items-center space-x-4">
          {/* Search button for mobile */}
          <Button 
            variant="ghost"
            size="sm"
            className="sm:hidden"
            icon={<MdSearch className="text-xl" />}
          />
          
          {/* Language toggle */}
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="sm"
            className="hidden md:flex items-center"
            aria-label="Change language"
            icon={<MdLanguage className="text-xl" />}
          >
            <span className="ml-1 hidden lg:inline">
              {i18n.language === 'en' ? 'العربية' : 'English'}
            </span>
          </Button>
          
          {/* Notifications */}
          <div className="relative">
            <Button
              onClick={() => setShowNotifications(!showNotifications)}
              variant="ghost"
              size="sm"
              className="relative"
              aria-label="Notifications"
              icon={<MdNotifications className="text-xl" />}
            >
              <span className={`
                absolute -top-1 ${isRTL ? '-left-1' : '-right-1'} 
                h-4 w-4 bg-gray-900 rounded-full text-xs text-white 
                flex items-center justify-center
              `}>
                {notifications.length}
              </span>
            </Button>
            
            {showNotifications && (
              <NotificationsPopup
                notifications={notifications}
                onClose={() => setShowNotifications(false)}
              />
            )}
          </div>
          
          {/* Settings */}
          <Button
            onClick={() => setActivePage('settings')}
            variant="ghost"
            size="sm"
            aria-label="Settings"
            icon={<MdSettings className="text-xl" />}
          />
          
          {/* User profile */}
          <div className={`
            flex items-center ml-4 pl-4
            ${isRTL ? 'border-r' : 'border-l'}
            border-gray-300
          `}>
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 
                  flex items-center justify-center text-white">
              <MdPerson className="text-sm" />
            </div>
            <div className="hidden lg:flex flex-col ml-2">
              <span className="text-xs font-medium text-gray-700">Admin User</span>
              <span className="text-[10px] text-gray-400">admin@example.com</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile search - only visible on small screens when menu is open */}
      <div className={`pt-3 sm:hidden ${showMobileMenu ? 'block' : 'hidden'}`}>
        <div className="relative">
          <input
            type="text"
            placeholder={t('search')}
            className={`
              w-full h-10 py-2 rounded-lg border border-gray-300
              focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500
              ${isRTL ? 'pr-10 pl-4 text-right' : 'pl-10 pr-4'}
            `}
            aria-label="Search"
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <MdSearch className={`
            absolute top-2.5 text-gray-400 text-xl
            ${isRTL ? 'right-3' : 'left-3'}
          `} />
        </div>
        
        {/* Mobile menu items */}
        <div className="mt-3 py-2 border-t border-gray-200">
          <Button
            onClick={toggleLanguage}
            variant="ghost"
            size="md"
            fullWidth
            className="text-left my-1"
            icon={<MdLanguage className="text-gray-500" />}
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </Button>
          
          <Button
            onClick={() => setActivePage('settings')}
            variant="ghost"
            size="md"
            fullWidth
            className="text-left my-1"
            icon={<MdSettings className="text-gray-500" />}
          >
            {t('settings')}
          </Button>

          <Button
            onClick={() => setActivePage('support')}
            variant="ghost"
            size="md" 
            fullWidth
            className="text-left my-1"
            icon={<MdChat className="text-gray-500" />}
          >
            {t('support')}
          </Button>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  setActivePage: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
  isSidebarCollapsed: PropTypes.bool,
  isMobile: PropTypes.bool
};

export default NavBar;
