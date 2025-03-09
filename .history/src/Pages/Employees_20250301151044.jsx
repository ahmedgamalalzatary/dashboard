import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdPeople, MdWork, MdAssignment, MdPerson, MdAdd, MdSearch, MdFilterList } from 'react-icons/md';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';

function Employees() {
    const { t } = useTranslation();
    const [animateItems, setAnimateItems] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');

    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const employees = [
        { 
            id: 1, 
            name: t('Employees.Names.JohnDoe'), 
            position: t('Employees.Departments.Sales') + ' Manager', 
            department: t('Employees.Departments.Sales'), 
            status: t('Employees.Status.Active') 
        },
        { 
            id: 2, 
            name: t('Employees.Names.JaneSmith'), 
            position: 'Support Specialist', 
            department: t('Employees.Departments.CustomerSupport'), 
            status: t('Employees.Status.Active') 
        },
        { 
            id: 3, 
            name: t('Employees.Names.MikeWilson'), 
            position: 'Developer', 
            department: t('Employees.Departments.IT'), 
            status: t('Employees.Status.OnLeave') 
        },
        { 
            id: 4, 
            name: t('Employees.Names.SarahJohnson'), 
            position: t('Employees.Departments.Marketing') + ' Manager', 
            department: t('Employees.Departments.Marketing'), 
            status: t('Employees.Status.Active') 
        },
        { 
            id: 5, 
            name: t('Employees.Names.RobertDavis'), 
            position: t('Employees.Departments.Product') + ' Manager', 
            department: t('Employees.Departments.Product'), 
            status: t('Employees.Status.OnLeave') 
        },
    ];

    const filteredEmployees = employees.filter(employee => {
        const matchesSearch = searchTerm === '' || 
            employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
        return matchesSearch && matchesDepartment;
    });

    const departments = [
        t('Employees.Departments.Sales'),
        t('Employees.Departments.CustomerSupport'),
        t('Employees.Departments.IT'),
        t('Employees.Departments.Marketing'),
        t('Employees.Departments.Product')
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800 transition-all duration-300 ease-in-out">
                    {t('Employees.Title')}
                </h2>
                <Button 
                    variant="primary"
                    className="flex items-center gap-2.5 px-5 py-2.5 group transition-all duration-300 ease-in-out hover:scale-105 shadow-sm font-medium"
                >
                    <MdAdd className="text-xl transition-transform duration-300 group-hover:rotate-90" />
                    {t('Employees.AddEmployee')}
                </Button>
            </div>

            {/* Stats Overview */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                {[
                    { title: t('Employees.Stats.Total'), value: '156', icon: MdPeople, color: 'bg-blue-100 text-blue-600' },
                    { title: t('Employees.Stats.Active'), value: '142', icon: MdWork, color: 'bg-green-100 text-green-600' },
                    { title: t('Employees.Stats.OnLeave'), value: '14', icon: MdAssignment, color: 'bg-yellow-100 text-yellow-600' }
                ].map((stat, index) => (
                    <Card 
                        key={index} 
                        hover
                        className="transition-all duration-300 hover:-translate-y-1 transform"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-center space-x-3">
                            <div className={`p-3 rounded-lg ${stat.color}`}>
                                <stat.icon className="text-2xl" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <p className="text-2xl font-semibold">{stat.value}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Filters */}
            <div className={`
                grid grid-cols-1 md:grid-cols-2 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '200ms' }}
            >
                <Card hover className="p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2">
                        <MdSearch className="text-gray-500" />
                        <input 
                            type="text" 
                            placeholder={t('Employees.Search')}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </Card>

                <Card hover className="p-4 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center gap-2">
                        <MdFilterList className="text-gray-500" />
                        <select 
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500 transition-colors duration-300"
                            value={departmentFilter}
                            onChange={(e) => setDepartmentFilter(e.target.value)}
                        >
                            <option value="all">{t('Employees.FilterDepartment')}</option>
                            {departments.map(dept => (
                                <option key={dept} value={dept}>{dept}</option>
                            ))}
                        </select>
                    </div>
                </Card>
            </div>

            {/* Employees List */}
            <Card className={`
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '300ms' }}
            >
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">{t('Employees.Directory')}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {t('Employees.Table.ShowingCount', {
                            filtered: filteredEmployees.length,
                            total: employees.length
                        })}
                    </p>
                </div>
                <div className="divide-y divide-gray-100">
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((employee, idx) => (
                            <div 
                                key={employee.id} 
                                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors duration-200"
                                style={{ 
                                    transitionDelay: `${idx * 50}ms`,
                                    animationFillMode: 'both'
                                }}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white transition-transform duration-300 hover:scale-110">
                                        <MdPerson className="text-lg" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-800">{employee.name}</p>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span className="text-gray-500">{employee.position}</span>
                                            <span className="text-xs text-gray-400">•</span>
                                            <span className="text-gray-500">{employee.department}</span>
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs ${
                                    employee.status === t('Employees.Status.Active') ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                    {employee.status}
                                </span>
                            </div>
                        ))
                    ) : (
                        <div className="p-8 text-center text-gray-500">
                            {t('Employees.Table.NoResults')}
                        </div>
                    )}
                </div>
                {filteredEmployees.length > 0 && (
                    <div className="p-4 border-t flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            {t('Employees.Table.ShowingCount', {
                                filtered: filteredEmployees.length,
                                total: employees.length
                            })}
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="secondary" className="px-3 py-1 text-sm transition-transform duration-200 active:scale-95">{t('Employees.Navigation.Previous')}</Button>
                            <Button variant="secondary" className="px-3 py-1 text-sm transition-transform duration-200 active:scale-95">{t('Employees.Navigation.Next')}</Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Department Overview */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-6
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '400ms' }}
            >
                {departments.slice(0, 3).map((dept, idx) => (
                    <Card 
                        key={dept} 
                        hover 
                        className="transition-all duration-300 hover:-translate-y-1"
                        style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                        <h3 className="font-semibold text-gray-800 mb-4">{dept}</h3>
                        <div className="space-y-3">
                            {employees.filter(emp => emp.department === dept).map(emp => (
                                <div 
                                    key={emp.id} 
                                    className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors duration-200"
                                >
                                    <span className="text-gray-700">{emp.name}</span>
                                    <span className="text-gray-500 text-sm">{emp.position}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default Employees;
