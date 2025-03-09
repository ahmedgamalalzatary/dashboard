import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdLocalShipping, MdPending, MdDoneAll, MdCancel } from 'react-icons/md';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';

function Orders() {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [dateFilter, setDateFilter] = useState('');

    const orderStats = [
        { title: t('Orders.Stats.TotalOrders'), value: '1,234', icon: MdLocalShipping, color: 'bg-blue-100 text-blue-800' },
        { title: t('Orders.Stats.Pending'), value: '43', icon: MdPending, color: 'bg-yellow-100 text-yellow-800' },
        { title: t('Orders.Stats.Completed'), value: '1,180', icon: MdDoneAll, color: 'bg-green-100 text-green-800' },
        { title: t('Orders.Stats.Cancelled'), value: '11', icon: MdCancel, color: 'bg-red-100 text-red-800' },
    ];

    const recentOrders = [
        { id: '#ORD-001', customer: t('Customers.JohnDoe'), status: t('Orders.Status.Pending'), amount: 299.99, date: '2024-01-20' },
        { id: '#ORD-002', customer: t('Customers.JaneSmith'), status: t('Orders.Status.Completed'), amount: 599.99, date: '2024-01-19' },
        { id: '#ORD-003', customer: t('Customers.BobJohnson'), status: t('Orders.Status.Processing'), amount: 149.99, date: '2024-01-19' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">{t('Orders.Title')}</h2>
                <Button 
                    variant="primary"
                    onClick={() => {}}
                    className="flex items-center gap-2"
                >
                    {t('Orders.NewOrder')}
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {orderStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card 
                            key={index} 
                            hover 
                            className="p-6 cursor-pointer"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">{stat.title}</p>
                                    <p className="text-2xl font-semibold mt-1">{stat.value}</p>
                                </div>
                                <div className={`p-3 rounded-full ${stat.color}`}>
                                    <Icon className="text-2xl" />
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Filters Section */}
            <Card hover className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input 
                        type="text" 
                        placeholder={t('Orders.Search')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="p-2 border rounded-lg"
                    />
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="p-2 border rounded-lg"
                    >
                        <option value="all">{t('Orders.Status.All')}</option>
                        <option value="pending">{t('Orders.Status.Pending')}</option>
                        <option value="processing">{t('Orders.Status.Processing')}</option>
                        <option value="completed">{t('Orders.Status.Completed')}</option>
                        <option value="cancelled">{t('Orders.Status.Cancelled')}</option>
                    </select>
                    <input 
                        type="date" 
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="p-2 border rounded-lg"
                    />
                    <Button variant="secondary">
                        {t('Orders.Filter')}
                    </Button>
                </div>
            </Card>

            {/* Orders Table */}
            <Card hover>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    {t('Orders.TableHeaders.OrderId')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    {t('Orders.TableHeaders.Customer')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    {t('Orders.TableHeaders.Status')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    {t('Orders.TableHeaders.Amount')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                                    {t('Orders.TableHeaders.Date')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentOrders.length > 0 ? (
                                recentOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 cursor-pointer">
                                        <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                order.status === t('Orders.Status.Completed') ? 'bg-green-100 text-green-800' :
                                                order.status === t('Orders.Status.Pending') ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-blue-100 text-blue-800'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">${order.amount}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                                        {t('Orders.NoOrders')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}

export default Orders;
