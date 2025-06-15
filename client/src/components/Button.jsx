const Button = ({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  onClick,
  className = '',
  ...props
}) => {
  const baseStyles = ' rounded-md text-base font-medium cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed';

  const variantStyles = {
    primary: 'text-blue-500 font-semibold hover:bg-zinc-200 px-4 py-2',
    secondary: 'bg-transparent text-blue-600 border border-blue-600 hover:bg-slate-50 disabled:hover:bg-transparent px-4 py-2',
    tertiary: ' text-blue-600 border border-custom-dark-8  disabled:hover:bg-transparent px-4 py-2',
    text: 'bg-transparent text-blue-500 font-semibold px-4 py-2 hover:bg-slate-50 disabled:hover:bg-transparent px-4 py-2',
    rounded: 'rounded-full '
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
