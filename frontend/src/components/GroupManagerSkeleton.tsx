import React from "react";

function GroupManagerSkeleton() {
  return (
    <div className="max-w-4xl mx-auto animate-pulse">
      <div className="bg-white rounded-lg shadow-md p-6 mt-6">
        <h2 className="h-6 bg-gray-300 rounded w-48 mb-6"></h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-lg p-4 bg-gray-100"
            >
              <div className="h-6 bg-gray-300 rounded w-32 mb-3"></div>

              <div className="space-y-2 text-sm text-gray-400 mb-4">
                <div className="h-4 bg-gray-300 rounded w-20"></div>
                <div className="h-4 bg-gray-300 rounded w-32"></div>
              </div>

              <div className="border-t pt-3 pb-3 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-4 bg-gray-300 rounded w-20"></div>
              </div>

              <div className="border-t pt-3">
                <div className="h-6 bg-gray-300 rounded w-28"></div>
              </div>
            </div>
          ))}
        </div>

        <form className="mt-4 space-y-4">
          <div className="w-full flex flex-col sm:flex-row gap-2 max-w-full">
            <div className="flex-1 h-10 bg-gray-300 rounded"></div>
            <div className="w-24 h-10 bg-gray-300 rounded"></div>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-2 max-w-full">
            <div className="flex-1 h-10 bg-gray-300 rounded"></div>
            <div className="w-24 h-10 bg-gray-300 rounded"></div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GroupManagerSkeleton;
