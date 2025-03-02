import {
    MdDashboard,
    MdPointOfSale,
    MdShoppingCart,
    MdEventNote,
    MdPeople,
    MdBadge,
    MdEvent,
    MdInsights,
    MdSettings,
    MdSupport,
    MdQuestionAnswer,
    MdInventory,
    MdShoppingBasket
} from 'react-icons/md'

export const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { id: 'sales', label: 'Sales', icon: MdPointOfSale },
    { id: 'products', label: 'Products', icon: MdShoppingBasket },
    { id: 'inventory', label: 'Inventory', icon: MdInventory },
    { id: 'orders', label: 'Orders', icon: MdShoppingCart },
    { id: 'reservation', label: 'Reservation', icon: MdEventNote },
    { id: 'clients', label: 'Clients', icon: MdPeople },
    { id: 'employees', label: 'Employees', icon: MdBadge },
    { id: 'events', label: 'Events', icon: MdEvent },
    { id: 'reports', label: 'Reports', icon: MdInsights },
    { id: 'settings', label: 'Settings', icon: MdSettings },
    { id: 'support', label: 'Support', icon: MdSupport },
    { id: 'faq', label: 'FAQ', icon: MdQuestionAnswer }
]
