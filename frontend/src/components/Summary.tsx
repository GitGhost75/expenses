import React from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import { BillingDto, ExpenseDto, UserDto } from '../types';

interface SummaryProps {
  billings: BillingDto[];
  people: UserDto[];
  expenses: ExpenseDto[];
}

export function Summary({ billings, people, expenses }: SummaryProps) {

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm lg:text-xl">
        <Calculator size={24} />
        Zusammenfassung
      </h2>
      {
        billings.length === 0 && expenses.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Fügen Sie Mitglieder und Ausgaben hinzu, um die Aufteilung zu sehen
          </p>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg flex gap-4 items-center">
                <h3 className="font-semibold text-blue-800 mb-2 text-sm lg:text-xl">Ausgaben</h3>
                <p className="text-2xl font-bold text-blue-600">{totalExpenses.toFixed(2)}€</p>
              </div>
            </div>

            {billings.length > 0 && (
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-sm lg:text-xl">Ausgleichszahlungen</h3>
                <div className="space-y-3">
                  {billings.map((billing, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 lg:gap-3 p-4 bg-yellow-50 rounded-md border border-yellow-200"
                    >
                      <span className="font-medium text-gray-700 text-sm lg:text-lg">{billing.payer}</span>
                      <ArrowRight size={18} className="text-yellow-600" />
                      <span className="font-medium text-gray-700 text-sm lg:text-lg">{billing.receiver}</span>
                      <span className="ml-auto font-semibold text-yellow-700 text-sm lg:text-lg">
                        {billing.amount.toFixed(2)}€
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {billings.length === 0 && expenses.length > 0 && (
              <div className="bg-green-50 pt-3 rounded-lg border border-green-200">
                <p className="text-green-800 font-medium text-center">
                  🎉 Alle Ausgaben sind bereits ausgeglichen!
                </p>
              </div>
            )}
          </div>

        )}
    </div>
  );
}