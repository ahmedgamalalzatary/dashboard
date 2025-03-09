import { useState, useEffect, useMemo } from 'react';
import { MdAddCircle, MdSearch, MdFilterList, MdEdit, MdDelete, MdMail, MdPhone, MdLocationOn } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Modal from '../Components/UI/Modal';

function Employees() {
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [animateItems, setAnimateItems] = useState(false);
    
    // New employee state
    const [newEmployee, setNewEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        position: '',
        startDate: '',
        status: 'active'
    });
    
    // Sample data
    const [employees, setEmployees] = useState([
        { id: 1, name: t('Employees.JohnSmith'), email: 'john.smith@example.com', phone: '555-1234', department: t('Departments.Sales'), position: t('Positions.Manager'), startDate: '2020-03-15', status: 'active' },
        { id: 2, name: t('Employees.SarahJohnson'), email: 'sarah.j@example.com', phone: '555-2345', department: t('Departments.Marketing'), position: t('Positions.Specialist'), startDate: '2021-06-22', status: 'active' },
        { id: 3, name: t('Employees.MichaelBrown'), email: 'michael.b@example.com', phone: '555-3456', department: t('Departments.IT'), position: t('Positions.Developer'), startDate: '2019-11-03', status: 'active' },
        { id: 4, name: t('Employees.EmilyDavis'), email: 'emily.d@example.com', phone: '555-4567', department: t('Departments.HR'), position: t('Positions.Director'), startDate: '2018-05-17', status: 'inactive' },
        { id: 5, name: t('Employees.DavidWilson'), email: 'david.w@example.com', phone: '555-5678', department: t('Departments.Finance'), position: t('Positions.Analyst'), startDate: '2022-01-10', status: 'active' },
    ]);

    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);
        
        return () => clearTimeout(timer);
    }, []);
    
    // Employee statistics
    const employeeStats = useMemo(() => {
        const departments = {};
        employees.forEach(emp => {
            if (!departments[emp.department]) {
                departments[emp.department] = 0;
            }
            departments[emp.department]++;
        });
        
        return {
            total: employees.length,
            active: employees.filter(e => e.status === 'active').length,
            inactive: employees.filter(e => e.status === 'inactive').length,
            departments
        };
    }, [employees]);

    // Filter employees based on search and department filter
    const filteredEmployees = useMemo(() => {
        return employees.filter(employee => {
            const matchesSearch = !searchTerm || 
                employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.position.toLowerCase().includes(searchTerm.toLowerCase());
            
            const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
            
            return matchesSearch && matchesDepartment;
        });
    }, [employees, searchTerm, departmentFilter]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Create new employee
        const newId = employees.length > 0 ? Math.max(...employees.map(e => e.id)) + 1 : 1;
        
        const employee = {
            id: newId,
            ...newEmployee
        };
        
        setEmployees(prev => [...prev, employee]);
        setShowModal(false);
        setNewEmployee({
            name: '',
            email: '',
            phone: '',
            department: '',
            position: '',
            startDate: '',
            status: 'active'
        });
    };
    
    const handleDeleteEmployee = (id) => {
        setEmployees(prev => prev.filter(e => e.id !== id));
    };

    const renderEmployeeForm = () => (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('name')}</label>
                <input
                    type="text"
                    name="name"
                    value={newEmployee.name}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('email')}</label>
                <input
                    type="email"
                    name="email"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('phone')}</label>
                <input
                    type="text"
                    name="phone"
                    value={newEmployee.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('department')}</label>
                <select
                    name="department"
                    value={newEmployee.department}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                >
                    <option value="">{t('Employees.SelectDepartment')}</option>
                    <option value={t('Departments.Sales')}>{t('Departments.Sales')}</option>
                    <option value={t('Departments.Marketing')}>{t('Departments.Marketing')}</option>
                    <option value={t('Departments.IT')}>{t('Departments.IT')}</option>
                    <option value={t('Departments.HR')}>{t('Departments.HR')}</option>
                    <option value={t('Departments.Finance')}>{t('Departments.Finance')}</option>
                </select>
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('position')}</label>
                <input
                    type="text"
                    name="position"
                    value={newEmployee.position}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('startDate')}</label>
                <input
                    type="date"
                    name="startDate"
                    value={newEmployee.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                />
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t('status')}</label>
                <select
                    name="status"
                    value={newEmployee.status}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-gray-500 transition-colors duration-300"
                >
                    <option value="active">{t('Employees.Active')}</option>
                    <option value="inactive">{t('Employees.Inactive')}</option>
                </select>
            </div>
        </form>
    );

    const modalActions = (
        <>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
                {t('cancel')}
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
                {t('Employees.AddEmployee')}
            </Button>
        </>
    );

    return (
        <div className="space-y-8">
            {/* Header with Add Employee button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h2 className="text-2xl font-semibold text-gray-800">{t('employees')}</h2>
                
                <Button 
                    variant="primary" 
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2.5 px-5 py-2.5 group transition-all duration-300 ease-in-out hover:scale-105 shadow-sm font-medium"
                >
                    <MdAddCircle className="text-xl transition-transform duration-300 group-hover:rotate-90" />
                    <span>{t('Employees.AddEmployee')}</span>
                </Button>
            </div>

            {/* Add Employee Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={t('Employees.AddNewEmployee')}
                actions={modalActions}
            >
                {renderEmployeeForm()}
            </Modal>

            {/* Employee Statistics */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-blue-500">
                    <h3 className="text-sm text-gray-500">{t('Employees.TotalEmployees')}</h3>
                    <p className="text-2xl font-bold mt-2 text-gray-800">{employeeStats.total}</p>
                </Card>
                
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-green-500">
                    <h3 className="text-sm text-gray-500">{t('Employees.Active')}</h3>
                    <p className="text-2xl font-bold mt-2 text-green-600">{employeeStats.active}</p>
                </Card>
                
                <Card hover className="text-center p-4 transition-all duration-300 hover:-translate-y-1 border-b-4 border-red-500">
                    <h3 className="text-sm text-gray-500">{t('Employees.Inactive')}</h3>
                    <p className="text-2xl font-bold mt-2 text-red-600">{employeeStats.inactive}</p>
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
                            placeholder={t('Employees.SearchEmployees')}
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
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                        >
                            <option value="all">{t('Employees.AllDepartments')}</option>
                            <option value={t('Departments.Sales')}>{t('Departments.Sales')}</option>
                            <option value={t('Departments.Marketing')}>{t('Departments.Marketing')}</option>
                            <option value={t('Departments.IT')}>{t('Departments.IT')}</option>
                            <option value={t('Departments.HR')}>{t('Departments.HR')}</option>
                            <option value={t('Departments.Finance')}>{t('Departments.Finance')}</option>
                        </select>
                    </div>
                </Card>
            </div>
            
            {/* Employees Table */}
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('email')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('department')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('position')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('startDate')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('status')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEmployees.length > 0 ? (
                                filteredEmployees.map((employee) => (
                                    <tr key={employee.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">{employee.id}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{employee.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{employee.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                employee.department === t('Departments.Sales') ? 'bg-blue-100 text-blue-800' :
                                                employee.department === t('Departments.Marketing') ? 'bg-green-100 text-green-800' :
                                                employee.department === t('Departments.IT') ? 'bg-purple-100 text-purple-800' :
                                                employee.department === t('Departments.HR') ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-indigo-100 text-indigo-800'
                                            }`}>
                                                {employee.department}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{employee.position}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">{employee.startDate}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                            }`}>
                                                {employee.status === 'active' ? t('Employees.Active') : t('Employees.Inactive')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="p-1 hover:bg-blue-100 rounded-full text-blue-600 transition-colors duration-200">
                                                    <MdEdit />
                                                </button>
                                                <button 
                                                    className="p-1 hover:bg-red-100 rounded-full text-red-600 transition-colors duration-200"
                                                    onClick={() => handleDeleteEmployee(employee.id)}
                                                >
                                                    <MdDelete />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                                        {t('Employees.NoEmployeesFound')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {filteredEmployees.length > 0 && (
                    <div className="flex items-center justify-between border-t border-gray-200 px-6 py-3">
                        <div className="text-sm text-gray-500">
                            {t('Showing')} <span className="font-medium">{filteredEmployees.length}</span> {t('of')} <span className="font-medium">{employees.length}</span> {t('employees')}
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="secondary" className="px-3 py-1 text-sm">{t('Previous')}</Button>
                            <Button variant="secondary" className="px-3 py-1 text-sm">{t('Next')}</Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Department Distribution */}
            <div className={`
                grid grid-cols-1 md:grid-cols-2 gap-6
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '400ms' }}
            >
                <Card hover className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Employees.DepartmentDistribution')}</h3>
                    <div className="space-y-4">
                        {Object.entries(employeeStats.departments).map(([dept, count]) => (
                            <div key={dept} className="space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">{dept}</span>
                                    <span className="text-gray-900">{count} {t('Employees.employees')}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className={`h-full rounded-full ${
                                            dept === t('Departments.Sales') ? 'bg-blue-600' :
                                            dept === t('Departments.Marketing') ? 'bg-green-600' :
                                            dept === t('Departments.IT') ? 'bg-purple-600' :
                                            dept === t('Departments.HR') ? 'bg-yellow-600' :
                                            'bg-indigo-600'
                                        }`}
                                        style={{ width: `${(count / employeeStats.total) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
                
                <Card hover className="p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">{t('Employees.RecentActivity')}</h3>
                    <div className="space-y-3">
                        <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                            <p className="font-medium text-gray-800">{t('Employees.NewEmployeeJoined')}</p>
                            <p className="text-sm text-gray-500 mt-1">{t('TimeAgo.threedays')}</p>
                        </div>
                        <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                            <p className="font-medium text-gray-800">{t('Employees.EmployeePromoted')}</p>
                            <p className="text-sm text-gray-500 mt-1">{t('TimeAgo.fivedays')}</p>
                        </div>
                        <div className="p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                            <p className="font-medium text-gray-800">{t('Employees.EmployeeLeft')}</p>
                            <p className="text-sm text-gray-500 mt-1">{t('TimeAgo.oneweek')}</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}

export default Employees;

