import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    MdWarehouse, MdLocalShipping, MdWarning, MdAddBox, MdOutlineQrCodeScanner,
    MdRefresh, MdFilterList, MdSearch, MdEdit, MdDelete, MdInventory,
    MdHistory, MdImportExport, MdDownload, MdAdd, MdRemove
} from 'react-icons/md';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Modal from '../Components/UI/Modal';
import { useTranslation } from 'react-i18next';

// Create missing UI components with PropTypes
const SearchInput = ({ placeholder, value, onChange }) => (
    <div className="relative">
        <MdSearch className="absolute left-3 top-3 text-gray-400" />
        <input
            type="text"
            placeholder={placeholder}
            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-colors duration-300"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

SearchInput.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

const Select = ({ value, onChange, options }) => (
    <div className="relative">
        <MdFilterList className="absolute left-3 top-3 text-gray-400" />
        <select
            className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-colors duration-300"
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);

Select.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired
        })
    ).isRequired
};

const StatsCard = ({ title, value, trend, t }) => (
    <Card hover className="p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
        <div className="flex flex-col">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            {trend && (
                <span className={`text-xs mt-2 ${trend === "up" ? "text-green-600" :
                        trend === "down" ? "text-red-600" :
                            trend === "warning" ? "text-yellow-600" : "text-gray-600"
                    }`}>
                    {trend === "up" ? "↑" : trend === "down" ? "↓" : "⚠"}
                    {trend === "up" ? t('Inventory.Increasing') :
                        trend === "down" ? t('Inventory.Decreasing') :
                            trend === "warning" ? t('Inventory.Warning') : ""}
                </span>
            )}
        </div>
    </Card>
);

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    trend: PropTypes.oneOf(['up', 'down', 'warning']),
    t: PropTypes.func.isRequired
};

// Helper function for formatting currency
const formatCurrency = (value) => {
    return `$${parseFloat(value).toFixed(2)}`;
};

function Inventory() {
    const [animateItems, setAnimateItems] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showTable, setShowTable] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [statusFilter, setStatusFilter] = useState('all');
    const { t } = useTranslation();

    const [inventoryItems, setInventoryItems] = useState([
        { id: 1, name: t('Products.ProductA'), category: t('Categories.Electronics'), quantity: 45, minQuantity: 20, price: 129.99, supplier: 'Tech Supplies Inc.', lastUpdated: '2024-01-18' },
        { id: 2, name: t('Products.ProductB'), category: t('Categories.Electronics'), quantity: 32, minQuantity: 15, price: 89.99, supplier: 'Tech Supplies Inc.', lastUpdated: '2024-01-15' },
        { id: 3, name: 'Desk Chair', category: t('Categories.Furniture'), quantity: 12, minQuantity: 8, price: 249.99, supplier: 'Office Furnishings Co.', lastUpdated: '2024-01-10' },
        { id: 4, name: 'LED Monitor', category: t('Categories.Electronics'), quantity: 7, minQuantity: 10, price: 179.99, supplier: 'Display Solutions', lastUpdated: '2024-01-05' },
        { id: 5, name: 'Filing Cabinet', category: t('Categories.Furniture'), quantity: 18, minQuantity: 5, price: 149.99, supplier: 'Office Furnishings Co.', lastUpdated: '2023-12-28' },
    ]);

    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        quantity: '',
        minQuantity: '',
        price: '',
        supplier: ''
    });

    const [stockAdjustment, setStockAdjustment] = useState({ productId: null, quantity: 0 });

    // Calculate aggregate values
    const totalStock = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);
    const stockValue = inventoryItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const alertCount = inventoryItems.filter(item => item.quantity <= item.minQuantity).length;
    const stockMovement = 25; // This would normally be calculated from historical data

    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const inventoryStats = [
        { title: t('Inventory.TotalStock'), value: totalStock.toLocaleString(), icon: MdWarehouse, color: 'bg-blue-100 text-blue-800' },
        { title: t('Inventory.InTransit'), value: '150', icon: MdLocalShipping, color: 'bg-yellow-100 text-yellow-800' },
        { title: t('Inventory.LowStock'), value: alertCount.toString(), icon: MdWarning, color: 'bg-red-100 text-red-800' },
    ];

    const lowStockItems = [
        { id: 1, name: 'Product X', current: 5, minimum: 10 },
        { id: 2, name: 'Product Y', current: 3, minimum: 15 },
        { id: 3, name: 'Product Z', current: 8, minimum: 20 },
    ];

    const categories = ['all', t('Categories.Electronics'), t('Categories.Furniture'), t('Categories.Clothing')];

    // Filter and sort inventory items
    const filteredItems = inventoryItems.filter(item => {
        const matchesSearch = searchTerm === '' ||
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

        const matchesStatus = statusFilter === 'all' ||
            (statusFilter === 'inStock' && item.quantity > item.minQuantity) ||
            (statusFilter === 'lowStock' && item.quantity <= item.minQuantity && item.quantity > 0) ||
            (statusFilter === 'outOfStock' && item.quantity === 0);

        return matchesSearch && matchesCategory && matchesStatus;
    }).sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'name':
                comparison = a.name.localeCompare(b.name);
                break;
            case 'quantity':
                comparison = a.quantity - b.quantity;
                break;
            case 'price':
                comparison = a.price - b.price;
                break;
            default:
                comparison = a.name.localeCompare(b.name);
        }

        return sortOrder === 'asc' ? comparison : -comparison;
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = () => {
        const newId = Math.max(...inventoryItems.map(item => item.id)) + 1;
        const productToAdd = {
            id: newId,
            name: newProduct.name,
            category: newProduct.category,
            quantity: parseInt(newProduct.quantity) || 0,
            minQuantity: parseInt(newProduct.minQuantity) || 0,
            price: parseFloat(newProduct.price) || 0,
            supplier: newProduct.supplier,
            lastUpdated: new Date().toISOString().split('T')[0]
        };

        setInventoryItems([...inventoryItems, productToAdd]);
        setShowAddModal(false);
        // Reset form
        setNewProduct({
            name: '',
            category: '',
            quantity: '',
            minQuantity: '',
            price: '',
            supplier: ''
        });
    };

    const handleEditItem = (item) => {
        setNewProduct({
            id: item.id,
            name: item.name,
            category: item.category,
            quantity: item.quantity.toString(),
            minQuantity: item.minQuantity.toString(),
            price: item.price.toString(),
            supplier: item.supplier
        });
        setShowAddModal(true);
    };

    const handleDeleteItem = (itemId) => {
        setInventoryItems(inventoryItems.filter(item => item.id !== itemId));
    };

    const handleAddStock = () => {
        if (!stockAdjustment.productId) return;

        setInventoryItems(prev => prev.map(item =>
            item.id === stockAdjustment.productId
                ? { ...item, quantity: item.quantity + parseInt(stockAdjustment.quantity) }
                : item
        ));

        // Reset adjustment
        setStockAdjustment({ productId: null, quantity: 0 });
    };

    const handleRemoveStock = () => {
        if (!stockAdjustment.productId) return;

        setInventoryItems(prev => prev.map(item =>
            item.id === stockAdjustment.productId
                ? { ...item, quantity: Math.max(0, item.quantity - parseInt(stockAdjustment.quantity)) }
                : item
        ));

        // Reset adjustment
        setStockAdjustment({ productId: null, quantity: 0 });
    };

    const renderInventoryTable = () => (
        <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Inventory.ProductId')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('name')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('category')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Inventory.Quantity')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('OrderStatus')}</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('actions')}</th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">{item.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 rounded-full text-xs ${item.quantity <= item.minQuantity ? 'bg-red-100 text-red-800' :
                                    item.quantity <= item.minQuantity * 2 ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                                }`}>
                                {item.quantity <= item.minQuantity ? t('Inventory.Status.LowStock') :
                                    item.quantity <= item.minQuantity * 2 ? t('Inventory.Status.MediumStock') : t('Inventory.Status.InStock')}
                            </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex space-x-2">
                                <button
                                    className="p-1 hover:bg-blue-100 rounded-full text-blue-600 transition-colors duration-200"
                                    onClick={() => handleEditItem(item)}
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="p-1 hover:bg-red-100 rounded-full text-red-600 transition-colors duration-200"
                                    onClick={() => handleDeleteItem(item.id)}
                                >
                                    <MdDelete />
                                </button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const renderPagination = () => (
        <div className="px-6 py-4 flex items-center justify-between border-t">
            <div className="flex-1 flex justify-between sm:hidden">
                <Button variant="secondary" size="sm">Previous</Button>
                <Button variant="secondary" size="sm">Next</Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        {t('Showing')} <span className="font-medium">1</span> {t('to')} <span className="font-medium">10</span> {t('of')}{' '}
                        <span className="font-medium">{filteredItems.length}</span> {t('results')}
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                        <Button variant="secondary" size="sm">Previous</Button>
                        <Button variant="secondary" size="sm">Next</Button>
                    </nav>
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header with animation */}
            <div className={`
                flex justify-between items-center
                transform transition-all duration-500
                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}>
                <h2 className="text-2xl font-semibold text-gray-800">{t('Inventory.Title')}</h2>
                <div className="flex gap-2">
                    <Button
                        variant="secondary"
                        onClick={handleRemoveStock}
                        icon={<MdRemove />}
                    >
                        {t('Inventory.RemoveStock')}
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleAddStock}
                        icon={<MdAdd />}
                    >
                        {t('Inventory.AddStock')}
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SearchInput
                    placeholder={t('Inventory.Search')}
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
                <Select
                    value={statusFilter}
                    onChange={setStatusFilter}
                    options={[
                        { value: 'all', label: t('Inventory.AllItems') },
                        { value: 'inStock', label: t('Inventory.Status.InStock') },
                        { value: 'lowStock', label: t('Inventory.Status.LowStock') },
                        { value: 'outOfStock', label: t('Inventory.Status.OutOfStock') }
                    ]}
                />
                <Select
                    value={categoryFilter}
                    onChange={setCategoryFilter}
                    options={categories.map(cat => ({
                        value: cat,
                        label: cat === 'all' ? t('Categories.All') : cat
                    }))}
                />
            </div>

            {/* Inventory Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatsCard
                    title={t('Inventory.CurrentStock')}
                    value={totalStock}
                    t={t}
                />
                <StatsCard
                    title={t('Inventory.StockValue')}
                    value={formatCurrency(stockValue)}
                    t={t}
                />
                <StatsCard
                    title={t('Inventory.Alerts')}
                    value={alertCount}
                    trend="warning"
                    t={t}
                />
                <StatsCard
                    title={t('Inventory.StockMovement')}
                    value={stockMovement}
                    trend={stockMovement > 0 ? 'up' : 'down'}
                    t={t}
                />
            </div>

            {/* Inventory Stats with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {inventoryStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card
                            key={index}
                            hover
                            className={`
                                p-6 transform transition-all duration-500
                                hover:-translate-y-1 hover:shadow-md
                                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                            `}
                            style={{ transitionDelay: `${index * 100}ms` }}
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

            {/* Main content section with animation */}
            <div className={`
                grid grid-cols-1 md:grid-cols-2 gap-6
                transform transition-all duration-500
                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
                style={{ transitionDelay: '200ms' }}
            >
                {/* Low Stock Alerts */}
                <Card hover className="p-6 transition-transform duration-300 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
                            <MdWarning className="text-red-500" />
                            {t('Inventory.LowStockAlerts')}
                        </h3>
                        <span className="px-2.5 py-0.5 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            {lowStockItems.length} {t('items')}
                        </span>
                    </div>
                    <div className="space-y-4">
                        {lowStockItems.map((item, idx) => (
                            <div
                                key={item.id}
                                className={`
                                    flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100
                                    transform transition-all duration-300 
                                    hover:shadow-md hover:border-red-200
                                    ${animateItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                                `}
                                style={{ transitionDelay: `${idx * 100 + 300}ms` }}
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <div className="flex items-center text-sm text-gray-600 mt-1">
                                        <span className="text-red-600 font-medium mr-2">{t('Inventory.Current')}: {item.current}</span>
                                        <span>{t('Inventory.Minimum')}: {item.minimum}</span>
                                    </div>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="whitespace-nowrap"
                                >
                                    {t('Inventory.Reorder')}
                                </Button>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions */}
                <Card hover className="p-6 transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                        <MdInventory className="text-blue-600" />
                        {t('Inventory.Actions')}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { name: t('Inventory.StockAdjustment'), icon: MdRefresh, color: 'bg-blue-100 text-blue-700 hover:bg-blue-200' },
                            { name: t('Inventory.PurchaseOrder'), icon: MdAddBox, color: 'bg-green-100 text-green-700 hover:bg-green-200' },
                            { name: t('Inventory.StockTransfer'), icon: MdImportExport, color: 'bg-purple-100 text-purple-700 hover:bg-purple-200' },
                            { name: t('Inventory.ScanInventory'), icon: MdOutlineQrCodeScanner, color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' },
                            { name: t('Inventory.ViewHistory'), icon: MdHistory, color: 'bg-gray-100 text-gray-700 hover:bg-gray-200' },
                            { name: t('Inventory.ExportList'), icon: MdDownload, color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200' }
                        ].map((action, idx) => {
                            const Icon = action.icon;
                            return (
                                <Button
                                    key={action.name}
                                    variant="light"
                                    className={`
                                        flex flex-col items-center justify-center p-4 gap-2 
                                        ${action.color} border-0
                                        transition-all duration-300 transform
                                        ${animateItems ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
                                    `}
                                    style={{ transitionDelay: `${idx * 100 + 300}ms` }}
                                >
                                    <Icon className="text-2xl" />
                                    <span className="text-sm">{action.name}</span>
                                </Button>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Inventory Table Toggle Button */}
            <div className={`
                transform transition-all duration-500
                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
                style={{ transitionDelay: '400ms' }}
            >
                <Button
                    variant="secondary"
                    onClick={() => setShowTable(!showTable)}
                    className="w-full flex justify-center items-center gap-2 py-3"
                    icon={<MdInventory className="text-xl" />}
                >
                    {showTable ? t('Inventory.HideTable') : t('Inventory.ShowTable')}
                </Button>
            </div>

            {/* Inventory Table */}
            {showTable && (
                <Card
                    className={`
                        transform transition-all duration-500
                        ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                        hover:shadow-md
                    `}
                    style={{ transitionDelay: '500ms' }}
                >
                    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <MdSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder={t('Inventory.SearchInventory')}
                                className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-colors duration-300"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <MdFilterList className="absolute left-3 top-3 text-gray-400" />
                            <select
                                className="w-full p-2 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-colors duration-300"
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                            >
                                <option value="all">{t('AllCategories')}</option>
                                {categories.filter(cat => cat !== 'all').map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <select
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-300 transition-colors duration-300"
                            value={`${sortBy}-${sortOrder}`}
                            onChange={(e) => {
                                const [newSortBy, newSortOrder] = e.target.value.split('-');
                                setSortBy(newSortBy);
                                setSortOrder(newSortOrder);
                            }}
                        >
                            <option value="name-asc">{t('Inventory.Sort.NameAZ')}</option>
                            <option value="name-desc">{t('Inventory.Sort.NameZA')}</option>
                            <option value="quantity-asc">{t('Inventory.Sort.QuantityLowHigh')}</option>
                            <option value="quantity-desc">{t('Inventory.Sort.QuantityHighLow')}</option>
                            <option value="price-asc">{t('Inventory.Sort.PriceLowHigh')}</option>
                            <option value="price-desc">{t('Inventory.Sort.PriceHighLow')}</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        {renderInventoryTable()}
                        {renderPagination()}
                    </div>
                </Card>
            )}

            {/* Add Product Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title={t('Inventory.AddNewProduct')}
                actions={
                    <>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                            {t('cancel')}
                        </Button>
                        <Button variant="primary" onClick={handleAddProduct}>
                            {t('Products.AddProduct')}
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('Products.ProductName')}</label>
                        <input
                            type="text"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('category')}</label>
                            <select
                                name="category"
                                value={newProduct.category}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                required
                            >
                                <option value="">{t('SelectCategory')}</option>
                                {categories.filter(cat => cat !== 'all').map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('Inventory.Price')}</label>
                            <input
                                type="number"
                                name="price"
                                value={newProduct.price}
                                onChange={handleInputChange}
                                step="0.01"
                                min="0"
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('Inventory.Quantity')}</label>
                            <input
                                type="number"
                                name="quantity"
                                value={newProduct.quantity}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('Inventory.MinQuantity')}</label>
                            <input
                                type="number"
                                name="minQuantity"
                                value={newProduct.minQuantity}
                                onChange={handleInputChange}
                                min="0"
                                className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('Inventory.Supplier')}</label>
                        <input
                            type="text"
                            name="supplier"
                            value={newProduct.supplier}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                            required
                        />
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Inventory;
