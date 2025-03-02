import PropTypes from 'prop-types';
import DashBoard from '../Pages/DashBoard';
import Sales from '../Pages/Sales';
import Products from '../Pages/Products';
import Inventory from '../Pages/Inventory';
import Orders from '../Pages/Orders';
import Reservation from '../Pages/Reservation';
import Clients from '../Pages/Clients';
import Employees from '../Pages/Employees';
import Events from '../Pages/Events';
import Reports from '../Pages/Reports';
import Settings from '../Pages/Settings';
import Support from '../Pages/Support';
import FAQ from '../Pages/FAQ';

const MainContent = ({ activePage }) => {
  const renderContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashBoard />;
      case 'sales':
        return <Sales />;
      case 'products':
        return <Products />;
      case 'inventory':
        return <Inventory />;
      case 'orders':
        return <Orders />;
      case 'reservation':
        return <Reservation />;
      case 'clients':
        return <Clients />;
      case 'employees':
        return <Employees />;
      case 'events':
        return <Events />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      case 'support':
        return <Support />;
      case 'faq':
        return <FAQ />;
      default:
        return <DashBoard />;
    }
  };

  return (
    <main className="p-6 lg:p-8 overflow-auto min-h-[calc(100vh-3.5rem)]">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        {renderContent()}
      </div>
    </main>
  );
};

MainContent.propTypes = {
  activePage: PropTypes.string.isRequired,
};

export default MainContent;

