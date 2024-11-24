const IconCircleWrapper = ({ className, children }) => {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full bg-rose-400/50 p-5 text-gray-600 ${className}`}
    >
      {children}
    </div>
  );
};
export default IconCircleWrapper;
