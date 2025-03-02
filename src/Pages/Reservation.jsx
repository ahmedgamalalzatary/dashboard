import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdEvent, MdPerson, MdAccessTime, MdEdit, MdDelete, MdCheckCircle, MdInfoOutline, MdAdd, MdFilterList, MdToday, MdGroup, MdCalendarToday } from 'react-icons/md';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Modal from '../Components/UI/Modal';

function Reservation() {
    const { t } = useTranslation();
    const [animateItems, setAnimateItems] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [expandedReservation, setExpandedReservation] = useState(null);
    const [newReservation, setNewReservation] = useState({
        clientName: '',
        date: new Date().toISOString().split('T')[0],
        time: '18:00',
        people: 2,
        specialRequests: '',
        contactPhone: '',
        contactEmail: ''
    });
    const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'
    
    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Generate reservation slots for today
    const timeSlots = ['12:00', '12:30', '13:00', '13:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30'];
    
    const reservations = [
        { id: 1, clientName: 'John Doe', date: '2024-01-25', time: '14:00', people: 4, status: 'confirmed', contactPhone: '555-123-4567', contactEmail: 'john@example.com', specialRequests: 'Window table preferred', createdAt: '2024-01-20' },
        { id: 2, clientName: 'Jane Smith', date: '2024-01-25', time: '18:30', people: 2, status: 'pending', contactPhone: '555-987-6543', contactEmail: 'jane@example.com', specialRequests: 'Anniversary celebration', createdAt: '2024-01-22' },
        { id: 3, clientName: 'Mike Johnson', date: '2024-01-26', time: '19:00', people: 6, status: 'confirmed', contactPhone: '555-456-7890', contactEmail: 'mike@example.com', specialRequests: 'Allergic to nuts', createdAt: '2024-01-21' },
        { id: 4, clientName: 'Sarah Williams', date: '2024-01-25', time: '20:00', people: 3, status: 'cancelled', contactPhone: '555-333-2222', contactEmail: 'sarah@example.com', specialRequests: '', createdAt: '2024-01-19' },
        { id: 5, clientName: 'Robert Brown', date: '2024-01-26', time: '13:00', people: 5, status: 'confirmed', contactPhone: '555-444-5555', contactEmail: 'robert@example.com', specialRequests: 'Birthday celebration', createdAt: '2024-01-20' },
    ];

    // Filter reservations
    const filteredReservations = reservations.filter(res => {
        const matchesDate = res.date === selectedDate;
        const matchesStatus = filterStatus === 'all' || res.status === filterStatus;
        return matchesDate && matchesStatus;
    });

    // Calculate reservation stats
    const todayReservations = reservations.filter(res => res.date === selectedDate).length;
    const confirmedReservations = reservations.filter(res => res.status === 'confirmed').length;
    const pendingReservations = reservations.filter(res => res.status === 'pending').length;
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewReservation(prev => ({
            ...prev,
            [name]: value
        }));
    };
    
    const handleSubmitReservation = (e) => {
        e.preventDefault();
        // Here you would submit the reservation
        setShowModal(false);
        // Reset form
        setNewReservation({
            clientName: '',
            date: new Date().toISOString().split('T')[0],
            time: '18:00',
            people: 2,
            specialRequests: '',
            contactPhone: '',
            contactEmail: ''
        });
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'confirmed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header with animation */}
            <div className={`
                flex justify-between items-center
                transform transition-all duration-500
                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}>
                <h2 className="text-2xl font-semibold text-gray-800">{t('Reservation.Title')}</h2>
                <Button
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 group transition-all duration-300"
                    icon={<MdAdd className="text-xl transition-transform group-hover:rotate-90 duration-300" />}
                >
                    {t('Reservation.NewReservation')}
                </Button>
            </div>
            
            {/* Reservation Stats with animations */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-4
                transform transition-all duration-500
                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                {[
                    { title: t('Reservation.Stats.TodayReservations'), value: todayReservations, icon: MdToday, color: 'bg-blue-100 text-blue-800' },
                    { title: t('Reservation.Stats.Confirmed'), value: confirmedReservations, icon: MdCheckCircle, color: 'bg-green-100 text-green-800' },
                    { title: t('Reservation.Stats.Pending'), value: pendingReservations, icon: MdInfoOutline, color: 'bg-yellow-100 text-yellow-800' }
                ].map((stat, index) => (
                    <Card 
                        key={index} 
                        hover
                        className={`
                            flex items-center p-4 transform transition-all duration-300
                            hover:-translate-y-1 hover:shadow-md
                        `}
                        style={{ transitionDelay: `${index * 100 + 200}ms` }}
                    >
                        <div className={`p-3 rounded-full ${stat.color}`}>
                            <stat.icon className="text-2xl" />
                        </div>
                        <div className="ml-4">
                            <p className="text-lg font-semibold">{stat.value}</p>
                            <p className="text-sm text-gray-500">{stat.title}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Date and Filter Section */}
            <div className={`
                bg-white p-4 rounded-lg shadow-sm
                transform transition-all duration-500
                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '300ms' }}
            >
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                        <MdCalendarToday className="text-gray-500 text-xl" />
                        <label className="text-gray-700 font-medium">{t('Reservation.Filter.Date')}:</label>
                        <input 
                            type="date" 
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    
                    <div className="flex items-center space-x-3">
                        <MdFilterList className="text-gray-500 text-xl" />
                        <label className="text-gray-700 font-medium">{t('Reservation.Filter.Status')}:</label>
                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="border rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="all">{t('Reservation.Filter.AllReservations')}</option>
                            <option value="confirmed">{t('Reservation.Filter.Confirmed')}</option>
                            <option value="pending">{t('Reservation.Filter.Pending')}</option>
                            <option value="cancelled">{t('Reservation.Filter.Cancelled')}</option>
                        </select>
                    </div>
                    
                    <div className="flex space-x-2">
                        <Button
                            variant={viewMode === 'cards' ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => setViewMode('cards')}
                        >
                            {t('Reservation.ViewMode.Cards')}
                        </Button>
                        <Button
                            variant={viewMode === 'table' ? 'primary' : 'secondary'}
                            size="sm"
                            onClick={() => setViewMode('table')}
                        >
                            {t('Reservation.ViewMode.Table')}
                        </Button>
                    </div>
                </div>
            </div>
            
            {/* Reservation Display - Card View or Table View */}
            {viewMode === 'cards' ? (
                <div className={`
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
                    transform transition-all duration-500
                    ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{ transitionDelay: '400ms' }}
                >
                    {filteredReservations.length > 0 ? filteredReservations.map((res, idx) => (
                        <Card 
                            key={res.id} 
                            hover
                            className={`
                                p-4 transform transition-all duration-300
                                hover:-translate-y-1 hover:shadow-md
                                ${expandedReservation === res.id ? 'ring-2 ring-blue-500' : ''}
                            `}
                            style={{ transitionDelay: `${idx * 100 + 500}ms` }}
                            onClick={() => setExpandedReservation(expandedReservation === res.id ? null : res.id)}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                        <MdPerson className="text-blue-600 text-xl" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-medium text-gray-800">{res.clientName}</h3>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <MdAccessTime className="mr-1" />
                                            {res.time} - {res.people} people
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(res.status)}`}>
                                    {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                                </span>
                            </div>
                            
                            {/* Expanded details */}
                            {expandedReservation === res.id && (
                                <div className="mt-4 pt-4 border-t border-gray-100 text-sm space-y-2 animate-fadeIn">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <p className="text-gray-500">Contact Email</p>
                                            <p>{res.contactEmail}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Contact Phone</p>
                                            <p>{res.contactPhone}</p>
                                        </div>
                                    </div>
                                    {res.specialRequests && (
                                        <div>
                                            <p className="text-gray-500">Special Requests</p>
                                            <p>{res.specialRequests}</p>
                                        </div>
                                    )}
                                    <div className="flex justify-end space-x-2 pt-2">
                                        <Button
                                            variant="ghost"
                                            size="xs"
                                            className="hover:bg-blue-100 text-blue-600"
                                            icon={<MdEdit />}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="xs"
                                            className="hover:bg-red-100 text-red-600"
                                            icon={<MdDelete />}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </Card>
                    )) : (
                        <div className="col-span-full py-8 text-center text-gray-500 bg-white rounded-lg shadow-sm">
                            No reservations found for the selected filters
                        </div>
                    )}
                </div>
            ) : (
                <Card
                    className={`
                        transform transition-all duration-500
                        ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}
                    style={{ transitionDelay: '400ms' }}
                >
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Reservation.Table.Client')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Reservation.Table.Time')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Reservation.Table.People')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Reservation.Table.Status')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Reservation.Table.Contact')}</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{t('Reservation.Table.Actions')}</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredReservations.length > 0 ? (
                                    filteredReservations.map((res, idx) => (
                                        <tr 
                                            key={res.id}
                                            className="hover:bg-gray-50 transition-colors duration-200 animate-fadeIn"
                                            style={{ animationDelay: `${idx * 100}ms` }}
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                        <MdPerson className="text-blue-600" />
                                                    </div>
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">{res.clientName}</div>
                                                        {res.specialRequests && (
                                                            <div className="text-xs text-gray-500 truncate max-w-[150px]">
                                                                {res.specialRequests}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{res.time}</div>
                                                <div className="text-xs text-gray-500">{res.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <MdGroup className="text-gray-500 mr-1" />
                                                    <span className="text-sm">{res.people}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(res.status)}`}>
                                                    {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div>{res.contactPhone}</div>
                                                <div className="text-xs">{res.contactEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="xs"
                                                        className="p-1 hover:bg-blue-100 text-blue-600"
                                                        icon={<MdEdit />}
                                                    />
                                                    <Button
                                                        variant="ghost"
                                                        size="xs"
                                                        className="p-1 hover:bg-red-100 text-red-600"
                                                        icon={<MdDelete />}
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                            No reservations found for the selected filters
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>
            )}
            
            {/* Reservation Time Slots */}
            <div className={`
                transform transition-all duration-500
                ${animateItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '500ms' }}
            >
                <Card hover>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <MdEvent className="text-blue-600" />
                            {t('Reservation.TimeSlots.Title')}
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                            {timeSlots.map((slot, idx) => {
                                const isBooked = filteredReservations.some(res => res.time === slot);
                                return (
                                    <Button
                                        key={slot}
                                        variant={isBooked ? "ghost" : "secondary"}
                                        className={`
                                            py-3 transition-all duration-200 text-center
                                            ${isBooked ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-blue-50 hover:border-blue-300'}
                                            animate-fadeIn
                                        `}
                                        style={{ animationDelay: `${idx * 50}ms` }}
                                        disabled={isBooked}
                                        onClick={() => {
                                            if (!isBooked) {
                                                setNewReservation(prev => ({ ...prev, time: slot }));
                                                setShowModal(true);
                                            }
                                        }}
                                    >
                                        {slot}
                                        {isBooked && <span className="block text-xs mt-1">{t('Reservation.TimeSlots.Booked')}</span>}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>

            {/* Modal for new reservation - Replace with UI/Modal component */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={t('Reservation.NewReservation')}
                actions={
                    <>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('Reservation.Actions.Cancel')}
                        </Button>
                        <Button variant="primary" onClick={handleSubmitReservation}>
                            {t('Reservation.Form.Submit')}
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('Reservation.Form.ClientName')}</label>
                        <input 
                            type="text" 
                            name="clientName" 
                            value={newReservation.clientName} 
                            onChange={handleInputChange} 
                            className="w-full p-2 border rounded-lg" 
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('Reservation.Form.Date')}</label>
                            <input 
                                type="date" 
                                name="date" 
                                value={newReservation.date} 
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded-lg" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('Reservation.Form.Time')}</label>
                            <input 
                                type="time" 
                                name="time" 
                                value={newReservation.time} 
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded-lg" 
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('Reservation.Form.People')}</label>
                        <input 
                            type="number" 
                            name="people" 
                            value={newReservation.people} 
                            onChange={handleInputChange} 
                            className="w-full p-2 border rounded-lg" 
                            min="1"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('Reservation.Form.ContactPhone')}</label>
                            <input 
                                type="text" 
                                name="contactPhone" 
                                value={newReservation.contactPhone} 
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded-lg" 
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t('Reservation.Form.ContactEmail')}</label>
                            <input 
                                type="email" 
                                name="contactEmail" 
                                value={newReservation.contactEmail} 
                                onChange={handleInputChange} 
                                className="w-full p-2 border rounded-lg" 
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t('Reservation.Form.SpecialRequests')}</label>
                        <input 
                            type="text" 
                            name="specialRequests" 
                            value={newReservation.specialRequests} 
                            onChange={handleInputChange} 
                            className="w-full p-2 border rounded-lg" 
                        />
                    </div>
                </form>
            </Modal>
        </div>
    )
}

export default Reservation;
