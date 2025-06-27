export default function ShimmerJobs() {
  return (
    <div className="bg-white p-5 shadow-md rounded-xl animate-pulse">
      <div className="flex justify-between items-start">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mt-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/5 mt-2"></div>
      <div className="h-16 bg-gray-200 rounded w-full mt-2"></div>
      <div className="flex justify-between items-center mt-3">
        <div className="h-4 bg-gray-200 rounded w-16"></div>
        <div className="h-4 bg-gray-200 rounded w-20"></div>
      </div>
    </div>
  );
}
