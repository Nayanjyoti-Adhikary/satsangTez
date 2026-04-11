function PrimaryButton({ children }) {
  return (
    <button
      type="submit"
      className="w-full bg-slate-800 hover:bg-green-800 text-white font-semibold py-3 rounded-lg shadow-md transition"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
