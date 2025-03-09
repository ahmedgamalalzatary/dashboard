import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { 
  // ...existing imports...
} from 'react-icons/md';

function Sidebar({ open, setOpen, activePage, setActivePage, isMobile }) {
  const { t, i18n } = useTranslation();

  // Handle navigation
  const handleNavigate = (page) => {
    setActivePage(page);
    // Close sidebar automatically when navigating on mobile/smaller screens
    if (isMobile) {
      setOpen(false);
    }
  };

  // ...existing code...

  return (
    <>
      {/* Backdrop overlay - only shown on mobile when sidebar is open */}
      {isMobile && open && (
        <div 
          className="fixed inset-0 bg-black/40 z-20"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Sidebar component */}
      <aside 
        className={`fixed inset-y-0 ${i18n.language === 'ar' ? 'right-0' : 'left-0'} z-30
          w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`}
      >
        <div className="h-full flex flex-col">
          {/* Close button for mobile view */}
          {isMobile && (
            <button 
              className={`absolute top-4 ${i18n.language === 'ar' ? 'left-4' : 'right-4'} text-gray-500`}
              onClick={() => setOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Logo and brand section */}
          <div className="p-4 flex items-center justify-center border-b">
            {/* ...existing logo code... */}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            {/* ...existing navigation code... */}
          </nav>

          {/* Bottom section with language and theme toggles */}
          <div className="p-4 border-t">
            {/* ...existing bottom section code... */}
          </div>
        </div>
      </aside>
    </>
  );
}

Sidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  activePage: PropTypes.string.isRequired,
  setActivePage: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired
};

export default Sidebar;