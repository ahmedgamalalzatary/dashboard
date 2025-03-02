import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

/* 
   AnimatedItem component that applies animations to its children
   Uses Framer Motion for smooth animations
   delay: time in seconds before animation starts
   duration: time in seconds for animation to complete
   type: type of animation ('fade', 'slide', 'scale', etc.)
*/

const AnimatedItem = ({ children, delay = 0, duration = 0.5, className, type = 'fade' }) => {
    // Define animation variants
    const variants = {
        hidden: {
            opacity: 0,
            y: type === 'slide' ? 20 : 0,
            scale: type === 'scale' ? 0.95 : 1
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration,
                delay,
                ease: "easeOut"
            }
        }
    };

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={variants}
            className={className}
        >
            {children}
        </motion.div>
    );
};

AnimatedItem.propTypes = {
    children: PropTypes.node.isRequired,
    delay: PropTypes.number,
    duration: PropTypes.number,
    className: PropTypes.string,
    type: PropTypes.string
};

export default AnimatedItem;