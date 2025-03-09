import { useState, useCallback, useMemo, useEffect } from 'react';
import { MdAdd, MdFilterList, MdSearch, MdEdit, MdDelete, MdWarning, MdCheckCircle } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Modal from '../Components/UI/Modal';

function Inventory() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [stockFilter, setStockFilter] = useState('all');
    const [animateItems, setAnimateItems] = useState(false);
    
    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);

    // Initial inventory data
    const [inventoryData, setInventoryData] = useState([
        { id: 1, name: t('Products.ProductA'), category: t('Categories.Electronics'), stock: 150, status: 'in-stock', supplier: 'Supplier A', lastUpdated: '2023-05-15' },
        { id: 2, name: t('Products.ProductB'), category: t('Categories.Furniture'), stock: 75, status: 'in-stock', supplier: 'Supplier B', lastUpdated: '2023-05-12' },
        { id: 3, name: t('Products.ProductC'), category: t('Categories.Clothing'), stock: 25, status: 'low-stock', supplier: 'Supplier C', lastUpdated: '2023-05-10' },
        { id: 4, name: t('Products.ProductD'), category: t('Categories.Electronics'), stock: 0, status: 'out-of-stock', supplier: 'Supplier A', lastUpdated: '2023-05-05' },
        { id: 5, name: t('Products.ProductE'), category: t('Categories.Furniture'), stock: 5, status: 'low-stock', supplier: 'Supplier D', lastUpdated: '2023-05-01' },
    ]);

    // New stock item state
    const [newStockItem, setNewStockItem] = useState({
        id: '',
        name: '',
        quantity: '',
        supplier: '',
        notes: ''
    });

    // Handle input change for the form
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setNewStockItem(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Handle form submission
    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        
        // Find the product by ID
        const productId = parseInt(newStockItem.id, 10);
        
        setInventoryData(prevData => {
            return prevData.map(item => {
                if (item.id === productId) {
                    const newStock = item.stock + parseInt(newStockItem.quantity, 10);
                    const newStatus = newStock > 25 ? 'in-stock' : newStock > 0 ? 'low-stock' : 'out-of-stock';
                    
                    return {
                        ...item,
                        stock: newStock,
                        status: newStatus,
                        lastUpdated: new Date().toISOString().split('T')[0],
                    };
                }
                return item;
            });
        });

        setShowModal(false);
        setNewStockItem({
            id: '',
            name: '',
            quantity: '',
            supplier: '',
            notes: ''
        });
    }, [newStockItem]);

    // Filter inventory data based on search, category, and stock filters
    const filteredInventory = useMemo(() => {
        return inventoryData.filter(item => {
            const matchesSearch = !searchQuery || 
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
            
            const matchesStock = 
                stockFilter === 'all' ||
                (stockFilter === 'in-stock' && item.status === 'in-stock') ||
                (stockFilter === 'low-stock' && item.status === 'low-stock') ||
                (stockFilter === 'out-of-stock' && item.status === 'out-of-stock');
            
            return matchesSearch && matchesCategory && matchesStock;
        });
    }, [inventoryData, searchQuery, categoryFilter, stockFilter]);
    
    // Calculate inventory statistics
    const inventoryStats = useMemo(() => {
        const totalStock = inventoryData.reduce((sum, item) => sum + item.stock, 0);
        const lowStockItems = inventoryData.filter(item => item.status === 'low-stock').length;
        const outOfStockItems = inventoryData.filter(item => item.status === 'out-of-stock').length;
        const categories = [...new Set(inventoryData.map(item => item.category))];
        
        return {
            totalStock,
            lowStockItems,
            outOfStockItems,
            categoryCount: categories.length
        };
    }, [inventoryData]);

    // Handle product selection
    const handleProductSelect = useCallback((e) => {
        const productId = parseInt(e.target.value, 10);
        const selectedProduct = inventoryData.find(item => item.id === productId);
        
        if (selectedProduct) {
            setNewStockItem(prev => ({
                ...prev,
                id: selectedProduct.id,
                name: selectedProduct.name,
                supplier: selectedProduct.supplier
            }));
        }
    }, [inventoryData]);

    // Remove item from inventory
    const handleRemoveItem = useCallback((id) => {
        setInventoryData(prev => prev.filter(item => item.id !== id));
    }, []);

    // Render the form for adding stock
    const renderAddStockForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Products.SelectProduct')}</label>
                <select
                    name="id"
                    value={newStockItem.id}
                    onChange={handleProductSelect}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                >
                    <option value="">{t('Products.SelectProduct')}</option>
                    {inventoryData.map(item => (
                        <option key={item.id} value={item.id}>
                            {item.name} - {t('Inventory.CurrentStock')}: {item.stock}
                        </option>
                    ))}
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Inventory.Quantity')}</label>
                <input
                    type="number"
                    name="quantity"
                    value={newStockItem.quantity}
                    onChange={handleInputChange}
                    required
                    min="1"
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Inventory.Supplier')}</label>
                <input
                    type="text"
                    name="supplier"
                    value={newStockItem.supplier}
                    onChange={handleInputChange}
                    readOnly
                    className="w-full p-2 border rounded-lg bg-gray-50 focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Inventory.Notes')}</label>
                <textarea
                    name="notes"
                    value={newStockItem.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                    placeholder={t('Inventory.OptionalNotes')}
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
                {t('Inventory.AddStock')}
            </Button>
        </>
    );

    return (
        <div className="space-y-8">
            {/* Header section with Add Stock button */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">{t('Inventory.Title')}</h2>
                <Button 
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2.5 px-5 py-2.5 group transition-all duration-300 ease-in-out hover:scale-105 shadow-sm font-medium"
                >
                    <MdAdd className="text-xl transition-transform duration-300 group-hover:rotate-90" />
                    {t('Inventory.AddStock')}
                </Button>
            </div>

            {/* Add Stock Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={t('Inventory.AddStock')}
                actions={modalActions}
            >
                {renderAddStockForm()}
            </Modal>

            {/* Inventory Stats Cards with animations */}
            <div className={`
                grid grid-cols-1 md:grid-cols-4 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                {[
                    { title: t('Inventory.TotalStock'), value: inventoryStats.totalStock, color: 'bg-blue-100 text-blue-800 border-blue-200' },
                    { title: t('Inventory.LowStock'), value: inventoryStats.lowStockItems, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                    { title: t('Inventory.Status.OutOfStock'), value: inventoryStats.outOfStockItems, color: 'bg-red-100 text-red-800 border-red-200' },
                    { title: t('Inventory.Categories'), value: inventoryStats.categoryCount, color: 'bg-green-100 text-green-800 border-green-200' }
                ].map((stat, idx) => (
                    <Card 
                        key={idx}
                        hover
                        className={`p-4 transform transition-transform duration-300 hover:-translate-y-1 cursor-pointer border-l-4 ${stat.color}`}
                    >
                        <div className="text-center">
                            <h3 className={`text-sm font-semibold ${stat.color.split(' ')[1]}`}>{stat.title}</h3>
                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Filters Section with animations */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-4
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
                            placeholder={t('Inventory.SearchInventory')}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </Card>

                <Card hover className="p-4">
                    <div className="flex items-center gap-2">
                        <MdFilterList className="text-gray-500" />
                        <select
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">{t('Categories.All')}</option>
                            <option value={t('Categories.Electronics')}>{t('Categories.Electronics')}</option>
                            <option value={t('Categories.Furniture')}>{t('Categories.Furniture')}</option>
                            <option value={t('Categories.Clothing')}>{t('Categories.Clothing')}</option>
                        </select>
                    </div>
                </Card>

                <Card hover className="p-4">
                    <div className="flex items-center gap-2">
                        <MdFilterList className="text-gray-500" />
                        <select
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                        >
                            <option value="all">{t('Inventory.AllStock')}</option>
                            <option value="in-stock">{t('Inventory.Status.InStock')}</option>
                            <option value="low-stock">{t('Inventory.Status.LowStock')}</option>
                            <option value="out-of-stock">{t('Inventory.Status.OutOfStock')}</option>
                        </select>
                    </div>
                </Card>
            </div>

            {/* Inventory Table with animations */}
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('id')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('name')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('category')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('supplier')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('stock')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('lastUpdated')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredInventory.length > 0 ? (
                                filteredInventory.map((item, idx) => (
                                    <tr 
                                        key={item.id}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                        style={{ 
                                            animationDelay: `${idx * 50}ms`,
                                            animationFillMode: 'both'
                                        }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{item.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                item.category === t('Categories.Electronics') ? 'bg-blue-100 text-blue-800' :
                                                item.category === t('Categories.Furniture') ? 'bg-purple-100 text-purple-800' : 
                                                'bg-green-100 text-green-800'
                                            }`}>
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.supplier}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.stock}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`flex items-center px-2 py-1 rounded-full text-xs ${
                                                item.status === 'in-stock' ? 'bg-green-100 text-green-800' :
                                                item.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' : 
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {item.status === 'in-stock' ? <MdCheckCircle className="mr-1" /> : 
                                                 item.status === 'low-stock' ? <MdWarning className="mr-1" /> : 
                                                 <MdWarning className="mr-1" />}
                                                {item.status === 'in-stock' ? t('Inventory.Status.InStock') :
                                                 item.status === 'low-stock' ? t('Inventory.Status.LowStock') :
                                                 t('Inventory.Status.OutOfStock')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{item.lastUpdated}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <div className="flex space-x-2">
                                                <button 
                                                    className="p-1 hover:bg-blue-100 rounded-full text-blue-600 transition-colors duration-200"
                                                >
                                                    <MdEdit />
                                                </button>
                                                <button 
                                                    className="p-1 hover:bg-red-100 rounded-full text-red-600 transition-colors duration-200"
                                                    onClick={() => handleRemoveItem(item.id)}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 text-center text-gray-500 py-8">
                                        {t('Inventory.NoItemsFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {filteredInventory.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
                        <div className="text-sm text-gray-500">
                            {t('Showing')} <span className="font-medium">{filteredInventory.length}</span> {t('of')} <span className="font-medium">{inventoryData.length}</span> {t('items')}
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

export default Inventory;
