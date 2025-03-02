import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  MdEvent, MdToday, MdUpcoming, MdHistory, MdAdd, MdSearch, 
  MdFilterList, MdCalendarToday, MdPeople, MdLocationOn, 
  MdAccessTime, MdEdit, MdDelete, MdOutlineDateRange 
} from 'react-icons/md';
import Card from '../Components/UI/Card';
import Button from '../Components/UI/Button';
import Modal from '../Components/UI/Modal';

function Events() {
    const { t } = useTranslation();
    const [animateItems, setAnimateItems] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [typeFilter, setTypeFilter] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    
    const [newEvent, setNewEvent] = useState({
        title: '',
        date: new Date().toISOString().split('T')[0],
        time: '10:00',
        attendees: 0,
        type: t('Events.Types.Corporate'),
        location: '',
        description: ''
    });

    // Animation trigger when component mounts
    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimateItems(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    const [events, setEvents] = useState([
        { id: 1, title: t('Events.Events.ProductLaunch'), date: '2024-02-01', time: '10:00', attendees: 50, type: t('Events.Types.Corporate'), location: t('Events.Locations.MainConference'), description: t('Events.Descriptions.ProductLaunch') },
        { id: 2, title: t('Events.Events.TeamMeeting'), date: '2024-01-25', time: '14:00', attendees: 15, type: t('Events.Types.Internal'), location: t('Events.Locations.MeetingRoomB'), description: t('Events.Descriptions.TeamMeeting') },
        { id: 3, title: t('Events.Events.ClientWorkshop'), date: '2024-01-30', time: '09:30', attendees: 25, type: t('Events.Types.Training'), location: t('Events.Locations.TrainingCenter'), description: t('Events.Descriptions.ClientWorkshop') },
        { id: 4, title: t('Events.Events.SalesConference'), date: '2024-02-15', time: '09:00', attendees: 100, type: t('Events.Types.Corporate'), location: t('Events.Locations.ConventionCenter'), description: t('Events.Descriptions.SalesConference') },
        { id: 5, title: t('Events.Events.StaffTraining'), date: '2024-01-28', time: '13:00', attendees: 30, type: t('Events.Types.Training'), location: t('Events.Locations.MeetingRoomA'), description: t('Events.Descriptions.StaffTraining') },
    ]);

    const eventStats = [
        { title: t('Events.Stats.TotalEvents'), value: events.length.toString(), icon: MdEvent, color: 'bg-purple-100 text-purple-800' },
        { title: t('Events.Stats.Today'), value: events.filter(e => e.date === new Date().toISOString().split('T')[0]).length.toString(), icon: MdToday, color: 'bg-blue-100 text-blue-800' },
        { title: t('Events.Stats.Upcoming'), value: events.filter(e => new Date(e.date) > new Date()).length.toString(), icon: MdUpcoming, color: 'bg-green-100 text-green-800' },
        { title: t('Events.Stats.Past'), value: events.filter(e => new Date(e.date) < new Date()).length.toString(), icon: MdHistory, color: 'bg-gray-100 text-gray-800' },
    ];

    const filteredEvents = events.filter(event => {
        const matchesSearch = searchTerm === '' || 
            event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesType = typeFilter === 'all' || event.type === typeFilter;
        return matchesSearch && matchesType;
    });

    // Sort events by date, closest first
    const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.date) - new Date(b.date));
    const upcomingEvents = sortedEvents.filter(e => new Date(e.date) >= new Date()).slice(0, 3);

    const eventTypes = [
        t('Events.Types.Corporate'),
        t('Events.Types.Internal'),
        t('Events.Types.Training')
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEvent(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateEvent = () => {
        const newId = Math.max(...events.map(e => e.id)) + 1;
        const eventToAdd = {
            id: newId,
            ...newEvent
        };

        setEvents([...events, eventToAdd]);
        setShowModal(false);
        setNewEvent({
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: '10:00',
            attendees: 0,
            type: t('Events.Types.Corporate'),
            location: '',
            description: ''
        });
    };

    const handleShowDetails = (event) => {
        setSelectedEvent(event);
        setShowDetailModal(true);
    };

    const handleDeleteEvent = (id) => {
        setEvents(events.filter(e => e.id !== id));
        if (selectedEvent && selectedEvent.id === id) {
            setShowDetailModal(false);
        }
    };

    // Format date for displaying
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800 transition-all duration-300 ease-in-out">
                    {t('Events.Title')}
                </h2>
                <Button 
                    variant="primary"
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2.5 px-5 py-2.5 group transition-all duration-300 ease-in-out hover:scale-105 shadow-sm font-medium"
                >
                    <MdAdd className="text-xl transition-transform duration-300 group-hover:rotate-90" />
                    {t('Events.CreateEvent')}
                </Button>
            </div>

            {/* Stats Overview */}
            <div className={`
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '100ms' }}
            >
                {eventStats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card 
                            key={index} 
                            hover
                            className="transition-all duration-300 hover:-translate-y-1 transform"
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
                            placeholder={t('Events.Search')}
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
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value)}
                        >
                            <option value="all">{t('Events.Types.All')}</option>
                            {eventTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </Card>
            </div>

            {/* Upcoming Events Cards */}
            <div className={`
                grid grid-cols-1 md:grid-cols-3 gap-6
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '300ms' }}
            >
                {upcomingEvents.length > 0 ? (
                    upcomingEvents.map((event, idx) => (
                        <Card 
                            key={event.id} 
                            hover
                            className="transition-all duration-300 hover:-translate-y-1"
                            style={{ transitionDelay: `${idx * 100}ms` }}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-800">{event.title}</h3>
                                    <div className="flex items-center gap-1 mt-2 text-gray-500 text-sm">
                                        <MdCalendarToday className="text-gray-400" />
                                        <span>{formatDate(event.date)} • {event.time}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-600 flex items-center gap-1">
                                        <MdLocationOn className="text-gray-400" />
                                        <span>{event.location}</span>
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs ${
                                    event.type === t('Events.Types.Corporate') ? 'bg-blue-100 text-blue-800' :
                                    event.type === t('Events.Types.Internal') ? 'bg-green-100 text-green-800' :
                                    'bg-purple-100 text-purple-800'
                                }`}>
                                    {event.type}
                                </span>
                            </div>
                            <div className="mt-3 flex items-center gap-1 text-sm text-gray-600">
                                <MdPeople className="text-gray-400" />
                                <span>{t('Events.Table.Attendees')}: {event.attendees}</span>
                            </div>
                            <div className="mt-4 flex space-x-2">
                                <Button
                                    variant="secondary"
                                    className="px-3 py-1 text-sm transition-transform duration-200 active:scale-95"
                                    onClick={() => handleShowDetails(event)}
                                >
                                    {t('Events.Actions.Details')}
                                </Button>
                                <Button
                                    variant="danger"
                                    className="px-3 py-1 text-sm transition-transform duration-200 active:scale-95"
                                    onClick={() => handleDeleteEvent(event.id)}
                                >
                                    {t('Events.Actions.Cancel')}
                                </Button>
                            </div>
                        </Card>
                    ))
                ) : (
                    <Card className="col-span-3 p-8 text-center">
                        <p className="text-gray-500">{t('Events.NoUpcoming')}</p>
                    </Card>
                )}
            </div>

            {/* Monthly Calendar View */}
            <Card className={`
                transition-all duration-500 ease-in-out p-4
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '350ms' }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                        <MdOutlineDateRange className="text-blue-600" />
                        {t('Events.Calendar.Title')}
                    </h3>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:bg-blue-50"
                    >
                        {t('Events.Calendar.ViewFull')}
                    </Button>
                </div>
                <div className="grid grid-cols-7 gap-1">
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="text-center font-medium text-sm text-gray-500 py-2">
                            {t(`Events.Calendar.${day}`)}
                        </div>
                    ))}
                    
                    {/* Sample calendar days - this would normally be generated dynamically */}
                    {Array(35).fill(null).map((_, idx) => {
                        const day = idx + 1;
                        const hasEvent = events.some(e => new Date(e.date).getDate() === day);
                        return (
                            <div 
                                key={idx} 
                                className={`
                                    aspect-square flex flex-col items-center justify-center rounded-lg text-sm
                                    transition-colors duration-200
                                    ${hasEvent ? 'bg-blue-50 hover:bg-blue-100 cursor-pointer' : 'hover:bg-gray-50'}
                                `}
                            >
                                <span className={hasEvent ? 'font-semibold text-blue-600' : ''}>{day <= 31 ? day : ''}</span>
                                {hasEvent && <div className="w-1 h-1 bg-blue-500 rounded-full mt-1"></div>}
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* All Events Table */}
            <Card className={`
                transition-all duration-500 ease-in-out
                ${animateItems ? 'opacity-100' : 'opacity-0 translate-y-4'}
            `}
            style={{ transitionDelay: '400ms' }}
            >
                <div className="p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-800">{t('Events.Schedule')}</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Events.Table.Event')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Events.Table.Type')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Events.Table.Date')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Events.Table.Time')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Events.Table.Location')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Events.Table.Attendees')}</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{t('Events.Table.Actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <tr key={event.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-800">{event.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                event.type === t('Events.Types.Corporate') ? 'bg-blue-100 text-blue-800' :
                                                event.type === t('Events.Types.Internal') ? 'bg-green-100 text-green-800' :
                                                'bg-purple-100 text-purple-800'
                                            }`}>
                                                {event.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatDate(event.date)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{event.time}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{event.location}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{event.attendees}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <Button 
                                                    variant="ghost" 
                                                    size="xs"
                                                    className="p-1 text-blue-600 hover:bg-blue-100 rounded-full"
                                                    onClick={() => handleShowDetails(event)}
                                                >
                                                    <MdEdit />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="xs" 
                                                    className="p-1 text-red-600 hover:bg-red-100 rounded-full"
                                                    onClick={() => handleDeleteEvent(event.id)}
                                                >
                                                    <MdDelete />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                                        {t('Events.NoEvents')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {filteredEvents.length > 0 && (
                    <div className="p-4 border-t flex items-center justify-between">
                        <div className="text-sm text-gray-500">
                            {t('Events.Showing', {
                                filtered: filteredEvents.length,
                                total: events.length
                            })}
                        </div>
                        <div className="flex space-x-2">
                            <Button variant="secondary" className="px-3 py-1 text-sm">{t('Previous')}</Button>
                            <Button variant="secondary" className="px-3 py-1 text-sm">{t('Next')}</Button>
                        </div>
                    </div>
                )}
            </Card>

            {/* Create Event Modal */}
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={t('Events.CreateEvent')}
                actions={
                    <>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            {t('cancel')}
                        </Button>
                        <Button variant="primary" onClick={handleCreateEvent}>
                            {t('Events.Actions.Create')}
                        </Button>
                    </>
                }
            >
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('Events.Form.Title')}
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('Events.Form.Date')}
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={newEvent.date}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('Events.Form.Time')}
                            </label>
                            <input
                                type="time"
                                name="time"
                                value={newEvent.time}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('Events.Form.Type')}
                            </label>
                            <select
                                name="type"
                                value={newEvent.type}
                                onChange={handleInputChange}
                                className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                required
                            >
                                {eventTypes.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {t('Events.Form.Attendees')}
                            </label>
                            <input
                                type="number"
                                name="attendees"
                                value={newEvent.attendees}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('Events.Form.Location')}
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={newEvent.location}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            {t('Events.Form.Description')}
                        </label>
                        <textarea
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full p-2 border rounded-lg focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </form>
            </Modal>

            {/* Event Details Modal */}
            <Modal
                isOpen={showDetailModal}
                onClose={() => setShowDetailModal(false)}
                title={selectedEvent?.title || ''}
                actions={
                    <>
                        <Button 
                            variant="danger" 
                            onClick={() => {
                                if (selectedEvent) handleDeleteEvent(selectedEvent.id);
                            }}
                        >
                            {t('Events.Actions.Cancel')}
                        </Button>
                        <Button variant="secondary" onClick={() => setShowDetailModal(false)}>
                            {t('close')}
                        </Button>
                    </>
                }
            >
                {selectedEvent && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-700">
                            <MdCalendarToday className="text-blue-600" />
                            <span className="font-medium">{formatDate(selectedEvent.date)}</span>
                            <span>•</span>
                            <MdAccessTime className="text-blue-600" />
                            <span>{selectedEvent.time}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-700">
                            <MdLocationOn className="text-blue-600" />
                            <span>{selectedEvent.location}</span>
                        </div>
                        
                        <div className="flex items-center gap-2 text-gray-700">
                            <MdPeople className="text-blue-600" />
                            <span>{t('Events.Attendees', { count: selectedEvent.attendees })}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                                selectedEvent.type === t('Events.Types.Corporate') ? 'bg-blue-100 text-blue-800' :
                                selectedEvent.type === t('Events.Types.Internal') ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                            }`}>
                                {selectedEvent.type}
                            </span>
                        </div>
                        
                        {selectedEvent.description && (
                            <div className="mt-4">
                                <h4 className="font-medium text-gray-800 mb-2">{t('Events.Form.Description')}</h4>
                                <p className="text-gray-600">{selectedEvent.description}</p>
                            </div>
                        )}
                        
                        <div className="mt-6 pt-4 border-t border-gray-100">
                            <h4 className="font-medium text-gray-800 mb-3">{t('Events.Organizer')}</h4>
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white">
                                    {t('Events.Admin')}
                                </div>
                                <div>
                                    <p className="font-medium">CRM {t('Events.System')}</p>
                                    <p className="text-sm text-gray-500">{t('Events.Contact')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}

export default Events;
