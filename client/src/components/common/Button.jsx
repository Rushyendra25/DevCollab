function Button({
    children,
    type = "button",
    onClick,
    className = "",
    disabled = false,
  }) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`
          w-full
          bg-indigo-600
          hover:bg-indigo-700
          text-white
          font-semibold
          py-3
          rounded-xl
          transition
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${className}
        `}
      >
        {children}
      </button>
    );
  }
  
  export default Button;