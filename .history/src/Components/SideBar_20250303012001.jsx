import { useTranslation } from 'react-i18next';
import { sidebarItems } from '../config/sidebarConfig';
import PropTypes from 'prop-types';

function SideBar({ activePage, setActivePage, collapsed }) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  
  return (
    <aside className={`h-screen bg-gradient-to-b from-[#1a1c2e] to-[#2d2f45] text-white
      transition-all duration-300 ease-in-out overflow-hidden
      ${collapsed ? 'w-16' : 'w-60'}`}>
      <nav className={`p-3 ${collapsed ? 'space-y-4' : 'space-y-1'}`}>
        {sidebarItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`w-full flex items-center rounded-lg transition-all duration-200
              ${collapsed ? 'justify-center p-2' : 'p-2 px-3'}
              ${activePage === item.id ? 'bg-white/10 text-white' : 'text-gray-400'}`}>
            <item.icon className={`flex-shrink-0 ${collapsed ? 'text-xl' : 'text-lg'}`} />
            {!collapsed && (
              <span className="menu-text ml-3 text-sm">{t(item.id)}</span>
            )}
          </button>
        ))}
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
