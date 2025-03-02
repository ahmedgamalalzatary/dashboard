import { MdAdd, MdEdit, MdDelete, MdFilterList, MdSearch, MdCategory, MdInventory, MdShoppingCart } from 'react-icons/md';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../Components/UI/Card';
import Modal from '../Components/UI/Modal';
import Button from '../Components/UI/Button';

function Products() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [animateItems, setAnimateItems] = useState(false);
    const [products, setProducts] = useState([
        { id: 1, name: t('Products.ProductA'), category: t('Categories.Electronics'), price: 299.99, stock: 150 },
        { id: 2, name: t('Products.ProductB'), category: t('Categories.Furniture'), price: 599.99, stock: 75 },
        { id: 3, name: t('Products.ProductC'), category: t('Categories.Clothing'), price: 49.99, stock: 200 },
    ]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        category: '',
        price: '',
        stock: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    
    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);
    
    const productMetrics = {
        topSelling: [t('Products.ProductA'), t('Products.ProductB'), t('Products.ProductC')],
        lowStock: ['Product X', 'Product Y', 'Product Z'],
        categories: [t('Categories.Electronics'), t('Categories.Furniture'), t('Categories.Clothing')]
    };
    
    const filteredProducts = products.filter(product => {
        const matchesSearch = searchTerm === '' || 
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            product.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleRemoveProduct = (productId) => {
        setProducts(prev => prev.filter(product => product.id !== productId));
    };

    const handleEditProduct = (product) => {
        setNewProduct(product);
        setShowModal(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newProduct.id) {
            // Edit existing product
            setProducts(prev => prev.map(product => 
                product.id === newProduct.id ? { ...newProduct } : product
            ));
        } else {
            // Add new product
            const newId = products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 1;
            setProducts(prev => [...prev, {
                id: newId,
                ...newProduct,
                price: parseFloat(newProduct.price),
                stock: parseInt(newProduct.stock)
            }]);
        }
        setShowModal(false);
        setNewProduct({ name: '', category: '', price: '', stock: '' });
    };
    
    const renderProductForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('Products.ProductName')}</label>
                <input
                    type="text"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('category')}</label>
                <select
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                >
                    <option value="">{t('SelectCategory')}</option>
                    <option value={t('Categories.Electronics')}>{t('Categories.Electronics')}</option>
                    <option value={t('Categories.Furniture')}>{t('Categories.Furniture')}</option>
                    <option value={t('Categories.Clothing')}>{t('Categories.Clothing')}</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('price')}</label>
                <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    required
                    step="0.01"
                    min="0"
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('stock')}</label>
                <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
        </form>
    );

    const modalActions = (
        <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                {t('cancel')}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                {t('Products.AddProduct')}
            </Button>
        </>
    );
    
    return (
        <div className="space-y-8">
            {/* Header section - with enhanced Add Product button */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800 transition-all duration-300 ease-in-out">
                    {t('Crm.ProductsManagement')}
                </h2>
                <Button 
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2.5 px-5 py-2.5 group transition-all duration-300 ease-in-out hover:scale-105 shadow-sm font-medium"
                >
                    <MdAdd className="text-xl transition-transform duration-300 group-hover:rotate-90" />
                    {t('Products.AddProduct')}
                </Button>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={t('AddNewProduct')}
                actions={modalActions}
            >
                {renderProductForm()}
            </Modal>
            
            {/* Category stats cards - UPDATED to remove icons */}
            <div className={`
                grid grid-cols-1 md:grid-cols-4 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `} 
            style={{ transitionDelay: '100ms' }}
            >
                {[
                    { name: t('Categories.All'), count: products.length, color: 'bg-blue-100 text-blue-600 border-blue-200' },
                    { name: t('Categories.Electronics'), count: products.filter(p => p.category === t('Categories.Electronics')).length, color: 'bg-green-100 text-green-600 border-green-200' },
                    { name: t('Categories.Furniture'), count: products.filter(p => p.category === t('Categories.Furniture')).length, color: 'bg-purple-100 text-purple-600 border-purple-200' },
                    { name: t('Categories.Clothing'), count: products.filter(p => p.category === t('Categories.Clothing')).length, color: 'bg-yellow-100 text-yellow-600 border-yellow-200' }
                ].map((category, index) => (
                    <Card 
                        key={category.name} 
                        hover 
                        className={`p-4 transform transition-all duration-300 hover:-translate-y-1 cursor-pointer border ${category.color.split(' ')[2]}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                        onClick={() => setCategoryFilter(category.name === t('Categories.All') ? 'all' : category.name)}
                    >
                        <div className="flex flex-col items-center justify-center">
                            <h3 className={`font-medium ${category.color.split(' ')[1]}`}>{category.name}</h3>
                            <p className="text-2xl font-bold mt-2">{category.count}</p>
                        </div>
                    </Card>
                ))}
            </div>
            
            {/* Product metrics section */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-6
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '200ms' }}
            >
                <Card hover className="p-6 transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <MdShoppingCart className="text-blue-600" />
                        {t('Products.TopSelling')}
                    </h3>
                    <ul className="space-y-3">
                        {productMetrics.topSelling.map((product, idx) => (
                            <li 
                                key={product} 
                                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-200"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <span className="text-gray-600">{product}</span>
                                <span className="text-gray-400 text-sm">234 {t('sales')}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                
                <Card hover className="p-6 transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <MdInventory className="text-red-600" />
                        {t('Products.LowStockAlert')}
                    </h3>
                    <ul className="space-y-3">
                        {productMetrics.lowStock.map((product, idx) => (
                            <li 
                                key={product} 
                                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-200"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <span className="text-gray-600">{product}</span>
                                <span className="text-red-500 text-sm font-medium">5 {t('left')}</span>
                            </li>
                        ))}
                    </ul>
                </Card>
                
                <Card hover className="p-6 transition-transform duration-300 hover:-translate-y-1">
                    <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <MdCategory className="text-green-600" />
                        {t('Products.CategoryDistribution')}
                    </h3>
                    <ul className="space-y-3">
                        {productMetrics.categories.map((category, idx) => (
                            <li 
                                key={category} 
                                className="hover:bg-gray-50 p-2 rounded transition-colors duration-200"
                                style={{ transitionDelay: `${idx * 100}ms` }}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-gray-600">{category}</span>
                                    <span className="text-gray-400 text-sm">32%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                    <div 
                                        className={`h-2 rounded-full ${
                                            category === t('Categories.Electronics') ? 'bg-blue-500' :
                                            category === t('Categories.Furniture') ? 'bg-purple-500' : 'bg-yellow-500'
                                        }`}
                                        style={{ width: '32%' }}
                                    ></div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </Card>
            </div>
            
            {/* Products table */}
            <Card className={`
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '300ms' }}
            >
                {/* Search and filter section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                    <div className="flex items-center space-x-2">
                        <MdSearch className="text-gray-400" />
                        <input 
                            type="text" 
                            placeholder={t('SearchProducts')}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center space-x-2">
                        <MdFilterList className="text-gray-400" />
                        <select 
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="all">{t('AllCategories')}</option>
                            <option value={t('Categories.Electronics')}>{t('Categories.Electronics')}</option>
                            <option value={t('Categories.Furniture')}>{t('Categories.Furniture')}</option>
                            <option value={t('Categories.Clothing')}>{t('Categories.Clothing')}</option>
                        </select>
                    </div>
                </div>
                
                {/* Products table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('id')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('name')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('category')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('price')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('stock')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product, idx) => (
                                    <tr 
                                        key={product.id}
                                        className="hover:bg-gray-50 transition-colors duration-200"
                                        style={{ 
                                            animationDelay: `${idx * 50}ms`,
                                            animationFillMode: 'both'
                                        }}
                                    >
                                        <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap font-medium">{product.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                product.category === t('Categories.Electronics') ? 'bg-blue-100 text-blue-800' :
                                                product.category === t('Categories.Furniture') ? 'bg-purple-100 text-purple-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                                {product.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`${product.stock < 50 ? 'text-red-600' : 'text-green-600'}`}>
                                                {product.stock}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button 
                                                    className="p-1 hover:bg-blue-100 rounded-full text-blue-600 transition-colors duration-200"
                                                    onClick={() => handleEditProduct(product)}
                                                >
                                                    <MdEdit />
                                                </button>
                                                <button 
                                                    className="p-1 hover:bg-red-100 rounded-full text-red-600 transition-colors duration-200"
                                                    onClick={() => handleRemoveProduct(product.id)}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        {t('NoProductsFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {filteredProducts.length > 0 && (
                    <div className="p-4 border-t flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            {t('Showing')} <span className="font-medium">{filteredProducts.length}</span> {t('of')} <span className="font-medium">{products.length}</span> {t('products')}
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="secondary" className="px-3 py-1 text-sm transition-transform duration-200 active:scale-95">{t('Previous')}</Button>
                            <Button variant="secondary" className="px-3 py-1 text-sm transition-transform duration-200 active:scale-95">{t('Next')}</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}

export default Products;
