import { useState, useCallback, useMemo, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import {
    MdTrendingUp, MdPeople, MdShoppingCart, MdAttachMoney,
    MdArrowUpward, MdArrowDownward, MdCalendarToday,
    MdAccessTime, MdMoreVert, MdChat, MdPhone
} from 'react-icons/md';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Alerts from '../Components/UI/Alerts';

function DashBoard({ setActivePage }) {
    const { t } = useTranslation();
    
    // Fix 1: Order of declarations - showTemporaryNotification was being used before declaration
    // Show temporary notification helper - moved to the top
    const showTemporaryNotification = useCallback((message) => {
        setNotificationMessage(message);
        setShowNotification(true);
    }, []);
    
    // State for interactive elements
    const [activeTimeframe, setActiveTimeframe] = useState('monthly');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [chartData, setChartDataState] = useState('sales'); // Fix 2: Renamed state setter to avoid variable name collision
    const [showCalendarView, setShowCalendarView] = useState(false);
    const [filterApplied, setFilterApplied] = useState(false);

    // Fix 3: Move timeframeData after initialization of showTemporaryNotification
    const timeframeData = useMemo(() => {
        // Weekly data
        const weeklyData = [
            { name: 'Mon', sales: 1200, orders: 800, revenue: 900 },
            { name: 'Tue', sales: 1400, orders: 900, revenue: 1100 },
            { name: 'Wed', sales: 1000, orders: 750, revenue: 800 },
            { name: 'Thu', sales: 1500, orders: 950, revenue: 1200 },
            { name: 'Fri', sales: 1700, orders: 1100, revenue: 1400 },
            { name: 'Sat', sales: 1300, orders: 850, revenue: 1000 },
            { name: 'Sun', sales: 900, orders: 650, revenue: 700 },
        ];

        // Monthly data
        const monthlyData = [
            { name: 'Jan', sales: 4200, orders: 2400, revenue: 2400 },
            { name: 'Feb', sales: 3100, orders: 1398, revenue: 2210 },
            { name: 'Mar', sales: 2400, orders: 9800, revenue: 2290 },
            { name: 'Apr', sales: 2700, orders: 3908, revenue: 2000 },
            { name: 'May', sales: 1900, orders: 4800, revenue: 2181 },
            { name: 'Jun', sales: 2600, orders: 3800, revenue: 2500 },
        ];

        // Yearly data
        const yearlyData = [
            { name: '2019', sales: 32000, orders: 18000, revenue: 28000 },
            { name: '2020', sales: 28000, orders: 16000, revenue: 24000 },
            { name: '2021', sales: 34000, orders: 19500, revenue: 31000 },
            { name: '2022', sales: 39000, orders: 22000, revenue: 36000 },
            { name: '2023', sales: 42000, orders: 24000, revenue: 40000 },
        ];

        // Fix 4: Using simple strings for names instead of translations which might be causing issues
        return { weeklyData, monthlyData, yearlyData };
    }, []);

    // Fix 5: Simplify currentData to avoid potential translation issues
    const currentData = useMemo(() => {
        switch (activeTimeframe) {
            case 'weekly':
                return timeframeData.weeklyData;
            case 'yearly':
                return timeframeData.yearlyData;
            case 'monthly':
            default:
                return timeframeData.monthlyData;
        }
    }, [activeTimeframe, timeframeData]);

    // Fix 6: Simplify stats to avoid translation issues
    const stats = [
        { title: 'Total Sales', value: '$54,239', icon: MdAttachMoney, color: 'bg-green-100 text-green-800' },
        { title: 'Total Orders', value: '1,253', icon: MdShoppingCart, color: 'bg-blue-100 text-blue-800' },
        { title: 'New Clients', value: '342', icon: MdPeople, color: 'bg-purple-100 text-purple-800' },
        { title: 'Growth', value: '+12.5%', icon: MdTrendingUp, color: 'bg-yellow-100 text-yellow-800' },
    ];

    // Fix 7: Simplify transactions data to avoid translation issues
    const recentTransactions = [
        { id: 1, customer: 'John Doe', amount: 1200, status: 'Completed', trend: 'up' },
        { id: 2, customer: 'Jane Smith', amount: 850, status: 'Pending', trend: 'down' },
        { id: 3, customer: 'Bob Johnson', amount: 2300, status: 'Completed', trend: 'up' },
        { id: 4, customer: 'Alice Williams', amount: 1750, status: 'Processing', trend: 'up' },
        { id: 5, customer: 'Tom Brown', amount: 920, status: 'Pending', trend: 'down' },
    ];

    // Fix 8: Simplify quickActions data to avoid translation issues
    const quickActions = useMemo(() => [
        { 
            label: 'Add Sale',
            page: 'sales',
            icon: MdAttachMoney,
            description: 'Navigate to sales page'
        },
        { 
            label: 'Add Product',
            page: 'products',
            icon: MdShoppingCart,
            description: 'Navigate to products page'
        },
        { 
            label: 'Add Client',
            page: 'clients', 
            icon: MdPeople,
            description: 'Navigate to clients page'
        },
        { 
            label: 'View All',
            isNotification: true,
            icon: MdTrendingUp,
            notificationText: 'Reports dashboard coming soon'
        }
    ], []);

    // Fix 9: Safe navigation handler - checks if setActivePage exists
    const navigateToPage = useCallback((pageName) => {
        if (typeof setActivePage !== 'function') {
            console.error('setActivePage is not a function!', setActivePage);
            return;
        }
        
        console.log(`DashBoard: Navigating to page "${pageName}"`);
        showTemporaryNotification(`Navigating to ${pageName} page`);
        setActivePage(pageName);
    }, [setActivePage, showTemporaryNotification]);

    // Fix 10: Simplify upcoming tasks to avoid translation issues
    const upcomingTasks = [
        { task: 'Review Sales', due: 'Today', priority: 'high' },
        { task: 'Client Meeting', due: 'Tomorrow', priority: 'medium' },
        { task: 'Team Sync', due: 'Wednesday', priority: 'normal' },
        { task: 'Update Inventory', due: 'Friday', priority: 'high' }
    ];

    // Fix 11: Simplify sale distribution to avoid translation issues
    const saleDistribution = [
        { name: 'Online', value: 65 },
        { name: 'In-Store', value: 25 },
        { name: 'Phone', value: 10 }
    ];

    // Fix 12: Simplify pie data to avoid translation issues
    const pieData = [
        { name: 'Revenue', value: 75, color: '#4F46E5' },
        { name: 'Customers', value: 65, color: '#34D399' },
        { name: 'Sales', value: 85, color: '#F59E0B' },
    ];

    // Handler for hiding notification
    const hideNotification = useCallback(() => {
        setShowNotification(false);
    }, []);

    // Handler functions for timeframe buttons
    const handleTimeframeChange = useCallback((timeframe) => {
        setActiveTimeframe(timeframe);
        showTemporaryNotification(`${timeframe.charAt(0).toUpperCase() + timeframe.slice(1)} data loaded`);
    }, [showTemporaryNotification]);

    // Chart data toggle handler - Fix 13: Fixed function to use setChartDataState
    const handleChartDataToggle = useCallback(() => {
        const newChartType = chartData === 'sales' ? 'orders' : 'sales';
        setChartDataState(newChartType);
        showTemporaryNotification(`Showing ${newChartType} data`);
    }, [chartData, showTemporaryNotification]);

    // Task completion handler
    const handleTaskCompletion = useCallback((taskIdx) => {
        setCompletedTasks(prev => {
            if (prev.includes(taskIdx)) {
                showTemporaryNotification('Task marked as incomplete');
                return prev.filter(id => id !== taskIdx);
            } else {
                showTemporaryNotification('Task completed');
                return [...prev, taskIdx];
            }
        });
    }, [showTemporaryNotification]);

    // Calendar view toggle
    const toggleCalendarView = useCallback(() => {
        setShowCalendarView(prev => {
            showTemporaryNotification(prev ? 'List view activated' : 'Calendar view activated');
            return !prev;
        });
    }, [showTemporaryNotification]);

    // Debug listener to verify setActivePage is working
    useEffect(() => {
        console.log('Dashboard mounted, setActivePage available:', typeof setActivePage === 'function');
        
        // Fix 14: Check for DOM container to ensure page is actually rendering
        const rootElement = document.getElementById('root');
        if (rootElement) {
            console.log('Root element found, rendering should work');
        } else {
            console.error('Root element not found, rendering may fail');
        }
        
        return () => console.log('Dashboard unmounting');
    }, [setActivePage]);

    // View all transactions
    const viewAllTransactions = useCallback(() => {
        showTemporaryNotification('Viewing all sales transactions');
        console.log('Navigating to sales page for all transactions');
        // Fix 15: Safe navigation call
        if (typeof setActivePage === 'function') {
            setActivePage('sales');
        } else {
            console.error('setActivePage function not available');
        }
    }, [setActivePage, showTemporaryNotification]);

    // Fix 16: Return a simpler structure temporarily to troubleshoot rendering issues
    return (
        <div className="space-y-6 max-w-full overflow-x-hidden">
            {/* Notification using the Alerts component */}
            <Alerts 
                message={notificationMessage}
                show={showNotification}
                onHide={hideNotification}
                position="top-20"
                duration={3000}
            />

            {/* Key Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={index}
                            hover
                            className="flex-1"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-500 truncate">{stat.title}</p>
                                    <p className="text-2xl font-semibold mt-1 truncate">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-full flex-shrink-0 ${stat.color}`}>
                                    <Icon className="text-2xl" />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Quick Actions Section - Simplified to debug */}
            <Card hover>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                    {quickActions.map((action) => (
                        <Button
                            key={action.label}
                            variant="secondary"
                            onClick={() => {
                                console.log("Quick action clicked:", action);
                                if (action.isNotification) {
                                    showTemporaryNotification(action.notificationText || 'Reports dashboard coming soon');
                                } else {
                                    navigateToPage(action.page);
                                }
                            }}
                            className="flex items-center justify-center gap-2"
                            icon={<action.icon className="text-gray-500" />}
                        >
                            {action.label}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Support Section - Simplified to debug */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold mb-2">Need Assistance?</h3>
                        <p>Our support team is available 24/7</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="light"
                            onClick={() => {
                                console.log("Chat support clicked");
                                navigateToPage('support');
                            }}
                            icon={<MdChat />}
                        >
                            Chat Support
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => {
                                console.log("Call support clicked");
                                navigateToPage('support');
                            }}
                            className="border border-white"
                            icon={<MdPhone />}
                        >
                            Call Support
                        </Button>
                    </div>
                </div>
            </div>

            {/* Debug Information - For troubleshooting */}
            <Card>
                <h3 className="text-lg font-semibold text-red-600">Debug Information</h3>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify({
                        activeTimeframe,
                        chartData,
                        setActivePageType: typeof setActivePage,
                        timeframeDataAvailable: !!timeframeData,
                        currentDataLength: currentData?.length || 0,
                    }, null, 2)}
                </pre>
            </Card>
        </div>
    );
}

DashBoard.propTypes = {
    setActivePage: PropTypes.func.isRequired
};

DashBoard.defaultProps = {
    // Fix 17: Provide a default prop for setActivePage
    setActivePage: (page) => console.log('Default navigation to:', page)
};

export default DashBoard;

