import { ApiErrorResponse } from '../types/ApiErrorResponse';
import { BillingDto } from '../types/BillingDto';
const API_URL = process.env.REACT_APP_API_URL_BILLINGS;

export async function getBillingsForGroup(groupCode: string): Promise<BillingDto[] | ApiErrorResponse> {
  const response = await fetch(`${API_URL}/group/${encodeURIComponent(groupCode)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    console.error(`Failed to get billings for group ${groupCode}`);
  }

  return await response.json();
}
