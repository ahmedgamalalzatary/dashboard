import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';

function Sidebar({ open, setOpen, activePage, setActivePage, isMobile }) {
    const { t } = useTranslation();

    const handleNavigate = (page) => {
        setActivePage(page);
        // Auto close sidebar when navigating on mobile/smaller screens
        if (isMobile) {
            setOpen(false);
        }
    };

    return (
        <>
            {/* Overlay for mobile - shown when sidebar is open on mobile */}
            {open && isMobile && (
                <div
                    className="fixed inset-0 bg-gray-600 bg-opacity-50 z-20 transition-opacity"
                    onClick={() => setOpen(false)}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar component */}
            <div
                className={`fixed inset-y-0 ${i18n.language === 'ar' ? 'right-0' : 'left-0'} z-30
          w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : i18n.language === 'ar' ? 'translate-x-full' : '-translate-x-full'}`}
            >
                {/* Add close button for mobile */}
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

                {/* Sidebar content */}
                <nav className="mt-10">
                    <ul>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'dashboard' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('dashboard')}
                            >
                                {t('dashboard')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'sales' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('sales')}
                            >
                                {t('sales')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'products' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('products')}
                            >
                                {t('products')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'inventory' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('inventory')}
                            >
                                {t('inventory')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'orders' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('orders')}
                            >
                                {t('orders')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'reservation' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('reservation')}
                            >
                                {t('reservation')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'clients' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('clients')}
                            >
                                {t('clients')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'employees' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('employees')}
                            >
                                {t('employees')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'events' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('events')}
                            >
                                {t('events')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'reports' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('reports')}
                            >
                                {t('reports')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'settings' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('settings')}
                            >
                                {t('settings')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'support' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('support')}
                            >
                                {t('support')}
                            </button>
                        </li>
                        <li>
                            <button
                                className={`w-full text-left px-4 py-2 ${activePage === 'faq' ? 'bg-gray-200' : ''}`}
                                onClick={() => handleNavigate('faq')}
                            >
                                {t('faq')}
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}

export default Sidebar;