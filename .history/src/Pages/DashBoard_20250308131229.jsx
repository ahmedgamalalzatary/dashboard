import { useState } from 'react';
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

function DashBoard({ setActivePage }) {
    const { t } = useTranslation();
    // State for interactive elements
    const [activeTimeframe, setActiveTimeframe] = useState('monthly');
    const [completedTasks, setCompletedTasks] = useState([]);
    const [showNotification, setShowNotification] = useState(false);
    const [chartData, setChartData] = useState('sales'); // For toggling chart data

    // Mock data for charts - could be fetched from API in real application
    const data = [
        { name: t('Months.Jan'), sales: 4200, orders: 2400, revenue: 2400 },
        { name: t('Months.Feb'), sales: 3100, orders: 1398, revenue: 2210 },
        { name: t('Months.Mar'), sales: 2400, orders: 9800, revenue: 2290 },
        { name: t('Months.Apr'), sales: 2700, orders: 3908, revenue: 2000 },
        { name: t('Months.May'), sales: 19090, orders: 4800, revenue: 2181 },
        { name: t('Months.Jun'), sales: 2390, orders: 3800, revenue: 2500 },
    ];

    const stats = [
        { title: t('TotalSales'), value: '$54,239', icon: MdAttachMoney, color: 'bg-green-100 text-green-800' },
        { title: t('TotalOrders'), value: '1,253', icon: MdShoppingCart, color: 'bg-blue-100 text-blue-800' },
        { title: t('NewClients'), value: '342', icon: MdPeople, color: 'bg-purple-100 text-purple-800' },
        { title: t('growth'), value: '+12.5%', icon: MdTrendingUp, color: 'bg-yellow-100 text-yellow-800' },
    ];

    const recentTransactions = [
        { id: 1, customer: t('Customers.JohnDoe'), amount: 1200, status: t('Status.Completed'), trend: 'up' },
        { id: 2, customer: t('Customers.JaneSmith'), amount: 850, status: t('Status.Pending'), trend: 'down' },
        { id: 3, customer: t('Customers.BobJohnson'), amount: 2300, status: t('Status.Completed'), trend: 'up' },
        { id: 4, customer: t('Customers.AliceWilliams'), amount: 1750, status: t('Status.Processing'), trend: 'up' },
        { id: 5, customer: t('Customers.TomBrown'), amount: 920, status: t('Status.Pending'), trend: 'down' },
    ];

    const quickActions = [
        { label: t('Crm.AddSale'), page: 'sales', icon: MdAttachMoney },
        { label: t('Crm.AddNewProduct'), page: 'products', icon: MdShoppingCart },
        { label: t('Crm.AddClient'), page: 'clients', icon: MdPeople },
        { label: t('viewAll'), page: 'reports', icon: MdTrendingUp }
    ];

    const upcomingTasks = [
        { task: t('Tasks.ReviewSales'), due: t('Tasks.Today'), priority: 'high' },
        { task: t('Tasks.ClientMeeting'), due: t('Tasks.Tomorrow'), priority: 'medium' },
        { task: t('Tasks.TeamSync'), due: t('Tasks.Wednesday'), priority: 'normal' },
        { task: t('Tasks.UpdateInventory'), due: t('Tasks.Friday'), priority: 'high' }
    ];

    const saleDistribution = [
        { name: t('SalesChannels.Online'), value: 65 },
        { name: t('SalesChannels.InStore'), value: 25 },
        { name: t('SalesChannels.Phone'), value: 10 }
    ];

    const pieData = [
        { name: t('Goals.Revenue'), value: 75, color: '#4F46E5' },
        { name: t('Goals.Customers'), value: 65, color: '#34D399' },
        { name: t('Goals.Sales'), value: 85, color: '#F59E0B' },
    ];

    return (
        <div className="space-y-6 max-w-full overflow-x-hidden">
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

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {/* Sales Overview Chart */}
                    <Card hover>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{t('SalesOverview')}</h3>
                            <div className="flex space-x-2">
                                <Button
                                    variant={activeTimeframe === 'weekly' ? "dark" : "ghost"}
                                    size="xs"
                                    className={activeTimeframe !== 'weekly' ? "bg-gray-100 text-gray-700" : ""}
                                    onClick={() => {
                                        setActiveTimeframe('weekly');
                                        // In a real app, this would fetch weekly data
                                    }}
                                >
                                    {t('Timeframes.Weekly')}
                                </Button>
                                <Button
                                    variant={activeTimeframe === 'monthly' ? "dark" : "ghost"}
                                    size="xs"
                                    className={activeTimeframe !== 'monthly' ? "bg-gray-100 text-gray-700" : ""}
                                    onClick={() => {
                                        setActiveTimeframe('monthly');
                                        // In a real app, this would fetch monthly data
                                    }}
                                >
                                    {t('Timeframes.Monthly')}
                                </Button>
                                <Button
                                    variant={activeTimeframe === 'yearly' ? "dark" : "ghost"}
                                    size="xs"
                                    className={activeTimeframe !== 'yearly' ? "bg-gray-100 text-gray-700" : ""}
                                    onClick={() => {
                                        setActiveTimeframe('yearly');
                                        // In a real app, this would fetch yearly data
                                    }}
                                >
                                    {t('Timeframes.Yearly')}
                                </Button>
                            </div>
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
                                    <Bar dataKey="sales" fill="#4F46E5" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Orders Trend Chart */}
                    <Card hover>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{t('OrdersTrend')}</h3>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="rounded-full"
                                icon={<MdMoreVert className="text-gray-500" />}
                                onClick={() => {
                                    // Toggle between different chart data
                                    setChartData(chartData === 'sales' ? 'orders' : 'sales');
                                    setShowNotification(true);
                                    // Auto-hide notification after 3 seconds
                                    setTimeout(() => setShowNotification(false), 3000);
                                }}
                            />
                            {showNotification && (
                                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 z-10 text-sm">
                                    {chartData === 'sales' ? t('Showing sales data') : t('Showing orders data')}
                                </div>
                            )}
                        </div>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                    <YAxis axisLine={false} tickLine={false} />
                                    <Tooltip />
                                    <Area type="monotone" dataKey="revenue" stroke="#2563EB" fillOpacity={1} fill="url(#colorRevenue)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    {/* Performance Metrics */}
                    <Card hover>
                        <h3 className="text-lg font-semibold mb-4 text-gray-800">{t('Metrics.PerformanceMetrics')}</h3>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: t('Metrics.ConversionRate'), value: '3.2%', change: '+0.4%', positive: true },
                                { label: t('Metrics.AverageOrder'), value: '$245', change: '+12%', positive: true },
                                { label: t('Metrics.CustomerRetention'), value: '87.3%', change: '-1.2%', positive: false },
                                { label: t('Metrics.ReturnRate'), value: '2.1%', change: '+0.3%', positive: false }
                            ].map((metric, idx) => (
                                <div key={idx} className="p-4 border rounded-lg bg-gray-50">
                                    <p className="text-sm text-gray-500">{metric.label}</p>
                                    <p className="text-xl font-bold mt-1">{metric.value}</p>
                                    <p className={`text-xs mt-1 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}>
                                        {metric.change} {metric.positive ? '↑' : '↓'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Right column with transactions and other widgets */}
                <div className="space-y-6">
                    {/* Recent Transactions */}
                    <Card hover>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{t('RecentTransactions')}</h3>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => setActivePage('sales')}
                            >
                                {t('ViewAll')}
                            </Button>
                        </div>
                        <div className="space-y-3 overflow-y-auto max-h-[250px]">
                            {recentTransactions.map((tx) => (
                                <div key={tx.id}
                                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                                    <div className="flex items-center space-x-3 min-w-0">
                                        <div className={`p-2 rounded-full flex-shrink-0 ${tx.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {tx.trend === 'up' ?
                                                <MdArrowUpward /> :
                                                <MdArrowDownward />
                                            }
                                        </div>
                                        <div className="min-w-0">
                                            <p className="font-medium text-gray-800 truncate">{tx.customer}</p>
                                            <p className="text-xs text-gray-500 truncate capitalize">{tx.status}</p>
                                        </div>
                                    </div>
                                    <span className="font-semibold flex-shrink-0">${tx.amount}</span>
                                </div>
                            ))}
                        </div>
                    </Card>

                    {/* Quick Actions */}
                    <Card hover>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('QuickActions')}</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {quickActions.map(action => (
                                <Button
                                    key={action.label}
                                    variant="secondary"
                                    onClick={() => setActivePage(action.page)}
                                    className="flex items-center justify-center gap-2"
                                    icon={<action.icon className="text-gray-500" />}
                                >
                                    {action.label}
                                </Button>
                            ))}
                        </div>
                    </Card>

                    {/* Sales Distribution */}
                    <Card hover>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('SalesDistribution')}</h3>
                        <div className="space-y-4">
                            {saleDistribution.map((item) => (
                                <div key={item.name}>
                                    <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                        <span className="text-sm text-gray-500">{item.value}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className={`h-2 rounded-full ${item.name === t('SalesChannels.Online') ? 'bg-blue-600' :
                                                    item.name === t('SalesChannels.InStore') ? 'bg-green-500' : 'bg-yellow-500'
                                                }`}
                                            style={{ width: `${item.value}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upcoming Tasks */}
                <div className="lg:col-span-2">
                    <Card hover>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-gray-800">{t('UpcomingTasks')}</h3>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={() => {
                                    // In a real app, this would open a calendar view
                                    alert(t('Calendar view would open here'));
                                }}
                            >
                                {t('ViewCalendar')}
                            </Button>
                        </div>
                        <div className="space-y-2">
                            {upcomingTasks.map((task, idx) => (
                                <div
                                    key={idx}
                                    className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 ${task.priority === 'high' ? 'border-red-500 bg-red-50' :
                                            task.priority === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                                                'border-blue-500 bg-blue-50'
                                        }`}
                                >
                                    <div className="flex-shrink-0 pt-1">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300"
                                            checked={completedTasks.includes(idx)}
                                            onChange={() => {
                                                if (completedTasks.includes(idx)) {
                                                    setCompletedTasks(completedTasks.filter(taskId => taskId !== idx));
                                                } else {
                                                    setCompletedTasks([...completedTasks, idx]);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{task.task}</p>
                                        <div className="flex items-center mt-1 text-xs">
                                            <MdCalendarToday className="text-gray-500 mr-1" />
                                            <span className="text-gray-600 mr-3">{task.due.split(',')[0]}</span>
                                            <MdAccessTime className="text-gray-500 mr-1" />
                                            <span className="text-gray-600">{task.due.split(',')[1] || ''}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Goal Progress Section */}
                <div>
                    <Card hover className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-800">{t('GoalsProgress')}</h3>
                        <div className="h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={30}
                                        outerRadius={60}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                            {pieData.map(goal => (
                                <div key={goal.name} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">{goal.name}</span>
                                        <span className="text-gray-900">{goal.value}%</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full">
                                        <div
                                            className="h-full rounded-full"
                                            style={{
                                                width: `${goal.value}%`,
                                                backgroundColor: goal.color
                                            }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>

            {/* Recent Activity Timeline */}
            <Card hover>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('RecentActivity')}</h3>
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute h-full w-px bg-gray-200 left-2.5"></div>

                    <div className="space-y-6 pl-8 relative">
                        {[
                            { time: t('TimeAgo.twohours'), event: t('Activities.NewOrder'), type: 'order', icon: MdShoppingCart },
                            { time: t('TimeAgo.threehours'), event: t('Activities.ClientMeeting'), type: 'meeting', icon: MdPeople },
                            { time: t('TimeAgo.fivehours'), event: t('Activities.StockUpdate'), type: 'inventory', icon: MdAttachMoney },
                            { time: t('TimeAgo.oneday'), event: t('Activities.NewClient'), type: 'client', icon: MdPeople }
                        ].map((activity, idx) => (
                            <div key={idx} className="relative">
                                {/* Timeline dot */}
                                <div className={`absolute -left-8 p-1 rounded-full 
                                    ${activity.type === 'order' ? 'bg-blue-500' :
                                        activity.type === 'meeting' ? 'bg-green-500' :
                                            activity.type === 'inventory' ? 'bg-yellow-500' : 'bg-purple-500'
                                    } text-white`}
                                >
                                    <activity.icon className="text-xs" />
                                </div>

                                {/* Content */}
                                <div>
                                    <p className="text-sm text-gray-800 font-medium">{activity.event}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Call-to-Action Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-bold mb-2">{t('Support.NeedAssistance')}</h3>
                        <p>{t('Support.AvailableMessage')}</p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            variant="light"
                            onClick={() => setActivePage('support')}
                            className="whitespace-nowrap text-blue-600 hover:bg-gray-100"
                            icon={<MdChat />}
                        >
                            {t('Support.ChatSupport')}
                        </Button>
                        <Button
                            variant="ghost"
                            onClick={() => setActivePage('support')}
                            className="whitespace-nowrap border-white bg-transparent hover:bg-blue-700 text-white"
                            icon={<MdPhone />}
                        >
                            {t('Support.CallSupport')}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

DashBoard.propTypes = {
    setActivePage: PropTypes.func.isRequired
};

export default DashBoard;

