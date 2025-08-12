import React from 'react';

export function SummarySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="h-8 w-48 bg-gray-300 rounded mb-6"></div> {/* Titel */}

      <div className="bg-blue-50 p-4 rounded-lg flex gap-4 items-center mb-4">
        <div className="h-6 w-32 bg-blue-300 rounded"></div> {/* "Ausgaben" Titel */}
        <div className="h-8 w-24 bg-blue-400 rounded"></div> {/* Betrag */}
      </div>

      <div className="space-y-3">
        {/* Mehrere Billing-Einträge als graue Blöcke */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 p-4 bg-yellow-50 rounded-md border border-yellow-200"
          >
            <div className="h-5 w-24 bg-yellow-300 rounded"></div> {/* Payer */}
            <div className="h-5 w-5 bg-yellow-300 rounded-full"></div> {/* Pfeil */}
            <div className="h-5 w-24 bg-yellow-300 rounded"></div> {/* Receiver */}
            <div className="ml-auto h-5 w-16 bg-yellow-400 rounded"></div> {/* Betrag */}
          </div>
        ))}
      </div>

      {/* Hinweis-Block */}
      <div className="bg-green-50 pt-3 rounded-lg border border-green-200 mt-6">
        <div className="h-6 w-full bg-green-300 rounded text-center"></div>
      </div>
    </div>
  );
}
