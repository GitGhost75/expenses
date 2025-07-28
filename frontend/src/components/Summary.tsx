import React from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { BillingDto, ExpenseDto, UserDto } from '../types';

interface SummaryProps {
  billings: BillingDto[];
  people: UserDto[];
  expenses: ExpenseDto[];
}

export function Summary({ billings, people, expenses }: SummaryProps) {
  if (billings.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <Calculator size={24} />
          Zusammenfassung
        </h2>
        <p className="text-gray-500 text-center py-8">
          Fügen Sie Personen und Ausgaben hinzu, um die Aufteilung zu sehen
        </p>
      </div>
    );
  }

//   const balances = calculateBalances(people, expenses);
//   const settlements = calculateSettlements(people, balances);
   const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
   const amountPerPerson = totalExpenses / people.length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
        <Calculator size={24} />
        Zusammenfassung
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2  sm:scale-100 scale-[0.8]">Gesamt</h3>
          <p className="text-2xl font-bold text-blue-600  sm:scale-100 scale-[0.8]">{totalExpenses.toFixed(2)}€</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2  sm:scale-100 scale-[0.8]">Pro Person</h3>
          <p className="text-2xl font-bold text-green-600  sm:scale-100 scale-[0.8]">{amountPerPerson.toFixed(2)}€</p>
        </div>
      </div>

      {billings.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Ausgleichszahlungen</h3>
          <div className="space-y-3">
            {billings.map((billing, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-yellow-50 rounded-md border border-yellow-200"
              >
                <span className="font-medium text-gray-700 sm:scale-100 scale-[0.8]">{billing.payer}</span>
                <ArrowRight size={18} className="text-yellow-600" />
                <span className="font-medium text-gray-700 sm:scale-100 scale-[0.8]">{billing.receiver}</span>
                <span className="ml-auto font-semibold text-yellow-700  sm:scale-100 scale-[0.8]">
                  {billing.amount.toFixed(2)}€
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {billings.length === 0 && expenses.length > 0 && (
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-green-800 font-medium text-center">
            🎉 Alle Ausgaben sind bereits ausgeglichen!
          </p>
        </div>
      )}
    </div>
  );
}