import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function TopBar({ toggleSidebar, sidebarOpen }) {
    const { t } = useTranslation();

    return (
        <div className="bg-white shadow-sm z-10 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Left side with logo and toggle */}
                    <div className="flex items-center">
                        {/* Hamburger menu button - more visible now */}
                        <button
                            onClick={toggleSidebar}
                            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        >
                            <span className="sr-only">{sidebarOpen ? t('CloseSidebar') : t('OpenSidebar')}</span>
                            {/* Show different icon based on sidebar state */}
                            {sidebarOpen ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>

                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <img
                                className="h-8 w-auto"
                                src="/logo.svg"
                                alt={t('Crm.System')}
                            />
                            <span className="ml-2 font-semibold text-gray-900">{t('Crm.System')}</span>
                        </div>
                    </div>

                    {/* ...rest of your TopBar components... */}
                </div>
            </div>
        </div>
    );
}

export default TopBar;