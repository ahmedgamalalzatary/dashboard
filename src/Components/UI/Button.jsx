import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function Button({ 
  children, 
  variant = 'primary',
  size = 'md',
  icon,
  fullWidth,
  className = '',
  ...props 
}) {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-blue-500',
    dark: 'bg-gray-800 text-white hover:bg-gray-900 focus:ring-gray-500',
    light: 'bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-200',
    ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-200',
  };

  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-2.5 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  // Render icon with proper RTL handling
  const renderIcon = () => {
    if (!icon) return null;
    
    // No className needed, we handle spacing in the parent container
    return icon;
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? '' : ''}
        ${className}
      `}
      {...props}
    >
      {icon && children ? (
        <div className={`inline-flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className={isRTL ? 'mr-2' : 'mr-2'}>{renderIcon()}</span>
          <span>{children}</span>
        </div>
      ) : icon ? (
        renderIcon()
      ) : (
        children
      )}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'dark', 'light', 'ghost']),
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  icon: PropTypes.node,
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
};

export default Button;
