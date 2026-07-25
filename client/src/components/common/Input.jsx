function Input({
    label,
    type = "text",
    placeholder,
    register,
    name,
    required = false,
    error,
  }) {
    const validationRules =
      typeof required === "string"
        ? { required }
        : required
        ? { required: `${label} is required` }
        : {};
  
    return (
      <div className="mb-5">
        <label className="block mb-2 font-medium text-gray-700">
          {label}
        </label>
  
        <input
          type={type}
          placeholder={placeholder}
          {...register(name, validationRules)}
          className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
  
        {error && (
          <p className="text-red-500 text-sm mt-1">
            {error.message}
          </p>
        )}
      </div>
    );
  }
  
  export default Input;