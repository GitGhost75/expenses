import React from 'react';

export function ExpenseManagerSkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="h-6 bg-gray-300 rounded w-40"></div>
        <div className="h-6 bg-gray-300 rounded w-10"></div>
      </div>

      {/* Ausgaben-Liste (Platzhalter für 3 Items) */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-100 rounded-md p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="h-5 bg-gray-300 rounded w-3/5"></div>
              <div className="h-5 bg-gray-300 rounded w-16"></div>
            </div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          </div>
        ))}
      </div>

      {/* Formular Überschrift */}
      <div className="h-6 bg-gray-300 rounded w-40 mt-8"></div>

      {/* Formularfelder */}
      <div className="space-y-4">
        <div className="h-10 bg-gray-300 rounded w-full"></div>
        <div className="h-10 bg-gray-300 rounded w-1/2"></div>

        {/* Platzhalter für PersonSelector Buttons */}
        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-300 rounded-full w-16"></div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-8 bg-gray-300 rounded-full w-16"></div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="h-10 bg-gray-300 rounded w-full mt-2"></div>
      </div>
    </div>
  );
}
