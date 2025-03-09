import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal({ title, children, isOpen, onClose, actions }) {
    useEffect(() => {
        if (isOpen) {
            // Prevent scrolling when modal is open
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        // Clean up
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={(e) => e.target === e.currentTarget && onClose()}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        aria-label="Close"
                    >
                        &times;
                    </button>
                </div>

                <div className="mb-6">
                    {children}
                </div>

                {actions && (
                    <div className="flex justify-end space-x-3">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    actions: PropTypes.node
};

export default Modal;
