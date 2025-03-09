import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, title, children, actions }) {
    const [animateIn, setAnimateIn] = useState(false);
    
    useEffect(() => {
        if (isOpen) {
            // Add a small delay before animation to ensure DOM is ready
            setTimeout(() => {
                setAnimateIn(true);
                // Prevent body scrolling when modal is open
                document.body.style.overflow = 'hidden';
            }, 10);
        } else {
            setAnimateIn(false);
            // Restore body scrolling when modal is closed
            document.body.style.overflow = '';
        }
        
        // Clean up function to ensure body scroll is restored
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className={`
            fixed inset-0 z-50 
            flex items-center justify-center 
            transition-all duration-300 ease-in-out
            ${animateIn ? 'opacity-100' : 'opacity-0'}
        `}>
            {/* Full screen backdrop with blur effect */}
            <div 
                className={`
                    fixed inset-0 
                    bg-black/60 backdrop-blur-sm 
                    transition-opacity duration-300
                    ${animateIn ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
                aria-hidden="true"
            ></div>
            
            {/* Modal content */}
            <div 
                className={`
                    relative z-10
                    w-full max-w-md mx-4
                    bg-white rounded-lg shadow-xl
                    transition-all duration-300
                    ${animateIn ? 'translate-y-0 scale-100' : 'translate-y-8 scale-95'}
                `}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Modal header */}
                <div className="p-5 border-b">
                    <h3 
                        id="modal-title"
                        className="text-xl font-medium text-gray-800"
                    >
                        {title}
                    </h3>
                </div>
                
                {/* Modal body */}
                <div className="p-5">
                    {children}
                </div>
                
                {/* Modal footer with actions */}
                {actions && (
                    <div className="p-4 border-t flex justify-end space-x-3">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}

Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    actions: PropTypes.node
};

export default Modal;
