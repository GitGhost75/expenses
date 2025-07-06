
export type ApiErrorResponse = {
	timestamp: string;
	status: number;
	error: string;
	message: string;
	path: string;
	validationErrors: string[];
};