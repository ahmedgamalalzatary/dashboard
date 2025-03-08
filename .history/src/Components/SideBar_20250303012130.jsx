import { useTranslation } from 'react-i18next';
import { sidebarItems } from '../config/sidebarConfig';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

function SideBar({ activePage, setActivePage, collapsed }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 770);

  useEffect(() => {
    const handleResize = () => setIsSmallScreen(window.innerWidth <= 770);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const effectiveCollapsed = collapsed || isSmallScreen;

  return (
    <aside className={`
      h-screen bg-gradient-to-b from-[#1a1c2e] to-[#2d2f45] text-white
      transition-all duration-300 sidebar-transition overflow-hidden
      ${effectiveCollapsed ? 'w-14' : 'w-60'}
    `}>
      <div className={`
        border-b border-gray-700/50 pb-4
        transition-all duration-300 ease-in-out
        ${effectiveCollapsed ? 'py-3' : 'p-4'}
      <nav className={`
        overflow-y-auto h-[calc(100vh-4rem)] scrollbar-thin
        transition-all duration-300 ease-in-out
        ${collapsed ? 'px-1 py-2 space-y-2' : 'p-3 space-y-1.5'}
      `}>
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          
          // Make sure we get a string value from the translation
          const itemText = typeof t(item.id) === 'string' ? t(item.id) : item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              title={collapsed ? itemText : ''}
              className={`
                flex items-center w-full rounded-lg 
                transition-all duration-300 ease-in-out
                hover:shadow-md
                ${collapsed ? 'justify-center p-2.5' : 'py-2.5 px-3'}
                ${!collapsed && isRTL ? 'flex-row-reverse justify-start' : ''}
                ${isActive 
                  ? 'bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/10 animate-pulse-subtle' 
                  : 'hover:bg-white/5 text-gray-400 hover:text-white hover:translate-x-1'}
              `}
              style={{
                animationDelay: `${index * 100}ms`,
                transitionDelay: `${index * 50}ms`
              }}
              aria-current={isActive ? 'page' : undefined}
            >
              {!collapsed && isRTL ? (
                <>
                  <span className="text-sm font-medium transition-transform duration-300 ml-0 mr-auto">
                    {itemText}
                  </span>
                  <div className="flex-shrink-0 mr-0 ml-1.5">
                    <Icon className="text-lg" aria-hidden="true" />
                  </div>
                </>
              ) : !collapsed ? (
                <>
                  <div className="flex-shrink-0 mr-2 ml-0">
                    <Icon className="text-lg" aria-hidden="true" />
                  </div>
                  <span className="text-sm font-medium transition-transform duration-300 ml-0">
                    {itemText}
                  </span>
                </>
              ) : (
                <div className="flex-shrink-0">
                  <Icon className="text-lg" aria-hidden="true" />
                </div>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

SideBar.propTypes = {
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  collapsed: PropTypes.bool
};

export default SideBar;
