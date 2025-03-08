import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable notification component for displaying temporary alerts
 */
const Alerts = ({ message, show, onHide, position = 'top-20', duration = 3000 }) => {
    const [isVisible, setIsVisible] = useState(show);

    useEffect(() => {
        setIsVisible(show);

        let timer;
        if (show && duration > 0) {
            timer = setTimeout(() => {
                setIsVisible(false);
                if (onHide) onHide();
            }, duration);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [show, duration, onHide]);

    if (!isVisible) return null;

    const positionClasses = {
        'top-4': 'fixed top-4',
        'top-20': 'fixed top-20',
        'bottom-4': 'fixed bottom-4',
        'bottom-20': 'fixed bottom-20',
        'center': 'fixed top-1/2 transform -translate-y-1/2'
    };

    return (
        <div className={`${positionClasses[position]} right-4 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down`}>
            {message}
        </div>
    );
};

Alerts.propTypes = {
    message: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onHide: PropTypes.func,
    position: PropTypes.oneOf(['top-4', 'top-20', 'bottom-4', 'bottom-20', 'center']),
    duration: PropTypes.number
};

export default Alerts;
