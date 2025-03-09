import { useState, useEffect, useMemo } from 'react';
import { MdAddCircle, MdSearch, MdFilterList, MdEdit, MdMoreVert } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Modal from '../Components/UI/Modal';

function Orders() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [animateItems, setAnimateItems] = useState(false);
    
    // New order state
    const [newOrder, setNewOrder] = useState({
        customer: '',
        product: '',
        quantity: '',
        status: 'pending',
        shipping: ''
    });
    
    // Sample data
    const [orders, setOrders] = useState([
        { id: 1, orderNumber: 'ORD-001', customer: t('Customers.JohnDoe'), product: t('Products.ProductA'), quantity: 2, date: '2023-05-10', status: 'completed', total: 599.98 },
        { id: 2, orderNumber: 'ORD-002', customer: t('Customers.JaneSmith'), product: t('Products.ProductB'), quantity: 1, date: '2023-05-12', status: 'processing', total: 599.99 },
        { id: 3, orderNumber: 'ORD-003', customer: t('Customers.BobJohnson'), product: t('Products.ProductC'), quantity: 3, date: '2023-05-15', status: 'pending', total: 149.97 },
        { id: 4, orderNumber: 'ORD-004', customer: t('Customers.AliceWilliams'), product: t('Products.ProductA'), quantity: 1, date: '2023-05-17', status: 'cancelled', total: 299.99 },
        { id: 5, orderNumber: 'ORD-005', customer: t('Customers.DavidWilson'), product: t('Products.ProductB'), quantity: 2, date: '2023-05-18', status: 'processing', total: 1199.98 },
    ]);

    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    // Order statistics
    const orderStats = useMemo(() => {
        return {
            total: orders.length,
            completed: orders.filter(o => o.status === 'completed').length,
            processing: orders.filter(o => o.status === 'processing').length,
            pending: orders.filter(o => o.status === 'pending').length,
            cancelled: orders.filter(o => o.status === 'cancelled').length,
            revenue: orders.reduce((sum, order) => order.status !== 'cancelled' ? sum + order.total : sum, 0).toFixed(2)
        };
    }, [orders]);

    // Filter orders based on search and status filter
    const filteredOrders = useMemo(() => {
        return orders.filter(order => {
            const matchesSearch = !searchTerm || 
                order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.product.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
            
            return matchesSearch && matchesStatus;
        });
    }, [orders, searchTerm, statusFilter]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOrder(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create new order
        const newId = orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1;
        const orderNumber = `ORD-${String(newId).padStart(3, '0')}`;
        const date = new Date().toISOString().split('T')[0];
        
        // Calculate total based on product
        const productPrices = {
            [t('Products.ProductA')]: 299.99,
            [t('Products.ProductB')]: 599.99,
            [t('Products.ProductC')]: 49.99
        };
        
        const price = productPrices[newOrder.product] || 100;
        const total = price * parseInt(newOrder.quantity, 10);
        
        const order = {
            id: newId,
            orderNumber,
            customer: newOrder.customer,
            product: newOrder.product,
            quantity: parseInt(newOrder.quantity, 10),
            date,
            status: newOrder.status,
            total
        };
        
        setOrders(prev => [...prev, order]);
        setShowModal(false);
        setNewOrder({
            customer: '',
            product: '',
            quantity: '',
            status: 'pending',
            shipping: ''
        });
    };

    const renderOrderForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('CustomerName')}</label>
                <input
                    type="text"
                    name="customer"
                    value={newOrder.customer}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('product')}</label>
                <select
                    name="product"
                    value={newOrder.product}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                >
                    <option value="">{t('SelectProduct')}</option>
                    <option value={t('Products.ProductA')}>{t('Products.ProductA')}</option>
                    <option value={t('Products.ProductB')}>{t('Products.ProductB')}</option>
                    <option value={t('Products.ProductC')}>{t('Products.ProductC')}</option>
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('quantity')}</label>
                <input
                    type="number"
                    name="quantity"
                    value={newOrder.quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('status')}</label>
                <select
                    name="status"
                    value={newOrder.status}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                >
                    <option value="pending">{t('Status.Pending')}</option>
                    <option value="processing">{t('Status.Processing')}</option>
                    <option value="completed">{t('Status.Completed')}</option>
                    <option value="cancelled">{t('Status.Cancelled')}</option>
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Orders.ShippingAddress')}</label>
                <textarea
                    name="shipping"
                    value={newOrder.shipping}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                    placeholder={t('Orders.EnterShippingAddress')}
                ></textarea>
            </div>
        </form>
    );

    const modalActions = (
        <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                {t('cancel')}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                {t('Orders.CreateOrder')}
            </Button>
        </>
    );

    return (
        <div className="space-y-8">
            {/* Header with improved New Order button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h2 className="text-2xl font-semibold text-gray-800">{t('Management')}</h2>
                
                <Button 
                    variant="primary" 
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2.5 px-5 py-2.5 group transition-all duration-300 ease-in-out hover:scale-105 shadow-sm font-medium"
                >
                    <MdAddCircle className="text-xl transition-transform duration-300 group-hover:rotate-90" />
                    <span>{t('NewOrder')}</span>
                </Button>
            </div>

            {/* Add New Order Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={t('CreateNewOrder')}
                actions={modalActions}
            >
                {renderOrderForm()}
            </Modal>

            {/* Order Statistics */}
            <div className={`
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-blue-500">
                    <h3 className="text-sm text-gray-500">{t('TotalOrders')}</h3>
                    <p className="text-2xl font-bold mt-2 text-gray-800">{orderStats.total}</p>
                </Card>
                
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-green-500">
                    <h3 className="text-sm text-gray-500">{t('Completed')}</h3>
                    <p className="text-2xl font-bold mt-2 text-green-600">{orderStats.completed}</p>
                </Card>
                
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-yellow-500">
                    <h3 className="text-sm text-gray-500">{t('Processing')}</h3>
                    <p className="text-2xl font-bold mt-2 text-yellow-600">{orderStats.processing}</p>
                </Card>
                
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-purple-500">
                    <h3 className="text-sm text-gray-500">{t('Pending')}</h3>
                    <p className="text-2xl font-bold mt-2 text-purple-600">{orderStats.pending}</p>
                </Card>
                
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-red-500">
                    <h3 className="text-sm text-gray-500">{t('Cancelled')}</h3>
                    <p className="text-2xl font-bold mt-2 text-red-600">{orderStats.cancelled}</p>
                </Card>
                
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-indigo-500">
                    <h3 className="text-sm text-gray-500">{t('TotalRevenue')}</h3>
                    <p className="text-2xl font-bold mt-2 text-indigo-600">${orderStats.revenue}</p>
                </Card>
            </div>

            {/* Filters */}
            <div className={`
                grid grid-cols-1 md:grid-cols-2 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '200ms' }}
            >
                <Card hover className="p-4">
                    <div className="flex items-center gap-2">
                        <MdSearch className="text-gray-500" />
                        <input 
                            type="text"
                            placeholder={t('Orders.SearchOrders')}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </Card>
                
                <Card hover className="p-4">
                    <div className="flex items-center gap-2">
                        <MdFilterList className="text-gray-500" />
                        <select
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">{t('Orders.AllStatuses')}</option>
                            <option value="completed">{t('Status.Completed')}</option>
                            <option value="processing">{t('Status.Processing')}</option>
                            <option value="pending">{t('Status.Pending')}</option>
                            <option value="cancelled">{t('Status.Cancelled')}</option>
                        </select>
                    </div>
                </Card>
            </div>
            
            {/* Orders Table */}
            <Card className={`
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '300ms' }}
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Orders.ID')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('CustomerName')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('product')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('quantity')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('date')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('total')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{order.orderNumber}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.customer}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.product}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{order.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                order.status === 'pending' ? 'bg-purple-100 text-purple-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {order.status === 'completed' ? t('Status.Completed') :
                                                order.status === 'processing' ? t('Status.Processing') :
                                                order.status === 'pending' ? t('Status.Pending') :
                                                order.satatus === 'cancelled' ? t('Status.Cancelled'):
                                                order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="p-1 hover:bg-blue-100 rounded-full text-blue-600 transition-colors duration-200">
                                                    <MdEdit />
                                                </button>
                                                <button className="p-1 hover:bg-gray-100 rounded-full text-gray-600 transition-colors duration-200">
                                                    <MdMoreVert />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        {t('Orders.NoOrdersFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {filteredOrders.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
                        <div className="text-sm text-gray-500">
                            {t('Showing')} <span className="font-medium">{filteredOrders.length}</span> {t('of')} <span className="font-medium">{orders.length}</span> {t('Orders.Items')}
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="secondary" className="px-3 py-1 text-sm">{t('Previous')}</Button>
                            <Button variant="secondary" className="px-3 py-1 text-sm">{t('Next')}</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default Orders;
