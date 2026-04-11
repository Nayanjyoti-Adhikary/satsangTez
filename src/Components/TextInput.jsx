function TextInput({ type = "text", name, value, onChange, placeholder,error,})
 {
  return (
    <div className="mb-4">
      <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full p-3 rounded-lg outline-none border
      ${error
        ? "border-red-500 focus:ring-red-200"
        :"border-gray-300 focus:border-blue-600 focus:ring-blue-200"
      }
      `} />
      {error && (
        <p className="text-red-600 text-sm mt-1">{error}</p>
      )}

    </div>
  );
}

export default TextInput;
