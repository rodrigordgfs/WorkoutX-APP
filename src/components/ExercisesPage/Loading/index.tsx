export const LoadingPage = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-5/6 mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
          <div className="h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
        </div>
      </div>
    </div>
  );
};
