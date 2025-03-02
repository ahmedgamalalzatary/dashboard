import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { MdNotificationsActive, MdClose, MdCircle } from 'react-icons/md';
import Button from './UI/Button';
import { useTranslation } from 'react-i18next';

function NotificationsPopup({ notifications, onClose }) {
    const { t } = useTranslation();
    const popupRef = useRef(null);

    useEffect(() => {
        // Handle click outside
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                onClose();
            }
        }

        // Handle escape key
        function handleEscKey(event) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscKey);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscKey);
        };
    }, [onClose]);

    return (
        <div
            ref={popupRef}
            className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fadeIn"
            style={{ animationDuration: '0.2s' }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="notifications-title"
        >
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <MdNotificationsActive className="text-gray-700 text-lg" />
                    <h3 id="notifications-title" className="text-lg font-medium text-gray-800">
                        {t('NotificationMessages.Title')}
                    </h3>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs bg-gray-100 text-gray-700 rounded-full px-2 py-0.5">
                        {notifications.length} {t('NotificationMessages.New')}
                    </span>
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="xs"
                        className="text-gray-400 hover:text-gray-600"
                        aria-label={t('close')}
                        icon={<MdClose />}
                    />
                </div>
            </div>

            <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                        <p>{t('NotificationMessages.NoNotifications', 'No new notifications')}</p>
                        <p className="text-sm mt-1">{t('NotificationMessages.AllCaughtUp', 'You\'re all caught up!')}</p>
                    </div>
                ) : (
                    <ul className="divide-y divide-gray-100">
                        {notifications.map((notification, index) => (
                            <li
                                key={index}
                                className="p-4 hover:bg-gray-50 transition-colors duration-150"
                            >
                                <div className="flex items-start">
                                    <div className="mt-1 mr-3">
                                        <MdCircle className="text-xs text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-800">
                                            {/* For dynamic messages, always have a fallback to the original message */}
                                            {t(`NotificationMessages.Messages.${notification.messageKey}`, notification.message)}
                                        </p>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {/* For time expressions, you can use nested translation functions with parameters */}
                                            {getTranslatedTime(t, notification.timeKey, notification.time, notification.timeParams)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="p-3 border-t border-gray-200 flex justify-between">
                <Button
                    onClick={onClose}
                    variant="ghost"
                    size="sm"
                    className="text-gray-600 hover:text-gray-900"
                >
                    {t('close')}
                </Button>
                
                {notifications.length > 0 && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-800"
                    >
                        {t('NotificationMessages.MarkAllRead', 'Mark all as read')}
                    </Button>
                )}
            </div>
        </div>
    );
}

// Helper function to handle time translations with parameters
function getTranslatedTime(t, timeKey, fallbackTime, timeParams) {
    if (timeKey && t(`NotificationMessages.TimeAgo.${timeKey}`, { ...timeParams, returnObjects: true }) !== `NotificationMessages.TimeAgo.${timeKey}`) {
        return t(`NotificationMessages.TimeAgo.${timeKey}`, timeParams);
    }
    return fallbackTime;
}

NotificationsPopup.propTypes = {
    notifications: PropTypes.arrayOf(
        PropTypes.shape({
            message: PropTypes.string.isRequired,
            messageKey: PropTypes.string,
            time: PropTypes.string.isRequired,
            timeKey: PropTypes.string,
            timeParams: PropTypes.object
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired
};

export default NotificationsPopup;
