import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Modal from '../Components/UI/Modal';
import { MdTrendingUp, MdAddCircle, MdFileDownload, MdFilterList, MdSearch } from 'react-icons/md';

function Sales() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [dateFilter, setDateFilter] = useState('all');
    const [productFilter, setProductFilter] = useState('all');
    const [animateItems, setAnimateItems] = useState(false);

    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const [salesData, setSalesData] = useState([
        { id: 1, customer: t('Customers.JohnDoe'), product: t('Products.ProductA'), amount: 1200, date: '2023-01-15' },
        { id: 2, customer: t('Customers.JaneSmith'), product: t('Products.ProductB'), amount: 850, date: '2023-01-16' },
        { id: 3, customer: t('Customers.BobJohnson'), product: t('Products.ProductC'), amount: 2300, date: '2023-01-17' },
        { id: 4, customer: t('Customers.AliceWilliams'), product: t('Products.ProductA'), amount: 750, date: '2023-01-20' },
        { id: 5, customer: t('Customers.DavidWilson'), product: t('Products.ProductB'), amount: 1450, date: '2023-01-22' },
    ]);

    const [newSale, setNewSale] = useState({
        customer: '',
        product: '',
        amount: '',
        date: new Date().toISOString().split('T')[0]
    });

    // Calculate filtered data based on search and filters
    const filteredSalesData = useMemo(() => {
        return salesData.filter(sale => {
            const matchesSearch = !searchTerm ||
                sale.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sale.product.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesProduct = productFilter === 'all' || sale.product === productFilter;

            let matchesDate = true;
            if (dateFilter === 'today') {
                matchesDate = sale.date === new Date().toISOString().split('T')[0];
            } else if (dateFilter === 'week') {
                const oneWeekAgo = new Date();
                oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                matchesDate = new Date(sale.date) >= oneWeekAgo;
            } else if (dateFilter === 'month') {
                const oneMonthAgo = new Date();
                oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
                matchesDate = new Date(sale.date) >= oneMonthAgo;
            }

            return matchesSearch && matchesProduct && matchesDate;
        });
    }, [salesData, searchTerm, dateFilter, productFilter]);

    // Calculate unique products for filter dropdown
    const uniqueProducts = useMemo(() => {
        return ['all', ...new Set(salesData.map(sale => sale.product))];
    }, [salesData]);

    const salesMetrics = {
        recentOrders: [
            { id: 1, customer: t('Customers.JohnDoe'), status: t('Status.Processing'), time: t('TimeAgo.Min2') },
            { id: 2, customer: t('Customers.JaneSmith'), status: t('Status.Completed'), time: t('TimeAgo.Min5') },
            { id: 3, customer: t('Customers.BobJohnson'), status: t('Status.Pending'), time: t('TimeAgo.Min10') },
        ],
        topCustomers: [
            { name: t('Customers.JohnDoe'), orders: 25, spent: '$2,500' },
            { name: t('Customers.JaneSmith'), orders: 18, spent: '$1,800' },
            { name: t('Customers.BobJohnson'), orders: 15, spent: '$1,500' },
        ]
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSale(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newId = salesData.length > 0 ? Math.max(...salesData.map(sale => sale.id)) + 1 : 1;
        const saleToAdd = {
            id: newId,
            ...newSale,
            amount: parseFloat(newSale.amount)
        };
        setSalesData(prev => [...prev, saleToAdd]);
        setShowModal(false);
        setNewSale({
            customer: '',
            product: '',
            amount: '',
            date: new Date().toISOString().split('T')[0]
        });
    };

    const renderSaleForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('CustomerName')}
                </label>
                <input
                    id="customer"
                    type="text"
                    name="customer"
                    value={newSale.customer}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500"
                />
            </div>
            <div>
                <label htmlFor="product" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('product')}
                </label>
                <input
                    id="product"
                    type="text"
                    name="product"
                    value={newSale.product}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500"
                />
            </div>
            <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('amount')}
                </label>
                <input
                    id="amount"
                    type="number"
                    name="amount"
                    value={newSale.amount}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500"
                />
            </div>
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('date')}
                </label>
                <input
                    id="date"
                    type="date"
                    name="date"
                    value={newSale.date}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500"
                />
            </div>
        </form>
    );

    const modalActions = (
        <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                {t('cancel')}
            </Button>
            <Button variant="primary" onClick={handleSubmit} type="submit">
                {t('Crm.AddSale')}
            </Button>
        </>
    );

    return (
        <div className="space-y-8">
            {/* Header with improved New Sale button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h2 className="text-2xl font-semibold text-gray-800 transition-all duration-300 ease-in-out">
                    {t('sales')}
                </h2>
                
                <Button 
                    variant="primary" 
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2.5 px-5 py-2.5 group transition-all duration-300 ease-in-out hover:scale-105 shadow-sm font-medium"
                >
                    <MdAddCircle className="text-xl transition-transform duration-300 group-hover:rotate-90" />
                    <span>{t('NewSale')}</span>
                </Button>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={t('AddNewSale')}
                actions={modalActions}
            >
                {renderSaleForm()}
            </Modal>

            {/* Sales Overview Section with animations */}
            <div className={`
                grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 
                transition-all duration-500 ease-in-out 
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                <Card hover className="transform transition-all duration-300 hover:-translate-y-1">
                    <h3 className="font-semibold text-gray-800 mb-4">{t('Sales.RecentOrders')}</h3>
                    <div className="space-y-4">
                        {salesMetrics.recentOrders.map((order, idx) => (
                            <div
                                key={order.id}
                                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                                style={{ transitionDelay: `${idx * 50}ms` }}
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{order.customer}</p>
                                    <p className="text-sm text-gray-500">{order.time}</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs 
                  ${order.status === t('Status.Completed') ? 'bg-green-100 text-green-800' :
                                        order.status === t('Status.Processing') ? 'bg-blue-100 text-blue-800' :
                                            'bg-yellow-100 text-yellow-800'}`}>
                                    {order.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card hover className="transform transition-all duration-300 hover:-translate-y-1">
                    <h3 className="font-semibold text-gray-800 mb-4">{t('Sales.TopCustomers')}</h3>
                    <div className="space-y-4">
                        {salesMetrics.topCustomers.map((customer) => (
                            <div
                                key={customer.name}
                                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{customer.name}</p>
                                    <p className="text-sm text-gray-500">{customer.orders} {t('Sales.Orders')}</p>
                                </div>
                                <span className="font-medium text-gray-700">{customer.spent}</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Filters Section with animations */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '200ms' }}
            >
                <Card hover className="p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2">
                        <MdFilterList className="text-gray-500" />
                        <select
                            className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                            aria-label={t('Sales.FilterByDate')}
                        >
                            <option value="all">{t('Sales.FilterByDate')}</option>
                            <option value="today">{t('Sales.Today')}</option>
                            <option value="week">{t('Sales.ThisWeek')}</option>
                            <option value="month">{t('Sales.ThisMonth')}</option>
                        </select>
                    </div>
                </Card>

                <Card hover className="p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2">
                        <MdSearch className="text-gray-500" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder={t('Sales.SearchSales')}
                            className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            aria-label={t('Sales.SearchSales')}
                        />
                    </div>
                </Card>

                <Card hover className="p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2">
                        <MdFilterList className="text-gray-500" />
                        <select
                            className="w-full p-2 border border-gray-200 rounded focus:outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={productFilter}
                            onChange={(e) => setProductFilter(e.target.value)}
                            aria-label={t('Sales.FilterByProduct')}
                        >
                            {uniqueProducts.map(product => (
                                <option key={product} value={product}>
                                    {product === 'all' ? t('Categories.All') : product}
                                </option>
                            ))}
                        </select>
                    </div>
                </Card>
            </div>

            {/* Sales Table with animations */}
            <Card className={`
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '300ms' }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{t('Sales.SalesRecords')}</h3>
                    <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300">
                        <MdFileDownload className="text-xl" />
                        <span>{t('Sales.Export')}</span>
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('id')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('CustomerName')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('product')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('amount')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('date')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('actions')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredSalesData.length > 0 ? (
                                filteredSalesData.map((sale) => (
                                    <tr key={sale.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900">{sale.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{sale.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{sale.product}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">${sale.amount.toLocaleString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{sale.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-800">{t('edit')}</button>
                                                <button className="text-red-600 hover:text-red-800">{t('delete')}</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                        {t('Sales.NoSalesData')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {filteredSalesData.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
                        <div className="text-sm text-gray-500">
                            {t('Sales.Showing')} <span className="font-medium">{filteredSalesData.length}</span> {t('Sales.Of')} <span className="font-medium">{salesData.length}</span> {t('Sales.Entries')}
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="secondary" className="px-2 py-1 text-sm transition-transform duration-200 active:scale-95">{t('Sales.Previous')}</Button>
                            <Button variant="secondary" className="px-2 py-1 text-sm transition-transform duration-200 active:scale-95">{t('Sales.Next')}</Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Sales Analytics Section with animations */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-6
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '400ms' }}
            >
                <StatsCard
                    title={t('PaymentMethods')}
                    items={[
                        { label: t('Sales.CreditCard'), value: '45%' },
                        { label: t('Sales.BankTransfer'), value: '30%' },
                        { label: t('Sales.Cash'), value: '25%' }
                    ]}
                    type="simple"
                />

                <StatsCard
                    title={t('salesChannels')}
                    items={[
                        { label: t('SalesChannels.Online'), value: '65%' },
                        { label: t('SalesChannels.InStore'), value: '25%' },
                        { label: t('SalesChannels.Marketplace'), value: '10%' }
                    ]}
                    type="progress"
                />

                <StatsCard
                    title={t('QuickStats')}
                    items={[
                        { label: t('Metrics.AverageOrder'), value: '$245' },
                        { label: t('Metrics.ConversionRate'), value: '3.2%' },
                        { label: t('Metrics.ReturnRate'), value: '2.1%' }
                    ]}
                    type="simple"
                />
            </div>

            {/* Summary Cards with animations */}
            <div className={`
                grid grid-cols-1 md:grid-cols-4 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '500ms' }}
            >
                {[
                    { title: t('TotalSales'), value: '$' + salesData.reduce((sum, sale) => sum + sale.amount, 0).toLocaleString(), icon: MdTrendingUp, color: 'text-green-500' },
                    { title: t('Sales.AverageSale'), value: '$' + Math.round(salesData.reduce((sum, sale) => sum + sale.amount, 0) / salesData.length).toLocaleString(), icon: MdTrendingUp, color: 'text-blue-500' },
                    { title: t('Sales.SalesCount'), value: salesData.length, icon: MdTrendingUp, color: 'text-purple-500' },
                    { title: t('Sales.TopProduct'), value: t('Products.ProductA'), icon: MdTrendingUp, color: 'text-yellow-500' }
                ].map((stat, index) => (
                    <Card 
                        key={index} 
                        hover 
                        className="text-center p-4 transform transition-transform duration-300 hover:-translate-y-1"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className="flex flex-col items-center">
                            <div className={`p-3 mb-2 rounded-full bg-gray-100 ${stat.color}`}>
                                <stat.icon className="text-xl" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-500">{stat.title}</h3>
                            <p className="text-2xl font-bold text-gray-800 mt-2">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

// Reusable StatsCard component
function StatsCard({ title, items, type }) {
    return (
        <Card>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="space-y-3">
                {items.map((item) => (
                    <div key={item.label} className="space-y-1">
                        {type === "progress" ? (
                            <>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">{item.label}</span>
                                    <span className="text-gray-900">{item.value}</span>
                                </div>
                                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gray-700 rounded-full transition-all duration-500 ease-out"
                                        style={{ width: item.value }}>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded">
                                <span className="text-gray-600">{item.label}</span>
                                <span className="font-semibold text-gray-900">{item.value}</span>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </Card>
    );
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
    type: PropTypes.oneOf(['simple', 'progress']).isRequired,
};

Sales.propTypes = {};

export default Sales;
