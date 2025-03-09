import { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import { useTranslation } from 'react-i18next';

function Layout({ children, activePage, setActivePage }) {
  const { i18n } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle sidebar state based on screen width
  useEffect(() => {
    const handleResize = () => {
      // Set mobile state based on window width
      const isMobileView = window.innerWidth <= 1200;
      setIsMobile(isMobileView);
      
      // Automatically collapse sidebar on smaller screens
      if (isMobileView) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Call handler right away so state gets updated with initial window size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty dependency array ensures this runs once on mount
  
  // Set the direction based on the language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          open={sidebarOpen} 
          setOpen={setSidebarOpen} 
          activePage={activePage} 
          setActivePage={setActivePage}
          isMobile={isMobile}
        />
        <main className={`flex-1 overflow-auto transition-all duration-300 p-4 sm:p-6 ${
          sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'
        } ${i18n.language === 'ar' ? (sidebarOpen ? 'mr-0 md:mr-64' : 'mr-0') : ''}`}>
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
