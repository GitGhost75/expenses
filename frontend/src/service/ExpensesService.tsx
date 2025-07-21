import { UserDto } from '../types/UserDto';
import { ExpenseDto } from '../types/ExpenseDto';
import { ApiErrorResponse } from '../types/ApiErrorResponse';
const API_URL = process.env.REACT_APP_API_URL_EXPENSES;


export async function createExpense(expense : ExpenseDto): Promise<ExpenseDto | ApiErrorResponse> {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(expense)
  });

  if (!response.ok) {
    console.error("Failed to create expense");
  }

  return await response.json();
}

export async function getExpensesForUser(user: UserDto): Promise<ExpenseDto[] | ApiErrorResponse> {
  const response = await fetch(`${API_URL}/user/${encodeURIComponent(user.id)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    console.error(`Failed to get expense for user ${user.id}`);
  }

  return await response.json();
}

export function getSummary(expenses : ExpenseDto[]) : number {
  return expenses.reduce((sum, expense) => sum + expense.amount, 0);
}
