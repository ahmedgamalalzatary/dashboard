import { useState, useEffect } from 'react';
import { MdPerson, MdNotifications, MdSecurity, MdLanguage, MdBrightness6, MdBackup, MdSave, MdEdit, MdCheck } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';

function Settings() {
    const { t, i18n } = useTranslation();
    const [animateItems, setAnimateItems] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');
    
    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Effect to change language and document direction
    useEffect(() => {
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
            document.documentElement.dir = selectedLanguage === 'ar' ? 'rtl' : 'ltr';
        }
    }, [selectedLanguage, i18n]);

    const settingsTabs = [
        { id: 'profile', icon: MdPerson, title: t('Settings.Tabs.Profile') },
        { id: 'notifications', icon: MdNotifications, title: t('Settings.Tabs.Notifications') },
        { id: 'security', icon: MdSecurity, title: t('Settings.Tabs.Security') },
        { id: 'appearance', icon: MdBrightness6, title: t('Settings.Tabs.Appearance') },
        { id: 'language', icon: MdLanguage, title: t('Settings.Tabs.Language') },
        { id: 'backup', icon: MdBackup, title: t('Settings.Tabs.BackupData') },
    ];

    const renderTabContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-2xl">
                                <MdPerson className="text-3xl" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-1">Admin User</h3>
                                <p className="text-gray-500">admin@example.com</p>
                                <Button 
                                    variant="secondary"
                                    className="mt-2 flex items-center gap-1.5 text-sm"
                                >
                                    <MdEdit className="text-sm" />
                                    {t('Settings.Profile.ChangePhoto')}
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Profile.FirstName')}
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        defaultValue="Admin"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Profile.Email')}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        defaultValue="admin@example.com"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Profile.LastName')}
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        defaultValue="User"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Profile.Phone')}
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        placeholder="+1 (123) 456-7890"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                                {t('Settings.Profile.Bio')}
                            </label>
                            <textarea
                                id="bio"
                                rows={3}
                                placeholder={t('Settings.Profile.WriteBio')}
                                className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button 
                                variant="primary"
                                className="flex items-center gap-2"
                            >
                                <MdSave />
                                {t('Settings.Profile.SaveChanges')}
                            </Button>
                        </div>
                    </div>
                );
                
            case 'notifications':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">{t('Settings.Notifications.Email')}</h3>
                        <div className="space-y-4">
                            {[
                                { id: 'newOrders', label: t('Settings.Notifications.Types.NewOrders') },
                                { id: 'orderStatus', label: t('Settings.Notifications.Types.OrderStatus') },
                                { id: 'inventoryAlerts', label: t('Settings.Notifications.Types.InventoryAlerts') },
                                { id: 'customerSupport', label: t('Settings.Notifications.Types.CustomerSupport') },
                                { id: 'systemUpdates', label: t('Settings.Notifications.Types.SystemUpdates') }
                            ].map(item => (
                                <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                    <span className="text-gray-800">{item.label}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">{t('Settings.Notifications.Push')}</h3>
                            <div className="space-y-4">
                                {[
                                    { id: 'desktop', label: t('Settings.Notifications.Types.Desktop') },
                                    { id: 'mobile', label: t('Settings.Notifications.Types.Mobile') }
                                ].map(item => (
                                    <div key={item.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                        <span className="text-gray-800">{item.label}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
                
            case 'security':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">{t('Settings.Security.ChangePassword')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Security.CurrentPassword')}
                                    </label>
                                    <input
                                        type="password"
                                        id="currentPassword"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Security.NewPassword')}
                                    </label>
                                    <input
                                        type="password"
                                        id="newPassword"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Security.ConfirmPassword')}
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <Button variant="primary">{t('Settings.Security.UpdatePassword')}</Button>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">{t('Settings.Security.TwoFactor.Title')}</h3>
                            <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                <div>
                                    <p className="font-medium text-gray-800">{t('Settings.Security.TwoFactor.Title')}</p>
                                    <p className="text-sm text-gray-500 mt-1">{t('Settings.Security.TwoFactor.Description')}</p>
                                </div>
                                <Button variant="secondary">{t('Settings.Security.TwoFactor.Enable')}</Button>
                            </div>
                        </div>
                    </div>
                );
                
            case 'appearance':
                return (
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">{t('Settings.Appearance.Theme.Title')}</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                                    <div>
                                        <p className="font-medium text-gray-800">{t('Settings.Appearance.Theme.DarkMode')}</p>
                                        <p className="text-sm text-gray-500 mt-1">{t('Settings.Appearance.Theme.DarkModeDesc')}</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input 
                                            type="checkbox" 
                                            checked={darkMode}
                                            onChange={() => setDarkMode(!darkMode)}
                                            className="sr-only peer" 
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                
                                <div className="p-3 border rounded-lg">
                                    <p className="font-medium text-gray-800 mb-3">{t('Settings.Appearance.Theme.ColorScheme')}</p>
                                    <div className="flex items-center space-x-3">
                                        {['bg-blue-600', 'bg-purple-600', 'bg-green-600', 'bg-red-600', 'bg-yellow-600'].map((color, idx) => (
                                            <div 
                                                key={idx} 
                                                className={`${color} w-8 h-8 rounded-full cursor-pointer ${idx === 0 ? 'ring-2 ring-offset-2 ring-blue-600' : ''}`}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">{t('Settings.Appearance.Layout.Title')}</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="border p-4 rounded-lg cursor-pointer bg-gray-50 ring-2 ring-blue-500">
                                    <p className="font-medium text-center mb-2">{t('Settings.Appearance.Layout.CompactView')}</p>
                                    <div className="h-20 bg-gray-200 rounded flex flex-col">
                                        <div className="h-3 w-full bg-gray-300 mb-1"></div>
                                        <div className="flex-1 flex gap-1 p-1">
                                            {[1,2,3,4].map(n => (
                                                <div key={n} className="flex-1 bg-gray-300 rounded"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="border p-4 rounded-lg cursor-pointer">
                                    <p className="font-medium text-center mb-2">{t('Settings.Appearance.Layout.ExpandedView')}</p>
                                    <div className="h-20 bg-gray-200 rounded flex flex-col">
                                        <div className="h-3 w-full bg-gray-300 mb-1"></div>
                                        <div className="flex-1 flex flex-col gap-1 p-1">
                                            {[1,2].map(n => (
                                                <div key={n} className="flex-1 bg-gray-300 rounded"></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                
            case 'language':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-4">{t('Settings.Language.Title')}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { code: 'en', name: t('Settings.Languages.English'), flag: '🇺🇸', description: 'English (US)' },
                                { code: 'es', name: t('Settings.Languages.Spanish'), flag: '🇪🇸', description: 'Spanish' },
                                { code: 'fr', name: t('Settings.Languages.French'), flag: '🇫🇷', description: 'French' },
                                { code: 'de', name: t('Settings.Languages.German'), flag: '🇩🇪', description: 'German' },
                                { code: 'ar', name: t('Settings.Languages.Arabic'), flag: '🇸🇦', description: 'Arabic (RTL)' },
                                { code: 'zh', name: t('Settings.Languages.Chinese'), flag: '🇨🇳', description: 'Chinese (Simplified)' }
                            ].map((language) => {
                                const isSelected = selectedLanguage === language.code;
                                return (
                                    <div 
                                        key={language.code}
                                        className={`
                                            flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all duration-300
                                            ${isSelected ? 'bg-blue-50 border-blue-500 shadow-sm' : 'hover:bg-gray-50'}
                                        `}
                                        onClick={() => setSelectedLanguage(language.code)}
                                    >
                                        <div className="flex items-center">
                                            <div className="text-2xl mr-3">{language.flag}</div>
                                            <div>
                                                <p className="font-medium text-gray-800">{language.name}</p>
                                                <p className="text-sm text-gray-500">{language.description}</p>
                                            </div>
                                        </div>
                                        {isSelected && <MdCheck className="text-blue-600 text-xl" />}
                                    </div>
                                );
                            })}
                        </div>
                        
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">{t('Settings.Language.DateTimeFormat')}</h3>
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="dateFormat" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Language.DateFormat')}
                                    </label>
                                    <select
                                        id="dateFormat"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="MM/DD/YYYY">{t('Settings.Language.Options.DateFormats.US')}</option>
                                        <option value="DD/MM/YYYY">{t('Settings.Language.Options.DateFormats.EU')}</option>
                                        <option value="YYYY-MM-DD">{t('Settings.Language.Options.DateFormats.ISO')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="timeFormat" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Language.TimeFormat')}
                                    </label>
                                    <select
                                        id="timeFormat"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="12h">{t('Settings.Language.Options.TimeFormats.H12')}</option>
                                        <option value="24h">{t('Settings.Language.Options.TimeFormats.H24')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                                        {t('Settings.Language.TimeZone')}
                                    </label>
                                    <select
                                        id="timezone"
                                        className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                    >
                                        <option value="UTC-8">{t('Settings.Language.Options.TimeZones.Pacific')}</option>
                                        <option value="UTC-5">{t('Settings.Language.Options.TimeZones.Eastern')}</option>
                                        <option value="UTC+0">{t('Settings.Language.Options.TimeZones.London')}</option>
                                        <option value="UTC+1">{t('Settings.Language.Options.TimeZones.Paris')}</option>
                                        <option value="UTC+3">{t('Settings.Language.Options.TimeZones.Moscow')}</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className="mt-6 flex justify-end">
                                <Button 
                                    variant="primary"
                                    className="flex items-center gap-2"
                                >
                                    <MdSave />
                                    {t('Settings.Language.SaveLanguageSettings')}
                                </Button>
                            </div>
                        </div>
                    </div>
                );
                
            case 'backup':
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-4">{t('Settings.Backup.Title')}</h3>
                        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                            <p className="text-sm text-blue-700">
                                {t('Settings.Backup.InfoMessage')}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">{t('Settings.Backup.Manual.Title')}</h4>
                                <p className="text-sm text-gray-600 mb-4">{t('Settings.Backup.Manual.Description')}</p>
                                <div className="flex space-x-2">
                                    <Button variant="secondary" className="flex-1">CSV</Button>
                                    <Button variant="secondary" className="flex-1">Excel</Button>
                                </div>
                            </div>
                            
                            <div className="border rounded-lg p-4">
                                <h4 className="font-medium text-gray-800 mb-2">{t('Settings.Backup.Scheduled.Title')}</h4>
                                <p className="text-sm text-gray-600 mb-4">{t('Settings.Backup.Scheduled.Description')}</p>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm font-medium">{t('Settings.Backup.Scheduled.Enable')}</span>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                    </label>
                                </div>
                                <select className="w-full p-2 border rounded-lg">
                                    <option>{t('Settings.Backup.Frequency.Weekly')}</option>
                                    <option>{t('Settings.Backup.Frequency.Monthly')}</option>
                                    <option>{t('Settings.Backup.Frequency.Quarterly')}</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="border-t pt-6">
                            <h3 className="text-lg font-semibold mb-4">{t('Settings.Backup.DataManagement.Title')}</h3>
                            <div className="space-y-4">
                                <div className="p-4 border rounded-lg flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-800">{t('Settings.Backup.DataManagement.Import.Title')}</p>
                                        <p className="text-sm text-gray-500">{t('Settings.Backup.DataManagement.Import.Description')}</p>
                                    </div>
                                    <Button variant="secondary">{t('Settings.Backup.DataManagement.Import.Button')}</Button>
                                </div>
                                
                                <div className="p-4 border border-red-200 rounded-lg flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-red-600">{t('Settings.Backup.DataManagement.Delete.Title')}</p>
                                        <p className="text-sm text-red-500">{t('Settings.Backup.DataManagement.Delete.Description')}</p>
                                    </div>
                                    <Button 
                                        variant="secondary" 
                                        className="border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                        {t('Settings.Backup.DataManagement.Delete.Button')}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
                
            default:
                return (
                    <div className="p-6 text-center text-gray-500">
                        {t('Settings.DefaultMessage', 'Select a settings category from the tabs above')}
                    </div>
                );
        }
    };

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-gray-800 transition-all duration-300 ease-in-out">
                {t('Settings.Title')}
            </h2>

            {/* Quick Settings Toggles */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                <Card hover className="transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg">
                                <MdNotifications className="text-xl text-blue-600" />
                            </div>
                            <span className="text-gray-800">{t('Settings.QuickSettings.EmailNotifications')}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={emailNotifications}
                                onChange={() => setEmailNotifications(!emailNotifications)}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </Card>
                <Card hover className="transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg">
                                <MdBrightness6 className="text-xl text-purple-600" />
                            </div>
                            <span className="text-gray-800">{t('Settings.QuickSettings.DarkMode')}</span>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                checked={darkMode}
                                onChange={() => setDarkMode(!darkMode)}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                    </div>
                </Card>
                <Card hover className="transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg">
                                <MdLanguage className="text-xl text-green-600" />
                            </div>
                            <span className="text-gray-800">{t('Settings.QuickSettings.Language')}</span>
                        </div>
                        <select 
                            className="py-2 px-3 border rounded-lg focus:ring-1 focus:ring-blue-500 bg-white"
                            value={selectedLanguage}
                            onChange={(e) => setSelectedLanguage(e.target.value)}
                        >
                            <option value="en">{t('Settings.Languages.English')}</option>
                            <option value="es">{t('Settings.Languages.Spanish')}</option>
                            <option value="fr">{t('Settings.Languages.French')}</option>
                            <option value="ar">{t('Settings.Languages.Arabic')}</option>
                        </select>
                    </div>
                </Card>
            </div>

            {/* Settings Tabs */}
            <div className={`
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '200ms' }}
            >
                <Card>
                    <div className="flex flex-wrap border-b overflow-x-auto whitespace-nowrap">
                        {settingsTabs.map((tab, index) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    className={`
                                        px-6 py-3 flex items-center gap-2 transition-colors duration-200
                                        ${isActive 
                                            ? 'border-b-2 border-blue-600 text-blue-600' 
                                            : 'text-gray-500 hover:text-gray-800'
                                        }
                                    `}
                                    onClick={() => setActiveTab(tab.id)}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    <Icon className="text-xl" />
                                    <span className="font-medium">{tab.title}</span>
                                </button>
                            );
                        })}
                    </div>
                    <div className="p-6">
                        {renderTabContent()}
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Settings;