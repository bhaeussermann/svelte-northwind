import type { Employee } from '../models/employee';

class EmployeesService {
  async getAll(): Promise<Employee[]> {
    const response = await fetch(
      '/api/employees',
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
    if (!response.ok) {
      const errorResponse = await response.json() as ErrorResponse;
      throw new Error(errorResponse.message ?? response.statusText);
    }
    return await response.json() as Employee[];
  }
}

interface ErrorResponse {
  message: string;
}

export default new EmployeesService();
