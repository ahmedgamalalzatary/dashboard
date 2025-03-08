import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import SideBar from './SideBar';
import NavBar from './NavBar';

const Layout = ({ children, activePage, setActivePage }) => {
  const { i18n } = useTranslation();
  const [isRTL, setIsRTL] = useState(i18n.language === 'ar');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 770);

  useEffect(() => {
    setIsRTL(i18n.language === 'ar');
  }, [i18n.language]);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth <= 770;
      setIsMobile(isMobileView);
      if (!isMobileView) {
        setIsSidebarExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };

  return (
    <div className={`flex min-h-screen bg-gray-50 font-body ${isRTL ? 'direction-rtl' : 'direction-ltr'}`}
      dir={isRTL ? 'rtl' : 'ltr'}>
      
      {isMobile && isSidebarExpanded && (
        <div className="sidebar-overlay active" onClick={() => setIsSidebarExpanded(false)} />
      )}

      <div className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
        <SideBar
          activePage={activePage}
          setActivePage={(page) => {
            setActivePage(page);
            if (isMobile) setIsSidebarExpanded(false);
          }}
          isCollapsed={!isSidebarExpanded && isMobile}
        />
      </div>

      <div className="main-content">
        <NavBar
          setActivePage={setActivePage}
          toggleSidebar={toggleSidebar}
          isSidebarExpanded={isSidebarExpanded}
          isMobile={isMobile}
        />
        <div className="flex-1 overflow-y-auto relative">
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
