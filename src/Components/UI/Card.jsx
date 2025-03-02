import PropTypes from 'prop-types';

const Card = ({ children, className = '', hover = false }) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm border border-gray-100 p-4 
        font-body
        ${hover ? 'transition-all duration-300 hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hover: PropTypes.bool
};

export default Card;
