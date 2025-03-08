import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SideBar from './SideBar';
import NavBar from './NavBar';

const Layout = ({ children, activePage, setActivePage }) => {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsRTL(i18n.language === 'ar');
  }, [i18n.language]);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 770;
      setIsMobile(isMobileView);
      if (!isMobileView) {
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen);
    } else {
      setSidebarCollapsed(prev => !prev);
    }
  };

  return (
    <div className={`flex h-screen bg-gray-50 font-body ${isRTL ? 'direction-rtl' : 'direction-ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}>
      <div className={`overlay ${isMobileMenuOpen ? 'show' : ''}`} onClick={() => setIsMobileMenuOpen(false)} />
      <div className={`sidebar ${isMobileMenuOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <SideBar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            if (isMobile) setIsMobileMenuOpen(false);
          }}
          collapsed={sidebarCollapsed}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar
          setActivePage={setActivePage}
          toggleSidebar={toggleSidebar}
          isSidebarCollapsed={sidebarCollapsed}
          isMobile={isMobile}
        />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired
};

export default Layout;
