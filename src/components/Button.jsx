const Button = ({ children, variant = 'primary', ...rest }) => {
  const getVariantClasses = () => {
    if (variant === 'primary') {
      return 'bg-[#00adb5] text-white';
    }

    if (variant === 'ghost') {
      return 'bg-transparent text-[#818181';
    }
  };

  return (
    <button
      className={`flex items-center gap-2 rounded-md px-3 py-1 text-xs transition hover:opacity-70 ${getVariantClasses()}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
